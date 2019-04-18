import { map, filter, reduce, forEach, Dictionary } from '~/dict'

describe('forEach', () => {
  it('should iterate through all the items and keys in a Dictionary', () => {
    const values = {
      a: 1,
      b: 2,
      c: 3,
    }

    const result: Array<[number, string]> = []
    forEach(values, (value, key) => {
      result.push([value, key])
    })
    expect(values).toEqual({ a: 1, b: 2, c: 3 })
    expect(result).toEqual([[1, 'a'], [2, 'b'], [3, 'c']])
  })

  it('should not call body when iterating empty object', () => {
    const values = {}

    const body = jest.fn()
    forEach(values, body)
    expect(values).toEqual({})
    expect(body).toHaveBeenCalledTimes(0)
  })
})

describe('map', () => {
  it('should transform items', () => {
    const transformed: Dictionary<string> = map({ foo: 'bar' }, (k, v) => k + v)
    expect(transformed).toEqual({ foo: 'foobar' })
  })

  it('should list only values', () => {
    const transformed: Dictionary<string> = map({ foo: 'bar' }, (_, v) => v)
    expect(transformed).toEqual({ foo: 'bar' })
  })
})

describe('filter', () => {
  it('should remove items not matching predicate', () => {
    const filtered: Dictionary<string> = filter(
      { foo: 'bar', bar: 'baz' },
      k => k !== 'bar',
    )
    expect(filtered).toEqual({ foo: 'bar' })
  })

  const isString = (_key: string, value: unknown) => typeof value === 'string'

  it('should return items matching guard as type of guard', () => {
    const filtered: Dictionary<string | number> = filter(
      { a: 11, bb: '12', ddd: 33 },
      isString,
    )
    expect(filtered).toEqual({ bb: '12' })
  })
})

describe('reduce', () => {
  it('should sum values', () => {
    const result: number = reduce(
      { foo: 2, bar: 4, baz: 6 },
      0,
      (r, [_, v]) => r + v,
    )
    expect(result).toBe(12)
  })

  it('should work with empty dict', () => {
    const dict: Dictionary<number> = filter({ foo: 1 }, () => false)
    const result: number = reduce(dict, 0, (r, [_, v]) => r + v)
    expect(result).toBe(0)
  })

  it('should add elements to array', () => {
    const result: Array<[string, number]> = reduce(
      { foo: 2, bar: 4, baz: 6 },
      [] as Array<[string, number]>,
      (r, n) => [...r, n],
    )
    expect(result).toEqual([['foo', 2], ['bar', 4], ['baz', 6]])
  })
})
