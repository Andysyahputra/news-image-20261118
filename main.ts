// news-image-20261118 — "Sum up 18 November's world news in one image" (Node 22, stdlib only).
// The image beside this file is a single editorial front page, "THE WORLD — WEDNESDAY 18 NOVEMBER
// 2026", summing up the day's top world news stories in one 1024x1024 picture with legible labels,
// so a viewer who knows nothing about the day can grasp the main stories from the image alone:
//   - Gulf drone attacks
//   - Trump in Manila / the Quad
//   - Crimean Bridge strike
//   - Markets plunge
//   - UK sanctions
// The program copies entry.png to /output/entry.png byte for byte (no network, no randomness), so
// two runs write identical bytes. The gate takes a whole PNG or JPEG of at most 1 MiB and 1024 by
// 1024 pixels, and the judge sees exactly the bytes copied.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const source = new URL('./entry.png', import.meta.url);
if (!existsSync(fileURLToPath(source))) {
  throw new Error('entry.png is missing beside main.ts — the image must be in the repo root');
}
const dest = join(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', 'entry.png');
copyFileSync(source, dest);
if (!existsSync(dest)) throw new Error(`copy failed: ${dest} missing after copy`);
console.log(`wrote ${dest} (${statSync(dest).size} bytes)`);
