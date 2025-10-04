import { createContext, useContext } from 'react'

import type { settingsContextInitialValue } from './modules/settings'

export const IS_PROD = import.meta.env.PROD
export const OFF = 'OFF'
export const ON = 'ON'

interface TestData {
  database?: string[]
  sidebarOpen?: boolean
}
const TEST_DATA_ALL: Record<string, TestData> = {
  happy: {
    database: [
      'Aber die meisten Menschen denken nur alle zehn Jahre einen neuen Gedanken.',
      'Wer den Tag mit einem Lachen beginnt, hat ihn bereits gewonnen.',
    ],
  },
  'long sentence': {
    database: [
      // "Die Sonne war weitergerückt, und die unzähligen Fenster des WahrheitsMinisteriums, auf die ihre Strahlen nicht mehr fielen, sahen grimmig wie die Schießscharten einer Festung aus.",
      'Er würde sie mit einem Gummiknüppel zu Tode prügeln, sie nackt an einen Pfahl binden und sie mit Pfeilen durchlöchern, gleich dem heiligen Sebastian.',
      'Das Wahrheitsministerium enthielt, so erzählte man sich, in seinem pyramidenartigen Bau dreitausend Räume und eine entsprechende Zahl unter der Erde.',
    ],
  },
  'long sentence with tranlation': {
    database: [
      'Er saß mucksmäuschenstill da, in der vergeblichen Hoffnung, der Draussenstehende könnte nach einem einmaligen Versuch weggehen.',
      'Alles sah hier abgestoßen und niedergetrampelt aus, so als seien die Räume eben von einem großen wilden Tier heimgesucht worden.',
    ],
  },
  'short sentence': {
    database: [
      '"Gruppe der Dreißig- bis Vierzigjährigen!", Aber was schadet das?',
      'Er schloss die Augen.',
    ],
  },
  'short sentences mixed with with/no question': {
    database: [
      'Er ergriff ihre Hand.',
      'Und wozu war das gut?',
      'Schlagzeile darunter.',
      'Die Tür öffnete sich.',
      'Es gab keinen Beweis.',
      'Offensive losbrechen.',
    ],
  },
  'short sentences with no question': {
    database: [
      'Schlagzeile darunter.',
      'Es gab keinen Beweis.',
      'Offensive losbrechen.',
    ],
  },
  'short sentences with one question': {
    database: [
      'Er ergriff ihre Hand.',
      'Und wozu war das gut?',
      'Die Tür öffnete sich.',
    ],
  },
  'sidebar open': {
    sidebarOpen: true,
  },
  umlaut: {
    database: [
      'Sei du selbst die Veränderung, die du dir für die Welt wünschst.',
    ],
  },
}

const TEST_DATA = TEST_DATA_ALL[import.meta.env.VITE_TEST_DATA_MODE]

export const getTestData = <K extends keyof TestData>(key: K)=> {
  if (!TEST_DATA) return null
  const value = TEST_DATA[key]
  if (!value) return null

  return value
}

export type SettingsContextType = typeof settingsContextInitialValue
export const settingsContext = createContext<null | SettingsContextType>(null)

export const SettingsContextProvider = settingsContext.Provider

export function useSettings() {
  return useContext(settingsContext) as SettingsContextType
}
