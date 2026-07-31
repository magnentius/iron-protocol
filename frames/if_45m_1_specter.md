# 🛠️ IF-45M-1 "Specter" (Medium Stealth Frame)

![IF-45M-1 "Specter" Technical Sketch](../images/if_45m_1_specter.jpg)

* **Initiative**: 10 | **Tonnage**: 45 Tons | **Points**: 405 pts | **Movement Limit**: 5 hexes | **Flank Speed**: 4 hexes

### ⚡ Energy
* **Reactor EP (9/turn)**: `[ ] 1` | `[ ] 2` | `[ ] 3` | `[ ] 4` | `[ ] 5 (IR Lockable)` | `[ ] 6` | `[ ] 7` | `[ ] 8` | `[ ] 9`  
  *(Fill left-to-right during Energy Phase to generate EP. Erase/unmark right-to-left as EP is spent; spending 5+ EP total during the turn makes the Frame vulnerable to IR locks)*
* **Capacitor Storage (Max 4 EP)**: `[ ] 1` | `[ ] 2` | `[ ] 3` | `[ ] 4`

### 🔫 Armaments & Systems
* **Left Arm [Light HP]: Laser** (2d6 Combat damage | 2 EP cost | Overcharge: [+1/+2 EP for +2/+4 flat damage] | Any Lock [VIS/IR/Radar])  
  *Ammo*: Infinite
* **Right Arm [Medium HP]: Disruptor Cannon** (Directed Energy Disruptor | 3 EP cost | Overcharge: [+2 EP to force Crit AND drain 1d6 EP simultaneously])  
  *Ammo*: Infinite (Naturally bypasses Flanking/Cover/DR. Normal hit: Torso hit drains 1d6 EP; Limb/Head hit forces a Crit)
* **Torso [Medium HP]: Active Metamaterial Coating (AMC)** (Stealth Upgrade)  
  *Upkeep*: 2 EP (Cloaks 1 spectrum) | Overcharge: [+2 EP to cloak 2nd spectrum]  
  *Status*: `[ ] Active` | *Cloaked Band*: `[ ] VIS` | `[ ] IR` | `[ ] RAD` *(Mark 1 band; mark 2 if Overcharged)*
* **Head [Light HP]: Tactical Datalink**: Shares locks and target telemetry in real time.

### 🛡️ Locational Status

| Location | Armor DR Tracker (Cross off highest on hit) |
| :--- | :--- |
| **Head** | `[3] [2] [1] [0]` |
| **Torso** | `[4] [3] [2] [1] [0]` |
| **Left Arm** | `[2] [1] [0]` |
| **Right Arm** | `[2] [1] [0]` |
| **Left Leg** | `[3] [2] [1] [0]` |
| **Right Leg** | `[3] [2] [1] [0]` |

### 💥 Critical Damage Logs

| Roll | Head (1-5) | Torso (1-8) | Arms (L / R) | Legs (L / R) |
| :---: | :--- | :--- | :--- | :--- |
| **1** | `[ ]` **Datalink/Scramble** *(No Comm)* | `[ ]` **System Glitch** *(-1 EP next turn)* | `[ ] / [ ]` **Target Jitter** *(-1 Dmg)* | `[ ] / [ ]` **Gyro Glitch** *(-1 Pilot Check)* |
| **2** | `[ ]` **Thermal Sensors** *(No IR)* | `[ ]` **Servo Lock** *(2 EP to Twist)* | `[ ] / [ ]` **Actuator Strain** *(+1 EP to Fire)* | `[ ] / [ ]` **Knee Lock** *(+1 EP per hex)* |
| **3** | `[ ]` **Radar Sensors** *(No Radar)* | `[ ]` **Cap Leak** *(-2 Cap Max)* | `[ ] / [ ]` **Servo Failure** *(Fwd Arc only)* | `[ ] / [ ]` **Hip Act.** *(-2 Movement)* |
| **4** | `[ ]` **Optical Sensors** *(No VIS)* | `[ ]` **Heat Sinks Off** *(No Overcharge)* | `[ ] / [ ]` **Hardpoint Fail** *(-1 Dmg Die)* | `[ ] / [ ]` **Gyro Failure** *(-2 Pilot Check)* |
| **5** | `[ ]` **Pilot K.O.** *(Dead)* | `[ ]` **Reactor Dmg** *(-2 EP/turn)* | `[ ] / [ ]` **Weapon/Ammo Cut** *(Destroyed)* | `[ ] / [ ]` **Thruster Wreck** *(Cannot Jump)* |
| **6** | - | `[ ]` **Ammo Expl.** *(Empty & +2 Crits)* | `[ ] / [ ]` **Arm Severed** *(Destroyed)* | `[ ] / [ ]` **Leg Severed** *(Destroyed)* |
| **7** | - | `[ ]` **Elect. Fire** *(+1 Crit/Turn)* | - | - |
| **8** | - | `[ ]` **Reactor Melt** *(Destroyed)* | - | - |

