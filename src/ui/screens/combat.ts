import { el, pickRandom, clamp } from '../../utils';
import { getRunState, modifyRun } from '../../engine/state';
import {
  initCombat, getAvailableActions, resolvePlayerAction,
  resolveEnemyTurn, tickStatusEffects, isCombatOver, advanceEnemyAction
} from '../../engine/combat';
import { updateEntertainment } from '../../engine/viewers';
import { catGainXp } from '../../engine/cat';
import { renderEnemyDisplay, updateEnemyDisplay } from '../components/enemy-display';
import { updateHud } from '../components/hud';
import { renderAnnouncer } from '../components/announcer';
import { shake, damageFloat, hpFlash } from '../animations';
import { announcerCombatStart, announcerCombatWin } from '../../data/announcer-lines';
import type { GamePhase, CombatRoom, StatusEffect } from '../../types';

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
  }

  const combat = state.combatState!;

  // Announcer
  if (announcerCombatStart.length > 0) {
    const line = pickRandom(announcerCombatStart, state.rng);
    container.appendChild(renderAnnouncer(line, { size: 'sm' }));
  }

  // Enemy display
  container.appendChild(renderEnemyDisplay(combat));

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

  // Player HP
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

  // Combat log
  const log = el('div', 'combat-log');
  log.id = 'combat-log';
  for (const entry of combat.log.slice(-5)) {
    const logEntry = el('div', 'combat-log-entry', entry);
    log.appendChild(logEntry);
  }
  container.appendChild(log);

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
      btn.innerHTML = `<strong>${action.name}</strong><br><span class="text-xs text-dim">${source}${action.damage ? ` | ${action.damage} dmg` : ''}${action.healing ? ` | +${action.healing} hp` : ''}</span>`;
      btn.addEventListener('click', () => executeTurn(action.name, container, onTransition));
      row.appendChild(btn);
    }
    actions.appendChild(row);
  }

  container.appendChild(actions);
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

  // Animate enemy hit
  const enemyEmoji = document.getElementById('enemy-emoji');
  if (enemyEmoji && result.damage > 0) {
    shake(enemyEmoji);
    damageFloat(enemyEmoji.parentElement!, result.damage, 'dealt');
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
    }

    // Tick status effects
    const statusTick = tickStatusEffects(state.combatState!);
    modifyRun(s => {
      s.hp = clamp(s.hp - statusTick.playerDamage, 0, s.maxHp);
      s.combatState!.enemyHp -= statusTick.enemyDamage;
      s.combatState!.log.push(...statusTick.logEntries);
    });

    // Advance enemy action
    modifyRun(s => {
      const c = s.combatState!;
      c.enemyNextAction = advanceEnemyAction(c, s.rng);
      c.turn++;
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
    modifyRun(s => {
      s.gold += goldEarned;
      s.enemiesDefeated.push(enemy.id);
      s.roomsExplored++;
      if (s.currentRoom) s.currentRoom.explored = true;
      s.viewers = updateEntertainment(s.viewers, 'enemy_kill');
    });

    // Cat XP
    const catResult = catGainXp(state.cat, enemy.xpDrop);
    modifyRun(s => { s.cat = catResult.cat; });

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
    xpReward.textContent = `+${enemy.xpDrop} cat XP`;
    reward.appendChild(xpReward);

    if (catResult.leveled) {
      reward.appendChild(el('div', 'text-gold text-center', `${state.cat.name} leveled up!`));
    }

    const continueBtn = el('button', 'btn btn-action btn-action-primary', 'Continue');
    continueBtn.addEventListener('click', () => {
      modifyRun(s => { s.combatState = null; s.phase = 'floor_map'; });
      onTransition('floor_map');
    });
    reward.appendChild(continueBtn);

    container.appendChild(reward);
  } else {
    // Player died
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
