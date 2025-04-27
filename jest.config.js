export default {
  // Enable ES modules support
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'jsx', 'json'],
  transformIgnorePatterns: [
    'node_modules/(?!(@pact-foundation|node-fetch|data-uri-to-buffer|fetch-blob|formdata-polyfill)/)'
  ],
};