import { Link, Outlet } from 'react-router-dom'

export function SharedLayout() {
  return (
    <div className='h-screen overflow-y-scroll'>
      <div className='sticky top-0 h-1/12 z-10 w-full bg-white'>
        <nav className='flex justify-center items-center w-1/2 h-full'>
          <ul className='flex gap-8'>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/list'>List</Link>
            </li>
          </ul>
        </nav>
      </div>
      <Outlet />
    </div>
  )
}
