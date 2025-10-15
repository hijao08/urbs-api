## URBS API (Express + TypeScript)

API em Express que consome uma API externa e expõe endpoints públicos.

### Scripts

- `npm run dev`: roda em modo desenvolvimento com reload
- `npm run build`: compila para `dist/`
- `npm start`: executa build produzido

### Configuração

Variáveis de ambiente:

- `PORT` (opcional, default 3000)
- `LOG_LEVEL` (opcional, default info)
- `EXTERNAL_API_BASE_URL` (opcional, default https://httpbin.org)

### Rotas

- `GET /api/health` — verificação de saúde
- `GET /api/v1/search?q=...` — proxy simples para API externa
