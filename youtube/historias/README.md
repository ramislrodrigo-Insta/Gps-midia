# Série de histórias (YouTube)

- `videos.json`: episódios prontos para render (cenas). `published: true` quando já foi ao ar.
- `roteiros-dez.json`: roteiros aprovados dos episódios 2 a 9 (27/11 a 22/12), com as falas da narração
  ([código, fala, o que aparece na tela]). O doc para o Rodrigo gravar: https://claude.ai/artifact/SCGJBq5BvPxRNMNdZfsSQo
- `audio/`: narrações gravadas pelo Rodrigo, um arquivo por fala, nome = código (ex.: `ep02-03.m4a`).

Para narrar: converta cada áudio para `tiktok/engine/public/voz/<codigo>.m4a` (ffmpeg, AAC/mp3; o
Chromium do ambiente pode não tocar AAC — se falhar, use mp3 ou wav), monte uma cena por fala com
`"voice": "voz/<codigo>.mp3"` e `dur` = duração do áudio + 0,4 s. A música cai para 12% de volume quando há voz.
Sem áudio, a cena dura o tempo de leitura e o episódio sai só com balões e legendas.

## Áudio vindo do ElevenLabs
O Rodrigo pode mandar um arquivo por episódio (`audio/ep02.mp3` …), gerado a partir de `narracao-elevenlabs.txt`, com pausas de 1,5 s entre as falas. Corte nas pausas (ffmpeg silencedetect, silêncio ≥ 1 s) na ordem das falas do roteiro e salve como `audio/ep02-01.mp3` …; confira que o número de trechos bate com o número de falas antes de usar. Marque `isAiGenerated`/voz sintética na descrição se o YouTube exigir.
