// Battle view — round and phase control, turn order, and the movement actions
// that run during the Activation Phase.

import * as R from '../rules.js';
import {
  PHASE_NAMES, advancePhase, deviceId, framesList, getBattle, getFrame,
  logBattle, logFrame, mutate, orderedFrames, resetBattle, runEnergyPhase,
} from '../state.js';
import { closeModal, cls, confirmModal, empty, esc, meter, openModal, stepper, toast } from './dom.js';
import { locationStrip, setOpenFrame, statusChips } from './sheet.js';

export function render() {
  const battle = getBattle();
  const frames = framesList();

  if (!frames.length) {
    return `
      ${phaseCard(battle, [])}
      ${empty(
        'No frames on the board',
        'Deploy a frame to start tracking a battle.',
        '<button class="btn primary" data-action="goto-frames" style="margin-top:1rem">Deploy a Frame</button>',
      )}`;
  }

  const order = orderedFrames();

  return `
    ${phaseCard(battle, order)}

    <div class="section-title">
      ${battle.phase === 'combat' ? 'Firing Order — highest initiative first'
        : battle.phase === 'activation' ? 'Activation Order — lowest initiative first'
        : 'Initiative Order'}
    </div>
    ${order.map((frame, i) => frameCard(frame, i + 1, battle)).join('')}

    ${framesList().some((f) => f.destroyed) ? `
      <div class="section-title">Out of Action</div>
      ${framesList().filter((f) => f.destroyed).map((f) => frameCard(f, null, battle)).join('')}` : ''}

    ${battle.log?.length ? `
      <div class="section-title">Battle Log</div>
      <div class="card tight"><div class="log">
        ${battle.log.slice(0, 15).map((entry) => `
          <div class="log-entry"><span class="dim tiny">R${entry.round}</span> ${esc(entry.text)}</div>`).join('')}
      </div></div>` : ''}

    <button class="btn danger block ghost" data-action="reset-battle" style="margin-top:1rem">Reset Battle</button>
  `;
}

function phaseCard(battle, order) {
  const nextPhase = battle.phase === 'end' ? 'energy' : ['energy', 'activation', 'combat', 'end'][
    ['energy', 'activation', 'combat', 'end'].indexOf(battle.phase) + 1
  ];
  const nextLabel = battle.phase === 'end' ? `Round ${battle.round + 1} — Energy Phase` : `${PHASE_NAMES[nextPhase]} Phase`;

  return `
    <div class="card">
      <div class="row between" style="margin-bottom:.5rem">
        <div>
          <div class="tiny dim" style="letter-spacing:.12em;text-transform:uppercase">Round ${battle.round}</div>
          <div style="font-size:1.15rem;font-weight:600;color:var(--accent)">${PHASE_NAMES[battle.phase]} Phase</div>
        </div>
        ${order.length ? `<div class="tiny dim center">${order.length} active<br>frame${order.length === 1 ? '' : 's'}</div>` : ''}
      </div>
      <div class="small muted" style="margin-bottom:.7rem">${phaseHint(battle.phase)}</div>
      ${battle.phase === 'energy' && !battle.energyGenerated && order.length ? `
        <button class="btn primary block" data-action="generate-energy" style="margin-bottom:.5rem">
          Generate Energy
        </button>
        <button class="btn block" data-action="advance-phase">Skip → ${esc(nextLabel)}</button>
      ` : `
        <button class="btn primary block" data-action="advance-phase">Advance → ${esc(nextLabel)}</button>
      `}
    </div>`;
}

function phaseHint(phase) {
  return {
    energy: 'Reactors generate EP and banked capacitor charge rolls into the pool. Stealth upkeep is deducted automatically.',
    activation: 'Frames move from lowest initiative to highest. Spend EP step by step; evasion accrues as you go.',
    combat: 'Frames fire from highest initiative to lowest, resolved instantly. Use the Attack tab.',
    end: 'Advancing banks unused EP into capacitors, clears evasion and ticks cooldowns down.',
  }[phase];
}

function frameCard(frame, position, battle) {
  const mine = frame.ownerId === deviceId();
  const capMax = R.effectiveCapacitorMax(frame);
  const evaLimit = R.effectiveEvasionLimit(frame);
  const showMovement = battle.phase === 'activation' && mine && !frame.destroyed;

  return `
    <div class="card frame-card ${cls(frame.team === 'b' && 'team-b', mine && 'mine', frame.destroyed && 'destroyed')}"
         style="padding-left:.9rem">
      <div class="frame-head">
        ${position ? `<div class="order-num">${position}</div>` : ''}
        <div class="grow" data-action="open-frame-sheet" data-frame="${frame.id}">
          <div class="name">${esc(frame.callsign)}</div>
          <div class="desig">${esc(frame.designation)}${mine ? '' : ' · opponent'}</div>
        </div>
        <div class="init-badge"><b>${R.effectiveInitiative(frame)}</b><span>Init</span></div>
      </div>

      ${frame.destroyed ? '' : `
        <div class="row" style="gap:.7rem;margin-top:.6rem">
          <div class="grow">${meter('EP', frame.ep, Math.max(R.effectiveReactor(frame) + capMax, 1), 'ep')}</div>
          <div class="grow">${meter('Cap', frame.capacitor, Math.max(capMax, 1), 'cap')}</div>
          <div class="grow">${meter('EVA', frame.eva, Math.max(evaLimit, 1), 'eva')}</div>
        </div>`}

      ${statusChips(frame)}
      ${locationStrip(frame)}

      ${showMovement ? movementPanel(frame) : ''}
    </div>`;
}

function movementPanel(frame) {
  const limit = R.effectiveMovementLimit(frame);
  const actions = [
    { action: 'walk', label: 'Walk' },
    { action: 'reverse', label: 'Reverse' },
    { action: 'pivot', label: 'Pivot' },
    { action: 'jump', label: 'Jump' },
    { action: 'standUp', label: 'Stand Up' },
    { action: 'torsoTwist', label: 'Torso Twist' },
  ];

  return `
    <div style="margin-top:.7rem;padding-top:.7rem;border-top:1px solid var(--border)">
      <div class="row between tiny dim" style="margin-bottom:.45rem">
        <span>Movement ${frame.hexesMoved}/${limit} hexes</span>
        <span>${frame.ep} EP available</span>
      </div>
      <div class="row wrap" style="gap:.35rem">
        ${actions.map((a) => {
          const blocked = R.movementBlockedReason(frame, a.action, { hexes: 1 });
          const cost = R.movementCost(frame, a.action, { hexes: 1 });
          const noEP = cost > frame.ep;
          const disabled = blocked || noEP;
          const title = blocked || (noEP ? `Needs ${cost} EP` : '');
          // Standing on a severed leg is a gamble, not a certainty.
          const risky = a.action === 'standUp' && frame.immobilized;
          const label = risky ? 'Stand Up (check)' : a.label;
          return `<button class="btn sm" data-action="move" data-frame="${frame.id}" data-move="${a.action}"
                    ${disabled ? 'disabled' : ''} title="${esc(risky ? 'Pilot Check to rise on one leg — EP spent either way' : title)}">
                    ${esc(label)} <span class="dim">${cost} EP</span>
                  </button>`;
        }).join('')}
        <button class="btn sm" data-action="move-elevated" data-frame="${frame.id}">Climb +1</button>
      </div>
      <div class="row" style="gap:.35rem;margin-top:.4rem">
        <button class="btn sm grow" data-action="jump-multi" data-frame="${frame.id}"
          ${R.movementBlockedReason(frame, 'jump', { hexes: 1 }) ? 'disabled' : ''}>Jump N hexes…</button>
        <button class="btn sm grow" data-action="collision" data-frame="${frame.id}">Collision…</button>
      </div>
    </div>`;
}

// --- Actions -------------------------------------------------------------------

export function handle(action, el) {
  const frameId = el.dataset.frame;

  switch (action) {
    case 'generate-energy': {
      const reports = runEnergyPhase();
      const total = reports.reduce((n, r) => n + (r.report?.pool || 0), 0);
      toast(`${total} EP generated across ${reports.length} frame${reports.length === 1 ? '' : 's'}`, 'ok');
      return true;
    }

    case 'advance-phase': {
      const reports = advancePhase();
      const battle = getBattle();
      if (battle.phase === 'energy') {
        const total = reports.reduce((n, r) => n + (r.report?.pool || 0), 0);
        toast(`Energy Phase — ${total} EP generated across the lance`, 'ok');
      } else if (reports.some((r) => r.type === 'end')) {
        const vented = reports.reduce((n, r) => n + (r.report?.vented || 0), 0);
        toast(vented ? `Round complete — ${vented} EP vented` : 'Round complete', 'ok');
      }
      return true;
    }

    case 'open-frame-sheet':
      setOpenFrame(frameId);
      switchTab('frames');
      return true;

    case 'goto-frames':
      setOpenFrame(null);
      switchTab('frames');
      return true;

    case 'move': {
      const frame = getFrame(frameId);
      const move = el.dataset.move;
      const blocked = R.movementBlockedReason(frame, move, { hexes: 1 });
      if (blocked) { toast(blocked, 'error'); return true; }
      const report = mutate(() => {
        const result = R.performMovement(frame, move, { hexes: 1 });
        if (result.ok === false) return result;
        if (result.pilotCheck) {
          // Standing on a severed leg: the EP is spent whether it works or not.
          const c = result.pilotCheck;
          logFrame(frame, `Stand up on one leg — ${result.cost} EP, Pilot Check ${c.total} vs 6+: ${c.passed ? 'up' : 'slipped back down'}`);
        } else {
          logFrame(frame, `${labelFor(move)} — ${result.cost} EP${result.evaGained ? `, +${result.evaGained} EVA` : ''}`);
        }
        return result;
      });
      if (report.ok === false) { toast(report.reason, 'error'); return true; }
      if (report.pilotCheck) {
        const c = report.pilotCheck;
        toast(
          `Pilot Check ${c.total} vs 6+ — ${c.passed ? 'the frame hauls itself upright' : 'it slips back down, 3 EP spent'}`,
          c.passed ? 'ok' : 'error',
        );
      }
      return true;
    }

    case 'move-elevated': {
      const frame = getFrame(frameId);
      const blocked = R.movementBlockedReason(frame, 'walk', { hexes: 1 });
      if (blocked) { toast(blocked, 'error'); return true; }
      const report = mutate(() => {
        const result = R.performMovement(frame, 'walk', { elevationDelta: 1 });
        if (result.ok !== false) logFrame(frame, `Walk +1 level — ${result.cost} EP`);
        return result;
      });
      if (report.ok === false) toast(report.reason, 'error');
      return true;
    }

    case 'jump-multi':
      showJumpModal(getFrame(frameId));
      return true;

    case 'collision':
      showCollisionModal(getFrame(frameId));
      return true;

    case 'reset-battle':
      confirmModal(
        { title: 'Reset battle?', body: 'Clears all frames, damage and the log on this device.', confirmLabel: 'Reset', danger: true },
        () => { setOpenFrame(null); resetBattle(); toast('Battle reset'); },
      );
      return true;

    default:
      return false;
  }
}

function labelFor(move) {
  return { walk: 'Walk', reverse: 'Reverse', pivot: 'Pivot', jump: 'Jump', standUp: 'Stand up', torsoTwist: 'Torso twist' }[move] || move;
}

let switchTab = () => {};
export function setTabSwitcher(fn) { switchTab = fn; }

// --- Jump modal -------------------------------------------------------------------

function showJumpModal(frame) {
  let hexes = 1;

  const body = () => {
    const cost = R.movementCost(frame, 'jump', { hexes });
    const blocked = R.movementBlockedReason(frame, 'jump', { hexes });
    const eva = Math.min(R.effectiveEvasionLimit(frame), (frame.eva || 0) + hexes * 2);
    return `
      <h2 style="font-size:1.05rem;margin-bottom:.2rem">Jump Jets</h2>
      <p class="small muted" style="margin-top:0">Straight line, up to 4 hexes, bypassing intervening terrain.</p>
      <div class="row between" style="margin:.8rem 0">
        <span>Hexes jumped</span>
        ${stepper('jump-hexes', hexes, { min: 1, max: 4 })}
      </div>
      <div class="math">
        <div>${hexes} hex${hexes === 1 ? '' : 'es'} × 2 EP = ${cost} EP</div>
        <div>Evasion ${frame.eva} → ${eva} (2 per hex, limit ${R.effectiveEvasionLimit(frame)})</div>
        ${blocked ? `<div style="color:var(--danger)">${esc(blocked)}</div>` : ''}
        ${cost > frame.ep ? `<div style="color:var(--danger)">Not enough EP (has ${frame.ep})</div>` : ''}
      </div>
      <p class="tiny dim">Landing in Rough, Deep Water, a Building Roof or Woods needs a Pilot Check on touchdown.</p>
      <div class="row" style="gap:.5rem;margin-top:.8rem">
        <button class="btn grow" data-action="modal-cancel">Cancel</button>
        <button class="btn grow primary" data-action="do-jump" ${blocked || cost > frame.ep ? 'disabled' : ''}>Jump</button>
      </div>`;
  };

  openModal(body(), (action, el, { update }) => {
    if (action === 'jump-hexes') {
      hexes = Math.max(1, Math.min(4, hexes + Number(el.dataset.delta)));
      update(body());
      return true;
    }
    if (action === 'do-jump') {
      mutate(() => {
        const result = R.performMovement(frame, 'jump', { hexes });
        logFrame(frame, `Jump ${hexes} hex${hexes === 1 ? '' : 'es'} — ${result.cost} EP, +${result.evaGained} EVA`);
      });
      closeModal();
      toast(`Jumped ${hexes} hexes`, 'ok');
      return true;
    }
    if (action === 'modal-cancel') { closeModal(); return true; }
    return false;
  });
}

// --- Collision modal ----------------------------------------------------------------

function showCollisionModal(frame) {
  const others = framesList().filter((f) => f.id !== frame.id && !f.destroyed);
  let targetId = others[0]?.id || null;
  let hexes = Math.max(1, frame.hexesMoved || 1);

  const body = () => {
    const target = targetId ? getFrame(targetId) : null;
    const pool = R.collisionDicePool(frame, hexes);
    return `
      <h2 style="font-size:1.05rem;margin-bottom:.2rem">Collision</h2>
      <p class="small muted" style="margin-top:0">Both frames take ${pool}d6 to a random location. Evasion does not apply.</p>
      ${others.length ? `
        <label class="tiny dim">Collided with</label>
        <select data-action="collision-target" style="margin-bottom:.6rem">
          ${others.map((f) => `<option value="${f.id}" ${f.id === targetId ? 'selected' : ''}>${esc(f.callsign)}</option>`).join('')}
        </select>` : '<p class="small" style="color:var(--warn)">No other frames on the board.</p>'}
      <div class="row between" style="margin:.6rem 0">
        <span>Hexes moved before impact</span>
        ${stepper('collision-hexes', hexes, { min: 0, max: 10 })}
      </div>
      <div class="math">
        <div>Mass ${R.massValue(frame)} + speed ${hexes} = <span class="final">${pool}d6</span> to each frame</div>
        ${target ? `<div>Target: ${esc(target.callsign)}</div>` : ''}
        <div>Both pilots then check 2d6 vs 6+ or fall Prone</div>
      </div>
      <div class="row" style="gap:.5rem;margin-top:.8rem">
        <button class="btn grow" data-action="modal-cancel">Cancel</button>
        <button class="btn grow primary" data-action="do-collision" ${target ? '' : 'disabled'}>Resolve</button>
      </div>`;
  };

  openModal(body(), (action, el, { update }) => {
    if (action === 'collision-hexes') {
      hexes = Math.max(0, Math.min(10, hexes + Number(el.dataset.delta)));
      update(body());
      return true;
    }
    if (action === 'collision-target') { targetId = el.value; return true; }
    if (action === 'do-collision') {
      const target = getFrame(targetId);
      const pool = R.collisionDicePool(frame, hexes);
      const lines = [];
      mutate((battle) => {
        for (const victim of [frame, target]) {
          const damage = R.sum(R.rollDice(pool));
          const { location } = R.lookupHitLocation(R.roll2d6().total, 'front');
          // Armor DR applies to collisions; Evasion does not (rules.md 2.2).
          const report = R.applyDamage(victim, location, damage, { evasion: 0 });
          let critNote = '';
          if (report.shouldRollCrit) {
            const crit = R.rollCrit(location);
            R.applyCrit(victim, crit, location);
            critNote = `, ${crit.name}`;
          }
          const check = R.pilotCheck(victim);
          if (!check.passed) { victim.prone = true; victim.eva = 0; }
          lines.push(`${victim.callsign}: ${damage} to ${report.locationName}${critNote}, pilot check ${check.total} — ${check.passed ? 'stays up' : 'falls Prone'}`);
          logFrame(victim, `Collision: ${damage} damage to ${report.locationName}${critNote}; ${check.passed ? 'kept footing' : 'fell Prone'}`);
        }
        logBattle(battle, `Collision between ${frame.callsign} and ${target.callsign}`);
      });
      closeModal();
      toast(lines.join(' · '), 'ok');
      return true;
    }
    if (action === 'modal-cancel') { closeModal(); return true; }
    return false;
  });
}
