/* Tunas Routine — Tunas the assistant: one card on Today that changes with your day. Rules only, all on the phone.
   - Morning plan (until noon): how big today is, the ★ quests, today's workout, and what's first.
   - Plan for today (the rest of the day): Now / Next / Later, each with what's left and a button to start it.
   - Rough day? (after 2pm, when you're behind): say why (home late, tired, rain, busy) and Tunas shrinks today to the
     must-dos: the ★ habits left, then just enough to reach 80% and keep the streak. A workout reason also sets up its
     plan B (see checkin.js).
   - Evening wrap-up (from 8:30pm, or once the whole day is done): how today went, what's left tonight and one thing
     to try tomorrow.
   Each card can be put away for the day. The whole assistant can be turned off in Settings.
   Saved as store.asst = { day: { x: ["am", "plan", "bad", "pm"] put away, mood: "late" | "tired" | "rain" | "busy" } }
   (last 14 days) and store.asstOff. Both are in backups. */

const ASST_MOODS = ["late", "tired", "rain", "busy"], ASST_CARDS = ["am", "plan", "bad", "pm"];
const MOOD_EMO = { late: "🌙", tired: "🥱", rain: "🌧️", busy: "📚" };
let asstHTML = "", asstAsk = false; // asstAsk: the Rough day? question was opened by hand

function asstState() {
  if (!store.asst || typeof store.asst !== "object" || Array.isArray(store.asst)) store.asst = {};
  const old = dkey(new Date(Date.now() - 14 * 864e5));
  Object.keys(store.asst).forEach(k => { const a = store.asst[k];
    if (!/^\d{4}-\d\d-\d\d$/.test(k) || k < old || !a || typeof a !== "object") return void delete store.asst[k];
    store.asst[k] = { ...(Array.isArray(a.x) ? { x: a.x.filter(c => ASST_CARDS.includes(c)) } : {}), ...(ASST_MOODS.includes(a.mood) ? { mood: a.mood } : {}) }; });
  if (typeof store.asstOff !== "boolean") delete store.asstOff;
  return store.asst;
}
const asstDay = () => (asstState()[dkey(routineDate())] ||= {});
const asstAway = c => (asstDay().x || []).includes(c);

// Where a habit lives on today's path, and its name.
function asstWhere(id, d) {
  if (id === "wo-done") { const n = nodesFor(d).find(x => x.kind === "workout"); return n && { node: n.id, t: woPlanB(d) || woOf(d) ? T("asPlanB", woPlan(woOf(d).why, WORKOUTS[d.getDay()])[0]) : esc(n.title) }; }
  const h = habitById(id); if (!h) return null;
  return { node: h.b.id, t: esc(itemTitle(h.i, d)), time: h.i.time ? esc(h.i.time) : "" };
}
// The fewest habits that keep the streak today: ★ habits first (they open the chest), then the next ones in day order.
function mustDos(d) {
  const k = dkey(d), done = store.days[k] || {}, keys = keyIds(d);
  const ids = woExcused(d) && !done["wo-done"] ? itemsFor(d).filter(id => id !== "wo-done") : itemsFor(d);
  const left = ids.filter(id => !done[id]), need = Math.max(0, Math.ceil(0.8 * ids.length - 1e-9) - (ids.length - left.length));
  const starred = left.filter(id => keys.includes(id)), rest = left.filter(id => !keys.includes(id));
  const pickN = Math.max(need, starred.length);
  return { need, list: [...starred, ...rest].slice(0, pickN), starred: starred.length };
}
function behind(d, S) {
  const mins = nowMins(); if (mins < 14 * 60 || !S.totalToday || S.doneToday / S.totalToday >= 0.8 || isRest(d)) return false;
  return nodesFor(d).some(n => n.kind !== "weekly" && n.to != null && n.to <= mins && !nodeState(n, d).cleared);
}

/* ---- The four cards ---- */
const asHead = (emo, title, sub, away) => `<div class="as-h"><span class="as-emo" aria-hidden="true">${emo}</span><div><small>${T("asName")}</small><b id="assistT">${title}</b>${sub ? `<span>${sub}</span>` : ""}</div>
  ${away ? `<button class="as-x" type="button" data-as="away:${away}" aria-label="${T("asHide")}">${I.x}</button>` : ""}</div>`;
const asLine = (emo, html) => `<li><span aria-hidden="true">${emo}</span><span>${html}</span></li>`;
const asGo = (node, label, cls) => `<button class="btn small${cls ? " " + cls : ""}" type="button" data-as="go:${esc(node)}">${label}</button>`;

function amCard(d, S) {
  const nodes = nodesFor(d), timed = nodes.filter(n => n.from != null && n.kind !== "weekly"), mins = nowMins();
  const first = timed.find(n => !nodeState(n, d).cleared && n.to > mins) || timed.find(n => !nodeState(n, d).cleared);
  const W = WORKOUTS[d.getDay()] && CFG.showWorkouts !== false ? WORKOUTS[d.getDay()] : null;
  const lines = [asLine("📋", T("asAmSize", S.totalToday, timed.length, S.questTotal)),
    asLine("💪", W ? T("asAmWo", esc(W.name), W.from != null ? fmtClock(W.from) : "") : T("asAmNoWo")),
    first ? asLine("⏰", T("asAmFirst", esc(first.title), first.from != null ? fmtClock(first.from) : "")) : "",
    S.streak ? asLine("🔥", T("asAmStreak", S.streak)) : ""].join("");
  return asHead("☀️", T("asAmT", firstName()), "", "am") + `<ul class="as-list">${lines}</ul>
    <div class="row">${first ? asGo(first.id, T("asStart", esc(first.title))) : ""}<button class="btn ghost small" type="button" data-as="away:am">${T("asGotIt")}</button></div>`
}
function planCard(d, S) {
  const mins = nowMins(), open = nodesFor(d).filter(n => n.kind !== "weekly" && n.from != null && !nodeState(n, d).cleared);
  const now = open.filter(n => n.from <= mins && mins < n.to), later = open.filter(n => n.from > mins);
  const missed = open.filter(n => n.to <= mins);
  const row = (n, tag, cls) => { const st = nodeState(n, d), nx = nextOpen(n, d);
    return `<li class="as-row ${cls}"><span class="as-tag">${tag}</span><span class="as-t"><b>${esc(n.title)}</b><span>${cls === "later" ? fmtClock(n.from) : cls === "now" ? T("asUntil", fmtClock(n.to)) : T("asLate")} · ${T("asLeft", st.total - st.n)}${nx ? ` · ${esc(nx.name || itemTitle(nx, d))}` : ""}</span></span>
      <button class="as-open" type="button" data-as="go:${esc(n.id)}" aria-label="${T("asOpen", esc(n.title))}"><span class="chev" aria-hidden="true"></span></button></li>`; };
  const rows = [...now.map(n => row(n, T("asNow"), "now")), ...later.slice(0, now.length ? 1 : 2).map((n, i) => row(n, i ? T("asLater") : T("asNext"), "later")), ...missed.slice(-1).map(n => row(n, T("asMissed"), "missed"))];
  if (!rows.length) return "";
  return asHead("🧭", T("asPlanT"), T("doneToday", S.doneToday, S.totalToday), "plan") + `<ul class="as-plan">${rows.join("")}</ul>
    <button class="linkish as-rough" type="button" data-as="ask">${T("asRoughLink")}</button>`;
}
function badCard(d, S) {
  const a = asstDay();
  if (!a.mood) return asHead("🫶", T("asBadT", firstName()), T("asBadSub"), "bad") + `<div class="wo-why" role="group" aria-label="${T("asBadT", firstName())}">${ASST_MOODS.map(m =>
    `<button type="button" class="wo-chip" data-as="mood:${m}"><span aria-hidden="true">${MOOD_EMO[m]}</span>${T("mood_" + m)}</button>`).join("")}</div>`;
  const m = mustDos(d), more = Math.max(0, m.list.length - 5), items = m.list.slice(0, 5).map(id => { const w = asstWhere(id, d); return w ? `<li class="as-row"><span class="as-t"><b>${keyIds(d).includes(id) ? "★ " : ""}${w.t}</b>${w.time ? `<span>${w.time}</span>` : ""}</span>
    <button class="as-open" type="button" data-as="go:${esc(w.node)}" aria-label="${T("asOpen", w.t)}"><span class="chev" aria-hidden="true"></span></button></li>` : ""; }).join("");
  return asHead(MOOD_EMO[a.mood], T("asMustT"), m.list.length ? (m.need ? T("asMustSub", m.need) : T("asMustStar")) : T("asMustNone"), "bad")
    + `<p class="as-say">${T("asMood_" + a.mood)}</p>${items ? `<ul class="as-plan">${items}</ul>` : ""}${more ? `<p class="as-more">${T("asMore", more)}</p>` : ""}<button class="linkish as-rough" type="button" data-as="mood:">${T("woWhyChange")}</button>`;
}
function pmCard(d, S) {
  const nodes = nodesFor(d), left = nodes.filter(n => n.kind === "block" && !nodeState(n, d).cleared && n.to > nowMins());
  const tonight = left.flatMap(n => n.b.items.filter(i => shown(i, d) && !(store.days[dkey(d)] || {})[i.id]).map(i => esc(itemTitle(i, d)))).slice(0, 3);
  const tm1 = new Date(d); tm1.setDate(tm1.getDate() + 1); const TW = WORKOUTS[tm1.getDay()] && CFG.showWorkouts !== false ? WORKOUTS[tm1.getDay()] : null;
  const firstT = nodesFor(tm1).find(n => n.from != null && n.kind === "block");
  const ws = weekSummary(keyToDate(wkey(d))), pct = S.totalToday ? Math.round(100 * S.doneToday / S.totalToday) : 0;
  const lines = [asLine(pct >= 80 ? "🌟" : "📋", T("asPmDone", S.doneToday, S.totalToday, S.todayXP, S.streak)),
    tonight.length ? asLine("🌙", T("asPmLeft", tonight.join(", "))) : asLine("✅", T("asPmNoLeft")),
    asLine("➡️", TW ? T("asPmWo", esc(TW.name), TW.from != null ? fmtClock(TW.from) : "") : firstT ? T("asPmFirst", esc(firstT.title), fmtClock(firstT.from)) : T("asPmRest")),
    ws.miss ? asLine("💡", T("asPmTip", esc(ws.miss.t), ws.miss.n)) : ""].join("");
  const sec = left[0];
  return asHead(pct >= 80 ? "🌙" : "🫶", T(pct >= 80 ? "asPmGood" : "asPmOk", firstName()), "", "pm") + `<ul class="as-list">${lines}</ul>
    <div class="row">${sec ? asGo(sec.id, T("asFinish", esc(sec.title)), "ghost") : ""}<button class="btn ghost small" type="button" data-as="away:pm">${T("asNight")}</button></div>`;
}

function renderAssist(S) {
  const el = $("assist"); if (!el) return;
  let html = "";
  if (!store.asstOff && $("welcome").hidden && CFG && BLOCKS.length) {
    const d = routineDate(), mins = nowMins(), a = asstDay(); S = S || lastS || computeAll();
    const allDone = S.totalToday && S.doneToday === S.totalToday;
    const evening = mins >= 20 * 60 + 30 || (allDone && mins >= 18 * 60);
    if (evening) html = asstAway("pm") ? "" : pmCard(d, S); // after Good night, the card rests until tomorrow
    else if ((a.mood || asstAsk || behind(d, S)) && !asstAway("bad")) html = badCard(d, S);
    else if (mins < 12 * 60 && !allDone && !asstAway("am")) html = amCard(d, S);
    else if (!allDone && !asstAway("plan")) html = planCard(d, S);
  }
  if (!html) { el.hidden = true; el.innerHTML = asstHTML = ""; return; }
  if (asstHTML !== html) el.innerHTML = asstHTML = html; // don't redraw (and lose focus) on the minute refresh
  el.hidden = false;
}
function asstWrap(fn) { save(); fn && fn(); renderAssist(); }
$("assist").addEventListener("click", e => {
  const b = e.target.closest("[data-as]"); if (!b) return; audio();
  const [act, arg] = b.dataset.as.split(":"), d = routineDate();
  if (act === "go") { const n = nodesFor(d).find(x => x.id === arg); if (n) openSheet(n.id); return; }
  if (act === "away") { const a = asstDay(); a.x = [...new Set([...(a.x || []), arg])]; if (arg === "bad") { asstAsk = false; } sfx("pop"); return asstWrap(); }
  if (act === "ask") { asstAsk = true; const a = asstDay(); if (a.x) a.x = a.x.filter(c => c !== "bad"); sfx("pop"); return asstWrap(); }
  if (act === "mood") {
    const a = asstDay(); if (!arg) { delete a.mood; asstAsk = true; return asstWrap(); }
    if (!ASST_MOODS.includes(arg)) return;
    a.mood = arg; sfx("pop"); buzz(10); say(T("asMoodSay_" + arg), "", arg === "tired" ? "sleepy" : "happy", 3500);
    // A workout reason sets up the workout's plan B too, unless it's already done or has a reason.
    const t = typeof woToday === "function" ? woToday() : null;
    if (t && !t.done && !t.w && arg !== "busy") { woState()[t.k] = { why: arg }; if (arg === "rain" && store.wxOn) setTimeout(woCheckRain, 0); }
    lastS = null; prevCleared = null; asstWrap(() => refresh(true));
  }
});
function asstSettingsHTML() {
  return `<div class="set-group"><div class="sw-row"><div><h3>${T("asName")}</h3><p>${T("asHelp")}</p></div>
    <button class="toggle" type="button" role="switch" aria-checked="${!store.asstOff}" data-asst="toggle" aria-label="${T("asName")}"><i></i></button></div></div>`;
}
$("shBody").addEventListener("click", e => { if (!e.target.closest('[data-asst="toggle"]')) return; store.asstOff = !store.asstOff; save(); renderAssist(); renderSheet(true); });
asstState();
if (typeof booted !== "undefined" && booted) renderAssist();
