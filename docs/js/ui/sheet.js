// Frame sheet — the digital equivalent of frames/*.md, with the derived numbers
// kept live. Everything here is manually adjustable; the attack resolver writes
// to the same fields.

import { AMMO_TYPES, LOCATIONS, LOCATION_NAMES, SENSOR_BANDS, TERRAIN, TERRAIN_KEYS } from '../data/tables.js';
import * as R from '../rules.js';
import { deviceId, getFrame, logFrame, mutate, myFrames, framesList, removeFrame, addFrame } from '../state.js';
import { FRAME_PRESETS } from '../data/frames.js';
import { bar, chip, closeModal, cls, confirmModal, esc, meter, openModal, stepper, toast } from './dom.js';

let openFrameId = null;

export function setOpenFrame(id) {
  openFrameId = id;
}

export function render() {
  const frame = openFrameId ? getFrame(openFrameId) : null;
  if (frame) return renderSheet(frame);
  return renderRoster();
}

// --- Roster listing ---------------------------------------------------------

function renderRoster() {
  const mine = myFrames();
  const others = framesList().filter((f) => f.ownerId !== deviceId());

  return `
    <div class="section-title">Your Lance</div>
    ${mine.length
      ? mine.map((f) => frameListItem(f)).join('')
      : `<div class="card center muted small">No frames deployed yet.</div>`}
    <button class="btn primary block" data-action="open-add-frame" style="margin-top:.6rem">+ Deploy a Frame</button>

    ${others.length ? `
      <div class="section-title">Opposing Frames</div>
      ${others.map((f) => frameListItem(f)).join('')}` : ''}
  `;
}

function frameListItem(frame) {
  const mine = frame.ownerId === deviceId();
  return `
    <div class="card frame-card ${cls(frame.team === 'b' && 'team-b', mine && 'mine', frame.destroyed && 'destroyed')}"
         data-action="open-frame" data-frame="${frame.id}" style="padding-left:.9rem">
      <div class="frame-head">
        <div class="grow">
          <div class="name">${esc(frame.callsign)}</div>
          <div class="desig">${esc(frame.designation)} · ${esc(frame.role)}</div>
        </div>
        <div class="init-badge"><b>${R.effectiveInitiative(frame)}</b><span>Init</span></div>
      </div>
      ${statusChips(frame)}
      ${locationStrip(frame)}
    </div>`;
}

export function locationStrip(frame) {
  return `<div class="loc-strip">${LOCATIONS.map((key) => {
    const loc = frame.locations[key];
    const short = { head: 'HD', torso: 'CT', leftArm: 'LA', rightArm: 'RA', leftLeg: 'LL', rightLeg: 'RL' }[key];
    return `
      <div class="loc ${loc.destroyed ? 'gone' : ''}">
        ${bar(loc.dr, loc.drMax, 'armor')}
        ${bar(loc.is, loc.isMax, 'structure')}
        <span>${short}</span>
      </div>`;
  }).join('')}</div>`;
}

export function statusChips(frame) {
  const chips = [];
  if (frame.destroyed) chips.push(chip('DESTROYED', 'danger'));
  if (frame.prone) chips.push(chip('Prone', 'warn'));
  if (frame.immobilized) chips.push(chip('Immobilized', 'danger'));
  if (R.isIRLockable(frame)) chips.push(chip('IR Lockable', 'warn'));
  if (frame.systems?.amc?.active) {
    chips.push(chip(`AMC ${frame.systems.amc.bands.map((b) => SENSOR_BANDS[b]).join('+') || 'on'}`, 'accent'));
  }
  if (frame.systems?.ecm?.active) chips.push(chip(`ECM${frame.systems.ecm.radius ? ` +${frame.systems.ecm.radius}` : ''}`, 'accent'));
  if (frame.painted) chips.push(chip('Painted', 'warn'));
  if (frame.sensorsScrambled) chips.push(chip('Sensors Scrambled', 'warn'));
  if (frame.sensorsDown) chips.push(chip('Sensors Destroyed', 'danger'));
  if (frame.kneeLock) chips.push(chip('Knee Lock', 'warn'));
  if (frame.gyroLock) chips.push(chip('Gyro Lock', 'warn'));
  if (frame.jumpJetsDisabled) chips.push(chip('Thruster Wrecked', 'warn'));
  if (frame.commStatic) chips.push(chip('No Datalink', 'warn'));
  if (frame.terrain !== 'clear') chips.push(chip(TERRAIN[frame.terrain].name));
  return chips.length ? `<div class="row wrap" style="gap:.3rem;margin-top:.5rem">${chips.join('')}</div>` : '';
}

// --- Full sheet --------------------------------------------------------------

function renderSheet(frame) {
  const mine = frame.ownerId === deviceId();
  const evaLimit = R.effectiveEvasionLimit(frame);
  const capMax = R.effectiveCapacitorMax(frame);

  return `
    <div class="row between" style="margin-bottom:.6rem">
      <button class="btn sm ghost" data-action="close-frame">← All Frames</button>
      ${mine ? `<button class="btn sm danger" data-action="delete-frame" data-frame="${frame.id}">Withdraw</button>` : ''}
    </div>

    <div class="card frame-card ${cls(frame.team === 'b' && 'team-b', frame.destroyed && 'destroyed')}" style="padding-left:.9rem">
      <div class="frame-head">
        <div class="grow">
          <div class="name">${esc(frame.callsign)}</div>
          <div class="desig">${esc(frame.designation)} · ${esc(frame.role)}</div>
          <div class="tiny dim" style="margin-top:.2rem">
            ${frame.tons}T ${esc(TERRAIN[frame.terrain].name)} · Mass ${R.massValue(frame)} ·
            Move ${frame.hexesMoved}/${R.effectiveMovementLimit(frame)} hexes
          </div>
        </div>
        <div class="init-badge"><b>${R.effectiveInitiative(frame)}</b><span>Init</span></div>
      </div>
      ${statusChips(frame)}
    </div>

    <div class="section-title">Energy &amp; Evasion</div>
    <div class="card">
      <div class="row between" style="margin-bottom:.5rem">
        <div class="grow">${meter('Energy Pool', frame.ep, Math.max(R.effectiveReactor(frame) + capMax, 1), 'ep')}</div>
        ${stepper('adjust-ep', frame.ep, { min: 0, max: 99, params: { frame: frame.id } })}
      </div>
      <div class="row between" style="margin-bottom:.5rem">
        <div class="grow">${meter('Capacitor (banked)', frame.capacitor, capMax, 'cap')}</div>
        ${stepper('adjust-cap', frame.capacitor, { min: 0, max: capMax, params: { frame: frame.id } })}
      </div>
      <div class="row between">
        <div class="grow">${meter('Evasion', frame.eva, Math.max(evaLimit, 1), 'eva')}</div>
        ${stepper('adjust-eva', frame.eva, { min: 0, max: evaLimit, params: { frame: frame.id } })}
      </div>
      <div class="row wrap tiny dim" style="gap:.5rem;margin-top:.6rem;justify-content:space-between">
        <span>Reactor ${R.effectiveReactor(frame)}${frame.reactorMod ? ` (${frame.reactorMod})` : ''}/turn</span>
        <span>Overcharge available ${frame.overchargeAvailable || 0} EP</span>
        <span>Spent this turn ${frame.epSpentThisTurn || 0}${R.isIRLockable(frame) ? ' — IR lockable' : ''}</span>
      </div>
    </div>

    <div class="section-title">Locational Status</div>
    <div class="card tight">
      ${LOCATIONS.map((key) => locationRow(frame, key)).join('')}
    </div>

    <div class="section-title">Armaments</div>
    ${frame.weapons.map((w) => weaponCard(frame, w)).join('')}

    <div class="section-title">Systems &amp; Position</div>
    ${systemsCard(frame)}

    ${frame.crits.length ? `
      <div class="section-title">Critical Damage (${frame.crits.length})</div>
      <div class="card tight"><div class="log">
        ${frame.crits.map((c) => `
          <div class="log-entry" style="border-left-color:var(--danger)">
            <b>${esc(LOCATION_NAMES[c.location])} · ${esc(c.name)}</b><br>${esc(c.text)}
          </div>`).join('')}
      </div></div>` : ''}

    ${frame.log?.length ? `
      <div class="section-title">Frame Log</div>
      <div class="card tight"><div class="log">
        ${frame.log.slice(0, 12).map((e) => `<div class="log-entry">${esc(e.text)}</div>`).join('')}
      </div></div>` : ''}
  `;
}

function locationRow(frame, key) {
  const loc = frame.locations[key];
  return `
    <div class="loc-row ${loc.destroyed ? 'gone' : ''}">
      <div class="grow">
        <div class="loc-name">${esc(LOCATION_NAMES[key])}${loc.destroyed ? ' <span class="chip danger">Destroyed</span>' : ''}</div>
        <div class="track" style="margin-top:.35rem">
          <div class="track-line">
            <span class="tag">Armor</span>
            ${bar(loc.dr, loc.drMax, 'armor')}
            <span class="num"><b>${loc.dr}</b>/${loc.drMax}</span>
          </div>
          <div class="track-line">
            <span class="tag">Struct</span>
            ${bar(loc.is, loc.isMax, 'structure')}
            <span class="num"><b>${loc.is}</b>/${loc.isMax}</span>
          </div>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:.3rem">
        ${stepper('adjust-dr', loc.dr, { min: 0, max: loc.drMax, params: { frame: frame.id, loc: key } })}
        ${stepper('adjust-is', loc.is, { min: 0, max: loc.isMax, params: { frame: frame.id, loc: key } })}
      </div>
    </div>`;
}

function weaponCard(frame, weapon) {
  const def = R.weaponDef(weapon);
  const blocked = R.weaponBlockedReason(frame, weapon);
  const cost = R.weaponEPCost(weapon);

  const damageText = def.damage
    ? `${def.damage.dice}d${def.damage.sides}${def.damage.flat ? `+${def.damage.flat}` : ''}${def.burstDice ? ` × ${def.burstDice} per burst` : ''}`
    : def.warheads ? `${esc(def.warheads[weapon.warhead]?.name || '')} warhead` : 'No damage';

  const traits = [];
  if (def.ap) traits.push(`AP ${def.ap}`);
  if (def.rapidFire) traits.push('Rapid Fire');
  if (def.aoe) traits.push('AoE');
  if (def.bypassesArmor) traits.push('Bypasses DR');
  if (def.bypassesEvasion) traits.push('Bypasses EVA');
  if (weapon.forwardArcOnly) traits.push('Forward arc only');
  if (weapon.requiresOvercharge) traits.push(`Requires +${weapon.requiresOvercharge} EP overcharge`);

  return `
    <div class="card ${weapon.destroyed ? 'destroyed' : ''}" style="${weapon.destroyed ? 'opacity:.5' : ''}">
      <div class="row between">
        <div class="grow">
          <div style="font-weight:600">${esc(weapon.name)}</div>
          <div class="tiny dim">${esc(LOCATION_NAMES[weapon.loc])} · ${cost} EP · ${damageText}</div>
        </div>
        ${weapon.cooldown ? chip(`Cooldown ${weapon.cooldown}`, 'warn') : ''}
        ${weapon.firedThisTurn && !weapon.cooldown ? chip('Fired', 'accent') : ''}
      </div>
      ${traits.length ? `<div class="row wrap" style="gap:.3rem;margin-top:.4rem">${traits.map((t) => chip(t)).join('')}</div>` : ''}
      ${weapon.ammo ? ammoRows(frame, weapon) : `<div class="tiny dim" style="margin-top:.4rem">Ammunition: infinite</div>`}
      ${blocked && !weapon.destroyed ? `<div class="tiny" style="color:var(--warn);margin-top:.4rem">${esc(blocked)}</div>` : ''}
    </div>`;
}

function ammoRows(frame, weapon) {
  return Object.entries(weapon.ammo).map(([type, count]) => {
    const max = weapon.ammoMax[type] || 0;
    const info = AMMO_TYPES[type];
    const label = info ? info.name : type === 'slug' ? 'Slugs' : type === 'salvo' ? 'Salvos' : type;
    return `
      <div class="row between" style="margin-top:.5rem;gap:.5rem">
        <div class="grow">
          <div class="tiny muted">${esc(label)}${info?.note ? ` — ${esc(info.note)}` : ''}</div>
          <div class="pips" style="margin-top:.25rem">
            ${Array.from({ length: max }, (_, i) => `
              <button type="button" class="${i < count ? 'live' : 'spent'}"
                data-action="set-ammo" data-frame="${frame.id}" data-weapon="${weapon.id}"
                data-type="${esc(type)}" data-count="${i < count ? i : i + 1}">${i + 1}</button>`).join('')}
          </div>
        </div>
        <div class="mono small nowrap">${count}/${max}</div>
      </div>`;
  }).join('');
}

function systemsCard(frame) {
  const s = frame.systems;
  const parts = [];

  if (s.amc) {
    parts.push(`
      <div class="row between" style="margin-bottom:.5rem">
        <div class="grow">
          <div style="font-weight:600">Active Metamaterial Coating</div>
          <div class="tiny dim">2 EP per cloaked spectrum, paid in the Energy Phase</div>
        </div>
        <button class="btn sm ${s.amc.active ? 'primary' : ''}" data-action="toggle-amc" data-frame="${frame.id}">
          ${s.amc.active ? 'Active' : 'Off'}
        </button>
      </div>
      <div class="row wrap" style="gap:.3rem;margin-bottom:.7rem">
        ${Object.entries(SENSOR_BANDS).map(([band, name]) => `
          <button class="btn sm ${s.amc.bands.includes(band) ? 'primary' : ''}"
            data-action="toggle-amc-band" data-frame="${frame.id}" data-band="${band}">${esc(name)}</button>`).join('')}
      </div>`);
  }

  if (s.ecm) {
    parts.push(`
      <div class="row between" style="margin-bottom:.5rem">
        <div class="grow">
          <div style="font-weight:600">ECM Suite</div>
          <div class="tiny dim">1 EP + 1 per hex of radius</div>
        </div>
        <button class="btn sm ${s.ecm.active ? 'primary' : ''}" data-action="toggle-ecm" data-frame="${frame.id}">
          ${s.ecm.active ? 'Active' : 'Off'}
        </button>
      </div>
      <div class="row between" style="margin-bottom:.7rem">
        <span class="small muted">Radius</span>
        ${stepper('adjust-ecm-radius', s.ecm.radius, { min: 0, max: 5, params: { frame: frame.id } })}
      </div>`);
  }

  for (const [key, label, hint] of [['flares', 'Flares', 'Negates an incoming IR-guided attack'], ['smoke', 'Smoke', 'Blocks visual line of sight']]) {
    if (!s[`${key}Max`]) continue;
    parts.push(`
      <div class="row between" style="margin-bottom:.6rem;gap:.5rem">
        <div class="grow">
          <div style="font-weight:600">${label}</div>
          <div class="tiny dim">${hint}</div>
        </div>
        <div class="pips">
          ${Array.from({ length: s[`${key}Max`] }, (_, i) => `
            <button type="button" class="${i < s[key] ? 'live' : 'spent'}"
              data-action="set-charges" data-frame="${frame.id}" data-system="${key}"
              data-count="${i < s[key] ? i : i + 1}">${i + 1}</button>`).join('')}
        </div>
      </div>`);
  }

  const flags = [];
  if (s.jumpJets) flags.push(frame.jumpJetsDisabled ? chip('Jump Jets wrecked', 'danger') : chip('Jump Jets', 'ok'));
  if (s.datalink) flags.push(chip('Tactical Datalink', 'ok'));
  else if (frame.commStatic) flags.push(chip('Datalink severed', 'danger'));

  return `
    <div class="card">
      ${parts.join('')}
      ${flags.length ? `<div class="row wrap" style="gap:.3rem;margin-bottom:.7rem">${flags.join('')}</div>` : ''}

      <div class="row between" style="margin-bottom:.6rem;gap:.5rem">
        <div class="grow">
          <div style="font-weight:600">Terrain</div>
          <div class="tiny dim">Sets cover, movement cost, evasion cap and reactor cooling</div>
        </div>
      </div>
      <select data-action="set-terrain" data-frame="${frame.id}" style="margin-bottom:.7rem">
        ${TERRAIN_KEYS.map((key) => {
          const t = TERRAIN[key];
          const notes = [
            t.extraEP ? `+${t.extraEP} EP` : '',
            t.cover ? `+${t.cover} EVA cover` : '',
            t.cooling ? `+${t.cooling} EP cooling` : '',
            t.evaCap != null ? `EVA cap ${t.evaCap}` : '',
            t.pilotMod ? `${t.pilotMod > 0 ? '+' : ''}${t.pilotMod} pilot` : '',
          ].filter(Boolean).join(', ');
          return `<option value="${key}" ${frame.terrain === key ? 'selected' : ''}>${esc(t.name)}${notes ? ` — ${esc(notes)}` : ''}</option>`;
        }).join('')}
      </select>

      <div class="row" style="gap:.5rem">
        <button class="btn grow ${frame.prone ? 'primary' : ''}" data-action="toggle-prone" data-frame="${frame.id}">
          ${frame.prone ? 'Prone' : 'Standing'}
        </button>
        <button class="btn grow" data-action="pilot-check" data-frame="${frame.id}">Pilot Check</button>
      </div>
    </div>`;
}

// --- Actions -----------------------------------------------------------------

export function handle(action, el) {
  const frameId = el.dataset.frame;
  const delta = Number(el.dataset.delta || 0);

  switch (action) {
    case 'open-frame':
      openFrameId = frameId;
      return true;
    case 'close-frame':
      openFrameId = null;
      return true;

    case 'open-add-frame':
      showFramePicker();
      return true;

    case 'delete-frame': {
      const frame = getFrame(frameId);
      confirmModal(
        { title: `Withdraw ${frame.callsign}?`, body: 'This removes the frame and its damage from the battle.', confirmLabel: 'Withdraw', danger: true },
        () => { removeFrame(frameId); openFrameId = null; },
      );
      return true;
    }

    case 'adjust-ep':
      mutate(() => { const f = getFrame(frameId); f.ep = Math.max(0, f.ep + delta); });
      return true;
    case 'adjust-cap':
      mutate(() => {
        const f = getFrame(frameId);
        f.capacitor = Math.max(0, Math.min(R.effectiveCapacitorMax(f), f.capacitor + delta));
        f.overchargeAvailable = f.capacitor;
      });
      return true;
    case 'adjust-eva':
      mutate(() => {
        const f = getFrame(frameId);
        f.eva = Math.max(0, Math.min(R.effectiveEvasionLimit(f), f.eva + delta));
      });
      return true;

    case 'adjust-dr':
      mutate(() => {
        const loc = getFrame(frameId).locations[el.dataset.loc];
        loc.dr = Math.max(0, Math.min(loc.drMax, loc.dr + delta));
      });
      return true;

    case 'adjust-is':
      mutate(() => {
        const f = getFrame(frameId);
        const locKey = el.dataset.loc;
        const before = f.locations[locKey].is;
        // Route through the engine so a hand-entered kill applies the same
        // consequences as a resolved attack: lost weapons, falls, immobilization.
        R.setLocationStructure(f, locKey, before + delta);
        const loc = f.locations[locKey];
        if (loc.destroyed && before > 0) {
          logFrame(f, `${LOCATION_NAMES[locKey]} destroyed`);
          if (f.destroyed) logFrame(f, 'Frame destroyed');
          else if (f.immobilized) logFrame(f, 'Fell prone and is permanently crippled');
        }
      });
      return true;

    case 'set-ammo':
      mutate(() => {
        const w = getFrame(frameId).weapons.find((x) => x.id === el.dataset.weapon);
        w.ammo[el.dataset.type] = Number(el.dataset.count);
      });
      return true;

    case 'set-charges':
      mutate(() => {
        getFrame(frameId).systems[el.dataset.system] = Number(el.dataset.count);
      });
      return true;

    case 'toggle-amc':
      mutate(() => {
        const s = getFrame(frameId).systems.amc;
        s.active = !s.active;
        if (s.active && !s.bands.length) s.bands = ['vis'];
      });
      return true;

    case 'toggle-amc-band':
      mutate(() => {
        const s = getFrame(frameId).systems.amc;
        const band = el.dataset.band;
        if (s.bands.includes(band)) s.bands = s.bands.filter((b) => b !== band);
        else if (s.bands.length < 2) s.bands = [...s.bands, band];
        else toast('AMC can cloak at most two spectrums', 'error');
      });
      return true;

    case 'toggle-ecm':
      mutate(() => { const s = getFrame(frameId).systems.ecm; s.active = !s.active; });
      return true;

    case 'adjust-ecm-radius':
      mutate(() => {
        const s = getFrame(frameId).systems.ecm;
        s.radius = Math.max(0, Math.min(5, s.radius + delta));
      });
      return true;

    case 'toggle-prone':
      mutate(() => {
        const f = getFrame(frameId);
        f.prone = !f.prone;
        if (f.prone) f.eva = 0;
      });
      return true;

    case 'pilot-check': {
      const f = getFrame(frameId);
      const result = R.pilotCheck(f);
      const mods = [
        result.terrainMod && `${result.terrainMod > 0 ? '+' : ''}${result.terrainMod} terrain`,
        result.pilotBonus && `+${result.pilotBonus} pilot`,
        result.critMod && `${result.critMod} damage`,
      ].filter(Boolean).join(', ');
      mutate(() => logFrame(f, `Pilot Check: ${result.roll}${mods ? ` (${mods})` : ''} = ${result.total} vs 6+ — ${result.passed ? 'passed' : 'FAILED, falls Prone'}`));
      if (!result.passed) mutate(() => { f.prone = true; f.eva = 0; });
      toast(`Pilot Check ${result.total} vs 6+ — ${result.passed ? 'passed' : 'failed, now Prone'}`, result.passed ? 'ok' : 'error');
      return true;
    }

    default:
      return false;
  }
}

export function handleChange(action, el) {
  if (action === 'set-terrain') {
    mutate(() => {
      const f = getFrame(el.dataset.frame);
      f.terrain = el.value;
      f.eva = Math.min(f.eva, R.effectiveEvasionLimit(f));
    });
    return true;
  }
  return false;
}

// --- Frame picker -------------------------------------------------------------

function showFramePicker() {
  openModal(
    `<h2 style="font-size:1.05rem;margin-bottom:.2rem">Deploy a Frame</h2>
     <p class="small muted" style="margin-top:0">Choose a chassis from the roster.</p>
     <div class="picker">
       ${Object.values(FRAME_PRESETS).map((p) => `
         <button type="button" data-action="pick-frame" data-preset="${p.key}">
           <div>
             <div style="font-weight:600">${esc(p.name)}</div>
             <div class="stat">${esc(p.designation)} · ${p.tons}T · Init ${p.initiative} · Reactor ${p.reactor} · ${p.evasionLimit} EVA</div>
           </div>
           <div class="pts">${p.points} pts</div>
         </button>`).join('')}
     </div>
     <button class="btn block ghost" data-action="modal-cancel" style="margin-top:.8rem">Cancel</button>`,
    (action, el) => {
      if (action === 'pick-frame') {
        const frame = addFrame(el.dataset.preset, { team: pickTeam() });
        closeModal();
        openFrameId = frame.id;
        return true;
      }
      if (action === 'modal-cancel') { closeModal(); return true; }
      return false;
    },
  );
}

/** New frames join the team the device already owns, defaulting to A. */
function pickTeam() {
  const mine = myFrames();
  if (mine.length) return mine[0].team;
  const taken = new Set(framesList().map((f) => f.team));
  return taken.has('a') ? 'b' : 'a';
}
