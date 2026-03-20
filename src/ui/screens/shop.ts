import { el, pickRandom } from '../../utils';
import { getRunState, modifyRun } from '../../engine/state';
import { updateHud } from '../components/hud';
import { renderItemCard } from '../components/item-card';
import { renderAnnouncer } from '../components/announcer';
import { announcerShop } from '../../data/announcer-lines';
import { vendorTemplates } from '../../data/shops';
import type { GamePhase, ShopRoom, GameItem } from '../../types';

export function renderShopScreen(container: HTMLElement, onTransition: (next: GamePhase) => void): void {
  container.innerHTML = '';
  container.className = 'screen shop-screen screen-scrollable';

  const state = getRunState();
  const room = state.currentRoom;
  if (!room) return;

  const shop = room.data as ShopRoom;

  // Pick a vendor template for personality
  const vendor = vendorTemplates.length > 0
    ? pickRandom(vendorTemplates, state.rng)
    : null;

  // Vendor display
  const vendorArea = el('div', 'shop-vendor');
  vendorArea.appendChild(el('div', 'shop-vendor-emoji', vendor?.emoji ?? '\uD83E\uDDD1'));
  vendorArea.appendChild(el('div', 'shop-vendor-name', vendor?.name ?? shop.vendorName));
  vendorArea.appendChild(el('div', 'shop-vendor-dialogue', vendor?.greeting ?? shop.vendorGreeting));
  container.appendChild(vendorArea);

  // Announcer
  if (announcerShop.length > 0) {
    const line = pickRandom(announcerShop, state.rng);
    container.appendChild(renderAnnouncer(line, { size: 'sm', skipTypewriter: true }));
  }

  // Gold display
  const goldDisplay = el('div', 'shop-gold-display');
  goldDisplay.appendChild(el('span', undefined, '\uD83D\uDCB0'));
  const goldValue = el('span', undefined, `${state.gold} gold`);
  goldValue.id = 'shop-gold';
  goldDisplay.appendChild(goldValue);
  container.appendChild(goldDisplay);

  // Heal option
  if (state.hp < state.maxHp) {
    const healSection = el('div', 'shop-heal');
    healSection.appendChild(el('div', 'shop-heal-icon', '\u2764\uFE0F'));
    healSection.appendChild(el('div', 'shop-heal-text', `Heal to full HP`));
    healSection.appendChild(el('div', 'shop-heal-price', `Cost: ${shop.healCost} gold`));

    if (state.gold >= shop.healCost) {
      healSection.addEventListener('click', () => {
        modifyRun(s => {
          s.gold -= shop.healCost;
          s.hp = s.maxHp;
        });
        updateHud();
        renderShopScreen(container, onTransition);
      });
    } else {
      healSection.classList.add('too-expensive');
    }

    container.appendChild(healSection);
  }

  // Items for sale
  const itemsContainer = el('div', 'shop-items');

  if (shop.inventory.length === 0) {
    itemsContainer.appendChild(el('div', 'text-dim text-center', 'Nothing for sale... the shelves are bare.'));
  }

  const soldItems = new Set<number>();

  for (let i = 0; i < shop.inventory.length; i++) {
    const { item, price } = shop.inventory[i];
    const canAfford = state.gold >= price;
    const isSold = soldItems.has(i);

    const shopItem = el('div', `shop-item${isSold ? ' sold-out' : !canAfford ? ' too-expensive' : ''}`);

    const itemCard = renderItemCard(item);
    itemCard.style.border = 'none';
    itemCard.style.padding = '0';
    itemCard.style.background = 'none';
    shopItem.appendChild(itemCard);

    if (isSold) {
      shopItem.appendChild(el('div', 'shop-item-sold', 'SOLD'));
    } else {
      const priceEl = el('div', 'shop-item-price');
      priceEl.appendChild(el('span', undefined, '\uD83D\uDCB0'));
      priceEl.appendChild(el('span', undefined, `${price}`));
      shopItem.appendChild(priceEl);
    }

    if (!isSold && canAfford) {
      shopItem.addEventListener('click', () => {
        modifyRun(s => {
          s.gold -= price;
          equipOrStoreItem(s, item);
        });
        soldItems.add(i);
        updateHud();
        renderShopScreen(container, onTransition);
      });
    }

    itemsContainer.appendChild(shopItem);
  }

  container.appendChild(itemsContainer);

  // Leave button
  const actions = el('div', 'screen-actions');
  const leaveBtn = el('button', 'btn btn-action', 'Leave Shop');
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

function equipOrStoreItem(state: import('../../types').RunState, item: GameItem): void {
  state.itemsFound.push(item.id);

  if (item.slot === 'consumable') {
    state.consumables.push(item);
    return;
  }

  // Auto-equip if slot is empty
  const slot = item.slot as 'weapon' | 'armor' | 'accessory';
  if (!state.equipment[slot]) {
    state.equipment[slot] = item;
  } else {
    state.inventory.push(item);
  }
}
