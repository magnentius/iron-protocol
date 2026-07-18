# Iron Protocol
**A Tactical Game of Iron Frame Combat**

![Iron Protocol Cover Art](images/iron_protocol.jpg)

*Fusing the tactical resource management and locational damage of BattleTech with the turn-order dynamics and initiative-based action of X-Wing Miniatures.*

---

## Introduction: The Iron Protocol
In the war-torn stars of the far future, planetary warfare is not decided by faceless drone swarms, heavy tank divisions, or indiscriminate orbital bombardment. Instead, conflicts are resolved by the pilots of massive, heavily armed walking weapon platforms known as **Iron Frames**. 

These elite pilots adhere to the **Iron Protocol**—an ancient, unyielding code of martial honor and combat conduct inspired by Earth's historical Bushido. The Protocol dictates that conflicts must be settled on planetary surfaces in designated engagement zones, frame-to-frame, where tactical energy management, maneuverability, and pilot skill determine the victor. To violate the Protocol is to invite immediate dishonor, galactic exile, and execution by all coalitions.

### The Lore of the Protocol: Why We Fight in Frames

The emergence of the Iron Protocol was born of necessity, forged from the ashes of the **Cinder Wars**—a period of total industrial warfare that left dozens of settled planets as lifeless, radioactive dust. To prevent extinction, the warring factions signed the Accords, establishing the Protocol to govern all future conflicts.

#### 1. The Preservation of Biospheres
Habitable worlds are warfare's ultimate prize, but they are exceedingly rare and precious. Conventional mass warfare—carpet bombing, tactical nuclear strikes, and massive tank divisions tearing up agricultural land—irreversibly ruins planetary biospheres. The Iron Protocol strictly outlaws weapons of mass destruction, orbital bombardment, and heavy tracked planetary armor. Battles are confined to designated, unpopulated "Honor Fields" to preserve planetary infrastructure and ecologies for the victor.

#### 2. The Iron Aegis (Planetary Shielding)
Every settled world is protected by the **Iron Aegis**—a grid of planetary defense shields, surface-to-orbit lasers, and hyper-velocity missile silos. Any starship attempting to conduct orbital bombardment is instantly targeted and destroyed. Surface invasions must be launched via stealth drop-pods containing highly localized ground forces, bypassing the defensive network. 

#### 3. Bipedal Superiority Over Tanks & Aircraft
Frontier worlds are jagged, unpaved, and volatile. Tectonic shifts, dense alien forests, and ruins of ancient mega-structures make standard tracked vehicles (tanks) useless; they are easily bottlenecked in canyons or trapped by rough terrain. Fighter aircraft are blinded by the heavy atmospheric dust, electromagnetic storms, and thermal anomalies common on these worlds. **Iron Frames**, with their articulated bipedal limbs and vector thrusters, possess unmatched all-terrain mobility, allowing them to climb crags, leap chasms, and pivot dynamically in close-quarters combat.

#### 4. The Ban on Autonomous Warfare (The Human Core)
Following a catastrophic AI rebellion, treaties strictly outlaw autonomous combat drones and artificial combat intelligences. War must be fought by humans, exposing themselves to direct risk. The Iron Frame serves as an extension of the pilot's own body, synchronizing via neural datalink. War is no longer a matter of industrial factory output, but a test of personal discipline, honor, and martial skill.

### Core Tenets of the Protocol
- **Honor in the Arc**: Foe must face foe. Torso twisting represents the deliberate, disciplined adjustments of a pilot's stance to align weapons with the enemy.
- **Mastery of Energy**: An Iron Frame's reactor is the pilot's lifeblood. Distributing energy between thruster moves, active countermeasures, and weapons systems is the ultimate test of martial discipline.
- **Precision Striking**: The Protocol forbids mindless destruction. Pilots target specific components—locating and disabling weapons, shields, and sensors systematically to neutralize the opponent with precision.

---

## 1. Core Mechanics & Setup

### 1.1 The Hex Grid
The game is played on a standard hexagonal grid. Each hex represents approximately 30 meters of terrain.
- **Facing**: A Frame has two components of facing:
  - **Leg Facing (Movement)**: The direction the legs face, which determines the direction of forward, backward, and diagonal movement.
  - **Torso Facing (Combat)**: The direction the upper body faces. By default, the torso aligns with the leg facing, but a Frame can twist its torso (see Torso Twisting).
- **Torso Twisting**: A Frame's upper body can twist 1 hex side (60 degrees) to the left or right of its current leg facing.
- **Firing Arcs**: Firing arcs are determined relative to the **Torso Facing**, not leg facing:
  - **Front Arc**: The 60-degree wedge directly in front of the Torso (1 hex edge wide).
  - **Side Arcs (Left/Right)**: The 120-degree wedges extending from the front-left and front-right edges of the Torso.
  - **Rear Arc**: The 60-degree wedge directly behind the Torso.
- **Line of Sight (LOS)**: Draw a straight line from the center of the attacking Frame's hex to the center of the target's hex. If the line passes through blocking terrain (such as hills or buildings), a Smoke template, or another Frame's hex, **Visual Line of Sight (Visual LOS)** is blocked.
  - **Interaction with Smoke**: Smoke templates block **Visual LOS** and **Visual locks** (precluding the use of Visual-guided or Visual-spectrum weapons through or into the smoke hex). However, Smoke does *not* block Infrared (IR) or Microwave (Radar) line of sight; weapons using these bands can still target and fire through smoke.
  - **Intervening Frames**: Both friendly and enemy Frames block direct Visual LOS if their hex lies along the LOS line, *provided* the intervening Frame's Weight Class is **equal to or larger** than the target Frame's Weight Class (Light, Medium, Heavy, Assault). A smaller Frame cannot block LOS to a larger target (e.g., a Light Frame cannot hide a Heavy Frame, but a Heavy Frame can hide a Light or Medium Frame).
  - **Interaction with Active Metamaterial Coating (AMC)**:
    - A Frame using active **Visual-Camouflage Mode** is visually invisible. Attacking frames do not have Visual LOS to it, and it cannot be targeted using the Visual (VIS) spectrum.
    - Additionally, because light passes through a visually camouflaged Frame, it **does not block Visual LOS** to any Frames positioned behind it.
    - AMC modes tuned to Microwave (Radar) or Infrared (IR) suppression do not affect visual visibility, and therefore block Visual LOS normally.

### 1.2 The Frame Profile
Each Iron Frame (IF) is defined by its chassis, reactor, capacitor, and mounted components:
- **Initiative (2-12)**: A static value representing pilot reaction speed and chassis agility. Higher initiative frames shoot first but move last, while lower initiative frames move first but shoot last.
- **Chassis Mass (Tonnage)**: Built on a scale from **20 to 100 Tons** (typically in increments of 5). Tonnage determines the Frame's weight class and its corresponding **Mass Value** used for collision damage:
  - **Light** (20–35 Tons): Mass Value = 1
  - **Medium** (40–55 Tons): Mass Value = 2
  - **Heavy** (60–75 Tons): Mass Value = 3
  - **Assault** (80–100 Tons): Mass Value = 4
- **Reactor Rating**: The number of Energy Points (EP) generated by the Frame at the start of each turn.
- **Capacitor Max**: The maximum amount of unused EP that can be stored in the Capacitor between turns.
- **Evasion Limit**: The maximum Evasion Points (EVA) a Frame can accumulate through movement in a single turn.
- **Armor Damage Reduction (DR)**: Each of the 5 hit locations (**Head**, **Torso**, **Left Arm**, **Right Arm**, and **Legs**) has its own Armor DR rating. When a location is hit, its current Armor DR reduces incoming damage. If damage exceeds this DR (penetrates the armor), the remaining damage is applied to that location's Internal Structure, and the location's Armor DR is permanently reduced by 1.
- **Structural Integrity**: The maximum Internal Structure (IS) points for each of the 5 locations.

---

## 2. Turn Sequence
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
- **Dynamic Movement Execution**: When a Frame activates, the player decides how to move it on the fly, spending EP from their current energy pool step-by-step. This allows players to react directly to the movements of previously activated (lower-initiative) frames.
  - **Forward Walk (W)**: Move 1 hex forward. Cost: 1 EP.
  - **Reverse (R)**: Move 1 hex backward without changing facing. Cost: 2 EP.
  - **Pivot/Turn (TL/TR)**: Change facing by 60 degrees (one hexside) left or right. Cost: 1 EP.
  - **Strafe (SL/SR)**: Move 1 hex to the left-front or right-front diagonal hex while maintaining original facing. Cost: 2 EP.
  - **Jump Jet (J)**: Only available to **Light** and **Medium** weight classes (20–55 Tons). Heavy and Assault Frames cannot be equipped with Jump Jets and cannot jump.
    - *Cost*: 2 EP per hex.
    - *Movement*: The Frame jumps in a straight line to a hex within its maximum jump distance (default maximum of 4 hexes). It bypasses all intervening terrain, obstacles, and other Frames.
    - *Landing & Death from Above (DFA)*:
      - **Standard Landing**: Normally, a Frame lands in an unoccupied hex. Upon landing, the pilot sets the Leg Facing to any direction for free.
      - **Death from Above (DFA) Strike**: Alternatively, a pilot may target an occupied hex to perform a DFA strike.
      - **DFA Damage**: Both Frames suffer damage rolled using a pool of $d6$ dice:
        $$\text{DFA Damage Dice} = \text{Jumping Frame's Mass Value} \times \text{Hexes Jumped}$$
      - **Locations Hit**: 
        - The target Frame suffers the damage to its **Torso** (on a 1d6 roll of 2–6) or its **Head** (on a 1d6 roll of 1).
        - The jumping Frame suffers the damage directly to its **Legs** (representing landing impact).
        - Both damage hits are reduced by the respective location's Armor DR normally. Evasion (EVA) does not reduce DFA damage.
      - **Displacement**: After damage is resolved, the target's player (the defender) slides the jumping Frame into any unoccupied adjacent hex of their choice. If no adjacent hex is unoccupied, the jumping Frame falls Prone, taking an additional 2d6 damage to its Legs, and is placed in the nearest unoccupied hex (see Section 5.3).
    - *Evasion*: Due to the high velocity and ballistic trajectory of flight, jumping generates **2 EVA per hex jumped** (up to the Frame's Evasion Limit).
- **Collisions & Blocking**: If a Frame's movement path would enter a hex occupied by another Frame, a collision occurs. The moving Frame immediately stops in the last unoccupied hex, its activation ends, and both frames suffer damage.
  - **Collision Damage**: Both the moving Frame and the stationary target Frame suffer damage to a random location determined by rolling on the Hit Location Table individually. Evasion (EVA) points do **not** reduce collision damage, as the impact is physical and unavoidable.
  - **Damage Calculation**: The damage is rolled using a pool of $d6$ dice based on the moving Frame's **Mass Value** (Light = 1, Medium = 2, Heavy = 3, Assault = 4) and its speed (the number of hexes moved in the current activation before impact):
    $$\text{Collision Damage Dice Pool} = \text{Mass Value} \times \text{Speed Factor}$$
    Where **Speed Factor** is the number of hexes moved in this activation prior to impact divided by 2 (rounded up, minimum of 1).
    *(Example: An Assault Frame [90 Tons, Mass Value 4] that moves 3 hexes before colliding with a target rolls $4 \times 2 = 8d6$ damage. Both frames suffer this damage to a random location, reduced by their respective Armor DR. EVA is not subtracted).*
  - **Stability Roll**: After resolving collision damage, both Frames must check if they fall Prone (see Section 5.3).
- **Accumulating Evasion**: For every hex a Frame successfully exits during its activation, it gains 1 **Evasion Point (EVA)**, up to its Evasion Limit. These EVA points are tracked using tokens and represent the difficulty of targeting a moving frame.
- **Torso Twist**: At the very end of its activation (after all movement is completed), the Frame may perform a free Torso Twist. The player can rotate the upper body of the Frame 1 hex side (60 degrees) to the left or right of its current Leg Facing, or reset it to align with the Leg Facing. This sets the Frame's Torso Facing (and Firing Arcs) for the upcoming Combat Phase. The torso remains in this position until the Frame activates in the next turn's Activation Phase.

### 2.3 Combat Phase (Initiative Order)
Frames attack in order of **highest Initiative** to **lowest Initiative**.
- **Instant Resolution**: Unlike some tabletop games, damage is resolved *instantly*. If a high-initiative Frame destroys or disables a weapon on a lower-initiative Frame, that lower-initiative Frame cannot use that weapon when its turn to fire comes.
- **Attack Sequence**:
  1. **Select Weapon & Pay EP Cost**: Deduct the weapon's EP cost from the Frame's current pool.
  2. **Verify Line of Sight (LOS) and Arc**: The target must be within the weapon's firing arc (determined by the Torso Facing set at the end of the Activation Phase) and have clear LOS (unless using a weapon that permits indirect fire).
  3. **Verify Sensor Detection & Lock**: The target must be detected on a spectrum compatible with the weapon (Visual [VIS], Infrared [IR], or Microwave [Radar]). If the target is undetected on that spectrum, the attack cannot be declared.
  4. **Determine Hit Location**: Roll 2d6 on the **Hit Location Table**.
  5. **Roll Damage**: Roll the weapon's damage dice.
  6. **Apply Target Evasion**: Subtract the target's current EVA points from the rolled damage.
  7. **Apply Armor DR**: Subtract the target location's current Armor DR from the remaining damage.
  8. **Resolve Damage & Armor Degradation**: 
     - If the remaining damage is **greater than 0**, the excess damage is deducted directly from that location's **Internal Structure**. Additionally, because the armor was penetrated, the Armor DR of that location is permanently **reduced by 1** (to a minimum of 0).
     - If the remaining damage is **0 or less**, the armor successfully blocks the hit; the location suffers no damage, and its Armor DR does not degrade.
  9. **Roll Critical Hits**: If the location's Internal Structure takes 1 or more points of damage, roll 1d6 on the **Critical Hit Table** for that location.

### 2.4 End Phase
- **Energy Storage**: Unused EP is moved to the Capacitor, up to the Capacitor Max. Any excess EP is vented and lost.
- **Clean Up**: Remove Evasion tokens, clear temporary smoke templates, and decrement cooldown tokens on weapons.

---

## 3. Sensors, Stealth, and Detection
Because attacks hit automatically if targeted, the tactical battle is won or lost in the **Sensor & Detection** game. A Frame cannot be attacked unless it is detected on at least one sensor spectrum required by the weapon.

### 3.1 The Sensor Suite (Head Location)
Every Frame has a sensor suite consisting of three bands, housed in the Head location, arranged here in order of increasing electromagnetic wavelength:
1. **Visual (VIS)**: Shortest wavelength (approx. 380–700 nm). Housed in high-resolution optical cameras.
   - *Requires*: Direct Line of Sight.
   - *Blocked by*: Smoke templates, heavy forests, or Visual-Camouflage (VIS) AMC.
2. **Infrared (IR)**: Medium wavelength (approx. 700 nm–1 mm). Thermal sensors detecting heat signatures.
   - *Requires*: Direct Line of Sight.
   - *Sensitivity*: Targets become visible on IR if they spent 3 or more EP on movement or weapons in their activation.
   - *Blocked by*: Flares or Infrared-Suppression (IR) AMC.
3. **Microwave (Radar)**: Longest wavelength (approx. 1 mm–1 m). Active microwave radio detection.
   - *Requires*: Does not require direct LOS; can scan over light cover and around corners.
   - *Blocked by*: Active ECM, Microwave-Absorbent (Radar) AMC, or solid stone/steel terrain (e.g., mountains).

### 3.2 Stealth & Defensive Countermeasures
Frames can run active systems to deny locks and hide from sensors:
- **Electronic Countermeasures (ECM)**: Costs 2 EP to activate in the Energy Phase. Blocks Microwave (Radar) detection and locks on the host Frame and any friendly Frames within a 2-hex radius.
- **Flares**: Limited charges (typically 3). When targeted by an IR-guided missile or IR-based attack, the defender may expend 1 Flare charge to completely negate the attack.
- **Smoke Launchers**: Limited charges (typically 2). During the Activation Phase, a Frame may spend 1 EP and 1 charge to deploy a Smoke cloud in its current or an adjacent hex. The smoke template blocks Visual (VIS) LOS and Visual locks through that hex for 2 turns. Infrared (IR) and Microwave (Radar) sensors are unaffected and can scan through smoke unimpeded.
- **Active Metamaterial Coating (AMC)**: During the Energy Phase, a player can spend EP to tune their coating. A Frame may only activate up to **two** AMC modes simultaneously, ensuring it is always detectable on at least one sensor spectrum:
  - *Microwave-Absorbent Mode* (2 EP): Frame cannot be detected or locked by Microwave (Radar) sensors.
  - *Infrared-Suppression Mode* (2 EP): Frame cannot be detected or locked by Infrared (IR) sensors.
  - *Visual-Camouflage Mode* (4 EP): Frame is invisible to Visual (VIS) sensors. Bypasses visual locks and grants +3 EVA.

### 3.3 Tactical Datalink (Head Location)
A Frame may be equipped with a **Tactical Datalink** housed in its Head location.
- **Shared Targeting Data**: If two or more friendly Frames on a team are equipped with active Tactical Datalinks, they share sensor data in real time. If a target is detected or locked on any sensor spectrum (Visual, Infrared, or Microwave) by *one* of the datalinked Frames, it is instantly considered detected/locked on that spectrum for *all* other active datalinked Frames on the team.
- **Critical Failure**: If a Frame suffers any critical hit to its Head (Sensors) location, or is affected by an EMP warhead, its Tactical Datalink is disabled for the rest of the battle (or until the EMP effect clears), immediately severing that Frame from the shared sensor network.

---

## 4. Weapons & Munitions
Weapons are mounted on specific locations of the Frame (Arms, Torso, or Head) and dictate the Frame's offensive capabilities.

| Weapon | EP Cost | Ammo | Cooldown | Damage | Detection Spectrum | Special Rules |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Autocannon** | 1 | 100 rounds | None | 1d6 per round | Visual (VIS) or Microwave (Radar) | Choose burst size (2-10 rounds). Consumes that much ammo. |
| **High Energy Laser (HEL)** | 4 | Infinite | None | 2d6 (Combat) + 1d6 (End) | Visual (VIS) or Infrared (IR) | Sustained Beam. Can pay 3 EP to maintain lock in subsequent turns. |
| **Rail Gun** | 6 | 5 rounds | 1 Turn | 5d6 + 10 | Visual (VIS) or Microwave (Radar) | High penetration. Ignores up to 5 points of Armor DR. |
| **Guided Missiles** | 2 | 4 Salvos | None | Warhead Dep. | Guidance Dep. | Requires Lock. Permits indirect fire (no LOS) for all guidance types (onboard camera/sensors). |
| **High Power Microwave (HPM)** | 3 | Infinite | None | None | Microwave (Radar) or Visual (VIS) | Roll Hit Location normally. If the weapon successfully hits the Head location, the attack deals no physical damage, but it does bypass all Armor DR to force a roll on the Head Critical Table|

### 4.1 Autocannon Munitions
When equipping an Autocannon, players choose one ammo type:
- **Armor Piercing (AP)**: Ignores 2 points of the target's Armor DR for every die rolled.
- **High Explosive Incendiary (HEI)**: Adds a flat +2 modifier to any Critical Hit rolls caused by this weapon.

### 4.2 Guided Missile Systems
Missiles must be configured with a guidance package and a warhead at build time:
- **Guidance Systems**:
  - *Microwave (Radar)-Guided*: Permits indirect fire (no LOS required). Requires a Microwave (Radar) lock (via host scanner or shared friendly scanner data). Blocked by active ECM or Microwave-Absorbent Active Coating.
  - *Infrared (IR)-Guided*: Permits indirect fire (no LOS required). Requires an Infrared (IR) lock (target must have spent 3+ EP in its last activation). Blocked by Flares or Infrared-Suppression Active Coating.
  - *Visual (VIS)-Guided*: Permits indirect fire (no LOS required at launch, utilizing onboard optical cameras). Requires a Visual (VIS) lock. Blocked by Smoke or Active Coating tuned to the visible spectrum (Visual-Camouflage Mode) at the target location.
- **Warheads**:
  - *High Explosive (HE)*: Deals 4d6 damage to a single hit location.
  - *Cluster*: Deals 1d6 damage to 5 different randomly rolled hit locations (roll location for each hit).
  - *EMP (Electromagnetic Pulse)*: Deals no physical damage. Bypasses Armor DR. Target's Capacitor loses 1d6 EP, and their Sensors are offline for the next turn.

---

## 5. Damage & Critical Hits

### 5.1 Hit Location Table (2d6)
When a Frame is hit, roll 2d6 to determine the hit location:

| Roll (2d6) | Location Hit | Special Notes |
| :---: | :--- | :--- |
| **2** | Head (Sensors) | Contains the Sensor Suite. Criticals blind the Frame. |
| **3 - 4** | Left Arm | Mounted weapons/defenses in Left Arm are vulnerable. |
| **5 - 6** | Left Leg | Criticals slow movement speed. |
| **7** | Torso (Center) | Main frame chassis. Standard armor DR applies. |
| **8 - 9** | Right Leg | Criticals slow movement speed. |
| **10 - 11** | Right Arm | Mounted weapons/defenses in Right Arm are vulnerable. |
| **12** | Torso (Core Critical) | Bypasses Torso Armor DR entirely (treat DR as 0 for this attack). Damage is dealt directly to Torso Internal Structure, and Torso DR is permanently reduced by 1. |

### 5.2 Critical Hit Tables (1d6)
If damage penetrates to the **Internal Structure** of a location, roll 1d6 on the corresponding table. (Remember: HEI ammo adds +2 to these rolls, maximum of 8).

#### Head (Sensors) Critical Table
- **1-2: Visual (VIS) Sensor Offline**. Cannot use Visual (VIS)-guided weapons or Visual locks.
- **3-4: Infrared (IR) Sensor Offline**. Cannot use Infrared (IR)-guided weapons or IR locks.
- **5: Microwave (Radar) Sensor Offline**. Cannot use Microwave (Radar)-guided weapons or Radar locks.
- **6+: Sensor Suite Destroyed**. Frame is completely blind. Cannot lock or target any enemy (can only fire weapons blind, hitting only if target enters adjacent hex).

#### Torso (Core) Critical Table
- **1-2: Capacitor Leak**. Lose 2 stored EP immediately. Capacitor Max capacity is permanently reduced by 2.
- **3-4: Reactor Damage**. EP generation is permanently reduced by 2 EP per turn.
- **5: Ammo Explosion**. If the Frame carries Autocannon, Rail Gun, or Missile ammo, the ammunition explodes. Deal 3d6 damage to the Torso (bypassing armor). If no ammo remains, treat as Reactor Damage.
- **6+: Reactor Breach**. The Reactor goes critical. The Frame is destroyed immediately. All adjacent units suffer 2d6 damage.

#### Arms (Weapons & Actuators) Critical Table
- **1-3: Weapon Damaged**. Choose one weapon mounted in this arm; it is destroyed and cannot be fired.
- **4-5: Shoulder Joint Jammed**. Weapons mounted in this arm can only fire into the Front Arc (cannot fire into Side Arcs).
- **6+: Arm Severed**. The arm is completely destroyed. All weapons and systems mounted in this arm are lost.

#### Legs (Mobility) Critical Table
- **1-3: Actuator Damage**. Leg actuators are warped. Forward Walk cost increases to 2 EP per hex.
- **4-5: Knee Joint Frozen**. The leg cannot pivot easily. Turning costs 2 EP per 60 degrees.
- **6+: Leg Severed**. The Frame is immobilized. It can no longer move or strafe, and can only pivot in place (costing 3 EP per 60 degrees). Also triggers an immediate fall (see Section 5.3).

### 5.3 Falling and the Prone State
When an Iron Frame is knocked over during combat (via collision, DFA, or leg destruction), it enters the **Prone** state. Mark the Frame with a Prone token.

#### Falling Triggers
- **Collisions**: When a collision occurs, both Frames must make a **Stability Roll** after resolving damage:
  $$\text{Stability Check} = 1d6 + \text{Mass Value}$$
  If the result is **less than $3 + \text{Speed Factor}$** of the collision, that Frame falls Prone. (Light weight classes and higher-speed impacts are much more likely to result in a fall).
- **Death from Above (DFA)**: 
  - The **Target Frame** of a DFA strike is automatically knocked Prone.
  - The **Jumping Frame** must make a Stability Roll. If the result is **less than 6**, it falls Prone in its landing/displacement hex.
- **Leg Severed**: If a Frame suffers a "Leg Severed" critical hit (Leg Critical Table 6+), it immediately falls Prone.

#### Effects of the Prone State
- **Defense**: A Prone Frame's Evasion (EVA) is reduced to **0**. It cannot generate or spend EVA points to reduce incoming damage.
- **Combat**: A Prone Frame cannot torso twist and suffers a **-1d6 penalty to all weapon damage rolls** (minimum of 1d6 rolled).
- **Maneuvering**: A Prone Frame cannot walk, strafe, or jump. Its only movement options are:
  - **Stand Up**: Costs **3 EP** during its Activation Phase. Upon standing, the pilot removes the Prone token and may set the Leg Facing to any direction for free.
  - **Pivot**: While Prone, the Frame may crawl-turn, pivoting its Leg Facing by 60 degrees. Cost: **2 EP** per 60 degrees.

---

## 6. Sample Frames
Here are three pre-configured Iron Frames ready for combat.

### IF-01 "Specter" (Light Scout Frame)
![IF-01 "Specter" Technical Sketch](images/if_01_specter.jpg)

*A fast, stealthy frame designed to infiltrate enemy lines, disrupt sensors, and escape using high evasion and metamaterial cloaking.*
- **Initiative**: 10
- **Chassis Mass (Tonnage)**: 30 Tons (Light, Mass Value 1)
- **Reactor Rating**: 8 EP/turn
- **Capacitor Max**: 4 EP
- **Evasion Limit**: 5 EVA
- **Armor DR by Location**: Head: 1 | Torso: 3 | Left Arm: 2 | Right Arm: 2 | Legs: 2
- **Internal Structure**: Head: 3 | Torso: 8 | Left Arm: 4 | Right Arm: 4 | Legs: 6
- **Equipped Systems**:
  - Standard Sensor Suite (Visual [VIS]/Infrared [IR]/Microwave [Radar])
  - Active Metamaterial Coating (AMC)
  - Tactical Datalink
- **Equipped Weapons**:
  - **Left Arm**: Autocannon (50 rounds AP ammo)
  - **Right Arm**: High Power Microwave (HPM)

### IF-05 "Vanguard" (Medium Skirmisher Frame)
![IF-05 "Vanguard" Technical Sketch](images/if_05_vanguard.jpg)

*The workhorse of the fleet. Balanced defense, solid firepower, and equipped with flares to deflect seeking missiles.*
- **Initiative**: 6
- **Chassis Mass (Tonnage)**: 55 Tons (Medium, Mass Value 2)
- **Reactor Rating**: 12 EP/turn
- **Capacitor Max**: 6 EP
- **Evasion Limit**: 3 EVA
- **Armor DR by Location**: Head: 2 | Torso: 5 | Left Arm: 3 | Right Arm: 3 | Legs: 4
- **Internal Structure**: Head: 4 | Torso: 12 | Left Arm: 8 | Right Arm: 8 | Legs: 10
- **Equipped Systems**:
  - Standard Sensor Suite (Visual [VIS]/Infrared [IR]/Microwave [Radar])
  - ECM Suite
  - Flare Launcher (3 charges)
  - Tactical Datalink
- **Equipped Weapons**:
  - **Left Arm**: Autocannon (100 rounds, loaded with 50 AP / 50 HEI)
  - **Torso**: Guided Missile Launcher (4 Salvos, Microwave [Radar] Guided, HE Warheads)

### IF-09 "Colossus" (Heavy Assault Frame)
![IF-09 "Colossus" Technical Sketch](images/if_09_colossus.jpg)

*A walking fortress. Generates massive amounts of energy to feed its Rail Gun and High Energy Laser, relying on heavy armor and smoke screens for protection.*
- **Initiative**: 3
- **Chassis Mass (Tonnage)**: 90 Tons (Assault, Mass Value 4)
- **Reactor Rating**: 18 EP/turn
- **Capacitor Max**: 10 EP
- **Evasion Limit**: 1 EVA
- **Armor DR by Location**: Head: 3 | Torso: 7 | Left Arm: 5 | Right Arm: 5 | Legs: 6
- **Internal Structure**: Head: 6 | Torso: 20 | Left Arm: 12 | Right Arm: 12 | Legs: 15
- **Equipped Systems**:
  - Standard Sensor Suite (Visual [VIS]/Infrared [IR]/Microwave [Radar])
  - Smoke Launcher (2 charges)
- **Equipped Weapons**:
  - **Left Arm**: High Energy Laser (HEL)
  - **Right Arm**: Rail Gun (5 rounds)
  - **Torso**: Guided Missile Launcher (4 Salvos, IR Guided, EMP Warheads)

---

## 7. Named Pilots & The Code of Honor
![Kaito Vance](images/kaito_vance.jpg)

In *Iron Protocol*, pilots are not anonymous grunts. You can field legendary **Named Pilots** who represent the elite houses, coalitions, and orders.

### 7.1 Initiative Bonus
Equipping a Named Pilot on an Iron Frame grants a flat Initiative bonus of **+1, +2, or +3** (declared at build time, up to a maximum final Initiative of 12). This represents their tactical foresight and combat reflexes.

### 7.2 Iron Protocol Vows
Every Named Pilot is sworn to a specific vow under the Iron Protocol, reflecting their martial pride. If a pilot violates their vow during a battle, they are **dishonored**: they immediately lose their Initiative bonus for the rest of the battle, and suffer additional penalties.

Choose one Vow for your Named Pilot:

#### Vow of Courage (Yuu)
*“The warrior does not retreat; we are the anvil upon which the enemy breaks.”*
- **The Constraint**: The pilot cannot use the **Reverse (R)** movement command.
- **Dishonor Penalty**: If the Frame ever reverses, it is dishonored. In addition to losing the Initiative bonus, its Reactor Rating is reduced by 2 EP per turn for the rest of the battle.

#### Vow of Respect (Rei)
*“A warrior meets their foe face-to-face. Anonymous death from behind is the weapon of cowards.”*
- **The Constraint**: The pilot cannot target an enemy's Rear Firing Arc, nor fire indirect-guided missiles without direct Line of Sight (even if a Tactical Datalink is active).
- **Dishonor Penalty**: If the pilot executes an attack from behind or fires an indirect weapon without direct LOS, they are dishonored, and their Evasion Limit is permanently reduced by 2 EVA points for the rest of the battle.

#### Vow of Honor (Meiyo)
*“Seek only the strongest. There is no glory in crushing the weak.”*
- **The Constraint**: If a higher-initiative or higher-tonnage enemy Frame is detected and within the pilot's Torso Firing Arc, the pilot **must** target that Frame instead of any lower-initiative/lower-tonnage targets.
- **Dishonor Penalty**: If the pilot fires at a weaker target when a more prestigious target was valid, they are dishonored, and their weapons' EP costs increase by +1 EP per shot for the rest of the battle.

---
*Game Design by Antigravity & the User.*
