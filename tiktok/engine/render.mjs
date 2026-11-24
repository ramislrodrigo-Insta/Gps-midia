// Uso: node render.mjs <pasta-da-semana> [id...]
import {bundle} from '@remotion/bundler';
import {renderMedia, selectComposition} from '@remotion/renderer';
import fs from 'fs'; import path from 'path'; import {fileURLToPath} from 'url';
const here = path.dirname(fileURLToPath(import.meta.url));
const week = path.resolve(process.argv[2]);
const only = process.argv.slice(3);
const browserExecutable = process.env.CHROME_PATH || null;
const videos = JSON.parse(fs.readFileSync(path.join(week, 'videos.json'), 'utf8')).filter(v => !only.length || only.includes(v.id));
const serveUrl = await bundle({entryPoint: path.join(here, 'src/index.jsx'), publicDir: path.join(here, 'public')});
fs.mkdirSync(path.join(week, 'videos'), {recursive: true});
for (const v of videos) {
  const inputProps = {scenes: v.scenes, series: v.series, music: v.music, handle: v.handle};
  const composition = await selectComposition({serveUrl, id: 'Tiktok', inputProps, browserExecutable});
  const out = path.join(week, 'videos', `${v.id}.mp4`);
  await renderMedia({composition, serveUrl, codec: 'h264', outputLocation: out, inputProps, crf: 20, concurrency: 2, browserExecutable});
  console.log('ok', out);
}
