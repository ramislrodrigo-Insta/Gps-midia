# Playbook TikTok — @metodo.tabelagps

Fonte da verdade para planejar, produzir e aprender com os vídeos do TikTok.
Atualizar a seção "Aprendizados" toda semana com os números reais.

## Cadência
- 2 vídeos por dia, 12:00 e 20:00 (horário de Brasília, -03:00).
- Subir para 3/dia (adicionar 07:30) só se a média de views das últimas 2 semanas se mantiver.
- Buffer pago desde 26/11/2026: sem o limite de 10 posts na fila. Manter ~5 dias programados (horizonte da rotina diária).

## YouTube Shorts
- Canal YouTube "Rodrigo Ramis" no Buffer: `6b0589658541f09ecb8938ca`.
- Os mesmos vídeos do TikTok viram Shorts às 12:09 e 20:09 (tarefa própria, mode shareNow, não ocupa a fila).
- Na análise de segunda, incluir os números do canal YouTube (Buffer) e comparar com o TikTok.

## Pilares (mix semanal de 14 vídeos)
| Pilar | Qtde | Horário preferido |
|---|---|---|
| Dor (gancho de dor + virada) | 5 | 20:00 |
| Educativo (conta animada, calcule junto) | 5 | 12:00 |
| Ferramenta / Método Tabela GPS | 2 | 12:00 |
| Série numerada ("Erro de preço nº X") | 2 | alterna |

## Mix de nichos (definido pelo Rodrigo em 26/11) — confeitaria em foco, variando com pequenos negócios
| Nicho | Vídeos/semana (de 21) |
|---|---|
| Confeitaria (foco; novelinha e venda sempre aqui) | 9 |
| Barbearia | 3 |
| Salão de beleza | 3 |
| Produtos / revenda | 3 |
| Pequenos negócios em geral / MEI | 3 |
Os pilares (dor, educativo, ferramenta, série) se distribuem dentro dos nichos. Revisar o % a cada 2 semanas pelos números.

### Banco de temas — confeitaria (sinais de busca, nov/2026)
- Bento cake: "o bolo que mais cresce em 2026" — quanto cobrar num bolo pequeno que dá o mesmo trabalho.
- Bolo de pote: custo por unidade, margem, por que R$ 8 pode dar prejuízo.
- Brigadeiro e doces "pelo cento": preço do cento x unidade, embalagem/forminha esquecida.
- Bolo de andar / encomenda de festa: horas de trabalho, decoração, entrega.
- Natal (até 24/12): panetone, chocotone, cesta de Natal, encomendas — "faça a conta antes de abrir encomenda".
- iFood/delivery: embutir taxa do app e promoção que a confeiteira banca.
- "Multiplicar por 3" (regra popular que falha) e "planilha/calculadora grátis" (demanda alta: muitos sites oferecem).
- Gás, luz e forno: o custo invisível da confeitaria caseira.

### Banco de temas — barbearia
- "Quantos cortes para tirar um salário mínimo" (pauta viral em portais).
- Comissão x aluguel de cadeira: qual sobra mais.
- Barbeiro que cobra caro (casos virais) — preço é posicionamento, não só custo.
- Combo corte + barba, assinatura/plano mensal: quando compensa.
- Lâmina, produto, maquininha e tempo de cadeira por corte.

## Estrutura de cada vídeo (20-25 s)
1. **Gancho (0-3 s)** — texto já visível no frame 0, no máximo 8 palavras.
   Usar uma destas mecânicas: número exato em R$ ("sobrou R$ 0?"), acusação/dor direta
   ("Agenda cheia. Conta vazia."), frase de cliente entre aspas ("Faz por R$ 50?"),
   promessa numerada ("O preço certo em 3 passos"), série ("Erro de preço nº 2").
2. **Contexto (3-7 s)** — nomeia o problema na situação real (salão, barbearia, confeitaria).
3. **Corpo (7-18 s)** — no máximo 3 telas, 1 ideia por tela, números animados.
   Uma "re-fisgada" no meio ("Parece pouco, né?", "Mas o pior...", "E quanto mais vende, mais perde").
4. **Virada / payoff** — o número que dói ou a regra em uma frase ("Desconto sai do lucro, não do preço").
5. **CTA (últimos 3 s)** — UMA ação, com motivo. Preferir pergunta com palavra-chave para comentário
   (comentário pesa mais que curtida; nunca pedir curtida). Séries: "Segue pra não perder o nº X".

## Legenda
- TODO vídeo pede para seguir: no CTA da tela ("…e segue pra mais contas") e na legenda ("Segue o perfil pra mais contas de preço."). Nunca escrever @metodo.tabelagps na legenda: o Buffer corta no ponto e marca o perfil errado (@metodo).
- 1ª linha = o gancho. Depois 1-2 frases com a conta. Pergunta para comentar. "Valores de exemplo."
- 3 a 5 hashtags específicas (#precificacao + nicho do vídeo).

## Fontes de tendência (a cada planejamento)
1. Buscas web por precificação / confeitaria / salão / barbearia / MEI no TikTok (títulos das páginas "discover").
2. Relatórios semanais de formatos de negócios (ex.: tryvolume.app/working/business-and-marketing).
3. Números da própria conta via Buffer (mais confiável — peso cresce com o tempo).
TikTok bloqueia leitura direta de vídeos; não inventar números de outros perfis.

## Produção
- Roteiros em `tiktok/semana-AAAA-MM-DD/videos.json` (cenas: hook, text, rows, big, steps, cta).
- **Narração é padrão (Rodrigo, 27/11/2026)**: todo vídeo novo sai narrado com a voz clonada do Rodrigo ("Rr") no ElevenLabs, no modelo do piloto `tiktok/piloto/videos.json` (p01).
  - Cada cena ganha `"say"`: a fala, escrita como se fala (números por extenso: "dez reais e trinta e seis"), batendo com os números da tela. A tela resume; a voz explica.
  - Roteiro inteiro com ~60-75 palavras para o vídeo ficar em 25-30 s (o p01, com 95 palavras, deu 37 s).
  - Gancho falado nos 2 primeiros segundos; CTA falado pede o comentário e o "segue".
  - Antes do render: `cd tiktok/engine && ELEVEN_API_KEY=... python3 narrate.py ../semana-AAAA-MM-DD <ids>` (grava voz em public/voz/, legenda palavra a palavra e ajusta `dur`). Use `"cue": "palavra"` para sincronizar elementos com a fala.
  - Conferir no MP4 que há faixa de áudio com voz (ffprobe/volumedetect) e ouvir/ler as legendas em 2-3 frames.
  - Sem `ELEVEN_API_KEY` no ambiente ou erro na API: renderizar sem narração (sem `say`), marcar `"narrado": false` e avisar o Rodrigo na notificação. Nunca gravar a chave no repositório.
- Render: `cd tiktok/engine && npm install && CHROME_PATH=<chrome-headless-shell> node render.mjs ../semana-AAAA-MM-DD [ids]`.
- Commitar os MP4 e usar a URL jsDelivr com o hash do commit no Buffer:
  `https://cdn.jsdelivr.net/gh/ramislrodrigo-Insta/gps-midia@<sha>/tiktok/<semana>/videos/<id>.mp4`.
  Se o Buffer responder "Video could not be read", usar
  `https://raw.githubusercontent.com/ramislrodrigo-Insta/gps-midia/<sha>/tiktok/<semana>/videos/<id>.mp4`.
- Chrome no ambiente: `/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell`
  (fontes Google bloqueadas: o motor usa fontes embutidas em src/fonts.css).
- Buffer: canal TikTok `6b0580eb8541f09ecb88e8bd`, org `6b057ec86fac996102352894`. Sempre `customScheduled` com `dueAt` em -03:00.
- Conferir toda conta antes de publicar. Margem: preço = custo ÷ (1 - margem).

## Aprendizados
- 2026-11-24: primeira leva (t01-t10, 25 a 29/11) programada. Sem dados ainda.

- 2026-11-24: Rodrigo definiu confeitaria como foco nº 1 ("produto da bola da vez"), com vídeos específicos também de barbearia.

- 2026-11-26: Rodrigo assinou o Buffer pago; acabou o limite de 10 agendados.
- 2026-11-25: motor corrigido: o gancho agora aparece inteiro no frame 0 (antes entrava com fade de ~3-6 frames; t01-t10 saíram assim). Vale a partir do t11.

- 2026-11-27: Rodrigo aprovou narração como padrão (TikTok e Reels) depois do piloto p01. Comparar views/retenção narrado x sem narração nas próximas análises.

- 2026-11-27 (YouTube): Ana Confeiteira vs Shorts comuns (Buffer, 27/11 17h45). Ep1 sem narração 48 views (2 curtidas); ep1 narrado 37 views; Shorts comuns de 25-26/11: 22, 11, 12, 12 (média ~14). Episódios têm ~3x as views, mas com 1 dia a mais no ar e amostra mínima; ainda sem comentários. Narração não superou a versão muda no ep1 (pode ser canibalização do mesmo tema). Ep2 (narrado) publicado 27/11 17h42. Rever na próxima sexta.

## Histórico de temas (não repetir em menos de 3 semanas)
- t01 4 partes do preço · t02 sobrou R$ 0 · t03 taxa da maquininha · t04 desconto R$ 10 = 83% do lucro
- t05 Erro nº1 esquecer salário (bolo) · t06 Black Friday 30% off · t07 Método Tabela GPS 3 passos
- t08 agenda cheia, conta vazia · t09 quanto vale sua hora · t10 Erro nº2 copiar o vizinho
- t11 bolo de pote a R$ 8 (confeitaria, educativo) · t12 40 panetones, sobrou quanto? (confeitaria, dor, Natal)
- t13 quantos cortes pra tirar R$ 3.000 (barbearia, educativo) · t14 cento de brigadeiro a R$ 100, sobrou R$ 0 (confeitaria, dor)
