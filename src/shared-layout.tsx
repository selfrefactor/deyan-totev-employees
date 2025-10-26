import { Link, Outlet } from 'react-router-dom'

export function SharedLayout() {
  return (
    <div className='h-screen'>
      <div className='h-1/12'>
        <div className='flex justify-center items-center w-full h-full'>
          <nav>
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
      </div>
      <Outlet />
    </div>
  )
}
