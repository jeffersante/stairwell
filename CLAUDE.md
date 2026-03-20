# CLAUDE.md — Stairwell Code Agent Conventions

## Project
Stairwell — a roguelike browser game. Vanilla TypeScript + Vite + CSS. No framework, no backend.

## Commands
- `npm run dev` — dev server
- `npm run build` — production build (tsc + vite)
- `npx tsc --noEmit` — typecheck only

## Architecture (3 layers, strict separation)
1. **engine/** — Pure game logic. NO DOM imports. NO side effects. Functions take state, return new state.
2. **ui/** — DOM rendering. Consumes engine state. Never modifies game state directly.
3. **data/** — Pure typed data arrays/objects. NO functions, NO logic, NO DOM.

## Naming
- Files: kebab-case (`floor-map.ts`)
- Types/Interfaces: PascalCase (`GameItem`)
- Functions: camelCase (`generateFloor`)
- Constants: UPPER_SNAKE_CASE (`MAX_INVENTORY`)
- CSS classes: kebab-case (`.combat-actions`)

## DOM Helper
```typescript
function el(tag: string, className?: string, text?: string): HTMLElement {
  const e = document.createElement(tag);
  if (className) e.className = className;
  if (text) e.textContent = text;
  return e;
}
```

## Screen Pattern
```typescript
export function renderXxxScreen(container: HTMLElement, onTransition: (next: GamePhase) => void): void {
  container.innerHTML = '';
  container.className = 'screen xxx-screen';
  // Build DOM imperatively
}
```

## State Access
```typescript
import { getRunState, modifyRun, getMetaState, modifyMeta, saveMetaState } from '../engine/state';
```

## Key Rules
- TypeScript strict mode. No `any`.
- All types in `src/types.ts`. Import from there.
- Seeded RNG only (mulberry32 in utils.ts). Never `Math.random()` in game logic.
- Mobile-first CSS. Use `dvh` with `vh` fallback. Bottom-anchor all action buttons.
- Content data exports typed arrays: `export const commonItems: GameItem[] = [...]`
- 200+ items, 50+ enemies, 300+ announcer lines, 40+ events, 100+ cat lines minimum.
- Emoji for all visuals. No images.
- Color palette: charcoal (#1a1a1a), concrete (#2d2d2d), muted green (#4a7c59), emergency red (#c44), gold (#d4a843), off-white (#e8e8e8).
- Monospace font for announcer text, Inter for UI.

## Content Tone
- **Announcer:** Game show host meets sardonic deity. Obsessed with ratings. Breaks fourth wall.
- **Items:** Names should make you laugh or go "what?" Flavor text adds personality.
- **Enemies:** Building-themed (janitors, elevators, copiers, vending machines, supernatural office horrors).
- **Cat:** Dry wit, judgment, occasional affection. Never try-hard funny.
- **Events:** Multiple choice with real consequences. Some genuinely funny.
