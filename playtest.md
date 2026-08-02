# Iron Protocol: Playtest & Unit Test Scenarios

This document serves as a "unit testing" suite for the *Iron Protocol* rules engine. These scenarios are deliberately designed to push specific edge cases in the mechanics—armor degradation, sensor stealth, Overcharge EP economy, and the Vow system—to expose any imbalances. 

---

## Current Balance

Simulated 2026-08-02 against the rules as they now stand — standing Capacitor reserve, IRCM suite,
EMP as an opener, Autocannon fire control fixed per Frame, the signal-warfare audit applied in
full, and an Assault reactor that never runs cold. **5 fixed seeds × 5,000 battles per scenario.**
The range column is the noise floor: read nothing into a gap smaller than it. Re-run and diff this
table whenever the rules move.

| Scenario | Turns | Team A | Team B | Range | Stall |
| :--- | ---: | ---: | ---: | :---: | ---: |
| 0 · Trial by Fire (1v1) | 9.8 | 56% | 43% | 54–57% | 1% |
| 1 · Ghost & Wall (3v2) | 12.1 | **51%** | 48% | 50–52% | 1% |
| 2 · Honorable Attrition (3v3) | 11.9 | **52%** | 47% | 52–53% | 0% |
| 3 · Hammer & Anvil (4v4) | 8.9 | **51%** | 49% | 49–51% | 1% |
| 4 · Vanguard Swarm (1v4) | 5.2 | 1% | 99% | 1–1% | 0% |
| 5 · The Duel (1v1 mirror) | 7.0 | 58% | 41% | 58–60% | 1% |
| 6 · Scout Skirmish (1v1 mirror) | 6.6 | 58% | 38% | 58–59% | 3% |
| 7 · Titan Bout (1v1) | 7.1 | 62% | 33% | 61–63% | 4% |
| 8 · Shattered Mesa (1v1) | — | — | — | — | — |
| 9 · Salvage Rights (1v1 mirror) | 8.0 | 33% | 58% | 33–34% | 8% |
| 10 · Dead Air (2v3) | 8.2 | 34% | 65% | 32–35% | 1% |
| 11 · Three Oaths (3v3) | 11.1 | 48% | 52% | 47–48% | 0% |
| **Mean** | **8.7** | **46%** | | | |

**Three scenarios came back into band at once** when the Assault reactor stopped running cold —
Ghost & Wall 41% → 51%, Hammer & Anvil 58% → 51%, Titan Bout 83% → 62%. All three turn on a
Colossus, and all three were distorted by the same thing: an Assault chassis tops out at 3 hexes,
so it could never spend the 4 EP that lights anything else up, and it fires last. The largest
reactor on the board was the hardest thing on it to see.

**Scenario 7 is now only marginally out**, and it is an unmatched fight by construction — a Colossus
at 620 against a Paladin at 555. 62% for a 12% point advantage is close to proportionate.

**Scenario 9 is not a roster problem.** Two identical Paladins cannot be rebalanced against each
other; the only asymmetry left is who fires first. It reads 33% because spending EP on your own
shot makes you infrared-lockable for the rest of the turn, so the Frame that shoots first lights
itself up for the one that shoots second, and both carry IR-guided missiles. That is the rule
working as intended — stealth and shooting are meant to be exclusive — but a mirror is the cleanest
instrument in the suite, and it puts the size of that effect at roughly **25 points of win rate**.
Note also that the simulator's pilots never once decline to fire to stay cold, so 33% is the floor
for a side that never takes the stealth option, not the true figure.

**Scenario 10 is the one still genuinely out.** It has been re-tuned twice already and the rules
moved under it both times; it wants a third look now that they have stopped.

**Scenario 4 is a deliberate 1v4 stress test.** Scenario 8 is absent because it tests vertical
warfare and the simulator has no elevation; it needs table play.

Mirror matches with no infrared weapon between them sit at 58% to whoever shoots first. That skew
is understood and accepted.

*Caveats that apply to every row. The simulator has no map, so cover, elevation, facing and range
are approximated, and blast reach for the EMP is a parameter rather than a fact (tested from 25% to
60% adjacency — results moved by one point across that whole range). Its pilots are greedy: they
always take Flank Speed when affordable, always fire everything they can afford — never holding
fire to stay cold — and never position to spare their own lance. Absolute win rates also drift a
few points between harnesses depending on how the random stream is consumed, so **trust the paired
deltas over the absolute levels**.*

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
*   **Team B (The Wall) — 1075 pts**: 
    *   1x **IF-90A-1 "Colossus"** (Standard Pilot) — 620 pts
    *   1x **IF-55M-1 "Vanguard"** (Standard Pilot) — 455 pts

> *Note on the force imbalance: the Ghosts field three Frames and 165 more points, and that is deliberate. Light and Medium stealth Frames cannot trade blows with an Assault chassis — an unsupported Specter and Jackal lose this matchup **100%** of the time, and even a lone Paladin beats them. The Ghosts are paying for numbers and electronic warfare because they cannot pay for armor. The Wall, in turn, is under no obligation to chase them.*

> *Doctrine note for the Ghosts: **bank EP for Overcharges rather than buying Flank Speed every turn.** An unboosted Laser penetrates a Colossus torso 28% of the time; the same Laser at +2 Overcharge penetrates **95%**. Simulation across 15,000 battles per line: Ghosts banking for Overcharge win **54%**; Ghosts buying Flank Speed every turn win **42%** (see the Current Balance table, which reports that losing line because the simulator's pilots play it). The scenario is close to even on the right doctrine and clearly losing on the wrong one, which is its central lesson. The IRCM suite sharpened it: charging 2 EP per activation from the same reserve an Overcharge is paid from widened the gap between the two lines from 15 points to 19, because a pilot who spends everything on Flank Speed has nothing banked to jam with either. The Capacitor rule change before it moved this matchup by under 1 point.*

### Testing Parameters (What to look for)
1.  **Stealth Balance**: The Adaptive Skin suppresses one detection band at a time and costs EP every Energy Phase to maintain. Can the Specter pick the right band to stay hidden from the Colossus's Missiles, or does the upkeep starve it of the EP it needs to Overcharge?
2.  **Countermeasure Checks on both sides**: Each team fields a Vanguard, so both have Chaff and an ECM suite, and the two Microwave umbrellas are directly comparable. Both now stop an attack only on a **Countermeasure Check (4+)** — the difference is that Chaff is a finite store of roughly six cartridges fired one at a time and free to use, while ECM never runs out but bills 2 EP every Energy Phase whether it is tested or not. Does that trade actually come up at the table, or does one dominate? Note that the Ghosts' ECM answers **the Colossus's Rail Gun**, while the Wall's answers **Lyra's Disruptor** — the same 25-point system doing opposite jobs. Watch also whether rolling a Check on every attack slows the turn down noticeably.
3.  **Vow Check**: The *Vow of Mercy* pulls every Head or Torso result — 50% of all hit locations — until Lyra has destroyed **one** of the target's limbs, after which its core is open. That opening phase is the whole of the vow's cost, and it is steep against a Colossus whose limbs sit behind DR 6 and 7. Does the Disruptor's guaranteed critical make that first limb kill achievable in reasonable time, or does Lyra spend the early game firing shots that evaporate? Note also that she does not actually need the core at all: **Double Leg Loss destroys a Frame outright** (§6.5.4), so stripping both legs is a complete win condition and one the Boon (+1 to Critical rolls against Arms and Legs) directly accelerates. Watch which line the player takes.

---

## Scenario 2: Honorable Attrition (3v3)
**Focus**: The Vow System, Extreme Environmental Hazards (EP starvation), Movement modifiers, and Tactical Datalinks.

### Setup
*   **Map Size**: 36 x 36 Hexes
*   **Terrain**: Arctic EMP Wasteland Sector (Severe thermal drain: -2 EP generation per frame). Scattered Craters (-1 Elevation) and jagged spires (Block LOS).
*   **Team A (The Spears) — 1375 pts**: 
    *   1x **IF-55M-1 "Vanguard"** (Piloted by **Kenji "Shogun" Takahashi** — Vow of Courage)
    *   1x **IF-75H-1 "Paladin"** 
    *   1x **IF-25L-1 "Jackal"** (Tactical Datalink is standard on every Frame's Head hardpoint)
*   **Team B (The Blades) — 1375 pts**:
    *   1x **IF-25L-1 "Jackal"** (Piloted by **Kaito Kuroda** — Vow of Respect)
    *   1x **IF-55M-1 "Vanguard"**
    *   1x **IF-75H-1 "Paladin"**

> *The Blades used to field two Vanguards, and the signal-warfare audit showed why that was a trap rather than a lance. Two ECM suites cover the same three Frames and each bills its own upkeep, so the second umbrella buys nothing and costs a point of energy every turn — which bites hardest here, in the one scenario with a −2 EP drain. Worse, all three of their Frames laid their Autocannons on radar, straight into the Spears' ECM. Swapping one Vanguard for a Paladin fixes both: one umbrella instead of two, and a lance that shoots on Visual and Infrared as well as Microwave. It also brings the two sides to exactly 1375 points.*

### Testing Parameters (What to look for)
1.  **EP Starvation**: With severe arctic environmental interference reducing EP generation by 2, can frames still reasonably afford to Overcharge their weapons (Thermal Lances/Rail Guns) by banking in the Capacitor? Does the game slow down too much?
2.  **The Courage Check**: Kenji Takahashi's *Vow of Courage* forbids reversing. Does this make him an easy target to kite around the craters, or does his +2 Initiative allow him to corner his prey?
3.  **The Respect Check**: Kaito Kuroda's *Vow of Respect* forbids rear-arc attacks. Can the enemy team exploit this by deliberately exposing their backs to him to force a dishonor penalty?
4.  **Datalink Abuse**: Can Team A's Jackal spot targets from safety and allow the Paladin to rain indirect missiles, or does the arctic environment limit the Paladin's ability to fire enough salvos?

---

> *Simulation, 30,000 battles: the Spears win **53%**, range 52–54% across five seeds, over 11.9 turns. Even points, and the small edge is the first-strike advantage that shows up in every matched fight in this suite.*
>
> *How it got here is worth recording. The scenario measured 51% for years and was the best-balanced in the book. Enforcing the signal-warfare rules pushed it to 61%, and neither the Autocannon fix (+7) nor the ECM umbrella (+9) was solely responsible — they compounded, because the Blades' lance happened to be built in exactly the way both fixes punish. The lesson is that a roster can be quietly dependent on a rule not working.*

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

---

## Scenario 8: The Shattered Mesa (1v1 Element, Vertical Warfare)
**Focus**: Elevation & Line of Sight math, Jump Jets and propellant, Kinetic Drop Strikes, Collisions & Ramming, Falling Damage, and recovery from the Prone state.

*This scenario exists because the entire physical-impact subsystem — collisions, drop strikes and falls — is untouched by every other scenario in this document. None of it can be exercised on a flat map.*

### Setup
*   **Map Size**: 20 x 20 Hexes
*   **Terrain**: A shattered mesa complex. Roughly a third of the map is **Level 0** canyon floor, a third **Level 2** mesa top, and the remainder **Level 1** ramps and shelves, with two isolated **Level 3** spires reachable only by Jump Jet. Scatter 3 hexes of Light Woods and 1 of Heavy Woods across the mesa tops, and run a **Deep Water** channel along the canyon floor. Cliff faces of 2+ Levels are impassable on foot.
*   **Team A (The Climbers) — 820 pts**:
    *   1x **IF-45M-1 "Specter"**, refit with **Jump Jets** in a spare Light Torso hardpoint — **455 pts** *(the Adaptive Skin occupies the Medium mount; one Light hardpoint remains free)*
    *   1x **IF-25L-1 "Jackal"** — 365 pts
*   **Team B (The Ground Game) — 820 pts**:
    *   1x **IF-55M-1 "Vanguard"** — 455 pts *(its Torso is full — ECM, an IRCM suite and Chaff — so it **cannot** mount Jump Jets and must take the long way round)*
    *   1x **IF-25L-1 "Jackal"** — 365 pts

> *Points are exactly level. The asymmetry is mobility: Team A can put two Frames on a spire, Team B only one. Whether that is worth anything is the scenario's central question.*

### Testing Parameters (What to look for)
1.  **Does the LOS math survive contact?**: `LOS Blocked if Y ≥ min(A + 2, B + 2)` (§3.4), plus canopy height adding +1 Level for Light Woods and +2 for Heavy on **Visual only**. With three elevation bands and two spires in play, is this resolvable in a few seconds, or does every shot become an argument? This is the most computation the rules ask of a player.
2.  **Is a Kinetic Drop Strike ever worth taking?**: damage is `Mass Value × Hexes Jumped`, so a Jackal's very best effort is **4 flat** — which bounces off every location on a Vanguard and most of a Jackal. Only the Specter, at Mass 2, reaches a meaningful **8**. Against that, the jumper takes **half the damage itself**, and the defender then **slides the jumper into any adjacent hex they choose**. Does anyone ever elect to do this, and if not, should Heavy and Assault Frames — who cannot jump at all — be the only chassis for whom it would have worked?
3.  **Falling Damage**: a forced fall of 2+ Levels rolls **1d6 per Level as one pooled roll** against a random location. Does a 3-Level drop (3d6) feel appropriately dangerous, and does the pooling rule read clearly at the table?
4.  **Collisions in a canyon**: confined floors make blocking and ramming likely. `Collision Damage = Mass Value × Speed`, both Frames take it, and both then make a Pilot Check. Does a light Frame ever profitably body-block a heavier one, given it suffers the same flat damage?
5.  **Getting back up**: failed landings are the main source of Prone in this scenario. Is **3 EP and a Pilot Check** a fair price to stand, and does the terrain modifier (Rough −1, Deep Water −1, Paved +1) meaningfully change where a pilot chooses to land?
6.  **Are Jump Jets worth 20 pts?**: they cost a Light Torso hardpoint, 2 EP per hex, and run dry on an Ammo Die after roughly three jumps. Weigh Team A's vertical reach against Team B's spare hardpoint and unspent EP.

---

## Scenario 9: Salvage Rights (1v1 Mirror, Damaged Frames)
**Focus**: Damage Transfer (blow-through), the Prone state and standing up, Electrical Fire, and the permanent critical effects that accumulate late in a battle.

*Every other scenario starts with undamaged Frames and most end before the deepest critical slots are reached. This one starts where those battles finish. Simulation across 32,000 battles found Electrical Fire occurring in **93%** of them, a severed arm in **66%**, and a severed or destroyed leg in about **50%** — none of which any other scenario is written to test.*

### Setup
*   **Map Size**: 16 x 16 Hexes
*   **Terrain**: An industrial ruin — Paved streets, scattered Rough rubble, two Level 2 Buildings, and a **Shallow Water** drainage channel running the width of the map. *(The channel is not decoration: a Frame that ends its Activation in water extinguishes an Electrical Fire automatically, with no EP cost and no roll.)*
*   **Both Players**: 1x **IF-75H-1 "Paladin"** — 555 pts. Points are tied, so roll 2d6 at setup to determine the Advantage Player.
*   **Starting Damage — apply identically to both Frames before the first Energy Phase**:
    *   **Left Arm**: slots 1–6 marked. The arm is **severed**; its Autocannon is gone, and any future hit rolled on that location **transfers to the Torso**.
    *   **Torso**: slots 1–2 marked — System Glitch and **Servo Lock** (Torso Twists cost 2 EP). Separately, prior fighting has eroded the **Torso Armor DR from 7 down to 5**. *(Armor erosion and critical slots are independent: the plate is thin, but the Structural Fracture slot is still open and waiting.)*
    *   **Right Leg**: slot 5 marked — **Actuator Destroyed**. Both Frames therefore **begin the battle Prone**.
    *   **Head**: slot 3 marked — **Sensor Array Destroyed**. Each player rolls 1d6 at setup to determine which band they have lost (1–2 IR, 3–4 VIS, 5–6 Radar).
    *   Right Arm (Rail Gun), Left Leg and all Torso launchers are **undamaged**.

> *Simulation note: an earlier draft of this scenario opened with the Torso already at DR 0 and four slots marked. It produced 2.2-turn battles decided 72/28 by whoever shot first, and the Rail Gun almost never fired at all. The state above runs about 3.6 turns and lets the Rail Gun off its leash roughly 1.5 times a battle. Even so, expect this to be the swingiest scenario in the suite — two wrecked Frames trading fire is decided quickly, and the Advantage Player roll matters more here than anywhere else.*

### Testing Parameters (What to look for)
1.  **Blow-through onto thin plate**: with the Left Arm gone, roughly a quarter of all incoming hit rolls transfer to a Torso already worn down to DR 5. Every penetration thins it further, and slot 4 — Structural Fracture — is still unmarked, waiting to drop it to 0 outright. Does the Frame feel like it is being dismantled by degrees, or does one unlucky roll end it?
2.  **Standing up under a −2**: both Frames start Prone from an **Actuator Destroyed** leg, which carries the same **−2 to every Pilot Check** a severed leg does. An unaided Paladin therefore rises only **42%** of the time, and pays the 3 EP whether it succeeds or not. Does a pilot commit to standing — regaining full damage dice and the torso twist — or accept the Prone penalties and keep shooting from the ground? Watch whether the first two or three turns collapse into both Frames repeatedly failing to get up, which would suggest the penalty is too steep to open a scenario with.
3.  **Electrical Fire**: it will almost certainly come up. Is **3 EP plus a 4+** a fair price to smother, or is walking into the drainage channel — free, automatic, no roll — so obviously better that the EP option is never taken? If the water is strictly superior, the smothering rule may not be earning its place.
4.  **Living with permanent effects**: Servo Lock, a severed arm and a dead sensor band are all in play from turn one, and the Torso is already eroded. Does tracking them feel manageable on paper, and do they change decisions, or are they forgotten by turn three? *(This is the single strongest argument for the Battle Tracker, so it is worth knowing how bad it is without one.)*
5.  **Is a wreck worth fighting?**: §6.5.4 argues that a crippled Frame is "still a Rail Gun platform… dangerous to approach, trivial to walk away from." Test that claim. Would a player in a larger battle keep this Frame in the fight, or write it off and spend their attention elsewhere?

---

## Scenario 10: Dead Air (2v3, Electromagnetic Warfare)
**Focus**: EMP warheads — area denial, sensor destruction, Tactical Datalink failure, and friendly fire.

*The EMP warhead is the only munition in the game that deals no damage of any kind, targets a **hex** rather than a Frame, and cannot tell friend from foe. Nothing else in this document tests it.*

### Setup
*   **Map Size**: 22 x 22 Hexes
*   **Terrain**: A canal crossing. A single **Paved** causeway four hexes wide runs the length of the map, flanked by **Deep Water**. Two Level 2 Buildings sit at the far end. *(The causeway matters: it is the only ground a Column can cross in formation, and it is exactly the shape of an EMP blast.)*
*   **Team A (The Pulse) — 1075 pts**:
    *   1x **IF-90A-1 "Colossus"** — 620 pts *(its launcher carries the **EMP** warhead — fired at a hex, so it needs no lock and nothing can contest it)*
    *   1x **IF-55M-1 "Vanguard"** — 455 pts
*   **Team B (The Column) — 1185 pts**:
    *   1x **IF-55M-1 "Vanguard"** — 455 pts
    *   2x **IF-25L-1 "Jackal"** — 365 pts each

> *The Column is deliberately light and numerous, and the reason has changed. It used to be that thin armor reaches 0 DR quickly, back when that was the only condition under which an EMP did anything permanent. The warhead ignores armor entirely now, so the point is simply **density**: three Frames are far likelier to be caught together under one seven-hex pattern than two heavy ones spread across a causeway. The Column's problem is that it cannot afford to travel as a column.*
>
> *The Vanguard in the Column is not decoration. Both sides field one, and that symmetry is what makes the scenario a fight rather than a demonstration — each ECM umbrella answers the other's radar-laid Autocannon. Strip the Column's Vanguard out and the Pulse's electronic warfare goes uncontested; that was measured, and it swings the scenario to 65%.*
>
> *Note what a Jackal has to lose. Laser on Visual, Autocannon on Radar: an Array Destroyed result silences exactly one of its two guns whichever way it rolls, where a Colossus losing Radar drops the Rail Gun and losing IR drops the Thermal Lance. Light Frames are not more resilient to sensor loss — they simply have less to lose.*

### Testing Parameters (What to look for)
1.  **Is a weapon that deals no damage worth a Medium hardpoint?**: the EMP costs 4 EP and 20 pts and cannot destroy anything by itself. Its entire value is denial. In a game where a Thermal Lance in the same weight bracket lands over a critical per attack, does the pulse justify the mount?
2.  **An opener, not a finisher**: the warhead ignores Armor DR completely, so its best turn is the first one, before a shot has been fired. Does opening with it actually pay? A pilot who leads with the EMP spends a Medium hardpoint's worth of ammunition on a turn when nothing is yet damaged — and gets a lance that is blind, disconnected, and one array short for the rest of the game. Watch whether players hold it for a decisive moment instead, and whether holding it is ever right. torso has been stripped it may be several criticals at once, across several Frames, for a single 4 EP salvo. Does this correctly reward softening a target first, or does it sit unused because armor rarely reaches 0 before a Frame dies?
3.  **Friendly fire**: the blast covers the target hex **and all six adjacent hexes**, and explicitly does not spare allies. Can the Colossus find a firing solution that catches two Jackals without also catching its own Vanguard, and does the threat of it change how Team A advances?
4.  **Losing a band**: an EMP knocks out one sensor array on every affected Frame until the End Phase — 1d6, on a 1–2 the IR, 3–4 the VIS, 5–6 the Radar — and jams the Tactical Datalink for the turn. This is the same roll as the Head's *Sensor Array Destroyed* critical, and the point is that it comes back. Watch whether losing a band is decisive or irrelevant: a Colossus that loses Radar cannot fire its Rail Gun that turn, but a Jackal that loses Radar carries nothing that needs it. Does the randomness make the warhead feel arbitrary?
5.  **Can it be stopped?**: no. The warhead is aimed at a hex, so there is no lock for Chaff, an IRCM suite, Smoke, ECM or an Adaptive Skin to contest — a countermeasure denies a *lock*, and there is no lock here. **Only line of sight and terrain stop it.** Does an unblockable weapon feel unfair at the table, or does dealing no damage and sparing intact armour keep it honest?

---

> *Simulation, 30,000 battles: the Pulse wins **46%**, range 46–47% across five seeds, over 8.1 turns. The Column carries 50 more points, so a four-point edge to it is about proportionate.*
>
> *This roster has been round a loop worth recording. It began here, measured 33/66, and was re-tuned to three Jackals to reach 51%. Then the Autocannon fix gave every gun a band that countermeasures can answer — and three Jackals, all laying their Autocannons on radar into the Pulse Vanguard's ECM, became a hard counter at 65%. Restoring the Column's own Vanguard fixed it, because now both sides hold an ECM umbrella and neither's radar-laid guns are free. **The original roster was right all along; it only looked broken while a third of the game's shooting ignored electronic warfare.***
>
> *What the warhead does across a battle: about **4.9 Frames caught**, **1.6 arrays destroyed for good** — and **1.5 of the Frames caught are the Pulse's own**. Roughly a third of the pattern lands on the firer's lance, and there is no aiming slightly off to avoid it, because the blast is uniform to its edge. That is the scenario's real question.*
>
> *Caveats: the simulator has no map, so blast reach is a parameter (tested 25% to 60% adjacency — the result moved one point across that range), and its pilots make no attempt to position away from their own Colossus. A real player would, so real friendly fire is lower and the warhead is better than these numbers suggest.*

## Scenario 11: Three Oaths (3v3, The Untested Vows)
**Focus**: The Vows of **Honor**, **Loyalty** and **Honesty** — the three that no other scenario fields — and how they interfere with one another on the same team.

*Loyalty in particular cannot be evaluated anywhere else in this document: its Boon only functions with allies within 3 hexes, so every 1v1 scenario is blind to it.*

### Setup
*   **Map Size**: 28 x 28 Hexes
*   **Terrain**: Open rolling steppe — mostly Clear, with three Level 1 rises and two patches of Light Woods. Deliberately sparse: these vows are about *choices*, and heavy terrain would hide the consequences.
*   **Team A (The Sworn) — 1345 pts**:
    *   1x **IF-45M-1 "Specter"** — Named Pilot, **+3**, **Vow of Honor** — 480 pts
    *   1x **IF-55M-1 "Vanguard"** — Named Pilot, **+2**, **Vow of Loyalty** — 485 pts
    *   1x **IF-25L-1 "Jackal"** — Named Pilot, **+1**, **Vow of Honesty** — 380 pts
*   **Team B (The Coalition) — 1345 pts**:
    *   1x **IF-45M-1 "Specter"** — 435 pts *(carries an **Adaptive Skin**)*
    *   2x **IF-55M-1 "Vanguard"** — 455 pts each *(each carries an **ECM** suite)*

> *Points are exactly level. Team B's list is chosen so the Honesty Boon has something to bite on — one Adaptive Skin and two ECM umbrellas — and so the Honor pilot, in a 45-ton Specter, always has a heavier enemy in view.*

### Testing Parameters (What to look for)
1.  **Honor — the biggest Boon in the game**: +1 damage die is worth roughly **29% faster kills**, but it only fires against a Frame of higher tonnage or Initiative, and the constraint *forces* the pilot to engage that Frame. Does the constraint ever hurt — being made to shoot a fresh Vanguard while a crippled one walks away — or does it always point where you wanted to shoot anyway? If the latter, the vow is a pure upgrade and should cost something.
2.  **Loyalty — does the Boon justify the leash?**: every friendly Frame within 3 hexes gains one extra damage reroll, worth about **+19% durability each**, and with two allies in range that is the most total value any vow produces. The price is that the pilot may not move away from a more damaged ally within 3 hexes. Does that become a trap — a wounded ally anchoring the Vanguard in the open — and does the required clumping make the whole team a gift to Cluster and HE munitions?
3.  **Honesty — a free vow on the right Frame**: the Jackal carries no Skin, Smoke, Flares, Chaff or ECM, so the constraint costs it **nothing in hardware**, while the Boon switches off Team B's Skin *and* both ECM suites against its locks. Is that simply the correct pick, and is a vow that is free on one chassis and costs a Vanguard 55 points of kit acceptable design?
4.  **The oaths interfere — watch this one closely**: Honesty forbids benefiting from **allied** ECM, so the Jackal cannot shelter under its own Vanguard's umbrella. Loyalty wants the team within 3 hexes. The two vows are pulling the Jackal in opposite directions — it must stay close for the reroll but gains nothing from the jamming that closeness normally buys. Does that read as interesting tension or as a trap for a player who did not check?
5.  **Dishonor in practice**: losing a vow costs the Boon, the Initiative bonus, the Pilot Check bonus, and +1 EP on every weapon for the rest of the battle. With three sworn pilots on one team, does anyone actually break — and can Team B *make* them break, by refusing an Honor target or by exposing a wounded Frame to bait the Loyalty pilot?
