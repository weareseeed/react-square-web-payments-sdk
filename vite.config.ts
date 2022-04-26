/// <reference types="vitest" />

// Dependencies
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// Internals
import { peerDependencies, dependencies } from './package.json';

const externalPackages = [
  // We need to build @square/web-sdk with the package to avoid problems with ES Modules in bundlers like Next.js
  ...Object.keys(dependencies).filter((name) => name !== '@square/web-sdk'),
  ...Object.keys(peerDependencies),
];

// Creating regexes of the packages to make sure subpaths of the
// packages are also treated as external
const regexesOfPackages = externalPackages.map((packageName) => new RegExp(`^${packageName}(/.*)?`));

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src', 'index.ts'),
      formats: ['cjs', 'es'],
      fileName: (ext) => `rswps.${ext}.js`,
    },
    rollupOptions: {
      external: regexesOfPackages,
      output: [
        {
          dir: resolve(__dirname, 'dist'),
          entryFileNames: '[name].cjs.js',
          exports: 'named',
          format: 'cjs',
          preserveModules: true,
          preserveModulesRoot: 'src',
        },
        {
          dir: resolve(__dirname, 'dist'),
          entryFileNames: '[name].es.js',
          exports: 'named',
          format: 'es',
          preserveModules: true,
          preserveModulesRoot: 'src',
        },
      ],
    },
    target: 'esnext',
    sourcemap: true,
  },
  plugins: [
    react({
      jsxRuntime: 'classic',
    }),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
    },
  },
  test: {
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
    environment: 'jsdom',
    globals: true,
    setupFiles: './jest.setup.ts',
  },
});
