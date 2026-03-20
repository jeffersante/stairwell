import { el, pickRandom, clamp } from '../../utils';
import { getRunState, modifyRun } from '../../engine/state';
import {
  initCombat, getAvailableActions, resolvePlayerAction,
  resolveEnemyTurn, tickStatusEffects, isCombatOver, advanceEnemyAction,
  tickClassAbilityCooldowns
} from '../../engine/combat';
import { updateEntertainment } from '../../engine/viewers';
import { catGainXp } from '../../engine/cat';
import { getXpFromCombat, applyPlayerLevelUp, checkPlayerLevelUp } from '../../engine/progression';
import { renderEnemyDisplay, updateEnemyDisplay } from '../components/enemy-display';
import { updateHud } from '../components/hud';
import { renderAnnouncer } from '../components/announcer';
import { shake, damageFloat, hpFlash } from '../animations';
import { animateDiceRoll } from '../dice-animation';
import { renderSpellBar } from '../components/spell-bar';
import { announcerCombatStart, announcerCombatWin } from '../../data/announcer-lines';
import { audio } from '../../engine/audio';
import { triggerViewerChat } from '../components/viewer-chat';
import { getClassById } from '../../data/classes';
import type { GamePhase, CombatRoom, StatusEffect, Spell } from '../../types';


export function renderCombatScreen(container: HTMLElement, onTransition: (next: GamePhase) => void): void {
  container.innerHTML = '';
  container.className = 'screen combat-screen';

  const state = getRunState();
  const room = state.currentRoom;
  if (!room) return;

  const combatData = room.data as CombatRoom;

  // Init combat state if needed
  if (!state.combatState) {
    modifyRun(s => { s.combatState = initCombat(combatData.enemy); });
    triggerViewerChat('combat_start');
    audio.playDiceRoll();
  }

  const combat = state.combatState!;

  // Announcer
  if (announcerCombatStart.length > 0) {
    const line = pickRandom(announcerCombatStart, state.rng);
    container.appendChild(renderAnnouncer(line, { size: 'sm' }));
  }

  // Enemy display
  container.appendChild(renderEnemyDisplay(combat));

  // AC display for enemy
  const acDisplay = el('div', 'combat-ac-display');
  acDisplay.appendChild(el('span', 'combat-ac-label', `Enemy AC: ${combat.enemy.armorClass}`));
  acDisplay.appendChild(el('span', 'combat-ac-label', `Your AC: ${state.armorClass}`));
  container.appendChild(acDisplay);

  // Player status effects
  if (combat.playerStatuses.length > 0) {
    const statusArea = el('div', 'combat-status-area');
    for (const s of combat.playerStatuses) {
      const badge = el('span', `status-badge status-badge-${getStatusBadgeClass(s.effect)}`);
      badge.textContent = `${s.effect} (${s.turns})`;
      statusArea.appendChild(badge);
    }
    container.appendChild(statusArea);
  }

  // Player HP bar
  const playerHp = el('div', 'combat-player-hp');
  const playerHpBar = el('div', 'hp-bar hp-bar-lg');
  const playerHpFill = el('div', `hp-fill ${getPlayerHpClass(state.hp, state.maxHp)}`);
  playerHpFill.id = 'player-hp-fill';
  playerHpFill.style.width = `${(state.hp / state.maxHp) * 100}%`;
  playerHpBar.appendChild(playerHpFill);
  playerHp.appendChild(playerHpBar);
  const playerHpLabel = el('div', 'hp-label');
  const playerHpValue = el('span', 'hp-label-value', `${state.hp}/${state.maxHp}`);
  playerHpValue.id = 'player-hp-text';
  playerHpLabel.appendChild(el('span', undefined, 'Your HP'));
  playerHpLabel.appendChild(playerHpValue);
  playerHp.appendChild(playerHpLabel);
  container.appendChild(playerHp);

  // Mana bar
  if (state.maxMana > 0) {
    const manaBar = el('div', 'combat-mana-bar');
    const manaTrack = el('div', 'mana-bar');
    const manaFill = el('div', 'mana-fill');
    manaFill.id = 'player-mana-fill';
    manaFill.style.width = `${(state.mana / state.maxMana) * 100}%`;
    manaTrack.appendChild(manaFill);
    manaBar.appendChild(manaTrack);
    const manaLabel = el('div', 'hp-label');
    const manaValue = el('span', 'hp-label-value', `${state.mana}/${state.maxMana}`);
    manaValue.id = 'player-mana-text';
    manaLabel.appendChild(el('span', undefined, 'Mana'));
    manaLabel.appendChild(manaValue);
    manaBar.appendChild(manaLabel);
    container.appendChild(manaBar);
  }

  // Combat log
  const log = el('div', 'combat-log');
  log.id = 'combat-log';
  for (const entry of combat.log.slice(-5)) {
    const logEntry = el('div', 'combat-log-entry', entry);
    log.appendChild(logEntry);
  }
  container.appendChild(log);

  // Spell bar
  if (state.spells.length > 0) {
    container.appendChild(renderSpellBar(state.spells, state.mana, (spell) => {
      castSpell(spell, container, onTransition);
    }));
  }

  // Action buttons
  renderCombatActions(container, onTransition);
}

function renderCombatActions(container: HTMLElement, onTransition: (next: GamePhase) => void): void {
  const existing = document.getElementById('combat-actions');
  if (existing) existing.remove();

  const state = getRunState();
  const combat = state.combatState;
  if (!combat) return;

  const actions = el('div', 'combat-actions');
  actions.id = 'combat-actions';

  const available = getAvailableActions(state);

  // Group into rows of 2
  for (let i = 0; i < available.length; i += 2) {
    const row = el('div', 'combat-actions-row');
    for (let j = i; j < Math.min(i + 2, available.length); j++) {
      const { source, action } = available[j];
      const btn = el('button', 'btn');
      const dmgText = action.damageDice ? ` | ${action.damageDice}` : action.damage ? ` | ${action.damage} dmg` : '';
      const healText = action.healing ? ` | +${action.healing} hp` : '';
      btn.innerHTML = `<strong>${action.name}</strong><br><span class="text-xs text-dim">${source}${dmgText}${healText}</span>`;
      btn.addEventListener('click', () => {
        audio.playButtonClick();
        executeTurn(action.name, container, onTransition);
      });
      row.appendChild(btn);
    }
    actions.appendChild(row);
  }

  container.appendChild(actions);
}

function castSpell(spell: Spell, container: HTMLElement, onTransition: (next: GamePhase) => void): void {
  const state = getRunState();
  if (state.mana < spell.manaCost) return;

  audio.playSpellCast(spell.school);
  triggerViewerChat('spell_cast');

  modifyRun(s => {
    s.mana -= spell.manaCost;
  });

  // Convert spell to item action and execute
  const action = {
    name: spell.name,
    damageDice: spell.damage,
    healing: spell.healing,
    statusEffect: spell.statusEffect,
    statusDuration: spell.statusDuration,
    description: spell.description,
  };

  const combat = state.combatState;
  if (!combat) return;

  const result = resolvePlayerAction(action, combat, state);

  modifyRun(s => {
    const c = s.combatState!;
    c.enemyHp -= result.damage;
    s.hp = clamp(s.hp + result.healing, 0, s.maxHp);
    for (const effect of result.effects) {
      c.enemyStatuses.push(effect);
    }
    c.log.push(...result.logEntries);
    s.viewers = updateEntertainment(s.viewers, result.damage > 15 ? 'rare_action' : 'enemy_kill');
  });

  handlePostPlayerAction(result, container, onTransition);
}

function executeTurn(actionName: string, container: HTMLElement, onTransition: (next: GamePhase) => void): void {
  const state = getRunState();
  const combat = state.combatState;
  if (!combat) return;

  const available = getAvailableActions(state);
  const chosen = available.find(a => a.action.name === actionName);
  if (!chosen) return;

  // Resolve player action
  const result = resolvePlayerAction(chosen.action, combat, state);

  // Set ability cooldown if it's a class ability
  const playerClass = getClassById(state.playerClass);
  if (playerClass) {
    if (playerClass.signatureAbility.name === actionName) {
      modifyRun(s => { s.classAbilityCooldowns[actionName] = playerClass.signatureAbility.cooldown; });
    }
    const treeAbility = playerClass.abilityTree.find(a => a.name === actionName);
    if (treeAbility) {
      modifyRun(s => { s.classAbilityCooldowns[actionName] = treeAbility.cooldown; });
    }
  }

  modifyRun(s => {
    const c = s.combatState!;
    c.enemyHp -= result.damage;
    s.hp = clamp(s.hp + result.healing, 0, s.maxHp);
    for (const effect of result.effects) {
      c.enemyStatuses.push(effect);
    }
    c.log.push(...result.logEntries);
    s.viewers = updateEntertainment(s.viewers, result.damage > 15 ? 'rare_action' : 'enemy_kill');
  });

  // Play dice roll animation for attacks
  if (result.attackRoll) {
    const attackRoll = result.attackRoll;
    animateDiceRoll({
      die: 'd20',
      result: attackRoll.results[0],
      critical: result.critical ?? false,
      fumble: result.fumble ?? false,
      container,
      onComplete: () => {
        if (result.critical) {
          triggerViewerChat('critical_hit');
        } else if (result.fumble) {
          triggerViewerChat('fumble');
        }
        handlePostPlayerAction(result, container, onTransition);
      },
    });
  } else {
    handlePostPlayerAction(result, container, onTransition);
  }
}

function handlePostPlayerAction(
  result: { damage: number; healing: number; hit?: boolean; critical?: boolean; fumble?: boolean },
  container: HTMLElement,
  onTransition: (next: GamePhase) => void
): void {
  const state = getRunState();

  // Animate enemy hit
  const enemyEmoji = document.getElementById('enemy-emoji');
  if (enemyEmoji && result.damage > 0) {
    shake(enemyEmoji);
    damageFloat(enemyEmoji.parentElement!, result.damage, 'dealt');
    audio.playHit(result.damage);
    if (result.critical) {
      audio.playCritical();
    }
  }

  if (result.hit === false && !result.fumble) {
    audio.playMiss();
  }

  // Check if combat is over after player action
  const check1 = isCombatOver(state.combatState!, state.hp);
  if (check1.over) {
    finishCombat(check1.playerWon, container, onTransition);
    return;
  }

  // Enemy turn (slight delay for feel)
  setTimeout(() => {
    const enemyResult = resolveEnemyTurn(state.combatState!, state);

    modifyRun(s => {
      s.hp = clamp(s.hp - enemyResult.damage, 0, s.maxHp);
      for (const effect of enemyResult.effects) {
        s.combatState!.playerStatuses.push(effect);
      }
      s.combatState!.log.push(...enemyResult.logEntries);
      if (enemyResult.damage > 0) {
        s.viewers = updateEntertainment(s.viewers, 'took_damage');
      }
    });

    // Animate player damage
    const playerHpFill = document.getElementById('player-hp-fill');
    if (playerHpFill && enemyResult.damage > 0) {
      hpFlash(playerHpFill);
      audio.playHit(enemyResult.damage);
    }

    // Check low HP
    if (state.hp > 0 && state.hp <= state.maxHp * 0.2) {
      triggerViewerChat('low_hp');
    }

    // Tick status effects
    const statusTick = tickStatusEffects(state.combatState!);
    modifyRun(s => {
      s.hp = clamp(s.hp - statusTick.playerDamage, 0, s.maxHp);
      s.combatState!.enemyHp -= statusTick.enemyDamage;
      s.combatState!.log.push(...statusTick.logEntries);
    });

    // Advance enemy action & tick cooldowns
    modifyRun(s => {
      const c = s.combatState!;
      c.enemyNextAction = advanceEnemyAction(c, s.rng);
      c.turn++;
      s.classAbilityCooldowns = tickClassAbilityCooldowns(s.classAbilityCooldowns);
    });

    // Check if combat is over
    const check2 = isCombatOver(state.combatState!, state.hp);
    if (check2.over) {
      finishCombat(check2.playerWon, container, onTransition);
      return;
    }

    // Re-render UI
    updateEnemyDisplay(state.combatState!);
    updatePlayerHp();
    updateManaBar();
    updateCombatLog();
    renderCombatActions(container, onTransition);
    updateHud();
  }, 400);
}

function finishCombat(playerWon: boolean, container: HTMLElement, onTransition: (next: GamePhase) => void): void {
  const state = getRunState();

  // Remove action buttons
  const actionsEl = document.getElementById('combat-actions');
  if (actionsEl) actionsEl.remove();

  if (playerWon) {
    const enemy = state.combatState!.enemy;

    // Award loot/xp
    const goldEarned = enemy.goldDrop[0] + Math.floor(state.rng() * (enemy.goldDrop[1] - enemy.goldDrop[0] + 1));
    const xpEarned = getXpFromCombat(enemy.xpDrop, state.floorNumber, state.playerClass);

    modifyRun(s => {
      s.gold += goldEarned;
      s.enemiesDefeated.push(enemy.id);
      s.roomsExplored++;
      if (s.currentRoom) s.currentRoom.explored = true;
      s.viewers = updateEntertainment(s.viewers, 'enemy_kill');
      s.playerXp += xpEarned;
    });

    // Check level up
    const levelResult = checkPlayerLevelUp(state);
    if (levelResult.leveled) {
      modifyRun(s => { applyPlayerLevelUp(s); });
      audio.playLevelUp();
      triggerViewerChat('level_up');
    }

    // Cat XP
    const catResult = catGainXp(state.cat, enemy.xpDrop);
    modifyRun(s => { s.cat = catResult.cat; });

    triggerViewerChat('enemy_kill');
    audio.playGoldPickup();

    // Victory UI
    const reward = el('div', 'reward-container');
    reward.appendChild(el('div', 'reward-title', 'VICTORY'));

    if (announcerCombatWin.length > 0) {
      const line = pickRandom(announcerCombatWin, state.rng);
      reward.appendChild(renderAnnouncer(line, { size: 'sm', skipTypewriter: true }));
    }

    const goldReward = el('div', 'reward-gold');
    goldReward.textContent = `+${goldEarned} gold`;
    reward.appendChild(goldReward);

    const xpReward = el('div', 'reward-xp');
    xpReward.textContent = `+${xpEarned} XP`;
    reward.appendChild(xpReward);

    if (levelResult.leveled) {
      reward.appendChild(el('div', 'text-gold text-center', `Level up! Now level ${levelResult.newLevel}!`));
      if (levelResult.newAbility) {
        reward.appendChild(el('div', 'text-green text-center', `New ability: ${levelResult.newAbility.name}!`));
      }
    }

    if (catResult.leveled) {
      reward.appendChild(el('div', 'text-gold text-center', `${state.cat.name} leveled up!`));
    }

    const continueBtn = el('button', 'btn btn-action btn-action-primary', 'Continue');
    continueBtn.addEventListener('click', () => {
      audio.playButtonClick();
      modifyRun(s => { s.combatState = null; s.phase = 'floor_map'; });
      onTransition('floor_map');
    });
    reward.appendChild(continueBtn);

    container.appendChild(reward);
  } else {
    // Player died
    triggerViewerChat('player_death');
    audio.playDeath();
    modifyRun(s => { s.combatState = null; });
    onTransition('death');
  }

  updateHud();
}

function updatePlayerHp(): void {
  const state = getRunState();
  const fill = document.getElementById('player-hp-fill');
  const text = document.getElementById('player-hp-text');
  if (fill) {
    fill.style.width = `${(state.hp / state.maxHp) * 100}%`;
    fill.className = `hp-fill ${getPlayerHpClass(state.hp, state.maxHp)}`;
  }
  if (text) text.textContent = `${state.hp}/${state.maxHp}`;
}

function updateManaBar(): void {
  const state = getRunState();
  const fill = document.getElementById('player-mana-fill');
  const text = document.getElementById('player-mana-text');
  if (fill && state.maxMana > 0) {
    fill.style.width = `${(state.mana / state.maxMana) * 100}%`;
  }
  if (text) text.textContent = `${state.mana}/${state.maxMana}`;
}

function updateCombatLog(): void {
  const state = getRunState();
  const log = document.getElementById('combat-log');
  if (!log || !state.combatState) return;
  log.innerHTML = '';
  for (const entry of state.combatState.log.slice(-8)) {
    const logEntry = el('div', 'combat-log-entry', entry);
    log.appendChild(logEntry);
  }
  log.scrollTop = log.scrollHeight;
}

function getPlayerHpClass(hp: number, maxHp: number): string {
  const pct = hp / maxHp;
  if (pct > 0.6) return 'hp-fill-high';
  if (pct > 0.3) return 'hp-fill-mid';
  return 'hp-fill-low';
}

function getStatusBadgeClass(effect: StatusEffect): string {
  switch (effect) {
    case 'poison': return 'poison';
    case 'stun': return 'stun';
    case 'bleed': return 'bleed';
    case 'cursed': return 'curse';
    case 'on_fire': return 'burn';
    case 'existential_dread': return 'debuff';
  }
}
