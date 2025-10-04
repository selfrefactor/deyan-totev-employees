import { useEffect } from 'react'

import { loadCSS } from './loadCss'

export function DarkTheme() {
  useEffect(()=> {
    const loadData = async ()=> {
      await loadCSS('/dark-theme.css')
    }

    loadData()
  }, [])

  return null
}
