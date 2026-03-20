import { el } from '../../utils';
import { getMetaState, modifyMeta, saveMetaState } from '../../engine/state';
import { canPurchaseUnlock, purchaseUnlock } from '../../engine/progression';
import { allUnlocks } from '../../data/unlocks';
import { audio } from '../../engine/audio';
import type { GamePhase } from '../../types';

const CATEGORY_EMOJI: Record<string, string> = {
  starting_item: '\u2694\uFE0F',
  cat_ability: '\uD83D\uDC08',
  floor_shortcut: '\uD83D\uDEAA',
  viewer_perk: '\uD83D\uDCFA',
  cosmetic: '\u2728',
};

export function renderMetaShopScreen(container: HTMLElement, onTransition: (next: GamePhase) => void): void {
  container.innerHTML = '';
  container.className = 'screen meta-shop-screen screen-scrollable';

  const meta = getMetaState();

  // Header
  const header = el('div', 'meta-shop-header');
  header.appendChild(el('div', 'meta-shop-title', 'STAIRWELL POINTS'));
  const spDisplay = el('div', 'meta-shop-sp');
  spDisplay.appendChild(el('span', undefined, '\u2B50'));
  const spValue = el('span', undefined, `${meta.stairwellPoints} SP`);
  spValue.id = 'meta-sp-value';
  spDisplay.appendChild(spValue);
  header.appendChild(spDisplay);
  container.appendChild(header);

  // Grid
  const grid = el('div', 'meta-shop-grid');

  if (allUnlocks.length === 0) {
    const emptyMsg = el('div', 'text-dim text-center');
    emptyMsg.style.gridColumn = '1 / -1';
    emptyMsg.style.padding = '32px 0';
    emptyMsg.textContent = 'No unlocks available yet. Keep descending!';
    grid.appendChild(emptyMsg);
  }

  for (const unlock of allUnlocks) {
    const purchased = meta.unlocks.includes(unlock.id);
    const canBuy = canPurchaseUnlock(unlock.id, meta);

    const item = el('div', `meta-shop-item${purchased ? ' purchased' : !canBuy ? ' locked' : ''}`);

    item.appendChild(el('div', 'meta-shop-item-icon', CATEGORY_EMOJI[unlock.category] ?? '\uD83D\uDCE6'));
    item.appendChild(el('div', 'meta-shop-item-name', unlock.name));
    item.appendChild(el('div', 'meta-shop-item-desc', unlock.description));

    if (purchased) {
      item.appendChild(el('div', 'meta-shop-item-purchased', 'OWNED'));
    } else {
      const cost = el('div', 'meta-shop-item-cost');
      cost.appendChild(el('span', undefined, '\u2B50'));
      cost.appendChild(el('span', undefined, `${unlock.cost} SP`));
      item.appendChild(cost);

      if (!canBuy) {
        item.appendChild(el('div', 'meta-shop-item-locked-text', 'Not enough SP'));
      }
    }

    if (!purchased && canBuy) {
      item.addEventListener('click', () => {
        audio.playButtonClick();
        audio.playItemPickup();
        const newMeta = purchaseUnlock(unlock.id, meta);
        modifyMeta(() => {
          Object.assign(meta, newMeta);
        });
        saveMetaState();
        renderMetaShopScreen(container, onTransition);
      });
    }

    grid.appendChild(item);
  }

  container.appendChild(grid);

  // Actions
  const actions = el('div', 'screen-actions');
  const backBtn = el('button', 'btn btn-action', 'Back');
  backBtn.addEventListener('click', () => {
    audio.playButtonClick();
    onTransition('title');
  });
  actions.appendChild(backBtn);
  container.appendChild(actions);
}
