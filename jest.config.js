// jest.config.js
const {
  defaults: tsjPreset
} = require('ts-jest/presets');

module.exports = {
  moduleFileExtensions: [...tsjPreset.moduleFileExtensions, 'ts'],
  transform: {
    ...tsjPreset.transform,
    "^.+\\.tsx?$": "ts-jest"
  },
  testMatch: [
    "**/*.test.ts"
  ]
}
