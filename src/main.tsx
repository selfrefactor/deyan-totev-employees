import ReactDOM from 'react-dom/client'
import './styles/style.css'
import { Badge } from './shared-components/badge'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './shared-components/table'
import { ToggleButton } from './shared-components/toggle-button'

export function MainApp() {
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			const reader = new FileReader()
			reader.onload = (e) => {
				const text = e.target?.result as string
				console.log(text,2)
			}
			reader.readAsText(file)
		}
	}
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      
			<div className='flex flex-col items-center justify-center h-screen'>
				<input type='file' onChange={handleFileChange} />
			</div>
			
			<div className='flex flex-col items-center justify-center h-screen'>
				<Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className='text-right'>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className='font-medium'>INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className='text-right'>$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
    </div>
  )
}

const rootEl = document.getElementById('root')
if (rootEl) {
  ReactDOM.createRoot(rootEl).render(<MainApp />)
} else {
  console.log('root element not found')
}
