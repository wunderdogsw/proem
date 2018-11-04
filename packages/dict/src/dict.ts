import { Predicate, Guard, Reducer, UnaryFn } from '@proem/function'

export interface Dictionary {
  [key:string]: any
}

export const map = <A extends Dictionary, B>(dict: A, mapfn: ([k, v]: [string, any]) => B): B[] => {
         const dictEntries = Object.entries(dict)
         const result = new Array<B>(dictEntries.length)
         for (let i = 0; i < dictEntries.length; i++) {
           result[i] = mapfn(dictEntries[i])
         }
         return result
       }

map.partial = <A, B>(mapFn: UnaryFn<[string, any], B>) => (dict: A): B[] => map(dict, mapFn)


export function filter<A extends Dictionary, B extends Dictionary>(dict: A, predicate: Predicate<[string, any]>): B {
         const result: B = <B>{}
         const dictEntries = Object.entries(dict)
         dictEntries.forEach(entry => {
           if (predicate(entry)) {
             result[entry[0]] = entry[1]
           }
         })
         return result
       }

function filterPartial<A extends Dictionary>(predicate: Predicate<[string, any]>): (dict: A) => A
function filterPartial(
  predicate: Predicate<[string,any]>
): (dict: Dictionary) => Dictionary {
  return (dict: Dictionary) => filter(dict, predicate)
}

filter.partial = filterPartial

export const reduce = <A extends Dictionary, R>(
  dict: A,
  initial: R,
  reducer: Reducer<[string, any], R>
) => {
  let result = initial
  const dictEntries = Object.entries(dict)
  dictEntries.forEach(entry => {
    result = reducer(result, entry)
  })
  return result
}

reduce.partial = <A, R>(reducer: Reducer<[string, any], R>) => (initial: R) => (
  dict: A[]
) => reduce(dict, initial, reducer)
