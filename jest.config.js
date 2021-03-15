module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    "/node_modules/"
  ],
  testMatch: [
    "**/spec/**/*.ts?(x)",
    "**/?(*.)+(spec|test).ts?(x)"
  ]
};