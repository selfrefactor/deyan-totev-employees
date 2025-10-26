import dayjs from 'dayjs'
import {
  convertToType,
  groupBy,
  mapObject,
  pipe,
  sort,
  sortObject,
} from 'rambda'
import { useEffect, useState } from 'react'

import { fetchData } from '../modules/fetch-data'
import { HomeSection } from './section'

export function Home() {
  const [data, setData] = useState<Record<string, AuctionItem[]>>({})
  useEffect(()=> {
    fetchData({ filter: '', searchText: '' }).then(fetchedData=> {
      const result = pipe(
        fetchedData,
        groupBy((x: AuctionItem)=> x.category),
        convertToType<Record<string, AuctionItem[]>>,
        sortObject((a, b, aValue, bValue)=> {
          return (bValue?.length ?? 0) - (aValue?.length ?? 0)
        }),
        mapObject(
          sort((a, b)=> {
            return dayjs(a.endDate).diff(dayjs(b.endDate))
          }),
        ),
      )
      setData(result)
    })
  }, [])

  return (
    <div className='flex h-10/12 w-full pl-12 pr-12 flex-wrap'>
      {Object.entries(data).map(([category, items])=> (
        <HomeSection category={category} items={items} key={category} />
      ))}
    </div>
  )
}
