import { el } from '../../utils';
import { getMetaState } from '../../engine/state';
import { getStartingItems } from '../../engine/progression';
import { allClasses } from '../../data/classes';
import { allCatClasses } from '../../data/cat-classes';
import { audio } from '../../engine/audio';
import type { GamePhase, GameItem, PlayerClassName, CatClassName } from '../../types';

export function renderRunSetupScreen(
  container: HTMLElement,
  onTransition: (next: GamePhase) => void,
  onStart: (catName: string, startingItem: GameItem | null, playerClassName: PlayerClassName, catClassName: CatClassName) => void
): void {
  container.innerHTML = '';
  container.className = 'screen run-setup-screen screen-scrollable';

  const meta = getMetaState();
  const startingItems = getStartingItems(meta);
  let selectedItem: GameItem | null = null;
  let selectedPlayerClass: PlayerClassName = 'intern';
  let selectedCatClass: CatClassName = 'alley_cat';

  // === Player Class Selection ===
  const classSection = el('div', 'setup-section');
  classSection.appendChild(el('div', 'setup-section-title', 'CHOOSE YOUR CLASS'));

  const classGrid = el('div', 'setup-class-grid');
  for (const pc of allClasses) {
    const card = el('div', `setup-class-card${pc.id === selectedPlayerClass ? ' selected' : ''}`);
    card.dataset.classId = pc.id;

    const cardHeader = el('div', 'setup-class-header');
    cardHeader.appendChild(el('span', 'setup-class-emoji', pc.emoji));
    cardHeader.appendChild(el('span', 'setup-class-name', pc.name));
    card.appendChild(cardHeader);

    card.appendChild(el('div', 'setup-class-desc', pc.description));

    // Stat bonuses
    const bonuses = Object.entries(pc.statBonuses);
    if (bonuses.length > 0) {
      const statsEl = el('div', 'setup-class-stats');
      for (const [stat, val] of bonuses) {
        statsEl.appendChild(el('span', 'setup-class-stat', `${stat.toUpperCase()} +${val}`));
      }
      card.appendChild(statsEl);
    }

    // Signature ability
    const sigEl = el('div', 'setup-class-ability');
    sigEl.appendChild(el('span', 'setup-class-ability-name', pc.signatureAbility.name));
    sigEl.appendChild(el('span', 'setup-class-ability-desc', pc.signatureAbility.description));
    card.appendChild(sigEl);

    card.addEventListener('click', () => {
      audio.playButtonClick();
      classGrid.querySelectorAll('.setup-class-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedPlayerClass = pc.id;
    });

    classGrid.appendChild(card);
  }
  classSection.appendChild(classGrid);
  container.appendChild(classSection);

  // === Cat Class Selection ===
  const catClassSection = el('div', 'setup-section');
  catClassSection.appendChild(el('div', 'setup-section-title', 'CHOOSE CAT CLASS'));

  const catClassGrid = el('div', 'setup-cat-class-grid');
  for (const cc of allCatClasses) {
    const card = el('div', `setup-class-card setup-cat-class-card${cc.id === selectedCatClass ? ' selected' : ''}`);
    card.dataset.classId = cc.id;

    const cardHeader = el('div', 'setup-class-header');
    cardHeader.appendChild(el('span', 'setup-class-emoji', cc.emoji));
    cardHeader.appendChild(el('span', 'setup-class-name', cc.name));
    card.appendChild(cardHeader);

    card.appendChild(el('div', 'setup-class-desc', cc.description));

    // Passive
    const passiveEl = el('div', 'setup-class-ability');
    passiveEl.appendChild(el('span', 'setup-class-ability-name', cc.passive.name));
    passiveEl.appendChild(el('span', 'setup-class-ability-desc', cc.passive.description));
    card.appendChild(passiveEl);

    card.addEventListener('click', () => {
      audio.playButtonClick();
      catClassGrid.querySelectorAll('.setup-cat-class-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedCatClass = cc.id as CatClassName;
    });

    catClassGrid.appendChild(card);
  }
  catClassSection.appendChild(catClassGrid);
  container.appendChild(catClassSection);

  // === Cat Naming ===
  const catSection = el('div', 'setup-section setup-cat-naming');
  catSection.appendChild(el('div', 'setup-section-title', 'NAME YOUR COMPANION'));

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

  // === Starting Loadout ===
  if (startingItems.length > 0) {
    const loadoutSection = el('div', 'setup-section');
    loadoutSection.appendChild(el('div', 'setup-section-title', 'STARTING LOADOUT'));

    const grid = el('div', 'setup-loadout-grid');
    for (const item of startingItems) {
      const card = el('div', 'setup-loadout-card');
      card.addEventListener('click', () => {
        audio.playButtonClick();
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

  // Empty hands option
  const emptySection = el('div', 'setup-section');
  const emptyCard = el('div', 'setup-loadout-card selected');
  emptyCard.appendChild(el('div', 'setup-loadout-icon', '\u270A'));
  const emptyInfo = el('div', 'setup-loadout-info');
  emptyInfo.appendChild(el('div', 'setup-loadout-name', 'Empty Hands'));
  emptyInfo.appendChild(el('div', 'setup-loadout-desc', 'Start with nothing. The building provides.'));
  emptyCard.appendChild(emptyInfo);
  emptyCard.addEventListener('click', () => {
    audio.playButtonClick();
    container.querySelectorAll('.setup-loadout-card').forEach(c => c.classList.remove('selected'));
    emptyCard.classList.add('selected');
    selectedItem = null;
  });
  emptySection.appendChild(emptyCard);
  container.appendChild(emptySection);

  // === Actions ===
  const actions = el('div', 'screen-actions');
  const startBtn = el('button', 'btn btn-action btn-action-primary', 'Begin Descent');
  startBtn.addEventListener('click', () => {
    audio.playButtonClick();
    const catName = catInput.value.trim() || 'Whiskers';
    onStart(catName, selectedItem, selectedPlayerClass, selectedCatClass);
  });
  actions.appendChild(startBtn);

  const backBtn = el('button', 'btn btn-ghost', 'Back');
  backBtn.addEventListener('click', () => {
    audio.playButtonClick();
    onTransition('title');
  });
  actions.appendChild(backBtn);

  container.appendChild(actions);
}
