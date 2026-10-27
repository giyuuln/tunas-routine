/* Tunas Routine — app logic. Everything is stored in this browser's localStorage. */
"use strict";

/* ================= Icons ================= */
const I = {
  sun:'<svg class="ico" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M11 1h2v4h-2zM11 19h2v4h-2zM1 11h4v2H1zM19 11h4v2h-4zM4.2 5.6l1.4-1.4 2.8 2.8-1.4 1.4zM15.6 17l1.4-1.4 2.8 2.8-1.4 1.4zM4.2 18.4 7 15.6 8.4 17l-2.8 2.8zM15.6 7 18.4 4.2l1.4 1.4L17 8.4z"/></svg>',
  walk:'<svg class="ico" viewBox="0 0 24 24"><circle cx="13.5" cy="4" r="2.2"/><path d="M10.6 7.4 7 9.2V13h2v-2.5l1.6-.8-1.9 9.8 2 .4 1.2-5.6 2.1 2V22h2v-5.5l-2.4-2.3.7-3.4c1 1.3 2.5 2.2 4.2 2.2v-2c-1.4 0-2.6-.8-3.2-2l-.9-1.7a2.3 2.3 0 0 0-2.8-1.1z"/></svg>',
  dumb:'<svg class="ico" viewBox="0 0 24 24"><path d="M2 10h2V8h2v8H4v-2H2zM18 8h2v2h2v4h-2v2h-2zM7 6h3v12H7zM14 6h3v12h-3zM10 11h4v2h-4z"/></svg>',
  focus:'<svg class="ico" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M4 4h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm1 2v8h14V6zM1 18h22l-1.5 2h-19z"/></svg>',
  moon:'<svg class="ico" viewBox="0 0 24 24"><path d="M20.5 15A8.5 8.5 0 0 1 9 3.5a8.5 8.5 0 1 0 11.5 11.5z"/><circle cx="17" cy="5" r="1.2"/><circle cx="20" cy="9" r=".9"/></svg>',
  cal:'<svg class="ico" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M5 4h2V2h2v2h6V2h2v2h2a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 6v9h14v-9zm2 2h4v4H7z"/></svg>',
  book:'<svg class="ico" viewBox="0 0 24 24"><path d="M4 3h7a2 2 0 0 1 2 2v15a2 2 0 0 0-2-2H4zM20 3h-5a2 2 0 0 0-2 2v15a2 2 0 0 1 2-2h5z"/></svg>',
  heart:'<svg class="ico" viewBox="0 0 24 24"><path d="M12 21 3.5 12.6A5 5 0 0 1 12 6a5 5 0 0 1 8.5 6.6z"/></svg>',
  check:'<svg viewBox="0 0 24 24"><path d="M9.5 16.2 5.3 12l-1.8 1.8 6 6L21 8.3l-1.8-1.8z"/></svg>',
  flame:'<svg viewBox="0 0 24 24"><path d="M12 1.5c1.2 4.4 5.8 6.2 5.8 12.1a5.8 5.8 0 0 1-11.6 0c0-2.9 1.4-4.7 2.9-5.8.2 2.1 1.1 3.3 2.3 3.8C11 7.9 11.3 4.6 12 1.5z"/></svg>',
  bolt:'<svg viewBox="0 0 24 24"><path d="M13.5 1.5 3.5 14h7l-1 8.5 10-12.5h-7z"/></svg>',
  shield:'<svg viewBox="0 0 24 24"><path d="M12 1.5 3.5 5v6.2c0 5.3 3.6 9.9 8.5 11.3 4.9-1.4 8.5-6 8.5-11.3V5z"/></svg>',
  star:'<svg viewBox="0 0 24 24"><path d="m12 2 3 6.3 6.9.9-5 4.8 1.2 6.9L12 17.6l-6.1 3.3L7.1 14l-5-4.8 6.9-.9z"/></svg>',
  trophy:'<svg viewBox="0 0 24 24"><path d="M7 3h10v2h4v3a4 4 0 0 1-4 4h-.4A5 5 0 0 1 13 14.9V18h3v3H8v-3h3v-3.1A5 5 0 0 1 7.4 12H7a4 4 0 0 1-4-4V5h4zm10 4v3a2 2 0 0 0 2-2V7zM5 7v1a2 2 0 0 0 2 2V7z"/></svg>',
  x:'<svg viewBox="0 0 24 24"><path d="M6.4 5 12 10.6 17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6L6.4 19 5 17.6l5.6-5.6L5 6.4z"/></svg>',
  cog:'<svg viewBox="0 0 24 24"><path fill-rule="evenodd" d="M10.3 2h3.4l.5 2.6a8 8 0 0 1 1.9 1.1l2.5-.9 1.7 3-2 1.7a8 8 0 0 1 0 2.2l2 1.7-1.7 3-2.5-.9a8 8 0 0 1-1.9 1.1l-.5 2.6h-3.4l-.5-2.6a8 8 0 0 1-1.9-1.1l-2.5.9-1.7-3 2-1.7a8 8 0 0 1 0-2.2l-2-1.7 1.7-3 2.5.9a8 8 0 0 1 1.9-1.1zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/></svg>',
  sndOn:'<svg viewBox="0 0 24 24"><path d="M3 9h4l5-4v14l-5-4H3zM15.5 8.5a5 5 0 0 1 0 7l-1.4-1.4a3 3 0 0 0 0-4.2zM18.4 5.6a9 9 0 0 1 0 12.8L17 17a7 7 0 0 0 0-9.9z"/></svg>',
  sndOff:'<svg viewBox="0 0 24 24"><path d="M3 9h4l5-4v14l-5-4H3zM15 9.4l1.4-1.4 2.1 2.1 2.1-2.1L22 9.4l-2.1 2.1 2.1 2.1-1.4 1.4-2.1-2.1-2.1 2.1-1.4-1.4 2.1-2.1z"/></svg>',
};
const MASCOT = `<svg viewBox="0 0 120 120">
  <ellipse cx="60" cy="113" rx="30" ry="5" fill="rgba(0,0,0,.12)"/>
  <g class="mbody">
    <ellipse cx="45" cy="104" rx="11" ry="6.5" fill="var(--m-leaf)"/>
    <ellipse cx="75" cy="104" rx="11" ry="6.5" fill="var(--m-leaf)"/>
    <ellipse class="arm l" cx="17" cy="72" rx="7.5" ry="12" fill="var(--m-leaf)"/>
    <ellipse class="arm r" cx="103" cy="72" rx="7.5" ry="12" fill="var(--m-leaf)"/>
    <path d="M60 24c26 0 42 18 42 44 0 25-17 39-42 39S18 93 18 68c0-26 16-44 42-44z" fill="var(--m-body)"/>
    <ellipse cx="60" cy="82" rx="25" ry="19" fill="var(--m-belly)"/>
    <path d="M60 25V13" stroke="var(--m-leaf)" stroke-width="4" stroke-linecap="round"/>
    <path d="M60 15C51 3 39 6 41 15c8 3 14 3 19 0z" fill="var(--m-leaf)"/>
    <path d="M60 15c9-12 21-9 19 0-8 3-14 3-19 0z" fill="var(--m-body)"/>
    <g class="e-open">
      <ellipse cx="46" cy="58" rx="10" ry="11" fill="#fff"/><ellipse cx="74" cy="58" rx="10" ry="11" fill="#fff"/>
      <g class="pupil"><circle cx="47.5" cy="60" r="5.5" fill="var(--m-ink)"/><circle cx="75.5" cy="60" r="5.5" fill="var(--m-ink)"/></g>
      <circle cx="50" cy="57" r="2" fill="#fff"/><circle cx="78" cy="57" r="2" fill="#fff"/>
    </g>
    <g class="e-happy" fill="none" stroke="var(--m-ink)" stroke-width="4.5" stroke-linecap="round"><path d="M37 61q9-11 18 0"/><path d="M65 61q9-11 18 0"/></g>
    <g class="e-sleep" fill="none" stroke="var(--m-ink)" stroke-width="4" stroke-linecap="round"><path d="M38 60q8 5 16 0"/><path d="M66 60q8 5 16 0"/></g>
    <ellipse cx="34" cy="72" rx="6.5" ry="4" fill="#ff8fb3" opacity=".75"/><ellipse cx="86" cy="72" rx="6.5" ry="4" fill="#ff8fb3" opacity=".75"/>
    <path class="mo-smile" d="M52 74q8 8 16 0" fill="none" stroke="var(--m-ink)" stroke-width="4" stroke-linecap="round"/>
    <g class="mo-big"><path d="M49 71q11 18 22 0z" fill="#8a2338"/><path d="M54 79q6 5 12 0q-6-4-12 0z" fill="#ff7a8f"/></g>
    <path class="mo-flat" d="M54 76q6 2 12 0" fill="none" stroke="var(--m-ink)" stroke-width="4" stroke-linecap="round"/>
    <text class="zz" x="88" y="34" font-family="Fredoka, sans-serif" font-weight="700" font-size="16" fill="var(--sky)">z</text>
  </g>
</svg>`;

/* ================= Helpers ================= */
const $ = id => document.getElementById(id);
const pad = n => String(n).padStart(2, "0");
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
const md = s => esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
const slug = s => String(s ?? "").toLowerCase().replace(/[^a-z0-9_-]+/g, "-").slice(0, 40) || "x";
const pick = a => a[Math.floor(Math.random() * a.length)];
const reduced = () => window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
function tm(s, fallback) {
  if (typeof s === "number") return s;
  const m = /^(\d{1,2}):(\d{2})$/.exec(String(s || "").trim());
  return m ? (+m[1]) * 60 + (+m[2]) : fallback;
}

/* ================= Routine config ================= */
const CFG_KEY = "tunas-config", DATA_KEY = "tunas-data-v1", SND_KEY = "tunas-sound";
let RAW = null;
try { RAW = JSON.parse(localStorage.getItem(CFG_KEY)); } catch (e) {}
if (!RAW || !Array.isArray(RAW.blocks)) RAW = window.DEFAULT_ROUTINE;

let CFG, BLOCKS, FOCUS, WORKOUTS, PROG, WEEKLY, TIPS, EXMAP;
function validateRoutine(r) {
  if (!r || typeof r !== "object") return "That file isn't valid JSON.";
  if (!Array.isArray(r.blocks) || !r.blocks.length) return "That file has no \"blocks\". Pick the routine .json file.";
  for (const b of r.blocks) if (!b || !Array.isArray(b.items)) return `Section "${b && b.title || "?"}" is missing its "items" list.`;
  return null;
}
function applyRoutine(r) {
  CFG = r;
  BLOCKS = r.blocks.map(b => {
    const from = tm(b.from, 0); let to = tm(b.to, from + 120); if (to <= from) to += 1440;
    return { id: slug(b.id || b.title), title: b.title || "Section", icon: I[b.icon] ? b.icon : "star", range: b.range || "", from, to, remind: b.remind ? tm(b.remind, null) : null,
      say: Array.isArray(b.say) ? b.say : null,
      items: (b.items || []).map(i => ({ id: slug(i.id || i.title), t: i.title || "", n: i.note || "", time: i.time || "",
        key: !!i.quest, alt: !!i.everyOtherDay, hide: Array.isArray(i.hideOnDays) ? i.hideOnDays.map(Number) : null, dyn: !!i.useFocus })) };
  });
  FOCUS = {};
  for (let k = 0; k < 7; k++) { const f = (r.focus || {})[k] || (r.focus || {})[String(k)] || {}; FOCUS[k] = { t: f.title || "1 hour: focus", n: f.note || "" }; }
  WORKOUTS = {};
  Object.entries(r.workouts || {}).forEach(([day, w]) => {
    if (!w || !Array.isArray(w.exercises)) return;
    const from = w.from != null ? tm(w.from, null) : null; let to = w.to != null ? tm(w.to, null) : null;
    if (from != null && to != null && to <= from) to += 1440;
    WORKOUTS[+day] = { name: w.name || "Workout", when: w.when || "", from, to, remind: w.remind ? tm(w.remind, null) : (from != null ? from : null), after: slug(w.after || BLOCKS[0].id), say: Array.isArray(w.say) ? w.say : null,
      ex: w.exercises.map(e => ({ id: slug(e.id || e.name), name: e.name || "Exercise", reps: e.reps || "8–12", rest: e.rest || "60s", cue: e.cue || "", bw: !!e.bodyweight, unit: e.unit === "sec" ? "sec" : "" })) };
  });
  PROG = r.progression || {};
  WEEKLY = (r.weekly || []).map(w => ({ id: slug(w.id || w.title), t: w.title || "" }));
  TIPS = (r.tips && r.tips.length) ? r.tips : ["**Small steps, every day.**"];
  EXMAP = {}; Object.values(WORKOUTS).forEach(W => W.ex.forEach(ex => { EXMAP[ex.id] ||= ex; }));
}
applyRoutine(RAW);

/* ================= Game rules ================= */
const XP = { item: 10, key: 20, workout: 50, perfect: 50, quest: 40, pr: 25, weekly: 15 };
const TITLES = ["Rookie","Starter","Consistent","Grinder","Disciplined","Glow-up","Locked in","Machine","Elite","Legend"];
const COLORS = [["--gold","--gold-d"],["--sky","--sky-d"],["--green","--green-d"],["--orange","--orange-d"],["--pink","--pink-d"]];
const BADGES = [
  { id:"first", g:"1", name:"First step", how:"Tick your first habit", test:S=>S.ticks>=1 },
  { id:"quest", g:"★", name:"Quest done", how:"Finish every ★ habit in a day", test:S=>S.quests>=1 },
  { id:"perfect", g:"100", name:"Perfect day", how:"Finish every habit in one day", test:S=>S.perfectDays>=1 },
  { id:"streak3", g:"3d", name:"On fire", how:"3-day streak", test:S=>S.bestStreak>=3 },
  { id:"streak7", g:"7d", name:"Week warrior", how:"7-day streak", test:S=>S.bestStreak>=7 },
  { id:"streak30", g:"30d", name:"Unstoppable", how:"30-day streak", test:S=>S.bestStreak>=30 },
  { id:"iron", g:"Fe", name:"Iron starter", how:"Finish your first workout", test:S=>S.workouts>=1 },
  { id:"fullweek", g:"All", name:"Full week", how:"Every workout in one week", test:S=>S.fullWeeks>=1 },
  { id:"w12", g:"12", name:"Month of iron", how:"12 workouts done", test:S=>S.workouts>=12 },
  { id:"pr1", g:"PR", name:"New record", how:"Beat a personal best", test:S=>S.prs>=1 },
  { id:"pr10", g:"10", name:"Record breaker", how:"10 personal records", test:S=>S.prs>=10 },
  { id:"habit14", g:"14", name:"Habit hero", how:"Same ★ habit on 14 days", test:S=>S.topQuestCount>=14 },
  { id:"perfect7", g:"7×", name:"Perfectionist", how:"7 perfect days", test:S=>S.perfectDays>=7 },
  { id:"ticks500", g:"500", name:"Habit machine", how:"500 ticks in total", test:S=>S.ticks>=500 },
  { id:"lv5", g:"Lv5", name:"Disciplined", how:"Reach level 5", test:S=>S.level>=5 },
  { id:"lv10", g:"Lv10", name:"Legend", how:"Reach level 10", test:S=>S.level>=10 },
];
const CHEERS = ["Nice!","Mantap!","Steady lah!","Keep going!","Terbaik!","Power!","Ngam!","Let's go!"];

/* ================= Progress storage ================= */
let store = { days:{}, weeks:{}, logs:{}, seen:{} };
try { const s = JSON.parse(localStorage.getItem(DATA_KEY)); if (s && s.days) store = s; } catch (e) {}
store.days ||= {}; store.weeks ||= {}; store.logs ||= {}; store.seen ||= {}; store.rest ||= {};
function save() { try { localStorage.setItem(DATA_KEY, JSON.stringify(store)); } catch (e) {} }
let soundOn = true; try { soundOn = localStorage.getItem(SND_KEY) !== "off"; } catch (e) {}

/* ================= Dates ================= */
const dkey = d => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
const keyToDate = k => { const [y,m,d] = k.split("-").map(Number); return new Date(y, m-1, d); };
const dayNum = d => Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 864e5);
function wkey(d) { const x = new Date(d); x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); return dkey(x); }
function routineDate() { const d = new Date(); if (d.getHours() < 4) d.setDate(d.getDate() - 1); return d; }
function nowMins() { const n = new Date(); return n.getHours()*60 + n.getMinutes() + (n.getHours() < 4 ? 1440 : 0); }
const isAltDay = d => dayNum(d) % 2 === 0;
const shown = (i, d) => !(i.alt && !isAltDay(d)) && !(i.hide && i.hide.includes(d.getDay()));
const firstName = () => esc(CFG.name || "Friend");

function itemsFor(d) { const out = []; BLOCKS.forEach(b => b.items.forEach(i => { if (shown(i,d)) out.push(i.id); })); if (WORKOUTS[d.getDay()]) out.push("wo-done"); return out; }
function keyIds(d) { const out = []; BLOCKS.forEach(b => b.items.forEach(i => { if (i.key && shown(i,d)) out.push(i.id); })); if (WORKOUTS[d.getDay()]) out.push("wo-done"); return out; }
function xpFor(id, d) { return id === "wo-done" ? XP.workout : keyIds(d).includes(id) ? XP.key : XP.item; }
function ratio(d) { const ids = itemsFor(d), done = store.days[dkey(d)] || {}; return ids.length ? ids.filter(id => done[id]).length / ids.length : 0; }
const REST_PER_MONTH = 2;
const isRest = d => !!store.rest[dkey(d)];
const dayOK = d => isRest(d) || ratio(d) >= 0.8;
function restsInMonth(d) { const p = dkey(d).slice(0, 7); return Object.keys(store.rest).filter(k => store.rest[k] && k.startsWith(p)).length; }

/* ================= Workout records ================= */
function score(ex, s) { if (!ex || !s) return 0; const kg = parseFloat(s[0]) || 0, r = parseFloat(s[1]) || 0; if (!r) return 0; return ex.bw ? r : (kg > 0 ? kg * (1 + r/30) : r * 0.01); }
function bestOf(ex, sets) { return Math.max(0, ...(sets || []).map(s => score(ex, s))); }
function computePRs() {
  const keys = Object.keys(store.logs).sort(), best = {}, byDay = {}; let total = 0;
  for (const k of keys) { let n = 0; const day = store.logs[k] || {};
    for (const id in day) { const ex = EXMAP[id]; if (!ex) continue; const b = bestOf(ex, day[id]); if (b <= 0) continue;
      if (best[id] != null && b > best[id] + 1e-9) n++; best[id] = Math.max(best[id] || 0, b); }
    byDay[k] = n; total += n; }
  return { byDay, total };
}
function bestBefore(id, today) { const ex = EXMAP[id]; let b = null; for (const k in store.logs) { if (k >= today) continue; const v = bestOf(ex, (store.logs[k] || {})[id]); if (v > 0) b = Math.max(b || 0, v); } return b; }
function programWeek(d) { if (!store.programStart) { store.programStart = wkey(d); save(); } return Math.max(1, Math.floor((dayNum(d) - dayNum(keyToDate(store.programStart))) / 7) + 1); }
function lastLog(exId, today) { const keys = Object.keys(store.logs).filter(k => k < today).sort().reverse(); for (const k of keys) { const s = (store.logs[k] || {})[exId]; if (s && s.some(x => x && (x[0] || x[1]))) return s; } return null; }
function fmtSets(sets, ex) { return sets.filter(s => s && (s[0] || s[1])).map(s => ex.bw ? `${esc(s[1] || "?")}${ex.unit === "sec" ? "s" : ""}` : `${esc(s[0] || "?")}kg×${esc(s[1] || "?")}`).join(", "); }

/* ================= Stats ================= */
function levelOf(xp) { let n = 1; while (125*(n+1)*n <= xp) n++; return { n, cur: xp - 125*n*(n-1), span: 250*n }; }
function dayXP(k, prByDay) {
  const d = keyToDate(k), done = store.days[k] || {}, ids = itemsFor(d), keys = keyIds(d); let xp = 0, c = 0;
  ids.forEach(id => { if (done[id]) { c++; xp += xpFor(id, d); } });
  if (ids.length && c === ids.length) xp += XP.perfect;
  if (keys.length && keys.every(id => done[id])) xp += XP.quest;
  return xp + (prByDay[k] || 0) * XP.pr;
}
function computeAll() {
  const d = routineDate(), today = dkey(d), pr = computePRs();
  const all = new Set([...Object.keys(store.days), ...Object.keys(store.logs)]);
  let xp = 0, perfectDays = 0, workouts = 0, ticks = 0, quests = 0; const count = {}, woWeeks = {};
  all.forEach(k => { xp += dayXP(k, pr.byDay); const dn = store.days[k] || {}, dd = keyToDate(k), ids = itemsFor(dd), keys = keyIds(dd);
    ids.forEach(id => { if (dn[id]) { ticks++; if (keys.includes(id) && id !== "wo-done") count[id] = (count[id] || 0) + 1; } });
    if (ids.length && ids.every(id => dn[id])) perfectDays++;
    if (keys.length && keys.every(id => dn[id])) quests++;
    if (dn["wo-done"]) { workouts++; const w = wkey(dd); woWeeks[w] = (woWeeks[w] || 0) + 1; } });
  Object.values(store.weeks).forEach(w => Object.values(w || {}).forEach(v => { if (v) { xp += XP.weekly; ticks++; } }));
  let streak = 0; const x = new Date(d); if (!dayOK(x)) x.setDate(x.getDate() - 1);
  while (dayOK(x) && streak < 3650) { streak++; x.setDate(x.getDate() - 1); }
  let bestStreak = 0, run = 0; const dk = [...Object.keys(store.days), ...Object.keys(store.rest)].sort();
  if (dk.length) { const c = keyToDate(dk[0]); let g = 0; while (dkey(c) <= today && g++ < 3650) { if (dayOK(c)) { run++; bestStreak = Math.max(bestStreak, run); } else run = 0; c.setDate(c.getDate() + 1); } }
  const perWeek = Object.keys(WORKOUTS).length || 99;
  const L = levelOf(xp), tIds = itemsFor(d), tDone = store.days[today] || {}, tKeys = keyIds(d);
  return { xp, level: L.n, L, ticks, perfectDays, workouts, quests, prs: pr.total, prsToday: pr.byDay[today] || 0,
    topQuestCount: Math.max(0, ...Object.values(count)),
    fullWeeks: Object.values(woWeeks).filter(n => n >= perWeek).length, streak, bestStreak, todayXP: dayXP(today, pr.byDay),
    doneToday: tIds.filter(id => tDone[id]).length, totalToday: tIds.length,
    questDone: tKeys.filter(id => tDone[id]).length, questTotal: tKeys.length, woToday: !!tDone["wo-done"] };
}

/* ================= Path nodes ================= */
function nodesFor(d) {
  const W = WORKOUTS[d.getDay()], out = [];
  BLOCKS.forEach(b => { out.push({ id: b.id, kind: "block", b, title: b.title, icon: b.icon, range: b.range, from: b.from, to: b.to, say: b.say });
    if (W && W.after === b.id) out.push({ id: "workout", kind: "workout", W, title: W.name, icon: "dumb", range: W.when, from: W.from, to: W.to, say: W.say }); });
  if (W && !BLOCKS.some(b => b.id === W.after)) out.push({ id: "workout", kind: "workout", W, title: W.name, icon: "dumb", range: W.when, from: W.from, to: W.to, say: W.say });
  if (WEEKLY.length) out.push({ id: "weekly", kind: "weekly", title: "This week", icon: "cal", range: "resets Monday" });
  return out;
}
const inWindow = (n, mins) => n.from != null && n.to != null && mins >= n.from && mins < n.to;
function nodeState(node, d) {
  const today = dkey(d), done = store.days[today] || {};
  if (node.kind === "block") { const ids = node.b.items.filter(i => shown(i,d)); const n = ids.filter(i => done[i.id]).length;
    return { n, total: ids.length, cleared: ids.length > 0 && n === ids.length, xp: ids.filter(i => done[i.id]).reduce((s,i) => s + xpFor(i.id,d), 0) }; }
  if (node.kind === "workout") { const logs = store.logs[today] || {}; const n = node.W.ex.filter(ex => (logs[ex.id] || []).some(s => s && s[1])).length + (done["wo-done"] ? 1 : 0);
    return { n, total: node.W.ex.length + 1, cleared: !!done["wo-done"], xp: done["wo-done"] ? XP.workout : 0 }; }
  const wd = store.weeks[wkey(d)] || {}; const n = WEEKLY.filter(i => wd[i.id]).length;
  return { n, total: WEEKLY.length, cleared: n === WEEKLY.length, xp: n * XP.weekly };
}

/* ================= Sound, haptics, floats, toasts, confetti ================= */
let actx = null;
function audio() { try { actx ||= new (window.AudioContext || window.webkitAudioContext)(); if (actx.state === "suspended") actx.resume(); } catch (e) {} return actx; }
function tone(freq, at, dur, vol, type) { const a = audio(); if (!a) return; const o = a.createOscillator(), g = a.createGain(); o.type = type || "sine"; o.frequency.value = freq;
  const t = a.currentTime + at; g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol || 0.2, t + 0.015); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(a.destination); o.start(t); o.stop(t + dur + 0.02); }
function sfx(kind) {
  if (!soundOn) return;
  try {
    if (kind === "ding") { tone(988,0,.12,.18,"triangle"); tone(1319,.08,.22,.18,"triangle"); }
    else if (kind === "undo") tone(440,0,.1,.12,"sine");
    else if (kind === "clear") [523,659,784,1047].forEach((f,i) => tone(f,i*.09,.25,.18,"triangle"));
    else if (kind === "level") { [523,659,784,1047,1319].forEach((f,i) => tone(f,i*.1,.32,.2,"triangle")); tone(1568,.55,.5,.15,"sine"); }
    else if (kind === "beep") { tone(880,0,.18,.25,"square"); tone(880,.25,.18,.25,"square"); }
    else if (kind === "pr") { tone(784,0,.12,.18,"triangle"); tone(1175,.1,.3,.18,"triangle"); }
  } catch (e) {}
}
function buzz(p) { try { navigator.vibrate && navigator.vibrate(p || 12); } catch (e) {} }
function floatXP(x, y, text) { if (reduced()) return; const f = document.createElement("div"); f.className = "fx"; f.textContent = text;
  f.style.left = Math.max(8, Math.min(innerWidth - 90, x)) + "px"; f.style.top = (y - 14) + "px"; document.body.appendChild(f); setTimeout(() => f.remove(), 950); }
function toast(html, icon) { const t = document.createElement("div"); t.className = "toast"; t.innerHTML = `<i>${I[icon || "star"]}</i><span>${html}</span>`;
  $("toasts").appendChild(t); setTimeout(() => { t.classList.add("out"); setTimeout(() => t.remove(), 320); }, 2800); }
function confetti() {
  if (reduced()) return;
  const cv = $("confetti"), ctx = cv.getContext("2d"), dpr = devicePixelRatio || 1; cv.width = innerWidth*dpr; cv.height = innerHeight*dpr; ctx.setTransform(dpr,0,0,dpr,0,0);
  const cs = getComputedStyle(document.documentElement), cols = ["--green","--gold","--sky","--orange","--pink"].map(v => cs.getPropertyValue(v).trim());
  const P = Array.from({ length: 160 }, () => ({ x: innerWidth/2 + (Math.random()-.5)*120, y: innerHeight*.42, vx: (Math.random()-.5)*13, vy: -Math.random()*13-4, s: 5+Math.random()*6, r: Math.random()*6, vr: (Math.random()-.5)*.35, c: pick(cols), round: Math.random() < .3 }));
  const t0 = performance.now();
  (function f(t) { const el = t - t0; ctx.clearRect(0,0,innerWidth,innerHeight);
    P.forEach(p => { p.vy += .33; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.r += p.vr; ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.r); ctx.globalAlpha = Math.max(0, 1 - el/2000); ctx.fillStyle = p.c;
      if (p.round) { ctx.beginPath(); ctx.arc(0,0,p.s/2,0,7); ctx.fill(); } else ctx.fillRect(-p.s/2,-p.s/3,p.s,p.s*.6); ctx.restore(); });
    if (el < 2000) requestAnimationFrame(f); else ctx.clearRect(0,0,innerWidth,innerHeight); })(t0);
}

/* ================= Mascot ================= */
$("mascot").innerHTML = MASCOT;
let mascotTimer = null;
function setMood(el, mood) { el.classList.remove("happy","cheer","sleepy"); if (mood && mood !== "idle") el.classList.add(mood); }
function jump(el) { if (reduced()) return; el.classList.remove("jump"); void el.offsetWidth; el.classList.add("jump"); setTimeout(() => el.classList.remove("jump"), 600); }
function say(text, sub, mood, ms) {
  const b = $("bubble"); b.innerHTML = text + (sub ? `<small>${sub}</small>` : ""); b.classList.remove("pop"); void b.offsetWidth; b.classList.add("pop");
  setMood($("mascot"), mood || "happy"); clearTimeout(mascotTimer); mascotTimer = null;
  if (ms) mascotTimer = setTimeout(() => { mascotTimer = null; contextSay(); }, ms);
}
function contextSay() {
  if (mascotTimer) return;
  const d = routineDate(), mins = nowMins(), S = lastS || computeAll(), h = new Date().getHours();
  const now = nodesFor(d).find(n => inWindow(n, mins));
  if (S.totalToday && S.doneToday === S.totalToday) return say(`Perfect day! Terbaik, ${firstName()}!`, "Rest well. See you tomorrow.", "happy");
  if (h >= 23 || h < 4) return say("Dah lewat. Phone away, sleep now.", "Sleeping on time keeps your face less puffy.", "sleepy");
  if (now) {
    const st = nodeState(now, d);
    if (st.cleared) return say(`${esc(now.title)} cleared!`, "Next stop on the path is coming up.", "happy");
    let msg = now.say || ["Let's go!", ""];
    if (now.kind === "block" && now.b.items.some(i => i.dyn) && !now.say) msg = [FOCUS[d.getDay()].t + ".", "Phone face down, one thing only."];
    return say(esc(msg[0]), `${st.n} of ${st.total} done${msg[1] ? " · " + esc(msg[1]) : ""}`, "idle");
  }
  const away = CFG.away;
  if (away && mins >= tm(away.from, 510) && mins < tm(away.to, 1050)) { const a = away.say || ["Have a good day!", ""]; return say(esc(a[0]), esc(a[1] || ""), "idle"); }
  return say(`Hi ${firstName()}! Tap a circle to start.`, `${S.doneToday} of ${S.totalToday} done today`, "idle");
}

/* ================= Rest timer ================= */
let restT = null, restEnd = 0, restTotal = 0, wake = null;
const fmtTime = ms => { const s = Math.ceil(ms/1000); return `${Math.floor(s/60)}:${pad(s%60)}`; };
async function holdWake() { try { if (!wake && navigator.wakeLock) { wake = await navigator.wakeLock.request("screen"); wake.addEventListener("release", () => { wake = null; }); } } catch (e) {} }
function startRest(sec, label) { restTotal = sec; restEnd = Date.now() + sec*1000; $("restLabel").textContent = "Rest · " + label; $("restbar").hidden = false; audio(); holdWake(); clearInterval(restT); restT = setInterval(tickRest, 250); tickRest(); }
function tickRest() { const left = Math.max(0, restEnd - Date.now()); $("restTime").textContent = left > 0 ? fmtTime(left) : "Go!"; $("restFill").style.width = (100 * (1 - left/(restTotal*1000))) + "%";
  if (left <= 0) { clearInterval(restT); restT = null; sfx("beep"); buzz([200,100,200]); setTimeout(() => { if (!restT) $("restbar").hidden = true; }, 2500); } }
$("restSkip").onclick = () => { clearInterval(restT); restT = null; $("restbar").hidden = true; };
$("restPlus").onclick = () => { if (!restT) return startRest(15, $("restLabel").textContent.replace("Rest · ", "")); restEnd += 15000; restTotal += 15; };

/* ================= Rendering ================= */
let lastS = null;
function renderTop(S) {
  $("stStreak").className = "stat fire" + (S.streak ? "" : " off"); $("stStreak").innerHTML = I.flame + S.streak;
  $("stXP").innerHTML = I.bolt + S.todayXP; $("stLv").innerHTML = I.shield + "Lv " + S.level;
  $("stSnd").innerHTML = soundOn ? I.sndOn : I.sndOff; $("stSnd").setAttribute("aria-label", soundOn ? "Sound on" : "Sound off");
  $("stCog").innerHTML = I.cog;
  $("lvName").innerHTML = `Level ${S.L.n} · <span>${TITLES[Math.min(S.L.n-1, TITLES.length-1)]}</span>`;
  $("lvXP").textContent = `${S.xp} XP total`;
  $("lvFill").style.width = (100 * S.L.cur / S.L.span) + "%"; $("lvBar").textContent = `${S.L.cur} / ${S.L.span} XP`;
}
function renderQuests(S) {
  const d = routineDate(), W = WORKOUTS[d.getDay()], done = store.days[dkey(d)] || {};
  const Q = [{ ico:"star", t:"Finish every ★ habit", n:S.questDone, of:S.questTotal, rew:XP.quest },
             { ico:"trophy", t:"Complete the whole day", n:S.doneToday, of:S.totalToday, rew:XP.perfect }];
  if (W) Q.splice(1, 0, { ico:"bolt", t:`Finish ${esc(W.name)}`, n: done["wo-done"] ? 1 : 0, of: 1, rew: XP.workout });
  else Q.splice(1, 0, { ico:"flame", t:"Earn 150 XP today", n: Math.min(S.todayXP, 150), of: 150, rew: 0 });
  $("quests").innerHTML = Q.filter(q => q.of > 0).map(q => { const won = q.n >= q.of;
    return `<div class="quest${won ? " won" : ""}"><div class="q-ico">${I[q.ico]}</div><div class="q-main"><div class="q-t">${q.t}</div><div class="bar${won ? " green" : ""}"><i style="width:${100*q.n/q.of}%"></i><b>${q.n} / ${q.of}</b></div></div><span class="q-rew">${won ? "Done" : q.rew ? "+" + q.rew : "Bonus"}</span></div>`; }).join("");
}
const OFFS = [0, 62, 90, 62, 0, -62, -90, -62];
function pathTarget(d, mins, nodes) {
  return nodes.find(n => inWindow(n, mins) && !nodeState(n, d).cleared) || nodes.find(n => !nodeState(n, d).cleared && n.kind !== "weekly") || null;
}
function renderContinue() {
  const d = routineDate(), t = pathTarget(d, nowMins(), nodesFor(d)), b = $("continueBtn");
  if (!t) { b.hidden = true; return; }
  const st = nodeState(t, d); b.hidden = false; b.dataset.node = t.id;
  b.innerHTML = `${st.n === 0 ? "Start" : "Continue"}: ${esc(t.title)} <span>${st.total - st.n} left</span>`;
}
function renderPath() {
  const d = routineDate(), mins = nowMins(), nodes = nodesFor(d);
  const target = pathTarget(d, mins, nodes);
  $("path").innerHTML = nodes.map((n, i) => {
    const st = nodeState(n, d), isNow = inWindow(n, mins);
    const cls = st.cleared ? "done" : (isNow || st.n > 0 || n === target) ? "go" : "";
    const C = 2 * Math.PI * 45, ring = !st.cleared && st.n > 0 ? `<svg class="ringp" viewBox="0 0 96 96"><circle class="tr" cx="48" cy="48" r="45"/><circle class="pr" cx="48" cy="48" r="45" stroke-dasharray="${C}" stroke-dashoffset="${C*(1-st.n/st.total)}"/></svg>` : "";
    const call = n === target ? `<div class="callout">${st.n === 0 ? (isNow ? "Start now" : "Start") : `${st.total - st.n} left`}</div>` : "";
    return `<div class="node-wrap" style="transform:translateX(${OFFS[i % OFFS.length]}px)">${call}
      <button class="node ${cls}${n === target && !reduced() ? " now-pulse" : ""}" type="button" data-node="${n.id}" aria-label="${esc(n.title)}, ${st.n} of ${st.total} done">${ring}${I[n.icon] || I.star}${st.cleared ? `<span class="tick">${I.check}</span>` : ""}</button>
      <div class="node-label"><b>${esc(n.title)}</b><span>${st.n}/${st.total}${n.range ? " · " + esc(n.range) : ""}</span></div></div>`;
  }).join("");
  $("pathTitle").textContent = `Today's path · ${d.toLocaleDateString(undefined, { weekday: "long" })}`;
}
$("path").addEventListener("click", e => { const b = e.target.closest("[data-node]"); if (b) { audio(); openSheet(b.dataset.node); } });

function renderStreak(S) {
  const d = routineDate(); let days = "";
  for (let k = 6; k >= 0; k--) { const x = new Date(d); x.setDate(x.getDate() - k); const r = ratio(x);
    const rst = isRest(x);
    days += `<div class="day${k === 0 ? " today" : ""}${rst ? " rest" : r >= .8 ? " full" : r > 0 ? " part" : ""}" title="${rst ? "Rest day" : Math.round(r*100) + "%"}"><i>${rst ? I.moon : I.flame}</i><span>${x.toLocaleDateString(undefined, { weekday: "short" }).slice(0, 2)}</span></div>`; }
  $("streakCard").innerHTML = `<div class="streak-top"><svg class="big-flame${S.streak ? "" : " off"}" viewBox="0 0 24 24"><path d="${I.flame.match(/d="([^"]+)"/)[1]}"/></svg><div><b>${S.streak} day streak</b><span>${S.streak ? "Hit 80% today to keep it alive" : "Hit 80% today to start a streak"} · best ${S.bestStreak}</span></div></div><div class="week">${days}</div>${restRow(d)}`;
}
function restRow(d) {
  const left = REST_PER_MONTH - restsInMonth(d), on = isRest(d), key = dkey(d);
  if (on) return `<div class="rest-row"><span>Rest day. Your streak is safe today.</span><button class="btn ghost small" type="button" data-restday="${key}" data-v="0">Undo</button></div>`;
  return `<div class="rest-row"><span>Sick or very busy? A rest day keeps your streak. <b>${left} left</b> this month.</span>${left > 0 ? `<button class="btn ghost small" type="button" data-restday="${key}" data-v="1">Rest day</button>` : ""}</div>`;
}
function setRest(key, v) {
  const d = keyToDate(key);
  if (v && !store.rest[key] && restsInMonth(d) >= REST_PER_MONTH) { toast(`You've used both rest days for this month.`, "x"); return; }
  if (v) store.rest[key] = true; else delete store.rest[key];
  save(); if (v) { toast("Rest day saved. Streak protected.", "moon"); say("Rest well, recover strong.", "Your streak is safe.", "sleepy", 3000); }
  refresh(true);
}
$("streakCard").addEventListener("click", e => { const b = e.target.closest("[data-restday]"); if (b) setRest(b.dataset.restday, b.dataset.v === "1"); });

/* ================= History calendar ================= */
let histMonth = (() => { const d = routineDate(); return new Date(d.getFullYear(), d.getMonth(), 1); })();
function renderHistory() {
  const today = dkey(routineDate()), y = histMonth.getFullYear(), m = histMonth.getMonth();
  const first = new Date(y, m, 1), lead = (first.getDay() + 6) % 7, daysIn = new Date(y, m + 1, 0).getDate();
  let cells = "";
  for (let i = 0; i < lead; i++) cells += `<span class="hc empty"></span>`;
  let full = 0, rests = 0;
  for (let n = 1; n <= daysIn; n++) {
    const dd = new Date(y, m, n), k = dkey(dd), future = k > today, r = future ? 0 : ratio(dd), rst = isRest(dd);
    if (!future && r >= .8) full++; if (rst) rests++;
    const cls = ["hc", k === today ? "today" : "", future ? "future" : "", rst ? "rest" : r >= 1 ? "perfect" : r >= .8 ? "full" : r > 0 ? "part" : ""].join(" ").trim();
    cells += `<button class="${cls}" type="button" data-day="${k}" ${future ? "disabled" : ""} aria-label="${dd.toDateString()}${future ? "" : rst ? ", rest day" : `, ${Math.round(r*100)}%`}">${n}</button>`;
  }
  const thisMonth = new Date(routineDate().getFullYear(), routineDate().getMonth(), 1);
  $("hist").innerHTML = `<div class="h-top"><button class="x" type="button" data-hnav="-1" aria-label="Previous month">‹</button><b>${histMonth.toLocaleDateString(undefined, { month: "long", year: "numeric" })}</b><button class="x" type="button" data-hnav="1" aria-label="Next month" ${histMonth >= thisMonth ? "disabled" : ""}>›</button></div>
    <div class="h-grid">${["Mo","Tu","We","Th","Fr","Sa","Su"].map(w => `<span class="hw">${w}</span>`).join("")}${cells}</div>
    <div class="h-foot"><span><i class="lg perfect"></i>100%</span><span><i class="lg full"></i>80%+</span><span><i class="lg part"></i>started</span><span><i class="lg rest"></i>rest</span></div>
    <p class="h-note">${full} streak days${rests ? `, ${rests} rest` : ""} this month. Tap a day to see it or fix a tick you forgot.</p>`;
}
$("hist").addEventListener("click", e => {
  const nav = e.target.closest("[data-hnav]"); if (nav) { histMonth = new Date(histMonth.getFullYear(), histMonth.getMonth() + (+nav.dataset.hnav), 1); renderHistory(); return; }
  const c = e.target.closest("[data-day]"); if (c && !c.disabled) openSheet("day:" + c.dataset.day);
});
function renderDaySheet(key, keep) {
  const d = keyToDate(key), body = $("shBody"), top = keep ? body.scrollTop : 0, done = store.days[key] || {}, ids = itemsFor(d);
  const st = { n: ids.filter(id => done[id]).length, total: ids.length }, isToday = key === dkey(routineDate());
  $("shHead").innerHTML = sheetHead("cal", d.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" }), isRest(d) ? "Rest day · streak protected" : `${st.n} of ${st.total} · ${Math.round(100*st.n/(st.total||1))}%${isToday ? " · today" : ""}`, st, st.n === st.total);
  $("shHead").querySelector(".sh-ico").style.background = "var(--sky)";
  $("shClose").onclick = closeSheet;
  let h = `<div class="note">${isToday ? "This is today." : "Forgot to tick something? Fix it here. It counts toward your XP and streak."}</div>`;
  h += `<div class="set-group">${restRow(d).replace('class="rest-row"', 'class="rest-row in-sheet"')}</div>`;
  const W = WORKOUTS[d.getDay()];
  BLOCKS.forEach(b => {
    const items = b.items.filter(i => shown(i, d)); if (!items.length && !(W && W.after === b.id)) return;
    h += `<h3 class="grp">${esc(b.title)}</h3>`;
    items.forEach(i => { if (i.dyn) i = { ...i, ...FOCUS[d.getDay()] }; h += taskHTML(i, !!done[i.id], i.key ? `<span class="qtag">★</span>` : ""); });
    if (W && W.after === b.id) h += taskHTML({ id: "wo-done", t: `Workout: ${W.name}`, n: "" }, !!done["wo-done"], `<span class="qtag">★</span>`);
  });
  body.innerHTML = h; if (keep) body.scrollTop = top;
}
function renderBadges(S) {
  const got = BADGES.filter(b => b.test(S)); $("badgeMeta").textContent = `${got.length}/${BADGES.length}`;
  $("bgrid").innerHTML = BADGES.map((b, i) => { const ok = b.test(S), c = COLORS[i % COLORS.length];
    return `<div class="badge${ok ? "" : " locked"}" style="--c:var(${c[0]});--cd:var(${c[1]})"><div class="medal"><span>${b.g}</span></div><div class="bn">${b.name}</div><div class="bh">${b.how}</div></div>`; }).join("");
  return got;
}
function renderGuide() {
  const g = CFG.guide;
  $("guideTitle").hidden = !g; $("guide").hidden = !g;
  if (!g) return;
  $("guideTitle").textContent = g.title || "Guide";
  $("guide").innerHTML = (g.sections || []).map((s, i) => `<details${i === 0 ? " open" : ""}><summary>${esc(s.title)}</summary><div class="g">${(s.lines || []).map(l => `<p>${md(l)}</p>`).join("")}</div></details>`).join("");
}

/* ================= Bottom sheet ================= */
let sheetId = null, lastFocus = null;
function openSheet(id) {
  sheetId = id; lastFocus = document.activeElement;
  $("scrim").hidden = false; $("sheet").hidden = false; document.body.classList.add("locked");
  renderSheet(false);
  requestAnimationFrame(() => { $("scrim").classList.add("show"); $("sheet").classList.add("show"); const x = $("shClose"); x && x.focus({ preventScroll: true }); });
}
function closeSheet() {
  if (!sheetId) return; sheetId = null;
  $("scrim").classList.remove("show"); $("sheet").classList.remove("show"); document.body.classList.remove("locked");
  setTimeout(() => { if (!sheetId) { $("scrim").hidden = true; $("sheet").hidden = true; } }, 320);
  if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
}
$("scrim").onclick = closeSheet;
document.addEventListener("keydown", e => { if (e.key === "Escape") { if (!$("cele").hidden) return nextCele(); closeSheet(); } });

function taskHTML(i, checked, tag) {
  return `<button class="task" type="button" role="checkbox" aria-checked="${checked}" data-task="${i.id}">
    <span class="ck">${I.check}</span><span class="tt"><b>${esc(i.t)}${tag}</b>${i.n ? `<span>${esc(i.n)}</span>` : ""}</span>${i.time ? `<span class="tm">${esc(i.time)}</span>` : ""}</button>`;
}
function sheetHead(icon, title, sub, st, gold) {
  return `<div class="grab"></div><div class="sh-row"><div class="sh-ico" style="background:var(${gold ? "--gold" : "--green"})">${I[icon] || I.star}</div><div><h2 id="shTitle">${title}</h2><p>${sub}</p></div><button class="x" id="shClose" type="button" aria-label="Close">${I.x}</button></div>` +
    (st ? `<div class="bar green"><i style="width:${st.total ? 100*st.n/st.total : 0}%"></i><b>${st.n} / ${st.total}</b></div>` : "");
}
function renderSheet(keep) {
  if (!sheetId) return;
  if (sheetId === "settings") return renderSettings(keep);
  if (sheetId.startsWith("day:")) return renderDaySheet(sheetId.slice(4), keep);
  const d = routineDate(), today = dkey(d), node = nodesFor(d).find(n => n.id === sheetId); if (!node) { closeSheet(); return; }
  const st = nodeState(node, d), body = $("shBody"), top = keep ? body.scrollTop : 0;
  $("shHead").innerHTML = sheetHead(node.icon, esc(node.title), `${esc(node.range)}${node.range ? " · " : ""}${st.n} of ${st.total}`, st, st.cleared);
  $("shClose").onclick = closeSheet;
  const done = store.days[today] || {};
  let h = "";
  if (node.kind === "block") {
    const left = node.b.items.filter(i => shown(i, d) && !done[i.id]).length;
    if (left > 1) h += `<button class="btn small tickall" type="button" data-act="tickAll">Tick all ${left} left</button>`;
    node.b.items.forEach(i => {
      if (i.dyn) i = { ...i, ...FOCUS[d.getDay()] };
      if (i.alt && !isAltDay(d)) { h += `<div class="note">${esc(CFG.everyOtherDayNote || "Rest day for this one today.")}</div>`; return; }
      if (i.hide && i.hide.includes(d.getDay())) { h += `<div class="note">${esc(CFG.hideNote || "Skipped today.")}</div>`; return; }
      const tag = i.key ? `<span class="qtag">★ +${XP.key}</span>` : i.alt ? `<span class="qtag alt">every 2 days</span>` : "";
      h += taskHTML(i, !!done[i.id], tag);
    });
  } else if (node.kind === "weekly") {
    const wd = store.weeks[wkey(d)] || {};
    WEEKLY.forEach(i => { h += taskHTML(i, !!wd[i.id], `<span class="qtag alt">+${XP.weekly}</span>`); });
    h += `<div class="note">Weekly tasks reset every Monday.</div>`;
  } else {
    const W = node.W, wk = programWeek(d), nSets = wk <= 4 ? 2 : 3, logs = store.logs[today] || {};
    h += `<div class="rules"><b>Week ${wk}: ${nSets} sets each.</b> One light warm-up set first. Lower for 3 seconds, pause 1, push up. Stop 2 reps before failure. Beat a past best for <b>+${XP.pr} XP</b>.</div>`;
    W.ex.forEach(ex => {
      const last = lastLog(ex.id, today), prev = bestBefore(ex.id, today), P = PROG[ex.id] || { start: "", step: 2 };
      const topR = Math.max(...(String(ex.reps).match(/\d+/g) || ["0"]).map(Number));
      let hint;
      if (!last) hint = ex.bw ? "First time: do what you can with good form." : (P.start ? `Start with ${esc(P.start)}.` : "First time: pick a weight where the top reps leave 2 in the tank.");
      else { const ds = last.filter(s => s && (s[0] || s[1])), allTop = ds.length > 0 && ds.every(s => (parseFloat(s[1]) || 0) >= topR), kg = Math.max(0, ...ds.map(s => parseFloat(s[0]) || 0)), base = `Last: ${fmtSets(last, ex)}`, step = +P.step || 2;
        if (ex.bw) hint = base + (allTop ? " · Hit the top. Add a few more!" : " · Aim for 1 more.");
        else if (allTop && kg && P.max && kg + step > P.max) hint = base + " · Max weight reached. Add reps, 4-second lowering.";
        else if (allTop && kg && P.small) hint = base + ` · Try ${kg + step} kg, or 3 extra slow reps first.`;
        else if (allTop && kg) hint = base + ` · Level up: try ${kg + step} kg!`;
        else hint = base + " · Same weight, 1 more rep."; }
      let sets = "";
      for (let s = 0; s < nSets; s++) { const v = (logs[ex.id] || [])[s] || ["", ""], isPR = prev != null && score(ex, v) > prev + 1e-9;
        sets += `<div class="set"><span class="sl">Set ${s+1}</span>` + (ex.bw ? "" : `<input inputmode="decimal" id="log-${ex.id}-${s}-kg" data-ex="${ex.id}" data-s="${s}" data-f="0" value="${esc(v[0])}" aria-label="${esc(ex.name)} set ${s+1} kg"><span class="u">kg ×</span>`) +
          `<input inputmode="numeric" id="log-${ex.id}-${s}-r" data-ex="${ex.id}" data-s="${s}" data-f="1" value="${esc(v[1])}" aria-label="${esc(ex.name)} set ${s+1} ${ex.unit === "sec" ? "seconds" : "reps"}"><span class="u">${ex.unit === "sec" ? "sec" : "reps"}</span><span class="prchip"${isPR ? "" : " hidden"}>NEW PR</span></div>`; }
      const rs = parseInt(ex.rest, 10) || 60;
      h += `<div class="ex"><div class="ex-h"><b>${esc(ex.name)}</b><span>${nSets} × ${esc(ex.reps)} · rest ${esc(ex.rest)}</span></div>${ex.cue ? `<div class="cue">${esc(ex.cue)}</div>` : ""}<div class="hint">${hint}</div>${sets}
        <button class="btn ghost small" type="button" data-rest="${rs}" data-label="${esc(ex.name)}">Start ${rs}s rest</button></div>`;
    });
    h += taskHTML({ id: "wo-done", t: "Workout done", n: "Tick this when you finish the last set" }, !!done["wo-done"], `<span class="qtag">★ +${XP.workout}</span>`);
  }
  body.innerHTML = h; if (keep) body.scrollTop = top;
}
$("shBody").addEventListener("click", e => {
  const rd = e.target.closest("[data-restday]"); if (rd) return setRest(rd.dataset.restday, rd.dataset.v === "1");
  const act = e.target.closest("[data-act]"); if (act) return settingsAction(act.dataset.act, act);
  const r = e.target.closest("[data-rest]"); if (r) { startRest(+r.dataset.rest, r.dataset.label); return; }
  const t = e.target.closest("[data-task]"); if (!t) return;
  const id = t.dataset.task, dayKey = sheetId.startsWith("day:") ? sheetId.slice(4) : dkey(routineDate()), d = keyToDate(dayKey), v = t.getAttribute("aria-checked") !== "true";
  if (sheetId === "weekly") (store.weeks[wkey(d)] ||= {})[id] = v; else (store.days[dayKey] ||= {})[id] = v;
  save();
  const rect = t.getBoundingClientRect();
  if (v) { const xp = sheetId === "weekly" ? XP.weekly : xpFor(id, d); sfx("ding"); buzz(); floatXP(rect.right - 90, rect.top + rect.height/2, `+${xp} XP`); say(pick(CHEERS), `+${xp} XP`, "happy", 2600); jump($("mascot")); }
  else sfx("undo");
  refresh(true);
  const again = document.querySelector(`[data-task="${id}"]`); again && again.focus({ preventScroll: true });
});
$("shBody").addEventListener("input", e => {
  const t = e.target; if (!t.dataset || !t.dataset.ex) return;
  const d = routineDate(), today = dkey(d), id = t.dataset.ex, s = +t.dataset.s;
  const logs = (store.logs[today] ||= {}), arr = (logs[id] ||= []); arr[s] ||= ["", ""]; arr[s][+t.dataset.f] = t.value.trim(); save();
  const prev = bestBefore(id, today), chip = t.closest(".set").querySelector(".prchip");
  if (chip) chip.hidden = !(prev != null && score(EXMAP[id], arr[s]) > prev + 1e-9);
  refresh(false);
});

/* ================= Settings ================= */
/* ================= Reminders (calendar) ================= */
const TZ = (() => { try { return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC"; } catch (e) { return "UTC"; } })();
const DAYS2 = ["SU","MO","TU","WE","TH","FR","SA"];
function reminderList() {
  const out = [];
  BLOCKS.forEach(b => { const m = b.remind != null ? b.remind : b.from; if (m != null) out.push({ id: b.id, title: b.title, mins: m % 1440, rule: "RRULE:FREQ=DAILY" }); });
  Object.entries(WORKOUTS).forEach(([day, W]) => { if (W.remind != null) out.push({ id: "workout", title: W.name, mins: W.remind % 1440, rule: `RRULE:FREQ=WEEKLY;BYDAY=${DAYS2[+day]}`, weekday: +day }); });
  return out;
}
function nextStart(r) {
  const now = new Date(), s = new Date(now.getFullYear(), now.getMonth(), now.getDate(), Math.floor(r.mins / 60), r.mins % 60);
  if (r.weekday != null) { while (s.getDay() !== r.weekday || s <= now) s.setDate(s.getDate() + 1); }
  else if (s <= now) s.setDate(s.getDate() + 1);
  return s;
}
const stamp = d => `${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
const fmtClock = m => { const h = Math.floor(m / 60), mm = pad(m % 60); return `${(h % 12) || 12}:${mm} ${h < 12 ? "am" : "pm"}`; };
const appLink = id => `${location.origin}${location.pathname}?open=${encodeURIComponent(id)}`;
function gcalLink(r) {
  const s = nextStart(r), e = new Date(s.getTime() + 15 * 60000);
  const q = new URLSearchParams({ action: "TEMPLATE", text: `Tunas: ${r.title}`, details: `Time for ${r.title}. Open Tunas: ${appLink(r.id)}`, dates: `${stamp(s)}/${stamp(e)}`, ctz: TZ, recur: r.rule });
  return `https://calendar.google.com/calendar/render?${q.toString()}`;
}
function buildICS() {
  const now = new Date(), utc = now.toISOString().replace(/[-:]/g, "").replace(/\.\d+Z$/, "Z");
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Tunas Routine//EN", "CALSCALE:GREGORIAN"];
  reminderList().forEach((r, i) => { const s = nextStart(r), e = new Date(s.getTime() + 15 * 60000);
    lines.push("BEGIN:VEVENT", `UID:tunas-${r.id}-${i}@tunas-routine`, `DTSTAMP:${utc}`, `DTSTART;TZID=${TZ}:${stamp(s)}`, `DTEND;TZID=${TZ}:${stamp(e)}`, r.rule,
      `SUMMARY:Tunas: ${r.title.replace(/[,;]/g, " ")}`, `DESCRIPTION:Open Tunas: ${appLink(r.id)}`, "BEGIN:VALARM", "ACTION:DISPLAY", `DESCRIPTION:Tunas: ${r.title.replace(/[,;]/g, " ")}`, "TRIGGER:-PT0M", "END:VALARM", "END:VEVENT"); });
  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

let settingsPane = "";
function renderSettings(keep) {
  const body = $("shBody"), top = keep ? body.scrollTop : 0;
  $("shHead").innerHTML = sheetHead("cog", "Settings", "Your routine and backups", null, false);
  $("shHead").querySelector(".sh-ico").style.background = "var(--sky)";
  $("shClose").onclick = closeSheet;
  const isDefault = RAW === window.DEFAULT_ROUTINE;
  body.innerHTML = `
    <div class="set-group"><h3>Your name</h3><p>Tunas uses it to cheer for you.</p>
      <input class="field" id="setName" value="${esc(CFG.name || "")}" placeholder="Your name" autocomplete="given-name"></div>
    <div class="set-group"><h3>Routine</h3>
      <p>Using: <span class="pill-ok">${esc(CFG.label || "Custom routine")}</span> · ${BLOCKS.length} sections, ${Object.keys(WORKOUTS).length} workout days</p>
      <p>Your routine file stays on this phone. It is never uploaded anywhere.</p>
      <div class="row"><button class="btn small" type="button" data-act="importRoutine">Import routine file</button>
        <button class="btn ghost small" type="button" data-act="pasteToggle">Paste instead</button></div>
      ${settingsPane === "paste" ? `<textarea class="field" id="pasteBox" placeholder="Paste the routine JSON here"></textarea><div class="row"><button class="btn small" type="button" data-act="pasteApply">Use this routine</button></div>` : ""}
      <div class="row"><button class="btn ghost small" type="button" data-act="exportRoutine">Download my routine</button>
        ${isDefault ? "" : `<button class="btn ghost small" type="button" data-act="resetRoutine">Use starter routine</button>`}</div>
      ${settingsPane === "confirmReset" ? `<div class="confirm"><span>Switch to the starter routine? Your progress stays.</span><button class="btn small" type="button" data-act="resetRoutineYes">Switch</button><button class="btn ghost small" type="button" data-act="cancel">Keep mine</button></div>` : ""}
    </div>
    <div class="set-group"><h3>Reminders</h3><p>Get a phone notification when each part of your day starts. Tap a button, then tap <b>Save</b> in Google Calendar.</p>
      ${reminderList().map(r => `<div class="rem"><span><b>${esc(r.title)}</b>${fmtClock(r.mins)}${r.weekday != null ? " · " + ["Sundays","Mondays","Tuesdays","Wednesdays","Thursdays","Fridays","Saturdays"][r.weekday] : " · every day"}</span><a class="btn ghost small" href="${esc(gcalLink(r))}" target="_blank" rel="noopener">Add</a></div>`).join("")}
      <div class="row"><button class="btn ghost small" type="button" data-act="ics">Download all (.ics)</button></div>
      <p>Use the .ics file for Samsung Calendar, Outlook or iPhone. Tapping the reminder opens Tunas straight to that section.</p></div>
    <div class="set-group"><h3>Backup</h3><p>Save your XP, streak and workout logs to a file, in case you change phones or clear your browser.</p>
      <div class="row"><button class="btn small" type="button" data-act="backup">Download backup</button>
        <button class="btn ghost small" type="button" data-act="restore">Restore backup</button></div></div>
    <div class="set-group"><h3>Sound</h3><div class="row"><button class="btn ghost small" type="button" data-act="sound">${soundOn ? "Turn sound off" : "Turn sound on"}</button></div></div>
    <div class="set-group"><h3>About</h3><p>Tunas Routine · everything is saved in this browser only, with no account and no server.</p></div>`;
  $("setName").addEventListener("change", e => { const v = e.target.value.trim().slice(0, 30); RAW = { ...RAW, name: v || "Friend" }; saveRoutine(RAW); toast("Name saved", "check"); contextSay(); });
  if (keep) body.scrollTop = top;
  if (settingsPane === "paste") $("pasteBox").focus();
}
function saveRoutine(r) { try { localStorage.setItem(CFG_KEY, JSON.stringify(r)); } catch (e) {} applyRoutine(r); }
function loadRoutineText(text) {
  let r; try { r = JSON.parse(text); } catch (e) { toast("That isn't a valid routine file. Pick the .json file you were sent.", "x"); return false; }
  const err = validateRoutine(r); if (err) { toast(esc(err), "x"); return false; }
  RAW = r; saveRoutine(r); lastS = null; prevCleared = null; settingsPane = "";
  renderGuide(); refresh(true); toast(`Routine loaded: <b>${esc(r.label || "Custom routine")}</b>`, "check"); sfx("clear");
  return true;
}
function download(name, obj) { downloadText(name, JSON.stringify(obj, null, 2), "application/json"); }
function downloadText(name, text, type) {
  const blob = new Blob([text], { type });
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
}
function tickAll() {
  const d = routineDate(), today = dkey(d), node = nodesFor(d).find(n => n.id === sheetId); if (!node || node.kind !== "block") return;
  const done = (store.days[today] ||= {}); let xp = 0;
  node.b.items.forEach(i => { if (shown(i, d) && !done[i.id]) { done[i.id] = true; xp += xpFor(i.id, d); } });
  save(); sfx("ding"); buzz([15, 40, 15]); floatXP(innerWidth / 2 - 40, innerHeight / 2, `+${xp} XP`); jump($("mascot"));
  refresh(true);
}
function settingsAction(act) {
  if (act === "tickAll") return tickAll();
  if (act === "ics") return downloadText("tunas-reminders.ics", buildICS(), "text/calendar");
  if (act === "importRoutine") return $("fileRoutine").click();
  if (act === "pasteToggle") { settingsPane = settingsPane === "paste" ? "" : "paste"; return renderSettings(true); }
  if (act === "pasteApply") return loadRoutineText($("pasteBox").value);
  if (act === "exportRoutine") return download(`${slug(CFG.label || "routine")}.json`, RAW);
  if (act === "resetRoutine") { settingsPane = "confirmReset"; return renderSettings(true); }
  if (act === "resetRoutineYes") { try { localStorage.removeItem(CFG_KEY); } catch (e) {} RAW = window.DEFAULT_ROUTINE; applyRoutine(RAW); settingsPane = ""; lastS = null; prevCleared = null; renderGuide(); refresh(true); toast("Switched to the starter routine", "check"); return; }
  if (act === "cancel") { settingsPane = ""; return renderSettings(true); }
  if (act === "backup") return download(`tunas-backup-${dkey(new Date())}.json`, { app: "tunas", type: "backup", savedAt: new Date().toISOString(), data: store, routine: RAW === window.DEFAULT_ROUTINE ? null : RAW });
  if (act === "restore") return $("fileBackup").click();
  if (act === "sound") { toggleSound(); return renderSettings(true); }
}
function readFile(input, cb) { const f = input.files && input.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => { cb(String(r.result)); input.value = ""; }; r.readAsText(f); }
$("fileRoutine").addEventListener("change", e => readFile(e.target, loadRoutineText));
$("fileBackup").addEventListener("change", e => readFile(e.target, text => {
  let b; try { b = JSON.parse(text); } catch (err) { return toast("That isn't a backup file.", "x"); }
  if (!b || b.app !== "tunas" || !b.data || !b.data.days) return toast("That isn't a Tunas backup file.", "x");
  store = b.data; store.days ||= {}; store.weeks ||= {}; store.logs ||= {}; store.seen ||= {}; store.rest ||= {}; save();
  if (b.routine && !validateRoutine(b.routine)) { RAW = b.routine; saveRoutine(RAW); renderGuide(); }
  lastS = null; prevCleared = null; refresh(true); toast("Backup restored", "check");
}));
$("stCog").onclick = () => { settingsPane = ""; openSheet("settings"); };

/* ================= Celebration screens ================= */
const celeQ = [];
function queueCele(c) { celeQ.push(c); if ($("cele").hidden) nextCele(); }
function nextCele() {
  const c = celeQ.shift(); if (!c) { $("cele").hidden = true; contextSay(); return; }
  if (sheetId !== "settings") closeSheet();
  const el = $("cele"); el.hidden = false;
  el.innerHTML = `<div class="mascot cheer" id="celeMascot">${MASCOT}</div><h2 class="${c.color || ""}">${c.title}</h2><p>${c.sub}</p>
    <div class="tiles">${c.tiles.map(t => `<div class="tile" style="--c:var(${t.c})"><small>${t.k}</small><b>${t.i ? I[t.i] : ""}${t.v}</b></div>`).join("")}</div>
    <button class="btn" type="button" id="celeGo">Continue</button>`;
  $("celeGo").onclick = nextCele; $("celeGo").focus({ preventScroll: true });
  jump($("celeMascot")); sfx(c.sound || "clear"); buzz([30,60,30]); confetti();
}

/* ================= Refresh + comparisons ================= */
let prevCleared = null;
function refresh(keepSheet) {
  const d = routineDate(), S = computeAll();
  renderTop(S); renderQuests(S); renderPath(); renderContinue(); renderStreak(S); renderHistory();
  const got = renderBadges(S);
  $("tip").innerHTML = md(TIPS[dayNum(d) % TIPS.length]);
  if (sheetId && keepSheet !== false) renderSheet(true);
  else if (sheetId && sheetId !== "settings") {
    const node = nodesFor(d).find(n => n.id === sheetId); if (node) { const st = nodeState(node, d), bar = $("shHead").querySelector(".bar"); if (bar) { bar.querySelector("i").style.width = (100*st.n/st.total) + "%"; bar.querySelector("b").textContent = `${st.n} / ${st.total}`; } }
  }
  const states = {}; nodesFor(d).forEach(n => states[n.id] = nodeState(n, d));
  const fresh = got.filter(b => !store.seen[b.id]);
  if (fresh.length) { fresh.forEach(b => store.seen[b.id] = 1); save();
    if (lastS) fresh.forEach(b => toast(`Badge unlocked: <b>${b.name}</b>`, "trophy"));
    else toast(fresh.length === 1 ? `Badge unlocked: <b>${fresh[0].name}</b>` : `<b>${fresh.length} badges</b> unlocked`, "trophy"); }
  if (lastS && prevCleared) {
    const perfectNow = S.totalToday && S.doneToday === S.totalToday && lastS.doneToday < lastS.totalToday;
    if (perfectNow) {
      queueCele({ title: "Perfect day!", sub: `Every single habit done. Terbaik, ${firstName()}!`, sound: "level",
        tiles: [{ k:"Today", v:`+${S.todayXP}`, i:"bolt", c:"--gold" }, { k:"Streak", v:S.streak, i:"flame", c:"--orange" }, { k:"Level", v:S.level, i:"shield", c:"--sky" }] });
    } else {
      Object.keys(states).forEach(id => { const now = states[id], was = prevCleared[id];
        if (now.cleared && was && !was.cleared) { const n = nodesFor(d).find(x => x.id === id);
          queueCele({ title: `${esc(n.title)} cleared!`, color: "green", sub: pick(["Mantap! On to the next one.", "Steady lah. Keep the path going.", "Nice work. Your future self says thanks."]),
            tiles: [{ k:"XP earned", v:`+${now.xp}`, i:"bolt", c:"--gold" }, { k:"Done", v:`${now.n}/${now.total}`, i:"", c:"--green" }, { k:"Streak", v:S.streak, i:"flame", c:"--orange" }] }); } });
    }
    if (S.level > lastS.level) queueCele({ title: `Level ${S.level}!`, color: "sky", sub: `You're now ${TITLES[Math.min(S.level-1, TITLES.length-1)]}. Keep climbing.`, sound: "level",
      tiles: [{ k:"Total XP", v:S.xp, i:"bolt", c:"--gold" }, { k:"To next", v:`${S.L.span - S.L.cur}`, i:"", c:"--sky" }] });
    if (S.questTotal && S.questDone === S.questTotal && lastS.questDone < lastS.questTotal) toast(`Quest complete! <b>+${XP.quest} XP</b>`, "star");
    if (S.prsToday > lastS.prsToday) { toast(`New personal record! <b>+${XP.pr} XP</b>`, "trophy"); sfx("pr"); buzz([20,40,20]); say("NEW PR! Power lah!", "+" + XP.pr + " XP", "cheer", 3000); }
  }
  prevCleared = states; lastS = S;
  if (!mascotTimer) contextSay();
}

/* ================= Sound toggle + reset ================= */
function toggleSound() { soundOn = !soundOn; try { localStorage.setItem(SND_KEY, soundOn ? "on" : "off"); } catch (e) {} if (soundOn) { audio(); sfx("ding"); } renderTop(lastS || computeAll()); }
$("stSnd").onclick = toggleSound;
const area = $("resetArea");
function resetIdle() { area.innerHTML = `<button class="btn ghost small" type="button" id="resetBtn">Clear today's ticks</button>`;
  $("resetBtn").onclick = () => { area.innerHTML = `<div class="confirm"><span>Clear all of today's ticks? Workout logs stay.</span><button class="btn small" id="yesBtn" type="button">Clear</button><button class="btn ghost small" id="noBtn" type="button">Keep</button></div>`;
    $("yesBtn").onclick = () => { delete store.days[dkey(routineDate())]; save(); lastS = null; prevCleared = null; refresh(); resetIdle(); };
    $("noBtn").onclick = resetIdle; }; }
resetIdle();

$("continueBtn").onclick = () => { audio(); const id = $("continueBtn").dataset.node; if (id) openSheet(id); };

renderGuide();
refresh();
(function openFromLink() {
  const q = new URLSearchParams(location.search).get("open"); if (!q) return;
  history.replaceState(null, "", location.pathname);
  const d = routineDate(), nodes = nodesFor(d);
  if (q === "settings") return openSheet("settings");
  if (q === "history") return $("hist").scrollIntoView();
  const id = q === "now" ? (pathTarget(d, nowMins(), nodes) || {}).id : q;
  if (id && nodes.some(n => n.id === id)) return openSheet(id);
  if (q === "workout") { toast("No workout today. Rest day for your muscles.", "star"); return; }
})();
setInterval(() => { const a = document.activeElement; if (!(a && (a.tagName === "INPUT" || a.tagName === "TEXTAREA"))) refresh(); }, 60000);
document.addEventListener("visibilitychange", () => { if (!document.hidden) refresh(); });
