import { el } from '../../utils';
import { getMetaState } from '../../engine/state';
import { getStartingItems } from '../../engine/progression';
import type { GamePhase, GameItem } from '../../types';

export function renderRunSetupScreen(
  container: HTMLElement,
  onTransition: (next: GamePhase) => void,
  onStart: (catName: string, startingItem: GameItem | null) => void
): void {
  container.innerHTML = '';
  container.className = 'screen run-setup-screen screen-scrollable';

  const meta = getMetaState();
  const startingItems = getStartingItems(meta);
  let selectedItem: GameItem | null = null;

  // Cat naming section
  const catSection = el('div', 'setup-section setup-cat-naming');
  const catTitle = el('div', 'setup-section-title', 'NAME YOUR COMPANION');
  catSection.appendChild(catTitle);

  const catEmoji = el('div', 'setup-cat-emoji', '\uD83D\uDC08');
  catSection.appendChild(catEmoji);

  const catInput = document.createElement('input');
  catInput.className = 'setup-cat-input';
  catInput.type = 'text';
  catInput.placeholder = 'Enter cat name...';
  catInput.maxLength = 20;
  catInput.value = 'Whiskers';
  catSection.appendChild(catInput);

  container.appendChild(catSection);

  // Starting loadout section
  if (startingItems.length > 0) {
    const loadoutSection = el('div', 'setup-section');
    const loadoutTitle = el('div', 'setup-section-title', 'STARTING LOADOUT');
    loadoutSection.appendChild(loadoutTitle);

    const grid = el('div', 'setup-loadout-grid');
    for (const item of startingItems) {
      const card = el('div', 'setup-loadout-card');
      card.addEventListener('click', () => {
        grid.querySelectorAll('.setup-loadout-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        selectedItem = item;
      });

      const SLOT_EMOJI: Record<string, string> = {
        weapon: '\u2694\uFE0F', armor: '\uD83D\uDEE1\uFE0F', accessory: '\uD83D\uDC8D', consumable: '\uD83E\uDDEA',
      };
      const icon = el('div', 'setup-loadout-icon', SLOT_EMOJI[item.slot] ?? '\uD83D\uDCE6');
      card.appendChild(icon);

      const info = el('div', 'setup-loadout-info');
      info.appendChild(el('div', 'setup-loadout-name', item.name));
      info.appendChild(el('div', 'setup-loadout-desc', item.description));
      card.appendChild(info);

      grid.appendChild(card);
    }
    loadoutSection.appendChild(grid);
    container.appendChild(loadoutSection);
  }

  // No loadout — show empty hands option
  const emptySection = el('div', 'setup-section');
  const emptyCard = el('div', 'setup-loadout-card selected');
  emptyCard.appendChild(el('div', 'setup-loadout-icon', '\u270A'));
  const emptyInfo = el('div', 'setup-loadout-info');
  emptyInfo.appendChild(el('div', 'setup-loadout-name', 'Empty Hands'));
  emptyInfo.appendChild(el('div', 'setup-loadout-desc', 'Start with nothing. The building provides.'));
  emptyCard.appendChild(emptyInfo);
  emptyCard.addEventListener('click', () => {
    container.querySelectorAll('.setup-loadout-card').forEach(c => c.classList.remove('selected'));
    emptyCard.classList.add('selected');
    selectedItem = null;
  });
  emptySection.appendChild(emptyCard);
  container.appendChild(emptySection);

  // Actions
  const actions = el('div', 'screen-actions');
  const startBtn = el('button', 'btn btn-action btn-action-primary', 'Begin Descent');
  startBtn.addEventListener('click', () => {
    const catName = catInput.value.trim() || 'Whiskers';
    onStart(catName, selectedItem);
  });
  actions.appendChild(startBtn);

  const backBtn = el('button', 'btn btn-ghost', 'Back');
  backBtn.addEventListener('click', () => onTransition('title'));
  actions.appendChild(backBtn);

  container.appendChild(actions);
}
