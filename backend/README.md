# Cadê Meu Rango — API

API NestJS do Cadê Meu Rango: receitas, dicas, categorias, autenticação JWT, e-mail e upload via Cloudinary.

## Stack

| Área | Tecnologia |
|------|------------|
| Framework | NestJS 11 |
| Banco | PostgreSQL 16 + TypeORM |
| Auth | Passport JWT + Local |
| Docs | Swagger / OpenAPI |
| Mail | Nodemailer + Handlebars |
| Storage | Cloudinary (assinaturas) |

## Pré-requisitos

- Node.js 20+ (ou [Bun](https://bun.sh))
- Docker (PostgreSQL via `docker compose`)

## Como rodar

```bash
cd backend
cp .env.example .env
docker compose up -d
bun install   # ou npm install
bun start:dev # ou npm run start:dev
```

URLs locais (com `PORT=3001` e `API_VERSION=v0`):

- Health: http://localhost:3001/api/v0/system-check
- Swagger: http://localhost:3001/api/v0

## Variáveis de ambiente

Copie `.env.example` → `.env`. Principais:

| Variável | Descrição |
|----------|-----------|
| `PORT` | Porta da API (padrão do projeto: `3001`) |
| `API_VERSION` | Prefixo da API (`v0`) |
| `FRONTEND_URL` | Origem do CORS (Vite: `http://localhost:5173`) |
| `DB_*` | Conexão PostgreSQL |
| `JWT_SECRET_KEY` | Segredo JWT (obrigatório em produção) |
| `MAIL_DRIVER` | `console` / `ethereal` / `smtp` |
| `CLOUDINARY_*` | Credenciais de upload |
| `FEATURE_SEEDING` | Seed de roles/dados no boot |

**Não commite o arquivo `.env`.**

## Scripts

```bash
bun start:dev   # desenvolvimento com watch
bun run build
bun run start:prod
bun run lint
bun run test
bun run test:e2e
```

## Estrutura

```
src/
├── auth/           # login, registro, reset de senha, JWT
├── user/           # perfil do usuário
├── recipe/         # receitas
├── tip/            # dicas
├── category/       # categorias
├── mail/           # e-mail + templates
├── storage/        # assinaturas Cloudinary
├── roles/          # RBAC
├── seeding/        # seed opcional
├── security/       # guards e decorators
├── config/         # app + ORM
└── main.ts
```

## Frontend

O app React fica em [`../frontend`](../frontend). Configure:

```bash
VITE_API_URL=http://localhost:3001/api/v0
```

## Licença

MIT — veja [LICENSE](LICENSE).
