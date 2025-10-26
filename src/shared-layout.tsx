import { Link, Outlet } from "react-router-dom"

export function SharedLayout() {
  return (
    <div className='flex flex-col h-screen'>
			<nav className='flex justify-center items-center w-1/2 h-1/12'>
				<ul className='flex gap-8'>
					<li>
						<Link to='/'>Home</Link>
					</li>
					<li>
						<Link to='/list'>List</Link>
					</li>
				</ul>
			</nav>
			<div className='flex justify-center items-center h-10/12 overflow-y-scroll'>
      <Outlet />
			</div>
    </div>
  )
}