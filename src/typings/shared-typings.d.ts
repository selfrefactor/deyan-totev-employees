type ErrorMode =
  | 'deprecated'
  | 'error' // soft error
  | 'not supported'
  | 'throw' // hard error
  | null
  | undefined

interface FnError {
  error: ErrorMode
  errorMessage?: string
}
interface FnResult<Output = unknown> {
  data: Output
}

type PromiseResult<Output = unknown> = Promise<Result<Output>>
type Result<Output = unknown> = FnError | FnResult<Output>


// declare module '@mozilla/readability' {
//   export class Readability {
//     constructor(doc: Document)
//     parse(): any
//   }
// }
