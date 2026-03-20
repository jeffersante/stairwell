# Stairwell v2 — Enhancement Plan

> "Turn a cool prototype into something people can't put down."

## Design Philosophy

The v1 prototype has solid bones: state machine, turn-based combat, content pipeline, mobile-first CSS.
What it's missing: **player agency, tactical depth, sensory feedback, and the feeling of building something powerful.**

Drawing from: Dungeon Crawler Carl (absurdist survival), EverQuest (class identity + spell system), D&D (dice-driven outcomes), Ultima (exploration + crafting), Slay the Spire (meaningful choices per run), Aztec mythology (thematic depth).

---

## Enhancement Categories

### 1. 🎲 DICE-BASED COMBAT SYSTEM
**Current:** Flat damage numbers. Click action, see result. No variance, no tension.
**New:** D&D-style dice rolls for everything.

- **Attack rolls:** Roll d20 + modifiers vs enemy AC. Natural 20 = critical (double damage + viewer surge). Natural 1 = fumble (announcer roasts you).
- **Damage rolls:** Weapons specify dice (1d6, 2d4, 1d12). Roll shown with animation.
- **Saving throws:** Traps and status effects require saves. CON save vs poison, DEX save vs traps, WIS save vs existential dread.
- **Dice UI:** Animated dice roll visualization — numbers tumble, land on result. Color-coded (green crit, red fumble, white normal).
- **Player stats:** STR, DEX, CON, INT, WIS, CHA — assigned at run start (roll 4d6 drop lowest, or point buy). Stats modify rolls.
- **Armor Class:** Player and enemies have AC. Attacks must meet or exceed to hit.

### 2. ⚔️ PLAYER CLASS SYSTEM
**Current:** Player is a blank slate. Cat does all the fighting identity.
**New:** Choose a class at run start. Each changes combat dramatically.

**Classes (6):**
- **Janitor** — Melee specialist. Bonus to STR. Signature: "Clean Sweep" (AoE). Starts with mop weapon.
- **IT Specialist** — Debuff/hacker. Bonus to INT. Signature: "System Override" (disable enemy for 2 turns). Starts with keyboard weapon.
- **HR Manager** — Support/tank. Bonus to CHA. Signature: "Mandatory Fun" (heal + viewer boost). Starts with binder armor.
- **Intern** — Glass cannon. All stats low but gains XP 2x faster. Signature: "Desperate Initiative" (roll twice, take better).
- **Night Security** — Balanced fighter. Bonus to CON. Signature: "Flashlight Beam" (reveal + stun). Starts with flashlight.
- **The Accountant** — Luck/gold specialist. Bonus to WIS. Signature: "Creative Accounting" (convert gold to damage or vice versa). Starts with calculator.

Each class has a 3-tier ability tree (unlocked at player levels 3, 6, 9).

### 3. 🔮 MAGIC SYSTEM — "BUILDING CODES"
**Current:** No magic. Items have fixed abilities.
**New:** Discoverable "Building Codes" — spells themed as bureaucratic/supernatural building regulations.

- **Code scrolls** found in loot rooms, shops, event rewards.
- **Mana = "Compliance Points"** — regenerates 1 per turn, max based on INT.
- **Spell schools:**
  - **Structural** (damage): "Code Violation: Load-Bearing Wall" (heavy damage), "Condemned" (instant kill if enemy <20% HP)
  - **HVAC** (control): "Arctic Blast" (freeze enemy), "Pressure Differential" (push enemy, skip their turn)
  - **Electrical** (utility): "Short Circuit" (stun), "Emergency Lighting" (reveal all traps on floor)
  - **Plumbing** (healing): "Burst Pipe" (heal + water damage to enemy), "Clean Water" (remove all status effects)
  - **Eldritch Filing** (chaos): "Form 27-B Stroke 6" (random powerful effect), "Audit" (steal enemy's strongest ability for 3 turns)
- **8-12 spells per school, 40-60 total spells**
- **Spell slots:** Limited per floor (like D&D), reset on rest. Higher INT = more slots.

### 4. 🏗️ CRAFTING SYSTEM — "MAINTENANCE"
**Current:** Find items, equip items. No agency in item creation.
**New:** Combine items at Maintenance Stations to create better gear.

- **Maintenance Stations** appear as a new room type (1 per every 3-4 floors).
- **Recipes:** Combine 2-3 items to produce a better one. Recipes discovered by experimenting OR found in blueprint scrolls.
- **Material tags:** Items have hidden material properties (Metal, Organic, Electrical, Supernatural, Paper). Combining compatible materials works; incompatible = cursed result or explosion.
- **Upgrade paths:** Any common item can be upgraded through 2 tiers if you have the right components.
- **Cat assists:** High cat bond = cat finds bonus materials during combat.
- **20-30 recipes minimum**, discoverable through play.

### 5. 🗺️ VISUAL FLOOR MAPS
**Current:** Grid of room icons. Functional but flat.
**New:** Procedurally generated building floor plans.

- **Canvas-rendered floor map** showing hallways connecting rooms.
- **Room shapes** vary: small closets, large offices, L-shaped corridors, elevator shafts.
- **Fog of war:** Unexplored rooms are shadowed. Adjacent rooms show type icon but details hidden.
- **Player token** (class emoji) moves along hallways when entering rooms.
- **Mini-map** in HUD during room exploration.
- **Floor themes:** Floors 1-5 (Lobby/Basement), 6-10 (Office), 11-15 (Executive), 16-20 (Maintenance/Industrial), 21-25 (Penthouse/Surreal), 26-30 (Eldritch/Reality Breaks Down).

### 6. 🎵 SOUND SYSTEM
**Current:** Silent.
**New:** Web Audio API for atmospheric sound design.

- **Ambient loops** per floor theme (humming fluorescents, distant elevators, dripping pipes, unsettling silence).
- **Combat SFX:** Dice roll sounds, hit impacts, spell effects, critical hit fanfare, death jingle.
- **UI SFX:** Button clicks, menu transitions, item pickup chimes, level up fanfare.
- **Announcer voice effect:** Text appears with a subtle "TV static" sound. Special lines get dramatic stings.
- **Cat sounds:** Purring during rest, hissing in combat, dramatic meow on level up.
- **Procedural music:** Simple generative ambient using oscillators — no large audio files. Pitch/tempo shifts with floor depth.
- **Mute controls** per category (music, SFX, announcer).
- **Target:** <20KB total for sound (procedural generation, not samples).

### 7. 🎬 ANIMATIONS & VISUAL POLISH
**Current:** Minimal CSS transitions.
**New:** Rich, responsive animations that make every action feel impactful.

- **Dice roll animation:** 3D-perspective CSS dice that tumble and land. Number revealed with a bounce.
- **Combat animations:** Weapon swing (CSS transform), spell effects (particles), enemy shake on hit, player flash on damage.
- **Screen transitions:** Elevator door closing/opening effect between floors. Room doors swing open.
- **Loot reveal:** Items flip up from a chest with rarity-colored glow.
- **Critical hit:** Screen flash + slowmo text + confetti + announcer fanfare.
- **Death animation:** Screen cracks, goes to static, announcer delivers line.
- **Cat animations:** Idle tail swish, attack pounce, sleep curl during rest.
- **Viewer count:** Animated number counter that rolls up/down. Milestone hit = fireworks.
- **HP changes:** Smooth bar transitions with color shifts. Damage numbers float up.
- **All animations CSS-only or requestAnimationFrame** — no libraries.

### 8. 🎒 INVENTORY & EQUIPMENT OVERHAUL
**Current:** Simple equipment slots + small inventory.
**New:** Full inventory management with meaningful choices.

- **Equipment slots expanded:** Weapon (main hand), Off-hand (shield/dual wield), Head, Body, Legs, Feet, Accessory x2, Belt (consumables x4).
- **Inventory grid:** 12-slot backpack. Visual grid with drag-to-equip (or tap-to-equip on mobile).
- **Item comparison:** Side-by-side stats when hovering/tapping equipped vs new item.
- **Item sets:** Matching items from the same "collection" give set bonuses (3-piece janitor set = +5 to all cleaning-based attacks).
- **Encumbrance:** Heavy items slow you (lower DEX). Encourages interesting choices.
- **Quick-use consumable bar** always visible during combat.

### 9. 🌋 FLOOR THEMES & ENVIRONMENTAL HAZARDS
**Current:** Generic rooms on every floor.
**New:** Distinct floor biomes with unique mechanics.

**Floor Themes:**
- **B1-B5: The Lobby** — Corporate mundanity. Enemies are office supplies and disgruntled workers. Safe-ish.
- **B6-B10: The Offices** — Cubicle mazes. Event-heavy. "Performance Reviews" as mini-boss mechanic.
- **B11-B15: Executive Suite** — Luxury gone wrong. Enemies are corrupted executives. Gold-rich but trap-heavy.
- **B16-B20: Maintenance/Industrial** — Dark, dangerous. Environmental hazards: steam vents (periodic damage), broken lights (miss chance), flooded corridors (slow).
- **B21-B25: The Archives** — Reality bends. Rooms can loop. Enemies from different floors appear. Time-themed mechanics.
- **B26-B30: The Basement of Basements** — Eldritch horror. Aztec-inspired architecture bleeding through office walls. Obsidian altars. Blood-gold. The building's true nature revealed.

**Environmental hazards per floor theme:**
- Spawn at room entry. Player must deal with them alongside enemies/events.
- Can be mitigated by class abilities, spells, or specific items.
- Create emergent tactical decisions.

### 10. 🐈 EXPANDED CAT COMPANION
**Current:** Cat has abilities and mood. Good foundation.
**New:** Cat as a full party member with its own progression.

- **Cat classes** (chosen at naming): Shadow Cat (stealth/crit), Battle Cat (tank/damage), Mystic Cat (spells), Alley Cat (theft/utility).
- **Cat equipment:** Collar (accessory), Charm (spell focus), Claws (weapon upgrade). 3 equip slots.
- **Cat abilities expanded:** 4-5 abilities per cat class, unlocked by level. Active + passive.
- **Cat mood affects gameplay more:** Furious cat deals 2x damage but won't heal you. Affectionate cat heals but won't attack. Aloof cat acts randomly.
- **Cat dialogue reacts to class:** IT Specialist cat makes tech jokes. Janitor cat complains about mess.
- **Cat combo attacks:** When bond > 80, unlock team attacks (player + cat act together for massive damage + huge viewer boost).

### 11. 📊 ENHANCED META-PROGRESSION
**Current:** Simple unlock shop.
**New:** Deep meta-progression that changes how you play.

- **Prestige system:** After reaching floor 30, can "reset" for permanent stat bonuses.
- **Building Knowledge:** Permanent encyclopedia of discovered items, enemies, spells. Each entry unlocked gives small permanent bonus.
- **Challenge modes:** Daily seed runs (leaderboard-ready). Speed run timer. No-hit challenges.
- **Achievement system:** 50+ achievements with SP rewards. Some unlock new starting options.
- **Floor records:** Track best time, highest viewers, most gold per floor. Personal bests.

### 12. 📺 ENHANCED VIEWER SYSTEM
**Current:** Entertainment meter affects viewer count. Milestones trigger drops.
**New:** Viewers as an active system with real-time reactions.

- **Viewer chat** (simulated): Scrolling text of AI-generated viewer reactions during combat. "POGGERS" on crits, "F" on deaths, "PET THE CAT" during rest.
- **Viewer polls:** Occasionally viewers "vote" on what happens next (player chooses which viewer suggestion to follow — both have consequences).
- **Sponsor tiers:** Different sponsors at different viewer counts. Low = energy drinks. Mid = weapon companies. High = eldritch corporations.
- **Viral moments:** Specific action combinations trigger "clip it" moments — massive viewer spikes + unique rewards.

---

## Implementation Strategy

### Sprint 1: Core Systems Overhaul (Combat + Classes + Stats + Dice)
**Priority: CRITICAL — This changes everything**

Tasks:
1. Add player stats (STR/DEX/CON/INT/WIS/CHA) to RunState and types
2. Implement dice rolling engine (d4, d6, d8, d10, d12, d20 + modifiers)
3. Add Armor Class to player and enemies
4. Refactor combat to use attack rolls + damage dice
5. Implement 6 player classes with starting stats, gear, and signature abilities
6. Class selection screen in run setup
7. Dice roll animation (CSS 3D transform)
8. Combat UI overhaul — show rolls, AC, hit/miss feedback
9. Player leveling system (XP from combat, level up every 3-4 combats)
10. Class ability trees (3 tiers)

### Sprint 2: Magic + Crafting + Inventory
**Priority: HIGH — Adds depth and player agency**

Tasks:
1. Building Codes (magic) system — spell data, mana/compliance points
2. 40+ spells across 5 schools
3. Spell UI in combat (separate from item actions)
4. Crafting system engine (recipes, material tags, combination logic)
5. 30+ crafting recipes
6. Maintenance Station room type
7. Expanded inventory/equipment system (10 slots)
8. Inventory management UI (grid, equip, compare)
9. Item sets and set bonuses
10. Quick-use consumable bar

### Sprint 3: World Building + Visuals + Sound
**Priority: HIGH — Makes it feel alive**

Tasks:
1. Floor theme system (6 themes with distinct visuals and mechanics)
2. Environmental hazards engine
3. Visual floor maps (canvas or DOM-based procedural generation)
4. Fog of war system
5. Sound engine (Web Audio API procedural generation)
6. Ambient loops, combat SFX, UI sounds
7. Enhanced animations (dice, combat, transitions, loot reveals)
8. Death animation sequence
9. Viewer chat simulation
10. Cat class system + cat equipment slots
11. Cat combo attacks

### Sprint 4: Meta + Polish
**Priority: MEDIUM — Longevity and replayability**

Tasks:
1. Prestige system
2. Building Knowledge encyclopedia
3. Achievement system (50+ achievements)
4. Challenge modes (daily seed, speed run)
5. Enhanced viewer system (polls, sponsors, viral moments)
6. Floor records and personal bests
7. Balance pass across all systems
8. Mobile optimization pass
9. Final CSS polish
10. Deploy + test

---

## Content Volume Targets (v2)

| Content Type | v1 Count | v2 Target |
|-------------|---------|-----------|
| Items | 230 | 350+ (including crafted items) |
| Enemies | 50 | 80+ (themed per floor biome) |
| Bosses | 6 | 10+ (including mini-bosses) |
| Spells | 0 | 50+ across 5 schools |
| Crafting Recipes | 0 | 30+ |
| Events | 40 | 60+ (floor-theme-specific) |
| Announcer Lines | 300 | 500+ (class-specific, spell-specific) |
| Cat Dialogue | 175 | 300+ (cat class-specific) |
| Achievements | 0 | 50+ |
| Player Classes | 0 | 6 |
| Cat Classes | 0 | 4 |
| Floor Themes | 0 | 6 |
