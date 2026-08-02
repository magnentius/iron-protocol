// Reference view — the reference.md tables, collapsible for one-handed lookup.

import {
  AMMO_TYPES, AMMO_DIE, CRIT_TABLES, CRIT_TABLE_MAX, COUNTERMEASURE_CHECK_TN,
  TERRAIN, TERRAIN_KEYS, WEAPONS, SENSOR_BANDS, FLANK_SPEED_THRESHOLD, OVERKILL_STEP,
} from '../data/tables.js';
import { esc } from './dom.js';

const HIT_ROWS = [
  [2, 'Torso — Core Critical', 'Torso — Core Critical', 'Torso — Core Critical'],
  [3, 'Left Leg', 'Right Arm', 'Right Leg'],
  [4, 'Left Arm', 'Right Arm', 'Right Arm'],
  [5, 'Left Arm', 'Right Leg', 'Right Arm'],
  [6, 'Left Leg', 'Torso', 'Right Leg'],
  [7, 'Torso', 'Torso', 'Torso'],
  [8, 'Torso', 'Torso', 'Torso'],
  [9, 'Torso', 'Left Leg', 'Torso'],
  [10, 'Right Arm', 'Left Arm', 'Left Arm'],
  [11, 'Right Leg', 'Left Arm', 'Left Leg'],
  [12, 'Head — Sensors', 'Head — Sensors', 'Head — Sensors'],
];

// Terrain blocks outright; every deployed countermeasure only contests on a 4+.
const SENSOR_ROWS = [
  ['Light Woods (2+ hexes)', 'BLOCKED', 'Clear', 'Clear'],
  ['Heavy Woods (2+ hexes)', 'BLOCKED', 'BLOCKED', 'Clear'],
  ['Urban Building', 'BLOCKED', 'BLOCKED', 'BLOCKED'],
  ['Elevation ≥ top height', 'BLOCKED', 'BLOCKED', 'BLOCKED'],
  ['Smoke template', 'Check 4+', 'Clear', 'Clear'],
  ['IR Countermeasures', 'Clear', 'Check 4+', 'Clear'],
  ['Chaff', 'Clear', 'Clear', 'Check 4+'],
  ['Active ECM', 'Clear', 'Clear', 'Check 4+'],
  ['Adaptive Skin — Visual', 'Check 4+', 'Clear', 'Clear'],
  ['Adaptive Skin — Infrared', 'Clear', 'Check 4+', 'Clear'],
  ['Adaptive Skin — Microwave', 'Clear', 'Clear', 'Check 4+'],
];

export function render() {
  return `
    ${panel('Turn Sequence', turnSequence(), true)}
    ${panel('Hit Location — 2d6', hitTable())}
    ${panel('Critical Hit Tables', critTables())}
    ${panel('Sensors, Countermeasures & Locks', sensorTable())}
    ${panel('Terrain', terrainTable())}
    ${panel('Weapons', weaponTable())}
    ${panel('Ammo Dice', ammoTable())}
    ${panel('Movement & Falling', movementNotes())}
    ${panel('Special Resolution Cases', houseRulings())}
    <p class="tiny dim center" style="margin-top:1.5rem">
      Full rules in rules.md · Iron Protocol © 2026 John Karakashian · CC BY-NC-SA 4.0
    </p>`;
}

function panel(title, body, open = false) {
  return `
    <details class="ref" ${open ? 'open' : ''}>
      <summary>${esc(title)}</summary>
      <div class="ref-body">${body}</div>
    </details>`;
}

function turnSequence() {
  const phases = [
    ['1. Energy', 'Every frame generates EP equal to its Reactor Rating into the turn’s pool. The Capacitor is untouched — banked charge is a standing reserve that persists until spent. Pay Adaptive Skin (2 EP) and ECM (2 EP + 1 per hex of radius) upkeep.'],
    ['2. Activation', `Lowest initiative moves first. Walk 1 EP · Reverse 2 EP · Pivot 1 EP · Jump 2 EP per hex · climbing +1 EP. Exit ${FLANK_SPEED_THRESHOLD}+ hexes, or complete a 2+ hex jump, to gain Flank Speed. Free torso twist at the end.`],
    ['3. Combat', 'Highest initiative fires first, resolved instantly. Pay EP → check arc and lock → defender’s Countermeasure Check → 2d6 location → damage → Flank Speed and Cover rerolls → compare to Armor DR → criticals.'],
    ['4. End', 'Bank unused EP into the Capacitor (excess is vented), clear Flank Speed, tick cooldowns and smoke down by 1. An Electrical Fire burns one Torso critical first.'],
  ];
  return `<div class="log">${phases.map(([t, d]) => `
    <div class="log-entry"><b>${esc(t)}</b><br>${esc(d)}</div>`).join('')}</div>`;
}

function hitTable() {
  return `
    <div class="scroll-x"><table class="ref-table">
      <thead><tr><th>2d6</th><th>Left Side</th><th>Front / Rear</th><th>Right Side</th></tr></thead>
      <tbody>${HIT_ROWS.map(([roll, l, f, r]) => `
        <tr><td class="n">${roll}</td><td>${esc(l)}</td><td>${esc(f)}</td><td>${esc(r)}</td></tr>`).join('')}
      </tbody>
    </table></div>
    <p class="tiny dim">A roll of 2 treats Torso Armor DR as 0 for the whole attack, and Overkill is measured against 0. Front and Rear share a column — a rear attack finds no softer armor, it simply cannot be answered, since no weapon fires into the Rear Arc.</p>`;
}

function critTables() {
  const names = { head: 'Head (Cockpit)', torso: 'Torso (Core)', arm: 'Arms', leg: 'Legs' };
  return `
    <p class="tiny dim" style="margin-top:0">Every table climbs the same Severity Ladder:
    1 Temporary Glitch · 2 System Strain · 3 Performance Degradation ·
    <b>4 Structural Fracture (DR → 0)</b> · 5 Component Loss · 6 Catastrophic Destruction.
    A roll landing on a slot already marked <b>cascades upward</b> to the next open one.</p>
    ` + Object.entries(CRIT_TABLES).map(([key, rows]) => `
    <div class="section-title" style="margin-top:.8rem">${esc(names[key])} — ${CRIT_TABLE_MAX[key]} slots</div>
    <table class="ref-table"><tbody>
      ${Object.entries(rows).map(([slot, c]) => `
        <tr><td class="n">${slot}</td><td><b>${esc(c.name)}</b><br><span class="muted tiny">${esc(c.text)}</span></td></tr>`).join('')}
    </tbody></table>`).join('') +
    `<p class="tiny dim">The tables are different lengths. The Head stops at 5 — a cockpit hit that reaches the top kills the pilot outright. The Torso runs to 8; slots 7 and 8 cannot be rolled naturally and are reached only by cascade or by HEI’s +1.</p>`;
}

function sensorTable() {
  return `
    <div class="scroll-x"><table class="ref-table">
      <thead><tr><th>Blocker</th><th>Visual</th><th>Infrared</th><th>Radar</th></tr></thead>
      <tbody>${SENSOR_ROWS.map(([name, v, i, r]) => `
        <tr><td>${esc(name)}</td>${[v, i, r].map((cell) =>
          `<td class="tiny" style="color:${cell === 'Clear' ? 'var(--muted)' : cell === 'BLOCKED' ? 'var(--danger)' : 'var(--warn)'}">${esc(cell)}</td>`).join('')}</tr>`).join('')}
      </tbody>
    </table></div>
    <p class="tiny dim"><b>Terrain blocks outright — only the ground is reliable.</b> Every deployed countermeasure, cartridge or sustained suite alike, contests the lock on a <b>Countermeasure Check of ${COUNTERMEASURE_CHECK_TN}+</b>. A cartridge is spent whether it worked or not; a suite is never expended.</p>
    <p class="tiny dim">Infrared locks additionally require the target to have spent 5+ EP this turn — Adaptive Skin upkeep does not count toward that. Radar ignores woods and smoke but is blocked by solid elevation.</p>`;
}

function terrainTable() {
  return `
    <div class="scroll-x"><table class="ref-table">
      <thead><tr><th>Terrain</th><th>EP</th><th>Cover</th><th>Notes</th></tr></thead>
      <tbody>${TERRAIN_KEYS.map((key) => {
        const t = TERRAIN[key];
        const notes = [
          t.cooling ? `+${t.cooling} EP cooling` : '',
          t.blocksFlankSpeed ? 'no Flank Speed' : '',
          t.extinguishesFire ? 'puts out an Electrical Fire' : '',
          t.pilotMod ? `${t.pilotMod > 0 ? '+' : ''}${t.pilotMod} pilot checks` : '',
        ].filter(Boolean).join(', ');
        return `<tr>
          <td>${esc(t.name)}</td>
          <td class="n">${t.extraEP ? `+${t.extraEP}` : '—'}</td>
          <td class="n">${t.cover ? `${t.cover} reroll${t.cover > 1 ? 's' : ''}` : '—'}</td>
          <td class="tiny muted">${esc(notes || '—')}</td>
        </tr>`;
      }).join('')}</tbody>
    </table></div>
    <p class="tiny dim">Cover lets the defender force rerolls of the attacker’s damage dice, and stacks with the one Flank Speed grants. Heavy Woods are impassable on foot to Heavy and Assault frames; buildings are impassable at ground level and give Heavy Cover to adjacent frames.</p>`;
}

function weaponTable() {
  return `
    <div class="scroll-x"><table class="ref-table">
      <thead><tr><th>Weapon</th><th>EP</th><th>Lock</th><th>Damage</th><th>Traits</th></tr></thead>
      <tbody>${Object.values(WEAPONS).map((w) => {
        const dmg = w.damage
          ? `${w.damage.dice}d6${w.burstDice ? ` ×${w.burstDice}` : ''}`
          : w.warheads ? 'Warhead' : 'None';
        const band = w.detection === 'guidance' ? 'seeker' : w.detection === 'any' ? 'any' : (SENSOR_BANDS[w.detection] || w.detection);
        const traits = [
          w.ap && `AP ${w.ap}`, w.rapidFire && 'Rapid Fire', w.aoe && 'AoE',
          w.requiresOvercharge && `must Overcharge +${w.requiresOvercharge}`,
          w.cooldown && `${w.cooldown}-turn cooldown`,
          w.overcharge?.epPerDie && `+1d6 per ${w.overcharge.epPerDie} EP, max +${w.overcharge.maxDice}`,
          w.bypassesArmor && 'ignores Armor DR',
          w.bypassesFlankSpeed && 'ignores Flank Speed',
        ].filter(Boolean).join(', ');
        return `<tr>
          <td>${esc(w.name)}</td>
          <td class="n">${w.epCost}${w.requiresOvercharge ? `+${w.requiresOvercharge}` : ''}</td>
          <td class="tiny">${esc(band)}</td>
          <td class="tiny">${esc(dmg)}</td>
          <td class="tiny muted">${esc(traits || '—')}</td>
        </tr>`;
      }).join('')}</tbody>
    </table></div>
    <p class="tiny dim">Overcharge EP must come from banked Capacitor charge and triggers a 1-turn cooldown. Overcharge always adds <b>dice</b>, never a flat bonus — a flat increase would sit outside the reroll system entirely.</p>`;
}

function ammoTable() {
  const rows = [
    ['Autocannon — single burst', AMMO_DIE.autocannonSingle.empty, AMMO_DIE.autocannonSingle.expect],
    ['Autocannon — Full Auto', AMMO_DIE.autocannonFullAuto.empty, AMMO_DIE.autocannonFullAuto.expect],
    ['Guided Missiles', AMMO_DIE.guidedMissiles.empty, AMMO_DIE.guidedMissiles.expect],
    ['Chaff / Smoke', AMMO_DIE.countermeasure.empty, AMMO_DIE.countermeasure.expect],
    ['Jump Jet propellant', AMMO_DIE.jumpJets.empty, AMMO_DIE.jumpJets.expect],
  ];
  return `
    <table class="ref-table">
      <thead><tr><th>System</th><th>Empty on</th><th>Expect</th></tr></thead>
      <tbody>${rows.map(([name, empty, expect]) => `
        <tr><td>${esc(name)}</td><td class="n">${empty === 1 ? '1' : `1–${empty}`}</td><td class="tiny muted">${esc(expect)}</td></tr>`).join('')}
      </tbody>
    </table>
    <p class="tiny dim">Roll the Ammo Die after the attack resolves. At or below the number, that system is <b>Empty for the rest of the battle</b> — nothing reloads in the field. An empty gun is also a safer one: the Torso Ammo Explosion only detonates if a volatile store remains.</p>
    <div class="section-title" style="margin-top:.8rem">Autocannon Munitions</div>
    <table class="ref-table"><tbody>
      ${Object.values(AMMO_TYPES).map((a) => `
        <tr><td><b>${esc(a.name)}</b></td><td class="tiny muted">${esc(a.note)}</td></tr>`).join('')}
    </tbody></table>
    <p class="tiny dim">A single munition type is chosen at build time.</p>`;
}

function movementNotes() {
  const rows = [
    ['Forward walk', '1 EP', '+1 EP per level climbed, plus terrain'],
    ['Reverse', '2 EP', 'Facing unchanged'],
    ['Pivot 60°', '1 EP', 'Does not count against the movement limit'],
    ['Jump jet', '2 EP per hex', 'Light and Medium only, max 4 hexes. No terrain or climbing surcharge at all.'],
    ['Stand up', '3 EP', 'Set leg facing freely'],
    ['Crawl pivot while prone', '2 EP', 'Per 60°'],
    ['Stand up on a crippled leg', '3 EP', 'Pilot Check at −2; the EP is spent even on a failure'],
    ['Pivot with a severed leg', '3 EP', 'Per 60°, the only movement left'],
    ['Torso twist', 'Free', '2 EP after a Servo Lock critical'],
  ];
  return `
    <table class="ref-table"><tbody>
      ${rows.map(([a, c, n]) => `<tr><td>${esc(a)}</td><td class="n tiny">${esc(c)}</td><td class="tiny muted">${esc(n)}</td></tr>`).join('')}
    </tbody></table>
    <p class="tiny dim">Movement limits: Light 7 · Medium 5 · Heavy 4 · Assault 3 hexes. An Assault chassis is capped one hex short of the Flank Speed threshold and can never reach it — it survives on Armor DR and terrain alone.</p>
    <p class="tiny dim">Falling 2+ levels lands the frame Prone and rolls <b>1d6 per level as a single pooled roll</b>, against a random location. Prone frames cannot gain Flank Speed, cannot torso twist, and roll one fewer damage die (minimum 1d6).</p>`;
}

function houseRulings() {
  const rulings = [
    ['Armor DR is a threshold', `Damage must be <b>strictly greater</b> than DR to do anything at all. Equal or less and the plate simply holds — no partial damage, no degradation. A penetration costs that location 1 DR permanently.`],
    ['Overkill Margin', `One critical die on any penetration, plus one more for every ${OVERKILL_STEP} full points of excess. Rapid Fire never uses it.`],
    ['Cascading Failure', 'A critical landing on a slot already marked climbs to the next unmarked one. If it climbs past the top of the table, the top result applies.'],
    ['Overcharge', 'Paid exclusively from the Capacitor, so whatever it currently holds is your ceiling — no separate allowance to track. An empty Capacitor cannot Overcharge, however full the pool. Paying ordinary costs out of the reserve spends the same charge.'],
    ['Rapid Fire', 'Every die is tested separately against the DR the location had when the attack was declared. Each <b>burst</b> that puts at least one round through generates one critical — not one per die. Armor degrades by 1 in total however many got through.'],
    ['One attack per weapon', 'Each mounted weapon fires once per Combat Phase, however much EP is left. Fire each of your weapons once, in any order.'],
    ['Full Auto limit', 'A maximum of 3 bursts per attack, rolling one hit location for the barrage — and the belt runs Empty on 1–3 instead of 1.'],
    ['Disruptor Cannon', 'No damage at all. Ignores Armor DR and Flank Speed. Every hit forces a critical on the location rolled and drains 1d6 EP. Needs a Radar lock like anything else.'],
    ['AoE and cover', 'Area effects bypass Flank Speed and Cover both. Armor DR still applies normally.'],
    ['Prone damage penalty', 'Drop one damage die, to a minimum of one. Rapid Fire loses a die from each burst. Weapons that roll no dice are unaffected.'],
    ['Crippled legs', 'A severed leg or a destroyed actuator both impose <b>−2 on every Pilot Check</b>. A severed leg falls prone with no check allowed and never walks again; it may spend 3 EP on a check to haul itself upright. Both legs gone destroys the frame.'],
    ['Collisions', 'Flat damage: the moving frame’s Mass Value × Speed, suffered by <b>both</b> frames. Armor DR applies and a penetration rolls criticals; Flank Speed does not apply.'],
    ['Damage transfer', 'A hit on an already-severed limb goes straight to the Torso and is resolved against Torso DR normally. Flank Speed grants no rerolls against it; Cover still does.'],
    ['Ammo Explosion', 'Only detonates if a volatile store remains — live shells, loaded warheads, or jump propellant. Rail Gun slugs are inert. With nothing to cook off, apply Reactor Damage instead.'],
  ];
  return `<div class="log">${rulings.map(([t, d]) => `
    <div class="log-entry"><b>${esc(t)}</b><br>${d}</div>`).join('')}</div>
    <p class="tiny dim">The cases most often argued over at the table, resolved explicitly in rules.md sections 2.3, 5.0 and 6.</p>`;
}
