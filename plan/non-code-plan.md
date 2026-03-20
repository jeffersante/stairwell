# Non-Code Work Plan — Stairwell

## 1. Content Writing (HIGH — this is the game)
- 200+ items with names, descriptions, flavor text, actions
- 50+ enemies with names, descriptions, action patterns, telegraphs
- 6 bosses with unique mechanics and personality
- 300+ announcer lines across 15+ categories
- 100+ cat dialogue lines across moods and situations
- 40+ events with multiple choices and outcomes
- 10+ shop vendor personalities

**Approach:** Content is authored directly in TypeScript data files. No external CMS. Code agent writes the content inline during build.

## 2. Coolify Deployment Setup
- Add `stairwell.dizzylab.com` to Coolify
- Configure as static site (Nixpacks or simple Docker)
- Point DNS
- SSL auto-provision

## 3. Game Balance Tuning (POST-MVP)
- Enemy HP/damage scaling curves
- Item rarity distribution per floor
- Gold economy (earn rate vs shop prices)
- Viewer count thresholds for sponsor drops
- Meta-progression SP costs vs earn rate

**Note:** Get it playable first, tune later. Rough balance is fine for v1.

## 4. GitHub Repo Setup
- Initialize repo at jeffersante/stairwell
- README with game description + local dev instructions
- .gitignore for node_modules, dist
