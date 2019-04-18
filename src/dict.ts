import { Guard, Reducer, BinaryFn } from './function'
import * as array from './array'

export interface Dictionary<A> {
  [key: string]: A
}

export function forEach<A>(
  dict: Dictionary<A>,
  body: (value: A, key: string) => void,
): void {
  array.forEach(Object.keys(dict), key => body(dict[key], key))
}

export function map<A, B>(
  dict: Dictionary<A>,
  mapfn: BinaryFn<string, A, B>,
): Dictionary<B> {
  const result: Dictionary<B> = {}
  forEach(dict, (value, key) => {
    result[key] = mapfn(key, value)
  })
  return result
}

export function filter<A, B extends A>(
  dict: Dictionary<A>,
  guard: Guard<A, B>,
): Dictionary<B>
export function filter<A>(
  dict: Dictionary<A>,
  predicate: (index: string, value: A) => boolean,
): Dictionary<A>
export function filter(
  dict: Dictionary<unknown>,
  predicate: (index: string, value: unknown) => boolean,
): Dictionary<unknown> {
  const result: Dictionary<unknown> = {}
  forEach(dict, (value, key) => {
    if (predicate(key, value)) {
      result[key] = value
    }
  })
  return result
}

export const reduce = <A, R>(
  dict: Dictionary<A>,
  initial: R,
  reducer: Reducer<[string, A], R>,
): R => {
  let result = initial
  forEach(dict, (value, key) => {
    const entry: [string, A] = [key, value]
    result = reducer(result, entry)
  })
  return result
}
