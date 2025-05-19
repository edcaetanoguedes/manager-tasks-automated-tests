<h1>🔧 Testes Automatizados: Gerenciador de Tarefas (To-Do List)
    <img src="https://img.shields.io/static/v1?label=STATUS&message=1ª VERSÃO&color=GREEN&style=for-the-badge" width="150" height="25" />
    <img src="https://visitor-badge.laobi.icu/badge?page_id=teste-regressao_cypress-api-nextjs&" />
</h1>

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
- [x] Testes E2E.

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
  - `npm run test:all` Roda tudo em terminal.
  - `npm run test:regress` Roda somente os testes regressivos, no caso com a tag @regress
  - `npm run test:rest` Roda somente os testes de api, no caso com a tag @rest

## Licença

Este projeto está sob licensa MIT - veja o arquivo [LICENSE.md](https://github.com/edcaetanoguedes/teste-regressa-_cypress-api-nextjs/license)

## Agradecimentos

- Gostou do projeto? Achou legal? Peça a gentileza de dar uma estrela no projeto, um comentário. Assim poderei ter
métricas de relevância do projeto.

- Qualquer pessoa interessada no projeto, faça bom uso. Seja para estudo, prática ou curiosidade mesmo.

- Tem um projeto legal em mente e precisa de ajuda? Chama! Quem sabe não trabalhamos juntos.

## Bom proveito!