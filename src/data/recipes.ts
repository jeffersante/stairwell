// ============================================================
// CRAFTING RECIPES — "Maintenance"
// Combine items at Maintenance Stations to create better gear.
// Some recipes are known from the start. Others must be
// discovered through experimentation or blueprint scrolls.
// ============================================================

export type MaterialTag = 'metal' | 'organic' | 'electrical' | 'supernatural' | 'paper' | 'chemical' | 'fabric' | 'liquid';

export interface CraftingRecipe {
  id: string;
  name: string;
  description: string;
  ingredients: { itemId?: string; materialTag?: string; count: number }[];
  result: { itemId: string } | { type: 'upgrade'; bonusDamage?: string; bonusAC?: number; addEffect?: string };
  discoveredByDefault: boolean;
  flavorText: string;
}

export const allRecipes: CraftingRecipe[] = [
  // ============================================================
  // WEAPON CRAFTING — Known Recipes
  // ============================================================
  {
    id: 'r_chemical_mop',
    name: 'Chemical Mop of Purification',
    description: 'A mop infused with cleaning chemicals. It purifies everything it touches. Violently.',
    ingredients: [
      { itemId: 'c_mop_of_destiny', count: 1 },
      { materialTag: 'chemical', count: 1 },
    ],
    result: { type: 'upgrade', bonusDamage: '1d6', addEffect: 'poison' },
    discoveredByDefault: true,
    flavorText: 'The mop head glows faintly green. This is either very good or very bad.',
  },
  {
    id: 'r_caffeinated_keyboard',
    name: 'Caffeinated Input Device',
    description: 'A keyboard soaked in coffee. Types faster. Hits harder. Smells great.',
    ingredients: [
      { itemId: 'c_keyboard_ancient', count: 1 },
      { itemId: 'c_coffee_mug', count: 1 },
    ],
    result: { type: 'upgrade', bonusDamage: '1d4+2', addEffect: 'hit_bonus_2' },
    discoveredByDefault: true,
    flavorText: 'The keys are sticky but your reflexes are INCREDIBLE.',
  },
  {
    id: 'r_double_stapler',
    name: 'Double Stapler',
    description: 'Two staplers duct-taped together. Attacks twice because why wouldn\'t it.',
    ingredients: [
      { itemId: 'c_stapler_remorse', count: 2 },
    ],
    result: { type: 'upgrade', bonusDamage: '2d4', addEffect: 'attacks_twice' },
    discoveredByDefault: true,
    flavorText: 'Milton would weep. Milton would also want one.',
  },
  {
    id: 'r_thermobaric_canister',
    name: 'Thermobaric Canister',
    description: 'A fire extinguisher turned into an incendiary device. The irony is not lost on anyone.',
    ingredients: [
      { itemId: 'u_fire_extinguisher', count: 1 },
      { materialTag: 'chemical', count: 1 },
    ],
    result: { itemId: 'crafted_thermobaric' },
    discoveredByDefault: false,
    flavorText: 'You turned a safety device into a weapon. The announcer gives you bonus points for irony.',
  },
  {
    id: 'r_electrified_cord',
    name: 'Electrified Extension Cord',
    description: 'An extension cord that doesn\'t just trip you — it electrocutes you.',
    ingredients: [
      { itemId: 'c_extension_cord', count: 1 },
      { materialTag: 'electrical', count: 1 },
    ],
    result: { type: 'upgrade', bonusDamage: '1d8', addEffect: 'stun' },
    discoveredByDefault: true,
    flavorText: 'OSHA has entered the chat. OSHA has been electrocuted.',
  },
  {
    id: 'r_fluorescent_lance',
    name: 'Fluorescent Lance of Office Warfare',
    description: 'Two fluorescent tubes fused into a crackling lance of buzzing light.',
    ingredients: [
      { itemId: 'u_fluorescent_tube', count: 2 },
    ],
    result: { type: 'upgrade', bonusDamage: '2d6', addEffect: 'stun' },
    discoveredByDefault: false,
    flavorText: 'The humming is now weaponized. It was always a matter of time.',
  },

  // ============================================================
  // ARMOR CRAFTING
  // ============================================================
  {
    id: 'r_spectral_cabinet',
    name: 'Spectral Filing Cabinet',
    description: 'A filing cabinet possessed by ghost essence. Legendary armor that phases between dimensions.',
    ingredients: [
      { itemId: 'c_filing_cabinet_lid', count: 1 },
      { materialTag: 'supernatural', count: 1 },
    ],
    result: { itemId: 'crafted_spectral_cabinet' },
    discoveredByDefault: false,
    flavorText: 'The drawers open to other realities. Do NOT file anything in them.',
  },
  {
    id: 'r_reinforced_vest',
    name: 'Reinforced Hi-Vis Vest',
    description: 'A high-visibility vest reinforced with metal scraps. Now you\'re visible AND durable.',
    ingredients: [
      { itemId: 'c_hi_vis_vest', count: 1 },
      { materialTag: 'metal', count: 1 },
    ],
    result: { type: 'upgrade', bonusAC: 3 },
    discoveredByDefault: true,
    flavorText: 'Safety first, second, and third. Fourth is violence.',
  },
  {
    id: 'r_duct_tape_armor',
    name: 'Duct Tape Full Plate',
    description: 'An entire suit of armor made from duct tape. Surprisingly effective.',
    ingredients: [
      { itemId: 'c_duct_tape_wrap', count: 3 },
    ],
    result: { type: 'upgrade', bonusAC: 4 },
    discoveredByDefault: true,
    flavorText: 'Red Green would be proud. The fashion world would not.',
  },
  {
    id: 'r_bubble_bomb_vest',
    name: 'Reactive Bubble Wrap Vest',
    description: 'Bubble wrap that pops on impact, releasing a shockwave.',
    ingredients: [
      { itemId: 'c_bubble_wrap', count: 1 },
      { materialTag: 'chemical', count: 1 },
    ],
    result: { type: 'upgrade', bonusAC: 2, addEffect: 'damage_on_hit_1d4' },
    discoveredByDefault: false,
    flavorText: 'Pop pop pop. Each pop is a tiny explosion. It\'s satisfying AND defensive.',
  },

  // ============================================================
  // UTILITY / ACCESSORY CRAFTING
  // ============================================================
  {
    id: 'r_creative_accounting',
    name: 'Creative Accounting Tool',
    description: 'A calculator merged with tax forms. Generates gold from thin air (legally dubious).',
    ingredients: [
      { itemId: 'c_calculator', count: 1 },
      { itemId: 'u_tax_forms', count: 1 },
    ],
    result: { itemId: 'crafted_accounting_tool' },
    discoveredByDefault: false,
    flavorText: 'The IRS can\'t audit you if the IRS doesn\'t exist in this dimension.',
  },
  {
    id: 'r_trap_detector',
    name: 'Janitor\'s Sixth Sense',
    description: 'Safety goggles infused with building blueprints. Traps glow bright red.',
    ingredients: [
      { itemId: 'c_safety_goggles', count: 1 },
      { itemId: 'r_building_blueprint', count: 1 },
    ],
    result: { itemId: 'crafted_trap_detector' },
    discoveredByDefault: false,
    flavorText: 'You see the building as it truly is. You immediately wish you didn\'t.',
  },
  {
    id: 'r_cat_communicator',
    name: 'Cat-Human Translation Collar',
    description: 'A bluetooth earpiece attuned to feline frequencies. Understand what the cat actually thinks.',
    ingredients: [
      { itemId: 'u_bluetooth_earpiece', count: 1 },
      { itemId: 'u_cat_calendar', count: 1 },
    ],
    result: { itemId: 'crafted_cat_collar' },
    discoveredByDefault: false,
    flavorText: 'The cat has opinions about your combat strategy. They are all devastating.',
  },
  {
    id: 'r_master_keyring',
    name: 'Master Keyring of All Doors',
    description: 'A collection of keys that opens any door in the building. Some doors should stay closed.',
    ingredients: [
      { itemId: 'u_janitors_master_key', count: 1 },
      { itemId: 'c_old_key', count: 3 },
    ],
    result: { itemId: 'crafted_master_keyring' },
    discoveredByDefault: false,
    flavorText: 'Every lock in the building just shuddered.',
  },

  // ============================================================
  // CONSUMABLE CRAFTING
  // ============================================================
  {
    id: 'r_mega_coffee',
    name: 'Eldritch Espresso',
    description: 'Coffee so strong it bends spacetime. Full heal + temporary stat boost.',
    ingredients: [
      { itemId: 'c_coffee_mug', count: 1 },
      { itemId: 'u_espresso_shot', count: 1 },
      { materialTag: 'supernatural', count: 1 },
    ],
    result: { itemId: 'crafted_eldritch_espresso' },
    discoveredByDefault: false,
    flavorText: 'You can see through walls. Also through time. The barista at the end of the universe nods approvingly.',
  },
  {
    id: 'r_super_bandaid',
    name: 'Industrial First Aid Kit',
    description: 'A bandaid, hand sanitizer, and chemical know-how combine into actual medicine.',
    ingredients: [
      { itemId: 'c_bandaid', count: 1 },
      { itemId: 'c_hand_sanitizer', count: 1 },
    ],
    result: { itemId: 'crafted_first_aid' },
    discoveredByDefault: true,
    flavorText: 'It\'s not FDA approved but neither is anything else in this building.',
  },
  {
    id: 'r_nuke_noodles',
    name: 'Thermonuclear Cup Noodles',
    description: 'Cup noodles heated with pure electrical energy. Heals you. Burns everything else.',
    ingredients: [
      { itemId: 'c_cup_noodles', count: 1 },
      { materialTag: 'electrical', count: 1 },
    ],
    result: { itemId: 'crafted_nuke_noodles' },
    discoveredByDefault: false,
    flavorText: 'The MSG content is immeasurable. The power is absolute.',
  },
  {
    id: 'r_mega_energy',
    name: 'Hypercaffeinated Disaster',
    description: 'Every energy source in your inventory combined into one heart-stopping beverage.',
    ingredients: [
      { itemId: 'c_energy_drink', count: 1 },
      { itemId: 'c_vending_coffee', count: 1 },
    ],
    result: { itemId: 'crafted_hypercaf' },
    discoveredByDefault: true,
    flavorText: 'Your heart is beating so fast it\'s technically vibrating. You\'ve never felt more alive (or closer to death).',
  },

  // ============================================================
  // GENERIC UPGRADE RECIPES
  // ============================================================
  {
    id: 'r_generic_weapon_upgrade',
    name: 'Jury-Rigged Upgrade',
    description: 'Combine three common weapons into something slightly less common.',
    ingredients: [
      { materialTag: 'metal', count: 3 },
    ],
    result: { type: 'upgrade', bonusDamage: '1d4' },
    discoveredByDefault: true,
    flavorText: 'It\'s not pretty. It\'s not elegant. It works.',
  },
  {
    id: 'r_duct_tape_anything',
    name: 'Duct Tape Fix',
    description: 'Apply duct tape to any item. It just... works better now.',
    ingredients: [
      { itemId: 'c_duct_tape_wrap', count: 1 },
    ],
    result: { type: 'upgrade', bonusDamage: '1d2', bonusAC: 1 },
    discoveredByDefault: true,
    flavorText: 'The universal constant: duct tape improves everything.',
  },
  {
    id: 'r_paper_armor',
    name: 'Origami Plate Mail',
    description: 'Fold enough paper in the right way and it becomes surprisingly resilient.',
    ingredients: [
      { materialTag: 'paper', count: 4 },
    ],
    result: { type: 'upgrade', bonusAC: 3 },
    discoveredByDefault: false,
    flavorText: 'One thousand cranes for a wish. Four reams for armor. The math checks out.',
  },

  // ============================================================
  // WEIRD / EXPERIMENTAL RECIPES
  // ============================================================
  {
    id: 'r_stress_nuke',
    name: 'Stress Ball Grenade',
    description: 'A stress ball filled with volatile chemicals. Squeeze to detonate.',
    ingredients: [
      { itemId: 'c_stress_ball', count: 1 },
      { materialTag: 'chemical', count: 2 },
    ],
    result: { itemId: 'crafted_stress_grenade' },
    discoveredByDefault: false,
    flavorText: 'Squeeze gently to relieve stress. Squeeze hard to relieve the enemy of their HP.',
  },
  {
    id: 'r_haunted_fax_bomb',
    name: 'Haunted Fax Bomb',
    description: 'A haunted fax machine rigged to send itself. Ethereal damage on arrival.',
    ingredients: [
      { itemId: 'l_haunted_fax', count: 1 },
      { materialTag: 'paper', count: 2 },
    ],
    result: { itemId: 'crafted_fax_bomb' },
    discoveredByDefault: false,
    flavorText: 'It faxes itself INTO the enemy. The receiving end is fatal.',
  },
  {
    id: 'r_lint_golem',
    name: 'Lint Golem Core',
    description: 'Compress lint and fabric into an animated servant. It follows you and attacks.',
    ingredients: [
      { itemId: 'c_lint_ball', count: 3 },
      { materialTag: 'fabric', count: 2 },
    ],
    result: { itemId: 'crafted_lint_golem' },
    discoveredByDefault: false,
    flavorText: 'It lives. It fights. It sheds everywhere. The cat is fascinated.',
  },
  {
    id: 'r_clipboard_of_authority',
    name: 'Clipboard of Absolute Authority',
    description: 'A clipboard with a whiteboard backing. Anyone who sees it assumes you\'re in charge.',
    ingredients: [
      { itemId: 'c_clipboard', count: 1 },
      { itemId: 'u_whiteboard', count: 1 },
    ],
    result: { itemId: 'crafted_authority_clipboard' },
    discoveredByDefault: false,
    flavorText: 'Walk with purpose, hold the clipboard, and nobody questions you. Nobody.',
  },
  {
    id: 'r_motivational_bomb',
    name: 'Motivational Singularity',
    description: 'Concentrate so much positivity into one poster that it collapses into a weapon.',
    ingredients: [
      { itemId: 'u_motivational_poster', count: 3 },
    ],
    result: { itemId: 'crafted_motivational_bomb' },
    discoveredByDefault: false,
    flavorText: '"Believe in yourself" at sufficient density becomes "believe or else."',
  },
  {
    id: 'r_battery_bomb',
    name: 'Dead Battery Bomb',
    description: 'A pile of dead batteries, shorted together. The last spark of each one, combined.',
    ingredients: [
      { itemId: 'c_dead_battery', count: 4 },
    ],
    result: { itemId: 'crafted_battery_bomb' },
    discoveredByDefault: false,
    flavorText: 'They said these were dead. They were wrong. They were dormant.',
  },
  {
    id: 'r_glitter_tape_trap',
    name: 'Glitter Tape IED',
    description: 'Caution tape loaded with glitter and chemical irritants. Place it anywhere.',
    ingredients: [
      { itemId: 'c_caution_tape', count: 1 },
      { itemId: 'r_glitter_bomb', count: 1 },
    ],
    result: { itemId: 'crafted_glitter_trap' },
    discoveredByDefault: false,
    flavorText: 'The glitter is the real weapon. They\'ll be finding it for eternity.',
  },
  {
    id: 'r_penny_railgun',
    name: 'Lucky Penny Railgun',
    description: 'A copper pipe, some electrical components, and a lucky penny. Physics does the rest.',
    ingredients: [
      { itemId: 'c_lucky_penny', count: 1 },
      { itemId: 'r_copper_pipe', count: 1 },
      { materialTag: 'electrical', count: 1 },
    ],
    result: { itemId: 'crafted_penny_railgun' },
    discoveredByDefault: false,
    flavorText: 'The penny was lucky. Now it\'s BALLISTIC.',
  },
  {
    id: 'r_vending_mech',
    name: 'Vending Machine Power Fist',
    description: 'A vending token jury-rigged to a hand dryer motor. Dispenses violence.',
    ingredients: [
      { itemId: 'u_vending_token', count: 1 },
      { itemId: 'u_hand_dryer', count: 1 },
    ],
    result: { itemId: 'crafted_vending_fist' },
    discoveredByDefault: false,
    flavorText: 'INSERT FIST. SELECT PAIN. PLEASE TAKE YOUR DESTRUCTION.',
  },
];
