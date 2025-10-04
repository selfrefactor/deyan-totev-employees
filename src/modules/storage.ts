import { pascalCase } from 'string-fn'

import { DEFAULT_APP_MODE } from './settings'

const APP_MODE_KEY = 'app-mode'
const COLOR_THEME = 'color-theme'

type CreateGetter<T, K extends string> = Record<Getter<K>, () => T>

type CreateSetter<T, K extends string> = Record<Setter<K>, (x: T) => void>
type Getter<T extends string> = `get${PascalCase<T>}`

type PascalCase<Str extends string> = Str extends `${infer Start}-${infer End}`
  ? PascalCase<`${Capitalize<Start>}${Capitalize<End>}`>
  : Capitalize<Str>
type Setter<T extends string> = `set${PascalCase<T>}`

/**
 * Creates getter and setter functions for a given key in localStorage.
 */
function createSetterGetters<T, K extends string>(
  key: K,
  defaultValue: T,
  transform?: (value: string) => T,
) {
  return {
    [`get${pascalCase(key)}`](): T {
      const value = localStorage.getItem(key)
      if (value !== null) {
        return transform ? transform(value) : (value as unknown as T)
      }
      return defaultValue
    },
    [`set${pascalCase(key)}`](value: T) {
      localStorage.setItem(key, value as unknown as string)
    },
  } as CreateGetter<T, K> & CreateSetter<T, K>
}

export const Storage = {
  ...createSetterGetters(APP_MODE_KEY, DEFAULT_APP_MODE),
  ...createSetterGetters(COLOR_THEME, 'light'),
}
