import { map, filter, find, range, reduce, reverse } from './index'

describe('map', () => {
  it('should transform items', () => {
    const transformed = map(['a', 'bb', 'ccc'], n => n.length)
    expect(transformed).toEqual([1, 2, 3])
  })

  it('should return indexes for items', () => {
    const transformed = map(['a', 'bb', 'ccc'], (n, i) => n.length * i)
    expect(transformed).toEqual([0, 2, 6])
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

  it('should filter by index', () => {
    const filtered: Array<string | number> = filter(
      [11, 'a', 'bb', 12, 'ddd', 33],
      (_, i) => i % 2 === 0,
    )
    expect(filtered).toEqual([11, 'bb', 'ddd'])
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

  it('should sum values and indexes', () => {
    const result = reduce([2, 4, 6], 0, (r, n, i) => r + n + i)
    expect(result).toBe(15)
  })
})

describe('find', () => {
  it('should find first item that matches predicate', () => {
    const items = [
      { kind: 'a', value: 1 },
      { kind: 'b', value: 2 },
      { kind: 'b', value: 3 },
    ]
    const result = find(items, ({ kind }) => kind === 'b')
    expect(result).toBe(items[1])
  })

  it('should return undefined if item is not found', () => {
    const items = [1, 2, 3, 4]
    const result = find(items, i => i > 4)
    expect(result).toBeUndefined()
  })
})

describe('reverse', () => {
  it('returns an empty array for empty arrays', () => {
    const result = reverse([])
    expect(result).toEqual([])
  })

  it('return a reversed array', () => {
    const items = [1, 2, 3, 4]
    const result = reverse(items)
    expect(result).toEqual([4, 3, 2, 1])
  })

  it('should not mutate the input array', () => {
    const items = [1, 2, 3, 4]
    const result = reverse(items)
    expect(items).toEqual([1, 2, 3, 4])
  })
})

describe('range', () => {
  it('should return [0] for range(0, 0)', () => {
    const result = range(0, 0)
    expect(result).toEqual([0])
  })

  it('should fill an array with [1,2,3] with range(1, 3)', () => {
    const result = range(1, 3)
    expect(result).toEqual([1, 2, 3])
  })

  it('should fill an array with [1] with range(1, 1)', () => {
    const result = range(1, 3)
    expect(result).toEqual([1, 2, 3])
  })

  it('should return an empty array where a < b when called with range(a, b)', () => {
    const result = range(2, 1)
    expect(result).toEqual([])
  })
})
