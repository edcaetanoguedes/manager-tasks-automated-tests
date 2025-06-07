# 🔧 Testes Automatizados: Gerenciador de Tarefas (To-Do List)

<img src=" https://img.shields.io/badge/Status-EM_CONSTRUÇÃO-GREEN" width="150" height="25" />
<img src="https://visitor-badge.laobi.icu/badge?page_id=manager-tasks-automated-tests&" />

<div class="author">
  <p>Autor <a href="https://github.com/edcaetanoguedes">Ednaldo Guedes</a></p>
</div>

Este é o repositório de testes da aplicação de tarefas (To-Do List).

#### Objetivo

Este projeto faz parte de um combo para estudo e aprimoramento de testes (Frontend, Backend e Testes Automatizados).

### Funcionalidades principais:

- **Backend**: API REST com rotas para listar, criar e deletar tarefas.
- **Frontend**: Tela simples para visualizar, adicionar tarefas e apagar tarefas.
- **Teste de regressão**: Teste para garantir que os recursos continuam funcionando após alterações.

### Estágios do projeto

Fase 1:

- [x] Requisitos.
- [x] Recursos/Skills.
- [x] [Bibliotecas/dependências](./docs/dependencies.md).
- [x] [Estrutura do projeto](./docs/structure/project.md).
- [x] [Rotas da aplicação](./docs/structure/routes.md).
- [x] Redação inicial do README.

Fase 2:

- [x] Implementação do Backend.
- [x] Implementação do Frontend.

Fase 3:

- Testes de Backend/API.
  - [x] Implementação dos testes regressivos
    - Para conferir a primeira versão de teste: `git tag v1.0.0-test-backend`.
- Testes de Frontend.
  - [x] Implementação dos testes E2E
    - Para conferir a primeira versão de teste:`git tag v1.0.0-test-frontend`.

Fase 4:

- [ ] Relatório: Análise/Revisão do projeto.

## Instalação

**AVISO**: Execute o Backend, depois o Frontend e então os testes.

### Backend

- ### Clone do repositório
  - Execute `git clone https://github.com/edcaetanoguedes/manager-tasks-backend.git`.
  - Acesse a pasta do repositório `cd manager-tasks-backend`.
  - Execute `npm install` para instalar as dependências.
- ### Rodando o projeto
  - Execute `npm run dev`.
  - Por padrão o backend. Rodará em [http://localhost:4000](http://localhost:4000).

### Frontend

- ### Clone do repositório
  - Execute `git clone https://github.com/edcaetanoguedes/manager-tasks-frontend.git`.
  - Acesse a pasta do repositório `cd manager-tasks-frontend`.
  - Execute `npm install` para instalar as dependências.
- ### Rodando o projeto

  - Execute `npm run dev`.
  - Por padrão o backend. Rodará em [http://localhost:3000](http://localhost:3000).

- ### Testes:

  - ### Clone do repositório
    - Execute `git clone https://github.com/edcaetanoguedes/manager-tasks-automated-tests.git`.
    - Acesse a pasta do repositório `cd manager-tasks-automated-tests`.
    - Execute `npm install` para instalar as dependências.
  - ### Rodando os testes
  - `npm run test:cy:open` Roda a interface.
  - `npm run test:cy:all` Roda todos os testes em terminal (log visível).
  - `test:cy:backend` Roda somente os testes de backend.
  - `test:cy:frontend` Roda somente os testes de frontend.
  - `npm run test:cy:regress` Roda somente os testes regressivos (tag @regress).
  - `npm run test:cy:rest` Roda somente os testes de api (tag @rest).
  - `test:cy:silent:regress` Roda somente o regressivo, porém no modo silencioso.
  - `test:cy:silent:backend` Roda somente o backend, porém no modo silencioso.
  - `test:cy:silent:frontend` Roda somente o frontend, porém no modo silencioso.
  - `test:cy:silent:rest` Roda somente a api, porém no modo silencioso.

## Stacks

- **Testes**: Cypress, Cucumber, Chai.
- **Padronização de código/commit**: husky, lint-stage, commitizen, commitlint.

## Commits

- `feat`: nova funcionalidade.
- `fix`: correção de bug.
- `chore`: tarefas gerais que não afetam o código em produção (install, configs, linter).
- `docs`: mudanças na documentação.
- `style`: formatação, ponto e vírgula, espaços em branco, etc.
- `refactor`: refatoração de código (sem nova funcionalidade ou bug fix).
- `test`: adição ou ajuste de testes.

## Agradecimentos

- Gostou do projeto? Achou legal? Peça a gentileza de dar uma estrela no projeto, um comentário. Assim poderei ter
  métricas de relevância do projeto.

- Qualquer pessoa interessada no projeto, faça bom uso. Seja para estudo, prática ou curiosidade mesmo.

- Tem um projeto legal em mente e precisa de ajuda? Chama! Quem sabe não trabalhamos juntos.

## Bom proveito!
