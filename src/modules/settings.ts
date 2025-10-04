export const DEFAULT_APP_MODE = 'foo'

/**
 * Object containing the available application modes and their corresponding labels.
 */
export const APP_MODES = {
  'foo': 'foo',
} as const
	
export type AppMode = keyof typeof APP_MODES

/**
 * This is initial value for these settings
 * that are not stored in localStorage.
 * For these stored in localStorage, see `storage.ts`.
 */
export const settingsContextInitialValue = {
  appMode: '',
  setAppMode: (x: string)=> {
    console.log('setAppMode fallback', x)
  },
	setThemeMode: (x: string)=> {
		console.log('setThemeMode fallback', x)
	},
  themeMode: '',
}


export type Settings = typeof settingsContextInitialValue
