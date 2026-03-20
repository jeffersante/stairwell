import type { RunState, MetaState, GameItem, PlayerClassName, CatClassName } from '../types';
import { mulberry32 } from '../utils';
import { initCat } from './cat';
import { initViewers } from './viewers';
import { generateFloor } from './floor';
import { getStartingViewers } from './progression';
import { rollStats, getStatModifier } from './dice';
import { getClassById } from '../data/classes';
import { allItems } from '../data/items';

const META_STORAGE_KEY = 'stairwell_meta';

let runState: RunState | null = null;
let metaState: MetaState = loadMetaState();

export function getRunState(): RunState {
  if (!runState) throw new Error('No active run');
  return runState;
}

export function getMetaState(): MetaState {
  return metaState;
}

export function modifyRun(fn: (state: RunState) => void): void {
  if (!runState) throw new Error('No active run');
  fn(runState);
}

export function modifyMeta(fn: (state: MetaState) => void): void {
  fn(metaState);
}

export function initRun(
  catName: string,
  startingItem: GameItem | null,
  seed?: number,
  playerClassName?: PlayerClassName,
  catClassName?: CatClassName
): void {
  const actualSeed = seed ?? Date.now();
  const rng = mulberry32(actualSeed);
  const cat = initCat(catName);
  const viewers = initViewers(getStartingViewers(metaState));
  const floor = generateFloor(1, rng);

  // Roll stats and apply class bonuses
  const className: PlayerClassName = playerClassName ?? 'intern';
  const playerClass = getClassById(className);
  let stats = rollStats(rng);

  if (className === 'intern') {
    // Intern starts with all 8s
    stats = { str: 8, dex: 8, con: 8, int: 8, wis: 8, cha: 8 };
  }

  // Apply class stat bonuses
  if (playerClass) {
    for (const [stat, bonus] of Object.entries(playerClass.statBonuses)) {
      stats[stat as keyof typeof stats] += bonus as number;
    }
  }

  // Calculate AC from base 10 + DEX modifier + armor
  const dexMod = getStatModifier(stats.dex);
  let armorClass = 10 + dexMod;

  // Starting mana = 4 + INT modifier (min 2)
  const intMod = getStatModifier(stats.int);
  const maxMana = Math.max(4 + intMod, 2);

  const initialEquipment = {
    weapon: null as GameItem | null,
    armor: null as GameItem | null,
    accessory: null as GameItem | null,
  };

  // Equip class starting items
  if (playerClass) {
    const startingWeapon = allItems.find(i => i.id === playerClass.startingWeaponId);
    if (startingWeapon) {
      initialEquipment.weapon = startingWeapon;
    }
    if (playerClass.startingArmorId) {
      const startingArmor = allItems.find(i => i.id === playerClass.startingArmorId);
      if (startingArmor) {
        initialEquipment.armor = startingArmor;
        armorClass += 2;
      }
    }
  }

  // Override with explicitly provided starting item
  if (startingItem && (startingItem.slot === 'weapon' || startingItem.slot === 'armor' || startingItem.slot === 'accessory')) {
    initialEquipment[startingItem.slot as keyof typeof initialEquipment] = startingItem;
  }

  const itemsFound: string[] = [];
  if (initialEquipment.weapon) itemsFound.push(initialEquipment.weapon.id);
  if (initialEquipment.armor) itemsFound.push(initialEquipment.armor.id);
  if (startingItem) itemsFound.push(startingItem.id);

  runState = {
    phase: 'floor_map',
    floor,
    floorNumber: 1,
    hp: 100,
    maxHp: 100,
    gold: 0,
    equipment: initialEquipment,
    consumables: startingItem?.slot === 'consumable' ? [startingItem] : [],
    inventory: [],
    cat,
    viewers,
    currentRoom: null,
    combatState: null,
    roomsExplored: 0,
    itemsFound,
    enemiesDefeated: [],
    rng,
    // v2 fields
    playerStats: stats,
    playerClass: className,
    catClass: catClassName ?? 'alley_cat',
    playerLevel: 1,
    playerXp: 0,
    armorClass,
    mana: maxMana,
    maxMana,
    spells: [],
    classAbilityCooldowns: {},
  };
}

export function endRun(): number {
  if (!runState) return 0;
  const sp = calculateRunSP(runState);

  metaState.totalRuns++;
  metaState.stairwellPoints += sp;
  metaState.totalPoints += sp;
  if (runState.floorNumber > metaState.deepestFloor) {
    metaState.deepestFloor = runState.floorNumber;
  }
  if (runState.viewers.peak > metaState.stats.peakViewers) {
    metaState.stats.peakViewers = runState.viewers.peak;
  }
  metaState.stats.totalKills += runState.enemiesDefeated.length;
  metaState.stats.totalItemsFound += runState.itemsFound.length;
  if (runState.cat.level > metaState.stats.catHighestLevel) {
    metaState.stats.catHighestLevel = runState.cat.level;
  }

  saveMetaState();
  runState = null;
  return sp;
}

function calculateRunSP(state: RunState): number {
  return (
    state.floorNumber * 10 +
    state.enemiesDefeated.length * 5 +
    Math.floor(state.viewers.peak / 10)
  );
}

export function saveMetaState(): void {
  try {
    localStorage.setItem(META_STORAGE_KEY, JSON.stringify(metaState));
  } catch {
    // localStorage may be unavailable
  }
}

export function loadMetaState(): MetaState {
  try {
    const saved = localStorage.getItem(META_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved) as MetaState;
    }
  } catch {
    // localStorage may be unavailable
  }
  return getDefaultMetaState();
}

export function getDefaultMetaState(): MetaState {
  return {
    stairwellPoints: 0,
    totalPoints: 0,
    deepestFloor: 0,
    totalRuns: 0,
    unlocks: [],
    settings: {
      musicOn: true,
      sfxOn: true,
      announcerFrequency: 'all',
    },
    stats: {
      totalKills: 0,
      totalGoldEarned: 0,
      totalItemsFound: 0,
      peakViewers: 0,
      bossesDefeated: 0,
      deathsByTrap: 0,
      deathsByEnemy: 0,
      deathsByBoss: 0,
      catHighestLevel: 0,
    },
  };
}

export function isRunActive(): boolean {
  return runState !== null;
}
