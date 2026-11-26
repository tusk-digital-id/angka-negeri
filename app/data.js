// AngkaNegeri — data layer. Every figure is a published BPS (Statistics
// Indonesia) release, labelled with its own period. Nothing is estimated
// or placeholder; where a value is rounded, the label says so.

export const META = {
  updated: "26 November 2026",
  source: "BPS — Statistics Indonesia (bps.go.id), releases of 2 and 5 November 2026 unless noted",
};

export const HEADLINE = [
  { id: "growth", label: "GDP growth", value: "5.47%", unit: "year on year", period: "Q3 2026", delta: "+0.18 pts vs Q2 2026" },
  { id: "inflation", label: "Inflation", value: "3.23%", unit: "year on year", period: "October 2026", delta: "core inflation 2.56%" },
  { id: "jobs", label: "Open unemployment", value: "4.75%", unit: "of the labour force", period: "August 2026", delta: "7.38 million people" },
  { id: "poverty", label: "Poverty rate", value: "8.07%", unit: "of the population", period: "March 2026", delta: "about 22.93 million people" },
  { id: "gini", label: "Gini ratio", value: "0.363", unit: "0 = equal, 1 = unequal", period: "September 2025", delta: "down from 0.375 in March 2025" },
  { id: "population", label: "Population", value: "284.4 M", unit: "mid-year estimate", period: "Mid 2025", delta: "38 provinces" },
];

export const INDICATORS = [
  {
    id: "growth", name: "GDP growth", cat: "Economy", value: "5.47%", period: "Q3 2026",
    about: "Indonesia's economy grew 5.47% year on year in the third quarter of 2026, faster than the 5.29% of Q2 and the 5.04% of Q3 2025. Output at current prices reached Rp6,741.0 trillion in the quarter; growth for January–September 2026 stands at 5.45%.",
    series: [["Q3 2025", 5.04], ["Q4 2025", 5.39], ["Q1 2026", 5.61], ["Q2 2026", 5.29], ["Q3 2026", 5.47]],
    facts: ["Manufacturing grew 5.87% and contributed 1.20 points of the growth", "Wholesale and retail trade grew 7.14%", "Agriculture grew only 0.46% despite employing about 28% of workers", "Household consumption +5.04% · investment (GFCF) +6.06% · government consumption +8.95%"],
  },
  {
    id: "inflation", name: "Inflation (CPI)", cat: "Prices", value: "3.23%", period: "October 2026",
    about: "Consumer prices rose 3.23% year on year in October 2026, easing from 3.28% in September, with a monthly rise of 0.22% and calendar-year inflation of 2.40%. The rate sits inside Bank Indonesia's 2.5% ± 1% target band. Food, beverages and tobacco (+4.82%) contributed the most, followed by transport (+4.87%).",
    series: [["Oct 2025", 2.86], ["Nov 2025", 2.72], ["Aug 2026", 3.19], ["Sep 2026", 3.28], ["Oct 2026", 3.23]],
    facts: ["Core inflation: 2.56% year on year", "Food, beverage and tobacco inflation: 4.82%", "Transport inflation: 4.87%", "Target band of Bank Indonesia: 2.5% ± 1%"],
  },
  {
    id: "jobs", name: "Open unemployment (TPT)", cat: "Labour", value: "4.75%", period: "August 2026",
    about: "The open unemployment rate was 4.75% in August 2026 — 7.38 million people out of a labour force of 155.37 million, with 147.99 million in work. The headline hides the quality question: 85.73 million workers (57.93%) are informal, 12.84 million are underemployed, and youth unemployment (ages 15–24) is 17.50%. The average labour wage is Rp3.42 million per month.",
    series: [["Feb 2025", 4.76], ["Aug 2025", 4.85], ["Feb 2026", 4.68], ["Aug 2026", 4.75]],
    facts: ["Labour force: 155.37 million · employed: 147.99 million", "Informal workers: 85.73 million (57.93%) vs formal 62.25 million", "Underemployed: 12.84 million (8.68%)", "Youth unemployment (15–24): 17.50%", "Average monthly labour wage: Rp3.42 million"],
  },
  {
    id: "poverty", name: "Poverty rate", cat: "Welfare", value: "8.07%", period: "March 2026",
    about: "The share of Indonesians below the national poverty line fell to 8.07% in March 2026 — about 22.93 million people — continuing a steady decline from 8.47% in March 2025 and 8.25% in September 2025.",
    series: [["Mar 2025", 8.47], ["Sep 2025", 8.25], ["Mar 2026", 8.07]],
    facts: ["About 22.93 million people below the poverty line", "Extreme poverty was 0.85% in March 2025 and is approaching zero", "Measured by BPS from the national poverty line, updated every March and September"],
  },
  {
    id: "gini", name: "Gini ratio", cat: "Welfare", value: "0.363", period: "September 2025",
    about: "Income-expenditure inequality, measured by the Gini ratio, eased to 0.363 in September 2025 from 0.375 in March 2025, with declines in both urban and rural areas. A ratio of 0 means perfect equality; 1 means one household takes everything.",
    series: [["Mar 2025", 0.375], ["Sep 2025", 0.363]],
    facts: ["Urban and rural Gini both declined in September 2025", "Based on household expenditure in the Susenas survey"],
  },
  {
    id: "population", name: "Population", cat: "People", value: "284.4 M", period: "Mid 2025",
    about: "Indonesia's mid-2025 population estimate is 284.4 million people across 38 provinces — the world's fourth-largest population. More than half live on Java: West Java alone holds about 50 million. GDP per capita in 2025 was Rp78.62 million (about US$4,960).",
    series: [],
    facts: ["West Java is the largest province: about 50.3 million people", "The smallest, South Papua, holds about 0.5 million", "GDP per capita 2025: Rp78.62 million (≈ US$4,960)", "See the Provinces page for the full 38-province table"],
  },
];

// Mid-2025 population projections by province, millions, rounded to one
// decimal (BPS provincial projections). Capitals included.
export const PROVINCES = [
  ["Aceh", "Banda Aceh", 5.6], ["North Sumatra", "Medan", 15.6], ["West Sumatra", "Padang", 5.9],
  ["Riau", "Pekanbaru", 6.7], ["Jambi", "Jambi", 3.7], ["South Sumatra", "Palembang", 8.8],
  ["Bengkulu", "Bengkulu", 2.1], ["Lampung", "Bandar Lampung", 9.4], ["Bangka Belitung", "Pangkal Pinang", 1.5],
  ["Riau Islands", "Tanjung Pinang", 2.3], ["Jakarta", "Jakarta", 10.6], ["West Java", "Bandung", 50.3],
  ["Central Java", "Semarang", 38.2], ["Yogyakarta", "Yogyakarta", 3.8], ["East Java", "Surabaya", 42.1],
  ["Banten", "Serang", 12.4], ["Bali", "Denpasar", 4.4], ["West Nusa Tenggara", "Mataram", 5.6],
  ["East Nusa Tenggara", "Kupang", 5.7], ["West Kalimantan", "Pontianak", 5.9], ["Central Kalimantan", "Palangka Raya", 2.8],
  ["South Kalimantan", "Banjarmasin", 4.3], ["East Kalimantan", "Samarinda", 3.9], ["North Kalimantan", "Tanjung Selor", 0.7],
  ["North Sulawesi", "Manado", 2.7], ["Central Sulawesi", "Palu", 3.1], ["South Sulawesi", "Makassar", 9.5],
  ["Southeast Sulawesi", "Kendari", 2.8], ["Gorontalo", "Gorontalo", 1.2], ["West Sulawesi", "Mamuju", 1.5],
  ["Maluku", "Ambon", 1.9], ["North Maluku", "Sofifi", 1.4], ["West Papua", "Manokwari", 0.6],
  ["Southwest Papua", "Sorong", 0.6], ["Papua", "Jayapura", 1.1], ["South Papua", "Merauke", 0.5],
  ["Central Papua", "Nabire", 1.3], ["Highland Papua", "Wamena", 1.4],
];
