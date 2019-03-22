import { Suite, Event } from 'benchmark'
import * as array from './index'

function suite(name: string): Suite {
  return new Suite(name)
    .on('cycle', (event: Event) => {
      console.log(String(event.target))
    })
    .on('complete', function(this: any) {
      console.log('Fastest is ', this.filter('fastest').map('name'))
    })
}

const items: number[] = []
for (let i = 0; i < 100; i++) {
  items.push(i)
}

// Add .run() after suites you want to run

suite('map')
  .add('Array.prototype.map', () => {
    items.map(i => i + 1)
  })
  .add('array.map', () => {
    array.map(items, i => i + 1)
  })

suite('reduce')
  .add('Array.prototype.reduce', () => {
    items.reduce((acc, item) => acc + item, 0)
  })
  .add('array.reduce', () => {
    array.reduce(items, 0, (acc, item) => acc + item)
  })
  .add('inlined', () => {
    let result = 0
    for (let i = 0; i < items.length; i++) {
      result = result + items[i]
    }
    return result
  })
  .run()

suite('filter')
  .add('Array.prototype.filter', () => {
    items.filter(i => i % 2 === 0)
  })
  .add('array.filter', () => {
    array.filter(items, i => i % 2 === 0)
  })
