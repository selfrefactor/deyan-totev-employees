import '@testing-library/jest-dom'
import * as matchers from '@testing-library/jest-dom/matchers'
import { cleanup } from '@testing-library/react'
import { afterEach, expect, test } from 'vitest'

globalThis.expect = expect
globalThis.test = test

/**
 * due to bug
 */
const originalConsoleError = console.error
const jsDomCssError = 'Error: Could not parse CSS stylesheet'
console.error = (...params)=> {
  if (!params.find(p=> p.toString().includes(jsDomCssError))) {
    originalConsoleError(...params)
  }
}
expect.extend(matchers)

afterEach(()=> {
  cleanup()
})
