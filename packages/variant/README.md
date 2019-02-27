# `@proem/variant`

`@proem/variant` provides functions for processing [Variant](https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions)
types (also known as discriminated unions, sum types, algebraic data types, ...).

## Usage

Defining variants can be done with interfaces:

```ts
// Variant is a combination of multiple tagged types
type Op = Add | Sub | Increment | Decrement | Div

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
```

### `variant.map`

`variant.map` takes an object with a variant handling function for each case, and returns
a function that takes a variant and returns a new value.

```ts
import variant from '@proem/variant'

// map returns a function that takes a variant and returns a result based on your config
const calculate = variant.map<Op, number>({
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

const result = calculate({ type: 'add', left: 2, right: 3 }) // === 5
```

Providing an optional default case as a second parameter allows handlying partial cases:

```ts
import variant from '@proem/variant'

// map returns a function that takes a variant and returns a result based on your config
const calculate: (op: Op) => number = variant.map<Op, number>(
  {
    add: ({ left, right }) => left + right,
    sub: ({ left, right }) => left - right,
  },
  op => 0,
)

const result = calculate({ type: 'increment', value: 1 }) // === 0
```

### `variant.reducer`

`variant.reducer` takes an object with a variant handling function for each case, and returns
a reducer function that takes a state and variant and returns a new state.

```ts
import variant from '@proem/variant'
import array from '@proem/array'

type StatefulOp =
  | { type: 'add'; right: number }
  | { type: 'sub'; right: number }
  | { type: 'increment' }

const calcReducer = variant.reducer<number, StatefulOp>({
  add: (result, { right }) => result + right,
  sub: (result, { right }) => result - right,
  increment: result => result + 1,
})

const ops: StatefulOp[] = [
  { type: 'add', right: 4 },
  { type: 'sub', right: 2 },
  { type: 'increment' },
]

const result = array.reduce(ops, 0, calcReducer) // === 3
```

### `variant.oneOf`

`variant.oneOf` is a [type guard](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types)
that can refine the type of a Variant to a more specific one.

```ts
function checkOp(op: Op) {
  if (variant.oneOf(op, ['div', 'sub'])) {
    const divOrSub: Div | Sub = op
    // type inference knowns that op is either Div or Sub
  } else {
    // type inference knowns that op is not Div or Sub
    const or: Add | Sub | Increment | Decrement = op
  }
}
```
