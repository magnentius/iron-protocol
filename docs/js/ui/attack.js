// Guided attack resolver — walks the Combat Phase sequence from rules.md 2.3.
//
// An attacker never rolls for accuracy in Iron Protocol, so this flow is the
// bulk of the game's bookkeeping. Every die can be rolled by the app or
// corrected by tapping it, because players will often have rolled real dice.
//
// The sequence, and where each step lives below:
//   1-3  attacker, target, weapon           stepPicker
//   4    defender's countermeasures         stepCountermeasures   (4+ or the shot lands)
//   5    hit location                       stepRolls
//   6    damage                             stepRolls
//   7    Flank Speed / Cover rerolls        stepRerolls           (defender's choice)
//   8-10 Armor DR, degradation, criticals   stepPreview → applyAttack

import { HIT_ZONES, LOCATION_NAMES, MAX_FULL_AUTO_BURSTS, SENSOR_BANDS, TERRAIN, WEAPONS, overkillDice } from '../data/tables.js';
import * as R from '../rules.js';
import { framesList, getBattle, getFrame, logBattle, logFrame, mutate, myFrames } from '../state.js';
import { chip, cls, empty, esc, toast } from './dom.js';

const BLANK = {
  attackerId: null,
  targetId: null,
  weaponId: null,
  bursts: 1,
  overchargeDice: 0,   // extra d6 bought with capacitor charge
  zone: 'front',
  cm: null,            // { key, kind, rolled, negated } once the defender has tried
  cmDeclined: false,
  locationDice: null,  // [d1, d2]
  damageDice: null,    // number[]
  rerolled: 0,
  stage: 'setup',      // setup → rolled → applied
  result: null,
};

const state = { ...BLANK };

export function reset() {
  Object.assign(state, BLANK);
}

// --- Derived ------------------------------------------------------------------

function attacker() { return state.attackerId ? getFrame(state.attackerId) : null; }
function target() { return state.targetId ? getFrame(state.targetId) : null; }
function weapon() {
  const a = attacker();
  return a && state.weaponId ? a.weapons.find((w) => w.id === state.weaponId) : null;
}
function weaponDef() {
  const w = weapon();
  return w ? WEAPONS[w.key] : null;
}
function isKind(kind) {
  const def = weaponDef();
  const w = weapon();
  if (!def) return false;
  if (kind === 'cluster' || kind === 'emp' || kind === 'he') return def.warheads && w.warhead === kind;
  if (kind === 'rapid') return Boolean(def.rapidFire);
  if (kind === 'disruptor') return Boolean(def.disruptor);
  return false;
}

function locationTotal() {
  return state.locationDice ? state.locationDice[0] + state.locationDice[1] : null;
}
function hitLocation() {
  const total = locationTotal();
  return total ? R.lookupHitLocation(total, state.zone) : null;
}

/** Overcharge EP: whatever the weapon mandates, plus what the player bought. */
function overchargeEP() {
  const def = weaponDef();
  if (!def) return 0;
  const mandatory = def.requiresOvercharge || 0;
  const bought = state.overchargeDice * (def.overcharge?.epPerDie || 0);
  return mandatory + bought;
}

function totalCost() {
  const a = attacker();
  const w = weapon();
  if (!a || !w) return 0;
  return R.weaponEPCost(a, w, { bursts: state.bursts, overcharge: overchargeEP() }).total;
}

function apFor() {
  const def = weaponDef();
  const w = weapon();
  if (def?.ap) return def.ap;
  if (w?.ammoType) return R.ammoTypeInfo(w.ammoType)?.ap || 0;
  return 0;
}

function critModFor() {
  const w = weapon();
  return w?.ammoType ? (R.ammoTypeInfo(w.ammoType)?.critMod || 0) : 0;
}

// --- Render ---------------------------------------------------------------------

export function render() {
  const battle = getBattle();
  const mine = myFrames().filter((f) => !R.isDestroyed(f));
  const enemies = framesList().filter((f) => !R.isDestroyed(f) && f.id !== state.attackerId);

  if (!mine.length) return empty('No frames to fire with', 'Deploy a frame before resolving attacks.');
  if (!enemies.length && !state.attackerId) {
    return empty('No targets', 'Add an opposing frame, or join a shared battle so both lances are on the board.');
  }
  if (state.stage === 'applied') return renderResult();

  return `
    ${battle.phase !== 'combat' ? `
      <div class="card" style="border-color:#4a3a1c">
        <div class="small"><b>Not the Combat Phase.</b> You can still resolve an attack — the tracker will not stop you.</div>
      </div>` : ''}

    ${stepPicker()}
    ${state.weaponId ? stepZone() : ''}
    ${state.weaponId ? stepCountermeasures() : ''}
    ${state.weaponId && !negated() ? stepRolls() : ''}
    ${state.stage === 'rolled' ? stepRerolls() : ''}
    ${state.stage === 'rolled' ? stepPreview() : ''}
  `;
}

function negated() {
  return Boolean(state.cm?.negated);
}

function step(n, title, active, done, body) {
  return `
    <div class="step ${cls(active && 'active', done && 'done')}" style="margin-bottom:1rem">
      <div class="step-title">${n}. ${esc(title)}</div>
      ${body}
    </div>`;
}

function stepPicker() {
  const mine = myFrames().filter((f) => !R.isDestroyed(f));
  const targets = framesList().filter((f) => !R.isDestroyed(f) && f.id !== state.attackerId);
  const a = attacker();

  const attackerPick = `
    <div class="row wrap" style="gap:.35rem">
      ${mine.map((f) => `
        <button class="btn sm ${f.id === state.attackerId ? 'primary' : ''}"
          data-action="pick-attacker" data-frame="${f.id}">
          ${esc(f.callsign)} <span class="dim">${f.ep} EP</span>
        </button>`).join('')}
    </div>`;

  const targetPick = !state.attackerId ? '' : `
    <div class="row wrap" style="gap:.35rem">
      ${targets.length ? targets.map((f) => `
        <button class="btn sm ${f.id === state.targetId ? 'primary' : ''}"
          data-action="pick-target" data-frame="${f.id}">
          ${esc(f.callsign)}${f.flankSpeed ? ' <span class="dim">Flank</span>' : ''}
        </button>`).join('') : '<span class="small muted">No available targets.</span>'}
    </div>`;

  const weaponPick = !state.targetId ? '' : `
    <div style="display:grid;gap:.4rem">
      ${a.weapons.map((w) => weaponOption(a, w)).join('')}
    </div>
    ${state.weaponId ? weaponOptions() : ''}`;

  return `
    ${step(1, 'Attacker', !state.attackerId, !!state.attackerId, attackerPick)}
    ${state.attackerId ? step(2, 'Target', !state.targetId, !!state.targetId, targetPick) : ''}
    ${state.targetId ? step(3, 'Weapon', !state.weaponId, !!state.weaponId, weaponPick) : ''}`;
}

function weaponOption(frame, w) {
  const def = WEAPONS[w.key];
  const selected = w.id === state.weaponId;
  const blocked = R.weaponBlockedReason(frame, w, {
    bursts: selected ? state.bursts : 1,
    overcharge: selected ? overchargeEP() : (def.requiresOvercharge || 0),
  });
  const cost = R.weaponEPCost(frame, w, { bursts: 1 });
  const band = R.weaponBand(w);

  return `
    <button class="btn ${selected ? 'primary' : ''}" data-action="pick-weapon" data-weapon="${w.id}"
      ${blocked ? 'disabled' : ''} style="justify-content:flex-start;text-align:left;height:auto;padding:.6rem .8rem">
      <div style="width:100%">
        <div class="row between">
          <span style="font-weight:600">${esc(def.name)}</span>
          <span class="small ${selected ? '' : 'dim'}">${cost.base} EP</span>
        </div>
        <div class="tiny ${selected ? '' : 'dim'}" style="opacity:.85">
          ${esc(LOCATION_NAMES[w.loc])}${band && band !== 'any' ? ` · ${esc(SENSOR_BANDS[band] || band)}` : ''}${w.empty ? ' · EMPTY' : ''}${blocked ? ` · ${esc(blocked)}` : ''}
        </div>
      </div>
    </button>`;
}

/** Burst count, warhead and Overcharge selectors for the chosen weapon. */
function weaponOptions() {
  const w = weapon();
  const def = weaponDef();
  const a = attacker();
  const rows = [];

  if (def.rapidFire) {
    const affordable = Math.max(1, Math.floor(a.ep / Math.max(def.epCost, 1)));
    const maxBursts = Math.min(MAX_FULL_AUTO_BURSTS, affordable);
    rows.push(`
      <div class="tiny dim" style="margin:.6rem 0 .25rem">
        Bursts — Full Auto pays the EP cost per burst and burns the belt three times as fast
        (Ammo Die Empty on 1-3 instead of 1)
      </div>
      <div class="row wrap" style="gap:.35rem">
        ${Array.from({ length: maxBursts }, (_, i) => i + 1).map((n) => `
          <button class="btn sm ${state.bursts === n ? 'primary' : ''}" data-action="pick-bursts" data-n="${n}">
            ${n === 1 ? 'Single' : `${n}×`}
          </button>`).join('')}
      </div>`);
  }

  if (def.warheads) {
    rows.push(`
      <div class="tiny dim" style="margin:.6rem 0 .25rem">Warhead</div>
      <div>${chip(esc(def.warheads[w.warhead].name))} <span class="tiny dim">${esc(warheadHint(w.warhead))}</span></div>`);
  }

  if (def.overcharge?.epPerDie) {
    const per = def.overcharge.epPerDie;
    rows.push(`
      <div class="tiny dim" style="margin:.6rem 0 .25rem">
        Overcharge — ${per} EP per extra die, max +${def.overcharge.maxDice}d6, paid from banked
        Capacitor charge (${a.capacitor || 0} banked). Triggers a 1-turn cooldown.
      </div>
      <div class="row wrap" style="gap:.35rem">
        ${Array.from({ length: def.overcharge.maxDice + 1 }, (_, n) => `
          <button class="btn sm ${state.overchargeDice === n ? 'primary' : ''}"
            data-action="pick-overcharge" data-n="${n}"
            ${n * per > (a.capacitor || 0) ? 'disabled' : ''}>
            ${n === 0 ? 'None' : `+${n}d6`}
          </button>`).join('')}
      </div>`);
  }

  if (def.requiresOvercharge) {
    rows.push(`<div class="tiny" style="color:var(--warn);margin-top:.5rem">
      Cannot fire without a mandatory +${def.requiresOvercharge} EP Overcharge drawn from the Capacitor.</div>`);
  }

  const cost = totalCost();
  rows.push(`
    <div class="math" style="margin-top:.7rem">
      <div>Total cost <span class="final">${cost} EP</span> — ${esc(a.callsign)} has ${a.ep} EP in pool${(a.capacitor || 0) ? ` + ${a.capacitor} banked` : ''}</div>
      ${cost > R.availableEP(a) ? '<div style="color:var(--danger)">Not enough energy</div>' : ''}
      ${overchargeEP() > (a.capacitor || 0) ? '<div style="color:var(--danger)">Overcharge must come from the Capacitor — not enough banked</div>' : ''}
    </div>`);

  return rows.join('');
}

function warheadHint(key) {
  return {
    he: '3d6 to the hit location, 1d6 splash to each adjacent location',
    cluster: 'Three locations, one per column, 2d6 to each',
    emp: 'No damage — a Critical on every location already at 0 Armor DR',
  }[key] || '';
}

function stepZone() {
  if (isKind('emp')) {
    return step(4, 'Hit Zone', false, true,
      `<div class="small muted">Not needed — the pulse covers seven hexes and every Frame in
       them takes the same Sensor Critical. Resolve each one caught separately, your own
       included.</div>`);
  }
  if (isKind('cluster')) {
    return step(4, 'Hit Zone', false, true,
      '<div class="small muted">Not needed — this warhead covers the whole chassis.</div>');
  }
  return step(4, 'Hit Zone', !state.locationDice, !!state.locationDice, `
    <div class="row wrap" style="gap:.35rem">
      ${Object.entries(HIT_ZONES).map(([key, label]) => `
        <button class="btn sm ${state.zone === key ? 'primary' : ''}" data-action="pick-zone" data-zone="${key}">
          ${esc(label)}
        </button>`).join('')}
    </div>
    <div class="tiny dim" style="margin-top:.5rem">
      Front and Rear share a hit-location column — a rear attack finds no softer armor,
      it simply cannot be answered, since no weapon fires into the Rear Arc.
    </div>`);
}

/**
 * The defender's chance to break the lock. Every deployed countermeasure —
 * cartridge or sustained suite — negates the attack on a 4+ (rules.md 4.2).
 */
function stepCountermeasures() {
  const t = target();
  const band = R.weaponBand(weapon());
  const options = band && band !== 'any' ? R.availableCountermeasures(t, band) : [];

  if (!options.length) {
    return step(5, 'Countermeasures', false, true, `
      <div class="small muted">
        ${band && band !== 'any'
          ? `${esc(t.callsign)} has nothing that answers a ${esc(SENSOR_BANDS[band] || band)} lock.`
          : 'This weapon will take any lock — no single countermeasure answers it.'}
      </div>`);
  }

  if (state.cm) {
    return step(5, 'Countermeasures', false, true, `
      <div class="math">
        <div>${esc(labelFor(state.cm.key))} — rolled <b>${state.cm.rolled}</b> vs 4+</div>
        <div class="final" style="color:${state.cm.negated ? 'var(--ok)' : 'var(--danger)'}">
          ${state.cm.negated ? 'Lock broken — the attack is negated entirely' : 'The attacker burns through'}
        </div>
        ${state.cm.ammo ? `<div>Ammo Die ${state.cm.ammo.rolled} — ${state.cm.ammo.empty ? 'launcher is now EMPTY' : 'charges remain'}</div>` : ''}
      </div>
      ${state.cm.negated ? `
        <button class="btn primary block" data-action="new-attack" style="margin-top:.7rem">Attack negated — resolve another</button>` : ''}`);
  }

  return step(5, 'Countermeasures', true, false, `
    <div class="tiny dim" style="margin-bottom:.5rem">
      ${esc(t.callsign)} may contest this ${esc(SENSOR_BANDS[band] || band)} lock. A cartridge is
      spent whether it works or not; a sustained suite is never expended.
    </div>
    <div class="row wrap" style="gap:.35rem">
      ${options.map((o) => `
        <button class="btn sm" data-action="use-cm" data-key="${o.key}" data-kind="${o.kind}">
          ${esc(labelFor(o.key))} <span class="dim">${
            o.kind === 'cartridge' ? 'cartridge' : o.kind === 'powered' ? `${o.ep} EP` : 'sustained'
          }</span>
        </button>`).join('')}
      <button class="btn sm ghost" data-action="decline-cm">Let it through</button>
    </div>`);
}

/** Where a defender's rerolls come from, for the blurb above the dice. */
function rerollSources(t, def) {
  const out = [];
  if (t.flankSpeed && !def.rapidFire && !t.prone) out.push('Flank Speed 1');
  const cover = R.rerollAllowance({ ...t, flankSpeed: false, loyaltyCover: 0 }, {});
  if (cover) out.push(`Cover ${cover}`);
  if (t.loyaltyCover) out.push(`Vow of Loyalty ${t.loyaltyCover}`);
  return out.length ? out : ['none'];
}

function labelFor(key) {
  return { dircm: 'IR Countermeasures', chaff: 'Chaff', smoke: 'Smoke', ecm: 'ECM Suite', adaptiveSkin: 'Adaptive Skin' }[key] || key;
}

function stepRolls() {
  const a = attacker();
  const cluster = isKind('cluster');
  const emp = isKind('emp');

  if (emp) {
    return step(6, 'Detonate', state.stage === 'setup', state.stage !== 'setup', `
      <div class="small muted" style="margin-bottom:.6rem">
        EMP deals no damage. Every location on the target already stripped to 0 Armor DR takes a Critical,
        the Datalink is severed, and sensors are scrambled for a turn.
      </div>
      <button class="btn primary block" data-action="roll-attack">Detonate EMP</button>`);
  }

  const locationBlock = cluster ? '' : `
    <div class="tiny dim" style="margin-bottom:.3rem">Hit location — 2d6 (tap a die to correct it)</div>
    <div class="row" style="gap:.4rem;margin-bottom:.6rem">
      ${(state.locationDice || [0, 0]).map((d, i) => `
        <button class="die" data-action="bump-loc-die" data-index="${i}" ${d ? '' : 'disabled'}>${d || '·'}</button>`).join('')}
      ${state.locationDice ? `
        <div class="grow row" style="gap:.5rem">
          <b class="mono">${locationTotal()}</b>
          <span>${esc(LOCATION_NAMES[hitLocation().location])}</span>
          ${hitLocation().coreCritical ? chip('Core Critical', 'danger') : ''}
          ${hitLocation().headHit ? chip('Sensors', 'warn') : ''}
        </div>` : ''}
    </div>`;

  const damageBlock = !state.damageDice?.length ? '' : `
    <div class="tiny dim" style="margin-bottom:.3rem">${esc(damageLabel())} (tap a die to correct it)</div>
    <div class="row wrap" style="gap:.4rem">
      ${state.damageDice.map((d, i) => `
        <button class="die" data-action="bump-dmg-die" data-index="${i}">${d}</button>`).join('')}
    </div>`;

  return step(6, 'Roll', state.stage === 'setup', state.stage !== 'setup', `
    ${locationBlock}
    ${damageBlock}
    <button class="btn ${state.stage === 'setup' ? 'primary' : ''} block" data-action="roll-attack" style="margin-top:.6rem">
      ${state.stage === 'setup' ? 'Roll Attack' : 'Re-roll'}
    </button>`);
}

function damageLabel() {
  const a = attacker();
  const w = weapon();
  const def = weaponDef();
  const prone = a.prone ? ' — Prone, one die fewer' : '';

  if (isKind('rapid')) {
    const perBurst = Math.max(1, 3 - (a.prone ? 1 : 0));
    return `Damage — ${state.bursts} burst${state.bursts > 1 ? 's' : ''} × ${perBurst}d6, each die tested separately${prone}`;
  }
  if (isKind('cluster')) return `Damage — 2d6 against each of three locations${prone}`;
  if (isKind('he')) return `Damage — 3d6 primary${prone}`;
  if (isKind('disruptor')) return 'Disruptor — no damage dice at all';
  return `Damage — ${R.damageDiceCount(a, w, { overchargeDice: state.overchargeDice })}d6${prone}`;
}

/**
 * The defender's rerolls. Flank Speed grants one, Cover one or two, and they
 * stack; AoE and Rapid Fire bypass some or all of it. Rerolls are optional and
 * the defender picks the dice, so this is a manual step.
 */
function stepRerolls() {
  const t = target();
  const def = weaponDef();
  if (!state.damageDice?.length || isKind('disruptor')) return '';

  const allowance = R.rerollAllowance(t, {
    aoe: Boolean(def.aoe),
    rapidFire: Boolean(def.rapidFire),
  });
  const left = allowance - state.rerolled;

  if (!allowance) {
    return step(7, 'Rerolls', false, true, `
      <div class="small muted">
        ${def.aoe ? 'AoE bypasses Flank Speed and Cover both.'
          : def.rapidFire ? 'Rapid Fire bypasses Flank Speed; this target has no Cover either.'
          : `${esc(t.callsign)} is in ${esc(TERRAIN[t.terrain].name)} — no Cover — and has no Flank Speed.`}
      </div>`);
  }

  return step(7, 'Rerolls', left > 0, left === 0, `
    <div class="tiny dim" style="margin-bottom:.4rem">
      ${esc(t.callsign)} is in <b>${esc(TERRAIN[t.terrain].name)}</b> and may force <b>${left}</b> more
      reroll${left === 1 ? '' : 's'} of ${allowance} (${esc(rerollSources(t, def).join(' + '))}).
      Rerolls are optional — never reroll a die that is already low.
    </div>
    <div class="row wrap" style="gap:.4rem">
      ${state.damageDice.map((d, i) => `
        <button class="die" data-action="reroll-die" data-index="${i}" ${left > 0 ? '' : 'disabled'}>${d}</button>`).join('')}
    </div>`);
}

/** Show the arithmetic before committing, so an opponent can audit it. */
function stepPreview() {
  const t = target();
  const def = weaponDef();
  const loc = hitLocation();
  const lines = [];

  if (isKind('disruptor')) {
    lines.push('Ignores Armor DR and Flank Speed entirely');
    lines.push(`Forces a Critical on ${esc(LOCATION_NAMES[loc.location])}${state.overchargeDice ? ' — twice, Overcharged' : ''}`);
    lines.push('Drains 1d6 EP from the target');
  } else if (isKind('emp')) {
    const bare = Object.entries(t.locations).filter(([, l]) => !l.destroyed && l.dr === 0);
    lines.push(bare.length
      ? `Criticals on ${bare.map(([k]) => LOCATION_NAMES[k]).join(', ')} — every location at 0 DR`
      : 'No location is at 0 Armor DR, so the pulse does no lasting harm');
    lines.push('Sensors scrambled for a turn, Tactical Datalink severed');
  } else if (isKind('cluster')) {
    lines.push('Three locations, one per column, 2d6 to each — rolled on apply');
    lines.push('AoE: bypasses Flank Speed and Cover, but Armor DR applies normally');
  } else if (isKind('rapid')) {
    const apX = apFor();
    const dr = Math.max(0, t.locations[loc.location].dr - apX);
    const through = state.damageDice.filter((d) => d > dr).length;
    const burstsThrough = countBurstsThrough(dr);
    lines.push(`${state.damageDice.length} dice, each tested separately vs DR ${dr}${apX ? ` (${t.locations[loc.location].dr} − AP ${apX})` : ''}`);
    lines.push(`${through} round${through === 1 ? '' : 's'} through`);
    lines.push(`<span class="final">${burstsThrough} Critical${burstsThrough === 1 ? '' : 's'}</span> — one per burst that landed a round, never Overkill`);
    if (burstsThrough) lines.push('Armor degrades by 1 in total, however many got through');
  } else {
    const total = R.sum(state.damageDice);
    const apX = apFor();
    const core = loc.coreCritical;
    const dr = core ? 0 : Math.max(0, t.locations[loc.location].dr - apX);
    lines.push(`${state.damageDice.join(' + ')} = ${total} damage`);
    if (core) lines.push('Core Critical — Torso Armor DR counts as 0 for this whole attack');
    else if (apX) lines.push(`Armor DR ${t.locations[loc.location].dr} − AP ${apX} = ${dr}`);
    if (total <= dr) {
      lines.push(`<span class="final">${total} vs DR ${dr} — the armor holds. No damage, no degradation.</span>`);
    } else {
      const excess = total - dr;
      const dice = overkillDice(excess);
      lines.push(`${total} vs DR ${dr} — penetrates, excess ${excess}`);
      lines.push(`${LOCATION_NAMES[loc.location]} DR ${t.locations[loc.location].dr} → ${Math.max(0, t.locations[loc.location].dr - 1)}, permanently`);
      lines.push(`<span class="final">${dice} Critical${dice === 1 ? '' : 's'}</span>${excess >= 5 ? ` — Overkill adds ${dice - 1}` : ''}`);
    }
  }
  if (critModFor()) lines.push(`HEI adds +1 to every Critical roll from this weapon`);

  return step(8, 'Confirm', true, false, `
    <div class="math">${lines.map((l) => `<div>${l}</div>`).join('')}</div>
    <div class="row" style="gap:.5rem;margin-top:.7rem">
      <button class="btn grow" data-action="cancel-attack">Cancel</button>
      <button class="btn grow primary" data-action="apply-attack">Apply</button>
    </div>`);
}

/** How many bursts landed at least one round — one Critical each (rules.md 5.0). */
function countBurstsThrough(dr) {
  let n = 0;
  for (let b = 0; b < state.bursts; b += 1) {
    const slice = state.damageDice.slice(b * 3, b * 3 + 3);
    if (slice.some((d) => d > dr)) n += 1;
  }
  return n;
}

// --- Result ---------------------------------------------------------------------

function renderResult() {
  const res = state.result;
  const t = getFrame(state.targetId);
  const kind = res.killed ? 'kill' : res.crits.length ? 'hit' : 'blocked';

  return `
    <div class="result-banner ${kind}">
      <h3>${esc(res.headline)}</h3>
      <div class="small muted">${esc(res.subhead)}</div>
    </div>

    <div class="math" style="margin-bottom:.8rem">
      ${res.steps.map((s) => `<div>${esc(s)}</div>`).join('')}
    </div>

    ${res.crits.length ? `
      <div class="section-title">Critical Hits (${res.crits.length})</div>
      ${res.crits.map((c) => `
        <div class="card" style="border-color:#4a3a1c">
          <div class="row between">
            <b>${esc(c.name)}</b>
            <span class="chip warn">${esc(LOCATION_NAMES[c.location])} · slot ${c.slot}${c.cascaded ? ' (cascaded)' : ''}</span>
          </div>
          <div class="small muted" style="margin-top:.3rem">${esc(c.text)}</div>
          ${(c.notes || []).map((n) => `<div class="tiny" style="color:var(--warn);margin-top:.3rem">${esc(n)}</div>`).join('')}
        </div>`).join('')}` : ''}

    <div class="section-title">${esc(t.callsign)} after the hit</div>
    <div class="card tight">
      ${Object.entries(t.locations).map(([key, loc]) => {
        const marked = Object.keys(loc.crits || {}).length;
        return `
        <div class="row between small" style="padding:.25rem 0">
          <span class="${loc.destroyed ? 'dim' : ''}">${esc(LOCATION_NAMES[key])}</span>
          <span class="mono ${loc.destroyed ? 'dim' : ''}">
            ${loc.destroyed ? 'destroyed' : `DR ${loc.dr}/${loc.drMax} · ${marked} crit${marked === 1 ? '' : 's'}`}
          </span>
        </div>`;
      }).join('')}
    </div>

    <button class="btn primary block" data-action="new-attack" style="margin-top:.8rem">Resolve Another Attack</button>
  `;
}

// --- Actions -----------------------------------------------------------------------

export function handle(action, el) {
  switch (action) {
    case 'pick-attacker':
      state.attackerId = el.dataset.frame;
      state.weaponId = null;
      state.targetId = null;
      resetRolls();
      return true;

    case 'pick-target':
      state.targetId = el.dataset.frame;
      state.weaponId = null;
      resetRolls();
      return true;

    case 'pick-weapon': {
      state.weaponId = el.dataset.weapon;
      state.bursts = 1;
      state.overchargeDice = 0;
      resetRolls();
      return true;
    }

    case 'pick-bursts': state.bursts = Number(el.dataset.n); resetRolls(); return true;
    case 'pick-overcharge': state.overchargeDice = Number(el.dataset.n); resetRolls(); return true;
    case 'pick-zone': state.zone = el.dataset.zone; resetRolls(); return true;

    case 'use-cm': {
      const t = target();
      const cm = { key: el.dataset.key, kind: el.dataset.kind };
      const res = mutate(() => R.useCountermeasure(t, cm));
      state.cm = { ...cm, ...res };
      mutate(() => logFrame(t, `${labelFor(cm.key)}: rolled ${res.rolled} vs 4+ — ${res.negated ? 'lock broken' : 'burned through'}`));
      toast(res.negated ? 'Lock broken — attack negated' : 'The attacker burns through', res.negated ? 'ok' : 'error');
      return true;
    }

    case 'decline-cm':
      state.cmDeclined = true;
      state.cm = { key: null, kind: null, rolled: null, negated: false, declined: true };
      return true;

    case 'roll-attack': rollAttack(); return true;

    case 'bump-loc-die': {
      const i = Number(el.dataset.index);
      state.locationDice[i] = (state.locationDice[i] % 6) + 1;
      return true;
    }
    case 'bump-dmg-die': {
      const i = Number(el.dataset.index);
      state.damageDice[i] = (state.damageDice[i] % 6) + 1;
      return true;
    }

    case 'reroll-die': {
      const t = target();
      const def = weaponDef();
      const allowance = R.rerollAllowance(t, { aoe: Boolean(def.aoe), rapidFire: Boolean(def.rapidFire) });
      if (state.rerolled >= allowance) { toast('No rerolls left', 'error'); return true; }
      const i = Number(el.dataset.index);
      const before = state.damageDice[i];
      state.damageDice[i] = R.rollDie(6);
      state.rerolled += 1;
      toast(`Rerolled ${before} → ${state.damageDice[i]}`);
      return true;
    }

    case 'cancel-attack': resetRolls(); return true;
    case 'apply-attack': applyAttack(); return true;
    case 'new-attack': {
      const attackerId = state.attackerId;
      reset();
      state.attackerId = attackerId;
      return true;
    }

    default: return false;
  }
}

function resetRolls() {
  state.stage = 'setup';
  state.locationDice = null;
  state.damageDice = null;
  state.rerolled = 0;
  state.result = null;
  state.cm = null;
  state.cmDeclined = false;
}

function rollAttack() {
  const a = attacker();
  const w = weapon();
  const def = weaponDef();

  const blocked = R.weaponBlockedReason(a, w, { bursts: state.bursts, overcharge: overchargeEP() });
  if (blocked) { toast(blocked, 'error'); return; }

  state.locationDice = (isKind('cluster') || isKind('emp')) ? [1, 1] : R.rollDice(2, 6);

  if (isKind('emp') || isKind('disruptor')) {
    state.damageDice = [];
  } else if (isKind('rapid')) {
    const perBurst = Math.max(1, 3 - (a.prone ? 1 : 0) - ((a.hardpointFailure || {})[w.loc] ? 1 : 0));
    state.damageDice = R.rollDice(perBurst * state.bursts, 6);
  } else if (isKind('cluster')) {
    state.damageDice = R.rollDice(2, 6);
  } else if (isKind('he')) {
    state.damageDice = R.rollDice(R.damageDiceCount(a, w), 6);
  } else {
    state.damageDice = R.rollDice(R.damageDiceCount(a, w, { overchargeDice: state.overchargeDice }), 6);
  }

  state.rerolled = 0;
  state.stage = 'rolled';
}

function applyAttack() {
  const a = attacker();
  const t = target();
  const w = weapon();
  const def = weaponDef();
  const loc = hitLocation();
  const critMod = critModFor();

  const result = { steps: [], crits: [], killed: false, headline: '', subhead: '' };

  mutate((battle) => {
    // 1. Pay for the shot, mark it fired, roll the Ammo Die.
    const spend = R.consumeWeapon(a, w, { bursts: state.bursts, overcharge: overchargeEP() });
    if (!spend.ok) { toast(spend.reason, 'error'); return; }
    result.steps.push(`${a.callsign} fires the ${def.name} — ${spend.spent} EP`);
    if (spend.ammo) {
      result.steps.push(`Ammo Die ${spend.ammo.rolled} — ${spend.ammo.empty ? 'the belt is EMPTY for the rest of the battle' : 'rounds remain'}`);
    }

    const collect = (crits) => {
      for (const { crit, applied } of crits) {
        result.crits.push({ ...crit, notes: applied.notes });
      }
    };

    if (isKind('disruptor')) {
      const r = R.resolveDisruptor(t, loc.location, { overcharged: state.overchargeDice > 0 });
      collect(r.crits);
      result.steps.push(`Drained ${r.drained} EP (rolled ${r.drainRoll})`);
    } else if (isKind('emp')) {
      const r = R.resolveEMP(t);
      result.steps.push(`Sensor Critical (rolled ${r.roll}): ${r.crit.name}`);
      result.steps.push(r.crit.text);
      for (const note of r.notes || []) result.steps.push(note);
      result.steps.push('Tactical Datalink jammed for the turn');
      result.steps.push('No damage, and armour is irrelevant — this opens a fight, it does not finish one');
    } else if (isKind('cluster')) {
      const r = R.resolveCluster(t);
      for (const hit of r) {
        result.steps.push(`${HIT_ZONES[hit.zone]} column → ${LOCATION_NAMES[hit.hit.location]}: ${hit.damage} vs DR ${hit.report.dr}${hit.report.penetrated ? ' — through' : ' — held'}`);
        if (hit.report.critDice) collect(R.resolveCrits(t, hit.report.location, hit.report.critDice, { mod: critMod }));
      }
    } else if (isKind('he')) {
      const r = R.resolveHighExplosive(t, loc.location, { forcedPrimary: R.sum(state.damageDice) });
      for (const hit of r) {
        result.steps.push(`${LOCATION_NAMES[hit.location]}${hit.splash ? ' (splash)' : ''}: ${hit.damage} vs DR ${hit.report.dr}${hit.report.penetrated ? ' — through' : ' — held'}`);
        if (hit.report.critDice) collect(R.resolveCrits(t, hit.report.location, hit.report.critDice, { mod: critMod }));
      }
    } else if (isKind('rapid')) {
      const r = R.resolveRapidFire(t, loc.location, {
        bursts: state.bursts, apX: apFor(), coreCritical: loc.coreCritical, forcedDice: state.damageDice,
      });
      result.steps.push(...r.steps);
      if (r.critDice) collect(R.resolveCrits(t, loc.location, r.critDice, { mod: critMod }));
    } else {
      const total = R.sum(state.damageDice);
      const rep = R.applyDamage(t, loc.location, total, { apX: apFor(), coreCritical: loc.coreCritical });
      result.steps.push(...rep.steps);
      const landed = rep.transferred || rep;
      if (landed.critDice) collect(R.resolveCrits(t, landed.location, landed.critDice, { mod: critMod }));
    }

    result.killed = R.isDestroyed(t);
    result.headline = result.killed ? `${t.callsign} destroyed`
      : result.crits.length ? `${result.crits.length} Critical${result.crits.length === 1 ? '' : 's'} on ${t.callsign}`
      : 'The armor held';
    result.subhead = result.killed ? 'Out of the battle.'
      : result.crits.length ? result.crits.map((c) => c.name).join(' · ')
      : 'No damage and no degradation — the plate stopped it.';

    // The whole resolution, not just the verdict. result.steps already carries
    // every die, the DR comparison and each critical — it was being discarded,
    // which left the log saying that something happened but never what.
    const detail = [
      `${def.name} · ${HIT_ZONES[state.zone]} column`,
      ...result.steps,
      ...result.crits.map((c) => `Critical: ${c.name}`),
    ];
    logBattle(battle, `${a.callsign} → ${t.callsign}: ${result.headline}`, detail);
    logFrame(t, `Hit by ${a.callsign}'s ${def.name}: ${result.headline}`, detail);
    logFrame(a, `${def.name} → ${t.callsign}: ${result.headline}`, detail);
  });

  state.result = result;
  state.stage = 'applied';
}
