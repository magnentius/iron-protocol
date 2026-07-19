# 🐺 IF-25L-1 "Jackal" (Light Recon Frame)

![IF-25L-1 "Jackal" Technical Sketch](../images/if_25l_1_jackal.jpg)

* **Initiative**: 12 | **Tonnage**: 25 Tons | **Points**: 370 pts | **Movement Limit**: 7 hexes | **Evasion Limit**: 6 EVA

### ⚡ Energy & Evasion
* **Reactor EP (8/turn)**: `[ ] 1` | `[ ] 2` | `[ ] 3` | `[ ] 4` | `[ ] 5 (IR Lockable)` | `[ ] 6` | `[ ] 7` | `[ ] 8`  
  *(Mark left-to-right for Spent EP; spending 5+ EP total makes the Frame vulnerable to IR locks. Mark right-to-left for Upkeep)*
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
| **2** | `[ ]` **Comm Static** *(No Datalink)* | `[ ]` **Cap Leak** *(-2 Cap Max)* | `[ ] / [ ]` **Weapon Damaged** *(-1d6 dmg)* | `[ ] / [ ]` **Knee Lock** *(-1 Move Limit)* |
| **3** | `[ ]` **Pilot Stunned** *(0 EP next)* | `[ ]` **Reactor Dmg** *(-2 EP/turn)* | `[ ] / [ ]` **Shoulder Jam** *(Fwd Arc only)* | `[ ] / [ ]` **Hip Act.** *(-1 EVA Limit)* |
| **4** | `[ ]` **Life Support** *(Pilot takes 1 dmg/turn)* | `[ ]` **Engine Hit** *(+1 Heat/turn)* | `[ ] / [ ]` **Actuator Hit** *(-1 Hit)* | `[ ] / [ ]` **Ankle Act.** *(-2 Move Limit)* |
| **5** | `[ ]` **Sensors Dest.** *(No Locks)* | `[ ]` **Gyro Hit** *(-1 EVA Limit)* | `[ ] / [ ]` **Ammo Feed Cut** *(Disabled)* | `[ ] / [ ]` **Leg Blown Off** *(Prone)* |
| **6+** | `[ ]` **Cockpit Breach** *(Pilot Killed)* | `[ ]` **Reactor Core** *(Destroyed)* | `[ ] / [ ]` **Arm Severed** *(Destroyed)* | `[ ] / [ ]` **Leg Severed** *(Destroyed)* |
