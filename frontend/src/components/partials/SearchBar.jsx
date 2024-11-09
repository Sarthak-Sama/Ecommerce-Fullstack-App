import { RiSearchLine } from '@remixicon/react'
import React from 'react'

function SearchBar() {
  return (
    <div className='px-3 py-[0.45rem] flex items-center gap-2 bg-[#F4F5F4] rounded-full w-[10rem]'>
        <span>
        <RiSearchLine size={18}/>
        </span>
        <input 
            type="text" 
            placeholder="Search" 
            className='text-[0.9rem] font-["SourceSans"] bg-transparent border-none outline-none' 
        />
    </div>
  )
}

export default SearchBar