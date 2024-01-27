

module.exports = {
  collectCoverage: true,
  transformIgnorePatterns: ['node_modules/(?!(sucrase)/)'],
  setupFilesAfterEnv: ["esm"],
  collectCoverageFrom: ['app/javascript/Pages/**/*.{ts,tsx}'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  resetModules: false, // It depends
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
  }
}