import { map, filter, reduce, Dictionary } from './index'

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

  const isString = (key: string, value: any) => typeof value === 'string'

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
    const result: Array<[String, number]> = reduce(
      { foo: 2, bar: 4, baz: 6 },
      [],
      (r: Array<[String, number]>, n) => [...r, n],
    )
    expect(result).toEqual([['foo', 2], ['bar', 4], ['baz', 6]])
  })
})
