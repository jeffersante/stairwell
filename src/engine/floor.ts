import type { Floor, Room, RoomType, Enemy, Boss } from '../types';
import { weightedRandom, pickRandom, generateId } from '../utils';
import { allEnemies } from '../data/enemies';
import { allBosses } from '../data/bosses';

const ROOM_NAMES: Record<RoomType, string[]> = {
  combat: [
    'Maintenance Closet', 'Corner Office', 'Server Room', 'Elevator Shaft',
    'Break Room', 'Cubicle Farm', 'Copy Room', 'Supply Closet',
    'Loading Dock', 'Boiler Room', 'Janitor\'s Quarters', 'Mail Room',
    'Conference Room B', 'IT Closet', 'Storage Unit 7', 'Parking Garage Level 3',
  ],
  loot: [
    'Lost and Found', 'Executive Suite', 'Forgotten Storage', 'Hidden Vault',
    'Old Filing Cabinet', 'Abandoned Desk', 'Mystery Locker', 'Dusty Shelf',
  ],
  trap: [
    'Suspicious Hallway', 'Flickering Corridor', 'Wet Floor Zone', 'Unstable Staircase',
    'Dark Passage', 'Crumbling Walkway', 'Steam Pipe Junction', 'Electrical Closet',
  ],
  shop: [
    'Vending Alcove', 'Lobby Gift Shop', 'Cafeteria Counter', 'Pop-Up Stall',
    'Basement Market', 'Rooftop Kiosk', 'Shady Corner Booth', 'Clearance Bin',
  ],
  event: [
    'Strange Elevator', 'Abandoned Office', 'Mysterious Fountain', 'Old Archive Room',
    'Forgotten Bathroom', 'Rooftop Garden', 'Basement Chapel', 'Time Capsule Room',
  ],
  rest: [
    'Quiet Corner', 'Cozy Nook', 'Break Room Couch', 'Rooftop Bench',
    'Warm Vent Spot', 'Abandoned Lounge', 'Supply Room Cot', 'Window Ledge',
  ],
};

export function generateFloor(floorNumber: number, rng: () => number): Floor {
  const isBossFloor = floorNumber % 5 === 0 && floorNumber > 0;

  if (isBossFloor) {
    const boss = pickBoss(floorNumber, rng);
    const bossRoom: Room = {
      id: generateId(),
      type: 'combat',
      name: boss ? boss.title : `Guardian of Floor ${floorNumber}`,
      explored: false,
      data: { enemy: boss ?? createFallbackEnemy(floorNumber) },
    };

    return {
      number: floorNumber,
      rooms: [bossRoom],
      isBossFloor: true,
      boss: boss ?? undefined,
    };
  }

  const roomCount = Math.min(3 + Math.floor(floorNumber / 5), 6);
  const rooms: Room[] = [];

  // Mandatory: 1 combat room
  rooms.push(createRoom('combat', floorNumber, rng));

  // Mandatory: 1 shop or rest
  const mandatoryType: RoomType = rng() < 0.5 ? 'shop' : 'rest';
  rooms.push(createRoom(mandatoryType, floorNumber, rng));

  // Fill remaining with weighted random
  const types: RoomType[] = ['combat', 'loot', 'trap', 'event'];
  const weights = [40, 20, 15, 25];

  for (let i = rooms.length; i < roomCount; i++) {
    const type = weightedRandom(types, weights, rng);
    rooms.push(createRoom(type, floorNumber, rng));
  }

  return {
    number: floorNumber,
    rooms,
    isBossFloor: false,
  };
}

function createRoom(type: RoomType, floorNumber: number, rng: () => number): Room {
  const name = pickRandom(ROOM_NAMES[type], rng);

  return {
    id: generateId(),
    type,
    name,
    explored: false,
    data: generateRoomData(type, floorNumber, rng),
  };
}

function generateRoomData(type: RoomType, floorNumber: number, rng: () => number): Room['data'] {
  switch (type) {
    case 'combat':
      return { enemy: pickEnemy(floorNumber, rng) };
    case 'loot':
      return { items: [], trapped: rng() < 0.2, trapDamage: rng() < 0.2 ? Math.floor(5 + floorNumber * 2) : undefined };
    case 'trap':
      return {
        name: 'Floor Trap',
        description: 'Something looks off about this room...',
        riskChoice: 'Risk it',
        safeChoice: 'Play it safe',
        riskReward: Math.floor(10 + floorNumber * 5),
        riskDamage: Math.floor(10 + floorNumber * 3),
        riskSuccessChance: 0.5,
      };
    case 'shop':
      return {
        vendorName: 'Mysterious Vendor',
        vendorGreeting: 'Take a look...',
        inventory: [],
        healCost: Math.max(1, Math.floor(floorNumber / 2)),
      };
    case 'event':
      return {
        id: generateId(),
        title: 'Strange Occurrence',
        description: 'Something unusual is happening...',
        choices: [],
      };
    case 'rest':
      return {
        healAmount: Math.floor(20 + floorNumber * 2),
        catBondGain: 5,
        announcerLine: 'The viewers are getting bored...',
      };
  }
}

function pickEnemy(floorNumber: number, rng: () => number): Enemy {
  const eligible = allEnemies.filter(
    e => floorNumber >= e.floorRange[0] && floorNumber <= e.floorRange[1]
  );

  if (eligible.length === 0) {
    return createFallbackEnemy(floorNumber);
  }

  const enemy = pickRandom(eligible, rng);
  return scaleEnemy(enemy, floorNumber);
}

function pickBoss(floorNumber: number, rng: () => number): Boss | null {
  if (allBosses.length === 0) return null;

  const bossIndex = Math.floor((floorNumber / 5) - 1) % Math.max(1, allBosses.length);
  const boss = allBosses[bossIndex];
  if (!boss) return null;

  return {
    ...scaleEnemy(boss, floorNumber),
    title: boss.title,
    phases: boss.phases,
    phaseThresholds: boss.phaseThresholds,
    specialMechanics: boss.specialMechanics,
  } as Boss;
}

function scaleEnemy(enemy: Enemy, floorNumber: number): Enemy {
  const hpScale = 1 + floorNumber * 0.15 + Math.pow(floorNumber, 1.3) * 0.02;
  const dmgScale = 1 + floorNumber * 0.1 + Math.pow(floorNumber, 1.2) * 0.015;

  return {
    ...enemy,
    hp: Math.round(enemy.hp * hpScale),
    actions: enemy.actions.map(a => ({
      ...a,
      damage: Math.round(a.damage * dmgScale),
    })),
  };
}

function createFallbackEnemy(floorNumber: number): Enemy {
  const hpScale = 1 + floorNumber * 0.15 + Math.pow(floorNumber, 1.3) * 0.02;
  return {
    id: 'fallback-rat',
    name: 'Building Rat',
    emoji: '\uD83D\uDC00',
    description: 'A suspiciously large rat that seems to own the place.',
    floorRange: [1, 999],
    hp: Math.round(20 * hpScale),
    armorClass: Math.min(8 + Math.floor(floorNumber / 3), 18),
    actions: [
      { name: 'Bite', damage: Math.round(5 * (1 + floorNumber * 0.1)), telegraph: 'The rat bares its teeth...' },
      { name: 'Scratch', damage: Math.round(3 * (1 + floorNumber * 0.1)), telegraph: 'The rat raises its claws...' },
    ],
    lootTable: [],
    goldDrop: [1, 5],
    xpDrop: 2,
  };
}
