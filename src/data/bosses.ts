import type { Boss } from '../types';

export const allBosses: Boss[] = [
  // ══════════════════════════════════════════════════════════
  //  FLOOR 5 — THE MAINTENANCE SUPERVISOR
  // ══════════════════════════════════════════════════════════
  {
    id: 'boss-maintenance-supervisor',
    name: 'Carl, The Maintenance Supervisor',
    emoji: '🔧',
    title: 'He Who Fixes What Should Stay Broken',
    description: 'Carl has been maintaining this building for forty years. The building has been maintaining Carl for longer. His toolbelt is fused to his waist. His clipboard lists every code violation — including yours.',
    floorRange: [5, 5],
    hp: 120,
    armorClass: 14,
    phases: 3,
    phaseThresholds: [75, 50, 25],
    specialMechanics: 'Phase 1: Uses basic tool attacks. Phase 2 (75%): Summons two Pipe Serpent minions and gains Wrench Tornado AoE. Phase 3 (50%): Activates "Code Violation" — inspects player equipment; cursed items deal double damage to player. Phase 4 (25%): "Emergency Repairs" — heals 15 HP per turn unless interrupted by a stun effect.',
    actions: [
      {
        name: 'Wrench Strike',
        damage: 8,
        telegraph: 'Carl hefts a pipe wrench the size of your torso...',
      },
      {
        name: 'Toolbelt Barrage',
        damage: 12,
        telegraph: 'He reaches for his belt — screwdrivers, hammers, and pliers orbit him...',
      },
      {
        name: 'Code Violation',
        damage: 6,
        statusEffect: 'cursed',
        statusDuration: 3,
        telegraph: 'He consults his clipboard and tuts disapprovingly...',
      },
      {
        name: 'Wrench Tornado',
        damage: 15,
        telegraph: 'Carl spins, tools extending outward in a lethal radius...',
      },
      {
        name: 'Emergency Repairs',
        damage: 4,
        statusEffect: 'stun',
        statusDuration: 1,
        telegraph: '"Hold still, this\'ll only hurt a lot..."',
      },
    ],
    lootTable: [
      { itemId: 'rare-carls-master-wrench', weight: 30 },
      { itemId: 'rare-maintenance-manual', weight: 25 },
      { itemId: 'legendary-universal-key', weight: 10 },
    ],
    goldDrop: [40, 65],
    xpDrop: 80,
  },

  // ══════════════════════════════════════════════════════════
  //  FLOOR 10 — THE ELEVATOR AUTHORITY
  // ══════════════════════════════════════════════════════════
  {
    id: 'boss-elevator-authority',
    name: 'The Elevator Authority',
    emoji: '🛗',
    title: 'Arbiter of Vertical Transit',
    description: 'Three elevators fused into one entity. Its doors are mouths. Its cables are veins. It decides who goes up, who goes down, and who goes nowhere ever again. The floor indicator above its heads reads symbols that are not numbers.',
    floorRange: [10, 10],
    hp: 200,
    armorClass: 16,
    phases: 3,
    phaseThresholds: [75, 50, 25],
    specialMechanics: 'Phase 1: Single elevator attacks. Phase 2 (75%): Splits into three separate elevator shafts — attacks come from random directions, player must choose which to face. Phase 3 (50%): "Going Down" — the floor tilts, all attacks gain bonus damage and apply bleed. Phase 4 (25%): "Express Mode" — attacks twice per turn, doors slam open and shut dealing passive damage.',
    actions: [
      {
        name: 'Door Slam',
        damage: 12,
        statusEffect: 'bleed',
        statusDuration: 2,
        telegraph: 'Doors open invitingly... then begin to close. Fast.',
      },
      {
        name: 'Cable Lash',
        damage: 14,
        telegraph: 'Steel cables whip down from the shaft above...',
      },
      {
        name: 'Going Down',
        damage: 18,
        statusEffect: 'stun',
        statusDuration: 2,
        telegraph: 'The floor drops. Your stomach stays behind.',
      },
      {
        name: 'Shaft Wind',
        damage: 10,
        statusEffect: 'existential_dread',
        statusDuration: 2,
        telegraph: 'A howling wind screams up from the bottomless shaft...',
      },
      {
        name: 'Counterweight Crush',
        damage: 20,
        telegraph: 'A massive iron weight descends from above...',
      },
    ],
    lootTable: [
      { itemId: 'rare-elevator-key', weight: 25 },
      { itemId: 'rare-counterweight', weight: 20 },
      { itemId: 'legendary-express-pass', weight: 8 },
    ],
    goldDrop: [60, 100],
    xpDrop: 130,
  },

  // ══════════════════════════════════════════════════════════
  //  FLOOR 15 — THE IT DIRECTOR
  // ══════════════════════════════════════════════════════════
  {
    id: 'boss-it-director',
    name: 'The IT Director',
    emoji: '💻',
    title: 'Root Access to Reality',
    description: 'Nobody remembers hiring them. Their office has no door, yet they are always inside. They speak in command prompts and breathe in binary. The server room is their body. The network is their nervous system. Your ticket has been escalated.',
    floorRange: [15, 15],
    hp: 280,
    armorClass: 17,
    phases: 3,
    phaseThresholds: [75, 50, 25],
    specialMechanics: 'Phase 1: Deploys firewall shield (reduces damage by 30%) and attacks with basic IT. Phase 2 (75%): "Kernel Panic" — randomizes player\'s equipment slots each turn. Phase 3 (50%): Deploys "Ransomware" — player loses 5 gold per turn. Phase 4 (25%): "sudo rm -rf /" — ultimate attack that deals massive damage but has a 2-turn telegraph.',
    actions: [
      {
        name: 'Ticket Closed: Won\'t Fix',
        damage: 14,
        statusEffect: 'existential_dread',
        statusDuration: 3,
        telegraph: '"Have you tried turning yourself off and never turning back on?"',
      },
      {
        name: 'Firewall Blast',
        damage: 16,
        statusEffect: 'on_fire',
        statusDuration: 2,
        telegraph: 'A wall of literal fire materializes from the server racks...',
      },
      {
        name: 'Kernel Panic',
        damage: 12,
        statusEffect: 'stun',
        statusDuration: 2,
        telegraph: 'Every screen in the room displays a cascading error dump...',
      },
      {
        name: 'Ransomware',
        damage: 10,
        statusEffect: 'cursed',
        statusDuration: 4,
        telegraph: '"Your files have been encrypted. Pay up or perish."',
      },
      {
        name: 'sudo rm -rf /',
        damage: 30,
        telegraph: 'They begin typing. The room starts dissolving at the edges...',
      },
    ],
    lootTable: [
      { itemId: 'rare-root-access-token', weight: 25 },
      { itemId: 'rare-server-blade', weight: 20 },
      { itemId: 'legendary-admin-privileges', weight: 8 },
    ],
    goldDrop: [80, 140],
    xpDrop: 180,
  },

  // ══════════════════════════════════════════════════════════
  //  FLOOR 20 — THE BOARD OF DIRECTORS
  // ══════════════════════════════════════════════════════════
  {
    id: 'boss-board-of-directors',
    name: 'The Board of Directors',
    emoji: '👥',
    title: 'The Unanimous Decision',
    description: 'Seven figures at a conference table. They speak in unison. They vote in unison. They have unanimously decided that you are a liability. Their quarterly report predicts your termination — the permanent kind.',
    floorRange: [20, 20],
    hp: 380,
    armorClass: 18,
    phases: 3,
    phaseThresholds: [75, 50, 25],
    specialMechanics: 'Phase 1: All seven attack as one entity. Phase 2 (75%): "Hostile Takeover" — Board absorbs player buffs and uses them. Phase 3 (50%): "Restructuring" — two board members split off as minions with 40 HP each. Phase 4 (25%): "Golden Parachute" — Board becomes immune for 1 turn while deploying massive AoE, then takes double damage for 1 turn.',
    actions: [
      {
        name: 'Unanimous Vote',
        damage: 18,
        telegraph: 'All seven raise their hands as one...',
      },
      {
        name: 'Hostile Takeover',
        damage: 15,
        statusEffect: 'cursed',
        statusDuration: 3,
        telegraph: 'They slide acquisition papers across the table...',
      },
      {
        name: 'Restructuring',
        damage: 12,
        statusEffect: 'existential_dread',
        statusDuration: 3,
        telegraph: '"We\'re going in a different direction..." they say, smiling identically.',
      },
      {
        name: 'Severance Package',
        damage: 22,
        statusEffect: 'bleed',
        statusDuration: 2,
        telegraph: 'A manila envelope slides toward you. It is ticking.',
      },
      {
        name: 'Golden Parachute',
        damage: 25,
        telegraph: 'They all stand at once. Golden light fills the boardroom...',
      },
    ],
    lootTable: [
      { itemId: 'rare-board-resolution', weight: 20 },
      { itemId: 'rare-corporate-seal', weight: 20 },
      { itemId: 'legendary-majority-stake', weight: 6 },
    ],
    goldDrop: [100, 180],
    xpDrop: 240,
  },

  // ══════════════════════════════════════════════════════════
  //  FLOOR 25 — THE ARCHITECT
  // ══════════════════════════════════════════════════════════
  {
    id: 'boss-architect',
    name: 'The Architect',
    emoji: '📐',
    title: 'Designer of the Infinite Stairwell',
    description: 'The one who drew the blueprints. The one who added the extra floors that shouldn\'t exist. They carry a compass that points to impossible angles and a protractor that measures dimensions you cannot perceive. The building is their body. You are inside them.',
    floorRange: [25, 25],
    hp: 480,
    armorClass: 19,
    phases: 3,
    phaseThresholds: [75, 50, 25],
    specialMechanics: 'Phase 1: Reshapes the room — walls move, creating cover or traps. Phase 2 (75%): "Non-Euclidean Geometry" — attacks can come from impossible angles, telegraphs become unreliable. Phase 3 (50%): "Blueprint Rewrite" — changes the floor layout mid-fight, randomly reassigning room types. Phase 4 (25%): "Demolition" — the room begins collapsing, dealing 5 damage per turn as ambient effect.',
    actions: [
      {
        name: 'Compass Strike',
        damage: 18,
        statusEffect: 'bleed',
        statusDuration: 2,
        telegraph: 'The compass needle spins, then points at your heart...',
      },
      {
        name: 'Load-Bearing Removal',
        damage: 22,
        telegraph: 'A critical wall disappears. The ceiling lurches downward...',
      },
      {
        name: 'Non-Euclidean Geometry',
        damage: 16,
        statusEffect: 'stun',
        statusDuration: 2,
        telegraph: 'The room has five corners now. None of them make sense.',
      },
      {
        name: 'Blueprint Rewrite',
        damage: 14,
        statusEffect: 'existential_dread',
        statusDuration: 3,
        telegraph: 'They erase lines on a vast blueprint. The floor shifts beneath you...',
      },
      {
        name: 'Demolition Order',
        damage: 28,
        telegraph: 'They stamp "CONDEMNED" on their blueprints. Everything shakes.',
      },
    ],
    lootTable: [
      { itemId: 'rare-architects-compass', weight: 20 },
      { itemId: 'rare-impossible-blueprint', weight: 15 },
      { itemId: 'legendary-master-blueprint', weight: 5 },
    ],
    goldDrop: [130, 220],
    xpDrop: 300,
  },

  // ══════════════════════════════════════════════════════════
  //  FLOOR 30 — THE BUILDING ITSELF
  // ══════════════════════════════════════════════════════════
  {
    id: 'boss-the-building',
    name: 'The Stairwell',
    emoji: '🏗️',
    title: 'The Living Building',
    description: 'You thought you were climbing a building. You were wrong. It was digesting you. Every floor was a stomach. Every staircase, peristalsis. The walls breathe. The foundation beats. You stand on the rooftop, and the rooftop opens its eye.',
    floorRange: [30, 30],
    hp: 666,
    armorClass: 20,
    phases: 3,
    phaseThresholds: [75, 50, 25],
    specialMechanics: 'Phase 1: The rooftop attacks with environmental hazards. Phase 2 (75%): "Foundation Quake" — floor tiles become hazards, random stun effects each turn. Phase 3 (50%): "Total Recall" — the building summons ghostly versions of previously defeated bosses (50% HP, 50% damage). Phase 4 (25%): "Collapse" — the building begins to fall. 10-turn enrage timer. Each turn increases all damage by 15%. If not defeated in time, instant death.',
    actions: [
      {
        name: 'Foundation Quake',
        damage: 20,
        statusEffect: 'stun',
        statusDuration: 1,
        telegraph: 'The entire building shifts on its foundation...',
      },
      {
        name: 'Facade Shatter',
        damage: 24,
        statusEffect: 'bleed',
        statusDuration: 3,
        telegraph: 'Windows explode inward from every direction...',
      },
      {
        name: 'Stairwell Surge',
        damage: 18,
        statusEffect: 'existential_dread',
        statusDuration: 3,
        telegraph: 'Every staircase in the building begins moving at once...',
      },
      {
        name: 'Total Recall',
        damage: 22,
        statusEffect: 'cursed',
        statusDuration: 3,
        telegraph: 'Ghostly figures of fallen bosses materialize from the walls...',
      },
      {
        name: 'Structural Collapse',
        damage: 35,
        telegraph: 'The building screams. Steel bends. Concrete cracks. This is the end.',
      },
    ],
    lootTable: [
      { itemId: 'legendary-buildings-heart', weight: 30 },
      { itemId: 'legendary-roof-key', weight: 25 },
      { itemId: 'legendary-architects-eye', weight: 15 },
    ],
    goldDrop: [200, 350],
    xpDrop: 500,
  },
];
