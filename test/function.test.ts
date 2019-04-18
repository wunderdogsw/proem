import { partial } from '~/function'

describe('partial', () => {
  function sub(a: number, b: number): number {
    return a - b
  }

  function prefixHello(s: string) {
    return `Hello, ${s}`
  }

  it('should return a partially applied function', () => {
    const subThree = partial(sub)(3)
    expect(subThree(2)).toBe(-1)
  })

  it('should return partially applied function for unary function', () => {
    const prefix = partial(prefixHello)
    expect(prefix()('World')).toEqual('Hello, World')
  })
})
