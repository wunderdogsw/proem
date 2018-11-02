# `@proem/pipe`

Proem package for composing functions as pipelines.

## Usage

```
import * as array from '@proem/array'
import { pipe } from '@proem/pipe'

const longWordsLength = pipe((s: string) => s.split('.'))
  .to(array.map.partial(s => s.length))
  .to(array.filter.partial(l => l > 4))
  .to(array.reduce.partial<number, number>((acc, n) => acc + n)(0))
```
