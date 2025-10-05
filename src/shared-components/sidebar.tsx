export function SidebarComponent(props: {
  visible: boolean
  children: React.ReactNode
}) {
  if (!props.visible) return null
  return (
    <div className='sidebar bg-slate-200 dark:bg-zinc-500'>
      {props.children}
    </div>
  )
}
