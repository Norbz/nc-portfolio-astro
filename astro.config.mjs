// @ts-check
import { defineConfig } from 'astro/config';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  integrations: [icon()],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@includes" as *;`,
          includePaths: [path.resolve(__dirname, 'src/scss')]
        }
      }
    },
    resolve: {
      alias: {
        '@includes': path.resolve(__dirname, 'src/scss/includes')
      }
    },
    plugins: [],
  }
});