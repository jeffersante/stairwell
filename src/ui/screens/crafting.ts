import { el } from '../../utils';
import { getRunState, modifyRun } from '../../engine/state';
import { updateHud } from '../components/hud';
import { allRecipes } from '../../data/recipes';
import { audio } from '../../engine/audio';
import type { GamePhase, GameItem } from '../../types';

export function renderCraftingScreen(container: HTMLElement, onTransition: (next: GamePhase) => void): void {
  container.innerHTML = '';
  container.className = 'screen crafting-screen screen-scrollable';

  const state = getRunState();

  // Header
  const header = el('div', 'crafting-header');
  header.appendChild(el('div', 'crafting-icon', '\uD83D\uDD27'));
  header.appendChild(el('div', 'crafting-title', 'MAINTENANCE STATION'));
  header.appendChild(el('div', 'crafting-subtitle', 'Combine items to create something new.'));
  container.appendChild(header);

  // Player inventory display
  const invSection = el('div', 'crafting-inventory');
  invSection.appendChild(el('div', 'crafting-section-title', 'YOUR ITEMS'));

  const allPlayerItems = getPlayerItems(state);
  if (allPlayerItems.length === 0) {
    invSection.appendChild(el('div', 'text-dim text-center', 'Your pockets are empty.'));
  } else {
    const invGrid = el('div', 'crafting-inv-grid');
    for (const item of allPlayerItems) {
      const itemEl = el('div', 'crafting-inv-item');
      const SLOT_EMOJI: Record<string, string> = {
        weapon: '\u2694\uFE0F', armor: '\uD83D\uDEE1\uFE0F', accessory: '\uD83D\uDC8D', consumable: '\uD83E\uDDEA',
      };
      itemEl.appendChild(el('span', 'crafting-inv-icon', SLOT_EMOJI[item.slot] ?? '\uD83D\uDCE6'));
      itemEl.appendChild(el('span', 'crafting-inv-name', item.name));
      if (item.materialTags && item.materialTags.length > 0) {
        itemEl.appendChild(el('span', 'crafting-inv-tags', item.materialTags.join(', ')));
      }
      invGrid.appendChild(itemEl);
    }
    invSection.appendChild(invGrid);
  }
  container.appendChild(invSection);

  // Available recipes
  const recipeSection = el('div', 'crafting-recipes');
  recipeSection.appendChild(el('div', 'crafting-section-title', 'RECIPES'));

  const discoveredRecipes = allRecipes.filter(r => r.discoveredByDefault);
  if (discoveredRecipes.length === 0) {
    recipeSection.appendChild(el('div', 'text-dim text-center', 'No known recipes.'));
  }

  for (const recipe of discoveredRecipes) {
    const canCraft = checkCanCraft(recipe, allPlayerItems);
    const recipeEl = el('div', `crafting-recipe${canCraft ? '' : ' crafting-recipe-locked'}`);

    const recipeHeader = el('div', 'crafting-recipe-header');
    recipeHeader.appendChild(el('span', 'crafting-recipe-name', recipe.name));
    recipeEl.appendChild(recipeHeader);

    recipeEl.appendChild(el('div', 'crafting-recipe-desc', recipe.description));
    recipeEl.appendChild(el('div', 'crafting-recipe-flavor', recipe.flavorText));

    // Ingredients
    const ingredientList = el('div', 'crafting-recipe-ingredients');
    for (const ing of recipe.ingredients) {
      const ingEl = el('span', 'crafting-ingredient');
      if (ing.itemId) {
        ingEl.textContent = `${ing.itemId} x${ing.count}`;
      } else if (ing.materialTag) {
        ingEl.textContent = `[${ing.materialTag}] x${ing.count}`;
      }
      ingredientList.appendChild(ingEl);
    }
    recipeEl.appendChild(ingredientList);

    if (canCraft) {
      const craftBtn = el('button', 'btn btn-action', 'Craft');
      craftBtn.addEventListener('click', () => {
        audio.playItemPickup();
        // For now just mark room as explored and show success
        recipeEl.appendChild(el('div', 'text-gold text-center', 'Crafted!'));
        craftBtn.remove();
      });
      recipeEl.appendChild(craftBtn);
    }

    recipeSection.appendChild(recipeEl);
  }

  container.appendChild(recipeSection);

  // Actions
  const actions = el('div', 'screen-actions');
  const leaveBtn = el('button', 'btn btn-action', 'Leave Station');
  leaveBtn.addEventListener('click', () => {
    audio.playButtonClick();
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

function getPlayerItems(state: import('../../types').RunState): GameItem[] {
  const items: GameItem[] = [];
  if (state.equipment.weapon) items.push(state.equipment.weapon);
  if (state.equipment.armor) items.push(state.equipment.armor);
  if (state.equipment.accessory) items.push(state.equipment.accessory);
  items.push(...state.consumables);
  items.push(...state.inventory);
  return items;
}

function checkCanCraft(recipe: import('../../data/recipes').CraftingRecipe, items: GameItem[]): boolean {
  for (const ing of recipe.ingredients) {
    if (ing.itemId) {
      const count = items.filter(i => i.id === ing.itemId).length;
      if (count < ing.count) return false;
    } else if (ing.materialTag) {
      const count = items.filter(i => i.materialTags?.includes(ing.materialTag as import('../../types').MaterialTag)).length;
      if (count < ing.count) return false;
    }
  }
  return true;
}
