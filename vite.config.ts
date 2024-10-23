/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
// import devtools from 'solid-devtools/vite';

export default defineConfig({
  root: 'src/',
  base: '/',

  build: {
    outDir: '../docs', // relative to root!
    emptyOutDir: true,

    target: 'esnext',
    sourcemap: true,
    minify: true,
  },

  plugins: [
    /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    solidPlugin(),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['node_modules/@testing-library/jest-dom/vitest'],
    // if you have few tests, try commenting this
    // out to improve performance:
    isolate: false,
  },

  resolve: {
    conditions: ['development', 'browser'],
  },

  clearScreen: false,
  logLevel: 'info',

  server: {
    port: 8080,
    host: '0.0.0.0',
  },
  preview: {
    port: 8080,
    host: '0.0.0.0',
  },
})
