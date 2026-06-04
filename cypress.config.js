import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import * as esbuildPlugin from "@badeball/cypress-cucumber-preprocessor/esbuild";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { defineConfig } from "cypress";
import fs from "fs";

export default defineConfig({
  e2e: {
    //baseUrl: "http://localhost:3000",
    screenshotOnRunFailure: false,
    specPattern: "cypress/e2e/**/**/*.feature",
    viewportWidth: 1920,
    viewportHeight: 1080,

    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [esbuildPlugin.createEsbuildPlugin(config)],
        }),
      );

      on("before:run", () => {
        const pastaReports = "./reports";
        if (fs.existsSync(pastaReports)) {
          fs.rmSync(pastaReports, { recursive: true, force: true });
        }
      });

      on("after:run", (results) => {
        const executionDate = new Date().toISOString();

        // JSON
        const report = {
          executionDate,
          totalTests: results.totalTests,
          totalPassed: results.totalPassed,
          totalFailed: results.totalFailed,
          totalPending: results.totalPending,
          totalSkipped: results.totalSkipped,
          totalDuration: results.totalDuration,
        };

        const pastaReports = "./reports";
        if (!fs.existsSync(pastaReports)) {
          fs.mkdirSync(pastaReports, { recursive: true });
        }

        fs.writeFileSync(
          pastaReports + `/report.json`,
          JSON.stringify(report, null, 2),
        );

        // Markdown
        const markdown = `
          # Resultado da Execução

          **Data:** ${executionDate}

          | Métrica | Valor |
          |----------|--------|
          | Total de testes | ${results.totalTests} |
          | Sucessos | ${results.totalPassed} |
          | Falhas | ${results.totalFailed} |
          | Duração (ms) | ${results.totalDuration} |

          ## Status Geral

          ${
            results.totalFailed > 0
              ? "❌ Existem testes com falha."
              : "✅ Todos os testes passaram."
          }
        `;

        fs.writeFileSync(
          `./reports/test-execution-${Date.now()}.md`,
          markdown.trim(),
        );
      });

      return config;
    },
  },
  env: {
    grepFilterSpecs: true,
    BACKEND_ENDPOINT: "http://localhost:4000/api/v1",
    FRONTEND_URL: "http://localhost:3000",
  },
});
