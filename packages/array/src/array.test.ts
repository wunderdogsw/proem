import { map, filter, reduce } from './array'

describe('map', () => {
  it('should transform items', () => {
    const transformed = map(['a', 'bb', 'ccc'], n => n.length)
    expect(transformed).toEqual([1, 2, 3])
  })
})

describe('filter', () => {
  it('should remove items not matching predicate', () => {
    const filtered = filter(['a', 'bb', 'cc', 'ddd'], s => s.length !== 2)
    expect(filtered).toEqual(['a', 'ddd'])
  })

  const isString = (s: number | string): s is string => typeof s === 'string'

  it('should return items matching guard as type of guard', () => {
    const filtered: string[] = filter([11, 'a', 'bb', 12, 'ddd', 33], isString)
    expect(filtered).toEqual(['a', 'bb', 'ddd'])
  })

  describe('filter.partial', () => {
    it('should return items matching guard as type of guard', () => {
      const items = [11, 'a', 'bb', 12, 'ddd', 33]
      const filtered: string[] = filter.partial(isString)(items)
      expect(filtered).toEqual(['a', 'bb', 'ddd'])
    })
  })
})

describe('reduce', () => {
  it('should sum values', () => {
    const result = reduce([2, 4, 6], 0, (r, n) => r + n)
    expect(result).toBe(12)
  })

  it('should work with empty array', () => {
    const result = reduce([], 0, (r, n) => r + n)
    expect(result).toBe(0)
  })
})
