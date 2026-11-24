import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring, Audio, staticFile} from 'remotion';
import './fonts.css';
import {Dialog, Montage, Statement, Reaction} from './Story.jsx';
const ANTON = 'AntonLocal';
const INTER = 'InterLocal';

const C = {bg1: '#0E1F3A', bg2: '#071226', y: '#F7B731', w: '#FFFFFF', mute: '#9FB0CC', red: '#FF5A5A', green: '#3DDC84', card: 'rgba(255,255,255,0.06)'};
const FPS = 30;
export const totalFrames = (scenes) => scenes.reduce((a, s) => a + Math.round(s.dur * FPS), 0);

// *word* => yellow highlight, _word_ => red, +word+ => green
const Rich = ({text}) => {
  const parts = text.split(/(\*[^*]+\*|_[^_]+_|\+[^+]+\+)/g).filter(Boolean);
  return parts.map((p, i) => {
    if (p.startsWith('*')) return <span key={i} style={{color: C.y}}>{p.slice(1, -1)}</span>;
    if (p.startsWith('_')) return <span key={i} style={{color: C.red}}>{p.slice(1, -1)}</span>;
    if (p.startsWith('+')) return <span key={i} style={{color: C.green}}>{p.slice(1, -1)}</span>;
    return <span key={i}>{p}</span>;
  });
};

const useIn = (delay = 0) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: f - delay, fps, config: {damping: 14, stiffness: 160, mass: 0.6}});
};

const Pop = ({delay = 0, children, style}) => {
  const s = useIn(delay);
  return <div style={{opacity: Math.min(1, s * 1.4), transform: `translateY(${(1 - s) * 50}px) scale(${0.9 + 0.1 * s})`, ...style}}>{children}</div>;
};

const fmt = (n, dec = 0) => n.toLocaleString('pt-BR', {minimumFractionDigits: dec, maximumFractionDigits: dec});

const Hook = ({s}) => {
  const f = useCurrentFrame();
  const shake = f < 8 ? Math.sin(f * 2.2) * (8 - f) * 1.5 : 0;
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', padding: '0 80px'}}>
      {s.kicker && <Pop><div style={{fontFamily: INTER, fontWeight: 800, color: C.y, fontSize: 44, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 30, textAlign: 'center'}}>{s.kicker}</div></Pop>}
      {s.lines.map((l, i) => (
        <Pop key={i} delay={i * 6}>
          <div style={{fontFamily: ANTON, color: C.w, fontSize: s.size || 118, lineHeight: 1.08, textAlign: 'center', textTransform: 'uppercase', transform: `translateX(${shake}px)`}}><Rich text={l} /></div>
        </Pop>
      ))}
      {s.sub && <Pop delay={s.lines.length * 6 + 6}><div style={{fontFamily: INTER, fontWeight: 700, color: C.mute, fontSize: 46, marginTop: 40, textAlign: 'center'}}><Rich text={s.sub} /></div></Pop>}
    </AbsoluteFill>
  );
};

const TextScene = ({s}) => (
  <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', padding: '0 90px'}}>
    {s.lines.map((l, i) => (
      <Pop key={i} delay={i * (s.stagger || 10)}>
        <div style={{fontFamily: i === 0 && s.firstBig ? ANTON : INTER, fontWeight: 800, color: C.w, fontSize: i === 0 && s.firstBig ? 104 : s.size || 66, lineHeight: 1.2, textAlign: 'center', marginBottom: 26, textTransform: i === 0 && s.firstBig ? 'uppercase' : 'none'}}><Rich text={l} /></div>
      </Pop>
    ))}
  </AbsoluteFill>
);

const Rows = ({s}) => {
  const step = s.step || 14;
  return (
    <AbsoluteFill style={{paddingTop: 300, alignItems: 'center'}}>
      {s.title && <Pop><div style={{fontFamily: ANTON, color: C.w, fontSize: 96, textTransform: 'uppercase', textAlign: 'center', lineHeight: 1.05}}><Rich text={s.title} /></div></Pop>}
      {s.sub && <Pop delay={4}><div style={{fontFamily: INTER, fontWeight: 700, color: C.y, fontSize: 44, marginTop: 10, marginBottom: 50, textAlign: 'center'}}>{s.sub}</div></Pop>}
      <div style={{width: 900, marginTop: s.sub ? 0 : 50}}>
        {s.rows.map((r, i) => {
          const color = r.tone === 'bad' ? C.red : r.tone === 'good' ? C.green : r.tone === 'y' ? C.y : C.w;
          const total = r.total;
          return (
            <Pop key={i} delay={10 + i * step}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: total ? 'rgba(247,183,49,0.12)' : C.card, border: total ? `3px solid ${color}` : '3px solid transparent', borderRadius: 22, padding: '30px 40px', marginBottom: 22}}>
                <div style={{fontFamily: INTER, fontWeight: 700, color: total ? C.w : '#D7E0EE', fontSize: 44}}>{r.label}</div>
                <div style={{fontFamily: ANTON, color, fontSize: 70}}>{r.value}</div>
              </div>
            </Pop>
          );
        })}
      </div>
      {s.note && <Pop delay={10 + s.rows.length * step + 6}><div style={{fontFamily: INTER, fontWeight: 800, color: C.w, fontSize: 52, marginTop: 30, textAlign: 'center', padding: '0 80px', lineHeight: 1.25}}><Rich text={s.note} /></div></Pop>}
    </AbsoluteFill>
  );
};

const Big = ({s}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [8, 8 + (s.count || 30)], [s.from ?? 0, s.value], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: (t) => 1 - Math.pow(1 - t, 3)});
  const color = s.tone === 'bad' ? C.red : s.tone === 'good' ? C.green : C.y;
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', padding: '0 80px'}}>
      {s.pre && <Pop><div style={{fontFamily: INTER, fontWeight: 800, color: C.w, fontSize: 58, textAlign: 'center', marginBottom: 20, lineHeight: 1.2}}><Rich text={s.pre} /></div></Pop>}
      <Pop delay={4}><div style={{fontFamily: ANTON, color, fontSize: s.size || 230, lineHeight: 1}}>{s.prefix || ''}{fmt(p, s.dec || 0)}{s.suffix || ''}</div></Pop>
      {s.post && <Pop delay={8 + (s.count || 30)}><div style={{fontFamily: INTER, fontWeight: 700, color: C.mute, fontSize: 50, textAlign: 'center', marginTop: 24, lineHeight: 1.25, whiteSpace: 'pre-line'}}><Rich text={s.post} /></div></Pop>}
    </AbsoluteFill>
  );
};

const Steps = ({s}) => (
  <AbsoluteFill style={{paddingTop: 300, alignItems: 'center'}}>
    {s.title && <Pop><div style={{fontFamily: ANTON, color: C.w, fontSize: 92, textTransform: 'uppercase', textAlign: 'center', marginBottom: 60}}><Rich text={s.title} /></div></Pop>}
    <div style={{width: 900}}>
      {s.items.map((it, i) => (
        <Pop key={i} delay={10 + i * (s.step || 22)}>
          <div style={{display: 'flex', alignItems: 'center', marginBottom: 40}}>
            <div style={{flex: '0 0 110px', height: 110, borderRadius: 55, background: C.y, color: C.bg2, fontFamily: ANTON, fontSize: 64, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{i + 1}</div>
            <div style={{marginLeft: 34, fontFamily: INTER, fontWeight: 700, color: C.w, fontSize: 48, lineHeight: 1.2}}><Rich text={it} /></div>
          </div>
        </Pop>
      ))}
    </div>
  </AbsoluteFill>
);

const Cta = ({s}) => {
  const f = useCurrentFrame();
  const pulse = 1 + Math.sin(f / 5) * 0.03;
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', padding: '0 80px'}}>
      {s.top && <Pop><div style={{fontFamily: INTER, fontWeight: 800, color: C.w, fontSize: 60, textAlign: 'center', lineHeight: 1.2, marginBottom: 40}}><Rich text={s.top} /></div></Pop>}
      {s.keyword && <Pop delay={8}><div style={{background: C.w, color: C.bg2, fontFamily: ANTON, fontSize: s.keyword.length <= 8 ? 130 : s.keyword.length <= 13 ? 100 : 78, whiteSpace: 'nowrap', padding: '20px 60px', borderRadius: 28, border: `8px solid ${C.y}`, transform: `scale(${pulse})`, textTransform: 'uppercase'}}>{s.keyword}</div></Pop>}
      {s.bottom && <Pop delay={16}><div style={{fontFamily: INTER, fontWeight: 700, color: C.y, fontSize: 50, textAlign: 'center', marginTop: 40, lineHeight: 1.25}}><Rich text={s.bottom} /></div></Pop>}
    </AbsoluteFill>
  );
};

const MAP = {hook: Hook, text: TextScene, rows: Rows, big: Big, steps: Steps, cta: Cta, dialog: Dialog, montage: Montage, statement: Statement, reaction: Reaction};

const Chrome = ({total, series, handle}) => {
  const f = useCurrentFrame();
  return (
    <>
      <div style={{position: 'absolute', top: 0, left: 0, height: 10, width: `${(f / total) * 100}%`, background: C.y}} />
      <div style={{position: 'absolute', top: 120, left: 70, right: 70, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div style={{border: `3px solid ${C.y}`, color: C.y, borderRadius: 40, padding: '8px 26px', fontFamily: INTER, fontWeight: 800, fontSize: 32}}>{series || 'GPS do Preço'}</div>
        <div style={{color: C.mute, fontFamily: INTER, fontWeight: 600, fontSize: 28}}>valores de exemplo</div>
      </div>
      <div style={{position: 'absolute', bottom: 330, width: '100%', textAlign: 'center', color: 'rgba(255,255,255,0.45)', fontFamily: INTER, fontWeight: 700, fontSize: 30}}>{handle || '@metodo.tabelagps'}</div>
    </>
  );
};

export const Video = ({scenes, series, music, handle}) => {
  const total = totalFrames(scenes);
  const hasVoice = scenes.some((x) => x.voice);
  let start = 0;
  return (
    <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 35%, ${C.bg1} 0%, ${C.bg2} 75%)`}}>
      {scenes.map((s, i) => {
        const d = Math.round(s.dur * FPS);
        const Comp = MAP[s.type];
        const el = (
          <Sequence key={i} from={start} durationInFrames={d}>
            <Comp s={s} />
            {s.voice && <Audio src={staticFile(s.voice)} />}
          </Sequence>
        );
        start += d;
        return el;
      })}
      <Chrome total={total} series={series} handle={handle} />
      {music && <Audio src={staticFile(music)} volume={(f) => interpolate(f, [0, 10, total - 30, total], [0, hasVoice ? 0.12 : 0.5, hasVoice ? 0.12 : 0.5, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})} />}
    </AbsoluteFill>
  );
};
