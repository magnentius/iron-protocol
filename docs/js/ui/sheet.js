// Frame sheet — the digital equivalent of frames/*.md, with the derived numbers
// kept live. Everything here is manually adjustable; the attack resolver writes
// to the same fields.
//
// The two trackers deliberately mirror the paper sheet, because players will
// often have both in front of them:
//   Armor DR   — a row of boxes crossed off from the highest down
//   Criticals  — the location's slots, marked as they are taken

import {
  CRIT_TABLES, CRIT_TABLE_FOR, CRIT_TABLE_MAX,
  LOCATIONS, LOCATION_NAMES, SENSOR_BANDS, TERRAIN, TERRAIN_KEYS,
  AMMO_TYPES, AMMO_DIE,
} from '../data/tables.js';
import * as R from '../rules.js';
import { deviceId, getFrame, logAction, logFrame, mutate, myFrames, framesList, removeFrame, addFrame } from '../state.js';
import { FRAME_PRESETS } from '../data/frames.js';
import { chip, closeModal, cls, confirmModal, esc, logList, meter, openModal, stepper, toast } from './dom.js';

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
    <div class="card frame-card ${cls(frame.team === 'b' && 'team-b', mine && 'mine', R.isDestroyed(frame) && 'destroyed')}"
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

const SHORT = { head: 'HD', torso: 'CT', leftArm: 'LA', rightArm: 'RA', leftLeg: 'LL', rightLeg: 'RL' };

/** Compact per-location readout: remaining DR over marked crit slots. */
export function locationStrip(frame) {
  return `<div class="loc-strip">${LOCATIONS.map((key) => {
    const loc = frame.locations[key];
    const table = CRIT_TABLE_FOR[key];
    const marked = Object.keys(loc.crits || {}).length;
    return `
      <div class="loc ${loc.destroyed ? 'gone' : ''}">
        <div class="mono" style="font-size:.78rem;font-weight:700">${loc.dr}</div>
        <div class="tiny dim">${marked}/${CRIT_TABLE_MAX[table]}</div>
        <span>${SHORT[key]}</span>
      </div>`;
  }).join('')}</div>`;
}

export function statusChips(frame) {
  const chips = [];
  if (R.isDestroyed(frame)) chips.push(chip('DESTROYED', 'danger'));
  if (frame.prone) chips.push(chip('Prone', 'warn'));
  if (frame.flankSpeed) chips.push(chip('Flank Speed', 'ok'));
  if (R.hasCrippledLeg(frame)) chips.push(chip('Crippled leg −2', 'danger'));
  if (R.isIRLockable(frame)) chips.push(chip('IR Lockable', 'warn'));
  if (frame.adaptiveSkinActive) {
    const bands = (frame.adaptiveSkinBandKeys || []).map((b) => SENSOR_BANDS[b]).join(' + ');
    chips.push(chip(`Skin ${bands || 'on'}`, 'accent'));
  }
  if (frame.ecmActive) chips.push(chip(`ECM${frame.ecmRadius ? ` +${frame.ecmRadius}` : ''}`, 'accent'));
  if (frame.electricalFire) chips.push(chip('Electrical Fire', 'danger'));
  if (frame.sensorsScrambled) chips.push(chip('Sensors Scrambled', 'warn'));
  if (frame.locksDropped) chips.push(chip('Locks Dropped', 'warn'));
  for (const [band, on] of Object.entries(frame.sensorBandsDestroyed || {})) {
    if (on) chips.push(chip(`${SENSOR_BANDS[band]} array gone`, 'danger'));
  }
  if (frame.kneeLock) chips.push(chip('Knee Lock', 'warn'));
  if (frame.servoLock) chips.push(chip('Servo Lock', 'warn'));
  if (frame.datalinkSevered) chips.push(chip('No Datalink', 'warn'));
  if (frame.jumpJetsEmpty) chips.push(chip('Propellant dry', 'warn'));
  if (frame.dishonored) chips.push(chip('Dishonored', 'danger'));
  const facing = frame.torsoFacing || 'center';
  if (facing !== 'center') chips.push(chip(`Torso twisted ${facing}`, 'accent'));
  if (frame.terrain !== 'clear') {
    const t = TERRAIN[frame.terrain];
    chips.push(chip(`${t.name}${t.cover ? ` · ${t.cover} Cover` : ''}`, t.cover ? 'ok' : ''));
  }
  return chips.length ? `<div class="row wrap" style="gap:.3rem;margin-top:.5rem">${chips.join('')}</div>` : '';
}

// --- Full sheet --------------------------------------------------------------

function renderSheet(frame) {
  const mine = frame.ownerId === deviceId();
  const capMax = R.effectiveCapacitorMax(frame);
  const rerolls = R.rerollAllowance(frame);

  return `
    <div class="row between" style="margin-bottom:.6rem">
      <button class="btn sm ghost" data-action="close-frame">← All Frames</button>
      ${mine ? `<button class="btn sm danger" data-action="delete-frame" data-frame="${frame.id}">Withdraw</button>` : ''}
    </div>

    <div class="card frame-card ${cls(frame.team === 'b' && 'team-b', R.isDestroyed(frame) && 'destroyed')}" style="padding-left:.9rem">
      <div class="frame-head">
        <div class="grow">
          <div class="name">${esc(frame.callsign)}</div>
          <div class="desig">${esc(frame.designation)} · ${esc(frame.role)}</div>
          <div class="tiny dim" style="margin-top:.2rem">
            ${frame.tons}T ${esc(TERRAIN[frame.terrain].name)} · Mass ${R.massValue(frame)} ·
            Move ${frame.hexesMoved || 0}/${R.effectiveMovementLimit(frame)} hexes
          </div>
        </div>
        <div class="init-badge"><b>${R.effectiveInitiative(frame)}</b><span>Init</span></div>
      </div>
      ${statusChips(frame)}
    </div>

    <div class="section-title">Energy</div>
    <div class="card">
      <div class="row between" style="margin-bottom:.5rem">
        <div class="grow">${meter('Energy Pool', frame.ep, Math.max(R.effectiveReactor(frame) + capMax, 1), 'ep')}</div>
        ${stepper('adjust-ep', frame.ep, { min: 0, max: 99, params: { frame: frame.id } })}
      </div>
      <div class="row between">
        <div class="grow">${meter('Capacitor (reserve)', frame.capacitor, Math.max(capMax, 1), 'cap')}</div>
        ${stepper('adjust-cap', frame.capacitor, { min: 0, max: capMax, params: { frame: frame.id } })}
      </div>
      <div class="row wrap tiny dim" style="gap:.5rem;margin-top:.6rem;justify-content:space-between">
        <span>Reactor ${R.effectiveReactor(frame)}${frame.reactorMod ? ` (${frame.reactorMod})` : ''}/turn</span>
        <span>${R.availableEP(frame)} EP available</span>
        <span>Spent ${frame.epSpentThisTurn || 0}${R.isIRLockable(frame) ? ' — IR lockable' : ''}</span>
      </div>
    </div>

    <div class="section-title">Defence</div>
    <div class="card">
      <div class="row between" style="gap:.5rem">
        <div class="grow">
          <div style="font-weight:600">Flank Speed</div>
          <div class="tiny dim">Exit 4+ hexes, or complete a 2+ hex jump. Denied by water and by being Prone.</div>
        </div>
        <button class="btn sm ${frame.flankSpeed ? 'primary' : ''}" data-action="toggle-flank" data-frame="${frame.id}">
          ${frame.flankSpeed ? 'Active' : 'Off'}
        </button>
      </div>
      <div class="tiny dim" style="margin-top:.6rem">
        Damage-dice rerolls available to this Frame: <b>${rerolls}</b>
        ${rerolls ? ` (${[frame.flankSpeed && !frame.prone ? 'Flank Speed 1' : '', TERRAIN[frame.terrain].cover ? `Cover ${TERRAIN[frame.terrain].cover}` : ''].filter(Boolean).join(' + ')})` : ''}
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

    ${frame.log?.length ? `
      <div class="section-title">Frame Log</div>
      <div class="card tight">${logList(frame.log, 15)}</div>` : ''}
  `;
}

/**
 * One location: the Armor DR box track, then its critical slots.
 * Tapping a DR box sets DR to that value; tapping a crit slot toggles it.
 */
function locationRow(frame, key) {
  const loc = frame.locations[key];
  const table = CRIT_TABLE_FOR[key];
  const max = CRIT_TABLE_MAX[table];

  const drBoxes = Array.from({ length: loc.drMax + 1 }, (_, i) => {
    const value = loc.drMax - i; // highest first, as printed
    return `<button type="button" class="${value <= loc.dr ? 'live' : 'spent'}"
      data-action="set-dr" data-frame="${frame.id}" data-loc="${key}" data-value="${value}">${value}</button>`;
  }).join('');

  const critSlots = Array.from({ length: max }, (_, i) => {
    const slot = i + 1;
    const marked = Boolean((loc.crits || {})[slot]);
    const entry = CRIT_TABLES[table][slot];
    return `<button type="button" class="${marked ? 'spent' : 'live'}" title="${esc(entry.name)}"
      data-action="toggle-crit" data-frame="${frame.id}" data-loc="${key}" data-slot="${slot}">${slot}</button>`;
  }).join('');

  const markedList = Object.keys(loc.crits || {})
    .map(Number).sort((a, b) => a - b)
    .map((slot) => CRIT_TABLES[table][slot])
    .filter(Boolean);

  return `
    <div class="loc-row ${loc.destroyed ? 'gone' : ''}" style="display:block">
      <div class="row between">
        <div class="loc-name">
          ${esc(LOCATION_NAMES[key])}
          ${loc.destroyed ? ' <span class="chip danger">Destroyed</span>' : ''}
          ${loc.actuatorDestroyed && !loc.destroyed ? ' <span class="chip danger">Actuator gone</span>' : ''}
        </div>
        <div class="mono small">DR <b>${loc.dr}</b>/${loc.drMax}</div>
      </div>

      <div class="pips" style="margin-top:.35rem">${drBoxes}</div>

      <div class="row between" style="margin-top:.5rem">
        <span class="tiny dim">Criticals — tap to mark. Cascades climb to the next open slot.</span>
        <span class="tiny dim">${markedList.length}/${max}</span>
      </div>
      <div class="pips" style="margin-top:.25rem">${critSlots}</div>

      ${markedList.length ? `
        <div class="tiny" style="margin-top:.4rem;color:var(--danger)">
          ${markedList.map((c) => esc(c.name)).join(' · ')}
        </div>` : ''}
    </div>`;
}

function weaponCard(frame, weapon) {
  const def = R.weaponDef(weapon);
  const blocked = R.weaponBlockedReason(frame, weapon);
  const cost = R.weaponEPCost(frame, weapon);
  const band = R.weaponBand(weapon);

  const damageText = def.damage
    ? `${R.damageDiceCount(frame, weapon)}d6${def.burstDice ? ` × ${def.burstDice} per burst` : ''}`
    : def.warheads ? `${esc(def.warheads[weapon.warhead]?.name || '')} warhead` : 'No damage';

  const traits = [];
  if (band && band !== 'any') traits.push(`${SENSOR_BANDS[band] || band.toUpperCase()} lock`);
  if (def.ap) traits.push(`AP ${def.ap}`);
  if (def.rapidFire) traits.push('Rapid Fire');
  if (def.aoe) traits.push('AoE');
  if (def.bypassesArmor) traits.push('Ignores Armor DR');
  if (def.bypassesFlankSpeed) traits.push('Ignores Flank Speed');
  if (def.requiresOvercharge) traits.push(`Must Overcharge +${def.requiresOvercharge} EP`);
  if (def.overcharge?.epPerDie) traits.push(`Overcharge +1d6 per ${def.overcharge.epPerDie} EP, max +${def.overcharge.maxDice}d6`);
  if (weapon.ammoType) traits.push(AMMO_TYPES[weapon.ammoType]?.name || weapon.ammoType);

  const ammoThreshold = R.ammoDieFor(weapon);

  return `
    <div class="card ${weapon.destroyed ? 'destroyed' : ''}" style="${weapon.destroyed ? 'opacity:.5' : ''}">
      <div class="row between">
        <div class="grow">
          <div style="font-weight:600">${esc(def.name)}</div>
          <div class="tiny dim">${esc(LOCATION_NAMES[weapon.loc])} · ${cost.base} EP · ${damageText}</div>
        </div>
        ${weapon.cooldown ? chip(`Cooldown ${weapon.cooldown}`, 'warn') : ''}
        ${weapon.firedThisTurn && !weapon.cooldown ? chip('Fired', 'accent') : ''}
        ${weapon.empty ? chip('EMPTY', 'danger') : ''}
      </div>
      ${traits.length ? `<div class="row wrap" style="gap:.3rem;margin-top:.4rem">${traits.map((t) => chip(t)).join('')}</div>` : ''}
      ${ammoThreshold != null ? `
        <div class="row between" style="margin-top:.5rem;gap:.5rem">
          <div class="grow tiny dim">
            Ammo Die 1d6 — Empty on ${ammoThreshold === 1 ? '1' : `1-${ammoThreshold}`}.
            Nothing reloads in the field.
          </div>
          <button class="btn sm ${weapon.empty ? 'danger' : ''}" data-action="toggle-empty"
                  data-frame="${frame.id}" data-weapon="${weapon.id}">
            ${weapon.empty ? 'Empty' : 'Loaded'}
          </button>
        </div>` : `<div class="tiny dim" style="margin-top:.4rem">Ammunition: infinite</div>`}
      <div class="tiny dim" style="margin-top:.4rem">Arc: ${esc(R.weaponArc(frame, weapon).arcs)}</div>
      ${blocked && !weapon.destroyed ? `<div class="tiny" style="color:var(--warn);margin-top:.4rem">${esc(blocked)}</div>` : ''}
    </div>`;
}

function systemsCard(frame) {
  const s = frame.systems || {};
  const parts = [];

  if (s.adaptiveSkin) {
    const bands = frame.adaptiveSkinBandKeys || [];
    parts.push(`
      <div class="row between" style="margin-bottom:.5rem">
        <div class="grow">
          <div style="font-weight:600">Adaptive Skin</div>
          <div class="tiny dim">2 EP upkeep, +2 to cloak a second band. Contests locks on a Countermeasure Check (4+).</div>
        </div>
        <button class="btn sm ${frame.adaptiveSkinActive ? 'primary' : ''}" data-action="toggle-skin" data-frame="${frame.id}">
          ${frame.adaptiveSkinActive ? 'Active' : 'Off'}
        </button>
      </div>
      <div class="row wrap" style="gap:.3rem;margin-bottom:.7rem">
        ${Object.entries(SENSOR_BANDS).map(([band, name]) => `
          <button class="btn sm ${bands.includes(band) ? 'primary' : ''}"
            data-action="toggle-skin-band" data-frame="${frame.id}" data-band="${band}">${esc(name)}</button>`).join('')}
      </div>`);
  }

  if (s.ecm) {
    parts.push(`
      <div class="row between" style="margin-bottom:.5rem">
        <div class="grow">
          <div style="font-weight:600">ECM Suite</div>
          <div class="tiny dim">2 EP upkeep, +1 per hex of radius. Contests Radar locks on a Countermeasure Check (4+).</div>
        </div>
        <button class="btn sm ${frame.ecmActive ? 'primary' : ''}" data-action="toggle-ecm" data-frame="${frame.id}">
          ${frame.ecmActive ? 'Active' : 'Off'}
        </button>
      </div>
      <div class="row between" style="margin-bottom:.7rem">
        <span class="small muted">Radius (hexes)</span>
        ${stepper('adjust-ecm-radius', frame.ecmRadius || 0, { min: 0, max: 5, params: { frame: frame.id } })}
      </div>`);
  }

  // Cartridge launchers: no counters, just loaded or Empty (rules.md 5.0).
  const CARTRIDGES = [
    ['flares', 'Flare Launcher', 'Contests an IR-locked attack. Free to fire.'],
    ['chaff', 'Chaff Dispenser', 'Contests a Radar-locked attack. Free to fire.'],
    ['smoke', 'Smoke Launcher', 'Contests Visual locks traced through it. 1 EP to deploy.'],
  ];
  for (const [key, label, hint] of CARTRIDGES) {
    if (!s[key]) continue;
    const isEmpty = Boolean(frame[`${key}Empty`]);
    parts.push(`
      <div class="row between" style="margin-bottom:.6rem;gap:.5rem">
        <div class="grow">
          <div style="font-weight:600">${label}</div>
          <div class="tiny dim">${hint} Ammo Die: Empty on 1 — about ${AMMO_DIE.countermeasure.expect}.</div>
        </div>
        <button class="btn sm ${isEmpty ? 'danger' : ''}" data-action="toggle-cartridge"
                data-frame="${frame.id}" data-system="${key}">${isEmpty ? 'Empty' : 'Loaded'}</button>
      </div>`);
  }

  if (s.jumpJets) {
    parts.push(`
      <div class="row between" style="margin-bottom:.6rem;gap:.5rem">
        <div class="grow">
          <div style="font-weight:600">Jump Jets</div>
          <div class="tiny dim">2 EP per hex. A 2+ hex jump grants Flank Speed. Propellant is a volatile store.</div>
        </div>
        <button class="btn sm ${frame.jumpJetsEmpty ? 'danger' : ''}" data-action="toggle-jets"
                data-frame="${frame.id}">${frame.jumpJetsEmpty ? 'Dry' : 'Fuelled'}</button>
      </div>`);
  }

  const flags = [];
  if (s.datalink) flags.push(frame.datalinkSevered ? chip('Datalink severed', 'danger') : chip('Tactical Datalink', 'ok'));
  if (R.hasVolatileStore(frame)) flags.push(chip('Volatile store aboard', 'warn'));

  return `
    <div class="card">
      ${parts.join('')}
      ${flags.length ? `<div class="row wrap" style="gap:.3rem;margin-bottom:.7rem">${flags.join('')}</div>` : ''}

      <div class="row between" style="margin-bottom:.4rem;gap:.5rem">
        <div class="grow">
          <div style="font-weight:600">Terrain</div>
          <div class="tiny dim">Sets Cover rerolls, movement cost and reactor cooling</div>
        </div>
      </div>
      <select data-action="set-terrain" data-frame="${frame.id}" style="margin-bottom:.7rem">
        ${TERRAIN_KEYS.map((key) => {
          const t = TERRAIN[key];
          const notes = [
            t.extraEP ? `+${t.extraEP} EP` : '',
            t.cover ? `${t.cover} Cover reroll${t.cover > 1 ? 's' : ''}` : '',
            t.cooling ? `+${t.cooling} EP cooling` : '',
            t.blocksFlankSpeed ? 'no Flank Speed' : '',
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
      ${frame.prone ? `
        <button class="btn block" data-action="stand-up" data-frame="${frame.id}" style="margin-top:.5rem">
          Stand Up — 3 EP${R.hasCrippledLeg(frame) ? ' and a Pilot Check at −2' : ''}
        </button>` : ''}
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
      });
      return true;

    // Tap a box on the Armor DR track to set it directly, as on paper.
    case 'set-dr':
      mutate(() => {
        const loc = getFrame(frameId).locations[el.dataset.loc];
        loc.dr = Math.max(0, Math.min(loc.drMax, Number(el.dataset.value)));
      });
      return true;

    /**
     * Toggle a critical slot by hand. Marking one runs the real effect through
     * the engine, so a hand-entered critical behaves exactly like a resolved
     * one — losing a weapon, dropping DR to 0, falling Prone, and so on.
     * Unmarking only clears the box; it cannot un-apply what the effect did.
     */
    case 'toggle-crit':
      mutate(() => {
        const f = getFrame(frameId);
        const locKey = el.dataset.loc;
        const slot = Number(el.dataset.slot);
        const loc = f.locations[locKey];
        loc.crits = loc.crits || {};
        if (loc.crits[slot]) {
          delete loc.crits[slot];
          logAction(f, `crit-${locKey}`, `${LOCATION_NAMES[locKey]} crit cleared`,
            `${LOCATION_NAMES[locKey]} critical slot ${slot} cleared by hand`);
          return;
        }
        const table = CRIT_TABLE_FOR[locKey];
        const entry = CRIT_TABLES[table][slot];
        R.applyCrit(f, { ...entry, slot, table, location: locKey });
        logAction(f, `crit-${locKey}`, `${LOCATION_NAMES[locKey]} critical`,
          `${LOCATION_NAMES[locKey]}: ${entry.name}`);
        if (R.isDestroyed(f)) logAction(f, 'destroyed', 'Destroyed', 'Frame destroyed');
      });
      return true;

    case 'toggle-empty':
      mutate(() => {
        const w = getFrame(frameId).weapons.find((x) => x.id === el.dataset.weapon);
        w.empty = !w.empty;
      });
      return true;

    case 'toggle-cartridge':
      mutate(() => {
        const f = getFrame(frameId);
        const key = `${el.dataset.system}Empty`;
        f[key] = !f[key];
      });
      return true;

    case 'toggle-jets':
      mutate(() => { const f = getFrame(frameId); f.jumpJetsEmpty = !f.jumpJetsEmpty; });
      return true;

    case 'toggle-skin':
      mutate(() => {
        const f = getFrame(frameId);
        f.adaptiveSkinActive = !f.adaptiveSkinActive;
        if (f.adaptiveSkinActive && !(f.adaptiveSkinBandKeys || []).length) f.adaptiveSkinBandKeys = ['vis'];
        f.adaptiveSkinBands = Math.max(1, (f.adaptiveSkinBandKeys || []).length);
      });
      return true;

    case 'toggle-skin-band':
      mutate(() => {
        const f = getFrame(frameId);
        const band = el.dataset.band;
        const bands = f.adaptiveSkinBandKeys || [];
        if (bands.includes(band)) f.adaptiveSkinBandKeys = bands.filter((b) => b !== band);
        else if (bands.length < 2) f.adaptiveSkinBandKeys = [...bands, band];
        else toast('An Adaptive Skin can cloak at most two spectrums', 'error');
        f.adaptiveSkinBands = Math.max(1, (f.adaptiveSkinBandKeys || []).length);
      });
      return true;

    case 'toggle-ecm':
      mutate(() => { const f = getFrame(frameId); f.ecmActive = !f.ecmActive; });
      return true;

    case 'adjust-ecm-radius':
      mutate(() => {
        const f = getFrame(frameId);
        f.ecmRadius = Math.max(0, Math.min(5, (f.ecmRadius || 0) + delta));
      });
      return true;

    case 'toggle-flank':
      mutate(() => {
        const f = getFrame(frameId);
        if (f.flankSpeed) { f.flankSpeed = false; return; }
        // Set the state the rules would have produced, then let the engine
        // decide whether it is actually allowed here.
        f.hexesMoved = Math.max(f.hexesMoved || 0, 4);
        R.updateFlankSpeed(f);
        if (!f.flankSpeed) {
          toast(f.prone ? 'A Prone Frame cannot gain Flank Speed' : 'This terrain denies Flank Speed', 'error');
        }
      });
      return true;

    case 'toggle-prone':
      mutate(() => {
        const f = getFrame(frameId);
        f.prone = !f.prone;
        if (f.prone) f.flankSpeed = false;
      });
      return true;

    case 'stand-up': {
      const f = getFrame(frameId);
      const result = mutate(() => R.performMovement(f, 'standUp'));
      if (!result.ok) { toast(result.reason, 'error'); return true; }
      if (result.check) {
        mutate(() => logAction(f, 'stand-up', 'Stand Up',
          `Stand Up: ${result.check.roll}${result.check.modifier ? ` ${result.check.modifier > 0 ? '+' : ''}${result.check.modifier}` : ''} = ${result.check.result} vs 6+ — ${result.stoodUp ? 'up' : 'failed, 3 EP spent'}`, result.cost));
        toast(result.stoodUp ? 'Back on its feet' : 'Failed to rise — the 3 EP is spent regardless', result.stoodUp ? 'ok' : 'error');
      } else {
        mutate(() => logAction(f, 'stand-up', 'Stand Up', 'Stood up (3 EP)', result.cost));
      }
      return true;
    }

    case 'pilot-check': {
      const f = getFrame(frameId);
      const result = R.pilotCheck(f);
      const b = result.breakdown;
      const mods = [
        b.terrain && `${b.terrain > 0 ? '+' : ''}${b.terrain} terrain`,
        b.crippledLeg && `${b.crippledLeg} crippled leg`,
        b.pilot && `+${b.pilot} pilot`,
        b.courage && `+${b.courage} Vow of Courage`,
      ].filter(Boolean).join(', ');
      mutate(() => logAction(f, 'pilot-check', 'Pilot Check',
        `Pilot Check: ${result.roll}${mods ? ` (${mods})` : ''} = ${result.result} vs 6+ — ${result.passed ? 'passed' : 'FAILED, falls Prone'}`));
      if (!result.passed) mutate(() => { f.prone = true; f.flankSpeed = false; });
      toast(`Pilot Check ${result.result} vs 6+ — ${result.passed ? 'passed' : 'failed, now Prone'}`, result.passed ? 'ok' : 'error');
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
      R.updateFlankSpeed(f); // water denies it outright
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
             <div class="stat">${esc(p.designation)} · ${p.tons}T · Init ${p.initiative} · Reactor ${p.reactor} · Torso DR ${p.locations.torso}</div>
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
