import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import { useSettings } from '../constants'
import {
  APP_MODES,
} from '../modules/settings'
import '../styles/shared-layout.css'
import { DarkTheme } from './DarkTheme'
import { LightTheme } from './LightTheme'

const iconStyling = {
  fontSize: '1.5rem',
}

function selectionFactory<T extends Record<string, string>>(EnumObject: T) {
  return (setValue: (x: string) => void)=> { 
    return Object.keys(EnumObject).map(key=> {
      return {
        command: ()=> {
          setValue(key)
        },
        label: EnumObject[key],
      }
    })
  }
}

const getAppModeSelections = selectionFactory(APP_MODES)

export function SidebarContent(input: { hideSidebar: () => void }) {
  const {
    appMode,
    setAppMode,
    themeMode,
		setThemeMode
  } = useSettings()
  const onChangeThemeMode = ()=> {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light')
  }
  const appModeSelections = getAppModeSelections(setAppMode)

  return (
    <div className='sidebar__container'>
      {/* <div className='settings__change-theme'>
        <ToggleButton
          checked={themeMode === 'light'}
          offLabel='dark'
          onChange={onChangeThemeMode}
          onLabel='light'
        />
      </div>
      <div className='flex settings__change-app-mode'>
        <SplitButton
          icon='pi pi-plu'
          label={APP_MODES[appMode] ?? 'App Mode'}
          model={appModeSelections}
          outlined
          raised
          text
        />
        <div className='select-label'>
          <span>Select Book</span>
        </div>
      </div> */}
    </div>
  )
}

export function SharedLayout(input: { sidebarOpen?: boolean | null }) {
  const [visible, setVisible] = useState(input.sidebarOpen ?? false)
  const { themeMode } = useSettings()
  const onIconClick = ()=> {
    setVisible(true)
  }
  const hideSidebar = ()=> {
    setVisible(false)
  }
  return (
    <>
      {themeMode === 'dark' ? <DarkTheme /> : <LightTheme />}
      <div className='layout__outer' data-testid='shared'>
        <Outlet />
        {/* <Sidebar
          className='sidebar'
          onHide={()=> setVisible(false)}
          visible={visible}
        >
          <SidebarContent hideSidebar={hideSidebar} />
        </Sidebar> */}

        <div className='settings' onClick={onIconClick} onKeyDown={onIconClick}>
          <i className='pi pi-cog clickable' style={iconStyling} />
        </div>
      </div>
    </>
  )
}
