// / <reference types="vitest" />
/* eslint-disable import/no-unresolved */
import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  test: {
    include: ['**/*.e2e-spec.ts'],
    globals: true,
    root: './',
    poolOptions: {
      threads: {
        minThreads: 4,
        maxThreads: 5,
      },
    },
    exclude: ['.docker', 'node_modules', 'dist'],
    environmentMatchGlobs: [
      ['**/*.e2e-spec.ts', './src/test/environments/custom-e2e-environment'],
    ],
  },
  plugins: [
    tsConfigPaths(),
    swc.vite({
      configFile: '.swcrc-test',
    }),
  ],
});
