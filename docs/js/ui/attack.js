// Guided attack resolver — walks the Combat Phase sequence from rules.md 2.3.
//
// Attacks always hit in Iron Protocol, so this flow is the bulk of the game's
// bookkeeping. Every die can be rolled by the app or overridden by tapping it,
// because players will often have rolled physical dice already.

import { HIT_ZONES, LOCATION_NAMES, MAX_FULL_AUTO_BURSTS, WEAPONS } from '../data/tables.js';
import * as R from '../rules.js';
import { framesList, getBattle, getFrame, logBattle, logFrame, mutate, myFrames } from '../state.js';
import { chip, cls, empty, esc, toast } from './dom.js';

const state = {
  attackerId: null,
  targetId: null,
  weaponId: null,
  ammoType: null,
  bursts: 1,
  overcharge: 0,      // index into the weapon's overcharge options, 0 = none
  zone: 'front',
  locationDice: null, // [d1, d2]
  damageDice: null,   // number[]
  extraDice: null,    // disruptor drain / splash
  stage: 'setup',     // setup → rolled → applied
  result: null,
  critDie: null,
};

export function reset() {
  Object.assign(state, {
    attackerId: null, targetId: null, weaponId: null, ammoType: null, bursts: 1,
    overcharge: 0, zone: 'front', locationDice: null, damageDice: null, extraDice: null,
    stage: 'setup', result: null, critDie: null,
  });
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

function locationRollTotal() {
  return state.locationDice ? state.locationDice[0] + state.locationDice[1] : null;
}

function hitLocation() {
  const total = locationRollTotal();
  return total ? R.lookupHitLocation(total, state.zone) : null;
}

/** Total EP the shot costs, including any overcharge. */
function epCost() {
  const w = weapon();
  const def = weaponDef();
  if (!w) return 0;
  const base = R.weaponEPCost(w) * (def.rapidFire ? state.bursts : 1);
  return base + overchargeEP();
}

function overchargeEP() {
  const w = weapon();
  const def = weaponDef();
  if (!w) return 0;
  const mandatory = w.requiresOvercharge || 0;
  const optional = state.overcharge > 0 ? def.overcharge[state.overcharge - 1].ep : 0;
  return mandatory + optional;
}

function overchargeFlat() {
  const def = weaponDef();
  if (!def?.overcharge || state.overcharge === 0) return 0;
  return def.overcharge[state.overcharge - 1].flat || 0;
}

// --- Render ---------------------------------------------------------------------

export function render() {
  const battle = getBattle();
  const mine = myFrames().filter((f) => !f.destroyed);
  const enemies = framesList().filter((f) => !f.destroyed && f.id !== state.attackerId);

  if (!mine.length) {
    return empty('No frames to fire with', 'Deploy a frame before resolving attacks.');
  }
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
    ${state.weaponId ? stepRolls() : ''}
    ${state.stage === 'rolled' ? stepPreview() : ''}
  `;
}

function step(n, title, active, done, body) {
  return `
    <div class="step ${cls(active && 'active', done && 'done')}" style="margin-bottom:1rem">
      <div class="step-title">${n}. ${esc(title)}</div>
      ${body}
    </div>`;
}

function stepPicker() {
  const mine = myFrames().filter((f) => !f.destroyed);
  const targets = framesList().filter((f) => !f.destroyed && f.id !== state.attackerId);
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
          ${esc(f.callsign)}${f.eva ? ` <span class="dim">${f.eva} EVA</span>` : ''}
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
  // Only the selected weapon has a chosen munition; checking another weapon
  // against it would read a magazine it does not have and report it empty.
  const blocked = R.weaponBlockedReason(frame, w, {
    ammoType: selected ? state.ammoType : null,
    bursts: 1,
  });
  const cost = R.weaponEPCost(w);
  const ammo = w.ammo ? ` · ${R.weaponAmmoRemaining(w)} left` : '';

  return `
    <button class="btn ${selected ? 'primary' : ''}" data-action="pick-weapon" data-weapon="${w.id}"
      ${blocked ? 'disabled' : ''} style="justify-content:flex-start;text-align:left;height:auto;padding:.6rem .8rem">
      <div style="width:100%">
        <div class="row between">
          <span style="font-weight:600">${esc(w.name)}</span>
          <span class="small ${selected ? '' : 'dim'}">${cost} EP</span>
        </div>
        <div class="tiny ${selected ? '' : 'dim'}" style="opacity:.85">
          ${esc(LOCATION_NAMES[w.loc])}${ammo}${blocked ? ` · ${esc(blocked)}` : ''}
        </div>
      </div>
    </button>`;
}

/** Ammo type, burst count, warhead and overcharge selectors for the chosen weapon. */
function weaponOptions() {
  const w = weapon();
  const def = weaponDef();
  const a = attacker();
  const rows = [];

  if (w.ammo && def.rapidFire) {
    const types = Object.entries(w.ammo).filter(([, n]) => n > 0);
    rows.push(`
      <div class="tiny dim" style="margin:.6rem 0 .25rem">Munition</div>
      <div class="row wrap" style="gap:.35rem">
        ${types.map(([type, n]) => `
          <button class="btn sm ${state.ammoType === type ? 'primary' : ''}"
            data-action="pick-ammo" data-type="${type}">
            ${esc(R.ammoTypeInfo(type)?.name || type)} <span class="dim">${n}</span>
          </button>`).join('')}
      </div>`);

    const maxBursts = Math.min(
      MAX_FULL_AUTO_BURSTS,
      w.ammo[state.ammoType] || 0,
      Math.floor(a.ep / Math.max(R.weaponEPCost(w), 1)),
    );
    rows.push(`
      <div class="tiny dim" style="margin:.6rem 0 .25rem">
        Bursts — Full Auto pays the EP cost per burst, max ${MAX_FULL_AUTO_BURSTS}
      </div>
      <div class="row wrap" style="gap:.35rem">
        ${Array.from({ length: Math.max(1, maxBursts) }, (_, i) => i + 1).map((n) => `
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

  if (def.overcharge) {
    rows.push(`
      <div class="tiny dim" style="margin:.6rem 0 .25rem">
        Overcharge — paid from banked Capacitor charge (${a.overchargeAvailable || 0} available), triggers a 1-turn cooldown
      </div>
      <div class="row wrap" style="gap:.35rem">
        <button class="btn sm ${state.overcharge === 0 ? 'primary' : ''}" data-action="pick-overcharge" data-n="0">None</button>
        ${def.overcharge.map((opt, i) => `
          <button class="btn sm ${state.overcharge === i + 1 ? 'primary' : ''}"
            data-action="pick-overcharge" data-n="${i + 1}"
            ${opt.ep > (a.overchargeAvailable || 0) ? 'disabled' : ''}>${esc(opt.label)}</button>`).join('')}
      </div>`);
  }

  if (w.requiresOvercharge) {
    rows.push(`<div class="tiny" style="color:var(--warn);margin-top:.5rem">
      Mandatory +${w.requiresOvercharge} EP overcharge from the Capacitor.</div>`);
  }

  const cost = epCost();
  rows.push(`
    <div class="math" style="margin-top:.7rem">
      <div>Total cost <span class="final">${cost} EP</span> — ${esc(a.callsign)} has ${a.ep} EP${overchargeEP() ? `, ${a.overchargeAvailable || 0} banked` : ''}</div>
      ${cost > a.ep ? '<div style="color:var(--danger)">Not enough energy</div>' : ''}
      ${overchargeEP() > (a.overchargeAvailable || 0) ? '<div style="color:var(--danger)">Not enough banked Capacitor charge</div>' : ''}
    </div>`);

  return rows.join('');
}

function warheadHint(key) {
  return {
    he: '3d6 to the hit location, 1d6 splash to adjacent locations',
    cluster: '2d6 against every location on the target',
    emp: 'No damage — criticals on every location already at 0 Armor DR',
  }[key] || '';
}

function stepZone() {
  const t = target();
  const def = weaponDef();
  if (def.warheads && weapon().warhead !== 'he') {
    return step(4, 'Hit Zone', false, true, '<div class="small muted">Not needed — this warhead covers the whole chassis.</div>');
  }

  const eva = R.evasionAgainst(t, { zone: state.zone, aoe: def.aoe, bypassesEvasion: def.bypassesEvasion });

  return step(4, 'Hit Zone', !state.locationDice, !!state.locationDice, `
    <div class="row wrap" style="gap:.35rem">
      ${Object.entries(HIT_ZONES).map(([key, label]) => `
        <button class="btn sm ${state.zone === key ? 'primary' : ''}" data-action="pick-zone" data-zone="${key}">
          ${esc(label)}
        </button>`).join('')}
    </div>
    <div class="math" style="margin-top:.6rem">
      <div>Target evasion: <span class="final">${eva}</span>
        ${state.zone === 'rear' ? ' — rear attacks bypass movement evasion' : ''}
        ${def.aoe ? ' — AoE bypasses evasion' : ''}
        ${def.bypassesEvasion ? ' — this weapon bypasses evasion' : ''}
      </div>
      ${t.prone ? '<div>Target is Prone: movement evasion is 0, cover still applies</div>' : ''}
    </div>`);
}

function stepRolls() {
  const def = weaponDef();
  const w = weapon();
  const isCluster = def.warheads && w.warhead === 'cluster';
  const isEMP = def.warheads && w.warhead === 'emp';

  if (isEMP) {
    return step(5, 'Detonate', state.stage === 'setup', state.stage !== 'setup', `
      <div class="small muted" style="margin-bottom:.6rem">
        EMP deals no damage. Every location on the target already stripped to 0 Armor DR suffers a critical hit.
      </div>
      <button class="btn primary block" data-action="roll-attack">Detonate EMP</button>`);
  }

  const locationBlock = isCluster ? '' : `
    <div class="tiny dim" style="margin-bottom:.3rem">Hit location — 2d6 (tap a die to correct it)</div>
    <div class="row" style="gap:.4rem;margin-bottom:.6rem">
      ${(state.locationDice || [0, 0]).map((d, i) => `
        <button class="die" data-action="bump-loc-die" data-index="${i}" ${d ? '' : 'disabled'}>${d || '·'}</button>`).join('')}
      ${state.locationDice ? `
        <div class="grow row" style="gap:.5rem">
          <b class="mono">${locationRollTotal()}</b>
          <span>${esc(LOCATION_NAMES[hitLocation().location])}</span>
          ${hitLocation().coreCritical ? chip('Core Critical', 'danger') : ''}
          ${hitLocation().headHit ? chip('Sensors', 'warn') : ''}
        </div>` : ''}
    </div>`;

  const damageBlock = !state.damageDice ? '' : `
    <div class="tiny dim" style="margin-bottom:.3rem">${esc(damageLabel())} (tap a die to correct it)</div>
    <div class="row wrap" style="gap:.4rem">
      ${state.damageDice.map((d, i) => `
        <button class="die" data-action="bump-dmg-die" data-index="${i}">${d}</button>`).join('')}
      ${overchargeFlat() ? `<div class="die" style="border-style:dashed">+${overchargeFlat()}</div>` : ''}
      ${def.damage?.flat ? `<div class="die" style="border-style:dashed">+${def.damage.flat}</div>` : ''}
    </div>`;

  return step(5, 'Roll', state.stage === 'setup', state.stage !== 'setup', `
    ${locationBlock}
    ${damageBlock}
    <button class="btn ${state.stage === 'setup' ? 'primary' : ''} block" data-action="roll-attack" style="margin-top:.6rem">
      ${state.stage === 'setup' ? 'Roll Attack' : 'Re-roll'}
    </button>`);
}

function damageLabel() {
  const def = weaponDef();
  const w = weapon();
  const a = attacker();
  const prone = a.prone ? ' — prone, one die fewer' : '';

  if (def.rapidFire) {
    const perBurst = Math.max(1, def.burstDice - (a.prone ? 1 : 0));
    return `Damage — ${state.bursts} burst${state.bursts > 1 ? 's' : ''} × ${perBurst}d6, each die resolved separately${prone}`;
  }
  if (def.warheads && w.warhead === 'cluster') {
    return `Damage — ${R.warheadDiceCount(a, def.warheads.cluster.allLocations)}d6 against every location${prone}`;
  }
  if (def.warheads && w.warhead === 'he') {
    return `Damage — ${R.warheadDiceCount(a, def.warheads.he.damage)}d6 primary${prone}`;
  }
  if (def.disruptor) return 'Disruptor effect — no damage dice';
  return `Damage — ${R.damageDiceCount(a, w)}d${def.damage.sides}${prone}`;
}

/** Show the arithmetic before committing, so an opponent can audit it. */
function stepPreview() {
  const t = target();
  const def = weaponDef();
  const w = weapon();
  const eva = R.evasionAgainst(t, { zone: state.zone, aoe: def.aoe, bypassesEvasion: def.bypassesEvasion });
  const loc = hitLocation();

  let lines = [];

  if (def.disruptor) {
    const isTorso = loc.location === 'torso';
    lines.push(`Bypasses evasion and Armor DR`);
    if (isTorso || state.overcharge) lines.push(`Drains ${state.extraDice?.[0] || 0} EP from ${esc(t.callsign)}`);
    if (!isTorso || state.overcharge) lines.push(`Forces a critical on ${esc(LOCATION_NAMES[loc.location])}`);
  } else if (def.warheads && w.warhead === 'cluster') {
    lines.push(`${R.sum(state.damageDice)} damage against every location, bypassing evasion`);
  } else if (def.warheads && w.warhead === 'emp') {
    lines.push('Criticals on every location at 0 Armor DR');
  } else if (def.rapidFire) {
    const dice = state.damageDice.map((d) => Math.max(0, d + (R.ammoTypeInfo(state.ammoType)?.damageMod || 0)));
    const apX = R.ammoTypeInfo(state.ammoType)?.ap || 0;
    const dr = Math.max(0, t.locations[loc.location].dr - apX);
    const missing = Math.min(eva, dice.length);
    const hits = [...dice].sort((a, b) => b - a).slice(missing);
    const toIS = R.sum(hits.map((d) => Math.max(0, d - dr)));
    lines.push(`${dice.length} dice: ${dice.join(', ')}`);
    if (eva) lines.push(`${eva} EVA negates the ${missing} highest → ${hits.length} hits land`);
    lines.push(`Each vs Armor DR ${dr}${apX ? ` (${t.locations[loc.location].dr} − AP ${apX})` : ''}`);
    lines.push(`<span class="final">${toIS} to ${esc(LOCATION_NAMES[loc.location])} Internal Structure</span>`);
    if (toIS > 0) {
      lines.push(`Armor degrades by 1 for the burst, and a critical will be rolled${
        R.ammoTypeInfo(state.ammoType)?.critMod ? ' at +1 for HEI' : ''}`);
    }
  } else {
    const raw = R.sum(state.damageDice) + (def.damage?.flat || 0) + overchargeFlat();
    const afterEva = Math.max(0, raw - eva);
    const apX = def.ap || 0;
    const bypass = loc.coreCritical;
    const dr = bypass ? 0 : Math.max(0, t.locations[loc.location].dr - apX);
    const toIS = Math.max(0, afterEva - dr);
    lines.push(`${state.damageDice.join(' + ')}${def.damage?.flat ? ` + ${def.damage.flat}` : ''}${overchargeFlat() ? ` + ${overchargeFlat()} overcharge` : ''} = ${raw} damage`);
    if (eva) lines.push(`${raw} − ${eva} EVA = ${afterEva}`);
    if (bypass) lines.push('Core Critical — Armor DR bypassed entirely');
    else lines.push(`${afterEva} − ${dr} DR${apX ? ` (${t.locations[loc.location].dr} − AP ${apX})` : ''} = ${Math.max(0, afterEva - dr)}`);
    lines.push(`<span class="final">${toIS} to ${esc(LOCATION_NAMES[loc.location])} Internal Structure</span>`);
    if (toIS > 0) lines.push('Armor degrades by 1, and a critical will be rolled');
  }

  return step(6, 'Confirm', true, false, `
    <div class="math">${lines.map((l) => `<div>${l}</div>`).join('')}</div>
    <div class="row" style="gap:.5rem;margin-top:.7rem">
      <button class="btn grow" data-action="cancel-attack">Cancel</button>
      <button class="btn grow primary" data-action="apply-attack">Apply Damage</button>
    </div>`);
}

// --- Result ---------------------------------------------------------------------

function renderResult() {
  const res = state.result;
  const t = getFrame(state.targetId);
  const kind = res.killed ? 'kill' : res.toIS > 0 ? 'hit' : 'blocked';

  return `
    <div class="result-banner ${kind}">
      <h3>${esc(res.headline)}</h3>
      <div class="small muted">${esc(res.subhead)}</div>
    </div>

    <div class="math" style="margin-bottom:.8rem">
      ${res.steps.map((s) => `<div>${esc(s)}</div>`).join('')}
    </div>

    ${res.crits.length ? `
      <div class="section-title">Critical Hits</div>
      ${res.crits.map((c, i) => `
        <div class="card" style="border-color:#4a3a1c">
          <div class="row between">
            <b>${esc(c.name)}</b>
            <span class="chip warn">${esc(LOCATION_NAMES[c.location])} · rolled ${c.modifiedRoll ?? c.roll}</span>
          </div>
          <div class="small muted" style="margin-top:.3rem">${esc(c.text)}</div>
          ${c.notes?.length ? c.notes.map((n) => `<div class="tiny" style="color:var(--warn);margin-top:.3rem">${esc(n)}</div>`).join('') : ''}
          ${c.choices?.length ? `
            <div class="tiny dim" style="margin:.55rem 0 .3rem">Choose the weapon to destroy:</div>
            <div class="row wrap" style="gap:.35rem">
              ${c.choices.map((weaponId) => {
                const w = t.weapons.find((x) => x.id === weaponId);
                return w ? `<button class="btn sm danger" data-action="destroy-weapon"
                  data-crit="${i}" data-weapon="${esc(weaponId)}">${esc(w.name)}</button>` : '';
              }).join('')}
            </div>` : ''}
        </div>`).join('')}` : ''}

    ${res.pendingAmmoExplosion ? `
      <div class="card" style="border-color:#4a2320">
        <b style="color:var(--danger)">Ammo Explosion</b>
        <div class="small muted" style="margin:.3rem 0 .6rem">Explosive ammunition cooks off for 3d6 to the Torso, bypassing armor.</div>
        <button class="btn danger block" data-action="resolve-ammo-explosion">Roll 3d6 Detonation</button>
      </div>` : ''}

    <div class="section-title">${esc(t.callsign)} after the hit</div>
    <div class="card tight">
      ${Object.entries(t.locations).map(([key, loc]) => `
        <div class="row between small" style="padding:.25rem 0">
          <span class="${loc.destroyed ? 'dim' : ''}">${esc(LOCATION_NAMES[key])}</span>
          <span class="mono ${loc.destroyed ? 'dim' : ''}">
            ${loc.destroyed ? 'destroyed' : `DR ${loc.dr}/${loc.drMax} · IS ${loc.is}/${loc.isMax}`}
          </span>
        </div>`).join('')}
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
      return true;

    case 'pick-target':
      state.targetId = el.dataset.frame;
      state.weaponId = null;
      return true;

    case 'pick-weapon': {
      state.weaponId = el.dataset.weapon;
      const w = weapon();
      state.ammoType = w.ammo ? Object.keys(w.ammo).find((k) => w.ammo[k] > 0) : null;
      state.bursts = 1;
      state.overcharge = 0;
      resetRolls();
      return true;
    }

    case 'pick-ammo': state.ammoType = el.dataset.type; resetRolls(); return true;
    case 'pick-bursts': state.bursts = Number(el.dataset.n); resetRolls(); return true;
    case 'pick-overcharge': state.overcharge = Number(el.dataset.n); resetRolls(); return true;
    case 'pick-zone': state.zone = el.dataset.zone; resetRolls(); return true;

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

    case 'cancel-attack': resetRolls(); return true;
    case 'apply-attack': applyAttack(); return true;
    case 'new-attack': {
      const attackerId = state.attackerId;
      reset();
      state.attackerId = attackerId;
      return true;
    }
    case 'resolve-ammo-explosion': resolveAmmoExplosion(); return true;

    case 'destroy-weapon': {
      const weaponId = el.dataset.weapon;
      const critIndex = Number(el.dataset.crit);
      const t = getFrame(state.targetId);
      mutate((battle) => {
        const w = t.weapons.find((x) => x.id === weaponId);
        if (!w) return;
        w.destroyed = true;
        w.destroyedReason = 'weapon damaged';
        logFrame(t, `${w.name} destroyed by a Weapon Damaged critical`);
        logBattle(battle, `${t.callsign} loses its ${w.name}`);
        state.result.steps.push(`${w.name} destroyed`);
        state.result.crits[critIndex].choices = [];
        state.result.crits[critIndex].notes = [`${w.name} destroyed`];
      });
      toast('Weapon destroyed', 'ok');
      return true;
    }

    default: return false;
  }
}

function resetRolls() {
  state.stage = 'setup';
  state.locationDice = null;
  state.damageDice = null;
  state.extraDice = null;
  state.result = null;
}

function rollAttack() {
  const def = weaponDef();
  const w = weapon();
  const a = attacker();

  const cost = epCost();
  if (cost > a.ep) { toast(`Needs ${cost} EP, ${a.callsign} has ${a.ep}`, 'error'); return; }
  if (overchargeEP() > (a.overchargeAvailable || 0)) {
    toast(`Overcharge needs ${overchargeEP()} EP of banked Capacitor charge`, 'error');
    return;
  }

  const isCluster = def.warheads && w.warhead === 'cluster';
  const isEMP = def.warheads && w.warhead === 'emp';

  state.locationDice = isCluster || isEMP ? [1, 1] : R.rollDice(2, 6);

  // A prone attacker rolls one die fewer (rules.md 5.0, 6.3).
  if (isEMP) {
    state.damageDice = [];
  } else if (isCluster) {
    state.damageDice = R.rollDice(R.warheadDiceCount(a, def.warheads.cluster.allLocations), 6);
  } else if (def.warheads && w.warhead === 'he') {
    state.damageDice = R.rollDice(R.warheadDiceCount(a, def.warheads.he.damage), 6);
  } else if (def.disruptor) {
    state.damageDice = [];
    state.extraDice = [R.rollDie(6), R.rollDie(6)]; // EP drain, forced crit
  } else {
    state.damageDice = R.rollDice(R.damageDiceCount(a, w, { bursts: state.bursts }), def.damage.sides);
  }

  state.stage = 'rolled';
}

function applyAttack() {
  const a = attacker();
  const t = target();
  const w = weapon();
  const def = weaponDef();
  const loc = hitLocation();
  const ammo = R.ammoTypeInfo(state.ammoType);

  const result = { steps: [], crits: [], toIS: 0, killed: false, headline: '', subhead: '', pendingAmmoExplosion: false };

  mutate((battle) => {
    // 1. Pay for the shot.
    const spend = R.spendEP(a, epCost(), { overcharge: overchargeEP() });
    if (!spend.ok) { toast(spend.reason, 'error'); return; }
    R.consumeWeapon(a, w, {
      ammoType: state.ammoType,
      bursts: state.bursts,
      overcharged: state.overcharge > 0 || !!w.requiresOvercharge,
    });
    result.steps.push(`${a.callsign} fires ${w.name} for ${epCost()} EP`);

    const eva = R.evasionAgainst(t, { zone: state.zone, aoe: def.aoe, bypassesEvasion: def.bypassesEvasion });
    const critMod = ammo?.critMod || 0;

    // 2. Resolve by weapon family.
    if (def.disruptor) {
      const report = R.resolveDisruptor(t, loc.location, {
        drainRoll: state.extraDice[0],
        critRoll: state.extraDice[1],
        overcharged: state.overcharge > 0,
      });
      result.steps.push(...report.steps);
      if (report.crit) {
        result.crits.push(report.crit);
        if (report.crit.pendingAmmoExplosion) result.pendingAmmoExplosion = true;
      }
      result.headline = report.drained ? `${report.drained} EP drained` : 'Systems disrupted';
      result.subhead = `${w.name} against ${t.callsign}`;
    } else if (def.warheads && w.warhead === 'emp') {
      const report = R.resolveEMP(t, () => R.rollDie(6));
      result.crits.push(...report.crits.map((c) => ({ ...c.crit, location: c.location })));
      if (report.crits.some((c) => c.crit.pendingAmmoExplosion)) result.pendingAmmoExplosion = true;
      result.steps.push(`EMP detonation — sensors scrambled`);
      result.steps.push(report.crits.length
        ? `${report.crits.length} exposed location${report.crits.length > 1 ? 's' : ''} suffered criticals`
        : 'No locations were at 0 Armor DR — no criticals');
      result.headline = 'EMP detonation';
      result.subhead = `${t.callsign} sensors scrambled`;
    } else if (def.warheads && w.warhead === 'cluster') {
      const damage = R.sum(state.damageDice);
      const reports = R.resolveCluster(t, () => damage);
      for (const rep of reports) {
        result.toIS += rep.toIS;
        result.steps.push(`${rep.locationName}: ${damage} − ${rep.dr} DR = ${rep.toIS} to IS`);
        if (rep.shouldRollCrit) rollAndRecordCrit(t, rep.location, critMod, result);
      }
      result.headline = `Cluster salvo — ${result.toIS} total structure damage`;
      result.subhead = `${damage} against every location on ${t.callsign}`;
    } else if (def.warheads && w.warhead === 'he') {
      const primaryDamage = R.sum(state.damageDice);
      const { primary, splash } = R.resolveHighExplosive(t, loc.location, primaryDamage, () => R.rollDie(6));
      result.toIS = primary.toIS + R.sum(splash.map((s) => s.toIS));
      result.steps.push(...primary.steps);
      if (primary.shouldRollCrit) rollAndRecordCrit(t, loc.location, critMod, result);
      for (const s of splash) {
        result.steps.push(`Splash — ${s.locationName}: ${s.toIS} to IS`);
        if (s.shouldRollCrit) rollAndRecordCrit(t, s.location, critMod, result);
      }
      result.headline = `${result.toIS} structure damage`;
      result.subhead = `High Explosive on ${t.callsign} ${LOCATION_NAMES[loc.location]}`;
    } else if (def.rapidFire) {
      const report = R.resolveRapidFire(t, loc.location, state.damageDice, {
        evasion: eva,
        apX: ammo?.ap || 0,
        damageMod: ammo?.damageMod || 0,
      });
      result.toIS = report.totalToIS;
      result.steps.push(`${report.dice.length} dice at ${report.locationName}: ${report.dice.join(', ')}`);
      result.steps.push(...report.steps);
      result.steps.push(`${report.totalToIS} total to Internal Structure`);
      if (report.shouldRollCrit) rollAndRecordCrit(t, loc.location, critMod, result);
      if (ammo?.paints && report.hits.length) {
        t.painted = true;
        result.steps.push('Target painted — all friendly fire ignores 1 EVA this phase');
      }
      result.headline = report.totalToIS ? `${report.totalToIS} structure damage` : 'Armor held';
      result.subhead = `${w.name} into ${t.callsign} ${LOCATION_NAMES[loc.location]}`;
    } else {
      const raw = R.sum(state.damageDice) + (def.damage.flat || 0) + overchargeFlat();
      const report = R.applyDamage(t, loc.location, raw, {
        evasion: eva,
        apX: def.ap || 0,
        treatDRAsZero: loc.coreCritical,
      });
      result.toIS = report.toIS;
      result.steps.push(`${raw} damage at ${report.locationName}`);
      result.steps.push(...report.steps);
      if (report.transferred) result.steps.push(...report.transferred.steps);
      if (report.shouldRollCrit) rollAndRecordCrit(t, loc.location, critMod, result);
      result.headline = report.toIS ? `${report.toIS} structure damage` : 'Armor held';
      result.subhead = `${w.name} into ${t.callsign} ${LOCATION_NAMES[loc.location]}`;
    }

    if (t.destroyed) {
      result.killed = true;
      result.headline = `${t.callsign} DESTROYED`;
      result.steps.push(`${t.callsign} is out of the battle`);
    }

    logFrame(a, `Fired ${w.name} at ${t.callsign} — ${result.headline}`);
    logFrame(t, `Hit by ${a.callsign} ${w.name} — ${result.headline}`);
    logBattle(battle, `${a.callsign} → ${t.callsign}: ${result.headline}`);
  });

  state.result = result;
  state.stage = 'applied';
}

function rollAndRecordCrit(frame, location, mod, result) {
  const crit = R.rollCrit(location, { mod });
  const applied = R.applyCrit(frame, crit, location);
  result.crits.push({ ...crit, ...applied, location });
  result.steps.push(`Critical on ${LOCATION_NAMES[location]}: ${crit.name}`);
  if (applied.pendingAmmoExplosion) result.pendingAmmoExplosion = true;
}

function resolveAmmoExplosion() {
  const t = getFrame(state.targetId);
  mutate((battle) => {
    const damage = R.sum(R.rollDice(3, 6));
    const report = R.applyDamage(t, 'torso', damage, { direct: true });
    state.result.steps.push(`Ammo explosion: ${damage} damage direct to the Torso`);
    state.result.steps.push(...report.steps);
    state.result.pendingAmmoExplosion = false;
    if (t.destroyed) {
      state.result.killed = true;
      state.result.headline = `${t.callsign} DESTROYED`;
    }
    logBattle(battle, `${t.callsign} ammo explosion — ${damage} damage`);
  });
  toast('Ammo explosion resolved', 'error');
}
