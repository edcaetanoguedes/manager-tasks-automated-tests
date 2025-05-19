# Dependências
Documentação para controle/configuração mais específica de dependências.


> # 
> ### Cypress + Cucumber
> Permite estruturar testes automatizados.  
> Execute `npm install --save-dev cypress`.  
> No **package.json**, certifique-se de adicionar o trecho a seguir:  
```
{
  ...scripts,
  "test:cy:open": "cypress open",
  "test:cy:regress": "cypress run --env TAGS=@regress"
}
```
> Também adicione (considerando o path das steps cypress que você criou, exemplo: "cypress/support/step_definitions/**/*"):  
```
{
  ...scripts,
  "cypress-cucumber-preprocessor": {
    "stepDefinitions": "<PATH>",
  }
}
```
> **Instale as dependências relativas ao `Cucumber` nesta etapa**, e só então execute o `Cypress` pela primeira vez.  
> Se não existir, crie o arquivo **cypress.config.js** e adicione (padrão para `Cucumber`):

```
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { defineConfig } = require("cypress");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
require("dotenv").config();


module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/e2e/**/**/*.feature",
    viewportWidth: 1920,
    viewportHeight: 1080,
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config)
      on("file:preprocessor", createBundler({
        plugins: [createEsbuildPlugin(config)]
      }))
      return config;
    }
  },
  ,
  env: {
    grepFilterSpecs: true,
    BACKEND_ENDPOINT: "http://localhost:4000/api/v1",
    FRONTEND_URL: "http://localhost:3000"
  }
})
```
> Este trecho permite executar os testes em Cypress.  
> Execute `npm run test:cy:open`, nesta primeira execução construirá o diretório de pastas e arquivos padrão.  
> Crie, se não existir, o diretório **step_definitions** dentro de **cypress/support**. Os métodos Gherkin devem ficar dentro de **step_definitions**.
> Crie, se não existir, o diretório **e2e/features** dentro de **cypress**. Este novo diretório é destinado para os scripts de cenários.  
> ### Cucumber
> Ref: https://github.com/cucumber/cucumber-js  
> Execute `npm install --save-dev @badeball/cypress-cucumber-preprocessor @bahmutov/cypress-esbuild-preprocessor`.  
> Os métodos Gherkin (Given, When, Then) são importados de **@badeball/cypress-cucumber-preprocessor**.  
> **@bahmutov/cypress-esbuild-preprocessor** é um pré-processador de arquivos para `Cypress` baseado no `esbuild` - é uma ferramenta super rápida para compilar e empacotar Js/Ts, no caso, compilar ".feature" + ".js/.ts" com "Giver", "When", "Then" para que o `Cypress` possa entender e executar corretamente.  
> #

> #
> ### Chai
> Biblioteca de asserções, neste caso em especial o **expect**, mas também possui **should** e **assert**.
> Execute `npm install --save dev chai`.
> #
