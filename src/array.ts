/** `IndexedMap` transforms a value and is called with an index. */
export type IndexedMap<A, B> = (value: A, index: number) => B

/** `IndexedPredicate` checks a property of a value and is called with an index. */
export type IndexedPredicate<A> = (value: A, index: number) => boolean

/** `IndexedGuard` checks the type of a value and is called with an index. */
export type IndexedGuard<A, B extends A> = (
  value: A,
  index: number,
) => value is B

/** `generate` creates a new array of lenght where each item is generated by the provided function. */
export function generate<A>(
  createItem: (index: number) => A,
  length: number,
): A[] {
  if (length < 0) {
    throw Error("length can't be negative")
  }
  const array = new Array<A>(length)
  for (let i = 0; i < length; i++) {
    array[i] = createItem(i)
  }
  return array
}

/** `fill` creates a new array of length where each item is the provided value. */
export function fill<A>(value: A, length: number): A[] {
  return generate(() => value, length)
}

/** `map` transforms the array items to the return value of the function. */
export function map<A, B>(array: ArrayLike<A>, mapfn: IndexedMap<A, B>): B[] {
  const result = new Array<B>(array.length)
  for (let i = 0; i < array.length; i++) {
    result[i] = mapfn(array[i], i)
  }
  return result
}

/** `flatMap` transforms each array item into an array, then flattens each array into a single array.  */
export function flatMap<A, B>(
  array: ArrayLike<A>,
  mapFn: IndexedMap<A, ArrayLike<B>>,
): B[] {
  const result: B[] = []
  for (let i = 0; i < array.length; i++) {
    const items = mapFn(array[i], i)
    for (let j = 0; j < items.length; j++) {
      result.push(items[j])
    }
  }
  return result
}

/**
 * `filter` transforms an array by removing all items that don't match the condition.
 *
 *  If the condition is a type guard, the array items are also cast into the guarded type.
 */
export function filter<A, B extends A>(
  array: ArrayLike<A>,
  guard: IndexedGuard<A, B>,
): B[]
export function filter<A>(
  array: ArrayLike<A>,
  predicate: IndexedPredicate<A>,
): A[]
export function filter(
  array: ArrayLike<unknown>,
  predicate: IndexedPredicate<unknown>,
): unknown[] {
  const result: unknown[] = []
  for (let i = 0; i < array.length; i++) {
    const value = array[i]
    if (predicate(value, i)) {
      result.push(value)
    }
  }
  return result
}

/** `reduce` returns the result of the reducer function after it has been applied to all array items. */
export function reduce<A, R>(
  array: ArrayLike<A>,
  initial: R,
  reducer: (accumulator: R, value: A, index: number) => R,
): R {
  let result = initial
  for (let i = 0; i < array.length; i++) {
    result = reducer(result, array[i], i)
  }
  return result
}

/**
 * `find` returns the first value that matches the condition.
 *
 * Returns null if no item matches the condition.
 */
export function find<A>(
  array: ArrayLike<A>,
  predicate: IndexedPredicate<A>,
): A | undefined {
  for (let i = 0; i < array.length; i++) {
    const item = array[i]
    if (predicate(item, i)) {
      return item
    }
  }
  return undefined
}

// Comparison used by newer ES6 operations like Array.include
function sameValueZero(x: unknown, y: unknown): boolean {
  return (
    x === y ||
    // eslint-disable-next-line no-restricted-globals
    (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y))
  )
}

function findIndex<A>(
  array: ArrayLike<A>,
  predicate: IndexedPredicate<A>,
): number {
  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i], i)) {
      return i
    }
  }
  return -1
}

/** `includes` returns true if the item exists in the array. */
export function includes<A>(array: ArrayLike<A>, item: A): boolean {
  if (array.length === 0) {
    return false
  }
  return findIndex(array, value => sameValueZero(value, item)) > -1
}

/** `includes` returns an array with the items in reverse order */
export function reverse<A>(array: ArrayLike<A>): A[] {
  const result = new Array<A>(array.length)
  for (let i = 0; i < array.length; i++) {
    const target = array.length - i - 1
    result[target] = array[i]
  }
  return result
}

/**
 * `includes` creates a new array where items are numbers between `to` and `from`.
 *
 * If `to` is smaller than `from`, an empty array is returned.
 */
export function range(from: number, to: number): number[] {
  if (to < from) {
    return []
  }
  if (from === to) {
    return [from]
  }
  const result = new Array<number>(to - from)
  for (let i = 0; i < to; i++) {
    const n = from + i
    result[i] = n
  }
  return result
}

/**
 * `take` returns the first `n` items from the beginning of the array.
 *
 * If `n` is larger than the array's length, a full copy is returned.
 */
export function take<A>(array: ArrayLike<A>, n: number): A[] {
  const count = Math.min(array.length, n)
  const result = new Array<A>(count)
  for (let i = 0; i < count; ++i) {
    result[i] = array[i]
  }
  return result
}

/**
 * `drop` skips the first `n` items from the beginning of the array.
 *
 * If `n` is larger than the array's length, an empty array is returned.
 */
export function drop<A>(array: ArrayLike<A>, n: number): A[] {
  if (n > array.length) {
    return []
  }
  const result = new Array<A>(array.length - n)
  for (let i = 0; i < result.length; i++) {
    result[i] = array[n + i]
  }
  return result
}

/** `takeWhile` returns an array with all items in the array up until the predicate first returns false. */
export function takeWhile<A>(
  array: ArrayLike<A>,
  predicate: IndexedPredicate<A>,
): ArrayLike<A> {
  const lastIndex = findIndex(array, (value, index) => !predicate(value, index))
  if (lastIndex < 0) {
    return array
  }
  return take(array, lastIndex)
}

/** `dropWhile` returns an array with all the items after the point the predicate first returns false. */
export function dropWhile<A>(
  array: ArrayLike<A>,
  predicate: IndexedPredicate<A>,
): ArrayLike<A> {
  const lastIndex = findIndex(array, (value, index) => !predicate(value, index))
  if (lastIndex < 0) {
    return []
  }
  return drop(array, lastIndex)
}

/** `forEach` calls a function for all items in the array. */
export function forEach<A>(
  array: ArrayLike<A>,
  body: (item: A, index: number) => void,
): void {
  for (let i = 0; i < array.length; i++) {
    body(array[i], i)
  }
}
