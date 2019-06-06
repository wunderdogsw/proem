import { keys, map, filter } from '~/object'
import { typeAssert } from './test-util'

describe('keys', () => {
  it('should return a typed array of objects keys', () => {
    const obj = {
      a: 'first',
      b: 2,
      c: new Date(),
      1: 2,
    } as const
    const objKeys = keys(obj)
    typeAssert<Array<1 | 'a' | 'b' | 'c'>>(objKeys)
    expect(objKeys.sort()).toEqual(['1', 'a', 'b', 'c'])
  })

  it('should throw error on non plain objects', () => {
    expect(() => keys([1, 2])).toThrowError(
      'object.keys argument must be a plain object',
    )
  })
})

describe('map', () => {
  it('should return transformed object', () => {
    const obj = {
      a: 'first',
      b: 32,
    }
    const mapped = map(obj, (value, key) => `${key}-${value}`)
    typeAssert<{ a: string; b: string }>(mapped)

    expect(mapped).toEqual({
      a: 'a-first',
      b: 'b-32',
    })
  })

  it('should return empty object when given an empty object', () => {
    const obj = {}
    const mapfn = jest.fn()
    const mapped = map(obj, mapfn)

    expect(mapfn).toHaveBeenCalledTimes(0)
    expect(mapped).toEqual({})
  })
})

describe('filter', () => {
  it('should remove fields not matching predicate', () => {
    const obj = {
      a: 'first',
      b: 2,
      c: 'third',
    } as const
    const result = filter(obj, (field, key) => `${key}-${field}` !== 'b-2')
    expect(result).toEqual({
      a: 'first',
      c: 'third',
    })
  })

  it('should remove fields not matching guard and cast values that match using the guard', () => {
    const obj = {
      a: 'first',
      b: 2,
      c: 'third',
    } as const
    const isString = (value: string | unknown): value is string =>
      typeof value === 'string'
    const result = filter(obj, isString)
    typeAssert<{
      readonly a: string
      readonly c: string
    }>(result)
    expect(result).toEqual({
      a: 'first',
      c: 'third',
    })
  })
})
