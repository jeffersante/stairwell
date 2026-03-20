import type { Enemy } from '../types';

// ══════════════════════════════════════════════════════════════
//  FLOORS 1–5: Basement & Lobby Nuisances
// ══════════════════════════════════════════════════════════════

const lobbyEnemies: Enemy[] = [
  {
    id: 'dust-bunny',
    name: 'Sentient Dust Bunny',
    emoji: '🐇',
    description: 'A clump of dust and lint that achieved consciousness under the lobby radiator. It resents you for breathing its relatives.',
    floorRange: [1, 3],
    hp: 12,
    actions: [
      { name: 'Lint Storm', damage: 3, telegraph: 'The dust bunny puffs up ominously...' },
      { name: 'Sneeze Trigger', damage: 2, statusEffect: 'stun', statusDuration: 1, telegraph: 'Allergens swirl in the air...' },
    ],
    lootTable: [
      { itemId: 'common-lint-roller', weight: 40 },
      { itemId: 'common-dustpan', weight: 30 },
    ],
    goldDrop: [1, 4],
    xpDrop: 5,
  },
  {
    id: 'lobby-rat',
    name: 'Lobby Rat',
    emoji: '🐀',
    description: 'Not just any rat. This one has a lanyard.',
    floorRange: [1, 4],
    hp: 15,
    actions: [
      { name: 'Gnaw', damage: 4, telegraph: 'The rat bares its yellowed teeth...' },
      { name: 'Tail Whip', damage: 3, telegraph: 'Its tail coils back like a spring...' },
      { name: 'Screech', damage: 2, statusEffect: 'stun', statusDuration: 1, telegraph: 'The rat inhales deeply...' },
    ],
    lootTable: [
      { itemId: 'common-cheese-wedge', weight: 35 },
      { itemId: 'common-rat-badge', weight: 25 },
    ],
    goldDrop: [2, 5],
    xpDrop: 6,
  },
  {
    id: 'revolving-door',
    name: 'Malicious Revolving Door',
    emoji: '🚪',
    description: 'It spins. You spin. Nobody wins.',
    floorRange: [1, 5],
    hp: 20,
    actions: [
      { name: 'Full Rotation', damage: 5, telegraph: 'The door accelerates to unsafe speeds...' },
      { name: 'Pinch', damage: 3, statusEffect: 'bleed', statusDuration: 2, telegraph: 'The gap between panels narrows...' },
    ],
    lootTable: [
      { itemId: 'common-door-handle', weight: 30 },
      { itemId: 'uncommon-revolving-blade', weight: 15 },
    ],
    goldDrop: [2, 6],
    xpDrop: 8,
  },
  {
    id: 'water-cooler-spirit',
    name: 'Water Cooler Spirit',
    emoji: '🚰',
    description: 'The ghost of ten thousand awkward conversations. It gurgles with the small talk of the damned.',
    floorRange: [1, 5],
    hp: 14,
    actions: [
      { name: 'Splash', damage: 3, telegraph: 'Water begins bubbling aggressively...' },
      { name: 'Idle Gossip', damage: 2, statusEffect: 'existential_dread', statusDuration: 2, telegraph: 'It starts talking about the weather...' },
    ],
    lootTable: [
      { itemId: 'common-paper-cup', weight: 40 },
      { itemId: 'common-water-jug', weight: 20 },
    ],
    goldDrop: [1, 4],
    xpDrop: 5,
  },
  {
    id: 'mailroom-gremlin',
    name: 'Mailroom Gremlin',
    emoji: '📦',
    description: 'Explains why your packages always arrive damaged. It feeds on tracking numbers.',
    floorRange: [1, 4],
    hp: 13,
    actions: [
      { name: 'Box Throw', damage: 4, telegraph: 'It hoists a suspiciously heavy parcel...' },
      { name: 'Papercut Barrage', damage: 3, statusEffect: 'bleed', statusDuration: 1, telegraph: 'Manila envelopes fan out like shuriken...' },
    ],
    lootTable: [
      { itemId: 'common-packing-tape', weight: 35 },
      { itemId: 'common-box-cutter', weight: 25 },
    ],
    goldDrop: [2, 5],
    xpDrop: 6,
  },
  {
    id: 'flickering-light',
    name: 'Flickering Fluorescent',
    emoji: '💡',
    description: 'The light that never quite works. It has learned to weaponize its intermittence.',
    floorRange: [2, 5],
    hp: 10,
    actions: [
      { name: 'Strobe Flash', damage: 3, statusEffect: 'stun', statusDuration: 1, telegraph: 'The buzzing intensifies...' },
      { name: 'Glass Shatter', damage: 5, telegraph: 'Cracks spider across the tube...' },
    ],
    lootTable: [
      { itemId: 'common-light-bulb', weight: 40 },
      { itemId: 'uncommon-ballast', weight: 10 },
    ],
    goldDrop: [1, 4],
    xpDrop: 5,
  },
  {
    id: 'wet-mop-slime',
    name: 'Wet Mop Slime',
    emoji: '🫧',
    description: 'The mop water gained sentience. It slides across linoleum with purpose. That purpose is you.',
    floorRange: [1, 4],
    hp: 11,
    actions: [
      { name: 'Slippery Lunge', damage: 3, statusEffect: 'stun', statusDuration: 1, telegraph: 'The puddle surges toward your feet...' },
      { name: 'Dirty Splash', damage: 4, statusEffect: 'poison', statusDuration: 1, telegraph: 'Gray-brown water arcs upward...' },
    ],
    lootTable: [
      { itemId: 'common-sponge', weight: 40 },
      { itemId: 'common-bucket', weight: 25 },
    ],
    goldDrop: [1, 3],
    xpDrop: 4,
  },
  {
    id: 'broken-thermostat',
    name: 'Broken Thermostat',
    emoji: '🌡️',
    description: 'Set to 72. Reads 72. It is not 72. It has never been 72. The thermostat lies, and the lies have become violent.',
    floorRange: [2, 5],
    hp: 14,
    actions: [
      { name: 'Heat Wave', damage: 4, statusEffect: 'on_fire', statusDuration: 1, telegraph: 'The display reads 999°...' },
      { name: 'Cold Snap', damage: 3, statusEffect: 'stun', statusDuration: 1, telegraph: 'Frost crystallizes on every surface...' },
    ],
    lootTable: [
      { itemId: 'common-thermometer', weight: 35 },
      { itemId: 'uncommon-climate-control', weight: 10 },
    ],
    goldDrop: [2, 5],
    xpDrop: 6,
  },
  {
    id: 'sentient-hand-dryer',
    name: 'Sentient Hand Dryer',
    emoji: '💨',
    description: 'BWAAAAAAAA. That is its war cry. That is its only cry. It has been screaming since 2003.',
    floorRange: [1, 5],
    hp: 16,
    actions: [
      { name: 'Jet Blast', damage: 4, telegraph: 'The nozzle rotates toward your face...' },
      { name: 'Deafening Roar', damage: 3, statusEffect: 'stun', statusDuration: 1, telegraph: 'It activates at maximum volume...' },
    ],
    lootTable: [
      { itemId: 'common-paper-towel', weight: 40 },
      { itemId: 'common-soap-dispenser', weight: 20 },
    ],
    goldDrop: [1, 4],
    xpDrop: 5,
  },
  {
    id: 'security-cam',
    name: 'Rogue Security Camera',
    emoji: '📷',
    description: 'It sees everything. It judges everything. Now it shoots lasers, because why not.',
    floorRange: [2, 6],
    hp: 18,
    actions: [
      { name: 'Laser Focus', damage: 5, telegraph: 'A red dot appears on your chest...' },
      { name: 'Flash Capture', damage: 3, statusEffect: 'stun', statusDuration: 1, telegraph: 'The flash charges up...' },
      { name: 'Pan & Scan', damage: 4, telegraph: 'The camera rotates menacingly...' },
    ],
    lootTable: [
      { itemId: 'common-memory-card', weight: 30 },
      { itemId: 'uncommon-lens-cap', weight: 15 },
    ],
    goldDrop: [3, 7],
    xpDrop: 8,
  },
];

// ══════════════════════════════════════════════════════════════
//  FLOORS 5–10: Office Floor Horrors
// ══════════════════════════════════════════════════════════════

const officeEnemies: Enemy[] = [
  {
    id: 'copier-demon',
    name: 'Copier Demon',
    emoji: '🖨️',
    description: 'PC LOAD LETTER? It loads something far worse. Paper jams are the least of your concerns.',
    floorRange: [5, 10],
    hp: 28,
    actions: [
      { name: 'Paper Jam Fury', damage: 6, telegraph: 'ERROR ERROR ERROR flashes across the display...' },
      { name: 'Toner Spray', damage: 5, statusEffect: 'poison', statusDuration: 2, telegraph: 'Black powder billows from every seam...' },
      { name: 'Collate & Staple', damage: 8, telegraph: 'The stapler attachment extends with a CHUNK...' },
    ],
    lootTable: [
      { itemId: 'common-toner-cartridge', weight: 30 },
      { itemId: 'uncommon-paper-shredder', weight: 15 },
      { itemId: 'rare-original-document', weight: 5 },
    ],
    goldDrop: [5, 12],
    xpDrop: 15,
  },
  {
    id: 'cubicle-mimic',
    name: 'Cubicle Mimic',
    emoji: '🏢',
    description: 'That is not a cubicle. That has never been a cubicle. Those are teeth.',
    floorRange: [5, 10],
    hp: 32,
    actions: [
      { name: 'Wall Slam', damage: 7, telegraph: 'The partition walls lurch inward...' },
      { name: 'Swivel Chair Launch', damage: 6, telegraph: 'An office chair rockets toward you...' },
      { name: 'Acoustic Tile Drop', damage: 5, statusEffect: 'stun', statusDuration: 1, telegraph: 'The ceiling tiles rattle ominously...' },
    ],
    lootTable: [
      { itemId: 'common-desk-lamp', weight: 25 },
      { itemId: 'uncommon-ergonomic-keyboard', weight: 15 },
      { itemId: 'rare-corner-office-key', weight: 5 },
    ],
    goldDrop: [6, 14],
    xpDrop: 16,
  },
  {
    id: 'vending-machine',
    name: 'Hostile Vending Machine',
    emoji: '🎰',
    description: 'Your snack is stuck on the spiral. It knows. It feeds on your impotent rage.',
    floorRange: [5, 10],
    hp: 35,
    actions: [
      { name: 'Can Barrage', damage: 7, telegraph: 'The machine rumbles and shakes...' },
      { name: 'Price Gouge', damage: 4, statusEffect: 'cursed', statusDuration: 3, telegraph: 'Prices on the display skyrocket...' },
      { name: 'Body Slam', damage: 9, telegraph: 'The vending machine tips forward...' },
    ],
    lootTable: [
      { itemId: 'common-stale-chips', weight: 30 },
      { itemId: 'uncommon-energy-drink', weight: 20 },
      { itemId: 'rare-golden-coin-return', weight: 5 },
    ],
    goldDrop: [8, 16],
    xpDrop: 18,
  },
  {
    id: 'stapler-swarm',
    name: 'Stapler Swarm',
    emoji: '📎',
    description: 'Forty staplers move as one. They share a single, malevolent purpose. That purpose is stapling you.',
    floorRange: [5, 9],
    hp: 22,
    actions: [
      { name: 'Staple Storm', damage: 6, statusEffect: 'bleed', statusDuration: 2, telegraph: 'Dozens of staplers click open in unison...' },
      { name: 'Swarm Dive', damage: 5, telegraph: 'The swarm rises and banks sharply...' },
    ],
    lootTable: [
      { itemId: 'common-staple-remover', weight: 35 },
      { itemId: 'uncommon-red-stapler', weight: 15 },
    ],
    goldDrop: [4, 10],
    xpDrop: 12,
  },
  {
    id: 'coffee-elemental',
    name: 'Coffee Elemental',
    emoji: '☕',
    description: 'Born from the breakroom carafe that nobody ever cleans. It is 40% coffee, 60% rage.',
    floorRange: [5, 10],
    hp: 26,
    actions: [
      { name: 'Scalding Splash', damage: 6, statusEffect: 'on_fire', statusDuration: 2, telegraph: 'Steam erupts from its liquid body...' },
      { name: 'Caffeine Rush', damage: 8, telegraph: 'It vibrates at an impossible frequency...' },
      { name: 'Bitter Dregs', damage: 4, statusEffect: 'poison', statusDuration: 2, telegraph: 'Thick sludge pools at its base...' },
    ],
    lootTable: [
      { itemId: 'common-coffee-mug', weight: 30 },
      { itemId: 'uncommon-espresso-shot', weight: 20 },
    ],
    goldDrop: [5, 11],
    xpDrop: 14,
  },
  {
    id: 'keyboard-spider',
    name: 'Keyboard Spider',
    emoji: '⌨️',
    description: 'Lives in the crumb-encrusted gaps between the keys. Has eight legs made of USB cables.',
    floorRange: [6, 10],
    hp: 20,
    actions: [
      { name: 'Key Clatter', damage: 5, telegraph: 'Keys rattle across the floor toward you...' },
      { name: 'Cable Bind', damage: 4, statusEffect: 'stun', statusDuration: 1, telegraph: 'USB tendrils snake out...' },
    ],
    lootTable: [
      { itemId: 'common-keycap', weight: 35 },
      { itemId: 'uncommon-mechanical-switch', weight: 15 },
    ],
    goldDrop: [4, 9],
    xpDrop: 11,
  },
  {
    id: 'passive-aggressive-note',
    name: 'Passive-Aggressive Note',
    emoji: '📝',
    description: '"Per my LAST existence, I asked you NOT to leave dishes in the ethereal sink." It floats. It judges. It cuts.',
    floorRange: [5, 8],
    hp: 16,
    actions: [
      { name: 'Papercut', damage: 4, statusEffect: 'bleed', statusDuration: 2, telegraph: 'The note folds itself into something sharp...' },
      { name: 'Guilt Trip', damage: 3, statusEffect: 'existential_dread', statusDuration: 3, telegraph: 'The handwriting somehow gets more disappointed...' },
    ],
    lootTable: [
      { itemId: 'common-sticky-note', weight: 40 },
      { itemId: 'uncommon-fountain-pen', weight: 15 },
    ],
    goldDrop: [3, 7],
    xpDrop: 9,
  },
];

// ══════════════════════════════════════════════════════════════
//  FLOORS 10–15: Maintenance & Infrastructure
// ══════════════════════════════════════════════════════════════

const maintenanceEnemies: Enemy[] = [
  {
    id: 'janitor-wraith',
    name: 'Janitor Wraith',
    emoji: '🧹',
    description: 'The ghost of a janitor who never got to retire. Still mopping. Still angry about the mess you just made.',
    floorRange: [10, 15],
    hp: 40,
    actions: [
      { name: 'Mop Sweep', damage: 8, telegraph: 'The spectral mop winds back...' },
      { name: 'Bucket Toss', damage: 7, statusEffect: 'stun', statusDuration: 1, telegraph: 'A ghostly bucket lifts off the ground...' },
      { name: 'Wet Floor Curse', damage: 5, statusEffect: 'cursed', statusDuration: 3, telegraph: 'A yellow sign materializes ominously...' },
    ],
    lootTable: [
      { itemId: 'uncommon-master-key', weight: 15 },
      { itemId: 'uncommon-wet-floor-sign', weight: 25 },
      { itemId: 'rare-janitors-keyring', weight: 5 },
    ],
    goldDrop: [10, 20],
    xpDrop: 22,
  },
  {
    id: 'hvac-phantom',
    name: 'HVAC Phantom',
    emoji: '🌀',
    description: 'It lives in the ventilation. It IS the ventilation. The building breathes because it chooses to.',
    floorRange: [10, 15],
    hp: 38,
    actions: [
      { name: 'Arctic Blast', damage: 7, statusEffect: 'stun', statusDuration: 1, telegraph: 'The temperature plummets...' },
      { name: 'Suffocating Heat', damage: 6, statusEffect: 'on_fire', statusDuration: 2, telegraph: 'The vents glow red-hot...' },
      { name: 'Duct Slam', damage: 9, telegraph: 'Metal groans in the ceiling above...' },
    ],
    lootTable: [
      { itemId: 'uncommon-air-filter', weight: 25 },
      { itemId: 'rare-thermostat-control', weight: 8 },
    ],
    goldDrop: [9, 18],
    xpDrop: 20,
  },
  {
    id: 'pipe-serpent',
    name: 'Pipe Serpent',
    emoji: '🐍',
    description: 'Thirty feet of corroded copper pipe that learned to slither. Hisses steam instead of venom.',
    floorRange: [10, 15],
    hp: 42,
    actions: [
      { name: 'Steam Blast', damage: 8, statusEffect: 'on_fire', statusDuration: 2, telegraph: 'Pressure gauges go red...' },
      { name: 'Constrict', damage: 7, telegraph: 'Pipes coil around the room...' },
      { name: 'Corrosion Spit', damage: 6, statusEffect: 'poison', statusDuration: 3, telegraph: 'Green liquid drips from its joints...' },
    ],
    lootTable: [
      { itemId: 'uncommon-pipe-wrench', weight: 25 },
      { itemId: 'uncommon-copper-fitting', weight: 20 },
      { itemId: 'rare-pressure-valve', weight: 5 },
    ],
    goldDrop: [10, 20],
    xpDrop: 22,
  },
  {
    id: 'fuse-box-horror',
    name: 'Fuse Box Horror',
    emoji: '⚡',
    description: 'Every blown fuse, every tripped breaker — it remembers them all. And it holds grudges.',
    floorRange: [10, 14],
    hp: 35,
    actions: [
      { name: 'Arc Flash', damage: 9, telegraph: 'Sparks cascade from the open panel...' },
      { name: 'Short Circuit', damage: 6, statusEffect: 'stun', statusDuration: 2, telegraph: 'The lights flicker wildly...' },
    ],
    lootTable: [
      { itemId: 'uncommon-fuse', weight: 30 },
      { itemId: 'uncommon-rubber-gloves', weight: 20 },
    ],
    goldDrop: [8, 16],
    xpDrop: 18,
  },
  {
    id: 'asbestos-golem',
    name: 'Asbestos Golem',
    emoji: '🗿',
    description: 'This building was constructed in 1973 and it shows. Do not inhale.',
    floorRange: [11, 15],
    hp: 50,
    actions: [
      { name: 'Toxic Cloud', damage: 5, statusEffect: 'poison', statusDuration: 3, telegraph: 'White fibers drift from its crumbling body...' },
      { name: 'Body Slam', damage: 10, telegraph: 'It lurches forward, shedding chunks...' },
      { name: 'Insulation Wrap', damage: 6, statusEffect: 'stun', statusDuration: 1, telegraph: 'Fibrous tendrils reach out...' },
    ],
    lootTable: [
      { itemId: 'uncommon-respirator', weight: 20 },
      { itemId: 'rare-hazmat-suit', weight: 5 },
    ],
    goldDrop: [12, 22],
    xpDrop: 25,
  },
  {
    id: 'mold-colony',
    name: 'Sentient Mold Colony',
    emoji: '🟢',
    description: 'Started in the bathroom. Spread to the breakroom. Now it has opinions and a rudimentary nervous system.',
    floorRange: [10, 14],
    hp: 30,
    actions: [
      { name: 'Spore Burst', damage: 5, statusEffect: 'poison', statusDuration: 3, telegraph: 'Spores fill the air in a green haze...' },
      { name: 'Creeping Growth', damage: 6, telegraph: 'Tendrils of mold crawl across the floor...' },
    ],
    lootTable: [
      { itemId: 'uncommon-bleach-spray', weight: 30 },
      { itemId: 'common-sponge', weight: 25 },
    ],
    goldDrop: [7, 14],
    xpDrop: 16,
  },
  {
    id: 'fire-extinguisher-berserker',
    name: 'Rogue Fire Extinguisher',
    emoji: '🧯',
    description: 'It was supposed to fight fires. Now it fights everything. Approach from the side — never the nozzle end.',
    floorRange: [10, 15],
    hp: 34,
    actions: [
      { name: 'Foam Cannon', damage: 6, statusEffect: 'stun', statusDuration: 1, telegraph: 'The pin pops out on its own...' },
      { name: 'Pressurized Charge', damage: 9, telegraph: 'It launches itself like a red torpedo...' },
    ],
    lootTable: [
      { itemId: 'uncommon-fire-retardant', weight: 25 },
      { itemId: 'uncommon-pin-ring', weight: 20 },
    ],
    goldDrop: [8, 16],
    xpDrop: 18,
  },
];

// ══════════════════════════════════════════════════════════════
//  FLOORS 15–20: Server Room & IT Department
// ══════════════════════════════════════════════════════════════

const serverEnemies: Enemy[] = [
  {
    id: 'server-rack-titan',
    name: 'Server Rack Titan',
    emoji: '🖥️',
    description: 'Forty-two units of blinking fury. Its error logs contain prophecies. All of them are bad news for you.',
    floorRange: [15, 20],
    hp: 55,
    actions: [
      { name: 'Overheat', damage: 10, statusEffect: 'on_fire', statusDuration: 2, telegraph: 'Every fan spins to maximum...' },
      { name: 'Cable Whip', damage: 8, telegraph: 'Ethernet cables lash out like tentacles...' },
      { name: 'BSOD Pulse', damage: 7, statusEffect: 'stun', statusDuration: 2, telegraph: 'Screens flash blue in sequence...' },
    ],
    lootTable: [
      { itemId: 'uncommon-ram-stick', weight: 20 },
      { itemId: 'rare-solid-state-drive', weight: 10 },
      { itemId: 'rare-fiber-optic-whip', weight: 5 },
    ],
    goldDrop: [15, 28],
    xpDrop: 30,
  },
  {
    id: 'firewall-construct',
    name: 'Firewall Construct',
    emoji: '🔥',
    description: 'A living manifestation of network security. Denies your packets. Denies your existence.',
    floorRange: [15, 20],
    hp: 48,
    actions: [
      { name: 'Packet Drop', damage: 8, telegraph: 'Connection timeout imminent...' },
      { name: 'Port Block', damage: 6, statusEffect: 'cursed', statusDuration: 2, telegraph: 'All exits seal themselves...' },
      { name: 'DDoS Barrage', damage: 12, telegraph: 'Thousands of requests materialize as projectiles...' },
    ],
    lootTable: [
      { itemId: 'uncommon-vpn-token', weight: 20 },
      { itemId: 'rare-admin-credentials', weight: 8 },
    ],
    goldDrop: [14, 25],
    xpDrop: 28,
  },
  {
    id: 'cable-horror',
    name: 'Cable Management Horror',
    emoji: '🔌',
    description: 'The tangled mass beneath every desk has achieved sentience. It remembers every cable tie that was never used.',
    floorRange: [15, 19],
    hp: 44,
    actions: [
      { name: 'Entangle', damage: 6, statusEffect: 'stun', statusDuration: 2, telegraph: 'Cables slither across the floor...' },
      { name: 'Electric Shock', damage: 9, telegraph: 'Exposed copper glints in the dark...' },
      { name: 'Strangle', damage: 8, statusEffect: 'bleed', statusDuration: 2, telegraph: 'A noose of Cat-6 tightens...' },
    ],
    lootTable: [
      { itemId: 'uncommon-cable-cutter', weight: 25 },
      { itemId: 'uncommon-zip-ties', weight: 20 },
    ],
    goldDrop: [12, 22],
    xpDrop: 24,
  },
  {
    id: 'printer-queue-phantom',
    name: 'Print Queue Phantom',
    emoji: '👻',
    description: 'The spirit of every print job that said "printing" but never actually printed. It has been waiting. Patiently.',
    floorRange: [15, 20],
    hp: 40,
    actions: [
      { name: 'Infinite Loop', damage: 7, statusEffect: 'existential_dread', statusDuration: 2, telegraph: '"Processing..." appears in the air...' },
      { name: 'Paper Trail', damage: 8, statusEffect: 'bleed', statusDuration: 2, telegraph: 'Pages stream from nowhere...' },
    ],
    lootTable: [
      { itemId: 'uncommon-ink-cartridge', weight: 25 },
      { itemId: 'rare-blank-check', weight: 5 },
    ],
    goldDrop: [11, 20],
    xpDrop: 22,
  },
  {
    id: 'captcha-specter',
    name: 'CAPTCHA Specter',
    emoji: '🤖',
    description: '"Select all squares containing AGONY." Every answer is wrong. Every answer was always wrong.',
    floorRange: [16, 20],
    hp: 38,
    actions: [
      { name: 'Identity Crisis', damage: 7, statusEffect: 'existential_dread', statusDuration: 3, telegraph: '"Are you a robot?" echoes in your skull...' },
      { name: 'Distorted Text', damage: 6, statusEffect: 'stun', statusDuration: 1, telegraph: 'Reality warps into illegible characters...' },
      { name: 'Verification Failed', damage: 9, telegraph: 'A red X materializes above your head...' },
    ],
    lootTable: [
      { itemId: 'uncommon-verification-badge', weight: 20 },
      { itemId: 'rare-bot-token', weight: 8 },
    ],
    goldDrop: [13, 24],
    xpDrop: 26,
  },
  {
    id: 'dead-pixel-swarm',
    name: 'Dead Pixel Swarm',
    emoji: '⬛',
    description: 'Thousands of dead pixels that crawled off their monitors to form a buzzing, flickering horde.',
    floorRange: [15, 19],
    hp: 36,
    actions: [
      { name: 'Screen Burn', damage: 8, statusEffect: 'on_fire', statusDuration: 1, telegraph: 'The swarm glows white-hot...' },
      { name: 'Blind Spot', damage: 6, statusEffect: 'stun', statusDuration: 1, telegraph: 'Your vision fills with black squares...' },
    ],
    lootTable: [
      { itemId: 'uncommon-screen-protector', weight: 25 },
      { itemId: 'uncommon-pixel-dust', weight: 20 },
    ],
    goldDrop: [11, 20],
    xpDrop: 22,
  },
  {
    id: 'legacy-code-abomination',
    name: 'Legacy Code Abomination',
    emoji: '📜',
    description: 'Written in COBOL in 1987. Nobody knows what it does. Nobody dares delete it. Now it walks among us.',
    floorRange: [16, 20],
    hp: 52,
    actions: [
      { name: 'Stack Overflow', damage: 10, telegraph: 'Memory usage spikes to critical...' },
      { name: 'Deprecated Method', damage: 7, statusEffect: 'cursed', statusDuration: 2, telegraph: 'Warning: this attack is deprecated but still lethal...' },
      { name: 'Spaghetti Tangle', damage: 6, statusEffect: 'stun', statusDuration: 2, telegraph: 'GOTO statements loop around you...' },
    ],
    lootTable: [
      { itemId: 'rare-ancient-floppy', weight: 10 },
      { itemId: 'uncommon-documentation', weight: 15 },
    ],
    goldDrop: [15, 28],
    xpDrop: 30,
  },
];

// ══════════════════════════════════════════════════════════════
//  FLOORS 20–25: Executive Floors & Upper Management
// ══════════════════════════════════════════════════════════════

const executiveEnemies: Enemy[] = [
  {
    id: 'sentient-spreadsheet',
    name: 'Sentient Spreadsheet',
    emoji: '📊',
    description: 'Cell A1 contains your name. Cell B1 contains the date of your demise. It auto-calculates.',
    floorRange: [20, 25],
    hp: 58,
    actions: [
      { name: 'Formula Error', damage: 10, statusEffect: 'existential_dread', statusDuration: 2, telegraph: '#REF! #VALUE! #DIV/0! spread across reality...' },
      { name: 'Pivot Table Slam', damage: 12, telegraph: 'Data reorganizes into a fist shape...' },
      { name: 'Macro Virus', damage: 8, statusEffect: 'poison', statusDuration: 3, telegraph: 'A popup asks you to enable macros...' },
    ],
    lootTable: [
      { itemId: 'rare-executive-pen', weight: 10 },
      { itemId: 'uncommon-calculator', weight: 20 },
      { itemId: 'legendary-golden-spreadsheet', weight: 2 },
    ],
    goldDrop: [18, 35],
    xpDrop: 35,
  },
  {
    id: 'middle-manager-shade',
    name: 'Middle Manager Shade',
    emoji: '👔',
    description: 'Neither alive nor dead, neither useful nor entirely useless. Schedules meetings about scheduling meetings.',
    floorRange: [20, 25],
    hp: 52,
    actions: [
      { name: 'Mandatory Meeting', damage: 8, statusEffect: 'stun', statusDuration: 2, telegraph: 'A calendar invite appears in your mind...' },
      { name: 'Performance Review', damage: 10, statusEffect: 'existential_dread', statusDuration: 3, telegraph: '"Let\'s discuss your metrics..."' },
      { name: 'Delegation', damage: 7, telegraph: 'It points at you and says "handle this"...' },
    ],
    lootTable: [
      { itemId: 'uncommon-motivational-poster', weight: 20 },
      { itemId: 'rare-golden-handshake', weight: 8 },
    ],
    goldDrop: [16, 30],
    xpDrop: 32,
  },
  {
    id: 'conference-table-behemoth',
    name: 'Conference Table Behemoth',
    emoji: '🪑',
    description: 'An impossibly long conference table that folds, unfolds, and crushes. It seats forty. It crushes one.',
    floorRange: [20, 25],
    hp: 65,
    actions: [
      { name: 'Table Flip', damage: 14, telegraph: 'The mahogany surface tilts upward...' },
      { name: 'Chair Launch', damage: 9, telegraph: 'Ergonomic chairs wheel into formation...' },
      { name: 'Powerpoint Drone', damage: 6, statusEffect: 'stun', statusDuration: 2, telegraph: 'A projector flickers to life: slide 1 of 247...' },
    ],
    lootTable: [
      { itemId: 'uncommon-mahogany-shard', weight: 20 },
      { itemId: 'rare-ceo-nameplate', weight: 5 },
    ],
    goldDrop: [20, 38],
    xpDrop: 38,
  },
  {
    id: 'motivational-poster-vampire',
    name: 'Motivational Poster Vampire',
    emoji: '🧛',
    description: '"TEAMWORK: Together Everyone Achieves More... BLOOD." It drains your will to live through inspirational quotes.',
    floorRange: [20, 24],
    hp: 46,
    actions: [
      { name: 'Inspire Dread', damage: 8, statusEffect: 'existential_dread', statusDuration: 3, telegraph: '"Hang in there!" it whispers, not kindly...' },
      { name: 'Life Drain', damage: 10, statusEffect: 'cursed', statusDuration: 2, telegraph: 'The cat on the poster reaches for you...' },
    ],
    lootTable: [
      { itemId: 'uncommon-inspirational-frame', weight: 25 },
      { itemId: 'rare-demotivational-poster', weight: 8 },
    ],
    goldDrop: [14, 26],
    xpDrop: 28,
  },
  {
    id: 'corporate-synergy-blob',
    name: 'Corporate Synergy Blob',
    emoji: '🫠',
    description: 'A formless mass of buzzwords given flesh. It wants to "leverage your core competencies" (your organs).',
    floorRange: [21, 25],
    hp: 56,
    actions: [
      { name: 'Synergize', damage: 9, statusEffect: 'cursed', statusDuration: 2, telegraph: 'It mutters about "moving the needle"...' },
      { name: 'Absorb', damage: 11, telegraph: 'The blob extends a pseudopod labeled "onboarding"...' },
      { name: 'Paradigm Shift', damage: 8, statusEffect: 'stun', statusDuration: 1, telegraph: 'Everything you know becomes wrong...' },
    ],
    lootTable: [
      { itemId: 'uncommon-buzzword-bingo', weight: 20 },
      { itemId: 'rare-golden-parachute', weight: 5 },
    ],
    goldDrop: [18, 34],
    xpDrop: 34,
  },
  {
    id: 'water-feature-horror',
    name: 'Executive Fountain Horror',
    emoji: '⛲',
    description: 'The lobby fountain on the executive floor. People threw coins in and wished for promotions. Something heard those wishes.',
    floorRange: [20, 25],
    hp: 50,
    actions: [
      { name: 'Coin Spray', damage: 9, telegraph: 'Coins lift from the basin and spin...' },
      { name: 'Tidal Slam', damage: 12, telegraph: 'Water rises impossibly high...' },
      { name: 'Wish Corruption', damage: 7, statusEffect: 'cursed', statusDuration: 3, telegraph: '"Make a wish..." it gurgles...' },
    ],
    lootTable: [
      { itemId: 'uncommon-wishing-coin', weight: 25 },
      { itemId: 'rare-executive-washroom-key', weight: 5 },
    ],
    goldDrop: [16, 30],
    xpDrop: 30,
  },
];

// ══════════════════════════════════════════════════════════════
//  FLOORS 25–30: Penthouse & The Roof
// ══════════════════════════════════════════════════════════════

const penthouseEnemies: Enemy[] = [
  {
    id: 'elevator-guardian',
    name: 'Elevator Guardian',
    emoji: '🛗',
    description: 'The express elevator that only goes up. And by "up" it means "through you."',
    floorRange: [25, 30],
    hp: 70,
    actions: [
      { name: 'Express Ascent', damage: 14, telegraph: 'The floor indicator races upward...' },
      { name: 'Door Crush', damage: 12, statusEffect: 'bleed', statusDuration: 2, telegraph: 'Doors begin closing on your position...' },
      { name: 'Free Fall', damage: 16, telegraph: 'The cable snaps. You hear it falling from above...' },
    ],
    lootTable: [
      { itemId: 'rare-penthouse-keycard', weight: 10 },
      { itemId: 'rare-emergency-brake', weight: 8 },
      { itemId: 'legendary-golden-elevator-button', weight: 2 },
    ],
    goldDrop: [25, 45],
    xpDrop: 45,
  },
  {
    id: 'window-washer-phantom',
    name: 'Window Washer Phantom',
    emoji: '🪟',
    description: 'Hangs from a fraying cable on floor 28. Has been dead for decades. Still has a perfect squeegee technique.',
    floorRange: [25, 30],
    hp: 60,
    actions: [
      { name: 'Squeegee Slash', damage: 12, statusEffect: 'bleed', statusDuration: 2, telegraph: 'The squeegee gleams with spectral light...' },
      { name: 'Vertigo Pull', damage: 10, statusEffect: 'stun', statusDuration: 1, telegraph: 'It gestures toward the window. You feel a pull...' },
      { name: 'Bucket Dump', damage: 8, statusEffect: 'poison', statusDuration: 2, telegraph: 'Filthy water sloshes in a floating bucket...' },
    ],
    lootTable: [
      { itemId: 'rare-safety-harness', weight: 10 },
      { itemId: 'uncommon-glass-shard', weight: 20 },
    ],
    goldDrop: [22, 40],
    xpDrop: 40,
  },
  {
    id: 'rooftop-gargoyle',
    name: 'Rooftop Gargoyle',
    emoji: '🗿',
    description: 'Decorative, they said. Purely aesthetic, they said. It just blinked.',
    floorRange: [26, 30],
    hp: 75,
    actions: [
      { name: 'Stone Dive', damage: 15, telegraph: 'It spreads granite wings...' },
      { name: 'Petrifying Gaze', damage: 8, statusEffect: 'stun', statusDuration: 2, telegraph: 'Its stone eyes lock onto yours...' },
      { name: 'Rubble Slam', damage: 12, telegraph: 'It tears chunks from the building facade...' },
    ],
    lootTable: [
      { itemId: 'rare-gargoyle-horn', weight: 10 },
      { itemId: 'legendary-stone-heart', weight: 2 },
    ],
    goldDrop: [25, 48],
    xpDrop: 48,
  },
  {
    id: 'chandelier-spider',
    name: 'Crystal Chandelier Spider',
    emoji: '🕷️',
    description: 'Eight arms of cut crystal. Spins webs of refracted light. Drops on you from the vaulted ceiling of the penthouse lounge.',
    floorRange: [25, 30],
    hp: 62,
    actions: [
      { name: 'Prism Beam', damage: 13, statusEffect: 'on_fire', statusDuration: 2, telegraph: 'Light focuses through crystal limbs...' },
      { name: 'Crystal Web', damage: 9, statusEffect: 'stun', statusDuration: 2, telegraph: 'Razor-thin crystal threads shimmer in the air...' },
      { name: 'Chandelier Drop', damage: 16, telegraph: 'The chain above groans...' },
    ],
    lootTable: [
      { itemId: 'rare-crystal-shard', weight: 12 },
      { itemId: 'legendary-prismatic-lens', weight: 2 },
    ],
    goldDrop: [24, 44],
    xpDrop: 44,
  },
  {
    id: 'ceo-portrait',
    name: 'Haunted CEO Portrait',
    emoji: '🖼️',
    description: 'The eyes follow you. The mouth issues quarterly earnings reports. The hands reach out of the frame.',
    floorRange: [25, 30],
    hp: 58,
    actions: [
      { name: 'Golden Handshake', damage: 11, statusEffect: 'cursed', statusDuration: 3, telegraph: 'A hand extends from the canvas...' },
      { name: 'Hostile Takeover', damage: 14, telegraph: 'The portrait doubles in size...' },
      { name: 'Dividend Cut', damage: 9, statusEffect: 'bleed', statusDuration: 2, telegraph: 'Paper-thin stock certificates fly like knives...' },
    ],
    lootTable: [
      { itemId: 'rare-gilded-frame', weight: 10 },
      { itemId: 'legendary-ceo-crown', weight: 2 },
    ],
    goldDrop: [22, 42],
    xpDrop: 42,
  },
  {
    id: 'antenna-array',
    name: 'Rooftop Antenna Array',
    emoji: '📡',
    description: 'Receives signals from places that do not exist. Broadcasts your location to things that should not know it.',
    floorRange: [26, 30],
    hp: 68,
    actions: [
      { name: 'Signal Burst', damage: 13, statusEffect: 'stun', statusDuration: 1, telegraph: 'Static fills your thoughts...' },
      { name: 'Frequency Scream', damage: 11, statusEffect: 'existential_dread', statusDuration: 3, telegraph: 'A tone beyond hearing rattles your bones...' },
      { name: 'Lightning Rod', damage: 15, telegraph: 'Storm clouds gather above the antenna...' },
    ],
    lootTable: [
      { itemId: 'rare-signal-amplifier', weight: 10 },
      { itemId: 'legendary-void-frequency', weight: 2 },
    ],
    goldDrop: [24, 46],
    xpDrop: 46,
  },
  {
    id: 'helipad-drake',
    name: 'Helipad Drake',
    emoji: '🐉',
    description: 'Part helicopter, part dragon, all fury. Its rotors are wings. Its exhaust is fire. It guards the final stairway.',
    floorRange: [27, 30],
    hp: 80,
    actions: [
      { name: 'Rotor Storm', damage: 14, statusEffect: 'bleed', statusDuration: 2, telegraph: 'Blades spin up to lethal speed...' },
      { name: 'Exhaust Flame', damage: 12, statusEffect: 'on_fire', statusDuration: 3, telegraph: 'The turbine glows cherry-red...' },
      { name: 'Nosedive', damage: 18, telegraph: 'It banks sharply and angles downward...' },
    ],
    lootTable: [
      { itemId: 'rare-rotor-blade', weight: 8 },
      { itemId: 'legendary-flight-manual', weight: 2 },
    ],
    goldDrop: [28, 50],
    xpDrop: 50,
  },
];

// ══════════════════════════════════════════════════════════════
//  TRANSITIONAL ENEMIES (span multiple tiers)
// ══════════════════════════════════════════════════════════════

const transitionalEnemies: Enemy[] = [
  {
    id: 'stairwell-shadow',
    name: 'Stairwell Shadow',
    emoji: '👤',
    description: 'Your own shadow, three steps behind you on the staircase. It has been gaining on you since floor one.',
    floorRange: [3, 12],
    hp: 25,
    actions: [
      { name: 'Mirror Strike', damage: 6, telegraph: 'Your shadow raises its fist before you do...' },
      { name: 'Step Behind', damage: 5, statusEffect: 'existential_dread', statusDuration: 2, telegraph: 'You hear your own footsteps, one beat late...' },
    ],
    lootTable: [
      { itemId: 'common-flashlight', weight: 30 },
      { itemId: 'uncommon-mirror-shard', weight: 15 },
    ],
    goldDrop: [4, 10],
    xpDrop: 12,
  },
  {
    id: 'smoke-detector-banshee',
    name: 'Smoke Detector Banshee',
    emoji: '🔔',
    description: 'The battery is not low. The battery was never low. It screams because it chooses to.',
    floorRange: [4, 14],
    hp: 18,
    actions: [
      { name: 'Piercing Shriek', damage: 7, statusEffect: 'stun', statusDuration: 1, telegraph: 'The chirping accelerates...' },
      { name: 'False Alarm', damage: 4, statusEffect: 'existential_dread', statusDuration: 2, telegraph: 'It beeps once. Twice. The pause stretches...' },
    ],
    lootTable: [
      { itemId: 'common-9v-battery', weight: 35 },
      { itemId: 'uncommon-earplugs', weight: 20 },
    ],
    goldDrop: [3, 8],
    xpDrop: 10,
  },
  {
    id: 'lost-intern',
    name: 'Lost Intern',
    emoji: '😰',
    description: 'Started on floor 3 six years ago. Never found their desk. Feral now. Still has the lanyard.',
    floorRange: [3, 15],
    hp: 20,
    actions: [
      { name: 'Desperate Flailing', damage: 5, telegraph: 'They swing a binder clip on a lanyard...' },
      { name: 'Anxious Energy', damage: 4, statusEffect: 'stun', statusDuration: 1, telegraph: 'They start talking very fast about their "action items"...' },
      { name: 'Coffee Run', damage: 7, telegraph: 'They charge holding four lattes...' },
    ],
    lootTable: [
      { itemId: 'common-lanyard', weight: 35 },
      { itemId: 'uncommon-internship-badge', weight: 15 },
    ],
    goldDrop: [2, 6],
    xpDrop: 8,
  },
  {
    id: 'emergency-exit-sign',
    name: 'Lying Exit Sign',
    emoji: '🚪',
    description: 'It points to exits that do not exist. It has lured hundreds to dead ends. The arrow glows with malice.',
    floorRange: [8, 20],
    hp: 30,
    actions: [
      { name: 'False Hope', damage: 6, statusEffect: 'existential_dread', statusDuration: 3, telegraph: 'The green glow pulses invitingly...' },
      { name: 'Dead End Slam', damage: 9, telegraph: 'A wall materializes where the exit should be...' },
    ],
    lootTable: [
      { itemId: 'uncommon-compass', weight: 20 },
      { itemId: 'rare-true-exit-map', weight: 5 },
    ],
    goldDrop: [8, 16],
    xpDrop: 16,
  },
  {
    id: 'escalator-centipede',
    name: 'Escalator Centipede',
    emoji: '🪜',
    description: 'An escalator that tore itself from the floor and learned to crawl. Each step is a leg. It has 200 legs.',
    floorRange: [8, 18],
    hp: 45,
    actions: [
      { name: 'Step Grind', damage: 9, statusEffect: 'bleed', statusDuration: 2, telegraph: 'Metal steps churn like teeth...' },
      { name: 'Handrail Whip', damage: 7, telegraph: 'Rubber handrails lash out...' },
      { name: 'Reverse Direction', damage: 6, statusEffect: 'stun', statusDuration: 1, telegraph: 'Everything suddenly moves backward...' },
    ],
    lootTable: [
      { itemId: 'uncommon-rubber-grip', weight: 20 },
      { itemId: 'rare-escalator-comb', weight: 8 },
    ],
    goldDrop: [10, 20],
    xpDrop: 22,
  },
  {
    id: 'clock-warden',
    name: 'Clock Warden',
    emoji: '🕰️',
    description: 'The lobby clock, grown to monstrous size. Its hands are swords. Its face shows the time of your death.',
    floorRange: [12, 25],
    hp: 55,
    actions: [
      { name: 'Minute Hand Slash', damage: 10, statusEffect: 'bleed', statusDuration: 2, telegraph: 'The long hand sweeps toward you...' },
      { name: 'Hour Strike', damage: 14, telegraph: 'BONG. BONG. BONG. Each strike is a shockwave...' },
      { name: 'Time Dilation', damage: 7, statusEffect: 'stun', statusDuration: 2, telegraph: 'The ticking slows... and so do you...' },
    ],
    lootTable: [
      { itemId: 'rare-clockwork-gear', weight: 10 },
      { itemId: 'legendary-frozen-second', weight: 2 },
    ],
    goldDrop: [14, 28],
    xpDrop: 30,
  },
  {
    id: 'security-guard-revenant',
    name: 'Security Guard Revenant',
    emoji: '💂',
    description: 'Badge number 0000. Been on the night shift since 1971. His flashlight beam burns. His radio speaks in tongues.',
    floorRange: [6, 18],
    hp: 38,
    actions: [
      { name: 'Flashlight Beam', damage: 8, statusEffect: 'on_fire', statusDuration: 1, telegraph: 'The flashlight focuses to a searing point...' },
      { name: 'Radio Screech', damage: 6, statusEffect: 'stun', statusDuration: 1, telegraph: 'The walkie-talkie emits an inhuman frequency...' },
      { name: 'Nightstick', damage: 9, telegraph: 'He taps the baton against his palm...' },
    ],
    lootTable: [
      { itemId: 'uncommon-security-badge', weight: 20 },
      { itemId: 'uncommon-flashlight-pro', weight: 15 },
      { itemId: 'rare-master-keycard', weight: 5 },
    ],
    goldDrop: [8, 18],
    xpDrop: 20,
  },
];

export const allEnemies: Enemy[] = [
  ...lobbyEnemies,
  ...officeEnemies,
  ...maintenanceEnemies,
  ...serverEnemies,
  ...executiveEnemies,
  ...penthouseEnemies,
  ...transitionalEnemies,
];
