import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch} = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');

  const toggleCategory = (e) => {
    if(category.includes(e.target.value)){
      setCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else{
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if(subCategory.includes(e.target.value)){
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else{
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {

    let productsCopy = products.slice();

    if(showSearch && search){
        productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }    

    if(subCategory.length > 0){
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }

    setFilterProducts(productsCopy)
  }

  const sortProduct = () => {

    let fpCopy = filterProducts.slice();

    switch(sortType){
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b)=>(a.price - b.price)));
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b)=>(b.price - a.price)));
        break;

      default:
        applyFilter();
        break;
    }

  }

  useEffect(()=>{
    applyFilter();
  }, [category, subCategory, search, showSearch, products])

  useEffect(() => {
    sortProduct();
  }, [sortType])
  

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t dark:border-gray-700 dark:bg-gray-800'>
      {/* Filter Section */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2 dark:text-gray-200'>
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''} dark:invert`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>
        <div className={`border border-gray-300 dark:border-gray-700 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block dark:bg-gray-800`}>
          <p className='mb-3 text-sm font-medium dark:text-gray-200'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700 dark:text-gray-300'>
            <p className='flex gap-2'>
              <input className='w-3 accent-gray-700 dark:accent-yellow-400' type='checkbox' value={'Prescription'} onChange={toggleCategory} /> Prescription Medicines
            </p>
            <p className='flex gap-2'>
              <input className='w-3 accent-gray-700 dark:accent-yellow-400' type='checkbox' value={'OTC'} onChange={toggleCategory} /> Over The Counter
            </p>
            <p className='flex gap-2'>
              <input className='w-3 accent-gray-700 dark:accent-yellow-400' type='checkbox' value={'Healthcare'} onChange={toggleCategory} /> Healthcare Devices
            </p>
            <p className='flex gap-2'>
              <input className='w-3 accent-gray-700 dark:accent-yellow-400' type='checkbox' value={'Wellness'} onChange={toggleCategory} /> Wellness Products
            </p>
            <p className='flex gap-2'>
              <input className='w-3 accent-gray-700 dark:accent-yellow-400' type='checkbox' value={'Personal Care'} onChange={toggleCategory} /> Personal Care
            </p>
            <p className='flex gap-2'>
              <input className='w-3 accent-gray-700 dark:accent-yellow-400' type='checkbox' value={'Ayurvedic'} onChange={toggleCategory} /> Ayurvedic Medicines
            </p>
          </div>
        </div>

        <div className={`border border-gray-300 dark:border-gray-700 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block dark:bg-gray-800`}>
          <p className='mb-3 text-sm font-medium dark:text-gray-200'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700 dark:text-gray-300'>
            <p className='flex gap-2'>
              <input className='w-3 accent-gray-700 dark:accent-yellow-400' type='checkbox' value={'Tablets'} onChange={toggleSubCategory}/> Tablets
            </p>
            <p className='flex gap-2'>
              <input className='w-3 accent-gray-700 dark:accent-yellow-400' type='checkbox' value={'Capsules'} onChange={toggleSubCategory}/> Capsules
            </p>
            <p className='flex gap-2'>
              <input className='w-3 accent-gray-700 dark:accent-yellow-400' type='checkbox' value={'Syrups'} onChange={toggleSubCategory}/> Syrups
            </p>
            <p className='flex gap-2'>
              <input className='w-3 accent-gray-700 dark:accent-yellow-400' type='checkbox' value={'Injectables'} onChange={toggleSubCategory}/> Injectables
            </p>
            <p className='flex gap-2'>
              <input className='w-3 accent-gray-700 dark:accent-yellow-400' type='checkbox' value={'Topical'} onChange={toggleSubCategory}/> Topical Applications
            </p>
            <p className='flex gap-2'>
              <input className='w-3 accent-gray-700 dark:accent-yellow-400' type='checkbox' value={'Drops'} onChange={toggleSubCategory}/> Drops
            </p>
            <p className='flex gap-2'>
              <input className='w-3 accent-gray-700 dark:accent-yellow-400' type='checkbox' value={'Equipment'} onChange={toggleSubCategory}/> Medical Equipment
            </p>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'PRODUCTS'} />
          <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 dark:border-gray-700 text-sm px-2 dark:bg-gray-800 dark:text-gray-200'>
            <option value="relavent">Sort by: relevant</option>
            <option value="low-high">Sort by: Price low to high</option>
            <option value="high-low">Sort by: Price high to low</option>
          </select>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filterProducts.map((item, index) => (
            <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
