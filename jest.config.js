

module.exports = {
  preset: 'ts-jest',
  collectCoverage: true,
  transformIgnorePatterns: [
    '/node_modules/(?!jet-pro|react|antd|@ant-design/icons|rc-util|@babel/runtime|rc-pagination|rc-picker|@preact/signals-react|@preact/signals-core).+\\.js$',
  ],
  setupFilesAfterEnv: ["esm"],
  collectCoverageFrom: ['app/javascript/Pages/**/*.{ts,tsx}'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  resetModules: true, // It depends
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/app/javascript/$1',
    '\\.(css|less)$': 'identity-obj-proxy',
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    '^.+\\.(js|jsx|ts|tsx)?$': 'ts-jest',
  }
}