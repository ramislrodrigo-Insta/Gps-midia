# Playbook TikTok — @metodo.tabelagps

Fonte da verdade para planejar, produzir e aprender com os vídeos do TikTok.
Atualizar a seção "Aprendizados" toda semana com os números reais.

## Cadência
- 2 vídeos por dia, 12:00 e 20:00 (horário de Brasília, -03:00).
- Subir para 3/dia (adicionar 07:30) só se a média de views das últimas 2 semanas se mantiver.
- Buffer grátis: no máximo 10 posts na fila por vez. Manter ~4-5 dias programados.

## Pilares (mix semanal de 14 vídeos)
| Pilar | Qtde | Horário preferido |
|---|---|---|
| Dor (gancho de dor + virada) | 5 | 20:00 |
| Educativo (conta animada, calcule junto) | 5 | 12:00 |
| Ferramenta / Método Tabela GPS | 2 | 12:00 |
| Série numerada ("Erro de preço nº X") | 2 | alterna |

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
- 1ª linha = o gancho. Depois 1-2 frases com a conta. Pergunta para comentar. "Valores de exemplo."
- 3 a 5 hashtags específicas (#precificacao + nicho do vídeo).

## Fontes de tendência (a cada planejamento)
1. Buscas web por precificação / confeitaria / salão / barbearia / MEI no TikTok (títulos das páginas "discover").
2. Relatórios semanais de formatos de negócios (ex.: tryvolume.app/working/business-and-marketing).
3. Números da própria conta via Buffer (mais confiável — peso cresce com o tempo).
TikTok bloqueia leitura direta de vídeos; não inventar números de outros perfis.

## Produção
- Roteiros em `tiktok/semana-AAAA-MM-DD/videos.json` (cenas: hook, text, rows, big, steps, cta).
- Render: `cd tiktok/engine && npm install && CHROME_PATH=<chrome-headless-shell> node render.mjs ../semana-AAAA-MM-DD [ids]`.
- Commitar os MP4 e usar a URL jsDelivr com o hash do commit no Buffer.
- Conferir toda conta antes de publicar. Margem: preço = custo ÷ (1 - margem).

## Aprendizados
- 2026-11-24: primeira semana (t01-t10). Sem dados ainda.
