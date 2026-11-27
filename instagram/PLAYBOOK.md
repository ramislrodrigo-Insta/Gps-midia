# Playbook Instagram — @rodrigo_gpsdopreco (GPS do Preço)

Publicação via Windsor.ai (connector "instagram", account "17841413748904784").
Conteúdo TODOS OS DIAS (segunda a domingo), 3 slots por dia (definido pelo Rodrigo em 24/11/2026):
| Horário (Brasília) | Slot | Formato | Ação Windsor |
|---|---|---|---|
| 09:00 | story | 2-3 telas 1080x1920 (imagem JPEG ou vídeo 3-60 s) | create_story {image_url} ou {video_url}, uma chamada por tela, na ordem |
| 12:30 | post | formato VARIA conforme tendência e resultado: carrossel (2-10 imagens 1080x1350), imagem única, "post só de texto" (frase forte em arte limpa), ou vídeo | 1 imagem → create_image_post; 2+ imagens → create_carousel_post; vídeo → create_video_post |
| 19:00 | reel | vídeo 1080x1920 animado | create_video_post {video_url, caption, share_to_feed: true, thumb_offset: 1500} |

Regras de formato do post: alternar formatos na semana (ex.: 3 carrosséis, 2 imagens/frases, 2 de outro formato em teste) e deixar os dados decidirem o mix nas semanas seguintes.
Stories: sem legenda e sem figurinhas via API. Usar sequência curta: (1) pergunta/enquete em texto ("Responde no direct: você cobra pela sua hora?"), (2) bastidor/dica rápida ou chamada para o post/reel do dia, (3) CTA "Segue e ativa o sininho" ou "Manda CONTA no direct". Sempre texto grande e legível.
Todo conteúdo pede para seguir (no CTA da arte/vídeo e na legenda: "Segue @rodrigo_gpsdopreco pra mais contas de preço").

## Agenda (fonte para as tarefas de publicação)
`instagram/agenda.json` — lista de itens:
`{"date": "AAAA-MM-DD", "slot": "story|post|reel", "format": "carrossel|imagem|texto|video|story", "urls": [...], "caption": "..."}` (story: urls na ordem, caption vazia)
URLs sempre jsDelivr com hash do commit: `https://cdn.jsdelivr.net/gh/ramislrodrigo-Insta/gps-midia@<sha>/<caminho>`.
Arquivos em `instagram/semana-AAAA-MM-DD/{stories,posts,reels}`.

## Identidade visual
Igual à semana `semana-2026-11-23` (raiz do repo): fundo azul-escuro, amarelo #F7B731, títulos condensados (Anton),
texto Inter, selo "GPS do Preço", "valores de exemplo", @rodrigo_gpsdopreco.
Reels animados: usar o motor `tiktok/engine` (trocar o @ do rodapé para @rodrigo_gpsdopreco via prop se necessário).
Reels com o Rodrigo falando: só se ele enviar o vídeo gravado.
Reels animados saem NARRADOS por padrão (voz clonada do Rodrigo no ElevenLabs, `narrate.py`), com as mesmas regras da seção Produção do tiktok/PLAYBOOK.md. Sem a chave ou com erro: reel sem narração e aviso na notificação.

## Conteúdo
- Mesmo mix de nichos do TikTok (confeitaria 50%, barbearia 20%, salão 15%, geral 15%).
- Post imagem/frase: uma frase forte + pergunta. Carrossel: capa com promessa, conta passo a passo, slide final com CTA "Comenta CONTA" (calculadora grátis), "salva" e "segue".
- Reel: gancho/corpo/CTA como no tiktok/PLAYBOOK.md.
- Legendas: gancho na 1ª linha, a conta, CTA, "Valores de exemplo.", 5-8 hashtags.
- Conferir toda conta numérica com Python.

## Aprendizados
- 2026-11-24: playbook criado. Semana 23-27/11 publicada pelas tarefas antigas.

- 2026-11-27: Rodrigo aprovou narração como padrão nos reels.

## Histórico de temas
- 23-27/11: bolo x3, escova, panetone, vizinho, corte de R$ 30 (reels/carrosséis); posts: preço te pagando, faturar≠lucrar, medo de aumentar, copiar concorrente, vender mais ganhar menos.
