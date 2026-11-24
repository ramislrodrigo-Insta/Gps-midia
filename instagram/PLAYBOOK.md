# Playbook Instagram — @rodrigo_gpsdopreco (GPS do Preço)

Publicação via Windsor.ai (connector "instagram", account "17841413748904784").
Conteúdo de segunda a sexta, 3 peças por dia:
| Horário (Brasília) | Peça | Ação Windsor |
|---|---|---|
| 09:00 | Post único (imagem 1080x1350) | create_image_post {image_url, caption} |
| 12:30 | Carrossel (7 imagens 1080x1350) | create_carousel_post {image_urls, caption} |
| 19:00 | Reel (vídeo 1080x1920) | create_video_post {video_url, caption, share_to_feed: true, thumb_offset: 1500} |

## Agenda (fonte para as tarefas de publicação)
`instagram/agenda.json` — lista de itens:
`{"date": "AAAA-MM-DD", "slot": "post|carrossel|reel", "urls": [...], "caption": "..."}`
URLs sempre jsDelivr com hash do commit: `https://cdn.jsdelivr.net/gh/ramislrodrigo-Insta/gps-midia@<sha>/<caminho>`.
Arquivos em `instagram/semana-AAAA-MM-DD/{posts,carrosseis,reels}`.

## Identidade visual
Igual à semana `semana-2026-11-23` (raiz do repo): fundo azul-escuro, amarelo #F7B731, títulos condensados (Anton),
texto Inter, selo "GPS do Preço", "valores de exemplo", @rodrigo_gpsdopreco.
Reels animados: usar o motor `tiktok/engine` (trocar o @ do rodapé para @rodrigo_gpsdopreco via prop se necessário).
Reels com o Rodrigo falando: só se ele enviar o vídeo gravado.

## Conteúdo
- Mesmo mix de nichos do TikTok (confeitaria 50%, barbearia 20%, salão 15%, geral 15%).
- Post único: uma frase forte + pergunta. Carrossel: capa com promessa, conta passo a passo, slide final com CTA "Comenta CONTA" (calculadora grátis) e "salva".
- Reel: gancho/corpo/CTA como no tiktok/PLAYBOOK.md.
- Legendas: gancho na 1ª linha, a conta, CTA, "Valores de exemplo.", 5-8 hashtags.
- Conferir toda conta numérica com Python.

## Aprendizados
- 2026-11-24: playbook criado. Semana 23-27/11 publicada pelas tarefas antigas.

## Histórico de temas
- 23-27/11: bolo x3, escova, panetone, vizinho, corte de R$ 30 (reels/carrosséis); posts: preço te pagando, faturar≠lucrar, medo de aumentar, copiar concorrente, vender mais ganhar menos.
