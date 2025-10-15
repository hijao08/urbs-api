# URBS API (Node.js + Express + MVC)

API em Node.js (Express) organizada em MVC para consumir uma API externa e persistir dados em Postgres. Inclui configuração com Docker Compose para o banco e uso de Sequelize como ORM.

## Sumário

- Arquitetura
- Requisitos
- Configuração
- Executando
- Endpoints
- Banco de dados
- Scripts NPM
- Estrutura de pastas

## Arquitetura

- Framework: Express
- Padrão: MVC (Models, Controllers, Routes, Services)
- ORM: Sequelize (dialeto Postgres)
- Banco: Postgres em contêiner Docker
- HTTP Client: Axios para consumir API externa

## Requisitos

- Node.js 18+ (recomendado 20+)
- Docker e Docker Compose (ou plugin `docker compose`)

## Configuração

1. Instale dependências:
   ```bash
   npm install
   ```
2. Variáveis de ambiente:
   - Copie `.env.example` para `.env` e ajuste conforme necessário.
   - Se `.env.example` não existir, crie `.env` com:
     ```bash
     PORT=3000
     CORS_ORIGIN=*
     POSTGRES_DB=urbs
     POSTGRES_USER=urbs
     POSTGRES_PASSWORD=urbs
     POSTGRES_PORT=5432
     DATABASE_URL=postgres://urbs:urbs@localhost:5432/urbs
     EXTERNAL_API_BASE=https://jsonplaceholder.typicode.com
     ```

3. Suba o Postgres com Docker:

   ```bash
   docker compose up -d
   ```

4. Teste saúde do banco (após app subir): `GET /api/db/health`.

## Executando

- Desenvolvimento (com reload via nodemon):
  ```bash
  npm run dev
  ```
- Produção (simples):
  ```bash
  npm start
  ```
  O app inicia em `http://localhost:3000` (ou porta definida em `PORT`).

## Endpoints

- Saúde do app:
  - `GET /health` → `{ status: "ok" }`
- Saúde do banco:
  - `GET /api/db/health` → `{ status: "ok" }` se conexão estiver ok
- API externa (exemplo JSONPlaceholder):
  - `GET /api/external/posts` → retorna lista de posts
- API URBS:
  - Proxy direto da URBS (retorna da API externa):
    - `GET /api/urbs/horarios-linha?linha=303&c=858ce`
  - Sincronização e consultas no banco (ordenadas a partir de 04:00):
    - `POST /api/urbs/horarios-linha/sync?linha=303&c=858ce` → busca na URBS e salva no Postgres
    - `GET /api/urbs/horarios-linha/db?cod=303&limit=700` → lista geral do banco, filtro opcional por `cod`
    - `GET /api/urbs/horarios-linha/db/dia?dia=1&cod=303&limit=700` → lista apenas do dia informado
    - `GET /api/urbs/horarios-linha/db/dia-ponto?dia=1&ponto=TERMINAL%20CENTENARIO&cod=303&limit=700` → lista por dia e ponto
- CRUD de Items (exemplo de modelo):
  - `GET /api/v1/items`
  - `GET /api/v1/items/:id`
  - `POST /api/v1/items` `{ name, description? }`
  - `PUT /api/v1/items/:id` `{ name?, description? }`
  - `DELETE /api/v1/items/:id`

## Banco de dados

- Conexão em `src/config/database.js`.
- Modelos em `src/models/` (ex.: `Item`).
- Na inicialização (`src/server.js`) o app autentica e sincroniza (`sequelize.sync()`) os modelos. Em produção, prefira migrações.

## Scripts NPM

- `npm run dev`: inicia em modo desenvolvimento com nodemon
- `npm start`: inicia o servidor

## Estrutura de pastas

```
src/
  app.js                 # Bootstrap do Express e middlewares
  server.js              # Ponto de entrada do app
  config/
    database.js          # Configuração do Sequelize/Postgres
  controllers/
    ItemController.js    # Controller CRUD de exemplo
  models/
    Item.js              # Modelo Sequelize
    index.js             # Registro de modelos e export do sequelize
  routes/
    index.js             # Rotas base (/api)
    v1.js                # Rotas versão 1 (items)
  services/
    ExternalApiService.js # Consumo da API externa com axios

docker-compose.yml
.env (local)
```

## Notas

- Se `docker compose up -d` acusar erro de flag, tente `docker-compose up -d`.
- Ajuste `DATABASE_URL` se o Postgres estiver em outra porta/host.

## Licença

MIT
