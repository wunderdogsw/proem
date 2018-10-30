import { map } from './array'

describe('map', () => {
  it('should transform items', () => {
    const transformed = map(['a', 'bb', 'ccc'], n => n.length)
    expect(transformed).toEqual([1, 2, 3])
  })
})
