# Iron Protocol

**A Tactical Game of Iron Frame Combat**

![Iron Protocol Logo](images/logo.jpg)

*Iron Protocol* is a hex-grid tabletop wargame of heavy mechanical combat. It fuses the tactical resource management, locational damage, and critical tables of classic mecha wargames with the fluid turn-order dynamics, initiative-based activations, and torso twisting of tactical dogfighters.

---

## ⚡ Core Features

*   **No "To-Hit" Rolls**: *Iron Protocol* eliminates the frustration of missing a 95% shot — an attacker never rolls for accuracy. Secure a sensor lock and the shot connects. The entire tactical puzzle is about *getting and keeping that lock*: manipulating line-of-sight and terrain cover, and fighting the Electronic Warfare battle (Adaptive Skin, ECM, Smoke, Flares, Chaff) to see the enemy while blinding them. A defender is never helpless — Flares, Chaff, Smoke, ECM and an Adaptive Skin all contest an incoming lock on a **Countermeasure Check**, one number for every defensive system in the game — but no shot is ever wasted on a bad accuracy roll.
*   **The Overcharge Economy**: Combat is an intense, knife-edge game of resource management. You must carefully allocate your Reactor Energy (EP) every single turn. Do you spend EP to sprint for cover, or do you stand your ground to bank energy into your Capacitor to unleash a devastating, overcharged Rail Gun strike on the following turn?
*   **The Double-Initiative Mind Game**: The turn sequence brilliantly simulates mechanical warfare. Heavy, slow frames are forced to move *first*, committing to their positions. Fast, agile scouts move *last*, allowing them to perfectly react and flank. However, when the Combat Phase begins, the turn order reverses—the fast frames fire first, creating a massive tactical advantage for the agile.
*   **Brutal Attrition & Critical Cascades**: Attacks damage specific hit locations (Head, Torso, Arms, Legs). Instead of subtracting HP, a penetrating hit permanently degrades that location's Armor Damage Reduction (DR), so a frame is progressively opened up rather than whittled down. Armor is a **threshold, not a buffer** — heavy plate does not slow a light weapon down, it stops it dead, and an autocannon cannot scratch an Assault frame's torso at all. Cracking a heavy chassis takes a real gun, and every point of DR stripped makes the next hit easier. Once a location is opened, criticals cascade *upward* through it: ammunition detonations, severed limbs, electrical fires, and finally a containment failure that dumps the capacitor bank through the wreck and into every adjacent hex.
*   **The Code of Honor**: Field legendary named pilots who swear ancient oaths before combat. Every vow is a bargain — a binding constraint paid for with a **Boon** that makes the pilot formidable at the way they have chosen to fight. A pilot sworn to the *Vow of Courage* may never walk backward, and in exchange has learned to stay on their feet and get back up; a pilot sworn to the *Vow of Mercy* must cripple before they kill, and dismantles limbs better than anyone. Break your vow and the pilot is dishonored, losing the Boon, their Initiative bonus and their Pilot Check bonus, and paying +1 EP on every weapon for the rest of the battle.

---

## 📂 Repository Guide

* 📓 **[rules.md](rules.md)**: The full master rulebook, including core phases, terrain modifiers, planetary hazards, custom pilot vows, and pre-configured frame technical readouts.
* 📋 **[reference.md](reference.md)**: A printable quick reference sheet player aid, consolidating turn sequences, the sensor matrix, pilot check equations, and hit/critical tables on one page.
* 🛠️ **[Frames Directory](frames/)**: Printable character sheets for the five standard frames (**IF-25L-1 Jackal**, **IF-45M-1 Specter**, **IF-55M-1 Vanguard**, **IF-75H-1 Paladin**, and **IF-90A-1 Colossus**) featuring tracking bubbles for energy pools, armor DR, critical hits, and Ammo Dice.
* 🧪 **[playtest.md](playtest.md)**: Twelve scenarios used as a test suite for the rules engine, from a 1v1 introductory duel up to a 4v4 slugfest, each written to stress a specific system — armor degradation, sensor stealth, the Overcharge economy, the Vow system, action economy, vertical terrain and impact damage, the wrecked-Frame endgame, electromagnetic warfare, and the full Vow system.
* 📱 **[Battle Tracker](docs/)**: A mobile web app that carries the bookkeeping for you — energy and capacitor charge, the Armor DR track and critical slots for every location, Ammo Dice, and the permanent critical effects that are easy to lose track of. It includes a guided attack resolver that walks the Combat Phase sequence — countermeasures, hit location, damage, Flank Speed and Cover rerolls, Armor DR, Overkill and cascading criticals — showing its arithmetic at each step, and two players on separate phones can share one live battle via a room code. See **[docs/README.md](docs/README.md)** to run or deploy it.

---

## 📜 License & Copyright

**Copyright (c) 2026 John Karakashian**

*Iron Protocol* is released under the **[Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License (CC BY-NC-SA 4.0)](LICENSE.md)**. 

You are entirely free to share, copy, and remix the rules to create your own homebrew content, custom frames, or campaigns, provided you credit the original project, link back to this repository, and do not use the material for commercial purposes. Any derivative works must be distributed under this same license.
