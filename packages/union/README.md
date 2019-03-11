# `@proem/union`

`@proem/union` provides functions for processing [union types](https://www.typescriptlang.org/docs/handbook/advanced-types.html#union-types)

## Usage

```ts
import union from '@proem/union'

type Label = 'a' | 'b'

const label: Label = 'a'

function labelToNumber(label: Label) {
  return union.mapLiteral(label, {
    a: () => 1,
    b: () => 2,
  })
}
```
