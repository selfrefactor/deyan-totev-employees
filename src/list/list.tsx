import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../shared-components/table'
import { SearchInputs } from './search-inputs'

export function List() {
  const navigate = useNavigate()
  const [data, setData] = useState<AuctionItem[]>([])

  return (
    <div className='flex flex-col h-screen'>
      <div className='flex items-center justify-center h-1/12'>
        <div className='w-9/12'>
          <SearchInputs setData={setData} />
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
