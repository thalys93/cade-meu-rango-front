# Cadê Meu Rango — Frontend

SPA React do Cadê Meu Rango: descobrir, criar e gerenciar receitas e dicas culinárias, com autenticação e tema claro/escuro.

## Stack

| Área | Tecnologia |
|------|------------|
| UI | React 18 + TypeScript |
| Build | Vite 6 |
| Estilo | Tailwind CSS 4 + shadcn/ui |
| Rotas | React Router 6 |
| HTTP | Axios |
| Motion | Framer Motion |
| Upload | Cloudinary (via API) |

## Pré-requisitos

- Node.js 20+ (ou [Bun](https://bun.sh))
- API do backend rodando (veja [`../backend`](../backend))

## Como rodar

```bash
cd frontend
cp .env.example .env
bun install   # ou npm install
bun dev       # ou npm run dev
```

App: http://localhost:5173

## Variáveis de ambiente

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `VITE_API_URL` | Base URL da API | `http://localhost:3001/api/v0` |

```bash
cp .env.example .env
```

## Scripts

```bash
bun dev       # servidor de desenvolvimento
bun run build # build de produção
bun run preview
bun run lint
```

## Funcionalidades

- Listagem e filtros de receitas e dicas
- Detalhe, criação e edição (autenticado)
- Cadastro / login / perfil
- Upload de imagens (Cloudinary)
- Empty, error e loading states
- Modo escuro

## Estrutura

```
src/
├── components/   # UI, cards, formulários, layout
├── pages/        # rotas (home, recipe, tip, auth, me)
├── lib/api/      # client Axios + services
├── lib/auth/     # sessão e token
└── main.tsx
```

## Backend

A API NestJS fica em [`../backend`](../backend). Em desenvolvimento, use a mesma `VITE_API_URL` do `.env.example`.

## Licença

MIT.
