# Estrutura do Projeto

meu-projeto/
├── backend/
│   └── src/
│       └── database.db
│   └── scripts/
│       └── init_db.js
│   ├── server.js
├── frontend/
│   └── (Next.js app)
├── cypress/
│   └── e2e/
│       └── backend/
│           └── /\**/**/*.feature
│       └── frontend/
│           └── /\**/**/*.feature
│   └── fixtures/
│       └── tasks/
│           └── /\**/**/*.json
│   └── support/
│       └── backend/
│           └── /\**/**/*.js
│       └── frontend/
│           └── /\**/**/*.js
├── docs/
├── cypress.config.ts
├── package.json
