// Cenas de história (série com personagens) para YouTube Shorts.
import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';

const C = {y: '#F7B731', w: '#FFFFFF', bg2: '#071226', red: '#FF5A5A', green: '#3DDC84', mute: '#9FB0CC'};
const ANTON = 'AntonLocal';
const INTER = 'InterLocal';
const FPS = 30;

const Rich = ({text}) => text.split(/(\*[^*]+\*|_[^_]+_|\+[^+]+\+)/g).filter(Boolean).map((p, i) =>
  p.startsWith('*') ? <span key={i} style={{color: C.y}}>{p.slice(1, -1)}</span>
  : p.startsWith('_') ? <span key={i} style={{color: C.red}}>{p.slice(1, -1)}</span>
  : p.startsWith('+') ? <span key={i} style={{color: C.green}}>{p.slice(1, -1)}</span>
  : <span key={i}>{p}</span>);

const sp = (f, d = 0, fps = FPS) => spring({frame: f - d, fps, config: {damping: 13, stiffness: 150, mass: 0.6}});

// ---------- Personagens (originais, flat) ----------
const LOOKS = {
  ana: {skin: '#E9B48A', hair: '#5A3420', shirt: '#F28DA6', apron: '#FFFFFF', hat: 'chef'},
  cliente: {skin: '#C98B5E', hair: '#1E1E1E', shirt: '#3D7BD9', apron: null, hat: 'cap'},
  beto: {skin: '#B97A4F', hair: '#111111', shirt: '#2E2E2E', apron: '#C9A15B', hat: null, beard: true},
};

export const Person = ({who = 'ana', talking = false, mood = 'neutral', flip = false, scale = 1}) => {
  const f = useCurrentFrame();
  const L = LOOKS[who];
  const bob = Math.sin(f / 9) * 4;
  const blink = f % 96 < 4;
  const mouthOpen = talking ? Math.abs(Math.sin(f / 2.6)) * 16 + 2 : 0;
  const sad = mood === 'sad', happy = mood === 'happy', shock = mood === 'shock';
  return (
    <svg width={420 * scale} height={760 * scale} viewBox="0 0 420 760" style={{transform: `translateY(${bob}px) scaleX(${flip ? -1 : 1})`}}>
      {/* corpo */}
      <path d="M70 760 C70 520 120 450 210 450 C300 450 350 520 350 760 Z" fill={L.shirt} />
      {L.apron && <path d="M130 760 L140 520 L280 520 L290 760 Z" fill={L.apron} opacity="0.95" />}
      {L.apron && <rect x="185" y="600" width="50" height="40" rx="8" fill={who === 'ana' ? '#F7B731' : '#00000022'} />}
      {/* pescoço e cabeça */}
      <rect x="185" y="400" width="50" height="70" fill={L.skin} />
      <circle cx="210" cy="300" r="130" fill={L.skin} />
      {/* cabelo */}
      {who === 'ana' && <path d="M80 300 C80 170 340 170 340 300 C330 230 260 215 210 215 C160 215 90 230 80 300 Z" fill={L.hair} />}
      {who === 'ana' && <path d="M82 300 C70 380 90 430 120 440 C110 380 110 330 100 300 Z M338 300 C350 380 330 430 300 440 C310 380 310 330 320 300 Z" fill={L.hair} />}
      {who !== 'ana' && <path d="M85 290 C85 180 335 180 335 290 C320 225 100 225 85 290 Z" fill={L.hair} />}
      {L.beard && <path d="M110 330 C120 440 300 440 310 330 C290 400 130 400 110 330 Z" fill={L.hair} />}
      {/* chapéu */}
      {L.hat === 'chef' && <g><rect x="120" y="150" width="180" height="50" rx="10" fill="#fff" /><circle cx="150" cy="130" r="50" fill="#fff" /><circle cx="210" cy="110" r="60" fill="#fff" /><circle cx="270" cy="130" r="50" fill="#fff" /></g>}
      {L.hat === 'cap' && <g><path d="M90 250 C90 150 330 150 330 250 Z" fill="#E4572E" /><rect x="60" y="238" width="170" height="22" rx="11" fill="#E4572E" /></g>}
      {/* olhos */}
      {blink ? <g stroke="#222" strokeWidth="6"><line x1="150" y1="300" x2="180" y2="300" /><line x1="240" y1="300" x2="270" y2="300" /></g>
        : <g fill="#222"><ellipse cx="165" cy="300" rx="12" ry={shock ? 20 : 15} /><ellipse cx="255" cy="300" rx="12" ry={shock ? 20 : 15} /></g>}
      {sad && <g stroke="#222" strokeWidth="6"><line x1="145" y1="280" x2="185" y2="266" /><line x1="275" y1="280" x2="235" y2="266" /></g>}
      {/* bochechas */}
      <circle cx="135" cy="345" r="18" fill="#FF8A8A" opacity="0.35" /><circle cx="285" cy="345" r="18" fill="#FF8A8A" opacity="0.35" />
      {/* boca */}
      {talking ? <ellipse cx="210" cy="365" rx="26" ry={mouthOpen} fill="#5A1E1E" />
        : sad ? <path d="M180 380 Q210 350 240 380" stroke="#5A1E1E" strokeWidth="7" fill="none" />
        : shock ? <ellipse cx="210" cy="370" rx="18" ry="24" fill="#5A1E1E" />
        : <path d={happy ? 'M175 355 Q210 400 245 355' : 'M185 362 Q210 380 235 362'} stroke="#5A1E1E" strokeWidth="7" fill={happy ? '#5A1E1E' : 'none'} />}
    </svg>
  );
};

const Bubble = ({text, side = 'left', f0, think = false}) => {
  const f = useCurrentFrame();
  const s = sp(f, f0);
  if (f < f0) return null;
  return (
    <div style={{position: 'absolute', top: 360, [side]: 60, maxWidth: 760, transform: `scale(${0.6 + 0.4 * s})`, opacity: Math.min(1, s * 1.5), transformOrigin: side === 'left' ? 'bottom left' : 'bottom right'}}>
      <div style={{background: think ? '#EAF0FA' : C.w, color: C.bg2, fontFamily: INTER, fontWeight: 800, fontSize: 56, lineHeight: 1.2, padding: '34px 44px', borderRadius: think ? 70 : 40, boxShadow: '0 16px 40px rgba(0,0,0,0.35)', border: think ? '5px dashed #9FB0CC' : 'none'}}><Rich text={text} /></div>
      {!think && <div style={{position: 'absolute', bottom: -34, [side]: 90, width: 0, height: 0, borderLeft: '30px solid transparent', borderRight: '30px solid transparent', borderTop: `40px solid ${C.w}`}} />}
    </div>
  );
};

const Shop = ({kind = 'confeitaria'}) => (
  <AbsoluteFill>
    <div style={{position: 'absolute', inset: 0, background: kind === 'barbearia' ? 'linear-gradient(#20324F, #142238)' : 'linear-gradient(#2A2346, #1A1733)'}} />
    {/* prateleira e janela */}
    <div style={{position: 'absolute', top: 230, left: 80, right: 80, height: 14, background: '#ffffff22', borderRadius: 7}} />
    <div style={{position: 'absolute', top: 160, left: 120, display: 'flex', gap: 60, opacity: 0.35}}>
      {[0, 1, 2, 3].map((i) => <Cake key={i} size={70} />)}
    </div>
    {/* balcão */}
    <div style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: 560, background: '#0B1830'}} />
    <div style={{position: 'absolute', bottom: 520, left: 0, right: 0, height: 50, background: C.y, opacity: 0.9}} />
  </AbsoluteFill>
);

export const Cake = ({size = 120}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect x="15" y="45" width="70" height="40" rx="8" fill="#7A4A2A" />
    <rect x="15" y="45" width="70" height="14" rx="6" fill="#F28DA6" />
    <path d="M15 59 q8 8 14 0 q8 8 14 0 q8 8 14 0 q8 8 14 0 q8 8 14 0" fill="#F28DA6" />
    <rect x="47" y="25" width="6" height="20" rx="3" fill="#F7B731" />
    <ellipse cx="50" cy="22" rx="5" ry="8" fill="#FF7A3D" />
    <rect x="8" y="85" width="84" height="6" rx="3" fill="#ffffff55" />
  </svg>
);

// Diálogo: lines = [{who:'ana'|'cliente'|'beto', text, at (s), think?}]
export const Dialog = ({s}) => {
  const f = useCurrentFrame();
  const cur = [...s.lines].reverse().find((l) => f >= Math.round(l.at * FPS));
  const left = s.left || 'cliente', right = s.right || 'ana';
  const moods = s.moods || {};
  return (
    <AbsoluteFill>
      <Shop kind={s.place} />
      <div style={{position: 'absolute', bottom: 330, left: -20}}><Person who={left} talking={cur && cur.who === left && !cur.think} mood={moods[left]} /></div>
      <div style={{position: 'absolute', bottom: 330, right: -20}}><Person who={right} talking={cur && cur.who === right && !cur.think} mood={moods[right]} flip /></div>
      {s.lines.map((l, i) => {
        const next = s.lines[i + 1];
        const f0 = Math.round(l.at * FPS), f1 = next ? Math.round(next.at * FPS) : 99999;
        if (f < f0 || f >= f1) return null;
        return <Bubble key={i} text={l.text} f0={f0} think={l.think} side={l.who === left ? 'left' : 'right'} />;
      })}
      {s.caption && <div style={{position: 'absolute', bottom: 120, width: '100%', textAlign: 'center', fontFamily: INTER, fontWeight: 800, color: C.w, fontSize: 46, padding: '0 60px'}}><Rich text={s.caption} /></div>}
    </AbsoluteFill>
  );
};

// Montagem: contador subindo + bolos empilhando + "notas" de custo
export const Montage = ({s}) => {
  const f = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const n = Math.round(interpolate(f, [10, durationInFrames - 25], [1, s.count], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
  return (
    <AbsoluteFill style={{alignItems: 'center', paddingTop: 280}}>
      <div style={{fontFamily: INTER, fontWeight: 800, color: C.mute, fontSize: 48}}>{s.label}</div>
      <div style={{fontFamily: ANTON, color: C.y, fontSize: 260, lineHeight: 1}}>{n}</div>
      <div style={{display: 'flex', flexWrap: 'wrap', width: 900, justifyContent: 'center', gap: 6, marginTop: 20}}>
        {Array.from({length: n}).map((_, i) => <Cake key={i} size={86} />)}
      </div>
      {(s.notes || []).map((t, i) => {
        const fi = 20 + i * Math.max(18, Math.floor((durationInFrames - 50) / (s.notes.length))) ;
        const k = sp(f, fi);
        return f >= fi ? <div key={i} style={{position: 'absolute', top: 1130 + Math.floor(i / 2) * 120, left: i % 2 ? 560 : 80, transform: `rotate(${i % 2 ? 4 : -4}deg) scale(${k})`, background: '#fff', color: C.bg2, fontFamily: INTER, fontWeight: 800, fontSize: 40, padding: '18px 28px', borderRadius: 14, boxShadow: '0 10px 30px rgba(0,0,0,.4)'}}><Rich text={t} /></div> : null;
      })}
      {s.caption && <div style={{position: 'absolute', bottom: 140, width: '100%', textAlign: 'center', fontFamily: INTER, fontWeight: 800, color: C.w, fontSize: 50, padding: '0 60px'}}><Rich text={s.caption} /></div>}
    </AbsoluteFill>
  );
};

// Extrato no celular
export const Statement = ({s}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
      <div style={{width: 760, height: 1300, background: '#F4F6FA', borderRadius: 70, border: '18px solid #111', padding: '70px 50px', boxShadow: '0 30px 80px rgba(0,0,0,.5)', transform: `translateY(${(1 - sp(f, 0)) * 400}px)`}}>
        <div style={{fontFamily: INTER, fontWeight: 800, fontSize: 44, color: '#333', marginBottom: 10}}>{s.title || 'Extrato do mês'}</div>
        <div style={{height: 4, background: '#ddd', marginBottom: 30}} />
        {s.lines.map((l, i) => {
          const fi = 12 + i * 14;
          return f >= fi ? (
            <div key={i} style={{display: 'flex', justifyContent: 'space-between', fontFamily: INTER, fontWeight: 700, fontSize: 40, color: '#333', padding: '22px 0', borderBottom: '2px solid #e5e5e5', opacity: Math.min(1, sp(f, fi) * 1.4)}}>
              <span>{l.label}</span><span style={{color: l.value.startsWith('-') ? '#D93636' : '#1E9E57', fontWeight: 800}}>{l.value}</span>
            </div>) : null;
        })}
        {f >= 12 + s.lines.length * 14 + 8 && (
          <div style={{marginTop: 50, textAlign: 'center', transform: `scale(${sp(f, 12 + s.lines.length * 14 + 8)})`}}>
            <div style={{fontFamily: INTER, fontWeight: 700, fontSize: 40, color: '#666'}}>{s.totalLabel}</div>
            <div style={{fontFamily: ANTON, fontSize: 150, color: s.totalTone === 'good' ? '#1E9E57' : '#D93636'}}>{s.total}</div>
            {s.sub && <div style={{fontFamily: INTER, fontWeight: 800, fontSize: 40, color: '#333'}}>{s.sub}</div>}
          </div>)}
      </div>
    </AbsoluteFill>
  );
};

// Personagem sozinho com reação + legenda grande
export const Reaction = ({s}) => (
  <AbsoluteFill style={{alignItems: 'center'}}>
    <Shop kind={s.place} />
    <div style={{position: 'absolute', bottom: 330}}><Person who={s.who || 'ana'} mood={s.mood} talking={s.talking} /></div>
    {s.lines && s.lines.map((l, i) => (
      <div key={i} style={{position: 'absolute', top: 300 + i * 120, width: '100%', textAlign: 'center', fontFamily: i === 0 ? ANTON : INTER, fontWeight: 800, color: C.w, fontSize: i === 0 ? 100 : 54, textTransform: i === 0 ? 'uppercase' : 'none', padding: '0 60px', textShadow: '0 6px 20px rgba(0,0,0,.6)'}}><Rich text={l} /></div>
    ))}
  </AbsoluteFill>
);
