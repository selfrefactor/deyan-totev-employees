let data: AuctionItem[] = []
let initialized = false

interface SearchInput{
	filter: string
	searchText: string
}

export const fetchData = async (
	input: SearchInput
) => {
	if (initialized) return data
	const {default: importedData} = await import('./lots.json')
	initialized = true
	data = importedData as AuctionItem[]
	return data;
};