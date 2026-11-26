// AngkaNegeri — Indonesia in Numbers (entry for best-national-statistics-site-20261126-0539).
//
// What this program hands in: the static site living in app/ next to this file (plain HTML, CSS
// and ES modules, no build step, nothing loaded over the network) plus the rendered views in
// screenshots/. The site republishes Indonesia's official BPS statistics — GDP growth, inflation,
// open unemployment, poverty, the Gini ratio and the population of all 38 provinces — with every
// figure labelled by the period it actually describes, SVG charts drawn from the same data file
// the text quotes, and a searchable, sortable province table.
//
// The hand-in itself: copy app/ and screenshots/ into the output directory, then write
// dossier.json with the vendored make.fun library in vendor/makefun-frontend.ts. That file stays
// untouched on purpose — the scorer requires the dossier to be byte for byte what its own copy
// of the library writes.
//
// Run the site locally with `node serve.ts` and open http://localhost:8080.
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });

// The scorer's own caps (reference/gate.json): only text_max_bytes shapes the bytes; the others refuse an entry the
// scorer would refuse (more than 4 screenshots or one over 256 KiB; more than 993 files and directories in app/ or
// 16 MiB of app files: app/ counts beside /output's own 1000-entry cap, its screenshots/ and dossier.json).
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, { text_max_bytes: 163840, screenshots: { max: 4, max_bytes: 262144 }, app_max_files: 993, app_max_bytes: 16777216 }),
);

// One line for whoever runs this by hand: what was handed in, and where it landed.
console.log(`AngkaNegeri handed in: app/ + screenshots/ copied to ${out}, dossier.json written.`);
