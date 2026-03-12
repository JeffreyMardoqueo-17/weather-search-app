import nextJest from "next/jest.js"

const createJestConfig = nextJest({
  dir: "./",
})

// Configuracin personalizada de Jest para la aplicacion

const customJestConfig = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  collectCoverageFrom: [
    "src/components/search-form.tsx",
    "src/components/weather-card.tsx",
    "src/components/weather-search-shell.tsx",
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
}

export default createJestConfig(customJestConfig)
