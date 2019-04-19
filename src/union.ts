/** `mapLiteral` transforms a literal type value by calling a case function that matches the value. */
export function mapLiteral<Union extends string | number, Result>(
  label: Union,
  cases: { [Label in Union]: (label: Label) => Result },
): Result {
  return cases[label](label)
}
