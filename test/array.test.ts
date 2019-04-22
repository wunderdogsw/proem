import {
  drop,
  dropWhile,
  filter,
  find,
  map,
  range,
  reduce,
  reverse,
  take,
  takeWhile,
  includes,
  fill,
  generate,
  flatMap,
  forEach,
} from '~/array'

describe('forEach', () => {
  it('should iterate all items in an array', () => {
    const values = ['a', 'b', 'c']

    const result: Array<[number, string]> = []
    forEach(values, (item, index) => {
      result.push([index, item])
    })
    expect(result).toEqual([[0, 'a'], [1, 'b'], [2, 'c']])
  })

  it('should iterate an ArrayLike object', () => {
    const values = {
      length: 3,
      0: 'a',
      1: 'b',
      2: 'c',
    }

    const result: Array<[number, string]> = []
    forEach(values, (item, index) => {
      result.push([index, item])
    })
    expect(result).toEqual([[0, 'a'], [1, 'b'], [2, 'c']])
  })
})

describe('fill', () => {
  it('should create an array filled with single item', () => {
    const result = fill(9, 5)
    expect(result).toEqual([9, 9, 9, 9, 9])
  })

  it('should create an empty array', () => {
    const result = fill(9, 0)
    expect(result).toEqual([])
  })

  it('should throw if given negative length', () => {
    expect(() => fill(9, -10)).toThrowError("length can't be negative")
  })
})

describe('generate', () => {
  it('should create an array with generated items', () => {
    const result = generate(i => i + 1, 5)
    expect(result).toEqual([1, 2, 3, 4, 5])
  })

  it('should create an empty array', () => {
    const result = generate(i => i + 1, 0)
    expect(result).toEqual([])
  })

  it('should throw if given negative length', () => {
    expect(() => generate(i => i + 1, -10)).toThrowError(
      "length can't be negative",
    )
  })
})

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

describe('flatMap', () => {
  it('should flatten arrays', () => {
    const result = flatMap([1, 2, 3], (v, i) => [v, i])
    expect(result).toEqual([1, 0, 2, 1, 3, 2])
  })

  it('should return empty array if given an empty array', () => {
    const result = flatMap([], () => [1, 2])
    expect(result).toEqual([])
  })

  it('should return empty array if all steps return empty arrays', () => {
    const result = flatMap([1, 2, 3], () => [])
    expect(result).toEqual([])
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
    reverse(items)
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

describe('take', () => {
  it('should return an empty array when given an empty array', () => {
    const result = take([], 1)
    expect(result).toEqual([])
  })

  it('should return an empty array when called to take 0', () => {
    const result = take([1, 2, 3], 0)
    expect(result).toEqual([])
  })

  it('should return n elements of a non-empty array', () => {
    const result = take([1, 2, 3], 2)
    expect(result).toEqual([1, 2])
  })

  it('should return the full array, when called with greater than input length', () => {
    const result = take([1, 2, 3], 4)
    expect(result).toEqual([1, 2, 3])
  })

  it('should not mutate the input array', () => {
    const input = [1, 2, 3]
    take(input, 2)
    expect(input).toEqual([1, 2, 3])
  })
})

describe('drop', () => {
  it('should return an empty when given an empty array', () => {
    expect(drop([], 1)).toEqual([])
  })

  it('should drop the first n elements of an array', () => {
    expect(drop([1, 2, 3], 1)).toEqual([2, 3])
  })

  it('should not mutate the input array', () => {
    const input = [1, 2, 3]
    drop(input, 1)
    expect(input).toEqual([1, 2, 3])
  })

  it('should return an empty array when dropping beyond capacity', () => {
    const input = [1, 2, 3]
    const result = drop(input, 4)
    expect(result).toEqual([])
  })
})

describe('takeWhile', () => {
  it('should return an empty array when given an empty array', () => {
    const result = takeWhile([], value => Boolean(value))
    expect(result).toEqual([])
  })

  it('should return only the first n items predicate was truthy for', () => {
    const input = [1, 2, 3, 4, 5, 6]
    const result = takeWhile(input, value => value < 3)
    expect(result).toEqual([1, 2])
  })

  it('should return an empty array, if first element fails the test', () => {
    const input = [3, 1, 1]
    const result = takeWhile(input, value => value < 3)
    expect(result).toEqual([])
  })

  it('should return the full array, if every element is a match', () => {
    const input = [1, 2, 3]
    const result = takeWhile(input, () => true)
    expect(result).toEqual([1, 2, 3])
  })

  it('should provide an index variable for predicates', () => {
    const input = [1, 2, 3]
    const result = takeWhile(input, (value, index) => index === 0)
    expect(result).toEqual([1])
  })
})

describe('dropWhile', () => {
  it('should return an empty array when given an empty array', () => {
    const result = dropWhile([], (value: unknown) => Boolean(value))
    expect(result).toEqual([])
  })

  it('should drop all elements the test yields true for', () => {
    const input = [1, 2, 3]
    const result = dropWhile(input, value => Boolean(value))
    expect(result).toEqual([])
  })

  it('should return the elements after first test fail', () => {
    const input = [1, 2, 3]
    const result = dropWhile(input, value => value < 3)
    expect(result).toEqual([3])
  })

  it('should drop none if the first test fails', () => {
    const input = [3, 2, 1]
    const result = dropWhile(input, value => value < 3)
    expect(result).toEqual([3, 2, 1])
  })

  it('should provide the index for predicates', () => {
    const input = [3, 2, 1]
    const result = dropWhile(input, (_value, index) => index < 1)
    expect(result).toEqual([2, 1])
  })
})

describe('includes', () => {
  it('should return false if array is empty', () => {
    expect(includes([], 1)).toBe(false)
  })

  it('should return true for an item that exists', () => {
    expect(includes([1, 2, 3], 2)).toBe(true)
  })

  it("should return false for an item that doesn't exits", () => {
    expect(includes([1, 2, 3], 4)).toBe(false)
  })

  it('should return true for NaN if array contains NaN', () => {
    expect(includes([1, 2, NaN], NaN)).toBe(true)
  })

  it("should return false for NaN if array doesn't contain NaN", () => {
    expect(includes([1, 2, 3], NaN)).toBe(false)
  })
})
