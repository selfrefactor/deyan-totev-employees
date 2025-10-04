import { useReducer } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { MainApp } from './component.tsx'
import { getTestData, SettingsContextProvider } from './constants.ts'
import {
  type Settings,
  settingsContextInitialValue,
} from './modules/settings.ts'
import { Storage } from './modules/storage.ts'
import './styles/style.css'
import { SharedLayout } from './shared-components/SharedLayout.tsx'

const initialAppMode = Storage.getAppMode()
const initialThemeMode = Storage.getColorTheme()

type Action =
  | { payload: number; type: 'setDatabaseLength' }
  | { payload: string; type: 'setSortingOrder' }
  | { payload: string; type: 'setThemeMode' }

const reducer = (state: Settings, action: Action): Settings=> {
  switch (action.type) {
    case 'setThemeMode':
      return { ...state, themeMode: action.payload }
    default:
      return state
  }
}

const initialSettings = {
  ...settingsContextInitialValue,
  appMode: initialAppMode,
  themeMode: initialThemeMode,
}

function WholeApp() {
  const [{ appMode, themeMode }, dispatcher] = useReducer(
    reducer,
    initialSettings as Settings,
  )
  const sidebarOpen = getTestData('sidebarOpen')

  const setAppMode = (x: string)=> {
    Storage.setAppMode(x)
    // dispatcher({ payload: x, type: 'setAppMode' })
  }

  const setThemeMode = (newThemeMode: string)=> {
    Storage.setColorTheme(newThemeMode)
    dispatcher({ payload: newThemeMode, type: 'setThemeMode' })
  }

  return (
    <SettingsContextProvider
      value={{
        ...settingsContextInitialValue,
        appMode,
        setAppMode,
        setThemeMode,
        themeMode,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route element={<SharedLayout sidebarOpen={sidebarOpen} />}>
            <Route element={<MainApp />} path='/' />
          </Route>
        </Routes>
      </BrowserRouter>
    </SettingsContextProvider>
  )
}

const rootEl = document.getElementById('root')
if (rootEl) {
  ReactDOM.createRoot(rootEl).render(<WholeApp />)
} else {
  console.log('root element not found')
}
