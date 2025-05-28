import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import createEsbuildPlugin from "@badeball/cypress-cucumber-preprocessor/esbuild";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    //baseUrl: "http://localhost:3000",
    specPattern: "cypress/e2e/**/**/*.feature",
    viewportWidth: 1920,
    viewportHeight: 1080,

    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        }),
      );
      return config;
    },
  },
  env: {
    grepFilterSpecs: true,
    BACKEND_ENDPOINT: "http://localhost:4000/api/v1",
    FRONTEND_URL: "http://localhost:3000",
  },
});
