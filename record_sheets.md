# Iron Protocol — Printable Record Sheets

Use these pre-populated record sheets to track reactor energy, armor degradation, internal structure damage, critical hits, and ammunition during play.

---

## 🧭 How to Use the Trackers:
* **Armor DR [5][4][3]**: Cross out the highest active number when a location suffers a penetrating hit (e.g. if DR is 5 and degrades, cross out `[5]`; your current DR is now 4).
* **Internal Structure [ ]**: Mark off check boxes from left to right as structural damage is suffered.
* **Criticals [ ]**: Check the box when a location suffers critical damage to track active debuffs.
* **Ammo [ ]**: Cross off a box for each round/salvo fired.

---

## 🐺 IF-25L-1 "Jackal" (Light Recon Frame)

* **Initiative**: 12 | **Tonnage**: 25 Tons | **Points**: 320 pts | **Movement Limit**: 7 hexes | **Evasion Limit**: 6 EVA

### ⚡ Energy Pool
* **Reactor EP (8/turn)**: `[ ] 1` | `[ ] 2` | `[ ] 3` | `[ ] 4` | `[ ] 5` | `[ ] 6` | `[ ] 7` | `[ ] 8`  
  *(Mark left-to-right for Spent EP. Mark right-to-left for Upkeep)*
* **Capacitor Storage (Max 3 EP)**: `[ ] 1` | `[ ] 2` | `[ ] 3`

### 🔫 Armaments & Systems
* **Left Arm [Light HP]: Laser** (1d6 Combat + 1d6 End damage | 2 EP cost | End Phase damage bypasses Armor DR)  
  *Ammo*: Infinite
* **Right Arm [Light HP]: Autocannon** (2d6 damage | 1 EP cost | Configured with AP loadout)  
  *AP Bursts (10)*: `[ ] 1` | `[ ] 2` | `[ ] 3` | `[ ] 4` | `[ ] 5` | `[ ] 6` | `[ ] 7` | `[ ] 8` | `[ ] 9` | `[ ] 10` (AP ignores 2 DR)
* **Torso [Light HP]: Jump Jets** (Allows jumping over elevation/terrain | +2 EP cost to movement)
* **Head [Light HP]: Tactical Datalink**: Shares locks and target telemetry in real time.

### 🛡️ Locational Status

| Location | Armor DR Tracker (Cross off highest on hit) | Internal Structure (Mark on damage) |
| :--- | :--- | :--- |
| **Head** | `[1] [0]` | `[ ] [ ] [ ]` (3 IS) |
| **Torso** | `[2] [1] [0]` | `[ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ]` (8 IS) |
| **Left Arm** | `[1] [0]` | `[ ] [ ] [ ] [ ]` (4 IS) |
| **Right Arm** | `[1] [0]` | `[ ] [ ] [ ] [ ]` (4 IS) |
| **Left Leg** | `[2] [1] [0]` | `[ ] [ ] [ ] [ ] [ ]` (5 IS) |
| **Right Leg** | `[2] [1] [0]` | `[ ] [ ] [ ] [ ] [ ]` (5 IS)

### 💥 Critical Damage Logs

| Roll | Head | Torso | Arms (L / R) | Legs (L / R) |
| :---: | :--- | :--- | :--- | :--- |
| **1** | `[ ]` **Sensor Flicker** *(Max 5 hexes)* | `[ ]` **System Glitch** *(-1 EP next turn)* | `[ ] / [ ]` **Weapon Calib.** *(+1 EP cost)* | `[ ] / [ ]` **Toe Act.** *(-1 Stability)* |
| **2** | `[ ]` **Comm Static** *(No Datalink)* | `[ ]` **Cap Leak** *(-2 Cap Max)* | `[ ] / [ ]` **Weapon Damaged** *(-1d6 dmg)* | `[ ] / [ ]` **Knee Lock** *(-1 Move Limit)* |
| **3** | `[ ]` **Pilot Stunned** *(0 EP next)* | `[ ]` **Reactor Dmg** *(-2 EP/turn)* | `[ ] / [ ]` **Shoulder Jam** *(Fwd Arc only)* | `[ ] / [ ]` **Hip Act.** *(-1 EVA Limit)* |
| **4** | `[ ]` **Life Support** *(Pilot takes 1 dmg/turn)* | `[ ]` **Engine Hit** *(+1 Heat/turn)* | `[ ] / [ ]` **Actuator Hit** *(-1 Hit)* | `[ ] / [ ]` **Ankle Act.** *(-2 Move Limit)* |
| **5** | `[ ]` **Sensors Dest.** *(No Locks)* | `[ ]` **Gyro Hit** *(-1 EVA Limit)* | `[ ] / [ ]` **Ammo Feed Cut** *(Disabled)* | `[ ] / [ ]` **Leg Blown Off** *(Prone)* |
| **6+** | `[ ]` **Cockpit Breach** *(Pilot Killed)* | `[ ]` **Reactor Core** *(Mech Destroyed)* | `[ ] / [ ]` **Arm Severed** *(Destroyed)* | `[ ] / [ ]` **Leg Severed** *(Destroyed)* |

---
## 🛠️ IF-45M-1 "Specter" (Medium Stealth Frame)

* **Initiative**: 10 | **Tonnage**: 45 Tons | **Points**: 380 pts | **Movement Limit**: 5 hexes | **Evasion Limit**: 5 EVA

### ⚡ Energy Pool
* **Reactor EP (9/turn)**: `[ ] 1` | `[ ] 2` | `[ ] 3` | `[ ] 4` | `[ ] 5` | `[ ] 6` | `[ ] 7` | `[ ] 8` | `[ ] 9`  
  *(Mark left-to-right for Spent EP. Mark right-to-left for Upkeep)*
* **Capacitor Storage (Max 4 EP)**: `[ ] 1` | `[ ] 2` | `[ ] 3` | `[ ] 4`

### 🔫 Armaments & Systems
* **Right Arm [Medium HP]: Disruptor Cannon** (Directed Energy Disruptor | 3 EP cost)  
  *Ammo*: Infinite (Bypasses EVA/DR. Torso [7,12] drains EP; Limbs [3-6, 8-11]/Head [2] force Crits)
* **Torso [Medium HP]: Active Metamaterial Coating (AMC)** (Stealth Upgrade)  
  *Upkeep*: 2 EP per mode (Visual-Camouflage / IR-Suppression / Microwave-Absorbent).
* **Head [Light HP]: Tactical Datalink**: Shares locks and target telemetry in real time.

### 🛡️ Locational Status

| Location | Armor DR Tracker (Cross off highest on hit) | Internal Structure (Mark on damage) |
| :--- | :--- | :--- |
| **Head** | `[1] [0]` | `[ ] [ ] [ ]` (3 IS) |
| **Torso** | `[4] [3] [2] [1] [0]` | `[ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ]` (10 IS) |
| **Left Arm** | `[2] [1] [0]` | `[ ] [ ] [ ] [ ] [ ] [ ]` (6 IS) |
| **Right Arm** | `[2] [1] [0]` | `[ ] [ ] [ ] [ ] [ ] [ ]` (6 IS) |
| **Left Leg** | `[3] [2] [1] [0]` | `[ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ]` (8 IS) |
| **Right Leg** | `[3] [2] [1] [0]` | `[ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ]` (8 IS) |

### 💥 Critical Damage Logs

| Roll | Head | Torso | Arms (L / R) | Legs (L / R) |
| :---: | :--- | :--- | :--- | :--- |
| **1** | `[ ]` **Sensor Flicker** *(Max 5 hexes)* | `[ ]` **System Glitch** *(-1 EP next turn)* | `[ ] / [ ]` **Weapon Calib.** *(+1 EP cost)* | `[ ] / [ ]` **Toe Act.** *(-1 Stability)* |
| **2** | `[ ]` **Comm Static** *(No Datalink)* | `[ ]` **Cap Leak** *(-2 Cap Max)* | `[ ] / [ ]` **Weapon Damaged** *(-1d6 dmg)* | `[ ] / [ ]` **Knee Lock** *(-1 Move Limit)* |
| **3** | `[ ]` **Pilot Stunned** *(0 EP next)* | `[ ]` **Reactor Dmg** *(-2 EP/turn)* | `[ ] / [ ]` **Shoulder Jam** *(Fwd Arc only)* | `[ ] / [ ]` **Hip Act.** *(-1 EVA Limit)* |
| **4** | `[ ]` **Sensors Down** *(No Locks)* | `[ ]` **Gyro Lock** *(No Torso Twist)* | `[ ] / [ ]` **Armor Blown** *(DR to 0)* | `[ ] / [ ]` **Armor Blown** *(DR to 0)* |
| **5** | `[ ]` **Cockpit Breach** *(-3 Init)* | `[ ]` **Ammo Expl.** *(Internal Blast)* | `[ ] / [ ]` **Ammo Cut** *(Cannot Fire)* | `[ ] / [ ]` **Thruster Wreck** *(Cannot Jump)* |
| **6** | `[ ]` **Pilot K.O.** *(Dead)* | `[ ]` **Core Melt** *(Destroyed)* | `[ ] / [ ]` **Arm Severed** *(Destroyed)* | `[ ] / [ ]` **Leg Severed** *(Immobilized)* |

---

## ⚔️ IF-55M-1 "Vanguard" (Medium Skirmisher Frame)

* **Initiative**: 6 | **Tonnage**: 55 Tons | **Points**: 415 pts | **Movement Limit**: 5 hexes | **Evasion Limit**: 3 EVA

### ⚡ Energy Pool
* **Reactor EP (12/turn)**: `[ ] 1` | `[ ] 2` | `[ ] 3` | `[ ] 4` | `[ ] 5` | `[ ] 6` | `[ ] 7` | `[ ] 8` | `[ ] 9` | `[ ] 10` | `[ ] 11` | `[ ] 12`  
  *(Mark left-to-right for Spent EP. Mark right-to-left for Upkeep)*
* **Capacitor Storage (Max 6 EP)**: `[ ] 1` | `[ ] 2` | `[ ] 3` | `[ ] 4` | `[ ] 5` | `[ ] 6`

### 🔫 Armaments & Systems
* **Left Arm [Light HP]: Autocannon** (2d6 damage | 1 EP cost | Configured with AP / HEI dual loadout)  
  *AP Bursts (5)*: `[ ] 1` | `[ ] 2` | `[ ] 3` | `[ ] 4` | `[ ] 5` (AP ignores 2 DR)  
  *HEI Bursts (5)*: `[ ] 1` | `[ ] 2` | `[ ] 3` | `[ ] 4` | `[ ] 5` (HEI adds +2 to crits)
* **Right Arm [Light HP]: Laser** (1d6 Combat + 1d6 End damage | 2 EP cost | End Phase damage bypasses Armor DR)  
  *Ammo*: Infinite
* **Torso [Light HP]: Defensive Flare Launcher** (Deflects locking missiles | 1 EP use cost)  
  *Charges (3 charges)*: `[ ] Charge 1` | `[ ] Charge 2` | `[ ] Charge 3`
* **Torso [Medium HP]: ECM Suite** (Jams Microwave locks | Upkeep: 2 EP)
* **Head [Light HP]: Tactical Datalink**: Shares locks and target telemetry in real time.

### 🛡️ Locational Status

| Location | Armor DR Tracker (Cross off highest on hit) | Internal Structure (Mark on damage) |
| :--- | :--- | :--- |
| **Head** | `[2] [1] [0]` | `[ ] [ ] [ ] [ ]` (4 IS) |
| **Torso** | `[5] [4] [3] [2] [1] [0]` | `[ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ]` (12 IS) |
| **Left Arm** | `[3] [2] [1] [0]` | `[ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ]` (8 IS) |
| **Right Arm** | `[3] [2] [1] [0]` | `[ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ]` (8 IS) |
| **Left Leg** | `[4] [3] [2] [1] [0]` | `[ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ]` (10 IS) |
| **Right Leg** | `[4] [3] [2] [1] [0]` | `[ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ]` (10 IS) |

### 💥 Critical Damage Logs

| Roll | Head | Torso | Arms (L / R) | Legs (L / R) |
| :---: | :--- | :--- | :--- | :--- |
| **1** | `[ ]` **Sensor Flicker** *(Max 5 hexes)* | `[ ]` **System Glitch** *(-1 EP next turn)* | `[ ] / [ ]` **Weapon Calib.** *(+1 EP cost)* | `[ ] / [ ]` **Toe Act.** *(-1 Stability)* |
| **2** | `[ ]` **Comm Static** *(No Datalink)* | `[ ]` **Cap Leak** *(-2 Cap Max)* | `[ ] / [ ]` **Weapon Damaged** *(-1d6 dmg)* | `[ ] / [ ]` **Knee Lock** *(-1 Move Limit)* |
| **3** | `[ ]` **Pilot Stunned** *(0 EP next)* | `[ ]` **Reactor Dmg** *(-2 EP/turn)* | `[ ] / [ ]` **Shoulder Jam** *(Fwd Arc only)* | `[ ] / [ ]` **Hip Act.** *(-1 EVA Limit)* |
| **4** | `[ ]` **Sensors Down** *(No Locks)* | `[ ]` **Gyro Lock** *(No Torso Twist)* | `[ ] / [ ]` **Armor Blown** *(DR to 0)* | `[ ] / [ ]` **Armor Blown** *(DR to 0)* |
| **5** | `[ ]` **Cockpit Breach** *(-3 Init)* | `[ ]` **Ammo Expl.** *(Internal Blast)* | `[ ] / [ ]` **Ammo Cut** *(Cannot Fire)* | `[ ] / [ ]` **Thruster Wreck** *(Cannot Jump)* |
| **6** | `[ ]` **Pilot K.O.** *(Dead)* | `[ ]` **Core Melt** *(Destroyed)* | `[ ] / [ ]` **Arm Severed** *(Destroyed)* | `[ ] / [ ]` **Leg Severed** *(Immobilized)* |

---

## 🛡️ IF-75H-1 "Paladin" (Heavy Fire-Support Frame)

* **Initiative**: 5 | **Tonnage**: 75 Tons | **Points**: 520 pts | **Movement Limit**: 4 hexes | **Evasion Limit**: 2 EVA

### ⚡ Energy Pool
* **Reactor EP (14/turn)**: `[ ] 1` | `[ ] 2` | `[ ] 3` | `[ ] 4` | `[ ] 5` | `[ ] 6` | `[ ] 7` | `[ ] 8` | `[ ] 9` | `[ ] 10` | `[ ] 11` | `[ ] 12` | `[ ] 13` | `[ ] 14`  
  *(Mark left-to-right for Spent EP. Mark right-to-left for Upkeep)*
* **Capacitor Storage (Max 8 EP)**: `[ ] 1` | `[ ] 2` | `[ ] 3` | `[ ] 4` | `[ ] 5` | `[ ] 6` | `[ ] 7` | `[ ] 8`

### 🔫 Armaments & Systems
* **Right Arm [Heavy HP]: Rail Gun** (3d6+5 damage | 6 EP cost | Ignores 3 DR | Cooldown: 1 Turn)  
  *Ammo Tracker (5 Kinetic Slugs)*: `[ ] Slug 1` | `[ ] Slug 2` | `[ ] Slug 3` | `[ ] Slug 4` | `[ ] Slug 5`
* **Left Arm [Light HP]: Autocannon** (2d6 damage | 1 EP cost | Loaded with AP ammo)  
  *Ammo Tracker (10 AP Bursts)*: `[ ] 1` | `[ ] 2` | `[ ] 3` | `[ ] 4` | `[ ] 5` | `[ ] 6` | `[ ] 7` | `[ ] 8` | `[ ] 9` | `[ ] 10`
* **Torso [Medium HP]: Guided Missile Launcher** (2 EP cost | Microwave [Radar] Guided | Cluster Warheads deal 1d6 to 5 locations)  
  *Salvo Tracker (4 Salvos)*: `[ ] Salvo 1` | `[ ] Salvo 2` | `[ ] Salvo 3` | `[ ] Salvo 4`
* **Torso [Light HP]: Defensive Smoke Launcher** (Blocks Visual sightlines | 1 EP use cost)  
  *Charges (2 charges)*: `[ ] Charge 1` | `[ ] Charge 2`
* **Torso [Light HP]: Defensive Flare Launcher** (Deflects seeking missiles | 1 EP use cost)  
  *Charges (3 charges)*: `[ ] Charge 1` | `[ ] Charge 2` | `[ ] Charge 3`
* **Head [Light HP]: Tactical Datalink**: Shares locks and target telemetry in real time.

### 🛡️ Locational Status

| Location | Armor DR Tracker (Cross off highest on hit) | Internal Structure (Mark on damage) |
| :--- | :--- | :--- |
| **Head** | `[2] [1] [0]` | `[ ] [ ] [ ] [ ] [ ]` (5 IS) |
| **Torso** | `[6] [5] [4] [3] [2] [1] [0]` | `[ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ]` (16 IS) |
| **Left Arm** | `[4] [3] [2] [1] [0]` | `[ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ]` (10 IS) |
| **Right Arm** | `[4] [3] [2] [1] [0]` | `[ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ]` (10 IS) |
| **Left Leg** | `[5] [4] [3] [2] [1] [0]` | `[ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ]` (12 IS) |
| **Right Leg** | `[5] [4] [3] [2] [1] [0]` | `[ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ]` (12 IS) |

### 💥 Critical Damage Logs

| Roll | Head | Torso | Arms (L / R) | Legs (L / R) |
| :---: | :--- | :--- | :--- | :--- |
| **1** | `[ ]` **Sensor Flicker** *(Max 5 hexes)* | `[ ]` **System Glitch** *(-1 EP next turn)* | `[ ] / [ ]` **Weapon Calib.** *(+1 EP cost)* | `[ ] / [ ]` **Toe Act.** *(-1 Stability)* |
| **2** | `[ ]` **Comm Static** *(No Datalink)* | `[ ]` **Cap Leak** *(-2 Cap Max)* | `[ ] / [ ]` **Weapon Damaged** *(-1d6 dmg)* | `[ ] / [ ]` **Knee Lock** *(-1 Move Limit)* |
| **3** | `[ ]` **Pilot Stunned** *(0 EP next)* | `[ ]` **Reactor Dmg** *(-2 EP/turn)* | `[ ] / [ ]` **Shoulder Jam** *(Fwd Arc only)* | `[ ] / [ ]` **Hip Act.** *(-1 EVA Limit)* |
| **4** | `[ ]` **Sensors Down** *(No Locks)* | `[ ]` **Gyro Lock** *(No Torso Twist)* | `[ ] / [ ]` **Armor Blown** *(DR to 0)* | `[ ] / [ ]` **Armor Blown** *(DR to 0)* |
| **5** | `[ ]` **Cockpit Breach** *(-3 Init)* | `[ ]` **Ammo Expl.** *(Internal Blast)* | `[ ] / [ ]` **Ammo Cut** *(Cannot Fire)* | `[ ] / [ ]` **Thruster Wreck** *(Cannot Jump)* |
| **6** | `[ ]` **Pilot K.O.** *(Dead)* | `[ ]` **Core Melt** *(Destroyed)* | `[ ] / [ ]` **Arm Severed** *(Destroyed)* | `[ ] / [ ]` **Leg Severed** *(Immobilized)* |

---

## 🌋 IF-90A-1 "Colossus" (Heavy Assault Frame)

* **Initiative**: 3 | **Tonnage**: 90 Tons | **Points**: 625 pts | **Movement Limit**: 3 hexes | **Evasion Limit**: 1 EVA

### ⚡ Energy Pool
* **Reactor EP (18/turn)**: `[ ] 1` | `[ ] 2` | `[ ] 3` | `[ ] 4` | `[ ] 5` | `[ ] 6` | `[ ] 7` | `[ ] 8` | `[ ] 9` | `[ ] 10` | `[ ] 11` | `[ ] 12` | `[ ] 13` | `[ ] 14` | `[ ] 15` | `[ ] 16` | `[ ] 17` | `[ ] 18`  
  *(Mark left-to-right for Spent EP. Mark right-to-left for Upkeep)*
* **Capacitor Storage (Max 10 EP)**: `[ ] 1` | `[ ] 2` | `[ ] 3` | `[ ] 4` | `[ ] 5` | `[ ] 6` | `[ ] 7` | `[ ] 8` | `[ ] 9` | `[ ] 10`

### 🔫 Armaments & Systems
* **Left Arm [Heavy HP]: Thermal Lance (TL)** (2d6 Combat + 2d6 End damage | 4 EP cost | End damage bypasses DR | Any Lock [VIS/IR/Radar])  
  *Ammo*: Infinite
* **Right Arm [Heavy HP]: Rail Gun** (3d6+5 damage | 6 EP cost | Ignores 3 DR | Cooldown: 1 Turn)  
  *Ammo Tracker (5 Kinetic Slugs)*: `[ ] Slug 1` | `[ ] Slug 2` | `[ ] Slug 3` | `[ ] Slug 4` | `[ ] Slug 5`
* **Torso [Medium HP]: Guided Missile Launcher** (2 EP cost | Infrared [IR] Guided | EMP Warheads offline target sensors)  
  *Salvo Tracker (4 Salvos)*: `[ ] Salvo 1` | `[ ] Salvo 2` | `[ ] Salvo 3` | `[ ] Salvo 4`
* **Torso [Light HP]: Defensive Smoke Launcher** (Blocks Visual sightlines | 1 EP use cost)  
  *Charges (2 charges)*: `[ ] Charge 1` | `[ ] Charge 2`
* **Torso [Light HP]: Defensive Flare Launcher** (Deflects seeking missiles | 1 EP use cost)  
  *Charges (3 charges)*: `[ ] Charge 1` | `[ ] Charge 2` | `[ ] Charge 3`
* **Head [Light HP]: Tactical Datalink**: Shares locks and target telemetry in real time.

### 🛡️ Locational Status

| Location | Armor DR Tracker (Cross off highest on hit) | Internal Structure (Mark on damage) |
| :--- | :--- | :--- |
| **Head** | `[3] [2] [1] [0]` | `[ ] [ ] [ ] [ ] [ ] [ ]` (6 IS) |
| **Torso** | `[7] [6] [5] [4] [3] [2] [1] [0]` | `[ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ]` (20 IS) |
| **Left Arm** | `[5] [4] [3] [2] [1] [0]` | `[ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ]` (12 IS) |
| **Right Arm** | `[5] [4] [3] [2] [1] [0]` | `[ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ]` (12 IS) |
| **Left Leg** | `[6] [5] [4] [3] [2] [1] [0]` | `[ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ]` (15 IS) |
| **Right Leg** | `[6] [5] [4] [3] [2] [1] [0]` | `[ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ]` (15 IS) |

### 💥 Critical Damage Logs

| Roll | Head | Torso | Arms (L / R) | Legs (L / R) |
| :---: | :--- | :--- | :--- | :--- |
| **1** | `[ ]` **Sensor Flicker** *(Max 5 hexes)* | `[ ]` **System Glitch** *(-1 EP next turn)* | `[ ] / [ ]` **Weapon Calib.** *(+1 EP cost)* | `[ ] / [ ]` **Toe Act.** *(-1 Stability)* |
| **2** | `[ ]` **Comm Static** *(No Datalink)* | `[ ]` **Cap Leak** *(-2 Cap Max)* | `[ ] / [ ]` **Weapon Damaged** *(-1d6 dmg)* | `[ ] / [ ]` **Knee Lock** *(-1 Move Limit)* |
| **3** | `[ ]` **Pilot Stunned** *(0 EP next)* | `[ ]` **Reactor Dmg** *(-2 EP/turn)* | `[ ] / [ ]` **Shoulder Jam** *(Fwd Arc only)* | `[ ] / [ ]` **Hip Act.** *(-1 EVA Limit)* |
| **4** | `[ ]` **Sensors Down** *(No Locks)* | `[ ]` **Gyro Lock** *(No Torso Twist)* | `[ ] / [ ]` **Armor Blown** *(DR to 0)* | `[ ] / [ ]` **Armor Blown** *(DR to 0)* |
| **5** | `[ ]` **Cockpit Breach** *(-3 Init)* | `[ ]` **Ammo Expl.** *(Internal Blast)* | `[ ] / [ ]` **Ammo Cut** *(Cannot Fire)* | `[ ] / [ ]` **Thruster Wreck** *(Cannot Jump)* |
| **6** | `[ ]` **Pilot K.O.** *(Dead)* | `[ ]` **Core Melt** *(Destroyed)* | `[ ] / [ ]` **Arm Severed** *(Destroyed)* | `[ ] / [ ]` **Leg Severed** *(Immobilized)* |
