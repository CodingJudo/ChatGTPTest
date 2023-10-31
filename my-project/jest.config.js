module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
  };
