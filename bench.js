const glob = require('glob')
const proc = require('child_process')

glob('packages/*/src/**/*.bench.ts', (err, matches) => {
  if (err) {
    console.error(err)
    return
  }

  for (const file of matches) {
    proc.execSync(`yarn ts-node ${file}`, {
      stdio: 'inherit',
    })
  }
})
