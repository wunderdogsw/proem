import { Guard, Reducer, BinaryFn } from './function'

export interface Dictionary<A> {
  [key: string]: A
}

export function map<A, B>(
  dict: Dictionary<A>,
  mapfn: BinaryFn<string, A, B>,
): Dictionary<B> {
  const result: Dictionary<B> = {}
  for (const key in dict) {
    if (dict.hasOwnProperty(key)) {
      result[key] = mapfn(key, dict[key])
    }
  }
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
  dict: Dictionary<any>,
  predicate: (index: string, value: any) => boolean,
): Dictionary<any> {
  const result: Dictionary<any> = {}
  for (const key in dict) {
    if (dict.hasOwnProperty(key)) {
      if (predicate(key, dict[key])) {
        result[key] = dict[key]
      }
    }
  }
  return result
}

export const reduce = <A, R>(
  dict: Dictionary<A>,
  initial: R,
  reducer: Reducer<[string, A], R>,
) => {
  let result = initial
  for (const key in dict) {
    if (dict.hasOwnProperty(key)) {
      const entry: [string, A] = [key, dict[key]]
      result = reducer(result, entry)
    }
  }
  return result
}
