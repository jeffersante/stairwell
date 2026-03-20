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
import { announcerBossIntro, announcerBossWin } from '../../data/announcer-lines';
import { audio } from '../../engine/audio';
import { triggerViewerChat } from '../components/viewer-chat';
import type { GamePhase, CombatRoom, Boss } from '../../types';

export function renderBossScreen(container: HTMLElement, onTransition: (next: GamePhase) => void): void {
  container.innerHTML = '';
  container.className = 'screen combat-screen boss-combat-screen';

  const state = getRunState();
  const room = state.currentRoom;
  if (!room) return;

  const combatData = room.data as CombatRoom;
  const boss = state.floor.boss;

  // Show intro first if combat hasn't started
  if (!state.combatState) {
    triggerViewerChat('boss_encounter');
    renderBossIntro(container, combatData, boss, onTransition);
    return;
  }

  renderBossCombat(container, onTransition);
}

function renderBossIntro(
  container: HTMLElement,
  combatData: CombatRoom,
  boss: Boss | undefined,
  onTransition: (next: GamePhase) => void
): void {
  const state = getRunState();

  const intro = el('div', 'boss-intro');
  intro.appendChild(el('div', 'boss-intro-emoji', combatData.enemy.emoji));
  intro.appendChild(el('div', 'boss-intro-name', combatData.enemy.name));
  if (boss) {
    intro.appendChild(el('div', 'boss-intro-subtitle', boss.title));
  }
  container.appendChild(intro);

  // Announcer
  if (announcerBossIntro.length > 0) {
    const line = pickRandom(announcerBossIntro, state.rng);
    container.appendChild(renderAnnouncer(line, { size: 'lg' }));
  }

  const actions = el('div', 'screen-actions');
  const fightBtn = el('button', 'btn btn-action btn-danger', 'FIGHT');
  fightBtn.addEventListener('click', () => {
    audio.playButtonClick();
    audio.playDiceRoll();
    modifyRun(s => { s.combatState = initCombat(combatData.enemy); });
    renderBossScreen(container, onTransition);
  });
  actions.appendChild(fightBtn);
  container.appendChild(actions);
}

function renderBossCombat(container: HTMLElement, onTransition: (next: GamePhase) => void): void {
  const state = getRunState();
  const combat = state.combatState!;
  const boss = state.floor.boss;

  // Phase indicator
  if (boss && boss.phases > 1) {
    const phaseContainer = el('div');
    phaseContainer.style.textAlign = 'center';

    const currentPhase = getCurrentPhase(combat.enemyHp, combat.enemyMaxHp, boss.phaseThresholds);
    const phaseLabel = el('div', 'boss-phase-label', `PHASE ${currentPhase + 1}`);
    phaseContainer.appendChild(phaseLabel);

    const dots = el('div', 'boss-phase-indicator');
    dots.style.justifyContent = 'center';
    for (let i = 0; i < boss.phases; i++) {
      const dot = el('div', `boss-phase-dot${i < currentPhase ? ' completed' : i === currentPhase ? ' active' : ''}`);
      dots.appendChild(dot);
    }
    phaseContainer.appendChild(dots);
    container.appendChild(phaseContainer);
  }

  // Enemy display
  container.appendChild(renderEnemyDisplay(combat));

  // Player HP
  const playerHp = el('div', 'combat-player-hp');
  const playerHpBar = el('div', 'hp-bar hp-bar-lg');
  const playerHpFill = el('div', `hp-fill ${getHpClass(state.hp, state.maxHp)}`);
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
    log.appendChild(el('div', 'combat-log-entry', entry));
  }
  container.appendChild(log);

  // Actions
  renderBossActions(container, onTransition);
}

function renderBossActions(container: HTMLElement, onTransition: (next: GamePhase) => void): void {
  const existing = document.getElementById('combat-actions');
  if (existing) existing.remove();

  const state = getRunState();
  const combat = state.combatState;
  if (!combat) return;

  const actionsEl = el('div', 'combat-actions');
  actionsEl.id = 'combat-actions';

  const available = getAvailableActions(state);

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
        executeBossTurn(action.name, container, onTransition);
      });
      row.appendChild(btn);
    }
    actionsEl.appendChild(row);
  }

  container.appendChild(actionsEl);
}

function executeBossTurn(actionName: string, container: HTMLElement, onTransition: (next: GamePhase) => void): void {
  const state = getRunState();
  const combat = state.combatState;
  if (!combat) return;

  const available = getAvailableActions(state);
  const chosen = available.find(a => a.action.name === actionName);
  if (!chosen) return;

  const result = resolvePlayerAction(chosen.action, combat, state);

  modifyRun(s => {
    const c = s.combatState!;
    c.enemyHp -= result.damage;
    s.hp = clamp(s.hp + result.healing, 0, s.maxHp);
    for (const effect of result.effects) {
      c.enemyStatuses.push(effect);
    }
    c.log.push(...result.logEntries);
    s.viewers = updateEntertainment(s.viewers, 'risky_action');
  });

  // Dice animation for attacks
  if (result.attackRoll) {
    animateDiceRoll({
      die: 'd20',
      result: result.attackRoll.results[0],
      critical: result.critical ?? false,
      fumble: result.fumble ?? false,
      container,
      onComplete: () => {
        if (result.critical) triggerViewerChat('critical_hit');
        if (result.fumble) triggerViewerChat('fumble');
        handleBossPostAction(result, container, onTransition);
      },
    });
  } else {
    handleBossPostAction(result, container, onTransition);
  }
}

function handleBossPostAction(
  result: { damage: number; healing: number; hit?: boolean; critical?: boolean; fumble?: boolean },
  container: HTMLElement,
  onTransition: (next: GamePhase) => void
): void {
  const state = getRunState();

  const enemyEmoji = document.getElementById('enemy-emoji');
  if (enemyEmoji && result.damage > 0) {
    shake(enemyEmoji);
    damageFloat(enemyEmoji.parentElement!, result.damage, 'dealt');
    audio.playHit(result.damage);
    if (result.critical) audio.playCritical();
  }
  if (result.hit === false && !result.fumble) audio.playMiss();

  const check1 = isCombatOver(state.combatState!, state.hp);
  if (check1.over) {
    finishBossCombat(check1.playerWon, container, onTransition);
    return;
  }

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
        audio.playHit(enemyResult.damage);
      }
    });

    const playerHpFill = document.getElementById('player-hp-fill');
    if (playerHpFill && enemyResult.damage > 0) {
      hpFlash(playerHpFill);
    }

    if (state.hp > 0 && state.hp <= state.maxHp * 0.2) {
      triggerViewerChat('low_hp');
    }

    const statusTick = tickStatusEffects(state.combatState!);
    modifyRun(s => {
      s.hp = clamp(s.hp - statusTick.playerDamage, 0, s.maxHp);
      s.combatState!.enemyHp -= statusTick.enemyDamage;
      s.combatState!.log.push(...statusTick.logEntries);
    });

    modifyRun(s => {
      const c = s.combatState!;
      c.enemyNextAction = advanceEnemyAction(c, s.rng);
      c.turn++;
      s.classAbilityCooldowns = tickClassAbilityCooldowns(s.classAbilityCooldowns);
    });

    const check2 = isCombatOver(state.combatState!, state.hp);
    if (check2.over) {
      finishBossCombat(check2.playerWon, container, onTransition);
      return;
    }

    updateEnemyDisplay(state.combatState!);
    updatePlayerHpDisplay();
    updateBossLog();
    renderBossActions(container, onTransition);
    updateHud();
  }, 400);
}

function finishBossCombat(playerWon: boolean, container: HTMLElement, onTransition: (next: GamePhase) => void): void {
  const state = getRunState();
  const actionsEl = document.getElementById('combat-actions');
  if (actionsEl) actionsEl.remove();

  if (playerWon) {
    const enemy = state.combatState!.enemy;
    const goldEarned = enemy.goldDrop[0] + Math.floor(state.rng() * (enemy.goldDrop[1] - enemy.goldDrop[0] + 1));
    const xpEarned = getXpFromCombat(enemy.xpDrop * 3, state.floorNumber, state.playerClass);

    modifyRun(s => {
      s.gold += goldEarned;
      s.enemiesDefeated.push(enemy.id);
      s.roomsExplored++;
      if (s.currentRoom) s.currentRoom.explored = true;
      s.viewers = updateEntertainment(s.viewers, 'boss_kill');
      s.playerXp += xpEarned;
    });

    const levelResult = checkPlayerLevelUp(state);
    if (levelResult.leveled) {
      modifyRun(s => { applyPlayerLevelUp(s); });
      audio.playLevelUp();
      triggerViewerChat('level_up');
    }

    const catResult = catGainXp(state.cat, enemy.xpDrop * 3);
    modifyRun(s => { s.cat = catResult.cat; });

    triggerViewerChat('boss_kill');
    audio.playGoldPickup();

    const reward = el('div', 'reward-container');
    reward.appendChild(el('div', 'reward-title', 'BOSS DEFEATED'));

    if (announcerBossWin.length > 0) {
      const line = pickRandom(announcerBossWin, state.rng);
      reward.appendChild(renderAnnouncer(line, { size: 'sm', skipTypewriter: true }));
    }

    reward.appendChild(el('div', 'reward-gold', `+${goldEarned} gold`));
    reward.appendChild(el('div', 'reward-xp', `+${xpEarned} XP`));

    if (levelResult.leveled) {
      reward.appendChild(el('div', 'text-gold text-center', `Level up! Now level ${levelResult.newLevel}!`));
    }

    const continueBtn = el('button', 'btn btn-action btn-action-primary', 'Descend Deeper');
    continueBtn.addEventListener('click', () => {
      audio.playButtonClick();
      modifyRun(s => { s.combatState = null; s.phase = 'floor_complete'; });
      onTransition('floor_complete');
    });
    reward.appendChild(continueBtn);

    container.appendChild(reward);
  } else {
    triggerViewerChat('player_death');
    audio.playDeath();
    modifyRun(s => { s.combatState = null; });
    onTransition('death');
  }

  updateHud();
}

function updatePlayerHpDisplay(): void {
  const state = getRunState();
  const fill = document.getElementById('player-hp-fill');
  const text = document.getElementById('player-hp-text');
  if (fill) {
    fill.style.width = `${(state.hp / state.maxHp) * 100}%`;
    fill.className = `hp-fill ${getHpClass(state.hp, state.maxHp)}`;
  }
  if (text) text.textContent = `${state.hp}/${state.maxHp}`;
}

function updateBossLog(): void {
  const state = getRunState();
  const log = document.getElementById('combat-log');
  if (!log || !state.combatState) return;
  log.innerHTML = '';
  for (const entry of state.combatState.log.slice(-8)) {
    log.appendChild(el('div', 'combat-log-entry', entry));
  }
  log.scrollTop = log.scrollHeight;
}

function getCurrentPhase(hp: number, maxHp: number, thresholds: number[]): number {
  const pct = (hp / maxHp) * 100;
  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (pct <= thresholds[i]) return i + 1;
  }
  return 0;
}

function getHpClass(hp: number, maxHp: number): string {
  const pct = hp / maxHp;
  if (pct > 0.6) return 'hp-fill-high';
  if (pct > 0.3) return 'hp-fill-mid';
  return 'hp-fill-low';
}
