import * as array from './array'

export interface Variant<Tag extends string> {
  type: Tag
}

export type VariantTags<V extends Variant<string>> = V extends Variant<
  infer Tags
>
  ? Tags
  : never

/**
 * Returns the provided tags in an tuple.
 */
export function tags<Tags extends string[]>(...tagArgs: Tags): Tags {
  return tagArgs
}

/**
 * Type guard that refine the union type to a more specific one.
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
 * Refine the Variant type to include only the specified tags.
 */
export type OneOf<
  V extends Variant<string>,
  Tag extends string
> = V extends Variant<Tag> ? V : never

/**
 * Create a matcher that maps a Variant to a type.
 *
 * Requires that all cases are handled, or that a default case
 * is provided as a second argument.
 *
 * @param cases
 * @param or default case
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

export type CaseBody<V extends Variant<string>, A> = (adt: V) => A

export type Cases<V extends Variant<string>, A> = {
  [P in V['type']]: CaseBody<OneOf<V, P>, A>
}

export type PartialCases<V extends Variant<string>, A> = {
  [P in V['type']]?: CaseBody<OneOf<V, P>, A>
}

/**
 * Create a reducer function that takes a state value as first
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
    return arm(state, variant as OneOf<V, VariantTags<V>>)
  }
}

export type Reducer<State, V extends Variant<string>> = (
  state: State,
  variant: V,
) => State

export type CaseReducers<State, V extends Variant<string>> = {
  [P in VariantTags<V>]: Reducer<State, OneOf<V, P>>
}
