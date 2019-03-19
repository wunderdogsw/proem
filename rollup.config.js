const { references } = require('./tsconfig.json')

const packagePaths = references.map(({ path }) => path)

module.exports = packagePaths.map(path => ({
  input: `${path}/lib/index.js`,
  output: {
    file: `${path}/lib/index.cjs.js`,
    format: 'cjs',
  },
}))
