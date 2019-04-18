import * as variant from '~/variant'
import * as array from '~/array'

interface Add {
  type: 'add'
  left: number
  right: number
}

interface Increment {
  type: 'increment'
  value: number
}

interface Decrement {
  type: 'decrement'
  value: number
}

interface Sub {
  type: 'sub'
  left: number
  right: number
}

interface Div {
  type: 'div'
  left: number
  right: number
}

type Op = Add | Sub | Increment | Decrement | Div

const op = (v: Op): Op => v

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ignore<T>(_value: T): void {}

describe('tags', () => {
  it('should infer tag types', () => {
    const tagsInferred = variant.tags('a', 'b', 'c')
    ignore<['a', 'b', 'c']>(tagsInferred)
  })
})

describe('map', () => {
  const calc = variant.map<Op, number>({
    add: ({ left, right }) => left + right,
    sub: ({ left, right }) => left - right,
    increment: ({ value }) => value + 1,
    decrement: ({ value }) => value - 1,
    div: ({ left, right }) => {
      if (right === 0) {
        throw Error('DIVIDE BY ZERO')
      }
      return left / right
    },
  })

  const partialCalc = variant.map<Op, number | string>(
    {
      add: ({ left, right }) => left + right,
      sub: ({ left, right }) => left - right,
    },
    v => v.type as string,
  )

  test('should return transformed value for variant', () => {
    expect(calc(op({ type: 'increment', value: 1 }))).toBe(2)
  })

  test('should return default case value when given a unhandled variant', () => {
    expect(partialCalc(op({ type: 'increment', value: 1 }))).toBe('increment')
  })

  test('should return result when there is a match and a default case is provided', () => {
    expect(partialCalc(op({ type: 'add', left: 1, right: 2 }))).toBe(3)
  })

  test('should throw error if variants type is not one of the cases', () => {
    expect(() => calc({ type: 'foo' } as any)).toThrowError(
      'No match case found',
    )
  })
})

describe('oneOf', () => {
  it('should return true if variant matches any tags', () => {
    expect(
      variant.oneOf(op({ type: 'increment', value: 1 }), ['add', 'increment']),
    ).toBe(true)
  })

  it("should return false if variant doesn't match any tags", () => {
    expect(
      variant.oneOf(op({ type: 'increment', value: 1 }), ['add', 'sub']),
    ).toBe(false)
  })

  it('should refine the type in an if statement', () => {
    const inc = op({ type: 'increment', value: 1 })
    if (variant.oneOf(inc, ['div', 'sub'])) {
      ignore<Div | Sub>(inc)
    } else {
      ignore<Add | Sub | Increment | Decrement>(inc)
    }
  })
})

describe('reducer', () => {
  type StatefulOp =
    | { type: 'add'; right: number }
    | { type: 'sub'; right: number }
    | { type: 'increment' }

  const calcReducer = variant.reducer<number, StatefulOp>({
    add: (result, { right }) => result + right,
    sub: (result, { right }) => result - right,
    increment: result => result + 1,
  })

  it('should work as an array reducer', () => {
    const ops: StatefulOp[] = [
      { type: 'add', right: 4 },
      { type: 'sub', right: 2 },
      { type: 'increment' },
    ]
    expect(array.reduce(ops, 0, calcReducer)).toBe(3)
  })

  it('should return state unchanged if no matching case is found', () => {
    const op = { type: 'foo' } as any
    const state = new Number(2)
    expect(calcReducer(state as number, op)).toBe(state)
  })
})
