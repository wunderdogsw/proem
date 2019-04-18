const fs = require('fs')
const path = require('path')

// Remove everything from package/
fs.readdirSync(path.resolve(__dirname, '../package'))
  .filter(f => f !== 'package.json')
  .forEach(f => {
    fs.unlinkSync(path.resolve(__dirname, '../package', f))
  })
