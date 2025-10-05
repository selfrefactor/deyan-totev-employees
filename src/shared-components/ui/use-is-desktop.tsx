const MOBILE_BREAKPOINT = 860

export function useIsDesktop() {
  return window.innerWidth >= MOBILE_BREAKPOINT
}
