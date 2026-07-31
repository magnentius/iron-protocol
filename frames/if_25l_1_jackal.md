# 🐺 IF-25L-1 "Jackal" (Light Recon Frame)

![IF-25L-1 "Jackal" Technical Sketch](../images/if_25l_1_jackal.jpg)

* **Initiative**: 12 | **Tonnage**: 25 Tons | **Points**: 370 pts | **Movement Limit**: 7 hexes | **Evasion Limit**: 6 EVA

### ⚡ Energy & Evasion
* **Reactor EP (8/turn)**: `[ ] 1` | `[ ] 2` | `[ ] 3` | `[ ] 4` | `[ ] 5 (IR Lockable)` | `[ ] 6` | `[ ] 7` | `[ ] 8`  
  *(Fill left-to-right during Energy Phase to generate EP. Erase/unmark right-to-left as EP is spent; spending 5+ EP total during the turn makes the Frame vulnerable to IR locks)*
* **Capacitor Storage (Max 3 EP)**: `[ ] 1` | `[ ] 2` | `[ ] 3`
* **Evasion Tracker (Max 6 EVA)**: `[ ] 1` | `[ ] 2` | `[ ] 3` | `[ ] 4` | `[ ] 5` | `[ ] 6`  
  *(Mark generated Evasion during movement; resets in End Phase)*

### 🔫 Armaments & Systems
* **Left Arm [Light HP]: Laser** (2d6 Combat damage | 2 EP cost | Overcharge: [+1/+2 EP for +2/+4 flat damage] | Any Lock [VIS/IR/Radar])  
  *Ammo*: Infinite
* **Right Arm [Light HP]: Autocannon** (3x 1d6 burst | 1 EP / burst | Configured with AP loadout)  
  *AP Bursts (10)*: `[ ] 1` | `[ ] 2` | `[ ] 3` | `[ ] 4` | `[ ] 5` | `[ ] 6` | `[ ] 7` | `[ ] 8` | `[ ] 9` | `[ ] 10` (AP 1)
* **Torso [Light HP]: Jump Jets** (Allows jumping over elevation/terrain | +2 EP cost to movement)
* **Head [Light HP]: Tactical Datalink**: Shares locks and target telemetry in real time.

### 🛡️ Locational Status

| Location | Armor DR Tracker (Cross off highest on hit) | Internal Structure (Mark on damage) |
| :--- | :--- | :--- |
| **Head** | `[2] [1] [0]` | `[ ] [ ] [ ] [ ]` (4 IS) |
| **Torso** | `[2] [1] [0]` | `[ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ]` (8 IS) |
| **Left Arm** | `[1] [0]` | `[ ] [ ] [ ] [ ]` (4 IS) |
| **Right Arm** | `[1] [0]` | `[ ] [ ] [ ] [ ]` (4 IS) |
| **Left Leg** | `[2] [1] [0]` | `[ ] [ ] [ ] [ ] [ ]` (5 IS) |
| **Right Leg** | `[2] [1] [0]` | `[ ] [ ] [ ] [ ] [ ]` (5 IS)

### 💥 Critical Damage Logs

| Roll | Head | Torso | Arms (L / R) | Legs (L / R) |
| :---: | :--- | :--- | :--- | :--- |
| **1** | `[ ]` **Sensor Flicker** *(Max 5 hexes)* | `[ ]` **System Glitch** *(-1 EP next turn)* | `[ ] / [ ]` **Weapon Calib.** *(+1 EP cost)* | `[ ] / [ ]` **Toe Act.** *(-1 Pilot Check)* |
| **2** | `[ ]` **Comm Static** *(No Datalink)* | `[ ]` **Cap Leak** *(-2 Cap Max)* | `[ ] / [ ]` **Weapon Damaged** *(Attacker picks 1)* | `[ ] / [ ]` **Knee Lock** *(+1 EP per hex)* |
| **3** | `[ ]` **Pilot Stunned** *(0 EP next)* | `[ ]` **Reactor Dmg** *(-2 EP/turn)* | `[ ] / [ ]` **Shoulder Jam** *(Fwd Arc only)* | `[ ] / [ ]` **Hip Act.** *(-1 EVA Limit)* |
| **4** | `[ ]` **Sensors Down** *(No Locks)* | `[ ]` **Gyro Lock** *(No Torso Twist)* | `[ ] / [ ]` **Armor Blown** *(DR to 0)* | `[ ] / [ ]` **Armor Blown** *(DR to 0)* |
| **5** | `[ ]` **Cockpit Breach** *(-3 Init)* | `[ ]` **Ammo Expl.** *(Internal Blast)* | `[ ] / [ ]` **Ammo Cut** *(Cannot Fire)* | `[ ] / [ ]` **Thruster Wreck** *(Cannot Jump)* |
| **6** | `[ ]` **Pilot K.O.** *(Dead)* | `[ ]` **Core Melt** *(Destroyed)* | `[ ] / [ ]` **Arm Severed** *(Destroyed)* | `[ ] / [ ]` **Leg Severed** *(Immobilized)* |
