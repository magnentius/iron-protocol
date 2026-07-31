# 🛡️ IF-75H-1 "Paladin" (Heavy Fire-Support Frame)

![IF-75H-1 "Paladin" Technical Sketch](../images/if_75h_1_paladin.jpg)

* **Initiative**: 5 | **Tonnage**: 75 Tons | **Points**: 540 pts | **Movement Limit**: 4 hexes | **Evasion Limit**: 2 EVA

### ⚡ Energy & Evasion
* **Reactor EP (14/turn)**: `[ ] 1` | `[ ] 2` | `[ ] 3` | `[ ] 4` | `[ ] 5 (IR Lockable)` | `[ ] 6` | `[ ] 7` | `[ ] 8` | `[ ] 9` | `[ ] 10` | `[ ] 11` | `[ ] 12` | `[ ] 13` | `[ ] 14`  
  *(Fill left-to-right during Energy Phase to generate EP. Erase/unmark right-to-left as EP is spent; spending 5+ EP total during the turn makes the Frame vulnerable to IR locks)*
* **Capacitor Storage (Max 8 EP)**: `[ ] 1` | `[ ] 2` | `[ ] 3` | `[ ] 4` | `[ ] 5` | `[ ] 6` | `[ ] 7` | `[ ] 8`
* **Evasion Tracker (Max 2 EVA)**: `[ ] 1` | `[ ] 2`  
  *(Mark generated Evasion during movement; resets in End Phase)*

### 🔫 Armaments & Systems
* **Right Arm [Heavy HP]: Rail Gun** (3d6+10 damage | 6 EP cost | AP 3 | Cooldown: 1 Turn)  
  *Ammo Tracker (5 Kinetic Slugs)*: `[ ] Slug 1` | `[ ] Slug 2` | `[ ] Slug 3` | `[ ] Slug 4` | `[ ] Slug 5`
* **Left Arm [Light HP]: Autocannon** (3x 1d6 burst | 1 EP / burst | Loaded with AP 1 ammo)  
  *Ammo Tracker (10 AP Bursts)*: `[ ] 1` | `[ ] 2` | `[ ] 3` | `[ ] 4` | `[ ] 5` | `[ ] 6` | `[ ] 7` | `[ ] 8` | `[ ] 9` | `[ ] 10` (AP 1)
* **Torso [Medium HP]: Guided Missile Launcher** (2 EP cost | Microwave [Radar] Guided | Cluster Warheads deal 2d6 to every location)  
  *Salvo Tracker (4 Salvos)*: `[ ] Salvo 1` | `[ ] Salvo 2` | `[ ] Salvo 3` | `[ ] Salvo 4`
* **Torso [Light HP]: Defensive Smoke Launcher** (Blocks Visual sightlines | 1 EP use cost)  
  *Charges (2 charges)*: `[ ] Charge 1` | `[ ] Charge 2`
* **Torso [Light HP]: Defensive Flare Launcher** (Deflects seeking missiles | 1 EP use cost)  
  *Charges (3 charges)*: `[ ] Charge 1` | `[ ] Charge 2` | `[ ] Charge 3`
* **Head [Light HP]: Tactical Datalink**: Shares locks and target telemetry in real time.

### 🛡️ Locational Status

| Location | Armor DR Tracker (Cross off highest on hit) | Internal Structure (Mark on damage) |
| :--- | :--- | :--- |
| **Head** | `[4] [3] [2] [1] [0]` | `[ ] [ ] [ ] [ ] [ ] [ ] [ ]` (7 IS) |
| **Torso** | `[6] [5] [4] [3] [2] [1] [0]` | `[ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ]` (16 IS) |
| **Left Arm** | `[4] [3] [2] [1] [0]` | `[ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ]` (10 IS) |
| **Right Arm** | `[4] [3] [2] [1] [0]` | `[ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ]` (10 IS) |
| **Left Leg** | `[5] [4] [3] [2] [1] [0]` | `[ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ]` (12 IS) |
| **Right Leg** | `[5] [4] [3] [2] [1] [0]` | `[ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ]` (12 IS) |

### 💥 Critical Damage Logs

| Roll | Head | Torso | Arms (L / R) | Legs (L / R) |
| :---: | :--- | :--- | :--- | :--- |
| **1** | `[ ]` **Sensor Flicker** *(Max 5 hexes)* | `[ ]` **System Glitch** *(-1 EP next turn)* | `[ ] / [ ]` **Weapon Calib.** *(+1 EP cost)* | `[ ] / [ ]` **Toe Act.** *(-1 Pilot Check)* |
| **2** | `[ ]` **Comm Static** *(No Datalink)* | `[ ]` **Cap Leak** *(-2 Cap Max)* | `[ ] / [ ]` **Weapon Damaged** *(Attacker picks 1)* | `[ ] / [ ]` **Knee Lock** *(+1 EP per hex)* |
| **3** | `[ ]` **Pilot Stunned** *(0 EP next)* | `[ ]` **Reactor Dmg** *(-2 EP/turn)* | `[ ] / [ ]` **Shoulder Jam** *(Fwd Arc only)* | `[ ] / [ ]` **Hip Act.** *(-1 EVA Limit)* |
| **4** | `[ ]` **Sensors Down** *(No Locks)* | `[ ]` **Gyro Lock** *(No Torso Twist)* | `[ ] / [ ]` **Armor Blown** *(DR to 0)* | `[ ] / [ ]` **Armor Blown** *(DR to 0)* |
| **5** | `[ ]` **Cockpit Breach** *(-3 Init)* | `[ ]` **Ammo Expl.** *(Internal Blast)* | `[ ] / [ ]` **Ammo Cut** *(Cannot Fire)* | `[ ] / [ ]` **Thruster Wreck** *(Cannot Jump)* |
| **6** | `[ ]` **Pilot K.O.** *(Dead)* | `[ ]` **Core Melt** *(Destroyed)* | `[ ] / [ ]` **Arm Severed** *(Destroyed)* | `[ ] / [ ]` **Leg Severed** *(Immobilized)* |
