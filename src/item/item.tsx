import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { fetchItem } from '../modules/fetch-data'

export function Item() {
  const { id } = useParams()
  const [data, setData] = useState<AuctionItem | null>(null)

  useEffect(()=> {
    fetchItem(id!).then(setData)
  }, [id])

  if (!data) return null

  return (
    <div className='flex flex-col items-start ml-12 mt-12 h-screen'>
      <h1 className='text-2xl font-bold'>Title: {data.title}</h1>
      <p>Description: {data.description}</p>
      <p>Category: {data.category}</p>
      <p>Estimated Value: {data.estimatedValue}</p>
      <p>
        <div className='w-full'>
          <img
            alt={data.title}
            className='w-full h-full object-cover'
            src={data.imageUrl}
          />
        </div>
      </p>
      <p>Auction House: {data.auctionHouse}</p>
      <p>End Date: {dayjs(data.endDate).format('DD/MM/YYYY HH:mm')}</p>
      <p>Status: {data.status}</p>
    </div>
  )
}
