import { useState } from 'react'
import { Link } from 'react-router-dom'

import { HOME } from '../constants'
import { Button } from '../shared-components/button'

export function HomeSection(props: { category: string; items: AuctionItem[] }) {
  const [showAllItems, setShowAllItems] = useState(false)

  return (
    <div
      className='flex flex-col items-center w-1/2 gap-4 border border-gray-300 rounded-md h-7/24 overflow-y-scroll'
      key={props.category}
    >
      <h2 className='text-2xl font-bold'>{props.category}</h2>
      {(showAllItems
        ? props.items
        : props.items.slice(0, HOME.NUMBER_OF_ITEMS_TO_SHOW)
      ).map(item=> (
        <div key={item.id}>
          <h3>
            <Link to={`/item/${item.id}`}>{item.title}</Link>
          </h3>
        </div>
      ))}
      {props.items.length > HOME.NUMBER_OF_ITEMS_TO_SHOW && (
        <Button className='mb-4' onClick={()=> setShowAllItems(!showAllItems)}>
          {showAllItems ? 'Show Less' : 'Show More'}
        </Button>
      )}
    </div>
  )
}
