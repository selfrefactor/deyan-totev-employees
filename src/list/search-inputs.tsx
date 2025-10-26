import { useDebounceFn } from 'ahooks'
import { useEffect, useRef, useState } from 'react'

import { fetchData, getAllCategories } from '../modules/fetch-data'
import { Select } from '../shared-components/select'
import { Input } from '../shared-components/ui/input'

export function SearchInputs(props: {
  setData: (data: AuctionItem[]) => void
}) {
  const category = useRef<string>('')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0])
  const [categoryOptions, setCategoryOptions] = useState<
    { key: string; label: string }[]
  >([])
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
    fetchData({ category: '', searchText: e.target.value }).then(
      fetchedData=> {
        props.setData(fetchedData)
        props.setData(fetchedData)
      },
    )
  }
  const handleFilterChange = (category: string)=> {
    fetchData({ category, searchText: '' }).then(fetchedData=> {
      props.setData(fetchedData)
    })
  }
  const handlePriceRangeChange = (priceRange: [number, number])=> {
    fetchData({ category: '', priceRange, searchText: '' }).then(
      fetchedData=> {
        props.setData(fetchedData)
      },
    )
  }
  const handlePriceInputChange =
    (index: 0 | 1)=> (e: React.ChangeEvent<HTMLInputElement>)=> {
      const newValue =
        index === 0
          ? [parseInt(e.target.value) as number, priceRange[1]]
          : [priceRange[0], parseInt(e.target.value) as number]
      setPriceRange(newValue as [number, number])
      if (newValue[1] && newValue[0] < newValue[1])
        debouncedPriceRangeChange(newValue as [number, number])
    }
  const { run: debouncedSearch } = useDebounceFn(
    (e: React.ChangeEvent<HTMLInputElement>)=> {
      handleSearchChange(e)
    },
    {
      wait: 500,
    },
  )
  const { run: debouncedPriceRangeChange } = useDebounceFn(
    (priceRange: [number, number])=> {
      handlePriceRangeChange(priceRange)
    },
    {
      wait: 1000,
    },
  )

  useEffect(()=> {
    getAllCategories().then(categories=> {
      setCategoryOptions(categories)
    })
  }, [])

  return (
    <div className='flex gap-12'>
      <input
        className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border border-gray-300 rounded-md p-2'
        onChange={debouncedSearch}
        placeholder='Search by title'
        type='text'
      />
      <Select
        className='mt-1 mb-1'
        initialValue={category.current}
        label={''}
        onChange={handleFilterChange}
        options={categoryOptions}
      />
      <Input
        className='w-1/4'
        max={1000000}
        min={0}
        onChange={handlePriceInputChange(0)}
        placeholder='Min Price'
        step={1000}
        type='number'
        value={priceRange[0]}
      />
      <Input
        className='w-3/12'
        max={1000000}
        min={0}
        onChange={handlePriceInputChange(1)}
        placeholder='Max Price'
        step={1000}
        type='number'
        value={priceRange[1]}
      />
    </div>
  )
}
