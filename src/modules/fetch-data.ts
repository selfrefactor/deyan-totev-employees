import { map, pipe, uniq } from 'rambda'

let dataHolder: AuctionItem[] = []
let initialized = false

interface SearchInput {
  category: string
  priceRange?: [number, number]
  searchText: string
}

const getData = async ()=> {
  if (initialized) return dataHolder
  const { default: importedData } = await import('../lots.json')
  initialized = true
  dataHolder = importedData as AuctionItem[]
  return dataHolder
}

export const getAllCategories = async ()=> {
  const data = await getData()
  return pipe(
    data,
    map((item: AuctionItem)=> item.category),
    uniq,
    map(category=> ({ key: category, label: category })),
  )
}

export const fetchData = async (input: SearchInput)=> {
  const data = await getData()
  if (input.category) {
    return data.filter(item=> item.category === input.category)
  }
  if (
    input.priceRange &&
    typeof input.priceRange[0] === 'number' &&
    typeof input.priceRange[1] === 'number'
  ) {
    const priceRange = input.priceRange as [number, number]
    return data.filter(
      item=>
        item.estimatedValue >= priceRange[0] &&
        item.estimatedValue <= priceRange[1],
    )
  }
  if (input.searchText) {
    return data.filter(item=>
      item.title.toLowerCase().includes(input.searchText.toLowerCase()),
    )
  }
  return data
}

export const fetchItem = async (id: string)=> {
  const data = await getData()
  const found = data.find(item=> item.id === parseInt(id))
  if (!found) throw new Error(`Item with id ${id} not found`)
  return found
}
