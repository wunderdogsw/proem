export const map = <A, B>(array: A[], mapfn: (a: A) => B): B[] => {
  const result = new Array<B>(array.length)
  for (let i = 0; i < array.length; i++) {
    result[i] = mapfn(array[i])
  }
  return result
}

map.partial = <A, B>(mapFn: (a: A) => B) => (array: A[]): B[] =>
  map(array, mapFn)

export function filter<A, B extends A>(
  array: A[],
  guard: (value: A) => value is B
): B[]
export function filter<A>(array: A[], predicate: (value: A) => boolean): A[]
export function filter(array: any[], predicate: (value: any) => boolean) {
  const result: any[] = []
  for (let i = 0; i < array.length; i++) {
    const value = array[i]
    if (predicate(value)) {
      result.push(value)
    }
  }
  return result
}

function filterPartial<A, B extends A>(
  predicate: (value: A) => value is B
): (array: A[]) => B[]
function filterPartial<A>(predicate: (value: A) => boolean): (array: A[]) => A[]
function filterPartial(
  predicate: (value: any) => boolean
): (array: any[]) => any[] {
  return (array: any[]) => filter(array, predicate)
}

filter.partial = filterPartial

export const reduce = <A, R>(
  array: A[],
  initial: R,
  reducer: (acc: R, value: A) => R
) => {
  let result = initial
  for (let i = 0; i < array.length; i++) {
    result = reducer(result, array[i])
  }
  return result
}

reduce.partial = <A, R>(reducer: (acc: R, value: A) => R) => (initial: R) => (
  array: A[]
) => reduce(array, initial, reducer)
