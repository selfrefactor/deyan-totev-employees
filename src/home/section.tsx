import { useState } from 'react'

import { HOME } from '../constants'
import { Button } from '../shared-components/button'

export function HomeSection(props: { category: string; items: AuctionItem[] }) {
  const [showAllItems, setShowAllItems] = useState(false)

  return (
    <div
      className='flex flex-col items-center justify-center w-1/2 gap-4 border border-gray-300 rounded-md p-4'
      key={props.category}
    >
      <h2>{props.category}</h2>
      {(showAllItems
        ? props.items
        : props.items.slice(0, HOME.NUMBER_OF_ITEMS_TO_SHOW)
      ).map(item=> (
        <div key={item.id}>
          <h3>{item.title}</h3>
        </div>
      ))}
      {props.items.length > HOME.NUMBER_OF_ITEMS_TO_SHOW && (
        <Button onClick={()=> setShowAllItems(!showAllItems)}>
          {showAllItems ? 'Show Less' : 'Show More'}
        </Button>
      )}
    </div>
  )
}
