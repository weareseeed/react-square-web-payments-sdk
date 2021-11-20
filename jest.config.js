module.exports = {
  collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['<rootDir>/**/*.(spec|test).{ts,tsx,js,jsx}'],
  testURL: 'http://localhost',
  rootDir: './',
  testEnvironment: 'jsdom',
  transform: {
    '.(ts|tsx)$': require.resolve('ts-jest/dist'),
    '.(js|jsx)$': require.resolve('babel-jest'), // Jest's default
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$',
    '<rootDir>/node_modules/(?!@square/web-sdk)',
  ],
  watchPlugins: [
    require.resolve('jest-watch-typeahead/filename'),
    require.resolve('jest-watch-typeahead/testname'),
  ],
}
