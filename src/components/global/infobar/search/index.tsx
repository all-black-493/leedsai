import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import React from 'react'

type Props = {

}

const Search = (props: Props) => {
  return (
    <div className="hidden lg:flex overflow-hidden gap-x-2 border border-[#1e875f] rounded-full px-4 py-1 items-center flex-1">
      <SearchIcon color='#00cf80' />
      <Input
        placeholder='Search by name, email or status'
        className='border-none outline-none ring-0 focus:ring-0 flex-1'
      />
    </div>
  )
}

export default Search

