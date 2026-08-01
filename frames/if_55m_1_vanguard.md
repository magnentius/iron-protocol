# ⚔️ IF-55M-1 "Vanguard" (Medium Skirmisher Frame)

![IF-55M-1 "Vanguard" Technical Sketch](../images/if_55m_1_vanguard.jpg)

* **Initiative**: 6 | **Tonnage**: 55 Tons | **Points**: 455 pts | **Movement Limit**: 5 hexes | **Flank Speed**: 4 hexes
* **Hardpoints**: Head 1L | Torso 1M+2L | L.Arm 1M | R.Arm 1M

### ⚡ Energy
* **Reactor EP (12/turn)**: `[ ] 1` | `[ ] 2` | `[ ] 3` | `[ ] 4` | `[ ] 5 (IR Lockable)` | `[ ] 6` | `[ ] 7` | `[ ] 8` | `[ ] 9` | `[ ] 10` | `[ ] 11` | `[ ] 12`  
  *(Fill left-to-right during Energy Phase to generate EP. Erase/unmark right-to-left as EP is spent; spending 5+ EP total during the turn makes the Frame vulnerable to IR locks)*
* **Capacitor Storage (Max 6 EP)**: `[ ] 1` | `[ ] 2` | `[ ] 3` | `[ ] 4` | `[ ] 5` | `[ ] 6`

### 🔫 Armaments & Systems
* **Left Arm [Light HP]: Autocannon** (3x 1d6 burst | 1 EP / burst | Loaded with AP 1 ammo)  
  *Ammo Die*: 1d6 (AP 1; Empty on 1, or 1-3 on Full Auto)
* **Right Arm [Light HP]: Laser** (2d6 Combat damage | 2 EP cost | Overcharge: [+2 EP per +1d6, max +2d6] | Requires a **VIS** lock)  
  *Ammo*: Infinite
* **Torso [Light HP]: Defensive Flare Launcher** (Negates one attack made on an **IR** lock | no EP cost)  
  *Ammo Die*: 1d6 (Empty on 1-2)
* **Torso [Light HP]: Defensive Chaff Dispenser** (Negates one attack made on a **Radar** lock | no EP cost)  
  *Ammo Die*: 1d6 (Empty on 1-2)
* **Torso [Medium HP]: ECM Suite** (Contests Microwave locks — Jamming Check 4+ | Upkeep: 2 EP [Host only] | Overcharge: [+1 EP per +1 hex radius])  
  *Status*: `[ ] Active` | *Coverage*: `[ ] Host Only` | `[ ] +1 Hex Radius` | `[ ] +2 Hex Radius`
* **Head [Light HP]: Tactical Datalink**: Shares locks and target telemetry in real time.

### 🛡️ Locational Status

| Location | Armor DR Tracker (Cross off highest on hit) |
| :--- | :--- |
| **Head** | `[5] [4] [3] [2] [1] [0]` |
| **Torso** | `[6] [5] [4] [3] [2] [1] [0]` |
| **Left Arm** | `[4] [3] [2] [1] [0]` |
| **Right Arm** | `[4] [3] [2] [1] [0]` |
| **Left Leg** | `[5] [4] [3] [2] [1] [0]` |
| **Right Leg** | `[5] [4] [3] [2] [1] [0]` |

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

