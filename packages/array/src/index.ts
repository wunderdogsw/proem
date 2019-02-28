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

function mapPartial<A, B>(mapFn: IndexedMap<A, B>): (array: A[]) => B[] {
  return (array: A[]) => map(array, mapFn)
}

map.partial = mapPartial

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

function filterPartial<A, B extends A>(
  guard: IndexedGuard<A, B>,
): (array: A[]) => B[]
function filterPartial<A>(predicate: IndexedPredicate<A>): (array: A[]) => A[]
function filterPartial(
  predicate: IndexedPredicate<any>,
): (array: any[]) => any[] {
  return (array: any[]) => filter(array, predicate)
}

filter.partial = filterPartial

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

reduce.partial = <A, R>(
  reducer: (accumulator: R, value: A, index: number) => R,
) => (initial: R) => (array: A[]) => reduce(array, initial, reducer)

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

find.partial = <A>(predicate: IndexedPredicate<A>) => (array: A[]) =>
  find(array, predicate)

// Comparison used by newer ES6 operations like Array.include
const sameValueZero = (x: unknown, y: unknown) =>
  x === y ||
  (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y))

export function includes<A>(array: ArrayLike<A>, item: A): boolean {
  if (array.length === 0) {
    return false
  }
  for (let i = 0; i < array.length; i++) {
    if (sameValueZero(array[i], item)) {
      return true
    }
  }
  return false
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

export function take<A>(array: A[], n: number): A[] {
  return array.slice(0, n)
}

export function drop<A>(array: A[], n: number): A[] {
  return array.slice(n, array.length)
}
