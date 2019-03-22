export declare type IndexedMap<A, B> = (value: A, index: number) => B;
export declare type IndexedPredicate<A> = (value: A, index: number) => boolean;
export declare type IndexedGuard<A, B extends A> = (value: A, index: number) => value is B;
export declare function generate<A>(createItem: (index: number) => A, length: number): A[];
export declare function fill<A>(value: A, length: number): A[];
export declare function map<A, B>(array: ArrayLike<A>, mapfn: IndexedMap<A, B>): B[];
export declare function flatMap<A, B>(array: ArrayLike<A>, mapFn: IndexedMap<A, ArrayLike<B>>): B[];
export declare function filter<A, B extends A>(array: ArrayLike<A>, guard: IndexedGuard<A, B>): B[];
export declare function filter<A>(array: ArrayLike<A>, predicate: IndexedPredicate<A>): A[];
export declare function reduce<A, R>(array: ArrayLike<A>, initial: R, reducer: (accumulator: R, value: A, index: number) => R): R;
export declare function find<A>(array: ArrayLike<A>, predicate: IndexedPredicate<A>): A | undefined;
export declare function includes<A>(array: ArrayLike<A>, item: A): boolean;
export declare function reverse<A>(array: ArrayLike<A>): A[];
export declare function range(from: number, to: number): number[];
export declare function take<A>(array: ArrayLike<A>, n: number): A[];
export declare function drop<A>(array: ArrayLike<A>, n: number): A[];
export declare function takeWhile<A>(array: ArrayLike<A>, predicate: IndexedPredicate<A>): ArrayLike<A>;
export declare function dropWhile<A>(array: ArrayLike<A>, predicate: IndexedPredicate<A>): ArrayLike<A>;
//# sourceMappingURL=index.d.ts.map