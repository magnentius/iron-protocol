# Iron Protocol
**A Tactical Game of Iron Frame Combat**

![Iron Protocol Cover Art](images/iron_protocol.jpg)

*Fusing tactical resource management and locational damage with fluid turn-order dynamics and initiative-based action.*

---

## Table of Contents
- [Introduction: The Iron Protocol](#introduction-the-iron-protocol)
  - [Why We Fight in Frames](#the-lore-of-the-protocol-why-we-fight-in-frames)
  - [Core Tenets of the Protocol](#core-tenets-of-the-protocol)
- [1. Fundamental Concepts & Game Setup](#1-fundamental-concepts--game-setup)
  - [1.1 Anatomy of an Iron Frame Profile](#11-anatomy-of-an-iron-frame-profile)
  - [1.2 The Hex Grid & Facing Conventions](#12-the-hex-grid--facing-conventions)
  - [1.3 Firing Arcs & Hit Zones](#13-firing-arcs--hit-zones)
  - [1.4 Scenario Setup & Deployment](#14-scenario-setup--deployment)
    - [1.4.1 Introductory Scenario: Trial by Fire](#141-introductory-scenario-trial-by-fire-1v1-duel)
- [2. Turn Sequence](#2-turn-sequence)
  - [2.1 Energy Phase](#21-energy-phase)
  - [2.2 Activation Phase](#22-activation-phase-reverse-initiative-order)
    - [2.2.1 Movement Examples](#221-movement-examples)
  - [2.3 Combat Phase](#23-combat-phase-initiative-order)
    - [2.3.1 Combat Examples](#231-combat-examples)
  - [2.4 End Phase](#24-end-phase)
- [3. Terrain & Elevation](#3-terrain--elevation)
  - [3.1 Summary of Terrain Types](#31-summary-of-terrain-types)
  - [3.2 Movement & Elevation Rules](#32-movement--elevation-rules)
  - [3.3 Hard Cover vs. Concealment](#33-hard-cover-vs-concealment-sensors--locks)
  - [3.4 Line of Sight (LOS) & Elevation Height Math](#34-line-of-sight-los--elevation-height-math)
  - [3.5 Pilot Checks & Water Cooling](#35-pilot-checks--water-cooling)
- [4. Sensors, Stealth, and Detection](#4-sensors-stealth-and-detection)
  - [4.1 The Sensor Suite](#41-the-sensor-suite-head-location)
  - [4.2 Stealth & Defensive Countermeasures](#42-stealth--defensive-countermeasures)
  - [4.3 Tactical Datalink](#43-tactical-datalink-head-location)
- [5. Weapons & Munitions](#5-weapons--munitions)
  - [5.1 Autocannon Munitions](#51-autocannon-munitions)
  - [5.2 Guided Missile Systems](#52-guided-missile-systems)
  - [5.3 Universal System Traits](#53-universal-system-traits)
- [6. Damage & Critical Hits](#6-damage--critical-hits)
  - [6.1 Hit Location Table](#61-hit-location-table-2d6)
  - [6.2 Critical Hit Tables](#62-critical-hit-tables-1d6-cascading)
  - [6.3 Falling and the Prone State](#63-falling-and-the-prone-state)
  - [6.4 Pilot Checks](#64-pilot-checks)
  - [6.5 Location Destruction & Damage Transfer](#65-location-destruction--damage-transfer)
- [7. Optional Rules](#7-optional-rules)
  - [7.1 Force Organization & Point Limits](#71-force-organization--point-limits)
  - [7.2 Base Chassis & Custom Frames](#72-base-chassis--custom-frames)
  - [7.3 Named Pilots & The Code of Honor](#73-named-pilots--the-code-of-honor)
- [8. Iron Frame Roster](#8-iron-frame-roster)
  - [8.1 IF-25L-1 "Jackal"](#81-if-25l-1-jackal-light-recon-frame)
  - [8.2 IF-45M-1 "Specter"](#82-if-45m-1-specter-medium-stealth-frame)
  - [8.3 IF-55M-1 "Vanguard"](#83-if-55m-1-vanguard-medium-skirmisher-frame)
  - [8.4 IF-75H-1 "Paladin"](#84-if-75h-1-paladin-heavy-fire-support-frame)
  - [8.5 IF-90A-1 "Colossus"](#85-if-90a-1-colossus-heavy-assault-frame)

---

## Introduction: The Iron Protocol
In the war-torn era of a devastated Earth, surface warfare is not decided by faceless drone swarms, heavy tank divisions, or indiscriminate strategic missile strikes. Instead, factional conflicts and territorial disputes are resolved by the pilots of massive, heavily armed walking weapon platforms known as **Iron Frames**. 

These elite pilots adhere to the **Iron Protocol**—an ancient, unyielding code of martial honor and combat conduct inspired by Earth's historical Bushido. The Protocol dictates that territorial conflicts must be settled within designated engagement zones, frame-to-frame, where tactical energy management, maneuverability, and pilot skill determine the victor. To violate the Protocol is to invite immediate dishonor, global outlaw status, and swift retaliation by all allied factions.

### The Lore of the Protocol: Why We Fight in Frames

The emergence of the Iron Protocol was born of necessity, forged from the ashes of the **Cinder Wars**—a period of total industrial warfare that left entire continents scorched, cities in ruins, and Earth's biosphere on the brink of complete collapse. To prevent human extinction, the surviving nation-states and corporations signed the Accords, establishing the Protocol to govern all future terrestrial conflicts.

#### 1. The Preservation of Biospheres & Infrastructure
Earth's remaining arable land, clean water reserves, and surviving industrial infrastructure are humanity's most precious assets. Conventional mass warfare—carpet bombing, tactical nuclear strikes, and massive tank divisions tearing up agricultural land—irreversibly ruins the planet's remaining ecosystems. The Iron Protocol strictly outlaws weapons of mass destruction, strategic bombing, and heavy tracked armor. Battles are confined to designated, unpopulated "Honor Fields" and containment zones to preserve surviving biospheres for the victor.

#### 2. The Kessler Shroud (No Missiles, GPS, or Orbitals)
Ballistic missiles travel a suborbital arc that peaks between 800 and 1,200 kilometers above the surface—directly through what was once called Low Earth Orbit. During the final years of the Cinder Wars, competing powers launched hundreds of anti-satellite weapons in a desperate bid to blind each other's targeting and communications networks. They succeeded—and in doing so, triggered a runaway debris cascade now known as the **Kessler Shroud**.

The Shroud is a permanent, self-sustaining belt of fragmented steel, shattered solar panels, and pulverized satellite bus material traveling at orbital velocity. Any object that reaches sufficient altitude is struck within minutes. Warhead casings are shredded before they reach apogee. Guidance fins are stripped away in milliseconds. The debris field does not discriminate: civilian resupply drones, military recon packages, and ICBM re-entry vehicles all meet the same fate. Humanity effectively walled itself out of space.

The strategic consequences were immediate and permanent. Long-range ballistic weapons became useless overnight. Every GPS constellation was destroyed within weeks of the cascade beginning—navigation satellites occupy exactly the altitude range the Shroud now owns. Reconnaissance satellites, weather platforms, and communications relays followed. No faction has achieved orbital insertion in over sixty years, and none expect to in their lifetimes.

Without satellite imaging, battlefield intelligence has collapsed back to line-of-sight. Pilots navigate by inertial systems, dead reckoning, and pre-war topographic maps that grow less accurate each year as tectonic activity reshapes the terrain. There is no overhead view of the engagement zone, no GPS waypoint to lock onto, no real-time feed from orbit. What a pilot cannot see from their cockpit or tactical sensors, they do not know. The Shroud has not thinned—if anything, the cascade continues to generate new debris from its own collisions. Earth is, for the foreseeable future, a closed world. Wars must be fought on the ground, within atmosphere, at ranges where a pilot can engage the enemy directly.

#### 3. Bipedal Superiority Over Tracked Armor
Modern Earth battlefields are jagged, unpaved, and volatile. Tectonic fractures, ruined mega-cities, flooded coastal craters, and mountains of urban debris make standard tracked tanks useless; heavy armored vehicles are easily bottlenecked in ruined canyons or trapped by rubble. 

**Iron Frames**, with their articulated bipedal limbs and vector thrusters, possess unmatched all-terrain mobility. A Frame can climb urban ruins, leap over chasms using Jump Jets, duck behind heavy cover, and pivot dynamically in close-quarters combat. Where a 60-ton tank gets stuck in a trench, a 60-ton Heavy Frame can step over it, leap past it, or use its arms to clear a pathway.

#### 4. The Failure of Air Power (Fuel Scarcity & Fusion Supremacy)
Fighter aircraft seem like the obvious escalation—fast, lethal, hard to stop. In the pre-Cinder era they defined warfare. But the post-Collapse world rendered air power economically and logistically unviable.

The primary bottleneck is **fuel scarcity**. Conventional fighter jets require immense volumes of refined high-density aviation fuels. The Cinder Wars completely exhausted Earth's fossil fuel reserves, and the industrial infrastructure needed to synthesize jet fuels in quantity was destroyed in the early bombings. Launching a single jet sortie consumes a faction's entire monthly stockpile of refined chemical propellant in a matter of minutes.

**Iron Frames**, by contrast, are built around self-contained compact **fusion reactors**. A Frame generates virtually limitless operational energy—fueling its mobility, thrusters, and energy weapons from trace amounts of hydrogen isotopes for months on end without needing a logistical supply train.

Furthermore, aircraft suffer severe operational limits in the post-Cinder environment:
- **Environment & Sensors**: Ruined megacities are shrouded in thermal inversion layers, dense industrial smog, and tectonic dust. Supersonic jets cannot maneuver in tight debris canyons, and long-range high-altitude radar desyncs in particulate clutter. Ground combat relies instead on short-range tactical sensors—Visual (VIS), Thermal/Infrared (IR), and directional Microwave (Radar)—mounted directly on Frames.
- **Inability to Hold Ground**: Air power cannot hold territory. A jet can bomb a bridge or factory, but the Protocol strictly forbids destroying surviving infrastructure. What the Protocol demands is *territorial control*: a force that can stand in a hex, occupy a ruin, guard an asset, and deny it to the enemy.
- **Runway Vulnerability**: Jets require pristine runways and massive maintenance facilities—prime targets in a world of scarce infrastructure. Fusion-powered Frames can be field-maintained, marched overland, or transported by rail and heavy transport barges directly to tactical engagement zones.

#### 5. The Failure of Personal Champions
The simplest alternative—settle disputes with a duel between individual champions—was tried in the early post-Cinder era and collapsed within a generation. A faction's best warrior is a single point of failure: one stray bullet, one bout of illness, one lucky knife in a back alley and the dispute is void, the treaty collapsed, the war re-ignited. More critically, powerful leaders simply refused to risk themselves personally, sending proxies who could always be disavowed. Personal duels offered no *institutional* weight. 

An Iron Frame is different. It represents an enormous capital investment—rare materials, years of fabrication, a trained pilot whose neural datalink takes a decade to calibrate. When a Frame steps onto the Honor Field, a faction has committed its treasury, its engineering corps, and a living pilot to the outcome. The stakes are real and verifiable. Losing a Frame is a wound that takes years to recover from. This is what gives the Protocol its teeth: not honor alone, but the irreplaceable cost of the machine.

#### 6. The Ban on Autonomous Warfare (The Human Core)
Following a catastrophic AI rebellion that nearly annihilated humanity, international treaties strictly outlaw autonomous combat drones and artificial combat intelligences. War must be fought by human pilots, exposing themselves to direct risk. The Iron Frame serves as an extension of the pilot's own body, synchronizing via a neural datalink. War is no longer a matter of automated factory output, but a test of personal discipline, honor, and martial skill.

### Core Tenets of the Protocol
- **Honor in the Arc**: Foe must face foe. Torso twisting represents the deliberate, disciplined adjustment of a pilot's stance to align weapons with the enemy.
- **Mastery of Energy**: An Iron Frame's reactor is the pilot's lifeblood. Distributing energy (EP) between movement, active countermeasures (Chaff, ECM, Smoke), and weapon overcharges is the ultimate test of tactical discipline.
- **Precision Striking**: The Protocol forbids mindless carpet destruction. Pilots target specific locations—systematically degrading armor plates, disabling weapons, burning out thrusters, and blinding sensor suites to neutralize the opponent with precision.
- **The Martial Vows**: Elite pilots swear ancient oaths before entering the Honor Field (such as the *Vow of Courage*, *Vow of Respect*, *Vow of Honor*, or *Vow of Loyalty*). These vows grant martial focus but impose unyielding tactical restrictions—breaking a vow mid-combat dishonors the pilot and severely degrades their Frame's neural performance.

---

## 1. Fundamental Concepts & Game Setup
> *"Victorious warriors win first and then go to war, while defeated warriors go to war first and then seek to win." — Sun Tzu*

Before launching into combat, players must understand the core profile of an Iron Frame, facing conventions, firing arcs, and game setup.

### 1.1 Anatomy of an Iron Frame Profile
Each Iron Frame (IF) is defined by its chassis, reactor, capacitor, and mounted components:
- **Initiative (2–12)**: A static value representing pilot reaction speed and chassis agility. Higher initiative frames shoot first but move last, while lower initiative frames move first but shoot last.
- **Chassis Mass (Tonnage)**: Built on a scale from **20 to 100 Tons** (in 5-ton increments). Tonnage determines the Frame's weight class and its corresponding **Mass Value** used for collision damage:
  - **Light** (20–35 Tons): Mass Value = 1
  - **Medium** (40–55 Tons): Mass Value = 2
  - **Heavy** (60–75 Tons): Mass Value = 3
  - **Assault** (80–100 Tons): Mass Value = 4
- **Reactor Rating**: The number of Energy Points (EP) generated by the Frame at the start of each turn during the Energy Phase.
- **Capacitor Storage (Max EP)**: The maximum amount of unused EP that can be stored in the Capacitor between turns.
- **Flank Speed Threshold**: 4 hexes. If a Frame successfully exits at least 4 hexes during its activation, it gains the **Flanking** state for the remainder of the turn.
- **Movement Limit**: The maximum number of hexes a Frame can enter (via walking, reversing, or jumping) in a single turn. These are the *maximum* values permitted for each weight class (see the Chassis Limits Table in Section 7.2); an individual Frame may be rated lower:
  - **Light**: 7 max
  - **Medium**: 5 max
  - **Heavy**: 4 max
  - **Assault**: 3 max
  *(Pivoting/turning does not count toward the Movement Limit).*
- **Armor Damage Reduction (DR)**: Each of the 6 hit locations (**Head**, **Torso**, **Left Arm**, **Right Arm**, **Left Leg**, and **Right Leg**) has its own Armor DR rating. When a location is hit, its current Armor DR acts as a threshold. If the incoming damage is strictly greater than this DR (penetrates the armor), the location's Armor DR is permanently reduced by 1 and the attacker rolls on the Critical Hit Table for that location.
- **Mounted Hardpoints & Equipment**: Systems and weapons are mounted in specific locations (**Head**, **Torso**, **Left Arm**, **Right Arm**). Mounting locations determine weapon Firing Arcs.

---

### 1.2 The Hex Grid & Facing Conventions
The game is played on a standard hexagonal grid.
- **Distance Scale**: Each hex represents approximately **30 meters** of terrain.
- **Time Scale**: A single combat turn (round) represents approximately **10 seconds** of real-time combat.
- **Facing Conventions**: A Frame possesses two components of facing:
  - **Leg Facing (Movement)**: The direction the legs face, which determines the direction of forward, backward, and diagonal movement.
  - **Torso Facing (Combat)**: The direction the upper body faces. By default, the torso aligns with the leg facing, but a Frame can twist its torso at the end of its activation.
- **Torso Twisting**: At the end of its activation, a Frame's upper body can twist 1 hex side (60 degrees) to the left or right of its current Leg Facing, setting its Torso Facing and Firing Arcs for the upcoming Combat Phase.

![Tactical Hex Grid Map](images/hexgrid.jpg)

---

### 1.3 Firing Arcs & Hit Zones

#### 1. Firing Arcs
Firing arcs are determined relative to the Frame's **Torso Facing**. Weapons are restricted to specific firing arcs based on their mounting location:
- **Forward Arc (Torso Weapons Only)**: The 180-degree wedge directly in front of the Torso (covering 3 hexsides: Front-Left, Front, and Front-Right). Only weapons mounted in the **Torso** may fire into this arc.
- **Left Side Arc (Left Arm Weapons Only)**: The 60-degree wedge covering the direction directly to the left-rear of the Torso (covering 1 hexside: Left-Rear). Only weapons mounted in the **Left Arm** may fire into this arc.
- **Right Side Arc (Right Arm Weapons Only)**: The 60-degree wedge covering the direction directly to the right-rear of the Torso (covering 1 hexside: Right-Rear). Only weapons mounted in the **Right Arm** may fire into this arc.
- **Rear Arc**: The 60-degree wedge directly behind the Torso (covering 1 hexside: Rear). No weapons can be fired into the Rear Arc.

![Firing Arcs Diagram](images/arcs.jpg)

#### 2. Attack Directions & Hit Zones
When a Frame is attacked, the direction of the incoming attack determines the **Hit Zone** relative to the target Frame's **Torso Facing**:
- **Front Hit Zone**: The 180-degree sector directly in front of the target (covering 3 hexes). Uses the Front Hit Location column.
- **Left Side Hit Zone**: The 60-degree sector to the left of the target (covering 1 hex). Uses the Left Side Hit Location column.
- **Right Side Hit Zone**: The 60-degree sector to the right of the target (covering 1 hex). Uses the Right Side Hit Location column.
- **Rear Hit Zone**: The 60-degree sector directly behind the target (covering 1 hex). Uses the Rear Hit Location column.
- **Determining the Hit Zone**: Draw a straight line of sight from the center of the attacker's hex to the center of the target's hex. The sector of the target's Torso that this line passes through determines the Hit Zone.
- **Boundary Hexes (Target's Choice)**: If the line of attack passes exactly along the boundary between two Hit Zones, the defender chooses which of the two adjacent Hit Zones the attack is resolved as.

![Attack Directions & Hit Zones Diagram](images/zones.jpg)

---

### 1.4 Scenario Setup & Deployment
To begin a game of *Iron Protocol*, players complete the following setup steps:
1. **Agree on Force Limit**: Players select a Deployment Point budget (e.g. 435 pts for introductory 1v1, 1000 pts for 2v2 Element combat, 1500 pts for 3v3–4v4 Platoon battles).
2. **Select Frames & Pilots**: Players choose pre-built technical readouts from the **Iron Frame Roster (Section 8)** or construct custom frames using Section 7.2.
3. **Determine Point Bid & Advantage Player**: The player who brings a lower total force point cost (leaving an intentional point gap, commonly referred to as a **"Point Bid"**) wins the **Tactical Advantage** and chooses who is designated the **Advantage Player** for the match. If total force points are tied, players roll 2d6; the winner chooses the Advantage Player.
4. **Map Setup & Unit Deployment**: Lay out hex map tiles. The Advantage Player chooses their home map edge. Players alternate deploying 1 Frame at a time within 2 hexes of their designated home map edge.
5. **Pre-Combat System Activation**: At the moment of deployment, Frames equipped with **AMC** (Active Metamaterial Coating) or **ECM** (Electronic Countermeasures) may deploy with those systems **Active**. Upkeep costs (2 EP for AMC, 1 EP for ECM) are automatically deducted during the Round 1 Energy Phase.

#### 1.4.1 Introductory Scenario: Trial by Fire (1v1 Duel)
Recommended for first-time players learning the *Iron Protocol* rules engine.

- **Point Budget**: 435 Points per player.
- **Recommended Matchup — Vanguard Mirror**: Both players field an **IF-55M-1 "Vanguard"** (445 pts). A mirror match is the clearest way to learn the engine: with identical Frames, every difference in the outcome comes from pilot decisions rather than from the matchup. It teaches the three things that decide games — banking EP for Overcharges, maneuvering to gain the Flanking state, and choosing between a Single Burst and Full Auto — without any asymmetry to untangle at the same time.
- **Second Game — Vanguard vs. Specter**: Once both players are comfortable, field the **IF-55M-1 "Vanguard"** (445 pts) against the **IF-45M-1 "Specter"** (435 pts). This is a deliberately asymmetric matchup and it rewards knowing the Specter's line:
  - The Specter cannot win a straight damage race. Its Laser cannot penetrate the Vanguard's Torso armor while the Vanguard is moving, and its Disruptor Cannon deals no damage at all.
  - Instead, the Specter fights to **strip armor and then convert**. A Disruptor hit on any limb or the Head forces a Critical, and a result of 4 (*Structural Fracture*) reduces that location's Armor DR to **0**. Every subsequent Laser shot that lands there does full damage.
  - The Specter's protection is **terrain, not its coating**. AMC cloaks one spectrum for 2 EP, which does not stop Microwave (Radar) — and cloaking a second spectrum costs an Overcharge that leaves the AMC offline entirely the following round. Buildings and Heavy Woods are what actually break a lock.
  - The Vanguard, in turn, wins by forcing the exchange early, before its armor is opened up.
- **Map Size**: 16 x 16 Hexes.
- **Terrain**: 
  - 1 Central Level 1 Hill (Elevation movement & LOS testing)
  - 2 Patches of Light Woods (+1 Cover Reroll)
  - 2 Urban Building Hexes (Level 2 height, solid LOS blockage)
  - 1 Shallow Water Hex (+1 EP Reactor Cooling)
- **Deployment**: Opposing map edges (12 hexes apart).
- **Victory Condition**: Destroy the opposing Iron Frame (destroy the Head, Torso, or both Legs via Critical Hits) or force its surrender.

---

## 2. Turn Sequence
> *"A good plan violently executed now is better than a perfect plan executed next week." — George S. Patton*

Each round of play is divided into four distinct phases:
1. **Energy Phase**: Generate energy and allocate stealth/system upkeep.
2. **Activation Phase**: Move Frames and spend EP on movement in **reverse initiative order** (lowest initiative first).
3. **Combat Phase**: Declare and resolve attacks in **initiative order** (highest initiative first).
4. **End Phase**: Store unused energy, dissipate temporary effects, and clean up the board.

### 2.1 Energy Phase
At the start of the turn, players perform the following steps:
1. **Energy Generation**: Every Frame generates EP equal to its Reactor Rating. This is added to any EP currently stored in the Capacitor.
2. **Stealth & System Upkeep**: Players allocate EP to maintain active stealth or ECM systems (e.g., Active Metamaterial Coating, ECM). This EP is immediately deducted from the available pool. Any remaining EP is carried over to be spent dynamically on movement and combat.

### 2.2 Activation Phase (Reverse Initiative Order)
Frames activate one at a time, beginning with the **lowest Initiative** value and counting up.
- **Initiative Tie-Breakers (Activation)**: If opposing Frames share the same Initiative value, the **Advantage Player** (determined during setup via Point Bid or die roll) decides which of the tied Frames activates first (choosing to activate their own unit first or forcing the opponent's tied unit to activate first).
- **Dynamic Movement Execution**: When a Frame activates, the player decides how to move it on the fly, spending EP from their current energy pool step-by-step. This allows players to react directly to the movements of previously activated (lower-initiative) frames.
- **Movement Limit**: A Frame cannot enter more hexes during its activation than its stat sheet **Movement Limit**. Changing Leg Facing (pivoting) does not count as entering a hex and is not restricted by this limit.
  - **Forward Walk (W)**: Move 1 hex forward. Cost: 1 EP.
  - **Reverse (R)**: Move 1 hex backward without changing facing. Cost: 2 EP.
  - **Pivot/Turn (TL/TR)**: Change facing by 60 degrees (one hexside) left or right. Cost: 1 EP.
  - **Jump Jet (J)**: Only available to **Light** and **Medium** weight classes (20–55 Tons). Heavy and Assault Frames cannot be equipped with Jump Jets and cannot jump.
    - *Cost*: 2 EP per hex.
    - *Movement*: The Frame jumps in a straight line to a hex within its maximum jump distance (default maximum of 4 hexes). It bypasses all intervening terrain, obstacles, and other Frames.
    - *Landing Mechanics*:
      - **Clear & Paved Landing**: Landing in a Clear or Paved hex is an **automatic clean landing**. Set Leg Facing for free.
      - **Hazardous & Feature Landing**: Landing in **Rough, Deep Water, Building Roofs, Light Woods, or Heavy Woods** requires a **Pilot Check (TN 6+)** upon touchdown:
        **Landing Check = 2d6 vs TN 6+**
        - *Success (6+)*: Clean landing! Set Leg Facing for free.
        - *Failure (< 6)*: The Frame stumbles and falls **Prone** in the landing hex. (If landing in Heavy Woods, the canopy impact also inflicts **1 point of Armor DR degradation** to the Torso).
      - **Kinetic Drop Strike**: Alternatively, a pilot may target an occupied hex to perform a Kinetic Drop Strike.
      - **Drop Strike Damage**: Both Frames suffer a flat amount of damage:
        **Drop Strike Damage = Jumping Frame's Mass Value x Hexes Jumped**
        - The target Frame suffers the full flat damage.
        - The jumping Frame suffers half the flat damage (rounded up).
        - Roll a 1d6 Hit Location for both the target and the jumper to determine where the damage lands.
        - Both damage hits test against the respective location's Armor DR normally. Flanking does not apply to Drop Strike damage.
      - **Displacement**: After damage is resolved, the target's player (the defender) slides the jumping Frame into any unoccupied adjacent hex of their choice. If no adjacent hex is unoccupied, the jumping Frame falls Prone, taking an additional 2d6 damage to its Legs, and is placed in the nearest unoccupied hex (see Section 6.3).
    - *Evasion*: Due to the high velocity and ballistic trajectory of flight, jumping always grants the **Flanking** state upon landing.
- **Collisions & Blocking**: If a Frame's movement path would enter a hex occupied by another Frame, a collision occurs. The moving Frame immediately stops in the last unoccupied hex, its activation ends, and both frames suffer damage.
  - **Collision Damage**: Both the moving Frame and the stationary target Frame suffer damage to a random location determined by rolling on the Hit Location Table individually. Flanking does **not** allow rerolls against collision damage, as the impact is physical and unavoidable. **Armor DR is tested normally** against each hit, and a penetrating collision degrades that location's Armor DR by 1 and triggers a Critical Hit roll, exactly as a weapon hit would.
  - **Deliberate Ramming**: A pilot may intentionally drive into an occupied hex. Note that the flat damage is derived from the *moving* Frame's Mass Value, and **both Frames suffer that exact same flat damage** — a light Frame that rams a heavy one will almost always come off worse.
  - **Damage Calculation**: The collision inflicts a flat amount of damage based on the moving Frame's **Mass Value** (Light = 1, Medium = 2, Heavy = 3, Assault = 4) multiplied by its speed (the number of hexes moved in the current activation before impact):
    **Collision Damage = Mass Value x Speed**
  - **Pilot Check**: After resolving collision damage, both Frames must check if they fall Prone (see Section 6.3).
- **Flanking State**: If a Frame successfully exits **4 or more hexes** during its activation *(changing facing/pivoting does not exit a hex)*, it gains the **Flanking** state. This represents the difficulty of targeting a fast-moving frame. 
- **Torso Twist**: At the very end of its activation (after all movement is completed), the Frame may perform a free Torso Twist. The player can rotate the upper body of the Frame 1 hex side (60 degrees) to the left or right of its current Leg Facing, or reset it to align with the Leg Facing. This sets the Frame's Torso Facing (and Firing Arcs) for the upcoming Combat Phase. The torso remains in this position until the Frame activates in the next turn's Activation Phase.

#### 2.2.1 Movement Examples
- **Example 1 (Tactical Maneuvering)**: An IF-55M-1 "Vanguard" (Reactor 12) starts its activation on Level 0 with a full energy pool of 12 EP. 
  1. It performs a **Forward Walk** (1 EP) into an adjacent Level 1 Clear hex. (Cost: 1 EP + 1 EP climbing cost = 2 EP total).
  2. It performs a **Pivot/Turn** (1 EP) to rotate its Leg Facing 60 degrees left.
  3. It performs a **Forward Walk** (1 EP) into a Light Woods hex on Level 1. (Cost: 1 EP + 1 EP woods entry cost = 2 EP total).
  4. It performs a second **Forward Walk** (1 EP) through the woods on Level 1. (Cost: 1 EP + 1 EP woods entry cost = 2 EP total).
  5. It performs a third **Forward Walk** (1 EP) out of the woods into a Level 1 Clear hex. (Cost: 1 EP).
  - *EP Expenditure*: 2 + 1 + 2 + 2 + 1 = 8 EP. The Vanguard has 4 EP remaining in its pool to spend on active systems or firing weapons during the Combat Phase.
  - *Evasion*: It exited 4 hexes during its movement. Since it met the 4-hex threshold, it successfully gained the **Flanking** state.
  - *Final Step*: The pilot performs a free **Torso Twist** 60 degrees right to point its torso-mounted guided missiles toward the target's expected location.

- **Example 2 (Jump Jet Cliff-Jumping)**: An IF-45M-1 "Specter" (Reactor 9, Capacitor 3, total 12 EP available) starts its activation at the base of a steep Level 2 cliff (Level 0 hex adjacent to a Level 2 hex).
  1. It declares a **Jump Jet** maneuver targeting an unoccupied Level 2 hex 3 spaces away, directly on top of the cliff (bypassing the steep height difference which blocks standard walking).
  - *EP Expenditure*: 3 hexes jumped × 2 EP = 6 EP. 
  - *Evasion*: Jumping always grants the **Flanking** state.
  - *Landing*: Upon landing, the pilot sets the Specter's Leg Facing toward the enemy's rear quadrant for free.
  - *Final Step*: The pilot leaves the torso aligned forward to keep its arm-mounted Disruptor Cannon pointed at the target. The Specter has 6 EP remaining to fire its weapons in the Combat Phase.

- **Example 3 (Water Cooling & Urban Cover)**: An IF-25L-1 "Jackal" (Base Reactor 8) starts its turn standing in a Shallow Water hex.
  1. **Energy Phase**: The water submerged legs cool the reactor, generating **+1 extra EP** (total energy pool = 9 EP).
  2. **Activation Phase**: The Jackal performs 2 **Forward Walks** (2 EP) out of the water into a Paved street hex.
  3. It performs a **Pivot** (1 EP) and a **Forward Walk** (1 EP) into a hex adjacent to a Level 2 **Urban Building**.
  - *EP Expenditure*: 2 + 1 + 1 = 4 EP. The Jackal has 5 EP remaining to fire its Autocannon or Laser.
  - *Defensive Status*: The Jackal moved 3 total hexes. Since the threshold is 4 hexes, it does *not* gain the Flanking state. However, positioned adjacent to the building, it gains **Heavy Cover** against incoming attacks crossing the building's hexside, forcing attackers to reroll up to 2 damage dice.

### 2.3 Combat Phase (Initiative Order)
Frames attack in order of **highest Initiative** to **lowest Initiative**.
- **Initiative Tie-Breakers (Combat)**: If opposing Frames share the same Initiative value, the **Advantage Player** decides which of the tied Frames declares and resolves its attack first (choosing to fire with their own unit first or allowing the opponent's tied unit to declare its attack first).
- **Instant Resolution**: Unlike some tabletop games, damage is resolved *instantly*. If a high-initiative Frame destroys or disables a weapon on a lower-initiative Frame, that lower-initiative Frame cannot use that weapon when its turn to fire comes.
- **One Attack Per Weapon**: Each mounted weapon may be fired **once per Combat Phase**, regardless of how much EP remains. A Frame with several weapons may fire each of them once, in any order it chooses. *(This is what gives Full Auto its purpose: a pilot who wants to put more rounds downrange must concentrate them into a single attack against a single hit location, rather than spreading them across several.)*
- **Attack Sequence**:
  1. **Select Weapon & Pay EP Cost**: Deduct the weapon's EP cost from the Frame's current pool. *(Note: If a Frame's EP pool was drained by an earlier attack and it can no longer afford a weapon's EP cost, it cannot fire that weapon this turn).*
  2. **Verify Line of Sight (LOS) and Arc**: The target must be within the weapon's firing arc (determined by the Torso Facing set at the end of the Activation Phase) and have clear LOS (unless using a weapon that permits indirect fire).
  3. **Verify Sensor Detection & Lock**: The target must be detected on a spectrum compatible with the weapon (Visual [VIS], Infrared [IR], or Microwave [Radar]). If the target is undetected on that spectrum, the attack cannot be declared.
  4. **Determine Hit Location**: Roll 2d6 on the **Hit Location Table**.
  5. **Roll Damage**: Roll the weapon's damage dice.
  6. **Apply Flanking & Cover (Rerolls)**: If the target is **Flanking**, the defender chooses one of the attacker's damage dice and forces a reroll. If the target is in **Cover**, the defender forces additional rerolls (1 for Light Cover, 2 for Heavy Cover). The attacker must accept the final results.
  7. **Apply Armor DR**: Compare the final damage total to the target location's current Armor DR.
  8. **Resolve Damage & Armor Degradation**: 
     - If the total damage is **strictly greater** than the Armor DR, the armor is penetrated. The Armor DR of that location is permanently **reduced by 1** (to a minimum of 0).
     - If the total damage is **equal to or less than** the Armor DR, the armor successfully blocks the hit. The location suffers no damage, and its Armor DR does not degrade.
  9. **Cascading Criticals**: If the armor is penetrated, roll 1d6 on the **Critical Hit Table** for that location and mark the slot. If the slot is already marked, cascade upward to the next unmarked slot.
     - **Overkill Margin**: For every **5 points** of damage that exceeds the Armor DR, the attacker rolls an additional 1d6 on the Critical Hit Table (e.g., if total damage is 16 and Armor DR is 5, the excess damage is 11. The attacker rolls the base 1d6, plus 2 extra d6s, applying 3 Critical Hits total).

#### 2.3.1 Combat Examples
- **Example 1 (Direct Laser Fire & Critical Hit)**: During the Combat Phase, the IF-90A-1 "Colossus" (Initiative 3) resolves its attack against the IF-55M-1 "Vanguard" (Initiative 6).
  1. **Weapon Selection**: The Colossus pilot spends 4 EP to fire the **Thermal Lance** mounted on its Left Arm.
  2. **Verify Arc and LOS**: The Vanguard is located within the Colossus's Left Side Arc (Left Arm mount). Line of Sight is clear of blocking terrain.
  3. **Verify Lock**: The Colossus has a Visual (VIS) lock on the Vanguard.
  4. **Hit Location**: The Colossus rolls 2d6 on the Hit Location Table. The attack came from the Front Hit Zone, so the Front/Rear column is used. The roll is a 7, indicating a **Torso** hit.
  5. **Roll Damage**: The Colossus rolls 3d6 for the Thermal Lance: rolls a 5, 4, 3 (Total 12).
  6. **Apply Flanking & Cover**: The Vanguard has the **Flanking** state (having met the 4-hex threshold). The Vanguard's pilot forces the Colossus to reroll the highest die (the 5). The new roll is a 2. The new damage total is 2, 4, 3 (Total 9).
  7. **Apply Armor DR**: The Vanguard's Torso currently has an Armor DR of 5. The total damage (9) is strictly greater than 5, so the armor is penetrated.
  8. **Resolve Degradation**: The Vanguard's Torso Armor DR is permanently **reduced by 1** (from 5 to 4).
  9. **Roll Cascading Critical**: Because the armor was penetrated, the Colossus rolls 1d6 on the Torso Critical Hit Table. It rolls a 3, indicating **Reactor Damage** (the Vanguard's reactor output is permanently reduced by 2 EP per turn). The Vanguard marks the '3' slot on its Torso table.

### 2.4 End Phase
- **Energy Storage**: Unused EP is moved to the Capacitor, up to the Capacitor Max. Any excess EP is vented and lost.
- **Clean Up**: Remove Flanking status from all Frames, and decrement cooldown tokens on weapons.
- **Smoke Dissipation**: For each active Smoke token on the board, roll 1d6. On a roll of 1 or 2, the smoke dissipates; remove the token.

---

## 3. Terrain & Elevation
> *"The terrain is the foundation of victory. Know the ground, know the weather; your victory will then be total." — Sun Tzu*

Combat under the Iron Protocol occurs across diverse Earth battlefields and containment sectors. The map's hexes are classified by terrain type, which alters movement costs, provides cover, or impacts pilot checks.

### 3.1 Summary of Terrain Types

| Terrain Type | Extra EP Cost | Defensive Cover | Special Rules |
| :--- | :---: | :--- | :--- |
| **Clear** | +0 EP | None | Standard terrain. |
| **Paved** | +0 EP | None | High traction surface. **+1 bonus** to all Pilot Checks. |
| **Rough** | +1 EP | None | Uneven footing. **-1 penalty** to all Pilot Checks. |
| **Water (Shallow)** | +1 EP | None | Knee-deep liquid. Cannot gain **Flanking** state. Generates **+1 EP** in Energy Phase. |
| **Water (Deep)** | +2 EP | None | Waist-deep liquid. Cannot gain **Flanking** state. **-1 penalty** to Pilot Checks. Generates **+2 EP** in Energy Phase. |
| **Woods (Light)** | +1 EP | Light Cover (1 Reroll) | Sparse trees. Blocks VIS locks if 2+ hexes intervene. |
| **Woods (Heavy)** | +2 EP | Heavy Cover (2 Rerolls) | Dense forest. Blocks VIS and IR locks if 2+ hexes. **Impassable to Heavy/Assault Frames on foot.** |
| **Urban (Building)** | Impassable (Ground) | Solid Barrier | Structures block all locks (VIS/IR/Radar) up to height. Heavy Cover (2 Rerolls) if adjacent. Roofs (Level 2) can only be reached by **Jump Jets**, and count as their own hex at that elevation. |

---

### 3.2 Movement & Elevation Rules
The battlefield is three-dimensional, divided into vertical **Levels** (Level 0 is default ground level; each level = **6 meters**). All Iron Frames are **2 levels tall** (12 meters), occupying vertical space from Level X to Level X + 2.

#### Chassis Bulk & Forest Restrictions
Due to their immense physical scale and bulk:
- **Light (20–35T)** and **Medium (40–55T)** Frames may maneuver through Heavy Woods normally (+2 EP entry cost).
- **Heavy (60–75T)** and **Assault (80–100T)** Frames **cannot walk or reverse into Heavy Woods hexes** on foot. *(Exception: Heavy and Assault Frames equipped with Jump Jets may jump over or overtop Heavy Woods hexes).*

#### Elevation Movement Table

| Elevation Change | EP Cost | Movement & Fall Rules |
| :--- | :---: | :--- |
| **Same Level (0)** | Base Terrain Cost | Standard movement. |
| **Climbing Up (+1 Level)** | Terrain Cost + **1 EP** | Step up onto 1 level higher terrain. |
| **Climbing Down (-1 Level)** | Base Terrain Cost | Step down onto 1 level lower terrain (+0 extra EP). |
| **Steep Cliff (≥ 2 Levels)** | Impassable on foot | Cannot walk or reverse. Must use **Jump Jets** to traverse. |
| **Forced Fall (≥ 2 Levels)** | — | Frame falls **Prone** on landing. Takes **1d6 damage per level fell** to a random location. |

#### Jump Jet Terrain Landing Table

| Landing Location | Pilot Check (TN 6+)? | Failure Effect (< 6) |
| :--- | :---: | :--- |
| **Clear / Paved** | **No** (Automatic) | Clean landing. |
| **Rough Terrain** | **Yes** | Falls **Prone** in landing hex. |
| **Water (Deep)** | **Yes** | Falls **Prone** in water. |
| **Building Roof** | **Yes** | Falls **Prone** on roof. |
| **Light Woods** | **Yes** | Falls **Prone** in canopy. |
| **Heavy Woods** *(Light/Med only)* | **Yes** | Falls **Prone** + 1 Torso Armor DR loss. |

---

### 3.3 Hard Cover vs. Concealment (Sensors & Locks)

Understanding the distinction between **Hard Cover** (which reduces damage when targeted) and **Concealment** (which prevents sensor locks entirely) is vital to tactical survival.

#### 1. Hard Cover (Defensive Damage Reduction)
Hard cover represents physical obstacles that absorb kinetic energy or diffuse beam weapons when a Frame is targeted:
- **Light Cover (1 Reroll)**: Standing in **Light Woods** allows the defending player to choose one of the attacker's damage dice and force a reroll.
- **Heavy Cover (2 Rerolls)**: Standing in **Heavy Woods** or standing **adjacent to an Urban Building** (when Line of Sight crosses the building's hexside) allows the defending player to choose up to two of the attacker's damage dice and force them to reroll. *(Note: Cover rerolls and Flanking rerolls stack. A Flanking Frame in Heavy Cover forces 3 total rerolls).*

#### 2. Concealment & Sensor Lock Blockage (Spectrum Matrix)
If an intervening terrain feature blocks Line of Sight on a specific sensor spectrum, a Frame **cannot declare an attack** using a weapon that requires that spectrum.

| Intervening Terrain Feature | Visual (VIS) Lock | Infrared (IR) Lock | Microwave (Radar) Lock |
| :--- | :---: | :---: | :---: |
| **Light Woods (1 hex)** | Clear | Clear | Clear |
| **Light Woods (2+ hexes)** | **BLOCKED** | Clear | Clear |
| **Heavy Woods (1 hex)** | Clear | Clear | Clear |
| **Heavy Woods (2+ hexes)** | **BLOCKED** | **BLOCKED** | Clear |
| **Urban Building (Any)** | **BLOCKED** | **BLOCKED** | **BLOCKED** |
| **Smoke Template** | **BLOCKED** | Clear | Clear |
| **Elevation / Hill (≥ Top Height)** | **BLOCKED** | **BLOCKED** | **BLOCKED** |

#### Summary of Foliage & Vegetation Blockage:
- **Light Woods**: Requires **2 or more intervening hexes** to block Visual (VIS) locks. Does not block IR or Radar.
- **Heavy Woods**: Requires **2 or more intervening hexes** to block both Visual (VIS) and Infrared (IR) locks. Does not block Radar.

---

### 3.4 Line of Sight (LOS) & Elevation Height Math

Line of Sight (LOS) between an Attacker (standing on Level A, top height A+2) and a Target (standing on Level B, top height B+2) is checked against all intervening hexes.

#### 1. Terrain & Elevation LOS Formula
An intervening hex of elevation level Y or building height Y blocks **all** sensor locks (VIS, IR, Radar) if:
> **LOS Blocked if Y ≥ min(A + 2, B + 2)**
*(Example: Two Frames on Level 0 [top height 2] can see over a Level 1 hill [height 1]. A Level 2 hill [height 2] blocks Line of Sight completely).*

#### 2. Vegetation Canopy Height (Visual LOS Only)
Trees have vertical foliage that adds to ground level for **Visual (VIS)** LOS only. IR and Radar sensors ignore canopy height:
- **Light Woods Canopy**: Adds **+1 Level** of Visual obstruction height (e.g., Level 0 Light Woods = VIS height 1).
- **Heavy Woods Canopy**: Adds **+2 Levels** of Visual obstruction height (e.g., Level 0 Heavy Woods = VIS height 2).

---

### 3.5 Pilot Checks & Water Cooling

#### 1. Terrain Pilot Check Adjustments
Apply the standing hex's terrain modifier to all **Pilot Check** rolls (collision recovery, Drop Strike landing):
- **Paved**: **+1 bonus** to Pilot Checks (high traction).
- **Rough**: **-1 penalty** to Pilot Checks (uneven footing).
- **Water (Deep)**: **-1 penalty** to Pilot Checks (water drag).

#### 2. Environmental Cooling (Water)
Standing in liquid provides passive cooling to an Iron Frame's reactor during the **Energy Phase**:
- **Water (Shallow)**: Generates **+1 extra EP** during the Energy Phase. The Frame cannot gain the **Flanking** state while in shallow water.
- **Water (Deep)**: Generates **+2 extra EP** during the Energy Phase (extreme submerged cooling). Entry costs **+2 EP**, the Frame cannot gain the **Flanking** state, and Pilot Checks take a **-1 penalty**.

---

## 4. Sensors, Stealth, and Detection
> *"All warfare is based on deception." — Sun Tzu*

Because attacks hit automatically if targeted, the tactical battle is won or lost in the **Sensor & Detection** game. A Frame cannot be attacked unless it is detected on at least one sensor spectrum required by the weapon.

### 4.1 The Sensor Suite (Head Location)
Every Frame has a sensor suite consisting of three bands, housed in the Head location, arranged here in order of increasing electromagnetic wavelength:
1. **Visual (VIS)**: Shortest wavelength (approx. 380–700 nm). Housed in high-resolution optical cameras.
   - *Requires*: Direct Line of Sight (blocked by Elevation normally). To lock a target hidden behind solid Elevation, a Frame must receive telemetry via a **Tactical Datalink** from a friendly spotter with clear VIS LOS.
   - *Blocked by*: Smoke templates, heavy forests, or Visual-Camouflage (VIS) AMC.
2. **Infrared (IR)**: Medium wavelength (approx. 700 nm–1 mm). Thermal sensors detecting heat signatures.
   - *Requires*: Direct Line of Sight (blocked by Elevation normally), but entirely ignores Woods and Smoke penalties. To lock a target hidden behind solid Elevation, a Frame must receive telemetry via a **Tactical Datalink** from a friendly spotter with clear IR LOS.
   - *Sensitivity*: Targets become visible and targetable on IR for the remainder of the turn the moment they spend their **5th EP** of the turn (cumulatively across the Energy, Activation, or Combat phases). *This includes EP spent on stealth upkeep during the Energy Phase — a Frame cloaking two spectrums with AMC has already burned 4 of its 5 EP of thermal budget before it has taken a single step. Running cold is a deliberate, expensive choice.*
   - *Blocked by*: Flares or Infrared-Suppression (IR) AMC.
3. **Microwave (Radar)**: Longest wavelength (approx. 1 mm–1 m). Active microwave radio detection.
   - *Requires*: Direct Line of Sight (blocked by Elevation normally), but entirely ignores Woods and Smoke penalties. To lock a target hidden behind solid Elevation, a Frame must receive telemetry via a **Tactical Datalink** from a friendly spotter with clear Radar LOS.
   - *Blocked by*: Chaff, Active ECM, Microwave-Absorbent (Radar) AMC, or solid Elevation (Hills/Mountains).

### 4.2 Stealth & Defensive Countermeasures
Frames can run active systems to deny locks and hide from sensors:
- **Electronic Countermeasures (ECM)**: Costs **1 EP** to activate in the Energy Phase. Blocks Microwave (Radar) detection and locks on the host Frame (0-hex radius). **Overcharge** [+1 EP per +1 hex radius]. All friendly Frames within the active radius are protected. *(Note: Overcharging triggers the mandatory 1-Turn Cooldown on the ECM suite).*
- **Flares**: (Ammo Die: 1d6). Activating the launcher completely negates a single incoming attack, but only when **all** of the following are true:
  - The attacker resolved the attack using an **Infrared (IR) lock**. (If the attacker holds multiple lock types, they may hot-swap to an un-negated lock, such as Visual or Radar, to bypass the flare. A defender may launch both Flares and Chaff simultaneously against the same attack to strip multiple lock types).
  - Flares are launched **before** the Hit Location roll.
  After launching Flares, roll the Ammo Die (1d6). On a 1, the launcher is empty for the rest of the battle.
- **Chaff Dispensers**: (Ammo Die: 1d6). Activating the dispenser completely negates a single incoming attack, but only when **all** of the following are true:
  - The attacker resolved the attack using a **Microwave (Radar) lock**. (If the attacker holds multiple lock types, they may hot-swap to an un-negated lock, such as Visual or IR, to bypass the chaff. A defender may launch both Flares and Chaff simultaneously against the same attack to strip multiple lock types).
  - Chaff is launched **before** the Hit Location roll.
  After launching Chaff, roll the Ammo Die (1d6). On a 1, the dispenser is empty for the rest of the battle.
- **Smoke Launchers**: (Ammo Die: 1d6). During the Activation Phase, a Frame may spend 1 EP to deploy a Smoke cloud in its current hex, or any of the 6 surrounding adjacent hexes (place a Smoke token). The smoke template blocks Visual (VIS) LOS and Visual locks through that hex for as long as it remains on the board. Infrared (IR) and Microwave (Radar) sensors are unaffected and can scan through smoke unimpeded. After launching Smoke, roll the Ammo Die (1d6). On a 1, the launcher is empty for the rest of the battle.
- **Active Metamaterial Coating (AMC)**: Costs **2 EP** to activate in the Energy Phase. The Frame tunes its coating to absorb **one** sensor spectrum (Microwave, IR, or VIS), preventing it from being detected or locked on that spectrum. **Overcharge**: [+2 EP to cloak a 2nd spectrum simultaneously]. *(Note: Overcharging triggers the mandatory 1-Turn Cooldown, meaning the AMC will be completely offline during the following round, leaving the Frame fully exposed on all spectrums).*
- **Pre-Combat System Deployment**: At the start of a battle (during Deployment), Frames equipped with **AMC** or **ECM** may choose to deploy with those systems **Active**. The system's base upkeep cost (2 EP for AMC, 1 EP for ECM) is automatically deducted from the Frame's generated energy pool during the Round 1 Energy Phase.

### 4.3 Tactical Datalink (Head Location)
A Frame may be equipped with a **Tactical Datalink** housed in its Head location.
- **Shared Targeting Data**: If two or more friendly Frames on a team are equipped with active Tactical Datalinks, they share sensor data in real time. If a target is detected or locked on any sensor spectrum (Visual, Infrared, or Microwave) by *one* of the datalinked Frames, it is instantly considered detected/locked on that spectrum for *all* other active datalinked Frames on the team.
- **Critical Failure**: If a Frame suffers a **Comm Static** critical hit to its Head (Sensors) location, or is affected by an EMP warhead, its Tactical Datalink is disabled for the rest of the battle (or until the EMP effect clears), immediately severing that Frame from the shared sensor network.

---

## 5. Weapons & Munitions
> *"God is on the side with the best artillery." — Napoleon Bonaparte*

Weapons can only be mounted in the Left Arm, Right Arm, or Torso, which dictates their firing arcs (see Section 1.1). A hardpoint may mount a weapon or system of its size class or any smaller size class (e.g., a Heavy Hardpoint may mount a Heavy, Medium, or Light weapon).

- **Armor Piercing (AP X)**: Weapons or munitions designated as **AP X** ignore up to **X** points of the target's Armor DR when calculating damage. (For example, an AP 3 weapon fired at a location with Armor DR 5 treats that location's DR as 2).

- **Area of Effect (AoE)**: Damage designated as **AoE** (such as Missile Cluster and Splash damage) blankets a wide area and completely bypasses Flanking and Cover. A target attacked by an AoE weapon cannot force the attacker to reroll any damage dice, even if Flanking or in Heavy Cover. Armor DR still applies normally.

- **Rapid Fire**: Weapons with this trait saturate the target with high-velocity munitions, ignoring minor evasive maneuvers. When firing a Rapid Fire weapon, the attack completely bypasses the **Flanking** state (the target cannot force rerolls due to movement). However, terrain **Cover** still applies normally. Rapid Fire weapons can be fired in two modes:
  - **Single Burst (Base EP Cost)**: Roll 1 Hit Location. Roll the weapon's burst damage dice (e.g., 3x 1d6) and test each die against the target location's Armor DR separately. 
  - **Full Auto (X × Base EP)**: Pay the base EP cost for each burst fired (up to 3 maximum). Roll 1 Hit Location. Roll the damage dice for *all* bursts combined against that location, testing each separately. Because this burns through ammunition at an incredible rate, the weapon's Ammo Die runs dry on a roll of **1, 2, or 3** (instead of just 1).

| Weapon | HP | EP Cost | Ammo Die | Cooldown | Damage | Detection | Traits | Special Rules |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **Autocannon** | Light | 1/burst | 1d6 (Explosive) | None | 3x 1d6 (Burst) | Any | Rapid Fire | Fires 3-round bursts. Each 1d6 resolved separately. Can fire Full Auto. |
| **Laser** | Light | 2 | Infinite | None | 2d6 | Any | Overcharge | **Overcharge**: [+1/+2 EP for +2/+4 flat damage]. |
| **Guided Missiles** | Medium | 2 | 1d6 (Explosive) | None | Warhead Dep. | Guidance Dep. | AoE | Requires Lock. Permits indirect fire (no LOS). Cannot be reloaded if Ammo Die fails. |
| **Disruptor Cannon** | Medium | 3 | Infinite | None | None | Any | Overcharge | Deals no damage (naturally bypasses Flanking, Cover, and Armor DR). See hit effects. **Overcharge**: [+2 EP to force Crit AND drain 1d6 EP simultaneously]. |
| **Thermal Lance** | Heavy | 4 | Infinite | None | 3d6 | Any | Overcharge | **Overcharge**: [+2/+4 EP for +3/+6 flat damage]. |
| **Rail Gun** | Heavy | 0 (+6) | Infinite (Inert) | 1 Turn | 3d6 + 10 | Any | AP 3, Overcharge | Inert slugs. **Requires Overcharge to fire**: [+6 EP, which must come from the Capacitor]. Because firing always involves an Overcharge, the Rail Gun always enters a 1-Turn Cooldown. |

### 5.0 Weapon Resolution Notes

#### The Ammo Die (Depletion Roll)
Instead of tracking individual bullets or missiles, *Iron Protocol* uses a Usage Die mechanic called the **Ammo Die**. 
Whenever a Frame resolves an attack using a weapon that lists an Ammo Die (such as the Autocannon or Guided Missiles), the attacker rolls the specified die (usually 1d6) immediately after the attack resolves. 
- **Roll 2+**: Plenty of ammo remaining.
- **Roll 1 (Depletion)**: The weapon's feed runs dry or jams. The weapon is forced into a **1-Turn Cooldown** while the auto-loader cycles a new magazine. It cannot be fired on the next turn. 
- **Guided Missiles**: Because missile pods cannot be reloaded in the field, rolling a 1 on a Missile rack's Ammo Die means the weapon is **Empty** for the remainder of the battle.

Several weapons resolve differently from the standard damage sequence. Their full behavior is given here rather than only on the frame sheets.

#### Disruptor Cannon Hit Effects
The Disruptor Cannon deals **no damage**. It fires a directed-energy pulse that naturally bypasses Flanking, Cover, and Armor DR entirely, and its effect depends on the location rolled on the Hit Location Table:
- **Torso hit (a rolled result of Torso)**: The pulse floods the Frame's power bus. The target immediately **loses 1d6 EP** from its current energy pool (to a minimum of 0).
- **Any other location (Head, Arm, or Leg)**: The pulse burns out the local actuator cluster. Roll **1d6 immediately on that location's Critical Hit Table** and apply the result. This critical occurs even though the location's Internal Structure took no damage.
- **Overcharge [+2 EP]**: Resolve **both** effects — drain 1d6 EP *and* force a Critical Hit on the location rolled.

Because the Disruptor ignores Armor DR, it never degrades armor and never reduces Internal Structure. It cannot, by itself, destroy a Frame except through a Critical Hit result that does so.

#### Rapid Fire and Armor Degradation
When a Rapid Fire weapon is fired:
- **Every damage die is tested against the Armor DR the location had when the attack was declared.** Do not re-apply degradation between dice of the same attack.
- **The attack degrades that location's Armor DR by 1 in total** if *any* die penetrated, no matter how many got through. A burst is a single penetration event.
- **Roll one Cascading Critical for the attack** if any damage die penetrated the armor, not one per die.

#### Full Auto Limit
A single Full Auto attack may fire a **maximum of 3 Bursts**. Firing more than one Burst still rolls a single Hit Location for the whole barrage.

#### Prone Damage Penalty
The Prone state's **-1d6 penalty** removes one die from the weapon's damage pool, to a minimum of 1d6:
- **Dice-plus-flat weapons** (e.g. Rail Gun 3d6 + 10) lose one die but keep the flat bonus: 2d6 + 10.
- **Rapid Fire weapons** lose one die from *each* Burst fired (an Autocannon burst becomes 2x 1d6).
- **Weapons that roll no damage dice** (the Disruptor Cannon, EMP warheads) are unaffected.

### 5.1 Autocannon Munitions
When equipping an Autocannon, players must select a single ammunition type to load into its magazine at build time.
- **Armor Piercing (AP 1)**: The dense kinetic penetrator ignores up to 1 point of the target's Armor DR per hit (treat the target's DR as 1 lower than it actually is for this attack).
- **High Explosive Incendiary (HEI)**: The warhead is designed to ignite internals. Adds a flat **+1 modifier** to any Critical Hit rolls caused by this weapon. *(For example, if you penetrate armor and roll a 5 on the 1d6 Crit Table, it becomes a 6).*

### 5.2 Guided Missile Systems
Missiles must be configured with a guidance package and a warhead at build time:
- **Guidance Systems**:
  - *Microwave (Radar)-Guided*: Permits indirect fire (ignoring Elevation/LOS blocks). Requires a Microwave (Radar) lock (which must be provided by a Tactical Datalink spotter if the firing Frame lacks direct LOS). Blocked by active ECM or Microwave-Absorbent Active Coating.
  - *Infrared (IR)-Guided*: Permits indirect fire (ignoring Elevation/LOS blocks). Requires an Infrared (IR) lock (which must be provided by a Tactical Datalink spotter if the firing Frame lacks direct LOS). Target must have spent 5+ EP this turn. Blocked by Flares or Infrared-Suppression Active Coating.
  - *Visual (VIS)-Guided*: Permits indirect fire (ignoring Elevation/LOS blocks, utilizing onboard optical cameras during terminal descent). Requires a Visual (VIS) lock (which must be provided by a Tactical Datalink spotter if the firing Frame lacks direct LOS). Blocked by Smoke or Visual-Camouflage Active Coating.
- **Warheads**:
  - *High Explosive (HE)*: Roll 1 Hit Location. Deals 3d6 damage to the primary hit location, and **1d6 splash damage** to all adjacent locations on the target Frame (e.g., if the Torso is hit, the Head, Arms, and Legs take splash damage).
  - *Cluster*: Sandblasts the target with a wide spread. Roll three times for Hit Locations: once on the **Left Side** column, once on the **Front/Rear** column, and once on the **Right Side** column. The Cluster Missile deals **2d6 damage** to each of these three rolled locations. Resolve this damage individually against each location's Armor DR.
  - *EMP (Electromagnetic Pulse)*: Detonates in a massive sphere. Targets a specific hex rather than a single Frame. **All Frames** within the target hex and the 6 surrounding adjacent hexes suffer the EMP effect. Deals no physical damage. Bypasses Armor DR. Affected Frames suffer heavily scrambled sensors for the next turn (must pass a Pilot Check to establish any sensor locks). Additionally, any affected Frame suffers a **Critical Hit** on *every* location that currently has **0 Armor DR** (roll on the Critical Hit table for each exposed location). *(Note: This affects friendly Frames caught in the blast radius).*

### 5.3 Universal System Traits
Many weapons and utility systems share standardized mechanical behaviors, represented by keywords or Traits.

> **Trait: Overcharge [Cost for Effect]**
> Any weapon or system with the Overcharge trait allows a pilot to dump excess EP from their Capacitor beyond the base activation cost to achieve a magnified effect. 
> * **Capacitor Drain**: The additional EP required to trigger an Overcharge must be paid *exclusively* from banked EP in the Frame's Capacitor. Freshly generated Reactor EP cannot be used to pay Overcharge costs.
> * **Tracking Overcharge EP**: Because banked Capacitor charge is added to the energy pool during the Energy Phase, note the size of the Capacitor at the moment it is emptied. That figure is the Frame's **Overcharge Allowance** for the turn — the maximum EP it may spend on Overcharges this turn, regardless of how much total EP remains in the pool. Each EP spent on an Overcharge reduces the Allowance by 1. A Frame that banked nothing last turn cannot Overcharge at all this turn, even with a full pool.
> * **Overcharge**: High-yield energy weapons (Lasers, Thermal Lances, Disruptor Cannons, Rail Guns) allow a pilot to dump additional EP from the Capacitor during the Combat Phase to boost damage or induce special effects. Overcharging a weapon triggers a **1-Turn Cooldown** on that weapon.
> *(Example: A pilot overcharges their Thermal Lance. They spend 4 base EP + 4 overcharge EP = 8 EP total, dealing **3d6 + 6 damage** instead of the usual 3d6. The weapon then enters a 1-Turn Cooldown and cannot be fired next round).*

---

## 6. Damage & Critical Hits
> *"No plan of operations extends with any certainty beyond the first contact with the main hostile force." — Helmuth von Moltke the Elder*


### 6.1 Hit Location Table (2d6)
When a Frame is hit, the player rolls 2d6 and determines the hit location using the column corresponding to the incoming attack's **Hit Zone** (Left Side, Front/Rear, or Right Side):

| Roll (2d6) | Left Side Attack | Front / Rear Attack | Right Side Attack |
| :---: | :--- | :--- | :--- |
| **2** | Torso (Core Critical)* | Torso (Core Critical)* | Torso (Core Critical)* |
| **3** | Left Leg | Right Arm | Right Leg |
| **4** | Left Arm | Right Arm | Right Arm |
| **5** | Left Arm | Right Leg | Right Arm |
| **6** | Left Leg | Torso | Right Leg |
| **7** | Torso | Torso | Torso |
| **8** | Torso | Torso | Torso |
| **9** | Torso | Left Leg | Torso |
| **10** | Right Arm | Left Arm | Left Arm |
| **11** | Right Leg | Left Arm | Left Leg |
| **12** | Head (Sensors)** | Head (Sensors)** | Head (Sensors)** |

*\*Torso (Core Critical): Bypasses Torso Armor DR entirely (treat DR as 0 for this attack). Damage is dealt directly to Torso Internal Structure, and Torso DR is permanently reduced by 1.*  
*\*\*Head (Sensors): Contains the cockpit and Sensor Suite. Critical hits on the Head are highly dangerous and can stun or blind the Frame.*

### 6.2 Critical Hit Tables (1d6 Cascading)
If damage penetrates the Armor DR of a location, roll 1d6 on the corresponding table. Mark the slot on your Frame's profile. 
- **Overkill Margin**: For every **5 points** of damage that exceeds the Armor DR, roll an additional 1d6 on the Critical Hit Table.
- **Cascading Failure**: If you roll a number on the Crit Table that has already been marked, the damage cascades upward to the next highest available (unmarked) number. (Remember: HEI ammo adds a flat +1 modifier to these rolls. If a modified roll or cascade exceeds the highest slot on the table, apply that maximum effect).

#### Head (Cockpit) Critical Table
- **1: Datalink Severed / Sensor Scramble**. The Frame cannot use or benefit from the Tactical Datalink. If the Frame is not equipped with a Datalink, treat this as a **Sensor Scramble** (the Frame instantly drops all currently held target locks and cannot establish new locks for 1 round).
- **2: Thermal Sensors Destroyed**. The Frame cannot establish Infrared (IR) locks.
- **3: Radar Destroyed**. The Frame cannot establish Microwave (Radar) locks.
- **4: Optical Sensors Destroyed**. The Frame cannot establish Visual (VIS) locks.
- **5+: Pilot K.O. / Frame Shutdown**. The Frame is permanently disabled and out of combat.

#### Torso (Core) Critical Table
- **1: System Glitch**. The Frame generates 1 less EP *next turn*.
- **2: Servo Lock**. Torso Twists cost 2 EP (no longer free).
- **3: Capacitor Leak**. Capacitor Max is permanently reduced by 2; lose 2 stored EP immediately.
- **4: Heat Sinks Offline**. The Frame can no longer **Overcharge** any of its weapons or systems.
- **5: Reactor Damage**. Reactor output is permanently reduced by 2 EP per turn.
- **6: Ammo Explosion**. If the Frame is equipped with a weapon that uses an **Explosive Ammo Die** (Autocannons or Guided Missiles), the internal feed detonates. That weapon is permanently **Empty** for the rest of the battle, and the Frame immediately suffers **2 additional Critical Hits** to the Torso. Inert ammunition (Rail Guns) and energy weapons do **not** trigger this effect. If the Frame has no explosive Ammo Dice, treat as Reactor Damage instead.
- **7: Electrical Fire**. During the **End Phase**, the Frame automatically suffers **1 Torso Critical Hit**.
- **8+: Reactor Melt**. The Reactor explodes. Deal 2d6 damage to all adjacent hexes, and the Frame is destroyed immediately.

#### Arms (Weapons & Actuators) Critical Table
- **1: Targeting Jitter**. Weapons mounted in this arm suffer a -1 damage penalty on their next attack.
- **2: Actuator Strain**. Weapons mounted in this arm cost +1 EP to fire.
- **3: Servo Failure**. Weapons mounted in this arm can only fire into the Forward Arc.
- **4: Hardpoint Failure**. All attacks made with weapons in this arm permanently roll 1 fewer damage die (to a minimum of 1).
- **5: Weapon Destroyed / Ammo Cut**. The attacking player chooses one weapon mounted in this arm; it is destroyed. If it uses ammo, the feed is cut instead. *(If the arm has no weapons, this damage automatically cascades upward to Arm Severed).*
- **6+: Arm Severed**. The arm is completely destroyed. All weapons and systems mounted in this arm are lost.

#### Legs (Mobility) Critical Table
- **1: Gyro Glitch**. -1 penalty to all Pilot Checks *next turn*.
- **2: Knee Lock**. Walking and reversing cost +1 EP per hex.
- **3: Hip Actuator**. The Frame's Movement Limit is permanently reduced by 2 hexes.
- **4: Gyro Failure**. The Frame suffers a permanent -2 penalty to all Pilot Checks (making it very easy to knock Prone).
- **5: Thruster Wrecked**. Jump Jets are disabled. *(If the Frame has no Jump Jets, this damage automatically cascades upward to Leg Severed).*
- **6+: Leg Severed**. The leg is destroyed outright. The Frame falls Prone immediately and is permanently crippled (see Section 6.5.4). It may fight on, and may attempt to haul itself upright, but it will never walk again.

> [!NOTE]
> **Playtest TODO - Missing Component Cascade:** For Frames that don't have Jump Jets (Leg Slot 5) or don't have Weapons in an Arm (Arm Slot 5), the current rule states that the damage automatically cascades upward to Slot 6 (Severed) because there is no component there to absorb the blast. We need to playtest this to see if "Instant Cascade" feels too punishing, or if it should instead be a "Free Pass" where the slot is marked but the Frame suffers no immediate penalty.

### 6.3 Falling and the Prone State
When an Iron Frame is knocked over during combat (via collision, Drop Strike, or leg destruction), it enters the **Prone** state. Mark the Frame with a Prone token.

### 6.4 Pilot Checks

**A Pilot Check is always: 2d6 + modifiers, versus a Target Number of 6.**

The following modifiers apply to every Pilot Check, cumulatively:

| Modifier | Value |
| :--- | :---: |
| Named Pilot's Initiative Bonus | +1 / +2 / +3 |
| Standing in **Paved** terrain | +1 |
| Standing in **Rough** terrain | −1 |
| Standing in **Deep Water** | −1 |
| Each **Toe Actuator** critical suffered | −1 |

The following modifiers apply only to the check they are named for:

| Situation | Additional Modifier |
| :--- | :---: |
| Kinetic Drop Strike landing (jumper only) | + Mass Value − Hexes Jumped |
| Jump Jet landing in hazardous terrain | none |
| Collision recovery | none |

A Frame must make a Pilot Check in the following situations:
- **Avoiding Falling Prone**:
  - *Collisions*: Both Frames check (see Section 2.2).
  - *Jump Jet Landing*: Required when landing in Rough, Deep Water, a Building Roof, or Woods (see the Jump Jet Terrain Landing Table).
  - *Kinetic Drop Strike*: The **Target Frame** is automatically knocked Prone with no check. The **Jumping Frame** checks on landing, adding its Mass Value and subtracting the number of hexes jumped.
  - *Leg Severed*: A Frame automatically falls Prone if a leg is severed (no check allowed).
- **Standing on a Severed Leg**: A crippled Frame attempting to Stand Up must pass a Pilot Check to rise (see Section 6.5.4). The 3 EP is spent whether it succeeds or fails.
- **Fighting Through Sensor Scrambles**:
  - *EMP Recovery*: If a Frame's sensors are scrambled by an EMP, the pilot must pass a Pilot Check (2d6) to establish a VIS, IR, or Radar lock. Failure means the lock cannot be established.

#### Effects of the Prone State
- **Defense**: A Prone Frame cannot gain the **Flanking** state, and it cannot force rerolls from Flanking. It still benefits from damage rerolls granted by Terrain Cover.
- **Combat**: A Prone Frame cannot torso twist and suffers a **-1d6 penalty to all weapon damage rolls** (minimum of 1d6 rolled).
- **Maneuvering**: A Prone Frame cannot walk, reverse, or jump. Its only movement options are:
  - **Stand Up**: Costs **3 EP** during its Activation Phase. Upon standing, the pilot removes the Prone token and may set the Leg Facing to any direction for free. A Frame with both legs intact stands automatically; a Frame with a **severed leg** must pass a Pilot Check to rise (see Section 6.5.4), and spends the 3 EP whether it succeeds or not.
  - **Pivot**: While Prone, the Frame may crawl-turn, pivoting its Leg Facing by 60 degrees. Cost: **2 EP** per 60 degrees (**3 EP** if a leg has been severed).

### 6.5 Location Destruction & Damage Transfer
If the 6 slot on a location's Critical Hit table is marked (or cascaded into), that location is destroyed. Any subsequent hits to that location are handled using the following rules:

#### 6.5.1 Torso Destruction
If the Torso is destroyed, the engine core is breached. The Frame is completely destroyed.
*   **Core Melt**: The reactor explodes immediately. All units in adjacent hexes suffer **2d6 damage** (apply Flanking and Armor DR normally).

#### 6.5.2 Head Destruction
If the Head is destroyed, the cockpit is vaporized or crushed, and the pilot is killed. The Frame is immediately deactivated and treated as destroyed.

#### 6.5.3 Arm Destruction (Left or Right)
If an Arm is destroyed, it is severed and blown off.
*   **Equipment Loss**: All weapons and systems mounted in that arm are permanently destroyed and lost.

#### 6.5.4 Leg Destruction (Left or Right)
If a Leg is destroyed, it is blown off.
*   **Immediate Fall**: The Frame immediately falls **Prone**. No Pilot Check is permitted; the limb is gone and no amount of skill keeps the machine upright.
*   **Fighting From the Ground**: A crippled Frame is not out of the battle. It may still fire every weapon it has, subject to the standard Prone penalties in Section 6.3.
*   **Hauling Itself Upright**: A Frame with one severed leg **may attempt to Stand Up**, balancing on its remaining leg and gyro. This costs the usual **3 EP** and requires a **Pilot Check**:
    - *Success (6+)*: The Frame rises. It is standing, and immediately sheds every Prone penalty — it regains its full damage dice and may torso twist again. Set its Leg Facing to any direction for free.
    - *Failure (< 6)*: The Frame slips back down. The 3 EP is spent regardless, and it may try again on a later activation.
    - A standing crippled Frame that is knocked down again (by a collision, a Drop Strike, or a second leg wound) must repeat the attempt.
*   **Crippled Movement**: Standing or prone, the Frame is permanently crippled and can **never walk, reverse, or jump** again. Its only movement is to pivot its Leg Facing at a cost of **3 EP** per 60 degrees.
*   **Double Leg Loss**: If both legs are destroyed, the Frame is completely disabled (treated as destroyed). A machine with nothing to stand on cannot fight.

> *Design note: a severed leg is a crippling wound, not a death sentence. A one-legged Paladin that gets itself upright is still a Rail Gun platform that can traverse its torso and track targets — dangerous to approach, trivial to walk away from. Deciding whether to spend 3 EP and a Pilot Check on standing, or to stay down and keep shooting at a penalty, is the pilot's problem.*

#### 6.5.5 Damage Transfer (Blow-Through)
If an attack hits a location that has already been destroyed (e.g. a random hit location rolls a severed Arm or Leg), the hit is not wasted:
*   The damage transfers directly to the **Torso**. Resolve the attack against the Torso's current Armor DR exactly as if you had rolled a Torso hit normally.
*   Because the attack travels inward through structural gaps to strike the center mass, the target cannot force the attacker to reroll damage dice using the **Flanking** state (terrain Cover rerolls still apply).
*   Damage cannot transfer further than the Torso (as Torso destruction destroys the Frame).

---


## 7. Optional Rules
> *"Amateurs talk about tactics, but professionals study logistics." — Gen. Robert H. Barrow*

For players seeking advanced simulation, competitive matching, or campaign settings, these optional rules introduce points-based force organization and environmental hazards.

### 7.1 Force Organization & Point Limits
To build balanced forces for casual or competitive play, players agree on a maximum **Deployment Point** limit (typically 1000 or 1500 points). Forces are organized into tactical groups:
- **Element**: A pair of 2 Iron Frames. (Standard skirmish games are typically 1 Element vs. 1 Element).
- **Platoon**: A full combat unit consisting of 3 to 4 Iron Frames (typically organized as two Elements operating together). 

### 7.2 Base Chassis & Custom Frames
If players wish to construct custom Iron Frames from scratch instead of using the pre-generated technical readouts (like the Vanguard or Specter), they must purchase a **Base Chassis** and spend points to upgrade it. 

Every Frame is defined by its physical **Tonnage** (Weight Class). Tonnage determines the Frame's starting baseline stats and its absolute maximum limits (**Limits**).

**Chassis Limits Table:**

| Chassis Class | Tonnage | Hardpoints (L / M / H) | Base Stats (Init / Move / Reactor / Capacitor) | Maximum Mobility Limits (Init / Move) | Base Cost |
| :--- | :---: | :---: | :--- | :--- | :--- |
| **Light** | 20–35 Tons | 4L / 0M / 0H | Init 8 \| Move 5 \| Reactor 6 \| Capacitor 2 | Init 12 \| Move 7 | 150 pts |
| **Medium** | 40–55 Tons | 4L / 2M / 0H | Init 6 \| Move 4 \| Reactor 6 \| Capacitor 2 | Init 10 \| Move 5 | 200 pts |
| **Heavy** | 60–75 Tons | 4L / 3M / 1H | Init 4 \| Move 3 \| Reactor 5 \| Capacitor 2 | Init 6 \| Move 4 | 250 pts |
| **Assault** | 80–100 Tons | 4L / 3M / 2H | Init 2 \| Move 2 \| Reactor 5 \| Capacitor 2 | Init 4 \| Move 3 | 300 pts |

*Note: Every Frame possesses a specific number of hardpoints dictating what equipment it can mount. A hardpoint can accommodate equipment of its size or smaller (e.g., a Medium hardpoint can mount a Medium or Light weapon). A Frame cannot mount a piece of equipment heavier than its weight class.*

#### 7.2.1 Base Armor DR & Internal Structure (IS)
When purchasing a Base Chassis, it comes pre-equipped with standard baseline **Internal Structure (IS)** and **Base Armor Damage Reduction (DR)** scaled to its physical Weight Class. Internal Structure is determined strictly by Tonnage and cannot be upgraded.

**Base Internal Structure (IS) & Armor DR Table:**

| Chassis Class | Head (IS / DR) | Torso (IS / DR) | Arms [L/R] (IS / DR) | Legs [L/R] (IS / DR) | Max Armor DR Cap (Head / Torso / Arms / Legs) |
| :--- | :---: | :---: | :--- | :--- | :---: |
| **Light (20–35T)** | 4 IS / 2 DR | 8 IS / 2 DR | 4 IS / 1 DR | 5 IS / 2 DR | 3 / 3 / 2 / 3 DR |
| **Medium (40–55T)** | 5 IS / 3 DR | 10 IS / 4 DR | 6 IS / 2 DR | 8 IS / 3 DR | 4 / 5 / 3 / 4 DR |
| **Heavy (60–75T)** | 6 IS / 4 DR | 16 IS / 6 DR | 9 IS / 4 DR | 12 IS / 5 DR | 5 / 7 / 5 / 6 DR |
| **Assault (80–100T)** | 8 IS / 4 DR | 20 IS / 7 DR | 12 IS / 5 DR | 15 IS / 6 DR | 5 / 8 / 6 / 7 DR |

#### 7.2.2 Engine, Mobility & Armor Upgrades
Upgrading a Frame's chassis above its Base Stats **does not increase its Tonnage**. A 45-ton Frame remains exactly 45 tons, meaning its physical armor capacity and weapon mounting slots remain those of a Medium frame.

Mobility stats (Init/Move) and Armor DR are strictly bound by the Limits and Caps of the Frame's weight class. However, Reactor and Capacitor upgrades have **no limits**, allowing Heavy and Assault frames to purchase massive power plants to fuel heavy weaponry.

- **Initiative Upgrade**: +15 pts per +1 Initiative (Up to Chassis Limit)
- **Movement Upgrade**: +20 pts per +1 Move (Up to Chassis Limit.)
- **Armor DR Upgrade**: +5 pts per +1 Armor DR to any single location (Up to Max Armor DR Cap)
- **Reactor Upgrade**: +10 pts per +1 EP generated (No Limit)
- **Capacitor Upgrade**: +5 pts per +1 EP capacity (No Limit)

*Example: Constructing a 45-ton stealth striker (like the Specter). You pay 200 pts for the Medium Base Chassis (granting Head 5 IS/3 DR, Torso 10 IS/4 DR, Arms 6 IS/2 DR, Legs 8 IS/3 DR). You purchase Init+4 (60 pts), Move+1 (20 pts), Reactor+3 (30 pts), and Capacitor+2 (10 pts). The bare chassis costs 320 pts total. Adding AMC (30 pts), Tactical Datalink (15 pts), Laser (15 pts), and Disruptor Cannon (25 pts) brings the final cost to 405 pts.*

#### 7.2.3 Countermeasures & Active Systems
- **Smoke Launcher** [Light]: 10 pts
- **Flare Launcher** [Light]: 15 pts
- **Chaff Dispenser** [Light]: 15 pts
- **Tactical Datalink** [Light]: 15 pts
- **Jump Jets (Light/Medium only)** [Light]: 20 pts
- **Electronic Countermeasures (ECM)** [Medium]: 25 pts
- **Active Metamaterial Coating (AMC)** [Medium]: 30 pts

#### 7.2.4 Weapons & Armaments
- **Autocannon** [Light]: 15 pts
- **Laser** [Light]: 15 pts
- **Guided Missiles** [Medium]: 20 pts
- **Disruptor Cannon** [Medium]: 25 pts
- **Thermal Lance** [Heavy]: 30 pts
- **Rail Gun** [Heavy]: 45 pts

#### 7.2.5 Named Pilots
- **Pilot (+1 Initiative Bonus)**: 15 pts
- **Pilot (+2 Initiative Bonus)**: 30 pts
- **Pilot (+3 Initiative Bonus)**: 45 pts

---

### 7.3 Named Pilots & The Code of Honor
> *"The true science of martial arts means practicing them in such a way that they will be useful at any time, and to teach them in such a way that they will be useful in all things." — Miyamoto Musashi*


In *Iron Protocol*, pilots are not anonymous grunts. You can field legendary **Named Pilots** who represent the elite houses, coalitions, and orders.

#### 7.3.1 Famous Aces
While players are encouraged to create their own pilots, here are a few legendary aces that stalk the battlefields of *Iron Protocol*:

- **Kaito Kuroda ("Wraith")**  
  ![Kaito Kuroda](images/kaito_kuroda.jpg)  
  *A prodigy of the Obsidian Order. Kaito relies on raw reflexes and blinding speed over heavy armor. He views combat as a sacred duel, demanding to look his opponents in the eyes before he strikes.*  
  - **Initiative Bonus**: +3  
  - **Sworn Vow**: Vow of Respect (Rei)  
  - **Point Cost**: 45 pts  

- **Kenji Takahashi ("Shogun")**  
  ![Kenji Takahashi](images/kenji_takahashi.jpg)  
  *A fiercely traditional veteran of the Inner Systems Defense Force. Takahashi operates almost exclusively in heavily armored assault frames and believes that momentum dictates victory. He is famous for his unyielding, straight-line charges into enemy formations.*  
  - **Initiative Bonus**: +2  
  - **Sworn Vow**: Vow of Courage (Yuu)  
  - **Point Cost**: 30 pts  

- **Lyra Vance ("Viper")**  
  ![Lyra Vance](images/lyra_vance.jpg)  
  *A ghost on the battlefield, Lyra operates deep behind enemy lines for the Sovereign Coalition. She pilots electronic warfare frames equipped with active camouflage. Rather than engaging in chaotic brawls, she relies on surgical precision, dismantling a target's mobility and weapon systems limb-by-limb before delivering the killing blow.*  
  - **Initiative Bonus**: +3  
  - **Sworn Vow**: Vow of Mercy (Jin)  
  - **Point Cost**: 45 pts

#### 7.3.2 Initiative & Pilot Check Bonus
Equipping a Named Pilot on an Iron Frame grants a flat Initiative bonus of **+1, +2, or +3** (declared at build time). This represents their tactical foresight and combat reflexes.

A Named Pilot's bonus is applied **after** the chassis Initiative limits in Section 7.2, and may exceed them — that is the point of an ace. A Heavy chassis capped at Initiative 6 may therefore reach Initiative 9 with a +3 pilot. No Frame may exceed a **final Initiative of 12** by any combination of chassis upgrades and pilot bonus.
- **Pilot Checks**: In addition to modifying the Frame's Initiative, the Named Pilot adds their Initiative bonus (+1, +2, or +3) as a flat modifier to all **Pilot Checks** (to avoid falling Prone). If the pilot is dishonored, they immediately lose this bonus as well.
- **Point Cost (Optional)**: If playing with the optional point rules (see Section 7.1), Named Pilots cost points based on their Initiative bonus:
  - **+1 Initiative & Pilot Checks**: 15 pts
  - **+2 Initiative & Pilot Checks**: 30 pts
  - **+3 Initiative & Pilot Checks**: 45 pts

#### 7.3.3 Iron Protocol Vows
Every Named Pilot is sworn to a specific vow under the Iron Protocol, reflecting their martial pride. If a pilot violates their vow during a battle, they are **dishonored**: they immediately lose their Initiative bonus, and all their weapons cost +1 EP to fire for the remainder of the battle.

Choose one Vow for your Named Pilot:

##### Vow of Courage (Yuu)
*“The warrior does not retreat; we are the anvil upon which the enemy breaks.”*
- **The Constraint**: The pilot cannot use the **Reverse (R)** movement command.
- **Dishonor Penalty**: The pilot is dishonored (see standard penalty).

##### Vow of Respect (Rei)
*“A warrior meets their foe face-to-face. Anonymous death from behind is the weapon of cowards.”*
- **The Constraint**: The pilot cannot target an enemy Frame from its **Rear Hit Zone**, nor fire indirect-guided missiles without direct Line of Sight (even if a Tactical Datalink is active).
- **Dishonor Penalty**: The pilot is dishonored (see standard penalty).

##### Vow of Honor (Meiyo)
*“Seek only the strongest. There is no glory in crushing the weak.”*
- **The Constraint**: If a higher-initiative or higher-tonnage enemy Frame is detected and within the pilot's Torso Firing Arc, the pilot **must** target a higher-priority Frame instead of any lower-tier targets. (If both a higher-tonnage and higher-initiative target are present, the pilot may choose between them, but cannot fire at a target that is inferior in *both* categories).
- **Dishonor Penalty**: The pilot is dishonored (see standard penalty).

##### Vow of Mercy (Jin)
*“Victory is in the disarm, not the slaughter. A dead enemy learns nothing.”*
- **The Constraint**: Hit locations are rolled, not chosen, so this vow governs what the pilot does with the roll. While the target Frame still has **any** Arm or Leg that is not destroyed, a Mercy pilot who rolls a **Head or Torso** hit against it must **pull the shot**: the attack deals no damage and no Critical Hit is rolled, though the EP and ammunition are still spent. Once every limb on the target has been destroyed, the pilot may strike the core freely.
- **Breaking the Vow**: Choosing to resolve a Head or Torso hit normally while the target still has an intact limb dishonors the pilot.
- **Dishonor Penalty**: The pilot is dishonored (see standard penalty).

##### Vow of Honesty (Makoto)
*“Deception is a crutch. I will stand in the light and let them witness their end.”*
- **The Constraint**: The pilot cannot activate Active Metamaterial Coating (AMC), Smoke Launchers, or ECM, nor can they benefit from the umbrella of allied ECM or Smoke. *An allied ECM bubble does not switch off around them — instead, an honest pilot's Frame is simply always considered detectable on the Microwave (Radar) spectrum while inside it, and enemies may always establish Visual locks through allied Smoke to reach them.*
- **Dishonor Penalty**: The pilot is dishonored (see standard penalty).

##### Vow of Loyalty (Chuugi)
*“My shield is the wall that protects my kin. I will fall before they do.”*
- **The Constraint**: If a friendly Frame within 3 hexes has more marked Critical Hit slots than the pilot, the pilot cannot move further away from that ally.
- **Dishonor Penalty**: The pilot is dishonored (see standard penalty).

---

## 8. Iron Frame Roster
> *"Battles are won by slaughter and maneuver. The greater the general, the more he contributes in maneuver, the less he demands in slaughter." — Winston Churchill*

Here are five pre-configured Iron Frames ready for combat.

### 8.1 IF-25L-1 "Jackal" (Light Recon Frame)
![IF-25L-1 "Jackal" Technical Sketch](images/if_25l_1_jackal.jpg)

*A fragile but blisteringly fast scout frame. It relies on its extreme evasion and jump jets to outmaneuver heavier foes, darting in to deliver surgical strikes before leaping to safety.*
- **Initiative**: 12
- **Chassis Mass (Tonnage)**: 25 Tons (Light, Mass Value 1)
- **Point Value**: 370 points
- **Reactor Rating**: 8 EP/turn
- **Capacitor Max**: 3 EP
- **Movement Limit**: 7 hexes
- **Armor DR by Location**: Head: 2 | Torso: 2 | Left Arm: 1 | Right Arm: 1 | Each Leg: 2
- **Equipped Systems**:
  - Standard Sensor Suite (Visual [VIS]/Infrared [IR]/Microwave [Radar])
  - Jump Jets [Light HP]
  - Tactical Datalink [Light HP]
- **Equipped Weapons**:
  - **Left Arm** [Light HP]: Laser (2d6 damage)
  - **Right Arm** [Light HP]: Autocannon (10 Bursts, loaded with 10 AP)

### 8.2 IF-45M-1 "Specter" (Medium Stealth Frame)
![IF-45M-1 "Specter" Technical Sketch](images/if_45m_1_specter.jpg)

*A fast, stealthy frame designed to infiltrate enemy lines, disrupt sensors, and escape using high evasion and metamaterial cloaking.*
- **Initiative**: 10
- **Chassis Mass (Tonnage)**: 45 Tons (Medium, Mass Value 2)
- **Point Value**: 435 points
- **Reactor Rating**: 9 EP/turn
- **Capacitor Max**: 4 EP
- **Movement Limit**: 5 hexes
- **Armor DR by Location**: Head: 3 | Torso: 4 | Left Arm: 2 | Right Arm: 2 | Each Leg: 3
- **Equipped Systems**:
  - Standard Sensor Suite (Visual [VIS]/Infrared [IR]/Microwave [Radar])
  - Active Metamaterial Coating (AMC)
  - Tactical Datalink
- **Equipped Weapons**:
  - **Left Arm** [Light HP]: Laser (2d6 damage)
  - **Right Arm** [Medium HP]: Disruptor Cannon

### 8.3 IF-55M-1 "Vanguard" (Medium Skirmisher Frame)
![IF-55M-1 "Vanguard" Technical Sketch](images/if_55m_1_vanguard.jpg)

*The workhorse of the fleet. Balanced defense, solid firepower, and equipped with flares to deflect seeking missiles.*
- **Initiative**: 6
- **Chassis Mass (Tonnage)**: 55 Tons (Medium, Mass Value 2)
- **Point Value**: 430 points
- **Reactor Rating**: 12 EP/turn
- **Capacitor Max**: 6 EP
- **Movement Limit**: 5 hexes
- **Armor DR by Location**: Head: 4 | Torso: 5 | Left Arm: 3 | Right Arm: 3 | Each Leg: 4
- **Equipped Systems**:
  - Standard Sensor Suite (Visual [VIS]/Infrared [IR]/Microwave [Radar])
  - Electronic Countermeasures (ECM) [Medium HP]
  - Flare Launcher [Light HP]
  - Chaff Dispenser [Light HP]
  - Tactical Datalink [Light HP]
- **Equipped Weapons**:
  - **Left Arm** [Light HP]: Autocannon (10 Bursts, loaded with 5 AP / 5 HEI)
  - **Right Arm** [Light HP]: Laser (2d6 damage)

### 8.4 IF-75H-1 "Paladin" (Heavy Fire-Support Frame)
![IF-75H-1 "Paladin" Technical Sketch](images/if_75h_1_paladin.jpg)

*A heavy bombardment frame equipped to deliver high-impact kinetic support and rain cluster munitions, protected by layered defensive launchers.*
- **Initiative**: 5
- **Chassis Mass (Tonnage)**: 75 Tons (Heavy, Mass Value 3)
- **Point Value**: 540 points
- **Reactor Rating**: 14 EP/turn
- **Capacitor Max**: 8 EP
- **Movement Limit**: 4 hexes
- **Armor DR by Location**: Head: 4 | Torso: 6 | Left Arm: 4 | Right Arm: 4 | Each Leg: 5
- **Equipped Systems**:
  - Standard Sensor Suite (Visual [VIS]/Infrared [IR]/Microwave [Radar])
  - Flare Launcher [Light HP]
  - Chaff Dispenser [Light HP]
  - Smoke Launcher [Light HP]
  - Tactical Datalink [Light HP]
- **Equipped Weapons**:
  - **Right Arm** [Heavy HP]: Rail Gun (5 rounds)
  - **Left Arm** [Light HP]: Autocannon (10 AP Bursts)
  - **Torso** [Medium HP]: Guided Missile Launcher (4 Salvos, Microwave [Radar] Guided, Cluster Warheads)

### 8.5 IF-90A-1 "Colossus" (Heavy Assault Frame)
![IF-90A-1 "Colossus" Technical Sketch](images/if_90a_1_colossus.jpg)

*A walking fortress. Generates massive amounts of energy to feed its Rail Gun and Thermal Lance, relying on heavy armor and smoke screens for protection.*
- **Initiative**: 3
- **Chassis Mass (Tonnage)**: 90 Tons (Assault, Mass Value 4)
- **Point Value**: 655 points
- **Reactor Rating**: 18 EP/turn
- **Capacitor Max**: 10 EP
- **Movement Limit**: 3 hexes
- **Armor DR by Location**: Head: 4 | Torso: 7 | Left Arm: 5 | Right Arm: 5 | Each Leg: 6
- **Equipped Systems**:
  - Standard Sensor Suite (Visual [VIS]/Infrared [IR]/Microwave [Radar])
  - Smoke Launcher [Light HP]
  - Flare Launcher [Light HP]
  - Chaff Dispenser [Light HP]
  - Tactical Datalink [Light HP]
- **Equipped Weapons**:
  - **Left Arm** [Heavy HP]: Thermal Lance
  - **Right Arm** [Heavy HP]: Rail Gun (5 rounds)
  - **Torso** [Medium HP]: Guided Missile Launcher (4 Salvos, IR Guided, EMP Warheads)

---
*Game Design by Antigravity & the User.*
