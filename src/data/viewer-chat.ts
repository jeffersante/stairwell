import type { ViewerChatMessage } from '../types';

export const viewerChat: ViewerChatMessage[] = [
  // ══════════════════════════════════════════════════════════════
  //  COMBAT START — The chat gets hyped
  // ══════════════════════════════════════════════════════════════
  {
    trigger: 'combat_start',
    messages: [
      'LETS GOOOOO',
      'oh here we go again',
      'rip lol',
      'this ones gonna hurt',
      'FIGHT FIGHT FIGHT',
      'use the thing!! THE THING',
      'first time viewer, is this normal??',
      'the enemy looks hangry',
      'gg its been nice knowing u',
      'POG incoming',
      'chat is this winnable?',
      'monkaS',
      '*grabs popcorn*',
      'another one bites the dust... maybe',
      'my money is on the office supply',
    ],
  },

  // ══════════════════════════════════════════════════════════════
  //  CRITICAL HIT — Chat goes absolutely feral
  // ══════════════════════════════════════════════════════════════
  {
    trigger: 'critical_hit',
    messages: [
      'POGGERS',
      'HOLY CRIT',
      'NAT 20 BABY',
      'SHEEEEEESH',
      'CLIP IT CLIP IT CLIP IT',
      'DID THAT JUST HAPPEN',
      'BIG DAMAGE',
      'DELETE THEM',
      'THE DICE GODS HAVE SPOKEN',
      'W W W W W W',
      'actual god gamer',
      'i felt that from here',
      'EMOTIONAL DAMAGE',
      'that enemy had a family!!!',
      'critical hit more like critical QUIT am i right',
    ],
  },

  // ══════════════════════════════════════════════════════════════
  //  FUMBLE — Chat roasts mercilessly
  // ══════════════════════════════════════════════════════════════
  {
    trigger: 'fumble',
    messages: [
      'LMAOOO',
      'F',
      'nat 1 energy',
      'skill issue tbh',
      'the dice have trust issues with you',
      'bro rolled a 1 and the dice LAUGHED',
      'uninstall',
      'my grandma rolls better and shes dead',
      'that was the worst thing ive ever seen',
      'even the cat is embarrassed',
      'im telling everyone about this',
      'L + ratio + fumbled',
      'the enemy is laughing AT you not WITH you',
      'someone call OSHA... on those dice',
      'did you just attack yourself?? iconic',
    ],
  },

  // ══════════════════════════════════════════════════════════════
  //  PLAYER DEATH — F spam and RIP
  // ══════════════════════════════════════════════════════════════
  {
    trigger: 'player_death',
    messages: [
      'F',
      'F',
      'F',
      'FFFFF',
      'o7',
      'rip bozo',
      'he died doing what he loved: dying',
      'NOOOOO',
      'skill diff honestly',
      'speedrun to death any%',
      'we hardly knew ye',
      'at least the cat survived',
      'pour one out for the homie',
      'that was the saddest thing ive seen today',
      'and nothing of value was lost... jk rip',
      'back to the lobby (real lobby not game lobby)',
      'who else is here from the death compilation?',
    ],
  },

  // ══════════════════════════════════════════════════════════════
  //  CAT ACTION — Chat loves the cat
  // ══════════════════════════════════════════════════════════════
  {
    trigger: 'cat_action',
    messages: [
      'PET THE CAT',
      'CAT CAM CAT CAM',
      'KITTY',
      'the cat carries this stream',
      'the cat is the real protagonist',
      'did the cat just do that?? LEGEND',
      'give the cat a raise',
      'cat MVP',
      'we dont deserve this cat',
      'the cat has more game sense than the player',
      'im only here for the cat content',
      'PSPSPSPSPS',
      'somebody get that cat an endorsement deal',
      'cat diff',
      'the cat looked at the camera!! it knows were here!!',
    ],
  },

  // ══════════════════════════════════════════════════════════════
  //  LOW HP — Chat panics
  // ══════════════════════════════════════════════════════════════
  {
    trigger: 'low_hp',
    messages: [
      'HEAL HEAL HEAL',
      'USE A POTION',
      'oh no oh no oh no',
      'ONE HP ANDYYYY',
      'the hp bar is a suggestion at this point',
      'hes literally one hit from death',
      'PANIC',
      'this is fine *everything is on fire*',
      'im stress eating watching this',
      'bro is held together by vibes and spite',
      'the hp bar said goodbye',
      'can you even SURVIVE a sneeze rn??',
      'living on a prayer and a bandaid',
      'the grim reaper just followed the stream',
      'hp so low its underground',
    ],
  },

  // ══════════════════════════════════════════════════════════════
  //  BOSS ENCOUNTER — Chat loses it
  // ══════════════════════════════════════════════════════════════
  {
    trigger: 'boss_encounter',
    messages: [
      'BOSS FIGHT HYPE',
      'oh lawd he comin',
      'its OVER',
      'this is where the fun begins',
      'POG POG POG',
      'everyone shut up its boss time',
      'rip in advance',
      'how many viewers for the death?',
      'THE MUSIC CHANGED (theres no music)',
      'this boss has LORE?!',
      'ive seen this before... it doesnt end well',
      'BET: 3 turns max',
      'the boss looked at the camera',
      'someone hold me',
      'RAID BOSS ENERGY',
    ],
  },

  // ══════════════════════════════════════════════════════════════
  //  BOSS KILL — Chat erupts
  // ══════════════════════════════════════════════════════════════
  {
    trigger: 'boss_kill',
    messages: [
      'LETS GOOOOOOOO',
      'HE DID IT THE ABSOLUTE MADLAD',
      'BOSS DOWN',
      'EZ CLAP',
      'W STREAM W CHAT W EVERYTHING',
      'GOATED',
      'I NEVER DOUBTED (i doubted)',
      'CARRY ON MY WAYWARD SON',
      'that was CINEMA',
      'SUBSCRIBE FOR MORE BOSS KILLS',
      'the building just got served an eviction notice',
      'GG WP',
      'LEGENDARY',
      'clip that and send it to everyone you know',
      'the absolute STATE of that boss rn',
    ],
  },

  // ══════════════════════════════════════════════════════════════
  //  LEVEL UP — Chat celebrates
  // ══════════════════════════════════════════════════════════════
  {
    trigger: 'level_up',
    messages: [
      'DING',
      'level up baby!!',
      'POWER SPIKE',
      'hes evolving',
      'put points in VIT (theres no VIT)',
      'stat check stat check',
      'the XP gods smile upon thee',
      'another level closer to NOT dying',
      'upgrade time!!',
      'the building noticed your power increase',
    ],
  },

  // ══════════════════════════════════════════════════════════════
  //  ITEM PICKUP — Chat evaluates
  // ══════════════════════════════════════════════════════════════
  {
    trigger: 'item_pickup',
    messages: [
      'LOOT',
      'is it cursed? its cursed isnt it',
      'equip it equip it equip it',
      'SHINY',
      'the rng gods have blessed us',
      'vendor trash kappa',
      'actually decent??',
      'read the flavor text!! READ IT',
      'keep or sell? keep or sell?',
      'your inventory is full of garbage and dreams',
      'ooh what does THIS one do',
      'christmas came early',
    ],
  },

  // ══════════════════════════════════════════════════════════════
  //  SHOP VISIT — Chat backseat shops
  // ══════════════════════════════════════════════════════════════
  {
    trigger: 'shop_visit',
    messages: [
      'BUY THE EXPENSIVE ONE',
      'save your gold dummy',
      'the vendor looks sketchy',
      'CAPITALISM',
      'this economy is COOKED',
      'buy everything and pray',
      'the prices here are criminal',
      'shop meta is buy healing and cry',
      'that vendor has seen things',
      'do NOT haggle. do not.',
    ],
  },

  // ══════════════════════════════════════════════════════════════
  //  REST — Chat vibes
  // ══════════════════════════════════════════════════════════════
  {
    trigger: 'rest',
    messages: [
      'PET THE CAT',
      'take a breather king',
      'bathroom break chat',
      'the calm before the storm',
      'this room feels... too safe',
      'rest up buttercup',
      'the cat is sleeping omg',
      'i dont trust this room',
      'finally some peace',
      'quick someone clip the cat napping',
    ],
  },

  // ══════════════════════════════════════════════════════════════
  //  EVENT CHOICE — Chat debates
  // ══════════════════════════════════════════════════════════════
  {
    trigger: 'event_choice',
    messages: [
      'CHOOSE WISELY',
      'option 2!! OPTION 2!!',
      'its a trap all of them are traps',
      'the last person who chose that DIED',
      'democracy time: i vote yolo',
      'just pick one already',
      'the risky one is always more fun',
      'chat says left. chat is wrong. go left anyway.',
      'LORE DROP',
      'what would the cat do',
    ],
  },

  // ══════════════════════════════════════════════════════════════
  //  FLOOR CLEAR — Chat progresses
  // ══════════════════════════════════════════════════════════════
  {
    trigger: 'floor_clear',
    messages: [
      'GG FLOOR',
      'next floor hype',
      'deeper we go',
      'progress! actual progress!',
      'the building is SHAKING',
      'how many floors left?',
      'onward and upward',
      'that floor was easy (it wasnt)',
      'weve come so far',
      'new floor who dis',
    ],
  },

  // ══════════════════════════════════════════════════════════════
  //  HIGH VIEWERS — Chat celebrates growth
  // ══════════════════════════════════════════════════════════════
  {
    trigger: 'high_viewers',
    messages: [
      'WE VIRAL',
      'front page of stairwell',
      'all my friends are watching now',
      'NUMBERS GOING UP',
      'the algorithm blessed us',
      'sponsor when??',
      'MAINSTREAM BABY',
      'hi mom im on the stairwell stream',
      'the viewer count is higher than the hp lol',
      'we are ALL the stairwell on this blessed day',
    ],
  },

  // ══════════════════════════════════════════════════════════════
  //  TRAP TRIGGERED — Chat winces
  // ══════════════════════════════════════════════════════════════
  {
    trigger: 'trap_triggered',
    messages: [
      'CALLED IT',
      'who didnt see that coming',
      'thats gonna leave a mark',
      'oof',
      'trap diff',
      'the floor literally warned you',
      'awareness: 0',
      'the building said gottem',
      'should have bought trap detect',
      'even the cat flinched',
    ],
  },

  // ══════════════════════════════════════════════════════════════
  //  SPELL CAST — Chat reacts to magic
  // ══════════════════════════════════════════════════════════════
  {
    trigger: 'spell_cast',
    messages: [
      'MAGIC',
      'building codes go brrr',
      'compliance has never been so violent',
      'CAST IT AGAIN',
      'mana check... its fine... its fine',
      'wizard gaming',
      'that spell hit DIFFERENT',
      'regulatory magic best magic',
      'the bureaucracy strikes back',
      'code violation: existence',
    ],
  },

  // ══════════════════════════════════════════════════════════════
  //  ENEMY KILL — Chat celebrates violence
  // ══════════════════════════════════════════════════════════════
  {
    trigger: 'enemy_kill',
    messages: [
      'GET REKT',
      'another one gone',
      'clean kill',
      'the loot though',
      'body count rising',
      'that office supply had it coming',
      'RIP that copier',
      'flawless... ish',
      'one less obstacle between us and glory',
      'K.O.',
    ],
  },

  // ══════════════════════════════════════════════════════════════
  //  GOLD PICKUP — Chat sees $$$
  // ══════════════════════════════════════════════════════════════
  {
    trigger: 'gold_pickup',
    messages: [
      'MONEY',
      'cha-ching',
      'the grind continues',
      'save it for the shop',
      'rich in gold, poor in health',
      'retirement fund looking good',
      'stonks',
      'that gold was someones 401k',
      'LOOT GOBLIN MODE',
      'gold cant buy happiness but it can buy potions',
    ],
  },

  // ══════════════════════════════════════════════════════════════
  //  CAT BOND — Chat melts
  // ══════════════════════════════════════════════════════════════
  {
    trigger: 'cat_bond',
    messages: [
      'FRIENDSHIP',
      'the cat likes you!! IT LIKES YOU',
      'bond level UP',
      'wholesome content',
      'im not crying youre crying',
      'the cat just slow-blinked at you and im SOBBING',
      'best duo in gaming',
      'cat bond meta is OP',
      'this is the real endgame',
      'someone write fanfic about this bond',
    ],
  },
];

export function getChatMessagesForTrigger(trigger: string): string[] {
  const entry = viewerChat.find(v => v.trigger === trigger);
  return entry?.messages ?? [];
}
