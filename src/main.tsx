import ReactDOM from 'react-dom/client'
import './styles/style.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { List } from './list'
import { SharedLayout } from './shared-layout'
import { Home } from './home'

export function MainApp() {
	return (
		<BrowserRouter>
		<Routes>
			<Route element={<SharedLayout />}>
				<Route
					element={
						<Home />
					}
					path='/'
				/>
				<Route
					element={<List />}
					path='/list'
				/>
			</Route>
		</Routes>
		</BrowserRouter>
	)
}

const rootEl = document.getElementById('root')
if (rootEl) {
  ReactDOM.createRoot(rootEl).render(<MainApp />)
} else {
  console.log('root element not found')
}
