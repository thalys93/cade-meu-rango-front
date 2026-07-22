# NestJS Backend Template

Template (scaffolding) for backend projects with NestJS, TypeORM, PostgreSQL, JWT auth, mail, storage and a modular architecture. Use it as a base for your next API projects.

If this template helped you, consider giving it a **star** on the repository.

## How to run the project

### Prerequisites

- **Node.js** 20+ (22+ recommended)
- **npm** (or pnpm / yarn)
- **Docker** (optional, for PostgreSQL via docker-compose)

### Installation and running

```bash
git clone <repo-url>
cd vogue-backend

npm install

cp .env.example .env

docker compose up -d

npm run start:dev
```

Open in your browser:

- API: `http://localhost:3000/api/v0/system-check`
- Swagger: `http://localhost:3000/api/v0`

### Other commands

```bash
npm run build
npm run start:prod
npm run lint
npm run test
npm run test:e2e
```

## How the scaffolding works

The project follows a modular, layered structure with well-defined responsibilities (SOLID, KISS, DRY, YAGNI).

### Stack

| Area         | Technology                          |
| ------------ | ----------------------------------- |
| Framework    | NestJS 11                           |
| Database     | PostgreSQL 16, TypeORM              |
| Auth         | Passport JWT + Local                |
| API Docs     | Swagger / OpenAPI                   |
| Mail         | Nodemailer + Handlebars templates   |
| Storage      | Cloudinary signatures               |
| Validation   | class-validator, class-transformer  |

### Folder structure

```
src/
├── config/           # app.config.ts, orm.config.ts
├── feature-flags/    # Feature flags via env (FEATURE_*)
├── auth/             # Login, JWT, password reset
├── mail/             # SMTP/Ethereal/Console + templates
├── storage/          # Cloudinary upload signatures
├── user/             # User CRUD + public registration
├── roles/            # Role management (RBAC)
├── seeding/          # Auto-seed roles (FEATURE_SEEDING)
├── security/         # Guards and decorators
├── helpers/          # Pagination, regex, tokens
├── enums/            # Roles, Methods, RoleGroups
├── app.controller.ts # Health check (/system-check)
└── main.ts           # Bootstrap, Swagger, CORS
```

### Environment variables

Copy `.env.example` to `.env` and customize:

| Variable | Description | Default |
| -------- | ----------- | ------- |
| `APP_NAME` | Application name | Vogue Backend |
| `API_TITLE` | Swagger title | Vogue Backend API |
| `SWAGGER_DESCRIPTION` | Swagger description | API documentation |
| `API_VERSION` | API version prefix | v0 |
| `PORT` | Server port | 3000 |
| `FEATURE_SEEDING` | Auto-seed roles on boot | true |
| `JWT_SECRET_KEY` | JWT signing secret | — |
| `MAIL_DRIVER` | smtp / ethereal / console | console |

### Adding a new CRUD module

1. Create `src/<module>/` with module, controller, service, entity, DTOs
2. Register `TypeOrmModule.forFeature([Entity])` in the module
3. Add the module to `app.module.ts`
4. Protect routes with `AuthGuard('jwt')`, `RolesGuard`, `@RolesDecorator`
5. Follow `.cursor/rules/nestjs-crud.mdc` for conventions

### Feature flags

Use `FeatureFlagsService.isEnabled('seeding')` to check flags. Configure via env:

```
FEATURE_SEEDING=true
```

### Frontend pairing

Compatible with the [vogue](../vogue) frontend template:

```
VITE_API_URL=http://localhost:3000
VITE_API_VERSION=v0
```

## License

MIT — see [LICENSE](LICENSE).
