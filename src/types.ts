// === Core Types ===

export type GamePhase =
  | 'title' | 'run_setup' | 'floor_map' | 'room'
  | 'combat' | 'shop' | 'event' | 'rest' | 'loot' | 'trap'
  | 'room_result' | 'floor_complete' | 'boss' | 'boss_result'
  | 'death' | 'meta_shop';

export type Rarity = 'common' | 'uncommon' | 'rare' | 'legendary' | 'cursed';
export type Slot = 'weapon' | 'armor' | 'accessory' | 'consumable';
export type RoomType = 'combat' | 'loot' | 'trap' | 'shop' | 'event' | 'rest';
export type StatusEffect = 'poison' | 'stun' | 'bleed' | 'cursed' | 'on_fire' | 'existential_dread';

// === Items ===

export interface ItemAction {
  name: string;
  damage?: number;
  healing?: number;
  shield?: number;
  statusEffect?: StatusEffect;
  statusDuration?: number;
  description: string;
  viewerBoost?: number;
}

export interface GameItem {
  id: string;
  name: string;
  rarity: Rarity;
  description: string;
  flavorText: string;
  slot: Slot;
  actions: ItemAction[];
  passive?: {
    type: 'viewer_boost' | 'gold_bonus' | 'hp_regen' | 'trap_detect' | 'shop_discount' | 'cat_bond';
    value: number;
  };
  cursedDownside?: string;
}

// === Enemies ===

export interface EnemyAction {
  name: string;
  damage: number;
  statusEffect?: StatusEffect;
  statusDuration?: number;
  telegraph: string;
}

export interface Enemy {
  id: string;
  name: string;
  emoji: string;
  description: string;
  floorRange: [number, number];
  hp: number;
  actions: EnemyAction[];
  lootTable: { itemId: string; weight: number }[];
  goldDrop: [number, number];
  xpDrop: number;
}

export interface Boss extends Enemy {
  title: string;
  phases: number;
  phaseThresholds: number[];
  specialMechanics: string;
}

// === Floor & Rooms ===

export interface Room {
  id: string;
  type: RoomType;
  name: string;
  explored: boolean;
  data: CombatRoom | LootRoom | TrapRoom | ShopRoom | EventRoom | RestRoom;
}

export interface CombatRoom {
  enemy: Enemy;
}

export interface LootRoom {
  items: GameItem[];
  trapped: boolean;
  trapDamage?: number;
}

export interface TrapRoom {
  name: string;
  description: string;
  riskChoice: string;
  safeChoice: string;
  riskReward: GameItem | number;
  riskDamage: number;
  riskSuccessChance: number;
}

export interface ShopRoom {
  vendorName: string;
  vendorGreeting: string;
  inventory: { item: GameItem; price: number }[];
  healCost: number;
}

export interface EventRoom {
  id: string;
  title: string;
  description: string;
  choices: EventChoice[];
}

export interface EventChoice {
  text: string;
  outcome: {
    description: string;
    hpChange?: number;
    goldChange?: number;
    itemGained?: string;
    itemLost?: boolean;
    viewerChange?: number;
    catBondChange?: number;
  };
  weight?: number;
}

export interface RestRoom {
  healAmount: number;
  catBondGain: number;
  announcerLine: string;
}

export interface Floor {
  number: number;
  rooms: Room[];
  isBossFloor: boolean;
  boss?: Boss;
}

// === Cat Companion ===

export interface CatAbility {
  name: string;
  description: string;
  levelRequired: number;
  damage?: number;
  effect?: 'skip_enemy_turn' | 'reveal_trap' | 'steal_item' | 'heal_player';
  cooldown: number;
}

export interface CatState {
  name: string;
  level: number;
  bond: number;
  xp: number;
  abilities: CatAbility[];
  cooldowns: Record<string, number>;
  mood: 'aloof' | 'curious' | 'affectionate' | 'judging' | 'furious';
}

// === Viewer System ===

export interface ViewerState {
  count: number;
  peak: number;
  entertainmentMeter: number;
  sponsorReady: boolean;
  milestonesHit: number[];
}

// === Run State ===

export interface RunState {
  phase: GamePhase;
  floor: Floor;
  floorNumber: number;
  hp: number;
  maxHp: number;
  gold: number;
  equipment: {
    weapon: GameItem | null;
    armor: GameItem | null;
    accessory: GameItem | null;
  };
  consumables: GameItem[];
  inventory: GameItem[];
  cat: CatState;
  viewers: ViewerState;
  currentRoom: Room | null;
  combatState: CombatState | null;
  roomsExplored: number;
  itemsFound: string[];
  enemiesDefeated: string[];
  rng: () => number;
}

// === Combat State ===

export interface CombatState {
  enemy: Enemy;
  enemyHp: number;
  enemyMaxHp: number;
  turn: number;
  playerStatuses: { effect: StatusEffect; turns: number }[];
  enemyStatuses: { effect: StatusEffect; turns: number }[];
  enemyNextAction: EnemyAction;
  log: string[];
}

// === Meta State ===

export interface MetaState {
  stairwellPoints: number;
  totalPoints: number;
  deepestFloor: number;
  totalRuns: number;
  unlocks: string[];
  settings: {
    musicOn: boolean;
    sfxOn: boolean;
    announcerFrequency: 'all' | 'some' | 'critical';
  };
  stats: {
    totalKills: number;
    totalGoldEarned: number;
    totalItemsFound: number;
    peakViewers: number;
    bossesDefeated: number;
    deathsByTrap: number;
    deathsByEnemy: number;
    deathsByBoss: number;
    catHighestLevel: number;
  };
}

// === Meta Unlock ===

export interface MetaUnlock {
  id: string;
  name: string;
  description: string;
  cost: number;
  category: 'starting_item' | 'cat_ability' | 'floor_shortcut' | 'viewer_perk' | 'cosmetic';
  itemId?: string;
  value?: number;
}
