# Gera uma trilha original simples (sem direitos autorais): pad + batida leve, 100 bpm.
import numpy as np, wave, sys
sr=44100; bpm=100; beat=60/bpm; dur=float(sys.argv[2]) if len(sys.argv)>2 else 40
seed=int(sys.argv[3]) if len(sys.argv)>3 else 0
rng=np.random.default_rng(seed)
t=np.arange(int(sr*dur))/sr
def note(m): return 440*2**((m-69)/12)
progs=[[[57,60,64],[53,57,60],[48,52,55],[55,59,62]],[[50,53,57],[55,59,62],[48,52,55],[57,60,64]],[[52,55,59],[48,52,55],[55,59,62],[50,54,57]]]
prog=progs[seed%len(progs)]
out=np.zeros_like(t)
bar=beat*4
for i in range(int(dur/bar)+1):
    ch=prog[i%4]; s=int(i*bar*sr); e=min(len(t),int((i+1)*bar*sr))
    if s>=len(t): break
    tt=t[s:e]-t[s]
    env=np.minimum(1,tt/0.4)*np.minimum(1,(bar-tt)/0.3)
    for m in ch:
        f=note(m)
        out[s:e]+=0.08*env*(np.sin(2*np.pi*f*tt)+0.3*np.sin(2*np.pi*2*f*tt)+0.15*np.sin(2*np.pi*f*1.003*tt))
    # bass
    f=note(ch[0]-12)
    out[s:e]+=0.12*env*np.sin(2*np.pi*f*tt)
# drums
nb=int(dur/beat)
for b in range(nb):
    s=int(b*beat*sr)
    if b%2==0:
        L=int(0.25*sr); tt=np.arange(L)/sr
        k=np.sin(2*np.pi*(50+90*np.exp(-tt*30))*tt)*np.exp(-tt*12)*0.45
        out[s:s+L]+=k[:len(out[s:s+L])]
    else:
        L=int(0.18*sr); tt=np.arange(L)/sr
        sn=rng.standard_normal(L)*np.exp(-tt*25)*0.12
        out[s:s+L]+=sn[:len(out[s:s+L])]
    for h in (0,0.5):
        hs=int((b+h)*beat*sr); L=int(0.05*sr); tt=np.arange(L)/sr
        hh=rng.standard_normal(L)*np.exp(-tt*90)*0.05
        out[hs:hs+L]+=hh[:len(out[hs:hs+L])]
out=out/np.max(np.abs(out))*0.8
w=wave.open(sys.argv[1],'w'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr)
w.writeframes((out*32767).astype(np.int16).tobytes()); w.close()
