/** `ReadonlyObject` is a JavaScript object with readonly keys. */
export interface ReadonlyObject {
  readonly [key: string]: unknown
}

/** `MapField` transforms an object field using the field key and value. */
export type MapField<A, B> = (field: A[keyof A], key: keyof A) => B

/** `KeyePredicate` checks the key and value of an object field */
export type KeyPredicate<A extends ReadonlyObject> = (
  field: A[keyof A],
  key: keyof A,
) => boolean

/** `KeyeGuard` is a type guard for object fields.  */
export type KeyGuard<A extends ReadonlyObject, B extends A[keyof A]> = (
  field: A[keyof A],
  key: keyof A,
) => field is B

/**
 * `keys` returns an array with the enumerable property names of the object.
 *
 * Numeric keys are actually strings, even though the type is a literal number.
 *
 * @throws {Error} if value is not a plain object
 */
export function keys<A extends object>(value: A): Array<keyof A> {
  if (value.constructor !== Object) {
    throw Error('object.keys argument must be a plain object')
  }
  return Object.keys(value) as Array<keyof A>
}

/** `map` transforms the values of an object using the function. */
export function map<A extends object, B>(
  value: A,
  mapField: MapField<A, B>,
): { [P in keyof A]: B } {
  const obj: { [P in keyof A]?: B } = {}
  const objKeys = keys(value)
  for (let i = 0; i < objKeys.length; i++) {
    const key = objKeys[i]
    obj[key] = mapField(value[key], key)
  }
  return obj as { [P in keyof A]: B }
}

/** `KeysOfType` picks keys from object `A` whose values extends `B` */
export type KeysOfType<A, B> = {
  [P in keyof A]: A[P] extends B ? P : never
}[keyof A]

/**
 * `filter` returns an object with fields that match the condition.
 *
 * If condition is a type guard, the values are cast into the guarded type.
 * The type guard must return true for all values of type `B`.
 */
export function filter<A extends ReadonlyObject, B extends A[keyof A]>(
  value: A,
  guard: KeyGuard<A, B>,
): { [P in KeysOfType<A, B>]: B }
export function filter<A extends ReadonlyObject, B>(
  value: A,
  guard: (field: unknown, key: keyof A) => field is B,
): { [P in KeysOfType<A, B>]: B }
export function filter<A extends ReadonlyObject>(
  value: A,
  predicate: KeyPredicate<A>,
): Partial<A>
export function filter<A extends ReadonlyObject>(
  value: A,
  predicate: KeyPredicate<A>,
): Partial<A> {
  const obj: { [P in keyof A]?: A[P] } = {}
  const objKeys = keys(value)
  for (let i = 0; i < objKeys.length; i++) {
    const key = objKeys[i]
    if (predicate(value[key], key)) {
      obj[key] = value[key]
    }
  }
  return obj
}
