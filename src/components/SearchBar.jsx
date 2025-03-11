import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';


const SearchBar = () => {
  
  const {search, setSearch, showSearch, setShowSearch} = useContext(ShopContext);
  
  
    return showSearch ? (
    <div className='border-t border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700 text-center'>
      <div className='inline-flex items-center justify-center border border-gray-400 dark:border-gray-600 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
        <input value={search} onChange={(e)=>setSearch(e.target.value)} className='flex-1 outline-none bg-inherit text-sm dark:text-gray-200' type="text" placeholder='Search' />
        <img className='w-4 dark:invert' src={assets.search_icon} alt="" />
      </div>
      <img onClick={()=>setShowSearch(false)} className='inline w-4 cursor-pointer dark:invert' src={assets.cross_icon} alt="" />
    </div>
  ) : null
}

export default SearchBar
