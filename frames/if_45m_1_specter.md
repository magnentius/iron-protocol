# 🛠️ IF-45M-1 "Specter" (Medium Stealth Frame)

![IF-45M-1 "Specter" Technical Sketch](../images/if_45m_1_specter.jpg)

* **Initiative**: 10 | **Tonnage**: 45 Tons | **Points**: 435 pts | **Movement Limit**: 5 hexes | **Evasion Limit**: 5 EVA

### ⚡ Energy & Evasion
* **Reactor EP (9/turn)**: `[ ] 1` | `[ ] 2` | `[ ] 3` | `[ ] 4` | `[ ] 5 (IR Lockable)` | `[ ] 6` | `[ ] 7` | `[ ] 8` | `[ ] 9`  
  *(Fill left-to-right during Energy Phase to generate EP. Erase/unmark right-to-left as EP is spent; spending 5+ EP total during the turn makes the Frame vulnerable to IR locks)*
* **Capacitor Storage (Max 4 EP)**: `[ ] 1` | `[ ] 2` | `[ ] 3` | `[ ] 4`
* **Evasion Tracker (Max 5 EVA)**: `[ ] 1` | `[ ] 2` | `[ ] 3` | `[ ] 4` | `[ ] 5`  
  *(Mark generated Evasion during movement; resets in End Phase)*

### 🔫 Armaments & Systems
* **Left Arm [Light HP]: Laser** (2d6 Combat damage | 2 EP cost | Overcharge: [+1/+2 EP for +2/+4 flat damage] | Any Lock [VIS/IR/Radar])  
  *Ammo*: Infinite
* **Right Arm [Medium HP]: Disruptor Cannon** (Directed Energy Disruptor | 3 EP cost | Overcharge: [+2 EP to force Crit AND drain 1d6 EP simultaneously])  
  *Ammo*: Infinite (Bypasses EVA/DR. Normal hit: Torso [7,12] drains 1d6 EP; Limbs [3-6, 8-11]/Head [2] force Crits)
* **Torso [Medium HP]: Active Metamaterial Coating (AMC)** (Stealth Upgrade)  
  *Upkeep*: 2 EP (Cloaks 1 spectrum) | Overcharge: [+2 EP to cloak 2nd spectrum]  
  *Status*: `[ ] Active` | *Cloaked Band*: `[ ] VIS` | `[ ] IR` | `[ ] RAD` *(Mark 1 band; mark 2 if Overcharged)*
* **Head [Light HP]: Tactical Datalink**: Shares locks and target telemetry in real time.

### 🛡️ Locational Status

| Location | Armor DR Tracker (Cross off highest on hit) | Internal Structure (Mark on damage) |
| :--- | :--- | :--- |
| **Head** | `[3] [2] [1] [0]` | `[ ] [ ] [ ] [ ] [ ]` (5 IS) |
| **Torso** | `[4] [3] [2] [1] [0]` | `[ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ]` (10 IS) |
| **Left Arm** | `[2] [1] [0]` | `[ ] [ ] [ ] [ ] [ ] [ ]` (6 IS) |
| **Right Arm** | `[2] [1] [0]` | `[ ] [ ] [ ] [ ] [ ] [ ]` (6 IS) |
| **Left Leg** | `[3] [2] [1] [0]` | `[ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ]` (8 IS) |
| **Right Leg** | `[3] [2] [1] [0]` | `[ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ]` (8 IS) |

### 💥 Critical Damage Logs

| Roll | Head | Torso | Arms (L / R) | Legs (L / R) |
| :---: | :--- | :--- | :--- | :--- |
| **1** | `[ ]` **Sensor Flicker** *(Max 5 hexes)* | `[ ]` **System Glitch** *(-1 EP next turn)* | `[ ] / [ ]` **Weapon Calib.** *(+1 EP cost)* | `[ ] / [ ]` **Toe Act.** *(-1 Pilot Check)* |
| **2** | `[ ]` **Comm Static** *(No Datalink)* | `[ ]` **Cap Leak** *(-2 Cap Max)* | `[ ] / [ ]` **Weapon Damaged** *(Attacker picks 1)* | `[ ] / [ ]` **Knee Lock** *(+1 EP per hex)* |
| **3** | `[ ]` **Pilot Stunned** *(0 EP next)* | `[ ]` **Reactor Dmg** *(-2 EP/turn)* | `[ ] / [ ]` **Shoulder Jam** *(Fwd Arc only)* | `[ ] / [ ]` **Hip Act.** *(-1 EVA Limit)* |
| **4** | `[ ]` **Sensors Down** *(No Locks)* | `[ ]` **Gyro Lock** *(No Torso Twist)* | `[ ] / [ ]` **Armor Blown** *(DR to 0)* | `[ ] / [ ]` **Armor Blown** *(DR to 0)* |
| **5** | `[ ]` **Cockpit Breach** *(-3 Init)* | `[ ]` **Ammo Expl.** *(Internal Blast)* | `[ ] / [ ]` **Ammo Cut** *(Cannot Fire)* | `[ ] / [ ]` **Thruster Wreck** *(Cannot Jump)* |
| **6** | `[ ]` **Pilot K.O.** *(Dead)* | `[ ]` **Core Melt** *(Destroyed)* | `[ ] / [ ]` **Arm Severed** *(Destroyed)* | `[ ] / [ ]` **Leg Severed** *(Immobilized)* |
