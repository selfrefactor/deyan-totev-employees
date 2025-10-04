export const loadCSS = (href: string)=> {
  return new Promise<void>((resolve, reject)=> {
    const links = document.querySelectorAll('link')
    if (Array.from(links).some(x=> x.href === href)) {
      resolve()
      return
    }
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = href
    link.onload = ()=> {
      resolve()
    }
    link.onerror = ()=> reject(new Error(`Failed to load CSS: ${href}`))
    document.head.appendChild(link)
  })
}
