export default {
  preset: 'ts-jest/presets/default-esm', // Utilisation de preset ESM
  testEnvironment: 'node', // Environnement Node.js
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { useESM: true }], // Transformer les fichiers TS/TSX avec ts-jest
  },
  extensionsToTreatAsEsm: ['.ts'], // Indiquer que .ts doit être traité comme un module ESM
  globals: {
    'ts-jest': {
      useESM: true, // Utilisation d'ESM dans ts-jest
    },
  },
};
