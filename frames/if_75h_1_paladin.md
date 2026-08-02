# 🛡️ IF-75H-1 "Paladin" (Heavy Fire-Support Frame)

![IF-75H-1 "Paladin" Technical Sketch](../images/if_75h_1_paladin.jpg)

* **Initiative**: 5 | **Tonnage**: 75 Tons | **Points**: 555 pts | **Movement Limit**: 4 hexes | **Flank Speed**: 4 hexes
* **Hardpoints**: Head 1L | Torso 1M+3L | L.Arm 1H | R.Arm 1H

### ⚡ Energy
* **Reactor EP (14/turn)**: `[ ] 1` | `[ ] 2` | `[ ] 3` | `[ ] 4` | `[ ] 5 (IR Lockable)` | `[ ] 6` | `[ ] 7` | `[ ] 8` | `[ ] 9` | `[ ] 10` | `[ ] 11` | `[ ] 12` | `[ ] 13` | `[ ] 14`  
  *(Fill left-to-right during Energy Phase to generate EP. Erase/unmark right-to-left as EP is spent; spending 5+ EP total during the turn makes the Frame vulnerable to IR locks)*
* **Capacitor Storage (Max 8 EP)**: `[ ] 1` | `[ ] 2` | `[ ] 3` | `[ ] 4` | `[ ] 5` | `[ ] 6` | `[ ] 7` | `[ ] 8`

### 🔫 Armaments & Systems
* **Right Arm [Heavy HP]: Rail Gun** (5d6 damage | AP 3 | Requires a **Radar** lock | 0 EP base — must Overcharge **+6 EP from the Capacitor** to fire, so it always cools down for 1 turn afterwards)  
  *Ammo Die*: Infinite (Inert)
* **Left Arm [Light HP]: Autocannon** (3x 1d6 burst | 1 EP / burst | Loaded with AP 1 ammo | **Visual** fire control)  
  *Ammo Die*: 1d6 (AP 1; Empty on 1, or 1-3 on Full Auto)
* **Torso [Medium HP]: Guided Missile Launcher** (4 EP cost | Infrared [IR] Guided | Cluster Warheads: roll 3 Hit Locations — one per column — and deal 2d6 to each)  
  *Ammo Die*: 1d6 (Empty on 1-2)
* **Torso [Light HP]: Defensive Smoke Launcher** (Contests Visual locks traced through it — Countermeasure Check 4+ | 1 EP use cost)  
  *Ammo Die*: 1d6 (Empty on **1**)
* **Torso [Light HP]: Infrared Countermeasure Suite** (Contests an **IR**-locked attack — Countermeasure Check 4+ | **2 EP per activation**, no magazine)  
  *Ammo Die*: 1d6 (Empty on **1**)
* **Torso [Light HP]: Defensive Chaff Dispenser** (Contests a **Radar**-locked attack — Countermeasure Check 4+ | no EP cost)  
  *Ammo Die*: 1d6 (Empty on **1**)
* **Head [Light HP]: Tactical Datalink**: Shares locks and target telemetry in real time.

### 🛡️ Locational Status

| Location | Armor DR Tracker (Cross off highest on hit) |
| :--- | :--- |
| **Head** | `[5] [4] [3] [2] [1] [0]` |
| **Torso** | `[7] [6] [5] [4] [3] [2] [1] [0]` |
| **Left Arm** | `[5] [4] [3] [2] [1] [0]` |
| **Right Arm** | `[5] [4] [3] [2] [1] [0]` |
| **Left Leg** | `[6] [5] [4] [3] [2] [1] [0]` |
| **Right Leg** | `[6] [5] [4] [3] [2] [1] [0]` |

### 💥 Critical Damage Logs

| Roll | Head (1-5) | Torso (1-8) | Arms (L / R) | Legs (L / R) |
| :---: | :--- | :--- | :--- | :--- |
| **1** | `[ ]` **Sensor Ghosting** *(Drop all locks)* | `[ ]` **System Glitch** *(-1 EP next turn)* | `[ ] / [ ]` **Target Jitter** *(-1 Dmg next atk)* | `[ ] / [ ]` **Servo Stutter** *(-2 Move, 1 turn)* |
| **2** | `[ ]` **Calibration Drift** *(1 EP upkeep)* | `[ ]` **Servo Lock** *(2 EP to Twist)* | `[ ] / [ ]` **Actuator Strain** *(+1 EP to Fire)* | `[ ] / [ ]` **Knee Lock** *(+1 EP per hex)* |
| **3** | `[ ]` **Sensor Destroyed** *(1d6: 1-2 IR, 3-4 VIS, 5-6 RAD)* | `[ ]` **Cap Leak** *(-2 Cap Max)* | `[ ] / [ ]` **Hardpoint Fail** *(-1 Dmg Die)* | `[ ] / [ ]` **Hip Act.** *(-2 Movement)* |
| **4** | `[ ]` **Struct. Fracture** *(DR 0 + No Datalink)* | `[ ]` **Struct. Fracture** *(DR to 0)* | `[ ] / [ ]` **Struct. Fracture** *(DR to 0)* | `[ ] / [ ]` **Struct. Fracture** *(DR to 0)* |
| **5** | `[ ]` **Pilot K.O.** *(Dead)* | `[ ]` **Reactor Dmg** *(-2 EP/turn)* | `[ ] / [ ]` **Weapon Destroyed** *(Arm silenced)* | `[ ] / [ ]` **Actuator Dest.** *(Prone; check to rise)* |
| **6** | - | `[ ]` **Ammo Expl.** *(Empty & +2 Crits)* | `[ ] / [ ]` **Arm Severed** *(Destroyed)* | `[ ] / [ ]` **Leg Severed** *(Crippled)* |
| **7** | - | `[ ]` **Elect. Fire** *(+1 Crit/Turn; 3 EP + 4+ to smother)* | - | - |
| **8** | - | `[ ]` **Containment Fail.** *(Destroyed)* | - | - |

