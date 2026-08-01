# 🌋 IF-90A-1 "Colossus" (Heavy Assault Frame)

![IF-90A-1 "Colossus" Technical Sketch](../images/if_90a_1_colossus.jpg)

* **Initiative**: 3 | **Tonnage**: 90 Tons | **Points**: 680 pts | **Movement Limit**: 3 hexes | **Flank Speed**: N/A
* **Hardpoints**: Head 1L | Torso 2M+3L | L.Arm 1H | R.Arm 1H

### ⚡ Energy
* **Reactor EP (18/turn)**: `[ ] 1` | `[ ] 2` | `[ ] 3` | `[ ] 4` | `[ ] 5 (IR Lockable)` | `[ ] 6` | `[ ] 7` | `[ ] 8` | `[ ] 9` | `[ ] 10` | `[ ] 11` | `[ ] 12` | `[ ] 13` | `[ ] 14` | `[ ] 15` | `[ ] 16` | `[ ] 17` | `[ ] 18`  
  *(Fill left-to-right during Energy Phase to generate EP. Erase/unmark right-to-left as EP is spent; spending 5+ EP total during the turn makes the Frame vulnerable to IR locks)*
* **Capacitor Storage (Max 10 EP)**: `[ ] 1` | `[ ] 2` | `[ ] 3` | `[ ] 4` | `[ ] 5` | `[ ] 6` | `[ ] 7` | `[ ] 8` | `[ ] 9` | `[ ] 10`

### 🔫 Armaments & Systems
* **Left Arm [Heavy HP]: Thermal Lance** (3d6 Combat damage | 4 EP cost | Overcharge: [+2 EP per +1d6, max +2d6] | Requires an **IR** lock)  
  *Ammo*: Infinite
* **Right Arm [Heavy HP]: Rail Gun** (5d6 damage | AP 3 | Requires a **Radar** lock | 0 EP base — must Overcharge **+6 EP from the Capacitor** to fire, so it always cools down for 1 turn afterwards)  
  *Ammo Die*: Infinite (Inert)
* **Torso [Medium HP]: Guided Missile Launcher** (4 EP cost | Visual [VIS] Guided | EMP Warheads hit 7-hex radius; scrambles sensors [Pilot Check to recover] & causes Crits on 0 DR locations)  
  *Ammo Die*: 1d6 (Empty on 1-2)
* **Torso [Light HP]: Defensive Smoke Launcher** (Blocks Visual sightlines | 1 EP use cost)  
  *Ammo Die*: 1d6 (Empty on 1-2)
* **Torso [Light HP]: Defensive Flare Launcher** (Negates one attack made on an **IR** lock | no EP cost)  
  *Ammo Die*: 1d6 (Empty on 1-2)
* **Torso [Light HP]: Defensive Chaff Dispenser** (Negates one attack made on a **Radar** lock | no EP cost)  
  *Ammo Die*: 1d6 (Empty on 1-2)
* **Head [Light HP]: Tactical Datalink**: Shares locks and target telemetry in real time.

### 🛡️ Locational Status

| Location | Armor DR Tracker (Cross off highest on hit) |
| :--- | :--- |
| **Head** | `[6] [5] [4] [3] [2] [1] [0]` |
| **Torso** | `[8] [7] [6] [5] [4] [3] [2] [1] [0]` |
| **Left Arm** | `[6] [5] [4] [3] [2] [1] [0]` |
| **Right Arm** | `[6] [5] [4] [3] [2] [1] [0]` |
| **Left Leg** | `[7] [6] [5] [4] [3] [2] [1] [0]` |
| **Right Leg** | `[7] [6] [5] [4] [3] [2] [1] [0]` |

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

