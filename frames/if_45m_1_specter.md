# 🛠️ IF-45M-1 "Specter" (Medium Stealth Frame)

![IF-45M-1 "Specter" Technical Sketch](../images/if_45m_1_specter.jpg)

* **Initiative**: 10 | **Tonnage**: 45 Tons | **Points**: 435 pts | **Movement Limit**: 5 hexes | **Flank Speed**: 4 hexes
* **Hardpoints**: Head 1L | Torso 1M+2L | L.Arm 1M | R.Arm 1M

### ⚡ Energy
* **Reactor EP (9/turn)**: `[ ] 1` | `[ ] 2` | `[ ] 3` | `[ ] 4 (IR Lockable)` | `[ ] 5` | `[ ] 6` | `[ ] 7` | `[ ] 8` | `[ ] 9`  
  *(Fill left-to-right during Energy Phase to generate EP. Erase/unmark right-to-left as EP is spent; spending the **4th EP** in a round leaves a heat bloom, and the Frame is lockable on IR for the rest of that round. Adaptive Skin upkeep does not count toward the total.)*
* **Capacitor Storage (Max 4 EP)**: `[ ] 1` | `[ ] 2` | `[ ] 3` | `[ ] 4`

### 🔫 Armaments & Systems
* **Left Arm [Light HP]: Laser** (2d6 Combat damage | 2 EP cost | Overcharge: [+2 EP per +1d6, max +2d6] | Requires a **VIS** lock)  
  *Ammo*: Infinite
* **Right Arm [Medium HP]: Disruptor Cannon** (Directed Energy Disruptor | 3 EP cost | Requires a **Radar** lock | Always: 1 Crit + drain 1d6 EP | Overcharge: [+2 EP for a second Crit])  
  *Ammo*: Infinite (Once it has its lock, it bypasses Flank Speed, Cover and Armor DR entirely — but Chaff and ECM each contest it on a Countermeasure Check)
* **Torso [Medium HP]: Adaptive Skin** (Stealth Upgrade)  
  *Upkeep*: 2 EP (Contests 1 spectrum — Countermeasure Check 4+) | Overcharge: [+2 EP to cloak 2nd spectrum]  
  *Status*: `[ ] Active` | *Cloaked Band*: `[ ] VIS` | `[ ] IR` | `[ ] RAD` *(Mark 1 band; mark 2 if Overcharged)*
* **Head [Light HP]: Tactical Datalink**: Shares locks and target telemetry in real time.

### 🛡️ Locational Status

| Location | Armor DR Tracker (Cross off highest on hit) |
| :--- | :--- |
| **Head** | `[4] [3] [2] [1] [0]` |
| **Torso** | `[5] [4] [3] [2] [1] [0]` |
| **Left Arm** | `[3] [2] [1] [0]` |
| **Right Arm** | `[3] [2] [1] [0]` |
| **Left Leg** | `[4] [3] [2] [1] [0]` |
| **Right Leg** | `[4] [3] [2] [1] [0]` |

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

