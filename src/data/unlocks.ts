import type { MetaUnlock } from '../types';

export const allUnlocks: MetaUnlock[] = [
  // ── Starting Items ─────────────────────────────────────────
  {
    id: 'unlock_fire_extinguisher',
    name: 'Emergency Supplies',
    description: 'Start each run with a Haunted Fire Extinguisher.',
    cost: 75,
    category: 'starting_item',
    itemId: 'u_fire_extinguisher',
  },
  {
    id: 'unlock_duct_tape',
    name: 'Duct Tape Starter Kit',
    description: 'Start each run with a roll of Industrial Duct Tape (consumable).',
    cost: 50,
    category: 'starting_item',
  },
  {
    id: 'unlock_coffee_iv',
    name: 'Caffeine Dependency',
    description: 'Start each run with a Coffee IV Drip accessory.',
    cost: 150,
    category: 'starting_item',
    itemId: 'r_coffee_iv',
  },
  {
    id: 'unlock_fire_axe',
    name: 'Break Glass in Case of Run',
    description: 'Start each run with the Emergency Fire Axe.',
    cost: 200,
    category: 'starting_item',
    itemId: 'r_fire_axe',
  },
  {
    id: 'unlock_pocket_protector',
    name: 'Nerd Starter Pack',
    description: 'Start each run with the Titanium Pocket Protector.',
    cost: 175,
    category: 'starting_item',
    itemId: 'r_pocket_protector',
  },

  // ── Cat Abilities ──────────────────────────────────────────
  {
    id: 'unlock_cat_swipe',
    name: 'Cat Combat Training',
    description: 'Your cat starts with the Swipe ability at level 1.',
    cost: 100,
    category: 'cat_ability',
  },
  {
    id: 'unlock_cat_purr',
    name: 'Soothing Purr',
    description: 'Your cat can heal you for 5 HP once per floor.',
    cost: 125,
    category: 'cat_ability',
  },
  {
    id: 'unlock_cat_steal',
    name: 'Klepto Kitty',
    description: 'Your cat occasionally steals items from enemies.',
    cost: 200,
    category: 'cat_ability',
  },
  {
    id: 'unlock_cat_warn',
    name: 'Danger Whiskers',
    description: 'Your cat warns you about traps, revealing them before entry.',
    cost: 150,
    category: 'cat_ability',
  },
  {
    id: 'unlock_cat_bond_boost',
    name: 'Catnip Diplomacy',
    description: 'Start each run with +10 cat bond.',
    cost: 100,
    category: 'cat_ability',
  },

  // ── Floor Shortcuts ────────────────────────────────────────
  {
    id: 'unlock_shortcut_f3',
    name: 'Floor 3 Shortcut',
    description: 'Start runs from Floor 3 with basic equipment.',
    cost: 150,
    category: 'floor_shortcut',
  },
  {
    id: 'unlock_shortcut_f5',
    name: 'Floor 5 Shortcut',
    description: 'Start runs from Floor 5 with uncommon equipment.',
    cost: 300,
    category: 'floor_shortcut',
  },
  {
    id: 'unlock_shortcut_f7',
    name: 'Floor 7 Shortcut',
    description: 'Start runs from Floor 7 with rare equipment.',
    cost: 500,
    category: 'floor_shortcut',
  },

  // ── Viewer Perks ───────────────────────────────────────────
  {
    id: 'unlock_viewer_start',
    name: 'Pre-Show Hype',
    description: 'Start each run with 50 bonus viewers.',
    cost: 75,
    category: 'viewer_perk',
    value: 50,
  },
  {
    id: 'unlock_viewer_retention',
    name: 'Viewer Retention Algorithm',
    description: 'Viewers leave 25% slower when entertainment drops.',
    cost: 150,
    category: 'viewer_perk',
  },
  {
    id: 'unlock_sponsor_boost',
    name: 'Premium Sponsor Deal',
    description: 'Sponsor drops give 50% more gold.',
    cost: 200,
    category: 'viewer_perk',
  },
  {
    id: 'unlock_viral_moments',
    name: 'Clip It!',
    description: 'Critical hits and boss kills generate bonus viewer surges.',
    cost: 175,
    category: 'viewer_perk',
  },
  {
    id: 'unlock_viewer_milestone',
    name: 'Lower Milestone Thresholds',
    description: 'Viewer milestones trigger 20% earlier.',
    cost: 250,
    category: 'viewer_perk',
  },

  // ── Cosmetic ───────────────────────────────────────────────
  {
    id: 'unlock_announcer_snarky',
    name: 'Snarky Announcer Pack',
    description: 'Unlock additional sardonic announcer lines.',
    cost: 50,
    category: 'cosmetic',
  },
  {
    id: 'unlock_cat_name_custom',
    name: 'Cat Naming Rights',
    description: 'Choose your cat\'s name at the start of each run.',
    cost: 75,
    category: 'cosmetic',
  },
  {
    id: 'unlock_death_screen',
    name: 'Dramatic Death Screen',
    description: 'Unlock an overly dramatic death screen with slow-mo recap.',
    cost: 100,
    category: 'cosmetic',
  },
  {
    id: 'unlock_gold_numbers',
    name: 'Gold Damage Numbers',
    description: 'Damage numbers appear in gold. Does nothing. Looks amazing.',
    cost: 50,
    category: 'cosmetic',
  },
  {
    id: 'unlock_announcer_4th_wall',
    name: 'Fourth Wall Demolition Pack',
    description: 'Unlock announcer lines that acknowledge this is a game. More than usual.',
    cost: 125,
    category: 'cosmetic',
  },
];
