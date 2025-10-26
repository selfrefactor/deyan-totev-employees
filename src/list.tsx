import ReactDOM from 'react-dom/client'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './shared-components/table'
import { useState } from 'react'
import { fetchData } from './fetch-data'
import { useDebounceFn } from 'ahooks';

export function List() {
	const [data, setData] = useState<AuctionItem[]>([])
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.value, 'searchText')
		fetchData({filter: '', searchText: e.target.value}).then(fetchedData => {
			setData(fetchedData)
		})
	}
	const { run: debouncedSearch } = useDebounceFn(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleSearchChange(e);
    },
    {
      wait: 500,
    },
  );

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='flex items-center justify-center h-1/5 w-1/2'>
        <input 
          type='text' 
          onChange={debouncedSearch}
          className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border border-gray-300 rounded-md p-2'
        />
      </div>
      
      <div className='flex flex-col items-center justify-center h-3/5 w-3/4'>
        <Table>
          <TableCaption>A list of auction items.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Estimated Value</TableHead>
              <TableHead>Image URL</TableHead>
              <TableHead>Auction House</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='overflow-y-scroll max-h-[500px] overflow-x-scroll'>
					{data.map((item) => (
						<TableRow key={item.id}>
							<TableCell>{item.title}</TableCell>
							<TableCell>{item.description}</TableCell>
							<TableCell>{item.category}</TableCell>
							<TableCell>{item.estimatedValue}</TableCell>
							<TableCell>{item.imageUrl}</TableCell>
							<TableCell>{item.auctionHouse}</TableCell>
							<TableCell>{item.endDate}</TableCell>
							<TableCell>{item.status}</TableCell>
						</TableRow>
					))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

