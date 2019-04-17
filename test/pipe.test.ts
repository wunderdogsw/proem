import * as array from '~/array'
import { pipe } from '~/pipe'

describe('pipe', () => {
  it('should transform value through all piped functions', () => {
    const longWordsLength = pipe((s: string) => s.split('.'))
      .to(_ => array.map(_, s => s.length))
      .to(_ => array.filter(_, l => l > 4))
      .to(_ => array.reduce(_, 0, (acc, n) => acc + n))

    expect(longWordsLength('foo.hello.world.and.other.places')).toBe(21)
  })
})
