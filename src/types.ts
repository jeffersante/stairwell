// === Core Types ===

export type GamePhase =
  | 'title' | 'run_setup' | 'floor_map' | 'room'
  | 'combat' | 'shop' | 'event' | 'rest' | 'loot' | 'trap' | 'crafting'
  | 'room_result' | 'floor_complete' | 'boss' | 'boss_result'
  | 'death' | 'meta_shop';

export type Rarity = 'common' | 'uncommon' | 'rare' | 'legendary' | 'cursed';
export type Slot = 'weapon' | 'armor' | 'accessory' | 'consumable';
export type RoomType = 'combat' | 'loot' | 'trap' | 'shop' | 'event' | 'rest';
export type StatusEffect = 'poison' | 'stun' | 'bleed' | 'cursed' | 'on_fire' | 'existential_dread';
export type FloorTheme = 'lobby' | 'offices' | 'executive' | 'maintenance' | 'archives' | 'basement';
export type MaterialTag = 'metal' | 'organic' | 'electrical' | 'supernatural' | 'paper' | 'chemical' | 'fabric' | 'liquid';

// === Player Stats (D&D Style) ===

export interface PlayerStats {
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
}

export type DieType = 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20';

export interface DiceRoll {
  die: DieType;
  count: number;
  modifier: number;
  results: number[];
  total: number;
  isCritical: boolean;
  isFumble: boolean;
}

// === Player Class System ===

export type PlayerClassName = 'janitor' | 'it_specialist' | 'hr_manager' | 'intern' | 'night_security' | 'accountant';

export interface PlayerClass {
  id: PlayerClassName;
  name: string;
  emoji: string;
  description: string;
  flavorText: string;
  statBonuses: Partial<PlayerStats>;
  startingWeaponId: string;
  startingArmorId?: string;
  signatureAbility: ClassAbility;
  abilityTree: ClassAbility[];
}

export interface ClassAbility {
  name: string;
  description: string;
  levelRequired: number;
  cooldown: number;
  manaCost?: number;
  effect: ClassAbilityEffect;
}

export type ClassAbilityEffect =
  | { type: 'damage'; dice: string; bonus: number }
  | { type: 'heal'; amount: number }
  | { type: 'buff'; stat: keyof PlayerStats; amount: number; duration: number }
  | { type: 'debuff_enemy'; effect: StatusEffect; duration: number }
  | { type: 'aoe_damage'; dice: string }
  | { type: 'viewer_boost'; amount: number }
  | { type: 'gold_convert'; ratio: number }
  | { type: 'reroll' }
  | { type: 'stun'; duration: number }
  | { type: 'reveal' };

// === Magic System ===

export type SpellSchool = 'structural' | 'hvac' | 'electrical' | 'plumbing' | 'eldritch_filing';

export interface Spell {
  id: string;
  name: string;
  school: SpellSchool;
  description: string;
  flavorText: string;
  manaCost: number;
  damage?: string;
  healing?: number;
  statusEffect?: StatusEffect;
  statusDuration?: number;
  special?: string;
  levelRequired: number;
}

// === Items ===

export interface ItemAction {
  name: string;
  damage?: number;
  damageDice?: string;
  hitBonus?: number;
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
  materialTags?: MaterialTag[];
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
  armorClass: number;
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
  // v2: Player class & stats
  playerStats: PlayerStats;
  playerClass: PlayerClassName;
  catClass: CatClassName;
  playerLevel: number;
  playerXp: number;
  armorClass: number;
  mana: number;
  maxMana: number;
  spells: Spell[];
  classAbilityCooldowns: Record<string, number>;
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

// === Floor Theme Data ===

export interface FloorHazard {
  name: string;
  description: string;
  effect: 'damage' | 'debuff' | 'miss_chance' | 'slow' | 'curse' | 'random';
  value: number;
  statusEffect?: StatusEffect;
  statusDuration?: number;
  triggerChance: number;
  mitigation: string;
}

export interface FloorThemeData {
  id: FloorTheme;
  name: string;
  floorRange: [number, number];
  description: string;
  colorAccent: string;
  roomNames: string[];
  hazards: FloorHazard[];
}

// === Cat Class System ===

export type CatClassName = 'shadow_cat' | 'battle_cat' | 'mystic_cat' | 'alley_cat';

export interface CatClassAbility {
  name: string;
  description: string;
  levelRequired: number;
  cooldown: number;
  damage?: number;
  healing?: number;
  effect?: 'skip_enemy_turn' | 'reveal_trap' | 'steal_item' | 'heal_player' | 'crit_boost' | 'shield' | 'mana_restore' | 'gold_steal' | 'dodge';
  effectValue?: number;
}

export interface CatClass {
  id: CatClassName;
  name: string;
  emoji: string;
  description: string;
  flavorText: string;
  passive: { name: string; description: string; effect: string; value: number };
  abilities: CatClassAbility[];
}

// === Viewer Chat System ===

export type ViewerChatTrigger =
  | 'combat_start' | 'critical_hit' | 'fumble' | 'player_death'
  | 'cat_action' | 'low_hp' | 'boss_encounter' | 'boss_kill'
  | 'level_up' | 'item_pickup' | 'shop_visit' | 'rest'
  | 'event_choice' | 'floor_clear' | 'high_viewers' | 'trap_triggered'
  | 'spell_cast' | 'enemy_kill' | 'gold_pickup' | 'cat_bond';

export interface ViewerChatMessage {
  trigger: ViewerChatTrigger;
  messages: string[];
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
