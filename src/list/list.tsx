import { useDebounceFn } from 'ahooks'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { fetchData } from '../modules/fetch-data'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../shared-components/table'

export function List() {
  const navigate = useNavigate()
  const [data, setData] = useState<AuctionItem[]>([])
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
    fetchData({ filter: '', searchText: e.target.value }).then(
      fetchedData=> {
        setData(fetchedData)
      },
    )
  }
  const { run: debouncedSearch } = useDebounceFn(
    (e: React.ChangeEvent<HTMLInputElement>)=> {
      handleSearchChange(e)
    },
    {
      wait: 500,
    },
  )

  return (
    <div className='flex flex-col h-screen'>
      <div className='flex items-center justify-center h-1/12'>
        <div className='w-4/12'>
          <input
            className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border border-gray-300 rounded-md p-2'
            onChange={debouncedSearch}
            type='text'
          />
        </div>
      </div>

      <div className='flex flex-col items-center justify-center h-9/12 p-12'>
        {data.length > 0 && (
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
            <TableBody className='overflow-y-scroll'>
              {data.map(item=> (
                <TableRow
                  className='cursor-pointer'
                  key={item.id}
                  onClick={()=> navigate(`/item/${item.id}`)}
                >
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
        )}
      </div>
    </div>
  )
}
