# Iron Protocol — Quick Reference Sheet (Gameplay)

## ⏱️ Turn Sequence

### 1. Energy Phase
1. **Energy Generation**: Every Frame generates EP equal to its Reactor Rating. Add to stored Capacitor EP.
2. **Stealth Upkeep**: Spend EP to maintain an active Adaptive Skin (2 EP) or ECM suite (2 EP). Both contest locks on a **Jamming Check (4+)** rather than denying them outright.

### 2. Activation Phase (Reverse Initiative Order)
*Frames activate from lowest Initiative to highest Initiative. Spend EP step-by-step.*

| Action | Cost | Terrain? | Climb? | vs Move Limit? |
| :--- | :---: | :---: | :---: | :---: |
| **Forward Walk (W)** | 1 EP | yes | +1 EP | yes |
| **Reverse (R)** | 2 EP | yes | +1 EP | yes |
| **Jump Jet (J)** | 2 EP / hex | **no** | **no** | yes |
| **Pivot / Turn** | 1 EP per 60° | no | — | **no** |
| **Stand Up** | 3 EP | no | — | no |
| **Torso Twist** | free | no | — | no |

- *Terrain is paid on the hex you move **into**. A Jump pays 2 EP per hex and nothing else — the landing Pilot Check is the price of awkward ground.*
- **Jump Jet**: Light/Medium only, Torso hardpoint, straight line, max 4 hexes. Roll the Ammo Die after each jump — Empty on **1-2**, ~3 jumps. A wrecked leg actuator also grounds the Frame.
- **Damaged**: Knee Lock adds +1 EP per Walk/Reverse. Prone pivots cost 2 EP per 60°, or **3 EP** with a severed leg. Servo Lock makes the Torso Twist cost 2 EP.
- **Flank Speed**: exit **4+ hexes**, or make a jump of **2+ hexes**. Assault Frames (Move 3) can never flank.
- **Torso Twist**: at the end of activation, torso facing may twist 60° left or right of leg facing.

### 3. Combat Phase (Initiative Order)
*Resolve attacks in order of highest Initiative to lowest Initiative (instantly resolved).*
1. **Select Weapon & Pay EP Cost** *(Overcharge: Extra EP MUST come from the Capacitor. Triggers 1-Turn Cooldown).*
2. **Verify Line of Sight (LOS) and Arc** (Torso = Forward Arc only; Arms = Forward Arc **plus** their own Side Arc).
3. **Verify Sensor Lock** (Visual, Infrared, or Microwave).
4. **Defender's Countermeasures** *(before Hit Location)*:
   - **Flares / Chaff**: negate the attack **outright** if it used an IR / Radar lock. No roll. Then roll the Ammo Die (Empty on 1-2).
   - **Jamming Check**: if the target is covered by an active **ECM** suite or an **Adaptive Skin** tuned to this attack's band, the defender rolls **1d6** — on **4+** the lock fails and the attack is negated. The suite stays active either way.
5. **Determine Hit Location**: Roll 2d6.
6. **Roll Damage**: Roll weapon damage dice.
7. **Apply Flank Speed & Cover (Rerolls)**: Defender **may** force rerolls of the attacker's damage dice — Flank Speed (1) and Cover (Light 1, Heavy 2), stacking. Optional: never reroll a die that is already low.
8. **Apply Armor DR**: If the final damage is strictly greater than the location's Armor DR, the armor is penetrated.
9. **Resolve Penetration**: Permanently reduce the location's Armor DR by 1.
10. **Roll Critical Hits**: Roll 1d6 on the location's Critical Hit Table. (Overkill: +1 die per 5 points of damage over the Armor DR).
11. **Location Destruction**: If a Critical Hit destroys the Torso/Head, the Frame is destroyed. Severed limbs destroy gear; hits on destroyed limbs transfer to Torso.

### 4. End Phase
1. **Bank Energy**: Store unused EP in the Capacitor (up to Capacitor Max). Excess EP is lost.
2. **Clean Up**: Remove Flank Speed tokens and decrement cooldowns. Roll 1d6 for each Smoke cloud; dissipates on 1 or 2.

---

## ⚙️ Special Resolution Cases

| Case | Ruling |
| :--- | :--- |
| **Overcharge Allowance** | Whatever was banked in the Capacitor at the start of the turn is the cap on Overcharge EP for that turn. Bank nothing, Overcharge nothing. |
| **Damage Overcharge** | **2 EP per additional damage die, max +2d6.** Never a flat bonus — flat damage cannot be rerolled, so it would ignore Flank Speed and Cover entirely. |
| **Rapid Fire** | Bypasses Flank Speed; Cover still applies. Each **Burst** that puts a die through generates **1 Critical**. Never uses Overkill. The whole attack degrades Armor DR by **1 total**. |
| **One attack per weapon** | Each mounted weapon fires **once per Combat Phase**, however much EP is left. Fire each of your weapons once, in any order. |
| **Full Auto** | Maximum **3 Bursts** per attack (One Hit Location). Roll Ammo Die (1d6) after resolving; depletes on 1, 2, or 3. |
| **Disruptor Cannon** | No damage. Ignores Armor DR and Flank Speed (still needs LOS + a **Radar** lock). **Every hit** forces 1 Critical on the location rolled **and** drains 1d6 EP. Overcharge (+2 EP): a second Critical. |
| **AoE** | Bypasses Flank Speed *and* terrain Cover. Armor DR still applies. |
| **Prone (-1d6)** | Drop one die, keep any flat bonus (Rail Gun becomes 4d6). Rapid Fire loses one die per Burst. No effect on the Disruptor or EMP. |
| **Collision** | Armor DR applies; Flank Speed does not apply. Both Frames suffer flat damage: Mass Value x Speed. |
| **Damage Transfer** | Hits on an already-severed limb transfer directly to the Torso. Bypasses Flank Speed. Compare against Torso Armor DR normally. |
| **High Explosive Incendiary (HEI)** | Adds a flat +1 to any Critical Hit roll generated by this weapon. |
| **Flares/Chaff** | (Ammo Die: 1d6, **no EP cost** — they are reactive). Negates one attack on an **IR lock** (Flares) or **Radar lock** (Chaff). Smoke costs 1 EP because you deploy it on your own turn. |
| **Ammo Die** | Everything runs **Empty permanently**, never reloaded. Autocannon: Empty on **1** (~6 bursts) or **1-3** on Full Auto (~2 barrages). Missiles, Flares, Chaff, Smoke, Jump propellant: Empty on **1-2** (~3 uses). A Frame with no volatile stores left can no longer cook off. |

---

## 📡 Sensor, Lock & Stealth Matrix

### Weapon Detection Requirements
*A weapon cannot fire at all without a lock on its band. Terrain, Smoke, Flares and Chaff deny a band outright; ECM and the Adaptive Skin contest it on a Jamming Check (4+).*

| Weapon | Needs | Silenced by |
| :--- | :---: | :--- |
| **Laser** | VIS | Smoke and Woods outright; Visual-mode Skin on a Jamming Check |
| **Thermal Lance** | IR | Flares outright / target running cold; Infrared-mode Skin on a Jamming Check |
| **Rail Gun** | Radar | Chaff outright; ECM / Microwave-mode Skin on a Jamming Check |
| **Autocannon** | Any | — (only a total blackout) |
| **Disruptor Cannon** | **Radar** | Chaff outright; ECM / Microwave-mode Skin on a Jamming Check |
| **Guided Missiles** | its guidance band | whatever blocks that band |


| Defense System / Terrain | Visual (VIS) Locks | Infrared (IR) Locks | Microwave (Radar) Locks |
| :--- | :--- | :--- | :--- |
| **Light Woods (2+ hexes)** | **BLOCKED** | *Clear* | *Clear* |
| **Heavy Woods (2+ hexes)** | **BLOCKED** | **BLOCKED** | *Clear* |
| **Smoke Screen** | **BLOCKED** | *Clear* | *Clear* |
| **Active ECM Suite** | *Clear* | *Clear* | **BLOCKED** |
| **Adaptive Skin (Visual)** | **BLOCKED** (invisible) | *Clear* | *Clear* |
| **Adaptive Skin (Infrared)** | *Clear* | **BLOCKED** | *Clear* |
| **Adaptive Skin (Microwave)**| *Clear* | *Clear* | **BLOCKED** |
| **Flares Countermeasure** | *Clear* | **Negates the attack** | *Clear* |
| **Chaff Dispenser** | *Clear* | *Clear* | **Negates the attack** |

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
* **Collision Damage**: `Mass Value x Speed` (hexes moved) flat damage. Applied to random location. Flank Speed does not allow rerolls.
* **Pilot Check**: Both Frames must roll a Pilot Check (2d6 vs TN 6+) or fall Prone.

**Kinetic Drop Strike** (Jumping onto an occupied hex):
* **Drop Strike Damage**:
  - **Target Suffers**: `Jumper's Mass Value x Hexes Jumped` flat damage
  - **Jumper Suffers**: Half of target's damage (rounded up).
* **Location**: Roll **2d6** on the Hit Location Table for each, using the **Front / Rear** column. Armor DR applies; Flank Speed does not.
* **Pilot Check**: Target falls Prone automatically. Jumper must pass a Pilot Check (2d6 vs TN 6+).

**Falling** (forced off a drop of 2+ Levels):
* **Damage**: **1d6 per Level fallen, pooled into one roll** (a 3-level drop is one 3d6 roll, not three 1d6 rolls).
* **Location**: Roll **2d6**, Front / Rear column. Armor DR applies; no Flank Speed rerolls. The Frame lands Prone.

### Effects of Prone State
- **Defense**: Cannot gain Flank Speed. Still benefits from Terrain Cover.
- **Combat**: Cannot torso twist. Suffers a **-1d6 penalty** to all weapon damage rolls.
- **Maneuvering**: Cannot walk, reverse, or jump. Must **Stand Up** (costs **3 EP**) to resume movement.

### Severed Leg (Crippled Frames)
- **Falls Prone immediately** — no Pilot Check is allowed, the limb is gone.
- **May still fight**, at the Prone penalties above.
- **May attempt to Stand Up**: 3 EP **and a Pilot Check at −2** (a severed leg penalises every Pilot Check). Success sheds every Prone penalty (full damage dice, torso twist restored). Failure keeps it down and the 3 EP is spent anyway.
- **Never walks, reverses or jumps again**, standing or not. Pivot only, at **3 EP** per 60°.
- **Both legs gone = Frame destroyed.**

---

## 🛡️ Attack Directions & Hit Zones
* **Front Hit Zone (180°)**: Directly in front of the target (3 hexes wide).
* **Left/Right Side Hit Zone (60° each)**: Directly to the side (1 hex each).
* **Rear Hit Zone (60°)**: Directly behind (1 hex).

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

*\*Torso (Core Critical): Treat Torso Armor DR as **0 for the whole attack** — it penetrates automatically, DR drops by 1, and Overkill is measured against 0. A heavy weapon that finds the core lands several Criticals at once.*  
*\*\*Head (Sensors): Contains Sensor Suite (blinds Frame on criticals) and cockpit.*

### 1d6 Critical Hit Tables

**The Severity Ladder** — every table climbs the same rungs, so the same number means the same *kind* of damage wherever it lands:

| 1 | 2 | 3 | 4 | 5 | 6 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Temporary Glitch | System Strain (EP costs) | Performance Degradation | **Structural Fracture (DR → 0)** | Component Loss | Catastrophic Destruction |

*Head stops at 5 — a cockpit hit that climbs that far kills the pilot. Torso runs to 8; slots 7–8 cannot be rolled naturally and are reached only by cascade or HEI's +1.*

**Torso Criticals**
1. **System Glitch**: Generate 1 less EP next turn.
2. **Servo Lock**: Torso twists cost 2 EP.
3. **Capacitor Leak**: Capacitor Max reduced by 2; lose 2 stored EP.
4. **Structural Fracture**: Torso Armor DR reduced to 0.
5. **Reactor Damage**: Reactor output permanently reduced by 2 EP/turn.
6. **Ammo Explosion**: Explosive weapon Empty. Suffer 2 additional Torso Crits. *(Slot is always marked; with no explosive ammo remaining, apply Reactor Damage instead.)*
7. **Electrical Fire**: Suffer 1 Torso Critical Hit each End Phase. Spend 3 EP + roll 4+ to smother, or end an Activation in Water to extinguish it free.
8+. **Containment Failure**: Capacitor bank discharges through the wreck. 2d6 to adjacent hexes. Frame destroyed.

**Arm Criticals**
1. **Targeting Jitter**: -1 damage penalty on next attack from this arm.
2. **Actuator Strain**: Weapons in arm cost +1 EP to fire.
3. **Hardpoint Failure**: Roll 1 fewer damage die (min 1) with this arm's weapons.
4. **Structural Fracture**: This arm's Armor DR reduced to 0.
5. **Weapon Destroyed**: The weapon in this arm is destroyed — each arm has one hardpoint, so this silences it completely without severing it. *(Empty arm: slot marked, nothing lost.)*
6+. **Arm Severed**: All weapons/systems in arm lost.

**Leg Criticals**
1. **Servo Stutter**: Movement Limit -2 until the end of your next activation.
2. **Knee Lock**: Walking/reversing costs +1 EP per hex.
3. **Hip Actuator**: Movement Limit permanently reduced by 2 hexes. *(Below the Flank Speed Threshold, the Frame can no longer Flank at all.)*
4. **Structural Fracture**: This leg's Armor DR reduced to 0.
5. **Actuator Destroyed**: Falls Prone at once; may only Stand Up with 3 EP **and** a Pilot Check thereafter. Can no longer jump — a Frame launches and lands on its legs.
6+. **Leg Severed**: Frame falls Prone and is permanently crippled.

**Head (Cockpit) Criticals**
1. **Sensor Ghosting**: Drop all held locks; establish none until the end of your next activation.
2. **Sensor Calibration Drift**: Pay 1 EP each Energy Phase or establish no locks that turn.
3. **Sensor Array Destroyed**: Roll 1d6 — **1-2** Thermal (IR), **3-4** Optical (VIS), **5-6** Microwave (Radar). That band is destroyed permanently.
4. **Structural Fracture**: Head Armor DR reduced to 0, and the Tactical Datalink is severed.
5+. **Pilot K.O.**: Frame is permanently disabled.

---

## 🎖️ Named Pilot Vows

*A vow binds how a pilot fights and rewards the discipline. Dishonor strips the Initiative bonus, the Pilot Check bonus **and** the Boon, and adds +1 EP to every weapon.*

| Vow | Constraint | Boon |
| :--- | :--- | :--- |
| **Courage** (Yuu) | Never Reverse | **+2** to Pilot Checks to stay upright **or to rise** (not EMP recovery) |
| **Respect** (Rei) | No Rear-Zone attacks; no indirect fire | **+1** to Crit rolls vs a target's **Front** Hit Zone |
| **Honor** (Meiyo) | Must engage the higher-tonnage / higher-Initiative foe if you can bear a weapon on it | **+1 damage die** against a Frame that outclasses you |
| **Mercy** (Jin) | Pull every Head/Torso result while the target has **all four** limbs intact; free once any one limb is destroyed (per location on multi-hit attacks) | **+1** to Crit rolls vs **Arms and Legs** |
| **Honesty** (Makoto) | No Skin, Smoke, Flares, Chaff or ECM — yours or an ally's | Enemy **Adaptive Skins and ECM do not function** against your locks (no Jamming Check). Chaff/Flares/Smoke still work |
| **Loyalty** (Chuugi) | Cannot move away from a more-damaged ally within 3 hexes | Friendlies within 3 hexes force **1 extra reroll** when attacked |
