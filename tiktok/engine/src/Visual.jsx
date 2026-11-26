// Cenas visuais explicativas (pote em camadas) + legenda sincronizada com a voz.
import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';

const ANTON = 'AntonLocal';
const INTER = 'InterLocal';
const C = {y: '#F7B731', w: '#FFFFFF', mute: '#9FB0CC', red: '#FF5A5A', green: '#3DDC84', bg2: '#071226'};
export const LAYER = {ing: '#F7B731', emb: '#8FA6C8', gas: '#FF8A5B', hora: '#6C8CFF', fixo: '#B98CFF', taxa: '#FF5A5A', lucro: '#3DDC84'};
const brl = (v) => 'R$ ' + v.toLocaleString('pt-BR', {minimumFractionDigits: v % 1 ? 2 : 0, maximumFractionDigits: 2});

const Rich = ({text}) => text.split(/(\*[^*]+\*|_[^_]+_|\+[^+]+\+)/g).filter(Boolean).map((p, i) => {
  if (p.startsWith('*')) return <span key={i} style={{color: C.y}}>{p.slice(1, -1)}</span>;
  if (p.startsWith('_')) return <span key={i} style={{color: C.red}}>{p.slice(1, -1)}</span>;
  if (p.startsWith('+')) return <span key={i} style={{color: C.green}}>{p.slice(1, -1)}</span>;
  return <span key={i}>{p}</span>;
});

const useGrow = (at) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (at === undefined || at === null) return 1;
  return spring({frame: f - Math.round(at * fps), fps, config: {damping: 16, stiffness: 120, mass: 0.7}});
};

// Pote: camadas empilhadas de baixo para cima, linha do preço e a "sobra" entre o topo das camadas e o preço.
// s = {type:'jar', title, max, price:{value, from?, at?, label?}, layers:[{label, value, kind, at?}], gap:{at?, label?, tone?}}
export const Jar = ({s}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const X = 190, W = 360, Y0 = 560, H = 660, BOT = Y0 + H;
  const max = s.max || 10;
  const px = (v) => (v / max) * H;
  const grows = s.layers.map((l) => useGrow(l.at)); // eslint-disable-line react-hooks/rules-of-hooks
  let acc = 0;
  const geo = s.layers.map((l, i) => {
    const h = px(l.value) * grows[i];
    const y = BOT - px(acc) - h;
    acc += l.value * grows[i];
    return {y, h, mid: y + h / 2, g: grows[i]};
  });
  const filled = acc;
  const pg = s.price ? useGrow(s.price.at) : 1; // eslint-disable-line react-hooks/rules-of-hooks
  const priceV = s.price ? (s.price.from ?? s.price.value) + (s.price.value - (s.price.from ?? s.price.value)) * pg : 0;
  const priceY = BOT - px(priceV);
  const gg = s.gap ? useGrow(s.gap.at) : 0; // eslint-disable-line react-hooks/rules-of-hooks
  const sobra = priceV - filled;
  // rótulos à direita, sem sobreposição (mínimo 92 px entre centros)
  const wanted = geo.map((g) => g.mid);
  const ly = [...wanted];
  for (let i = 1; i < ly.length; i++) if (ly.at(i - 1) - ly.at(i) < 100) ly.splice(i, 1, ly.at(i - 1) - 100);
  const titleIn = s.static ? 1 : spring({frame: f, fps, config: {damping: 14, stiffness: 160, mass: 0.6}});
  const gapTone = s.gap && s.gap.tone === 'good' ? C.green : s.gap && s.gap.tone === 'y' ? C.y : C.red;
  return (
    <AbsoluteFill>
      {s.title && <div style={{position: 'absolute', top: 215, left: 60, right: 60, textAlign: 'center', fontFamily: ANTON, color: C.w, fontSize: s.titleSize || 88, lineHeight: 1.04, textTransform: 'uppercase', opacity: s.static ? 1 : Math.min(1, titleIn * 1.5)}}><Rich text={s.title} /></div>}
      <svg width="1080" height="1920" style={{position: 'absolute', top: 0, left: 0}}>
        {/* tampa e vidro */}
        <rect x={X - 16} y={Y0 - 58} width={W + 32} height="44" rx="12" fill="#2A3B5C" stroke="#4A5F86" strokeWidth="4" />
        <rect x={X} y={Y0 - 14} width={W} height={H + 14} rx="34" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.55)" strokeWidth="6" />
        <clipPath id="jarclip"><rect x={X + 6} y={Y0 - 8} width={W - 12} height={H + 2} rx="30" /></clipPath>
        <g clipPath="url(#jarclip)">
          {s.layers.map((l, i) => geo.at(i).h > 0.5 && (
            <g key={i}>
              <rect x={X} y={geo.at(i).y} width={W} height={geo.at(i).h + 1} fill={LAYER[l.kind] || C.y} />
              <rect x={X} y={geo.at(i).y} width={W} height="4" fill="rgba(255,255,255,0.35)" />
            </g>
          ))}
          {s.gap && gg > 0.01 && sobra > 0 && (
            <rect x={X + 10} y={priceY} width={W - 20} height={px(sobra)} fill={gapTone} fillOpacity={0.18 * gg} stroke={gapTone} strokeWidth="5" strokeDasharray="16 10" opacity={gg} />
          )}
        </g>
        {s.price && (
          <g>
            <line x1={X - 40} x2={X + W + 40} y1={priceY} y2={priceY} stroke={C.w} strokeWidth="6" strokeDasharray="22 12" />
          </g>
        )}
        {/* rótulos das camadas */}
        {s.layers.map((l, i) => geo.at(i).g > 0.05 && (
          <g key={'l' + i} opacity={Math.min(1, geo.at(i).g * 1.4)}>
            <line x1={X + W + 8} x2={X + W + 44} y1={geo.at(i).mid} y2={ly.at(i)} stroke={LAYER[l.kind] || C.y} strokeWidth="4" />
            <circle cx={X + W + 8} cy={geo.at(i).mid} r="7" fill={LAYER[l.kind] || C.y} />
          </g>
        ))}
      </svg>
      {s.layers.map((l, i) => geo.at(i).g > 0.05 && (
        <div key={'t' + i} style={{position: 'absolute', left: X + W + 56, top: ly.at(i) - 44, width: 1080 - (X + W + 56) - 40, opacity: Math.min(1, geo.at(i).g * 1.4)}}>
          <div style={{fontFamily: INTER, fontWeight: 700, color: '#D7E0EE', fontSize: 32, lineHeight: 1.1}}>{l.label}</div>
          <div style={{fontFamily: ANTON, color: LAYER[l.kind] || C.y, fontSize: 52, lineHeight: 1.05}}>{brl(l.value)}</div>
        </div>
      ))}
      {s.price && (
        <div style={{position: 'absolute', left: 20, top: priceY - 92, width: X - 30, textAlign: 'right'}}>
          <div style={{fontFamily: INTER, fontWeight: 800, color: C.mute, fontSize: 26, lineHeight: 1.1}}>{s.price.label || 'preço'}</div>
          <div style={{fontFamily: ANTON, color: C.w, fontSize: 50, lineHeight: 1}}>{brl(Math.round(priceV * 100) / 100)}</div>
        </div>
      )}
      {s.gap && gg > 0.05 && (
        <div style={{position: 'absolute', left: X, width: W, top: priceY + px(Math.max(sobra, 0)) / 2 - 50, textAlign: 'center', opacity: Math.min(1, gg * 1.4), transform: `scale(${0.85 + 0.15 * gg})`}}>
          <div style={{display: 'inline-block', background: C.bg2, borderRadius: 18, padding: '6px 20px', border: `4px solid ${gapTone}`}}>
            <div style={{fontFamily: INTER, fontWeight: 800, color: gapTone, fontSize: 30}}>{s.gap.label || 'sobra'}</div>
            <div style={{fontFamily: ANTON, color: gapTone, fontSize: 60, lineHeight: 1}}>{brl(Math.max(0, Math.round(sobra * 100) / 100))}</div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

// Legenda: mostra a frase falada em blocos de até 4 palavras, a palavra atual em amarelo.
export const Captions = ({words}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = f / fps;
  if (!words || !words.length) return null;
  const chunks = [];
  for (let i = 0; i < words.length; i += 4) chunks.push(words.slice(i, i + 4));
  const cur = chunks.find((c) => t >= c.at(0).s - 0.05 && t <= c.at(-1).e + 0.25) || null;
  if (!cur) return null;
  return (
    <div style={{position: 'absolute', left: 50, right: 50, top: 1290, textAlign: 'center'}}>
      <span style={{background: 'rgba(7,18,38,0.82)', borderRadius: 20, padding: '10px 24px', fontFamily: INTER, fontWeight: 800, fontSize: 52, lineHeight: 1.35, boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone'}}>
        {cur.map((w, i) => (
          <span key={i} style={{color: t >= w.s - 0.03 && t <= w.e + 0.08 ? C.y : C.w}}>{w.w}{i < cur.length - 1 ? ' ' : ''}</span>
        ))}
      </span>
    </div>
  );
};
