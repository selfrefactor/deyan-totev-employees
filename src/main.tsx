import ReactDOM from 'react-dom/client'
import './styles/style.css'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './shared-components/table'
import { Employee, getTopCollaborationsBetweenTeamMembers, TopCollaborations } from './worker'
import { useState } from 'react'

let EXPECTED_HEADERS = ['EmpID', 'ProjectID', 'DateFrom', 'DateTo']

function fixData(data: Employee[]) : Employee[] {
	return data.map(item => ({
		...item,
		DateTo: item.DateTo === 'NULL' ? new Date().toISOString().split('T')[0] : item.DateTo,
	}))
}

const parseCSV = (csvText: string) => {
	const lines = csvText.split('\n').filter(line => line.trim() !== '')
	const headers = lines[0].split(',').map(header => header.trim())
	
	const data = lines.slice(1).map(line => {
		const values = line.split(',').map(value => value.trim())
		const row: Record<string, string> = {}
		headers.forEach((header, index) => {
			row[header] = values[index] || ''
		})
		return row
	})
	if(
		!EXPECTED_HEADERS.every(header => headers.includes(header))
	) {
		return { isDataCorrect: false, data: [] }
	}
	if(
		data.length === 0
	){
		return { isDataCorrect: true, data: [] }
	}

	return { isDataCorrect: true, data: fixData(data as unknown as Employee[]) }
}

export function MainApp() {
	const [data, setData] = useState<Employee[]>([])
	const [topCollaborations, setTopCollaborations] = useState<TopCollaborations[]>([])
	const [isDataCorrect, setIsDataCorrect] = useState<boolean | null>(null)
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file && file.type === 'text/csv') {
			const reader = new FileReader()
			reader.onload = (e) => {
				const csvText = e.target?.result as string
				const csvData = parseCSV(csvText)
				console.log('Parsed CSV data:', csvData, getTopCollaborationsBetweenTeamMembers(csvData.data))
				setData(csvData.data)
				setIsDataCorrect(csvData.isDataCorrect)
				setTopCollaborations(getTopCollaborationsBetweenTeamMembers(csvData.data))
			}
			reader.readAsText(file)
		} else if (file) {
			alert('Please select a CSV file')
		}
	}

  return (
    <div className='flex flex-col items-center justify-center h-screen gap-8'>
      <div className='flex flex-col items-center justify-center'>
        <input 
          type='file' 
          accept='.csv,text/csv' 
          onChange={handleFileChange}
          className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
        />
				{isDataCorrect === false && <p className='text-red-500'>Data is not correct</p>}
      </div>
      
      <div className='flex flex-col items-center justify-center'>
        {isDataCorrect && data.length === 0 && <p className='text-gray-500'>Initial imported data is empty</p>}
        {isDataCorrect && data.length > 0 && topCollaborations.length === 0 && <p className='text-gray-500'>No overlapping days found</p>}
        {isDataCorrect && topCollaborations.length > 0 && <Table>
          <TableCaption>A list of employees with the most overlapping days.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Employee ID #1</TableHead>
              <TableHead>Employee ID #2</TableHead>
              <TableHead>Project ID</TableHead>
              <TableHead>Days worked</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
					{topCollaborations.map((item) => (
						<TableRow key={item.data.EmpIDs[0]}>
							<TableCell>{item.data.EmpIDs[0]}</TableCell>
							<TableCell>{item.data.EmpIDs[1]}</TableCell>
							<TableCell>{item.name}</TableCell>
							<TableCell>{item.data.numberOfDays}</TableCell>
						</TableRow>
					))}
          </TableBody>
        </Table>}
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
