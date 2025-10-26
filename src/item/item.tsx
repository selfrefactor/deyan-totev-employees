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
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-2xl font-bold'>{data.title}</h1>
    </div>
  )
}
