import { useEffect, useRef } from 'react'

import { loadCSS } from './loadCss'

export function LightTheme() {
  const init = useRef(false)
  useEffect(()=> {
    if (init.current) return
    const loadData = async ()=> {
      await loadCSS('/light-theme.css')
      init.current = true
    }

    loadData()
  }, [])

  return null
}
