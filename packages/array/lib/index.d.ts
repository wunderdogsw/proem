export declare type IndexedMap<A, B> = (value: A, index: number) => B;
export declare type IndexedPredicate<A> = (value: A, index: number) => boolean;
export declare type IndexedGuard<A, B extends A> = (value: A, index: number) => value is B;
export declare function map<A, B>(array: A[], mapfn: IndexedMap<A, B>): B[];
export declare function filter<A, B extends A>(array: A[], guard: IndexedGuard<A, B>): B[];
export declare function filter<A>(array: A[], predicate: IndexedPredicate<A>): A[];
export declare const reduce: <A, R>(array: A[], initial: R, reducer: (accumulator: R, value: A, index: number) => R) => R;
export declare const find: <A>(array: A[], predicate: IndexedPredicate<A>) => A | undefined;
export declare function includes<A>(array: ArrayLike<A>, item: A): boolean;
export declare function reverse<A>(array: A[]): A[];
export declare function range(from: number, to: number): number[];
export declare function take<A>(array: ArrayLike<A>, n: number): A[];
export declare function drop<A>(array: ArrayLike<A>, n: number): A[];
export declare function takeWhile<A>(array: ArrayLike<A>, predicate: IndexedPredicate<A>): ArrayLike<A>;
export declare function dropWhile<A>(array: ArrayLike<A>, predicate: IndexedPredicate<A>): ArrayLike<A>;
//# sourceMappingURL=index.d.ts.map