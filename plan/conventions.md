# Stack Conventions — Stairwell

## Tech Stack
- **Language:** TypeScript 5.x (strict mode)
- **Bundler:** Vite 6.x
- **Runtime:** Browser only (no Node APIs)
- **Persistence:** localStorage (meta-progression only)
- **Deployment:** Coolify static site (Hetzner)

## Directory Structure
```
stairwell/
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
├── src/
│   ├── main.ts              # Entry point, state machine, screen router
│   ├── types.ts              # All shared types/interfaces
│   ├── utils.ts              # Helpers (RNG, formatting, DOM shortcuts)
│   ├── style.css             # All styles (single file, sectioned)
│   ├── engine/               # Pure game logic (no DOM)
│   │   ├── state.ts          # Game state management, save/load
│   │   ├── floor.ts          # Floor generation, room layout
│   │   ├── combat.ts         # Combat resolver
│   │   ├── progression.ts    # XP, leveling, meta-progression
│   │   ├── viewers.ts        # Viewer count system
│   │   └── cat.ts            # Cat companion logic
│   ├── ui/                   # DOM rendering (consumes engine state)
│   │   ├── screens/          # One file per screen
│   │   │   ├── title.ts
│   │   │   ├── run-setup.ts
│   │   │   ├── floor-map.ts
│   │   │   ├── room.ts
│   │   │   ├── combat.ts
│   │   │   ├── shop.ts
│   │   │   ├── event.ts
│   │   │   ├── boss.ts
│   │   │   ├── death.ts
│   │   │   └── meta-shop.ts
│   │   ├── components/       # Reusable UI pieces
│   │   │   ├── hud.ts        # Top bar (HP, gold, floor, viewers)
│   │   │   ├── item-card.ts  # Item display component
│   │   │   ├── enemy-display.ts
│   │   │   ├── announcer.ts  # Announcer text display with typewriter
│   │   │   └── cat-panel.ts  # Cat companion display
│   │   └── animations.ts     # Transitions, effects
│   └── data/                 # Pure data (no logic, no DOM)
│       ├── items.ts          # All items by rarity
│       ├── enemies.ts        # All enemies by floor range
│       ├── bosses.ts         # Boss definitions
│       ├── events.ts         # Random event definitions
│       ├── announcer-lines.ts # All announcer dialogue
│       ├── cat-dialogue.ts   # Cat companion lines
│       ├── shops.ts          # Shop inventory templates
│       └── unlocks.ts        # Meta-progression unlock definitions
```

## Naming Conventions
- **Files:** kebab-case (`floor-map.ts`, `item-card.ts`)
- **Types/Interfaces:** PascalCase (`GameState`, `CombatAction`)
- **Functions:** camelCase (`generateFloor`, `resolveCombat`)
- **Constants:** UPPER_SNAKE_CASE (`MAX_INVENTORY_SLOTS`, `BASE_VIEWER_COUNT`)
- **CSS classes:** kebab-case (`.combat-actions`, `.item-card-legendary`)
- **Data arrays:** camelCase plural (`allItems`, `floorOneEnemies`)

## Code Patterns

### DOM Helper (same as Crate Digger)
```typescript
function el(tag: string, className?: string, text?: string): HTMLElement {
  const e = document.createElement(tag);
  if (className) e.className = className;
  if (text) e.textContent = text;
  return e;
}
```

### State Access
```typescript
// Engine state is a singleton module
import { getRunState, getRun, modifyRun, getMetaState, modifyMeta } from '../engine/state';
```

### Screen Rendering
```typescript
// Every screen exports a render function
export function renderXxxScreen(container: HTMLElement, onTransition: (next: GamePhase) => void): void {
  container.innerHTML = '';
  container.className = 'screen xxx-screen';
  // Build DOM...
}
```

### Content Data Shape
```typescript
// Items
const item: GameItem = {
  id: 'sentient-toaster',
  name: 'Sentient Toaster',
  rarity: 'legendary',
  description: 'It has opinions about bread.',
  flavorText: '"You call THAT a bagel?"',
  slot: 'weapon',
  actions: [{ name: 'Toast', damage: 25, description: 'Burns for 3 turns' }],
  passive: { type: 'viewer_boost', value: 10 },
};
```

## Style Rules
- Single `style.css` file with sectioned comments (`/* === COMBAT === */`)
- CSS custom properties for all colors (`:root { --charcoal: #1a1a1a; }`)
- Mobile-first: base styles for 320px+, `@media (min-width: 768px)` for desktop
- `100dvh` with `100vh` fallback everywhere
- Action buttons: always `flex-shrink: 0`, bottom-anchored
- Announcer text: monospace, typewriter animation
- Transitions: 200-300ms ease, no jarring cuts

## TypeScript Rules
- Strict mode, no `any` (use `unknown` + type guards)
- Prefer `interface` over `type` for objects
- Export types from `types.ts`, import everywhere
- Pure functions in `engine/` — no side effects, no DOM, no localStorage
- `data/` files export typed arrays/objects only — no functions

## Content Guidelines
- **Announcer:** Snarky, darkly funny, escalates with depth. References "viewers" constantly. Breaks fourth wall. 300+ unique lines minimum.
- **Items:** Name should make you laugh or go "what?" Description explains what it does. Flavor text adds personality. 200+ items.
- **Enemies:** Themed to a building (janitors, elevator gremlins, vending machines, copier demons). 50+ unique enemies.
- **Events:** Multiple-choice with real consequences. At least some should be genuinely funny. 40+ events.
- **Cat:** Dry wit, judgment, occasional affection. 100+ lines.

## Performance
- Target: 60fps, <200KB gzip
- No external API calls
- No images — emoji + CSS for all visuals
- Lazy module loading not needed at this bundle size
