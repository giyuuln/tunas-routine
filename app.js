/* Tunas Routine — app logic. Everything is stored in this browser's localStorage. */
"use strict";

/* ================= Icons ================= */
const I = {
  list:'<svg class="ico" viewBox="0 0 24 24"><path d="M4 5.5h2.5V8H4zM9 5.75h11v2H9zM4 10.75h2.5v2.5H4zM9 11h11v2H9zM4 16h2.5v2.5H4zM9 16.25h11v2H9z"/></svg>',
  chart:'<svg class="ico" viewBox="0 0 24 24"><path d="M4 20h16v2H4zM5 12h3v6H5zM10.5 7h3v11h-3zM16 3h3v15h-3z"/></svg>',
  sprout:'<svg class="ico" viewBox="0 0 24 24"><path d="M11 21v-7.1C6.6 13.6 3.5 10.6 3.3 6.2 7.9 6 11.3 8.6 11.9 12.6c.4-4.9 3.7-8.4 8.8-8.6-.1 5.3-3.4 8.9-7.7 9.6V21z"/></svg>',
  spark:'<svg viewBox="0 0 24 24"><path d="M12 1.5c.6 5.4 3.6 9 10.5 10.5-6.9 1.5-9.9 5.1-10.5 10.5-.6-5.4-3.6-9-10.5-10.5C8.4 10.5 11.4 6.9 12 1.5z"/></svg>',
  home:'<svg class="ico" viewBox="0 0 24 24"><path d="M12 3.2 2.5 11.1l1.3 1.5L5 11.6V20a1 1 0 0 0 1 1h4.5v-6h3v6H18a1 1 0 0 0 1-1v-8.4l1.2 1 1.3-1.5z"/></svg>',
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
  warn:'<svg class="ico" viewBox="0 0 24 24"><path d="M12 2 1 21h22L12 2zm1 15h-2v-2h2v2zm0-4h-2V9h2v4z"/></svg>',
  chest:'<svg class="ico" viewBox="0 0 24 24"><path d="M4 9a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v1H4V9zm0 3h7v2h2v-2h7v8H4v-8z"/></svg>',
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
    <ellipse cx="45" cy="104" rx="11" ry="6.5" fill="var(--m-limb)"/>
    <ellipse cx="75" cy="104" rx="11" ry="6.5" fill="var(--m-limb)"/>
    <ellipse class="arm l" cx="17" cy="72" rx="7.5" ry="12" fill="var(--m-limb)"/>
    <ellipse class="arm r" cx="103" cy="72" rx="7.5" ry="12" fill="var(--m-limb)"/>
    <path d="M60 24c26 0 42 18 42 44 0 25-17 39-42 39S18 93 18 68c0-26 16-44 42-44z" fill="var(--m-body)"/>
    <ellipse cx="60" cy="82" rx="25" ry="19" fill="var(--m-belly)"/>
    <path d="M60 25V13" stroke="var(--m-leaf)" stroke-width="4" stroke-linecap="round"/>
    <path d="M60 15C51 3 39 6 41 15c8 3 14 3 19 0z" fill="var(--m-leaf)"/>
    <path d="M60 15c9-12 21-9 19 0-8 3-14 3-19 0z" fill="var(--m-leaf2)"/>
    <g class="cloud"><ellipse cx="97" cy="22" rx="10" ry="6.5" fill="#fff" stroke="#b9e3f7" stroke-width="1.5"/><ellipse cx="89" cy="25" rx="7" ry="5" fill="#fff" stroke="#b9e3f7" stroke-width="1.5"/><ellipse cx="104" cy="25.5" rx="6" ry="4.5" fill="#fff" stroke="#b9e3f7" stroke-width="1.5"/><rect x="86" y="23" width="22" height="6" fill="#fff"/></g>
    <g class="shades"><path d="M38 37h18a2 2 0 0 1 2 2v2a6 6 0 0 1-6 6h-6a8 8 0 0 1-8-8 2 2 0 0 1 2-2zM64 37h18a2 2 0 0 1 2 2 8 8 0 0 1-8 8h-6a6 6 0 0 1-6-6v-2a2 2 0 0 1 2-2z" fill="#2a2440"/><path d="M58 40h4" stroke="#2a2440" stroke-width="3"/><path d="M42 39l4 0" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".7"/><path d="M68 39l4 0" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".7"/></g>
    <g class="flower"><circle cx="60" cy="4" r="4.2" fill="#ff8fbf"/><circle cx="65.5" cy="8" r="4.2" fill="#ff8fbf"/><circle cx="63.4" cy="14.2" r="4.2" fill="#ff8fbf"/><circle cx="56.6" cy="14.2" r="4.2" fill="#ff8fbf"/><circle cx="54.5" cy="8" r="4.2" fill="#ff8fbf"/><circle cx="60" cy="9.6" r="3" fill="#ffd34d"/></g>
    <g class="e-open">
      <g class="look"><g class="pupil">
        <ellipse cx="46" cy="59" rx="6.8" ry="8.2" fill="var(--m-ink)"/><ellipse cx="74" cy="59" rx="6.8" ry="8.2" fill="var(--m-ink)"/>
        <circle cx="48.6" cy="55.6" r="2.9" fill="#fff"/><circle cx="76.6" cy="55.6" r="2.9" fill="#fff"/>
        <circle cx="43.6" cy="62.6" r="1.3" fill="#fff" opacity=".9"/><circle cx="71.6" cy="62.6" r="1.3" fill="#fff" opacity=".9"/>
      </g></g>
    </g>
    <g class="e-happy" fill="none" stroke="var(--m-ink)" stroke-width="4.5" stroke-linecap="round"><path d="M37 61q9-11 18 0"/><path d="M65 61q9-11 18 0"/></g>
    <g class="e-sleep" fill="none" stroke="var(--m-ink)" stroke-width="4" stroke-linecap="round"><path d="M38 60q8 5 16 0"/><path d="M66 60q8 5 16 0"/></g>
    <g class="cheeks"><ellipse cx="34" cy="72" rx="6.5" ry="4" fill="#ff8fb3" opacity=".75"/><ellipse cx="86" cy="72" rx="6.5" ry="4" fill="#ff8fb3" opacity=".75"/></g>
    <g class="hearts" fill="#ff6fa8"><path d="M34 77c-5-3.4-7.2-5.6-7.2-8.2a3.6 3.6 0 0 1 7.2-1.1 3.6 3.6 0 0 1 7.2 1.1c0 2.6-2.2 4.8-7.2 8.2z"/><path d="M86 77c-5-3.4-7.2-5.6-7.2-8.2a3.6 3.6 0 0 1 7.2-1.1 3.6 3.6 0 0 1 7.2 1.1c0 2.6-2.2 4.8-7.2 8.2z"/></g>
    <path class="mo-smile" d="M52 74q8 8 16 0" fill="none" stroke="var(--m-ink)" stroke-width="4" stroke-linecap="round"/>
    <g class="mo-big"><path d="M49 71q11 18 22 0z" fill="#8a2338"/><path d="M54 79q6 5 12 0q-6-4-12 0z" fill="#ff7a8f"/></g>
    <path class="mo-flat" d="M54 76q6 2 12 0" fill="none" stroke="var(--m-ink)" stroke-width="4" stroke-linecap="round"/>
    <path class="mo-hmm" d="M55 75.5q5.5 4.5 11 -1" fill="none" stroke="var(--m-ink)" stroke-width="4" stroke-linecap="round"/>
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
// Progress fills slide in with transform (never width), so they animate on the compositor.
const fillPct = p => `transform:translateX(${Math.max(0, Math.min(100, +p || 0)) - 100}%)`;
const setFill = (el, p) => { if (el) el.style.transform = `translateX(${Math.max(0, Math.min(100, +p || 0)) - 100}%)`; };
function tm(s, fallback) {
  if (typeof s === "number") return s;
  const m = /^(\d{1,2}):(\d{2})$/.exec(String(s || "").trim());
  return m ? (+m[1]) * 60 + (+m[2]) : fallback;
}
const hhmm = m => `${pad(Math.floor((m % 1440) / 60))}:${pad(m % 60)}`;
const fmtClock = m => { m = ((m % 1440) + 1440) % 1440; const h = Math.floor(m / 60), mm = pad(m % 60); return `${(h % 12) || 12}:${mm} ${h < 12 ? "am" : "pm"}`; };
// "5:00 – 9:00 am", or "10:00 pm – 5:00 am" when the meridiem changes.
const fmtRange = (a, b) => { const x = fmtClock(a), y = fmtClock(b); return x.slice(-2) === y.slice(-2) ? `${x.slice(0, -3)} – ${y}` : `${x} – ${y}`; };

/* ================= Error handling ================= */
const APP_VERSION = "2026.10.31b";
const ERR_KEY = "tunas-errors";
let errShownAt = 0; const notices = [];
function logError(where, err) {
  const msg = String((err && (err.message || err.reason)) || err || "unknown").slice(0, 200);
  try { console.error("[Tunas]", where, err); } catch (e) {}
  try { const list = JSON.parse(localStorage.getItem(ERR_KEY) || "[]"); list.unshift({ t: new Date().toISOString(), where: String(where).slice(0, 60), msg, v: APP_VERSION });
    localStorage.setItem(ERR_KEY, JSON.stringify(list.slice(0, 15))); } catch (e) {}
}
// Log the error and tell the user once in a while (not a flood of toasts).
function reportError(where, err, msgKey) {
  logError(where, err);
  if (Date.now() - errShownAt < 4000) return; errShownAt = Date.now();
  try { toast(T(msgKey || "errGeneric"), "x", 5000); } catch (e) {}
}
window.addEventListener("error", e => { if (!e || (e.message && /^Script error/.test(e.message))) return; reportError("window", e.error || e.message); });
window.addEventListener("unhandledrejection", e => reportError("promise", e && e.reason));

// Storage that never throws: returns false (and tells the user why) instead of silently losing data.
function storeGet(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }
function storeDel(key) { try { localStorage.removeItem(key); } catch (e) {} }
function storeSet(key, value) {
  try { localStorage.setItem(key, value); return true; }
  catch (e) {
    const full = e && (e.name === "QuotaExceededError" || e.name === "NS_ERROR_DOM_QUOTA_REACHED" || e.code === 22 || e.code === 1014);
    reportError("storage:" + key, e, full ? "errStorageFull" : "errStorageBlocked"); return false;
  }
}
// Read saved JSON. If it's damaged, keep a copy under a new key so nothing is lost, then start fresh.
function loadJSON(key, check) {
  const raw = storeGet(key); if (raw == null) return { value: null };
  try { const v = JSON.parse(raw); if (check(v)) return { value: v }; throw new Error("unexpected shape"); }
  catch (e) { try { localStorage.setItem(`${key}-corrupt-${Date.now()}`, raw); } catch (_) {} logError("load:" + key, e); notices.push("errCorrupt"); return { value: null, corrupt: true }; }
}
const LIMITS = { routineBytes: 1000000, backupBytes: 4000000, lockedBytes: 6000000, sections: 30, items: 80, exercises: 30, weekly: 30, text: 300, guideSections: 12, guideLines: 20, tips: 50 };

/* ================= Language ================= */
const LANG_KEY = "tunas-lang";
let LANG = "en";
try { LANG = localStorage.getItem(LANG_KEY) || ((navigator.language || "").toLowerCase().startsWith("ms") ? "ms" : "en"); } catch (e) {}
if (!window.TUNAS_I18N[LANG]) LANG = "en";
// Each colour theme has its own Tunas personality: persona lines override the normal text.
function T(key, ...a) {
  const L = window.TUNAS_I18N[LANG] || {}, p = ((L.persona || {})[window.TUNAS_THEME] || {});
  const v = key in p ? p[key] : (L[key] ?? window.TUNAS_I18N.en[key]);
  return typeof v === "function" ? v(...a) : v;
}
const locale = () => T("locale");
function applyStatic() {
  document.documentElement.lang = LANG === "ms" ? "ms" : "en";
  document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = T(el.dataset.i18n); });
  $("stStreak").setAttribute("aria-label", T("streakTip")); $("stXP").setAttribute("aria-label", T("xpToday")); $("stLv").setAttribute("aria-label", T("levelTip"));
}

/* ================= Colour themes ================= */
const THEME_KEY = "tunas-theme";
const THEMES = [ { id: "pandan", c: "#4aa85c", bar: "#4aa85c" }, { id: "sakura", c: "#ff6fa8", bar: "#ff6fa8" }, { id: "langit", c: "#1cb0f6", bar: "#1cb0f6" }, { id: "ungu", c: "#a46cf0", bar: "#a46cf0" } ];
let THEME = "pandan"; try { THEME = localStorage.getItem(THEME_KEY) || "pandan"; } catch (e) {}
function applyTheme(id, persist) {
  const t = THEMES.find(x => x.id === id) || THEMES[0]; THEME = t.id; window.TUNAS_THEME = t.id;
  if (t.id === "pandan") delete document.documentElement.dataset.accent; else document.documentElement.dataset.accent = t.id;
  const m = document.querySelector('meta[name="theme-color"]'); if (m) m.setAttribute("content", t.bar);
  if (persist) { try { localStorage.setItem(THEME_KEY, t.id); } catch (e) {} }
}
applyTheme(THEME, false);
const themePicker = () => `<div class="swatches" role="group" aria-label="${T("theme")}">${THEMES.map(t => `<button type="button" class="swatch" data-theme-pick="${t.id}" aria-pressed="${THEME === t.id}" style="--sw:${t.c}"><i></i><span>${T("themeNames")[t.id]}</span><small>${T("themeTags")[t.id]}</small></button>`).join("")}</div>`;
function pickTheme(id) { applyTheme(id, true); sfx("ding"); jump($("mascot")); say(T("themeHello"), T("themeTagLine", T("themeTags")[THEME]), "cheer", 3500); }

/* ================= Routine config ================= */
const CFG_KEY = "tunas-config", DATA_KEY = "tunas-data-v1", SND_KEY = "tunas-sound";
const defaultRoutine = () => { const r = window.resolveTemplate(window.TUNAS_TEMPLATES.find(t => t.id === "worker").routine, LANG); r.name = LANG === "ms" ? "Kawan" : "Friend"; return r; };
let RAW = loadJSON(CFG_KEY, v => v && Array.isArray(v.blocks) && v.blocks.length).value, RAW_IS_DEFAULT = false;
if (!RAW) { RAW = defaultRoutine(); RAW_IS_DEFAULT = true; }

let CFG, BLOCKS, FOCUS, WORKOUTS, PROG, WEEKLY, TIPS, EXMAP;
function validateRoutine(r) {
  if (!r || typeof r !== "object" || Array.isArray(r)) return T("badFile");
  if (!Array.isArray(r.blocks) || !r.blocks.length) return T("errNoBlocks");
  if (r.blocks.length > LIMITS.sections) return T("errTooBig");
  for (const b of r.blocks) {
    if (!b || typeof b !== "object" || !Array.isArray(b.items)) return T("errNoItems", b && b.title || "?");
    if (b.items.length > LIMITS.items) return T("errTooBig");
  }
  for (const w of Object.values(r.workouts || {})) if (w && Array.isArray(w.exercises) && w.exercises.length > LIMITS.exercises) return T("errTooBig");
  if (Array.isArray(r.weekly) && r.weekly.length > LIMITS.weekly) return T("errTooBig");
  if (r.packs != null && (!Array.isArray(r.packs) || r.packs.length > 60 || !r.packs.every(x => typeof x === "string"))) return T("badFile");
  if (r.day != null && (typeof r.day !== "object" || Array.isArray(r.day))) return T("badFile");
  if (r.fitness != null && (typeof r.fitness !== "object" || Array.isArray(r.fitness))) return T("badFile");
  if (r.skin != null && (typeof r.skin !== "object" || Array.isArray(r.skin))) return T("badFile");
  return guideError(r);
}
// Guide and tips are shown with md(), which escapes first; here we only check shape and size.
function guideError(r) {
  const strs = a => Array.isArray(a) && a.every(x => typeof x === "string");
  if (r.tips != null) { if (!strs(r.tips)) return T("badFile"); if (r.tips.length > LIMITS.tips) return T("errGuideBig"); }
  const g = r.guide; if (g == null) return null;
  if (typeof g !== "object" || Array.isArray(g) || (g.title != null && typeof g.title !== "string")) return T("badFile");
  if (g.sections == null) return null;
  if (!Array.isArray(g.sections)) return T("badFile");
  if (g.sections.length > LIMITS.guideSections) return T("errGuideBig");
  for (const sec of g.sections) {
    if (!sec || typeof sec !== "object" || (sec.title != null && typeof sec.title !== "string") || (sec.lines != null && !strs(sec.lines))) return T("badFile");
    if ((sec.lines || []).length > LIMITS.guideLines) return T("errGuideBig");
  }
  return null;
}
// "Only on these weekdays" (0 = Sunday). Anything invalid or empty means every day.
function weekdays(a) { const d = Array.isArray(a) ? [...new Set(a.map(Number).filter(n => Number.isInteger(n) && n >= 0 && n <= 6))] : []; return d.length && d.length < 7 ? d : null; }
// Cut very long text so one huge field can't break the layout or fill storage.
function clampText(o) {
  if (typeof o === "string") return o.length > LIMITS.text ? o.slice(0, LIMITS.text) : o;
  if (Array.isArray(o)) return o.map(clampText);
  if (o && typeof o === "object") { const out = {}; Object.keys(o).forEach(k => { if (k !== "__proto__" && k !== "constructor") out[k] = clampText(o[k]); }); return out; }
  return o;
}
// Count habits ("8 glasses of water"): a target of 2–99 turns a habit into tap-to-add +1. Anything else is a normal tick.
function goalOf(v) { const n = parseInt(v, 10); return n >= 2 ? Math.min(n, 99) : 0; }
function applyRoutine(r) {
  CFG = r;
  BLOCKS = r.blocks.map(b => {
    const from = tm(b.from, 0); let to = tm(b.to, from + 120); if (to <= from) to += 1440;
    return { id: slug(b.id || b.title), title: b.title || "Section", icon: I[b.icon] ? b.icon : "star", range: b.from && b.to ? fmtRange(from, to) : (b.range || ""), from, to, remind: b.remind ? tm(b.remind, null) : null,
      say: Array.isArray(b.say) ? b.say : null,
      items: (b.items || []).map(i => ({ id: slug(i.id || i.title), t: i.title || "", n: i.note || "", time: i.time || "",
        key: !!i.quest, alt: !!i.everyOtherDay, hide: Array.isArray(i.hideOnDays) && i.hideOnDays.length ? i.hideOnDays.map(Number) : null, dyn: !!i.useFocus, on: weekdays(i.onDays), goal: goalOf(i.target) })) };
  });
  FOCUS = {};
  for (let k = 0; k < 7; k++) { const f = (r.focus || {})[k] || (r.focus || {})[String(k)] || {}; FOCUS[k] = { t: f.title || (LANG === "ms" ? "1 jam: fokus" : "1 hour: focus"), n: f.note || "" }; }
  WORKOUTS = {};
  const woOn = r.showWorkouts !== false;
  if (!woOn) BLOCKS.forEach(b => b.items.forEach(i => { i.hide = null; }));
  Object.entries(woOn ? (r.workouts || {}) : {}).forEach(([day, w]) => {
    if (!w || !Array.isArray(w.exercises) || !w.exercises.length) return;
    const from = w.from != null ? tm(w.from, null) : null; let to = w.to != null ? tm(w.to, null) : null;
    if (from != null && to != null && to <= from) to += 1440;
    WORKOUTS[+day] = { name: w.name || "Workout", when: w.when || "", sets: [1, 2, 3, 4, 5].includes(+w.sets) ? +w.sets : null, from, to, remind: w.remind ? tm(w.remind, null) : (from != null ? from : null),
      after: slug(w.after || BLOCKS[0].id), say: Array.isArray(w.say) ? w.say : null,
      ex: w.exercises.map(e => ({ id: slug(e.id || e.name), name: e.name || "Exercise", reps: e.reps || "8–12", rest: e.rest || "60s", cue: e.cue || "", bw: !!e.bodyweight, unit: e.unit === "sec" ? "sec" : "" })) };
  });
  PROG = r.progression || {};
  WEEKLY = (r.weekly || []).map(w => ({ id: slug(w.id || w.title), t: w.title || "" }));
  TIPS = (r.tips && r.tips.length) ? r.tips : ["**Small steps, every day.**"];
  EXMAP = {}; Object.values(WORKOUTS).forEach(W => W.ex.forEach(ex => { EXMAP[ex.id] ||= ex; }));
}
try { applyRoutine(RAW); }
catch (e) { // A saved routine that can't be shown: keep a copy and fall back to the starter routine.
  logError("applyRoutine", e); const raw = storeGet(CFG_KEY); if (raw) storeSet(`${CFG_KEY}-corrupt-${Date.now()}`, raw);
  notices.push("errCorrupt"); RAW = defaultRoutine(); RAW_IS_DEFAULT = true; applyRoutine(RAW);
}
// Save first, then switch. If saving fails, the old routine stays active and nothing half-changes.
function saveRoutine(r) {
  const prev = RAW;
  try { applyRoutine(r); } catch (e) { reportError("applyRoutine", e, "errSaveRoutine"); applyRoutine(prev); return false; }
  if (!storeSet(CFG_KEY, JSON.stringify(r))) { applyRoutine(prev); return false; }
  RAW = r; RAW_IS_DEFAULT = false; return true;
}

/* ================= Game rules ================= */
const XP = { item: 10, key: 20, workout: 50, perfect: 50, quest: 40, pr: 25, weekly: 15 };
const COLORS = [["--gold","--gold-d"],["--sky","--sky-d"],["--green","--green-d"],["--orange","--orange-d"],["--pink","--pink-d"]];
const BADGES = [
  { id:"first", ic:"check", n:"1", test:S=>S.ticks>=1 }, { id:"quest", ic:"star", n:"", test:S=>S.quests>=1 }, { id:"perfect", ic:"trophy", n:"", test:S=>S.perfectDays>=1 },
  { id:"streak3", ic:"flame", n:"3", test:S=>S.bestStreak>=3 }, { id:"streak7", ic:"flame", n:"7", test:S=>S.bestStreak>=7 }, { id:"streak30", ic:"flame", n:"30", test:S=>S.bestStreak>=30 },
  { id:"iron", ic:"dumb", n:"", test:S=>S.workouts>=1 }, { id:"fullweek", ic:"cal", n:"", test:S=>S.fullWeeks>=1 }, { id:"w12", ic:"dumb", n:"12", test:S=>S.workouts>=12 },
  { id:"pr1", ic:"bolt", n:"", test:S=>S.prs>=1 }, { id:"pr10", ic:"bolt", n:"10", test:S=>S.prs>=10 }, { id:"habit14", ic:"star", n:"14", test:S=>S.topQuestCount>=14 },
  { id:"perfect7", ic:"trophy", n:"7", test:S=>S.perfectDays>=7 }, { id:"ticks500", ic:"check", n:"500", test:S=>S.ticks>=500 }, { id:"lv5", ic:"shield", n:"5", test:S=>S.level>=5 }, { id:"lv10", ic:"shield", n:"10", test:S=>S.level>=10 },
];
// Progress toward each badge: [have, need]. Locked badges show it so there is always a next goal.
const BADGE_GOAL = { first: S => [S.ticks, 1], quest: S => [S.quests, 1], perfect: S => [S.perfectDays, 1], streak3: S => [S.bestStreak, 3], streak7: S => [S.bestStreak, 7],
  streak30: S => [S.bestStreak, 30], iron: S => [S.workouts, 1], fullweek: S => [S.fullWeeks, 1], w12: S => [S.workouts, 12], pr1: S => [S.prs, 1], pr10: S => [S.prs, 10],
  habit14: S => [S.topQuestCount, 14], perfect7: S => [S.perfectDays, 7], ticks500: S => [S.ticks, 500], lv5: S => [S.level, 5], lv10: S => [S.level, 10] };
const badgeName = id => (T("badge")[id] || [id, ""])[0], badgeHow = id => (T("badge")[id] || ["", ""])[1];
const titleOf = n => { const t = T("titles"); return t[Math.min(n - 1, t.length - 1)]; };

/* ================= Progress storage ================= */
let store = loadJSON(DATA_KEY, v => v && typeof v === "object" && v.days && typeof v.days === "object").value || { days:{}, weeks:{}, logs:{}, seen:{}, rest:{} };
function normStore() { store.days ||= {}; store.weeks ||= {}; store.logs ||= {}; store.seen ||= {}; store.rest ||= {}; store.rem ||= {}; store.counts ||= {}; }
normStore();
function save() { return storeSet(DATA_KEY, JSON.stringify(store)); }
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
const shown = (i, d) => !(i.alt && !isAltDay(d)) && !(i.hide && i.hide.includes(d.getDay())) && !(i.on && !i.on.includes(d.getDay()));
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
    else if (kind === "pop") tone(880,0,.08,.14,"triangle");
    else if (kind === "clear") [523,659,784,1047].forEach((f,i) => tone(f,i*.09,.25,.18,"triangle"));
    else if (kind === "level") { [523,659,784,1047,1319].forEach((f,i) => tone(f,i*.1,.32,.2,"triangle")); tone(1568,.55,.5,.15,"sine"); }
    else if (kind === "beep") { tone(880,0,.18,.25,"square"); tone(880,.25,.18,.25,"square"); }
    else if (kind === "pr") { tone(784,0,.12,.18,"triangle"); tone(1175,.1,.3,.18,"triangle"); }
    else if (kind === "star1") tone(1047,0,.16,.16,"triangle");
    else if (kind === "star2") tone(1319,0,.16,.16,"triangle");
    else if (kind === "star3") { tone(1568,0,.2,.17,"triangle"); tone(2093,.07,.28,.12,"sine"); }
    else if (kind === "hop") { tone(523,0,.08,.1,"sine"); tone(784,.07,.12,.1,"sine"); }
  } catch (e) {}
}
function buzz(p) { try { navigator.vibrate && navigator.vibrate(p || 12); } catch (e) {} }
function flyXP(from) {
  const to = $("stXP").getBoundingClientRect(); if (reduced() || !to.width) return;
  const o = document.createElement("div"); o.className = "xpfly"; o.innerHTML = I.bolt;
  const x0 = from.right - 40, y0 = from.top + from.height / 2 - 14, dx = to.left + 4 - x0, dy = to.top + to.height / 2 - 14 - y0;
  o.style.left = x0 + "px"; o.style.top = y0 + "px"; document.body.appendChild(o);
  const dur = 620; xpFlying = Date.now() + dur;
  const a = o.animate([{ transform: "translate(0,0) scale(.6)", opacity: 0 }, { transform: `translate(${dx * .35}px,${dy * .35 - 40}px) scale(1.15)`, opacity: 1, offset: .35 },
    { transform: `translate(${dx}px,${dy}px) scale(.55)`, opacity: .9 }], { duration: dur, easing: "cubic-bezier(.45,0,.6,1)" });
  a.onfinish = () => { o.remove(); buzz(8); };
}
function floatXP(x, y, text) { if (reduced()) return; const f = document.createElement("div"); f.className = "fx"; f.textContent = (THEME === "sakura" ? "♥ " : THEME === "ungu" ? "⚡ " : THEME === "langit" ? "~ " : "") + text;
  f.style.left = Math.max(8, Math.min(innerWidth - 90, x)) + "px"; f.style.top = (y - 14) + "px"; document.body.appendChild(f); setTimeout(() => f.remove(), 950); }
function toast(html, icon, ms, action) { const t = document.createElement("div"); t.className = "toast" + (icon === "x" ? " err" : ""); t.innerHTML = `<i>${I[icon || "star"]}</i><span>${html}</span>`;
  if (action) { const b = document.createElement("button"); b.type = "button"; b.className = "toast-act"; b.textContent = action.label;
    b.onclick = () => { t.remove(); action.fn(); }; t.appendChild(b); t.classList.add("has-act"); }
  $("toasts").appendChild(t); setTimeout(() => { t.classList.add("out"); setTimeout(() => t.remove(), 320); }, ms || 2800); return t; }
// One Undo toast at a time: a new tick replaces the old offer instead of stacking toasts.
let undoToast = null;
function dropUndo() { if (undoToast) { undoToast.remove(); undoToast = null; } }
function offerUndo(html, fn) { dropUndo(); const t = toast(html, "check", 5000, { label: T("undo"), fn: () => { undoToast = null; fn(); } }); undoToast = t; }
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
$("questIco").innerHTML = I.star;
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
function tickRest() { const left = Math.max(0, restEnd - Date.now()); $("restTime").textContent = left > 0 ? fmtTime(left) : "Go!"; setFill($("restFill"), 100 * (1 - left/(restTotal*1000)));
  if (left <= 0) { clearInterval(restT); restT = null; sfx("beep"); buzz([200,100,200]); setTimeout(() => { if (!restT) $("restbar").hidden = true; }, 2500); } }
$("restSkip").onclick = () => { clearInterval(restT); restT = null; $("restbar").hidden = true; };
$("restPlus").onclick = () => { if (!restT) return startRest(15, $("restLabel").textContent.split(" · ").slice(1).join(" · ")); restEnd += 15000; restTotal += 15; };

/* ================= Rendering: main page ================= */
let lastS = null;
// Top-bar numbers roll up to their new value and bump, so every tick visibly pays out.
let xpFlying = 0;
function setStat(el, icon, value, fmt) {
  const old = el.dataset.v == null ? null : +el.dataset.v; el.dataset.v = value;
  const show = v => { el.innerHTML = icon + fmt(v); };
  if (old == null || value <= old || reduced()) { cancelAnimationFrame(el._raf); clearTimeout(el._wait); show(value); return; }
  const go = () => { const t0 = performance.now(), dur = 450;
    const step = now => { const p = Math.min(1, (now - t0) / dur), v = Math.round(old + (value - old) * (1 - Math.pow(1 - p, 3))); show(v); if (p < 1) el._raf = requestAnimationFrame(step); };
    el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump"); el._raf = requestAnimationFrame(step); };
  cancelAnimationFrame(el._raf); clearTimeout(el._wait); show(old);
  if (el.id === "stXP" && xpFlying > Date.now()) el._wait = setTimeout(go, xpFlying - Date.now()); else go();
}
function renderTop(S) {
  $("stStreak").className = "stat fire" + (S.streak ? "" : " off"); setStat($("stStreak"), I.flame, S.streak, v => v);
  setStat($("stXP"), I.bolt, S.todayXP, v => v); setStat($("stLv"), I.shield, S.level, v => T("lv", v));
  $("stSnd").innerHTML = soundOn ? I.sndOn : I.sndOff; $("stSnd").setAttribute("aria-label", T("sound"));

  $("lvName").innerHTML = `${T("level", S.L.n)} · <span>${titleOf(S.L.n)}</span>`;
  setFill($("lvFill"), 100 * S.L.cur / S.L.span); $("lvBar").textContent = T("xpOf", S.L.cur, S.L.span);
  $("progStreak").className = "prog-fl" + (S.streak ? "" : " off"); $("progStreak").innerHTML = `${I.flame}<b>${T("streakShort", S.streak)}</b>`;
  $("progressCard").setAttribute("aria-label", `${T("streakDays", S.streak)}. ${T("level", S.L.n)}, ${T("xpOf", S.L.cur, S.L.span)}. ${T("history")}`);
}
function renderQuests(S) {
  const d = routineDate(), W = WORKOUTS[d.getDay()], done = store.days[dkey(d)] || {};
  const Q = [{ ico:"star", t:T("qStar"), n:S.questDone, of:S.questTotal, rew:XP.quest }, { ico:"trophy", t:T("qDay"), n:S.doneToday, of:S.totalToday, rew:XP.perfect }];
  if (W) Q.splice(1, 0, { ico:"bolt", t:T("qWorkout", esc(W.name)), n: done["wo-done"] ? 1 : 0, of: 1, rew: XP.workout });
  else Q.splice(1, 0, { ico:"flame", t:T("qXP"), n: Math.min(S.todayXP, 150), of: 150, rew: 0 });
  const QS = Q.filter(q => q.of > 0), wonN = QS.filter(q => q.n >= q.of).length; renderQuests.allWon = QS.length > 0 && wonN === QS.length;
  // A pip pops when its quest was finished while home was out of view.
  const prevOn = renderQuests.on, liveQ = homeVisible() && prevOn && !reduced();
  $("questPips").innerHTML = QS.map((q, i) => { const on = q.n >= q.of; return `<i class="${on ? "on" : ""}${liveQ && on && !prevOn[i] ? " pop" : ""}"></i>`; }).join("");
  if (homeVisible() || !prevOn) renderQuests.on = QS.map(q => q.n >= q.of);
  $("questCount").textContent = T("of", wonN, QS.length);
  $("quests").innerHTML = QS.map(q => { const won = q.n >= q.of;
    return `<div class="quest${won ? " won" : ""}"><div class="q-ico">${I[q.ico]}</div><div class="q-main"><div class="q-t">${q.t}</div><div class="bar${won ? " green" : ""}"><i style="${fillPct(100*q.n/q.of)}"></i><b>${q.n} / ${q.of}</b></div></div><span class="q-rew${!won && !q.rew ? " chest" : ""}">${won ? T("done") : q.rew ? "+" + q.rew : I.chest + T("chestTag")}</span></div>`; }).join("");
}
/* ================= Today: game-level strip ================= */
// Each section is a level. Stars show progress in thirds; the little Tunas stands on the level to play next.
const starsFor = st => (st.cleared ? 3 : st.n === 0 || !st.total ? 0 : Math.max(1, Math.floor(3 * st.n / st.total)));
const starRow = (k, cls, from) => `<span class="stars${cls ? " " + cls : ""}" aria-hidden="true">${[0, 1, 2].map(i => `<i class="${i < k ? "on" : ""}${from != null && i >= from && i < k ? " pop" : ""}"${from != null && i >= from && i < k ? ` style="--d:${300 + (i - from) * 160}ms"` : ""}>${I.star}</i>`).join("")}</span>`;
function nextTitle(node, d) { const x = nextOpen(node, d); if (!x) return ""; return node.kind === "workout" ? x.name : node.kind === "block" ? itemTitle(x, d) : x.t; }
// What the home strip last showed while visible. Changes made inside a sheet play here once home is back in view.
let shownPath = null;
const homeVisible = () => !sheetId && $("cele").hidden && $("welcome").hidden;
function renderPath(S) {
  const d = routineDate(), mins = nowMins(), nodes = nodesFor(d), target = pathTarget(d, mins, nodes);
  const strip = $("path"), keepX = strip.scrollLeft;
  const cur = { k: {}, cleared: {}, target: target ? target.id : "", day: dkey(d) };
  nodes.forEach(n => { const st = nodeState(n, d); cur.k[n.id] = starsFor(st); cur.cleared[n.id] = st.cleared; });
  const live = homeVisible() && shownPath && shownPath.day === cur.day && !reduced();
  const was = live ? shownPath : null;
  strip.innerHTML = nodes.map(n => {
    const st = nodeState(n, d), isT = n === target, k = starsFor(st);
    const cls = st.cleared ? "done" : isT ? "go" : st.n > 0 ? "started" : "";
    const fresh = was && st.cleared && !was.cleared[n.id], from = was ? Math.min(was.k[n.id] || 0, k) : k;
    return `<div class="lvl${st.cleared ? " cleared" : ""}${isT ? " is-target" : ""}${fresh ? " just-cleared" : ""}" style="--from:${from}">
      ${isT ? `<span class="lvl-me mascot happy" aria-hidden="true">${MASCOT}</span>` : ""}
      <button class="lvl-node ${cls}" type="button" data-node="${n.id}" aria-label="${esc(n.title)}, ${T("of", st.n, st.total)}${isT ? ", " + T("upNext") : ""}">${st.cleared ? I.check : I[n.icon] || I.star}</button>
      ${starRow(k, "", from)}<span class="lvl-name">${esc(n.title)}</span></div>`;
  }).join("");
  $("pathTitle").textContent = T("todayIs", d.toLocaleDateString(locale(), { weekday: "long" }));
  renderLevelDetail(d, mins, target, S || lastS || computeAll());
  // Centre the level to play whenever it changes; otherwise keep where the person scrolled to.
  const t = strip.querySelector(".is-target"), tid = target ? target.id : "";
  strip.scrollLeft = keepX;
  if (t && strip.dataset.placed !== tid) { strip.dataset.placed = tid;
    const sr = strip.getBoundingClientRect(), tr = t.getBoundingClientRect(), left = Math.max(0, keepX + (tr.left - sr.left) - (sr.width - tr.width) / 2);
    if (live) strip.scrollTo({ left, behavior: "smooth" }); else strip.scrollLeft = left; }
  // The token hops from the level it stood on to the next one.
  if (was && was.target && tid && was.target !== tid) {
    const me = t && t.querySelector(".lvl-me"), old = strip.querySelector(`[data-node="${was.target}"]`);
    if (me && old) { const dx = old.closest(".lvl").offsetLeft - t.offsetLeft;
      me.animate([{ transform: `translateX(calc(-50% + ${dx}px))` }, { transform: `translateX(calc(-50% + ${dx / 2}px)) translateY(-30px)`, offset: .5 }, { transform: "translateX(-50%)" }],
        { duration: 650, delay: 700, easing: "cubic-bezier(.4,0,.3,1)", fill: "backwards" });
      setTimeout(() => sfx("hop"), 760); } }
  const gained = was ? nodes.reduce((s, n) => s + Math.max(0, cur.k[n.id] - (was.k[n.id] || 0)), 0) : 0;
  for (let i = 0; i < Math.min(gained, 3); i++) setTimeout(() => sfx("star" + (i + 1)), 300 + i * 160);
  if (homeVisible() || !shownPath || shownPath.day !== cur.day) shownPath = cur;
}
function renderLevelDetail(d, mins, target, S) {
  const el = $("levelDetail");
  if (!target) {
    el.className = "lv-detail all";
    el.innerHTML = `<div class="ld-h"><b>${T("allClear")}</b>${starRow(3, "big")}</div><p>${T("allClearSub", S.todayXP)}</p>`;
    return;
  }
  const st = nodeState(target, d), nx = nextTitle(target, d), live = inWindow(target, mins);
  // Past its window the level still counts, so say so instead of showing a start time that already went by.
  const ended = !live && target.kind !== "weekly" && target.to != null && mins >= target.to;
  const when = target.kind === "weekly" ? esc(target.range) : live && target.to != null ? T("until", fmtClock(target.to)) : ended ? T("endedAt", fmtClock(target.to)) : target.from != null ? T("startsAt", fmtClock(target.from)) : esc(target.range || "");
  el.className = "lv-detail";
  el.innerHTML = `<div class="ld-h"><b>${esc(target.title)}</b><span${ended ? ' class="ended"' : ""}>${T("of", st.n, st.total)}${when ? " · " + when : ""}</span></div>
    ${nx ? `<p>${T("nextIs", esc(nx))}</p>` : ""}
    <button class="btn ld-go" type="button" data-node="${target.id}">${st.n === 0 ? T("start") : T("cont")}</button>`;
}
/* ================= First-time tips ================= */
// One short tip at a time, shown in place under what it explains. "Got it" hides it for good.
const TIPS_ORDER = [
  { id: "levels", where: () => !sheetId && $("path"), place: el => el.closest(".levels").querySelector(".lv-detail") , before: true },
  { id: "sheet", where: () => sheetId && nodesFor(routineDate()).some(n => n.id === sheetId) && $("shHead").querySelector(".starbar"), place: el => el, after: true },
  { id: "quests", where: () => !sheetId && $("questFold"), place: el => el, after: true }];
function coach() {
  document.querySelectorAll(".coach").forEach(c => { if (!c.isConnected || c.dataset.stale) c.remove(); });
  if (!$("welcome").hidden || !$("cele").hidden) return;
  store.tips ||= {};
  const tip = TIPS_ORDER.find(t => !store.tips[t.id]); if (!tip) return;
  const anchor = tip.where(); if (!anchor) return;
  if (document.querySelector(`.coach[data-tip="${tip.id}"]`)) return;
  document.querySelectorAll(".coach").forEach(c => c.remove());
  const box = document.createElement("div"); box.className = "coach"; box.dataset.tip = tip.id; box.setAttribute("role", "note");
  box.innerHTML = `<i aria-hidden="true">${I.star}</i><p>${T("tip_" + tip.id)}</p><button class="btn small" type="button">${T("gotIt")}</button>`;
  box.querySelector("button").onclick = () => { store.tips[tip.id] = 1; save(); box.remove(); coach(); };
  const at = tip.place(anchor); if (tip.before) at.before(box); else at.after(box);
}
function playHome() { if (homeVisible()) { const S = lastS || computeAll(); renderPath(S); renderQuests(S); } }
$("path").addEventListener("click", e => { const b = e.target.closest("[data-node]"); if (b) { audio(); openSheet(b.dataset.node); } });
$("levelDetail").addEventListener("click", e => { const b = e.target.closest("[data-node]"); if (b) { audio(); openSheet(b.dataset.node); } });

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
  const el = $("streakCard"); if (!el) return;
  el.innerHTML = `<div class="streak-top"><svg class="big-flame${S.streak ? "" : " off"}" viewBox="0 0 24 24"><path d="${I.flame.match(/d="([^"]+)"/)[1]}"/></svg><div><b>${T("streakDays", S.streak)}</b><span>${S.streak ? T("streakKeep") : T("streakStart")} · ${T("best", S.bestStreak)}</span></div></div><div class="week">${days}</div>${restRow(d)}`;
}
$("shBody").addEventListener("click", e => { if (!e.target.closest("#streakCard")) return; const b = e.target.closest("[data-restday]"); if (b) setRest(b.dataset.restday, b.dataset.v === "1"); });

let histMonth = (() => { const d = routineDate(); return new Date(d.getFullYear(), d.getMonth(), 1); })();
function renderHistory() {
  if (!$("hist")) return;
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
$("shBody").addEventListener("click", e => {
  if (!e.target.closest("#hist")) return;
  const nav = e.target.closest("[data-hnav]"); if (nav) { histMonth = new Date(histMonth.getFullYear(), histMonth.getMonth() + (+nav.dataset.hnav), 1); renderHistory(); return; }
  const c = e.target.closest("[data-day]"); if (c && !c.disabled) openSheet("day:" + c.dataset.day);
});
function renderBadges(S) {
  const got = BADGES.filter(b => b.test(S)); $("badgeMeta").textContent = got.length ? String(got.length) : ""; $("badgeMeta").setAttribute("aria-label", `${got.length}/${BADGES.length}`);
  const grid = $("bgrid"); if (!grid) return got;
  const near = b => { const [h, n] = (BADGE_GOAL[b.id] || (() => [0, 1]))(S); return Math.min(1, h / n); };
  const list = BADGES.map((b, i) => ({ b, i, ok: b.test(S), p: near(b) })).sort((x, y) => (y.ok - x.ok) || (y.p - x.p) || (x.i - y.i));
  grid.innerHTML = list.map(({ b, i, ok }) => { const c = COLORS[i % COLORS.length];
    const [have, need] = (BADGE_GOAL[b.id] || (() => [0, 1]))(S), pct = Math.min(100, 100 * have / need);
    const when = ok && typeof store.seen[b.id] === "string" ? store.seen[b.id] : null, fresh = when === dkey(routineDate()), left = need - Math.min(have, need);
    const prog = ok ? `<div class="bp won">${I.check}<span>${T("earned")}</span></div>${when ? `<time class="b-when" datetime="${when}">${keyToDate(when).toLocaleDateString(locale(), { day: "numeric", month: "short" })}</time>` : ""}`
      : `<div class="bp${pct >= 60 ? " near" : ""}"><span class="bar"><i style="${fillPct(pct)}"></i></span><b>${pct >= 60 ? T("toGo", left) : `${Math.min(have, need)} / ${need}`}</b></div>`;
    const spark = ok ? `<i class="spk s1" aria-hidden="true">${I.spark}</i><i class="spk s2" aria-hidden="true">${I.spark}</i>` : "";
    return `<div class="badge${ok ? " won" : " locked"}" style="--c:var(${c[0]});--cd:var(${c[1]})"><div class="medal-wrap">${spark}<div class="medal"><span>${I[b.ic] || I.star}${b.n ? `<small>${b.n}</small>` : ""}</span></div>${fresh ? `<b class="b-new">${T("newBadge")}</b>` : ""}</div><div class="bn">${badgeName(b.id)}</div><div class="bh">${badgeHow(b.id)}</div>${prog}</div>`; }).join("");
  return got;
}
// The routine's guide and daily tip live on the Routine page; refresh it if it's open.
function renderGuide() { if (sheetId === "routine") renderSheet(true); }
function guideHTML() {
  const g = CFG.guide, tip = TIPS[dayNum(routineDate()) % TIPS.length];
  return `<div class="set-group"><h3>${esc((g && g.title) || T("guide"))}</h3><div class="tip"><div class="ti">${I.star}</div><p>${md(tip)}</p></div>
    ${g ? `<div class="guide">${(g.sections || []).map(s => `<details><summary>${esc(s.title)}</summary><div class="g">${(s.lines || []).map(l => `<p>${md(l)}</p>`).join("")}</div></details>`).join("")}</div>` : ""}</div>`;
}
function renderProgressSheet(kind, keep) {
  const body = $("shBody"), top = keep ? body.scrollTop : 0, S = lastS || computeAll();
  if (kind === "history") {
    $("shHead").innerHTML = sheetHead("cal", T("tabProgress"), T("histSub"), null, "--green"); $("shHead").querySelector(".sh-ico").innerHTML = I.chart;
    body.innerHTML = `<div class="card streak-card" id="streakCard"></div><div class="card hist wsum" id="wsum"></div><div class="card hist" id="hist"></div>`;
    renderStreak(S); renderWeekSum(); renderHistory();
  } else {
    const n = BADGES.filter(b => b.test(S)).length;
    $("shHead").innerHTML = sheetHead("trophy", T("badges"), T("badgesSub", n, BADGES.length), { n, total: BADGES.length }, "--gold");
    body.innerHTML = `<div class="bgrid" id="bgrid"></div>`; renderBadges(S);
  }
  $("shClose").onclick = closeSheet;
  if (keep) body.scrollTop = top;
}
$("progressCard").onclick = () => { audio(); openSheet("history"); };

/* ================= Bottom sheet ================= */
let sheetId = null, lastFocus = null, lockedFile = null;
function openSheet(id) {
  // Phone back button closes the sheet instead of leaving the app.
  if (!sheetId && !(history.state && history.state.tunasSheet)) { try { history.pushState({ tunasSheet: 1 }, ""); } catch (e) {} }
  // A day opened from History goes back to History when closed; a locked-backup sheet goes back to Settings.
  if (id === "badges") id = "me"; // badges live in the Me tab now
  parentSheet = (sheetId === "history" && id.startsWith("day:")) || (sheetId === "settings" && id.startsWith("lock:"))
    || (sheetId === "routine" && ["packs", "wosetup", "skinsetup"].includes(id)) ? sheetId : null;
  if (!parentSheet) lastFocus = document.activeElement;
  // Restoring a backup from the welcome screen opens a sheet on top of it.
  document.body.classList.toggle("sheet-top", !$("welcome").hidden);
  sheetId = id;
  $("scrim").hidden = false; $("sheet").hidden = false; document.body.classList.add("locked");
  renderSheet(false);
  requestAnimationFrame(() => { $("scrim").classList.add("show"); $("sheet").classList.add("show"); const x = $("shClose"); x && x.focus({ preventScroll: true }); });
}
let parentSheet = null;
function closeSheet(fromBack) {
  if (!sheetId) return;
  lockedFile = null;
  if (parentSheet) { const p = parentSheet; parentSheet = null;
    if (fromBack) { try { history.pushState({ tunasSheet: 1 }, ""); } catch (e) {} }
    sheetId = p; renderSheet(false); const x = $("shClose"); x && x.focus({ preventScroll: true }); return; } sheetId = null; ED = null; syncTabs();
  if (!fromBack && history.state && history.state.tunasSheet) { try { history.back(); } catch (e) {} }
  $("scrim").classList.remove("show"); $("sheet").classList.remove("show"); if ($("welcome").hidden) document.body.classList.remove("locked");
  setTimeout(() => { if (!sheetId) { $("scrim").hidden = true; $("sheet").hidden = true; document.body.classList.remove("sheet-top"); } }, 320);
  if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  setTimeout(() => { playHome(); coach(); }, 200);
}
$("scrim").onclick = () => { if (sheetId === "editor") requestCloseEditor(); else closeSheet(); };
document.addEventListener("keydown", e => { if (e.key === "Escape") { if (!$("cele").hidden) return nextCele(); if (sheetId === "editor") requestCloseEditor(); else closeSheet(); } });
window.addEventListener("popstate", () => {
  if (!sheetId) return;
  if (sheetId === "editor" && ED && ED.dirty) { try { history.pushState({ tunasSheet: 1 }, ""); } catch (e) {} requestCloseEditor(); return; }
  closeSheet(true);
});
// Tapping anywhere on a switch row flips its switch, so the target isn't just the small pill.
document.addEventListener("click", e => { const row = e.target.closest(".sw-row"); if (!row || e.target.closest(".toggle, button, a, input, select, textarea")) return; const t = row.querySelector(".toggle"); if (t) t.click(); });
window.addEventListener("beforeunload", e => { if (ED && ED.dirty) { e.preventDefault(); e.returnValue = ""; } });

function taskHTML(i, checked, tag, dayKey) {
  if (i.goal && dayKey) return countHTML(i, checked, tag, dayKey);
  return `<button class="task" type="button" role="checkbox" aria-checked="${checked}" data-task="${i.id}">
    <span class="ck">${I.check}</span><span class="tt"><b>${esc(i.t)}${tag}</b>${i.n ? `<span>${esc(i.n)}</span>` : ""}</span>${i.time ? `<span class="tm">${esc(i.time)}</span>` : ""}</button>`;
}
// How far a count habit got that day. A ticked one (also via Tick all) always shows full.
const countOf = (i, dayKey, done) => done ? i.goal : Math.min(((store.counts[dayKey] || {})[i.id]) || 0, i.goal - 1);
function countHTML(i, checked, tag, dayKey) {
  const n = countOf(i, dayKey, checked), label = `${i.t} · ${T("countOf", n, i.goal)}`;
  return `<div class="cnt-row"><button class="task cnt" type="button" role="checkbox" aria-checked="${checked}" data-task="${i.id}" aria-label="${esc(label)}${checked ? "" : ". " + T("countTap")}">
    <span class="ck">${checked ? I.check : `<span class="ck-plus">${I.plus}</span>`}</span><span class="tt"><b>${esc(i.t)}${tag}</b>${i.n ? `<span>${esc(i.n)}</span>` : ""}<span class="cnt-bar" aria-hidden="true"><i style="${fillPct(100 * n / i.goal)}"></i></span></span>
    <span class="tm cnt-n" aria-hidden="true">${n} / ${i.goal}</span></button>${n > 0 ? `<button class="cnt-minus" type="button" data-cminus="${i.id}" aria-label="${esc(T("countMinus", i.t))}">−</button>` : ""}</div>`;
}
function sheetHead(icon, title, sub, st, color) {
  return `<div class="grab"></div><div class="sh-row"><div class="sh-ico" style="background:var(${color || "--green"})">${I[icon] || I.star}</div><div><h2 id="shTitle">${title}</h2><p>${sub}</p></div><button class="x" id="shClose" type="button" aria-label="Close">${I.x}</button></div>` +
    (st ? `<div class="bar green"><i style="${fillPct(st.total ? 100*st.n/st.total : 0)}"></i><b>${st.n} / ${st.total}</b></div>` : "");
}
// Star meter: the sheet's progress bar shows where each of the level's 3 stars is earned.
const sheetStars = {};
function starAt(total) { // smallest tick count that earns star 1, 2, 3 (same rule as starsFor)
  const need = k => { for (let n = 1; n <= total; n++) if (starsFor({ n, total, cleared: n === total }) >= k) return n; return total; };
  return [need(1), need(2), need(3)];
}
function starMeter(id, st) {
  const bar = $("shHead").querySelector(".bar"); if (!bar || !st.total) return;
  const k = starsFor(st), prev = sheetStars[id]; sheetStars[id] = k;
  const wrap = document.createElement("div"); wrap.className = "starbar"; bar.replaceWith(wrap); wrap.appendChild(bar);
  // Stars earned on the same tick share one marker (×2, ×3), so short levels don't stack markers.
  const at = starAt(st.total), groups = [];
  at.forEach((n, i) => { const g = groups.find(x => x.n === n); if (g) g.stars.push(i); else groups.push({ n, stars: [i] }); });
  wrap.insertAdjacentHTML("beforeend", groups.map(g => { const last = g.stars[g.stars.length - 1], on = last < k, pop = on && prev != null && last >= prev;
    return `<i class="sm${on ? " on" : ""}${pop ? " pop" : ""}${g.n === st.total ? " end" : ""}" style="left:${100 * g.n / st.total}%;--d:${pop ? Math.max(0, g.stars[0] - prev) * 140 : 0}ms" aria-hidden="true">${I.star}${g.stars.length > 1 ? `<em>×${g.stars.length}</em>` : ""}</i>`; }).join(""));
  wrap.setAttribute("aria-label", T("starsOf", k));
  if (prev != null && k > prev) for (let i = prev; i < k; i++) setTimeout(() => { sfx("star" + (i + 1)); buzz(10); }, (i - prev) * 140 + 60);
}
function renderSheet(keep) {
  syncTabs();
  if (!sheetId) return;
  if (sheetId === "settings") return renderSettings(keep);
  if (sheetId === "routine") return renderRoutinePage(keep);
  if (sheetId === "me") return renderMe(keep);
  if (sheetId === "editor") return renderEditor(keep);
  if (sheetId.startsWith("lock:")) return renderLockSheet(keep);
  if (sheetId === "packs") return renderPackSheet(keep);
  if (sheetId === "wosetup") return renderWoSheet(keep);
  if (sheetId === "skinsetup") return renderSkinSheet(keep);
  if (sheetId.startsWith("day:")) return renderDaySheet(sheetId.slice(4), keep);
  if (sheetId === "history") return renderProgressSheet(sheetId, keep);
  const d = routineDate(), today = dkey(d), node = nodesFor(d).find(n => n.id === sheetId); if (!node) { closeSheet(); return; }
  const st = nodeState(node, d), body = $("shBody"), top = keep ? body.scrollTop : 0;
  $("shHead").innerHTML = sheetHead(node.icon, esc(node.title), `${esc(node.range)}${node.range ? " · " : ""}${T("of", st.n, st.total)}`, st, st.cleared ? "--gold" : "--green");
  starMeter(node.id, st); setTimeout(coach, 0);
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
      h += taskHTML(i, !!done[i.id], tag, today);
    });
  } else if (node.kind === "weekly") {
    const wd = store.weeks[wkey(d)] || {};
    WEEKLY.forEach(i => { h += taskHTML(i, !!wd[i.id], `<span class="qtag alt">+${XP.weekly}</span>`); });
    h += `<div class="note">${T("weeklyNote")}</div>`;
  } else {
    const W = node.W, wk = programWeek(d), nSets = W.sets || (wk <= 4 ? 2 : 3), logs = store.logs[today] || {};
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
    isRest(d) ? T("restSub") : `${T("of", st.n, st.total)} · ${Math.round(100*st.n/(st.total||1))}%${isToday ? " · " + T("todayTag") : ""}`, st, "--green");
  $("shClose").onclick = closeSheet;
  let h = `<div class="note">${isToday ? T("dayToday") : T("dayFix")}</div><div class="set-group">${restRow(d).replace('class="rest-row"', 'class="rest-row in-sheet"')}</div>`;
  const W = WORKOUTS[d.getDay()];
  BLOCKS.forEach(b => {
    const items = b.items.filter(i => shown(i, d)); if (!items.length && !(W && W.after === b.id)) return;
    h += `<h3 class="grp">${esc(b.title)}</h3>`;
    items.forEach(i => { if (i.dyn) i = { ...i, ...FOCUS[d.getDay()] }; h += taskHTML(i, !!done[i.id], i.key ? `<span class="qtag">★</span>` : "", key); });
    if (W && W.after === b.id) h += taskHTML({ id: "wo-done", t: T("workoutOf", W.name), n: "" }, !!done["wo-done"], `<span class="qtag">★</span>`);
  });
  body.innerHTML = h; if (keep) body.scrollTop = top;
}
function tickAll() {
  const d = routineDate(), today = dkey(d), node = nodesFor(d).find(n => n.id === sheetId); if (!node || node.kind !== "block") return;
  const done = (store.days[today] ||= {}); let xp = 0;
  const ticked = [];
  node.b.items.forEach(i => { if (shown(i, d) && !done[i.id]) { done[i.id] = true; ticked.push(i.id); xp += xpFor(i.id, d); } });
  save(); sfx("ding"); buzz([15, 40, 15]); floatXP(innerWidth / 2 - 40, innerHeight / 2, `+${xp} XP`); jump($("mascot"));
  const tb = document.querySelector("#shBody .tickall"); if (tb) flyXP(tb.getBoundingClientRect());
  refresh(true);
  // One mis-tap shouldn't tick a whole section for good: offer Undo for a few seconds.
  offerUndo(T("tickedAll", ticked.length), () => {
    const day = store.days[today]; if (!day) return; ticked.forEach(id => { delete day[id]; }); save(); sfx("undo"); lastS = null; prevCleared = null; refresh(true); });
}

const countItem = id => { for (const b of BLOCKS) { const i = b.items.find(x => x.id === id); if (i) return i.goal ? i : null; } return null; };
// +1 or −1 on a count habit that isn't finished by this tap. −1 on a finished one unticks it.
function countStep(id, step, el) {
  const ci = countItem(id); if (!ci) return;
  const dayKey = sheetId.startsWith("day:") ? sheetId.slice(4) : dkey(routineDate()), day = (store.days[dayKey] ||= {}), cBox = (store.counts[dayKey] ||= {});
  const wasDone = day[id], wasN = cBox[id], n = Math.max(0, countOf(ci, dayKey, !!wasDone) + step);
  if (wasDone) day[id] = false;
  if (n) cBox[id] = n; else delete cBox[id];
  if (!save()) return;
  const rect = el.getBoundingClientRect();
  if (step > 0) { sfx("pop"); buzz(8); floatXP(rect.right - 90, rect.top + rect.height / 2, `${n} / ${ci.goal}`);
    offerUndo(T("countAdded", esc(itemTitle(ci, keyToDate(dayKey))), n, ci.goal), () => { if (wasN === undefined) delete cBox[id]; else cBox[id] = wasN; save(); sfx("undo"); lastS = null; prevCleared = null; refresh(true); }); }
  else { sfx("undo"); dropUndo(); }
  if (wasDone) { lastS = null; prevCleared = null; }
  refresh(true);
  const again = document.querySelector(`[data-task="${id}"]`); again && again.focus({ preventScroll: true });
}
$("shBody").addEventListener("click", e => {
  if (sheetId === "editor") return editorClick(e);
  const ra = e.target.closest("[data-remadd]"); if (ra) { store.rem[ra.dataset.remadd] = Date.now(); save(); setTimeout(() => { if (sheetId === "routine") renderSheet(true); }, 400); return; }
  const ru = e.target.closest("[data-remundo]"); if (ru) { delete store.rem[ru.dataset.remundo]; save(); renderSheet(true); return; }
  const rd = e.target.closest("[data-restday]"); if (rd) return setRest(rd.dataset.restday, rd.dataset.v === "1");
  const act = e.target.closest("[data-act]"); if (act) return settingsAction(act.dataset.act, act);
  const r = e.target.closest("[data-rest]"); if (r) { startRest(+r.dataset.rest, r.dataset.label); return; }
  const cm = e.target.closest("[data-cminus]"); if (cm) return countStep(cm.dataset.cminus, -1, cm);
  const t = e.target.closest("[data-task]"); if (!t) return;
  const id = t.dataset.task, dayKey = sheetId.startsWith("day:") ? sheetId.slice(4) : dkey(routineDate()), d = keyToDate(dayKey), v = t.getAttribute("aria-checked") !== "true";
  const box = sheetId === "weekly" ? (store.weeks[wkey(d)] ||= {}) : (store.days[dayKey] ||= {}), was = box[id];
  const ci = sheetId !== "weekly" && countItem(id), cBox = ci ? (store.counts[dayKey] ||= {}) : null, cWas = ci ? cBox[id] : undefined;
  // A count habit only ticks on its last tap; the taps before that just add one.
  if (ci && v && countOf(ci, dayKey, false) + 1 < ci.goal) return countStep(id, 1, t);
  if (ci) { if (v) delete cBox[id]; else cBox[id] = ci.goal - 1; }
  box[id] = v; save();
  const rect = t.getBoundingClientRect();
  if (v) { const xp = sheetId === "weekly" ? XP.weekly : xpFor(id, d); sfx("ding"); buzz(); floatXP(rect.right - 90, rect.top + rect.height/2, `+${xp} XP`); if (!sheetId.startsWith("day:")) flyXP(rect);
    const it = id === "wo-done" ? { t: T("woDone") } : sheetId === "weekly" ? WEEKLY.find(w => w.id === id) : BLOCKS.flatMap(b => b.items).find(i => i.id === id);
    const node = nodesFor(d).find(n => n.id === sheetId), nx = node && !sheetId.startsWith("day:") ? nextOpen(node, d) : null;
    say(`${pick(T("cheers"))} ${esc(it ? itemTitle(it, d) : "")} ✓`, nx ? T("sayThen", esc(nx.name || itemTitle(nx, d))) + ` · +${xp} XP` : `+${xp} XP`, "happy", 3200); jump($("mascot"));
    // A mis-tap is easy on a phone: offer Undo for 5 seconds, putting back exactly what was there before.
    offerUndo(T("tickedOne", esc(it ? itemTitle(it, d) : "")), () => { if (was === undefined) delete box[id]; else box[id] = was;
      if (ci) { if (cWas === undefined) delete cBox[id]; else cBox[id] = cWas; } save(); sfx("undo"); lastS = null; prevCleared = null; refresh(true); }); }
  else { sfx("undo"); dropUndo(); }
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
$("shBody").addEventListener("keydown", e => { if (e.key === "Enter" && e.target.classList && e.target.classList.contains("ed-name")) e.preventDefault(); });

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
  const url = OLD_HOME ? NEW_HOME : appURL(); // friends start on the new address; reminders keep this one until people move
  try { if (navigator.share) { await navigator.share({ title: "Tunas Routine", text: T("shareText"), url }); return; } } catch (e) { if (e && e.name === "AbortError") return; }
  try { await navigator.clipboard.writeText(url); toast(T("copied"), "check"); }
  catch (e) { toast(`${T("copyFail")} <b>${esc(url)}</b>`, "share", 6000); }
}

/* ================= Backups: gentle nudge + persistent storage ================= */
// Browsers can clear site data when the phone is low on space. Ask to keep ours, and nudge for a backup file every 2 weeks.
const BACKUP_EVERY = 14, NUDGE_SNOOZE = 7;
const daysAgo = t => Math.max(0, Math.floor((Date.now() - t) / 864e5));
const backupAge = () => (store.lastBackup ? daysAgo(store.lastBackup) : null);
function firstUseTime() { const k = Object.keys(store.days).filter(k => Object.values(store.days[k] || {}).some(Boolean)).sort()[0]; return k ? keyToDate(k).getTime() : null; }
function needsBackup() {
  if (store.backupSnooze && daysAgo(store.backupSnooze) < NUDGE_SNOOZE) return false;
  const since = store.lastBackup || firstUseTime(); return since != null && daysAgo(since) >= BACKUP_EVERY;
}
/* Moving to tunas.amkaz.dev: each web address keeps its own storage, so data can't follow by itself.
   The old GitHub Pages address shows a move banner (in place of the backup nudge) that walks people through
   backup → open the new address → restore. The new address never shows it. */
const NEW_HOST = "tunas.amkaz.dev", NEW_HOME = `https://${NEW_HOST}/`;
const OLD_HOME = location.hostname === "giyuuln.github.io";
const MOVE_FROM = Date.UTC(2026, 9, 30), MOVE_SNOOZE = 3; // backups older than the banner don't count as "ready to move"
function moveHTML() {
  const ready = store.lastBackup >= MOVE_FROM;
  if (ready && store.moveSnooze && daysAgo(store.moveSnooze) < MOVE_SNOOZE) return "";
  const open = cls => `<a class="btn ${cls}small" href="${NEW_HOME}" target="_blank" rel="noopener">${T("moveOpen", NEW_HOST)}</a>`;
  return `<div class="nd-top"><div class="nd-ico">${I.warn}</div><div><b id="nudgeT">${ready ? T("moveReadyTitle") : T("moveTitle", NEW_HOST)}</b><span>${ready ? T("moveReadySub", NEW_HOST) : T("moveSub")}</span></div></div>` +
    (ready ? `<p class="nd-note">${T("lastBackup", backupAge())}</p>` : `<ol class="nd-steps">${T("moveSteps", NEW_HOST).map(s => `<li>${s}</li>`).join("")}</ol>`) +
    `<div class="row">${ready ? open("") + `<button class="btn ghost small" type="button" data-nudge="save">${T("moveFresh")}</button><button class="btn ghost small" type="button" data-nudge="moveLater">${T("nudgeLater")}</button>`
      : `<button class="btn small" type="button" data-nudge="save">${T("downloadBackup")}</button>` + open("ghost ")}</div>`;
}
let nudgeHTML = "";
function renderNudge() {
  const el = $("nudge");
  const html = OLD_HOME ? moveHTML() : !needsBackup() ? "" : `<div class="nd-top"><div class="nd-ico">${I.warn}</div><div><b id="nudgeT">${T("nudgeTitle")}</b><span>${T("nudgeSub", backupAge())}</span></div></div>
    <div class="row"><button class="btn small" type="button" data-nudge="save">${T("downloadBackup")}</button><button class="btn ghost small" type="button" data-nudge="later">${T("nudgeLater")}</button></div>`;
  if (!html) { el.hidden = true; el.innerHTML = nudgeHTML = ""; return; }
  if (nudgeHTML !== html) el.innerHTML = nudgeHTML = html; // don't redraw (and lose focus) on the minute refresh
  el.hidden = false;
}
function askPersist() { try { const s = navigator.storage; if (s && s.persist) s.persisted().then(p => p || s.persist()).catch(() => {}); } catch (e) {} }
const backupData = () => ({ app: "tunas", type: "backup", savedAt: new Date().toISOString(), data: store, routine: RAW_IS_DEFAULT ? null : RAW });
function backupDone() { delete store.backupSnooze; save(); askPersist(); renderNudge(); toast(T("backupSaved"), "check", 3500); }
function saveBackup() {
  if (!download(`tunas-backup-${dkey(new Date())}.json`, backupData())) return false;
  backupDone(); return true;
}

/* ================= Locked backups (password-protected) ================= */
// The same backup JSON, encrypted on the phone: PBKDF2-SHA256 → AES-GCM 256. The password is never stored;
// it's read from the field, turned into bytes for the key, and the field and bytes are cleared straight away.
const LOCK_ITER = 600000;
const hasCrypto = () => !!(window.crypto && crypto.subtle && window.TextEncoder && window.TextDecoder);
function b64(u8) { let s = ""; for (let i = 0; i < u8.length; i += 0x8000) s += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000)); return btoa(s); }
function unb64(s) {
  if (typeof s !== "string") return null;
  try { const t = atob(s), u = new Uint8Array(t.length); for (let i = 0; i < t.length; i++) u[i] = t.charCodeAt(i); return u; } catch (e) { return null; }
}
async function lockKey(pwBytes, salt, iter) {
  try {
    const base = await crypto.subtle.importKey("raw", pwBytes, "PBKDF2", false, ["deriveKey"]);
    return await crypto.subtle.deriveKey({ name: "PBKDF2", hash: "SHA-256", salt, iterations: iter }, base, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]);
  } finally { pwBytes.fill(0); }
}
// Check a locked file's envelope before asking for the password. The iteration cap stops a crafted file from freezing the phone.
function readEnvelope(b) {
  const k = b.kdf || {};
  if (b.v !== 1 || k.name !== "PBKDF2" || k.hash !== "SHA-256" || !Number.isInteger(k.iter) || k.iter < 100000 || k.iter > 2000000) return null;
  const salt = unb64(k.salt), iv = unb64(b.iv), ct = unb64(b.ct);
  return salt && salt.length === 16 && iv && iv.length === 12 && ct && ct.length > 16 ? { iter: k.iter, salt, iv, ct } : null;
}
function openLocked(b) {
  if (!hasCrypto()) return void toast(T("lockNoCrypto"), "x");
  const env = readEnvelope(b); if (!env) return void toast(T("notBackup"), "x");
  if (env.ct.length - 16 > LIMITS.backupBytes) return void toast(T("errFileTooBig", LIMITS.backupBytes / 1e6), "x"); // 16 = GCM tag
  lockedFile = env; openSheet("lock:open");
}
let lockBusy = false;
function renderLockSheet(keep) {
  const open = sheetId === "lock:open", f = $("lockForm");
  if (keep && f && f.dataset.mode === sheetId) return; // a background refresh must not wipe a half-typed password
  if (open && !lockedFile) return closeSheet();
  $("shHead").innerHTML = sheetHead("shield", T(open ? "unlockTitle" : "lockTitle"), T(open ? "unlockSub" : "lockSub"), null, "--green");
  $("shClose").onclick = closeSheet;
  const pwField = (id, label, ac) => `<label for="${id}">${label}</label><input class="field" id="${id}" type="password" autocomplete="${ac}" maxlength="256" spellcheck="false" autocapitalize="off">`;
  $("shBody").innerHTML = `<form class="lk-form" id="lockForm" data-mode="${sheetId}" novalidate>
    ${open ? pwField("lockPw", T("unlockPw"), "current-password") : pwField("lockPw", T("lockPw"), "new-password") + pwField("lockPw2", T("lockPw2"), "new-password")}
    <p class="lk-err" id="lockErr" role="alert" hidden></p>
    ${open ? `<p class="lk-note">${T("unlockNote")}</p>` : `<div class="lk-warn" role="note"><i aria-hidden="true">${I.warn}</i><span>${T("lockWarn")}</span></div>`}
    <div class="row"><button class="btn small${open ? " danger" : ""}" type="submit" id="lockGo">${T(open ? "unlockGo" : "lockGo")}</button>
      <button class="btn ghost small" type="button" id="lockCancel">${T("cancel")}</button></div></form>`;
  $("lockCancel").onclick = () => closeSheet();
  $("lockForm").onsubmit = e => { e.preventDefault(); if (open) unlockSubmit(); else lockSubmit(); };
  setTimeout(() => { const p = $("lockPw"); if (p && sheetId && sheetId.startsWith("lock:")) p.focus({ preventScroll: true }); }, 350);
}
function lockError(msg, field) { const p = $("lockErr"); p.textContent = msg; p.hidden = false; field.setAttribute("aria-invalid", "true"); field.focus(); }
function lockWorking(on, label) { const b = $("lockGo"); if (!b) return; b.disabled = on; if (on) { b.dataset.label = b.textContent; b.textContent = label; } else if (b.dataset.label) b.textContent = b.dataset.label; }
async function lockSubmit() {
  if (lockBusy) return;
  const a = $("lockPw"), b = $("lockPw2");
  if (a.value.length < 8) return lockError(T("lockShort"), a);
  if (a.value !== b.value) return lockError(T("lockMismatch"), b);
  const plain = new TextEncoder().encode(JSON.stringify(backupData(), null, 2));
  if (plain.length > LIMITS.backupBytes) { plain.fill(0); return void toast(T("errFileTooBig", LIMITS.backupBytes / 1e6), "x"); }
  const salt = crypto.getRandomValues(new Uint8Array(16)), iv = crypto.getRandomValues(new Uint8Array(12));
  const keyP = lockKey(new TextEncoder().encode(a.value), salt, LOCK_ITER); a.value = b.value = "";
  lockBusy = true; lockWorking(true, T("lockWorking"));
  try {
    const ct = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, await keyP, plain));
    if (sheetId !== "lock:save") return; // closed while it was working: don't download
    if (!download(`tunas-backup-locked-${dkey(new Date())}.json`, { tunas: "enc-backup", v: 1, kdf: { name: "PBKDF2", hash: "SHA-256", iter: LOCK_ITER, salt: b64(salt) }, iv: b64(iv), ct: b64(ct) })) return;
    backupDone(); closeSheet();
  } catch (e) { reportError("lockBackup", e, "errLock"); }
  finally { plain.fill(0); lockBusy = false; lockWorking(false); }
}
async function unlockSubmit() {
  if (lockBusy || !lockedFile) return;
  const a = $("lockPw"); if (!a.value) return lockError(T("unlockEmpty"), a);
  const env = lockedFile, keyP = lockKey(new TextEncoder().encode(a.value), env.salt, env.iter); a.value = "";
  lockBusy = true; lockWorking(true, T("unlockWorking"));
  let text;
  try {
    const key = await keyP; let plain;
    // AES-GCM checks the file is untouched: a wrong password or an edited file both fail here, before anything changes.
    try { plain = new Uint8Array(await crypto.subtle.decrypt({ name: "AES-GCM", iv: env.iv }, key, env.ct)); }
    catch (e) { toast(T("lockWrong"), "x", 5000); a.focus(); return; }
    if (sheetId !== "lock:open" || lockedFile !== env) { plain.fill(0); return; }
    if (plain.length > LIMITS.backupBytes) { plain.fill(0); return void toast(T("errFileTooBig", LIMITS.backupBytes / 1e6), "x"); }
    text = new TextDecoder().decode(plain); plain.fill(0);
  } catch (e) { return void reportError("unlockBackup", e, "errLock"); }
  finally { lockBusy = false; lockWorking(false); }
  closeSheet(); restoreBackupText(text);
}
$("nudge").addEventListener("click", e => {
  const b = e.target.closest("[data-nudge]"); if (!b) return;
  if (b.dataset.nudge === "save") return void saveBackup();
  if (b.dataset.nudge === "moveLater") store.moveSnooze = Date.now(); else store.backupSnooze = Date.now();
  save(); sfx("undo"); renderNudge();
});

/* ================= Settings ================= */
let settingsPane = "";
function segLang(id) {
  return `<div class="seg" role="group" aria-label="${T("language")}" id="${id}"><button type="button" data-lang="en" aria-pressed="${LANG === "en"}">English</button><button type="button" data-lang="ms" aria-pressed="${LANG === "ms"}">Bahasa Melayu</button></div>`;
}
// Settings: only how the app behaves (language, sound, backups, help). Your routine lives in Routine, you in Me.
function renderSettings(keep) {
  const body = $("shBody"), top = keep ? body.scrollTop : 0;
  $("shHead").innerHTML = sheetHead("cog", T("settings"), T("setSub"), null, "--green");
  $("shHead").querySelector(".sh-ico").innerHTML = I.cog;
  $("shClose").onclick = closeSheet;
  const bAge = backupAge(), due = needsBackup();
  body.innerHTML = `
    <div class="set-group nofold"><h3>${T("language")}</h3>${segLang("langSeg")}</div>
    <div class="set-group nofold"><div class="sw-row"><div><h3>${T("sound")}</h3><p>${T("soundHelp")}</p></div>
      <button class="toggle" type="button" role="switch" aria-checked="${soundOn}" data-act="sound" aria-label="${T("sound")}"><i></i></button></div></div>
    <div class="set-group${due ? " start-open" : ""}"><h3>${T("backup")}</h3><p class="bk-last${due ? " due" : ""}">${T("lastBackup", bAge)}</p><p>${T("backupHelp")}</p><p>${T("lockHelp")}</p>
      <div class="row"><button class="btn small" type="button" data-act="backup">${T("downloadBackup")}</button>
        <button class="btn ghost small" type="button" data-act="lockBackup">${T("downloadLocked")}</button>
        <button class="btn ghost small danger-ghost" type="button" data-act="restore">${T("restoreBackup")}</button></div></div>
    <div class="set-group"><h3>${T("share")}</h3><p>${T("shareHelp")}</p><div class="row"><button class="btn small" type="button" data-act="share">${T("shareBtn")}</button></div></div>
    <div class="set-group"><h3>${T("errLog")}</h3><p>${T("errLogHelp")}</p>${errLogHTML()}</div>
    <div class="set-group"><h3>${T("about")}</h3><p>${T("aboutText")}</p><p class="ver">v${APP_VERSION}</p></div>`;
  foldSettings(body);
  if (keep) body.scrollTop = top;
}
// Routine: everything you edit about your day, in one place.
function renderRoutinePage(keep) {
  const body = $("shBody"), top = keep ? body.scrollTop : 0;
  $("shHead").innerHTML = sheetHead("star", T("tabRoutine"), T("routineSub"), null, "--green");
  $("shHead").querySelector(".sh-ico").innerHTML = I.list;
  $("shClose").onclick = closeSheet;
  const habits = BLOCKS.reduce((n, b) => n + b.items.length, 0), L = reminderList(), added = L.filter(x => store.rem[remSig(x)]).length;
  body.innerHTML = `
    <div class="set-group start-open"><h3>${T("yourRoutine")}</h3>
      <p>${T("using")} <span class="pill-ok">${esc(CFG.label || T("custom"))}</span></p>
      <p class="rt-meta">${T("rtCount", BLOCKS.length, habits, Object.keys(WORKOUTS).length)}</p>
      <div class="row"><button class="btn small" type="button" data-act="edit">${T("editRoutine")}</button>
        <button class="btn ghost small" type="button" data-act="editGuide">${T("editGuide")}</button></div>
      <div class="sw-row inline"><div><b>${T("showWo")}</b><span>${T("showWoHelp")}</span></div>
        <button class="toggle" type="button" role="switch" aria-checked="${CFG.showWorkouts !== false}" data-act="toggleWo" aria-label="${T("showWo")}"><i></i></button></div>
      <h4 class="rt-sub">${T("rtFile")}</h4><p>${T("routineLocal")}</p>
      <div class="row"><button class="btn ghost small" type="button" data-act="exportRoutine">${T("downloadRoutine")}</button>
        <button class="btn ghost small danger-ghost" type="button" data-act="importRoutine">${T("importFile")}</button>
        <button class="btn ghost small danger-ghost" type="button" data-act="pasteToggle">${T("pasteInstead")}</button></div>
      ${settingsPane === "paste" ? `<textarea class="field" id="pasteBox" placeholder="${T("pastePh")}"></textarea><div class="row"><button class="btn small danger" type="button" data-act="pasteApply">${T("useThis")}</button></div>` : ""}
      <h4 class="rt-sub">${T("rtStartOver")}</h4><p>${T("rtStartOverHelp")}</p>
      <div class="row"><button class="btn ghost small danger-ghost" type="button" data-act="template">${T("newTemplate")}</button></div>
    </div>
    ${packsSettingsHTML()}
    ${guideHTML()}
    <div class="set-group"><h3>${T("reminders")}</h3><p class="rt-meta">${T("remCount", added, L.length)}</p><p>${T("remShort")}</p><details class="more-help"><summary>${T("remHow")}</summary><p>${T("remHelp")}</p></details>
      ${L.map(remRow).join("")}
      <p class="rem-note">${T("remNote")}</p>
      <div class="row"><button class="btn ghost small" type="button" data-act="ics">${T("icsAll")}</button></div>
      <p>${T("icsHelp")}</p></div>`;
  foldSettings(body);
  if (keep) body.scrollTop = top;
  if (settingsPane === "paste") $("pasteBox").focus();
}
// Me: who you are in Tunas. Your name, Tunas's colour, your level, lifetime stats and the trophy case.
function renderMe(keep) {
  const body = $("shBody"), top = keep ? body.scrollTop : 0, S = lastS || computeAll();
  const got = BADGES.filter(b => b.test(S)).length;
  $("shHead").innerHTML = sheetHead("star", T("tabMe"), T("meSub"), null, "--green");
  $("shHead").querySelector(".sh-ico").innerHTML = I.sprout;
  $("shClose").onclick = closeSheet;
  const stat = (ico, n, label) => `<div class="me-stat"><span class="me-n">${I[ico]}<b>${n}</b></span><span>${label}</span></div>`;
  body.innerHTML = `
    <div class="card me-card">
      <div class="mascot me-av happy" aria-hidden="true">${MASCOT}</div>
      <div class="me-id">
        <label class="sr" for="setName">${T("yourName")}</label>
        <input class="field me-name" id="setName" value="${esc(CFG.name || "")}" placeholder="${T("namePh")}" autocomplete="given-name" maxlength="30">
        <p class="me-lv"><b>${T("level", S.L.n)}</b> <span>${esc(titleOf(S.L.n))}</span></p>
        <div class="bar"><i style="${fillPct(100 * S.L.cur / S.L.span)}"></i><b>${T("xpOf", S.L.cur, S.L.span)}</b></div>
      </div>
    </div>
    <div class="me-stats">
      ${stat("flame", S.streak, T("meStreak"))}${stat("trophy", S.bestStreak, T("meBest"))}
      ${stat("check", S.ticks, T("meTicks"))}${stat("star", S.perfectDays, T("mePerfect"))}
      ${stat("dumb", S.workouts, T("meWorkouts"))}${stat("bolt", S.prs, T("mePRs"))}
    </div>
    <div class="set-group nofold"><h3>${T("tunasColour")}</h3><p>${T("themeHelp")}</p>${themePicker()}</div>
    <section class="me-trophy" aria-labelledby="trophyT"><div class="me-th"><h3 id="trophyT">${T("badges")}</h3><span>${got} / ${BADGES.length}</span></div>
      <div class="bar"><i style="${fillPct(100 * got / BADGES.length)}"></i></div>
      <div class="bgrid" id="bgrid"></div></section>`;
  renderBadges(S);
  $("setName").addEventListener("change", e => { const v = e.target.value.trim().slice(0, 30); const r = { ...RAW, name: v || (LANG === "ms" ? "Kawan" : "Friend") }; if (saveRoutine(r)) { toast(T("nameSaved"), "check"); contextSay(); } });
  if (keep) body.scrollTop = top;
}
// Settings groups fold into one tappable row each; the open ones stay open across re-renders.
const setOpen = new Set(), setShut = new Set();
function foldSettings(body) {
  body.querySelectorAll(":scope > .set-group:not(.nofold)").forEach(g => {
    const h = g.querySelector(":scope > h3"); if (!h) return;
    const key = h.textContent, d = document.createElement("details"); d.className = g.className + " fold";
    if (setOpen.has(key) || (g.classList.contains("start-open") && !setShut.has(key)) || (key === T("yourRoutine") && settingsPane === "paste") || (key === T("packsTitle") && settingsPane.startsWith("rm:"))) d.open = true;
    const sm = document.createElement("summary"); sm.appendChild(h); sm.insertAdjacentHTML("beforeend", '<span class="chev" aria-hidden="true"></span>');
    d.appendChild(sm); while (g.firstChild) d.appendChild(g.firstChild); g.replaceWith(d);
    d.addEventListener("toggle", () => { if (d.open) { setOpen.add(key); setShut.delete(key); } else { setOpen.delete(key); setShut.add(key); } });
  });
}
function errLogHTML() {
  let list = []; try { list = JSON.parse(storeGet(ERR_KEY) || "[]"); } catch (e) {}
  if (!list.length) return `<p class="pill-ok">${T("errLogEmpty")}</p>`;
  return `<ul class="errlog">${list.slice(0, 5).map(x => `<li><b>${esc(new Date(x.t).toLocaleString(locale()))}</b> · ${esc(x.where)}<br>${esc(x.msg)}</li>`).join("")}</ul>
    <div class="row"><button class="btn ghost small" type="button" data-act="copyLog">${T("copyLog")}</button><button class="btn ghost small danger-ghost" type="button" data-act="clearLog">${T("clearLog")}</button></div>`;
}
function loadRoutineText(text) {
  if (String(text || "").length > LIMITS.routineBytes) { toast(T("errFileTooBig", LIMITS.routineBytes / 1e6), "x"); return false; }
  let r; try { r = JSON.parse(text); } catch (e) { toast(T("badFile"), "x"); return false; }
  const err = validateRoutine(r); if (err) { toast(esc(err), "x"); return false; }
  r = clampText(r);
  if (!saveRoutine(r)) return false;
  lastS = null; prevCleared = null; settingsPane = ""; store.welcomed = true; save();
  if (!$("welcome").hidden) closeWelcome();
  renderGuide(); refresh(true); toast(T("loaded", esc(r.label || T("custom"))), "check"); sfx("clear");
  return true;
}
function downloadText(name, text, type) {
  try {
    const blob = new Blob([text], { type });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
    if (name.startsWith("tunas-backup")) { store.lastBackup = Date.now(); save(); }
    return true;
  } catch (e) { reportError("download", e, "errDownload"); return false; }
}
const download = (name, obj) => downloadText(name, JSON.stringify(obj, null, 2), "application/json");
function setLang(l) {
  if (!window.TUNAS_I18N[l] || l === LANG) return;
  LANG = l; try { localStorage.setItem(LANG_KEY, l); } catch (e) {}
  if (RAW_IS_DEFAULT) { RAW = defaultRoutine(); applyRoutine(RAW); }
  applyStatic(); renderGuide(); lastS = null; prevCleared = null; refresh(true);
}
function settingsAction(act, el) {
  if (act === "addPacks" || act === "woSetup" || act === "skinSetup") {
    PK = { sel: new Set(), step: "", fit: normFit(RAW.fitness), skin: normSkin(RAW.skin) };
    return openSheet(act === "addPacks" ? "packs" : act === "woSetup" ? "wosetup" : "skinsetup"); }
  if (act === "rmPack") { const id = el && el.dataset.pack; if (!id) return;
    if (settingsPane !== "rm:" + id) { settingsPane = "rm:" + id; return renderSheet(true); }
    settingsPane = ""; return removePackNow(id); }
  if (act === "tickAll") return tickAll();
  if (act === "toggleWo") { const r = { ...RAW, showWorkouts: CFG.showWorkouts === false }; if (!saveRoutine(r)) return renderSheet(true); lastS = null; prevCleared = null; refresh(true); toast(r.showWorkouts ? T("woShown") : T("woHidden"), "check"); return; }
  if (act === "edit") return openEditor();
  if (act === "editGuide") return openEditor("guide");
  if (act === "template") { closeSheet(); return openWelcome(2, true); }
  if (act === "importRoutine") return $("fileRoutine").click();
  if (act === "pasteToggle") { settingsPane = settingsPane === "paste" ? "" : "paste"; return renderSheet(true); }
  if (act === "pasteApply") return loadRoutineText($("pasteBox").value);
  if (act === "copyLog") { const txt = storeGet(ERR_KEY) || "[]"; (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(() => toast(T("copiedLog"), "check")).catch(() => toast(esc(txt).slice(0, 400), "x", 8000)); return; }
  if (act === "clearLog") { storeDel(ERR_KEY); return renderSheet(true); }
  if (act === "exportRoutine") return download(`${slug(CFG.label || "routine")}.json`, RAW);
  if (act === "ics") return downloadText("tunas-reminders.ics", buildICS(), "text/calendar");
  if (act === "share") return shareApp();
  if (act === "backup") { saveBackup(); return renderSheet(true); }
  if (act === "lockBackup") return hasCrypto() ? openSheet("lock:save") : void toast(T("lockNoCrypto"), "x");
  if (act === "restore") return $("fileBackup").click();
  if (act === "sound") { toggleSound(); return renderSheet(true); }
}
$("sheet").addEventListener("click", e => { if (sheetId === "packs" || sheetId === "wosetup" || sheetId === "skinsetup") { const wo = e.target.closest("[data-wo]"); if (wo) { woToggle(PK.fit, wo); return renderSheet(true); }
    const sk = e.target.closest("[data-sk]"); if (sk) { skinToggle(PK.skin, sk); return renderSheet(true); }
    if (e.target.closest("[data-wosave]")) return saveWoSetup();
    if (e.target.closest("[data-sksave]")) return saveSkinSetup(); }
  if (sheetId === "packs") { const pk = e.target.closest("[data-pack]"); if (pk) { togglePack(PK.sel, pk.dataset.pack); return renderPackSheet(true); }
    if (e.target.closest("[data-packback]")) { const L = pkSteps(); PK.step = L[Math.max(0, L.indexOf(PK.step) - 1)]; return renderPackSheet(false); }
    if (e.target.closest("[data-packgo]")) return addPacksNow(); }
  const b = e.target.closest("[data-lang]"); if (b) { setLang(b.dataset.lang); return; }
  const t = e.target.closest("[data-theme-pick]"); if (t) { pickTheme(t.dataset.themePick); if (sheetId === "me") renderSheet(true); } });
function readFile(input, cb, maxBytes) {
  const f = input.files && input.files[0]; if (!f) return;
  if (maxBytes && f.size > maxBytes) { input.value = ""; toast(T("errFileTooBig", maxBytes / 1e6), "x"); return; }
  const r = new FileReader();
  r.onload = () => { input.value = ""; try { cb(String(r.result)); } catch (e) { reportError("import", e, "errReadFile"); } };
  r.onerror = () => { input.value = ""; reportError("readFile", r.error, "errReadFile"); };
  r.readAsText(f);
}
$("fileRoutine").addEventListener("change", e => readFile(e.target, loadRoutineText, LIMITS.routineBytes));
// Plain backups and unlocked ones both end up here, so they get the same checks and limits.
function restoreBackupText(text) {
  if (new TextEncoder().encode(text).length > LIMITS.backupBytes) return void toast(T("errFileTooBig", LIMITS.backupBytes / 1e6), "x");
  let b; try { b = JSON.parse(text); } catch (err) { return toast(T("notBackup"), "x"); }
  if (!b || b.app !== "tunas" || !b.data || typeof b.data.days !== "object") return toast(T("notBackup"), "x");
  // Restore only if it can actually be saved; otherwise keep the current data untouched.
  const prevStore = store; store = b.data; normStore(); store.welcomed = true;
  if (!save()) { store = prevStore; return; }
  if (b.routine && !validateRoutine(b.routine)) { if (saveRoutine(clampText(b.routine))) renderGuide(); }
  if (!$("welcome").hidden) closeWelcome();
  lastS = null; prevCleared = null; refresh(true); toast(T("restored"), "check");
}
// Locked files are bigger (base64), so the file limit here is higher; plain ones are held to 4 MB in restoreBackupText.
$("fileBackup").addEventListener("change", e => readFile(e.target, text => {
  let b = null; try { b = JSON.parse(text); } catch (err) {}
  if (b && b.tunas === "enc-backup") return openLocked(b);
  restoreBackupText(text);
}, LIMITS.lockedBytes));
/* ================= Bottom navigation ================= */
// Today, History, Badges and Settings are one tap away, even with a sheet open; the tab bar sits above sheets.
const ROUTINE_SHEETS = ["routine", "editor", "packs", "wosetup", "skinsetup"];
const tabOf = id => !id ? "home" : id === "history" || id.startsWith("day:") ? "history" : id === "me" ? "me"
  : ROUTINE_SHEETS.includes(id) ? "routine" : id === "settings" || id.startsWith("lock:") ? "settings" : "home";
function syncTabs() {
  const cur = tabOf(sheetId);
  document.querySelectorAll("#tabbar [data-tab]").forEach(b => { if (b.dataset.tab === cur) b.setAttribute("aria-current", "page"); else b.removeAttribute("aria-current"); });
}
function goTab(tab) {
  if (sheetId === "editor" && ED && ED.dirty) return requestCloseEditor(); // unsaved edits ask first
  if (tab === "home") { if (sheetId) closeSheet(); else window.scrollTo({ top: 0, behavior: reduced() ? "auto" : "smooth" }); return; }
  if (sheetId === tab) { $("shBody").scrollTo({ top: 0, behavior: reduced() ? "auto" : "smooth" }); return; }
  audio(); if (tab === "settings" || tab === "routine") settingsPane = "";
  if (!sheetId) return openSheet(tab);
  // Switch the open sheet in place: no close-and-reopen animation, back button still closes it.
  parentSheet = null; ED = null; lockedFile = null; sheetId = tab; renderSheet(false); $("shBody").scrollTop = 0;
  const x = $("shClose"); x && x.focus({ preventScroll: true });
}
$("tabbar").addEventListener("click", e => { const b = e.target.closest("[data-tab]"); if (b) goTab(b.dataset.tab); });
["Home", "Routine", "History", "Me", "Settings"].forEach((k, n) => { $("tb" + k).innerHTML = I[["home", "list", "chart", "sprout", "cog"][n]]; });

/* ================= Routine editor ================= */
let ED = null, draftTimer = null;
const DRAFT_KEY = "tunas-editor-draft";
function openEditor(tab) {
  const draft = clone(RAW); draft.focus ||= {}; draft.workouts ||= {}; draft.weekly ||= []; draft.tips ||= [];
  draft.guide = draft.guide && typeof draft.guide === "object" ? draft.guide : { title: "", sections: [] };
  draft.guide.title ||= ""; draft.guide.sections = (draft.guide.sections || []).map(g => ({ ...g, title: g.title || "", lines: g.lines || [] }));
  const base = JSON.stringify(draft);
  // A draft left from last time (app closed, phone died, crash)? Offer to bring it back.
  let offer = null; const saved = loadJSON(DRAFT_KEY, v => v && v.draft && Array.isArray(v.draft.blocks)).value;
  if (saved && JSON.stringify(saved.draft) !== base) offer = saved; else if (saved) storeDel(DRAFT_KEY);
  ED = { draft, base, dirty: false, ask: false, offer, tab: ["sections", "workouts", "weekly", "guide"].includes(tab) ? tab : "sections", day: routineDate().getDay(), more: new Set(), iconFor: null, confirm: null, focusTo: null };
  if (sheetId) { sheetId = "editor"; renderSheet(false); } else openSheet("editor");
  $("shBody").scrollTop = 0;
}
// Mark the draft as changed and cache it on the phone (debounced), so nothing is lost before Save.
function markDirty() {
  if (!ED) return;
  ED.dirty = JSON.stringify(ED.draft) !== ED.base;
  clearTimeout(draftTimer);
  draftTimer = setTimeout(() => { if (!ED) return; if (ED.dirty) storeSet(DRAFT_KEY, JSON.stringify({ draft: ED.draft, at: Date.now() })); else storeDel(DRAFT_KEY); }, 400);
  const hint = $("edDirty"); if (hint) hint.hidden = !ED.dirty;
}
function requestCloseEditor() {
  if (!ED) return;
  if (ED.dirty) { ED.ask = true; renderEditor(true); const f = document.querySelector(".ed-foot"); f && f.scrollIntoView({ block: "end" }); const k = $("edKeepBtn"); k && k.focus({ preventScroll: true }); return; }
  exitEditor(false);
}
function exitEditor(discard) { clearTimeout(draftTimer); if (discard) storeDel(DRAFT_KEY); ED = null; sheetId = "routine"; renderSheet(false); }
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
  $("shHead").innerHTML = sheetHead("cog", T("edTitle"), `${T("edSub")} <span class="ed-dirty" id="edDirty" ${ED.dirty ? "" : "hidden"}>● ${T("edUnsaved")}</span>`, null, "--green");
  $("shHead").querySelector(".sh-ico").innerHTML = I.pencil;
  $("shClose").onclick = requestCloseEditor;
  const TAB_T = { sections: "edSections", workouts: "edWorkouts", weekly: "edWeekly", guide: "edGuide" };
  const tabs = Object.keys(TAB_T).map(t => `<button type="button" data-ed="tab" data-tab="${t}" aria-pressed="${ED.tab === t}">${T(TAB_T[t])}</button>`).join("");
  let h = ED.offer ? `<div class="ed-restore" role="status"><div><b>${T("edRestoreQ", esc(new Date(ED.offer.at).toLocaleString(locale(), { weekday: "short", hour: "numeric", minute: "2-digit" })))}</b></div>
    <div class="row"><button class="btn small" type="button" data-ed="restoreDraft">${T("edRestore")}</button><button class="btn ghost small danger-ghost" type="button" data-ed="dropDraft">${T("edDiscard")}</button></div></div>` : "";
  h += `<div class="seg" role="group">${tabs}</div>`;
  if (ED.tab === "sections") {
    const woDays = Object.keys(D.workouts || {}).length;
    h += `<p class="ed-help">${T("edStarHelp")}</p>`;
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
            ${it.useFocus ? `<div class="ed-focus-t">${esc(T("edFocus"))}</div>` : `<textarea class="field ed-name" rows="1" data-path="${p}.title" placeholder="${T("edHabitPh")}" ${ED.focusTo === p + ".title" ? "data-autofocus" : ""}>${esc(it.title)}</textarea>`}
            <input class="field ed-time" data-path="${p}.time" value="${esc(it.time || "")}" placeholder="${T("edTimeAny")}" aria-label="${T("edTimePh")}">
            ${edBtn("more", `data-bi="${bi}" data-ii="${ii}" aria-expanded="${open}"`, I.dots, T("edMore"))}</div>
          ${open ? `<div class="ed-more">
            ${it.useFocus ? `<p>${T("edFocusEdit")}</p>${[1,2,3,4,5,6,0].map(k => `<label class="ed-flabel">${weekdayName(k, "short")}<input class="field" data-path="focus.${k}.title" value="${esc(((D.focus || {})[k] || {}).title || "")}" placeholder="${T("edFocusPh")}"></label>`).join("")}`
              : `<input class="field" data-path="${p}.note" value="${esc(it.note || "")}" placeholder="${T("edNotePh")}">`}
            ${weekdays(it.onDays) ? `<label class="ed-check"><input type="checkbox" data-ed-check="ondays" data-bi="${bi}" data-ii="${ii}" checked>${T("edOnDays", weekdays(it.onDays).map(k => weekdayName(k, "short")).join(", "))}</label>` : ""}
            <label class="ed-count">${T("edCount")}<input class="field" type="number" inputmode="numeric" min="0" max="99" step="1" data-path="${p}.target" value="${goalOf(it.target) || ""}" placeholder="–"></label>
            <p class="ed-count-help">${T("edCountHelp")}</p>
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
        <div class="ed-row">${ED.confirm === `wo.${k}` ? `<button class="btn small danger-btn" type="button" data-ed="del" data-key="wo.${k}" data-k="${k}">${T("edSure")}</button>` : `<button class="btn ghost small danger-ghost" type="button" data-ed="del" data-key="wo.${k}" data-k="${k}">${T("edRemoveWo")}</button>`}</div></div>`;
    }
  } else if (ED.tab === "guide") {
    h += guideEditorHTML(D);
  } else {
    h += `<p class="ed-help">${T("edWeeklyHelp")}</p>`;
    D.weekly.forEach((w, wi) => {
      h += `<div class="ed-row ed-wk"><input class="field" data-path="weekly.${wi}.title" value="${esc(w.title)}" placeholder="${T("edWeeklyPh")}" ${ED.focusTo === `weekly.${wi}.title` ? "data-autofocus" : ""}>${delBtn(`wk.${wi}`, `data-wi="${wi}"`)}</div>`;
    });
    h += `<button class="btn ghost small ed-add" type="button" data-ed="addWeekly">${I.plus}${T("edAddWeekly")}</button>`;
  }
  h += ED.ask
    ? `<div class="ed-foot ask" role="alertdialog" aria-labelledby="edAskT"><div class="ed-ask-t"><b id="edAskT">${T("edDiscardQ")}</b><span>${T("edDiscardSub")}</span></div>
        <div class="ed-ask-row"><button class="btn ghost" type="button" data-ed="keep" id="edKeepBtn">${T("edKeep")}</button><button class="btn danger-btn" type="button" data-ed="discard">${T("edDiscard")}</button><button class="btn" type="button" data-ed="save">${T("save")}</button></div></div>`
    : `<div class="ed-foot"><button class="btn ghost" type="button" data-ed="cancel">${T("cancel")}</button><button class="btn" type="button" data-ed="save">${T("save")}</button></div>`;
  body.innerHTML = h; body.querySelectorAll("textarea.ed-name").forEach(fitName); if (keep) body.scrollTop = top;
  const af = body.querySelector("[data-autofocus]"); if (af) { af.focus(); af.scrollIntoView({ block: "center" }); } ED.focusTo = null;
}
// Guide tab: the routine's guide (titled sections of lines) and its daily tips.
function guideEditorHTML(D) {
  const G = D.guide, line = (path, val, ph, af) => `<textarea class="field ed-name ed-line" rows="1" data-path="${path}" placeholder="${ph}" ${af ? "data-autofocus" : ""}>${esc(val)}</textarea>`;
  let h = `<p class="ed-help">${T("edGuideHelp")}</p>
    <label class="ed-flabel wide">${T("edGuideTitle")}<input class="field" data-path="guide.title" value="${esc(G.title)}" placeholder="${T("guide")}"></label>`;
  G.sections.forEach((g, si) => {
    const p = `guide.sections.${si}`;
    h += `<div class="ed-sec"><div class="ed-row"><input class="field" data-path="${p}.title" value="${esc(g.title)}" placeholder="${T("edGSecPh")}" ${ED.focusTo === p + ".title" ? "data-autofocus" : ""}>
      ${edBtn("gsecUp", `data-si="${si}"`, I.up, T("edUp"))}${edBtn("gsecDown", `data-si="${si}"`, I.down, T("edDown"))}${delBtn(`gsec.${si}`, "")}</div>`;
    g.lines.forEach((l, li) => {
      h += `<div class="ed-row ed-gline">${line(`${p}.lines.${li}`, l, T("edGLinePh"), ED.focusTo === `${p}.lines.${li}`)}
        ${edBtn("glineUp", `data-si="${si}" data-li="${li}"`, I.up, T("edUp"))}${delBtn(`gline.${si}.${li}`, "")}</div>`;
    });
    h += `<button class="btn ghost small ed-add" type="button" data-ed="glineAdd" data-si="${si}">${I.plus}${T("edAddLine")}</button></div>`;
  });
  h += `<button class="btn ghost ed-add" type="button" data-ed="gsecAdd">${I.plus}${T("edAddGSec")}</button>
    <h4 class="ed-subh">${T("edTips")}</h4><p class="ed-help">${T("edTipsHelp")}</p>`;
  D.tips.forEach((tp, ti) => {
    h += `<div class="ed-row ed-gline">${line(`tips.${ti}`, tp, T("edTipPh"), ED.focusTo === `tips.${ti}`)}
      ${edBtn("tipUp", `data-ti="${ti}"`, I.up, T("edUp"))}${edBtn("tipDown", `data-ti="${ti}"`, I.down, T("edDown"))}${delBtn(`tip.${ti}`, "")}</div>`;
  });
  return h + `<button class="btn ghost small ed-add" type="button" data-ed="tipAdd">${I.plus}${T("edAddTip")}</button>`;
}
function swap(arr, i, j) { if (j < 0 || j >= arr.length) return; [arr[i], arr[j]] = [arr[j], arr[i]]; }
// Habit names wrap onto a second line instead of being cut off; they stay single-line text.
function fitName(t) { if (!t.offsetParent) return; t.style.height = "auto"; t.style.height = t.scrollHeight + 4 + "px"; }
function editorInput(e) {
  const t = e.target, path = t.dataset && t.dataset.path; if (!path || !ED) return;
  if (t.tagName === "TEXTAREA" && t.classList.contains("ed-name")) { if (/[\r\n]/.test(t.value)) t.value = t.value.replace(/[\r\n]+/g, " "); fitName(t); }
  setPath(ED.draft, path, String(t.value).slice(0, LIMITS.text));
  if (/^blocks\.\d+\.items\.\d+\.target$/.test(path)) { const ks = path.split("."), it = ED.draft.blocks[+ks[1]].items[+ks[3]], g = goalOf(t.value); if (g) it.target = g; else delete it.target; }
  let m = /^blocks\.(\d+)\.(from|to)$/.exec(path); if (m) ED.draft.blocks[+m[1]]._rangeDirty = true;
  m = /^workouts\.(\d+)\.from$/.exec(path); if (m) ED.draft.workouts[m[1]]._timeDirty = true;
  markDirty();
}
function editorClick(e) {
  const chk = e.target.closest("[data-ed-check]");
  if (chk) {
    const D = ED.draft, kind = chk.dataset.edCheck;
    if (kind === "alt") { const it = D.blocks[+chk.dataset.bi].items[+chk.dataset.ii]; it.everyOtherDay = chk.checked; }
    if (kind === "ondays" && !chk.checked) { delete D.blocks[+chk.dataset.bi].items[+chk.dataset.ii].onDays; markDirty(); return renderEditor(true); }
    if (kind === "skip") { const it = D.blocks[+chk.dataset.bi].items[+chk.dataset.ii]; it.hideOnDays = chk.checked ? Object.keys(D.workouts || {}).map(Number) : []; }
    if (kind === "bw") { D.workouts[chk.dataset.k].exercises[+chk.dataset.ei].bodyweight = chk.checked; }
    markDirty(); return;
  }
  const b = e.target.closest("[data-ed]"); if (!b) return;
  const D = ED.draft, a = b.dataset.ed, bi = +b.dataset.bi, ii = +b.dataset.ii, k = b.dataset.k, ei = +b.dataset.ei, si = +b.dataset.si, li = +b.dataset.li, ti = +b.dataset.ti;
  const full = (n, max) => { if (n >= max) { toast(T("errGuideBig"), "x"); return true; } return false; };
  if (a !== "del") ED.confirm = null;
  if (a !== "keep" && a !== "discard" && a !== "save") ED.ask = false;
  const tooMany = n => { if (n >= LIMITS.items) { toast(T("errTooBig"), "x"); return true; } return false; };
  switch (a) {
    case "keep": ED.ask = false; break;
    case "discard": return exitEditor(true);
    case "restoreDraft": ED.draft = ED.offer.draft; ED.offer = null; ED.more.clear(); break;
    case "dropDraft": ED.offer = null; storeDel(DRAFT_KEY); break;
    case "tab": ED.tab = b.dataset.tab; break;
    case "iconMenu": ED.iconFor = ED.iconFor === bi ? null : bi; break;
    case "setIcon": D.blocks[bi].icon = b.dataset.icon; ED.iconFor = null; break;
    case "secUp": swap(D.blocks, bi, bi - 1); ED.more.clear(); break;
    case "secDown": swap(D.blocks, bi, bi + 1); ED.more.clear(); break;
    case "addSec": { if (D.blocks.length >= LIMITS.sections) { toast(T("errTooBig"), "x"); break; } const from = 12 * 60; D.blocks.push({ id: uid(), title: T("edNewSection"), icon: "star", from: hhmm(from), to: hhmm(from + 60), remind: hhmm(from), _rangeDirty: true, items: [{ id: uid(), title: "" }] });
      ED.focusTo = `blocks.${D.blocks.length - 1}.title`; break; }
    case "addItem": if (tooMany(D.blocks[bi].items.length)) break; D.blocks[bi].items.push({ id: uid(), title: "", time: "" }); ED.focusTo = `blocks.${bi}.items.${D.blocks[bi].items.length - 1}.title`; break;
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
    case "gsecAdd": if (full(D.guide.sections.length, LIMITS.guideSections)) break; D.guide.sections.push({ title: "", lines: [""] }); ED.focusTo = `guide.sections.${D.guide.sections.length - 1}.title`; break;
    case "gsecUp": swap(D.guide.sections, si, si - 1); break;
    case "gsecDown": swap(D.guide.sections, si, si + 1); break;
    case "glineAdd": { const L = D.guide.sections[si].lines; if (full(L.length, LIMITS.guideLines)) break; L.push(""); ED.focusTo = `guide.sections.${si}.lines.${L.length - 1}`; break; }
    case "glineUp": swap(D.guide.sections[si].lines, li, li - 1); break;
    case "tipAdd": if (full(D.tips.length, LIMITS.tips)) break; D.tips.push(""); ED.focusTo = `tips.${D.tips.length - 1}`; break;
    case "tipUp": swap(D.tips, ti, ti - 1); break;
    case "tipDown": swap(D.tips, ti, ti + 1); break;
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
      else if (kind === "gsec") D.guide.sections.splice(+x, 1);
      else if (kind === "gline") D.guide.sections[+x].lines.splice(+y, 1);
      else if (kind === "tip") D.tips.splice(+x, 1);
      break; }
    case "cancel": return requestCloseEditor();
    case "save": return saveEditor();
  }
  markDirty();
  renderEditor(true);
}
function saveEditor() {
  const r = clone(ED.draft);
  r.blocks = (r.blocks || []).map(b => {
    b.title = String(b.title || "").trim() || T("edNewSection"); b.id = b.id || uid();
    b.items = (b.items || []).filter(i => i.useFocus || String(i.title || "").trim()).map(i => { i.id = i.id || uid(); i.title = String(i.title || "").trim(); if (!i.note) delete i.note; return i; });
    if (b._rangeDirty) b.range = fmtRange(tm(b.from, 0), tm(b.to, 0));
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
  const trimmed = a => (a || []).map(x => String(x || "").trim()).filter(Boolean);
  r.tips = trimmed(r.tips);
  const gs = ((r.guide || {}).sections || []).map(g => ({ ...g, title: String(g.title || "").trim(), lines: trimmed(g.lines) })).filter(g => g.title || g.lines.length).map(g => ({ ...g, title: g.title || T("guide") }));
  r.guide = gs.length ? { ...r.guide, title: String(r.guide.title || "").trim(), sections: gs } : null;
  if (RAW_IS_DEFAULT || !r.label) r.label = T("myRoutine");
  const err = validateRoutine(r); if (err) { toast(esc(err), "x"); return; }
  if (!saveRoutine(clampText(r))) return; // error already shown; the draft stays open and cached
  clearTimeout(draftTimer); storeDel(DRAFT_KEY);
  ED = null; lastS = null; prevCleared = null; store.welcomed = true; save();
  renderGuide(); closeSheet(); refresh(); toast(T("saved"), "check"); sfx("clear"); jump($("mascot"));
}

/* ================= Welcome ================= */
const newWel = (step, switching) => ({ step: step || 1, tpls: new Set(["worker"]), includeWo: true, switching: !!switching, name: switching ? (CFG.name || "") : "",
  packs: new Set(), fit: normFit(RAW.fitness), skin: normSkin(RAW.skin), wake: (RAW.day && RAW.day.wake) || "06:30", sleep: (RAW.day && RAW.day.sleep) || "23:00", busy: true, busyFrom: "08:30", busyTo: "17:00" });
let WEL = newWel(1);
function countHabits(r) { return (r.blocks || []).reduce((s, b) => s + (b.items || []).length, 0); }
function openWelcome(step, switching) {
  WEL = newWel(step, switching);
  $("welcome").hidden = false; document.body.classList.add("locked"); renderWelcome();
}
function closeWelcome() { $("welcome").hidden = true; document.body.classList.remove("locked"); }
function renderWelcome() {
  const el = $("welcome");
  if (WEL.step === 1) {
    el.innerHTML = `<div class="w-in"><div class="mascot cheer" id="wMascot">${MASCOT}</div><h2 class="green">${T("wHi")}</h2><p>${T("wSub")}</p>
      ${segLang("wLang")}
      <div class="w-label">${T("wTheme")}</div>${themePicker()}
      <label class="w-label" for="wName">${T("wNameQ")}</label><input class="field w-name" id="wName" value="${esc(WEL.name)}" placeholder="${T("namePh")}" maxlength="30" autocomplete="given-name">
      <button class="btn" type="button" id="wNext">${T("next")}</button>
      <div class="w-links one"><button class="linkish" type="button" id="wBackup">${T("wHaveBackup")}</button></div></div>`;
    $("wBackup").onclick = () => $("fileBackup").click();
    $("wName").addEventListener("input", e => { WEL.name = e.target.value; });
    $("wName").addEventListener("keydown", e => { if (e.key === "Enter") $("wNext").click(); });
    $("wNext").onclick = () => { WEL.step = 2; renderWelcome(); };
    jump($("wMascot"));
  } else if (WEL.step === 2) { renderWelcomePacks(el);
  } else if (WEL.step === 3) { renderWelcomeDay(el);
  } else if (WEL.step === "wo") { renderWelcomeWorkout(el);
  } else if (WEL.step === "skin") { renderWelcomeSkin(el);
  } else {
    const anyWo = [...WEL.tpls].some(id => Object.keys((window.TUNAS_TEMPLATES.find(t => t.id === id) || {}).routine?.workouts || {}).length);
    el.innerHTML = `<div class="w-in wide"><h2>${T("wPick")}</h2><p>${T("wPickMulti")}</p>
      <div class="tpl-grid">${window.TUNAS_TEMPLATES.filter(t => !t.hidden).map(t => { const r = window.resolveTemplate(t.routine, LANG);
        return `<button type="button" class="tpl" data-tpl="${t.id}" aria-pressed="${WEL.tpls.has(t.id)}"><span class="tpl-ico">${I[t.icon]}</span><span class="tpl-tick">${I.check}</span><b>${esc(window.resolveTemplate(t.title, LANG))}</b><span>${esc(window.resolveTemplate(t.desc, LANG))}</span><small>${T("wHabits", countHabits(r), Object.keys(r.workouts || {}).length)}</small></button>`; }).join("")}</div>
      <p class="w-mix">${T("wMixNote", WEL.tpls.size)}</p>
      ${anyWo ? `<div class="sw-row w-wo"><div><b>${T("wIncludeWo")}</b><span>${T("wIncludeWoHelp")}</span></div><button class="toggle" type="button" role="switch" id="wWo" aria-checked="${WEL.includeWo}" aria-label="${T("wIncludeWo")}"><i></i></button></div>` : ""}
      <button class="btn" type="button" id="wGo">${T("wGo")}</button>
      <div class="w-links"><button class="linkish" type="button" id="wBack">${T("back")}</button>${WEL.switching ? "" : `<button class="linkish" type="button" id="wFile">${T("wHaveFile")}</button>`}</div></div>`;
    el.querySelectorAll("[data-tpl]").forEach(b => b.onclick = () => { const id = b.dataset.tpl;
      if (WEL.tpls.has(id)) { if (WEL.tpls.size > 1) WEL.tpls.delete(id); } else WEL.tpls.add(id);
      const top = el.scrollTop; renderWelcome(); el.scrollTop = top; });
    if ($("wWo")) $("wWo").onclick = () => { WEL.includeWo = !WEL.includeWo; $("wWo").setAttribute("aria-checked", WEL.includeWo); };
    $("wBack").onclick = () => { WEL.step = 2; renderWelcome(); el.scrollTop = 0; };
    if ($("wFile")) $("wFile").onclick = () => $("fileRoutine").click();
    $("wGo").onclick = finishWelcome;
  }
}
$("welcome").addEventListener("click", e => { const b = e.target.closest("[data-lang]"); if (b) { setLang(b.dataset.lang); renderWelcome(); return; }
  const t = e.target.closest("[data-theme-pick]"); if (t) { applyTheme(t.dataset.themePick, true); sfx("ding"); renderWelcome(); } });
// Combine several templates: same-id sections share habits (no duplicates), other sections are added in time order.
function mergeRoutines(list) {
  if (list.length === 1) return list[0];
  const out = clone(list[0]); out.workouts ||= {}; out.weekly ||= []; out.focus ||= {}; out.tips ||= [];
  out.label = list.map(r => r.label).join(" + ");
  const blocks = new Map(out.blocks.map(b => [b.id, b]));
  list.slice(1).forEach(r => {
    (r.blocks || []).forEach(b => { if (blocks.has(b.id)) { const t = blocks.get(b.id), ids = new Set(t.items.map(i => i.id)); b.items.forEach(i => { if (!ids.has(i.id)) t.items.push(clone(i)); }); } else blocks.set(b.id, clone(b)); });
    Object.entries(r.workouts || {}).forEach(([k, w]) => { if (!out.workouts[k]) out.workouts[k] = clone(w); });
    (r.weekly || []).forEach(w => { if (!out.weekly.some(x => x.id === w.id)) out.weekly.push(clone(w)); });
    Object.entries(r.focus || {}).forEach(([k, f]) => { if (!out.focus[k]) out.focus[k] = f; });
    out.tips.push(...(r.tips || [])); if (!out.guide && r.guide) out.guide = r.guide; if (!out.away && r.away) out.away = r.away;
  });
  const wrap = m => (m < 4 * 60 ? m + 1440 : m);
  out.blocks = [...blocks.values()].sort((x, y) => wrap(tm(x.from, 0)) - wrap(tm(y.from, 0)));
  return out;
}
function finishWelcome() {
  let ids = [...WEL.tpls];
  if (ids.includes("student") && ids.includes("worker")) ids = ["studywork", ...ids.filter(x => x !== "student" && x !== "worker" && x !== "studywork")];
  const order = window.TUNAS_TEMPLATES.map(t => t.id); ids.sort((x, y) => order.indexOf(x) - order.indexOf(y));
  const r = mergeRoutines(ids.map(id => window.resolveTemplate(window.TUNAS_TEMPLATES.find(t => t.id === id).routine, LANG)));
  r.showWorkouts = !!WEL.includeWo;
  welcomeDone(r);
}
function welcomeDone(r) {
  r.name = String(WEL.name || "").trim().slice(0, 30) || (LANG === "ms" ? "Kawan" : "Friend");
  const err = validateRoutine(r); if (err) { toast(esc(err), "x"); return; }
  if (!saveRoutine(clampText(r))) return;
  store.welcomed = true; save(); lastS = null; prevCleared = null;
  closeWelcome(); renderGuide(); refresh(); confetti(); sfx("clear"); askPersist();
  say(T("wWelcome", firstName()), "", "cheer", 5000); jump($("mascot"));
}

/* ================= Habit packs ================= */
// A pack adds habits, weekly tasks, tips and guide topics, each tagged with the pack id so it can be removed again.
const DEFAULT_DAY = { wake: "06:30", sleep: "23:00", busy: null };
const R = x => window.resolveTemplate(x, LANG);
const packById = id => (window.TUNAS_PACKS || []).find(p => p.id === id);
const packOrder = ids => (window.TUNAS_PACKS || []).map(p => p.id).filter(id => ids.includes(id));
const clock12 = m => { m = ((m % 1440) + 1440) % 1440; const h = Math.floor(m / 60); return `${(h % 12) || 12}:${pad(m % 60)}`; };
const dayWrap = m => { m = ((m % 1440) + 1440) % 1440; return m < 240 ? m + 1440 : m; }; // the routine day starts at 4am
function togglePack(set, id) { if (set.has(id)) set.delete(id); else if (packById(id)) set.add(id); }
// Wake, sleep and fixed (work/class) hours → the four parts of the day, in minutes.
function dayPlan(day) {
  const d = { ...DEFAULT_DAY, ...(day && typeof day === "object" ? day : {}) };
  const W = Math.max(270, tm(d.wake, 390)); let S = tm(d.sleep, 1380); if (S <= W + 360) S += 1440;
  let B1 = Array.isArray(d.busy) ? tm(d.busy[0], null) : null, B2 = Array.isArray(d.busy) ? tm(d.busy[1], null) : null;
  if (B1 == null || B2 == null || B1 === B2) B1 = B2 = null; else if (B2 < B1) B2 += 1440;
  const mFrom = W - 30, mTo = B1 != null && B1 > W + 30 && B1 < W + 300 ? B1 : W + 150;
  const dTo = B2 != null && B2 > mTo + 60 ? Math.min(B2, 1320) : Math.max(17 * 60, mTo + 180);
  const nFrom = Math.min(1410, Math.max(dTo + 60, S - 60));
  return { morning: { from: mFrom, to: mTo, anchor: W }, day: { from: mTo, to: dTo, anchor: Math.min(Math.max(750, mTo), dTo - 30) },
    evening: { from: dTo, to: nFrom, anchor: dTo }, night: { from: nFrom, to: mFrom + 1440, anchor: nFrom } };
}
const blockSpan = b => { const f = dayWrap(tm(b.from, 0)); let t = dayWrap(tm(b.to, 0)); if (t <= f) t += 1440; return [f, t]; };
// The section a pack habit goes into: same id, else the one covering that time, else a new one that doesn't overlap.
function slotBlock(r, slot, plan, made) {
  let b = r.blocks.find(x => x.id === slot); if (b) return b;
  const P = plan[slot], a = dayWrap(P.anchor);
  b = r.blocks.find(x => { const [f, t] = blockSpan(x); return a >= f && a < t; }); if (b) return b;
  let from = dayWrap(P.from), to = dayWrap(P.to); if (to <= from) to += 1440;
  r.blocks.forEach(x => { const [f, t] = blockSpan(x); if (f > from && f < to) to = f; if (from >= f && from < t) from = t; });
  if (r.blocks.length && (to - from < 30 || r.blocks.length >= LIMITS.sections))
    return r.blocks.reduce((best, x) => Math.abs(blockSpan(x)[0] - a) < Math.abs(blockSpan(best)[0] - a) ? x : best);
  const S = R(window.TUNAS_SLOTS[slot]), rem = Math.min(Math.max(a, from), to - 15);
  b = { id: r.blocks.some(x => x.id === slot) ? uid() : slot, title: S.title, icon: S.icon, from: hhmm(from), to: hhmm(to), remind: hhmm(rem), say: S.say, items: [] };
  r.blocks.push(b); made.add(b); return b;
}
function addPacks(base, ids) {
  const r = clone(base); r.blocks ||= []; r.weekly ||= []; r.tips ||= []; r.workouts ||= {};
  const plan = dayPlan(r.day), made = new Set(); let skipped = 0;
  const anchorOf = (b, slot) => made.has(b) ? plan[slot].anchor : dayWrap(tm(b.remind, tm(b.from, plan[slot].anchor)));
  packOrder(ids).forEach(id => {
    const P = R(packById(id));
    const gen = P.setup === "skin" ? skinPlan(r.skin = normSkin(r.skin)) : null;
    if (gen) {
      if (!r.guide || typeof r.guide !== "object") r.guide = { title: T("packGuide"), sections: [] };
      r.guide.sections ||= [];
      if (r.guide.sections.length < LIMITS.guideSections && !r.guide.sections.some(g => g.pack === id && g.plan))
        r.guide.sections.unshift({ title: T("skPlanTitle"), lines: gen.guide.slice(0, LIMITS.guideLines), pack: id, plan: true });
    }
    (gen ? gen.habits : P.habits).forEach(hb => {
      const b = slotBlock(r, hb.slot, plan, made);
      if (r.blocks.some(x => x.items.some(i => i.id === hb.id))) return;
      if (b.items.length >= LIMITS.items) { skipped++; return; }
      const it = { id: hb.id, title: hb.title, pack: id };
      if (hb.note) it.note = hb.note; if (hb.quest) it.quest = true; if (hb.everyOtherDay) it.everyOtherDay = true; if (hb.onDays) it.onDays = hb.onDays; if (hb.target) it.target = hb.target;
      if (hb.at != null) { const m = anchorOf(b, hb.slot) + hb.at; it.time = clock12(m); if (made.has(b)) it._m = dayWrap(m); }
      b.items.push(it);
    });
    ((gen ? gen.weekly : P.weekly) || []).forEach(x => { if (r.weekly.some(y => y.id === x.id)) return; if (r.weekly.length >= LIMITS.weekly) { skipped++; return; } r.weekly.push({ id: x.id, title: x.title, pack: id }); });
    [...(gen ? gen.tips : []), ...(P.tips || [])].forEach(x => { if (!r.tips.includes(x) && r.tips.length < LIMITS.tips) r.tips.push(x); });
    (P.guide || []).forEach(g => {
      if (!r.guide || typeof r.guide !== "object") r.guide = { title: T("packGuide"), sections: [] };
      r.guide.sections ||= [];
      if (r.guide.sections.length < LIMITS.guideSections && !r.guide.sections.some(x => x.pack === id && x.title === g.title))
        r.guide.sections.push({ title: g.title, lines: g.lines.slice(0, LIMITS.guideLines), pack: id });
    });
    let wos = P.workouts || {};
    if (P.setup === "workout") {
      r.fitness = normFit(r.fitness); const B = buildWorkouts(r.fitness); wos = B.workouts;
      r.progression ||= {}; Object.entries(B.progression).forEach(([k, v]) => { r.progression[k] ||= v; });
      const Wd = window.TUNAS_WORKOUT;
      if (!r.guide || typeof r.guide !== "object") r.guide = { title: T("packGuide"), sections: [] };
      r.guide.sections ||= [];
      if (r.guide.sections.length < LIMITS.guideSections && !r.guide.sections.some(g => g.pack === id && g.plan))
        r.guide.sections.unshift({ title: R(Wd.planTitle), lines: R(Wd.planGuide[r.fitness.level]), pack: id, plan: true });
    }
    Object.entries(wos).forEach(([k, wo]) => {
      if (r.workouts[k]) return;
      const eb = slotBlock(r, "evening", plan, made), f = anchorOf(eb, "evening") + 30;
      r.workouts[k] = { ...clone(wo), when: fmtClock(f), from: hhmm(f), to: hhmm(f + 45), remind: hhmm(f), after: eb.id, pack: id };
      r.showWorkouts = true;
    });
  });
  r.packs = [...new Set([...(Array.isArray(r.packs) ? r.packs : []), ...ids])];
  // Sections this call created get their habits in time order; existing sections keep the user's order.
  made.forEach(b => { b.items = b.items.map((i, n) => [i, n]).sort((x, y) => (x[0]._m ?? 1e9) - (y[0]._m ?? 1e9) || x[1] - y[1]).map(x => x[0]); });
  r.blocks.forEach(b => b.items.forEach(i => { delete i._m; }));
  r.blocks.sort((x, y) => blockSpan(x)[0] - blockSpan(y)[0]);
  return { r, skipped };
}
function removePack(base, id) {
  const r = clone(base), P = packById(id), txt = new Set();
  ((P && P.tips) || []).forEach(x => { txt.add(x.en); txt.add(x.ms); });
  if (P && P.setup === "skin") { const S = window.TUNAS_SKIN; [...S.types, ...S.concerns].map(x => x.tip).concat(S.tips).forEach(x => { txt.add(x.en); txt.add(x.ms); }); }
  r.blocks = (r.blocks || []).map(b => ({ ...b, items: (b.items || []).filter(i => i.pack !== id) })).filter(b => b.items.length);
  r.weekly = (r.weekly || []).filter(x => x.pack !== id);
  r.tips = (r.tips || []).filter(x => !txt.has(x));
  if (r.guide && Array.isArray(r.guide.sections)) { r.guide.sections = r.guide.sections.filter(g => g.pack !== id); if (!r.guide.sections.length) r.guide = null; }
  const ids = r.blocks.map(b => b.id);
  Object.keys(r.workouts || {}).forEach(k => { const wo = r.workouts[k]; if (wo.pack === id) delete r.workouts[k]; else if (ids.length && !ids.includes(slug(wo.after))) wo.after = ids[ids.length - 1]; });
  r.packs = (r.packs || []).filter(x => x !== id);
  return r;
}
const packCount = (r, id) => (r.blocks || []).reduce((n, b) => n + (b.items || []).filter(i => i.pack === id).length, 0);
function packGridHTML(sel, skip) {
  return window.TUNAS_PACK_CATS.map(c => {
    const list = window.TUNAS_PACKS.filter(p => p.cat === c.id && !(skip && skip.has(p.id))); if (!list.length) return "";
    return `<h4 class="pk-cat">${esc(R(c.title))}</h4><div class="pk-grid">${list.map(p => `<button type="button" class="pk" data-pack="${esc(p.id)}" aria-pressed="${sel.has(p.id)}">
      <span class="pk-emo" aria-hidden="true">${esc(p.emoji)}</span><span class="tpl-tick">${I.check}</span><b>${esc(R(p.title))}</b><span>${esc(R(p.desc))}</span><small>${p.setup ? T("packAsks") : T("packHabits", p.habits.length)}</small></button>`).join("")}</div>`;
  }).join("");
}
const packSize = p => p ? (p.setup === "skin" ? 5 : p.habits.length) : 0; // skincare builds 5 to 12 habits; 5 is the Basic routine
const selHabits = sel => [...sel].reduce((n, id) => n + packSize(packById(id)), 0);
function renderWelcomePacks(el) {
  const n = WEL.packs.size, hb = selHabits(WEL.packs);
  el.innerHTML = `<div class="w-in wide pk-room"><h2>${T("wHelpQ")}</h2><p>${T("wHelpSub")}</p>${packGridHTML(WEL.packs)}
    <div class="pk-foot"><p class="w-mix">${n ? T("wPackCount", n, hb) : T("wPickOne")}${hb > 30 ? ` · ${T("wManyHabits")}` : ""}</p>
      <button class="btn" type="button" id="wPkNext" ${n ? "" : "disabled"}>${T("next")}</button>
      <div class="w-links"><button class="linkish" type="button" id="wBack">${WEL.switching ? T("cancel") : T("back")}</button><button class="linkish" type="button" id="wTpl">${T("wReady")}</button></div></div></div>`;
  el.querySelectorAll("[data-pack]").forEach(b => b.onclick = () => { togglePack(WEL.packs, b.dataset.pack); const top = el.scrollTop; renderWelcome(); el.scrollTop = top; });
  $("wPkNext").onclick = () => { if (!WEL.packs.size) return; welGo(1); };
  $("wBack").onclick = () => { if (WEL.switching) closeWelcome(); else { WEL.step = 1; renderWelcome(); } };
  $("wTpl").onclick = () => { WEL.step = "tpl"; renderWelcome(); el.scrollTop = 0; };
}
function renderWelcomeDay(el) {
  const time = (id, label, v) => `<label class="w-time">${label}<input class="field" type="time" id="${id}" value="${esc(v)}"></label>`;
  el.innerHTML = `<div class="w-in"><h2>${T("wDayQ")}</h2><p>${T("wDaySub")}</p>
    <div class="w-times">${time("wWake", T("wWake"), WEL.wake)}${time("wSleep", T("wSleep"), WEL.sleep)}</div>
    <div class="sw-row w-wo"><div><b>${T("wBusy")}</b><span>${T("wBusyHelp")}</span></div><button class="toggle" type="button" role="switch" id="wBusy" aria-checked="${WEL.busy}" aria-label="${T("wBusy")}"><i></i></button></div>
    ${WEL.busy ? `<div class="w-times">${time("wB1", T("wBusyFrom"), WEL.busyFrom)}${time("wB2", T("wBusyTo"), WEL.busyTo)}</div>` : ""}
    <button class="btn" type="button" id="wGo">${T("wGo")}</button>
    <div class="w-links one"><button class="linkish" type="button" id="wBack">${T("back")}</button></div></div>`;
  [["wWake", "wake"], ["wSleep", "sleep"], ["wB1", "busyFrom"], ["wB2", "busyTo"]].forEach(([id, k]) => { const f = $(id); if (f) f.addEventListener("change", () => { if (/^\d{2}:\d{2}$/.test(f.value)) WEL[k] = f.value; }); });
  $("wBusy").onclick = () => { WEL.busy = !WEL.busy; renderWelcome(); };
  $("wBack").onclick = () => welGo(-1);
  $("wGo").onclick = finishPacks;
}
function finishPacks() {
  const day = { wake: WEL.wake, sleep: WEL.sleep, busy: WEL.busy ? [WEL.busyFrom, WEL.busyTo] : null };
  const base = { version: 1, label: T("myRoutine"), name: "", blocks: [], focus: {}, workouts: {}, progression: {}, weekly: [], tips: [], guide: null, day, showWorkouts: true, packs: [],
    away: day.busy ? { from: day.busy[0], to: day.busy[1], say: T("awaySay") } : null };
  if (WEL.packs.has("workout")) base.fitness = normFit(WEL.fit);
  if (WEL.packs.has("skin")) base.skin = normSkin(WEL.skin);
  const { r } = addPacks(base, [...WEL.packs]);
  if (!r.blocks.length) { toast(T("wPickOne"), "x"); return; }
  welcomeDone(r);
}
// Settings → Habit packs
let PK = { sel: new Set(), step: "", fit: null, skin: null };
// Setup questions come after picking packs, in this order.
const pkSteps = () => ["", ...(PK.sel.has("skin") ? ["skin"] : []), ...(PK.sel.has("workout") ? ["wo"] : [])];
function packsSettingsHTML() {
  const active = (Array.isArray(RAW.packs) ? RAW.packs : []).map(packById).filter(Boolean);
  const rows = active.map(p => { const sure = settingsPane === "rm:" + p.id;
    return `<div class="pk-row"><span class="pk-emo" aria-hidden="true">${esc(p.emoji)}</span><span class="pk-row-t"><b>${esc(R(p.title))}</b><span>${T("packHabits", packCount(RAW, p.id))}</span>${p.setup === "workout" ? `<button class="linkish" type="button" data-act="woSetup">${T("woChange")}</button>` : p.setup === "skin" ? `<button class="linkish" type="button" data-act="skinSetup">${T("skChange")}</button>` : ""}</span>
      <button class="btn small ${sure ? "danger" : "ghost danger-ghost"}" type="button" data-act="rmPack" data-pack="${esc(p.id)}">${sure ? T("edSure") : T("removePack")}</button></div>`; }).join("");
  return `<div class="set-group"><h3>${T("packsTitle")}</h3><p>${T("packsHelp")}</p>${rows || `<p>${T("packsNone")}</p>`}
    <div class="row"><button class="btn small ed-add" type="button" data-act="addPacks">${I.plus}${T("addPacks")}</button></div></div>`;
}
function renderPackSheet(keep) {
  const body = $("shBody"), top = keep ? body.scrollTop : 0, n = PK.sel.size;
  $("shHead").innerHTML = sheetHead("star", T("addPacks"), T("addPacksSub"), null, "--green");
  $("shHead").querySelector(".sh-ico").innerHTML = I.plus;
  $("shClose").onclick = closeSheet;
  const have = new Set(Array.isArray(RAW.packs) ? RAW.packs : []);
  if (PK.step === "skin") {
    $("shHead").innerHTML = sheetHead("heart", T("skSetQ"), T("skSetSub"), null, "--green");
    $("shClose").onclick = closeSheet;
    const last = pkSteps().slice(-1)[0] === "skin";
    body.innerHTML = `<div class="pk-bar"><button class="btn" type="button" data-packgo>${last ? T("addN", n) : T("next")}</button></div>${skinSetupHTML(PK.skin)}<div class="row"><button class="linkish" type="button" data-packback>${T("back")}</button></div>`;
    if (keep) body.scrollTop = top; return;
  }
  if (PK.step === "wo") {
    $("shHead").innerHTML = sheetHead("dumb", T("woSetQ"), T("woSetSub"), null, "--green");
    $("shClose").onclick = closeSheet;
    body.innerHTML = `<div class="pk-bar"><button class="btn" type="button" data-packgo>${T("addN", n)}</button></div>${woSetupHTML(PK.fit)}<div class="row"><button class="linkish" type="button" data-packback>${T("back")}</button></div>`;
    if (keep) body.scrollTop = top; return;
  }
  body.innerHTML = `<div class="pk-bar"><button class="btn" type="button" data-packgo ${n ? "" : "disabled"}>${T("addN", n)}</button></div>` + packGridHTML(PK.sel, have);
  if (keep) body.scrollTop = top;
}
function addPacksNow() {
  if (!PK.sel.size) return;
  const L = pkSteps(), at = L.indexOf(PK.step);
  if (at < L.length - 1) { PK.step = L[at + 1]; return renderPackSheet(false); }
  const base = { ...RAW }; if (PK.sel.has("workout")) base.fitness = PK.fit; if (PK.sel.has("skin")) base.skin = PK.skin;
  const ids = [...PK.sel], { r, skipped } = addPacks(base, ids);
  if (RAW_IS_DEFAULT || !r.label) r.label = T("myRoutine");
  const err = validateRoutine(r); if (err) { toast(esc(err), "x"); return; }
  if (!saveRoutine(clampText(r))) return;
  PK.sel = new Set(); store.welcomed = true; save(); lastS = null; prevCleared = null;
  closeSheet(); refresh(true); sfx("clear");
  toast(skipped ? T("packsSkipped", skipped) : T("packsAdded", ids.length), skipped ? "x" : "check");
}
function removePackNow(id) {
  const r = removePack(RAW, id);
  if (!r.blocks.length) { toast(T("packKeepOne"), "x"); return renderSheet(true); }
  const err = validateRoutine(r); if (err) { toast(esc(err), "x"); return; }
  if (!saveRoutine(clampText(r))) return renderSheet(true);
  lastS = null; prevCleared = null; refresh(true); toast(T("packRemoved", esc(R(packById(id).title))), "check");
}

/* ================= Workout setup ================= */
// Level + place + equipment → workouts, picked from TUNAS_WORKOUT on the phone. Exercise ids stay stable so logs and PRs carry over.
function normFit(f) {
  const W = window.TUNAS_WORKOUT; f = f && typeof f === "object" ? f : {};
  return { level: W.plans[f.level] ? f.level : "new", place: f.place === "gym" ? "gym" : "home",
    gear: Array.isArray(f.gear) ? [...new Set(f.gear.filter(g => W.gear.some(x => x.id === g)))] : [] };
}
const GEAR_ORDER = { gym: ["gym", "db", "bar", "band", "none"], home: ["db", "bar", "band", "none"] };
function pickEx(pattern, fit, used) {
  const have = fit.place === "gym" ? GEAR_ORDER.gym : GEAR_ORDER.home.filter(g => g === "none" || fit.gear.includes(g));
  for (const g of have) { const e = window.TUNAS_WORKOUT.ex.find(e => e.pattern === pattern && e.gear === g && e.lv.includes(fit.level) && !used.has(e.id)); if (e) return e; }
  return null;
}
function buildWorkouts(fitIn) {
  const W = window.TUNAS_WORKOUT, fit = normFit(fitIn), plan = W.plans[fit.level], workouts = {}, progression = {};
  Object.entries(plan.days).forEach(([day, sp]) => {
    const S = W.splits[sp], used = new Set(), list = [];
    S.patterns.forEach(pt => { let p = pt, e = pickEx(p, fit, used); while (!e && W.fallback[p]) { p = W.fallback[p]; e = pickEx(p, fit, used); } if (e) { used.add(e.id); list.push(e); } });
    workouts[day] = { name: R(S.name), when: R(plan.mins), say: R(W.say), exercises: list.map(e => {
      const weighted = (e.kind === "w" || e.kind === "acc") && (e.gear === "db" || e.gear === "gym");
      const o = { id: e.id, name: R(e.name), reps: W.reps[e.kind][fit.level], rest: W.rest[e.kind][fit.level], cue: R(e.cue), bodyweight: !weighted };
      if (e.unit) o.unit = e.unit;
      if (weighted) progression[e.id] = { start: R(W.start[fit.level]), step: e.step || 2 };
      return o; }) };
    if (plan.sets) workouts[day].sets = plan.sets;
  });
  return { workouts, progression };
}
function woToggle(F, b) {
  const k = b.dataset.wo, id = b.dataset.id;
  if (k === "level" && window.TUNAS_WORKOUT.plans[id]) F.level = id;
  else if (k === "place") F.place = id === "gym" ? "gym" : "home";
  else if (k === "gear") { if (id === "none") F.gear = []; else F.gear = F.gear.includes(id) ? F.gear.filter(g => g !== id) : [...F.gear, id]; }
}
function woSetupHTML(F) {
  const W = window.TUNAS_WORKOUT, sug = W.suggest[F.level];
  const opt = (kind, id, inner, on, cls) => `<button type="button" class="wo-opt${cls ? " " + cls : ""}" data-wo="${kind}" data-id="${esc(id)}" aria-pressed="${on}">${inner}</button>`;
  let h = `<h3 class="wo-q">${T("woLevelQ")}</h3><div class="wo-list">${W.levels.map(l => opt("level", l.id, `<b>${esc(R(l.title))}</b><span>${esc(R(l.desc))}</span>`, F.level === l.id)).join("")}</div>
    <h3 class="wo-q">${T("woPlaceQ")}</h3><div class="wo-two">${W.places.map(p => opt("place", p.id, `<span class="pk-emo" aria-hidden="true">${esc(p.emoji)}</span><b>${esc(R(p.title))}</b>${sug.place === p.id ? `<span class="wo-sug">${T("woSuggested")}</span>` : ""}`, F.place === p.id)).join("")}</div>
    <p class="wo-hint">${esc(R(sug.text))}</p>`;
  if (F.place === "home") h += `<h3 class="wo-q">${T("woGearQ")}</h3><div class="wo-chips">${opt("gear", "none", esc(T("woNoGear")), !F.gear.length, "chip")}${W.gear.map(g => opt("gear", g.id, `${esc(g.emoji)} ${esc(R(g.title))}`, F.gear.includes(g.id), "chip")).join("")}</div>
    ${F.gear.length ? "" : `<p class="wo-hint">${esc(R(W.noGearTip))}</p>`}`;
  const { workouts } = buildWorkouts(F);
  return h + `<div class="wo-prev"><b>${T("woPreview")}</b>${Object.entries(workouts).map(([k, w]) => `<p><b>${esc(weekdayName(+k, "short"))} · ${esc(w.name)}</b><span>${w.exercises.map(e => esc(e.name)).join(", ")}</span></p>`).join("")}</div>`;
}
function renderWelcomeWorkout(el) {
  el.innerHTML = `<div class="w-in wide pk-room"><h2>${T("woSetQ")}</h2><p>${T("woSetSub")}</p>${woSetupHTML(WEL.fit)}
    <div class="pk-foot"><button class="btn" type="button" id="wWoNext">${T("next")}</button><div class="w-links one"><button class="linkish" type="button" id="wBack">${T("back")}</button></div></div></div>`;
  el.querySelectorAll("[data-wo]").forEach(b => b.onclick = () => { woToggle(WEL.fit, b); const top = el.scrollTop; renderWelcome(); el.scrollTop = top; });
  $("wWoNext").onclick = () => welGo(1);
  $("wBack").onclick = () => welGo(-1);
}
function renderWoSheet(keep) {
  const body = $("shBody"), top = keep ? body.scrollTop : 0;
  $("shHead").innerHTML = sheetHead("dumb", T("woSetQ"), T("woSetSub"), null, "--green");
  $("shClose").onclick = closeSheet;
  body.innerHTML = `<div class="pk-bar"><button class="btn" type="button" data-wosave>${T("woSave")}</button></div>${woSetupHTML(PK.fit)}<p class="wo-hint">${T("woLogsStay")}</p>`;
  if (keep) body.scrollTop = top;
}
// Replace only the workouts the Workouts pack made; your own workouts and all logs stay.
function applyFitness(base, fit) {
  const r = clone(base); r.fitness = normFit(fit);
  Object.keys(r.workouts || {}).forEach(k => { if (r.workouts[k].pack === "workout") delete r.workouts[k]; });
  if (r.guide && Array.isArray(r.guide.sections)) r.guide.sections = r.guide.sections.filter(g => !(g.pack === "workout" && g.plan));
  return addPacks(r, ["workout"]).r;
}
function saveWoSetup() {
  const r = applyFitness(RAW, PK.fit);
  const err = validateRoutine(r); if (err) { toast(esc(err), "x"); return; }
  if (!saveRoutine(clampText(r))) return;
  lastS = null; prevCleared = null; closeSheet(); refresh(true); sfx("clear"); toast(T("woSaved"), "check");
}

/* ================= Skincare setup ================= */
// Skin type + number of steps + goals → morning and night habits. Same habit ids for every setup, so ticks and streaks carry over.
function normSkin(f) {
  const S = window.TUNAS_SKIN; f = f && typeof f === "object" ? f : {};
  return { type: S.types.some(x => x.id === f.type) ? f.type : "normal", level: S.levels.some(x => x.id === f.level) ? f.level : "basic",
    concerns: Array.isArray(f.concerns) ? [...new Set(f.concerns.filter(c => S.concerns.some(x => x.id === c)))] : [] };
}
const dayList = a => a.map(k => weekdayName(k, "short")).join(", ");
function skinPlan(fitIn) {
  const S = window.TUNAS_SKIN, f = normSkin(fitIn), ty = S.types.find(x => x.id === f.type), C = f.concerns.map(id => S.concerns.find(c => c.id === id));
  const soft = f.type === "sensitive", std = f.level !== "basic", full = f.level === "full", H = [];
  // A note that only repeats its title is dropped (gate 69, the echo).
  const add = (id, slot, title, note, at, o) => H.push({ id, slot, title, ...(note && note.toLowerCase() !== String(title).toLowerCase() ? { note } : {}), ...(at != null ? { at } : {}), ...(o || {}) });
  const base = f.type === "oily" ? "nia" : "hya", ok = k => (S.serums[k] ? k : base);
  const amS = ok((C[0] || {}).am), pmS = ok((C.find(c => c.pm !== amS) || C[0] || {}).pm);
  add("sk-am-clean", "morning", f.type === "dry" || soft ? T("skRinse") : T("skCleanser"), R(ty.cleanser), 15);
  if (full && f.type !== "oily") add("sk-am-toner", "morning", T("skToner"), T("skTonerNote"), 16);
  if (std) add("sk-am-serum", "morning", R(S.serums[amS]), T("skSerumNote"), 17);
  add("sk-am-moist", "morning", T("skMoist"), R(ty.moist), 18);
  add("sk-spf", "morning", T("skSpf"), `${R(ty.spf)} · ${T("skSpfNote")}`, 20, { quest: true });
  if (full) add("sk-spf-re", "day", T("skSpfRe"), T("skSpfReNote"));
  if (full) add("sk-pm-oil", "night", T("skOil"), T("skOilNote"), 0);
  add("sk-pm-clean", "night", T("skCleanser"), full ? T("skSecondNote") : T("skPmCleanNote"), 2);
  // Treatments only on the Full routine, on their own nights (retinoid and exfoliant never on the same night).
  let ret = false, exf = null;
  if (full) { const tr = C.map(c => c.treat).filter(Boolean); ret = tr.includes("ret"); exf = tr.includes("bha") ? "bha" : tr.includes("aha") ? "aha" : null;
    if (!ret && !exf && f.type !== "dry" && !f.concerns.includes("dry")) exf = "aha"; }
  const nights = k => soft ? S.treats[k].soft : S.treats[k].days;
  if (ret) add("sk-pm-ret", "night", R(S.treats.ret.title), R(S.treats.ret.note), 5, { onDays: nights("ret") });
  if (exf) add("sk-pm-exf", "night", R(S.treats[exf].title), R(S.treats[exf].note), 5, { onDays: nights(exf) });
  if (std) add("sk-pm-serum", "night", R(S.serums[pmS]), T("skSerumNote"), 7);
  add("sk-pm-moist", "night", T("skMoist"), f.type === "dry" ? T("skMoistDryPm") : R(ty.moist), 10);
  const steps = slot => H.filter(h => h.slot === slot && h.id !== "sk-spf-re").map(h => h.onDays ? `${h.title} (${dayList(h.onDays)})` : h.title).join(" → ");
  return { fit: f, habits: H,
    weekly: [{ id: "sk-pillow", title: f.concerns.includes("acne") ? T("skPillow2") : T("skPillow") }],
    tips: [R(ty.tip), ...C.slice(0, 3).map(c => R(c.tip)), ...(full ? S.tips : S.tips.slice(0, 1)).map(R)],
    guide: [...(f.type !== "unsure" ? [T("skLineType", R(ty.title), R(ty.cleanser), R(ty.moist))] : [R(ty.tip)]), T("skLineAM", steps("morning")), T("skLinePM", steps("night")),
      ...(full ? [T("skLineSpfRe")] : []), ...(ret ? [T("skLineRet")] : []), R(S.caution)] };
}
function skinToggle(F, b) {
  const S = window.TUNAS_SKIN, k = b.dataset.sk, id = b.dataset.id;
  if (k === "type" && S.types.some(x => x.id === id)) { F.type = id; }
  else if (k === "level" && S.levels.some(x => x.id === id)) F.level = id;
  else if (k === "concern") { if (id === "none") F.concerns = []; else if (S.concerns.some(x => x.id === id)) F.concerns = F.concerns.includes(id) ? F.concerns.filter(c => c !== id) : [...F.concerns, id]; }
}
function skinSetupHTML(F) {
  const S = window.TUNAS_SKIN, sugLevel = F.type === "sensitive" || F.type === "unsure" ? "basic" : "std";
  const opt = (kind, id, inner, on, cls) => `<button type="button" class="wo-opt${cls ? " " + cls : ""}" data-sk="${kind}" data-id="${esc(id)}" aria-pressed="${on}">${inner}</button>`;
  const plan = skinPlan(F), row = slot => plan.habits.filter(h => h.slot === slot).map(h => esc(h.onDays ? `${h.title} (${dayList(h.onDays)})` : h.title)).join(" → ");
  return `<h3 class="wo-q">${T("skTypeQ")}</h3><div class="wo-chips">${S.types.map(x => opt("type", x.id, `<b>${esc(R(x.title))}</b><span>${esc(R(x.desc))}</span>`, F.type === x.id)).join("")}</div>
    <h3 class="wo-q">${T("skLevelQ")}</h3><div class="wo-list">${S.levels.map(l => opt("level", l.id, `<b>${esc(R(l.title))}${l.id === sugLevel ? ` <span class="wo-sug">${T("woSuggested")}</span>` : ""}</b><span>${esc(R(l.desc))}</span>`, F.level === l.id)).join("")}</div>
    <p class="wo-hint">${esc(R(S.suggest[sugLevel]))}</p>
    <h3 class="wo-q">${T("skConcernQ")}</h3><div class="wo-chips">${opt("concern", "none", esc(T("skNoConcern")), !F.concerns.length, "chip")}${S.concerns.map(c => opt("concern", c.id, esc(R(c.title)), F.concerns.includes(c.id), "chip")).join("")}</div>
    ${F.level !== "full" && F.concerns.some(c => ["acne", "spots", "lines", "oil", "dull"].includes(c)) ? `<p class="wo-hint">${T("skFullHint")}</p>` : ""}
    <div class="wo-prev"><b>${T("woPreview")}</b><p><b>${T("skMorning")}</b><span>${row("morning")}</span></p>${plan.habits.some(h => h.slot === "day") ? `<p><b>${T("skDay")}</b><span>${row("day")}</span></p>` : ""}<p><b>${T("skNight")}</b><span>${row("night")}</span></p></div>
    <p class="wo-hint">${esc(R(S.caution))}</p>`;
}
function renderWelcomeSkin(el) {
  el.innerHTML = `<div class="w-in wide pk-room"><h2>${T("skSetQ")}</h2><p>${T("skSetSub")}</p>${skinSetupHTML(WEL.skin)}
    <div class="pk-foot"><button class="btn" type="button" id="wSkNext">${T("next")}</button><div class="w-links one"><button class="linkish" type="button" id="wBack">${T("back")}</button></div></div></div>`;
  el.querySelectorAll("[data-sk]").forEach(b => b.onclick = () => { skinToggle(WEL.skin, b); const top = el.scrollTop; renderWelcome(); el.scrollTop = top; });
  $("wSkNext").onclick = () => welGo(1);
  $("wBack").onclick = () => welGo(-1);
}
function renderSkinSheet(keep) {
  const body = $("shBody"), top = keep ? body.scrollTop : 0;
  $("shHead").innerHTML = sheetHead("heart", T("skSetQ"), T("skSetSub"), null, "--green");
  $("shClose").onclick = closeSheet;
  body.innerHTML = `<div class="pk-bar"><button class="btn" type="button" data-sksave>${T("skSave")}</button></div>${skinSetupHTML(PK.skin)}<p class="wo-hint">${T("skKeep")}</p>`;
  if (keep) body.scrollTop = top;
}
// Rebuild only what the Skincare pack made; ticks stay because the habit ids don't change.
function applySkin(base, fit) {
  const r = removePack(base, "skin"); r.skin = normSkin(fit);
  return addPacks(r, ["skin"]).r;
}
function saveSkinSetup() {
  const r = applySkin(RAW, PK.skin);
  const err = validateRoutine(r); if (err) { toast(esc(err), "x"); return; }
  if (!saveRoutine(clampText(r))) return;
  lastS = null; prevCleared = null; closeSheet(); refresh(true); sfx("clear"); toast(T("skSaved"), "check");
}
// Welcome steps after picking packs: skincare and workout questions only when those packs are picked.
const welSteps = () => [2, ...(WEL.packs.has("skin") ? ["skin"] : []), ...(WEL.packs.has("workout") ? ["wo"] : []), 3];
function welGo(d) { const L = welSteps(), i = Math.max(0, L.indexOf(WEL.step)); WEL.step = L[Math.max(0, Math.min(L.length - 1, i + d))]; renderWelcome(); $("welcome").scrollTop = 0; }

/* ================= Celebration screens ================= */
const celeQ = [];
function queueCele(c) { celeQ.push(c); if ($("cele").hidden) nextCele(); }
function nextCele() {
  const c = celeQ.shift(); if (!c) { $("cele").hidden = true; contextSay(); setTimeout(playHome, 150); return; }
  if (sheetId && !["settings", "routine", "me", "editor", "packs", "wosetup", "skinsetup"].includes(sheetId) && !sheetId.startsWith("day:") && !sheetId.startsWith("lock:")) closeSheet();
  const el = $("cele"); el.hidden = false;
  el.innerHTML = `${c.art || `<div class="mascot cheer" id="celeMascot">${MASCOT}</div>`}<h2 class="${c.color || ""}">${c.title}</h2><p>${c.sub}</p>
    ${c.tiles.length ? `<div class="tiles">${c.tiles.map(t => `<div class="tile" style="--c:var(${t.c})"><small>${t.k}</small><b>${t.i ? I[t.i] : ""}${t.v}</b></div>`).join("")}</div>` : ""}
    <button class="btn" type="button" id="celeGo">${c.btn || T("cont")}</button>`;
  $("celeGo").onclick = nextCele; $("celeGo").focus({ preventScroll: true });
  if ($("celeMascot")) jump($("celeMascot")); sfx(c.sound || "clear"); buzz([30,60,30]); confetti();
}

/* ================= Morning recap ================= */
// First open of a new day shows how yesterday went. Shown once per day; skipped on someone's very first day.
function checkRecap() {
  if (!homeVisible() || celeQ.length) return;
  const d = routineDate(), today = dkey(d); if (store.recap === today) return;
  const y = new Date(d); y.setDate(y.getDate() - 1); const yk = dkey(y);
  const hadBefore = Object.keys(store.days).some(k => k < today && Object.values(store.days[k] || {}).some(Boolean));
  store.recap = today; save(); if (!hadBefore) return;
  const ids = itemsFor(y), done = store.days[yk] || {}, n = ids.filter(id => done[id]).length, pct = ids.length ? Math.round(100 * n / ids.length) : 0;
  const stars = nodesFor(y).reduce((s2, nd) => s2 + starsFor(nodeState(nd, y)), 0), S = lastS || computeAll();
  const xp = dayXP(yk, computePRs().byDay), rest = isRest(y);
  queueCele({ title: T(rest ? "recapRestTitle" : n ? "recapTitle" : "recapQuietTitle", firstName()), sub: T(rest ? "recapRestSub" : pct >= 80 ? "recapGoodSub" : n ? "recapOkSub" : "recapQuietSub"), color: "sky", sound: "ding",
    tiles: [{ k: T("tDone"), v: `${pct}%`, i: "", c: "--green" }, { k: T("tStars"), v: stars, i: "star", c: "--gold" }, { k: T("tXP"), v: `+${xp}`, i: "bolt", c: "--gold" }, { k: T("tStreak"), v: S.streak, i: "flame", c: "--orange" }] });
}

/* ================= Weekly summary ================= */
// How a week (Monday to Sunday) went: done %, best and most-missed habit, workouts and XP. Rest days don't count against you.
function weekSummary(mon) {
  const pr = computePRs(), today = dkey(routineDate()), seen = {}, got = {};
  let done = 0, total = 0, workouts = 0, xp = 0, active = 0;
  for (let i = 0; i < 7; i++) { const d = new Date(mon); d.setDate(d.getDate() + i); const k = dkey(d); if (k > today) break;
    const dn = store.days[k] || {}; xp += dayXP(k, pr.byDay);
    if (Object.values(dn).some(Boolean)) active++; if (dn["wo-done"]) workouts++;
    if (isRest(d)) continue;
    itemsFor(d).forEach(id => { total++; if (dn[id]) done++; if (id === "wo-done") return; seen[id] = (seen[id] || 0) + 1; if (dn[id]) got[id] = (got[id] || 0) + 1; }); }
  const wk = store.weeks[dkey(mon)] || {}, wkN = Object.values(wk).filter(Boolean).length; xp += wkN * XP.weekly; if (wkN) active++;
  const ids = Object.keys(seen), name = id => (BLOCKS.flatMap(b => b.items).find(i => i.id === id) || {}).t || "";
  const best = ids.filter(id => got[id]).sort((a, b) => (got[b] / seen[b] - got[a] / seen[a]) || (got[b] - got[a]))[0];
  const miss = ids.filter(id => id !== best && seen[id] - (got[id] || 0) > 0).sort((a, b) => (seen[b] - (got[b] || 0)) - (seen[a] - (got[a] || 0)))[0];
  const end = new Date(mon); end.setDate(end.getDate() + 6);
  return { pct: total ? Math.round(100 * done / total) : 0, workouts, xp, active, end,
    best: best && { t: name(best), n: got[best], of: seen[best] }, miss: miss && { t: name(miss), n: seen[miss] - (got[miss] || 0) } };
}
const wsTiles = s => [{ k: T("tDone"), v: `${s.pct}%`, i: "", c: "--green" }, { k: T("tWorkouts"), v: s.workouts, i: "dumb", c: "--sky" }, { k: T("tXP"), v: `+${s.xp}`, i: "bolt", c: "--gold" }];
const wsLines = s => [s.best ? T("wsBest", esc(s.best.t), s.best.n, s.best.of) : "", s.miss ? T("wsMiss", esc(s.miss.t), s.miss.n) : s.best ? T("wsNoMiss") : ""].filter(Boolean);
const lastMonday = () => { const m = keyToDate(wkey(routineDate())); m.setDate(m.getDate() - 7); return m; };
// On Monday, the first open shows last week's summary once (after the morning recap).
function checkWeekRecap() {
  if (sheetId || !$("welcome").hidden) return;
  const d = routineDate(), wk = wkey(d); if (d.getDay() !== 1 || store.weekRecap === wk) return;
  store.weekRecap = wk; save();
  const s = weekSummary(lastMonday()); if (!s.active) return;
  queueCele({ title: T("wsTitle", firstName()), sub: [T(s.pct >= 80 ? "wsGoodSub" : "wsOkSub"), ...wsLines(s)].join("<br>"), color: "green", sound: "ding", tiles: wsTiles(s) });
}
// History shows any past week's summary. 1 = last week, 2 = the week before, ...
let wsBack = 1;
function renderWeekSum() {
  const el = $("wsum"); if (!el) return;
  const mon = lastMonday(); mon.setDate(mon.getDate() - 7 * (wsBack - 1)); const s = weekSummary(mon), f = { day: "numeric", month: "short" };
  const range = `${mon.toLocaleDateString(locale(), f)} – ${s.end.toLocaleDateString(locale(), f)}`;
  el.innerHTML = `<div class="h-top"><button class="x" type="button" data-wsnav="1" aria-label="${T("wsPrev")}" ${wsBack >= 52 ? "disabled" : ""}>‹</button><div class="ws-h"><b>${wsBack === 1 ? T("wsLast") : T("wsAgo", wsBack)}</b><span>${range}</span></div><button class="x" type="button" data-wsnav="-1" aria-label="${T("wsNext")}" ${wsBack <= 1 ? "disabled" : ""}>›</button></div>
    ${s.active ? `<div class="tiles">${wsTiles(s).map(t => `<div class="tile" style="--c:var(${t.c})"><small>${t.k}</small><b>${t.i ? I[t.i] : ""}${t.v}</b></div>`).join("")}</div>${wsLines(s).map(l => `<p class="ws-line">${l}</p>`).join("")}` : `<p class="ws-line">${T("wsEmpty")}</p>`}`;
}
$("shBody").addEventListener("click", e => { const b = e.target.closest("[data-wsnav]"); if (!b || b.disabled) return; wsBack = Math.max(1, Math.min(52, wsBack + (+b.dataset.wsnav))); renderWeekSum(); });

/* ================= Daily chest ================= */
// Finishing all daily quests opens today's chest: a celebration only, it adds no XP.
function checkChest() {
  const today = dkey(routineDate()); store.chest ||= {};
  if (!renderQuests.allWon || store.chest[today]) return;
  store.chest[today] = 1; Object.keys(store.chest).forEach(k => { if (k < dkey(new Date(Date.now() - 40 * 864e5))) delete store.chest[k]; }); save();
  queueCele({ title: T("chestTitle"), sub: pick(T("chestLines")), color: "green", sound: "level", art: CHEST, btn: T("chestBtn"), tiles: [] });
}
const CHEST = `<div class="chest-art" aria-hidden="true"><svg viewBox="0 0 120 100"><g class="glow"><circle cx="60" cy="40" r="34"/></g>
  <rect class="ch-body" x="18" y="46" width="84" height="44" rx="8"/><rect class="ch-band" x="18" y="58" width="84" height="8"/>
  <g class="ch-lid"><path d="M18 46v-8a22 22 0 0 1 22-22h40a22 22 0 0 1 22 22v8z"/><rect class="ch-band" x="18" y="38" width="84" height="8"/></g>
  <rect class="ch-lock" x="53" y="52" width="14" height="18" rx="3"/></svg></div>`;

/* ================= Refresh + comparisons ================= */
let prevCleared = null;
function refresh(keepSheet) {
  const d = routineDate(), S = computeAll();
  renderTop(S); renderQuests(S); renderPath(S); renderNudge(); renderStreak(S); renderHistory();
  const got = renderBadges(S);
  if (sheetId && sheetId !== "editor" && keepSheet !== false) renderSheet(true);
  else if (sheetId && keepSheet === false && !["settings", "routine", "me", "editor"].includes(sheetId) && !sheetId.startsWith("day:")) {
    const node = nodesFor(d).find(n => n.id === sheetId); if (node) { const st = nodeState(node, d), bar = $("shHead").querySelector(".bar"); if (bar) { setFill(bar.querySelector("i"), 100*st.n/st.total); bar.querySelector("b").textContent = `${st.n} / ${st.total}`; } }
  }
  const states = {}; nodesFor(d).forEach(n => states[n.id] = nodeState(n, d));
  const fresh = got.filter(b => !store.seen[b.id]);
  if (fresh.length) { fresh.forEach(b => store.seen[b.id] = dkey(d)); save();
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
  checkChest(); checkRecap(); checkWeekRecap(); coach();
  if (!mascotTimer) contextSay();
}

/* ================= Sound toggle + reset + start ================= */
function toggleSound() { soundOn = !soundOn; try { localStorage.setItem(SND_KEY, soundOn ? "on" : "off"); } catch (e) {} if (soundOn) { audio(); sfx("ding"); } renderTop(lastS || computeAll()); }
$("stSnd").onclick = toggleSound;
// The top-bar numbers explain themselves on tap (title tooltips never show on phones).
$("stStreak").onclick = () => { const S = lastS || computeAll(); toast(T("statStreak", S.streak), "flame", 3500); };
$("stXP").onclick = () => { const S = lastS || computeAll(); toast(T("statXP", S.todayXP, S.xp), "bolt", 3500); };
$("stLv").onclick = () => { const S = lastS || computeAll(); toast(T("statLv", S.L.n, esc(titleOf(S.L.n)), S.L.span - S.L.cur), "shield", 3500); };
const area = $("resetArea");
function resetIdle() { area.innerHTML = `<button class="btn ghost small danger-ghost" type="button" id="resetBtn">${T("clearToday")}</button>`;
  $("resetBtn").onclick = () => { area.innerHTML = `<div class="confirm"><span>${T("clearConfirm")}</span><button class="btn small danger" id="yesBtn" type="button">${T("clear")}</button><button class="btn ghost small" id="noBtn" type="button">${T("keep")}</button></div>`;
    $("yesBtn").onclick = () => { delete store.days[dkey(routineDate())]; save(); lastS = null; prevCleared = null; refresh(); resetIdle(); };
    $("noBtn").onclick = resetIdle; }; }


function showRescue() {
  const el = $("cele"); el.hidden = false;
  el.innerHTML = `<div class="mascot sleepy">${MASCOT}</div><h2>${T("rescueTitle")}</h2><p>${T("rescueSub")}</p>
    <button class="btn" type="button" id="rsRetry">${T("rescueRetry")}</button>
    <button class="btn ghost" type="button" id="rsStarter">${T("rescueStarter")}</button>
    <button class="btn ghost" type="button" id="rsData">${T("rescueBackup")}</button>`;
  $("rsRetry").onclick = () => location.reload();
  $("rsStarter").onclick = () => { const raw = storeGet(CFG_KEY); if (raw) storeSet(`${CFG_KEY}-corrupt-${Date.now()}`, raw); storeDel(CFG_KEY); location.reload(); };
  $("rsData").onclick = () => { const all = {}; try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k.startsWith("tunas-")) all[k] = localStorage.getItem(k); } } catch (e) {}
    downloadText(`tunas-rescue-${dkey(new Date())}.json`, JSON.stringify(all, null, 2), "application/json"); };
}
let booted = false;
try { applyStatic(); resetIdle(); renderGuide(); refresh(); booted = true; }
catch (e) { logError("boot", e); showRescue(); }
[...new Set(notices)].forEach(k => setTimeout(() => toast(T(k), "x", 6500), 800));
$("mascot").setAttribute("role", "button"); $("mascot").setAttribute("tabindex", "0"); $("mascot").setAttribute("aria-label", T("tunasLabel")); $("mascot").removeAttribute("aria-hidden");
$("mascot").addEventListener("click", tapTunas);
$("mascot").addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); tapTunas(); } });
if ($("welcome").hidden) { const h = new Date().getHours(), S0 = lastS || computeAll();
  say(T("sayGreet", T("greetParts")[h < 12 && h >= 4 ? 0 : h < 19 && h >= 12 ? 1 : 2], firstName()), T("doneToday", S0.doneToday, S0.totalToday), "cheer", 3500); }
(function boot() {
  const q = new URLSearchParams(location.search).get("open");
  let hasLocalConfig = false; try { hasLocalConfig = !!localStorage.getItem(CFG_KEY); } catch (e) {}
  if (!hasLocalConfig && !Object.keys(store.days).length && !store.welcomed) { openWelcome(1); return; }
  askPersist();
  if (!q) return;
  history.replaceState(null, "", location.pathname);
  const d = routineDate(), nodes = nodesFor(d);
  if (q === "settings") return openSheet("settings");
  if (["history", "badges", "me", "routine", "settings"].includes(q)) return openSheet(q);
  const id = q === "now" ? (pathTarget(d, nowMins(), nodes) || {}).id : q;
  if (id && nodes.some(n => n.id === id)) return openSheet(id);
  if (q === "workout") toast(T("noWorkout"), "star");
})();
function safeRefresh() { if (!booted) return; try { refresh(); } catch (e) { reportError("refresh", e); } }
setInterval(() => { const a = document.activeElement; if (!(a && (a.tagName === "INPUT" || a.tagName === "TEXTAREA" || a.tagName === "SELECT")) && sheetId !== "editor" && $("welcome").hidden) safeRefresh(); }, 60000);
document.addEventListener("visibilitychange", () => { if (!document.hidden && sheetId !== "editor") safeRefresh(); });

/* ================= Offline support ================= */
if ("serviceWorker" in navigator) {
  // A new version installs in the background, but this page keeps running the old files.
  // When a new service worker takes over, offer a friendly Refresh instead of leaving people on the old version.
  const SW = navigator.serviceWorker;
  let hadController = !!SW.controller, lastCheck = Date.now();
  SW.addEventListener("controllerchange", () => { if (hadController) showUpdate(); hadController = true; });
  window.addEventListener("load", () => SW.register("sw.js").then(reg => {
    // Installed apps can stay open for days, so look for a new version when the app comes back to the front (at most hourly).
    document.addEventListener("visibilitychange", () => {
      if (document.hidden || Date.now() - lastCheck < 3600000) return;
      lastCheck = Date.now(); reg.update().catch(() => {});
    });
  }).catch(() => {}));
}
function showUpdate() {
  const el = $("updbar");
  el.innerHTML = `<div class="in"><div class="ui">${I.up}</div><div class="ut"><b>${T("updTitle")}</b>${T("updSub")}</div>
    <button class="btn small" type="button" id="updGo">${T("updBtn")}</button>
    <button class="ux" type="button" id="updLater" aria-label="${T("updLater")}" title="${T("updLater")}">${I.x}</button></div>`;
  el.hidden = false;
  $("updGo").onclick = () => location.reload();
  $("updLater").onclick = () => { el.hidden = true; };
}
