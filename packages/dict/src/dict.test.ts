import { map, filter, reduce, Dictionary } from './dict'

describe('map', () => {
  it('should transform items', () => {
    const transformed = map({foo: 'bar'}, ([k,v]) => k+v)
    expect(transformed).toEqual(['foobar'])
  })

  it('should list only values', () => {
    const transformed = map({foo: 'bar'}, ([k,v]) => v)
    expect(transformed).toEqual(['bar'])
  })

  describe('map.partial', () => {
    it('should catenate keys and values', () => {
      const catenatingMapping = map.partial(([k, v]) => k + v)
      const transformed = catenatingMapping({ foo: 'bar' })
      expect(transformed).toEqual(['foobar'])
    })
  })
})

describe('filter', () => {
  it('should remove items not matching predicate', () => {
    const filtered = filter({ foo: 'bar', bar: 'baz' }, ([k,v]) => k !== 'bar')
    expect(filtered).toEqual({ foo: 'bar' })
  })

  const isString = ([k,v] : [string,any] ) => typeof v === 'string'

  it('should return items matching guard as type of guard', () => {
    const filtered: string[] = filter({ 'a': 11, 'bb': '12', 'ddd': 33 }, isString)
    expect(filtered).toEqual({ 'bb': '12' })
  })

  describe('filter.partial', () => {
    it('should return items matching guard as type of guard', () => {
      const items = {'a':11, 'bb': '12', 'ddd': 33}
      const filtered: Dictionary = filter.partial(isString)(items)
      expect(filtered).toEqual({'bb': '12'})
    })
  })
})

describe('reduce', () => {
  it('should sum values', () => {
    const result = reduce({ foo: 2, bar: 4, baz:6 }, 0, (r, [_,v]) => r + v)
    expect(result).toBe(12)
  })

  it('should work with empty dict', () => {
    const result = reduce({}, 0, (r, [_,v]) => r + v)
    expect(result).toBe(0)
  })

  it('should add elements to array', () => {
    const result = reduce({ foo: 2, bar: 4, baz: 6 }, [], (r: any[], n) => [...r, n])
    expect(result).toEqual([['foo',2],['bar',4],['baz',6]])
  })
})
