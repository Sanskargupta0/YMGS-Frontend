import  { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import ThemeSwitcher from './ThemeSwitcher';


const NavBar = () => {
    const [visible, setVisible] = useState(false);
    const {setShowSearch, getCartAmount, navigate, token, setToken, setCartItems} = useContext(ShopContext);
    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }

    return (
    <div className='flex items-center justify-between py-5 font-medium bg-white dark:bg-gray-800 transition-colors'>
       <Link to="/" className="font-display text-2xl text-primary dark:text-yellow-400">
  <div className="flex items-center gap-2">
    <span className="text-lg sm:text-2xl">YMGS Pharmacy</span>
    <img 
      src={assets.logo} 
      alt="YMGS Pharmacy Logo" 
      className="h-auto w-auto max-w-[30px] max-h-[30px] sm:max-w-[40px] sm:max-h-[40px]" 
    />
  </div>
</Link>

      <ul className='hidden sm:flex gap-5 text-sm text-gray-700 dark:text-gray-200'>
        <NavLink to='/' className='flex flex-col items-center gap-1 hover:text-primary dark:hover:text-yellow-400'>
            <p>HOME</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 dark:bg-gray-300 hidden'/>
        </NavLink>

        <NavLink to='/collection' className='flex flex-col items-center gap-1 hover:text-primary dark:hover:text-yellow-400'>
            <p>PRODUCTS</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 dark:bg-gray-300 hidden'/>
        </NavLink>

        <NavLink to='/orders' className='flex flex-col items-center gap-1 hover:text-primary dark:hover:text-yellow-400'>
            <p>ORDER</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 dark:bg-gray-300 hidden'/>
        </NavLink>

        <NavLink to='/contact' className='flex flex-col items-center gap-1 hover:text-primary dark:hover:text-yellow-400'>
            <p>CONTACT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 dark:bg-gray-300 hidden'/>
        </NavLink>
      </ul>

      <div className='flex items-center gap-6 text-gray-700 dark:text-gray-200'>
        <ThemeSwitcher/>
        <img onClick={()=>{setShowSearch(true); navigate('/collection')}} src={assets.search_icon} className='w-5 cursor-pointer dark:invert' />
        <div className='group relative'>
            <img onClick={()=> token ? null : navigate('/login')} src={assets.profile_icon} className='w-5 cursor-pointer dark:invert'/>
            {/*Drop down menu*/}
            {token && 
            <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 rounded shadow-lg'>
                    <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black dark:hover:text-white'>Orders</p>
                    <p onClick={logout} className='cursor-pointer hover:text-black dark:hover:text-white'>Log-Out</p>
                </div>
            </div>}
        </div>
        <Link to='/cart' className='relative'>
            <img src={assets.cart_icon} className='w-5 min-w-5 dark:invert' alt="" />
            <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black dark:bg-white text-white dark:text-black aspect-square rounded-full text-[8px]'>
                {getCartAmount()}
            </p>
        </Link>
        <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden dark:invert' alt=""></img>
      </div>
      {/* sidebar menu for small screen*/}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white dark:bg-gray-800 transition-all ${visible ? 'w-full':'w-0'}`}>
        <div className='flex flex-col text-gray-600 dark:text-gray-300'>
            <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700'>
                <img className='h-4 rotate-180 dark:invert' src={assets.dropdown_icon} alt=""/>
                <p>Back</p>
            </div>
            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700' to='/'>HOME</NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700' to='/collection'>COLLECTION</NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700' to='/orders'>ORDER</NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700' to='/contact'>CONTACT</NavLink>
        </div>
      </div>
    </div>
  )
}

export default NavBar
