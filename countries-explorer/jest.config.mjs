export default {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  setupFiles: ["./jest.setup.js"],
};
