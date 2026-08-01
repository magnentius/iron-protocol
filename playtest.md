# Iron Protocol: Playtest & Unit Test Scenarios

This document serves as a "unit testing" suite for the *Iron Protocol* rules engine. These scenarios are deliberately designed to push specific edge cases in the mechanics—armor degradation, sensor stealth, Overcharge EP economy, and the Vow system—to expose any imbalances. 

---

## Scenario 0: Trial by Fire (1v1 Introductory)
**Focus**: Fundamentals — Movement & Facing, Energy Management, Flank Speed vs. Cover, Kinetic vs. Energy Damage, Point Bids & Advantage Player Tie-Breakers, and Armor DR Degradation.

### Setup
*   **Point Budget**: 460 Points per player.
*   **Map Size**: 16 x 16 Hexes
*   **Terrain**: Industrial Sector outskirts (1x Level 1 Central Hill, 2x Light Woods hexes [Light Cover], 2x Level 2 Building Hexes [Solid LOS Block], 1x Shallow Water Hex [+1 EP Reactor Cooling]).
*   **Player 1 (The Skirmisher)**: 1x **IF-55M-1 "Vanguard"** (455 pts)
*   **Player 2 (The Phantom)**: 1x **IF-45M-1 "Specter"** (435 pts) — *a 20-point Point Bid wins the Tactical Advantage; the Specter is the Advantage Player.*
    *(Alternative Option: Vanguard vs. Vanguard mirror match; points tied at 455 pts, roll 2d6 at setup to determine the Advantage Player).*

### Testing Parameters (What to look for)
1.  **Energy Phase & Capacitor Banking**: Does the initial EP allocation feel intuitive for new players? Does banking 1–2 EP in the Capacitor create strategic depth?
2.  **Point Bid & Advantage Player**: The Specter concedes 20 points of hardware to win the Initiative tie-breaker. Both Frames are close in Initiative, so ties are rare — is control of the tie-break alone worth a fifth of a weapon, or should the Advantage also carry a deployment or first-turn benefit?
3.  **Movement & Facing**: Do players actively use Torso Twisting to align their Forward Arc (Torso) or Arm Arcs with targets while keeping their front armor toward enemy fire?
4.  **Damage & Armor Degradation**: Does locational Armor DR degradation (reducing DR on penetrating hits) create a satisfying, tangible sensation of dismantling an opponent's chassis?

---

## Scenario 1: The Ghost and the Wall (3v2)
**Focus**: Sensors, Stealth (Adaptive Skin/ECM), Electronic Warfare, and the Overcharge economy.

### Setup
*   **Map Size**: 24 x 24 Hexes
*   **Terrain**: Dense Urban Sprawl (Heavy LOS blocking) with a central 6-hex lake (Water terrain).
*   **Team A (The Ghosts) — 1300 pts**: 
    *   1x **IF-45M-1 "Specter"** (Piloted by **Lyra "Viper" Vance** — Vow of Mercy) — 480 pts with pilot
    *   1x **IF-25L-1 "Jackal"** — 365 pts
    *   1x **IF-55M-1 "Vanguard"** — 455 pts *(the cell's electronic warfare mount: ECM umbrella and Chaff)*
*   **Team B (The Wall) — 1135 pts**: 
    *   1x **IF-90A-1 "Colossus"** (Standard Pilot) — 680 pts
    *   1x **IF-55M-1 "Vanguard"** (Standard Pilot) — 455 pts

> *Note on the force imbalance: the Ghosts field three Frames and 165 more points, and that is deliberate. Light and Medium stealth Frames cannot trade blows with an Assault chassis — an unsupported Specter and Jackal lose this matchup **100%** of the time, and even a lone Paladin beats them. The Ghosts are paying for numbers and electronic warfare because they cannot pay for armor. The Wall, in turn, is under no obligation to chase them.*

> *Doctrine note for the Ghosts: **bank EP for Overcharges rather than buying Flank Speed every turn.** An unboosted Laser penetrates a Colossus torso 28% of the time; the same Laser at +2 Overcharge penetrates **95%**. Playing for Flank Speed instead of Overcharges roughly halves the Ghosts' chances. This is the scenario's central lesson.*

### Testing Parameters (What to look for)
1.  **Stealth Balance**: The Adaptive Skin suppresses one detection band at a time and costs EP every Energy Phase to maintain. Can the Specter pick the right band to stay hidden from the Colossus's Missiles, or does the upkeep starve it of the EP it needs to Overcharge?
2.  **ECM & the Jamming Check — now on both sides**: Each team fields a Vanguard, so both have Chaff and an ECM suite, and the two Microwave umbrellas are directly comparable. Chaff negates a shot outright but there are only about three cartridges; ECM runs all game for 2 EP but stops each attack only on a **Jamming Check (4+)**. Does the choice between a scarce certainty and an unlimited coin flip actually come up, or does one dominate? Note that the Ghosts' ECM protects **against the Colossus's Rail Gun**, while the Wall's ECM protects **against Lyra's Disruptor** — the same 25-point system doing opposite jobs. Watch also whether rolling a Jamming Check on every attack slows the turn down noticeably.
3.  **Vow Check**: The *Vow of Mercy* pulls every Head or Torso result — 50% of all hit locations — until Lyra has destroyed **one** of the target's limbs, after which its core is open. That opening phase is the whole of the vow's cost, and it is steep against a Colossus whose limbs sit behind DR 6 and 7. Does the Disruptor's guaranteed critical make that first limb kill achievable in reasonable time, or does Lyra spend the early game firing shots that evaporate? Note also that she does not actually need the core at all: **Double Leg Loss destroys a Frame outright** (§6.5.4), so stripping both legs is a complete win condition and one the Boon (+1 to Critical rolls against Arms and Legs) directly accelerates. Watch which line the player takes.

---

## Scenario 2: Honorable Attrition (3v3)
**Focus**: The Vow System, Extreme Environmental Hazards (EP starvation), Movement modifiers, and Tactical Datalinks.

### Setup
*   **Map Size**: 36 x 36 Hexes
*   **Terrain**: Arctic EMP Wasteland Sector (Severe thermal drain: -2 EP generation per frame). Scattered Craters (-1 Elevation) and jagged spires (Block LOS).
*   **Team A (The Spears)**: 
    *   1x **IF-55M-1 "Vanguard"** (Piloted by **Kenji "Shogun" Takahashi** — Vow of Courage)
    *   1x **IF-75H-1 "Paladin"** 
    *   1x **IF-25L-1 "Jackal"** (Tactical Datalink is standard on every Frame's Head hardpoint)
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
*   **Terrain**: Open Plains (Clear) with occasional Deep Water features (Costs +2 EP to move through, cannot gain Flank Speed, generates +2 EP cooling) and patches of Light Woods.
*   **Team A (Super-Heavies)**: 
    *   2x **IF-90A-1 "Colossus"** 
    *   1x **IF-75H-1 "Paladin"**
    *   1x **IF-55M-1 "Vanguard"**
*   **Team B (The Line)**: 
    *   4x **IF-75H-1 "Paladin"**

### Testing Parameters (What to look for)
1.  **Rail Gun Viability**: The Colossus's Rail Gun costs 0 EP at base but must Overcharge **+6 EP drawn from the Capacitor** to fire, which forces a 1-turn cooldown between shots. In a massive 4v4 slugfest, does the Colossus survive long enough to bank that charge and fire repeatedly? Is **5d6 at AP 3** fair against the Paladins' heavy armor — note it penetrates every location on every Frame in the game, 100% of the time.
2.  **Cluster & AoE**: When four Paladins fire cluster and HE missiles into a tightly packed formation, does the AoE splash damage scale too quickly? Does it feel unfair that Flank Speed is ignored by AoE?
3.  **Critical Cascade**: With so much heavy firepower on the board, how frequently do Ammo Explosions (Torso 6) and Containment Failures (Torso 8) happen? When a Colossus goes up, its Capacitor dumps **2d6 into every adjacent hex** — does that wipe out the allies packed around it, and does it discourage tight formations enough to matter?
4.  **Armor Degradation**: Armor DR erodes by only 1 per penetrating attack, and a Rapid Fire burst degrades it by 1 in total however many rounds get through. In a four-a-side firefight, does any location actually reach DR 0 before its Frame dies to a critical cascade — and if not, is the DR track doing any work at all?

---

## Scenario 4: The Vanguard Swarm (1v4 Asymmetrical)
**Focus**: Action economy, the Initiative deficit of Assault chassis, and the "Death by a thousand cuts" mechanic.

### Setup
*   **Map Size**: 24 x 24 Hexes
*   **Terrain**: Dense Forest (Light Woods grants 1 Reroll (Cover), blocks VIS LOS if 2+ hexes deep; Heavy Woods grants 2 Rerolls (Cover), blocks VIS LOS if 1+ hexes deep).
*   **Team A (The Boss)**: 
    *   1x **IF-90A-1 "Colossus"** (Piloted by **Kenji Takahashi** — Vow of Courage)
*   **Team B (The Pack)**: 
    *   4x **IF-25L-1 "Jackals"**

### Testing Parameters (What to look for)
1.  **Action Economy**: The Colossus has the **lowest Initiative in the game (3, or 5 under Takahashi)** against four Jackals at 12 — it acts last in Combat every single turn, and can never reach Flank Speed. Can it survive four Light frames on armor alone, or do the Jackals simply dominate the turn sequence?
2.  **Facing & Arcs**: Armor DR is not directional and the Rear Hit Zone uses the same column as the Front, so there is no softer armor to find. The prize is that **no weapon can fire into the Rear Arc at all** — a Jackal sitting behind the Colossus cannot be shot until the Colossus spends 1 EP per 60 degrees to pivot. With four Jackals circling, can it ever turn fast enough to bring a gun to bear? 
3.  **The Autocannon Threat**: Jackals rely heavily on AP Autocannons. Are Autocannons enough to chew through a Colossus's heavy armor, or will they roll their Ammo Die and jam before the Colossus falls?

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
2.  **Cover Dynamics**: Does moving from boulder to boulder (forces 1 reroll from Light Cover) significantly lengthen the TTK (Time To Kill), or do flanking maneuvers easily negate cover?

---

## Scenario 6: The Scout Skirmish (1v1 Light Class)
**Focus**: Flank Speed, Jump Jets, and fragile Armor DR.

### Setup
*   **Map Size**: 18 x 18 Hexes
*   **Terrain**: Dense Urban Sprawl (Lots of towering structures to block LOS and encourage jumping).
*   **Team A**: 
    *   1x **IF-25L-1 "Jackal"** (Standard Pilot)
*   **Team B**: 
    *   1x **IF-25L-1 "Jackal"** (Standard Pilot)

### Testing Parameters (What to look for)
1.  **Flank Speed vs Accuracy**: Flank Speed grants the defender one forced reroll of an attacker's damage die, and a Jump Jet flight of 2+ hexes grants it regardless of distance moved. When both Frames jump rooftop to rooftop every turn, is one reroll enough to matter against 2d6 weapons, or do the lock-on mechanics keep the fight moving?
2.  **Lethality**: With only Light Armor DR, does the first frame to land a solid hit automatically win, or is there room for a comeback?

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
2.  **Critical Thresholds**: Does the Colossus's sheer Armor DR make it immune to critical hits for too long, or does the Paladin's Autocannon trigger criticals reliably once armor is breached?
