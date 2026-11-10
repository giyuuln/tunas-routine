/* Tunas Routine — Workout check-in: can't train today? Tell Tunas why (rain, home late, tired) and get a plan B.
   - Home late: a 10-minute mini version of today's workout. Tired: 10 minutes of stretching, then rest.
   - Rain: an indoor plan B. With the rain check on, Tunas checks the weather near you, and only real rain at your
     workout time keeps the skipped workout from counting against your streak (see woExcused in app.js). No rain? Tunas
     says so kindly and offers the indoor plan instead. Nothing is taken away either way.
   - Doing a plan B ticks the workout (XP.planB instead of XP.workout, since it's shorter).
   Rain check (opt-in, off by default): the only time Tunas talks to a server. On your tap, the phone's location is
   rounded to about 10 km and sent to Open-Meteo (free, no account, no key) to read today's rain. The location is never
   saved; only the answer (rain yes/no) is kept with that day. Allowed by connect-src in index.html.
   State lives in store.wo / store.wxOn (see woState in app.js), so backups carry it. */

const WX_URL = "https://api.open-meteo.com/v1/forecast";
const WO_UI = { open: false, busy: false, err: "", hideNudge: "" }; // per-session UI state, not saved

// Today's workout, if today has one and it isn't done yet.
function woToday() {
  const d = routineDate(), W = WORKOUTS[d.getDay()];
  if (!W || CFG.showWorkouts === false) return null;
  return { d, k: dkey(d), W, done: !!(store.days[dkey(d)] || {})["wo-done"], w: woOf(d) };
}
// The plan B for a reason: [title, minutes, moves].
function woPlan(why, W) {
  if (why === "late") {
    const ex = (W && W.ex || []).slice(0, 3).map(e => `${esc(e.name)} · 1 × ${esc(e.reps)}`);
    return [T("pbLateT"), 10, [T("pbWarm"), ...(ex.length ? ex : T("pbLateMoves")), T("pbCool")]];
  }
  if (why === "tired") return [T("pbTiredT"), 10, T("pbTiredMoves")];
  return [T("pbRainT"), 15, T("pbRainMoves")];
}
const WHY_EMO = { rain: "🌧️", late: "🌙", tired: "🥱" };
const whyChips = () => `<div class="wo-why" role="group" aria-label="${T("woWhyQ")}">${WO_WHY.map(k =>
  `<button type="button" class="wo-chip" data-wowhy="${k}"><span aria-hidden="true">${WHY_EMO[k]}</span>${T("why_" + k)}</button>`).join("")}</div>`;

// The card at the top of the workout sheet.
function woCheckHTML(d) {
  const t = woToday(); if (!t || dkey(d) !== t.k) return "";
  if (t.done) return t.w && t.w.b ? `<div class="wo-ci done">${I.check}<span>${T("pbDoneLine", T("why_" + t.w.why))}</span></div>` : "";
  const w = t.w;
  if (!w) return WO_UI.open
    ? `<div class="wo-ci"><b>${T("woWhyQ")}</b>${whyChips()}<button class="linkish" type="button" data-wo="close">${T("woNever")}</button></div>`
    : `<button class="wo-ci-open" type="button" data-wo="open"><span aria-hidden="true">🌧️🌙🥱</span><span><b>${T("woCant")}</b><small>${T("woCantSub")}</small></span><span class="chev" aria-hidden="true"></span></button>`;
  return `<div class="wo-ci">${woStatusHTML(t)}${woPlanHTML(t)}</div>`;
}
// What Tunas says about the reason, including the rain check.
function woStatusHTML(t) {
  const w = t.w, change = `<button class="linkish" type="button" data-wo="reset">${T("woWhyChange")}</button>`;
  if (w.why !== "rain") return `<p class="wo-say"><b>${T("say_" + w.why)}</b> ${change}</p>`;
  if (WO_UI.busy) return `<p class="wo-say" role="status"><span class="wo-spin" aria-hidden="true"></span>${T("wxChecking")}</p>`;
  if (w.rain === true) return `<p class="wo-say ok" role="status"><b>${T("wxYes")}</b> ${T("wxYesSub")} ${change}</p>`;
  if (w.rain === false) return `<p class="wo-say" role="status"><b>${T("wxNo")}</b> ${T("wxNoSub")} ${change}</p>`;
  const err = WO_UI.err ? `<p class="wo-err" role="alert">${WO_UI.err}</p>` : "";
  if (!store.wxOn) return `<div class="wo-say"><b>${T("wxAsk")}</b><p>${T("wxAskSub")}</p>${err}
    <div class="row"><button class="btn small" type="button" data-wo="wxon">${I.rain}${T("wxOnCheck")}</button><button class="btn ghost small" type="button" data-wo="reset">${T("woWhyChange")}</button></div></div>`;
  return `<div class="wo-say">${err}<div class="row"><button class="btn small" type="button" data-wo="check">${I.rain}${T("wxCheck")}</button>${change}</div></div>`;
}
function woPlanHTML(t) {
  if (WO_UI.busy) return "";
  const [title, min, moves] = woPlan(t.w.why, t.W);
  return `<div class="pb"><div class="pb-h"><b>${T("pbTitle")}: ${title}</b><span>${T("pbMin", min)} · +${XP.planB} XP</span></div>
    <ol class="pb-list">${moves.map(m => `<li>${m}</li>`).join("")}</ol>
    <button class="btn small" type="button" data-wo="done">${I.check}${T("pbDone")}</button></div>`;
}

// The home card, once the workout's time has passed (or from 8pm) and it isn't done.
function woNudgeHTML() {
  const t = woToday(); if (!t || t.done || WO_UI.hideNudge === t.k) return "";
  const mins = nowMins(), late = t.W.to != null ? mins >= t.W.to : mins >= 20 * 60; if (!late) return "";
  const w = t.w;
  if (w && w.why === "rain" && w.rain === true) return ""; // rain confirmed: nothing more to ask today
  const top = `<div class="nd-top"><div class="nd-ico wo">${I.dumb}</div><div><b id="nudgeT">${w ? T("pbReady", woPlan(w.why, t.W)[0]) : T("woNudgeT", esc(t.W.name))}</b><span>${w ? T("pbReadySub", T("pbMin", woPlan(w.why, t.W)[1])) : T("woNudgeSub")}</span></div></div>`;
  return top + (w ? `<div class="row"><button class="btn small" type="button" data-wo="go">${T("pbOpen")}</button><button class="btn ghost small" type="button" data-wo="later">${T("nudgeLater")}</button></div>`
    : `${whyChips()}<div class="row"><button class="btn ghost small" type="button" data-wo="go">${T("woDoIt")}</button><button class="btn ghost small" type="button" data-wo="later">${T("nudgeLater")}</button></div>`);
}

function wxSettingsHTML() {
  return `<div class="set-group"><div class="sw-row"><div><h3>${T("wxTitle")}</h3><p>${T("wxHelp")}</p></div>
    <button class="toggle" type="button" role="switch" aria-checked="${!!store.wxOn}" data-wo="wxtoggle" aria-label="${T("wxTitle")}"><i></i></button></div>
    <p>${T("wxPrivacy")}</p></div>`;
}

/* ---- Weather ---- */
function wxPosition() {
  return new Promise((res, rej) => {
    if (!navigator.geolocation) return rej(new Error("nogeo"));
    navigator.geolocation.getCurrentPosition(p => res(p.coords), rej, { enableHighAccuracy: false, maximumAge: 3600000, timeout: 20000 });
  });
}
// true when rain fell near you between an hour before the workout's start and now (or in the last 3 hours).
async function wxRained(W) {
  const c = await wxPosition(), r1 = n => (Math.round(n * 10) / 10).toFixed(1);
  const q = `latitude=${r1(c.latitude)}&longitude=${r1(c.longitude)}&current=precipitation,rain,showers,weather_code&hourly=precipitation&past_days=1&forecast_days=1&timezone=auto`;
  const res = await fetch(`${WX_URL}?${q}`, { cache: "no-store", credentials: "omit", referrerPolicy: "no-referrer" });
  if (!res.ok) throw new Error("weather " + res.status);
  const j = await res.json(), cur = j.current || {}, code = Math.round(+cur.weather_code);
  if (+cur.precipitation > 0 || +cur.rain > 0 || +cur.showers > 0 || (code >= 51 && code <= 67) || (code >= 80 && code <= 82) || code >= 95) return true;
  // Hourly times are local to the place ("2026-11-10T18:00"); compare by minutes since the routine day began.
  const now = nowMins(), from = W.from != null ? Math.max(0, W.from - 60) : now - 180, day = dkey(routineDate()), next = (() => { const x = keyToDate(day); x.setDate(x.getDate() + 1); return dkey(x); })();
  const H = j.hourly || {}, times = H.time || [], mm = H.precipitation || [];
  return times.some((t, i) => { const [dd, hm] = String(t).split("T"); if (!hm) return false; let m = +hm.slice(0, 2) * 60 + +hm.slice(3, 5);
    if (dd === next && m < 240) m += 1440; else if (dd !== day) return false;
    return m >= from && m <= now && +mm[i] >= 0.1; });
}
async function woCheckRain() {
  const t = woToday(); if (!t || !t.w || t.w.why !== "rain" || WO_UI.busy) return;
  WO_UI.busy = true; WO_UI.err = ""; woRender();
  try {
    const wet = await wxRained(t.W), w = woState()[t.k]; if (!w || w.why !== "rain") return;
    w.rain = wet; save(); sfx(wet ? "ding" : "pop");
    if (wet) { say(T("wxYesSay"), T("wxYesSub"), "happy", 4000); toast(T("wxYesToast"), "shield", 3500); }
  } catch (e) {
    WO_UI.err = e && e.code === 1 ? T("wxNoLoc") : e && e.code ? T("wxNoFix") : T("wxOffline");
  } finally { WO_UI.busy = false; lastS = null; prevCleared = null; refresh(true); woRender(); }
}

/* ---- Actions ---- */
function woRender() { if (sheetId === "workout") renderSheet(true); renderNudge(); }
function woSetWhy(why) {
  const t = woToday(); if (!t || t.done || !WO_WHY.includes(why)) return;
  woState()[t.k] = { why }; WO_UI.open = false; WO_UI.err = ""; save(); sfx("pop"); buzz(10);
  say(T("say_" + why), "", why === "tired" ? "sleepy" : "think", 3500);
  if (why === "rain" && store.wxOn) { woRender(); return woCheckRain(); }
  woRender();
}
function woDonePlanB() {
  const t = woToday(); if (!t || t.done || !t.w) return;
  const box = (store.days[t.k] ||= {}); box["wo-done"] = true; t.w.b = 1; save();
  sfx("ding"); buzz(); const b = document.querySelector('[data-wo="done"]');
  if (b) { const r = b.getBoundingClientRect(); floatXP(r.right - 90, r.top, `+${XP.planB} XP`); flyXP(r); }
  say(T("pbDoneSay"), `+${XP.planB} XP`, "cheer", 3500); jump($("mascot"));
  offerUndo(T("pbDoneUndo"), () => { delete box["wo-done"]; delete t.w.b; save(); sfx("undo"); lastS = null; prevCleared = null; refresh(true); });
  refresh(true);
}
function woClick(e) {
  const c = e.target.closest("[data-wowhy]"); if (c) { audio(); return woSetWhy(c.dataset.wowhy); }
  const b = e.target.closest("[data-wo]"); if (!b) return;
  audio(); const a = b.dataset.wo, t = woToday();
  if (a === "open") { WO_UI.open = true; return woRender(); }
  if (a === "close") { WO_UI.open = false; return woRender(); }
  if (a === "reset") { if (t && t.w && !t.done) { delete woState()[t.k]; save(); } WO_UI.err = ""; WO_UI.open = true; lastS = null; prevCleared = null; return refresh(true); }
  if (a === "wxon") { store.wxOn = true; save(); return woCheckRain(); }
  if (a === "check") return woCheckRain();
  if (a === "done") return woDonePlanB();
  if (a === "later") { if (t) WO_UI.hideNudge = t.k; return renderNudge(); }
  if (a === "go") { const n = nodesFor(routineDate()).find(x => x.kind === "workout"); if (n) openSheet(n.id); return; }
  if (a === "wxtoggle") { store.wxOn = !store.wxOn; save(); toast(store.wxOn ? T("wxOnToast") : T("wxOffToast"), "check"); return renderSheet(true); }
}
$("shBody").addEventListener("click", woClick);
$("nudge").addEventListener("click", woClick);
woState();
if (typeof booted !== "undefined" && booted) { renderNudge(); if (sheetId) renderSheet(true); }
