import type { FloorThemeData } from '../types';

export const allFloorThemes: FloorThemeData[] = [
  // ══════════════════════════════════════════════════════════════
  //  B1-B5: THE LOBBY — Warm beige. Corporate mundanity.
  // ══════════════════════════════════════════════════════════════
  {
    id: 'lobby',
    name: 'The Lobby',
    floorRange: [1, 5],
    description: 'Fake plants, muzak, and the lingering scent of burnt coffee. The building puts on its best face here. Its best face is still terrible.',
    colorAccent: '#c4a86b',
    roomNames: [
      'Reception Desk', 'Waiting Area', 'Mail Sorting Room', 'Security Booth',
      'Coat Check', 'Visitor Lounge', 'Badge Printing Station', 'Lost & Found',
      'Information Kiosk', 'Lobby Restroom', 'Package Pickup', 'Revolving Door Vestibule',
      'Employee Entrance', 'Guest Sign-In', 'Lobby Cafe', 'Magazine Corner',
    ],
    hazards: [
      {
        name: 'Wet Floor',
        description: 'A yellow sign warns of wet floors. The floor is always wet. The sign is always lying about where.',
        effect: 'debuff',
        value: 0,
        statusEffect: 'stun',
        statusDuration: 1,
        triggerChance: 0.15,
        mitigation: 'DEX save or items with grip/traction. Janitor class immune.',
      },
      {
        name: 'Revolving Door Trap',
        description: 'The revolving door spins at unsafe speeds. Entry is voluntary. Exit is not.',
        effect: 'damage',
        value: 6,
        triggerChance: 0.12,
        mitigation: 'STR check to brace, or just take the hit and the bruise.',
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  //  B6-B10: THE OFFICES — Corporate blue. Cubicle mazes.
  // ══════════════════════════════════════════════════════════════
  {
    id: 'offices',
    name: 'The Offices',
    floorRange: [6, 10],
    description: 'Infinite cubicles under flickering fluorescents. The carpet absorbs sound and hope. Someone microwaved fish in 1997 and the smell never left.',
    colorAccent: '#4a6fa5',
    roomNames: [
      'Cubicle Farm', 'Corner Office', 'Break Room', 'Conference Room B',
      'Supply Closet', 'IT Closet', 'Manager\'s Office', 'Print Room',
      'Kitchen Area', 'Open Floor Plan Nightmare', 'Standing Desk Zone',
      'Hot Desk Purgatory', 'Phone Booth Pod', 'Collaboration Space',
      'The Room With No Windows', 'Abandoned Cube',
    ],
    hazards: [
      {
        name: 'Paper Cut Storm',
        description: 'A gust from the HVAC sends a blizzard of memos, TPS reports, and performance reviews at lethal velocity.',
        effect: 'damage',
        value: 5,
        statusEffect: 'bleed',
        statusDuration: 2,
        triggerChance: 0.15,
        mitigation: 'DEX save to dodge, or armor with paper resistance. Accountant class takes half damage.',
      },
      {
        name: 'Printer Jam',
        description: 'The printer seizes, then detonates in a cloud of toner and rage. It was printing your obituary.',
        effect: 'debuff',
        value: 0,
        statusEffect: 'poison',
        statusDuration: 2,
        triggerChance: 0.12,
        mitigation: 'CON save vs toner inhalation. IT Specialist can disarm the printer.',
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  //  B11-B15: EXECUTIVE SUITE — Gold. Luxury gone wrong.
  // ══════════════════════════════════════════════════════════════
  {
    id: 'executive',
    name: 'Executive Suite',
    floorRange: [11, 15],
    description: 'Mahogany everything. Oil paintings of CEOs whose eyes follow you. The air smells of expensive cologne and moral bankruptcy.',
    colorAccent: '#d4a843',
    roomNames: [
      'CEO\'s Office', 'Boardroom', 'Executive Lounge', 'Private Elevator Hall',
      'Wine Cellar Office', 'Trophy Room', 'Golden Restroom', 'Penthouse Anteroom',
      'Acquisitions Chamber', 'Shareholder Shrine', 'C-Suite Hallway',
      'Executive Dining Room', 'Corner Office Deluxe', 'Private Gym',
      'The Room of Promotions', 'Vault Antechamber',
    ],
    hazards: [
      {
        name: 'Golden Handshake',
        description: 'A spectral hand extends from a portrait. Its grip drains your life force and deposits it into an offshore account.',
        effect: 'curse',
        value: 0,
        statusEffect: 'cursed',
        statusDuration: 3,
        triggerChance: 0.14,
        mitigation: 'WIS save to resist the deal. CHA check to negotiate better terms.',
      },
      {
        name: 'Power Play',
        description: 'The room rearranges to put you at a disadvantage. The chair is lower. The desk is higher. The lighting makes you look weak.',
        effect: 'debuff',
        value: 0,
        statusEffect: 'existential_dread',
        statusDuration: 2,
        triggerChance: 0.16,
        mitigation: 'CHA save to maintain composure. HR Manager class immune.',
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  //  B16-B20: MAINTENANCE — Industrial orange. Dark & dangerous.
  // ══════════════════════════════════════════════════════════════
  {
    id: 'maintenance',
    name: 'Maintenance',
    floorRange: [16, 20],
    description: 'Exposed pipes, dripping ceilings, and the constant groan of machinery that should have been decommissioned decades ago. OSHA has never visited. OSHA will never visit.',
    colorAccent: '#d4783a',
    roomNames: [
      'Boiler Room', 'Pipe Junction', 'Generator Room', 'Utility Corridor',
      'Ventilation Hub', 'Electrical Panel Room', 'Steam Tunnel', 'Pump Station',
      'Tool Storage', 'Waste Processing', 'Cooling Tower Base', 'Drainage Access',
      'Fuse Array Chamber', 'Valve Control Room', 'The Crawlspace', 'Condemned Section',
    ],
    hazards: [
      {
        name: 'Steam Vent',
        description: 'A pipe ruptures. Superheated steam fills the corridor. The building does this on purpose. The building does everything on purpose.',
        effect: 'damage',
        value: 8,
        statusEffect: 'on_fire',
        statusDuration: 2,
        triggerChance: 0.18,
        mitigation: 'DEX save to dodge the blast. CON save to resist the burn. Night Security class takes reduced damage.',
      },
      {
        name: 'Broken Light',
        description: 'The lights die. All of them. Something moves in the dark. It might be you. It might not.',
        effect: 'miss_chance',
        value: 30,
        triggerChance: 0.20,
        mitigation: 'Night Security flashlight pierces the dark. Any light-producing item or spell negates.',
      },
      {
        name: 'Flooded Corridor',
        description: 'Ankle-deep water of questionable origin. Things brush against your legs. Electrical outlets spark nearby.',
        effect: 'slow',
        value: 0,
        statusEffect: 'stun',
        statusDuration: 1,
        triggerChance: 0.15,
        mitigation: 'DEX save to navigate safely. Janitor class can drain the water.',
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  //  B21-B25: THE ARCHIVES — Ethereal teal. Reality bends.
  // ══════════════════════════════════════════════════════════════
  {
    id: 'archives',
    name: 'The Archives',
    floorRange: [21, 25],
    description: 'Filing cabinets stretch to infinity. The Dewey Decimal System has been replaced with something that uses emotions as categories. Time moves differently here.',
    colorAccent: '#4a9c8c',
    roomNames: [
      'Card Catalog Maze', 'Periodicals Void', 'Reference Section',
      'Restricted Stacks', 'Microfiche Dungeon', 'Overdue Returns Desk',
      'The Reading Room That Reads You', 'Index Chamber', 'Citation Hall',
      'Footnote Labyrinth', 'The Shelf That Goes On', 'Temporal Filing Room',
      'Manuscript Vault', 'Dead Letter Office', 'The Room That Was Here Yesterday',
      'Echo Archive',
    ],
    hazards: [
      {
        name: 'Time Loop',
        description: 'You have been in this room before. You will be in this room again. The filing cabinet remembers your last three deaths.',
        effect: 'debuff',
        value: 0,
        statusEffect: 'stun',
        statusDuration: 2,
        triggerChance: 0.16,
        mitigation: 'WIS save to recognize the loop. INT check to break free. Mystic Cat can sense temporal disturbances.',
      },
      {
        name: 'Reality Slip',
        description: 'The floor becomes the ceiling. The walls become doors. The doors become regrets. Everything snaps back after a nauseating moment.',
        effect: 'damage',
        value: 7,
        statusEffect: 'existential_dread',
        statusDuration: 3,
        triggerChance: 0.14,
        mitigation: 'WIS save to maintain grip on reality. CON save to resist nausea.',
      },
      {
        name: 'Deja Vu',
        description: 'You have done this before. You are certain. The enemy you defeated two rooms ago is back, with the same health, making the same face.',
        effect: 'random',
        value: 0,
        triggerChance: 0.12,
        mitigation: 'INT save to distinguish real from remembered. IT Specialist can detect the simulation.',
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  //  B26-B30: THE BASEMENT OF BASEMENTS — Crimson/obsidian.
  //  Aztec-inspired. The building's true nature revealed.
  // ══════════════════════════════════════════════════════════════
  {
    id: 'basement',
    name: 'The Basement of Basements',
    floorRange: [26, 30],
    description: 'Office carpet gives way to obsidian tile. Fluorescent lights are replaced by torches that burn without heat. The elevator buttons are carved from jade. The building stops pretending.',
    colorAccent: '#8b1a1a',
    roomNames: [
      'Obsidian Atrium', 'Jade Elevator Shaft', 'Blood Ledger Chamber',
      'The Sacrificial Breakroom', 'Quetzalcoatl Conference Room', 'Jaguar Throne Room',
      'Obsidian Mirror Hall', 'The Calendar Stone Floor', 'Gold Vault of Souls',
      'Serpent Staircase Landing', 'Temple of Quarterly Reports', 'The Cenote',
      'Flayed Office', 'Heart of the Building', 'The Final Lobby',
      'Mictlan Waiting Room',
    ],
    hazards: [
      {
        name: 'Obsidian Shards',
        description: 'The walls weep razor-sharp volcanic glass. Each shard reflects a version of you that made different choices. All of them are also bleeding.',
        effect: 'damage',
        value: 10,
        statusEffect: 'bleed',
        statusDuration: 3,
        triggerChance: 0.20,
        mitigation: 'DEX save to navigate the field. High AC reduces damage. Obsidian items grant immunity.',
      },
      {
        name: 'Eldritch Gravity',
        description: 'Gravity shifts 90 degrees. The floor is now a wall. The ceiling is now a floor. Your organs do not appreciate the transition.',
        effect: 'damage',
        value: 12,
        statusEffect: 'stun',
        statusDuration: 1,
        triggerChance: 0.16,
        mitigation: 'CON save to endure. DEX save to land safely. Levitation spells negate entirely.',
      },
      {
        name: 'Blood Gold',
        description: 'Gold coins materialize around you, beautiful and warm. Each one you touch drains a year of life. The building wants to know: how much is enough?',
        effect: 'curse',
        value: 0,
        statusEffect: 'cursed',
        statusDuration: 4,
        triggerChance: 0.14,
        mitigation: 'WIS save to resist greed. Accountant class can appraise the true cost. CHA save to negotiate with the building.',
      },
    ],
  },
];

export function getThemeForFloor(floorNumber: number): FloorThemeData {
  const theme = allFloorThemes.find(
    t => floorNumber >= t.floorRange[0] && floorNumber <= t.floorRange[1]
  );
  return theme ?? allFloorThemes[0];
}
