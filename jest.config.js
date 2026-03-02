const nextJest = require('next/jest')

const createJestConfig = nextJest({ dir: './' })

/** @type {import('jest').Config} */
module.exports = createJestConfig({
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    // Re-map the @/ alias used throughout the project
    '^@/(.*)$': '<rootDir>/$1',
  },
})
