# Cadê Meu Rango

Plataforma para compartilhar, descobrir e guardar receitas e dicas culinárias.

Monorepo com frontend React e API NestJS.

| Pasta | Descrição |
|-------|-----------|
| [`frontend/`](frontend/) | SPA React + Vite + Tailwind |
| [`backend/`](backend/) | API NestJS + PostgreSQL + TypeORM |

## Pré-requisitos

- Node.js 20+ ou [Bun](https://bun.sh)
- Docker (banco PostgreSQL)

## Subir o projeto (local)

### 1. Banco + API

```bash
cd backend
cp .env.example .env
docker compose up -d
bun install
bun start:dev
```

- API: http://localhost:3001/api/v0/system-check  
- Swagger: http://localhost:3001/api/v0  

### 2. Frontend

```bash
cd frontend
cp .env.example .env
bun install
bun dev
```

- App: http://localhost:5173  

## Documentação

- Frontend: [frontend/README.md](frontend/README.md)
- Backend: [backend/README.md](backend/README.md)

## Segurança

- Arquivos `.env` estão no `.gitignore` — não versionar segredos.
- Use `.env.example` como modelo e troque `JWT_SECRET_KEY` e credenciais em produção.

## Licença

MIT (backend) — veja [backend/LICENSE](backend/LICENSE).
