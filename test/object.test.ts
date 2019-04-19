import { keys, map } from '~/object'
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
