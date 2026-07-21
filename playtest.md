# Iron Protocol: Playtest & Unit Test Scenarios

This document serves as a "unit testing" suite for the *Iron Protocol* rules engine. These scenarios are deliberately designed to push specific edge cases in the mechanics—armor degradation, sensor stealth, Overcharge EP economy, and the Vow system—to expose any imbalances. 

---

## Scenario 0: Trial by Fire (1v1 Introductory)
**Focus**: Fundamentals — Movement & Facing, Energy Management, Evasion vs. Cover, Kinetic vs. Energy Damage, Point Bids & Advantage Player Tie-Breakers, and Armor DR Degradation.

### Setup
*   **Point Budget**: 435 Points per player.
*   **Map Size**: 16 x 16 Hexes
*   **Terrain**: Industrial Sector outskirts (1x Level 1 Central Hill, 2x Light Woods hexes [+1 EVA Cover], 2x Level 2 Building Hexes [Solid LOS Block], 1x Shallow Water Hex [+1 EP Reactor Cooling]).
*   **Player 1 (The Skirmisher)**: 1x **IF-55M-1 "Vanguard"** (430 pts) — *5-Point Bid wins Tactical Advantage! Vanguard is designated Advantage Player.*
*   **Player 2 (The Phantom)**: 1x **IF-45M-1 "Specter"** (435 pts)
    *(Alternative Option: Vanguard vs. Vanguard mirror match; points tied at 430 pts, roll 2d6 at setup to determine Advantage Player).*

### Testing Parameters (What to look for)
1.  **Energy Phase & Capacitor Banking**: Does the initial EP allocation feel intuitive for new players? Does banking 1–2 EP in the Capacitor create strategic depth?
2.  **Point Bid & Advantage Player**: Does the 5-point bid (Vanguard 430 pts vs. Specter 435 pts) feel rewarding by granting Advantage Player tie-breaker control?
3.  **Movement & Facing**: Do players actively use Torso Twisting to align their Forward Arc (Torso) or Arm Arcs with targets while keeping their front armor toward enemy fire?
4.  **Damage & Armor Degradation**: Does locational Armor DR degradation (reducing DR on penetrating hits) create a satisfying, tangible sensation of dismantling an opponent's chassis?

---

## Scenario 1: The Ghost and the Wall (2v2)
**Focus**: Sensors, Stealth (AMC/ECM), Electronic Warfare, and the Overcharge cooldown economy.

### Setup
*   **Map Size**: 24 x 24 Hexes
*   **Terrain**: Dense Urban Sprawl (Heavy LOS blocking) with a central 6-hex lake (Water terrain).
*   **Team A (The Ghosts)**: 
    *   1x **IF-45M-1 "Specter"** (Piloted by **Lyra "Viper" Vance** — Vow of Mercy)
    *   1x **IF-25L-1 "Jackal"** 
*   **Team B (The Wall)**: 
    *   1x **IF-90A-1 "Colossus"** (Standard Pilot)
    *   1x **IF-55M-1 "Vanguard"** (Standard Pilot)

### Testing Parameters (What to look for)
1.  **Stealth Balance**: Can the Specter use its AMC Overcharge to effectively stay hidden, or does the 1-turn cooldown leave it too vulnerable to the Colossus's Missiles?
2.  **ECM Value**: Is the Vanguard's ECM umbrella (Overcharged) enough to protect the Colossus from the Specter's Disruptor Cannon?
3.  **Vow Check**: Does Lyra's *Vow of Mercy* (forcing her to target limbs before the Torso) make her useless against the Colossus's massive HP pool, or does the Disruptor Cannon's crit-forcing ability make dismantling the heavy frame viable?

---

## Scenario 2: Honorable Attrition (3v3)
**Focus**: The Vow System, Extreme Environmental Hazards (EP starvation), Movement modifiers, and Tactical Datalinks.

### Setup
*   **Map Size**: 36 x 36 Hexes
*   **Terrain**: Arctic EMP Wasteland Sector (Severe thermal drain: -2 EP generation per frame). Scattered Craters (-1 Elevation) and jagged spires (Block LOS).
*   **Team A (The Spears)**: 
    *   1x **IF-55M-1 "Vanguard"** (Piloted by **Kenji "Shogun" Takahashi** — Vow of Courage)
    *   1x **IF-75H-1 "Paladin"** 
    *   1x **IF-25L-1 "Jackal"** (Equipped with Tactical Datalink)
*   **Team B (The Blades)**: 
    *   1x **IF-25L-1 "Jackal"** (Piloted by **Kaito Kuroda** — Vow of Respect)
    *   2x **IF-55M-1 "Vanguards"**

### Testing Parameters (What to look for)
1.  **EP Starvation**: With severe arctic environmental interference reducing EP generation by 2, can frames still reasonably afford to Overcharge their weapons (Thermal Lances/Rail Guns) by banking in the Capacitor? Does the game slow down too much?
2.  **The Courage Check**: Kenji Takahashi's *Vow of Courage* forbids reversing. Does this make him an easy target to kite around the craters, or does his +2 Initiative allow him to corner his prey?
3.  **The Respect Check**: Kaito Kuroda's *Vow of Respect* forbids rear-arc attacks. Can the enemy team exploit this by deliberately exposing their backs to him to force a dishonor penalty?
4.  **Datalink Abuse**: Can Team A's Jackal spot targets from safety and allow the Paladin to rain indirect missiles, or does the arctic environment limit the Paladin's ability to fire enough salvos?

---

## Scenario 3: The Hammer and the Anvil (4v4)
**Focus**: Massive damage curves, Overcharge Rail Guns vs Armor DR, AoE splash damage, Ammo Explosions, and Core Meltdowns.

### Setup
*   **Map Size**: 48 x 48 Hexes (Large)
*   **Terrain**: Open Plains (Clear) with occasional Deep Water features (Costs +2 EP to move through, caps EVA at 1, generates +2 EP cooling) and patches of Light Woods.
*   **Team A (Super-Heavies)**: 
    *   2x **IF-90A-1 "Colossus"** 
    *   1x **IF-75H-1 "Paladin"**
    *   1x **IF-55M-1 "Vanguard"**
*   **Team B (The Line)**: 
    *   4x **IF-75H-1 "Paladin"**

### Testing Parameters (What to look for)
1.  **Rail Gun Viability**: The Colossus's Rail Gun requires a full 6 EP Overcharge to fire. In a massive 4v4 slugfest, does the Colossus survive long enough to spool up and fire the Rail Gun multiple times? Is the 3d6+10 (AP 3) damage fair against the Paladins' heavy armor?
2.  **Cluster & AoE**: When four Paladins fire cluster and HE missiles into a tightly packed formation, does the AoE splash damage scale too quickly? Does it feel unfair that Evasion is ignored by AoE?
3.  **Critical Cascade**: With so much heavy firepower on the board, how frequently do Ammo Explosions and Reactor Core Meltdowns happen? If a Colossus's core melts down, does the resulting 2d6 AoE damage wipe out adjacent allies?
4.  **Armor Degradation**: Is it too hard to strip Armor DR without the old "Sustained Beam" rule, or does the sheer volume of 1d6 Autocannon bursts naturally whittle armor down to 0 fast enough?

---

## Scenario 4: The Vanguard Swarm (1v4 Asymmetrical)
**Focus**: Action economy, Initiative manipulation, and the "Death by a thousand cuts" mechanic.

### Setup
*   **Map Size**: 24 x 24 Hexes
*   **Terrain**: Dense Forest (Light Woods grants +1 EVA Cover, blocks VIS LOS if 2+ hexes deep; Heavy Woods grants +2 EVA Cover, blocks VIS LOS if 1+ hexes deep).
*   **Team A (The Boss)**: 
    *   1x **IF-90A-1 "Colossus"** (Piloted by **Kenji Takahashi** — Vow of Courage)
*   **Team B (The Pack)**: 
    *   4x **IF-25L-1 "Jackals"**

### Testing Parameters (What to look for)
1.  **Action Economy**: Can a single Assault frame with high Initiative survive against 4 Light frames, or do the Jackals completely dominate the turn sequence?
2.  **Facing & Arcs**: The Jackals will attempt to stay in the Colossus's Rear Arc to bypass its massive frontal armor. Can the Colossus pivot enough to defend its rear? 
3.  **The Autocannon Threat**: Jackals rely heavily on AP Autocannons. Are 10 AP bursts enough to chew through a Colossus's heavy armor, or will they run out of ammo before the Colossus falls?

---

## Scenario 5: The Duel (1v1 Mirror Match)
**Focus**: Core mechanics—basic movement, cover, line of sight, and raw EP management without complex Electronic Warfare.

### Setup
*   **Map Size**: 12 x 12 Hexes (Small)
*   **Terrain**: Rocky Badlands (Clear hexes mixed with scattered Level 1 and Level 2 Boulders for cover).
*   **Team A**: 
    *   1x **IF-55M-1 "Vanguard"** (Standard Pilot)
*   **Team B**: 
    *   1x **IF-55M-1 "Vanguard"** (Standard Pilot)

### Testing Parameters (What to look for)
1.  **The Baseline Economy**: Without any extreme environmental modifiers or extreme terrain, how many turns does it typically take for a Vanguard to bank enough EP to Overcharge its Laser?
2.  **Cover Dynamics**: Does moving from boulder to boulder (+1 EVA from Light Cover) significantly lengthen the TTK (Time To Kill), or do flanking maneuvers easily negate cover?

---

## Scenario 6: The Scout Skirmish (1v1 Light Class)
**Focus**: High Evasion, Jump Jets, and fragile Internal Structure.

### Setup
*   **Map Size**: 18 x 18 Hexes
*   **Terrain**: Dense Urban Sprawl (Lots of towering structures to block LOS and encourage jumping).
*   **Team A**: 
    *   1x **IF-25L-1 "Jackal"** (Standard Pilot)
*   **Team B**: 
    *   1x **IF-25L-1 "Jackal"** (Standard Pilot)

### Testing Parameters (What to look for)
1.  **Evasion vs Accuracy**: When both frames are generating 4-5 Evasion per turn and jumping from rooftop to rooftop, is it too hard to land hits, or do the lock-on mechanics keep the fight moving?
2.  **Lethality**: With only Light HP pools, does the first frame to land a solid hit automatically win, or is there room for a comeback?

---

## Scenario 7: The Titan Bout (1v1 Heavy/Assault)
**Focus**: Heavy armor degradation, massive weapon interactions, and critical hits.

### Setup
*   **Map Size**: 18 x 18 Hexes
*   **Terrain**: Open Plains (Clear) with a single central hill (Level +1).
*   **Team A**: 
    *   1x **IF-90A-1 "Colossus"** (Standard Pilot)
*   **Team B**: 
    *   1x **IF-75H-1 "Paladin"** (Standard Pilot)

### Testing Parameters (What to look for)
1.  **Weapon Matchup**: The Colossus relies on slow, massive hits (Rail Gun/Thermal Lance), while the Paladin relies on a mix of missiles and Autocannons. Which damage philosophy strips armor and destroys components faster in a pure 1v1 slugfest?
2.  **Critical Thresholds**: Does the Colossus's sheer HP pool make it immune to critical hits for too long, or does the Paladin's Autocannon trigger criticals reliably once armor is breached?
