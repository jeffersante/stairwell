import type { RunState, MetaState, CatState, Floor, ViewerState, GameItem } from '../types';
import { mulberry32 } from '../utils';
import { initCat } from './cat';
import { initViewers } from './viewers';
import { generateFloor } from './floor';
import { getStartingViewers } from './progression';

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

export function initRun(catName: string, startingItem: GameItem | null, seed?: number): void {
  const actualSeed = seed ?? Date.now();
  const rng = mulberry32(actualSeed);
  const cat = initCat(catName);
  const viewers = initViewers(getStartingViewers(metaState));
  const floor = generateFloor(1, rng);

  const initialEquipment = {
    weapon: null as GameItem | null,
    armor: null as GameItem | null,
    accessory: null as GameItem | null,
  };

  if (startingItem && (startingItem.slot === 'weapon' || startingItem.slot === 'armor' || startingItem.slot === 'accessory')) {
    initialEquipment[startingItem.slot as keyof typeof initialEquipment] = startingItem;
  }

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
    itemsFound: startingItem ? [startingItem.id] : [],
    enemiesDefeated: [],
    rng,
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
