# Implementation Plan — Stairwell

> A tactical roadmap organized into parallel execution waves

---

## Wave 1: Foundation Layer (NO dependencies)

### Task 1.1: Project Scaffold & Core Types
**Files:**
- `package.json` — Vite, TypeScript, development dependencies
- `vite.config.ts` — Bundler configuration
- `tsconfig.json` — TypeScript strict mode configuration
- `index.html` — Game entry point HTML shell
- `src/types.ts` — All shared TypeScript interfaces and types

**Acceptance Criteria:**
- Project builds successfully with `npm run build`
- TypeScript strict mode enabled with no errors
- All core interfaces defined: `GamePhase`, `GameItem`, `Enemy`, `Boss`, `Room`, `Floor`, `RunState`, `MetaState`, `CombatState`, `CatState`, `ViewerState`
- HTML shell loads with placeholder content
- Development server runs on `npm run dev`

**Complexity:** Low  
**Dependencies:** None

### Task 1.2: Utilities & Helpers
**Files:**
- `src/utils.ts` — RNG, formatting, DOM helpers

**Acceptance Criteria:**
- `el()` DOM helper function matches Crate Digger pattern
- Seeded RNG implementation (mulberry32) with deterministic output
- Text formatting helpers (currency, health bars, percentage)
- Date/time formatting for timestamps
- Array shuffle, weighted random selection utilities
- All functions have unit-testable pure interfaces

**Complexity:** Low  
**Dependencies:** Task 1.1 (types)

### Task 1.3: Game State Management
**Files:**
- `src/engine/state.ts` — State access, persistence, save/load

**Acceptance Criteria:**
- Singleton pattern for run state and meta state access
- `getRunState()`, `modifyRun()`, `getMetaState()`, `modifyMeta()` functions
- localStorage save/restore for meta-progression only
- State initialization with sensible defaults
- Type-safe state modification functions
- Clear separation: run state (ephemeral) vs meta state (persistent)

**Complexity:** Medium  
**Dependencies:** Task 1.1 (types), Task 1.2 (utils)

### Task 1.4: Base CSS Framework
**Files:**
- `src/style.css` — Mobile-first stylesheet with color system

**Acceptance Criteria:**
- CSS custom properties for dark industrial color palette
- Mobile-first responsive design (320px+ base, 768px+ desktop)
- `100dvh` with `100vh` fallback viewport handling
- Bottom-anchored action button system using `flex-shrink: 0`
- Screen transition base classes
- Typography system (monospace for announcer, Inter for UI)
- No visual bugs on mobile portrait/landscape

**Complexity:** Medium  
**Dependencies:** None

---

## Wave 2: Engine Layer (depends on Wave 1 types)

### Task 2.1: Floor Generation Engine
**Files:**
- `src/engine/floor.ts` — Room layout, enemy scaling, loot generation

**Acceptance Criteria:**
- `generateFloor(floorNumber: number, rng: () => number): Floor` function
- Correct room count formula: 3 + floor_number/5 (cap at 6)
- Mandatory room enforcement: 1 combat + 1 shop/rest always present
- Weighted room distribution: combat(40%), loot(20%), trap(15%), event(25%)
- Boss floor detection (every 5th floor replaces all rooms with boss)
- Enemy HP/damage scaling by floor number
- Loot rarity weight adjustment by depth
- Deterministic output given same floor number and RNG seed

**Complexity:** High  
**Dependencies:** Wave 1 complete

### Task 2.2: Combat Resolution System
**Files:**
- `src/engine/combat.ts` — Turn resolution, damage calculation, status effects

**Acceptance Criteria:**
- `startCombat(enemy: Enemy): CombatState` initialization
- `resolvePlayerAction(action: ItemAction, combatState: CombatState): CombatResult` 
- `resolveEnemyAction(combatState: CombatState): CombatResult`
- Status effect processing (poison, stun, bleed, cursed, on_fire, existential_dread)
- Turn order: player → enemy → status tick
- Enemy action telegraphing system
- Combat log generation for UI display
- Death condition detection (player HP ≤ 0 or enemy HP ≤ 0)

**Complexity:** High  
**Dependencies:** Wave 1 complete

### Task 2.3: Progression & Viewer Systems
**Files:**
- `src/engine/progression.ts` — XP, leveling, meta-progression calculations
- `src/engine/viewers.ts` — Entertainment scoring, viewer count management

**Acceptance Criteria:**
- **Progression:** Cat XP calculation, level thresholds, ability unlocks
- **Meta:** Stairwell Points earning formula, unlock purchasing logic
- **Viewers:** Entertainment meter mechanics (0-100 scale, decay over time)
- Viewer count changes based on player actions in combat
- Sponsor drop milestone detection and rewards
- Peak viewer tracking for meta progression
- Integration with combat system for entertainment scoring

**Complexity:** Medium  
**Dependencies:** Wave 1 complete, Task 2.2 (combat integration)

### Task 2.4: Cat Companion Logic
**Files:**
- `src/engine/cat.ts` — Cat abilities, mood system, bond mechanics

**Acceptance Criteria:**
- `updateCatBond(change: number): void` function
- Cat ability cooldown management
- Mood calculation based on bond level and recent events
- Cat action resolution (skip_enemy_turn, reveal_trap, steal_item, heal_player)
- Integration with combat system for cat abilities
- Bond level affects ability power scaling
- Cat XP gain from combat participation

**Complexity:** Medium  
**Dependencies:** Wave 1 complete, Task 2.2 (combat integration)

---

## Wave 3: Data Layer (depends on Wave 2 interfaces)

### Task 3.1: Items Data (4 separate tasks for parallel authoring)

#### Task 3.1a: Common & Uncommon Items
**Files:**
- `src/data/items-common.ts` — 60+ common items
- `src/data/items-uncommon.ts` — 50+ uncommon items

**Acceptance Criteria:**
- Items follow naming pattern: funny/absurd but internally consistent
- Each item has proper rarity, slot, 1-2 actions, description, flavor text
- Action damage/effects balanced for early-mid game
- Items span all slots: weapon, armor, accessory, consumable
- Export typed arrays: `export const commonItems: GameItem[]`

**Complexity:** High (content volume)  
**Dependencies:** Wave 2 complete (need item interface contracts)

#### Task 3.1b: Rare & Legendary Items
**Files:**
- `src/data/items-rare.ts` — 50+ rare items
- `src/data/items-legendary.ts` — 30+ legendary items

**Acceptance Criteria:**
- Higher power levels than common/uncommon tiers
- More interesting/complex abilities and status effects
- Legendary items have powerful passive abilities
- Strong thematic consistency with building/office/supernatural theme
- Clear upgrade path from common → legendary versions

**Complexity:** High (content volume + balance)  
**Dependencies:** Wave 2 complete, Task 3.1a (for balance reference)

#### Task 3.1c: Cursed Items & Consumables
**Files:**
- `src/data/items-cursed.ts` — 30+ cursed items with downsides
- `src/data/items-consumables.ts` — 40+ consumables

**Acceptance Criteria:**
- Cursed items have powerful upside + meaningful downside
- Consumables cover healing, buffs, utility, combat effects
- Clear risk/reward decision making for all cursed items
- Consumables balanced for limited inventory slot pressure

**Complexity:** High (balance complexity)  
**Dependencies:** Wave 2 complete, Task 3.1a-b (for power curve context)

### Task 3.2: Enemies & Bosses Data (2 separate tasks)

#### Task 3.2a: Regular Enemies
**Files:**
- `src/data/enemies.ts` — 50+ enemies across floor ranges

**Acceptance Criteria:**
- Enemies themed to building environments (janitors, vending machines, etc.)
- Floor range distribution covers floors 1-30+ without gaps
- Each enemy has 2-3 distinct actions with telegraphs
- Loot tables with weighted item drops appropriate to enemy type
- Gold/XP drops scaled to floor difficulty
- Enemy emoji and descriptions create atmosphere

**Complexity:** High (content volume)  
**Dependencies:** Wave 2 complete, Task 3.1 (for loot table references)

#### Task 3.2b: Boss Encounters
**Files:**
- `src/data/bosses.ts` — 6 unique bosses for floors 5,10,15,20,25,30

**Acceptance Criteria:**
- Each boss has unique title, multiple phases, special mechanics
- Boss HP/damage significantly higher than regular enemies
- Phase transition triggers at HP thresholds
- Special abilities that differentiate from regular combat
- Flavor text and descriptions build building mythology
- Boss-specific loot tables with guaranteed rare+ drops

**Complexity:** High (boss design complexity)  
**Dependencies:** Wave 2 complete, Task 3.2a (for power curve reference)

### Task 3.3: Events & Interactive Content
**Files:**
- `src/data/events.ts` — 40+ random events with multiple choice outcomes

**Acceptance Criteria:**
- Events span building themes: elevators, offices, maintenance, supernatural
- Multiple meaningful choice outcomes (not just good/bad binary)
- Weight system for random outcome selection
- Events affect: HP, gold, items, viewers, cat bond
- Some events should be genuinely funny/memorable
- Events scale in consequence impact by floor depth

**Complexity:** High (content volume + choice design)  
**Dependencies:** Wave 2 complete (need outcome interfaces)

### Task 3.4: Dialogue Systems (2 separate tasks)

#### Task 3.4a: Announcer Lines
**Files:**
- `src/data/announcer-lines.ts` — 300+ lines across all categories

**Acceptance Criteria:**
- Categories: combat_start, item_found, death, viewer_milestone, level_up, etc.
- Lines escalate in absurdity/desperation as floors get deeper
- Consistent voice: snarky, fourth-wall-breaking, obsessed with ratings
- No repeated lines within single run (variety system)
- Lines reference specific game states (viewer count, floor number, etc.)

**Complexity:** High (writing volume)  
**Dependencies:** Wave 2 complete

#### Task 3.4b: Cat Dialogue & Shop Content
**Files:**
- `src/data/cat-dialogue.ts` — 100+ cat lines by mood/situation
- `src/data/shops.ts` — 10+ unique shop vendor personalities with greetings

**Acceptance Criteria:**
- Cat lines match mood system: aloof, curious, affectionate, judging, furious
- Cat dialogue triggered by specific game events and situations
- Shop vendors have distinct personalities and greeting styles
- Vendor inventory templates with appropriate item pools
- Shop heal pricing scales with floor difficulty

**Complexity:** Medium (smaller content volume)  
**Dependencies:** Wave 2 complete, Task 2.4 (cat mood system)

### Task 3.5: Meta Progression Content
**Files:**
- `src/data/unlocks.ts` — 20+ meta progression unlocks with costs/effects

**Acceptance Criteria:**
- Unlock categories: Starting Items, Cat Abilities, Floor Shortcuts, Viewer Perks, Cosmetic
- Balanced Stairwell Point costs for meaningful progression
- Unlocks provide tangible gameplay benefits without breaking balance
- Clear upgrade paths for long-term engagement
- Unlock descriptions explain benefits clearly

**Complexity:** Medium  
**Dependencies:** Wave 2 complete (progression system)

---

## Wave 4: UI Layer (depends on Wave 2 engine + Wave 3 data)

### Task 4.1: Screen Infrastructure
**Files:**
- `src/ui/screens/title.ts` — Title screen with continue/new game
- `src/ui/screens/run-setup.ts` — Cat naming and starting loadout selection
- `src/ui/screens/meta-shop.ts` — Unlock purchasing interface

**Acceptance Criteria:**
- Each screen exports `render(container: HTMLElement, onTransition: (next: GamePhase) => void): void`
- Title screen shows deepest floor achieved, game stats
- Run setup integrates with meta unlocks for starting items
- Meta shop shows available/purchased unlocks with SP costs
- Screens use consistent styling and mobile-responsive layout

**Complexity:** Medium  
**Dependencies:** Waves 2-3 complete

### Task 4.2: Core Game Screens
**Files:**
- `src/ui/screens/floor-map.ts` — Floor overview with room selection
- `src/ui/screens/room.ts` — Generic room handler, dispatches to room types
- `src/ui/screens/death.ts` — Death screen with run summary and SP calculation

**Acceptance Criteria:**
- Floor map shows all rooms with exploration status
- Room handler routes to appropriate room type (combat, shop, event, etc.)
- Death screen calculates and displays earned Stairwell Points
- Clear navigation flow between floor map → rooms → death
- Mobile-friendly room selection interface

**Complexity:** Medium  
**Dependencies:** Waves 2-3 complete

### Task 4.3: Combat Interface
**Files:**
- `src/ui/screens/combat.ts` — Combat screen with action selection
- `src/ui/components/enemy-display.ts` — Enemy status and telegraphed action display

**Acceptance Criteria:**
- Combat screen shows player HP, enemy HP, combat log
- Enemy telegraph clearly displayed before player action selection
- Action buttons generated from equipped items + cat abilities
- Combat log updates with each turn's events
- Mobile-optimized action button layout (bottom-anchored)
- Turn progression feels responsive and clear

**Complexity:** High (complex UI state)  
**Dependencies:** Waves 2-3 complete, Task 2.2 (combat engine)

### Task 4.4: Interactive Room Types
**Files:**
- `src/ui/screens/shop.ts` — Shop interface with item purchasing
- `src/ui/screens/event.ts` — Event screen with choice selection
- `src/ui/screens/boss.ts` — Boss combat screen with phase indicators

**Acceptance Criteria:**
- Shop screen displays vendor personality, item prices, heal options
- Event screen shows narrative text with multiple choice buttons
- Boss screen extends combat with phase transition animations
- All room types handle inventory management (item limits, etc.)
- Consistent button styling and mobile responsiveness

**Complexity:** Medium  
**Dependencies:** Waves 2-3 complete

### Task 4.5: Reusable UI Components (3 separate tasks)

#### Task 4.5a: Player Interface Components
**Files:**
- `src/ui/components/hud.ts` — Top bar with HP, gold, floor, viewers
- `src/ui/components/item-card.ts` — Item display with rarity styling

**Acceptance Criteria:**
- HUD persists across all game screens with live updates
- Item cards show rarity through color coding and visual styling
- HUD responsive design for mobile and desktop
- Item card hover/tap states show full item details

**Complexity:** Medium  
**Dependencies:** Waves 2-3 complete

#### Task 4.5b: Narrative Components
**Files:**
- `src/ui/components/announcer.ts` — Announcer text with typewriter animation
- `src/ui/components/cat-panel.ts` — Cat companion status and interaction

**Acceptance Criteria:**
- Announcer text appears with typewriter effect (200ms per character)
- Cat panel shows mood, bond level, available abilities
- Announcer lines auto-advance after reading time
- Cat panel allows direct interaction (petting, ability triggers)

**Complexity:** Medium  
**Dependencies:** Waves 2-3 complete, Task 2.4 (cat system)

#### Task 4.5c: Game Effects & Animations
**Files:**
- `src/ui/animations.ts` — Screen transitions, particle effects

**Acceptance Criteria:**
- Smooth screen transitions (200-300ms ease)
- Combat hit effects, healing animations
- Viewer count increase/decrease visual feedback
- Screen entry/exit animations for all game phases
- Performance optimization: no animation frame drops on 60Hz mobile

**Complexity:** High (animation complexity)  
**Dependencies:** Waves 2-3 complete

---

## Wave 5: Integration & Polish (depends on all prior waves)

### Task 5.1: Main State Machine
**Files:**
- `src/main.ts` — Entry point, phase routing, screen orchestration

**Acceptance Criteria:**
- Game state machine correctly routes between all phases
- Screen transitions triggered by user actions and game events
- Proper cleanup between screen transitions (no memory leaks)
- Error handling for invalid state transitions
- Game initializes correctly on first load and after browser refresh

**Complexity:** Medium  
**Dependencies:** All previous waves complete

### Task 5.2: Data Integration & Balance Pass
**Files:**
- Data imports in engine modules
- Balance adjustments based on integrated testing

**Acceptance Criteria:**
- All data files properly imported and accessible to engine
- Item power curve feels balanced across floors 1-30
- Enemy difficulty scales appropriately with player progression
- Meta progression unlocks provide meaningful benefit without breaking game
- No hardcoded data references, everything driven by data files

**Complexity:** Medium  
**Dependencies:** All data tasks complete

### Task 5.3: Mobile Optimization & CSS Polish
**Files:**
- `src/style.css` — Final mobile fixes, cross-browser testing

**Acceptance Criteria:**
- No layout breaking on any mobile viewport (320px - 768px)
- All interactive elements have proper touch targets (44px+ minimum)
- Action buttons never get cut off by viewport or virtual keyboard
- Smooth scrolling for content areas, fixed position for action bars
- Performance: 60fps on mid-range mobile devices

**Complexity:** Medium  
**Dependencies:** All UI tasks complete

### Task 5.4: Build Configuration & Deployment
**Files:**
- Vite build optimizations
- Production bundle analysis
- Coolify deployment configuration

**Acceptance Criteria:**
- Production bundle under 200KB gzipped
- All assets properly hashed for cache busting
- TypeScript compilation with zero errors/warnings
- Bundle analyzer confirms no unnecessary dependencies
- Successful deployment to `stairwell.dizzylab.com` on Coolify
- Service worker configuration for offline play (optional)

**Complexity:** Low  
**Dependencies:** All previous tasks complete

---

## Quality Gates

### Wave Completion Criteria
- **Wave 1:** Project builds, types compile, basic utilities work
- **Wave 2:** Engine functions produce correct output given test inputs
- **Wave 3:** All data arrays export valid TypeScript objects, no missing content
- **Wave 4:** All screens render without errors, basic interactions work
- **Wave 5:** Complete game playable from title → death → meta shop

### Content Volume Verification
- Items: 200+ total across all rarity files
- Enemies: 50+ covering floors 1-30+
- Bosses: 6 unique encounters for milestone floors
- Announcer Lines: 300+ across all categories
- Events: 40+ with meaningful choice outcomes
- Cat Dialogue: 100+ lines covering all mood states
- Shop Vendors: 10+ distinct personalities
- Meta Unlocks: 20+ progression options

### Performance Targets
- Bundle size: <200KB gzipped
- First paint: <2 seconds on 3G
- 60fps gameplay on iPhone 12+ / equivalent Android
- No memory leaks during extended play sessions

---

## Parallel Execution Strategy

**Wave 1-2:** Single developer (foundation work)  
**Wave 3:** Multiple content authors in parallel:
- Author A: Items (Tasks 3.1a-c)
- Author B: Enemies & Bosses (Tasks 3.2a-b)  
- Author C: Events & Dialogue (Tasks 3.3, 3.4a-b)
- Author D: Meta Content (Task 3.5)

**Wave 4:** UI specialists can work in parallel on screen types  
**Wave 5:** Integration team for final assembly

**Estimated Timeline:** 4-6 weeks with parallel execution, 8-10 weeks single developer