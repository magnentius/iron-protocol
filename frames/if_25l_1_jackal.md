# 🐺 IF-25L-1 "Jackal" (Light Recon Frame)

![IF-25L-1 "Jackal" Technical Sketch](../images/if_25l_1_jackal.jpg)

* **Initiative**: 12 | **Tonnage**: 25 Tons | **Points**: 365 pts | **Movement Limit**: 7 hexes | **Flank Speed**: 4 hexes
* **Hardpoints**: Head 1L | Torso 2L | L.Arm 1L | R.Arm 1L

### ⚡ Energy
* **Reactor EP (8/turn)**: `[ ] 1` | `[ ] 2` | `[ ] 3` | `[ ] 4` | `[ ] 5 (IR Lockable)` | `[ ] 6` | `[ ] 7` | `[ ] 8`  
  *(Fill left-to-right during Energy Phase to generate EP. Erase/unmark right-to-left as EP is spent; spending 5+ EP total during the turn makes the Frame vulnerable to IR locks)*
* **Capacitor Storage (Max 3 EP)**: `[ ] 1` | `[ ] 2` | `[ ] 3`

### 🔫 Armaments & Systems
* **Left Arm [Light HP]: Laser** (2d6 Combat damage | 2 EP cost | Overcharge: [+2 EP per +1d6, max +2d6] | Requires a **VIS** lock)  
  *Ammo*: Infinite
* **Right Arm [Light HP]: Autocannon** (3x 1d6 burst | 1 EP / burst | Configured with AP loadout)  
  *Ammo Die*: 1d6 (AP 1; Empty on 1, or 1-3 on Full Auto)
* **Torso [Light HP]: Jump Jets** (Jump over elevation/terrain | 2 EP per hex | A jump of 2+ hexes grants Flank Speed)  
  *Ammo Die*: 1d6 (Empty on 1-2 — propellant is a volatile store; see Ammo Explosion)
* **Head [Light HP]: Tactical Datalink**: Shares locks and target telemetry in real time.

### 🛡️ Locational Status

| Location | Armor DR Tracker (Cross off highest on hit) |
| :--- | :--- |
| **Head** | `[3] [2] [1] [0]` |
| **Torso** | `[3] [2] [1] [0]` |
| **Left Arm** | `[2] [1] [0]` |
| **Right Arm** | `[2] [1] [0]` |
| **Left Leg** | `[3] [2] [1] [0]` |
| **Right Leg** | `[3] [2] [1] [0]` |

### 💥 Critical Damage Logs

| Roll | Head (1-5) | Torso (1-8) | Arms (L / R) | Legs (L / R) |
| :---: | :--- | :--- | :--- | :--- |
| **1** | `[ ]` **Sensor Ghosting** *(Drop all locks)* | `[ ]` **System Glitch** *(-1 EP next turn)* | `[ ] / [ ]` **Target Jitter** *(-1 Dmg next atk)* | `[ ] / [ ]` **Servo Stutter** *(-2 Move, 1 turn)* |
| **2** | `[ ]` **Calibration Drift** *(1 EP upkeep)* | `[ ]` **Servo Lock** *(2 EP to Twist)* | `[ ] / [ ]` **Actuator Strain** *(+1 EP to Fire)* | `[ ] / [ ]` **Knee Lock** *(+1 EP per hex)* |
| **3** | `[ ]` **Sensor Destroyed** *(1d6: 1-2 IR, 3-4 VIS, 5-6 RAD)* | `[ ]` **Cap Leak** *(-2 Cap Max)* | `[ ] / [ ]` **Hardpoint Fail** *(-1 Dmg Die)* | `[ ] / [ ]` **Hip Act.** *(-2 Movement)* |
| **4** | `[ ]` **Struct. Fracture** *(DR 0 + No Datalink)* | `[ ]` **Struct. Fracture** *(DR to 0)* | `[ ] / [ ]` **Struct. Fracture** *(DR to 0)* | `[ ] / [ ]` **Struct. Fracture** *(DR to 0)* |
| **5** | `[ ]` **Pilot K.O.** *(Dead)* | `[ ]` **Reactor Dmg** *(-2 EP/turn)* | `[ ] / [ ]` **Weapon Destroyed** *(Attacker picks)* | `[ ] / [ ]` **Actuator Dest.** *(Prone; check to rise)* |
| **6** | - | `[ ]` **Ammo Expl.** *(Empty & +2 Crits)* | `[ ] / [ ]` **Arm Severed** *(Destroyed)* | `[ ] / [ ]` **Leg Severed** *(Crippled)* |
| **7** | - | `[ ]` **Elect. Fire** *(+1 Crit/Turn; 3 EP + 4+ to smother)* | - | - |
| **8** | - | `[ ]` **Containment Fail.** *(Destroyed)* | - | - |

