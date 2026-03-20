import { el, pickRandom, clamp } from '../../utils';
import { getRunState, modifyRun } from '../../engine/state';
import { updateHud } from '../components/hud';
import { updateBond } from '../../engine/cat';
import { catGainXp } from '../../engine/cat';
import { renderCatPanel } from '../components/cat-panel';
import { renderAnnouncer } from '../components/announcer';
import { announcerRest } from '../../data/announcer-lines';
import { catMoodLines } from '../../data/cat-dialogue';
import { audio } from '../../engine/audio';
import { triggerViewerChat } from '../components/viewer-chat';
import type { GamePhase, RestRoom } from '../../types';

export function renderRestScreen(container: HTMLElement, onTransition: (next: GamePhase) => void): void {
  container.innerHTML = '';
  container.className = 'screen rest-screen screen-scrollable';

  const state = getRunState();
  const room = state.currentRoom;
  if (!room) return;

  const rest = room.data as RestRoom;

  // Rest area
  const restArea = el('div', 'rest-area');
  restArea.appendChild(el('div', 'rest-icon', '\uD83D\uDECB\uFE0F'));
  restArea.appendChild(el('div', 'rest-text', 'A quiet moment in the chaos.'));
  restArea.appendChild(el('div', 'rest-heal-text', `Rest here to heal ${rest.healAmount} HP`));
  container.appendChild(restArea);

  // Announcer
  if (announcerRest.length > 0) {
    const line = pickRandom(announcerRest, state.rng);
    container.appendChild(renderAnnouncer(line, { size: 'sm', skipTypewriter: true }));
  }

  // Cat panel with dialogue
  const moodLines = catMoodLines[state.cat.mood] ?? [];
  const catLine = moodLines.length > 0 ? pickRandom(moodLines, state.rng) : undefined;
  container.appendChild(renderCatPanel(state.cat, catLine));

  // Actions
  const actions = el('div', 'rest-options');

  triggerViewerChat('rest');

  const restBtn = el('button', 'btn btn-action btn-action-primary', `Rest (+${rest.healAmount} HP)`);
  restBtn.addEventListener('click', () => {
    audio.playHeal(rest.healAmount);
    modifyRun(s => {
      s.hp = clamp(s.hp + rest.healAmount, 0, s.maxHp);
      s.cat = updateBond(s.cat, rest.catBondGain);
    });
    updateHud();

    // Show healed state
    restBtn.textContent = 'Rested!';
    (restBtn as HTMLButtonElement).disabled = true;
    restBtn.classList.add('rest-heal-animation');
  });
  actions.appendChild(restBtn);

  const petBtn = el('button', 'btn btn-action', `Pet ${state.cat.name}`);
  petBtn.addEventListener('click', () => {
    audio.playCatPurr();
    triggerViewerChat('cat_bond');
    modifyRun(s => {
      s.cat = updateBond(s.cat, 10);
      const result = catGainXp(s.cat, 5);
      s.cat = result.cat;
    });
    updateHud();
    petBtn.textContent = `${state.cat.name} purrs...`;
    (petBtn as HTMLButtonElement).disabled = true;
  });
  actions.appendChild(petBtn);

  const leaveBtn = el('button', 'btn btn-ghost', 'Leave');
  leaveBtn.addEventListener('click', () => {
    modifyRun(s => {
      s.roomsExplored++;
      if (s.currentRoom) s.currentRoom.explored = true;
      s.phase = 'floor_map';
    });
    onTransition('floor_map');
  });
  actions.appendChild(leaveBtn);

  container.appendChild(actions);
}
