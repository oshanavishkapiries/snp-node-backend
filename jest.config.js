export default {
  preset: "ts-jest", // Use this if you are using TypeScript, remove if using JavaScript
  testEnvironment: "node", // Use Node.js test environment
  verbose: true, // Display individual test results
  clearMocks: true, // Automatically clear mock calls and instances between tests
  coverageDirectory: "coverage", // Directory for test coverage reports
  collectCoverage: true, // Enable coverage collection
  collectCoverageFrom: [
    "src/**/*.js", // Collect coverage from all JavaScript files in the src directory
    "!src/**/index.js", // Ignore index.js files
    "!src/config/**", // Ignore config files (e.g., db.js, redis.js)
  ],
  coverageReporters: ["json", "lcov", "text", "clover"], // Output coverage reports in various formats
  testMatch: ["**/__tests__/**/*.test.js"], // Match test files with `.test.js` in __tests__ directories
  testTimeout: 10000, // Increase timeout to handle async operations like database queries
  setupFilesAfterEnv: ["./jest.setup.js"], // Specify setup file to initialize testing environment (e.g., mock database)
};
