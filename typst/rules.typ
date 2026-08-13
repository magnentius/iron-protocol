// Iron Protocol — the rulebook.
//
// Converted from rules.md by tools/md2typst.py and edited by hand afterwards.
// This file is the source of truth; the markdown is gone.
//
// Build:
//   typst compile --root . --font-path typst/fonts --ignore-system-fonts \
//     typst/rules.typ rules.pdf

#import "lib/rulebook.typ": *

#show: rulebook.with(theme: sys.inputs.at("theme", default: "print"))

#cover(
  "Iron Protocol",
  "A Tactical Game of Iron Frame Combat",
  "/images/iron_protocol.jpg",
  tagline: [Fusing tactical resource management and locational damage with fluid
    turn-order dynamics and initiative-based action.],
)

#outline(title: [Contents], depth: 3, indent: auto)

= The Game in Brief

_Read this page first. It teaches nothing you will not meet again in full — it is here so that everything after it has somewhere to land._

Two players each command one to four *Iron Frames*: 20-to-100-ton walking weapon platforms, moved on a hex map. You win by destroying the opposing Frames.

*Everything runs on energy.* A Frame's reactor generates *Energy Points (EP)* at the start of every round, and EP is the only currency in the game. Walking costs it. Turning costs it. Firing costs it. Running a stealth system costs it every single round. Almost every decision you make is really the decision of what _not_ to spend it on.

*A round has four phases*, and every Frame on the board goes through each one before the next begins:

#table(
  columns: 3,
  align: (left, left, left,),
  [Phase], [What happens], [Order],
  [*Energy*], [Reactors generate EP. Stealth upkeep is deducted.], [—],
  [*Activation*], [Frames move, spending EP hex by hex.], [Lowest Initiative first],
  [*Combat*], [Frames shoot. Damage resolves immediately.], [Highest Initiative first],
  [*End*], [Unused EP banks into the Capacitor. Temporary effects clear.], [—],
)

Note that the two orders are opposites. A slow Frame moves first and shoots last — it commits to a position before it knows what anyone else will do, then watches the fast Frames fire before it can answer. That single inversion is the spine of the game's tactics.

*Attacks do not roll to hit.* There is no to-hit number anywhere in these rules. If you can see a target, have it in the right arc, and hold a *sensor lock* on the band your weapon needs, the attack lands. The fight is therefore about two questions the shooter cannot take for granted:

+ *Can I see it?* Every weapon needs a lock on one of three sensor bands — Visual, Infrared, or Radar. Woods, buildings and hills block bands outright; chaff, smoke and jammers contest them on a die roll. Blind a Frame on the right band and its gun is dead weight, however much energy it has.
+ *Can I hurt it?* Every location has an *Armor DR*. Damage must be *strictly greater* than that number to do anything at all. Equal or less and the plate holds — no partial damage, nothing.

*Armor erodes rather than depletes.* There are no hit points. When damage beats a location's Armor DR, three things happen: the DR drops by 1 permanently, and it never comes back; the attacker rolls a *Critical Hit* on that location's table; and the location is now that much easier to beat next time. A Frame dies from the criticals — a severed leg, a cooked-off magazine, a cockpit hit — not from accumulated damage.

*What the dice do:*

#table(
  columns: 2,
  align: (left, left,),
  [Roll], [Used for],
  [*2d6*], [Hit location, and Pilot Checks (target number 6)],
  [*1d6*], [Critical hits, Countermeasure Checks (4+ stops the attack), the Ammo Die],
  [*Weapon dice*], [Damage — 2d6 for a Laser, 5d6 for a Rail Gun, and so on],
)

That is the whole engine. Everything else is detail.

#design-note[
Passages marked like this one explain _why_ a rule is the way it is. They are commentary, never rules: you can play the entire game without reading a single one, and skipping them costs you nothing at the table. They are here because most arguments about a rule are really arguments about its reason.
]

= Introduction: The Iron Protocol

_Background and setting. Skip to #sec("1") if you want to start playing._

In the war-torn era of a devastated Earth, surface warfare is not decided by faceless drone swarms, heavy tank divisions, or indiscriminate strategic missile strikes. Instead, factional conflicts and territorial disputes are resolved by the pilots of massive, heavily armed walking weapon platforms known as Iron Frames. 

These elite pilots adhere to the *Iron Protocol*—an ancient, unyielding code of martial honor and combat conduct inspired by Earth's historical Bushido. The Protocol dictates that territorial conflicts must be settled within designated engagement zones, frame-to-frame, where tactical energy management, maneuverability, and pilot skill determine the victor. To violate the Protocol is to invite immediate dishonor, global outlaw status, and swift retaliation by all allied factions.

== The Lore of the Protocol: Why We Fight in Frames

The emergence of the Iron Protocol was born of necessity, forged from the ashes of the *Cinder Wars*—a period of total industrial warfare that left entire continents scorched, cities in ruins, and Earth's biosphere on the brink of complete collapse. To prevent human extinction, the surviving nation-states and corporations signed the Accords, establishing the Protocol to govern all future terrestrial conflicts.

=== 1. The Preservation of Biospheres & Infrastructure

Earth's remaining arable land, clean water reserves, and surviving industrial infrastructure are humanity's most precious assets. Conventional mass warfare—carpet bombing, tactical nuclear strikes, and massive tank divisions tearing up agricultural land—irreversibly ruins the planet's remaining ecosystems. The Iron Protocol strictly outlaws weapons of mass destruction, strategic bombing, and heavy tracked armor. Battles are confined to designated, unpopulated "Honor Fields" and containment zones to preserve surviving biospheres for the victor.

=== 2. The Kessler Shroud (No Missiles, GPS, or Orbitals)

Ballistic missiles travel a suborbital arc that peaks between 800 and 1,200 kilometers above the surface—directly through what was once called Low Earth Orbit. During the final years of the Cinder Wars, competing powers launched hundreds of anti-satellite weapons in a desperate bid to blind each other's targeting and communications networks. They succeeded—and in doing so, triggered a runaway debris cascade now known as the *Kessler Shroud*.

The Shroud is a permanent, self-sustaining belt of fragmented steel, shattered solar panels, and pulverized satellite bus material traveling at orbital velocity. Any object that reaches sufficient altitude is struck within minutes. Warhead casings are shredded before they reach apogee. Guidance fins are stripped away in milliseconds. The debris field does not discriminate: civilian resupply drones, military recon packages, and ICBM re-entry vehicles all meet the same fate. Humanity effectively walled itself out of space.

The strategic consequences were immediate and permanent. Long-range ballistic weapons became useless overnight. Every GPS constellation was destroyed within weeks of the cascade beginning—navigation satellites occupy exactly the altitude range the Shroud now owns. Reconnaissance satellites, weather platforms, and communications relays followed. No faction has achieved orbital insertion in over sixty years, and none expect to in their lifetimes.

Without satellite imaging, battlefield intelligence has collapsed back to line-of-sight. Pilots navigate by inertial systems, dead reckoning, and pre-war topographic maps that grow less accurate each year as tectonic activity reshapes the terrain. There is no overhead view of the engagement zone, no GPS waypoint to lock onto, no real-time feed from orbit. What a pilot cannot see from their cockpit or tactical sensors, they do not know. The Shroud has not thinned—if anything, the cascade continues to generate new debris from its own collisions. Earth is, for the foreseeable future, a closed world. Wars must be fought on the ground, within atmosphere, at ranges where a pilot can engage the enemy directly.

=== 3. Bipedal Superiority Over Tracked Armor

Modern Earth battlefields are jagged, unpaved, and volatile. Tectonic fractures, ruined mega-cities, flooded coastal craters, and mountains of urban debris make standard tracked tanks useless; heavy armored vehicles are easily bottlenecked in ruined canyons or trapped by rubble. 

Iron Frames, with their articulated bipedal limbs and vector thrusters, possess unmatched all-terrain mobility. A Frame can climb urban ruins, leap over chasms using Jump Jets, duck behind heavy cover, and pivot dynamically in close-quarters combat. Where a 60-ton tank gets stuck in a trench, a 60-ton Heavy Frame can step over it, leap past it, or use its arms to clear a pathway.

=== 4. The Failure of Air Power (Fuel Scarcity & Fusion Supremacy)

Fighter aircraft seem like the obvious escalation—fast, lethal, hard to stop. In the pre-Cinder era they defined warfare. But the post-Collapse world rendered air power economically and logistically unviable.

The primary bottleneck is *fuel scarcity*. Conventional fighter jets require immense volumes of refined high-density aviation fuels. The Cinder Wars completely exhausted Earth's fossil fuel reserves, and the industrial infrastructure needed to synthesize jet fuels in quantity was destroyed in the early bombings. Launching a single jet sortie consumes a faction's entire monthly stockpile of refined chemical propellant in a matter of minutes.

Iron Frames, by contrast, are built around self-contained compact *fusion reactors*. A Frame generates virtually limitless operational energy—fueling its mobility, thrusters, and energy weapons from trace amounts of hydrogen isotopes for months on end without needing a logistical supply train.

Furthermore, aircraft suffer severe operational limits in the post-Cinder environment:
- *Environment & Sensors*: Ruined megacities are shrouded in thermal inversion layers, dense industrial smog, and tectonic dust. Supersonic jets cannot maneuver in tight debris canyons, and long-range high-altitude radar desyncs in particulate clutter. Ground combat relies instead on short-range tactical sensors—Visual (VIS), Thermal/Infrared (IR), and directional Microwave (Radar)—mounted directly on Frames.
- *Inability to Hold Ground*: Air power cannot hold territory. A jet can bomb a bridge or factory, but the Protocol strictly forbids destroying surviving infrastructure. What the Protocol demands is _territorial control_: a force that can stand in a hex, occupy a ruin, guard an asset, and deny it to the enemy.
- *Runway Vulnerability*: Jets require pristine runways and massive maintenance facilities—prime targets in a world of scarce infrastructure. Fusion-powered Frames can be field-maintained, marched overland, or transported by rail and heavy transport barges directly to tactical engagement zones.

=== 5. The Failure of Personal Champions

The simplest alternative—settle disputes with a duel between individual champions—was tried in the early post-Cinder era and collapsed within a generation. A faction's best warrior is a single point of failure: one stray bullet, one bout of illness, one lucky knife in a back alley and the dispute is void, the treaty collapsed, the war re-ignited. More critically, powerful leaders simply refused to risk themselves personally, sending proxies who could always be disavowed. Personal duels offered no _institutional_ weight. 

An Iron Frame is different. It represents an enormous capital investment—rare materials, years of fabrication, a trained pilot whose neural datalink takes a decade to calibrate. When a Frame steps onto the Honor Field, a faction has committed its treasury, its engineering corps, and a living pilot to the outcome. The stakes are real and verifiable. Losing a Frame is a wound that takes years to recover from. This is what gives the Protocol its teeth: not honor alone, but the irreplaceable cost of the machine.

=== 6. The Ban on Autonomous Warfare (The Human Core)

Following a catastrophic AI rebellion that nearly annihilated humanity, international treaties strictly outlaw autonomous combat drones and artificial combat intelligences. War must be fought by human pilots, exposing themselves to direct risk. The Iron Frame serves as an extension of the pilot's own body, synchronizing via a neural datalink. War is no longer a matter of automated factory output, but a test of personal discipline, honor, and martial skill.

== Core Tenets of the Protocol

- *Honor in the Arc*: Foe must face foe. Torso twisting represents the deliberate, disciplined adjustment of a pilot's stance to align weapons with the enemy.
- *Mastery of Energy*: An Iron Frame's reactor is the pilot's lifeblood. Distributing energy (EP) between movement, active countermeasures (Chaff, ECM, Smoke), and weapon overcharges is the ultimate test of tactical discipline.
- *Precision Striking*: The Protocol forbids mindless carpet destruction. Pilots target specific locations—systematically degrading armor plates, disabling weapons, burning out thrusters, and blinding sensor suites to neutralize the opponent with precision.
- *The Martial Vows*: Elite pilots swear ancient oaths before entering the Honor Field — the _Vow of Courage_, _Respect_, _Honor_, _Mercy_, _Honesty_ or _Loyalty_. These vows grant martial focus but impose unyielding tactical restrictions—breaking a vow mid-combat dishonors the pilot and severely degrades their Frame's neural performance.

= 1. Fundamental Concepts & Game Setup
#anchor("1")

#epigraph["Victorious warriors win first and then go to war, while defeated warriors go to war first and then seek to win."][Sun Tzu]

Before launching into combat, players must understand the core profile of an Iron Frame, facing conventions, firing arcs, and game setup.

== Key Terms

These fourteen terms carry the whole game, and several are used in the movement and combat rules before their own section arrives. One line each, with where to find the full rule:

#table(
  columns: 3,
  align: (left, left, center,),
  [Term], [In one line], [Full rule],
  [*Round* (or *turn*)], [One full pass through all four phases, for every Frame on the board. The two words mean the same thing throughout these rules.], [2],
  [*Activation*], [One _individual_ Frame's move within the Activation Phase — not the same thing as a round.], [2.2],
  [*Energy Point (EP)*], [The single currency. Generated each round; spent on movement, systems and weapons.], [2.1],
  [*Capacitor*], [A standing reserve of unspent EP. Carries between rounds; the only source of Overcharge.], [2.1],
  [*Armor DR*], [A location's damage threshold. Damage must _exceed_ it, and every penetration drops it by 1 for good.], [1.1, 7.2.1],
  [*Initiative*], [Move order and firing order — reversed between the two.], [2.2, 2.3],
  [*Lock*], [Detection on a sensor band (Visual, Infrared, Radar). No lock on the band a weapon needs, no attack.], [4.1],
  [*Countermeasure Check*], [1d6, rolled by the defender. On a *4+* the lock fails and the attack is negated. One number for every defensive system.], [4.2],
  [*Flank Speed*], [Gained by exiting 4+ hexes in an activation. Lets the defender force one damage die to be rerolled.], [2.2],
  [*Cover*], [Terrain that forces rerolls the same way — 1 die in Light Woods, 2 in Heavy Woods or beside a building. Stacks with Flank Speed.], [3.3],
  [*Pilot Check*], [2d6 against a target number of 6, plus modifiers. Usually rolled to stay upright.], [6.4],
  [*Critical Hit*], [1d6 on the struck location's table, rolled whenever armor is penetrated. This is what actually kills Frames.], [6.2],
  [*Cascading Failure*], [A critical landing on an already-marked slot climbs to the next unmarked one. Damage concentrates.], [6.2],
  [*Overkill Margin*], [One extra critical die per full 5 points of damage past the Armor DR.], [2.3, 6.2],
  [*Ammo Die*], [1d6 rolled after firing. At or below the weapon's number, it is *Empty for the rest of the battle*. Nothing reloads.], [5.0],
  [*Overcharge*], [Spending banked Capacitor charge for a magnified effect. Always adds dice, never a flat bonus.], [5.3],
)

== 1.1 Anatomy of an Iron Frame Profile
#anchor("1.1")

Each Iron Frame (IF) is defined by its chassis, reactor, capacitor, and mounted components:
- *Initiative (typically 2–12)*: A static value representing pilot reaction speed and chassis agility. Higher initiative frames shoot first but move last, while lower initiative frames move first but shoot last. A Named Pilot's bonus is added on top of the chassis figure and may carry a Frame past 12 (see #sec("7.3.2")).
- *Chassis Mass (Tonnage)*: Built on a scale from *20 to 100 Tons* (in 5-ton increments). Tonnage determines the Frame's weight class and its corresponding *Mass Value* used for collision damage:
  - *Light* (20–35 Tons): Mass Value = 1
  - *Medium* (40–55 Tons): Mass Value = 2
  - *Heavy* (60–75 Tons): Mass Value = 3
  - *Assault* (80–100 Tons): Mass Value = 4
- *Reactor Rating*: The number of Energy Points (EP) generated by the Frame at the start of each turn during the Energy Phase.
- *Capacitor Storage (Max EP)*: The maximum amount of unused EP that can be held in the Capacitor. Banked charge is a *standing reserve*: it is not consumed at the start of a turn and carries from round to round until it is spent. Only EP that would push the Capacitor past this Max is lost.
- *Flank Speed Threshold*: 4 hexes. If a Frame successfully exits at least 4 hexes during its activation, it gains *Flank Speed* for the remainder of the turn. _This threshold is fixed and deliberately does not scale with the chassis. An *Assault Frame can never gain Flank Speed* — its Movement Limit tops out at 3 hexes, one short of the threshold, and no upgrade can close the gap. A walking fortress does not dodge; it stands there and takes it. Its profile lists a Flank Speed of "N/A" to make this explicit._
- *Movement Limit*: The maximum number of hexes a Frame can enter (via walking, reversing, or jumping) in a single turn. These are the _maximum_ values permitted for each weight class (see the Chassis Limits Table in #sec("7.2")); an individual Frame may be rated lower:
  - *Light*: 7 max
  - *Medium*: 5 max
  - *Heavy*: 4 max
  - *Assault*: 3 max
  _(Pivoting/turning does not count toward the Movement Limit)._
- *Armor Damage Reduction (DR)*: Each of the 6 hit locations (Head, Torso, Left Arm, Right Arm, Left Leg and Right Leg) has its own Armor DR rating. When a location is hit, its current Armor DR acts as a threshold. If the incoming damage is strictly greater than this DR (penetrates the armor), the location's Armor DR is permanently reduced by 1 and the attacker rolls on the Critical Hit Table for that location.
- *Mounted Hardpoints & Equipment*: Every location carries its own fixed hardpoints, each of a set size (Light, Medium or Heavy). Weapons and systems are bolted into a specific location — Head, Torso, Left Arm or Right Arm — and that location determines both the weapon's Firing Arc and what is lost when the location is destroyed. See the Hardpoint Layout Table in Section 7.2.0.

== 1.2 The Hex Grid & Facing Conventions
#anchor("1.2")

The game is played on a standard hexagonal grid.
- *Distance Scale*: Each hex represents approximately *30 meters* of terrain.
- *Time Scale*: A single combat turn (round) represents approximately *10 seconds* of real-time combat.
- *Facing Conventions*: A Frame possesses two components of facing:
  - *Leg Facing (Movement)*: The direction the legs face. It points at exactly one of the six hexsides, and it is the only direction a Frame may walk into. To go anywhere else, pivot first.
  - *Torso Facing (Combat)*: The direction the upper body faces. By default, the torso aligns with the leg facing, but a Frame can twist its torso at the end of its activation.
- *Torso Twisting*: At the end of its activation, a Frame's upper body can twist 1 hexside (60 degrees) to the left or right of its current Leg Facing, setting its Torso Facing and Firing Arcs for the upcoming Combat Phase.

#figure(image("/images/hexgrid.jpg", width: 82%), caption: [Tactical Hex Grid Map])

== 1.3 Firing Arcs & Hit Zones
#anchor("1.3")

=== 1. Firing Arcs

Firing arcs are determined relative to the Frame's *Torso Facing*. Weapons may fire into the arcs their mounting location can cover:
- *Forward Arc*: The 180-degree wedge directly in front of the Torso (covering 3 hexsides: Front-Left, Front, and Front-Right). *All weapons* — Torso and Arm alike — may fire into this arc.
- *Left Side Arc (Left Arm Only)*: The 60-degree wedge covering the direction directly to the left-rear of the Torso (covering 1 hexside: Left-Rear). Only weapons mounted in the Left Arm may fire into this arc.
- *Right Side Arc (Right Arm Only)*: The 60-degree wedge covering the direction directly to the right-rear of the Torso (covering 1 hexside: Right-Rear). Only weapons mounted in the Right Arm may fire into this arc.
- *Rear Arc*: The 60-degree wedge directly behind the Torso (covering 1 hexside: Rear). No weapons can be fired into the Rear Arc.

In practice this means a Torso weapon is a fixed forward battery covering 3 hexsides, while an Arm weapon traverses: it covers those same 3 hexsides _plus_ the one to its own side, for 4 of the 6 hexsides. Arms are the only mounts that can engage a target on the Frame's flank.

#figure(image("/images/arcs.jpg", width: 82%), caption: [Firing Arcs Diagram])

=== 2. Attack Directions & Hit Zones

When a Frame is attacked, the direction of the incoming attack determines the *Hit Zone* relative to the target Frame's *Torso Facing*:
- *Front Hit Zone*: The 180-degree sector directly in front of the target (covering 3 hexes). Uses the Front Hit Location column.
- *Left Side Hit Zone*: The 60-degree sector to the left of the target (covering 1 hex). Uses the Left Side Hit Location column.
- *Right Side Hit Zone*: The 60-degree sector to the right of the target (covering 1 hex). Uses the Right Side Hit Location column.
- *Rear Hit Zone*: The 60-degree sector directly behind the target (covering 1 hex). Uses the Rear Hit Location column.
- *Determining the Hit Zone*: Draw a straight line of sight from the center of the attacker's hex to the center of the target's hex. The sector of the target's Torso that this line passes through determines the Hit Zone.
- *Boundary Hexes (Target's Choice)*: If the line of attack passes exactly along the boundary between two Hit Zones, the defender chooses which of the two adjacent Hit Zones the attack is resolved as.

#figure(image("/images/zones.jpg", width: 82%), caption: [Attack Directions & Hit Zones Diagram])

== 1.4 Scenario Setup & Deployment
#anchor("1.4")

To begin a game of _Iron Protocol_, players complete the following setup steps:
+ *Agree on Force Limit*: Players select a Deployment Point budget (e.g. 500 pts for introductory 1v1, 1000 pts for 2v2 Element combat, 1500 pts for 3v3–4v4 Platoon battles).
+ *Select Frames & Pilots*: Players choose pre-built technical readouts from the *Iron Frame Roster (#sec("8"))* or construct custom frames using Section 7.2.
+ *Determine the Advantage Player*: whoever brings the *lower* total force cost is the *Advantage Player* — deliberately spending less than the budget to claim it is called a *Point Bid*. If the two forces cost the same, roll 2d6; the higher roll takes it. The Advantage Player chooses their home map edge and settles every Initiative tie for the rest of the battle.
+ *Map Setup & Unit Deployment*: Lay out hex map tiles. The Advantage Player chooses their home map edge and deploys first. Deployment then *alternates* between the two players, and each player places their own Frames in *ascending Initiative order* — slowest first, fastest last. Each Frame is placed within 2 hexes of its own home edge, and the deploying player sets its Leg Facing freely; its Torso Facing begins aligned with the legs. Where one force has more Frames than the other, alternation continues until the smaller force is fully deployed, and the larger then places whatever remains, still slowest first. *Every Frame in a force is deployed* — there are no reserves and nothing is held back unless a scenario provides for it.
+ *Pre-Combat System Activation*: Frames carrying an *Adaptive Skin* or *ECM* may deploy with those systems *Active*, and the 2 EP upkeep for each is deducted in the Round 1 Energy Phase exactly as in every later round. Deployment decides only whether a system is *running*. An Adaptive Skin's cloaked band is chosen in that first Energy Phase like any other (#sec("4.2")), so nothing about which spectrum you are hiding on is committed before the board is set.

#design-note[
  Deployment runs the same way the Activation Phase does, and for the same
  reason. A slow Frame commits to its ground before it has seen much, and a fast
  one places last with the whole board in front of it — the identical trade the
  turn sequence makes every round, arriving before the first round begins. It
  also means nobody chooses their deployment order: your scout goes last because
  it is your scout, not because you decided to hold it back.

  Deploying first is what the Advantage Player pays for choosing the ground.
  Placing last is worth roughly what the edge is worth, and that player already
  settles every Initiative tie for the whole battle; handing them all three would
  leave the Point Bid as the only decision in setup that mattered.

  The uneven case is the compensation for being outnumbered: a lance of four
  against a lance of two alternates twice, and the larger force then places its
  remaining pair knowing everything.
]

=== 1.4.1 Introductory Scenario: Trial by Fire (1v1 Duel)
#anchor("1.4.1")

Recommended for first-time players learning the _Iron Protocol_ rules engine.

- *Point Budget*: 500 Points per player.
- *Recommended Matchup — Vanguard Mirror*: Both players field an *IF-55M-1 "Vanguard"* (455 pts). A mirror match is the clearest way to learn the engine: with identical Frames, every difference in the outcome comes from pilot decisions rather than from the matchup. It teaches the three things that decide games — banking EP for Overcharges, maneuvering to gain Flank Speed, and choosing between a Single Burst and Full Auto — without any asymmetry to untangle at the same time.
- *Second Game — Vanguard vs. Specter*: Once both players are comfortable, field the *IF-55M-1 "Vanguard"* (455 pts) against the *IF-45M-1 "Specter"* (435 pts). This is a deliberately asymmetric matchup, and it rewards knowing the Specter's line — which is written out in full in *Appendix B*, once you have the sensor and countermeasure rules behind you.
- *Map Size*: 16 x 16 Hexes.
- *Terrain*: 
  - 1 Central Level 1 Hill (Elevation movement & LOS testing)
  - 2 Patches of Light Woods (+1 Cover Reroll)
  - 2 Urban Building Hexes (Level 2 height, solid LOS blockage)
  - 1 Shallow Water Hex (+1 EP Reactor Cooling)
- *Deployment*: Opposing map edges (12 hexes apart).
- *Victory Condition*: Destroy the opposing Iron Frame (destroy the Head, Torso, or both Legs via Critical Hits) or force its surrender.

= 2. Turn Sequence
#anchor("2")

#epigraph["A good plan violently executed now is better than a perfect plan executed next week."][George S. Patton]

Each round of play is divided into four distinct phases:
+ *Energy Phase*: Generate energy and allocate stealth/system upkeep.
+ *Activation Phase*: Move Frames and spend EP on movement in *reverse initiative order* (lowest initiative first).
+ *Combat Phase*: Declare and resolve attacks in *initiative order* (highest initiative first).
+ *End Phase*: Store unused energy, dissipate temporary effects, and clean up the board.

== 2.1 Energy Phase
#anchor("2.1")

At the start of the turn, players perform the following steps:
+ *Energy Generation*: Every Frame generates EP equal to its Reactor Rating. This forms the turn's *energy pool*. The Capacitor is *not* touched — banked charge is a standing reserve that persists until spent, and is available on top of the pool.
  - *Spending order*: pay from the pool first; draw on the Capacitor only once the pool is empty. The one exception is *Overcharge*, which must always be paid from the Capacitor (see #sec("5.3")).
  - _A Frame with Reactor 8 and 3 EP banked opens the turn with a pool of 8 and 11 EP available in total. Spend 10 and it ends with an empty pool and 1 EP still in reserve._
+ *Stealth & System Upkeep*: Players allocate EP to maintain active stealth or ECM systems (e.g., Adaptive Skin, ECM). This EP is immediately deducted from the available pool. Any remaining EP is carried over to be spent dynamically on movement and combat.

== 2.2 Activation Phase (Reverse Initiative Order)
#anchor("2.2")

Frames activate one at a time, beginning with the *lowest Initiative* value and counting up.
- *Initiative Tie-Breakers (Activation)*: If opposing Frames share the same Initiative value, the *Advantage Player* (determined during setup via Point Bid or die roll) decides which of the tied Frames activates first (choosing to activate their own unit first or forcing the opponent's tied unit to activate first). Frames on the *same* side that share an Initiative value activate in whatever order their own player chooses.
- *Dynamic Movement Execution*: When a Frame activates, the player decides how to move it on the fly, spending EP from their current energy pool step-by-step. This allows players to react directly to the movements of previously activated (lower-initiative) frames.
- *Movement Limit*: A Frame cannot enter more hexes during its activation than its stat sheet Movement Limit. Changing Leg Facing (pivoting) does not count as entering a hex and is not restricted by this limit.
- *Which hex you may enter*: a *Forward Walk* enters the single hex the Leg Facing points at, and a *Reverse* the single hex directly behind it. There is no diagonal step. Reaching any other adjacent hex means pivoting first, at 1 EP per 60°, so a Frame that wants to turn a corner pays for the corner.
- *Doing nothing is a choice*: a Frame is never obliged to move, and may end its activation without spending a point. It may equally decline to fire in the Combat Phase. Spending almost nothing is the only way to stay off infrared (#sec("4.1")), so standing still is a tactic rather than a forfeit.

=== Movement Cost Summary

Every action below is paid for out of the Frame's energy pool, step by step, as it moves. *Surcharges apply only where the table says they do.*

#table(
  columns: 5,
  align: (left, center, center, center, center,),
  [Action], [Base Cost], [Terrain Surcharge?], [Climbing (+1 Level)?], [Counts vs Movement Limit?],
  [*Forward Walk (W)*], [1 EP], [*Yes* — pay the destination hex's cost], [*Yes*, +1 EP], [Yes],
  [*Reverse (R)*], [2 EP], [*Yes* — pay the destination hex's cost], [*Yes*, +1 EP], [Yes],
  [*Jump Jet (J)*], [2 EP per hex], [*No*], [*No*], [Yes, 1 per hex crossed],
  [*Pivot / Turn*], [1 EP per 60°], [No], [—], [*No*],
  [*Stand Up*], [3 EP], [No], [—], [No],
  [*Torso Twist*], [Free], [No], [—], [No],
)

- *Terrain is paid on entry, for the hex you move _into_* — never for the hex you are leaving or passing through.
- *A Jump pays 2 EP per hex and nothing else.* It bypasses everything between its start and its landing hex, and it pays no surcharge for the hex it lands in either: the *Pilot Check* on the Jump Jet Terrain Landing Table is already the price of coming down somewhere awkward, and charging both would bill the same terrain twice.
- *Damaged movement*: a *Knee Lock* critical adds +1 EP to every Walk and Reverse. A *Prone* Frame pivots at 2 EP per 60°, or *3 EP* if one of its legs has been severed.
- *Notation*: *W* forward walk, *R* reverse, *TL/TR* pivot left or right, *J* jump. A Reverse moves the Frame backwards _without_ changing its Leg Facing; a Pivot changes facing without entering a hex.

=== Jump Jets

Jump Jets are available to *Light* and *Medium* weight classes only (20–55 Tons); Heavy and Assault Frames can never be equipped with jets and can never jump. They occupy a *Light hardpoint in the Torso*, where the thrusters and their propellant tankage sit.

#design-note[
The limit is propellant, not thrust: lifting a Frame takes reaction mass, and the tankage needed scales with tonnage far faster than a chassis can carry it. A 90-ton Assault Frame would be mostly propellant and still barely clear the ground.
]

- _Cost_: 2 EP per hex, *plus propellant*. After completing any jump, roll the *Ammo Die (1d6)*; on a *1 or 2* the tanks are dry and the Frame can never jump again this battle. Expect roughly three jumps from a full load.
- _Movement_: The Frame jumps in a straight line to a hex up to *4 hexes* away. This maximum is the same for every Frame that mounts Jump Jets — it does not scale with the chassis, is not raised by a Movement upgrade, and is unrelated to the Movement Limit: a Jackal rated for 7 hexes of walking still jumps a maximum of 4. Each hex crossed does count against the Movement Limit. The jump bypasses all intervening terrain, obstacles, and other Frames.
- _Landing Mechanics_:
  - *Clear & Paved Landing*: Landing in a Clear or Paved hex is an *automatic clean landing*. Set Leg Facing for free.
  - *Hazardous & Feature Landing*: Landing in *Rough, Deep Water, Building Roofs, Light Woods, or Heavy Woods* requires a *Pilot Check (TN 6+)* upon touchdown:
    *Landing Check = 2d6 vs TN 6+*
    - _Success (6+)_: Clean landing! Set Leg Facing for free.
    - _Failure (\< 6)_: The Frame stumbles and falls Prone in the landing hex. (If landing in Heavy Woods, the canopy impact also inflicts *1 point of Armor DR degradation* to the Torso).
  - *Kinetic Drop Strike*: Alternatively, a pilot may target an occupied hex to perform a Kinetic Drop Strike.
  - *Drop Strike Damage*: Both Frames suffer a flat amount of damage:
    *Drop Strike Damage = Jumping Frame's Mass Value x Hexes Jumped*
    - The target Frame suffers the full flat damage.
    - The jumping Frame suffers half the flat damage (rounded up).
    - Roll *2d6 on the Hit Location Table* separately for the target and for the jumper, using the *Front / Rear* column in both cases — a falling impact has no meaningful facing.
    - Both damage hits test against the respective location's Armor DR normally. Flank Speed does not apply to Drop Strike damage.
  - *Displacement*: After damage is resolved, the target's player (the defender) slides the jumping Frame into any unoccupied adjacent hex of their choice. If no adjacent hex is unoccupied, the jumping Frame is dumped into the nearest unoccupied hex, falls Prone, and takes an additional *2d6* tested against one Leg's Armor DR — the defender chooses which leg (see #sec("6.3")).
- _Flank Speed_: A jump of *2 or more hexes* grants Flank Speed upon landing, regardless of the Frame's usual threshold — the ballistic trajectory of a full thruster burn is genuinely hard to track. A single-hex hop does not; it is a repositioning step, not a flight, and a Frame that hops one hex must still meet its normal Flank Speed by movement to gain the state. _(At 2 EP per hex, a 2-hex jump costs the same 4 EP that walking to the threshold does — Jump Jets buy terrain and elevation, not a cheaper defence.)_
=== Collisions & Ramming

- *One Frame to a hex*: no two Frames may occupy the same hex, and that includes wrecks (#sec("6.5")). A *friendly* Frame blocks movement but is never rammed — a Frame may not enter its hex at all, and simply stops. Only an *enemy* Frame can be collided with.
- *Collisions & Blocking*: If a Frame's movement path would enter a hex occupied by an enemy Frame, a collision occurs. The moving Frame immediately stops in the last unoccupied hex, its activation ends, and both frames suffer damage.
  - *Collision Damage*: Both the moving Frame and the stationary target Frame suffer damage to a random location determined by rolling on the Hit Location Table individually. Flank Speed does *not* allow rerolls against collision damage, as the impact is physical and unavoidable. *Armor DR is tested normally* against each hit, and a penetrating collision degrades that location's Armor DR by 1 and triggers a Critical Hit roll, exactly as a weapon hit would.
  - *Deliberate Ramming*: A pilot may intentionally drive into an occupied hex. Note that the flat damage is derived from the _moving_ Frame's Mass Value, and *both Frames suffer that exact same flat damage* — a light Frame that rams a heavy one will almost always come off worse.
  - *Damage Calculation*: The collision inflicts a flat amount of damage based on the moving Frame's *Mass Value* (Light = 1, Medium = 2, Heavy = 3, Assault = 4) multiplied by its speed (the number of hexes moved in the current activation before impact):
    *Collision Damage = Mass Value x Speed*
  - *Pilot Check*: After resolving collision damage, both Frames must check if they fall Prone (see #sec("6.3")).
#example[
  *Worked example — a Jackal rams a Colossus.* The Jackal has walked *4 hexes*
  this activation and drives into the Colossus's hex deliberately.

  + *Damage*: the moving Frame's Mass Value × its speed. A Jackal is Light, so
    Mass Value *1*, times 4 hexes — *4 points*. Both Frames suffer that same 4.
  + *The Colossus*: 2d6 for location comes up 7 — Torso, DR *8*. Four does not
    beat eight. *It takes nothing at all.*
  + *The Jackal*: its own location roll is a 7 as well — Torso, DR *3*. Four
    beats three, so its Torso drops to DR *2* and it takes *1 Critical*. Flank
    Speed grants no rerolls against a collision.
  + *Both* Frames then make a Pilot Check or fall Prone.

  The Jackal spent its whole activation to deal nothing and wound itself. Mass
  Value is the entire equation, and ramming up the weight classes is a way to
  lose a Frame rather than kill one.
]


=== Flank Speed & Torso Twist

- *Flank Speed*: If a Frame successfully exits *4 or more hexes* during its activation _(changing facing/pivoting does not exit a hex)_, it gains Flank Speed. This represents the difficulty of targeting a fast-moving frame. Note that *Assault Frames cannot reach this threshold at all* — capped at 3 hexes of movement, they have no access to Flank Speed and must survive on Armor DR and terrain Cover alone. 
- *Torso Twist*: At the very end of its activation (after all movement is completed), the Frame may perform a free Torso Twist. The player can rotate the upper body of the Frame 1 hexside (60 degrees) to the left or right of its current Leg Facing, or reset it to align with the Leg Facing. This sets the Frame's Torso Facing (and Firing Arcs) for the upcoming Combat Phase. The torso remains in this position until the Frame activates in the next turn's Activation Phase.

=== 2.2.1 Movement Examples
#anchor("2.2.1")

- *Example 1 (Tactical Maneuvering)*: An IF-55M-1 "Vanguard" (Reactor 12) starts its activation on Level 0 with a full energy pool of 12 EP. 
  + It performs a *Forward Walk* (1 EP) into an adjacent Level 1 Clear hex. (Cost: 1 EP + 1 EP climbing cost = 2 EP total).
  + It performs a *Pivot/Turn* (1 EP) to rotate its Leg Facing 60 degrees left.
  + It performs a *Forward Walk* (1 EP) into a Light Woods hex on Level 1. (Cost: 1 EP + 1 EP woods entry cost = 2 EP total).
  + It performs a second *Forward Walk* (1 EP) through the woods on Level 1. (Cost: 1 EP + 1 EP woods entry cost = 2 EP total).
  + It performs a third *Forward Walk* (1 EP) out of the woods into a Level 1 Clear hex. (Cost: 1 EP).
  - _EP Expenditure_: 2 + 1 + 2 + 2 + 1 = 8 EP. The Vanguard has 4 EP remaining in its pool to spend on active systems or firing weapons during the Combat Phase.
  - _Flank Speed_: It exited 4 hexes during its movement. Since it met the 4-hex threshold, it successfully gained Flank Speed.
  - _Final Step_: The pilot performs a free *Torso Twist* 60 degrees right, swinging the Right Arm's Laser onto the target's expected position without having to spend another EP pivoting the legs.

- *Example 2 (Jump Jet Cliff-Jumping)*: An IF-25L-1 "Jackal" (Reactor 8, plus 3 EP banked in its Capacitor last turn, for 11 EP available) starts its activation at the base of a steep Level 2 cliff (a Level 0 hex adjacent to a Level 2 hex). It is one of the few Frames that can make this move at all — Jump Jets are Light and Medium only.
  + It declares a *Jump Jet* maneuver targeting an unoccupied Level 2 hex 3 spaces away, directly on top of the cliff, bypassing the steep height difference that blocks walking entirely.
  - _EP Expenditure_: 3 hexes jumped × 2 EP = *6 EP*. A jump pays no terrain or climbing surcharge — the 2 EP per hex is the whole cost.
  - _Propellant_: After landing, the pilot rolls the *Ammo Die*. A 3 comes up, so the tanks still hold; on a 1 or 2 the Jackal would never have jumped again this battle.
  - _Flank Speed_: The jump covered 3 hexes. Because that is *2 or more*, the Jackal gains Flank Speed on landing — a full thruster burn is hard to track.
  - _Landing_: The cliff top is Clear terrain, so this is an automatic clean landing with no Pilot Check. The pilot sets Leg Facing toward the enemy's rear quadrant for free.
  - _Final Step_: The Jackal has *5 EP* remaining — enough for its Laser (2 EP) and three Autocannon bursts (3 EP) in the Combat Phase.


== 2.3 Combat Phase (Initiative Order)
#anchor("2.3")

Frames attack in order of *highest Initiative* to *lowest Initiative*.
- *Initiative Tie-Breakers (Combat)*: If opposing Frames share the same Initiative value, the *Advantage Player* decides which of the tied Frames declares and resolves its attack first (choosing to fire with their own unit first or allowing the opponent's tied unit to declare its attack first). Frames on the *same* side that share an Initiative value fire in whatever order their own player chooses.
- *Instant Resolution*: Unlike some tabletop games, damage is resolved _instantly_. If a high-initiative Frame destroys or disables a weapon on a lower-initiative Frame, that lower-initiative Frame cannot use that weapon when its turn to fire comes.
- *One Attack Per Weapon*: Each mounted weapon may be fired *once per Combat Phase*, regardless of how much EP remains. A Frame with several weapons may fire each of them once, in any order it chooses. _(This is what gives Full Auto its purpose: a pilot who wants to put more rounds downrange must concentrate them into a single attack against a single hit location, rather than spreading them across several.)_
- *Attack Sequence*:
  + *Select Weapon & Pay EP Cost*: Deduct the weapon's EP cost from the Frame's current pool. _(Note: If a Frame's EP pool was drained by an earlier attack and it can no longer afford a weapon's EP cost, it cannot fire that weapon this turn)._
  + *Verify Line of Sight (LOS) and Arc*: The target must be within the weapon's firing arc (determined by the Torso Facing set at the end of the Activation Phase) and have clear LOS (unless using a weapon that permits indirect fire).
  + *Verify Sensor Detection & Lock*: The target must be detected on a spectrum compatible with the weapon (Visual [VIS], Infrared [IR], or Microwave [Radar]). If the target is undetected on that spectrum, the attack cannot be declared.
  + *Defender's Countermeasures*: Before any location is rolled, the defender resolves any countermeasure it wishes to use.
    - *Countermeasure Check*: if the defender activates its IRCM suite against IR, or releases Chaff against Radar, or the attack is traced through *Smoke* on Visual, or the target is covered by an active *ECM* suite or an Adaptive Skin tuned to this band, the defender rolls *1d6*. On a *4, 5 or 6* the lock fails and the attack is negated entirely; on a *1, 2 or 3* the attacker burns through and the attack continues (see #sec("4.2")).
    - A launched cartridge is spent either way — roll its Ammo Die afterwards. A sustained suite is never expended.
  + *Determine Hit Location*: Roll 2d6 on the *Hit Location Table*.
  + *Roll Damage*: Roll the weapon's damage dice.
  + *Apply Flank Speed & Cover (Rerolls)*: If the target has Flank Speed, the defender *may* force a reroll of one of the attacker's damage dice. If the target is in *Cover*, the defender may force additional rerolls (1 for Light Cover, 2 for Heavy Cover). The defender chooses which dice are rerolled and *may decline any or all of them* — there is no obligation to reroll a die that is already low. The attacker must accept the final results.
  + *Apply Armor DR*: Compare the final damage total to the target location's current Armor DR.
  + *Resolve Damage & Armor Degradation*: 
    - If the total damage is *strictly greater* than the Armor DR, the armor is penetrated. The Armor DR of that location is permanently *reduced by 1* (to a minimum of 0).
    - If the total damage is *equal to or less than* the Armor DR, the armor successfully blocks the hit. The location suffers no damage, and its Armor DR does not degrade.
  + *Cascading Criticals*: If the armor is penetrated, roll 1d6 on the *Critical Hit Table* for that location and mark the slot. If the slot is already marked, cascade upward to the next unmarked slot.
    - *Overkill Margin*: For every *5 points* of damage that exceeds the Armor DR, the attacker rolls an additional 1d6 on the Critical Hit Table (e.g., if total damage is 16 and Armor DR is 5, the excess damage is 11. The attacker rolls the base 1d6, plus 2 extra d6s, applying 3 Critical Hits total).

=== 2.3.1 Combat Examples
#anchor("2.3.1")

- *Example 1 (Direct Laser Fire & Critical Hit)*: During the Combat Phase, the IF-90A-1 "Colossus" (Initiative 3) resolves its attack against the IF-55M-1 "Vanguard" (Initiative 6).
  + *Weapon Selection*: The Colossus pilot spends 4 EP to fire the *Thermal Lance* mounted on its Left Arm.
  + *Verify Arc and LOS*: The Vanguard is located within the Colossus's Left Side Arc (Left Arm mount). Line of Sight is clear of blocking terrain.
  + *Verify Lock*: The Thermal Lance requires an *Infrared (IR)* lock. The Vanguard spent 7 EP this turn — well past the 4 EP threshold — so its heat bloom is plainly visible and the lock holds. _(Had the Vanguard run cold, the Lance could not have been declared at all, however much energy the Colossus had. Its IRCM suite is a different kind of answer — it contests a lock rather than denying one, as step 4 shows.)_
  + *Defender's Countermeasures*: The Vanguard declines to fire its IRCM suite. It is only a 4+ chance of stopping the shot, its Torso armor is still fresh, and the 2 EP is charge it would rather keep — spent here, it is not available to Overcharge with next turn. _(Its Chaff answers a different band entirely and is being saved for the Rail Gun.)_ It is not running its ECM this turn either, so no Countermeasure Check is rolled and the attack proceeds.
  + *Hit Location*: The Colossus rolls 2d6 on the Hit Location Table. The attack came from the Front Hit Zone, so the Front/Rear column is used. The roll is a 7, indicating a Torso hit.
  + *Roll Damage*: The Colossus rolls 3d6 for the Thermal Lance: rolls a 5, 4, 3 (Total 12).
  + *Apply Flank Speed & Cover*: The Vanguard has Flank Speed (having met the 4-hex threshold), granting it one reroll. Seeing a 5 in the attacker's pool, the Vanguard's pilot elects to use it and forces that die to be rerolled. The new roll is a 2. The new damage total is 2, 4, 3 (Total 9). _(Had the Colossus rolled nothing above a 3, the Vanguard would simply have declined the reroll.)_
  + *Apply Armor DR*: The Vanguard's Torso currently has an Armor DR of 6. The total damage (9) is strictly greater than 6, so the armor is penetrated.
  + *Resolve Degradation*: The Vanguard's Torso Armor DR is permanently *reduced by 1* (from 6 to 5).
  + *Check Overkill*: The damage exceeded the Armor DR by 3 (9 − 6). That is less than 5, so no additional Critical dice are earned — this attack rolls one Critical.
  + *Roll Cascading Critical*: The Colossus rolls 1d6 on the Torso Critical Hit Table. It rolls a *3: Capacitor Leak* — the Vanguard's Capacitor Max drops permanently by 2 and it loses 2 stored EP immediately, which may cost it an Overcharge next turn. The Vanguard marks the '3' slot on its Torso table. _(Had the '3' slot already been marked, the damage would have cascaded upward to the next unmarked slot.)_

== 2.4 End Phase
#anchor("2.4")

- *Energy Storage*: Unused EP is *added to whatever the Capacitor already holds*, up to the Capacitor Max. Only the overflow past the Max is vented and lost. A Capacitor that is already full vents the entire unused pool.
- *Clean Up*: Remove Flank Speed status from all Frames, and decrement cooldown tokens on weapons.
- *Smoke Dissipation*: For each active Smoke token on the board, roll 1d6. On a roll of 1 or 2, the smoke dissipates; remove the token.

== 2.5 Ending the Battle
#anchor("2.5")

A scenario may set its own victory conditions, and where it does, they replace
what follows. Absent that:

- *A Frame is out of the battle* when it is destroyed — Head or Torso destroyed,
  or both Legs gone (#sec("6.5")) — or when its pilot surrenders.
- *A force is defeated* when it has no Frames left in the battle.
- *Surrender* is declared by the owning player, for one Frame, at any point they
  hold priority. That Frame is out of the battle immediately and leaves a wreck
  in its hex exactly as a destroyed one does. A surrendered Frame counts as
  destroyed for every purpose, including a Named Pilot's Vow. Surrender is
  irrevocable.
- *The round limit is 15.* If both forces still have Frames in the battle at the
  end of round 15, the side that has destroyed the greater value in Deployment
  Points wins. If that is also equal, the battle is a draw.

#design-note[
  The limit exists so a game always ends, not because games run long: across the
  twelve playtest scenarios the longest averages a little over twelve rounds, so
  fifteen sits clear of every measured length and will almost never be reached.
  When it is, counting destroyed points rather than surviving ones is what stops
  a player winning by hiding a cheap Frame in a corner for the last five rounds.
]

= 3. Terrain & Elevation
#anchor("3")

#epigraph["The terrain is the foundation of victory. Know the ground, know the weather; your victory will then be total."][Sun Tzu]

Combat under the Iron Protocol occurs across diverse Earth battlefields and containment sectors. The map's hexes are classified by terrain type, which alters movement costs, provides cover, or impacts pilot checks.

== 3.1 Summary of Terrain Types
#anchor("3.1")

#table(
  columns: 4,
  align: (left, center, left, left,),
  [Terrain Type], [Extra EP Cost], [Defensive Cover], [Special Rules],
  [*Clear*], [+0 EP], [None], [Standard terrain.],
  [*Paved*], [+0 EP], [None], [High traction surface. *+1 bonus* to all Pilot Checks.],
  [*Rough*], [+1 EP], [None], [Uneven footing. *−1 penalty* to all Pilot Checks.],
  [*Water (Shallow)*], [+1 EP], [None], [Knee-deep liquid. Cannot gain *Flank Speed*. Generates *+1 EP* in Energy Phase.],
  [*Water (Deep)*], [+2 EP], [None], [Waist-deep liquid. Cannot gain *Flank Speed*. *−1 penalty* to Pilot Checks. Generates *+2 EP* in Energy Phase.],
  [*Woods (Light)*], [+1 EP], [Light Cover (1 Reroll)], [Sparse trees. Blocks VIS locks if 2+ hexes intervene.],
  [*Woods (Heavy)*], [+2 EP], [Heavy Cover (2 Rerolls)], [Dense forest. Blocks VIS and IR locks if 2+ hexes. *Impassable to Heavy/Assault Frames on foot.*],
  [*Urban (Building)*], [Impassable (Ground)], [Solid Barrier], [Structures block all locks (VIS/IR/Radar) up to height. Heavy Cover (2 Rerolls) if adjacent. Roofs (Level 2) can only be reached by *Jump Jets*, and count as their own hex at that elevation.],
)

== 3.2 Movement & Elevation Rules
#anchor("3.2")

The battlefield is three-dimensional, divided into vertical *Levels* (Level 0 is default ground level; each level = *6 meters*). All Iron Frames are *2 levels tall* (12 meters), occupying vertical space from Level X to Level X + 2.

=== Chassis Bulk & Forest Restrictions

Due to their immense physical scale and bulk:
- *Light (20–35T)* and *Medium (40–55T)* Frames may maneuver through Heavy Woods normally (+2 EP entry cost).
- *Heavy (60–75T)* and *Assault (80–100T)* Frames *cannot walk or reverse into Heavy Woods hexes* on foot. _(Exception: Heavy and Assault Frames equipped with Jump Jets may jump over or overtop Heavy Woods hexes)._

=== Elevation Movement Table

#table(
  columns: 3,
  align: (left, center, left,),
  [Elevation Change], [EP Cost], [Movement & Fall Rules],
  [*Same Level (0)*], [Base Terrain Cost], [Standard movement.],
  [*Climbing Up (+1 Level)*], [Terrain Cost + *1 EP*], [Step up onto 1 level higher terrain.],
  [*Climbing Down (-1 Level)*], [Base Terrain Cost], [Step down onto 1 level lower terrain (+0 extra EP).],
  [*Steep Cliff (≥ 2 Levels)*], [Impassable on foot], [Cannot walk or reverse. Must use *Jump Jets* to traverse.],
  [*Forced Fall (≥ 2 Levels)*], [—], [Frame falls *Prone* on landing and takes falling damage (see below).],
)

=== Falling Damage

Whenever a Frame is forced off a drop of 2 or more Levels, it lands hard:
- *Damage*: Roll *1d6 per Level fallen as a single pooled roll* — a three-level drop is one roll of 3d6, not three separate rolls of 1d6. _(This matters: a lone 1d6 needs a natural 6 to beat even a base Medium Torso, and cannot touch a Heavy or Assault one at all, so resolving each Level separately would make even a catastrophic fall very nearly harmless.)_
- *Location*: Roll *2d6 on the Hit Location Table*, using the *Front / Rear* column — a fall has no facing.
- *Resolution*: The total is tested against that location's *Armor DR normally*, exactly as a weapon hit would be. Flank Speed grants no rerolls against the ground.
- *The Frame lands Prone.*

=== Jump Jet Terrain Landing Table

#table(
  columns: 3,
  align: (left, center, left,),
  [Landing Location], [Pilot Check (TN 6+)?], [Failure Effect (\< 6)],
  [*Clear / Paved*], [*No* (Automatic)], [Clean landing.],
  [*Rough Terrain*], [*Yes*], [Falls *Prone* in landing hex.],
  [*Water (Deep)*], [*Yes*], [Falls *Prone* in water.],
  [*Building Roof*], [*Yes*], [Falls *Prone* on roof.],
  [*Light Woods*], [*Yes*], [Falls *Prone* in canopy.],
  [*Heavy Woods* _(Light/Med only)_], [*Yes*], [Falls *Prone* + 1 Torso Armor DR loss.],
)

== 3.3 Hard Cover vs. Concealment (Sensors & Locks)
#anchor("3.3")

Understanding the distinction between *Hard Cover* (which reduces damage when targeted) and *Concealment* (which prevents sensor locks entirely) is vital to tactical survival.

=== 1. Hard Cover (Defensive Damage Reduction)

Hard cover represents physical obstacles that absorb kinetic energy or diffuse beam weapons when a Frame is targeted:
- *Light Cover (1 Reroll)*: Standing in *Light Woods* allows the defending player to choose one of the attacker's damage dice and force a reroll. Rerolls are always optional.
- *Heavy Cover (2 Rerolls)*: Standing in *Heavy Woods* or standing *adjacent to an Urban Building* (when Line of Sight crosses the building's hexside) allows the defending player to choose up to two of the attacker's damage dice and force them to reroll. _(Note: Cover rerolls and Flank Speed rerolls stack — a Frame at Flank Speed in Heavy Cover may force up to 3 rerolls. Rerolls are an allowance, not an obligation: spend as few as you like, and expect diminishing returns once every high die has already been rerolled.)_

=== 2. Concealment & Sensor Lock Blockage (Spectrum Matrix)

If an intervening terrain feature blocks Line of Sight on a specific sensor spectrum, a Frame *cannot declare an attack* using a weapon that requires that spectrum.

#table(
  columns: 4,
  align: (left, center, center, center,),
  [Intervening Terrain Feature], [Visual (VIS) Lock], [Infrared (IR) Lock], [Microwave (Radar) Lock],
  [*Light Woods (1 hex)*], [Clear], [Clear], [Clear],
  [*Light Woods (2+ hexes)*], [*BLOCKED*], [Clear], [Clear],
  [*Heavy Woods (1 hex)*], [Clear], [Clear], [Clear],
  [*Heavy Woods (2+ hexes)*], [*BLOCKED*], [*BLOCKED*], [Clear],
  [*Urban Building (Any)*], [*BLOCKED*], [*BLOCKED*], [*BLOCKED*],
  [*Smoke Template*], [*Check 4+*], [Clear], [Clear],
  [*Elevation / Hill (≥ Top Height)*], [*BLOCKED*], [*BLOCKED*], [*BLOCKED*],
)

_\*Smoke is the one entry here that is not terrain: a Visual lock traced through a Smoke template is contested on a *Countermeasure Check (4+)*, not blocked outright. Woods, buildings and elevation block absolutely._

=== Summary of Foliage & Vegetation Blockage:

- *Light Woods*: Requires *2 or more intervening hexes* to block Visual (VIS) locks. Does not block IR or Radar.
- *Heavy Woods*: Requires *2 or more intervening hexes* to block both Visual (VIS) and Infrared (IR) locks. Does not block Radar.

== 3.4 Line of Sight (LOS) & Elevation Height Math
#anchor("3.4")

Line of Sight (LOS) between an Attacker (standing on Level A, top height A+2) and a Target (standing on Level B, top height B+2) is checked against all intervening hexes.

=== 1. Terrain & Elevation LOS Formula

An intervening hex of elevation level Y or building height Y blocks *all* sensor locks (VIS, IR, Radar) if:
#rule-box[
*LOS Blocked if Y ≥ min(A + 2, B + 2)*
]

_(Example: Two Frames on Level 0 [top height 2] can see over a Level 1 hill [height 1]. A Level 2 hill [height 2] blocks Line of Sight completely)._

#example[
  *Worked example — the same shot on two bands.* A Paladin on *Level 0* wants to
  fire at a Specter standing on a *Level 1* hill. Between them is one hex of
  *Light Woods*, also on Level 1.

  + *The ceiling*: the Paladin's top height is 0 + 2 = 2, the Specter's is
    1 + 2 = 3. LOS is blocked by anything reaching min(2, 3) = *2*.
  + *On Visual*: the intervening hex is ground Level 1, and Light Woods adds *+1
    Level* of canopy — an obstruction height of *2*. Two is not below two, so
    *Visual is blocked*. The Paladin's Autocannon is slaved to the optical set
    and cannot be fired at all.
  + *On Radar*: canopy height is ignored entirely, so the hex is simply Level
    *1*. One is below the ceiling of two, the lock holds, and the *Rail Gun fires
    normally*.

  The same trees, the same hex, and one of the Paladin's two guns is useless. A
  Frame carrying weapons on two bands is far harder to disarm than one relying on
  a single spectrum.
]

=== 2. Vegetation Canopy Height (Visual LOS Only)

Trees have vertical foliage that adds to ground level for *Visual (VIS)* LOS only. IR and Radar sensors ignore canopy height:
- *Light Woods Canopy*: Adds *+1 Level* of Visual obstruction height (e.g., Level 0 Light Woods = VIS height 1).
- *Heavy Woods Canopy*: Adds *+2 Levels* of Visual obstruction height (e.g., Level 0 Heavy Woods = VIS height 2).

== 3.5 Pilot Checks & Water Cooling
#anchor("3.5")

=== 1. Terrain Pilot Check Adjustments

Apply the standing hex's terrain modifier to all Pilot Check rolls (collision recovery, Drop Strike landing):
- *Paved*: *+1 bonus* to Pilot Checks (high traction).
- *Rough*: *−1 penalty* to Pilot Checks (uneven footing).
- *Water (Deep)*: *−1 penalty* to Pilot Checks (water drag).

=== 2. Environmental Cooling (Water)

Standing in liquid provides passive cooling to an Iron Frame's reactor during the Energy Phase:
- *Water (Shallow)*: Generates *+1 extra EP* during the Energy Phase. The Frame cannot gain Flank Speed while in shallow water.
- *Water (Deep)*: Generates *+2 extra EP* during the Energy Phase (extreme submerged cooling). Entry costs *+2 EP*, the Frame cannot gain Flank Speed, and Pilot Checks take a *−1 penalty*.

= 4. Sensors, Stealth, and Detection
#anchor("4")

#epigraph["All warfare is based on deception."][Sun Tzu]

Because attacks hit automatically if targeted, the tactical battle is won or lost in the *Sensor & Detection* game. A Frame cannot be attacked unless it is detected on at least one sensor spectrum required by the weapon.

== 4.1 The Sensor Suite (Head Location)
#anchor("4.1")

Every Frame has a sensor suite consisting of three bands, housed in the Head location, arranged here in order of increasing electromagnetic wavelength:
+ *Visual (VIS)*: Shortest wavelength (approx. 380–700 nm). Housed in high-resolution optical cameras.
  - _Requires_: Direct Line of Sight (blocked by Elevation normally). To lock a target hidden behind solid Elevation, a Frame must receive telemetry via a *Tactical Datalink* from a friendly spotter with clear VIS LOS.
  - _Blocked by_: woods at *2 or more intervening hexes*, and buildings and elevation, outright; a Smoke template or an Adaptive Skin in Visual mode contests it on a Countermeasure Check.
+ *Infrared (IR)*: Medium wavelength (approx. 700 nm–1 mm). Thermal sensors detecting heat signatures.
  - _Requires_: Direct Line of Sight (blocked by Elevation normally), but entirely ignores Woods and Smoke penalties. To lock a target hidden behind solid Elevation, a Frame must receive telemetry via a Tactical Datalink from a friendly spotter with clear IR LOS.
  - _Sensitivity_: Targets become visible and targetable on IR for the remainder of the *round* the moment they spend their *4th EP* of that round — counted cumulatively across the Energy, Activation and Combat phases, not per activation. _Skin upkeep paid during the Energy Phase does *not* count toward this total — an Adaptive Skin runs cold by design, and a Frame should never be punished on infrared for buying stealth. Every other expenditure counts: movement, weapons fire, standing up. Running cold means genuinely doing very little, and it is the only way to be invisible to infrared without spending a hardpoint on it._
  - _The exception is an *Assault Frame*, whose reactor never runs cold: it is *always* IR-lockable, whatever it has spent. This is the same fact as its Movement Limit rather than a separate rule — an Assault chassis tops out at 3 hexes and so can never spend the 4 EP that lights anything else up, which would otherwise leave the largest reactor on the board permanently invisible on infrared. The mass that stops it dodging stops it hiding. The Assault chassis is priced for this — see the design note under the Chassis Limits Table in Section 7.2._
  - _Blocked by_: an IRCM suite or an Adaptive Skin in Infrared mode, each on a Countermeasure Check.
+ *Microwave (Radar)*: Longest wavelength (approx. 1 mm–1 m). Active microwave radio detection.
  - _Requires_: Direct Line of Sight (blocked by Elevation normally), but entirely ignores Woods and Smoke penalties. To lock a target hidden behind solid Elevation, a Frame must receive telemetry via a Tactical Datalink from a friendly spotter with clear Radar LOS.
  - _Blocked by_: solid Elevation (Hills/Mountains) outright; Chaff, an active ECM suite or an Adaptive Skin in Microwave mode each contest it on a Countermeasure Check.

== 4.2 Stealth & Defensive Countermeasures
#anchor("4.2")

Frames can run active systems to deny locks and hide from sensors:

- *The Countermeasure Check*: No countermeasure is a guaranteed save. Whenever a defensive system would deny an attacker's lock, the defender rolls *1d6 before the Hit Location roll*. On a *4, 5 or 6* the lock fails and the attack is negated entirely; on a *1, 2 or 3* the attacker burns through and the attack proceeds as normal. *One number covers every defensive system in the game.* A check is made when:
  - the target activates its *IRCM suite* against an Infrared lock, or releases *Chaff* against a Microwave lock;
  - the attacker's *Visual* line of sight crosses a *Smoke* template;
  - the target is covered by an active *ECM* suite (Microwave) or an *Adaptive Skin* tuned to the attack's band.

  _A failed check does not disable the system._ A sustained suite remains active and is rolled again against the next attack; a launched cartridge is spent whether it worked or not, and its Ammo Die is rolled as normal. Terrain is the exception — woods, buildings and elevation block a spectrum *outright*, with no roll. Only the ground is reliable.

  _What separates the two kinds of system is no longer certainty but cost. Cartridges are free to fire and run dry after roughly six launches; a sustained suite never runs out but bills 2 EP every Energy Phase, turn after turn, whether it is tested or not._

#example[
  *Worked example — Chaff against a Rail Gun.* A Paladin declares its Rail Gun at
  a Vanguard. The gun costs 0 EP at base but *must* Overcharge +6 EP from the
  Capacitor to fire at all, so the Paladin pays six banked EP on declaration.

  + The Rail Gun needs a *Microwave (Radar)* lock, and the Paladin has one.
  + *Before any location is rolled*, the Vanguard releases *Chaff* — the
    countermeasure that answers Radar.
  + *Countermeasure Check*: 1d6 comes up *5*. On a 4+ the lock fails and *the
    attack is negated entirely* — no Hit Location, no damage roll, nothing.
  + *The 6 EP is gone anyway.* It was spent on declaration, and the Rail Gun
    still enters its 1-Turn Cooldown, because firing it always Overcharges.
  + *The cartridge is gone anyway too.* Roll the Chaff Ammo Die: a 4, so the
    dispenser still holds. A 1 would have emptied it for the battle.

  Six of the Paladin's eight banked EP and one cartridge, for nothing on either
  side. That is what a 4+ costs both players.
]

- *Electronic Countermeasures (ECM)*: Costs *2 EP* to activate in the Energy Phase. Contests Microwave (Radar) detection and locks on the host Frame (0-hex radius) — each attack tested against it requires a Countermeasure Check. Overcharge [+1 EP per +1 hex radius]. All friendly Frames within the active radius are protected. _(Note: Overcharging triggers the mandatory 1-Turn Cooldown on the ECM suite)._
- *Infrared Countermeasure Suite (IRCM)*: (*2 EP per activation*, no Ammo Die). A directed jammer — it floods the attacker's infrared channel with a modulated source keyed to defeat a seeker's tracking logic, and dazzles an imaging thermal sight in the process. Activating it forces a Countermeasure Check; on a *4+* the incoming attack is negated entirely, and on a 1–3 the attacker burns through. The suite may only be used when *all* of the following are true:
  - The attacker resolved the attack using an *Infrared (IR) lock*. (A defender may run the IRCM suite and release Chaff simultaneously against the same attack, to cover two different weapons in the same Combat Phase.)
  - The suite is activated *before* the Hit Location roll.
  - The Frame can pay the *2 EP*, from its energy pool or its Capacitor reserve.
  The energy is spent whether the check succeeded or not. The suite never runs out — it is powered, not expendable — but a Frame that has emptied both pool and reserve cannot defend itself on infrared at all.

#design-note[
_A pyrotechnic flare defeats a *seeker* — a guidance head that steers toward the brightest source in its field of view and can be pulled off it. Against an imaging thermal sight, an operator simply sees a bright flare *and* the target, and nothing is decoyed. Since Iron Frames aim directly rather than launching seekers on every trigger pull, a decoy would be worthless against most of what shoots at them. A directed jammer is the system that actually does this job, and it is powered rather than expendable — which is why this is the one countermeasure that bills energy at the moment it fires._
]

- *Chaff Dispensers*: (Ammo Die: 1d6, *no EP cost*). Releasing chaff forces a Countermeasure Check; on a *4+* the incoming attack is negated entirely, and on a 1–3 the attacker burns through. The dispenser may only be used when *all* of the following are true:
  - The attacker resolved the attack using a *Microwave (Radar) lock*. (A defender may run the IRCM suite and release Chaff simultaneously against the same attack, to cover two different weapons in the same Combat Phase.)
  - Chaff is launched *before* the Hit Location roll.
  The cartridge is spent whether the check succeeded or not. After launching Chaff, roll the Ammo Die (1d6). On a *1*, the dispenser is empty for the rest of the battle.
- *Smoke Launchers*: (Ammo Die: 1d6, *1 EP*). During the Activation Phase, a Frame may spend 1 EP to deploy a Smoke cloud in its current hex, or any of the 6 surrounding adjacent hexes (place a Smoke token). For as long as it remains on the board, any Visual (VIS) lock traced through that hex must survive a Countermeasure Check — on a *4+* the lock fails and the attack is negated; on a 1–3 the attacker picks the target out of the murk anyway. Infrared (IR) and Microwave (Radar) sensors are unaffected and scan through smoke unimpeded. *A Frame ignores a Smoke template in its own hex when tracing its own locks outward* — the cloud is around it, not between it and the target — but that same template still contests every Visual lock traced _into_ the hex. After launching Smoke, roll the Ammo Die (1d6). On a *1*, the launcher is empty for the rest of the battle.

#design-note[
_Chaff is a cloud of cut filament: a magazine, and once it is gone it is gone. The Ammo Die is its whole cost — roughly six releases — and since it is only a *4+* to work and is spent either way, the question is not merely whether *this* attack is worth a cartridge but whether it is worth one you may well waste. Smoke is likewise expendable, and costs 1 EP on top because it is *proactive*: deployed on your own activation, in a hex of your choosing, at a moment you can budget for._

_The IRCM suite has no magazine to spend, so its cost has to be energy. An earlier draft of these rules argued that a reactive system must never charge EP — that "can I defend myself?" would be settled before you knew who was shooting or with what. That was true when unused energy was vented at the end of every turn and holding some back was simply waste. It is no longer true: the Capacitor is a standing reserve that persists until spent (#sec("2.1")), so keeping 2 EP against an infrared attack is a real and durable choice. It is also a *costly* one, because that same banked charge is what an Overcharge is paid from. A pilot who jams every shot fires nothing heavy; a pilot who saves it all for the Rail Gun takes the hits._
]

- *Adaptive Skin*: Costs *2 EP* to activate in the Energy Phase. The Frame tunes its coating to absorb *one* sensor spectrum (Microwave, IR, or VIS), contesting detection and locks on that spectrum — each attack made on the cloaked band requires a Countermeasure Check. Overcharge: [+2 EP to cloak a 2nd spectrum simultaneously].
  - *Re-tuning*: the spectrum is chosen in the Energy Phase when the suite is paid for, and may be *changed once more during the Frame's own Activation* — the coating is re-laid as the Frame repositions, on whatever the board now shows. It *locks when the Combat Phase begins* and cannot be changed again that turn.

#design-note[
_A Skin that could be re-tuned after an attack was declared would not be a stealth system at all; it would be a guaranteed Countermeasure Check against one attack a turn, on whichever band happened to arrive. Fixing it at the start of Combat keeps it a *prediction*. Activation is the right moment to commit because it runs in reverse Initiative order: a slow Frame must choose early and blind, while a fast one tunes last, having watched almost the whole board move. That the Specter — the only Frame carrying a Skin — sits at Initiative 10 rather than the top is deliberate; it reads the field before committing, but the Jackal still moves after it._ _(Note: Overcharging triggers the mandatory 1-Turn Cooldown, meaning the Adaptive Skin will be completely offline during the following round, leaving the Frame fully exposed on all spectrums)._
]

- *Pre-Combat System Deployment*: An Adaptive Skin or ECM suite may be switched on at deployment rather than waiting for Round 1 — see #sec("1.4"), step 5.

== 4.3 Tactical Datalink (Head Location)
#anchor("4.3")

A Frame may be equipped with a Tactical Datalink housed in its Head location.
- *Shared Targeting Data*: If two or more friendly Frames on a team are equipped with active Tactical Datalinks, they share sensor data in real time. If a target is detected or locked on any sensor spectrum (Visual, Infrared, or Microwave) by _one_ of the datalinked Frames, it is instantly considered detected/locked on that spectrum for _all_ other active datalinked Frames on the team.
- *A shared lock dies with the Frame that holds it.* Damage resolves instantly (#sec("2.3")), so a spotter can be destroyed earlier in the Combat Phase than the Frame relying on its telemetry. If it is, the lock it was feeding the net is gone at once, and a Frame that cannot see the target on its own may not fire. Killing the eyes is a way to disarm the guns.
- *Critical Failure*: A *Structural Fracture* critical to the Head (Head Critical Table, slot 4) severs the Tactical Datalink for *the rest of the battle*, cutting that Frame from the shared sensor network permanently. An *EMP warhead* jams it instead — the link is down for the turn and restored at the End Phase.

= 5. Weapons & Munitions
#anchor("5")

#epigraph["God is on the side with the best artillery."][Napoleon Bonaparte]

Weapons can only be mounted in the Left Arm, Right Arm, or Torso, which dictates their firing arcs (see #sec("1.3")). A hardpoint may mount a weapon or system of its size class or any smaller size class (e.g., a Heavy Hardpoint may mount a Heavy, Medium, or Light weapon). Each location has its own fixed hardpoints — see the Hardpoint Layout Table in Section 7.2.0.

=== Detection Requirements

Every weapon lists the sensor spectrum it needs in order to fire. *A weapon cannot be used at all unless the attacker holds a lock on its required spectrum* — a Frame blinded on that band is holding a dead gun, however much energy it has left.

- *Laser [VIS]*: an optical weapon, aimed down the same cameras it burns through. *Woods blind it outright; Smoke and a Visual-mode Adaptive Skin each contest it on a Countermeasure Check.*
- *Thermal Lance [IR]*: a thermal weapon that tracks its target's own heat bloom. *A target running cold cannot be locked at all; an IRCM suite and an Infrared-mode Adaptive Skin each contest it on a Countermeasure Check.*
- *Rail Gun [Radar]*: a hypersonic slug needs precise ranging to lead the target. *Chaff and ECM each contest it on a Countermeasure Check.*
- *Autocannon [VIS or Radar — fixed per Frame]*: short-ranged and forgiving. Its fire control is slaved either to the optical set or to the radar set when the Frame is built, and that choice is printed on the sheet. It cannot be laid on infrared: an open-sights gun is not a thermal weapon, so no IRCM suite will ever spoil one. _Give a Frame a band its other weapons do not use and no single countermeasure can silence it outright — which is how the roster is built._
- *Disruptor Cannon [Radar]*: coupling a pulse into a specific run of actuator wiring takes precise ranging on the target's internal geometry. *Chaff and ECM each contest it on a Countermeasure Check.*
- *Guided Missiles [Guidance]*: whichever band the seeker head was built for (see #sec("5.2")).

_This is what gives Electronic Warfare its teeth. A countermeasure is no longer a vague inconvenience — it decides which of the enemy's guns can be brought to bear at all. Terrain denies a band *outright* — woods, buildings and elevation are the only reliable blindfolds. Everything else, cartridge or suite alike, contests the lock on a Countermeasure Check, roughly halving what that weapon achieves. Either way, choosing which spectrum to attack is a decision about which of the enemy's weapons you most want silenced, and an attacker carrying weapons on two different bands is far harder to disarm than one relying on a single spectrum._

The four traits a weapon may carry — *AP X*, *AoE*, *Rapid Fire* and Overcharge — are defined together in Section 5.3.

=== The Weapon Table

#table(
  columns: 8,
  align: (left, center, center, center, center, center, center, left,),
  [Weapon], [Mount], [EP Cost], [Ammo Die], [Damage], [Detection], [Traits], [Special Rules],
  [*Autocannon*], [Light], [1/burst], [1d6 (Explosive)], [3x 1d6 (Burst)], [VIS _or_ Radar], [Rapid Fire], [Fires 3-round bursts. Each 1d6 resolved separately. Can fire Full Auto.],
  [*Laser*], [Light], [2], [Infinite], [2d6], [*VIS*], [Overcharge], [*Overcharge*: [+2 EP per +1d6, up to +2d6].],
  [*Guided Missiles*], [Medium], [4], [1d6 (Explosive)], [Warhead Dep.], [Guidance Dep.], [AoE], [Requires Lock. Permits indirect fire (no LOS). Cannot be reloaded if Ammo Die fails.],
  [*Disruptor Cannon*], [Medium], [3], [Infinite], [None], [*Radar*], [Overcharge], [Deals no damage (ignores Armor DR and Flank Speed; still needs LOS and a lock). See hit effects. Always forces 1 Crit *and* drains 1d6 EP (from the pool first, then the Capacitor — banked charge is no shelter). *Overcharge*: [+2 EP to force a second Crit].],
  [*Thermal Lance*], [Heavy], [4], [Infinite], [3d6], [*IR*], [Overcharge], [*Overcharge*: [+2 EP per +1d6, up to +2d6].],
  [*Rail Gun*], [Heavy], [0 (+6)], [Infinite (Inert)], [5d6], [*Radar*], [AP 3, Overcharge], [Inert slugs. *Requires Overcharge to fire*: [+6 EP, which must come from the Capacitor]. Because firing always involves an Overcharge, the Rail Gun always enters a 1-Turn Cooldown.],
)

== 5.0 Weapon Resolution Notes
#anchor("5.0")

=== The Ammo Die (Depletion Roll)

Instead of tracking individual bullets or missiles, _Iron Protocol_ uses a Usage Die mechanic called the Ammo Die. 
Whenever a Frame resolves an attack using a weapon that lists an Ammo Die (such as the Autocannon or Guided Missiles), the attacker rolls the specified die (usually 1d6) immediately after the attack resolves. 
Every system that carries an Ammo Die runs out the same way — nothing is reloaded in the field. Only the depletion number differs, reflecting how much of the magazine each shot consumes:

#table(
  columns: 3,
  align: (left, center, left,),
  [System], [Runs *Empty* on], [Expect roughly],
  [*Autocannon* — Single Burst], [1], [6 attacks],
  [*Autocannon* — Full Auto (3 bursts)], [1, 2 or 3], [2 attacks],
  [*Guided Missiles*], [1 or 2], [3 salvos],
  [*Chaff / Smoke*], [1], [6 uses],
  [*Jump Jet propellant*], [1 or 2], [3 jumps],
)

- *Roll above the number*: plenty remaining; fire again next turn.
- *Roll at or below it*: the last rounds are gone. That weapon or launcher is *Empty for the rest of the battle*.

_Note that an Autocannon spends the same magazine — about six bursts — however you fire it. Full Auto simply burns it three at a time, trading the whole belt for two devastating barrages instead of six measured ones._

_Running dry is not purely a loss. The Torso *Ammo Explosion* critical only detonates if a volatile store remains aboard (see #sec("6.2")) — live shells, loaded warheads, or jump propellant still in the tanks. A Frame that has shot itself dry and burned off its thruster fuel can no longer cook off at all. Late in a battle, an empty gun is also a safer one, and a scout that has spent its jumps is harder to kill outright than one still carrying a full propellant load._

Several weapons resolve differently from the standard damage sequence. Their full behavior is given here rather than only on the frame sheets.

=== Disruptor Cannon Hit Effects

The Disruptor Cannon deals *no damage*. It fires a tightly focused electromagnetic pulse that couples directly into a Frame's actuator wiring and control runs, inducing currents in the machine rather than punching through it. *Armor DR and Flank Speed are irrelevant* — plating it does not need to breach, and a moving target is no harder to flood than a stationary one. It still requires line of sight, an arc and a *Microwave (Radar) lock* like any other weapon: a hill between you and the target stops it exactly as it stops everything else. Chaff, an active ECM suite and an Adaptive Skin in Microwave mode do not stop it outright, but each contests every shot on a Countermeasure Check. On *any* hit, resolve both of the following:
- *Actuator Burnout*: Roll *1d6 immediately on the Critical Hit Table of the location rolled* and apply the result. This critical occurs even though the armor was never penetrated.
- *Power Bus Surge*: The target immediately *loses 1d6 EP* from its current energy pool (to a minimum of 0).
- *Overcharge [+2 EP]*: The pulse is sustained. Force a *second Critical Hit* on the same location — which, under Cascading Failure, will climb to the next unmarked slot.

_The Disruptor produces fewer criticals than a comparable gun, and it can never breach a location by itself. What it offers is certainty *once it has its lock*: against a fast Frame in heavy cover behind thick plate — a target every other weapon struggles to touch — neither armor nor speed nor terrain cover reduces the effect by one point. That certainty is bought on the Microwave band, and it is the band most easily contested: Chaff and ECM each force a Countermeasure Check on every shot. It is a weapon that either works completely or not at all._

Because the Disruptor ignores Armor DR rather than defeating it, it never degrades armor — a location's DR is untouched no matter how often it is hit. It cannot, by itself, destroy a Frame except through a Critical Hit result that does so.

=== Rapid Fire and Armor Degradation

When a Rapid Fire weapon is fired:
- *Every damage die is tested against the Armor DR the location had when the attack was declared.* Do not re-apply degradation between dice of the same attack.
- *The attack degrades that location's Armor DR by 1 in total* if _any_ die penetrated, no matter how many got through. A burst is a single penetration event.
- *Each Burst that put at least one die through generates one Critical Hit* — not one per die, and not one per attack. A Single Burst yields at most 1 Critical; a three-Burst Full Auto yields up to 3.
- *Rapid Fire never uses the Overkill Margin.* Individual rounds do not carry enough energy to overpenetrate; volume of fire is represented by the number of Bursts instead.

=== Full Auto Limit

A single Full Auto attack may fire a *maximum of 3 Bursts*. Firing more than one Burst still rolls a single Hit Location for the whole barrage.

=== Prone Damage Penalty

The Prone state's *−1d6 penalty* removes one die from the weapon's damage pool, to a minimum of 1d6:
- *Dice-plus-flat weapons* lose one die but keep any flat bonus intact.
- *Rapid Fire weapons* lose one die from _each_ Burst fired (an Autocannon burst becomes 2x 1d6).
- *Weapons that roll no damage dice* (the Disruptor Cannon, EMP warheads) are unaffected.

== 5.1 Autocannon Munitions
#anchor("5.1")

When equipping an Autocannon, players must select a single ammunition type to load into its magazine at build time.
- *Armor Piercing (AP 1)*: The dense kinetic penetrator ignores up to 1 point of the target's Armor DR per hit (treat the target's DR as 1 lower than it actually is for this attack).
- *High Explosive Incendiary (HEI)*: The warhead is designed to ignite internals. Adds a flat *+1 modifier* to any Critical Hit rolls caused by this weapon. _(For example, if you penetrate armor and roll a 5 on the 1d6 Crit Table, it becomes a 6)._

== 5.2 Guided Missile Systems
#anchor("5.2")

Missiles must be configured with a guidance package and a warhead at build time:
- *Guidance Systems*:
  - _Microwave (Radar)-Guided_: Permits indirect fire (ignoring Elevation/LOS blocks). Requires a Microwave (Radar) lock (which must be provided by a Tactical Datalink spotter if the firing Frame lacks direct LOS). Chaff, an active ECM suite and a Microwave-mode Adaptive Skin each contest the lock on a Countermeasure Check.
  - _Infrared (IR)-Guided_: Permits indirect fire (ignoring Elevation/LOS blocks). Requires an Infrared (IR) lock (which must be provided by a Tactical Datalink spotter if the firing Frame lacks direct LOS). The target must have spent its *4th EP* this round to be lockable on infrared at all (see #sec("4.1")). An *IRCM suite* and an Infrared-mode Adaptive Skin each contest the lock on a Countermeasure Check.
  - _Visual (VIS)-Guided_: Permits indirect fire (ignoring Elevation/LOS blocks, utilizing onboard optical cameras during terminal descent). Requires a Visual (VIS) lock (which must be provided by a Tactical Datalink spotter if the firing Frame lacks direct LOS). Smoke and a Visual-mode Adaptive Skin each contest the lock on a Countermeasure Check.
- *Warheads*:
  - _High Explosive (HE)_: Roll 1 Hit Location. Deals 3d6 damage to the primary hit location, and *1d6 splash damage* to all adjacent locations on the target Frame (e.g., if the Torso is hit, the Head, Arms, and Legs take splash damage).
  - _Cluster_: Sandblasts the target with a wide spread. Roll three times for Hit Locations: once on the *Left Side* column, once on the *Front/Rear* column, and once on the *Right Side* column. The Cluster Missile deals *2d6 damage* to each of these three rolled locations. *Each location is resolved as a complete attack in its own right*: test the 2d6 against that location's Armor DR, and where it penetrates, degrade that DR by 1, roll its Critical, and measure its own Overkill Margin against its own armor. Three locations can therefore produce three separate cascades. Being AoE, none of the three may be rerolled for Flank Speed or Cover (#sec("5.3")).
  - #example[
    *Worked example — a Cluster salvo.* A Paladin fires its Torso launcher (4 EP,
    Infrared guidance, Cluster warheads) at a Vanguard that has already spent its
    4th EP this round, so the infrared lock holds.

    Three Hit Locations are rolled, one per column, and *each is a complete
    attack in its own right*:
    + *Left Side column, roll 4* — the Vanguard's *Left Arm*, DR 4. 2d6 comes up
      3 + 5 = *8*. Eight beats four: the arm drops to DR 3 and takes *1
      Critical*. The excess is 4, short of a full 5, so no Overkill.
    + *Front/Rear column, roll 7* — the *Torso*, DR 6. 2d6 comes up 2 + 3 = *5*.
      Five does not beat six. *Nothing happens at all.*
    + *Right Side column, roll 11* — the *Left Leg*, DR 5. 2d6 comes up 6 + 6 =
      *12*. The leg drops to DR 4, and the excess of 7 is one full step of 5, so
      the base Critical plus one more: *2 Criticals*.

    Three Criticals across two locations from one salvo, and *the Vanguard could
    not reroll a single die* — Cluster is AoE, which bypasses Flank Speed and
    Cover alike. Then roll the Ammo Die: the launcher empties on a *1–2*.
  ]

  - _EMP (Electromagnetic Pulse)_: Detonates in a massive sphere. Targets a *specific hex* rather than a single Frame. *All Frames* within the target hex and the 6 surrounding adjacent hexes suffer the effect, *including your own*. Deals no physical damage, rolls no damage dice, and *ignores Armor DR entirely* — plate is no protection against it, and stripped plate earns the attacker no bonus.
    - *No lock is required, and none can be contested.* The warhead is aimed at a point on the map, not at a Frame, so there is nothing for Chaff, an IRCM suite, Smoke, ECM or an Adaptive Skin to break — a countermeasure denies a _lock_, and there is no lock here. *Line of sight and terrain are the only things that stop it*, which is the one place this game has ever promised reliability: only the ground.
    - *Every Frame caught takes a Sensor Critical.* Roll *1d6* separately for each: on a *1–2* _Sensor Ghosting_, on a *3–4* _Sensor Calibration Drift_, on a *5–6* _Sensor Array Destroyed_. These are the three sensor results of the Head Critical Table and resolve exactly as they do there, including the further 1d6 for which array burns out. There is no softer edge to the blast — standing beside the target hex is standing in it.
      - *Do not mark the Head table.* A pulse breaches nothing, and a marked slot would let repeated pulses cascade upward into a Structural Fracture or a Pilot K.O. — killing a Frame outright with a weapon that rolls no damage and cannot be answered.
    - *Every Frame caught has its Tactical Datalink jammed* until the End Phase.

#design-note[
_It rolls no damage and can never destroy anything, so it does not win a fight — it decides what kind of fight the next few turns will be. Because it ignores armour completely it is at its best *first*, before a shot has been fired: a lance that opens the game with one Frame blind, another paying a tithe of energy every turn to see at all, and a third down an array for good, is fighting a different battle from the one it planned. Two of the three results never wear off._

_The price is that it cannot be aimed narrowly. Seven hexes is a wide pattern on a 22-hex map, and the warhead does not know your paint from theirs. A Colossus that walks into its own pulse is as blind as anything it was aiming at, and unlike a missile you cannot decline to catch your own lance by aiming slightly off — the blast is uniform to its edge._
]

== 5.3 Universal System Traits
#anchor("5.3")

Many weapons and utility systems share standardized mechanical behaviors, represented by keywords or Traits. There are four, and every one of them is defined here.

#rule-box[
*Trait: Armor Piercing (AP X)*
The weapon ignores up to *X* points of the target's Armor DR when calculating damage. An AP 3 weapon fired at a location with Armor DR 5 treats that DR as 2.

*Trait: Area of Effect (AoE)*
The damage blankets a wide area and *completely bypasses Flank Speed and Cover*. A target attacked by an AoE weapon cannot force the attacker to reroll any damage die, however fast it is moving or however deep the woods it is standing in. Armor DR still applies normally. Missile Cluster and Splash damage are both AoE.

*Trait: Rapid Fire*
The weapon saturates the target with high-velocity munitions, ignoring minor evasive maneuvers. The attack *completely bypasses Flank Speed*; terrain *Cover* still applies normally. A Rapid Fire weapon fires in one of two modes:
- *Single Burst (base EP cost)*: Roll 1 Hit Location. Roll the weapon's burst damage dice (e.g. 3× 1d6) and test *each die separately* against that location's Armor DR.
- *Full Auto (X × base EP)*: Pay the base cost for each burst fired, to a *maximum of 3*. Roll 1 Hit Location for the whole barrage. Roll the dice for all bursts combined against that location, still testing each separately. This burns the belt three times as fast: the weapon runs *Empty* on an Ammo Die of *1, 2 or 3* rather than just 1.
- *Criticals*: Rapid Fire does *not* use the Overkill Margin — individual rounds do not carry enough energy to overpenetrate. Instead, *each Burst that puts at least one die through the armor generates one Critical Hit*. A Single Burst yields at most 1; a three-Burst Full Auto up to 3. However many dice get through, the attack degrades that location's Armor DR by *1 in total*.

Full resolution details, including how degradation is applied mid-attack, are in Section 5.0.

*Trait: Overcharge [Cost for Effect]*
Any weapon or system with the Overcharge trait allows a pilot to dump excess EP from their Capacitor beyond the base activation cost to achieve a magnified effect. 
- *Capacitor Drain*: The additional EP required to trigger an Overcharge must be paid _exclusively_ from banked EP in the Frame's Capacitor. Freshly generated Reactor EP cannot be used to pay Overcharge costs.
- *Tracking Overcharge EP*: No separate bookkeeping is needed. Because the Capacitor is a standing reserve and is never swept into the pool (#sec("2.1")), the charge it currently holds _is_ the maximum a Frame may spend on Overcharges. Each EP spent on an Overcharge comes straight off the Capacitor. A Frame with an empty Capacitor cannot Overcharge at all, however full its pool — and note that paying ordinary costs out of the reserve, once the pool is dry, spends the same charge an Overcharge would have needed.
- *Overcharge*: High-yield energy weapons (Lasers, Thermal Lances, Disruptor Cannons, Rail Guns) allow a pilot to dump additional EP from the Capacitor during the Combat Phase to boost damage or induce special effects. Overcharging a weapon triggers a *1-Turn Cooldown* on that weapon.
- *Damage Overcharges Add Dice*: Where an Overcharge increases a weapon's damage, it does so at a flat rate of *2 EP per additional damage die, to a maximum of +2d6*. Never a fixed bonus.
_(Example: A pilot overcharges their Thermal Lance. They spend 4 base EP + 4 overcharge EP = 8 EP total, rolling *5d6* instead of the usual 3d6. The weapon then enters a 1-Turn Cooldown and cannot be fired next round)._

]

#design-note[
Why heavy weapons roll dice rather than flat damage. Flank Speed and Cover let a defender force *rerolls*, which can only ever touch dice. A weapon built around a large fixed bonus is therefore invisible to the entire defensive system: no amount of speed or terrain can affect it. This is why the Rail Gun rolls *5d6* rather than 3d6 + 10 for a nearly identical average — the five dice give a defender something to grab, doubling what Flank Speed and Cover are worth against it, while leaving it comfortably the deadliest weapon in the game. Keep this in mind when designing new equipment: *flat damage bonuses are defence-proof, and should be small or absent on anything powerful.*
]

#example[
  *Worked example — Full Auto against heavy plate.* A Vanguard opens up with its
  Autocannon (AP 1, Radar fire control) on a Paladin, declaring all three Bursts.
  That costs *3 EP*, one per Burst.

  + *Hit Location*: 2d6 on the Left Side column comes up 4 — the Paladin's *Left
    Arm*, Armor DR *5*. AP 1 ignores a point of it, so every die this attack
    tests against *4*. One location for the whole barrage.
  + *Nine dice, tested one at a time* against that same DR 4 — the armour does
    not degrade between them:
    - Burst 1 — 6, 2, 3. The 6 is through. *The Burst landed.*
    - Burst 2 — 4, 1, 3. A 4 does not beat a 4. *Nothing through.*
    - Burst 3 — 5, 5, 2. Two through, which is no better than one. *Landed.*
  + *Criticals*: two Bursts landed, so *two* Critical Hits — not three for the
    three dice that penetrated, and not one for the attack.
  + *Armour*: the Left Arm drops from DR 5 to *4*. Once, however many got through.
  + *Overkill*: none. Rapid Fire never rolls it.
  + *Ammunition*: Full Auto burns the belt three times as fast, so the Ammo Die
    empties on *1–3* rather than 1.

  Had the Hit Location roll been a *2*, the Core Critical would set Torso DR to 0
  for the attack — every die through, but still one Critical per Burst, so three
  rather than nine.
]


= 6. Damage & Critical Hits
#anchor("6")

#epigraph["No plan of operations extends with any certainty beyond the first contact with the main hostile force."][Helmuth von Moltke the Elder]

== 6.1 Hit Location Table (2d6)
#anchor("6.1")

When a Frame is hit, the player rolls 2d6 and determines the hit location using the column corresponding to the incoming attack's *Hit Zone* (Left Side, Front/Rear, or Right Side):

#table(
  columns: 4,
  align: (center, left, left, left,),
  [Roll (2d6)], [Left Side Attack], [Front / Rear Attack], [Right Side Attack],
  [*2*], [Torso (Core Critical)\*], [Torso (Core Critical)\*], [Torso (Core Critical)\*],
  [*3*], [Left Leg], [Right Arm], [Right Leg],
  [*4*], [Left Arm], [Right Arm], [Right Arm],
  [*5*], [Left Arm], [Right Leg], [Right Arm],
  [*6*], [Left Leg], [Torso], [Right Leg],
  [*7*], [Torso], [Torso], [Torso],
  [*8*], [Torso], [Torso], [Torso],
  [*9*], [Torso], [Left Leg], [Torso],
  [*10*], [Right Arm], [Left Arm], [Left Arm],
  [*11*], [Right Leg], [Left Arm], [Left Leg],
  [*12*], [Head (Sensors)\*\*], [Head (Sensors)\*\*], [Head (Sensors)\*\*],
)

_\*Torso (Core Critical): The shot slips through a structural gap into the center mass. *Treat the Torso's Armor DR as 0 for this entire attack* — it penetrates automatically, Torso DR is permanently reduced by 1, and the Overkill Margin is measured against 0 rather than the Frame's real armor. A heavy weapon that finds the core will therefore land several Critical Hits at once. *A Rapid Fire weapon keeps its own rule*: every die beats a DR of 0, but the attack still yields one Critical per Burst that landed rather than one per die, still degrades Torso DR by 1 in total, and still rolls no Overkill. A Full Auto barrage into the core is three Criticals, not nine._  
_\*\*Head (Sensors): Contains the cockpit and Sensor Suite. Critical hits on the Head are highly dangerous and can stun or blind the Frame._

== 6.2 Critical Hit Tables (1d6 Cascading)
#anchor("6.2")

If damage penetrates the Armor DR of a location, roll 1d6 on the corresponding table. Mark the slot on your Frame's profile. 
- *Overkill Margin*: For every *5 points* of damage that exceeds the Armor DR, roll an additional 1d6 on the Critical Hit Table.
- *Cascading Failure*: If you roll a number on the Crit Table that has already been marked, the damage cascades upward to the next highest available (unmarked) number. (Remember: HEI ammo adds a flat +1 modifier to these rolls. If a modified roll or cascade exceeds the highest slot on the table, apply that maximum effect).

#example[
  *Worked example — a cascade.* A Colossus lands a Thermal Lance on a Specter's
  Torso. The Specter has already taken hits there: slots *2* and *3* are marked.

  + The Colossus rolls 1d6 for the Critical: a *2*.
  + Slot 2 is already marked, so the damage *climbs* to slot 3.
  + Slot 3 is marked too, so it climbs again — to *4, Structural Fracture*, and
    the Specter's Torso Armor DR drops to *0*.
  + Mark slot 4. Every later hit on that Torso now penetrates automatically.

  A roll of 2 is the mildest result on the table, and it landed the worst one the
  Specter had left. Damage concentrates: the more a location has taken, the
  further each new hit climbs. Past slot 8 the top result applies — a location
  cannot absorb a critical by being full.
]

=== The Severity Ladder

Every table climbs the same six rungs, so a result of the same number means the same _kind_ of damage wherever it lands:

#table(
  columns: 2,
  align: (center, left,),
  [Tier], [Meaning],
  [*1*], [*Temporary Glitch* — a minor penalty that fades after next turn.],
  [*2*], [*System Strain* — a permanent increase to that location's EP costs.],
  [*3*], [*Performance Degradation* — a permanent loss of capacity or speed.],
  [*4*], [*Structural Fracture* — that location's Armor DR is reduced to *0*.],
  [*5*], [*Component Loss* — weapons, thrusters, sensors or reactor output are destroyed.],
  [*6*], [*Catastrophic Destruction* — ammo detonations, severed limbs, core melts.],
)

The Head table stops at 5, because a cockpit hit that reaches the top kills the pilot outright — there is no Component Loss rung to climb. The Torso runs two rungs _past_ 6, because it is the largest and most frequently struck location; slots 7 and 8 cannot be reached by a natural 1d6 and are entered only by cascade or by HEI's +1 modifier.

#example[
  *Worked example — Overkill through the core.* A Colossus fires its Rail Gun
  (5d6, AP 3) at a Jackal and rolls a *2* for Hit Location: *Torso — Core
  Critical*. The shot has found a structural gap, so the Jackal's Torso DR counts
  as *0* for this entire attack. The AP 3 is irrelevant; there is nothing left to
  ignore.

  + *Damage*: 5d6 comes up 3, 2, 4, 1, 5 — *15*. The Jackal has no Flank Speed
    this round and stands in the open, so nothing is rerolled.
  + *Penetration*: 15 beats 0. The Torso's real DR drops from 3 to *2* — the
    permanent loss is 1, as always, however large the hit.
  + *Overkill Margin*: the excess is measured against 0, not against 3. Fifteen
    is *three* full steps of 5, so three extra Critical dice.
  + *Total*: the base die plus three — *four Critical Hits* on the Torso, each
    cascading upward from whatever the last one marked.

  Four criticals on an eight-slot table, in one shot, from a weapon needing only
  a Radar lock and six banked EP. This is what the Core Critical is for, and why
  a 2 on the Hit Location Table is the most feared roll in the game.
]

=== Head (Cockpit) Critical Table

- *1: Sensor Ghosting*. Feedback floods the optics. The Frame immediately drops all currently held target locks and cannot establish new ones until the end of its next activation.
- *2: Sensor Calibration Drift*. The suite will no longer hold alignment. The Frame must spend *1 EP during each Energy Phase*; if it does not, it cannot establish any locks that turn.
- *3: Sensor Array Destroyed*. One sensor band burns out. Roll *1d6*: on a *1–2* the Thermal (IR) array, on a *3–4* the Optical (VIS) array, on a *5–6* the Microwave (Radar) array. That band is permanently destroyed and the Frame can never again establish locks on it.
- *4: Structural Fracture*. Head Armor DR is permanently reduced to *0*. The sensor mast is torn open, and the *Tactical Datalink is severed* — the Frame can no longer share or receive targeting telemetry.
- *5+: Pilot K.O. / Frame Shutdown*. The Frame is permanently disabled and out of combat.

=== Torso (Core) Critical Table

- *1: System Glitch*. The Frame generates 1 less EP _next turn_.
- *2: Servo Lock*. Torso Twists cost 2 EP (no longer free).
- *3: Capacitor Leak*. Capacitor Max is permanently reduced by 2; lose 2 stored EP immediately.
- *4: Structural Fracture*. Torso Armor DR is permanently reduced to *0*.
- *5: Reactor Damage*. Reactor output is permanently reduced by 2 EP per turn.
- *6: Ammo Explosion*. If the Frame has any volatile store remaining — a weapon using an *Explosive Ammo Die* (Autocannons or Guided Missiles) that is not yet Empty, *or Jump Jet propellant that has not run dry* — it detonates. That weapon is permanently *Empty* for the rest of the battle, and the Frame immediately suffers *2 additional Critical Hits* to the Torso. Inert ammunition (Rail Gun slugs) and energy weapons do *not* trigger this effect.
  - _This slot is always marked, whatever the Frame is carrying._ If it has no explosive ammunition remaining — because it never carried any, or because those weapons are already Empty — there is nothing to cook off: apply *Reactor Damage* instead (−2 EP per turn, cumulative with any Reactor Damage already suffered).
- *7: Electrical Fire*. During each End Phase, the Frame automatically suffers *1 Torso Critical Hit*. During its Activation, the Frame may spend *3 EP* and roll 1d6; on a *4+* the fire is smothered and this effect ends. A Frame that ends its Activation in *Water (Shallow or Deep)* extinguishes it automatically, with no EP cost or roll. The slot remains marked either way.
- *8+: Containment Failure*. Magnetic containment collapses. The fusion reaction itself quenches harmlessly — but the Capacitor bank dumps its entire stored charge through a ruptured chassis, and the coolant loop flashes to vapour. Deal *2d6 damage to all adjacent hexes* and the Frame is destroyed immediately.

=== Arms (Weapons & Actuators) Critical Table

- *1: Targeting Jitter*. Weapons mounted in this arm suffer a -1 damage penalty on their next attack.
- *2: Actuator Strain*. Weapons mounted in this arm cost +1 EP to fire.
- *3: Hardpoint Failure*. All attacks made with weapons in this arm permanently roll 1 fewer damage die (to a minimum of 1). _(As with the Prone penalty, a Rapid Fire weapon loses one die from *each* Burst — an Autocannon burst becomes 2x 1d6.)_
- *4: Structural Fracture*. This arm's Armor DR is permanently reduced to *0*.
- *5: Weapon Destroyed*. The weapon mounted in this arm is destroyed outright — mount, feed and all. Because each arm carries a single hardpoint (see #sec("7.2.0")), this silences the arm completely without severing it. If the arm was empty, the slot is simply marked and nothing is lost.
- *6+: Arm Severed*. The arm is completely destroyed. All weapons and systems mounted in this arm are lost.

=== Legs (Mobility) Critical Table

- *1: Servo Stutter*. The leg drags. The Frame's Movement Limit is reduced by 2 hexes until the end of its next activation.
- *2: Knee Lock*. Walking and reversing cost +1 EP per hex.
- *3: Hip Actuator*. The Frame's Movement Limit is permanently reduced by 2 hexes. _(A Frame whose Movement Limit falls below the Flank Speed Threshold can no longer gain Flank Speed at all.)_
- *4: Structural Fracture*. This leg's Armor DR is permanently reduced to *0*.
- *5: Actuator Destroyed*. The leg's drive assembly fails. The Frame immediately falls Prone, and from now on may only Stand Up by spending *3 EP* and passing a Pilot Check, exactly as a Frame with a severed leg (see #sec("6.5.4")). A dead actuator is as bad as a missing limb for balance: the Frame carries the same *−2 penalty to every Pilot Check* that a severed leg imposes (see #sec("6.4")). It also *can no longer jump* — the thrusters may be intact, but a Frame launches and lands on its legs, and these will no longer take the load.
- *6+: Leg Severed*. The leg is destroyed outright. The Frame falls Prone immediately and is permanently crippled (see #sec("6.5.4")). It may fight on, and may attempt to haul itself upright, but it will never walk again.

== 6.3 Falling and the Prone State
#anchor("6.3")

When an Iron Frame is knocked over during combat (via collision, Drop Strike, or leg destruction), it enters the Prone state. Mark the Frame with a Prone token.

=== Effects of the Prone State

- *Defense*: A Prone Frame cannot gain Flank Speed, and it cannot force rerolls from Flank Speed. It still benefits from damage rerolls granted by Terrain Cover.
- *Combat*: A Prone Frame cannot torso twist and suffers a *−1d6 penalty to all weapon damage rolls* (minimum of 1d6 rolled). For how that penalty applies to multi-die and Rapid Fire weapons, see Section 5.0.
- *Maneuvering*: A Prone Frame cannot walk, reverse, or jump. Its only movement options are:
  - *Stand Up*: Costs *3 EP* during its Activation Phase. Upon standing, the pilot removes the Prone token and may set the Leg Facing to any direction for free. A Frame with both legs intact stands automatically; a Frame with a *severed leg* must pass a Pilot Check to rise (see #sec("6.5.4")), and spends the 3 EP whether it succeeds or not.
  - *Pivot*: While Prone, the Frame may crawl-turn, pivoting its Leg Facing by 60 degrees. Cost: *2 EP* per 60 degrees (*3 EP* if a leg has been severed).

== 6.4 Pilot Checks
#anchor("6.4")

*A Pilot Check is always: 2d6 + modifiers, versus a Target Number of 6.*

The following modifiers apply to every Pilot Check, cumulatively:

#table(
  columns: 2,
  align: (left, center,),
  [Modifier], [Value],
  [Named Pilot's Initiative Bonus], [+1 / +2 / +3],
  [Standing in *Paved* terrain], [+1],
  [Standing in *Rough* terrain], [−1],
  [Standing in *Deep Water*], [−1],
  [Fighting on a *crippled Leg* — severed, or Actuator Destroyed], [−2],
)

The following modifiers apply only to the check they are named for:

#table(
  columns: 2,
  align: (left, center,),
  [Situation], [Additional Modifier],
  [Kinetic Drop Strike landing (jumper only)], [+ Mass Value − Hexes Jumped],
  [Jump Jet landing in hazardous terrain], [none],
  [Collision recovery], [none],
)

A Frame must make a Pilot Check in the following situations:
- *Avoiding Falling Prone*:
  - _Collisions_: Both Frames check (see #sec("2.2")).
  - _Jump Jet Landing_: Required when landing in Rough, Deep Water, a Building Roof, or Woods (see the Jump Jet Terrain Landing Table).
  - _Kinetic Drop Strike_: The *Target Frame* is automatically knocked Prone with no check. The *Jumping Frame* checks on landing, adding its Mass Value and subtracting the number of hexes jumped.
  - _Leg Severed_: A Frame automatically falls Prone if a leg is severed (no check allowed).
- *Standing on a Crippled Leg*: A Frame with a leg that has been *severed* or suffered *Actuator Destroyed* must pass a Pilot Check to rise (see #sec("6.5.4")), at the −2 both wounds impose. The 3 EP is spent whether it succeeds or fails.
- *Fighting Through Sensor Scrambles*:
  - _EMP Recovery_: no check is made. A band knocked out by an EMP is simply unavailable until the End Phase, when it comes back on its own (#sec("5.2")). The other two bands are unaffected and lock normally.

== 6.5 Location Destruction & Damage Transfer
#anchor("6.5")

A location is destroyed when the *top slot of its own table* is marked, whether rolled directly or reached by cascade. That slot differs by location: the *Head at 5*, the *Torso at 8*, and an *Arm or Leg at 6*. (Torso slot 6 is an Ammo Explosion, which is survivable — it is not the destruction rung.) Any subsequent hits to a destroyed location are handled using the following rules:

=== 6.5.1 Torso Destruction
#anchor("6.5.1")

If the Torso is destroyed, the engine core is breached. The Frame is completely destroyed.
-   *Containment Failure*: The Capacitor bank discharges through the wreck as the coolant loop lets go. All units in adjacent hexes suffer *2d6 damage* (apply Flank Speed and Armor DR normally).

=== 6.5.2 Head Destruction
#anchor("6.5.2")

If the Head is destroyed, the cockpit is vaporized or crushed, and the pilot is killed. The Frame is immediately deactivated and treated as destroyed.

=== 6.5.3 Arm Destruction (Left or Right)
#anchor("6.5.3")

If an Arm is destroyed, it is severed and blown off.
-   *Equipment Loss*: All weapons and systems mounted in that arm are permanently destroyed and lost.

=== 6.5.4 Leg Destruction (Left or Right)
#anchor("6.5.4")

If a Leg is destroyed, it is blown off.
-   *Immediate Fall*: The Frame immediately falls Prone. No Pilot Check is permitted; the limb is gone and no amount of skill keeps the machine upright.
-   *Fighting From the Ground*: A crippled Frame is not out of the battle. It may still fire every weapon it has, subject to the standard Prone penalties in Section 6.3.
-   *Hauling Itself Upright*: A Frame with one severed leg *may attempt to Stand Up*, balancing on its remaining leg and gyro. This costs the usual *3 EP* and requires a Pilot Check, taken at the standing *−2 penalty a crippled leg imposes on every check* (see #sec("6.4")) — an unaided pilot succeeds a little over 40% of the time, so getting a crippled Frame back on its foot is a real gamble, and an ace's bonus is worth a great deal here:
    - _Success (6+)_: The Frame rises. It is standing, and immediately sheds every Prone penalty — it regains its full damage dice and may torso twist again. Set its Leg Facing to any direction for free.
    - _Failure (\< 6)_: The Frame slips back down. The 3 EP is spent regardless, and it may try again on a later activation.
    - A standing crippled Frame that is knocked down again (by a collision, a Drop Strike, or a second leg wound) must repeat the attempt.
-   *Crippled Movement*: Standing or prone, the Frame is permanently crippled and can *never walk, reverse, or jump* again. Its only movement is to pivot its Leg Facing at a cost of *3 EP* per 60 degrees.
-   *Double Leg Loss*: If both legs are destroyed, the Frame is completely disabled (treated as destroyed). A machine with nothing to stand on cannot fight.

#design-note[
A severed leg is a crippling wound, not a death sentence. A one-legged Paladin that gets itself upright is still a Rail Gun platform that can traverse its torso and track targets — dangerous to approach, trivial to walk away from. Deciding whether to spend 3 EP and a Pilot Check on standing, or to stay down and keep shooting at a penalty, is the pilot's problem.
]

=== 6.5.5 Damage Transfer (Blow-Through)
#anchor("6.5.5")

If an attack hits a location that has already been destroyed (e.g. a random hit location rolls a severed Arm or Leg), the hit is not wasted:
-   The damage transfers directly to the *Torso*. Resolve the attack against the Torso's current Armor DR exactly as if you had rolled a Torso hit normally.
-   Because the attack travels inward through structural gaps to strike the center mass, the target cannot force the attacker to reroll damage dice using *Flank Speed* (terrain Cover rerolls still apply).
-   Damage cannot transfer further than the Torso (as Torso destruction destroys the Frame).

=== 6.5.6 The Wreck
#anchor("6.5.6")

A destroyed Frame is not removed. The wreck stays in its hex for the rest of the
battle and is treated as an obstacle:

- *It blocks movement.* No Frame may enter the hex. A Frame whose path runs into
  a wreck stops in the last clear hex, exactly as it would for a friendly Frame,
  and takes no collision damage — there is nothing left to ram that can ram back.
- *It blocks line of sight* to the height it stood at, two Levels, on every
  sensor band, exactly as the standing Frame did.
- *It grants no Cover.* A hulk is not a fortification, and nothing in these rules
  lets a Frame shelter behind one for rerolls.

A wreck is never repaired, salvaged or moved during a battle.

#design-note[
  Removing the model would be tidier and is what most rules do, but it quietly
  deletes information the battle earned: a Colossus that died holding a corridor
  should keep holding it. It also gives Containment Failure something to measure
  from, and it means the board grows more constrained as the fight goes on, which
  is the shape a battle of attrition ought to have.
]

= 7. Optional Rules
#anchor("7")

#epigraph["Amateurs talk about tactics, but professionals study logistics."][Gen. Robert H. Barrow]

For players seeking advanced simulation, competitive matching, or campaign settings, these optional rules introduce points-based force organization and environmental hazards.

== 7.1 Force Organization & Point Limits
#anchor("7.1")

To build balanced forces for casual or competitive play, players agree on a maximum *Deployment Point* limit (typically 1000 or 1500 points). Forces are organized into tactical groups:
- *Element*: A pair of 2 Iron Frames. (Standard skirmish games are typically 1 Element vs. 1 Element).
- *Platoon*: A full combat unit consisting of 3 to 4 Iron Frames (typically organized as two Elements operating together). 

== 7.2 Base Chassis & Custom Frames
#anchor("7.2")

If players wish to construct custom Iron Frames from scratch instead of using the pre-generated technical readouts (like the Vanguard or Specter), they must purchase a *Base Chassis* and spend points to upgrade it. 

Every Frame is defined by its physical *Tonnage* (Weight Class). Tonnage determines the Frame's starting baseline stats and its absolute maximum limits (*Limits*).

*Chassis Limits Table:*

#table(
  columns: 5,
  align: (left, center, left, left, left,),
  [Chassis Class], [Tonnage], [Base Stats (Init / Move / Reactor / Capacitor)], [Maximum Mobility Limits (Init / Move)], [Base Cost],
  [*Light*], [20–35 Tons], [Init 8 | Move 5 | Reactor 6 | Capacitor 2], [Init 12 | Move 7], [180 pts],
  [*Medium*], [40–55 Tons], [Init 6 | Move 4 | Reactor 6 | Capacitor 2], [Init 10 | Move 5], [230 pts],
  [*Heavy*], [60–75 Tons], [Init 4 | Move 3 | Reactor 5 | Capacitor 2], [Init 6 | Move 4], [280 pts],
  [*Assault*], [80–100 Tons], [Init 2 | Move 2 | Reactor 5 | Capacitor 2], [Init 4 | Move 3], [270 pts],
)

#design-note[
It is not a misprint. An Assault Frame is the only class that can neither dodge nor hide. Its Movement Limit tops out at 3 hexes, one short of the Flank Speed threshold, so it never gains a defensive reroll (#sec("1.1")) — and because it can never spend the 4th EP that lights a Frame up on infrared, it is instead *always* IR-lockable, whatever it has spent (#sec("4.1")). Every other chassis in the game can be made hard to see; this one cannot.

That second rule was priced rather than guessed. Making the largest reactor on the board permanently visible on infrared cost the Colossus 6.4 points of win rate in matched-frame-count lances; against a measured slope of roughly 11 points of win rate per 100 points of cost, that is worth about 60 points, and the Assault base was cut from 330 to 270 accordingly. Three scenarios came back into their target bands at once — Ghost & Wall 41% → 51%, Hammer & Anvil 58% → 51%, Titan Bout 83% → 62% — and nothing without an Assault Frame in it moved at all.

So the ten points between a Heavy and an Assault chassis are the price of a machine that stands still and takes it. If you build a custom Assault Frame, build it knowing that armor and firepower are the whole of its defence.
]

=== 7.2.0 Hardpoints & Mounting
#anchor("7.2.0")

Hardpoints are *fixed to a location*, not drawn from a shared pool. A Frame's chassis determines how many hardpoints each location has and what size each one is, and equipment must physically fit where it is bolted. This is what makes locational damage matter: blowing an arm off a Frame destroys whatever was mounted _there_, not a generic slot from a pile.

*Hardpoint Layout Table:*

#table(
  columns: 5,
  align: (left, center, center, center, center,),
  [Chassis Class], [Head], [Torso], [Left Arm], [Right Arm],
  [*Light*], [1 Light], [2 Light], [1 Light], [1 Light],
  [*Medium*], [1 Light], [1 Medium + 2 Light], [1 Medium], [1 Medium],
  [*Heavy*], [1 Light], [1 Medium + 3 Light], [1 Heavy], [1 Heavy],
  [*Assault*], [1 Light], [2 Medium + 3 Light], [1 Heavy], [1 Heavy],
)

_The *Legs carry no hardpoints*. They are drive assemblies and load-bearing structure, not mounting surfaces — which is why a Frame's every system is lost with its Torso or an Arm, and never with a leg._

*Mounting Rules:*
- *Size*: A hardpoint accepts equipment of its own size or smaller. A Heavy hardpoint may carry a Heavy, Medium or Light weapon; a Light hardpoint may carry only Light equipment. Nothing may be mounted in a hardpoint smaller than itself, and no Frame may mount equipment heavier than its own weight class.
- *Arms carry weapons only.* An arm's single hardpoint is its gun mount. This is why arms are the only locations that can engage a target on the Frame's flank (see #sec("1.3")), and why severing one silences exactly one weapon.
- *The Torso carries weapons and systems.* Defensive launchers, electronic warfare suites and Jump Jet thrusters and tankage all live there — which is why a Frame's utility loadout and its Ammo Explosion risk sit in the same box.
- *The Head carries one Light system.* The sensor suite itself is built into every chassis and costs no hardpoint; the slot is almost always spent on a Tactical Datalink.
- *Empty hardpoints are free.* A Frame is never obliged to fill its layout, and unused hardpoints cost no points.

_Note that the heavier chassis do not simply get "more of everything" — they trade breadth for calibre. A Medium has three Light hardpoints across its hull and a Medium mount on each arm; a Heavy gives up nothing but gains Heavy arm mounts and a fourth Torso slot. An Assault frame's advantage over a Heavy is a second Medium Torso hardpoint, not a bigger gun._

=== 7.2.1 Base Armor DR
#anchor("7.2.1")

When purchasing a Base Chassis, it comes pre-equipped with a baseline *Armor Damage Reduction (DR)* for every location, scaled to its physical Weight Class. Armor DR is a Frame's only durability stat: it is the threshold an attack must exceed to penetrate, it erodes by 1 with every penetration, and once a location reaches 0 it is opened to a Critical Hit from every hit that lands there.

_A note on light weapons: against fresh plate on a Heavy or Assault chassis, a single Autocannon die or a missile splash simply cannot exceed the threshold, and will bounce every time. This is intended. Armor erodes, so a location that is impervious on the opening turn becomes vulnerable once a Thermal Lance or Rail Gun has opened it up — light weapons are finishers and flank threats, not can-openers. Check a target's remaining DR before deciding a burst is wasted._

*Base Armor DR & Maximum Caps:*

#table(
  columns: 6,
  align: (left, center, center, center, center, center,),
  [Chassis Class], [Head], [Torso], [Arms [L/R]], [Legs [L/R]], [Max Armor DR Cap (Head / Torso / Arms / Legs)],
  [*Light (20–35T)*], [3 DR], [3 DR], [2 DR], [3 DR], [4 / 4 / 3 / 4 DR],
  [*Medium (40–55T)*], [4 DR], [5 DR], [3 DR], [4 DR], [5 / 6 / 4 / 5 DR],
  [*Heavy (60–75T)*], [5 DR], [7 DR], [5 DR], [6 DR], [6 / 8 / 6 / 7 DR],
  [*Assault (80–100T)*], [5 DR], [8 DR], [6 DR], [7 DR], [6 / 9 / 7 / 8 DR],
)

=== 7.2.2 Engine, Mobility & Armor Upgrades
#anchor("7.2.2")

Upgrading a Frame's chassis above its Base Stats *does not increase its Tonnage*. A 45-ton Frame remains exactly 45 tons, meaning its physical armor capacity and weapon mounting slots remain those of a Medium frame.

Mobility stats (Init/Move) and Armor DR are strictly bound by the Limits and Caps of the Frame's weight class. However, Reactor and Capacitor upgrades have *no limits*, allowing Heavy and Assault frames to purchase massive power plants to fuel heavy weaponry.

- *Initiative Upgrade*: +15 pts per +1 Initiative (Up to Chassis Limit)
- *Movement Upgrade*: +20 pts per +1 Move (Up to Chassis Limit.)
- *Armor DR Upgrade*: +5 pts per +1 Armor DR to any single location (Up to Max Armor DR Cap)
- *Reactor Upgrade*: +10 pts per +1 EP generated (No Limit)
- *Capacitor Upgrade*: +5 pts per +1 EP capacity (No Limit)

_Example: Constructing a 45-ton stealth striker (like the Specter). You pay 230 pts for the Medium Base Chassis (granting Head 4 DR, Torso 5 DR, Arms 3 DR, Legs 4 DR, and a hardpoint layout of Head 1L / Torso 1M+2L / one Medium mount per arm). You purchase Init+4 (60 pts), Move+1 (20 pts), Reactor+3 (30 pts), and Capacitor+2 (10 pts). The bare chassis costs 350 pts total. Adding Adaptive Skin (30 pts, Torso Medium), Tactical Datalink (15 pts, Head), Laser (15 pts, Left Arm) and a Disruptor Cannon (25 pts, Right Arm) brings the final cost to 435 pts — leaving both Light Torso hardpoints empty for a launcher or two._

=== 7.2.3 Countermeasures & Active Systems
#anchor("7.2.3")

- *Smoke Launcher* [Light]: 10 pts
- *Infrared Countermeasure Suite* [Light]: 15 pts
- *Chaff Dispenser* [Light]: 15 pts
- *Tactical Datalink* [Light]: 15 pts
- *Jump Jets (Light/Medium only, mounts in the Torso; Ammo Die 1d6, Empty on 1–2)* [Light]: 20 pts
- *Electronic Countermeasures (ECM)* [Medium]: 25 pts
- *Adaptive Skin* [Medium]: 30 pts

=== 7.2.4 Weapons & Armaments
#anchor("7.2.4")

- *Autocannon* [Light]: 10 pts
- *Laser* [Light]: 15 pts
- *Guided Missiles* [Medium]: 20 pts
- *Disruptor Cannon* [Medium]: 25 pts
- *Thermal Lance* [Heavy]: 30 pts
- *Rail Gun* [Heavy]: 35 pts

=== 7.2.5 Named Pilots
#anchor("7.2.5")

- *Pilot (+1 Initiative Bonus)*: 15 pts
- *Pilot (+2 Initiative Bonus)*: 30 pts
- *Pilot (+3 Initiative Bonus)*: 45 pts

== 7.3 Named Pilots & The Code of Honor
#anchor("7.3")

#epigraph["The true science of martial arts means practicing them in such a way that they will be useful at any time, and to teach them in such a way that they will be useful in all things."][Miyamoto Musashi]

In _Iron Protocol_, pilots are not anonymous grunts. You can field legendary *Named Pilots* who represent the elite houses, coalitions, and orders.

=== 7.3.1 Famous Aces
#anchor("7.3.1")

While players are encouraged to create their own pilots, here are a few legendary aces that stalk the battlefields of _Iron Protocol_:

- *Kaito Kuroda ("Wraith")*  
  #figure(image("/images/kaito_kuroda.jpg", width: 82%), caption: [Kaito Kuroda])  
  _A prodigy of the Obsidian Order. Kaito relies on raw reflexes and blinding speed over heavy armor. He views combat as a sacred duel, demanding to look his opponents in the eyes before he strikes._  
  - *Initiative Bonus*: +3  
  - *Sworn Vow*: Vow of Respect (Rei)  
  - *Point Cost*: 45 pts  

- *Kenji Takahashi ("Shogun")*  
  #figure(image("/images/kenji_takahashi.jpg", width: 82%), caption: [Kenji Takahashi])  
  _A fiercely traditional veteran of the Inner Systems Defense Force. Takahashi operates almost exclusively in heavily armored assault frames and believes that momentum dictates victory. He is famous for his unyielding, straight-line charges into enemy formations._  
  - *Initiative Bonus*: +2  
  - *Sworn Vow*: Vow of Courage (Yuu)  
  - *Point Cost*: 30 pts  

- *Lyra Vance ("Viper")*  
  #figure(image("/images/lyra_vance.jpg", width: 82%), caption: [Lyra Vance])  
  _A ghost on the battlefield, Lyra operates deep behind enemy lines for the Sovereign Coalition. She pilots electronic warfare frames sheathed in Adaptive Skin, tuning it band by band to whichever sensor her quarry is leaning on. Rather than engaging in chaotic brawls, she relies on surgical precision, dismantling a target's mobility and weapon systems limb-by-limb before delivering the killing blow._  
  - *Initiative Bonus*: +3  
  - *Sworn Vow*: Vow of Mercy (Jin)  
  - *Point Cost*: 45 pts

=== 7.3.2 Initiative & Pilot Check Bonus
#anchor("7.3.2")

Equipping a Named Pilot on an Iron Frame grants a flat Initiative bonus of *+1, +2, or +3* (declared at build time). This represents their tactical foresight and combat reflexes.

A Named Pilot's bonus is applied *after* the chassis Initiative limits in #sec("7.2"), and may exceed them — that is the point of an ace. A Heavy chassis capped at Initiative 6 may therefore reach Initiative 9 with a +3 pilot, and there is no upper ceiling on the resulting figure.

#design-note[
_Buyer's note: Initiative is only ever compared, never looked up on a table, so its value is entirely *positional*. A Frame that already acts first in the order gains nothing further from a higher number. Putting a +3 ace in a Frame that is comfortably the fastest thing on the field buys you the Pilot Check bonus and very little else — and the Pilot Check bonus alone is worth having: a 2d6 check against TN 6 succeeds 72% of the time unaided, 83% with a *+1*, and 97% with a *+3*. If the check is all you want, a *+1 pilot at 15 pts* buys the first and largest step of that for a third of the cost of a +3._
]

- *Pilot Checks*: In addition to modifying the Frame's Initiative, the Named Pilot adds their Initiative bonus (+1, +2, or +3) as a flat modifier to all Pilot Checks (to avoid falling Prone). If the pilot is dishonored, they immediately lose this bonus as well.
- *Point Cost (Optional)*: If playing with the optional point rules (see #sec("7.1")), Named Pilots cost points based on their Initiative bonus:
  - *+1 Initiative & Pilot Checks*: 15 pts
  - *+2 Initiative & Pilot Checks*: 30 pts
  - *+3 Initiative & Pilot Checks*: 45 pts

=== 7.3.3 Iron Protocol Vows
#anchor("7.3.3")

Every Named Pilot is sworn to a specific vow under the Iron Protocol, reflecting their martial pride. A vow is a bargain: it binds the pilot to a way of fighting, and in exchange the discipline of that focus makes them formidably good at it.

- *The Boon*: While the pilot remains honorable, they enjoy the vow's listed benefit.
- *Dishonor*: If a pilot violates their vow during a battle, they are *dishonored*. They immediately lose their Initiative bonus, lose their Pilot Check bonus, *lose the vow's Boon*, and all their weapons cost +1 EP to fire for the remainder of the battle.

_Choose one Vow for your Named Pilot. Note that several vows cost a particular Frame nothing at all — a pilot who never carries a Smoke Launcher gives up little by swearing the Vow of Honesty. That is deliberate. The Boons are calibrated to the vow, not to your loadout, so the honest way to build a pilot is to swear the vow that matches how the Frame already fights, and then be held to it._

==== Vow of Courage (Yuu)

_“The warrior does not retreat; we are the anvil upon which the enemy breaks.”_
- *The Constraint*: The pilot cannot use the *Reverse (R)* movement command.
- *The Boon*: A pilot who has never learned to give ground has learned instead how to absorb a blow — and how to get back up. Gain *+2 to every Pilot Check made to stay on your feet or to rise back onto them*: collisions, Drop Strikes, hazardous landings, and hauling a crippled Frame upright on a severed leg alike.
- *Dishonor Penalty*: The pilot is dishonored (see standard penalty).

==== Vow of Respect (Rei)

_“A warrior meets their foe face-to-face. Anonymous death from behind is the weapon of cowards.”_
- *The Constraint*: The pilot cannot target an enemy Frame from its *Rear Hit Zone*, nor fire indirect-guided missiles without direct Line of Sight (even if a Tactical Datalink is active).
- *The Boon*: All that practice at the honest angle pays. Gain *+1 to Critical Hit rolls* made against a target struck in its *Front Hit Zone*.
- *Dishonor Penalty*: The pilot is dishonored (see standard penalty).

==== Vow of Honor (Meiyo)

_“Seek only the strongest. There is no glory in crushing the weak.”_
- *The Constraint*: If an enemy Frame of higher Initiative or higher tonnage is detected and lies within *any firing arc in which this Frame could bring a weapon to bear*, the pilot *must* target that worthier Frame rather than any lesser one. (If both a higher-tonnage and a higher-Initiative target are available, the pilot may choose between them, but may not fire on a target inferior in _both_ categories.)
- *The Boon*: The pilot rises to meet a superior foe. When attacking a Frame of *higher tonnage or higher Initiative*, roll *one additional damage die*.
- *Dishonor Penalty*: The pilot is dishonored (see standard penalty).

==== Vow of Mercy (Jin)

_“Victory is in the disarm, not the slaughter. A dead enemy learns nothing.”_
- *The Constraint*: Hit locations are rolled, not chosen, so this vow governs what the pilot does with the roll. While the target Frame still has *all four* of its Arms and Legs intact, a Mercy pilot who rolls a *Head or Torso* result against it must *pull that shot*: it inflicts nothing — no damage, no Armor DR degradation, no Critical Hit, and no Disruptor EP drain — though the EP and ammunition are still spent. The pilot must land a crippling blow before going for the kill: *once any one of the target's limbs has been destroyed, its core may be struck freely.*
  - *Multi-location attacks are resolved one location at a time.* A Cluster salvo rolls three locations and an HE warhead splashes into every adjacent one; each Head or Torso result among them is pulled individually, while the limb results resolve normally. A Mercy pilot's opening cluster strips a Frame's arms and legs while leaving its cockpit untouched — and the moment one of those limbs comes off, the rest of the salvo may go wherever it lands.
- *The Boon*: A lifetime spent dismantling machines rather than destroying them. Gain *+1 to Critical Hit rolls* made against *Arms and Legs*.
- *Breaking the Vow*: Choosing to resolve a Head or Torso result normally while the target still has *all four* limbs intact dishonors the pilot.
- *Dishonor Penalty*: The pilot is dishonored (see standard penalty).

==== Vow of Honesty (Makoto)

_“Deception is a crutch. I will stand in the light and let them witness their end.”_
- *The Constraint*: The pilot may not use *any system whose purpose is to deceive a sensor* — an Adaptive Skin, Smoke Launcher, IRCM suite or Chaff Dispenser — nor may they activate ECM, nor benefit from the umbrella of allied ECM or Smoke. _An allied ECM bubble does not switch off around them — instead, an honest pilot's Frame is simply always considered detectable on the Microwave (Radar) spectrum while inside it, and enemies may always establish Visual locks through allied Smoke to reach them._
- *The Boon*: A pilot who has never hidden has spent that time learning to see. *No sustained jamming suite functions against this pilot's locks.* Neither an enemy Adaptive Skin nor an *ECM* umbrella forces a Countermeasure Check against their attacks — they may target a Frame on any spectrum its Skin is suppressing or its ECM is contesting, as though the system were switched off. _(Chaff and Smoke are physical, and still force their Countermeasure Check normally. So does an *IRCM suite*: the boon reads through jamming that runs *continuously* — a constant signature a trained eye learns to discount — not a directed burst fired at the instant of the shot. You cannot learn to anticipate something timed to your own trigger pull.)_
- *Dishonor Penalty*: The pilot is dishonored (see standard penalty).

==== Vow of Loyalty (Chuugi)

_“My shield is the wall that protects my kin. I will fall before they do.”_
- *The Constraint*: If a friendly Frame within 3 hexes has more marked Critical Hit slots than the pilot, the pilot cannot move further away from that ally.
- *The Boon*: The pilot fights to interpose, drawing fire and breaking up firing lines. Any *friendly Frame within 3 hexes* may force *one additional damage reroll* against attacks made upon it, exactly as though it had gained one further step of Cover.
- *Dishonor Penalty*: The pilot is dishonored (see standard penalty).

= 8. Iron Frame Roster
#anchor("8")

#epigraph["Battles are won by slaughter and maneuver. The greater the general, the more he contributes in maneuver, the less he demands in slaughter."][Winston Churchill]

Here are five pre-configured Iron Frames ready for combat.

== 8.0 Reading a Designation
#anchor("8.0")

Every Iron Frame carries a type designation that identifies it precisely, in the
form:

#align(center, block(inset: (y: 6pt), text(font: "DejaVu Sans Mono", size: 11pt)[
  IF#text(fill: rgb("#0e7899"))[-45M]#text(fill: rgb("#8a5a12"))[-1]#text(fill: rgb("#b3342c"))[A1]
]))

#table(
  columns: 3,
  align: (left, left, left),
  [Part], [Meaning], [Example],
  [`IF`], [Iron Frame. Every fielded chassis carries it.], [—],
  [`45M`], [*Description* — tonnage, then weight class: `L` Light, `M` Medium, `H` Heavy, `A` Assault. Readable at a glance across the table, which is the point: an opponent seeing `IF-90A` knows what is walking toward them before they read the name.], [45 tons, Medium],
  [`-1`], [*Design number.* Which design this is among frames of that tonnage and class, in the order they were fielded. This is what makes a designation unique — two different 45-ton mediums are `IF-45M-1` and `IF-45M-2`, never both `IF-45M`.], [the first 45M design],
  [`A1`], [*Variant*, omitted on the base model. `A1` is the first refit of that design, `A2` the second. A variant keeps its parent's design number, because it is the same machine modified.], [first refit],
)

So the Specter is `IF-45M-1`. A refitted Specter is `IF-45M-1A1`. A wholly
different 45-ton medium — another manufacturer, another hull — is `IF-45M-2`,
and *its* first refit is `IF-45M-2A1`.

#design-note[
  Real military designations keep identity and description apart, because a code
  that only describes a machine collides the moment two machines share a
  description. `F-16` and `M1` say nothing about weight; the design number is
  arbitrary and sequential, and the specification lives on the sheet.

  This scheme keeps the descriptive prefix, because a wargame is played across a
  table and `IF-90A` earns its space by telling an opponent what they are facing
  without a lookup. The design number restores what description alone cannot
  give: a code that identifies exactly one machine.

  The variant convention follows ground-vehicle practice — `M1` becomes `M1A1`
  becomes `M1A2` — rather than the aircraft convention of series letters, on the
  grounds that an Iron Frame is a ground vehicle and refits it in the field.
]

== 8.1 IF-25L-1 "Jackal" (Light Recon Frame)
#anchor("8.1")

#figure(image("/images/if_25l_1_jackal.jpg", width: 82%), caption: [IF-25L-1 "Jackal" Technical Sketch])

_A fragile but blisteringly fast scout frame. It relies on its speed, Flank Speed and jump jets to outmaneuver heavier foes, darting in to deliver surgical strikes before leaping to safety._
- *Initiative*: 12
- *Chassis Mass (Tonnage)*: 25 Tons (Light, Mass Value 1)
- *Point Value*: 365 points
- *Reactor Rating*: 8 EP/turn
- *Capacitor Max*: 3 EP
- *Movement Limit*: 7 hexes
- *Armor DR by Location*: Head: 3 | Torso: 3 | Left Arm: 2 | Right Arm: 2 | Each Leg: 3
- *Equipped Systems*:
  - Standard Sensor Suite (Visual [VIS]/Infrared [IR]/Microwave [Radar])
  - Jump Jets [Torso, Light HP]
  - Tactical Datalink [Light HP]
- *Equipped Weapons*:
  - *Left Arm* [Light HP]: Laser (2d6 damage)
  - *Right Arm* [Light HP]: Autocannon [Radar fire control] (3x 1d6 burst, AP 1 — Ammo Die 1d6, Empty on 1 / 1–3 on Full Auto)

== 8.2 IF-45M-1 "Specter" (Medium Stealth Frame)
#anchor("8.2")

#figure(image("/images/if_45m_1_specter.jpg", width: 82%), caption: [IF-45M-1 "Specter" Technical Sketch])

_A fast, stealthy frame designed to infiltrate enemy lines, disrupt sensors, and escape using Flank Speed and an Adaptive Skin._
- *Initiative*: 10
- *Chassis Mass (Tonnage)*: 45 Tons (Medium, Mass Value 2)
- *Point Value*: 435 points
- *Reactor Rating*: 9 EP/turn
- *Capacitor Max*: 4 EP
- *Movement Limit*: 5 hexes
- *Armor DR by Location*: Head: 4 | Torso: 5 | Left Arm: 3 | Right Arm: 3 | Each Leg: 4
- *Equipped Systems*:
  - Standard Sensor Suite (Visual [VIS]/Infrared [IR]/Microwave [Radar])
  - Adaptive Skin
  - Tactical Datalink
- *Equipped Weapons*:
  - *Left Arm* [Light HP]: Laser (2d6 damage)
  - *Right Arm* [Medium HP]: Disruptor Cannon (requires a *Radar* lock)

== 8.3 IF-55M-1 "Vanguard" (Medium Skirmisher Frame)
#anchor("8.3")

#figure(image("/images/if_55m_1_vanguard.jpg", width: 82%), caption: [IF-55M-1 "Vanguard" Technical Sketch])

_The workhorse of the fleet. Balanced defense, solid firepower, and an infrared jammer to spoil a thermal lock._
- *Initiative*: 6
- *Chassis Mass (Tonnage)*: 55 Tons (Medium, Mass Value 2)
- *Point Value*: 455 points
- *Reactor Rating*: 12 EP/turn
- *Capacitor Max*: 6 EP
- *Movement Limit*: 5 hexes
- *Armor DR by Location*: Head: 5 | Torso: 6 | Left Arm: 4 | Right Arm: 4 | Each Leg: 5
- *Equipped Systems*:
  - Standard Sensor Suite (Visual [VIS]/Infrared [IR]/Microwave [Radar])
  - Electronic Countermeasures (ECM) [Medium HP]
  - Infrared Countermeasure Suite [Light HP]
  - Chaff Dispenser [Light HP]
  - Tactical Datalink [Light HP]
- *Equipped Weapons*:
  - *Left Arm* [Light HP]: Autocannon [Radar fire control] (3x 1d6 burst, AP 1 — Ammo Die 1d6, Empty on 1 / 1–3 on Full Auto)
  - *Right Arm* [Light HP]: Laser (2d6 damage)

== 8.4 IF-75H-1 "Paladin" (Heavy Fire-Support Frame)
#anchor("8.4")

#figure(image("/images/if_75h_1_paladin.jpg", width: 82%), caption: [IF-75H-1 "Paladin" Technical Sketch])

_A heavy bombardment frame equipped to deliver high-impact kinetic support and rain cluster munitions, protected by layered defensive launchers._
- *Initiative*: 5
- *Chassis Mass (Tonnage)*: 75 Tons (Heavy, Mass Value 3)
- *Point Value*: 555 points
- *Reactor Rating*: 14 EP/turn
- *Capacitor Max*: 8 EP
- *Movement Limit*: 4 hexes
- *Armor DR by Location*: Head: 5 | Torso: 7 | Left Arm: 5 | Right Arm: 5 | Each Leg: 6
- *Equipped Systems*:
  - Standard Sensor Suite (Visual [VIS]/Infrared [IR]/Microwave [Radar])
  - Infrared Countermeasure Suite [Light HP]
  - Chaff Dispenser [Light HP]
  - Smoke Launcher [Light HP]
  - Tactical Datalink [Light HP]
- *Equipped Weapons*:
  - *Right Arm* [Heavy HP]: Rail Gun (5d6, AP 3, inert slugs — infinite)
  - *Left Arm* [Light HP]: Autocannon [Visual fire control] (3x 1d6 burst, AP 1 — Ammo Die 1d6, Empty on 1 / 1–3 on Full Auto)
  - *Torso* [Medium HP]: Guided Missile Launcher (Infrared [IR] Guided, Cluster Warheads)

== 8.5 IF-90A-1 "Colossus" (Heavy Assault Frame)
#anchor("8.5")

#figure(image("/images/if_90a_1_colossus.jpg", width: 82%), caption: [IF-90A-1 "Colossus" Technical Sketch])

_A walking fortress. Generates massive amounts of energy to feed its Rail Gun and Thermal Lance, relying on heavy armor and smoke screens for protection._
- *Initiative*: 3
- *Chassis Mass (Tonnage)*: 90 Tons (Assault, Mass Value 4)
- *Point Value*: 620 points
- *Reactor Rating*: 18 EP/turn
- *Capacitor Max*: 10 EP
- *Movement Limit*: 3 hexes
- *Armor DR by Location*: Head: 6 | Torso: 8 | Left Arm: 6 | Right Arm: 6 | Each Leg: 7
- *Equipped Systems*:
  - Standard Sensor Suite (Visual [VIS]/Infrared [IR]/Microwave [Radar])
  - Smoke Launcher [Light HP]
  - Infrared Countermeasure Suite [Light HP]
  - Chaff Dispenser [Light HP]
  - Tactical Datalink [Light HP]
- *Equipped Weapons*:
  - *Left Arm* [Heavy HP]: Thermal Lance
  - *Right Arm* [Heavy HP]: Rail Gun (5d6, AP 3, inert slugs — infinite)
  - *Torso* [Medium HP]: Guided Missile Launcher (EMP Warheads — fired at a hex, needs no lock)

= Appendix A: Turn Reference

_One page. Everything you look up mid-game, in the order you need it._

== The Round

#table(
  columns: 3,
  align: (left, left, left,),
  [Phase], [Do this], [Order],
  [*1. Energy*], [Each Frame generates EP = Reactor Rating into its *pool*. Add +1 EP in Shallow Water, +2 in Deep. Deduct 2 EP for each sustained system (Adaptive Skin, ECM). The *Capacitor is not touched* — it is a standing reserve.], [—],
  [*2. Activation*], [Frames move one at a time, spending EP step by step. Torso Twist free at the very end of each activation.], [*Lowest* Initiative first],
  [*3. Combat*], [Frames fire. Damage resolves instantly. Each weapon fires *once*.], [*Highest* Initiative first],
  [*4. End*], [Unused pool EP is added to the Capacitor up to its Max; overflow is vented. Clear Flank Speed, tick cooldowns down, roll 1d6 per Smoke token (1–2 disperses).], [—],
)

== Spending EP

#table(
  columns: 5,
  align: (left, center, center, center, center,),
  [Action], [Cost], [Terrain?], [Climb +1?], [Counts vs Move Limit?],
  [Walk], [1 EP], [Yes], [+1 EP], [Yes],
  [Reverse], [2 EP], [Yes], [+1 EP], [Yes],
  [Jump], [2 EP / hex], [No], [No], [Yes],
  [Pivot 60°], [1 EP], [No], [—], [No],
  [Stand Up], [3 EP], [No], [—], [No],
  [Torso Twist], [Free], [No], [—], [No],
)

_Terrain is paid on entry, for the hex you move into. Knee Lock adds +1 EP to Walk and Reverse. Prone pivot costs 2 EP, or 3 EP on a severed leg._

== The Attack Sequence

+ Pay the weapon's EP cost.
+ Check *arc* and *line of sight*.
+ Check the *sensor lock* the weapon requires. No lock, no attack.
+ Defender may fire *countermeasures* → Countermeasure Check, *4+ negates the attack entirely*.
+ Roll *2d6* for hit location, on the column matching the attack's Hit Zone.
+ Roll damage dice.
+ Defender spends *rerolls*: 1 for Flank Speed, 1 for Light Cover, 2 for Heavy Cover. They stack, and all are optional.
+ Compare the total to the location's *Armor DR*.
+ *Strictly greater* = penetration: DR drops by 1 permanently. Equal or less = nothing at all.
+ On penetration, roll *1d6* on that location's Critical table, +1 die per full 5 points of excess damage. A marked slot cascades upward.

== Numbers Worth Memorizing

#table(
  columns: 2,
  align: (left, left,),
  [], [],
  [Pilot Check], [2d6 vs *TN 6*],
  [Countermeasure Check], [1d6, *4+* stops it],
  [Flank Speed threshold], [Exit *4* hexes (or jump *2+*)],
  [Overkill Margin], [+1 crit die per *5* excess damage],
  [Maximum jump], [*4* hexes, every Frame],
  [Full Auto], [*3* bursts maximum],
  [Overcharge damage], [*2 EP* per +1d6, max *+2d6*],
  [Infrared lockable], [Once the target has spent its *4th EP* this round],
  [Ammo Die — Empty on], [Autocannon *1* (Full Auto *1–3*) · Missiles & Jump *1–2* · Chaff & Smoke *1*],
)

== Location Tables at a Glance

#table(
  columns: 4,
  align: (left, center, center, left,),
  [Location], [Slots], [Destroyed at], [Table],
  [Head], [5], [*5*], [Sensor faults → Structural Fracture → Pilot K.O.],
  [Torso], [8], [*8*], [Glitch → Servo Lock → Capacitor Leak → Fracture → Reactor → Ammo Explosion → Fire → Containment Failure],
  [Arm], [6], [*6*], [Jitter → Strain → Hardpoint → Fracture → Weapon Destroyed → Severed],
  [Leg], [6], [*6*], [Stutter → Knee Lock → Hip → Fracture → Actuator Destroyed → Severed],
)

_Slot 4 is *Structural Fracture* on every table — that location's Armor DR drops to 0. Torso slots 7 and 8 cannot be rolled naturally; they are reached only by cascade or HEI's +1._

= Appendix B: Learning the Matchups

_Written for a player who has finished the rules. If you are still on your first game, the Vanguard mirror in #sec("1.4.1") is the place to be._

== Vanguard vs. Specter

A deliberately asymmetric matchup that rewards knowing the Specter's line.

- The Specter cannot win a straight damage race. Its Laser cannot penetrate the Vanguard's Torso armor while the Vanguard is moving, and its Disruptor Cannon deals no damage at all — but the Disruptor lands its effect on every hit it is _allowed_ to make, whatever the Vanguard's armor or speed.
- Instead, the Specter fights to *strip armor and then convert*. A Disruptor hit on any limb or the Head forces a Critical, and a result of 4 (_Structural Fracture_) reduces that location's Armor DR to *0*. Every subsequent Laser shot that lands there does full damage.
- *The whole plan runs on the Microwave band.* The Disruptor needs a Radar lock, and the Vanguard carries both a Chaff Dispenser and an ECM suite. Both contest the shot on a Countermeasure Check, so roughly half the Specter's pulses land through either — but Chaff is a finite store of about six cartridges fired one at a time, while the ECM umbrella runs all game for 2 EP a turn and never runs out. The Specter's opening problem is therefore electronic, not structural: make the Vanguard spend cartridges it cannot replace, and accept that every Disruptor shot is a coin flip.
- The Specter's *Adaptive Skin decides which of the Vanguard's guns still works.* Suppressing Visual forces every Laser shot to survive a Countermeasure Check, so about half of them simply fail to acquire; the Vanguard leans on its Autocannon and must close to make it count. Cloaking a second band costs an Overcharge and leaves the Skin offline entirely next round, so it is a spike, not a posture.
- Terrain still matters more than the Skin for hiding completely. Buildings and elevation break _every_ band at once; Heavy Woods strip Visual and Infrared, leaving only Radar for an ECM or a Microwave-mode Skin to finish.
- The Vanguard, in turn, wins by forcing the exchange early, before its armor is opened up.

= Appendix C: Glossary

#table(
  columns: 3,
  align: (left, left, center,),
  [Term], [Meaning], [Section],
  [*Activation*], [One Frame's turn to move, during the Activation Phase.], [2.2],
  [*Ammo Die*], [1d6 rolled after firing; at or below the weapon's number it is Empty for the battle.], [5.0],
  [*AoE*], [Bypasses Flank Speed _and_ Cover. Armor DR still applies.], [5.3],
  [*AP X*], [Ignores X points of the target's Armor DR.], [5.3],
  [*Armor DR*], [A location's damage threshold. Erodes by 1 per penetration; never repaired.], [1.1, 7.2.1],
  [*Capacitor*], [Standing reserve of banked EP. Carries between rounds; pays for Overcharges.], [2.1],
  [*Cascading Failure*], [A critical on a marked slot climbs to the next unmarked one.], [6.2],
  [*Core Critical*], [A hit location roll of 2. Torso DR counts as 0 for that entire attack.], [6.1],
  [*Countermeasure Check*], [1d6; on 4+ the lock fails and the attack is negated.], [4.2],
  [*Cover*], [Terrain rerolls: 1 die in Light Woods, 2 in Heavy Woods or beside a building.], [3.3],
  [*Dishonor*], [A Named Pilot who breaks their Vow loses every bonus and pays +1 EP per weapon.], [7.3.3],
  [*Element / Platoon*], [2 Frames / 3–4 Frames.], [7.1],
  [*EP*], [Energy Point. The game's only currency.], [2.1],
  [*Flank Speed*], [Gained by exiting 4+ hexes, or a jump of 2+. Grants one damage reroll.], [2.2],
  [*Full Auto*], [Up to 3 Rapid Fire bursts into one hit location. Empties on an Ammo Die of 1–3.], [5.3],
  [*Hardpoint*], [A fixed mounting slot in a specific location, sized Light, Medium or Heavy.], [7.2.0],
  [*Hit Zone*], [Which column of the Hit Location Table an attack uses, set by attack direction.], [1.3],
  [*Lock*], [Detection on a sensor band. Required to fire the weapon that needs it.], [4.1],
  [*Mass Value*], [1–4 by weight class. Multiplies collision and Drop Strike damage.], [1.1],
  [*Overcharge*], [Spending Capacitor charge for a magnified effect; triggers a 1-Turn Cooldown.], [5.3],
  [*Overkill Margin*], [+1 critical die per full 5 points of damage past the Armor DR.], [6.2],
  [*Pilot Check*], [2d6 + modifiers vs TN 6.], [6.4],
  [*Prone*], [Knocked down. No Flank Speed, −1d6 damage, cannot twist.], [6.3],
  [*Rapid Fire*], [Bypasses Flank Speed; each die tested separately; one critical per penetrating burst.], [5.3],
  [*Running Cold*], [Having spent fewer than 4 EP this round — no infrared signature at all.], [4.1],
  [*Severity Ladder*], [The six rungs every critical table climbs, so a number means the same kind of damage everywhere.], [6.2],
  [*Torso Facing*], [Where the upper body points; sets firing arcs. Twisted at the end of an activation.], [1.2],
)

_Game Design by Antigravity & the User._

