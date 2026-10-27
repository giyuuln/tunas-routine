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
  star:'<svg class="ico" viewBox="0 0 24 24"><path d="m12 2 3 6.3 6.9.9-5 4.8 1.2 6.9L12 17.6l-6.1 3.3L7.1 14l-5-4.8 6.9-.9z"/></svg>',
  check:'<svg viewBox="0 0 24 24"><path d="M9.5 16.2 5.3 12l-1.8 1.8 6 6L21 8.3l-1.8-1.8z"/></svg>',
  flame:'<svg viewBox="0 0 24 24"><path d="M12 1.5c1.2 4.4 5.8 6.2 5.8 12.1a5.8 5.8 0 0 1-11.6 0c0-2.9 1.4-4.7 2.9-5.8.2 2.1 1.1 3.3 2.3 3.8C11 7.9 11.3 4.6 12 1.5z"/></svg>',
  bolt:'<svg viewBox="0 0 24 24"><path d="M13.5 1.5 3.5 14h7l-1 8.5 10-12.5h-7z"/></svg>',
  shield:'<svg viewBox="0 0 24 24"><path d="M12 1.5 3.5 5v6.2c0 5.3 3.6 9.9 8.5 11.3 4.9-1.4 8.5-6 8.5-11.3V5z"/></svg>',
  trophy:'<svg viewBox="0 0 24 24"><path d="M7 3h10v2h4v3a4 4 0 0 1-4 4h-.4A5 5 0 0 1 13 14.9V18h3v3H8v-3h3v-3.1A5 5 0 0 1 7.4 12H7a4 4 0 0 1-4-4V5h4zm10 4v3a2 2 0 0 0 2-2V7zM5 7v1a2 2 0 0 0 2 2V7z"/></svg>',
  x:'<svg viewBox="0 0 24 24"><path d="M6.4 5 12 10.6 17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6L6.4 19 5 17.6l5.6-5.6L5 6.4z"/></svg>',
  cog:'<svg viewBox="0 0 24 24"><path fill-rule="evenodd" d="M10.3 2h3.4l.5 2.6a8 8 0 0 1 1.9 1.1l2.5-.9 1.7 3-2 1.7a8 8 0 0 1 0 2.2l2 1.7-1.7 3-2.5-.9a8 8 0 0 1-1.9 1.1l-.5 2.6h-3.4l-.5-2.6a8 8 0 0 1-1.9-1.1l-2.5.9-1.7-3 2-1.7a8 8 0 0 1 0-2.2l-2-1.7 1.7-3 2.5.9a8 8 0 0 1 1.9-1.1zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/></svg>',
  share:'<svg viewBox="0 0 24 24"><path d="M18 16a3 3 0 0 0-2.4 1.2l-6.7-3.4a3 3 0 0 0 0-1.6l6.7-3.4A3 3 0 1 0 15 7l-6.7 3.4a3 3 0 1 0 0 3.2L15 17a3 3 0 1 0 3-1z"/></svg>',
  pencil:'<svg viewBox="0 0 24 24"><path d="M3 17.3V21h3.7L17.8 9.9l-3.7-3.7zM20.7 7a1 1 0 0 0 0-1.4l-2.3-2.3a1 1 0 0 0-1.4 0l-1.8 1.8 3.7 3.7z"/></svg>',
  up:'<svg viewBox="0 0 24 24"><path d="M12 6 5 13l1.4 1.4L11 9.8V20h2V9.8l4.6 4.6L19 13z"/></svg>',
  down:'<svg viewBox="0 0 24 24"><path d="m12 18 7-7-1.4-1.4-4.6 4.6V4h-2v10.2l-4.6-4.6L5 11z"/></svg>',
  dots:'<svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>',
  plus:'<svg viewBox="0 0 24 24"><path d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6z"/></svg>',
  sndOn:'<svg viewBox="0 0 24 24"><path d="M3 9h4l5-4v14l-5-4H3zM15.5 8.5a5 5 0 0 1 0 7l-1.4-1.4a3 3 0 0 0 0-4.2zM18.4 5.6a9 9 0 0 1 0 12.8L17 17a7 7 0 0 0 0-9.9z"/></svg>',
  sndOff:'<svg viewBox="0 0 24 24"><path d="M3 9h4l5-4v14l-5-4H3zM15 9.4l1.4-1.4 2.1 2.1 2.1-2.1L22 9.4l-2.1 2.1 2.1 2.1-1.4 1.4-2.1-2.1-2.1 2.1-1.4-1.4 2.1-2.1z"/></svg>',
};
const ICON_CHOICES = ["sun","walk","book","focus","heart","dumb","moon","cal","star"];
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
      <g class="look"><g class="pupil"><circle cx="47.5" cy="60" r="5.5" fill="var(--m-ink)"/><circle cx="75.5" cy="60" r="5.5" fill="var(--m-ink)"/></g></g>
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
const uid = () => "h" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const pick = a => a[Math.floor(Math.random() * a.length)];
const reduced = () => window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
const clone = o => JSON.parse(JSON.stringify(o));
function tm(s, fallback) {
  if (typeof s === "number") return s;
  const m = /^(\d{1,2}):(\d{2})$/.exec(String(s || "").trim());
  return m ? (+m[1]) * 60 + (+m[2]) : fallback;
}
const hhmm = m => `${pad(Math.floor((m % 1440) / 60))}:${pad(m % 60)}`;
const fmtClock = m => { m = ((m % 1440) + 1440) % 1440; const h = Math.floor(m / 60), mm = pad(m % 60); return `${(h % 12) || 12}:${mm} ${h < 12 ? "am" : "pm"}`; };

/* ================= Language ================= */
const LANG_KEY = "tunas-lang";
let LANG = "en";
try { LANG = localStorage.getItem(LANG_KEY) || ((navigator.language || "").toLowerCase().startsWith("ms") ? "ms" : "en"); } catch (e) {}
if (!window.TUNAS_I18N[LANG]) LANG = "en";
function T(key, ...a) { const v = (window.TUNAS_I18N[LANG] || {})[key] ?? window.TUNAS_I18N.en[key]; return typeof v === "function" ? v(...a) : v; }
const locale = () => T("locale");
function applyStatic() {
  document.documentElement.lang = LANG === "ms" ? "ms" : "en";
  document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = T(el.dataset.i18n); });
  $("stStreak").title = T("streakTip"); $("stXP").title = T("xpToday"); $("stLv").title = T("levelTip"); $("stCog").setAttribute("aria-label", T("settings"));
}

/* ================= Routine config ================= */
const CFG_KEY = "tunas-config", DATA_KEY = "tunas-data-v1", SND_KEY = "tunas-sound";
const defaultRoutine = () => { const r = window.resolveTemplate(window.TUNAS_TEMPLATES.find(t => t.id === "worker").routine, LANG); r.name = LANG === "ms" ? "Kawan" : "Friend"; return r; };
let RAW = null, RAW_IS_DEFAULT = false;
try { RAW = JSON.parse(localStorage.getItem(CFG_KEY)); } catch (e) {}
if (!RAW || !Array.isArray(RAW.blocks)) { RAW = defaultRoutine(); RAW_IS_DEFAULT = true; }

let CFG, BLOCKS, FOCUS, WORKOUTS, PROG, WEEKLY, TIPS, EXMAP;
function validateRoutine(r) {
  if (!r || typeof r !== "object") return T("badFile");
  if (!Array.isArray(r.blocks) || !r.blocks.length) return T("errNoBlocks");
  for (const b of r.blocks) if (!b || !Array.isArray(b.items)) return T("errNoItems", b && b.title || "?");
  return null;
}
function applyRoutine(r) {
  CFG = r;
  BLOCKS = r.blocks.map(b => {
    const from = tm(b.from, 0); let to = tm(b.to, from + 120); if (to <= from) to += 1440;
    return { id: slug(b.id || b.title), title: b.title || "Section", icon: I[b.icon] ? b.icon : "star", range: b.range || "", from, to, remind: b.remind ? tm(b.remind, null) : null,
      say: Array.isArray(b.say) ? b.say : null,
      items: (b.items || []).map(i => ({ id: slug(i.id || i.title), t: i.title || "", n: i.note || "", time: i.time || "",
        key: !!i.quest, alt: !!i.everyOtherDay, hide: Array.isArray(i.hideOnDays) && i.hideOnDays.length ? i.hideOnDays.map(Number) : null, dyn: !!i.useFocus })) };
  });
  FOCUS = {};
  for (let k = 0; k < 7; k++) { const f = (r.focus || {})[k] || (r.focus || {})[String(k)] || {}; FOCUS[k] = { t: f.title || (LANG === "ms" ? "1 jam: fokus" : "1 hour: focus"), n: f.note || "" }; }
  WORKOUTS = {};
  Object.entries(r.workouts || {}).forEach(([day, w]) => {
    if (!w || !Array.isArray(w.exercises) || !w.exercises.length) return;
    const from = w.from != null ? tm(w.from, null) : null; let to = w.to != null ? tm(w.to, null) : null;
    if (from != null && to != null && to <= from) to += 1440;
    WORKOUTS[+day] = { name: w.name || "Workout", when: w.when || "", from, to, remind: w.remind ? tm(w.remind, null) : (from != null ? from : null),
      after: slug(w.after || BLOCKS[0].id), say: Array.isArray(w.say) ? w.say : null,
      ex: w.exercises.map(e => ({ id: slug(e.id || e.name), name: e.name || "Exercise", reps: e.reps || "8–12", rest: e.rest || "60s", cue: e.cue || "", bw: !!e.bodyweight, unit: e.unit === "sec" ? "sec" : "" })) };
  });
  PROG = r.progression || {};
  WEEKLY = (r.weekly || []).map(w => ({ id: slug(w.id || w.title), t: w.title || "" }));
  TIPS = (r.tips && r.tips.length) ? r.tips : ["**Small steps, every day.**"];
  EXMAP = {}; Object.values(WORKOUTS).forEach(W => W.ex.forEach(ex => { EXMAP[ex.id] ||= ex; }));
}
applyRoutine(RAW);
function saveRoutine(r) { try { localStorage.setItem(CFG_KEY, JSON.stringify(r)); } catch (e) {} RAW = r; RAW_IS_DEFAULT = false; applyRoutine(r); }

/* ================= Game rules ================= */
const XP = { item: 10, key: 20, workout: 50, perfect: 50, quest: 40, pr: 25, weekly: 15 };
const COLORS = [["--gold","--gold-d"],["--sky","--sky-d"],["--green","--green-d"],["--orange","--orange-d"],["--pink","--pink-d"]];
const BADGES = [
  { id:"first", g:"1", test:S=>S.ticks>=1 }, { id:"quest", g:"★", test:S=>S.quests>=1 }, { id:"perfect", g:"100", test:S=>S.perfectDays>=1 },
  { id:"streak3", g:"3d", test:S=>S.bestStreak>=3 }, { id:"streak7", g:"7d", test:S=>S.bestStreak>=7 }, { id:"streak30", g:"30d", test:S=>S.bestStreak>=30 },
  { id:"iron", g:"Fe", test:S=>S.workouts>=1 }, { id:"fullweek", g:"All", test:S=>S.fullWeeks>=1 }, { id:"w12", g:"12", test:S=>S.workouts>=12 },
  { id:"pr1", g:"PR", test:S=>S.prs>=1 }, { id:"pr10", g:"10", test:S=>S.prs>=10 }, { id:"habit14", g:"14", test:S=>S.topQuestCount>=14 },
  { id:"perfect7", g:"7×", test:S=>S.perfectDays>=7 }, { id:"ticks500", g:"500", test:S=>S.ticks>=500 }, { id:"lv5", g:"Lv5", test:S=>S.level>=5 }, { id:"lv10", g:"Lv10", test:S=>S.level>=10 },
];
const badgeName = id => (T("badge")[id] || [id, ""])[0], badgeHow = id => (T("badge")[id] || ["", ""])[1];
const titleOf = n => { const t = T("titles"); return t[Math.min(n - 1, t.length - 1)]; };

/* ================= Progress storage ================= */
let store = { days:{}, weeks:{}, logs:{}, seen:{}, rest:{} };
try { const s = JSON.parse(localStorage.getItem(DATA_KEY)); if (s && s.days) store = s; } catch (e) {}
function normStore() { store.days ||= {}; store.weeks ||= {}; store.logs ||= {}; store.seen ||= {}; store.rest ||= {}; store.rem ||= {}; }
normStore();
function save() { try { localStorage.setItem(DATA_KEY, JSON.stringify(store)); } catch (e) {} }
let soundOn = true; try { soundOn = localStorage.getItem(SND_KEY) !== "off"; } catch (e) {}

/* ================= Dates ================= */
const dkey = d => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
const keyToDate = k => { const [y,m,d] = k.split("-").map(Number); return new Date(y, m-1, d); };
const dayNum = d => Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 864e5);
function wkey(d) { const x = new Date(d); x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); return dkey(x); }
function routineDate() { const d = new Date(); if (d.getHours() < 4) d.setDate(d.getDate() - 1); return d; }
function nowMins() { const n = new Date(); return n.getHours()*60 + n.getMinutes() + (n.getHours() < 4 ? 1440 : 0); }
const weekdayName = (k, style) => { const d = new Date(2024, 0, 7 + k); return d.toLocaleDateString(locale(), { weekday: style || "long" }); };
const isAltDay = d => dayNum(d) % 2 === 0;
const shown = (i, d) => !(i.alt && !isAltDay(d)) && !(i.hide && i.hide.includes(d.getDay()));
const firstName = () => esc(CFG.name || (LANG === "ms" ? "Kawan" : "Friend"));

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
  const woNode = () => ({ id: "workout", kind: "workout", W, title: W.name, icon: "dumb", range: W.when, from: W.from, to: W.to, say: W.say });
  BLOCKS.forEach(b => { out.push({ id: b.id, kind: "block", b, title: b.title, icon: b.icon, range: b.range, from: b.from, to: b.to, say: b.say });
    if (W && W.after === b.id) out.push(woNode()); });
  if (W && !BLOCKS.some(b => b.id === W.after)) out.push(woNode());
  if (WEEKLY.length) out.push({ id: "weekly", kind: "weekly", title: T("thisWeek"), icon: "cal", range: T("resetsMonday") });
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
function pathTarget(d, mins, nodes) {
  return nodes.find(n => inWindow(n, mins) && !nodeState(n, d).cleared) || nodes.find(n => !nodeState(n, d).cleared && n.kind !== "weekly") || null;
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
function toast(html, icon, ms) { const t = document.createElement("div"); t.className = "toast"; t.innerHTML = `<i>${I[icon || "star"]}</i><span>${html}</span>`;
  $("toasts").appendChild(t); setTimeout(() => { t.classList.add("out"); setTimeout(() => t.remove(), 320); }, ms || 2800); }
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
function setMood(el, mood) { el.classList.remove("happy","cheer","sleepy","think"); if (mood && mood !== "idle") el.classList.add(mood); }
function jump(el) { if (!el || reduced()) return; el.classList.remove("jump"); void el.offsetWidth; el.classList.add("jump"); setTimeout(() => el.classList.remove("jump"), 600); }
let typeTimer = null, lastSaid = "";
function say(text, sub, mood, ms) {
  const b = $("bubble"), html = text + (sub ? `<small>${sub}</small>` : "");
  if (html !== lastSaid) {
    lastSaid = html; clearInterval(typeTimer);
    const tmp = document.createElement("div"); tmp.innerHTML = text; const plain = tmp.textContent;
    if (reduced() || plain.length < 3) b.innerHTML = html;
    else { // typewriter: main line types out, small line appears at the end
      let i = 0; const step = Math.max(1, Math.ceil(plain.length / 40));
      b.innerHTML = `<span class="tw"></span>`; const tw = b.firstChild;
      typeTimer = setInterval(() => { i += step; tw.textContent = plain.slice(0, i); if (i >= plain.length) { clearInterval(typeTimer); b.innerHTML = html; } }, 22);
    }
    b.classList.remove("pop"); void b.offsetWidth; b.classList.add("pop");
  }
  setMood($("mascot"), mood || "happy"); clearTimeout(mascotTimer); mascotTimer = null;
  if (ms) mascotTimer = setTimeout(() => { mascotTimer = null; contextSay(); }, ms);
}
const itemTitle = (i, d) => (i.dyn ? FOCUS[d.getDay()].t : i.t);
function nextOpen(node, d) {
  const done = store.days[dkey(d)] || {};
  if (node.kind === "block") return node.b.items.find(i => shown(i, d) && !done[i.id]) || null;
  if (node.kind === "workout") { const logs = store.logs[dkey(d)] || {}; return node.W.ex.find(ex => !(logs[ex.id] || []).some(s => s && s[1])) || null; }
  const wd = store.weeks[wkey(d)] || {}; return WEEKLY.find(i => !wd[i.id]) || null;
}
function contextSay() {
  if (mascotTimer) return;
  const d = routineDate(), mins = nowMins(), S = lastS || computeAll(), h = new Date().getHours();
  const nodes = nodesFor(d), timed = nodes.filter(n => n.from != null && n.to != null), now = timed.find(n => inWindow(n, mins));
  const say2 = (p, mood) => say(p[0], p[1] || "", mood);
  // 1. Whole day done
  if (S.totalToday && S.doneToday === S.totalToday) return say2(T("sayPerfect", firstName()), "cheer");
  // 2. Late night: talk about what's actually left tonight
  if (h >= 23 || h < 4) {
    const tonight = now && now.kind === "block" ? now : timed.filter(n => n.kind === "block").slice(-1)[0];
    const st = tonight && nodeState(tonight, d), nx = tonight && nextOpen(tonight, d);
    if (nx) return say2(T("sayLateLeft", st.total - st.n, esc(itemTitle(nx, d))), "sleepy");
    return say2(T("sayLateDone"), "sleepy");
  }
  // 3. Streak at risk in the evening
  if (h >= 21 && S.streak > 0 && S.totalToday && S.doneToday / S.totalToday < 0.8 && !isRest(d)) {
    const need = Math.ceil(0.8 * S.totalToday) - S.doneToday; return say2(T("sayStreakRisk", need, S.streak), "think");
  }
  // 4. The section happening right now
  if (now) {
    const st = nodeState(now, d), nx = nextOpen(now, d);
    if (st.cleared) {
      const later = timed.find(n => n.from >= now.to - 1 && n !== now && !nodeState(n, d).cleared) || timed.find(n => n.from > now.from && !nodeState(n, d).cleared);
      return say2(later ? T("sayClearedNext", esc(now.title), esc(later.title), fmtClock(later.from)) : T("sayClearedAll", esc(now.title)), "happy");
    }
    if (now.kind === "workout") {
      if (st.n === 0) { const m = now.say || T("sayWoStart", esc(now.title), esc(nx ? nx.name : "")); return say(esc(m[0]), nx ? T("sayStartWith", esc(nx.name)) : esc(m[1] || ""), "happy"); }
      return say2(nx ? T("sayWoNext", esc(nx.name)) : T("sayWoTick"), "happy");
    }
    if (st.n > 0 && nx) return say(T("sayNext", esc(itemTitle(nx, d))), `${T("of", st.n, st.total)}${nx.time ? " · " + esc(nx.time) : ""}`, "happy");
    const intro = now.say ? esc(now.say[0]) : T("sayStartSec", esc(now.title));
    return say(intro, nx ? `${T("sayStartWith", esc(itemTitle(nx, d)))}${nx.time ? " · " + esc(nx.time) : ""}` : "", "idle");
  }
  // 5. A section that already ended but still has unticked habits
  const missed = timed.filter(n => n.kind !== "weekly" && n.to <= mins && !nodeState(n, d).cleared).slice(-1)[0];
  if (missed) { const st = nodeState(missed, d); return say2(T("sayMissed", esc(missed.title), st.total - st.n), "think"); }
  // 6. Away (work / class), from the user's routine
  const away = CFG.away;
  if (away && mins >= tm(away.from, 510) && mins < tm(away.to, 1050)) { const a = away.say || [T("letsGo"), ""]; return say(esc(a[0]), esc(a[1] || ""), "idle"); }
  // 7. What's coming up next
  const up = timed.find(n => n.from > mins && !nodeState(n, d).cleared);
  if (up) { const st = nodeState(up, d); return say2(T("sayUpcoming", esc(up.title), fmtClock(up.from), st.total - st.n), "idle"); }
  return say(T("sayHi", firstName()), T("doneToday", S.doneToday, S.totalToday), "idle");
}

/* ---- Tap Tunas: facts from the user's own routine and progress ---- */
let factIdx = 0, tapTimes = [];
function tunasFacts() {
  const d = routineDate(), S = lastS || computeAll(), out = [];
  out.push(T("factToday", S.doneToday, S.totalToday));
  if (S.streak) out.push(T("factStreak", S.streak, S.bestStreak)); else out.push(T("factNoStreak"));
  const counts = {}, keys = new Set();
  for (let k = 1; k <= 7; k++) { const x = new Date(d); x.setDate(x.getDate() - k); const dn = store.days[dkey(x)] || {};
    BLOCKS.forEach(b => b.items.forEach(i => { if (!shown(i, x)) return; keys.add(i.id); counts[i.id] = (counts[i.id] || 0) + (dn[i.id] ? 1 : 0); })); }
  const all = BLOCKS.flatMap(b => b.items).filter(i => keys.has(i.id));
  if (all.length && Object.keys(store.days).length > 1) {
    const best = all.reduce((p, c) => (counts[c.id] > counts[p.id] ? c : p)); if (counts[best.id] > 0) out.push(T("factBest", esc(itemTitle(best, d)), counts[best.id]));
    const stars = all.filter(i => i.key); const worst = (stars.length ? stars : all).reduce((p, c) => (counts[c.id] < counts[p.id] ? c : p));
    if (counts[worst.id] < 7) out.push(T("factMissed", esc(itemTitle(worst, d)), counts[worst.id]));
  }
  const tw = WORKOUTS[(d.getDay() + 1) % 7]; out.push(tw ? T("factTomorrowWo", esc(tw.name)) : (Object.keys(WORKOUTS).length ? T("factTomorrowRest") : T("factTomorrow", esc((BLOCKS[0] || {}).title || ""))));
  out.push(T("factLevel", S.L.span - S.L.cur, S.level + 1));
  if (BLOCKS.some(b => b.items.some(i => i.dyn))) out.push(T("factFocus", esc(FOCUS[d.getDay()].t)));
  const r = routineDate(); const left = REST_PER_MONTH - restsInMonth(r); out.push(T("factRest", left));
  return out;
}
function tapTunas() {
  audio(); const now = Date.now(); tapTimes = tapTimes.filter(t => now - t < 1500); tapTimes.push(now);
  if (tapTimes.length >= 4) { tapTimes = []; const g = T("sayTickle"); sfx("level"); buzz([10, 30, 10, 30, 10]); return say(g[0], g[1], "cheer", 2800), jump($("mascot")); }
  const facts = tunasFacts(); const f = facts[factIdx++ % facts.length];
  sfx("ding"); jump($("mascot")); say(f, T("tapAgain"), "happy", 4500);
}

/* ================= Rest timer ================= */
let restT = null, restEnd = 0, restTotal = 0, wake = null;
const fmtTime = ms => { const s = Math.ceil(ms/1000); return `${Math.floor(s/60)}:${pad(s%60)}`; };
async function holdWake() { try { if (!wake && navigator.wakeLock) { wake = await navigator.wakeLock.request("screen"); wake.addEventListener("release", () => { wake = null; }); } } catch (e) {} }
function startRest(sec, label) { restTotal = sec; restEnd = Date.now() + sec*1000; $("restLabel").textContent = T("rest") + " · " + label; $("restbar").hidden = false; audio(); holdWake(); clearInterval(restT); restT = setInterval(tickRest, 250); tickRest(); }
function tickRest() { const left = Math.max(0, restEnd - Date.now()); $("restTime").textContent = left > 0 ? fmtTime(left) : "Go!"; $("restFill").style.width = (100 * (1 - left/(restTotal*1000))) + "%";
  if (left <= 0) { clearInterval(restT); restT = null; sfx("beep"); buzz([200,100,200]); setTimeout(() => { if (!restT) $("restbar").hidden = true; }, 2500); } }
$("restSkip").onclick = () => { clearInterval(restT); restT = null; $("restbar").hidden = true; };
$("restPlus").onclick = () => { if (!restT) return startRest(15, $("restLabel").textContent.split(" · ").slice(1).join(" · ")); restEnd += 15000; restTotal += 15; };

/* ================= Rendering: main page ================= */
let lastS = null;
function renderTop(S) {
  $("stStreak").className = "stat fire" + (S.streak ? "" : " off"); $("stStreak").innerHTML = I.flame + S.streak;
  $("stXP").innerHTML = I.bolt + S.todayXP; $("stLv").innerHTML = I.shield + T("lv", S.level);
  $("stSnd").innerHTML = soundOn ? I.sndOn : I.sndOff; $("stSnd").setAttribute("aria-label", T("sound"));
  $("stCog").innerHTML = I.cog;
  $("lvName").innerHTML = `${T("level", S.L.n)} · <span>${titleOf(S.L.n)}</span>`;
  $("lvXP").textContent = T("xpTotal", S.xp);
  $("lvFill").style.width = (100 * S.L.cur / S.L.span) + "%"; $("lvBar").textContent = T("xpOf", S.L.cur, S.L.span);
}
function renderQuests(S) {
  const d = routineDate(), W = WORKOUTS[d.getDay()], done = store.days[dkey(d)] || {};
  const Q = [{ ico:"star", t:T("qStar"), n:S.questDone, of:S.questTotal, rew:XP.quest }, { ico:"trophy", t:T("qDay"), n:S.doneToday, of:S.totalToday, rew:XP.perfect }];
  if (W) Q.splice(1, 0, { ico:"bolt", t:T("qWorkout", esc(W.name)), n: done["wo-done"] ? 1 : 0, of: 1, rew: XP.workout });
  else Q.splice(1, 0, { ico:"flame", t:T("qXP"), n: Math.min(S.todayXP, 150), of: 150, rew: 0 });
  $("quests").innerHTML = Q.filter(q => q.of > 0).map(q => { const won = q.n >= q.of;
    return `<div class="quest${won ? " won" : ""}"><div class="q-ico">${I[q.ico]}</div><div class="q-main"><div class="q-t">${q.t}</div><div class="bar${won ? " green" : ""}"><i style="width:${100*q.n/q.of}%"></i><b>${q.n} / ${q.of}</b></div></div><span class="q-rew">${won ? T("done") : q.rew ? "+" + q.rew : T("bonus")}</span></div>`; }).join("");
}
function renderContinue() {
  const d = routineDate(), t = pathTarget(d, nowMins(), nodesFor(d)), b = $("continueBtn");
  if (!t) { b.hidden = true; return; }
  const st = nodeState(t, d); b.hidden = false; b.dataset.node = t.id;
  b.innerHTML = `${st.n === 0 ? T("start") : T("cont")}: ${esc(t.title)} <span>${T("left", st.total - st.n)}</span>`;
}
const OFFS = [0, 62, 90, 62, 0, -62, -90, -62];
function renderPath() {
  const d = routineDate(), mins = nowMins(), nodes = nodesFor(d), target = pathTarget(d, mins, nodes);
  $("path").innerHTML = nodes.map((n, i) => {
    const st = nodeState(n, d), isNow = inWindow(n, mins);
    const cls = st.cleared ? "done" : (isNow || st.n > 0 || n === target) ? "go" : "";
    const C = 2 * Math.PI * 45, ring = !st.cleared && st.n > 0 ? `<svg class="ringp" viewBox="0 0 96 96"><circle class="tr" cx="48" cy="48" r="45"/><circle class="pr" cx="48" cy="48" r="45" stroke-dasharray="${C}" stroke-dashoffset="${C*(1-st.n/st.total)}"/></svg>` : "";
    const call = n === target ? `<div class="callout">${st.n === 0 ? (isNow ? T("startNow") : T("start")) : T("left", st.total - st.n)}</div>` : "";
    return `<div class="node-wrap" style="transform:translateX(${OFFS[i % OFFS.length]}px)">${call}
      <button class="node ${cls}${n === target && !reduced() ? " now-pulse" : ""}" type="button" data-node="${n.id}" aria-label="${esc(n.title)}, ${T("of", st.n, st.total)}">${ring}${I[n.icon] || I.star}${st.cleared ? `<span class="tick">${I.check}</span>` : ""}</button>
      <div class="node-label"><b>${esc(n.title)}</b><span>${st.n}/${st.total}${n.range ? " · " + esc(n.range) : ""}</span></div></div>`;
  }).join("");
  $("pathTitle").textContent = T("todaysPath", d.toLocaleDateString(locale(), { weekday: "long" }));
}
$("path").addEventListener("click", e => { const b = e.target.closest("[data-node]"); if (b) { audio(); openSheet(b.dataset.node); } });

function restRow(d) {
  const left = REST_PER_MONTH - restsInMonth(d), on = isRest(d), key = dkey(d);
  if (on) return `<div class="rest-row"><span>${T("restOn")}</span><button class="btn ghost small" type="button" data-restday="${key}" data-v="0">${T("undo")}</button></div>`;
  return `<div class="rest-row"><span>${T("restOff", left)}</span>${left > 0 ? `<button class="btn ghost small" type="button" data-restday="${key}" data-v="1">${T("restBtn")}</button>` : ""}</div>`;
}
function setRest(key, v) {
  const d = keyToDate(key);
  if (v && !store.rest[key] && restsInMonth(d) >= REST_PER_MONTH) { toast(T("restUsed"), "x"); return; }
  if (v) store.rest[key] = true; else delete store.rest[key];
  save(); if (v) { toast(T("restSaved"), "moon"); const r = T("restSay"); say(r[0], r[1], "sleepy", 3000); }
  refresh(true);
}
function renderStreak(S) {
  const d = routineDate(); let days = "";
  for (let k = 6; k >= 0; k--) { const x = new Date(d); x.setDate(x.getDate() - k); const r = ratio(x), rst = isRest(x);
    days += `<div class="day${k === 0 ? " today" : ""}${rst ? " rest" : r >= .8 ? " full" : r > 0 ? " part" : ""}" title="${rst ? T("lgRest") : Math.round(r*100) + "%"}"><i>${rst ? I.moon : I.flame}</i><span>${x.toLocaleDateString(locale(), { weekday: "short" }).slice(0, 2)}</span></div>`; }
  $("streakCard").innerHTML = `<div class="streak-top"><svg class="big-flame${S.streak ? "" : " off"}" viewBox="0 0 24 24"><path d="${I.flame.match(/d="([^"]+)"/)[1]}"/></svg><div><b>${T("streakDays", S.streak)}</b><span>${S.streak ? T("streakKeep") : T("streakStart")} · ${T("best", S.bestStreak)}</span></div></div><div class="week">${days}</div>${restRow(d)}`;
}
$("streakCard").addEventListener("click", e => { const b = e.target.closest("[data-restday]"); if (b) setRest(b.dataset.restday, b.dataset.v === "1"); });

let histMonth = (() => { const d = routineDate(); return new Date(d.getFullYear(), d.getMonth(), 1); })();
function renderHistory() {
  const today = dkey(routineDate()), y = histMonth.getFullYear(), m = histMonth.getMonth();
  const first = new Date(y, m, 1), lead = (first.getDay() + 6) % 7, daysIn = new Date(y, m + 1, 0).getDate();
  let cells = "", full = 0, rests = 0;
  for (let i = 0; i < lead; i++) cells += `<span class="hc empty"></span>`;
  for (let n = 1; n <= daysIn; n++) {
    const dd = new Date(y, m, n), k = dkey(dd), future = k > today, r = future ? 0 : ratio(dd), rst = isRest(dd);
    if (!future && (r >= .8 || rst)) full++; if (rst) rests++;
    const cls = ["hc", k === today ? "today" : "", future ? "future" : "", rst ? "rest" : r >= 1 ? "perfect" : r >= .8 ? "full" : r > 0 ? "part" : ""].join(" ").trim();
    cells += `<button class="${cls}" type="button" data-day="${k}" ${future ? "disabled" : ""} aria-label="${dd.toLocaleDateString(locale())}${future ? "" : rst ? ", " + T("lgRest") : `, ${Math.round(r*100)}%`}">${n}</button>`;
  }
  const rd = routineDate(), thisMonth = new Date(rd.getFullYear(), rd.getMonth(), 1);
  $("hist").innerHTML = `<div class="h-top"><button class="x" type="button" data-hnav="-1" aria-label="${T("prevMonth")}">‹</button><b>${histMonth.toLocaleDateString(locale(), { month: "long", year: "numeric" })}</b><button class="x" type="button" data-hnav="1" aria-label="${T("nextMonth")}" ${histMonth >= thisMonth ? "disabled" : ""}>›</button></div>
    <div class="h-grid">${T("wk").map(w => `<span class="hw">${w}</span>`).join("")}${cells}</div>
    <div class="h-foot"><span><i class="lg perfect"></i>${T("lgFull")}</span><span><i class="lg full"></i>${T("lgGood")}</span><span><i class="lg part"></i>${T("lgPart")}</span><span><i class="lg rest"></i>${T("lgRest")}</span></div>
    <p class="h-note">${T("histNote", full, rests)}</p>`;
}
$("hist").addEventListener("click", e => {
  const nav = e.target.closest("[data-hnav]"); if (nav) { histMonth = new Date(histMonth.getFullYear(), histMonth.getMonth() + (+nav.dataset.hnav), 1); renderHistory(); return; }
  const c = e.target.closest("[data-day]"); if (c && !c.disabled) openSheet("day:" + c.dataset.day);
});
function renderBadges(S) {
  const got = BADGES.filter(b => b.test(S)); $("badgeMeta").textContent = `${got.length}/${BADGES.length}`;
  $("bgrid").innerHTML = BADGES.map((b, i) => { const ok = b.test(S), c = COLORS[i % COLORS.length];
    return `<div class="badge${ok ? "" : " locked"}" style="--c:var(${c[0]});--cd:var(${c[1]})"><div class="medal"><span>${b.g}</span></div><div class="bn">${badgeName(b.id)}</div><div class="bh">${badgeHow(b.id)}</div></div>`; }).join("");
  return got;
}
function renderGuide() {
  const g = CFG.guide;
  $("guideTitle").hidden = !g; $("guide").hidden = !g;
  if (!g) return;
  $("guideTitle").textContent = g.title || T("guide");
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
  if (!sheetId) return; sheetId = null; ED = null;
  $("scrim").classList.remove("show"); $("sheet").classList.remove("show"); document.body.classList.remove("locked");
  setTimeout(() => { if (!sheetId) { $("scrim").hidden = true; $("sheet").hidden = true; } }, 320);
  if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
}
$("scrim").onclick = () => { if (sheetId !== "editor") closeSheet(); };
document.addEventListener("keydown", e => { if (e.key === "Escape") { if (!$("cele").hidden) return nextCele(); if (sheetId !== "editor") closeSheet(); } });

function taskHTML(i, checked, tag) {
  return `<button class="task" type="button" role="checkbox" aria-checked="${checked}" data-task="${i.id}">
    <span class="ck">${I.check}</span><span class="tt"><b>${esc(i.t)}${tag}</b>${i.n ? `<span>${esc(i.n)}</span>` : ""}</span>${i.time ? `<span class="tm">${esc(i.time)}</span>` : ""}</button>`;
}
function sheetHead(icon, title, sub, st, color) {
  return `<div class="grab"></div><div class="sh-row"><div class="sh-ico" style="background:var(${color || "--green"})">${I[icon] || I.star}</div><div><h2 id="shTitle">${title}</h2><p>${sub}</p></div><button class="x" id="shClose" type="button" aria-label="Close">${I.x}</button></div>` +
    (st ? `<div class="bar green"><i style="width:${st.total ? 100*st.n/st.total : 0}%"></i><b>${st.n} / ${st.total}</b></div>` : "");
}
function renderSheet(keep) {
  if (!sheetId) return;
  if (sheetId === "settings") return renderSettings(keep);
  if (sheetId === "editor") return renderEditor(keep);
  if (sheetId.startsWith("day:")) return renderDaySheet(sheetId.slice(4), keep);
  const d = routineDate(), today = dkey(d), node = nodesFor(d).find(n => n.id === sheetId); if (!node) { closeSheet(); return; }
  const st = nodeState(node, d), body = $("shBody"), top = keep ? body.scrollTop : 0;
  $("shHead").innerHTML = sheetHead(node.icon, esc(node.title), `${esc(node.range)}${node.range ? " · " : ""}${T("of", st.n, st.total)}`, st, st.cleared ? "--gold" : "--green");
  $("shClose").onclick = closeSheet;
  const done = store.days[today] || {};
  let h = "";
  if (node.kind === "block") {
    const left = node.b.items.filter(i => shown(i, d) && !done[i.id]).length;
    if (left > 1) h += `<button class="btn small tickall" type="button" data-act="tickAll">${T("tickAll", left)}</button>`;
    node.b.items.forEach(i => {
      if (i.dyn) i = { ...i, ...FOCUS[d.getDay()] };
      if (i.alt && !isAltDay(d)) { h += `<div class="note">${esc(CFG.everyOtherDayNote || T("altNote"))}</div>`; return; }
      if (i.hide && i.hide.includes(d.getDay())) { h += `<div class="note">${esc(CFG.hideNote || T("hideNote"))}</div>`; return; }
      const tag = i.key ? `<span class="qtag">★ +${XP.key}</span>` : i.alt ? `<span class="qtag alt">${T("every2")}</span>` : "";
      h += taskHTML(i, !!done[i.id], tag);
    });
  } else if (node.kind === "weekly") {
    const wd = store.weeks[wkey(d)] || {};
    WEEKLY.forEach(i => { h += taskHTML(i, !!wd[i.id], `<span class="qtag alt">+${XP.weekly}</span>`); });
    h += `<div class="note">${T("weeklyNote")}</div>`;
  } else {
    const W = node.W, wk = programWeek(d), nSets = wk <= 4 ? 2 : 3, logs = store.logs[today] || {};
    h += `<div class="rules">${T("woRules", wk, nSets, XP.pr)}</div>`;
    W.ex.forEach(ex => {
      const last = lastLog(ex.id, today), prev = bestBefore(ex.id, today), P = PROG[ex.id] || { start: "", step: 2 };
      const topR = Math.max(...(String(ex.reps).match(/\d+/g) || ["0"]).map(Number));
      let hint;
      if (!last) hint = ex.bw ? T("firstBW") : (P.start ? T("startWith", esc(P.start)) : T("firstW"));
      else { const ds = last.filter(s => s && (s[0] || s[1])), allTop = ds.length > 0 && ds.every(s => (parseFloat(s[1]) || 0) >= topR), kg = Math.max(0, ...ds.map(s => parseFloat(s[0]) || 0)), base = T("last", fmtSets(last, ex)), step = +P.step || 2;
        if (ex.bw) hint = base + (allTop ? T("hBWtop") : T("hBW"));
        else if (allTop && kg && P.max && kg + step > P.max) hint = base + T("hMax");
        else if (allTop && kg && P.small) hint = base + T("hSmall", kg + step);
        else if (allTop && kg) hint = base + T("hUp", kg + step);
        else hint = base + T("hSame"); }
      let sets = "";
      for (let s = 0; s < nSets; s++) { const v = (logs[ex.id] || [])[s] || ["", ""], isPR = prev != null && score(ex, v) > prev + 1e-9;
        sets += `<div class="set"><span class="sl">${T("set", s+1)}</span>` + (ex.bw ? "" : `<input inputmode="decimal" id="log-${ex.id}-${s}-kg" data-ex="${ex.id}" data-s="${s}" data-f="0" value="${esc(v[0])}" aria-label="${esc(ex.name)} ${T("set", s+1)} kg"><span class="u">kg ×</span>`) +
          `<input inputmode="numeric" id="log-${ex.id}-${s}-r" data-ex="${ex.id}" data-s="${s}" data-f="1" value="${esc(v[1])}" aria-label="${esc(ex.name)} ${T("set", s+1)} ${ex.unit === "sec" ? T("sec") : T("reps")}"><span class="u">${ex.unit === "sec" ? T("sec") : T("reps")}</span><span class="prchip"${isPR ? "" : " hidden"}>${T("newPR")}</span></div>`; }
      const rs = parseInt(ex.rest, 10) || 60;
      h += `<div class="ex"><div class="ex-h"><b>${esc(ex.name)}</b><span>${nSets} × ${esc(ex.reps)} · ${T("restWord")} ${esc(ex.rest)}</span></div>${ex.cue ? `<div class="cue">${esc(ex.cue)}</div>` : ""}<div class="hint">${hint}</div>${sets}
        <button class="btn ghost small" type="button" data-rest="${rs}" data-label="${esc(ex.name)}">${T("startRest", rs)}</button></div>`;
    });
    h += taskHTML({ id: "wo-done", t: T("woDone"), n: T("woDoneN") }, !!done["wo-done"], `<span class="qtag">★ +${XP.workout}</span>`);
  }
  body.innerHTML = h; if (keep) body.scrollTop = top;
}
function renderDaySheet(key, keep) {
  const d = keyToDate(key), body = $("shBody"), top = keep ? body.scrollTop : 0, done = store.days[key] || {}, ids = itemsFor(d);
  const st = { n: ids.filter(id => done[id]).length, total: ids.length }, isToday = key === dkey(routineDate());
  $("shHead").innerHTML = sheetHead("cal", d.toLocaleDateString(locale(), { weekday: "long", day: "numeric", month: "long" }),
    isRest(d) ? T("restSub") : `${T("of", st.n, st.total)} · ${Math.round(100*st.n/(st.total||1))}%${isToday ? " · " + T("todayTag") : ""}`, st, "--sky");
  $("shClose").onclick = closeSheet;
  let h = `<div class="note">${isToday ? T("dayToday") : T("dayFix")}</div><div class="set-group">${restRow(d).replace('class="rest-row"', 'class="rest-row in-sheet"')}</div>`;
  const W = WORKOUTS[d.getDay()];
  BLOCKS.forEach(b => {
    const items = b.items.filter(i => shown(i, d)); if (!items.length && !(W && W.after === b.id)) return;
    h += `<h3 class="grp">${esc(b.title)}</h3>`;
    items.forEach(i => { if (i.dyn) i = { ...i, ...FOCUS[d.getDay()] }; h += taskHTML(i, !!done[i.id], i.key ? `<span class="qtag">★</span>` : ""); });
    if (W && W.after === b.id) h += taskHTML({ id: "wo-done", t: T("workoutOf", W.name), n: "" }, !!done["wo-done"], `<span class="qtag">★</span>`);
  });
  body.innerHTML = h; if (keep) body.scrollTop = top;
}
function tickAll() {
  const d = routineDate(), today = dkey(d), node = nodesFor(d).find(n => n.id === sheetId); if (!node || node.kind !== "block") return;
  const done = (store.days[today] ||= {}); let xp = 0;
  node.b.items.forEach(i => { if (shown(i, d) && !done[i.id]) { done[i.id] = true; xp += xpFor(i.id, d); } });
  save(); sfx("ding"); buzz([15, 40, 15]); floatXP(innerWidth / 2 - 40, innerHeight / 2, `+${xp} XP`); jump($("mascot"));
  refresh(true);
}

$("shBody").addEventListener("click", e => {
  if (sheetId === "editor") return editorClick(e);
  const ra = e.target.closest("[data-remadd]"); if (ra) { store.rem[ra.dataset.remadd] = Date.now(); save(); setTimeout(() => { if (sheetId === "settings") renderSettings(true); }, 400); return; }
  const ru = e.target.closest("[data-remundo]"); if (ru) { delete store.rem[ru.dataset.remundo]; save(); renderSettings(true); return; }
  const rd = e.target.closest("[data-restday]"); if (rd) return setRest(rd.dataset.restday, rd.dataset.v === "1");
  const act = e.target.closest("[data-act]"); if (act) return settingsAction(act.dataset.act, act);
  const r = e.target.closest("[data-rest]"); if (r) { startRest(+r.dataset.rest, r.dataset.label); return; }
  const t = e.target.closest("[data-task]"); if (!t) return;
  const id = t.dataset.task, dayKey = sheetId.startsWith("day:") ? sheetId.slice(4) : dkey(routineDate()), d = keyToDate(dayKey), v = t.getAttribute("aria-checked") !== "true";
  if (sheetId === "weekly") (store.weeks[wkey(d)] ||= {})[id] = v; else (store.days[dayKey] ||= {})[id] = v;
  save();
  const rect = t.getBoundingClientRect();
  if (v) { const xp = sheetId === "weekly" ? XP.weekly : xpFor(id, d); sfx("ding"); buzz(); floatXP(rect.right - 90, rect.top + rect.height/2, `+${xp} XP`);
    const it = id === "wo-done" ? { t: T("woDone") } : sheetId === "weekly" ? WEEKLY.find(w => w.id === id) : BLOCKS.flatMap(b => b.items).find(i => i.id === id);
    const node = nodesFor(d).find(n => n.id === sheetId), nx = node && !sheetId.startsWith("day:") ? nextOpen(node, d) : null;
    say(`${pick(T("cheers"))} ${esc(it ? itemTitle(it, d) : "")} ✓`, nx ? T("sayThen", esc(nx.name || itemTitle(nx, d))) + ` · +${xp} XP` : `+${xp} XP`, "happy", 3200); jump($("mascot")); }
  else sfx("undo");
  refresh(true);
  const again = document.querySelector(`[data-task="${id}"]`); again && again.focus({ preventScroll: true });
});
$("shBody").addEventListener("input", e => {
  const t = e.target;
  if (sheetId === "editor") return editorInput(e);
  if (!t.dataset || !t.dataset.ex) return;
  const d = routineDate(), today = dkey(d), id = t.dataset.ex, s = +t.dataset.s;
  const logs = (store.logs[today] ||= {}), arr = (logs[id] ||= []); arr[s] ||= ["", ""]; arr[s][+t.dataset.f] = t.value.trim(); save();
  const prev = bestBefore(id, today), chip = t.closest(".set").querySelector(".prchip");
  if (chip) chip.hidden = !(prev != null && score(EXMAP[id], arr[s]) > prev + 1e-9);
  refresh(false);
});
$("shBody").addEventListener("change", e => { if (sheetId === "editor") editorInput(e); });

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
const appURL = () => `${location.origin}${location.pathname}`;
const appLink = id => `${appURL()}?open=${encodeURIComponent(id)}`;
function gcalLink(r) {
  const s = nextStart(r), e = new Date(s.getTime() + 15 * 60000);
  const q = new URLSearchParams({ action: "TEMPLATE", text: T("remTitle", r.title), details: T("remDetails", r.title, appLink(r.id)), dates: `${stamp(s)}/${stamp(e)}`, ctz: TZ, recur: r.rule });
  return `https://calendar.google.com/calendar/render?${q.toString()}`;
}
// Android: open the phone's calendar app first (intent), fall back to the Google Calendar web page.
const IS_ANDROID = /Android/i.test(navigator.userAgent || "");
function appCalLink(r) {
  const s = nextStart(r), e = new Date(s.getTime() + 15 * 60000), enc = encodeURIComponent;
  return "intent:#Intent;action=android.intent.action.INSERT;type=vnd.android.cursor.item/event;" +
    `S.title=${enc(T("remTitle", r.title))};S.description=${enc(T("remDetails", r.title, appLink(r.id)))};` +
    `S.rrule=${enc(r.rule.replace(/^RRULE:/, ""))};l.beginTime=${s.getTime()};l.endTime=${e.getTime()};B.allDay=false;` +
    `S.browser_fallback_url=${enc(gcalLink(r))};end`;
}
const remLink = r => IS_ANDROID ? appCalLink(r) : gcalLink(r);
// A reminder counts as "added" for its exact title, time and repeat. Changing any of these shows Add again.
const remSig = r => `${r.id}|${r.title}|${r.mins}|${r.rule}`;
function remRow(r) {
  const sig = remSig(r), added = !!store.rem[sig];
  return `<div class="rem${added ? " is-added" : ""}"><span><b>${esc(r.title)}</b>${fmtClock(r.mins)} · ${r.weekday != null ? T("onDays")[r.weekday] : T("everyDay")}</span>` +
    (added ? `<span class="rem-done"><span class="added-pill">${I.check}${T("added")}</span><button class="linkish" type="button" data-remundo="${esc(sig)}">${T("undo")}</button></span>`
           : `<a class="btn ghost small" href="${esc(remLink(r))}" ${IS_ANDROID ? "" : 'target="_blank" rel="noopener"'} data-remadd="${esc(sig)}">${T("add")}</a>`) + `</div>`;
}
function buildICS() {
  const utc = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+Z$/, "Z"), clean = s => String(s).replace(/[,;\\]/g, " ");
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Tunas Routine//EN", "CALSCALE:GREGORIAN"];
  reminderList().forEach((r, i) => { const s = nextStart(r), e = new Date(s.getTime() + 15 * 60000);
    lines.push("BEGIN:VEVENT", `UID:tunas-${r.id}-${i}@tunas-routine`, `DTSTAMP:${utc}`, `DTSTART;TZID=${TZ}:${stamp(s)}`, `DTEND;TZID=${TZ}:${stamp(e)}`, r.rule,
      `SUMMARY:${clean(T("remTitle", r.title))}`, `DESCRIPTION:${clean(appLink(r.id))}`, "BEGIN:VALARM", "ACTION:DISPLAY", `DESCRIPTION:${clean(T("remTitle", r.title))}`, "TRIGGER:-PT0M", "END:VALARM", "END:VEVENT"); });
  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

/* ================= Share ================= */
async function shareApp() {
  const url = appURL();
  try { if (navigator.share) { await navigator.share({ title: "Tunas Routine", text: T("shareText"), url }); return; } } catch (e) { if (e && e.name === "AbortError") return; }
  try { await navigator.clipboard.writeText(url); toast(T("copied"), "check"); }
  catch (e) { toast(`${T("copyFail")} <b>${esc(url)}</b>`, "share", 6000); }
}

/* ================= Settings ================= */
let settingsPane = "";
function segLang(id) {
  return `<div class="seg" role="group" aria-label="${T("language")}" id="${id}"><button type="button" data-lang="en" aria-pressed="${LANG === "en"}">English</button><button type="button" data-lang="ms" aria-pressed="${LANG === "ms"}">Bahasa Melayu</button></div>`;
}
function renderSettings(keep) {
  const body = $("shBody"), top = keep ? body.scrollTop : 0;
  $("shHead").innerHTML = sheetHead("cog", T("settings"), T("setSub"), null, "--sky");
  $("shHead").querySelector(".sh-ico").innerHTML = I.cog;
  $("shClose").onclick = closeSheet;
  body.innerHTML = `
    <div class="set-group"><h3>${T("yourName")}</h3><p>${T("nameHelp")}</p>
      <input class="field" id="setName" value="${esc(CFG.name || "")}" placeholder="${T("namePh")}" autocomplete="given-name" maxlength="30"></div>
    <div class="set-group"><h3>${T("language")}</h3>${segLang("langSeg")}</div>
    <div class="set-group"><h3>${T("routine")}</h3>
      <p>${T("using")} <span class="pill-ok">${esc(CFG.label || T("custom"))}</span> · ${T("sections", BLOCKS.length, Object.keys(WORKOUTS).length)}</p>
      <div class="row"><button class="btn small" type="button" data-act="edit">${T("editRoutine")}</button>
        <button class="btn ghost small" type="button" data-act="template">${T("newTemplate")}</button></div>
      <p>${T("routineLocal")}</p>
      <div class="row"><button class="btn ghost small" type="button" data-act="importRoutine">${T("importFile")}</button>
        <button class="btn ghost small" type="button" data-act="pasteToggle">${T("pasteInstead")}</button>
        <button class="btn ghost small" type="button" data-act="exportRoutine">${T("downloadRoutine")}</button></div>
      ${settingsPane === "paste" ? `<textarea class="field" id="pasteBox" placeholder="${T("pastePh")}"></textarea><div class="row"><button class="btn small" type="button" data-act="pasteApply">${T("useThis")}</button></div>` : ""}
    </div>
    <div class="set-group"><h3>${T("reminders")}</h3><p>${T("remHelp")}</p>
      ${(() => { const L = reminderList(), n = L.filter(r => store.rem[remSig(r)]).length; return (n ? `<p class="rem-count">${T("remCount", n, L.length)}</p>` : "") + L.map(remRow).join(""); })()}
      <p class="rem-note">${T("remNote")}</p>
      <div class="row"><button class="btn ghost small" type="button" data-act="ics">${T("icsAll")}</button></div>
      <p>${T("icsHelp")}</p></div>
    <div class="set-group"><h3>${T("share")}</h3><p>${T("shareHelp")}</p><div class="row"><button class="btn small" type="button" data-act="share">${T("shareBtn")}</button></div></div>
    <div class="set-group"><h3>${T("backup")}</h3><p>${T("backupHelp")}</p>
      <div class="row"><button class="btn small" type="button" data-act="backup">${T("downloadBackup")}</button>
        <button class="btn ghost small" type="button" data-act="restore">${T("restoreBackup")}</button></div></div>
    <div class="set-group"><h3>${T("sound")}</h3><div class="row"><button class="btn ghost small" type="button" data-act="sound">${soundOn ? T("soundOff") : T("soundOn")}</button></div></div>
    <div class="set-group"><h3>${T("about")}</h3><p>${T("aboutText")}</p></div>`;
  $("setName").addEventListener("change", e => { const v = e.target.value.trim().slice(0, 30); const r = { ...RAW, name: v || (LANG === "ms" ? "Kawan" : "Friend") }; saveRoutine(r); toast(T("nameSaved"), "check"); contextSay(); });
  if (keep) body.scrollTop = top;
  if (settingsPane === "paste") $("pasteBox").focus();
}
function loadRoutineText(text) {
  let r; try { r = JSON.parse(text); } catch (e) { toast(T("badFile"), "x"); return false; }
  const err = validateRoutine(r); if (err) { toast(esc(err), "x"); return false; }
  saveRoutine(r); lastS = null; prevCleared = null; settingsPane = ""; store.welcomed = true; save();
  if (!$("welcome").hidden) closeWelcome();
  renderGuide(); refresh(true); toast(T("loaded", esc(r.label || T("custom"))), "check"); sfx("clear");
  return true;
}
function downloadText(name, text, type) {
  const blob = new Blob([text], { type });
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
}
const download = (name, obj) => downloadText(name, JSON.stringify(obj, null, 2), "application/json");
function setLang(l) {
  if (!window.TUNAS_I18N[l] || l === LANG) return;
  LANG = l; try { localStorage.setItem(LANG_KEY, l); } catch (e) {}
  if (RAW_IS_DEFAULT) { RAW = defaultRoutine(); applyRoutine(RAW); }
  applyStatic(); renderGuide(); lastS = null; prevCleared = null; refresh(true);
}
function settingsAction(act) {
  if (act === "tickAll") return tickAll();
  if (act === "edit") return openEditor();
  if (act === "template") { closeSheet(); return openWelcome(2, true); }
  if (act === "importRoutine") return $("fileRoutine").click();
  if (act === "pasteToggle") { settingsPane = settingsPane === "paste" ? "" : "paste"; return renderSettings(true); }
  if (act === "pasteApply") return loadRoutineText($("pasteBox").value);
  if (act === "exportRoutine") return download(`${slug(CFG.label || "routine")}.json`, RAW);
  if (act === "ics") return downloadText("tunas-reminders.ics", buildICS(), "text/calendar");
  if (act === "share") return shareApp();
  if (act === "backup") return download(`tunas-backup-${dkey(new Date())}.json`, { app: "tunas", type: "backup", savedAt: new Date().toISOString(), data: store, routine: RAW_IS_DEFAULT ? null : RAW });
  if (act === "restore") return $("fileBackup").click();
  if (act === "sound") { toggleSound(); return renderSettings(true); }
}
$("sheet").addEventListener("click", e => { const b = e.target.closest("[data-lang]"); if (b) { setLang(b.dataset.lang); } });
function readFile(input, cb) { const f = input.files && input.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => { cb(String(r.result)); input.value = ""; }; r.readAsText(f); }
$("fileRoutine").addEventListener("change", e => readFile(e.target, loadRoutineText));
$("fileBackup").addEventListener("change", e => readFile(e.target, text => {
  let b; try { b = JSON.parse(text); } catch (err) { return toast(T("notBackup"), "x"); }
  if (!b || b.app !== "tunas" || !b.data || !b.data.days) return toast(T("notBackup"), "x");
  store = b.data; normStore(); store.welcomed = true; save();
  if (b.routine && !validateRoutine(b.routine)) { saveRoutine(b.routine); renderGuide(); }
  lastS = null; prevCleared = null; refresh(true); toast(T("restored"), "check");
}));
$("stCog").onclick = () => { settingsPane = ""; openSheet("settings"); };

/* ================= Routine editor ================= */
let ED = null;
function openEditor() {
  const draft = clone(RAW); draft.focus ||= {}; draft.workouts ||= {}; draft.weekly ||= [];
  ED = { draft, tab: "sections", day: routineDate().getDay(), more: new Set(), iconFor: null, confirm: null, focusTo: null };
  if (sheetId) { sheetId = "editor"; renderSheet(false); } else openSheet("editor");
}
function getPath(obj, path) { return path.split(".").reduce((o, k) => (o == null ? o : o[k]), obj); }
function setPath(obj, path, val) {
  const ks = path.split("."); let o = obj;
  ks.slice(0, -1).forEach((k, i) => { if (o[k] == null) o[k] = /^\d+$/.test(ks[i + 1]) && Array.isArray(o) ? [] : {}; o = o[k]; });
  o[ks[ks.length - 1]] = val;
}
const edBtn = (act, attrs, icon, label, cls) => `<button class="ed-mini${cls ? " " + cls : ""}" type="button" data-ed="${act}" ${attrs} aria-label="${label}" title="${label}">${icon}</button>`;
function delBtn(key, attrs) {
  const sure = ED.confirm === key;
  return `<button class="ed-mini danger${sure ? " sure" : ""}" type="button" data-ed="del" data-key="${key}" ${attrs} aria-label="${T("edDelete")}">${sure ? T("edSure") : I.x}</button>`;
}
function renderEditor(keep) {
  const body = $("shBody"), top = keep ? body.scrollTop : 0, D = ED.draft;
  $("shHead").innerHTML = sheetHead("cog", T("edTitle"), T("edSub"), null, "--sky");
  $("shHead").querySelector(".sh-ico").innerHTML = I.pencil;
  $("shClose").onclick = () => { ED = null; sheetId = "settings"; renderSheet(false); };
  const tabs = ["sections", "workouts", "weekly"].map(t => `<button type="button" data-ed="tab" data-tab="${t}" aria-pressed="${ED.tab === t}">${T(t === "sections" ? "edSections" : t === "workouts" ? "edWorkouts" : "edWeekly")}</button>`).join("");
  let h = `<div class="seg" role="group">${tabs}</div>`;
  if (ED.tab === "sections") {
    const woDays = Object.keys(D.workouts || {}).length;
    D.blocks.forEach((b, bi) => {
      h += `<div class="ed-sec">
        <div class="ed-row"><button class="ed-ico" type="button" data-ed="iconMenu" data-bi="${bi}" aria-label="${T("edIcon")}">${I[b.icon] || I.star}</button>
          <input class="field" data-path="blocks.${bi}.title" value="${esc(b.title)}" placeholder="${T("edSectionPh")}" ${ED.focusTo === `blocks.${bi}.title` ? "data-autofocus" : ""}>
          ${edBtn("secUp", `data-bi="${bi}"`, I.up, T("edUp"))}${edBtn("secDown", `data-bi="${bi}"`, I.down, T("edDown"))}${delBtn(`sec.${bi}`, `data-bi="${bi}"`)}</div>
        ${ED.iconFor === bi ? `<div class="icon-pick">${ICON_CHOICES.map(ic => `<button type="button" class="ed-ico${b.icon === ic ? " sel" : ""}" data-ed="setIcon" data-bi="${bi}" data-icon="${ic}" aria-label="${ic}">${I[ic]}</button>`).join("")}</div>` : ""}
        <div class="ed-times"><label>${T("edStarts")}<input class="field" type="time" data-path="blocks.${bi}.from" value="${esc(hhmm(tm(b.from, 360)))}"></label>
          <label>${T("edEnds")}<input class="field" type="time" data-path="blocks.${bi}.to" value="${esc(hhmm(tm(b.to, 480)))}"></label>
          <label>${T("edRemind")}<input class="field" type="time" data-path="blocks.${bi}.remind" value="${esc(hhmm(tm(b.remind, tm(b.from, 360))))}"></label></div>`;
      (b.items || []).forEach((it, ii) => {
        const mk = `${bi}.${ii}`, open = ED.more.has(mk), p = `blocks.${bi}.items.${ii}`;
        h += `<div class="ed-item"><div class="ed-row">
            <button class="ed-star${it.quest ? " on" : ""}" type="button" data-ed="star" data-bi="${bi}" data-ii="${ii}" aria-pressed="${!!it.quest}" aria-label="${T("edStar")}" title="${T("edStar")}">★</button>
            ${it.useFocus ? `<div class="ed-focus-t">${esc(T("edFocus"))}</div>` : `<input class="field" data-path="${p}.title" value="${esc(it.title)}" placeholder="${T("edHabitPh")}" ${ED.focusTo === p + ".title" ? "data-autofocus" : ""}>`}
            <input class="field ed-time" data-path="${p}.time" value="${esc(it.time || "")}" placeholder="${T("edTimePh")}" aria-label="${T("edTimePh")}">
            ${edBtn("more", `data-bi="${bi}" data-ii="${ii}" aria-expanded="${open}"`, I.dots, T("edMore"))}</div>
          ${open ? `<div class="ed-more">
            ${it.useFocus ? `<p>${T("edFocusEdit")}</p>${[1,2,3,4,5,6,0].map(k => `<label class="ed-flabel">${weekdayName(k, "short")}<input class="field" data-path="focus.${k}.title" value="${esc(((D.focus || {})[k] || {}).title || "")}" placeholder="${T("edFocusPh")}"></label>`).join("")}`
              : `<input class="field" data-path="${p}.note" value="${esc(it.note || "")}" placeholder="${T("edNotePh")}">`}
            <label class="ed-check"><input type="checkbox" data-ed-check="alt" data-bi="${bi}" data-ii="${ii}" ${it.everyOtherDay ? "checked" : ""}>${T("edAlt")}</label>
            <label class="ed-check"><input type="checkbox" data-ed-check="skip" data-bi="${bi}" data-ii="${ii}" ${it.hideOnDays && it.hideOnDays.length ? "checked" : ""} ${woDays ? "" : "disabled"}>${T("edSkipWo")}</label>
            <div class="ed-row">${edBtn("itemUp", `data-bi="${bi}" data-ii="${ii}"`, I.up, T("edUp"))}${edBtn("itemDown", `data-bi="${bi}" data-ii="${ii}"`, I.down, T("edDown"))}${delBtn(`item.${bi}.${ii}`, `data-bi="${bi}" data-ii="${ii}"`)}</div>
          </div>` : ""}</div>`;
      });
      h += `<button class="btn ghost small ed-add" type="button" data-ed="addItem" data-bi="${bi}">${I.plus}${T("edAddHabit")}</button></div>`;
    });
    h += `<button class="btn ghost ed-add" type="button" data-ed="addSec">${I.plus}${T("edAddSection")}</button>`;
  } else if (ED.tab === "workouts") {
    const k = ED.day, W = D.workouts[k];
    h += `<p class="ed-help">${T("edDayLabel")}</p><div class="ed-days">${[1,2,3,4,5,6,0].map(x => `<button type="button" class="ed-day${x === k ? " sel" : ""}${D.workouts[x] ? " has" : ""}" data-ed="day" data-k="${x}" aria-pressed="${x === k}">${weekdayName(x, "short")}</button>`).join("")}</div>`;
    if (!W) h += `<button class="btn ed-add" type="button" data-ed="addWo">${I.plus}${T("edAddWorkout", weekdayName(k))}</button>`;
    else {
      h += `<div class="ed-sec"><label class="ed-flabel wide">${T("edWoName")}<input class="field" data-path="workouts.${k}.name" value="${esc(W.name)}"></label>
        <div class="ed-times two"><label>${T("edWoAfter")}<select class="field" data-path="workouts.${k}.after">${D.blocks.map(b => `<option value="${esc(b.id)}" ${slug(W.after) === slug(b.id) ? "selected" : ""}>${esc(b.title)}</option>`).join("")}</select></label>
          <label>${T("edWoTime")}<input class="field" type="time" data-path="workouts.${k}.from" value="${esc(hhmm(tm(W.from, tm(W.remind, 1080))))}"></label></div>`;
      (W.exercises || []).forEach((ex, ei) => {
        const p = `workouts.${k}.exercises.${ei}`;
        h += `<div class="ed-item"><div class="ed-row"><input class="field" data-path="${p}.name" value="${esc(ex.name)}" placeholder="${T("edExPh")}" ${ED.focusTo === p + ".name" ? "data-autofocus" : ""}>${delBtn(`ex.${k}.${ei}`, `data-k="${k}" data-ei="${ei}"`)}</div>
          <div class="ed-row"><input class="field ed-time" data-path="${p}.reps" value="${esc(ex.reps || "")}" placeholder="${T("edRepsPh")}" aria-label="${T("reps")}"><input class="field ed-time" data-path="${p}.rest" value="${esc(ex.rest || "")}" placeholder="${T("edRestPh")}" aria-label="${T("rest")}">
            <label class="ed-check"><input type="checkbox" data-ed-check="bw" data-k="${k}" data-ei="${ei}" ${ex.bodyweight ? "checked" : ""}>${T("edBW")}</label>
            ${edBtn("exUp", `data-k="${k}" data-ei="${ei}"`, I.up, T("edUp"))}${edBtn("exDown", `data-k="${k}" data-ei="${ei}"`, I.down, T("edDown"))}</div></div>`;
      });
      h += `<button class="btn ghost small ed-add" type="button" data-ed="addEx" data-k="${k}">${I.plus}${T("edAddEx")}</button>
        <div class="ed-row">${ED.confirm === `wo.${k}` ? `<button class="btn small danger-btn" type="button" data-ed="del" data-key="wo.${k}" data-k="${k}">${T("edSure")}</button>` : `<button class="btn ghost small" type="button" data-ed="del" data-key="wo.${k}" data-k="${k}">${T("edRemoveWo")}</button>`}</div></div>`;
    }
  } else {
    h += `<p class="ed-help">${T("edWeeklyHelp")}</p>`;
    D.weekly.forEach((w, wi) => {
      h += `<div class="ed-row ed-wk"><input class="field" data-path="weekly.${wi}.title" value="${esc(w.title)}" placeholder="${T("edWeeklyPh")}" ${ED.focusTo === `weekly.${wi}.title` ? "data-autofocus" : ""}>${delBtn(`wk.${wi}`, `data-wi="${wi}"`)}</div>`;
    });
    h += `<button class="btn ghost small ed-add" type="button" data-ed="addWeekly">${I.plus}${T("edAddWeekly")}</button>`;
  }
  h += `<div class="ed-foot"><button class="btn ghost" type="button" data-ed="cancel">${T("cancel")}</button><button class="btn" type="button" data-ed="save">${T("save")}</button></div>`;
  body.innerHTML = h; if (keep) body.scrollTop = top;
  const af = body.querySelector("[data-autofocus]"); if (af) { af.focus(); af.scrollIntoView({ block: "center" }); } ED.focusTo = null;
}
function swap(arr, i, j) { if (j < 0 || j >= arr.length) return; [arr[i], arr[j]] = [arr[j], arr[i]]; }
function editorInput(e) {
  const t = e.target, path = t.dataset && t.dataset.path; if (!path || !ED) return;
  setPath(ED.draft, path, t.value);
  let m = /^blocks\.(\d+)\.(from|to)$/.exec(path); if (m) ED.draft.blocks[+m[1]]._rangeDirty = true;
  m = /^workouts\.(\d+)\.from$/.exec(path); if (m) ED.draft.workouts[m[1]]._timeDirty = true;
}
function editorClick(e) {
  const chk = e.target.closest("[data-ed-check]");
  if (chk) {
    const D = ED.draft, kind = chk.dataset.edCheck;
    if (kind === "alt") { const it = D.blocks[+chk.dataset.bi].items[+chk.dataset.ii]; it.everyOtherDay = chk.checked; }
    if (kind === "skip") { const it = D.blocks[+chk.dataset.bi].items[+chk.dataset.ii]; it.hideOnDays = chk.checked ? Object.keys(D.workouts || {}).map(Number) : []; }
    if (kind === "bw") { D.workouts[chk.dataset.k].exercises[+chk.dataset.ei].bodyweight = chk.checked; }
    return;
  }
  const b = e.target.closest("[data-ed]"); if (!b) return;
  const D = ED.draft, a = b.dataset.ed, bi = +b.dataset.bi, ii = +b.dataset.ii, k = b.dataset.k, ei = +b.dataset.ei;
  if (a !== "del") ED.confirm = null;
  switch (a) {
    case "tab": ED.tab = b.dataset.tab; break;
    case "iconMenu": ED.iconFor = ED.iconFor === bi ? null : bi; break;
    case "setIcon": D.blocks[bi].icon = b.dataset.icon; ED.iconFor = null; break;
    case "secUp": swap(D.blocks, bi, bi - 1); ED.more.clear(); break;
    case "secDown": swap(D.blocks, bi, bi + 1); ED.more.clear(); break;
    case "addSec": { const from = 12 * 60; D.blocks.push({ id: uid(), title: T("edNewSection"), icon: "star", from: hhmm(from), to: hhmm(from + 60), remind: hhmm(from), _rangeDirty: true, items: [{ id: uid(), title: "" }] });
      ED.focusTo = `blocks.${D.blocks.length - 1}.title`; break; }
    case "addItem": D.blocks[bi].items.push({ id: uid(), title: "", time: "" }); ED.focusTo = `blocks.${bi}.items.${D.blocks[bi].items.length - 1}.title`; break;
    case "star": { const it = D.blocks[bi].items[ii]; it.quest = !it.quest; break; }
    case "more": { const key = `${bi}.${ii}`; ED.more.has(key) ? ED.more.delete(key) : ED.more.add(key); break; }
    case "itemUp": swap(D.blocks[bi].items, ii, ii - 1); ED.more.clear(); ED.more.add(`${bi}.${Math.max(0, ii - 1)}`); break;
    case "itemDown": swap(D.blocks[bi].items, ii, ii + 1); ED.more.clear(); ED.more.add(`${bi}.${Math.min(D.blocks[bi].items.length - 1, ii + 1)}`); break;
    case "day": ED.day = +k; break;
    case "addWo": { const after = (D.blocks.find(x => tm(x.from, 0) >= 15 * 60) || D.blocks[D.blocks.length - 1]).id;
      D.workouts[ED.day] = { name: T("edNewWorkout"), when: "", from: "18:00", to: "19:15", remind: "18:00", after, _timeDirty: true, exercises: [{ id: uid(), name: "", reps: "8–12", rest: "60s", bodyweight: true }] };
      ED.focusTo = `workouts.${ED.day}.exercises.0.name`; break; }
    case "addEx": D.workouts[k].exercises.push({ id: uid(), name: "", reps: "8–12", rest: "60s", bodyweight: true }); ED.focusTo = `workouts.${k}.exercises.${D.workouts[k].exercises.length - 1}.name`; break;
    case "exUp": swap(D.workouts[k].exercises, ei, ei - 1); break;
    case "exDown": swap(D.workouts[k].exercises, ei, ei + 1); break;
    case "addWeekly": D.weekly.push({ id: uid(), title: "" }); ED.focusTo = `weekly.${D.weekly.length - 1}.title`; break;
    case "del": {
      const key = b.dataset.key;
      if (ED.confirm !== key) { ED.confirm = key; break; }
      ED.confirm = null; ED.more.clear();
      const [kind, x, y] = key.split(".");
      if (kind === "sec") D.blocks.splice(+x, 1);
      else if (kind === "item") D.blocks[+x].items.splice(+y, 1);
      else if (kind === "ex") D.workouts[x].exercises.splice(+y, 1);
      else if (kind === "wo") delete D.workouts[x];
      else if (kind === "wk") D.weekly.splice(+x, 1);
      break; }
    case "cancel": ED = null; sheetId = "settings"; renderSheet(false); return;
    case "save": return saveEditor();
  }
  renderEditor(true);
}
function saveEditor() {
  const r = clone(ED.draft);
  r.blocks = (r.blocks || []).map(b => {
    b.title = String(b.title || "").trim() || T("edNewSection"); b.id = b.id || uid();
    b.items = (b.items || []).filter(i => i.useFocus || String(i.title || "").trim()).map(i => { i.id = i.id || uid(); i.title = String(i.title || "").trim(); if (!i.note) delete i.note; return i; });
    if (b._rangeDirty) b.range = `${fmtClock(tm(b.from, 0))} – ${fmtClock(tm(b.to, 0))}`;
    delete b._rangeDirty; return b;
  }).filter(b => b.items.length);
  if (!r.blocks.length) { toast(T("needSection"), "x"); return; }
  const ids = r.blocks.map(b => b.id);
  Object.keys(r.workouts || {}).forEach(k => {
    const w = r.workouts[k];
    w.exercises = (w.exercises || []).filter(x => String(x.name || "").trim()).map(x => { x.id = x.id || uid(); return x; });
    if (!w.exercises.length) { delete r.workouts[k]; return; }
    w.name = String(w.name || "").trim() || T("edNewWorkout");
    if (!ids.includes(w.after)) w.after = ids[ids.length - 1];
    if (w._timeDirty) { const f = tm(w.from, 1080); w.from = hhmm(f); w.to = hhmm(f + 75); w.remind = hhmm(f); w.when = fmtClock(f); }
    delete w._timeDirty;
  });
  r.weekly = (r.weekly || []).filter(w => String(w.title || "").trim()).map(w => { w.id = w.id || uid(); return w; });
  if (RAW_IS_DEFAULT || !r.label) r.label = T("myRoutine");
  const err = validateRoutine(r); if (err) { toast(esc(err), "x"); return; }
  saveRoutine(r); ED = null; lastS = null; prevCleared = null; store.welcomed = true; save();
  renderGuide(); closeSheet(); refresh(); toast(T("saved"), "check"); sfx("clear"); jump($("mascot"));
}

/* ================= Welcome ================= */
let WEL = { step: 1, tpl: "worker", switching: false, name: "" };
function countHabits(r) { return (r.blocks || []).reduce((s, b) => s + (b.items || []).length, 0); }
function openWelcome(step, switching) {
  WEL = { step: step || 1, tpl: "worker", switching: !!switching, name: switching ? (CFG.name || "") : "" };
  $("welcome").hidden = false; document.body.classList.add("locked"); renderWelcome();
}
function closeWelcome() { $("welcome").hidden = true; document.body.classList.remove("locked"); }
function renderWelcome() {
  const el = $("welcome");
  if (WEL.step === 1) {
    el.innerHTML = `<div class="w-in"><div class="mascot cheer" id="wMascot">${MASCOT}</div><h2 class="green">${T("wHi")}</h2><p>${T("wSub")}</p>
      ${segLang("wLang")}
      <label class="w-label" for="wName">${T("wNameQ")}</label><input class="field w-name" id="wName" value="${esc(WEL.name)}" placeholder="${T("namePh")}" maxlength="30" autocomplete="given-name">
      <button class="btn" type="button" id="wNext">${T("next")}</button></div>`;
    $("wName").addEventListener("input", e => { WEL.name = e.target.value; });
    $("wName").addEventListener("keydown", e => { if (e.key === "Enter") $("wNext").click(); });
    $("wNext").onclick = () => { WEL.step = 2; renderWelcome(); };
    jump($("wMascot"));
  } else {
    el.innerHTML = `<div class="w-in wide"><h2>${T("wPick")}</h2><p>${T("wPickSub")}</p>
      <div class="tpl-grid">${window.TUNAS_TEMPLATES.map(t => { const r = window.resolveTemplate(t.routine, LANG);
        return `<button type="button" class="tpl" data-tpl="${t.id}" aria-pressed="${WEL.tpl === t.id}"><span class="tpl-ico">${I[t.icon]}</span><b>${esc(window.resolveTemplate(t.title, LANG))}</b><span>${esc(window.resolveTemplate(t.desc, LANG))}</span><small>${T("wHabits", countHabits(r), Object.keys(r.workouts || {}).length)}</small></button>`; }).join("")}</div>
      <button class="btn" type="button" id="wGo">${T("wGo")}</button>
      <div class="w-links"><button class="linkish" type="button" id="wBack">${WEL.switching ? T("cancel") : T("back")}</button>${WEL.switching ? "" : `<button class="linkish" type="button" id="wFile">${T("wHaveFile")}</button>`}</div></div>`;
    el.querySelectorAll("[data-tpl]").forEach(b => b.onclick = () => { WEL.tpl = b.dataset.tpl; el.querySelectorAll("[data-tpl]").forEach(x => x.setAttribute("aria-pressed", x.dataset.tpl === WEL.tpl)); });
    $("wBack").onclick = () => { if (WEL.switching) closeWelcome(); else { WEL.step = 1; renderWelcome(); } };
    if ($("wFile")) $("wFile").onclick = () => $("fileRoutine").click();
    $("wGo").onclick = finishWelcome;
  }
}
$("welcome").addEventListener("click", e => { const b = e.target.closest("[data-lang]"); if (b) { setLang(b.dataset.lang); renderWelcome(); } });
function finishWelcome() {
  const tpl = window.TUNAS_TEMPLATES.find(t => t.id === WEL.tpl), r = window.resolveTemplate(tpl.routine, LANG);
  r.name = String(WEL.name || "").trim().slice(0, 30) || (LANG === "ms" ? "Kawan" : "Friend");
  saveRoutine(r); store.welcomed = true; save(); lastS = null; prevCleared = null;
  closeWelcome(); renderGuide(); refresh(); confetti(); sfx("clear");
  say(T("wWelcome", firstName()), "", "cheer", 5000); jump($("mascot"));
}

/* ================= Celebration screens ================= */
const celeQ = [];
function queueCele(c) { celeQ.push(c); if ($("cele").hidden) nextCele(); }
function nextCele() {
  const c = celeQ.shift(); if (!c) { $("cele").hidden = true; contextSay(); return; }
  if (sheetId && sheetId !== "settings" && sheetId !== "editor" && !sheetId.startsWith("day:")) closeSheet();
  const el = $("cele"); el.hidden = false;
  el.innerHTML = `<div class="mascot cheer" id="celeMascot">${MASCOT}</div><h2 class="${c.color || ""}">${c.title}</h2><p>${c.sub}</p>
    <div class="tiles">${c.tiles.map(t => `<div class="tile" style="--c:var(${t.c})"><small>${t.k}</small><b>${t.i ? I[t.i] : ""}${t.v}</b></div>`).join("")}</div>
    <button class="btn" type="button" id="celeGo">${T("cont")}</button>`;
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
  if (sheetId && sheetId !== "editor" && keepSheet !== false) renderSheet(true);
  else if (sheetId && keepSheet === false && !["settings", "editor"].includes(sheetId) && !sheetId.startsWith("day:")) {
    const node = nodesFor(d).find(n => n.id === sheetId); if (node) { const st = nodeState(node, d), bar = $("shHead").querySelector(".bar"); if (bar) { bar.querySelector("i").style.width = (100*st.n/st.total) + "%"; bar.querySelector("b").textContent = `${st.n} / ${st.total}`; } }
  }
  const states = {}; nodesFor(d).forEach(n => states[n.id] = nodeState(n, d));
  const fresh = got.filter(b => !store.seen[b.id]);
  if (fresh.length) { fresh.forEach(b => store.seen[b.id] = 1); save();
    if (lastS) fresh.forEach(b => toast(T("badgeOne", badgeName(b.id)), "trophy"));
    else toast(fresh.length === 1 ? T("badgeOne", badgeName(fresh[0].id)) : T("badgeMany", fresh.length), "trophy"); }
  if (lastS && prevCleared) {
    const perfectNow = S.totalToday && S.doneToday === S.totalToday && lastS.doneToday < lastS.totalToday;
    if (perfectNow) {
      queueCele({ title: T("perfectTitle"), sub: T("perfectSub", firstName()), sound: "level",
        tiles: [{ k:T("tToday"), v:`+${S.todayXP}`, i:"bolt", c:"--gold" }, { k:T("tStreak"), v:S.streak, i:"flame", c:"--orange" }, { k:T("tLevel"), v:S.level, i:"shield", c:"--sky" }] });
    } else {
      Object.keys(states).forEach(id => { const now = states[id], was = prevCleared[id];
        if (now.cleared && was && !was.cleared) { const n = nodesFor(d).find(x => x.id === id);
          queueCele({ title: T("clearedTitle", esc(n.title)), color: "green", sub: pick(T("clearedSubs")),
            tiles: [{ k:T("tXP"), v:`+${now.xp}`, i:"bolt", c:"--gold" }, { k:T("tDone"), v:`${now.n}/${now.total}`, i:"", c:"--green" }, { k:T("tStreak"), v:S.streak, i:"flame", c:"--orange" }] }); } });
    }
    if (S.level > lastS.level) queueCele({ title: T("levelTitle", S.level), color: "sky", sub: T("levelSub", titleOf(S.level)), sound: "level",
      tiles: [{ k:T("tTotal"), v:S.xp, i:"bolt", c:"--gold" }, { k:T("tNext"), v:`${S.L.span - S.L.cur}`, i:"", c:"--sky" }] });
    if (S.questTotal && S.questDone === S.questTotal && lastS.questDone < lastS.questTotal) toast(T("questDone", XP.quest), "star");
    if (S.prsToday > lastS.prsToday) { toast(T("prToast", XP.pr), "trophy"); sfx("pr"); buzz([20,40,20]); say(T("prSay"), "+" + XP.pr + " XP", "cheer", 3000); }
  }
  prevCleared = states; lastS = S;
  if (!mascotTimer) contextSay();
}

/* ================= Sound toggle + reset + start ================= */
function toggleSound() { soundOn = !soundOn; try { localStorage.setItem(SND_KEY, soundOn ? "on" : "off"); } catch (e) {} if (soundOn) { audio(); sfx("ding"); } renderTop(lastS || computeAll()); }
$("stSnd").onclick = toggleSound;
const area = $("resetArea");
function resetIdle() { area.innerHTML = `<button class="btn ghost small" type="button" id="resetBtn">${T("clearToday")}</button>`;
  $("resetBtn").onclick = () => { area.innerHTML = `<div class="confirm"><span>${T("clearConfirm")}</span><button class="btn small" id="yesBtn" type="button">${T("clear")}</button><button class="btn ghost small" id="noBtn" type="button">${T("keep")}</button></div>`;
    $("yesBtn").onclick = () => { delete store.days[dkey(routineDate())]; save(); lastS = null; prevCleared = null; refresh(); resetIdle(); };
    $("noBtn").onclick = resetIdle; }; }
$("continueBtn").onclick = () => { audio(); const id = $("continueBtn").dataset.node; if (id) openSheet(id); };
$("shareBtn").onclick = shareApp;

applyStatic();
resetIdle();
renderGuide();
refresh();
$("mascot").setAttribute("role", "button"); $("mascot").setAttribute("tabindex", "0"); $("mascot").setAttribute("aria-label", T("tunasLabel")); $("mascot").removeAttribute("aria-hidden");
$("mascot").addEventListener("click", tapTunas);
$("mascot").addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); tapTunas(); } });
if ($("welcome").hidden) { const h = new Date().getHours(), S0 = lastS || computeAll();
  say(T("sayGreet", T("greetParts")[h < 12 && h >= 4 ? 0 : h < 19 && h >= 12 ? 1 : 2], firstName()), T("doneToday", S0.doneToday, S0.totalToday), "cheer", 3500); }
(function boot() {
  const q = new URLSearchParams(location.search).get("open");
  let hasLocalConfig = false; try { hasLocalConfig = !!localStorage.getItem(CFG_KEY); } catch (e) {}
  if (!hasLocalConfig && !Object.keys(store.days).length && !store.welcomed) { openWelcome(1); return; }
  if (!q) return;
  history.replaceState(null, "", location.pathname);
  const d = routineDate(), nodes = nodesFor(d);
  if (q === "settings") return openSheet("settings");
  if (q === "history") return $("hist").scrollIntoView();
  const id = q === "now" ? (pathTarget(d, nowMins(), nodes) || {}).id : q;
  if (id && nodes.some(n => n.id === id)) return openSheet(id);
  if (q === "workout") toast(T("noWorkout"), "star");
})();
setInterval(() => { const a = document.activeElement; if (!(a && (a.tagName === "INPUT" || a.tagName === "TEXTAREA" || a.tagName === "SELECT")) && sheetId !== "editor" && $("welcome").hidden) refresh(); }, 60000);
document.addEventListener("visibilitychange", () => { if (!document.hidden && sheetId !== "editor") refresh(); });

/* ================= Offline support ================= */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
}
