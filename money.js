/* Tunas Routine — Money: a simple monthly money tracker inside the Me tab.
   Money in for the month, spends by category, a monthly report and kind tips from Tunas.
   It lives in the normal progress data (store.money in tunas-data-v1), so backups and restores carry it.
   Nothing is sent anywhere. Amounts are kept in one currency the person picks; nothing is converted.
   Shape: store.money = { cur: "IDR", m: { "2026-11": { inc: 5000000, x: [{ id, a: 25000, c: "food", n: "Nasi padang", d: 7 }] } } } */

const MONEY_CATS = [
  { id: "food", e: "🍜", c: "--orange" }, { id: "transport", e: "🛵", c: "--sky" }, { id: "bills", e: "💡", c: "--gold" },
  { id: "shopping", e: "🛍️", c: "--pink" }, { id: "fun", e: "🎉", c: "--epic" }, { id: "health", e: "💊", c: "--green" },
  { id: "family", e: "🤲", c: "--info" }, { id: "other", e: "📦", c: "--control" }
];
const MONEY_MAX = 1e13, MONEY_ITEMS = 500, MONEY_NOTE = 40;
// Shown first in the currency list. Every other currency the phone knows comes after.
const MONEY_POPULAR = ["IDR", "MYR", "SGD", "BND", "THB", "PHP", "VND", "USD", "EUR", "GBP", "AUD", "JPY", "KRW", "CNY", "HKD", "INR", "SAR", "AED"];
const MONEY_FALLBACK = [...MONEY_POPULAR, "CAD", "CHF", "NZD", "TWD", "PKR", "BDT", "LKR", "NPR", "MMK", "KHR", "LAK", "QAR", "KWD", "OMR", "BHD", "EGP", "TRY", "ZAR", "NGN", "KES", "BRL", "MXN", "SEK", "NOK", "DKK", "PLN", "RUB"];
// Currencies that read better in their home number style (Rp 1.500.000 rather than IDR 1,500,000).
const MONEY_LOC = { IDR: "id-ID", MYR: "ms-MY", SGD: "en-SG", BND: "ms-BN", THB: "th-TH-u-nu-latn", PHP: "en-PH", VND: "vi-VN", JPY: "ja-JP" };
const MONEY_ICO = `<svg class="ico" viewBox="0 0 24 24"><path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H18v3H6.5a.5.5 0 0 0 0 1H20a1 1 0 0 1 1 1v9.5a1.5 1.5 0 0 1-1.5 1.5h-13A2.5 2.5 0 0 1 4 17.5zm12 7.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0z"/></svg>`;
const MN = { month: null, cat: "food", picking: false, top: 0 };

let moneyCurList = null;
const moneyCurAll = () => { if (!moneyCurList) { moneyCurList = MONEY_FALLBACK; try { if (Intl.supportedValuesOf) moneyCurList = Intl.supportedValuesOf("currency").filter(c => c !== "XXX"); } catch (e) {} } return moneyCurList; };
const moneyCurOK = c => { if (typeof c !== "string" || !/^[A-Z]{3}$/.test(c) || (!moneyCurAll().includes(c) && !MONEY_FALLBACK.includes(c))) return false;
  try { new Intl.NumberFormat("en", { style: "currency", currency: c }); return true; } catch (e) { return false; } };
// A first guess from the phone's language and region. The person can change it at the bottom of Money.
function moneyGuessCur() {
  const langs = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ""]).map(l => String(l));
  if (langs.some(l => /^(id|in)\b/i.test(l) || /-ID$/i.test(l))) return "IDR";
  const reg = { MY: "MYR", SG: "SGD", BN: "BND", TH: "THB", PH: "PHP", VN: "VND", US: "USD", GB: "GBP", AU: "AUD", JP: "JPY", KR: "KRW", IN: "INR", CN: "CNY", HK: "HKD", AE: "AED", SA: "SAR",
    DE: "EUR", FR: "EUR", NL: "EUR", ES: "EUR", IT: "EUR", IE: "EUR", BE: "EUR", AT: "EUR", PT: "EUR", FI: "EUR" };
  for (const l of langs) { const r = (l.split("-")[1] || "").toUpperCase(); if (reg[r]) return reg[r]; }
  return "MYR";
}
const moneyKey = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
const moneyKeyDate = k => { const [y, m] = k.split("-").map(Number); return new Date(y, m - 1, 1); };
const moneyShift = (k, n) => { const d = moneyKeyDate(k); d.setMonth(d.getMonth() + n); return moneyKey(d); };
const moneyDays = k => { const d = moneyKeyDate(k); return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate(); };
const moneyNum = v => { const n = +v; return Number.isFinite(n) && n > 0 ? Math.min(n, MONEY_MAX) : 0; };
const moneyId = () => Date.now().toString(36).slice(-6) + Math.random().toString(36).slice(2, 6);

// Checks the saved money data every time it is read, so old data, restores and hand-edited backups are all safe.
function moneyState() {
  let m = store.money;
  if (!m || typeof m !== "object" || Array.isArray(m)) m = store.money = {};
  if (m.cur != null && !moneyCurOK(m.cur)) delete m.cur;
  if (!m.m || typeof m.m !== "object" || Array.isArray(m.m)) m.m = {};
  for (const k of Object.keys(m.m)) {
    const v = m.m[k];
    if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(k) || !v || typeof v !== "object" || Array.isArray(v)) { delete m.m[k]; continue; }
    const inc = moneyNum(v.inc); if (inc) v.inc = inc; else delete v.inc;
    v.x = (Array.isArray(v.x) ? v.x : []).filter(x => x && typeof x === "object" && moneyNum(x.a)).slice(-MONEY_ITEMS).map(x => ({
      id: String(x.id || "").slice(0, 16) || moneyId(), a: moneyNum(x.a), c: MONEY_CATS.some(c => c.id === x.c) ? x.c : "other",
      n: String(x.n || "").slice(0, MONEY_NOTE), d: Math.min(moneyDays(k), Math.max(1, Math.floor(+x.d) || 1)) }));
    if (!v.inc && !v.x.length) delete m.m[k];
  }
  return m;
}
const moneyCur = () => store.money && store.money.cur || moneyGuessCur();
function moneyDigits(cur) {
  if (cur === "IDR") return 0; // Rupiah is never written with cents
  try { return new Intl.NumberFormat("en", { style: "currency", currency: cur }).resolvedOptions().maximumFractionDigits; } catch (e) { return 2; }
}
function moneyFmt(n, cur) {
  cur = cur || moneyCur(); const dg = moneyDigits(cur), loc = MONEY_LOC[cur] || locale();
  const o = { style: "currency", currency: cur, minimumFractionDigits: dg && n % 1 ? dg : 0, maximumFractionDigits: dg };
  try { return new Intl.NumberFormat(loc, { ...o, currencyDisplay: "narrowSymbol" }).format(n); }
  catch (e) { try { return new Intl.NumberFormat(loc, o).format(n); } catch (_) { return `${cur} ${(+n).toFixed(dg)}`; } }
}
// The number alone, grouped the local way, for putting back in an input box (5.000.000 for Rupiah).
function moneyPlain(n, cur) {
  cur = cur || moneyCur(); const dg = moneyDigits(cur);
  try { return new Intl.NumberFormat(MONEY_LOC[cur] || locale(), { maximumFractionDigits: dg }).format(n); } catch (e) { return String(n); }
}
const moneySym = cur => { try { const p = new Intl.NumberFormat(MONEY_LOC[cur] || locale(), { style: "currency", currency: cur, currencyDisplay: "narrowSymbol" }).formatToParts(0).find(x => x.type === "currency"); return p ? p.value : cur; } catch (e) { return cur; } };
// Reads what people actually type: 25000, 25.000, 25,000, 25,50, 2.5k, 25rb, 1.5jt, 1,5 juta, 2m.
function moneyParse(s, cur) {
  let t = String(s == null ? "" : s).toLowerCase().replace(/[\s\u00a0\u202f']/g, "");
  if (/[-\u2212]/.test(t)) return NaN; // spends and money in are always positive
  let mul = 1; const suf = t.match(/(ribu|rb|k|juta|jt|j|m)$/);
  if (suf) { mul = /^(ribu|rb|k)$/.test(suf[1]) ? 1e3 : 1e6; t = t.slice(0, -suf[1].length); }
  t = t.replace(/[^\d.,]/g, ""); if (!/\d/.test(t)) return NaN;
  const dg = moneyDigits(cur || moneyCur()), dot = t.lastIndexOf("."), com = t.lastIndexOf(",");
  let dec = -1;
  if (dot >= 0 && com >= 0) dec = Math.max(dot, com);
  else if (dot >= 0 || com >= 0) {
    const sep = dot >= 0 ? "." : ",", parts = t.split(sep), tail = parts[parts.length - 1];
    // One separator with 1-2 digits after it is a decimal (2.5, 25,50); groups of 3 are thousands (1.500.000).
    // With a short word (2.5jt) it's always a decimal. Rupiah-style currencies with no cents treat it as thousands.
    if (parts.length === 2 && (mul > 1 || (tail.length !== 3 && dg > 0))) dec = t.lastIndexOf(sep);
  }
  const num = dec >= 0 ? t.slice(0, dec).replace(/[.,]/g, "") + "." + t.slice(dec + 1).replace(/[.,]/g, "") : t.replace(/[.,]/g, "");
  const n = parseFloat(num) * mul, f = Math.pow(10, dg);
  return Number.isFinite(n) ? Math.round(n * f) / f : NaN;
}
const moneyCatName = id => (T("mnCats") || {})[id] || id;
const moneyMonthName = k => moneyKeyDate(k).toLocaleDateString(locale(), { month: "long", year: "numeric" });
const moneyMonthShort = k => moneyKeyDate(k).toLocaleDateString(locale(), { month: "long" });

// Everything the report and the tips need for one month.
function moneyReport(k) {
  const m = moneyState(), mo = m.m[k] || {}, items = mo.x || [], inc = mo.inc || 0;
  const spent = items.reduce((s, x) => s + x.a, 0), by = {};
  items.forEach(x => { by[x.c] = (by[x.c] || 0) + x.a; });
  const cats = Object.keys(by).map(id => ({ id, a: by[id], p: spent ? by[id] / spent : 0 })).sort((a, b) => b.a - a.a);
  const now = new Date(), nowK = moneyKey(now), isNow = k === nowK, days = moneyDays(k), day = isNow ? now.getDate() : days;
  // Bills like rent often land early in the month, so they're counted once instead of stretched over the month.
  const bills = by.bills || 0, proj = isNow && day >= 10 ? bills + (spent - bills) / day * days : spent;
  const prev = m.m[moneyShift(k, -1)], prevSpent = prev ? (prev.x || []).reduce((s, x) => s + x.a, 0) : 0;
  return { k, inc, spent, left: inc - spent, pct: inc ? spent / inc : 0, cats, items, isNow, day, days, proj, prevSpent };
}
// Tunas's advice: up to 3 short, kind lines. Never scolds; an over-budget month gets a plan, not a lecture.
function moneyTips(R) {
  const f = n => `<b>${esc(moneyFmt(n))}</b>`, tips = [];
  if (!R.inc && !R.items.length) return [T("mnTipStart")];
  if (!R.inc) tips.push(T("mnTipNoInc"));
  else if (!R.items.length) tips.push(T("mnTipFirst"));
  else if (R.spent > R.inc) tips.push(T("mnTipOver", f(R.spent - R.inc)));
  else if (R.isNow && R.proj > R.inc * 1.1 && R.day < R.days - 2) tips.push(T("mnTipPace", f(R.proj)));
  else if (R.pct >= 0.9) tips.push(T("mnTipTight", f(R.left)));
  else if (R.isNow && R.day < R.days) tips.push(T("mnTipTrack", f(R.left), R.days - R.day));
  else tips.push(T("mnTipSave", f(R.left)));
  // Rent and bills are mostly fixed, so the "biggest spend" tip looks at the spends that can actually change.
  const top = R.cats.find(c => c.id !== "bills");
  if (top && R.items.length >= 3 && top.p >= 0.35) tips.push(`${T("mnTipTop", esc(moneyCatName(top.id)), Math.round(top.p * 100))} ${(T("mnCatTip") || {})[top.id] || ""}`.trim());
  const treats = R.cats.filter(c => c.id === "fun" || c.id === "shopping").reduce((s, c) => s + c.a, 0);
  if (R.inc && treats / R.inc >= 0.3 && !(top && ["fun", "shopping"].includes(top.id) && tips.length > 1)) tips.push(T("mnTipTreats"));
  // Comparing a half-done month with a whole one isn't fair, so this month only compares once it's already higher.
  if (R.prevSpent && R.spent) {
    if (!R.isNow && R.spent < R.prevSpent) tips.push(T("mnTipLess", f(R.prevSpent - R.spent)));
    else if (R.spent > R.prevSpent * 1.15) tips.push(T("mnTipMore", f(R.spent - R.prevSpent)));
  }
  if (tips.length < 2 && R.items.length) tips.push(T("mnTipNice"));
  return tips.slice(0, 3);
}

// The card in the Me tab that opens Money.
function moneyCardHTML() {
  const k = moneyKey(new Date()), R = moneyReport(k), mon = moneyMonthShort(k);
  const line = R.inc ? (R.left >= 0 ? T("mnMeLeft", mon, esc(moneyFmt(R.left))) : T("mnMeOver", mon, esc(moneyFmt(-R.left))))
    : R.spent ? T("mnMeSpent", mon, esc(moneyFmt(R.spent))) : T("mnMeEmpty");
  return `<button class="card mn-entry" type="button" data-mnopen><span class="mn-entry-ico" aria-hidden="true">${MONEY_ICO}</span>
    <span class="mn-entry-t"><b>${T("mnTitle")}</b><span>${line}</span></span><span class="chev" aria-hidden="true"></span></button>`;
}
/* ---------- Currency picker ----------
   A full list people can scan and search (by name, code or country: "rupiah", "IDR", "Indonesia"), with a flag, the name in
   their language and a sample amount, so they can see straight away how money will look. Opened from the currency pill or
   the symbol box next to any amount, and offered once at the top of Money until a currency is picked. */
const moneyFlag = c => {
  if (c === "EUR") return "🇪🇺";
  const r = c.slice(0, 2); if (c[0] === "X" || !moneyRegionName(r)) return "💱";
  return String.fromCodePoint(...[...r].map(ch => 0x1F1E6 + ch.charCodeAt(0) - 65));
};
let moneyDN = {};
function moneyDNof(type, lang) { const key = type + lang; if (!(key in moneyDN)) { try { moneyDN[key] = new Intl.DisplayNames([lang], { type }); } catch (e) { moneyDN[key] = null; } } return moneyDN[key]; }
const moneyRegionName = (r, lang) => { const d = moneyDNof("region", lang || locale()); try { const n = d && d.of(r); return n && n !== r ? n : ""; } catch (e) { return ""; } };
const moneyCurName = (c, lang) => { const d = moneyDNof("currency", lang || locale()); try { const n = d && d.of(c); return n && n !== c ? n : c; } catch (e) { return c; } };
// The few currencies to show as big buttons: the phone's guess first, then the region's neighbours.
const moneyQuick = () => [...new Set([moneyGuessCur(), "IDR", "MYR", "SGD", "USD"])].filter(moneyCurOK).slice(0, 4);
function moneyCurRow(c, cur) {
  const name = moneyCurName(c), country = c === "EUR" ? "" : moneyRegionName(c.slice(0, 2));
  // Search words: code, the name in the app's language and in English, and the country, so "rupiah", "Indonesia" or "idr" all find IDR.
  const words = [c, name, moneyCurName(c, "en"), country, moneyRegionName(c.slice(0, 2), "en"), moneySym(c)].join(" ").toLowerCase();
  return `<li data-q="${esc(words)}"><button type="button" class="mn-cur-row" data-mncur="${c}" aria-pressed="${c === cur}">
    <span class="mn-flag" aria-hidden="true">${moneyFlag(c)}</span><span class="mn-cur-t"><b>${esc(name)}</b><small>${c} · ${esc(moneyFmt(1500, c))}</small></span>
    ${c === cur ? `<span class="mn-cur-on" aria-hidden="true">${I.check}</span>` : ""}</button></li>`;
}
function renderMoneyCur() {
  const cur = moneyCur(), body = $("shBody"), guess = moneyGuessCur();
  $("shHead").innerHTML = sheetHead("star", T("mnCurPick"), T("mnCurPickSub", esc(moneyFmt(1500, cur))), null, "--gold");
  $("shHead").querySelector(".sh-ico").innerHTML = MONEY_ICO;
  $("shClose").onclick = () => moneyCurClose();
  const sug = [...new Set([cur, guess])].filter(moneyCurOK);
  const pop = MONEY_POPULAR.filter(c => moneyCurOK(c) && !sug.includes(c));
  const rest = moneyCurAll().filter(c => moneyCurOK(c) && !sug.includes(c) && !pop.includes(c)).sort((a, b) => moneyCurName(a).localeCompare(moneyCurName(b), locale()));
  const group = (t, list) => list.length ? `<section class="mn-cur-g"><h4>${t}</h4><ul>${list.map(c => moneyCurRow(c, cur)).join("")}</ul></section>` : "";
  body.innerHTML = `<div class="mn mn-picker">
    <button class="linkish mn-back" type="button" data-mn="curBack"><span class="chev l" aria-hidden="true"></span>${T("mnCurBack")}</button>
    <label class="sr" for="mnCurQ">${T("mnCurSearch")}</label>
    <input class="field mn-cur-q" id="mnCurQ" type="search" enterkeyhint="search" autocomplete="off" placeholder="${T("mnCurSearch")}">
    ${group(T("mnCurSuggest"), sug)}${group(T("mnCurPop"), pop)}${group(T("mnCurAll"), rest)}
    <p class="mn-help mn-cur-none" hidden>${T("mnCurNone")}</p>
    <p class="mn-help">${T("mnCurHelp")}</p></div>`;
  body.scrollTop = 0;
}
function moneyCurFilter(q) {
  const body = $("shBody"), w = q.trim().toLowerCase().split(/\s+/).filter(Boolean); let any = false;
  body.querySelectorAll(".mn-cur-g").forEach(g => { let n = 0;
    g.querySelectorAll("li").forEach(li => { const ok = w.every(x => li.dataset.q.includes(x)); li.hidden = !ok; if (ok) n++; });
    g.hidden = !n; if (n) any = true; });
  body.querySelector(".mn-cur-none").hidden = any;
}
function moneyCurClose() { MN.picking = false; renderMoney(false); $("shBody").scrollTop = MN.top || 0; }
function moneyCurSet(c) {
  if (!moneyCurOK(c)) return;
  const m = moneyState(), was = m.cur; m.cur = c;
  if (!save()) { m.cur = was; return; }
  sfx("ding"); buzz(10); toast(T("mnCurSaved", esc(moneyCurName(c))), "check");
  if (MN.picking) moneyCurClose(); else renderMoney(true);
}
// Big buttons for the first-use card. Two "$" side by side don't help anyone, so a symbol that repeats shows its code instead.
function moneyQuickHTML(cur) {
  const list = moneyQuick(), syms = list.map(moneySym);
  return list.map((c, i) => `<button type="button" class="mn-q" data-mnset="${c}" aria-pressed="${c === cur}"><span class="mn-flag" aria-hidden="true">${moneyFlag(c)}</span>
    <b>${esc(syms.indexOf(syms[i]) !== syms.lastIndexOf(syms[i]) ? c : syms[i])}</b><small>${esc(moneyCurName(c))}</small></button>`).join("");
}
const moneyCurBtn = (cur, cls) => `<button type="button" class="${cls}" data-mn="cur" aria-label="${esc(T("mnCurChange", moneyCurName(cur)))}">`;

function renderMoney(keep) {
  if (MN.picking && keep) return renderMoneyCur();
  MN.picking = false;
  const m = moneyState(), cur = moneyCur(), body = $("shBody"), top = keep ? body.scrollTop : 0, nowK = moneyKey(new Date());
  if (!MN.month || MN.month > nowK) MN.month = nowK;
  const k = MN.month, R = moneyReport(k), f = n => esc(moneyFmt(n));
  $("shHead").innerHTML = sheetHead("star", T("mnTitle"), T("mnSub"), null, "--gold");
  $("shHead").querySelector(".sh-ico").innerHTML = MONEY_ICO;
  $("shClose").onclick = closeSheet;
  const over = R.inc && R.left < 0;
  const sum = `<section class="card mn-sum" aria-labelledby="mnMonthT">
      <div class="mn-in"><div class="mn-in-h"><label for="mnInc">${T("mnIn")}</label>${moneyCurBtn(cur, "mn-cur-pill")}<span aria-hidden="true">${moneyFlag(cur)}</span>${cur}<span class="mn-caret" aria-hidden="true"></span></button></div>
        <div class="mn-amt">${moneyCurBtn(cur, "mn-sym")}${esc(moneySym(cur))}</button>
        <input class="field" id="mnInc" inputmode="decimal" enterkeyhint="done" autocomplete="off" value="${R.inc ? esc(moneyPlain(R.inc)) : ""}" placeholder="${T("mnAmtPh")}"></div></div>
      <p class="mn-help">${T("mnInHelp")}</p>
      <div class="mn-rows">
        <p><span>${T("mnSpent")}</span><b>${f(R.spent)}</b></p>
        ${R.inc ? `<p class="mn-left${over ? " over" : ""}"><span>${over ? T("mnOver") : T("mnLeft")}</span><b>${f(Math.abs(R.left))}</b></p>` : ""}
      </div>
      ${R.inc ? `<div class="bar mn-bar${over ? " over" : R.pct >= 0.9 ? " tight" : ""}"><i style="${fillPct(100 * R.pct)}"></i><b>${T("mnPct", Math.round(R.pct * 100))}</b></div>` : `<p class="mn-help">${T("mnNoInc")}</p>`}
    </section>`;
  const chips = MONEY_CATS.map(c => `<button type="button" class="mn-cat" data-mncat="${c.id}" aria-pressed="${MN.cat === c.id}" style="--c:var(${c.c})"><span aria-hidden="true">${c.e}</span>${esc(moneyCatName(c.id))}</button>`).join("");
  const add = `<section class="set-group nofold mn-add"><h3>${T("mnAddT")}</h3>
      <div class="mn-amt">${moneyCurBtn(cur, "mn-sym")}${esc(moneySym(cur))}</button><label class="sr" for="mnAmt">${T("mnAmt")}</label>
        <input class="field" id="mnAmt" inputmode="decimal" enterkeyhint="done" autocomplete="off" placeholder="${T("mnAmtPh")}"></div>
      <div class="mn-cats" role="group" aria-label="${T("mnCat")}">${chips}</div>
      <label class="sr" for="mnNote">${T("mnNotePh")}</label><input class="field" id="mnNote" maxlength="${MONEY_NOTE}" enterkeyhint="done" autocomplete="off" placeholder="${T("mnNotePh")}">
      <button class="btn" type="button" data-mn="add">${T("mnAddBtn")}</button>
      <p class="mn-help">${T("mnShort")}</p></section>`;
  const tips = moneyTips(R).map(t => `<li>${t}</li>`).join("");
  const bars = R.cats.map(c => { const C = MONEY_CATS.find(x => x.id === c.id);
    return `<li style="--c:var(${C.c})"><span class="mn-ce" aria-hidden="true">${C.e}</span><span class="mn-ct"><span class="mn-cl"><b>${esc(moneyCatName(c.id))}</b><small>${Math.round(c.p * 100)}%</small><b class="mn-ca">${f(c.a)}</b></span>
      <span class="bar"><i style="${fillPct(100 * c.p)}"></i></span></span></li>`; }).join("");
  const report = `<section class="mn-report" aria-labelledby="mnRepT"><div class="me-th"><h3 id="mnRepT">${T("mnReport")}</h3><span>${esc(moneyMonthShort(k))}</span></div>
      <div class="mn-tunas"><div class="mascot mn-av happy" aria-hidden="true">${mascotSVG()}</div><div class="bubble"><b>${T("mnTunasSays")}</b><ul>${tips}</ul></div></div>
      ${bars ? `<h4>${T("mnWhere")}</h4><ul class="mn-cbars">${bars}</ul>` : ""}</section>`;
  const rows = R.items.map((x, i) => ({ x, i })).sort((a, b) => b.x.d - a.x.d || b.i - a.i).map(({ x }) => {
    const C = MONEY_CATS.find(c => c.id === x.c), t = x.n || moneyCatName(x.c), d = new Date(moneyKeyDate(k).getFullYear(), moneyKeyDate(k).getMonth(), x.d);
    return `<li style="--c:var(${C.c})"><span class="mn-ce" aria-hidden="true">${C.e}</span><span class="mn-lt"><b>${esc(t)}</b><small>${esc(d.toLocaleDateString(locale(), { day: "numeric", month: "short" }))}${x.n ? ` · ${esc(moneyCatName(x.c))}` : ""}</small></span>
      <b class="mn-la">${f(x.a)}</b><button class="mn-del" type="button" data-mndel="${esc(x.id)}" aria-label="${esc(T("mnDel", t))}">${I.x}</button></li>`; }).join("");
  const list = `<section class="mn-list" aria-labelledby="mnListT"><div class="me-th"><h3 id="mnListT">${T("mnSpends")}</h3><span>${R.items.length}</span></div>
      ${rows ? `<ul>${rows}</ul>` : `<p class="mn-help">${T("mnNoSpends")}</p>`}</section>`;
  const past = Object.keys(m.m).filter(x => x !== k).sort().reverse().slice(0, 12).map(x => { const P = moneyReport(x);
    return `<li><button type="button" class="mn-past-b" data-mnmonth="${x}"><b>${esc(moneyMonthName(x))}</b><span>${T("mnPastLine", f(P.spent), P.inc ? f(P.inc) : "")}</span><span class="chev" aria-hidden="true"></span></button></li>`; }).join("");
  body.innerHTML = `<div class="mn">
    <div class="mn-month"><button class="mn-arrow" type="button" data-mn="prev" aria-label="${T("mnPrev")}"><span class="chev l" aria-hidden="true"></span></button>
      <h3 id="mnMonthT">${esc(moneyMonthName(k))}</h3>
      <button class="mn-arrow" type="button" data-mn="next" aria-label="${T("mnNext")}" ${k >= nowK ? "disabled" : ""}><span class="chev" aria-hidden="true"></span></button></div>
    ${k !== nowK ? `<button class="linkish mn-now" type="button" data-mn="now">${T("mnBackNow")}</button>` : ""}
    ${m.cur ? "" : `<section class="card mn-first" aria-labelledby="mnFirstT"><h3 id="mnFirstT">${T("mnCurQ")}</h3><p class="mn-help">${T("mnCurQSub")}</p>
      <div class="mn-quick">${moneyQuickHTML(cur)}</div>
      <button class="btn ghost small" type="button" data-mn="cur">${T("mnCurOther")}</button></section>`}
    ${sum}${add}${report}${list}
    ${past ? `<section class="mn-past" aria-labelledby="mnPastT"><div class="me-th"><h3 id="mnPastT">${T("mnPast")}</h3></div><ul>${past}</ul></section>` : ""}
    <p class="mn-priv">${T("mnPriv")}</p></div>`;
  if (keep) body.scrollTop = top;
}

function moneyAdd() {
  const m = moneyState(), cur = moneyCur(), a = moneyParse($("mnAmt").value, cur);
  if (!(a > 0) || a > MONEY_MAX) { toast(T("mnBadAmt"), "x"); $("mnAmt").focus(); return; }
  const k = MN.month, mo = (m.m[k] ||= { x: [] }); mo.x ||= [];
  if (mo.x.length >= MONEY_ITEMS) return void toast(T("mnFull", MONEY_ITEMS), "x");
  const now = new Date(), d = k === moneyKey(now) ? now.getDate() : moneyDays(k);
  const x = { id: moneyId(), a, c: MN.cat, n: $("mnNote").value.trim().slice(0, MONEY_NOTE), d };
  mo.x.push(x); if (!m.cur) m.cur = cur;
  if (!save()) { mo.x.pop(); return; }
  sfx("pop"); buzz(10); renderMoney(true);
  toast(T("mnAdded", esc(moneyFmt(a)), esc(moneyCatName(x.c))), "check");
}
function moneyDelete(id) {
  const m = moneyState(), k = MN.month, mo = m.m[k]; if (!mo || !mo.x) return;
  const i = mo.x.findIndex(x => x.id === id); if (i < 0) return;
  const [x] = mo.x.splice(i, 1); save(); sfx("undo"); renderMoney(true);
  offerUndo(T("mnDeleted"), () => { const s = moneyState(), o = (s.m[k] ||= { x: [] }); o.x ||= []; o.x.splice(Math.min(i, o.x.length), 0, x); save(); if (sheetId === "money") renderMoney(true); });
}
function moneySetInc(v) {
  const m = moneyState(), cur = moneyCur(), k = MN.month, raw = String(v || "").trim();
  const a = raw ? moneyParse(raw, cur) : 0;
  if (raw && (!(a > 0) || a > MONEY_MAX)) { toast(T("mnBadAmt"), "x"); return renderMoney(true); }
  const mo = (m.m[k] ||= { x: [] }); if (a) mo.inc = a; else delete mo.inc;
  if (!m.cur) m.cur = cur;
  if (save()) { sfx("ding"); toast(T("mnIncSaved"), "check"); }
  moneyState(); renderMoney(true);
}

$("shBody").addEventListener("click", e => {
  if (e.target.closest("[data-mnopen]")) { audio(); return openSheet("money"); }
  if (sheetId !== "money") return;
  const pick = e.target.closest("[data-mncur],[data-mnset]"); if (pick) return moneyCurSet(pick.dataset.mncur || pick.dataset.mnset);
  const c = e.target.closest("[data-mncat]");
  if (c) { MN.cat = c.dataset.mncat; buzz(8); $("shBody").querySelectorAll("[data-mncat]").forEach(b => b.setAttribute("aria-pressed", b === c)); return; }
  const del = e.target.closest("[data-mndel]"); if (del) return moneyDelete(del.dataset.mndel);
  const mo = e.target.closest("[data-mnmonth]"); if (mo) { MN.month = mo.dataset.mnmonth; renderMoney(false); $("shBody").scrollTop = 0; return; }
  const b = e.target.closest("[data-mn]"); if (!b) return;
  const a = b.dataset.mn;
  if (a === "add") return moneyAdd();
  if (a === "cur") { MN.top = $("shBody").scrollTop; MN.picking = true; audio(); sfx("pop"); renderMoneyCur(); const q = $("mnCurQ"); if (q && matchMedia("(pointer:fine)").matches) q.focus({ preventScroll: true }); return; }
  if (a === "curBack") return moneyCurClose();
  if (a === "prev" || a === "next" || a === "now") {
    const nowK = moneyKey(new Date());
    MN.month = a === "now" ? nowK : moneyShift(MN.month || nowK, a === "prev" ? -1 : 1);
    if (MN.month > nowK) MN.month = nowK; if (MN.month < "2000-01") MN.month = "2000-01";
    sfx("pop"); renderMoney(true);
  }
});
$("shBody").addEventListener("change", e => {
  if (sheetId !== "money") return;
  if (e.target.id === "mnInc") return moneySetInc(e.target.value);
});
$("shBody").addEventListener("input", e => { if (sheetId === "money" && e.target.id === "mnCurQ") moneyCurFilter(e.target.value); });
$("shBody").addEventListener("keydown", e => {
  if (sheetId !== "money" || e.key !== "Enter") return;
  if (e.target.id === "mnAmt" || e.target.id === "mnNote") { e.preventDefault(); moneyAdd(); setTimeout(() => { const f = $("mnAmt"); f && f.focus({ preventScroll: true }); }, 0); }
  else if (e.target.id === "mnInc") { e.preventDefault(); e.target.blur(); }
});
