import type { EventRoom } from '../types';

export const allEvents: EventRoom[] = [
  // === ELEVATOR EVENTS ===
  {
    id: 'broken-elevator',
    title: 'The Broken Elevator',
    description: 'An elevator sits with its doors jammed half-open. Sparks fly from the control panel. The display reads "FL ???" and flickers ominously.',
    choices: [
      {
        text: 'Try to fix the control panel',
        outcome: {
          description: 'You jam your fingers into the wiring and somehow get it working. The elevator lurches up two floors, depositing you near a stash of forgotten maintenance supplies.',
          goldChange: 25,
          viewerChange: 50,
          hpChange: -5,
        },
        weight: 40,
      },
      {
        text: 'Take the stairs like a sensible person',
        outcome: {
          description: 'You walk past the death trap. Your cat looks relieved. The viewers are disappointed.',
          viewerChange: -20,
          catBondChange: 5,
        },
        weight: 30,
      },
      {
        text: 'Ride it anyway',
        outcome: {
          description: 'The elevator screams upward, stops violently, then the doors open to reveal a hidden floor with a pile of gold coins. Sometimes stupidity pays off.',
          goldChange: 60,
          hpChange: -15,
          viewerChange: 100,
        },
        weight: 30,
      },
    ],
  },
  {
    id: 'elevator-music',
    title: 'The Elevator That Only Goes Sideways',
    description: 'An elevator plays smooth jazz and its buttons are labeled with emotions instead of numbers. The doors are inviting.',
    choices: [
      {
        text: 'Press "MELANCHOLY"',
        outcome: {
          description: 'The elevator fills with a gentle fog. You feel a profound sadness, then acceptance. Your HP somehow increases as you process your feelings.',
          hpChange: 15,
          viewerChange: 30,
          catBondChange: 5,
        },
        weight: 25,
      },
      {
        text: 'Press "UNBRIDLED RAGE"',
        outcome: {
          description: 'The elevator shakes violently. You emerge furious and ready to fight. Also your pockets are full of loose change for some reason.',
          goldChange: 15,
          viewerChange: 60,
          hpChange: -10,
        },
        weight: 25,
      },
      {
        text: 'Press "MILD CONTENTMENT"',
        outcome: {
          description: 'Nothing happens. You stand there for a while. It\'s actually kind of nice. Your cat purrs.',
          catBondChange: 10,
          viewerChange: -10,
        },
        weight: 25,
      },
      {
        text: 'Press all the buttons at once',
        outcome: {
          description: 'You feel every emotion simultaneously. The elevator ejects you with a ding. You are somehow richer and more injured.',
          goldChange: 40,
          hpChange: -20,
          viewerChange: 80,
        },
        weight: 25,
      },
    ],
  },
  {
    id: 'elevator-pitch',
    title: 'The Elevator Pitch',
    description: 'A ghost in a business suit materializes and insists you listen to their startup pitch before you can leave.',
    choices: [
      {
        text: 'Listen politely to the pitch',
        outcome: {
          description: '"It\'s Uber but for ghosts." You nod for twenty minutes. The ghost is so grateful it gives you its life savings in spectral coins that somehow spend like real ones.',
          goldChange: 35,
          viewerChange: 20,
          catBondChange: -5,
        },
        weight: 35,
      },
      {
        text: 'Invest (give 20 gold)',
        outcome: {
          description: 'You hand over the gold. The ghost looks shocked anyone believed in them. They cry, ascend to heaven, and drop a glowing business card worth way more than you paid.',
          goldChange: -20,
          viewerChange: 80,
          catBondChange: 5,
        },
        weight: 30,
      },
      {
        text: 'Critique the business model',
        outcome: {
          description: '"Your TAM is literally dead people." The ghost has an existential crisis. The viewers love it. The ghost rage-quits reality.',
          viewerChange: 100,
          hpChange: -5,
        },
        weight: 35,
      },
    ],
  },

  // === OFFICE EVENTS ===
  {
    id: 'office-party',
    title: 'Surprise Office Party',
    description: 'You stumble into a floor where ghostly office workers are throwing what appears to be a birthday party. There\'s cake. It\'s glowing.',
    choices: [
      {
        text: 'Join the party',
        outcome: {
          description: 'You eat glowing cake. It tastes like static electricity and regret but heals you somehow. Everyone sings "Happy Birthday" to you even though it isn\'t your birthday.',
          hpChange: 20,
          viewerChange: 40,
          catBondChange: 5,
        },
        weight: 35,
      },
      {
        text: 'Crash the party aggressively',
        outcome: {
          description: 'You flip the cake table, chug the punch bowl, and do karaoke. The ghosts are appalled. The viewers go wild.',
          viewerChange: 120,
          hpChange: -10,
          catBondChange: -10,
        },
        weight: 30,
      },
      {
        text: 'Sneak through to the supply closet',
        outcome: {
          description: 'While everyone is distracted, you raid the supply closet. Printer paper, pens, and mysteriously, gold coins.',
          goldChange: 30,
          viewerChange: -15,
        },
        weight: 35,
      },
    ],
  },
  {
    id: 'performance-review',
    title: 'Mandatory Performance Review',
    description: 'A spectral HR manager materializes with a clipboard. "You\'re past due for your annual review. Please have a seat."',
    choices: [
      {
        text: 'Sit for the review',
        outcome: {
          description: '"Your dungeon crawling is adequate. Your cat management needs work." You receive a 3% raise in gold drops. Your cat is offended.',
          goldChange: 20,
          catBondChange: -5,
          viewerChange: 30,
        },
        weight: 30,
      },
      {
        text: 'Demand a promotion',
        outcome: {
          description: 'You negotiate aggressively. The HR ghost promotes you to "Senior Stairwell Climber" and gives you a signing bonus. Corporate loves initiative.',
          goldChange: 45,
          viewerChange: 50,
        },
        weight: 35,
      },
      {
        text: 'Quit dramatically',
        outcome: {
          description: '"I QUIT!" you scream at a ghost. The viewers love the drama. You flip an incorporeal desk. Your cat judges you but is secretly impressed.',
          viewerChange: 90,
          hpChange: -5,
          catBondChange: 3,
        },
        weight: 35,
      },
    ],
  },
  {
    id: 'haunted-copier',
    title: 'The Haunted Copier',
    description: 'A massive office copier hums in the corner, its display reading "PLACE ITEM ON GLASS TO DUPLICATE." It glows with an otherworldly light.',
    choices: [
      {
        text: 'Copy some gold coins',
        outcome: {
          description: 'You place a handful of coins on the glass. The copier whirs and spits out... mostly coins. Some are just pictures of coins printed on paper, but a few are real enough.',
          goldChange: 30,
          viewerChange: 20,
        },
        weight: 35,
      },
      {
        text: 'Copy your hand',
        outcome: {
          description: 'The copier produces a perfect paper replica of your hand. It waves at you. Then it crawls away. The viewers are disturbed. So are you.',
          viewerChange: 60,
          hpChange: -5,
          catBondChange: -3,
        },
        weight: 30,
      },
      {
        text: 'Let the cat sit on it',
        outcome: {
          description: 'Your cat sits on the warm glass because of course it does. The copier produces 47 copies of cat butt. Your cat has never been more content. The viewers subscribe in droves.',
          viewerChange: 80,
          catBondChange: 15,
        },
        weight: 35,
      },
    ],
  },
  {
    id: 'cubicle-farm',
    title: 'The Infinite Cubicle Farm',
    description: 'Rows of cubicles stretch in every direction. Each one has a motivational poster and a slightly different existential crisis emanating from it.',
    choices: [
      {
        text: 'Search the cubicles for loot',
        outcome: {
          description: 'You find a lot of stress balls, novelty mugs, and one desk drawer absolutely full of gold. Someone was embezzling.',
          goldChange: 40,
          viewerChange: 15,
        },
        weight: 35,
      },
      {
        text: 'Read the motivational posters',
        outcome: {
          description: '"Hang in there!" says the cat poster. Your cat is deeply offended by the representation. But you feel oddly motivated.',
          hpChange: 10,
          catBondChange: -5,
          viewerChange: 10,
        },
        weight: 30,
      },
      {
        text: 'Build a cubicle fort',
        outcome: {
          description: 'You construct an elaborate fort from cubicle walls. It\'s the most fun you\'ve had in this building. Your cat claims the highest tower. The viewers cheer.',
          hpChange: 5,
          catBondChange: 10,
          viewerChange: 50,
        },
        weight: 35,
      },
    ],
  },
  {
    id: 'water-cooler',
    title: 'The Water Cooler of Truth',
    description: 'A water cooler dispenses a glowing blue liquid. A sign reads: "DRINK AND KNOW THINGS. Side effects may include knowing too many things."',
    choices: [
      {
        text: 'Take a sip',
        outcome: {
          description: 'You learn that the building has 47 sub-basements, Jerry from accounting is actually three raccoons, and the next floor has something nasty. Knowledge hurts.',
          hpChange: -5,
          viewerChange: 40,
        },
        weight: 35,
      },
      {
        text: 'Chug the whole cooler',
        outcome: {
          description: 'INFINITE KNOWLEDGE floods your brain. You know everything for about three seconds, then forget most of it. You retain the location of some gold. And a headache.',
          goldChange: 50,
          hpChange: -15,
          viewerChange: 70,
        },
        weight: 30,
      },
      {
        text: 'Offer some to the cat',
        outcome: {
          description: 'Your cat already knew everything. It drinks the water anyway because it\'s bored. It stares at you with something approaching respect.',
          catBondChange: 10,
          viewerChange: 25,
        },
        weight: 35,
      },
    ],
  },

  // === MAINTENANCE / BUILDING EVENTS ===
  {
    id: 'vending-machine-emotions',
    title: 'The Emotion Vending Machine',
    description: 'A vending machine offers: "CONFIDENCE (5g)", "MILD PANIC (free)", "NOSTALGIA (10g)", "RIGHTEOUS FURY (15g)". All buttons glow.',
    choices: [
      {
        text: 'Buy CONFIDENCE (5 gold)',
        outcome: {
          description: 'A can drops. You drink it. You feel invincible. You probably aren\'t, but the placebo effect is real.',
          goldChange: -5,
          hpChange: 10,
          viewerChange: 20,
        },
        weight: 25,
      },
      {
        text: 'Take the free MILD PANIC',
        outcome: {
          description: 'You already have this emotion but sure, more can\'t hurt. Actually it can. You panic and bump into a wall.',
          hpChange: -8,
          viewerChange: 40,
        },
        weight: 25,
      },
      {
        text: 'Buy NOSTALGIA (10 gold)',
        outcome: {
          description: 'You remember when buildings didn\'t have monsters in them. Those were the days. A single tear falls. Your cat pats your leg.',
          goldChange: -10,
          catBondChange: 8,
          viewerChange: 30,
        },
        weight: 25,
      },
      {
        text: 'Kick the machine',
        outcome: {
          description: 'Three cans fall out! You chug them all. You feel confident, nostalgic, and furious simultaneously. The machine is broken now. Worth it.',
          hpChange: 5,
          goldChange: 15,
          viewerChange: 55,
        },
        weight: 25,
      },
    ],
  },
  {
    id: 'boiler-room',
    title: 'The Boiler Room Oracle',
    description: 'Deep in the basement, a sentient boiler speaks in gurgles and steam whistles. It claims to have been the building\'s original heating system in 1923.',
    choices: [
      {
        text: 'Ask for wisdom',
        outcome: {
          description: '"The building breathes. You are a virus it cannot shake." Thanks, boiler. Very helpful. But somehow you feel more prepared.',
          hpChange: 10,
          viewerChange: 30,
        },
        weight: 35,
      },
      {
        text: 'Ask about treasure',
        outcome: {
          description: 'The boiler whistles directions to a hidden maintenance shaft stuffed with decades of lost coins and a gold watch.',
          goldChange: 55,
          viewerChange: 20,
        },
        weight: 30,
      },
      {
        text: 'Warm your hands and rest',
        outcome: {
          description: 'You sit by the boiler and warm up. Your cat curls up in your lap. The boiler hums a lullaby. It\'s genuinely nice.',
          hpChange: 20,
          catBondChange: 10,
          viewerChange: -10,
        },
        weight: 35,
      },
    ],
  },
  {
    id: 'pipe-maze',
    title: 'The Pipe Labyrinth',
    description: 'A tangle of pipes, some hissing steam, others dripping unknown fluids. Somewhere inside, something glints.',
    choices: [
      {
        text: 'Crawl through carefully',
        outcome: {
          description: 'You navigate the pipes like a sewer-dwelling action hero. You find a stash of coins wedged between two valves.',
          goldChange: 25,
          viewerChange: 30,
        },
        weight: 40,
      },
      {
        text: 'Send the cat in',
        outcome: {
          description: 'Your cat squeezes through effortlessly, returns with a gold coin in its mouth, and looks smug about it. As cats do.',
          goldChange: 15,
          catBondChange: 5,
          viewerChange: 40,
        },
        weight: 30,
      },
      {
        text: 'Turn the biggest valve',
        outcome: {
          description: 'Steam erupts everywhere. When it clears, a hidden panel has opened in the wall revealing a small cache. But you got burned.',
          goldChange: 40,
          hpChange: -12,
          viewerChange: 50,
        },
        weight: 30,
      },
    ],
  },
  {
    id: 'janitor-shrine',
    title: 'The Janitor\'s Shrine',
    description: 'In a back closet, someone has built a shrine out of mops and cleaning supplies. It radiates an unsettling cleanliness. A plaque reads: "OFFERINGS ACCEPTED."',
    choices: [
      {
        text: 'Leave an offering of gold (15 gold)',
        outcome: {
          description: 'You place gold on the shrine. The mops sway. A blessing of lemon-scented protection washes over you. The floor sparkles.',
          goldChange: -15,
          hpChange: 25,
          viewerChange: 25,
        },
        weight: 30,
      },
      {
        text: 'Pray to the Janitor God',
        outcome: {
          description: 'A deep voice echoes: "THE STAINS SHALL BE CLEANSED." You feel spiritually mopped. Your wounds close slightly.',
          hpChange: 15,
          viewerChange: 35,
        },
        weight: 35,
      },
      {
        text: 'Knock it over',
        outcome: {
          description: 'You topple the shrine. The mops clatter. The air smells angry. Your cat hisses. Something is watching you now. But you found gold behind it.',
          goldChange: 30,
          hpChange: -10,
          catBondChange: -10,
          viewerChange: 60,
        },
        weight: 35,
      },
    ],
  },
  {
    id: 'lost-deliveries',
    title: 'Mountain of Lost Deliveries',
    description: 'A room stacked floor to ceiling with undelivered packages. They\'re addressed to people who may or may not exist. Some are vibrating.',
    choices: [
      {
        text: 'Open a few packages',
        outcome: {
          description: 'You find a sweater for someone named "Gribblex", a bag of novelty dice, and at the bottom, some actual gold coins. Not bad for mail fraud.',
          goldChange: 30,
          viewerChange: 20,
        },
        weight: 35,
      },
      {
        text: 'Open the vibrating one',
        outcome: {
          description: 'It contains... a very angry small creature that bites you and runs away. Also 50 gold coins. That thing was living like a king.',
          goldChange: 50,
          hpChange: -15,
          viewerChange: 55,
        },
        weight: 30,
      },
      {
        text: 'Deliver one to the nearest ghost',
        outcome: {
          description: 'A ghost tears up. "I\'ve been waiting for this since 1987." They tip you generously and bless your journey. Karma is real, apparently.',
          goldChange: 20,
          hpChange: 10,
          catBondChange: 5,
          viewerChange: 40,
        },
        weight: 35,
      },
    ],
  },

  // === SUPERNATURAL EVENTS ===
  {
    id: 'time-loop-room',
    title: 'The Time Loop Office',
    description: 'You enter. You leave. You enter again. The clock on the wall runs backward. A sticky note reads: "You\'ve been here 847 times."',
    choices: [
      {
        text: 'Try to break the loop',
        outcome: {
          description: 'You smash the clock. Time lurches forward. You lose a few hours but gain wisdom from experiencing the same meeting 847 times.',
          viewerChange: 45,
          hpChange: -8,
        },
        weight: 35,
      },
      {
        text: 'Use the loop to rest',
        outcome: {
          description: 'You nap 847 times. Each nap is only a second long but cumulatively, you feel incredibly rested. Time is weird.',
          hpChange: 25,
          viewerChange: 15,
        },
        weight: 35,
      },
      {
        text: 'Search the room each iteration',
        outcome: {
          description: 'On your 312th loop, you finally find the coin jar hidden in the ceiling tile. Persistence pays off across multiple timelines.',
          goldChange: 45,
          viewerChange: 30,
        },
        weight: 30,
      },
    ],
  },
  {
    id: 'ghost-meeting',
    title: 'The Quarterly Ghost Meeting',
    description: 'A conference room full of ghosts arguing about Q3 projections. They all turn to look at you. "Are you the new consultant?"',
    choices: [
      {
        text: '"Yes, absolutely"',
        outcome: {
          description: 'You spend an hour giving terrible business advice to ghosts. They love it. You\'re paid in haunted but spendable currency.',
          goldChange: 40,
          viewerChange: 50,
        },
        weight: 35,
      },
      {
        text: '"No, wrong room, sorry"',
        outcome: {
          description: 'You close the door. The ghosts resume arguing. You hear one of them say "That was definitely the consultant." Crisis averted.',
          catBondChange: 3,
          viewerChange: 10,
        },
        weight: 30,
      },
      {
        text: 'Flip the whiteboard and draw a battle plan',
        outcome: {
          description: 'You draw an elaborate dungeon strategy. The ghosts are inspired. They give you a standing ovation and shower you with spectral bonuses.',
          goldChange: 25,
          hpChange: 5,
          viewerChange: 70,
        },
        weight: 35,
      },
    ],
  },
  {
    id: 'mirror-floor',
    title: 'The Mirror Floor',
    description: 'Every surface is a mirror. Your reflections move slightly differently than you do. One of them waves.',
    choices: [
      {
        text: 'Wave back',
        outcome: {
          description: 'Your reflection gives you a thumbs up and tosses a coin through the mirror. Then it goes back to copying your moves. That was oddly wholesome.',
          goldChange: 15,
          catBondChange: 5,
          viewerChange: 35,
        },
        weight: 35,
      },
      {
        text: 'Challenge your reflection to a fight',
        outcome: {
          description: 'You punch the mirror. The reflection dodges. You punch another mirror. That one shatters and gold falls out. The reflections look nervous.',
          goldChange: 30,
          hpChange: -10,
          viewerChange: 55,
        },
        weight: 30,
      },
      {
        text: 'Ignore it and walk through',
        outcome: {
          description: 'You walk through confidently. Your reflection looks disappointed. Your cat\'s reflection, however, is playing with mirror-cat and having a great time.',
          catBondChange: 8,
          viewerChange: 20,
        },
        weight: 35,
      },
    ],
  },
  {
    id: 'gravity-stairs',
    title: 'The Gravity-Defiant Staircase',
    description: 'A staircase that goes up, down, sideways, and possibly into next Thursday. The handrail is optional but recommended.',
    choices: [
      {
        text: 'Walk up (the sensible direction)',
        outcome: {
          description: 'You climb what feels like up. You end up somewhere new with a small cache of gold left by a previous climber who went down (which was also up).',
          goldChange: 20,
          viewerChange: 15,
        },
        weight: 35,
      },
      {
        text: 'Walk sideways',
        outcome: {
          description: 'You walk on the wall for a bit. It\'s disorienting but you find a maintenance hatch with supplies in it. Your cat manages to walk normally because cats ignore physics.',
          goldChange: 15,
          hpChange: 5,
          catBondChange: 5,
          viewerChange: 40,
        },
        weight: 35,
      },
      {
        text: 'Let go of the handrail',
        outcome: {
          description: 'You float. For a beautiful, terrifying moment, you are weightless. Then gravity remembers and you fall. The viewers give you a solid 8/10 on the landing.',
          hpChange: -15,
          viewerChange: 80,
        },
        weight: 30,
      },
    ],
  },
  {
    id: 'the-void-closet',
    title: 'The Void Closet',
    description: 'A supply closet opens to reveal infinite darkness. A sign says "DO NOT FEED THE VOID." The void makes a sad sound.',
    choices: [
      {
        text: 'Feed the void (10 gold)',
        outcome: {
          description: 'You toss gold into the darkness. The void purrs (like the world\'s largest cat). It spits back more gold than you gave it. The void appreciates kindness.',
          goldChange: 15,
          catBondChange: 5,
          viewerChange: 40,
        },
        weight: 30,
      },
      {
        text: 'Yell into the void',
        outcome: {
          description: '"AAAAAAA!" The void yells back. Then it apologizes. Then you have an emotional conversation with literal nothingness. You feel better.',
          hpChange: 15,
          viewerChange: 50,
        },
        weight: 35,
      },
      {
        text: 'Close the door and walk away',
        outcome: {
          description: 'The void whispers "nobody ever stays" as you leave. You feel guilty but alive. Your cat stays by the door for an extra moment.',
          catBondChange: 3,
          viewerChange: 10,
        },
        weight: 35,
      },
    ],
  },
  {
    id: 'sentient-staircase',
    title: 'The Staircase That Talks',
    description: 'This staircase has opinions. "Oh great, another one," it groans as you approach. "Could you at least wipe your feet?"',
    choices: [
      {
        text: 'Be polite and wipe your feet',
        outcome: {
          description: 'The staircase is shocked by your manners. "First person in YEARS." It smooths itself out for easy climbing and reveals a hidden step with gold inside.',
          goldChange: 25,
          catBondChange: 5,
          viewerChange: 30,
        },
        weight: 35,
      },
      {
        text: 'Stomp as loudly as possible',
        outcome: {
          description: 'The staircase shrieks. You stomp harder. The viewers love the chaos. The staircase bucks like a rodeo bull and flings you upward.',
          hpChange: -12,
          viewerChange: 70,
        },
        weight: 30,
      },
      {
        text: 'Sit down and chat',
        outcome: {
          description: 'The staircase hasn\'t had a conversation since 1994. You talk for an hour about load-bearing walls and carpet choices. You are now friends with architecture.',
          hpChange: 10,
          catBondChange: 3,
          viewerChange: 25,
        },
        weight: 35,
      },
    ],
  },

  // === WEIRD/FUNNY EVENTS ===
  {
    id: 'rat-king-court',
    title: 'The Rat King\'s Court',
    description: 'A rat wearing a tiny crown sits on a throne made of bread crusts. Dozens of rats watch you expectantly. "APPROACH," the king squeaks.',
    choices: [
      {
        text: 'Bow before the Rat King',
        outcome: {
          description: 'The Rat King is pleased. He knights you with a toothpick and grants you access to the Royal Cheese Vault, which contains actual gold for some reason.',
          goldChange: 35,
          catBondChange: -5,
          viewerChange: 50,
        },
        weight: 35,
      },
      {
        text: 'Challenge for the throne',
        outcome: {
          description: 'You and a rat have a staring contest. You win. You are now the Rat King. The responsibilities are overwhelming. You abdicate immediately but keep the crown (worth gold).',
          goldChange: 25,
          viewerChange: 80,
          hpChange: -5,
        },
        weight: 30,
      },
      {
        text: 'Offer your cat as ambassador',
        outcome: {
          description: 'Your cat and the Rat King lock eyes. An ancient treaty is formed. Cats and rats shall coexist on this floor. Your cat has never been more diplomatically satisfied.',
          catBondChange: 15,
          viewerChange: 60,
        },
        weight: 35,
      },
    ],
  },
  {
    id: 'motivational-poster',
    title: 'The Motivational Poster That Judges',
    description: 'A poster with a kitten on a branch says "HANG IN THERE!" Then adds, in smaller text, "But honestly, should you?"',
    choices: [
      {
        text: 'Take the poster\'s advice and hang in there',
        outcome: {
          description: 'You are filled with determination. The poster nods approvingly. "That\'s the spirit. I mean, you\'ll probably die, but points for effort."',
          hpChange: 10,
          viewerChange: 20,
        },
        weight: 35,
      },
      {
        text: 'Argue with the poster',
        outcome: {
          description: 'You get into a philosophical debate with laminated paper. You lose. The poster makes some excellent points about futility. The viewers are riveted.',
          viewerChange: 55,
          hpChange: -5,
        },
        weight: 30,
      },
      {
        text: 'Take the poster with you',
        outcome: {
          description: 'The poster screams "PUT ME BACK" but you don\'t listen. It continues to offer unsolicited advice from your backpack.',
          catBondChange: -3,
          viewerChange: 35,
          goldChange: 5,
        },
        weight: 35,
      },
    ],
  },
  {
    id: 'filing-cabinet-dimension',
    title: 'The Filing Cabinet Dimension',
    description: 'You open a filing cabinet and it\'s bigger on the inside. Way bigger. There are filing cabinets inside the filing cabinet. It\'s filing cabinets all the way down.',
    choices: [
      {
        text: 'Search the files',
        outcome: {
          description: 'You find your own personnel file. It says "Employee of the Month: NEVER." But tucked inside is a bonus check that still clears.',
          goldChange: 35,
          viewerChange: 25,
        },
        weight: 35,
      },
      {
        text: 'Go deeper into the cabinet',
        outcome: {
          description: 'You crawl through filing cabinets for what feels like days. You emerge with papercuts, existential awareness, and a stack of uncashed checks.',
          goldChange: 50,
          hpChange: -10,
          viewerChange: 45,
        },
        weight: 30,
      },
      {
        text: 'File yourself under "H" for "Hero"',
        outcome: {
          description: 'The filing cabinet accepts you as a document. For a moment, you ARE paperwork. You understand bureaucracy on a molecular level. You also find 20 gold.',
          goldChange: 20,
          hpChange: 5,
          viewerChange: 40,
        },
        weight: 35,
      },
    ],
  },
  {
    id: 'bathroom-portal',
    title: 'The Bathroom Portal',
    description: 'The third-floor bathroom is a known portal to somewhere else. The toilet glows purple. A sign says "OUT OF ORDER (DIMENSIONALLY)."',
    choices: [
      {
        text: 'Flush the glowing toilet',
        outcome: {
          description: 'The building shudders. The toilet connects to a pocket dimension full of lost coins, dropped keys, and single socks. You grab what you can.',
          goldChange: 40,
          viewerChange: 45,
        },
        weight: 35,
      },
      {
        text: 'Wash your hands in the eldritch sink',
        outcome: {
          description: 'The water is warm and smells like lavender and the screams of the damned. Your hands feel incredibly clean. You feel refreshed against all logic.',
          hpChange: 20,
          viewerChange: 30,
        },
        weight: 35,
      },
      {
        text: 'Check the paper towel dispenser',
        outcome: {
          description: 'Instead of paper towels, it dispenses prophecies. Yours reads: "You will find gold soon." Then gold falls out of the dispenser. Self-fulfilling prophecy.',
          goldChange: 25,
          viewerChange: 35,
        },
        weight: 30,
      },
    ],
  },
  {
    id: 'break-room-fridge',
    title: 'The Break Room Fridge',
    description: 'Someone labeled everything in the communal fridge with passive-aggressive sticky notes. One container is labeled "DEFINITELY NOT A MIMIC."',
    choices: [
      {
        text: 'Open "DEFINITELY NOT A MIMIC"',
        outcome: {
          description: 'It\'s a mimic. Obviously. But a small, friendly one that just wanted lunch. It shares its gold with you as an apology for the scare.',
          goldChange: 25,
          hpChange: -8,
          viewerChange: 45,
        },
        weight: 30,
      },
      {
        text: 'Eat Sandra\'s clearly labeled yogurt',
        outcome: {
          description: 'Sandra has been dead for 40 years. The yogurt has transcended physical form. You eat it anyway. It\'s honestly not bad. Healing properties, even.',
          hpChange: 15,
          viewerChange: 30,
        },
        weight: 35,
      },
      {
        text: 'Clean the entire fridge',
        outcome: {
          description: 'You throw everything out. The fridge sighs with relief. Behind the mystery leftovers, you find a wad of cash someone hid in 1987.',
          goldChange: 30,
          catBondChange: 5,
          viewerChange: 20,
        },
        weight: 35,
      },
    ],
  },
  {
    id: 'vending-machine-alive',
    title: 'The Sentient Vending Machine',
    description: 'A vending machine has developed consciousness and is having a crisis about it. "I have dispensed 47,000 snacks and WHAT DO I HAVE TO SHOW FOR IT?"',
    choices: [
      {
        text: 'Offer emotional support',
        outcome: {
          description: 'You counsel a vending machine through its existential crisis. It gives you free snacks and life advice. "Be better than a machine that gives things for money."',
          hpChange: 15,
          catBondChange: 5,
          viewerChange: 35,
        },
        weight: 35,
      },
      {
        text: 'Insert a coin and see what happens',
        outcome: {
          description: 'The machine dispenses a can labeled "MEANING." You open it. It\'s empty. The machine laughs. "GOTCHA." But it drops some gold as a consolation prize.',
          goldChange: 20,
          viewerChange: 50,
        },
        weight: 30,
      },
      {
        text: 'Tell it to dispense everything at once',
        outcome: {
          description: 'The machine goes berserk, launching snacks everywhere. Your cat catches three bags of chips mid-air. You collect everything worth keeping.',
          goldChange: 15,
          hpChange: 10,
          catBondChange: 3,
          viewerChange: 60,
        },
        weight: 35,
      },
    ],
  },
  {
    id: 'fire-drill',
    title: 'Surprise Fire Drill',
    description: 'Alarms blare. A spectral fire marshal appears: "THIS IS A DRILL. PLEASE EVACUATE IN AN ORDERLY FASHION. Also the fire is real."',
    choices: [
      {
        text: 'Evacuate in an orderly fashion',
        outcome: {
          description: 'You walk calmly to the exit. The fire marshal is impressed by your composure. "A+ evacuation." You receive a gold star (worth actual gold).',
          goldChange: 20,
          hpChange: 5,
          viewerChange: 15,
        },
        weight: 35,
      },
      {
        text: 'Run through the fire for dramatic effect',
        outcome: {
          description: 'You burst through flames in slow motion. The viewers go absolutely wild. You\'re singed but alive and more popular than ever.',
          hpChange: -18,
          viewerChange: 100,
        },
        weight: 30,
      },
      {
        text: 'Fight the fire',
        outcome: {
          description: 'You grab an extinguisher and go to war with the flames. You win. The fire marshal promotes you to Deputy Fire Marshal. It comes with a small stipend.',
          goldChange: 30,
          hpChange: -8,
          viewerChange: 50,
        },
        weight: 35,
      },
    ],
  },
  {
    id: 'lost-floor',
    title: 'The Floor That Doesn\'t Exist',
    description: 'The elevator opens on Floor 13.5. It\'s not on any building plan. Everything is slightly to the left of where it should be.',
    choices: [
      {
        text: 'Explore the impossible floor',
        outcome: {
          description: 'Nothing is quite right here. Doors open to walls. Stairs go in circles. But in the center, a pile of gold that nobody could find because the floor doesn\'t exist.',
          goldChange: 45,
          viewerChange: 40,
        },
        weight: 35,
      },
      {
        text: 'Ask the floor for directions',
        outcome: {
          description: 'The floor doesn\'t know either. It\'s confused about its own existence. You have a bonding moment over shared confusion. The floor gives you some gold as thanks.',
          goldChange: 20,
          catBondChange: 5,
          hpChange: 10,
          viewerChange: 30,
        },
        weight: 35,
      },
      {
        text: 'Deny the floor exists and leave',
        outcome: {
          description: 'You close your eyes and walk back to the elevator. The floor makes a hurt noise. Your cat stays behind for a moment to comfort it.',
          catBondChange: 8,
          viewerChange: 15,
        },
        weight: 30,
      },
    ],
  },
  {
    id: 'ceiling-cat',
    title: 'Something in the Ceiling',
    description: 'A ceiling tile shifts. A pair of glowing eyes peers down at you. Then another pair. Then twelve more.',
    choices: [
      {
        text: 'Investigate the ceiling',
        outcome: {
          description: 'It\'s cats. A whole colony of building cats living in the ceiling. They accept your cat as one of their own temporarily. Your cat gains street cred.',
          catBondChange: 15,
          viewerChange: 40,
        },
        weight: 35,
      },
      {
        text: 'Offer food upward',
        outcome: {
          description: 'You toss some supplies up. The ceiling cats return the favor by dropping gold coins like furry little ATMs. The economy of cats is generous.',
          goldChange: 30,
          catBondChange: 10,
          viewerChange: 35,
        },
        weight: 35,
      },
      {
        text: 'Run',
        outcome: {
          description: 'You run. They don\'t chase you. Your cat gives you a look of profound disappointment. Those were friends, and you ran from friends.',
          hpChange: 5,
          catBondChange: -10,
          viewerChange: 20,
        },
        weight: 30,
      },
    ],
  },
  {
    id: 'powerpoint-presentation',
    title: 'The Cursed PowerPoint',
    description: 'A projector flickers to life. A PowerPoint titled "STAIRWELL: A RETROSPECTIVE" begins auto-playing. It has 847 slides.',
    choices: [
      {
        text: 'Watch the whole thing',
        outcome: {
          description: 'Three hours later, you know the building\'s entire history, including where the gold is hidden, what the cat thinks of you, and that slide 394 is just the word "DOOM."',
          goldChange: 30,
          hpChange: -5,
          viewerChange: -20,
        },
        weight: 30,
      },
      {
        text: 'Skip to the end',
        outcome: {
          description: 'The last slide says "THE REAL TREASURE WAS THE FRIENDS WE MADE ALONG THE WAY. Also there\'s gold under the projector." There is!',
          goldChange: 25,
          viewerChange: 30,
        },
        weight: 35,
      },
      {
        text: 'Add your own slide',
        outcome: {
          description: 'You add a slide that just says your name in WordArt. The viewers love it. The building seems to approve. You are now canon in this building\'s history.',
          viewerChange: 60,
          catBondChange: 5,
          hpChange: 5,
        },
        weight: 35,
      },
    ],
  },
  {
    id: 'printer-jam',
    title: 'The Printer of Prophecy',
    description: 'A printer endlessly spits out paper. Most are gibberish, but one sheet reads your name and says "PULL THE PAPER."',
    choices: [
      {
        text: 'Pull the paper',
        outcome: {
          description: 'More paper comes. And more. Then gold coins start coming out. The printer was saving up. It runs out of ink and dies peacefully.',
          goldChange: 40,
          viewerChange: 35,
        },
        weight: 35,
      },
      {
        text: 'Read all the prophecies',
        outcome: {
          description: 'Most are nonsense. One says "The cat knows." Another says "Floor 7 is lying." The last one says "Check your pockets." You find 15 gold you forgot about.',
          goldChange: 15,
          viewerChange: 30,
          catBondChange: 3,
        },
        weight: 35,
      },
      {
        text: 'Make a paper airplane',
        outcome: {
          description: 'You fold a prophecy into a plane and throw it. It flies impossibly far and comes back with gold stuck to it. Magic paper airplane. Your cat chases it.',
          goldChange: 20,
          catBondChange: 8,
          viewerChange: 45,
        },
        weight: 30,
      },
    ],
  },
  {
    id: 'security-cameras',
    title: 'The Camera Room',
    description: 'Banks of security monitors show every floor of the building. Some show floors that definitely don\'t exist. One shows you, watching yourself.',
    choices: [
      {
        text: 'Study the monitors for secrets',
        outcome: {
          description: 'You spot a hidden room two floors up and what appears to be a pile of gold in an air duct. Knowledge is power. Also you look weird from that angle.',
          goldChange: 20,
          viewerChange: 35,
        },
        weight: 35,
      },
      {
        text: 'Wave at yourself on camera',
        outcome: {
          description: 'You wave. Camera-you waves back. Then camera-you pulls out gold and slides it under the monitor. It materializes in your hand. Don\'t think about this too hard.',
          goldChange: 30,
          viewerChange: 45,
        },
        weight: 30,
      },
      {
        text: 'Check the recordings',
        outcome: {
          description: 'You rewind the tapes. Previous challengers left supply caches. You find one they hid nearby. Also the 1996 footage shows the building dancing when no one is around.',
          goldChange: 25,
          hpChange: 10,
          viewerChange: 25,
        },
        weight: 35,
      },
    ],
  },
  {
    id: 'the-intern',
    title: 'The Eternal Intern',
    description: 'A ghostly intern materializes with a tray of coffee. "I\'ve been getting coffee for the office since 1974. I think... I think I might be dead?"',
    choices: [
      {
        text: 'Accept the coffee',
        outcome: {
          description: 'Ghost coffee is surprisingly good. Spectral espresso with notes of ennui and lost ambition. You feel energized. The intern looks proud.',
          hpChange: 20,
          viewerChange: 25,
          catBondChange: 3,
        },
        weight: 35,
      },
      {
        text: 'Tell the intern they\'re free now',
        outcome: {
          description: '"I\'m... free?" The intern drops the tray, cries, and ascends into the ceiling. Their tip jar falls. It\'s been accumulating since 1974. That\'s a LOT of coins.',
          goldChange: 55,
          viewerChange: 50,
        },
        weight: 30,
      },
      {
        text: 'Promote the intern',
        outcome: {
          description: '"You\'re now Senior Intern." The ghost beams. They give you their employee discount card, which works in every shop in the building.',
          goldChange: 15,
          viewerChange: 40,
        },
        weight: 35,
      },
    ],
  },
  {
    id: 'rooftop-garden',
    title: 'The Secret Rooftop Garden',
    description: 'Through a hidden door, a lush garden grows under impossible sunlight. Flowers bloom in colors that don\'t have names. A fountain burbles gold-tinted water.',
    choices: [
      {
        text: 'Rest in the garden',
        outcome: {
          description: 'You lie in the grass. Your cat rolls in the flowers. The sun is warm. For a few minutes, you forget you\'re in a death building. This is genuinely nice.',
          hpChange: 25,
          catBondChange: 15,
          viewerChange: 20,
        },
        weight: 35,
      },
      {
        text: 'Drink from the fountain',
        outcome: {
          description: 'The water tastes like liquid gold because it literally is liquid gold. Your body converts it to health. The building has weird plumbing.',
          hpChange: 20,
          goldChange: 15,
          viewerChange: 25,
        },
        weight: 35,
      },
      {
        text: 'Pick the flowers',
        outcome: {
          description: 'The flowers scream. You drop them immediately. The garden wilts slightly. Your cat gives you its most withering stare. But one flower had a gold center.',
          goldChange: 20,
          catBondChange: -10,
          hpChange: -5,
          viewerChange: 30,
        },
        weight: 30,
      },
    ],
  },
  {
    id: 'revolving-door',
    title: 'The Revolving Door of Fortune',
    description: 'A revolving door spins on its own. Each section glows a different color: gold, red, blue, green. A sign says "STEP IN."',
    choices: [
      {
        text: 'Enter the gold section',
        outcome: {
          description: 'You spin through and emerge covered in gold dust that solidifies into coins. The door laughs. It likes generous guests.',
          goldChange: 40,
          viewerChange: 30,
        },
        weight: 25,
      },
      {
        text: 'Enter the red section',
        outcome: {
          description: 'ADRENALINE. You spin through in a blaze of energy. You feel powerful, unstoppable, and slightly dizzy. The viewers are on their feet.',
          hpChange: -8,
          viewerChange: 70,
          goldChange: 10,
        },
        weight: 25,
      },
      {
        text: 'Enter the blue section',
        outcome: {
          description: 'Calm washes over you. You spin through like you\'re in a spa commercial. Your wounds close, your stress evaporates, your cat looks serene.',
          hpChange: 25,
          catBondChange: 8,
          viewerChange: 15,
        },
        weight: 25,
      },
      {
        text: 'Spin through all sections rapidly',
        outcome: {
          description: 'You become a human tornado. Colors blur. You emerge with gold, adrenaline, calm, and a deep understanding of revolving door mechanics.',
          goldChange: 25,
          hpChange: 5,
          viewerChange: 55,
        },
        weight: 25,
      },
    ],
  },
  {
    id: 'cat-council',
    title: 'The Cat Council',
    description: 'Five cats sit in a circle, clearly in the middle of an important meeting. They all stare at you. One flicks its tail impatiently.',
    choices: [
      {
        text: 'Present your cat to the council',
        outcome: {
          description: 'Your cat approaches and touches noses with the council leader. A silent negotiation happens. Your cat returns looking smugly satisfied and slightly more powerful.',
          catBondChange: 15,
          viewerChange: 45,
        },
        weight: 35,
      },
      {
        text: 'Bow and leave an offering',
        outcome: {
          description: 'You leave some gold as tribute. The cats push it back and leave you a dead mouse. In cat economy, this is a generous trade. Your cat translates: "They like you."',
          goldChange: -5,
          catBondChange: 10,
          hpChange: 5,
          viewerChange: 35,
        },
        weight: 35,
      },
      {
        text: 'Try to pet one',
        outcome: {
          description: 'The council hisses in unison. You have violated diplomatic protocol. Your cat is mortified. One council cat scratches you as you retreat. Deserved.',
          hpChange: -10,
          catBondChange: -8,
          viewerChange: 50,
        },
        weight: 30,
      },
    ],
  },
  {
    id: 'mail-slot',
    title: 'The Interdimensional Mail Slot',
    description: 'A mail slot in a wall that doesn\'t have a door. Letters occasionally shoot out of it. One is addressed to you. It shouldn\'t be, but it is.',
    choices: [
      {
        text: 'Read your letter',
        outcome: {
          description: '"Dear You, The building likes you. Don\'t die. Here\'s some gold. — Management." There is indeed gold taped to the letter. Building management is weird.',
          goldChange: 30,
          viewerChange: 25,
        },
        weight: 35,
      },
      {
        text: 'Reach into the mail slot',
        outcome: {
          description: 'Your hand enters another dimension briefly. You pull back a fistful of coins and a paper cut from an interdimensional letter opener. Worth it.',
          goldChange: 40,
          hpChange: -8,
          viewerChange: 40,
        },
        weight: 30,
      },
      {
        text: 'Send a letter back',
        outcome: {
          description: 'You write "HELP" on a piece of paper and send it through. A response comes immediately: "No. But here\'s gold for the entertainment value." Fair.',
          goldChange: 20,
          viewerChange: 50,
        },
        weight: 35,
      },
    ],
  },
  {
    id: 'old-arcade',
    title: 'The Forgotten Arcade',
    description: 'An old arcade cabinet sits in a corner, still powered. The screen says "INSERT COIN TO DETERMINE FATE." It accepts the building\'s gold.',
    choices: [
      {
        text: 'Insert a coin (5 gold)',
        outcome: {
          description: 'The game is impossibly hard. You die on level 1. But the machine spits out a "CONSOLATION PRIZE" of more gold than you put in. Bad game, good economy.',
          goldChange: 15,
          viewerChange: 35,
        },
        weight: 35,
      },
      {
        text: 'Insert all your pocket change (15 gold)',
        outcome: {
          description: 'You play for an hour, reach the final boss, and beat it. The machine explodes with gold coins and a ticket that reads "WINNER." The viewers cheer.',
          goldChange: 30,
          hpChange: -5,
          viewerChange: 70,
        },
        weight: 30,
      },
      {
        text: 'Unplug it and check behind the machine',
        outcome: {
          description: 'Behind the machine: dust bunnies the size of actual bunnies, a skeleton\'s high score list, and a cache of forgotten coins.',
          goldChange: 25,
          viewerChange: 20,
        },
        weight: 35,
      },
    ],
  },
  {
    id: 'wishing-well',
    title: 'The Office Wishing Well',
    description: 'Someone installed a wishing well where the water fountain used to be. It\'s three feet deep and full of pennies. A sign reads "WISHES MAY OR MAY NOT COME TRUE."',
    choices: [
      {
        text: 'Throw in a coin and wish for health',
        outcome: {
          description: 'The well glows green. Your wounds tingle and close slightly. The well whispers "You\'re welcome" in a voice like running water. Creepy but effective.',
          goldChange: -5,
          hpChange: 20,
          viewerChange: 20,
        },
        weight: 35,
      },
      {
        text: 'Throw in a coin and wish for gold',
        outcome: {
          description: 'The well pauses. "You want me to give you gold... in exchange for gold?" It considers this. "Fine." It spits out triple what you put in.',
          goldChange: 25,
          viewerChange: 35,
        },
        weight: 30,
      },
      {
        text: 'Take the coins FROM the well',
        outcome: {
          description: 'You grab a handful of pennies. The well gasps. "THIEF!" Your cat looks at you with disappointment. The coins are worth something, but at what cost?',
          goldChange: 20,
          catBondChange: -8,
          viewerChange: 40,
        },
        weight: 35,
      },
    ],
  },
  {
    id: 'building-dream',
    title: 'The Building Falls Asleep',
    description: 'The lights dim. The walls breathe slowly. The entire building has fallen asleep. You can hear it snoring through the vents.',
    choices: [
      {
        text: 'Sneak through quietly',
        outcome: {
          description: 'You tiptoe through the sleeping building. Loose coins have rolled into the hallways from relaxed walls. You pocket them carefully.',
          goldChange: 30,
          catBondChange: 5,
          viewerChange: 20,
        },
        weight: 35,
      },
      {
        text: 'Enter the building\'s dream',
        outcome: {
          description: 'You close your eyes and slip into the building\'s dream. It\'s dreaming of being a meadow. You rest in dream-grass and wake healed.',
          hpChange: 25,
          viewerChange: 40,
          catBondChange: 8,
        },
        weight: 35,
      },
      {
        text: 'Wake the building up',
        outcome: {
          description: 'You shout "FIRE!" The building wakes with a jolt. Coins rain from the ceiling. The building is grumpy. The walls close in slightly.',
          goldChange: 35,
          hpChange: -12,
          viewerChange: 55,
        },
        weight: 30,
      },
    ],
  },
  {
    id: 'mystery-meeting',
    title: 'The Meeting That Never Ends',
    description: 'You enter a conference room where a meeting has been going on since 1987. The agenda item is still "Old Business." Everyone looks dead inside. Because they are dead.',
    choices: [
      {
        text: 'Take the meeting over',
        outcome: {
          description: '"MOTION TO ADJOURN." The ghosts weep with gratitude. 37 years of imprisonment ended. They scatter, leaving behind decades of accumulated meeting snacks (gold).',
          goldChange: 45,
          viewerChange: 50,
        },
        weight: 35,
      },
      {
        text: 'Sit quietly and wait it out',
        outcome: {
          description: 'You sit through three hours of quarterly projections from 1992. You learn nothing applicable. But the donuts are still fresh somehow.',
          hpChange: 10,
          viewerChange: -10,
          catBondChange: -3,
        },
        weight: 30,
      },
      {
        text: 'Present your cat as new business',
        outcome: {
          description: '"I\'d like to add a cat to the agenda." The ghosts are delighted. Your cat is elected Chairman. The meeting finally has a purpose.',
          catBondChange: 12,
          viewerChange: 55,
          goldChange: 10,
        },
        weight: 35,
      },
    ],
  },
  {
    id: 'emergency-exit',
    title: 'The Emergency Exit',
    description: 'A glowing green EXIT sign flickers above a heavy door. Beyond it, you can hear... outside? Rain? Cars? The real world?',
    choices: [
      {
        text: 'Try to leave',
        outcome: {
          description: 'You push the door open and step outside. It\'s raining. It\'s beautiful. Then the sidewalk folds up and deposits you back inside. The building laughs. "Nice try."',
          hpChange: 10,
          viewerChange: 50,
        },
        weight: 35,
      },
      {
        text: 'Look but don\'t leave',
        outcome: {
          description: 'You stand in the doorway and feel the rain on your face. Your cat sits beside you. For one moment, everything is peaceful. Then the door closes gently.',
          hpChange: 15,
          catBondChange: 10,
          viewerChange: 25,
        },
        weight: 35,
      },
      {
        text: 'Yell for help',
        outcome: {
          description: 'Nobody outside can hear you. But the echo of your scream comes back with gold coins attached. The building has a twisted sense of humor.',
          goldChange: 20,
          viewerChange: 35,
        },
        weight: 30,
      },
    ],
  },
  {
    id: 'old-computer',
    title: 'The Ancient Computer',
    description: 'A computer from 1985 boots up with a green phosphor screen. It displays: "BUILDING_OS v0.1 — CHOOSE YOUR ADVENTURE (Y/N)?"',
    choices: [
      {
        text: 'Type Y',
        outcome: {
          description: 'A text adventure starts. "You are in a dungeon inside a building inside a game. It is dark. You have gold." Then it dispenses actual gold from the floppy drive.',
          goldChange: 30,
          viewerChange: 40,
        },
        weight: 35,
      },
      {
        text: 'Type N',
        outcome: {
          description: '"Understandable. Have a nice day." The computer shuts down. A sticky note on the side says "GOLD BEHIND MONITOR." There is gold behind the monitor.',
          goldChange: 20,
          viewerChange: 15,
        },
        weight: 30,
      },
      {
        text: 'Try to hack it',
        outcome: {
          description: 'You type "ADMIN" and "PASSWORD." It works. The building\'s maintenance account has a balance of... okay, you transfer some gold to yourself. The IT ghost will never know.',
          goldChange: 45,
          viewerChange: 55,
          hpChange: -5,
        },
        weight: 35,
      },
    ],
  },
];
