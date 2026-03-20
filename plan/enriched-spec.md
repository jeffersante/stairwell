# Enriched Spec — Stairwell

> Combines spec.md + architecture decisions + resolved ambiguities.

---

## Overview

**Stairwell** is a roguelike browser game. The player descends an endless supernatural building, fighting enemies, collecting absurd loot, and being narrated by a deranged AI announcer — all while a snarky cat companion judges their every move. A "viewer count" system rewards entertaining play with sponsor drops.

**Stack:** Vanilla TypeScript + Vite + CSS. No backend. localStorage for meta-progression. Deployed as static site on Coolify/Hetzner at `stairwell.dizzylab.com`.

---

## Game State Machine (AD-3)

```
TITLE → RUN_SETUP → FLOOR_MAP → ROOM → [COMBAT|SHOP|EVENT|REST|LOOT|TRAP] → ROOM_RESULT → FLOOR_MAP
                                                                                              ↓ (all rooms done)
                                                                                        FLOOR_COMPLETE → FLOOR_MAP (next floor)
                                                                                              ↓ (every 5th)
                                                                                            BOSS → BOSS_RESULT → FLOOR_COMPLETE
                                                         DEATH (from combat/trap) → DEATH_SCREEN → META_SHOP → TITLE
```

---

## Data Models

```typescript
// === Core Types ===

type GamePhase =
  | 'title' | 'run_setup' | 'floor_map' | 'room'
  | 'combat' | 'shop' | 'event' | 'rest' | 'loot' | 'trap'
  | 'room_result' | 'floor_complete' | 'boss' | 'boss_result'
  | 'death' | 'meta_shop';

type Rarity = 'common' | 'uncommon' | 'rare' | 'legendary' | 'cursed';
type Slot = 'weapon' | 'armor' | 'accessory' | 'consumable';
type RoomType = 'combat' | 'loot' | 'trap' | 'shop' | 'event' | 'rest';
type StatusEffect = 'poison' | 'stun' | 'bleed' | 'cursed' | 'on_fire' | 'existential_dread';

// === Items ===

interface ItemAction {
  name: string;
  damage?: number;          // direct damage
  healing?: number;         // self-heal
  shield?: number;          // temp HP this turn
  statusEffect?: StatusEffect;
  statusDuration?: number;
  description: string;
  viewerBoost?: number;     // entertaining moves boost viewers
}

interface GameItem {
  id: string;
  name: string;
  rarity: Rarity;
  description: string;
  flavorText: string;
  slot: Slot;
  actions: ItemAction[];    // 1-2 actions per item
  passive?: {
    type: 'viewer_boost' | 'gold_bonus' | 'hp_regen' | 'trap_detect' | 'shop_discount' | 'cat_bond';
    value: number;
  };
  cursedDownside?: string;  // only for cursed items — description of penalty
}

// === Enemies ===

interface EnemyAction {
  name: string;
  damage: number;
  statusEffect?: StatusEffect;
  statusDuration?: number;
  telegraph: string;        // shown to player before enemy acts
}

interface Enemy {
  id: string;
  name: string;
  emoji: string;
  description: string;
  floorRange: [number, number]; // min/max floor this enemy appears
  hp: number;
  actions: EnemyAction[];
  lootTable: { itemId: string; weight: number }[];
  goldDrop: [number, number]; // min/max
  xpDrop: number;
}

interface Boss extends Enemy {
  title: string;            // e.g., "Guardian of Floor 5"
  phases: number;           // multi-phase boss (adds actions per phase)
  phaseThresholds: number[]; // HP% triggers
  specialMechanics: string;
}

// === Floor & Rooms ===

interface Room {
  id: string;
  type: RoomType;
  name: string;
  explored: boolean;
  data: CombatRoom | LootRoom | TrapRoom | ShopRoom | EventRoom | RestRoom;
}

interface CombatRoom {
  enemy: Enemy;
}

interface LootRoom {
  items: GameItem[];
  trapped: boolean;         // surprise trap on pickup
  trapDamage?: number;
}

interface TrapRoom {
  name: string;
  description: string;
  riskChoice: string;       // "Jump across?" / "Disarm?"
  safeChoice: string;       // "Go around" / "Avoid"
  riskReward: GameItem | number; // item or gold
  riskDamage: number;       // damage if fail
  riskSuccessChance: number; // 0-1, modified by items
}

interface ShopRoom {
  vendorName: string;
  vendorGreeting: string;
  inventory: { item: GameItem; price: number }[];
  healCost: number;         // gold per HP point
}

interface EventRoom {
  id: string;
  title: string;
  description: string;
  choices: EventChoice[];
}

interface EventChoice {
  text: string;
  outcome: {
    description: string;
    hpChange?: number;
    goldChange?: number;
    itemGained?: string;    // item ID
    itemLost?: boolean;     // lose random item
    viewerChange?: number;
    catBondChange?: number;
  };
  weight?: number;          // for weighted random outcomes
}

interface RestRoom {
  healAmount: number;       // base heal
  catBondGain: number;      // petting the cat
  announcerLine: string;    // grumbles about ratings
}

interface Floor {
  number: number;
  rooms: Room[];
  isBossFloor: boolean;
  boss?: Boss;
}

// === Cat Companion ===

interface CatAbility {
  name: string;
  description: string;
  levelRequired: number;
  damage?: number;
  effect?: 'skip_enemy_turn' | 'reveal_trap' | 'steal_item' | 'heal_player';
  cooldown: number;         // turns between uses
}

interface CatState {
  name: string;
  level: number;
  bond: number;             // 0-100, affects ability power
  xp: number;
  abilities: CatAbility[];
  cooldowns: Record<string, number>;
  mood: 'aloof' | 'curious' | 'affectionate' | 'judging' | 'furious';
}

// === Viewer System ===

interface ViewerState {
  count: number;
  peak: number;
  entertainmentMeter: number; // 0-100, decays over time
  sponsorReady: boolean;     // true when viewer milestone hit
  milestonesHit: number[];
}

// === Run State (not persisted) ===

interface RunState {
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
  consumables: GameItem[];   // belt slots (max 3)
  inventory: GameItem[];     // backup items (max 6)
  cat: CatState;
  viewers: ViewerState;
  currentRoom: Room | null;
  combatState: CombatState | null;
  roomsExplored: number;
  itemsFound: string[];      // IDs for journal
  enemiesDefeated: string[];
  rng: () => number;         // seeded RNG
}

interface CombatState {
  enemy: Enemy;
  enemyHp: number;
  enemyMaxHp: number;
  turn: number;
  playerStatuses: { effect: StatusEffect; turns: number }[];
  enemyStatuses: { effect: StatusEffect; turns: number }[];
  enemyNextAction: EnemyAction; // telegraphed
  log: string[];             // combat log entries
}

// === Meta State (persisted in localStorage) ===

interface MetaState {
  stairwellPoints: number;
  totalPoints: number;       // lifetime earned
  deepestFloor: number;
  totalRuns: number;
  unlocks: string[];         // unlock IDs purchased
  settings: {
    musicOn: boolean;
    sfxOn: boolean;
    announcerFrequency: 'all' | 'some' | 'critical'; // how chatty
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
```

---

## Combat Flow (AD-10)

1. **Start:** Enemy appears with description + announcer quip
2. **Player turn:** See enemy's telegraphed next move. Choose from available actions (from equipment + cat ability if off cooldown)
3. **Resolve player action:** Apply damage/effects, update combat log, check enemy death
4. **Enemy turn:** Execute telegraphed action, apply damage/effects, check player death
5. **Status tick:** Process all status effects (poison damage, stun skip, etc.)
6. **Viewer update:** Entertaining actions boost meter, boring actions decay it
7. **Loop** until enemy HP ≤ 0 (victory) or player HP ≤ 0 (death)

**Viewer Entertainment Rules:**
- Using a rare/legendary action: +5-15 viewers
- Taking risky actions (low HP attacks): +10 viewers
- Using a cursed item: +20 viewers
- Winning at low HP: +25 viewers
- Getting hit without defending: -5 viewers
- Stalling (defending 3+ turns in a row): -15 viewers

---

## Floor Generation (AD-4, AD-5)

Using seeded RNG:
1. Determine room count: 3 + floor_number/5 (cap at 6)
2. Mandatory rooms: 1 combat (always), 1 of [shop|rest] (always)
3. Remaining rooms: weighted random from [combat(40%), loot(20%), trap(15%), event(25%)]
4. Scale enemy HP/damage by floor number (linear + small exponential)
5. Scale loot rarity weights by floor (higher floors = more rare+ drops)
6. Every 5th floor: replace all rooms with single boss room

---

## Content Volume Targets

| Content Type | Target Count | Priority |
|-------------|-------------|----------|
| Items | 200+ | Critical — this IS the game |
| Enemies | 50+ | Critical |
| Bosses | 6 (floors 5,10,15,20,25,30) | Critical |
| Events | 40+ | High |
| Announcer lines | 300+ across all categories | Critical |
| Cat dialogue | 100+ | High |
| Shop vendors | 10+ unique personalities | Medium |
| Meta unlocks | 20+ | Medium |

---

## UI Screens

### Title Screen
- Game title + building emoji animation
- "Descend" (new run), "Unlocks" (meta shop), "Stats"
- Deepest floor achieved badge
- Prestige indicator if applicable

### Run Setup
- Name your cat (6 preset options + custom)
- Starting loadout (if unlocks purchased)
- Announcer welcome speech

### Floor Map
- Floor number + room icons in a row/grid
- Explored rooms dimmed, current room highlighted
- HUD persistent at top (HP bar, gold, floor #, viewer count)
- "Next Floor" button when all mandatory rooms done (some rooms optional)

### Room Screens (varies by type)
- **Combat:** Enemy display (emoji + HP bar + telegraphed action) + player action buttons at bottom
- **Loot:** Item card display + "Take" / "Leave" buttons
- **Trap:** Description + risk/safe choice buttons
- **Shop:** Vendor greeting + item list with prices + heal option
- **Event:** Narrative text + choice buttons
- **Rest:** Heal animation + cat interaction + announcer commentary

### Death Screen
- Floor reached, items found, peak viewers
- Stairwell Points earned (breakdown)
- Announcer death quip
- "Spend Points" → Meta Shop, "Try Again" → Title

### Meta Shop
- Grid of unlocks with SP costs
- Purchased unlocks highlighted
- Categories: Starting Items, Cat Abilities, Floor Shortcuts, Viewer Perks, Cosmetic
