import { el } from '../../utils';
import { getRunState } from '../../engine/state';
import { calculateSP } from '../../engine/progression';
import { pickRandom } from '../../utils';
import { announcerDeath } from '../../data/announcer-lines';
import { renderAnnouncer } from '../components/announcer';
import { getClassById } from '../../data/classes';
import { getCatClassById } from '../../data/cat-classes';
import { audio } from '../../engine/audio';
import { triggerViewerChat } from '../components/viewer-chat';
import type { GamePhase } from '../../types';

export function renderDeathScreen(
  container: HTMLElement,
  onTransition: (next: GamePhase) => void,
  earnedSP: number
): void {
  container.innerHTML = '';
  container.className = 'screen death-screen screen-scrollable';

  audio.playDeath();
  audio.stopAmbient();
  triggerViewerChat('player_death');

  let state;
  try {
    state = getRunState();
  } catch {
    state = null;
  }

  // Header
  const header = el('div', 'death-header');
  header.appendChild(el('div', 'death-icon', '\uD83D\uDC80'));
  header.appendChild(el('div', 'death-title', 'SHOW CANCELLED'));
  header.appendChild(el('div', 'death-subtitle', 'The ratings have spoken.'));
  container.appendChild(header);

  // Announcer
  if (announcerDeath.length > 0) {
    const line = announcerDeath[Math.floor(Math.random() * announcerDeath.length)];
    container.appendChild(renderAnnouncer(line, { size: 'sm', skipTypewriter: true }));
  }

  // Stats
  if (state) {
    const playerClass = getClassById(state.playerClass);
    const catClass = getCatClassById(state.catClass);

    const stats = el('div', 'death-stats');

    const statEntries: [string, string][] = [
      ['Class', `${playerClass?.emoji ?? ''} ${playerClass?.name ?? state.playerClass}`],
      ['Level Reached', `${state.playerLevel}`],
      ['Floor Reached', `B${state.floorNumber}`],
      ['Enemies Defeated', `${state.enemiesDefeated.length}`],
      ['Gold Earned', `${state.gold}`],
      ['Peak Viewers', `${state.viewers.peak}`],
      ['Rooms Explored', `${state.roomsExplored}`],
      ['Items Found', `${state.itemsFound.length}`],
      ['Armor Class', `${state.armorClass}`],
      ['Cat Class', `${catClass?.emoji ?? '\uD83D\uDC08'} ${catClass?.name ?? 'Cat'}`],
      ['Cat Level', `${state.cat.level} (${state.cat.name})`],
      ['Spells Known', `${state.spells.length}`],
      ['Mana Remaining', `${state.mana}/${state.maxMana}`],
    ];

    for (const [label, value] of statEntries) {
      const row = el('div', 'death-stat');
      row.appendChild(el('span', 'death-stat-label', label));
      row.appendChild(el('span', 'death-stat-value', value));
      stats.appendChild(row);
    }

    container.appendChild(stats);
  }

  // SP earned
  const spSection = el('div', 'death-sp-earned');
  spSection.appendChild(el('div', 'death-sp-label', 'STAIRWELL POINTS EARNED'));
  spSection.appendChild(el('div', 'death-sp-value', `+${earnedSP}`));

  if (state) {
    const sp = calculateSP(state);
    const breakdown = `Floors: ${state.floorNumber * 10} | Kills: ${state.enemiesDefeated.length * 5} | Viewers: ${Math.floor(state.viewers.peak / 10)}`;
    spSection.appendChild(el('div', 'death-sp-breakdown', breakdown));
  }

  container.appendChild(spSection);

  // Actions
  const actions = el('div', 'death-actions');

  const againBtn = el('button', 'btn btn-action btn-action-primary', 'Descend Again');
  againBtn.addEventListener('click', () => {
    audio.playButtonClick();
    onTransition('run_setup');
  });
  actions.appendChild(againBtn);

  const shopBtn = el('button', 'btn btn-action', 'Spend Points');
  shopBtn.addEventListener('click', () => {
    audio.playButtonClick();
    onTransition('meta_shop');
  });
  actions.appendChild(shopBtn);

  const titleBtn = el('button', 'btn btn-ghost', 'Title Screen');
  titleBtn.addEventListener('click', () => {
    audio.playButtonClick();
    onTransition('title');
  });
  actions.appendChild(titleBtn);

  container.appendChild(actions);
}
