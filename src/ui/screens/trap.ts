import { el, pickRandom, clamp } from '../../utils';
import { getRunState, modifyRun } from '../../engine/state';
import { updateHud } from '../components/hud';
import { updateEntertainment } from '../../engine/viewers';
import { renderAnnouncer } from '../components/announcer';
import { announcerTrapRoom } from '../../data/announcer-lines';
import { audio } from '../../engine/audio';
import { triggerViewerChat } from '../components/viewer-chat';
import type { GamePhase, TrapRoom } from '../../types';

export function renderTrapScreen(container: HTMLElement, onTransition: (next: GamePhase) => void): void {
  container.innerHTML = '';
  container.className = 'screen trap-screen';

  const state = getRunState();
  const room = state.currentRoom;
  if (!room) return;

  const trap = room.data as TrapRoom;

  // Warning
  const warning = el('div', 'trap-warning');
  warning.appendChild(el('div', 'trap-warning-icon', '\u26A0\uFE0F'));
  warning.appendChild(el('div', 'trap-warning-text', 'DANGER'));
  container.appendChild(warning);

  // Announcer
  if (announcerTrapRoom.length > 0) {
    const line = pickRandom(announcerTrapRoom, state.rng);
    container.appendChild(renderAnnouncer(line, { size: 'sm', skipTypewriter: true }));
  }

  // Description
  const desc = el('div', 'trap-description', trap.description);
  container.appendChild(desc);

  // Choices
  const choices = el('div', 'trap-choices');

  const riskBtn = el('button', 'btn btn-action trap-choice-risk', trap.riskChoice);
  riskBtn.addEventListener('click', () => {
    audio.playButtonClick();
    resolveRisk(trap, container, onTransition);
  });
  choices.appendChild(riskBtn);

  const safeBtn = el('button', 'btn btn-action trap-choice-safe', trap.safeChoice);
  safeBtn.addEventListener('click', () => {
    audio.playButtonClick();
    resolveSafe(container, onTransition);
  });
  choices.appendChild(safeBtn);

  container.appendChild(choices);
}

function resolveRisk(trap: TrapRoom, container: HTMLElement, onTransition: (next: GamePhase) => void): void {
  const state = getRunState();
  const success = state.rng() < trap.riskSuccessChance;

  container.innerHTML = '';
  container.className = 'screen trap-screen';

  if (success) {
    audio.playGoldPickup();
    const result = el('div', 'trap-result trap-result-success');

    if (typeof trap.riskReward === 'number') {
      result.textContent = `Success! You found ${trap.riskReward} gold!`;
      modifyRun(s => {
        s.gold += trap.riskReward as number;
        s.viewers = updateEntertainment(s.viewers, 'risky_action');
      });
    } else {
      result.textContent = `Success! You found ${trap.riskReward.name}!`;
      modifyRun(s => {
        s.itemsFound.push((trap.riskReward as import('../../types').GameItem).id);
        s.inventory.push(trap.riskReward as import('../../types').GameItem);
        s.viewers = updateEntertainment(s.viewers, 'risky_action');
      });
    }

    container.appendChild(result);
  } else {
    triggerViewerChat('trap_triggered');
    audio.playHit(trap.riskDamage);
    const result = el('div', 'trap-result trap-result-failure');
    result.textContent = `Failed! You take ${trap.riskDamage} damage!`;
    container.appendChild(result);

    modifyRun(s => {
      s.hp = clamp(s.hp - trap.riskDamage, 0, s.maxHp);
      s.viewers = updateEntertainment(s.viewers, 'took_damage');
    });
  }

  updateHud();

  if (state.hp <= 0) {
    setTimeout(() => onTransition('death'), 1500);
    return;
  }

  const actions = el('div', 'screen-actions');
  const continueBtn = el('button', 'btn btn-action btn-action-primary', 'Continue');
  continueBtn.addEventListener('click', () => {
    modifyRun(s => {
      s.roomsExplored++;
      if (s.currentRoom) s.currentRoom.explored = true;
      s.phase = 'floor_map';
    });
    onTransition('floor_map');
  });
  actions.appendChild(continueBtn);
  container.appendChild(actions);
}

function resolveSafe(container: HTMLElement, onTransition: (next: GamePhase) => void): void {
  container.innerHTML = '';
  container.className = 'screen trap-screen';

  const result = el('div', 'trap-result trap-result-success');
  result.textContent = 'You carefully avoid the trap. Smart, but boring.';
  container.appendChild(result);

  modifyRun(s => {
    s.viewers = updateEntertainment(s.viewers, 'stalling');
  });

  updateHud();

  const actions = el('div', 'screen-actions');
  const continueBtn = el('button', 'btn btn-action btn-action-primary', 'Continue');
  continueBtn.addEventListener('click', () => {
    modifyRun(s => {
      s.roomsExplored++;
      if (s.currentRoom) s.currentRoom.explored = true;
      s.phase = 'floor_map';
    });
    onTransition('floor_map');
  });
  actions.appendChild(continueBtn);
  container.appendChild(actions);
}
