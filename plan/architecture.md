# Architecture Decisions — Stairwell

## AD-1: Vanilla TypeScript + Vite (No Framework)
**Decision:** Pure TypeScript with Vite bundler, same as Crate Digger.
**Reasoning:** Proven stack for browser games. Zero framework overhead. Full DOM control. Crate Digger shipped 115K lines at 128KB gzip. No React reconciliation tax for a game that imperatively updates UI.
**Trade-offs:** Manual DOM management, but for a game this is actually preferred — you want precise control over what renders and when.

## AD-2: Module Architecture — Layered Game Engine
**Decision:** Separate game logic (pure functions) from rendering (DOM) from data (items/enemies/events). Three clean layers:
- `engine/` — game state machine, combat resolver, floor generator, progression. Zero DOM imports.
- `ui/` — screen renderers, animations, particles. Consumes engine state.
- `data/` — all game content: items, enemies, events, announcer lines, cat dialogue. Pure data files.
**Reasoning:** Crate Digger mixed rendering with game logic in screen files. Worked, but made the 22-feature expansion harder. Clean separation means we can add content (new items, enemies, events) by dropping data files without touching game logic.
**Trade-offs:** More files upfront, but each file is small and single-purpose.

## AD-3: State Machine for Game Flow
**Decision:** Explicit state machine for game phases: TITLE → RUN_SETUP → FLOOR_MAP → ROOM → COMBAT → ROOM_RESULT → FLOOR_COMPLETE → BOSS → DEATH → META_SHOP → TITLE.
**Reasoning:** Roguelikes have complex flow. Ad-hoc screen transitions (like Crate Digger's callback chains) get messy when you have branching paths (combat → death OR combat → loot → next room OR combat → event trigger). A state machine makes transitions explicit and debuggable.
**Trade-offs:** Slightly more boilerplate, but prevents the "how did I get to this screen?" bugs.

## AD-4: Content-Driven Design
**Decision:** All game content (items, enemies, events, announcer lines, cat dialogue) lives in typed data arrays. The engine picks from these pools based on floor depth, rarity weights, and RNG seed.
**Reasoning:** This is what made Crate Digger's item system work — 2500 items across 14 categories, all data-driven. For Stairwell, content IS the game. The engine is just the plumbing.
**Trade-offs:** Large data files, but they compress well and are easy to author.

## AD-5: Seeded RNG for Reproducibility
**Decision:** Use a seeded PRNG (simple mulberry32) for all game randomness. Seed from run start.
**Reasoning:** Makes debugging deterministic. Also enables future "daily challenge" runs (same seed = same floors). Crate Digger's daily seed system proved this pattern works.
**Trade-offs:** Must be disciplined about never using Math.random() in game logic.

## AD-6: localStorage for Persistence
**Decision:** Meta-progression (Stairwell Points, unlocks, settings) in localStorage. Active run state NOT persisted (closing browser = run over, per spec).
**Reasoning:** No backend needed. Simple, fast, proven. Crate Digger uses the same approach.
**Trade-offs:** Data lost if user clears browser data, but that's acceptable for a free browser game.

## AD-7: Mobile-First, Bottom-Anchored Actions
**Decision:** All interactive buttons anchored to bottom of viewport using `dvh` units and `flex-shrink: 0`. Lesson learned from Crate Digger's mobile cutoff bug (fixed today).
**Reasoning:** Jeff literally just reported buttons getting cut off in portrait mode. We're not making that mistake twice.
**Trade-offs:** Content area scrolls, action bar is always visible. Perfect for a game.

## AD-8: Dark Industrial Aesthetic
**Decision:** Color palette: charcoal (#1a1a1a), concrete gray (#2d2d2d), muted green (#4a7c59), emergency red (#c44), gold (#d4a843), off-white text (#e8e8e8). Monospace for announcer, Inter for UI. No pixel fonts — this isn't retro, it's institutional horror.
**Reasoning:** DCC's stairwell is cold, industrial, inhuman. The UI should feel like a building's emergency signage system that's been repurposed by an alien intelligence.
**Trade-offs:** Less "fun" color palette than Crate Digger, but it fits the tone.

## AD-9: Announcer as a System, Not Inline Strings
**Decision:** Announcer lines stored in a dedicated module with tagged categories (combat_start, item_found, death, viewer_milestone, etc.). Announcer module selects contextual lines, tracks which have been shown (no repeats within a run), and escalates tone with depth.
**Reasoning:** The announcer IS the personality of the game. Treating it as a first-class system means we can have 500+ lines that feel handcrafted, not random. Priority: funny > quantity.
**Trade-offs:** Big upfront writing effort, but this is what makes or breaks the game's identity.

## AD-10: Combat — Simple But Meaningful
**Decision:** Turn-based. Player picks action → enemy acts (telegraphed) → resolve. 3-5 actions available per turn based on equipment. No complex RPG stats — just HP, damage values, and status effects.
**Reasoning:** Slay the Spire's genius is simple mechanics with complex interactions. We want "which 3 items do I bring into this fight?" to be the interesting decision, not "how do I optimize a 12-stat character sheet."
**Trade-offs:** Less character build depth, but much faster to grok. Depth comes from item synergies.
