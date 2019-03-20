export type IndexedMap<A, B> = (value: A, index: number) => B

export type IndexedPredicate<A> = (value: A, index: number) => boolean

export type IndexedGuard<A, B extends A> = (
  value: A,
  index: number,
) => value is B

export function map<A, B>(array: A[], mapfn: IndexedMap<A, B>): B[] {
  const result = new Array<B>(array.length)
  for (let i = 0; i < array.length; i++) {
    result[i] = mapfn(array[i], i)
  }
  return result
}

export function filter<A, B extends A>(
  array: A[],
  guard: IndexedGuard<A, B>,
): B[]
export function filter<A>(array: A[], predicate: IndexedPredicate<A>): A[]
export function filter(array: any[], predicate: IndexedPredicate<any>) {
  const result: any[] = []
  for (let i = 0; i < array.length; i++) {
    const value = array[i]
    if (predicate(value, i)) {
      result.push(value)
    }
  }
  return result
}

export const reduce = <A, R>(
  array: A[],
  initial: R,
  reducer: (accumulator: R, value: A, index: number) => R,
) => {
  let result = initial
  for (let i = 0; i < array.length; i++) {
    result = reducer(result, array[i], i)
  }
  return result
}

export const find = <A>(
  array: A[],
  predicate: IndexedPredicate<A>,
): A | undefined => {
  for (let i = 0; i < array.length; i++) {
    const item = array[i]
    if (predicate(item, i)) {
      return item
    }
  }
  return undefined
}

// Comparison used by newer ES6 operations like Array.include
const sameValueZero = (x: unknown, y: unknown) =>
  x === y ||
  (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y))

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

export function includes<A>(array: ArrayLike<A>, item: A): boolean {
  if (array.length === 0) {
    return false
  }
  return findIndex(array, value => sameValueZero(value, item)) > -1
}

export function reverse<A>(array: A[]) {
  const result = new Array<A>(array.length)
  for (let i = 0; i < array.length; i++) {
    const target = array.length - i - 1
    result[target] = array[i]
  }
  return result
}

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

export function take<A>(array: ArrayLike<A>, n: number): A[] {
  const count = Math.min(array.length, n)
  const result = new Array<A>(count)
  for (let i = 0; i < count; ++i) {
    result[i] = array[i]
  }
  return result
}

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
