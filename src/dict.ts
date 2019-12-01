import { Guard, Reducer, BinaryFn } from './fn'

/** `Dictionary` is a JavaScript object used as a key-value map. */
export interface Dictionary<A> {
  [key: string]: A
}

/** `forEach` calls a function for each key and value the Dictionary has. */
export function forEach<A>(
  dict: Dictionary<A>,
  body: (value: A, key: string) => void,
): void {
  const keys = Object.keys(dict)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    body(dict[key], key)
  }
}

/** `map` transforms a Dictionary into another with the same keys and values transformed by the function. */
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

/**
 * `filter` transforms the Dictionary by removing keys that don't match the condition.
 *
 * If the condition is a type guard, the values are also cast into the guarded type.
 */
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

/** `reduce` returns the result of the reducer function after it has been applied to all Dictionary keys and values. */
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
