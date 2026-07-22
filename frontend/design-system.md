# Cadê Meu Rango — Design System (e-mail)

Fonte de verdade extraída do frontend. Use estes tokens em templates HTML de e-mail (estilos inline).

## Marca

| Item | Valor |
|------|--------|
| Nome | Cadê Meu Rango |
| Tagline | Seu Site de Receitas Favorito |
| Tom | acolhedor, culinário, energético |
| Favicon | `https://res.cloudinary.com/dh39ahmpj/image/upload/v1683412274/favicons.dev/cade_meu_rango_nyjbxs.png` |
| Logo (chapeuzinho) | `/assets/svg/chapeuzinho.svg` (hospedar em URL pública para e-mail) |
| OG / thumb | `https://res.cloudinary.com/dh39ahmpj/image/upload/v1684280950/Cad%C3%AA%20Meu%20Rango/thumb_do_site_knjbzn.png` |
| Banner claro | `https://res.cloudinary.com/dh39ahmpj/image/upload/c_thumb,w_2844,h_718,g_auto/v1695040147/Cad%C3%AA%20Meu%20Rango/banner_utjdxx.png` |
| Banner escuro | `https://res.cloudinary.com/dh39ahmpj/image/upload/c_thumb,w_2844,h_718,g_auto/v1695040152/Cad%C3%AA%20Meu%20Rango/bannerDark_fwh1gr.png` |

---

## Cores

### Primárias (marca)

| Token | Hex | Uso |
|-------|-----|-----|
| `orange_primary` | `#FD6543` | CTA, títulos de marca, destaques, botões |
| `orange_secondary` | `#b32607` | footer claro, ênfase no modo claro |
| `orange_accent` | `#ff4f28` | tabs / links ativos |
| `orange_accent_hover` | `#ff5732` | estado ativo/hover de pills |
| `orange_scrollbar` | `#ff2600` | accent agressivo (evitar em e-mail) |
| `orange_shadow` | `#a4301b` | sombra do logo |

### Superfícies — modo claro (preferir em e-mail)

| Token | Hex | Uso |
|-------|-----|-----|
| `surface` | `#ffffff` | card / body do e-mail |
| `page_bg` | `#FD6543` | fundo da página no site (`orangered`); em e-mail use cinza claro |
| `page_bg_email` | `#f5f0ee` | fundo externo seguro para clientes de e-mail |
| `text` | `#0f172a` | texto principal (`slate-900`) |
| `text_muted` | `#334155` | secundário (`slate-700`) |
| `text_on_brand` | `#f8fafc` | texto sobre laranja (`slate-100`) |
| `border` | `#e2e8f0` | divisores |

### Superfícies — modo escuro (referência do site)

| Token | Hex | Uso |
|-------|-----|-----|
| `dark_page` | `#2b2d31` | fundo dark |
| `dark_surface` | `#334155` | seções (`slate-700`) |
| `dark_elevated` | `#1e293b` | cards / footer (`slate-800`) |
| `dark_text` | `#ffffff` | texto |
| `dark_text_muted` | `#cbd5e1` | secundário (`slate-300` / `400`) |

### CSS variables (web)

```css
:root {
  --cmr-orange-primary: #FD6543;
  --cmr-orange-secondary: #b32607;
  --cmr-orange-accent: #ff4f28;
  --cmr-orange-accent-hover: #ff5732;
  --cmr-orange-shadow: #a4301b;
  --cmr-surface: #ffffff;
  --cmr-page-bg-email: #f5f0ee;
  --cmr-text: #0f172a;
  --cmr-text-muted: #334155;
  --cmr-text-on-brand: #f8fafc;
  --cmr-border: #e2e8f0;
  --cmr-radius: 16px;
  --cmr-radius-asymmetric: 16px 0 16px 0;
  --cmr-font-title: "Satisfy", cursive;
  --cmr-font-body: "Rubik", Arial, Helvetica, sans-serif;
}
```

---

## Tipografia

| Papel | Família | Pesos | Tailwind / classe |
|-------|---------|-------|-------------------|
| Display / marca | **Satisfy** (cursive) | 400 | `font-title-sy` |
| Corpo / UI | **Rubik** (sans) | 300, 400 | `font-body-rb` |

Google Fonts (e-mail + web):

```
https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600&family=Satisfy&display=swap
```

### Escala usada no site

| Papel | Tamanho | Fonte | Cor típica |
|-------|---------|-------|------------|
| Brand hero | `60px` / `text-6xl` | Satisfy | `#FD6543` |
| Tagline | `24px` / `text-2xl` | Satisfy | `#ffffff` |
| Título de seção | `20–24px` / `text-xl`–`text-2xl` | Rubik | texto |
| Corpo | `16px` | Rubik 300–400 | texto / muted |
| Caption / footer | `13–14px` | Rubik | `#f8fafc` sobre brand |
| Destaque inline | bold + underline `underline-offset: 8px` | Rubik | `#FD6543` |

**E-mail:** Satisfy só no logo/nome da marca. Corpo sempre Rubik (ou Arial/Helvetica fallback) — cursivas quebram em vários clientes.

---

## Forma e espaçamento

| Token | Valor | Origem |
|-------|-------|--------|
| Raio padrão | `16px` (`1rem`) | cards, containers |
| Raio assimétrico | `16px 0 16px 0` | imagens / `customBorder` |
| Raio pill / botão round | `9999px` | toggles, FAB |
| Padding card e-mail | `28px` | — |
| Gap de seções | `16–24px` | — |
| Largura máx. e-mail | `560px` | — |
| Transição (web) | `0.2s` | global; ignorar em e-mail |

### Sombras

| Token | Valor | Uso |
|-------|-------|-----|
| `logo_shadow` | `22px 22px 43px #a4301b` | logo circular |
| `text_shadow` | `0 4px 4px #000000` | títulos sobre banner |
| `card_shadow_light` | Tailwind `shadow-md shadow-slate-300/400` | cards |

---

## Componentes para e-mail

### Botão primário (CTA)

```html
<td style="border-radius:8px;background:#FD6543;">
  <a href="{{url}}" style="display:inline-block;padding:12px 28px;font-size:15px;font-weight:500;color:#ffffff;text-decoration:none;font-family:Rubik,Arial,Helvetica,sans-serif;">
    Texto do botão
  </a>
</td>
```

### Cabeçalho de marca

- Barra superior: `4px` solid `#FD6543`
- Nome: Satisfy, `#FD6543`, ~32–40px
- Opcional: logo chapeuzinho centrado (máx. 96–120px)

### Bloco de destaque / credenciais

```html
<table width="100%" style="background:#f5f0ee;border-radius:12px;margin-bottom:24px;">
  <tr>
    <td style="padding:20px;font-family:Rubik,Arial,Helvetica,sans-serif;">
      <!-- conteúdo -->
    </td>
  </tr>
</table>
```

### Footer

- Fundo: `#b32607` (modo claro do site) ou `#1e293b` (dark)
- Texto: `#f8fafc`, 13px
- Copy: `© Cadê Meu Rango. Todos os direitos reservados.`

### Links e ênfase

- Link / bold de destaque: `#FD6543`
- No modo claro do site, ênfase em texto às vezes usa `#b32607` — em e-mail prefira sempre `#FD6543`

---

## Layout base (copiar)

```html
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{{appName}}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600&family=Satisfy&display=swap" rel="stylesheet" />
</head>
<body style="margin:0;padding:0;background:#f5f0ee;color:#0f172a;font-family:Rubik,Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f5f0ee;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:560px;background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;">
          <tr>
            <td style="height:4px;background:#FD6543;font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:28px 28px 8px;text-align:center;">
              <img src="{{logoUrl}}" alt="{{appName}}" width="96" style="display:block;margin:0 auto;width:96px;height:auto;border:0;" />
              <p style="margin:12px 0 0;font-family:Satisfy,cursive;font-size:32px;color:#FD6543;line-height:1.2;">Cadê Meu Rango</p>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 28px 32px;font-size:16px;line-height:1.55;color:#0f172a;">
              {{body}}
            </td>
          </tr>
          <tr>
            <td style="padding:16px 28px;background:#b32607;text-align:center;">
              <p style="margin:0;font-size:13px;color:#f8fafc;">© Cadê Meu Rango. Todos os direitos reservados.</p>
            </td>
          </tr>
        </table>
        <p style="margin:20px 0 0;font-size:13px;color:#334155;text-align:center;">Mensagem automática — não responda.</p>
      </td>
    </tr>
  </table>
</body>
</html>
```

---

## Mapa rápido (Tailwind → e-mail)

| Classe no frontend | Hex / valor e-mail |
|--------------------|--------------------|
| `bg-orange_primary` / `text-orange_primary` | `#FD6543` |
| `bg-orange_secondary` | `#b32607` |
| `bg-white` | `#ffffff` |
| `bg-slate-700` | `#334155` |
| `bg-slate-800` | `#1e293b` |
| `text-slate-900` | `#0f172a` |
| `text-slate-100` / `text-white` | `#f8fafc` / `#ffffff` |
| `text-slate-300` / `400` / `700` | `#cbd5e1` / `#94a3b8` / `#334155` |
| `font-title-sy` | Satisfy |
| `font-body-rb` | Rubik |
| `rounded-xl` / `rounded` | `16px` / `8px` |
| `rounded-full` | `9999px` |

---

## Notas para e-mail

1. Clientes de e-mail ignoram a maior parte do CSS externo — use **inline styles**.
2. Evite o fundo `orangered` + pattern do site; use `#f5f0ee` no wrapper.
3. Não dependa de hover, `scale`, Animate.css ou dark mode no e-mail.
4. Hospede logo/SVG em CDN (Cloudinary já usado no projeto).
5. O layout atual em `backend/src/mail/templates/` usa outra paleta (Outfit / `#8a6240`) — alinhar aos tokens deste arquivo quando for unificar a marca.
