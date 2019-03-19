export interface Variant<Tag extends string> {
  type: Tag
}
export declare type VariantTags<V extends Variant<string>> = V extends Variant<
  infer Tags
>
  ? Tags
  : never
export declare function tags<Tags extends string[]>(...tags: Tags): Tags
export declare function oneOf<
  V extends Variant<string>,
  Tags extends V['type']
>(variant: V, tags: Tags[]): variant is OneOf<V, Tags>
export declare type OneOf<
  V extends Variant<string>,
  Tag extends string
> = V extends Variant<Tag> ? V : never
export declare function map<V extends Variant<string>, A>(
  cases: Cases<V, A>,
): (variant: V) => A
export declare function map<V extends Variant<string>, A>(
  cases: PartialCases<V, A>,
  or: (variant: V) => A,
): (variant: V) => A
export declare type CaseBody<V extends Variant<string>, A> = (adt: V) => A
export declare type Cases<V extends Variant<string>, A> = {
  [P in V['type']]: CaseBody<OneOf<V, P>, A>
}
export declare type PartialCases<V extends Variant<string>, A> = {
  [P in V['type']]?: CaseBody<OneOf<V, P>, A>
}
export declare function reducer<State, V extends Variant<string>>(
  caseReducers: CaseReducers<State, V>,
): Reducer<State, V>
export declare type Reducer<State, V extends Variant<string>> = (
  state: State,
  variant: V,
) => State
export declare type CaseReducers<State, V extends Variant<string>> = {
  [P in VariantTags<V>]: Reducer<State, OneOf<V, P>>
}
//# sourceMappingURL=index.d.ts.map
