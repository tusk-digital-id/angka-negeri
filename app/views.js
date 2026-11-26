import { HEADLINE, INDICATORS, META, PROVINCES } from "./data.js";

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// Vertical bar chart as inline SVG. Series: [[label, value], ...]
export function barChart(series, unit = "%") {
  if (!series.length) return "";
  const W = 720, H = 250, base = 205, top = 26;
  const vals = series.map((d) => d[1]);
  const max = Math.max(...vals) * 1.18, min = Math.min(0, Math.min(...vals));
  const span = max - min || 1;
  const bw = Math.min(92, (W - 70) / series.length - 18);
  const step = (W - 70) / series.length;
  let bars = "";
  series.forEach(([label, v], i) => {
    const x = 48 + i * step + (step - bw) / 2;
    const h = ((v - min) / span) * (base - top);
    const y = base - h;
    bars += `<rect class="bar${i === series.length - 1 ? " last" : ""}" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bw.toFixed(1)}" height="${h.toFixed(1)}" rx="5"/>`
      + `<text class="val" x="${(x + bw / 2).toFixed(1)}" y="${(y - 7).toFixed(1)}" text-anchor="middle">${v}${unit === "%" ? "%" : ""}</text>`
      + `<text x="${(x + bw / 2).toFixed(1)}" y="${base + 20}" text-anchor="middle">${esc(label)}</text>`;
  });
  const zeroY = base - ((0 - min) / span) * (base - top);
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Bar chart">
    <line class="grid" x1="40" y1="${zeroY}" x2="${W - 12}" y2="${zeroY}"/>${bars}</svg>`;
}

function statCard(h) {
  return `<a class="card" href="#/indicator/${h.id}">
    <div class="k">${esc(h.label)}</div><div class="v">${esc(h.value)}</div>
    <div class="u">${esc(h.unit)}</div>
    <div class="row"><span class="period">${esc(h.period)}</span><span class="delta">${esc(h.delta)}</span></div></a>`;
}

export function viewHome() {
  const growth = INDICATORS.find((i) => i.id === "growth");
  const poverty = INDICATORS.find((i) => i.id === "poverty");
  return `
  <section class="hero">
    <h1>Indonesia, <span class="accent">in numbers</span> you can check.</h1>
    <p class="lede">The country's official statistics — growth, prices, jobs, poverty and people — gathered in one place, each figure labelled with the period it actually describes.</p>
    <p class="updated">Latest releases folded in: ${esc(META.updated)} · Source: ${esc(META.source)}</p>
  </section>
  <section class="cards">${HEADLINE.map(statCard).join("")}</section>
  <h2 class="section">The growth story</h2>
  <p class="note">Quarterly GDP growth, year on year. The economy has held a 5.0–5.6% band for five straight quarters; Q3 2026 came in above the market consensus of about 5.2%.</p>
  <div class="panel"><h3>GDP growth by quarter</h3><p class="sub">Percent, year on year — BPS release of 5 November 2026</p>${barChart(growth.series)}</div>
  <h2 class="section">Poverty keeps falling</h2>
  <p class="note">The poverty rate has fallen at every reading since March 2025. Tap any headline card above for the full story behind a number.</p>
  <div class="panel"><h3>Poverty rate</h3><p class="sub">Percent of the population below the national poverty line</p>${barChart(poverty.series)}</div>`;
}

export function viewIndicators() {
  const rows = INDICATORS.map((i) => `
    <a class="card" href="#/indicator/${i.id}">
      <div class="k">${esc(i.cat)}</div><div class="v" style="font-size:34px">${esc(i.name)}</div>
      <div class="row"><span class="period">${esc(i.value)} · ${esc(i.period)}</span><span class="delta">details →</span></div></a>`).join("");
  return `<h1 style="font-size:32px;margin:4px 0">All indicators</h1>
  <p class="note">Six headline indicators, each with its recent series and the facts that sit underneath the headline number.</p>
  <section class="cards">${rows}</section>`;
}

export function viewIndicator(id) {
  const ind = INDICATORS.find((i) => i.id === id);
  if (!ind) return `<p>Indicator not found. <a href="#/indicators">Back to indicators</a></p>`;
  const unit = ind.id === "gini" ? "" : "%";
  return `<p class="crumb"><a href="#/indicators">Indicators</a> · ${esc(ind.cat)}</p>
  <div class="detail-head"><span class="big">${esc(ind.value)}</span><span class="per">${esc(ind.period)}</span><span class="chip">${esc(ind.name)}</span></div>
  <p class="note" style="font-size:17px;color:var(--ink)">${esc(ind.about)}</p>
  ${ind.series.length ? `<div class="panel"><h3>Recent readings</h3><p class="sub">${esc(ind.name)} — latest published values</p>${barChart(ind.series, unit)}</div>` : ""}
  <div class="panel"><h3>Under the headline</h3><ul class="facts">${ind.facts.map((f) => `<li>${esc(f)}</li>`).join("")}</ul></div>
  <p class="note">Source: ${esc(META.source)}.</p>`;
}

let provState = { q: "", key: 2, dir: -1 };

export function viewProvinces() {
  return `<h1 style="font-size:32px;margin:4px 0">38 provinces</h1>
  <p class="note">Population by province — BPS mid-2025 projections, in millions, rounded to one decimal. Search by province or capital, and tap a column heading to sort.</p>
  <div class="controls">
    <input type="search" id="pq" placeholder="Search province or capital…" value="${esc(provState.q)}" aria-label="Search provinces">
    <span class="count" id="pcount"></span>
  </div>
  <div id="ptable"></div>
  <p class="note">Java's six provinces hold well over half the national population. East Kalimantan hosts the new capital region; the four Papuan provinces were created in the 2022 split and remain the least populous.</p>`;
}

export function paintProvinces() {
  const host = document.getElementById("ptable");
  if (!host) return;
  const q = provState.q.trim().toLowerCase();
  const max = Math.max(...PROVINCES.map((p) => p[2]));
  let rows = PROVINCES.filter((p) => !q || p[0].toLowerCase().includes(q) || p[1].toLowerCase().includes(q));
  rows = rows.slice().sort((a, b) => {
    const k = provState.key;
    const r = k === 2 ? a[2] - b[2] : a[k].localeCompare(b[k]);
    return r * provState.dir;
  });
  const arrow = (k) => (provState.key === k ? (provState.dir === 1 ? " ↑" : " ↓") : "");
  host.innerHTML = `<table class="data"><thead><tr>
    <th data-k="0">Province${arrow(0)}</th><th data-k="1">Capital${arrow(1)}</th>
    <th data-k="2" class="num">Population (millions)${arrow(2)}</th></tr></thead>
    <tbody>${rows.map((p) => `<tr><td>${esc(p[0])}</td><td>${esc(p[1])}</td>
      <td class="num"><span class="bar-cell"><span class="track"><span class="fill" style="width:${(p[2] / max * 100).toFixed(0)}%"></span></span>${p[2].toFixed(1)}</span></td></tr>`).join("")}</tbody></table>`;
  const c = document.getElementById("pcount");
  if (c) c.textContent = `${rows.length} of ${PROVINCES.length} provinces`;
  host.querySelectorAll("th").forEach((th) => th.addEventListener("click", () => {
    const k = Number(th.dataset.k);
    if (provState.key === k) provState.dir *= -1; else { provState.key = k; provState.dir = k === 2 ? -1 : 1; }
    paintProvinces();
  }));
  const input = document.getElementById("pq");
  if (input) input.addEventListener("input", () => { provState.q = input.value; paintProvinces(); const n = document.getElementById("pq"); n.focus(); n.setSelectionRange(n.value.length, n.value.length); });
}

export function viewAbout() {
  return `<h1 style="font-size:32px;margin:4px 0">About the data</h1>
  <div class="panel"><h3>Where the numbers come from</h3>
  <p>Every figure on this site is a published release of <strong>BPS — Statistics Indonesia</strong>, the national statistics office. The newest figures come from the releases of 2 November 2026 (inflation) and 5 November 2026 (GDP, labour force). Welfare figures follow the March/September Susenas cycle; the latest Gini reading is September 2025 and the latest poverty reading is March 2026.</p>
  <h3>How to read this site</h3>
  <ul class="facts">
    <li>Each card and detail page labels its figure with the exact period it describes — a March 2026 poverty rate is never dressed up as today's.</li>
    <li>Province populations are BPS mid-2025 projections, rounded to one decimal, so the 38 rows sum to approximately the national estimate of 284.4 million.</li>
    <li>Unemployment uses the BPS open-unemployment definition (TPT) from the Sakernas labour-force survey.</li>
    <li>Nothing here is a forecast and nothing is sponsored; where a figure is contested in public debate, the underlying BPS series is what is shown.</li>
  </ul>
  <h3>Primary sources</h3>
  <ul class="facts">
    <li>BPS, "Indonesia's Economy in Q3-2026 Grew 5.47 Percent" — press release, 5 November 2026</li>
    <li>BPS, "Open Unemployment Rate 4.75 Percent and Average Labour Wage Rp3.42 Million, August 2026" — press release, 5 November 2026</li>
    <li>BPS, Consumer Price Index release — 2 November 2026 (October 2026 inflation 3.23%)</li>
    <li>BPS, poverty and Gini releases — March 2026 and September 2025</li>
  </ul></div>`;
}
