import { Guard, Reducer, BinaryFn } from '@proem/function';
export interface Dictionary<A> {
    [key: string]: A;
}
export declare function map<A, B>(dict: Dictionary<A>, mapfn: BinaryFn<string, A, B>): Dictionary<B>;
export declare namespace map {
    var partial: <A, B>(mapFn: BinaryFn<string, A, B>) => (dict: Dictionary<A>) => Dictionary<B>;
}
export declare function filter<A, B extends A>(dict: Dictionary<A>, guard: Guard<A, B>): Dictionary<B>;
export declare namespace filter {
    var partial: typeof filterPartial;
}
export declare function filter<A>(dict: Dictionary<A>, predicate: (index: string, value: A) => boolean): Dictionary<A>;
export declare namespace filter {
    var partial: typeof filterPartial;
}
declare function filterPartial<A, B extends A>(guard: Guard<A, B>): (dict: Dictionary<A>) => Dictionary<B>;
declare function filterPartial<A>(predicate: (index: string, value: A) => boolean): (dict: Dictionary<A>) => Dictionary<A>;
export declare const reduce: {
    <A, R>(dict: Dictionary<A>, initial: R, reducer: Reducer<[string, A], R>): R;
    partial<A, R>(reducer: Reducer<[string, A], R>): (initial: R) => (dict: Dictionary<A>) => R;
};
export {};
//# sourceMappingURL=index.d.ts.map