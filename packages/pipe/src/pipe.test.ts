import * as array from '@proem/array'
import { pipe } from './pipe'

describe('pipe', () => {
  it('should transform value through all piped functions', () => {
    const longWordsLength = pipe((s: string) => s.split('.'))
      .to(array.map.partial(s => s.length))
      .to(array.filter.partial(l => l > 4))
      .to(array.reduce.partial<number, number>((acc, n) => acc + n)(0))

    expect(longWordsLength('foo.hello.world.and.other.places')).toBe(2)
  })
})
