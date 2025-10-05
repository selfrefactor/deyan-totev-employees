import * as React from 'react'

const MOBILE_BREAKPOINT = 860

export function useIsPortrait() {
  const [isPortrait, setIsPortrait] = React.useState<boolean | undefined>(
    undefined,
  )

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsPortrait(window.innerWidth < window.innerHeight)
    }
    mql.addEventListener('change', onChange)
    setIsPortrait(window.innerWidth < window.innerHeight)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return !!isPortrait
}
