import * as array from './array'

/** `Variant` represents an object that has a tag that can be used to discriminate it from other Variants. */
export interface Variant<Tag extends string> {
  type: Tag
}

/** `tags` returns the provided tags in an tuple. */
export function tags<Tags extends string[]>(...tagArgs: Tags): Tags {
  return tagArgs
}

/**
 * `oneOf` is a type guard that refines the union type to a more specific one.
 *
 * Returns true if the variant has one of the provided tags.
 */
export function oneOf<V extends Variant<string>, Tags extends V['type']>(
  variant: V,
  tagsArray: Tags[],
): variant is OneOf<V, Tags> {
  return array.includes(tagsArray, variant.type)
}

/**
 * `OneOf` refines the Variant type to include only the specified tags.
 */
export type OneOf<
  V extends Variant<string>,
  Tag extends string
> = V extends Variant<Tag> ? V : never

/**
 * `map` returns a function that transforms a Variant to a type.
 *
 * Requires that all cases are handled, or that a default case
 * is provided as a second argument.
 */
export function map<V extends Variant<string>, A>(
  cases: Cases<V, A>,
): (variant: V) => A
export function map<V extends Variant<string>, A>(
  cases: PartialCases<V, A>,
  or: (variant: V) => A,
): (variant: V) => A
export function map<V extends Variant<string>, A>(
  cases: PartialCases<V, A>,
  or?: (variant: V) => A,
): (variant: V) => A {
  return variant => {
    const caseFn = cases[variant.type as keyof Cases<V, A>]
    if (!caseFn) {
      if (!or) {
        throw Error(`No match case found for "${variant.type}"`)
      }
      return or(variant)
    }
    return caseFn(variant as OneOf<V, V['type']>)
  }
}

/** `CaseBody` transforms a specific Variant. */
export type CaseBody<V extends Variant<string>, A> = (adt: V) => A

/** `Cases` is an object that has a Variant transform for each possible Variant tag. */
export type Cases<V extends Variant<string>, A> = {
  [P in V['type']]: CaseBody<OneOf<V, P>, A>
}

/** `PartialCases` is an object that has a Variant transform for some of the possible Variant tags. */
export type PartialCases<V extends Variant<string>, A> = {
  [P in V['type']]?: CaseBody<OneOf<V, P>, A>
}

/**
 * `reducer` returns a reducer function that takes a state value as first
 * argument, and a Variant as a second argument.
 *
 * Returns the provided state if no case is found.
 *
 * Works well with React's useReducer hook.
 */
export function reducer<State, V extends Variant<string>>(
  caseReducers: CaseReducers<State, V>,
): Reducer<State, V> {
  return (state, variant) => {
    const arm = caseReducers[variant.type as keyof typeof caseReducers]
    if (!arm) {
      return state
    }
    return arm(state, variant as OneOf<V, V['type']>)
  }
}

/** `Reducer` is a reducer function specifically for Variants. */
export type Reducer<State, V extends Variant<string>> = (
  state: State,
  variant: V,
) => State

/** `CaseReducers` is an object that has a Variant reducer for each possible Variant tags. */
export type CaseReducers<State, V extends Variant<string>> = {
  [P in V['type']]: Reducer<State, OneOf<V, P>>
}
