import { Predicate, Guard, Reducer, UnaryFn } from '@proem/function'


export function map<A, B>(array: A[], mapfn: (value: A, index?: number) => B): B[] {
  const result = new Array<B>(array.length)
  for (let i = 0; i < array.length; i++) {
    result[i] = mapfn(array[i], i)
  }
  return result
}

function mapPartial<A, B>( mapFn: (value: A, index?: number) => B ): (array: A[]) => B[] {
  return (array: A[]) => map(array, mapFn)
}

map.partial = mapPartial

export function filter<A, B extends A>(array: A[], guard: Guard<A, B>): B[]
export function filter<A>(array: A[], predicate: (value: A, index?: number) => boolean): A[]
export function filter(array: any[], predicate: (value: any, index?: number) => boolean) {
         const result: any[] = []
         for (let i = 0; i < array.length; i++) {
           const value = array[i]
           if (predicate(value, i)) {
             result.push(value)
           }
         }
         return result
       }

function filterPartial<A, B extends A>(guard: Guard<A, B>): (array: A[]) => B[]
function filterPartial<A>(predicate: (value: A, index?: number) => boolean): (array: A[]) => A[]
function filterPartial(predicate: (value: any, index?: number) => boolean): (array: any[]) => any[] {
  return (array: any[]) => filter(array, predicate)
}

filter.partial = filterPartial

export const reduce = <A, R>(
  array: A[],
  initial: R,
  reducer: (accumulator: R, value: A, index?: number) => R
) => {
  let result = initial
  for (let i = 0; i < array.length; i++) {
    result = reducer(result, array[i], i)
  }
  return result
}

reduce.partial = <A, R>(reducer: (accumulator: R, value: A, index?: number) => R) => (initial: R) => (
  array: A[]
) => reduce(array, initial, reducer)
