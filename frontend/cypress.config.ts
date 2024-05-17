import { defineConfig } from 'cypress';
import vitePreprocessor from 'cypress-vite';

export default defineConfig({
    e2e: {
        setupNodeEvents(on) {
            on('file:preprocessor', vitePreprocessor({
                configFile: './vite.config.ts',
                mode: 'development',
            }))
        },
        specPattern: 'cypress/integration/**/*.spec.{js,jsx,ts,tsx}',
        baseUrl: 'http://localhost:5173',
        viewportWidth: 1280,
        viewportHeight: 720,
        supportFile: 'cypress/support/e2e.ts',
    },
});
