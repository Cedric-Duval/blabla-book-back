/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: 'node',
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
  preset: 'ts-jest',
  testMatch: ['**/?(*.)+(test).[jt]s?(x)'],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
};
