import { useEffect, useState } from "react"
import { fetchData } from "./fetch-data"
import { assertType, convertToType, groupBy, mapObject, pipe, sort, sortObject } from "rambda"
import { head } from "rambda"

export function Home() {
	const [data, setData] = useState<Record<string, AuctionItem[]>>({})
	useEffect(() => {
		fetchData({filter: '', searchText: ''}).then(fetchedData => {
			const result = pipe(
				fetchedData,
				groupBy((x: AuctionItem) => x.category),
				// mapObject((items) => items.length),
				// mapObject(head),
				// x => Object.values(x),
				convertToType<Record<string, AuctionItem[]>>,
				sortObject((a, b, aValue, bValue) => {
					return (bValue?.length ?? 0) - (aValue?.length ?? 0)
				}),
			)
			setData(result)
			console.log(result)
		})
	}, [])
	return (
		<div className='flex flex-col items-center justify-center h-screen'>
			<div className='flex flex-col items-center justify-center h-1/5 w-1/2'>
				{Object.entries(data).map(([category, items]) => (
					<div key={category}>
						<h2>{category}</h2>
						<p>{items.length} items</p>	
					</div>
					))}
				</div>
			</div>
	)
}