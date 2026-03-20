import { el, pickRandom, clamp } from '../../utils';
import { getRunState, modifyRun } from '../../engine/state';
import { updateHud } from '../components/hud';
import { renderItemCard } from '../components/item-card';
import { renderAnnouncer } from '../components/announcer';
import { announcerItemPickup } from '../../data/announcer-lines';
import type { GamePhase, LootRoom, GameItem } from '../../types';

export function renderLootScreen(container: HTMLElement, onTransition: (next: GamePhase) => void): void {
  container.innerHTML = '';
  container.className = 'screen loot-screen screen-scrollable';

  const state = getRunState();
  const room = state.currentRoom;
  if (!room) return;

  const loot = room.data as LootRoom;

  // Header
  const header = el('div', 'loot-header');
  header.appendChild(el('div', 'loot-header-icon', '\uD83C\uDF81'));
  header.appendChild(el('div', 'loot-header-text', 'LOOT FOUND'));
  container.appendChild(header);

  // Trap check
  if (loot.trapped && loot.trapDamage) {
    const trapMsg = el('div', 'trap-result trap-result-failure');
    trapMsg.textContent = `It was trapped! You take ${loot.trapDamage} damage!`;
    container.appendChild(trapMsg);

    modifyRun(s => {
      s.hp = clamp(s.hp - loot.trapDamage!, 0, s.maxHp);
    });
    updateHud();

    if (state.hp <= 0) {
      setTimeout(() => onTransition('death'), 1500);
      return;
    }
  }

  // Announcer
  if (announcerItemPickup.length > 0) {
    const line = pickRandom(announcerItemPickup, state.rng);
    container.appendChild(renderAnnouncer(line, { size: 'sm', skipTypewriter: true }));
  }

  // Items
  const itemsContainer = el('div', 'loot-items');

  if (loot.items.length === 0) {
    itemsContainer.appendChild(el('div', 'text-dim text-center', 'The room is empty. Someone got here first.'));
  }

  for (const item of loot.items) {
    const card = renderItemCard(item, () => {
      pickUpItem(item);
      updateHud();
      renderLootScreen(container, onTransition);
    });
    card.classList.add('loot-item-card');
    itemsContainer.appendChild(card);
  }

  container.appendChild(itemsContainer);

  // Actions
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

function pickUpItem(item: GameItem): void {
  modifyRun(s => {
    s.itemsFound.push(item.id);
    if (item.slot === 'consumable') {
      s.consumables.push(item);
      return;
    }
    const slot = item.slot as 'weapon' | 'armor' | 'accessory';
    if (!s.equipment[slot]) {
      s.equipment[slot] = item;
    } else {
      s.inventory.push(item);
    }
  });
}
