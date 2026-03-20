import { el } from '../../utils';
import type { GameItem } from '../../types';

const SLOT_EMOJI: Record<string, string> = {
  weapon: '\u2694\uFE0F',
  armor: '\uD83D\uDEE1\uFE0F',
  accessory: '\uD83D\uDC8D',
  consumable: '\uD83E\uDDEA',
};

export function renderItemCard(item: GameItem, onClick?: () => void): HTMLElement {
  const card = el('div', `item-card rarity-${item.rarity}`);
  if (onClick) {
    card.style.cursor = 'pointer';
    card.addEventListener('click', onClick);
  }

  const icon = el('div', 'item-card-icon', SLOT_EMOJI[item.slot] ?? '\uD83D\uDCE6');
  card.appendChild(icon);

  const info = el('div', 'item-card-info');

  const name = el('div', `item-card-name rarity-${item.rarity}`, item.name);
  info.appendChild(name);

  const rarity = el('div', `item-card-rarity item-card-rarity-${item.rarity}`, `${item.rarity} ${item.slot}`);
  info.appendChild(rarity);

  const desc = el('div', 'item-card-desc', item.description);
  info.appendChild(desc);

  const flavor = el('div', 'item-card-flavor', item.flavorText);
  info.appendChild(flavor);

  // Stats
  const stats = el('div', 'item-card-stats');
  for (const action of item.actions) {
    if (action.damage) {
      const stat = el('span', 'item-card-stat positive', `${action.name}: ${action.damage} dmg`);
      stats.appendChild(stat);
    }
    if (action.healing) {
      const stat = el('span', 'item-card-stat positive', `${action.name}: +${action.healing} hp`);
      stats.appendChild(stat);
    }
    if (action.statusEffect) {
      const stat = el('span', 'item-card-stat negative', `${action.statusEffect}`);
      stats.appendChild(stat);
    }
  }
  if (item.passive) {
    const stat = el('span', 'item-card-stat positive', `Passive: ${item.passive.type.replace(/_/g, ' ')} +${item.passive.value}`);
    stats.appendChild(stat);
  }
  if (item.cursedDownside) {
    const stat = el('span', 'item-card-stat negative', `Curse: ${item.cursedDownside}`);
    stats.appendChild(stat);
  }
  info.appendChild(stats);

  card.appendChild(info);
  return card;
}
