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
- **Flank Speed Threshold**: 4 hexes. If a Frame successfully exits at least 4 hexes during its activation, it gains **Flank Speed** for the remainder of the turn. *This threshold is fixed and deliberately does not scale with the chassis. An **Assault Frame can never gain Flank Speed** — its Movement Limit tops out at 3 hexes, one short of the threshold, and no upgrade can close the gap. A walking fortress does not dodge; it stands there and takes it. Its profile lists a Flank Speed of "N/A" to make this explicit.*
- **Movement Limit**: The maximum number of hexes a Frame can enter (via walking, reversing, or jumping) in a single turn. These are the *maximum* values permitted for each weight class (see the Chassis Limits Table in Section 7.2); an individual Frame may be rated lower:
  - **Light**: 7 max
  - **Medium**: 5 max
  - **Heavy**: 4 max
  - **Assault**: 3 max
  *(Pivoting/turning does not count toward the Movement Limit).*
- **Armor Damage Reduction (DR)**: Each of the 6 hit locations (**Head**, **Torso**, **Left Arm**, **Right Arm**, **Left Leg**, and **Right Leg**) has its own Armor DR rating. When a location is hit, its current Armor DR acts as a threshold. If the incoming damage is strictly greater than this DR (penetrates the armor), the location's Armor DR is permanently reduced by 1 and the attacker rolls on the Critical Hit Table for that location.
- **Mounted Hardpoints & Equipment**: Every location carries its own fixed hardpoints, each of a set size (Light, Medium or Heavy). Weapons and systems are bolted into a specific location — **Head**, **Torso**, **Left Arm** or **Right Arm** — and that location determines both the weapon's Firing Arc and what is lost when the location is destroyed. See the Hardpoint Layout Table in Section 7.2.0.

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
Firing arcs are determined relative to the Frame's **Torso Facing**. Weapons may fire into the arcs their mounting location can cover:
- **Forward Arc**: The 180-degree wedge directly in front of the Torso (covering 3 hexsides: Front-Left, Front, and Front-Right). **All weapons** — Torso and Arm alike — may fire into this arc.
- **Left Side Arc (Left Arm Only)**: The 60-degree wedge covering the direction directly to the left-rear of the Torso (covering 1 hexside: Left-Rear). Only weapons mounted in the **Left Arm** may fire into this arc.
- **Right Side Arc (Right Arm Only)**: The 60-degree wedge covering the direction directly to the right-rear of the Torso (covering 1 hexside: Right-Rear). Only weapons mounted in the **Right Arm** may fire into this arc.
- **Rear Arc**: The 60-degree wedge directly behind the Torso (covering 1 hexside: Rear). No weapons can be fired into the Rear Arc.

In practice this means a **Torso** weapon is a fixed forward battery covering 3 hexsides, while an **Arm** weapon traverses: it covers those same 3 hexsides *plus* the one to its own side, for 4 of the 6 hexsides. Arms are the only mounts that can engage a target on the Frame's flank.

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
1. **Agree on Force Limit**: Players select a Deployment Point budget (e.g. 500 pts for introductory 1v1, 1000 pts for 2v2 Element combat, 1500 pts for 3v3–4v4 Platoon battles).
2. **Select Frames & Pilots**: Players choose pre-built technical readouts from the **Iron Frame Roster (Section 8)** or construct custom frames using Section 7.2.
3. **Determine Point Bid & Advantage Player**: The player who brings a lower total force point cost (leaving an intentional point gap, commonly referred to as a **"Point Bid"**) wins the **Tactical Advantage** and chooses who is designated the **Advantage Player** for the match. If total force points are tied, players roll 2d6; the winner chooses the Advantage Player.
4. **Map Setup & Unit Deployment**: Lay out hex map tiles. The Advantage Player chooses their home map edge. Players alternate deploying 1 Frame at a time within 2 hexes of their designated home map edge.
5. **Pre-Combat System Activation**: At the moment of deployment, Frames equipped with an **Adaptive Skin** or **ECM** (Electronic Countermeasures) may deploy with those systems **Active**. Upkeep costs (2 EP for Adaptive Skin, 2 EP for ECM) are automatically deducted during the Round 1 Energy Phase.

#### 1.4.1 Introductory Scenario: Trial by Fire (1v1 Duel)
Recommended for first-time players learning the *Iron Protocol* rules engine.

- **Point Budget**: 500 Points per player.
- **Recommended Matchup — Vanguard Mirror**: Both players field an **IF-55M-1 "Vanguard"** (455 pts). A mirror match is the clearest way to learn the engine: with identical Frames, every difference in the outcome comes from pilot decisions rather than from the matchup. It teaches the three things that decide games — banking EP for Overcharges, maneuvering to gain Flank Speed, and choosing between a Single Burst and Full Auto — without any asymmetry to untangle at the same time.
- **Second Game — Vanguard vs. Specter**: Once both players are comfortable, field the **IF-55M-1 "Vanguard"** (455 pts) against the **IF-45M-1 "Specter"** (435 pts). This is a deliberately asymmetric matchup and it rewards knowing the Specter's line:
  - The Specter cannot win a straight damage race. Its Laser cannot penetrate the Vanguard's Torso armor while the Vanguard is moving, and its Disruptor Cannon deals no damage at all — but the Disruptor lands its effect on every hit it is *allowed* to make, whatever the Vanguard's armor or speed.
  - Instead, the Specter fights to **strip armor and then convert**. A Disruptor hit on any limb or the Head forces a Critical, and a result of 4 (*Structural Fracture*) reduces that location's Armor DR to **0**. Every subsequent Laser shot that lands there does full damage.
  - **The whole plan runs on the Microwave band.** The Disruptor needs a Radar lock, and the Vanguard carries both a Chaff Dispenser and an ECM suite. Both contest the shot on a **Countermeasure Check**, so roughly half the Specter's pulses land through either — but Chaff is a finite store of about six cartridges fired one at a time, while the ECM umbrella runs all game for 2 EP a turn and never runs out. The Specter's opening problem is therefore electronic, not structural: make the Vanguard spend cartridges it cannot replace, and accept that every Disruptor shot is a coin flip.
  - The Specter's **Adaptive Skin decides which of the Vanguard's guns still works.** Suppressing Visual forces every Laser shot to survive a Countermeasure Check, so about half of them simply fail to acquire; the Vanguard leans on its Autocannon and must close to make it count. Cloaking a second band costs an Overcharge and leaves the Skin offline entirely next round, so it is a spike, not a posture.
  - Terrain still matters more than the Skin for hiding completely. Buildings and elevation break *every* band at once; Heavy Woods strip Visual and Infrared, leaving only Radar for an ECM or a Microwave-mode Skin to finish.
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
2. **Stealth & System Upkeep**: Players allocate EP to maintain active stealth or ECM systems (e.g., Adaptive Skin, ECM). This EP is immediately deducted from the available pool. Any remaining EP is carried over to be spent dynamically on movement and combat.

### 2.2 Activation Phase (Reverse Initiative Order)
Frames activate one at a time, beginning with the **lowest Initiative** value and counting up.
- **Initiative Tie-Breakers (Activation)**: If opposing Frames share the same Initiative value, the **Advantage Player** (determined during setup via Point Bid or die roll) decides which of the tied Frames activates first (choosing to activate their own unit first or forcing the opponent's tied unit to activate first).
- **Dynamic Movement Execution**: When a Frame activates, the player decides how to move it on the fly, spending EP from their current energy pool step-by-step. This allows players to react directly to the movements of previously activated (lower-initiative) frames.
- **Movement Limit**: A Frame cannot enter more hexes during its activation than its stat sheet **Movement Limit**. Changing Leg Facing (pivoting) does not count as entering a hex and is not restricted by this limit.

#### Movement Cost Summary

Every action below is paid for out of the Frame's energy pool, step by step, as it moves. **Surcharges apply only where the table says they do.**

| Action | Base Cost | Terrain Surcharge? | Climbing (+1 Level)? | Counts vs Movement Limit? |
| :--- | :---: | :---: | :---: | :---: |
| **Forward Walk (W)** | 1 EP | **Yes** — pay the destination hex's cost | **Yes**, +1 EP | Yes |
| **Reverse (R)** | 2 EP | **Yes** — pay the destination hex's cost | **Yes**, +1 EP | Yes |
| **Jump Jet (J)** | 2 EP per hex | **No** | **No** | Yes, 1 per hex crossed |
| **Pivot / Turn** | 1 EP per 60° | No | — | **No** |
| **Stand Up** | 3 EP | No | — | No |
| **Torso Twist** | Free | No | — | No |

- **Terrain is paid on entry, for the hex you move *into*** — never for the hex you are leaving or passing through.
- **A Jump pays 2 EP per hex and nothing else.** It bypasses everything between its start and its landing hex, and it pays no surcharge for the hex it lands in either: the **Pilot Check** on the Jump Jet Terrain Landing Table is already the price of coming down somewhere awkward, and charging both would bill the same terrain twice.
- **Damaged movement**: a **Knee Lock** critical adds +1 EP to every Walk and Reverse. A **Prone** Frame pivots at 2 EP per 60°, or **3 EP** if one of its legs has been severed.

  - **Forward Walk (W)**: Move 1 hex forward. Cost: 1 EP.
  - **Reverse (R)**: Move 1 hex backward without changing facing. Cost: 2 EP.
  - **Pivot/Turn (TL/TR)**: Change facing by 60 degrees (one hexside) left or right. Cost: 1 EP.
  - **Jump Jet (J)**: Only available to **Light** and **Medium** weight classes (20–55 Tons); Heavy and Assault Frames can never be equipped with jets and can never jump. Jump Jets occupy a **Light hardpoint in the Torso**, where the thrusters and their propellant tankage sit. *The limit is propellant, not thrust: lifting a Frame takes reaction mass, and the tankage needed scales with tonnage far faster than a chassis can carry it. A 90-ton Assault Frame would be mostly propellant and still barely clear the ground.*
    - *Cost*: 2 EP per hex, **plus propellant**. After completing any jump, roll the **Ammo Die (1d6)**; on a **1 or 2** the tanks are dry and the Frame can never jump again this battle. Expect roughly three jumps from a full load.
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
        - Roll **2d6 on the Hit Location Table** separately for the target and for the jumper, using the **Front / Rear** column in both cases — a falling impact has no meaningful facing.
        - Both damage hits test against the respective location's Armor DR normally. Flank Speed does not apply to Drop Strike damage.
      - **Displacement**: After damage is resolved, the target's player (the defender) slides the jumping Frame into any unoccupied adjacent hex of their choice. If no adjacent hex is unoccupied, the jumping Frame is dumped into the nearest unoccupied hex, falls **Prone**, and takes an additional **2d6** tested against one Leg's Armor DR — the defender chooses which leg (see Section 6.3).
    - *Flank Speed*: A jump of **2 or more hexes** grants **Flank Speed** upon landing, regardless of the Frame's usual threshold — the ballistic trajectory of a full thruster burn is genuinely hard to track. A single-hex hop does not; it is a repositioning step, not a flight, and a Frame that hops one hex must still meet its normal Flank Speed by movement to gain the state. *(At 2 EP per hex, a 2-hex jump costs the same 4 EP that walking to the threshold does — Jump Jets buy terrain and elevation, not a cheaper defence.)*
- **Collisions & Blocking**: If a Frame's movement path would enter a hex occupied by another Frame, a collision occurs. The moving Frame immediately stops in the last unoccupied hex, its activation ends, and both frames suffer damage.
  - **Collision Damage**: Both the moving Frame and the stationary target Frame suffer damage to a random location determined by rolling on the Hit Location Table individually. Flank Speed does **not** allow rerolls against collision damage, as the impact is physical and unavoidable. **Armor DR is tested normally** against each hit, and a penetrating collision degrades that location's Armor DR by 1 and triggers a Critical Hit roll, exactly as a weapon hit would.
  - **Deliberate Ramming**: A pilot may intentionally drive into an occupied hex. Note that the flat damage is derived from the *moving* Frame's Mass Value, and **both Frames suffer that exact same flat damage** — a light Frame that rams a heavy one will almost always come off worse.
  - **Damage Calculation**: The collision inflicts a flat amount of damage based on the moving Frame's **Mass Value** (Light = 1, Medium = 2, Heavy = 3, Assault = 4) multiplied by its speed (the number of hexes moved in the current activation before impact):
    **Collision Damage = Mass Value x Speed**
  - **Pilot Check**: After resolving collision damage, both Frames must check if they fall Prone (see Section 6.3).
- **Flank Speed**: If a Frame successfully exits **4 or more hexes** during its activation *(changing facing/pivoting does not exit a hex)*, it gains **Flank Speed**. This represents the difficulty of targeting a fast-moving frame. Note that **Assault Frames cannot reach this threshold at all** — capped at 3 hexes of movement, they have no access to Flank Speed and must survive on Armor DR and terrain Cover alone. 
- **Torso Twist**: At the very end of its activation (after all movement is completed), the Frame may perform a free Torso Twist. The player can rotate the upper body of the Frame 1 hex side (60 degrees) to the left or right of its current Leg Facing, or reset it to align with the Leg Facing. This sets the Frame's Torso Facing (and Firing Arcs) for the upcoming Combat Phase. The torso remains in this position until the Frame activates in the next turn's Activation Phase.

#### 2.2.1 Movement Examples
- **Example 1 (Tactical Maneuvering)**: An IF-55M-1 "Vanguard" (Reactor 12) starts its activation on Level 0 with a full energy pool of 12 EP. 
  1. It performs a **Forward Walk** (1 EP) into an adjacent Level 1 Clear hex. (Cost: 1 EP + 1 EP climbing cost = 2 EP total).
  2. It performs a **Pivot/Turn** (1 EP) to rotate its Leg Facing 60 degrees left.
  3. It performs a **Forward Walk** (1 EP) into a Light Woods hex on Level 1. (Cost: 1 EP + 1 EP woods entry cost = 2 EP total).
  4. It performs a second **Forward Walk** (1 EP) through the woods on Level 1. (Cost: 1 EP + 1 EP woods entry cost = 2 EP total).
  5. It performs a third **Forward Walk** (1 EP) out of the woods into a Level 1 Clear hex. (Cost: 1 EP).
  - *EP Expenditure*: 2 + 1 + 2 + 2 + 1 = 8 EP. The Vanguard has 4 EP remaining in its pool to spend on active systems or firing weapons during the Combat Phase.
  - *Flank Speed*: It exited 4 hexes during its movement. Since it met the 4-hex threshold, it successfully gained **Flank Speed**.
  - *Final Step*: The pilot performs a free **Torso Twist** 60 degrees right, swinging the Right Arm's Laser onto the target's expected position without having to spend another EP pivoting the legs.

- **Example 2 (Jump Jet Cliff-Jumping)**: An IF-25L-1 "Jackal" (Reactor 8, plus 3 EP banked in its Capacitor last turn, for 11 EP available) starts its activation at the base of a steep Level 2 cliff (a Level 0 hex adjacent to a Level 2 hex). It is one of the few Frames that can make this move at all — Jump Jets are Light and Medium only.
  1. It declares a **Jump Jet** maneuver targeting an unoccupied Level 2 hex 3 spaces away, directly on top of the cliff, bypassing the steep height difference that blocks walking entirely.
  - *EP Expenditure*: 3 hexes jumped × 2 EP = **6 EP**. A jump pays no terrain or climbing surcharge — the 2 EP per hex is the whole cost.
  - *Propellant*: After landing, the pilot rolls the **Ammo Die**. A 3 comes up, so the tanks still hold; on a 1 or 2 the Jackal would never have jumped again this battle.
  - *Flank Speed*: The jump covered 3 hexes. Because that is **2 or more**, the Jackal gains **Flank Speed** on landing — a full thruster burn is hard to track.
  - *Landing*: The cliff top is Clear terrain, so this is an automatic clean landing with no Pilot Check. The pilot sets Leg Facing toward the enemy's rear quadrant for free.
  - *Final Step*: The Jackal has **5 EP** remaining — enough for its Laser (2 EP) and three Autocannon bursts (3 EP) in the Combat Phase.

- **Example 3 (Water Cooling & Urban Cover)**: An IF-25L-1 "Jackal" (Base Reactor 8) starts its turn standing in a Shallow Water hex.
  1. **Energy Phase**: The water submerged legs cool the reactor, generating **+1 extra EP** (total energy pool = 9 EP).
  2. **Activation Phase**: The Jackal performs 2 **Forward Walks** (2 EP) out of the water into a Paved street hex.
  3. It performs a **Pivot** (1 EP) and a **Forward Walk** (1 EP) into a hex adjacent to a Level 2 **Urban Building**.
  - *EP Expenditure*: 2 + 1 + 1 = 4 EP. The Jackal has 5 EP remaining to fire its Autocannon or Laser.
  - *Defensive Status*: The Jackal moved 3 total hexes. Since the threshold is 4 hexes, it does *not* gain Flank Speed. However, positioned adjacent to the building, it gains **Heavy Cover** against incoming attacks crossing the building's hexside, letting it force rerolls on up to 2 of the attacker's damage dice.

### 2.3 Combat Phase (Initiative Order)
Frames attack in order of **highest Initiative** to **lowest Initiative**.
- **Initiative Tie-Breakers (Combat)**: If opposing Frames share the same Initiative value, the **Advantage Player** decides which of the tied Frames declares and resolves its attack first (choosing to fire with their own unit first or allowing the opponent's tied unit to declare its attack first).
- **Instant Resolution**: Unlike some tabletop games, damage is resolved *instantly*. If a high-initiative Frame destroys or disables a weapon on a lower-initiative Frame, that lower-initiative Frame cannot use that weapon when its turn to fire comes.
- **One Attack Per Weapon**: Each mounted weapon may be fired **once per Combat Phase**, regardless of how much EP remains. A Frame with several weapons may fire each of them once, in any order it chooses. *(This is what gives Full Auto its purpose: a pilot who wants to put more rounds downrange must concentrate them into a single attack against a single hit location, rather than spreading them across several.)*
- **Attack Sequence**:
  1. **Select Weapon & Pay EP Cost**: Deduct the weapon's EP cost from the Frame's current pool. *(Note: If a Frame's EP pool was drained by an earlier attack and it can no longer afford a weapon's EP cost, it cannot fire that weapon this turn).*
  2. **Verify Line of Sight (LOS) and Arc**: The target must be within the weapon's firing arc (determined by the Torso Facing set at the end of the Activation Phase) and have clear LOS (unless using a weapon that permits indirect fire).
  3. **Verify Sensor Detection & Lock**: The target must be detected on a spectrum compatible with the weapon (Visual [VIS], Infrared [IR], or Microwave [Radar]). If the target is undetected on that spectrum, the attack cannot be declared.
  4. **Defender's Countermeasures**: Before any location is rolled, the defender resolves any countermeasure it wishes to use.
     - **Countermeasure Check**: if the defender launches a matching cartridge (Flares against IR, Chaff against Radar), or the attack is traced through **Smoke** on Visual, or the target is covered by an active **ECM** suite or an **Adaptive Skin** tuned to this band, the defender rolls **1d6**. On a **4, 5 or 6** the lock fails and the attack is negated entirely; on a **1, 2 or 3** the attacker burns through and the attack continues (see Section 4.2).
     - A launched cartridge is spent either way — roll its Ammo Die afterwards. A sustained suite is never expended.
  5. **Determine Hit Location**: Roll 2d6 on the **Hit Location Table**.
  6. **Roll Damage**: Roll the weapon's damage dice.
  7. **Apply Flank Speed & Cover (Rerolls)**: If the target is **Flank Speed**, the defender **may** force a reroll of one of the attacker's damage dice. If the target is in **Cover**, the defender may force additional rerolls (1 for Light Cover, 2 for Heavy Cover). The defender chooses which dice are rerolled and **may decline any or all of them** — there is no obligation to reroll a die that is already low. The attacker must accept the final results.
  8. **Apply Armor DR**: Compare the final damage total to the target location's current Armor DR.
  9. **Resolve Damage & Armor Degradation**: 
     - If the total damage is **strictly greater** than the Armor DR, the armor is penetrated. The Armor DR of that location is permanently **reduced by 1** (to a minimum of 0).
     - If the total damage is **equal to or less than** the Armor DR, the armor successfully blocks the hit. The location suffers no damage, and its Armor DR does not degrade.
  10. **Cascading Criticals**: If the armor is penetrated, roll 1d6 on the **Critical Hit Table** for that location and mark the slot. If the slot is already marked, cascade upward to the next unmarked slot.
     - **Overkill Margin**: For every **5 points** of damage that exceeds the Armor DR, the attacker rolls an additional 1d6 on the Critical Hit Table (e.g., if total damage is 16 and Armor DR is 5, the excess damage is 11. The attacker rolls the base 1d6, plus 2 extra d6s, applying 3 Critical Hits total).

#### 2.3.1 Combat Examples
- **Example 1 (Direct Laser Fire & Critical Hit)**: During the Combat Phase, the IF-90A-1 "Colossus" (Initiative 3) resolves its attack against the IF-55M-1 "Vanguard" (Initiative 6).
  1. **Weapon Selection**: The Colossus pilot spends 4 EP to fire the **Thermal Lance** mounted on its Left Arm.
  2. **Verify Arc and LOS**: The Vanguard is located within the Colossus's Left Side Arc (Left Arm mount). Line of Sight is clear of blocking terrain.
  3. **Verify Lock**: The Thermal Lance requires an **Infrared (IR)** lock. The Vanguard spent 7 EP this turn — well past the 5 EP threshold — so its heat bloom is plainly visible and the lock holds. *(Had the Vanguard run cold, or had it fired Flares, the Lance could not have been used at all, however much energy the Colossus had.)*
  4. **Defender's Countermeasures**: The Vanguard declines to launch Flares. A cartridge is only a 4+ chance of stopping the shot, its Torso armor is still fresh, and it would rather hold the launcher for a turn when the plate is thin. *(Its Chaff answers a different band entirely and is being saved for the Rail Gun.)* It is not running its ECM this turn either, so no Countermeasure Check is rolled and the attack proceeds.
  5. **Hit Location**: The Colossus rolls 2d6 on the Hit Location Table. The attack came from the Front Hit Zone, so the Front/Rear column is used. The roll is a 7, indicating a **Torso** hit.
  6. **Roll Damage**: The Colossus rolls 3d6 for the Thermal Lance: rolls a 5, 4, 3 (Total 12).
  7. **Apply Flank Speed & Cover**: The Vanguard has **Flank Speed** (having met the 4-hex threshold), granting it one reroll. Seeing a 5 in the attacker's pool, the Vanguard's pilot elects to use it and forces that die to be rerolled. The new roll is a 2. The new damage total is 2, 4, 3 (Total 9). *(Had the Colossus rolled nothing above a 3, the Vanguard would simply have declined the reroll.)*
  8. **Apply Armor DR**: The Vanguard's Torso currently has an Armor DR of 6. The total damage (9) is strictly greater than 6, so the armor is penetrated.
  9. **Resolve Degradation**: The Vanguard's Torso Armor DR is permanently **reduced by 1** (from 6 to 5).
  10. **Check Overkill**: The damage exceeded the Armor DR by 3 (9 − 6). That is less than 5, so no additional Critical dice are earned — this attack rolls one Critical.
  11. **Roll Cascading Critical**: The Colossus rolls 1d6 on the Torso Critical Hit Table. It rolls a **3: Capacitor Leak** — the Vanguard's Capacitor Max drops permanently by 2 and it loses 2 stored EP immediately, which may cost it an Overcharge next turn. The Vanguard marks the '3' slot on its Torso table. *(Had the '3' slot already been marked, the damage would have cascaded upward to the next unmarked slot.)*

### 2.4 End Phase
- **Energy Storage**: Unused EP is moved to the Capacitor, up to the Capacitor Max. Any excess EP is vented and lost.
- **Clean Up**: Remove Flank Speed status from all Frames, and decrement cooldown tokens on weapons.
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
| **Water (Shallow)** | +1 EP | None | Knee-deep liquid. Cannot gain **Flank Speed**. Generates **+1 EP** in Energy Phase. |
| **Water (Deep)** | +2 EP | None | Waist-deep liquid. Cannot gain **Flank Speed**. **-1 penalty** to Pilot Checks. Generates **+2 EP** in Energy Phase. |
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
| **Forced Fall (≥ 2 Levels)** | — | Frame falls **Prone** on landing and takes falling damage (see below). |

#### Falling Damage
Whenever a Frame is forced off a drop of 2 or more Levels, it lands hard:
- **Damage**: Roll **1d6 per Level fallen as a single pooled roll** — a three-level drop is one roll of 3d6, not three separate rolls of 1d6. *(This matters: a lone 1d6 needs a natural 6 to beat even a base Medium Torso, and cannot touch a Heavy or Assault one at all, so resolving each Level separately would make even a catastrophic fall very nearly harmless.)*
- **Location**: Roll **2d6 on the Hit Location Table**, using the **Front / Rear** column — a fall has no facing.
- **Resolution**: The total is tested against that location's **Armor DR normally**, exactly as a weapon hit would be. Flank Speed grants no rerolls against the ground.
- **The Frame lands Prone.**

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
- **Light Cover (1 Reroll)**: Standing in **Light Woods** allows the defending player to choose one of the attacker's damage dice and force a reroll. Rerolls are always optional.
- **Heavy Cover (2 Rerolls)**: Standing in **Heavy Woods** or standing **adjacent to an Urban Building** (when Line of Sight crosses the building's hexside) allows the defending player to choose up to two of the attacker's damage dice and force them to reroll. *(Note: Cover rerolls and Flank Speed rerolls stack — a Frame at Flank Speed in Heavy Cover may force up to 3 rerolls. Rerolls are an allowance, not an obligation: spend as few as you like, and expect diminishing returns once every high die has already been rerolled.)*

#### 2. Concealment & Sensor Lock Blockage (Spectrum Matrix)
If an intervening terrain feature blocks Line of Sight on a specific sensor spectrum, a Frame **cannot declare an attack** using a weapon that requires that spectrum.

| Intervening Terrain Feature | Visual (VIS) Lock | Infrared (IR) Lock | Microwave (Radar) Lock |
| :--- | :---: | :---: | :---: |
| **Light Woods (1 hex)** | Clear | Clear | Clear |
| **Light Woods (2+ hexes)** | **BLOCKED** | Clear | Clear |
| **Heavy Woods (1 hex)** | Clear | Clear | Clear |
| **Heavy Woods (2+ hexes)** | **BLOCKED** | **BLOCKED** | Clear |
| **Urban Building (Any)** | **BLOCKED** | **BLOCKED** | **BLOCKED** |
| **Smoke Template** | **Check 4+** | Clear | Clear |
| **Elevation / Hill (≥ Top Height)** | **BLOCKED** | **BLOCKED** | **BLOCKED** |

*\*Smoke is the one entry here that is not terrain: a Visual lock traced through a Smoke template is contested on a **Countermeasure Check (4+)**, not blocked outright. Woods, buildings and elevation block absolutely.*

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
- **Water (Shallow)**: Generates **+1 extra EP** during the Energy Phase. The Frame cannot gain **Flank Speed** while in shallow water.
- **Water (Deep)**: Generates **+2 extra EP** during the Energy Phase (extreme submerged cooling). Entry costs **+2 EP**, the Frame cannot gain **Flank Speed**, and Pilot Checks take a **-1 penalty**.

---

## 4. Sensors, Stealth, and Detection
> *"All warfare is based on deception." — Sun Tzu*

Because attacks hit automatically if targeted, the tactical battle is won or lost in the **Sensor & Detection** game. A Frame cannot be attacked unless it is detected on at least one sensor spectrum required by the weapon.

### 4.1 The Sensor Suite (Head Location)
Every Frame has a sensor suite consisting of three bands, housed in the Head location, arranged here in order of increasing electromagnetic wavelength:
1. **Visual (VIS)**: Shortest wavelength (approx. 380–700 nm). Housed in high-resolution optical cameras.
   - *Requires*: Direct Line of Sight (blocked by Elevation normally). To lock a target hidden behind solid Elevation, a Frame must receive telemetry via a **Tactical Datalink** from a friendly spotter with clear VIS LOS.
   - *Blocked by*: heavy forests outright; a Smoke template or an Adaptive Skin in Visual mode contests it on a **Countermeasure Check**.
2. **Infrared (IR)**: Medium wavelength (approx. 700 nm–1 mm). Thermal sensors detecting heat signatures.
   - *Requires*: Direct Line of Sight (blocked by Elevation normally), but entirely ignores Woods and Smoke penalties. To lock a target hidden behind solid Elevation, a Frame must receive telemetry via a **Tactical Datalink** from a friendly spotter with clear IR LOS.
   - *Sensitivity*: Targets become visible and targetable on IR for the remainder of the turn the moment they spend their **5th EP** of the turn (cumulatively across the Energy, Activation, or Combat phases). *Skin upkeep paid during the Energy Phase does **not** count toward this total — an Adaptive Skin runs cold by design, and a Frame should never be punished on infrared for buying stealth. Every other expenditure counts: movement, weapons fire, standing up. Running cold means genuinely doing very little, and it is the only way to be invisible to infrared without spending a hardpoint on it.*
   - *Blocked by*: Flares or an Adaptive Skin in Infrared mode, each on a **Countermeasure Check**.
3. **Microwave (Radar)**: Longest wavelength (approx. 1 mm–1 m). Active microwave radio detection.
   - *Requires*: Direct Line of Sight (blocked by Elevation normally), but entirely ignores Woods and Smoke penalties. To lock a target hidden behind solid Elevation, a Frame must receive telemetry via a **Tactical Datalink** from a friendly spotter with clear Radar LOS.
   - *Blocked by*: solid Elevation (Hills/Mountains) outright; Chaff, an active ECM suite or an Adaptive Skin in Microwave mode each contest it on a **Countermeasure Check**.

### 4.2 Stealth & Defensive Countermeasures
Frames can run active systems to deny locks and hide from sensors:

- **The Countermeasure Check**: No countermeasure is a guaranteed save. Whenever a defensive system would deny an attacker's lock, the defender rolls **1d6 before the Hit Location roll**. On a **4, 5 or 6** the lock fails and the attack is negated entirely; on a **1, 2 or 3** the attacker burns through and the attack proceeds as normal. **One number covers every defensive system in the game.** A check is made when:
  - the target launches **Flares** against an Infrared lock, or **Chaff** against a Microwave lock;
  - the attacker's **Visual** line of sight crosses a **Smoke** template;
  - the target is covered by an active **ECM** suite (Microwave) or an **Adaptive Skin** tuned to the attack's band.

  *A failed check does not disable the system.* A sustained suite remains active and is rolled again against the next attack; a launched cartridge is spent whether it worked or not, and its Ammo Die is rolled as normal. Terrain is the exception — woods, buildings and elevation block a spectrum **outright**, with no roll. Only the ground is reliable.

  *What separates the two kinds of system is no longer certainty but cost. Cartridges are free to fire and run dry after roughly six launches; a sustained suite never runs out but bills 2 EP every Energy Phase, turn after turn, whether it is tested or not.*

- **Electronic Countermeasures (ECM)**: Costs **2 EP** to activate in the Energy Phase. Contests Microwave (Radar) detection and locks on the host Frame (0-hex radius) — each attack tested against it requires a **Countermeasure Check**. **Overcharge** [+1 EP per +1 hex radius]. All friendly Frames within the active radius are protected. *(Note: Overcharging triggers the mandatory 1-Turn Cooldown on the ECM suite).*
- **Flares**: (Ammo Die: 1d6, **no EP cost**). Launching flares forces a **Countermeasure Check**; on a **4+** the incoming attack is negated entirely, and on a 1-3 the attacker burns through. The launcher may only be used when **all** of the following are true:
  - The attacker resolved the attack using an **Infrared (IR) lock**. (If the attacker holds multiple lock types, they may hot-swap to an un-negated lock, such as Visual or Radar, to bypass the flare. A defender may launch both Flares and Chaff simultaneously against the same attack to strip multiple lock types).
  - Flares are launched **before** the Hit Location roll.
  The cartridge is spent whether the check succeeded or not. After launching Flares, roll the Ammo Die (1d6). On a **1**, the launcher is empty for the rest of the battle.
- **Chaff Dispensers**: (Ammo Die: 1d6, **no EP cost**). Releasing chaff forces a **Countermeasure Check**; on a **4+** the incoming attack is negated entirely, and on a 1-3 the attacker burns through. The dispenser may only be used when **all** of the following are true:
  - The attacker resolved the attack using a **Microwave (Radar) lock**. (If the attacker holds multiple lock types, they may hot-swap to an un-negated lock, such as Visual or IR, to bypass the chaff. A defender may launch both Flares and Chaff simultaneously against the same attack to strip multiple lock types).
  - Chaff is launched **before** the Hit Location roll.
  The cartridge is spent whether the check succeeded or not. After launching Chaff, roll the Ammo Die (1d6). On a **1**, the dispenser is empty for the rest of the battle.
- **Smoke Launchers**: (Ammo Die: 1d6, **1 EP**). During the Activation Phase, a Frame may spend 1 EP to deploy a Smoke cloud in its current hex, or any of the 6 surrounding adjacent hexes (place a Smoke token). For as long as it remains on the board, any Visual (VIS) lock traced through that hex must survive a **Countermeasure Check** — on a **4+** the lock fails and the attack is negated; on a 1-3 the attacker picks the target out of the murk anyway. Infrared (IR) and Microwave (Radar) sensors are unaffected and scan through smoke unimpeded. After launching Smoke, roll the Ammo Die (1d6). On a **1**, the launcher is empty for the rest of the battle.

> *Why Smoke costs energy and Flares and Chaff do not: Smoke is **proactive**. You deploy it on your own activation, in a hex of your choosing, and you can budget the point of energy for it. Flares and Chaff are **reactive** — fired during an opponent's attack, at a moment you cannot predict, against a lock you did not choose. Charging energy for a reaction would mean the question "can I defend myself?" was settled before you knew who was shooting or with what. The Ammo Die is the whole cost: roughly six charges, and once they are gone they are gone. Since a cartridge is only a **4+** to work and is spent either way, the question is not merely whether **this** attack is worth one — it is whether it is worth one you may well waste.*
- **Adaptive Skin**: Costs **2 EP** to activate in the Energy Phase. The Frame tunes its coating to absorb **one** sensor spectrum (Microwave, IR, or VIS), contesting detection and locks on that spectrum — each attack made on the cloaked band requires a **Countermeasure Check**. **Overcharge**: [+2 EP to cloak a 2nd spectrum simultaneously]. *(Note: Overcharging triggers the mandatory 1-Turn Cooldown, meaning the Adaptive Skin will be completely offline during the following round, leaving the Frame fully exposed on all spectrums).*
- **Pre-Combat System Deployment**: At the start of a battle (during Deployment), Frames equipped with **Adaptive Skin** or **ECM** may choose to deploy with those systems **Active**. The system's base upkeep cost (2 EP for Adaptive Skin, 2 EP for ECM) is automatically deducted from the Frame's generated energy pool during the Round 1 Energy Phase.

### 4.3 Tactical Datalink (Head Location)
A Frame may be equipped with a **Tactical Datalink** housed in its Head location.
- **Shared Targeting Data**: If two or more friendly Frames on a team are equipped with active Tactical Datalinks, they share sensor data in real time. If a target is detected or locked on any sensor spectrum (Visual, Infrared, or Microwave) by *one* of the datalinked Frames, it is instantly considered detected/locked on that spectrum for *all* other active datalinked Frames on the team.
- **Critical Failure**: If a Frame suffers a **Structural Fracture** critical hit to its Head (Head Critical Table, slot 4), or is affected by an EMP warhead, its Tactical Datalink is disabled for the rest of the battle (or until the EMP effect clears), immediately severing that Frame from the shared sensor network.

---

## 5. Weapons & Munitions
> *"God is on the side with the best artillery." — Napoleon Bonaparte*

Weapons can only be mounted in the Left Arm, Right Arm, or Torso, which dictates their firing arcs (see Section 1.3). A hardpoint may mount a weapon or system of its size class or any smaller size class (e.g., a Heavy Hardpoint may mount a Heavy, Medium, or Light weapon). Each location has its own fixed hardpoints — see the Hardpoint Layout Table in Section 7.2.0.

#### Detection Requirements
Every weapon lists the sensor spectrum it needs in order to fire. **A weapon cannot be used at all unless the attacker holds a lock on its required spectrum** — a Frame blinded on that band is holding a dead gun, however much energy it has left.

- **Laser [VIS]**: an optical weapon, aimed down the same cameras it burns through. **Woods blind it outright; Smoke and a Visual-mode Adaptive Skin each contest it on a Countermeasure Check.**
- **Thermal Lance [IR]**: a thermal weapon that tracks its target's own heat bloom. **A target running cold cannot be locked at all; Flares and an Infrared-mode Adaptive Skin each contest it on a Countermeasure Check.**
- **Rail Gun [Radar]**: a hypersonic slug needs precise ranging to lead the target. **Chaff and ECM each contest it on a Countermeasure Check.**
- **Autocannon [Any]**: short-ranged and forgiving, fired over open sights. Any lock will serve.
- **Disruptor Cannon [Radar]**: coupling a pulse into a specific run of actuator wiring takes precise ranging on the target's internal geometry. **Chaff and ECM each contest it on a Countermeasure Check.**
- **Guided Missiles [Guidance]**: whichever band the seeker head was built for (see Section 5.2).

*This is what gives Electronic Warfare its teeth. A countermeasure is no longer a vague inconvenience — it decides which of the enemy's guns can be brought to bear at all. Terrain denies a band **outright** — woods, buildings and elevation are the only reliable blindfolds. Everything else, cartridge or suite alike, contests the lock on a **Countermeasure Check**, roughly halving what that weapon achieves. Either way, choosing which spectrum to attack is a decision about which of the enemy's weapons you most want silenced, and an attacker carrying weapons on two different bands is far harder to disarm than one relying on a single spectrum.*

- **Armor Piercing (AP X)**: Weapons or munitions designated as **AP X** ignore up to **X** points of the target's Armor DR when calculating damage. (For example, an AP 3 weapon fired at a location with Armor DR 5 treats that location's DR as 2).

> *Design note — why heavy weapons roll dice rather than flat damage:* Flank Speed and Cover let a defender force **rerolls**, which can only ever touch dice. A weapon built around a large fixed bonus is therefore invisible to the entire defensive system — no amount of speed or terrain can affect it. This is why the Rail Gun rolls **5d6** rather than 3d6 + 10 for a nearly identical average: the five dice give a defender something to grab, doubling what Flank Speed and Cover are worth against it, while leaving it comfortably the deadliest weapon in the game. Keep this in mind when designing new equipment — **flat damage bonuses are defence-proof, and should be small or absent on anything powerful.**

- **Area of Effect (AoE)**: Damage designated as **AoE** (such as Missile Cluster and Splash damage) blankets a wide area and completely bypasses Flank Speed and Cover. A target attacked by an AoE weapon cannot force the attacker to reroll any damage dice, even if Flank Speed or in Heavy Cover. Armor DR still applies normally.

- **Rapid Fire**: Weapons with this trait saturate the target with high-velocity munitions, ignoring minor evasive maneuvers. When firing a Rapid Fire weapon, the attack completely bypasses **Flank Speed** (the target cannot force rerolls due to movement). However, terrain **Cover** still applies normally. Rapid Fire weapons can be fired in two modes:
  - **Single Burst (Base EP Cost)**: Roll 1 Hit Location. Roll the weapon's burst damage dice (e.g., 3x 1d6) and test each die against the target location's Armor DR separately. 
  - **Full Auto (X × Base EP)**: Pay the base EP cost for each burst fired (up to 3 maximum). Roll 1 Hit Location. Roll the damage dice for *all* bursts combined against that location, testing each separately. Because this burns through ammunition at an incredible rate, the weapon runs **Empty** on an Ammo Die of **1, 2 or 3** instead of just 1 — roughly two Full Auto barrages will exhaust the whole belt.

  **Rapid Fire and Criticals**: Rapid Fire weapons do **not** use the Overkill Margin — individual rounds do not carry enough energy to overpenetrate. Instead, **each Burst that puts at least one die through the armor generates one Critical Hit**. A Single Burst therefore produces at most 1 Critical; a three-Burst Full Auto produces up to 3. However many dice get through, the attack still degrades that location's Armor DR by **1 in total**.

| Weapon | HP | EP Cost | Ammo Die | Damage | Detection | Traits | Special Rules |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **Autocannon** | Light | 1/burst | 1d6 (Explosive) | 3x 1d6 (Burst) | Any | Rapid Fire | Fires 3-round bursts. Each 1d6 resolved separately. Can fire Full Auto. |
| **Laser** | Light | 2 | Infinite | 2d6 | **VIS** | Overcharge | **Overcharge**: [+2 EP per +1d6, up to +2d6]. |
| **Guided Missiles** | Medium | 4 | 1d6 (Explosive) | Warhead Dep. | Guidance Dep. | AoE | Requires Lock. Permits indirect fire (no LOS). Cannot be reloaded if Ammo Die fails. |
| **Disruptor Cannon** | Medium | 3 | Infinite | None | **Radar** | Overcharge | Deals no damage (ignores Armor DR and Flank Speed; still needs LOS and a lock). See hit effects. Always forces 1 Crit **and** drains 1d6 EP. **Overcharge**: [+2 EP to force a second Crit]. |
| **Thermal Lance** | Heavy | 4 | Infinite | 3d6 | **IR** | Overcharge | **Overcharge**: [+2 EP per +1d6, up to +2d6]. |
| **Rail Gun** | Heavy | 0 (+6) | Infinite (Inert) | 5d6 | **Radar** | AP 3, Overcharge | Inert slugs. **Requires Overcharge to fire**: [+6 EP, which must come from the Capacitor]. Because firing always involves an Overcharge, the Rail Gun always enters a 1-Turn Cooldown. |

### 5.0 Weapon Resolution Notes

#### The Ammo Die (Depletion Roll)
Instead of tracking individual bullets or missiles, *Iron Protocol* uses a Usage Die mechanic called the **Ammo Die**. 
Whenever a Frame resolves an attack using a weapon that lists an Ammo Die (such as the Autocannon or Guided Missiles), the attacker rolls the specified die (usually 1d6) immediately after the attack resolves. 
Every system that carries an Ammo Die runs out the same way — nothing is reloaded in the field. Only the depletion number differs, reflecting how much of the magazine each shot consumes:

| System | Runs **Empty** on | Expect roughly |
| :--- | :---: | :--- |
| **Autocannon** — Single Burst | 1 | 6 attacks |
| **Autocannon** — Full Auto (3 bursts) | 1, 2 or 3 | 2 attacks |
| **Guided Missiles** | 1 or 2 | 3 salvos |
| **Flares / Chaff / Smoke** | 1 | 6 uses |
| **Jump Jet propellant** | 1 or 2 | 3 jumps |

- **Roll above the number**: plenty remaining; fire again next turn.
- **Roll at or below it**: the last rounds are gone. That weapon or launcher is **Empty for the rest of the battle**.

*Note that an Autocannon spends the same magazine — about six bursts — however you fire it. Full Auto simply burns it three at a time, trading the whole belt for two devastating barrages instead of six measured ones.*

*Running dry is not purely a loss. The Torso **Ammo Explosion** critical only detonates if a volatile store remains aboard (see Section 6.2) — live shells, loaded warheads, or jump propellant still in the tanks. A Frame that has shot itself dry and burned off its thruster fuel can no longer cook off at all. Late in a battle, an empty gun is also a safer one, and a scout that has spent its jumps is harder to kill outright than one still carrying a full propellant load.*

Several weapons resolve differently from the standard damage sequence. Their full behavior is given here rather than only on the frame sheets.

#### Disruptor Cannon Hit Effects
The Disruptor Cannon deals **no damage**. It fires a tightly focused electromagnetic pulse that couples directly into a Frame's actuator wiring and control runs, inducing currents in the machine rather than punching through it. **Armor DR and Flank Speed are irrelevant** — plating it does not need to breach, and a moving target is no harder to flood than a stationary one. It still requires line of sight, an arc and a **Microwave (Radar) lock** like any other weapon: a hill between you and the target stops it exactly as it stops everything else. Chaff, an active ECM suite and an Adaptive Skin in Microwave mode do not stop it outright, but each contests every shot on a **Countermeasure Check**. On **any** hit, resolve both of the following:
- **Actuator Burnout**: Roll **1d6 immediately on the Critical Hit Table of the location rolled** and apply the result. This critical occurs even though the armor was never penetrated.
- **Power Bus Surge**: The target immediately **loses 1d6 EP** from its current energy pool (to a minimum of 0).
- **Overcharge [+2 EP]**: The pulse is sustained. Force a **second Critical Hit** on the same location — which, under Cascading Failure, will climb to the next unmarked slot.

*The Disruptor produces fewer criticals than a comparable gun, and it can never breach a location by itself. What it offers is certainty **once it has its lock**: against a fast Frame in heavy cover behind thick plate — a target every other weapon struggles to touch — neither armor nor speed nor terrain cover reduces the effect by one point. That certainty is bought on the Microwave band, and it is the band most easily contested: Chaff and ECM each force a Countermeasure Check on every shot. It is a weapon that either works completely or not at all.*

Because the Disruptor ignores Armor DR rather than defeating it, it never degrades armor — a location's DR is untouched no matter how often it is hit. It cannot, by itself, destroy a Frame except through a Critical Hit result that does so.

#### Rapid Fire and Armor Degradation
When a Rapid Fire weapon is fired:
- **Every damage die is tested against the Armor DR the location had when the attack was declared.** Do not re-apply degradation between dice of the same attack.
- **The attack degrades that location's Armor DR by 1 in total** if *any* die penetrated, no matter how many got through. A burst is a single penetration event.
- **Each Burst that put at least one die through generates one Critical Hit** — not one per die, and not one per attack. A Single Burst yields at most 1 Critical; a three-Burst Full Auto yields up to 3.
- **Rapid Fire never uses the Overkill Margin.** Individual rounds do not carry enough energy to overpenetrate; volume of fire is represented by the number of Bursts instead.

#### Full Auto Limit
A single Full Auto attack may fire a **maximum of 3 Bursts**. Firing more than one Burst still rolls a single Hit Location for the whole barrage.

#### Prone Damage Penalty
The Prone state's **-1d6 penalty** removes one die from the weapon's damage pool, to a minimum of 1d6:
- **Dice-plus-flat weapons** lose one die but keep any flat bonus intact.
- **Rapid Fire weapons** lose one die from *each* Burst fired (an Autocannon burst becomes 2x 1d6).
- **Weapons that roll no damage dice** (the Disruptor Cannon, EMP warheads) are unaffected.

### 5.1 Autocannon Munitions
When equipping an Autocannon, players must select a single ammunition type to load into its magazine at build time.
- **Armor Piercing (AP 1)**: The dense kinetic penetrator ignores up to 1 point of the target's Armor DR per hit (treat the target's DR as 1 lower than it actually is for this attack).
- **High Explosive Incendiary (HEI)**: The warhead is designed to ignite internals. Adds a flat **+1 modifier** to any Critical Hit rolls caused by this weapon. *(For example, if you penetrate armor and roll a 5 on the 1d6 Crit Table, it becomes a 6).*

### 5.2 Guided Missile Systems
Missiles must be configured with a guidance package and a warhead at build time:
- **Guidance Systems**:
  - *Microwave (Radar)-Guided*: Permits indirect fire (ignoring Elevation/LOS blocks). Requires a Microwave (Radar) lock (which must be provided by a Tactical Datalink spotter if the firing Frame lacks direct LOS). Chaff, an active ECM suite and a Microwave-mode **Adaptive Skin** each contest the lock on a Countermeasure Check.
  - *Infrared (IR)-Guided*: Permits indirect fire (ignoring Elevation/LOS blocks). Requires an Infrared (IR) lock (which must be provided by a Tactical Datalink spotter if the firing Frame lacks direct LOS). Target must have spent 5+ EP this turn. Flares and an Infrared-mode **Adaptive Skin** each contest the lock on a Countermeasure Check.
  - *Visual (VIS)-Guided*: Permits indirect fire (ignoring Elevation/LOS blocks, utilizing onboard optical cameras during terminal descent). Requires a Visual (VIS) lock (which must be provided by a Tactical Datalink spotter if the firing Frame lacks direct LOS). Smoke and a Visual-mode **Adaptive Skin** each contest the lock on a Countermeasure Check.
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
> * **Damage Overcharges Add Dice**: Where an Overcharge increases a weapon's damage, it does so at a flat rate of **2 EP per additional damage die, to a maximum of +2d6**. Never a fixed bonus — see the design note in Section 5: a flat increase would sit outside the reroll system entirely, letting an overcharged shot ignore Flank Speed and Cover.
> *(Example: A pilot overcharges their Thermal Lance. They spend 4 base EP + 4 overcharge EP = 8 EP total, rolling **5d6** instead of the usual 3d6. The weapon then enters a 1-Turn Cooldown and cannot be fired next round).*

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

*\*Torso (Core Critical): The shot slips through a structural gap into the center mass. **Treat the Torso's Armor DR as 0 for this entire attack** — it penetrates automatically, Torso DR is permanently reduced by 1, and the Overkill Margin is measured against 0 rather than the Frame's real armor. A heavy weapon that finds the core will therefore land several Critical Hits at once.*  
*\*\*Head (Sensors): Contains the cockpit and Sensor Suite. Critical hits on the Head are highly dangerous and can stun or blind the Frame.*

### 6.2 Critical Hit Tables (1d6 Cascading)
If damage penetrates the Armor DR of a location, roll 1d6 on the corresponding table. Mark the slot on your Frame's profile. 
- **Overkill Margin**: For every **5 points** of damage that exceeds the Armor DR, roll an additional 1d6 on the Critical Hit Table.
- **Cascading Failure**: If you roll a number on the Crit Table that has already been marked, the damage cascades upward to the next highest available (unmarked) number. (Remember: HEI ammo adds a flat +1 modifier to these rolls. If a modified roll or cascade exceeds the highest slot on the table, apply that maximum effect).

#### The Severity Ladder
Every table climbs the same six rungs, so a result of the same number means the same *kind* of damage wherever it lands:

| Tier | Meaning |
| :---: | :--- |
| **1** | **Temporary Glitch** — a minor penalty that fades after next turn. |
| **2** | **System Strain** — a permanent increase to that location's EP costs. |
| **3** | **Performance Degradation** — a permanent loss of capacity or speed. |
| **4** | **Structural Fracture** — that location's Armor DR is reduced to **0**. |
| **5** | **Component Loss** — weapons, thrusters, sensors or reactor output are destroyed. |
| **6** | **Catastrophic Destruction** — ammo detonations, severed limbs, core melts. |

The Head table stops at 5, because a cockpit hit that reaches the top kills the pilot outright — there is no Component Loss rung to climb. The Torso runs two rungs *past* 6, because it is the largest and most frequently struck location; slots 7 and 8 cannot be reached by a natural 1d6 and are entered only by cascade or by HEI's +1 modifier.

#### Head (Cockpit) Critical Table
- **1: Sensor Ghosting**. Feedback floods the optics. The Frame immediately drops all currently held target locks and cannot establish new ones until the end of its next activation.
- **2: Sensor Calibration Drift**. The suite will no longer hold alignment. The Frame must spend **1 EP during each Energy Phase**; if it does not, it cannot establish any locks that turn.
- **3: Sensor Array Destroyed**. One sensor band burns out. Roll **1d6**: on a **1–2** the Thermal (IR) array, on a **3–4** the Optical (VIS) array, on a **5–6** the Microwave (Radar) array. That band is permanently destroyed and the Frame can never again establish locks on it.
- **4: Structural Fracture**. Head Armor DR is permanently reduced to **0**. The sensor mast is torn open, and the **Tactical Datalink is severed** — the Frame can no longer share or receive targeting telemetry.
- **5+: Pilot K.O. / Frame Shutdown**. The Frame is permanently disabled and out of combat.

#### Torso (Core) Critical Table
- **1: System Glitch**. The Frame generates 1 less EP *next turn*.
- **2: Servo Lock**. Torso Twists cost 2 EP (no longer free).
- **3: Capacitor Leak**. Capacitor Max is permanently reduced by 2; lose 2 stored EP immediately.
- **4: Structural Fracture**. Torso Armor DR is permanently reduced to **0**.
- **5: Reactor Damage**. Reactor output is permanently reduced by 2 EP per turn.
- **6: Ammo Explosion**. If the Frame has any volatile store remaining — a weapon using an **Explosive Ammo Die** (Autocannons or Guided Missiles) that is not yet Empty, **or Jump Jet propellant that has not run dry** — it detonates. That weapon is permanently **Empty** for the rest of the battle, and the Frame immediately suffers **2 additional Critical Hits** to the Torso. Inert ammunition (Rail Gun slugs) and energy weapons do **not** trigger this effect.
  - *This slot is always marked, whatever the Frame is carrying.* If it has no explosive ammunition remaining — because it never carried any, or because those weapons are already Empty — there is nothing to cook off: apply **Reactor Damage** instead (−2 EP per turn, cumulative with any Reactor Damage already suffered).
- **7: Electrical Fire**. During each **End Phase**, the Frame automatically suffers **1 Torso Critical Hit**. During its Activation, the Frame may spend **3 EP** and roll 1d6; on a **4+** the fire is smothered and this effect ends. A Frame that ends its Activation in **Water (Shallow or Deep)** extinguishes it automatically, with no EP cost or roll. The slot remains marked either way.
- **8+: Containment Failure**. Magnetic containment collapses. The fusion reaction itself quenches harmlessly — but the Capacitor bank dumps its entire stored charge through a ruptured chassis, and the coolant loop flashes to vapour. Deal **2d6 damage to all adjacent hexes** and the Frame is destroyed immediately.

#### Arms (Weapons & Actuators) Critical Table
- **1: Targeting Jitter**. Weapons mounted in this arm suffer a -1 damage penalty on their next attack.
- **2: Actuator Strain**. Weapons mounted in this arm cost +1 EP to fire.
- **3: Hardpoint Failure**. All attacks made with weapons in this arm permanently roll 1 fewer damage die (to a minimum of 1). *(As with the Prone penalty, a Rapid Fire weapon loses one die from **each** Burst — an Autocannon burst becomes 2x 1d6.)*
- **4: Structural Fracture**. This arm's Armor DR is permanently reduced to **0**.
- **5: Weapon Destroyed**. The weapon mounted in this arm is destroyed outright — mount, feed and all. Because each arm carries a single hardpoint (see Section 7.2.0), this silences the arm completely without severing it. If the arm was empty, the slot is simply marked and nothing is lost.
- **6+: Arm Severed**. The arm is completely destroyed. All weapons and systems mounted in this arm are lost.

#### Legs (Mobility) Critical Table
- **1: Servo Stutter**. The leg drags. The Frame's Movement Limit is reduced by 2 hexes until the end of its next activation.
- **2: Knee Lock**. Walking and reversing cost +1 EP per hex.
- **3: Hip Actuator**. The Frame's Movement Limit is permanently reduced by 2 hexes. *(A Frame whose Movement Limit falls below the Flank Speed Threshold can no longer gain Flank Speed at all.)*
- **4: Structural Fracture**. This leg's Armor DR is permanently reduced to **0**.
- **5: Actuator Destroyed**. The leg's drive assembly fails. The Frame immediately falls **Prone**, and from now on may only Stand Up by spending **3 EP** and passing a **Pilot Check**, exactly as a Frame with a severed leg (see Section 6.5.4). It also **can no longer jump** — the thrusters may be intact, but a Frame launches and lands on its legs, and these will no longer take the load.
- **6+: Leg Severed**. The leg is destroyed outright. The Frame falls Prone immediately and is permanently crippled (see Section 6.5.4). It may fight on, and may attempt to haul itself upright, but it will never walk again.

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
| Fighting on a **severed Leg** | −2 |

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
- **Defense**: A Prone Frame cannot gain **Flank Speed**, and it cannot force rerolls from Flank Speed. It still benefits from damage rerolls granted by Terrain Cover.
- **Combat**: A Prone Frame cannot torso twist and suffers a **-1d6 penalty to all weapon damage rolls** (minimum of 1d6 rolled).
- **Maneuvering**: A Prone Frame cannot walk, reverse, or jump. Its only movement options are:
  - **Stand Up**: Costs **3 EP** during its Activation Phase. Upon standing, the pilot removes the Prone token and may set the Leg Facing to any direction for free. A Frame with both legs intact stands automatically; a Frame with a **severed leg** must pass a Pilot Check to rise (see Section 6.5.4), and spends the 3 EP whether it succeeds or not.
  - **Pivot**: While Prone, the Frame may crawl-turn, pivoting its Leg Facing by 60 degrees. Cost: **2 EP** per 60 degrees (**3 EP** if a leg has been severed).

### 6.5 Location Destruction & Damage Transfer
A location is destroyed when the **top slot of its own table** is marked, whether rolled directly or reached by cascade. That slot differs by location: the **Head at 5**, the **Torso at 8**, and an **Arm or Leg at 6**. (Torso slot 6 is an Ammo Explosion, which is survivable — it is not the destruction rung.) Any subsequent hits to a destroyed location are handled using the following rules:

#### 6.5.1 Torso Destruction
If the Torso is destroyed, the engine core is breached. The Frame is completely destroyed.
*   **Containment Failure**: The Capacitor bank discharges through the wreck as the coolant loop lets go. All units in adjacent hexes suffer **2d6 damage** (apply Flank Speed and Armor DR normally).

#### 6.5.2 Head Destruction
If the Head is destroyed, the cockpit is vaporized or crushed, and the pilot is killed. The Frame is immediately deactivated and treated as destroyed.

#### 6.5.3 Arm Destruction (Left or Right)
If an Arm is destroyed, it is severed and blown off.
*   **Equipment Loss**: All weapons and systems mounted in that arm are permanently destroyed and lost.

#### 6.5.4 Leg Destruction (Left or Right)
If a Leg is destroyed, it is blown off.
*   **Immediate Fall**: The Frame immediately falls **Prone**. No Pilot Check is permitted; the limb is gone and no amount of skill keeps the machine upright.
*   **Fighting From the Ground**: A crippled Frame is not out of the battle. It may still fire every weapon it has, subject to the standard Prone penalties in Section 6.4.
*   **Hauling Itself Upright**: A Frame with one severed leg **may attempt to Stand Up**, balancing on its remaining leg and gyro. This costs the usual **3 EP** and requires a **Pilot Check**, taken at the standing **−2 penalty a severed leg imposes on every check** (see Section 6.4) — an unaided pilot succeeds a little over 40% of the time, so getting a crippled Frame back on its foot is a real gamble, and an ace's bonus is worth a great deal here:
    - *Success (6+)*: The Frame rises. It is standing, and immediately sheds every Prone penalty — it regains its full damage dice and may torso twist again. Set its Leg Facing to any direction for free.
    - *Failure (< 6)*: The Frame slips back down. The 3 EP is spent regardless, and it may try again on a later activation.
    - A standing crippled Frame that is knocked down again (by a collision, a Drop Strike, or a second leg wound) must repeat the attempt.
*   **Crippled Movement**: Standing or prone, the Frame is permanently crippled and can **never walk, reverse, or jump** again. Its only movement is to pivot its Leg Facing at a cost of **3 EP** per 60 degrees.
*   **Double Leg Loss**: If both legs are destroyed, the Frame is completely disabled (treated as destroyed). A machine with nothing to stand on cannot fight.

> *Design note: a severed leg is a crippling wound, not a death sentence. A one-legged Paladin that gets itself upright is still a Rail Gun platform that can traverse its torso and track targets — dangerous to approach, trivial to walk away from. Deciding whether to spend 3 EP and a Pilot Check on standing, or to stay down and keep shooting at a penalty, is the pilot's problem.*

#### 6.5.5 Damage Transfer (Blow-Through)
If an attack hits a location that has already been destroyed (e.g. a random hit location rolls a severed Arm or Leg), the hit is not wasted:
*   The damage transfers directly to the **Torso**. Resolve the attack against the Torso's current Armor DR exactly as if you had rolled a Torso hit normally.
*   Because the attack travels inward through structural gaps to strike the center mass, the target cannot force the attacker to reroll damage dice using **Flank Speed** (terrain Cover rerolls still apply).
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

| Chassis Class | Tonnage | Base Stats (Init / Move / Reactor / Capacitor) | Maximum Mobility Limits (Init / Move) | Base Cost |
| :--- | :---: | :--- | :--- | :--- |
| **Light** | 20–35 Tons | Init 8 \| Move 5 \| Reactor 6 \| Capacitor 2 | Init 12 \| Move 7 | 180 pts |
| **Medium** | 40–55 Tons | Init 6 \| Move 4 \| Reactor 6 \| Capacitor 2 | Init 10 \| Move 5 | 230 pts |
| **Heavy** | 60–75 Tons | Init 4 \| Move 3 \| Reactor 5 \| Capacitor 2 | Init 6 \| Move 4 | 280 pts |
| **Assault** | 80–100 Tons | Init 2 \| Move 2 \| Reactor 5 \| Capacitor 2 | Init 4 \| Move 3 | 330 pts |

#### 7.2.0 Hardpoints & Mounting

Hardpoints are **fixed to a location**, not drawn from a shared pool. A Frame's chassis determines how many hardpoints each location has and what size each one is, and equipment must physically fit where it is bolted. This is what makes locational damage matter: blowing an arm off a Frame destroys whatever was mounted *there*, not a generic slot from a pile.

**Hardpoint Layout Table:**

| Chassis Class | Head | Torso | Left Arm | Right Arm |
| :--- | :---: | :---: | :---: | :---: |
| **Light** | 1 Light | 2 Light | 1 Light | 1 Light |
| **Medium** | 1 Light | 1 Medium + 2 Light | 1 Medium | 1 Medium |
| **Heavy** | 1 Light | 1 Medium + 3 Light | 1 Heavy | 1 Heavy |
| **Assault** | 1 Light | 2 Medium + 3 Light | 1 Heavy | 1 Heavy |

*The **Legs carry no hardpoints**. They are drive assemblies and load-bearing structure, not mounting surfaces — which is why a Frame's every system is lost with its Torso or an Arm, and never with a leg.*

**Mounting Rules:**
- **Size**: A hardpoint accepts equipment of its own size or smaller. A Heavy hardpoint may carry a Heavy, Medium or Light weapon; a Light hardpoint may carry only Light equipment. Nothing may be mounted in a hardpoint smaller than itself, and no Frame may mount equipment heavier than its own weight class.
- **Arms carry weapons only.** An arm's single hardpoint is its gun mount. This is why arms are the only locations that can engage a target on the Frame's flank (see Section 1.3), and why severing one silences exactly one weapon.
- **The Torso carries weapons and systems.** Defensive launchers, electronic warfare suites and Jump Jet thrusters and tankage all live there — which is why a Frame's utility loadout and its Ammo Explosion risk sit in the same box.
- **The Head carries one Light system.** The sensor suite itself is built into every chassis and costs no hardpoint; the slot is almost always spent on a Tactical Datalink.
- **Empty hardpoints are free.** A Frame is never obliged to fill its layout, and unused hardpoints cost no points.

*Note that the heavier chassis do not simply get "more of everything" — they trade breadth for calibre. A Medium has three Light hardpoints across its hull and a Medium mount on each arm; a Heavy gives up nothing but gains Heavy arm mounts and a fourth Torso slot. An Assault frame's advantage over a Heavy is a second Medium Torso hardpoint, not a bigger gun.*

#### 7.2.1 Base Armor DR
When purchasing a Base Chassis, it comes pre-equipped with a baseline **Armor Damage Reduction (DR)** for every location, scaled to its physical Weight Class. Armor DR is a Frame's only durability stat: it is the threshold an attack must exceed to penetrate, it erodes by 1 with every penetration, and once a location reaches 0 it is opened to a Critical Hit from every hit that lands there.

*A note on light weapons: against fresh plate on a Heavy or Assault chassis, a single Autocannon die or a missile splash simply cannot exceed the threshold, and will bounce every time. This is intended. Armor erodes, so a location that is impervious on the opening turn becomes vulnerable once a Thermal Lance or Rail Gun has opened it up — light weapons are finishers and flank threats, not can-openers. Check a target's remaining DR before deciding a burst is wasted.*

**Base Armor DR & Maximum Caps:**

| Chassis Class | Head | Torso | Arms [L/R] | Legs [L/R] | Max Armor DR Cap (Head / Torso / Arms / Legs) |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Light (20–35T)** | 3 DR | 3 DR | 2 DR | 3 DR | 4 / 4 / 3 / 4 DR |
| **Medium (40–55T)** | 4 DR | 5 DR | 3 DR | 4 DR | 5 / 6 / 4 / 5 DR |
| **Heavy (60–75T)** | 5 DR | 7 DR | 5 DR | 6 DR | 6 / 8 / 6 / 7 DR |
| **Assault (80–100T)** | 5 DR | 8 DR | 6 DR | 7 DR | 6 / 9 / 7 / 8 DR |

#### 7.2.2 Engine, Mobility & Armor Upgrades
Upgrading a Frame's chassis above its Base Stats **does not increase its Tonnage**. A 45-ton Frame remains exactly 45 tons, meaning its physical armor capacity and weapon mounting slots remain those of a Medium frame.

Mobility stats (Init/Move) and Armor DR are strictly bound by the Limits and Caps of the Frame's weight class. However, Reactor and Capacitor upgrades have **no limits**, allowing Heavy and Assault frames to purchase massive power plants to fuel heavy weaponry.

- **Initiative Upgrade**: +15 pts per +1 Initiative (Up to Chassis Limit)
- **Movement Upgrade**: +20 pts per +1 Move (Up to Chassis Limit.)
- **Armor DR Upgrade**: +5 pts per +1 Armor DR to any single location (Up to Max Armor DR Cap)
- **Reactor Upgrade**: +10 pts per +1 EP generated (No Limit)
- **Capacitor Upgrade**: +5 pts per +1 EP capacity (No Limit)

*Example: Constructing a 45-ton stealth striker (like the Specter). You pay 230 pts for the Medium Base Chassis (granting Head 4 DR, Torso 5 DR, Arms 3 DR, Legs 4 DR, and a hardpoint layout of Head 1L / Torso 1M+2L / one Medium mount per arm). You purchase Init+4 (60 pts), Move+1 (20 pts), Reactor+3 (30 pts), and Capacitor+2 (10 pts). The bare chassis costs 350 pts total. Adding Adaptive Skin (30 pts, Torso Medium), Tactical Datalink (15 pts, Head), Laser (15 pts, Left Arm) and a Disruptor Cannon (25 pts, Right Arm) brings the final cost to 435 pts — leaving both Light Torso hardpoints empty for a launcher or two.*

#### 7.2.3 Countermeasures & Active Systems
- **Smoke Launcher** [Light]: 10 pts
- **Flare Launcher** [Light]: 15 pts
- **Chaff Dispenser** [Light]: 15 pts
- **Tactical Datalink** [Light]: 15 pts
- **Jump Jets (Light/Medium only, mounts in the Torso; Ammo Die 1d6, Empty on 1-2)** [Light]: 20 pts
- **Electronic Countermeasures (ECM)** [Medium]: 25 pts
- **Adaptive Skin** [Medium]: 30 pts

#### 7.2.4 Weapons & Armaments
- **Autocannon** [Light]: 10 pts
- **Laser** [Light]: 15 pts
- **Guided Missiles** [Medium]: 20 pts
- **Disruptor Cannon** [Medium]: 25 pts
- **Thermal Lance** [Heavy]: 30 pts
- **Rail Gun** [Heavy]: 35 pts

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
  *A ghost on the battlefield, Lyra operates deep behind enemy lines for the Sovereign Coalition. She pilots electronic warfare frames sheathed in Adaptive Skin, tuning it band by band to whichever sensor her quarry is leaning on. Rather than engaging in chaotic brawls, she relies on surgical precision, dismantling a target's mobility and weapon systems limb-by-limb before delivering the killing blow.*  
  - **Initiative Bonus**: +3  
  - **Sworn Vow**: Vow of Mercy (Jin)  
  - **Point Cost**: 45 pts

#### 7.3.2 Initiative & Pilot Check Bonus
Equipping a Named Pilot on an Iron Frame grants a flat Initiative bonus of **+1, +2, or +3** (declared at build time). This represents their tactical foresight and combat reflexes.

A Named Pilot's bonus is applied **after** the chassis Initiative limits in Section 7.2, and may exceed them — that is the point of an ace. A Heavy chassis capped at Initiative 6 may therefore reach Initiative 9 with a +3 pilot, and there is no upper ceiling on the resulting figure.

> *Buyer's note: Initiative is only ever compared, never looked up on a table, so its value is entirely **positional**. A Frame that already acts first in the order gains nothing further from a higher number. Putting a +3 ace in a Frame that is comfortably the fastest thing on the field buys you the Pilot Check bonus and very little else — and the Pilot Check bonus alone is worth having, since it lifts a 2d6 check against TN 6 from 72% to 97%. If that is all you want, a **+1 pilot at 15 pts** delivers most of it for a third of the cost.*
- **Pilot Checks**: In addition to modifying the Frame's Initiative, the Named Pilot adds their Initiative bonus (+1, +2, or +3) as a flat modifier to all **Pilot Checks** (to avoid falling Prone). If the pilot is dishonored, they immediately lose this bonus as well.
- **Point Cost (Optional)**: If playing with the optional point rules (see Section 7.1), Named Pilots cost points based on their Initiative bonus:
  - **+1 Initiative & Pilot Checks**: 15 pts
  - **+2 Initiative & Pilot Checks**: 30 pts
  - **+3 Initiative & Pilot Checks**: 45 pts

#### 7.3.3 Iron Protocol Vows
Every Named Pilot is sworn to a specific vow under the Iron Protocol, reflecting their martial pride. A vow is a bargain: it binds the pilot to a way of fighting, and in exchange the discipline of that focus makes them formidably good at it.

- **The Boon**: While the pilot remains honorable, they enjoy the vow's listed benefit.
- **Dishonor**: If a pilot violates their vow during a battle, they are **dishonored**. They immediately lose their Initiative bonus, lose their Pilot Check bonus, **lose the vow's Boon**, and all their weapons cost +1 EP to fire for the remainder of the battle.

*Choose one Vow for your Named Pilot. Note that several vows cost a particular Frame nothing at all — a pilot who never carries a Smoke Launcher gives up little by swearing the Vow of Honesty. That is deliberate. The Boons are calibrated to the vow, not to your loadout, so the honest way to build a pilot is to swear the vow that matches how the Frame already fights, and then be held to it.*

##### Vow of Courage (Yuu)
*“The warrior does not retreat; we are the anvil upon which the enemy breaks.”*
- **The Constraint**: The pilot cannot use the **Reverse (R)** movement command.
- **The Boon**: A pilot who has never learned to give ground has learned instead how to absorb a blow — and how to get back up. Gain **+2 to every Pilot Check made to stay on your feet or to rise back onto them**: collisions, Drop Strikes, hazardous landings, and hauling a crippled Frame upright on a severed leg alike. *(It does not apply to the Pilot Check for shaking off an EMP — that is a matter of sensors, not footing.)*
- **Dishonor Penalty**: The pilot is dishonored (see standard penalty).

##### Vow of Respect (Rei)
*“A warrior meets their foe face-to-face. Anonymous death from behind is the weapon of cowards.”*
- **The Constraint**: The pilot cannot target an enemy Frame from its **Rear Hit Zone**, nor fire indirect-guided missiles without direct Line of Sight (even if a Tactical Datalink is active).
- **The Boon**: All that practice at the honest angle pays. Gain **+1 to Critical Hit rolls** made against a target struck in its **Front Hit Zone**.
- **Dishonor Penalty**: The pilot is dishonored (see standard penalty).

##### Vow of Honor (Meiyo)
*“Seek only the strongest. There is no glory in crushing the weak.”*
- **The Constraint**: If an enemy Frame of higher Initiative or higher tonnage is detected and lies within **any firing arc in which this Frame could bring a weapon to bear**, the pilot **must** target that worthier Frame rather than any lesser one. (If both a higher-tonnage and a higher-Initiative target are available, the pilot may choose between them, but may not fire on a target inferior in *both* categories.)
- **The Boon**: The pilot rises to meet a superior foe. When attacking a Frame of **higher tonnage or higher Initiative**, roll **one additional damage die**.
- **Dishonor Penalty**: The pilot is dishonored (see standard penalty).

##### Vow of Mercy (Jin)
*“Victory is in the disarm, not the slaughter. A dead enemy learns nothing.”*
- **The Constraint**: Hit locations are rolled, not chosen, so this vow governs what the pilot does with the roll. While the target Frame still has **all four** of its Arms and Legs intact, a Mercy pilot who rolls a **Head or Torso** result against it must **pull that shot**: it inflicts nothing — no damage, no Armor DR degradation, no Critical Hit, and no Disruptor EP drain — though the EP and ammunition are still spent. The pilot must land a crippling blow before going for the kill: **once any one of the target's limbs has been destroyed, its core may be struck freely.**
  - **Multi-location attacks are resolved one location at a time.** A Cluster salvo rolls three locations and an HE warhead splashes into every adjacent one; each Head or Torso result among them is pulled individually, while the limb results resolve normally. A Mercy pilot's opening cluster strips a Frame's arms and legs while leaving its cockpit untouched — and the moment one of those limbs comes off, the rest of the salvo may go wherever it lands.
- **The Boon**: A lifetime spent dismantling machines rather than destroying them. Gain **+1 to Critical Hit rolls** made against **Arms and Legs**.
- **Breaking the Vow**: Choosing to resolve a Head or Torso result normally while the target still has **all four** limbs intact dishonors the pilot.
- **Dishonor Penalty**: The pilot is dishonored (see standard penalty).

##### Vow of Honesty (Makoto)
*“Deception is a crutch. I will stand in the light and let them witness their end.”*
- **The Constraint**: The pilot may not use **any system whose purpose is to deceive a sensor** — an Adaptive Skin, Smoke Launcher, Flare Launcher or Chaff Dispenser — nor may they activate ECM, nor benefit from the umbrella of allied ECM or Smoke. *An allied ECM bubble does not switch off around them — instead, an honest pilot's Frame is simply always considered detectable on the Microwave (Radar) spectrum while inside it, and enemies may always establish Visual locks through allied Smoke to reach them.*
- **The Boon**: A pilot who has never hidden has spent that time learning to see. **No sustained jamming suite functions against this pilot's locks.** Neither an enemy **Adaptive Skin** nor an **ECM** umbrella forces a Countermeasure Check against their attacks — they may target a Frame on any spectrum its Skin is suppressing or its ECM is contesting, as though the system were switched off. *(Chaff, Flares and Smoke are physical countermeasures, not jamming, and still force their Countermeasure Check against this pilot normally.)*
- **Dishonor Penalty**: The pilot is dishonored (see standard penalty).

##### Vow of Loyalty (Chuugi)
*“My shield is the wall that protects my kin. I will fall before they do.”*
- **The Constraint**: If a friendly Frame within 3 hexes has more marked Critical Hit slots than the pilot, the pilot cannot move further away from that ally.
- **The Boon**: The pilot fights to interpose, drawing fire and breaking up firing lines. Any **friendly Frame within 3 hexes** may force **one additional damage reroll** against attacks made upon it, exactly as though it had gained one further step of Cover.
- **Dishonor Penalty**: The pilot is dishonored (see standard penalty).

---

## 8. Iron Frame Roster
> *"Battles are won by slaughter and maneuver. The greater the general, the more he contributes in maneuver, the less he demands in slaughter." — Winston Churchill*

Here are five pre-configured Iron Frames ready for combat.

### 8.1 IF-25L-1 "Jackal" (Light Recon Frame)
![IF-25L-1 "Jackal" Technical Sketch](images/if_25l_1_jackal.jpg)

*A fragile but blisteringly fast scout frame. It relies on its speed, Flank Speed and jump jets to outmaneuver heavier foes, darting in to deliver surgical strikes before leaping to safety.*
- **Initiative**: 12
- **Chassis Mass (Tonnage)**: 25 Tons (Light, Mass Value 1)
- **Point Value**: 365 points
- **Reactor Rating**: 8 EP/turn
- **Capacitor Max**: 3 EP
- **Movement Limit**: 7 hexes
- **Armor DR by Location**: Head: 3 | Torso: 3 | Left Arm: 2 | Right Arm: 2 | Each Leg: 3
- **Equipped Systems**:
  - Standard Sensor Suite (Visual [VIS]/Infrared [IR]/Microwave [Radar])
  - Jump Jets [Torso, Light HP]
  - Tactical Datalink [Light HP]
- **Equipped Weapons**:
  - **Left Arm** [Light HP]: Laser (2d6 damage)
  - **Right Arm** [Light HP]: Autocannon (3x 1d6 burst, AP 1 — Ammo Die 1d6, Empty on 1 / 1-3 on Full Auto)

### 8.2 IF-45M-1 "Specter" (Medium Stealth Frame)
![IF-45M-1 "Specter" Technical Sketch](images/if_45m_1_specter.jpg)

*A fast, stealthy frame designed to infiltrate enemy lines, disrupt sensors, and escape using Flank Speed and an Adaptive Skin.*
- **Initiative**: 10
- **Chassis Mass (Tonnage)**: 45 Tons (Medium, Mass Value 2)
- **Point Value**: 435 points
- **Reactor Rating**: 9 EP/turn
- **Capacitor Max**: 4 EP
- **Movement Limit**: 5 hexes
- **Armor DR by Location**: Head: 4 | Torso: 5 | Left Arm: 3 | Right Arm: 3 | Each Leg: 4
- **Equipped Systems**:
  - Standard Sensor Suite (Visual [VIS]/Infrared [IR]/Microwave [Radar])
  - Adaptive Skin
  - Tactical Datalink
- **Equipped Weapons**:
  - **Left Arm** [Light HP]: Laser (2d6 damage)
  - **Right Arm** [Medium HP]: Disruptor Cannon (requires a **Radar** lock)

### 8.3 IF-55M-1 "Vanguard" (Medium Skirmisher Frame)
![IF-55M-1 "Vanguard" Technical Sketch](images/if_55m_1_vanguard.jpg)

*The workhorse of the fleet. Balanced defense, solid firepower, and equipped with flares to deflect seeking missiles.*
- **Initiative**: 6
- **Chassis Mass (Tonnage)**: 55 Tons (Medium, Mass Value 2)
- **Point Value**: 455 points
- **Reactor Rating**: 12 EP/turn
- **Capacitor Max**: 6 EP
- **Movement Limit**: 5 hexes
- **Armor DR by Location**: Head: 5 | Torso: 6 | Left Arm: 4 | Right Arm: 4 | Each Leg: 5
- **Equipped Systems**:
  - Standard Sensor Suite (Visual [VIS]/Infrared [IR]/Microwave [Radar])
  - Electronic Countermeasures (ECM) [Medium HP]
  - Flare Launcher [Light HP]
  - Chaff Dispenser [Light HP]
  - Tactical Datalink [Light HP]
- **Equipped Weapons**:
  - **Left Arm** [Light HP]: Autocannon (3x 1d6 burst, AP 1 — Ammo Die 1d6, Empty on 1 / 1-3 on Full Auto)
  - **Right Arm** [Light HP]: Laser (2d6 damage)

### 8.4 IF-75H-1 "Paladin" (Heavy Fire-Support Frame)
![IF-75H-1 "Paladin" Technical Sketch](images/if_75h_1_paladin.jpg)

*A heavy bombardment frame equipped to deliver high-impact kinetic support and rain cluster munitions, protected by layered defensive launchers.*
- **Initiative**: 5
- **Chassis Mass (Tonnage)**: 75 Tons (Heavy, Mass Value 3)
- **Point Value**: 555 points
- **Reactor Rating**: 14 EP/turn
- **Capacitor Max**: 8 EP
- **Movement Limit**: 4 hexes
- **Armor DR by Location**: Head: 5 | Torso: 7 | Left Arm: 5 | Right Arm: 5 | Each Leg: 6
- **Equipped Systems**:
  - Standard Sensor Suite (Visual [VIS]/Infrared [IR]/Microwave [Radar])
  - Flare Launcher [Light HP]
  - Chaff Dispenser [Light HP]
  - Smoke Launcher [Light HP]
  - Tactical Datalink [Light HP]
- **Equipped Weapons**:
  - **Right Arm** [Heavy HP]: Rail Gun (5d6, AP 3, inert slugs — infinite)
  - **Left Arm** [Light HP]: Autocannon (3x 1d6 burst, AP 1 — Ammo Die 1d6, Empty on 1 / 1-3 on Full Auto)
  - **Torso** [Medium HP]: Guided Missile Launcher (Infrared [IR] Guided, Cluster Warheads)

### 8.5 IF-90A-1 "Colossus" (Heavy Assault Frame)
![IF-90A-1 "Colossus" Technical Sketch](images/if_90a_1_colossus.jpg)

*A walking fortress. Generates massive amounts of energy to feed its Rail Gun and Thermal Lance, relying on heavy armor and smoke screens for protection.*
- **Initiative**: 3
- **Chassis Mass (Tonnage)**: 90 Tons (Assault, Mass Value 4)
- **Point Value**: 680 points
- **Reactor Rating**: 18 EP/turn
- **Capacitor Max**: 10 EP
- **Movement Limit**: 3 hexes
- **Armor DR by Location**: Head: 6 | Torso: 8 | Left Arm: 6 | Right Arm: 6 | Each Leg: 7
- **Equipped Systems**:
  - Standard Sensor Suite (Visual [VIS]/Infrared [IR]/Microwave [Radar])
  - Smoke Launcher [Light HP]
  - Flare Launcher [Light HP]
  - Chaff Dispenser [Light HP]
  - Tactical Datalink [Light HP]
- **Equipped Weapons**:
  - **Left Arm** [Heavy HP]: Thermal Lance
  - **Right Arm** [Heavy HP]: Rail Gun (5d6, AP 3, inert slugs — infinite)
  - **Torso** [Medium HP]: Guided Missile Launcher (Visual [VIS] Guided, EMP Warheads)

---
*Game Design by Antigravity & the User.*
