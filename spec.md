# Quick Spec: Stairwell

> **Date:** 2026-03-19
> **Status:** Approved (Jeff: "Surprise me")

---

## 1. Vision

**One sentence:** A roguelike browser game where you descend an endless supernatural building, accompanied by a snarky cat and narrated by a deranged AI announcer — inspired by Dungeon Crawler Carl's dark humor, Slay the Spire's decision-making, and The Stanley Parable's narrator energy.

---

## 2. MVP Features

- [x] **Floor-by-floor descent** — Each floor has 3-6 rooms (loot, combat, traps, shops, random events). Choose which rooms to enter. Boss every 5 floors.
- [x] **Choice-based combat** — Pick actions from equipped items/abilities. No twitch mechanics. Turn-based with personality (item descriptions, narrator quips).
- [x] **Absurd loot system** — 200+ items across rarities (Common → Legendary → Cursed). Ridiculous names and effects ("Sentient Toaster", "Divorce Papers of Holding"). Equipment slots: weapon, armor, accessory, consumable belt.
- [x] **Cat companion** — Starts as a snarky observer. Levels up, gains abilities (scratch, distract, "weaponized indifference"). Has opinions on your decisions. Named by the player.
- [x] **Viewer system** — "Viewer count" tracks entertainment value. Entertaining plays (risky moves, comedic choices) boost viewers → triggers sponsor drops (free items/buffs). Boring play = viewers leave = fewer rewards.
- [x] **AI Announcer** — Narrator that commentates everything. Reacts to deaths, big finds, dumb decisions. Personality: game show host meets sardonic deity. Pre-written lines, not AI-generated.
- [x] **Roguelike progression** — Die → earn "Stairwell Points" based on depth + achievements → spend on permanent unlocks (starting items, cat abilities, floor shortcuts) → descend again.

**Out of scope (v1):**
- Multiplayer / leaderboards
- Procedural floor layouts (visual maps)
- Save/load mid-run (browser session only — closing = run over)
- Accessibility narration / screen reader support (post-MVP)

---

## 3. Tech Stack

**Preset:** Custom (static game — same as Crate Digger)

**Frontend:** Vanilla TypeScript + CSS (no framework)
**Backend:** None (all client-side, localStorage for persistence)
**Build:** Vite
**Hosting:** Coolify on Hetzner (static site deploy)

---

## 4. Auth & Payments

**Auth needed?** No
**Payments needed?** No
**Multi-tenancy:** Single player, local storage

---

## 5. Success Criteria

- [x] Playable run from floor 1 to death with combat, loot, events, and boss fights
- [x] Cat companion with personality and mechanical utility
- [x] Announcer commentary that makes you laugh out loud
- [x] Roguelike meta-progression that makes you want to "just one more run"
- [x] Mobile-first responsive design (portrait mode works perfectly)
- [x] Bundle < 200KB gzipped
- [x] Deployed and live on stairwell.dizzylab.com

---

## 6. Game Design Details

### Floor Structure
- **Floors 1-5:** Tutorial-ish. Easier enemies, basic loot. Announcer is chatty.
- **Floor 5:** First boss. Tests if player understands combat.
- **Floors 6-15:** Mid-game. More room variety, trap frequency increases, cursed items appear.
- **Floor 10:** Second boss. Viewer milestone event.
- **Floors 16+:** Difficulty scales. Rarer loot, meaner enemies, the building gets "weird."
- **Every 5th floor:** Boss. Unique mechanics per boss.

### Room Types
1. **Combat** — Enemy encounter. Turn-based. Victory = loot + XP.
2. **Loot** — Free item(s). Sometimes trapped.
3. **Trap** — Environmental hazard. Choice to risk or avoid.
4. **Shop** — Spend gold on items/healing. Vendor has personality.
5. **Event** — Weird narrative encounters. Multiple choices, unpredictable outcomes.
6. **Rest** — Heal HP, pet the cat (buffs), announcer grumbles about ratings.

### Combat System
- Player has HP, and equipment with action abilities
- Each item grants 1-2 actions (attack, defend, special)
- Enemy has HP, attack pattern (telegraph next move)
- Status effects: poison, stun, bleed, "cursed", "on fire", "existential dread"
- Cat can act once per combat (ability based on cat level)
- Viewer count modifies crit chance and sponsor drop rate

### Item Rarities
- **Common** (gray) — Boring but functional ("Rusty Pipe", "Old Boot")
- **Uncommon** (green) — Decent with flavor ("Self-Heating Sword", "Comfortable Lies")
- **Rare** (blue) — Strong with unique effects ("Probability Umbrella", "Déjà Vu Grenade")
- **Legendary** (purple) — Build-defining ("Sentient Toaster", "Divorce Papers of Holding", "The Concept of Thursday")
- **Cursed** (red) — Powerful but with drawbacks ("Sword of Damocles: +50 ATK, 10% chance to kill you")

### Announcer Personality
- Game show host energy with nihilistic undertones
- Celebrates viewer milestones, mocks boring play
- Has opinions on items ("Oh, The Concept of Thursday. Last contestant who found that... well. Let's not talk about it.")
- Gets increasingly unhinged the deeper you go
- Breaks fourth wall occasionally ("Your entertainment value is currently... adequate.")

### Cat Personality
- Starts aloof, gradually warms up (mechanically — better abilities at higher bond levels)
- Names: player chooses from 6 options + custom
- Has dialogue in combat and events
- Snarky but loyal
- Cat level 1: Scratch (minor damage). Level 3: Distract (enemy skips turn). Level 5: "Weaponized Indifference" (massive damage, cat walks away dramatically)

### Meta-Progression
- **Stairwell Points (SP):** Earned on death based on: floors cleared, items found, viewers peak, achievements
- **Permanent Unlocks (SP cost):**
  - Starting items (begin with a specific uncommon+ item)
  - Cat ability tree expansions
  - Floor shortcuts (start on floor 5, 10, etc.)
  - Announcer lines unlock (cosmetic — more commentary variety)
  - "Viewer perks" (start with higher base viewer count)

### UI Layout
- **Mobile-first, portrait mode**
- Top: Floor indicator + HP + Gold + Viewer count
- Middle: Room content (narrative text, item card, enemy display, choices)
- Bottom: Action buttons (always visible, never cut off — lesson from Crate Digger)
- Color palette: Dark industrial (grays, muted greens, emergency reds, gold accents)
- Font: Monospace for announcer text, clean sans-serif for UI
