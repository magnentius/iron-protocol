// Reference view — the reference.md tables, collapsible for one-handed lookup.

import { AMMO_TYPES, CRIT_TABLES, TERRAIN, TERRAIN_KEYS, WEAPONS } from '../data/tables.js';
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

const SENSOR_ROWS = [
  ['Light Woods (2+ hexes)', 'BLOCKED', 'Clear', 'Clear'],
  ['Heavy Woods (2+ hexes)', 'BLOCKED', 'BLOCKED', 'Clear'],
  ['Urban Building', 'BLOCKED', 'BLOCKED', 'BLOCKED'],
  ['Smoke Template', 'BLOCKED', 'Clear', 'Clear'],
  ['Elevation ≥ top height', 'BLOCKED', 'BLOCKED', 'BLOCKED'],
  ['Active ECM', 'Clear', 'Clear', 'BLOCKED'],
  ['AMC — Visual', 'BLOCKED', 'Clear', 'Clear'],
  ['AMC — Infrared', 'Clear', 'BLOCKED', 'Clear'],
  ['AMC — Microwave', 'Clear', 'Clear', 'BLOCKED'],
  ['Flares', 'Clear', 'Breaks lock', 'Clear'],
];

export function render() {
  return `
    ${panel('Turn Sequence', turnSequence(), true)}
    ${panel('Hit Location — 2d6', hitTable())}
    ${panel('Critical Hit Tables — 1d6', critTables())}
    ${panel('Sensors, Stealth & Locks', sensorTable())}
    ${panel('Terrain', terrainTable())}
    ${panel('Weapons', weaponTable())}
    ${panel('Autocannon Munitions', ammoTable())}
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
    ['1. Energy', 'Every frame generates EP equal to its Reactor Rating, added to banked Capacitor charge. Pay AMC (2 EP per spectrum) and ECM (1 EP + 1 per hex) upkeep.'],
    ['2. Activation', 'Lowest initiative moves first. Walk 1 EP · Reverse 2 EP · Pivot 1 EP · Jump 2 EP per hex · climbing +1 EP. 1 EVA per hex exited, 2 per hex jumped. Free torso twist at the end.'],
    ['3. Combat', 'Highest initiative fires first, resolved instantly. Pay EP → check arc and lock → 2d6 location → damage → −EVA → −DR → Internal Structure → 1d6 critical.'],
    ['4. End', 'Bank unused EP into the Capacitor (excess is vented), clear evasion tokens, tick cooldowns and smoke down by 1.'],
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
    <p class="tiny dim">A roll of 2 bypasses Torso Armor DR entirely and still degrades it by 1. Rear attacks bypass movement evasion; side attacks cannot be deflected by flares.</p>`;
}

function critTables() {
  const names = { head: 'Head (Cockpit)', torso: 'Torso (Core)', arm: 'Arms', leg: 'Legs' };
  return Object.entries(CRIT_TABLES).map(([key, rows]) => `
    <div class="section-title" style="margin-top:.8rem">${esc(names[key])}</div>
    <table class="ref-table"><tbody>
      ${Object.entries(rows).map(([roll, c]) => `
        <tr><td class="n">${roll}</td><td><b>${esc(c.name)}</b><br><span class="muted tiny">${esc(c.text)}</span></td></tr>`).join('')}
    </tbody></table>`).join('') +
    '<p class="tiny dim">HEI ammunition adds +1 to these rolls. A modified 7+ resolves as the 6 result.</p>';
}

function sensorTable() {
  return `
    <div class="scroll-x"><table class="ref-table">
      <thead><tr><th>Blocker</th><th>Visual</th><th>Infrared</th><th>Radar</th></tr></thead>
      <tbody>${SENSOR_ROWS.map(([name, v, i, r]) => `
        <tr><td>${esc(name)}</td>${[v, i, r].map((cell) =>
          `<td class="tiny" style="color:${cell === 'Clear' ? 'var(--muted)' : 'var(--danger)'}">${esc(cell)}</td>`).join('')}</tr>`).join('')}
      </tbody>
    </table></div>
    <p class="tiny dim">Infrared locks additionally require the target to have spent 5+ EP this turn. Radar ignores woods and smoke but is blocked by solid elevation.</p>`;
}

function terrainTable() {
  return `
    <div class="scroll-x"><table class="ref-table">
      <thead><tr><th>Terrain</th><th>EP</th><th>Cover</th><th>Notes</th></tr></thead>
      <tbody>${TERRAIN_KEYS.map((key) => {
        const t = TERRAIN[key];
        const notes = [
          t.cooling ? `+${t.cooling} EP cooling` : '',
          t.evaCap != null ? `EVA cap ${t.evaCap}` : '',
          t.pilotMod ? `${t.pilotMod > 0 ? '+' : ''}${t.pilotMod} pilot checks` : '',
        ].filter(Boolean).join(', ');
        return `<tr>
          <td>${esc(t.name)}</td>
          <td class="n">${t.extraEP ? `+${t.extraEP}` : '—'}</td>
          <td class="n">${t.cover ? `+${t.cover}` : '—'}</td>
          <td class="tiny muted">${esc(notes || '—')}</td>
        </tr>`;
      }).join('')}</tbody>
    </table></div>
    <p class="tiny dim">Heavy Woods are impassable on foot to Heavy and Assault frames. Buildings are impassable at ground level and give +2 EVA to adjacent frames.</p>`;
}

function weaponTable() {
  return `
    <div class="scroll-x"><table class="ref-table">
      <thead><tr><th>Weapon</th><th>EP</th><th>Damage</th><th>Traits</th></tr></thead>
      <tbody>${Object.values(WEAPONS).map((w) => {
        const dmg = w.damage
          ? `${w.damage.dice}d${w.damage.sides}${w.damage.flat ? `+${w.damage.flat}` : ''}${w.burstDice ? ` ×${w.burstDice}` : ''}`
          : w.warheads ? 'Warhead' : '—';
        const traits = [
          w.ap && `AP ${w.ap}`, w.rapidFire && 'Rapid Fire', w.aoe && 'AoE',
          w.cooldown && `${w.cooldown}-turn cooldown`, w.overcharge && 'Overcharge',
          w.bypassesArmor && 'Bypasses DR',
        ].filter(Boolean).join(', ');
        return `<tr>
          <td>${esc(w.name)}</td><td class="n">${w.epCost}</td><td class="tiny">${esc(dmg)}</td>
          <td class="tiny muted">${esc(traits || '—')}</td>
        </tr>`;
      }).join('')}</tbody>
    </table></div>
    <p class="tiny dim">Overcharge EP must come from banked Capacitor charge and triggers a 1-turn cooldown on that weapon.</p>`;
}

function ammoTable() {
  return `<table class="ref-table"><tbody>
    ${Object.values(AMMO_TYPES).map((a) => `
      <tr><td><b>${esc(a.name)}</b></td><td class="tiny muted">${esc(a.note)}</td></tr>`).join('')}
  </tbody></table>`;
}

function movementNotes() {
  const rows = [
    ['Forward walk', '1 EP', '+1 EP per level climbed'],
    ['Reverse', '2 EP', 'Facing unchanged'],
    ['Pivot 60°', '1 EP', 'Does not count against the movement limit'],
    ['Jump jet', '2 EP per hex', 'Light and Medium only, max 4 hexes, 2 EVA per hex'],
    ['Stand up', '3 EP', 'Set leg facing freely'],
    ['Crawl pivot while prone', '2 EP', 'Per 60°'],
    ['Stand up on a severed leg', '3 EP', 'Requires a Pilot Check; EP spent even on a failure'],
    ['Pivot with a severed leg', '3 EP', 'Per 60°, the only movement left'],
    ['Torso twist', 'Free', '2 EP after a Gyro Lock critical'],
  ];
  return `
    <table class="ref-table"><tbody>
      ${rows.map(([a, c, n]) => `<tr><td>${esc(a)}</td><td class="n tiny">${esc(c)}</td><td class="tiny muted">${esc(n)}</td></tr>`).join('')}
    </tbody></table>
    <p class="tiny dim">Movement limits: Light 6 · Medium 5 · Heavy 4 · Assault 3 hexes (the Jackal is rated 7). Falling 2+ levels causes a prone landing and 1d6 damage per level.</p>
    <p class="tiny dim">Prone frames lose movement evasion, cannot torso twist, and roll one fewer damage die (minimum 1d6).</p>`;
}

function houseRulings() {
  const rulings = [
    ['Overcharge Allowance', 'Whatever sat in the Capacitor at the start of the turn caps how much EP you may spend on Overcharges that turn, however full the pool is. Bank nothing, Overcharge nothing.'],
    ['Rapid Fire and Evasion', 'Each EVA point cancels the single highest remaining die. Survivors each resolve against the Armor DR the location had when the attack began.'],
    ['Rapid Fire and armor', 'The whole attack degrades Armor DR by 1 in total and rolls one critical, however many dice got through. A burst is a single penetration event.'],
    ['One attack per weapon', 'Each mounted weapon fires once per Combat Phase, however much EP is left. Fire each of your weapons once, in any order.'],
    ['Full Auto limit', 'A maximum of 3 bursts per attack, rolling one hit location for the barrage — the only way to concentrate more rounds on a single spot.'],
    ['Disruptor Cannon', 'No damage. Bypasses Evasion and Armor DR. A Torso hit drains 1d6 EP; any other location forces a critical. Overcharge does both.'],
    ['AoE and cover', 'Area effects bypass Evasion entirely, and since terrain cover is expressed as bonus EVA, cover is bypassed too. Armor DR still applies.'],
    ['Prone damage penalty', 'Drop one damage die, keeping flat bonuses — a Rail Gun becomes 2d6+10. Rapid Fire loses a die from each burst. The Disruptor and EMP are unaffected.'],
    ['Severed leg', 'Falls prone with no check allowed, and never walks again. It may spend 3 EP on a Pilot Check to haul itself upright — success sheds every prone penalty, failure still costs the EP. Both legs gone destroys the frame.'],
    ['Collisions', 'Armor DR applies and a penetrating hit rolls a critical; Evasion does not apply. Both frames roll the moving frame’s Mass + Speed pool.'],
    ['Damage transfer', 'Excess from a severed limb, and hits on an already-severed limb, go straight to Torso Internal Structure without degrading Torso armor.'],
    ['Flares', 'Negate one attack made on an Infrared lock, from the Front or Rear zone only, declared before the hit location roll.'],
  ];
  return `<div class="log">${rulings.map(([t, d]) => `
    <div class="log-entry"><b>${esc(t)}</b><br>${esc(d)}</div>`).join('')}</div>
    <p class="tiny dim">Cases the main rules resolve explicitly in section 5.0 and the reference sheet — the ones most often argued over at the table.</p>`;
}
