# `@proem/some`

Library for handling values that can be null.

## Usage

```ts
import * as some from '@proem/some'

const name = 'Jane' as string | null
const nameLength = some.map(name, n => n.length)
```
