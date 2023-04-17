import type {Config} from '@jest/types';


const testFileGlob = './**/+(*.)+(spec|test).ts?(x)';

const dependenciesExclusionGlob = '!**/node_modules/**';

const config: Config.InitialOptions = {
  // Basic options
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': './test/transformers/babel.js',
    '^.+\\.(scss|css)$': './test/transformers/css.js',
    '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)': './test/transformers/file.js',
  },
  transformIgnorePatterns: [
    './node_modules/(?!(lightweight-charts|fancy-canvas)/)',
  ],
  resetMocks: true,
  testMatch: [
    // Include test files
    testFileGlob,
    // Exclude dependencies
    dependenciesExclusionGlob,
  ],
  // Avoid some long-running test giving false-positive
  testTimeout: 20000,
  // Setup / Teardown
  setupFiles: [
    'dotenv/config',
    'react-app-polyfill/jsdom',
  ],
  setupFilesAfterEnv: [
    './test/jest.setup.ts',
  ],
  // Coverage
  collectCoverageFrom: [
    // Include all `ts` or `tsx` files in `src`
    './src/**/*.ts?(x)',
    // Exclude test files
    `!${testFileGlob}`,
    // Exclude dependencies
    dependenciesExclusionGlob,
    // Exclude type definition files
    '!./**/*.d.ts',
  ],
  coverageDirectory: '.',
  coverageReporters: [
    'clover',
    'cobertura',
  ],
};

export default config;
