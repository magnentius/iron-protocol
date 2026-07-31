# Iron Protocol — Quick Reference Sheet (Gameplay)

## ⏱️ Turn Sequence

### 1. Energy Phase
1. **Energy Generation**: Every Frame generates EP equal to its Reactor Rating. Add to stored Capacitor EP.
2. **Stealth Upkeep**: Spend EP to maintain active Metamaterial Coating (AMC) modes or active ECM suites.

### 2. Activation Phase (Reverse Initiative Order)
*Frames activate from lowest Initiative to highest Initiative. Spend EP step-by-step.*
- **Forward Walk (W)**: 1 EP (climbing +1 EP per vertical level).
- **Reverse (R)**: 2 EP.
- **Pivot/Turn (TL/TR)**: 1 EP per 60 degrees.
- **Jump Jet (J)**: 2 EP per hex (Light and Medium only, straight line, max 4 hexes).
- **Movement Limit**: A Frame cannot enter more hexes than its weight class Movement Limit per turn.
- **Torso Twist**: At the end of activation, torso facing can twist up to 60 degrees left/right of leg facing for free.

### 3. Combat Phase (Initiative Order)
*Resolve attacks in order of highest Initiative to lowest Initiative (instantly resolved).*
1. **Select Weapon & Pay EP Cost** *(Overcharge: Extra EP MUST come from the Capacitor. Triggers 1-Turn Cooldown).*
2. **Verify Line of Sight (LOS) and Arc** (Torso = Forward Arc, Left Arm = Left Side Arc, Right Arm = Right Side Arc).
3. **Verify Sensor Lock** (Visual, Infrared, or Microwave).
4. **Determine Hit Location**: Roll 2d6.
5. **Roll Damage**: Roll weapon damage dice.
6. **Apply Target Evasion**: Subtract target's current EVA points from damage.
7. **Apply Armor DR**: Subtract hit location's current Armor DR from remaining damage.
8. **Resolve Damage**: Excess damage reduces hit location's Internal Structure (IS). If damage penetrates, permanently reduce that location's Armor DR by 1 (to minimum of 0).
9. **Roll Critical Hits**: If IS took 1+ damage, roll 1d6 on the location's Critical Table.
10. **Location Destruction & Transfer**: If IS reaches 0, the location is destroyed. Torso/Head destruction destroys the Frame. Severed Arm/Leg destroys mounted gear, forces fall (Leg), and transfers excess damage directly to the Torso (bypassing DR).

### 4. End Phase
1. **Bank Energy**: Store unused EP in the Capacitor (up to Capacitor Max). Excess EP is lost.
2. **Clean Up**: Remove Evasion tokens, decrement cooldowns, and reduce Smoke tokens by 1.

---

## ⚙️ Special Resolution Cases

| Case | Ruling |
| :--- | :--- |
| **Overcharge Allowance** | Whatever was banked in the Capacitor at the start of the turn is the cap on Overcharge EP for that turn. Bank nothing, Overcharge nothing. |
| **Rapid Fire + Evasion** | Each EVA point cancels the **single highest** remaining die. Survivors each resolve against the DR the location had when the attack began. |
| **Rapid Fire + Armor** | The whole attack degrades Armor DR by **1 total**, and rolls **one** Critical, however many dice got through. |
| **One attack per weapon** | Each mounted weapon fires **once per Combat Phase**, however much EP is left. Fire each of your weapons once, in any order. |
| **Full Auto** | Maximum **3 Bursts** per attack. One Hit Location for the whole barrage — the only way to put more rounds into a single spot. |
| **Disruptor Cannon** | No damage. Bypasses EVA and DR. Torso hit drains **1d6 EP**; any other location forces a **Critical**. Overcharge does both. |
| **AoE** | Bypasses Evasion *and* terrain Cover. Armor DR still applies. |
| **Prone (-1d6)** | Drop one die, keep flat bonuses (Rail Gun becomes 2d6+10). Rapid Fire loses one die per Burst. No effect on the Disruptor or EMP. |
| **Collision** | Armor DR applies; EVA does not. Both Frames roll the *moving* Frame's Mass + Speed pool. |
| **Damage Transfer** | Excess from a severed limb, and hits on an already-severed limb, go straight to Torso IS — bypassing EVA and DR, and **not** degrading Torso armor. |
| **Tracers** | Paint the target if not negated by Evasion, even when Armor DR stops the round cold. |
| **Flares** | Negate one attack made on an **IR lock**, from the **Front or Rear** zone only, declared before the Hit Location roll. |

---

## 📡 Sensor, Lock & Stealth Matrix

| Defense System / Terrain | Visual (VIS) Locks | Infrared (IR) Locks | Microwave (Radar) Locks |
| :--- | :--- | :--- | :--- |
| **Light Woods (2+ hexes)** | **BLOCKED** | *Clear* | *Clear* |
| **Heavy Woods (2+ hexes)** | **BLOCKED** | **BLOCKED** | *Clear* |
| **Smoke Screen** | **BLOCKED** | *Clear* | *Clear* |
| **Active ECM Suite** | *Clear* | *Clear* | **BLOCKED** |
| **AMC (Visual-Camouflage)** | **BLOCKED** (invisible) | *Clear* | *Clear* |
| **AMC (IR-Suppression)** | *Clear* | **BLOCKED** | *Clear* |
| **AMC (Microwave-Absorbent)**| *Clear* | *Clear* | **BLOCKED** |
| **Flares Countermeasure** | *Clear* | **Negates the attack** | *Clear* |

* **Infrared (IR) Lock Requirement**: Target must have spent **5+ EP** in its last activation to generate a heat signature.
* **Microwave (Radar)**: Direct LOS. Ignores Woods/Smoke. Blocked by solid Elevation.

---

## 💥 Movement & Falling Penalties

### Jump Jet Terrain Landing Table

| Landing Location | Pilot Check (TN 6+)? | Failure Effect (< 6) |
| :--- | :---: | :--- |
| **Clear / Paved** | **No** (Automatic) | Clean landing. |
| **Rough Terrain** | **Yes** | Falls **Prone** in landing hex. |
| **Water (Deep)** | **Yes** | Falls **Prone** in water. |
| **Building Roof** | **Yes** | Falls **Prone** on roof. |
| **Light Woods** | **Yes** | Falls **Prone** in canopy. |
| **Heavy Woods** *(Light/Med only)* | **Yes** | Falls **Prone** + 1 Torso Armor DR loss. |

### Collision & Drop Strikes

**Collisions** (Entering an occupied hex):
* **Collision Damage**: `Mass Value + Speed` (hexes moved). Applied to random location. EVA does not reduce damage.
* **Pilot Check**: Both Frames must roll a Pilot Check (2d6 vs TN 6+) or fall Prone.

**Kinetic Drop Strike** (Jumping onto an occupied hex):
* **Drop Strike Damage**:
  - **Target Suffers**: `Jumper's Mass Value + Hexes Jumped`
  - **Jumper Suffers**: Half of target's damage (rounded up).
* **Pilot Check**: Target falls Prone automatically. Jumper must pass a Pilot Check (2d6 vs TN 6+).

### Effects of Prone State
- **Defense**: Evasion (EVA) is reduced to 0. Still benefits from Terrain Cover.
- **Combat**: Cannot torso twist. Suffers a **-1d6 penalty** to all weapon damage rolls.
- **Maneuvering**: Cannot walk, reverse, or jump. Must **Stand Up** (costs **3 EP**) to resume movement.

### Severed Leg (Crippled Frames)
- **Falls Prone immediately** — no Pilot Check is allowed, the limb is gone.
- **May still fight**, at the Prone penalties above.
- **May attempt to Stand Up**: 3 EP **and a Pilot Check**. Success sheds every Prone penalty (full damage dice, torso twist restored). Failure keeps it down and the 3 EP is spent anyway.
- **Never walks, reverses or jumps again**, standing or not. Pivot only, at **3 EP** per 60°.
- **Both legs gone = Frame destroyed.**

---

## 🛡️ Attack Directions & Hit Zones
* **Front Hit Zone (180°)**: Directly in front (3 hexes).
* **Left/Right Side Hit Zone (60° each)**: Directly to the side (1 hex each). Attacks cannot be deflected by Flares.
* **Rear Hit Zone (60°)**: Directly behind (1 hex). Bypasses target's movement-generated Evasion (EVA) entirely.

---

## 🎯 Combat Tables

### 2d6 Hit Location Table

| Roll (2d6) | Left Side Attack | Front / Rear Attack | Right Side Attack |
| :---: | :--- | :--- | :--- |
| **2** | Torso (Core Critical)* | Torso (Core Critical)* | Torso (Core Critical)* |
| **3** | Left Leg | Right Arm | Right Leg |
| **4** | Left Arm | Right Arm | Right Arm |
| **5** | Left Arm | Right Leg | Right Arm |
| **6** | Left Leg | Torso | Right Leg |
| **7** | Torso | Torso | Torso |
| **8** | Torso | Torso | Torso |
| **9** | Torso | Left Leg | Torso |
| **10** | Right Arm | Left Arm | Left Arm |
| **11** | Right Leg | Left Arm | Left Leg |
| **12** | Head (Sensors)** | Head (Sensors)** | Head (Sensors)** |

*\*Torso (Core Critical): Bypasses Torso Armor DR entirely. Damage goes directly to IS. Torso DR permanently -1.*  
*\*\*Head (Sensors): Contains Sensor Suite (blinds Frame on criticals) and cockpit.*

### 1d6 Critical Hit Tables

**Torso Criticals**
1. **System Glitch**: Generate 1 less EP next turn.
2. **Capacitor Leak**: Capacitor Max reduced by 2; lose 2 stored EP.
3. **Reactor Damage**: Reactor output permanently reduced by 2 EP/turn.
4. **Gyro Lock**: Torso twists cost 2 EP (no longer free).
5. **Ammo Explosion**: Explosive ammo explodes for 3d6 damage bypassing armor.
6. **Core Melt**: Reactor explodes. Deal 2d6 damage to adjacent hexes. Frame destroyed.

**Arm Criticals**
1. **Weapon Calibration**: Weapons in arm cost +1 EP.
2. **Weapon Damaged**: Attacker chooses one weapon in arm; it is destroyed.
3. **Shoulder Jammed**: Arm weapons can only fire into Forward Arc.
4. **Structural Fracture**: Arm Armor DR reduced to 0.
5. **Ammo Feed Cut**: Arm ammo weapons disabled.
6. **Arm Severed**: All weapons/systems in arm lost.

**Leg Criticals**
1. **Toe Actuator**: -1 penalty to future Pilot checks.
2. **Knee Lock**: Walking/reversing costs +1 EP.
3. **Hip Actuator**: Evasion Limit permanently reduced by 1.
4. **Structural Fracture**: Leg Armor DR reduced to 0.
5. **Thruster Wrecked**: Jump Jets disabled.
6. **Leg Severed**: Frame falls Prone and is permanently immobilized.

**Head (Cockpit) Criticals**
1. **Sensor Flicker**: All locks capped at 5 hexes next turn.
2. **Comm Static**: Cannot share datalink targeting.
3. **Pilot Stunned**: Frame generates 0 EP next turn and Capacitor drained to 0.
4. **Sensor Array Destroyed**: Radar/IR locks disabled. Blind beyond adjacent hex.
5. **Cockpit Breach**: Pilot suffers venting. Initiative permanently reduced by 3.
6. **Pilot K.O.**: Frame is permanently disabled.
