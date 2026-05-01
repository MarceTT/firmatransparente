# FirmaTransparente

Plataforma de gestión legal multi-tenant para estudios de abogados chilenos.

## Quick Start

### Prerequisites
- Node.js 22+
- pnpm 9+
- Docker Desktop (or Colima)

### Setup

1. Clone and install:
```bash
git clone https://github.com/MarceTT/firmatransparente.git
cd firmatransparente
pnpm install
```

2. Start database:
```bash
docker-compose -f docker/docker-compose.yml up -d db
```

3. Setup environment:
```bash
cp .env.example .env
```

4. Run migrations:
```bash
pnpm db:push
```

5. Start development:
```bash
pnpm dev
```

## Services

| Service | URL | Description |
|---------|-----|-------------|
| API | http://localhost:3001 | Nest.js backend |
| Web | http://localhost:3000 | Next.js frontend |
| Adminer | http://localhost:8080 | Database UI |

## Project Structure

```
apps/
  api/          # Nest.js backend
  web/          # Next.js 15 frontend
packages/
  prisma/       # Database schema & client
  types/        # Shared TypeScript types
  utils/        # Chilean utilities (RUT, CLP)
docker/         # Docker configuration
```
