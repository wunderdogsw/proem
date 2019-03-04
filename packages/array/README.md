# `@proem/array`

Utility package for processing arrays.

## Usage

First, import the `@proem/array` module is imported into the namespace

```
import array from '@proem/array';
```

`@proem/array` provides custom implementations for convenience functions already implemented by the `Array.prototype`, such as the `map` function. The semantics might differ, for example the `array.map` in proem trades the support of sparse arrays for performance.

```
const input = [1, 2, 3, 4, 5]

const output = array.map(input, n => n + 1)  // [2, 3, 4, 5, 6, 7]
```

Some functions have their partially applicable counterparts. For example, proem provides the `array.map.partial`, which returns a function applicable to arrays.

```
const a = ["a,", "b", "c"]
const b = ["d", "e", "f"]

const partial = map.partial((str: string) => str.toUpperCase())

const output = partial(a) // [ 'A,', 'B', 'C' ]

const otherOutput = partial(b) // ['D', 'E', 'F']
```
