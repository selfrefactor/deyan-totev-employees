let dataHolder: AuctionItem[] = []
let initialized = false

interface SearchInput {
  filter: string
  searchText: string
}

const getData = async ()=> {
  if (initialized) return dataHolder
  const { default: importedData } = await import('../lots.json')
  initialized = true
  dataHolder = importedData as AuctionItem[]
  return dataHolder
}

export const fetchData = async (input: SearchInput)=> {
  const data = await getData()

  return data
}

export const fetchItem = async (id: string)=> {
  const data = await getData()
  const found = data.find(item=> item.id === parseInt(id))
  if (!found) throw new Error(`Item with id ${id} not found`)
  return found
}
