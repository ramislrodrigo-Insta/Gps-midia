#!/usr/bin/env python3
"""Gera a narração (ElevenLabs) de cada cena com "say" e grava voz, legenda palavra a palavra e duração.

Uso: ELEVEN_API_KEY=... python3 narrate.py ../semana-AAAA-MM-DD [id ...]
- voz padrão: Rr (voz clonada do Rodrigo). Um vídeo pode trocar com "voz": "<voice_id>"; uma cena com "voz" também.
- em qualquer objeto da cena (camada, price, gap...), "cue": "palavra" vira "at" = início da 1ª palavra falada que começa assim.
- dur da cena = duração do áudio + 0,35 s (última cena + 0,8 s).
A chave nunca vai para o repositório.
"""
import base64, json, os, re, subprocess, sys, unicodedata, urllib.request

RR = 'MCCAQZLw1afRobVxJ6KM'
HERE = os.path.dirname(os.path.abspath(__file__))
KEY = os.environ['ELEVEN_API_KEY']


def norm(t):
    t = unicodedata.normalize('NFD', t.lower())
    return re.sub(r'[^a-z0-9]', '', ''.join(c for c in t if unicodedata.category(c) != 'Mn'))


def tts(text, voice, prev, nxt):
    body = {'text': text, 'model_id': 'eleven_multilingual_v2',
            'voice_settings': {'stability': 0.5, 'similarity_boost': 0.8, 'style': 0.2, 'use_speaker_boost': True}}
    if prev: body['previous_text'] = prev
    if nxt: body['next_text'] = nxt
    req = urllib.request.Request(f'https://api.elevenlabs.io/v1/text-to-speech/{voice}/with-timestamps?output_format=mp3_44100_128',
                                 data=json.dumps(body).encode(), headers={'xi-api-key': KEY, 'Content-Type': 'application/json'})
    with urllib.request.urlopen(req, timeout=120) as r:
        return json.load(r)


def words_from(al):
    out, cur = [], None
    for ch, s, e in zip(al['characters'], al['character_start_times_seconds'], al['character_end_times_seconds']):
        if ch.isspace():
            if cur: out.append(cur); cur = None
            continue
        if cur is None: cur = {'w': ch, 's': round(s, 3), 'e': round(e, 3)}
        else: cur['w'] += ch; cur['e'] = round(e, 3)
    if cur: out.append(cur)
    return out


def set_cues(obj, words):
    if isinstance(obj, dict):
        if 'cue' in obj:
            c = norm(obj['cue'])
            hit = next((w for w in words if norm(w['w']).startswith(c)), None)
            if hit is None: raise SystemExit(f'cue "{obj["cue"]}" não encontrado na fala')
            obj['at'] = max(0, round(hit['s'] - 0.15, 3))
        for v in obj.values(): set_cues(v, words)
    elif isinstance(obj, list):
        for v in obj: set_cues(v, words)


def main():
    week = os.path.abspath(sys.argv[1]); only = sys.argv[2:]
    path = os.path.join(week, 'videos.json'); vids = json.load(open(path))
    os.makedirs(os.path.join(HERE, 'public', 'voz'), exist_ok=True)
    for v in vids:
        if only and v['id'] not in only: continue
        says = [s.get('say') for s in v['scenes']]
        for i, s in enumerate(v['scenes']):
            if not s.get('say'): continue
            voice = s.get('voz') or v.get('voz') or RR
            prev = ' '.join(x for x in says[:i] if x)[-300:] or None
            nxt = ' '.join(x for x in says[i + 1:] if x)[:300] or None
            r = tts(s['say'], voice, prev, nxt)
            rel = f"voz/{v['id']}-{i + 1:02d}.mp3"
            open(os.path.join(HERE, 'public', rel), 'wb').write(base64.b64decode(r['audio_base64']))
            dur = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', os.path.join(HERE, 'public', rel)]).decode())
            w = words_from(r['alignment'])
            s['voice'] = rel; s['words'] = w
            s['dur'] = round(dur + (0.8 if i == len(v['scenes']) - 1 else 0.35), 2)
            set_cues(s, w)
            print(v['id'], i + 1, round(dur, 2), 's')
        v['narrado'] = True
    json.dump(vids, open(path, 'w'), ensure_ascii=False, indent=1)


if __name__ == '__main__':
    main()
