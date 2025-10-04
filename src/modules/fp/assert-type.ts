export function assertType<T>(input: Partial<T>): T {
  return input as T
}
