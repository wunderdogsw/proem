const path = require('path')
const { references } = require('./tsconfig.json')
const autoExternal = require('rollup-plugin-auto-external')

const packagePaths = references.map(({ path }) => path)

module.exports = packagePaths.map(pkg => ({
  input: `${pkg}/lib/index.js`,
  output: {
    file: `${pkg}/lib/index.cjs.js`,
    format: 'cjs',
  },
  plugins: [
    autoExternal({
      packagePath: path.resolve(__dirname, pkg, 'package.json'),
    }),
  ],
}))
