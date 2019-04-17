/*
 * Adds references to the compiled index.d.ts so that submodule auto import
 * works for library users after they have imported the proem index for the first time.
 */

const fs = require('fs')
const path = require('path')

const submodules = fs
  .readdirSync(path.resolve(__dirname, '../src'))
  .filter(file => file !== 'index.ts' && file.endsWith('.ts'))
  .map(script => path.basename(script, '.ts'))

const references = submodules
  .map(submodule => `/// <reference path="./${submodule}.d.ts" />`)
  .join('\n')

const indexDtsPath = path.resolve(__dirname, '../package/index.d.ts')

const indexDts = fs.readFileSync(indexDtsPath, 'utf8')

fs.writeFileSync(indexDtsPath, `${references}\n\n${indexDts}`)
