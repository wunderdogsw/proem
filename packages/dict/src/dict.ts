
export const map = <A,B>(dict: A, mapfn: ([k, v] : [string, any]) => B): B[] => {
  const objectEntries = Object.entries(dict)
  const result = new Array<B>(objectEntries.length)
  for (let i = 0; i < objectEntries.length; i++) {
    result[i] = mapfn(objectEntries[i])
  }
  return result
}

map.partial = <A, B>(mapFn: ([k,v]: [string,any]) => B) => (dict: A): B[] =>
  map(dict, mapFn)

// export function filter<A, B extends A>(
//   dict: A[],
//   guard: (value: A) => value is B
// ): B[]
// export function filter<A>(dict: A[], predicate: (value: A) => boolean): A[]
// export function filter(dict: any[], predicate: (value: any) => boolean) {
//   const result: any[] = []
//   for (let i = 0; i < dict.length; i++) {
//     const value = dict[i]
//     if (predicate(value)) {
//       result.push(value)
//     }
//   }
//   return result
// }

// function filterPartial<A, B extends A>(
//   predicate: (value: A) => value is B
// ): (dict: A[]) => B[]
// function filterPartial<A>(predicate: (value: A) => boolean): (dict: A[]) => A[]
// function filterPartial(
//   predicate: (value: any) => boolean
// ): (dict: any[]) => any[] {
//   return (dict: any[]) => filter(dict, predicate)
// }

// filter.partial = filterPartial

// export const reduce = <A, R>(
//   dict: A[],
//   initial: R,
//   reducer: (acc: R, value: A) => R
// ) => {
//   let result = initial
//   for (let i = 0; i < dict.length; i++) {
//     result = reducer(result, dict[i])
//   }
//   return result
// }

// reduce.partial = <A, R>(reducer: (acc: R, value: A) => R) => (initial: R) => (
//   dict: A[]
// ) => reduce(dict, initial, reducer)
