import { Guard, Reducer, BinaryFn } from '@proem/function';
export interface Dictionary<A> {
    [key: string]: A;
}
export declare function map<A, B>(dict: Dictionary<A>, mapfn: BinaryFn<string, A, B>): Dictionary<B>;
export declare function filter<A, B extends A>(dict: Dictionary<A>, guard: Guard<A, B>): Dictionary<B>;
export declare function filter<A>(dict: Dictionary<A>, predicate: (index: string, value: A) => boolean): Dictionary<A>;
export declare const reduce: <A, R>(dict: Dictionary<A>, initial: R, reducer: Reducer<[string, A], R>) => R;
//# sourceMappingURL=index.d.ts.map