import  {useContext, useEffect, useState}  from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

    const {productId} = useParams();
    const { products, currency, addToCart } = useContext(ShopContext);
    const [productData, setProductData] = useState(false);
    const [image, setImage] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [selectedQuantityPrice, setSelectedQuantityPrice] = useState(null);
 
    
    const fetchProductData = async () => {
      products.map((item) => {
        if(item._id === productId){
          setProductData(item)
          setImage(item.image[0])
          if (item.minOrderQuantity && item.minOrderQuantity > 1) {
            setQuantity(item.minOrderQuantity);
          }
          return null;
        }
      })
    }
    useEffect(() => {
      fetchProductData();
    }, [productId, products])
    
    const handleIncreaseQuantity = () => {
        if (selectedQuantityPrice) return; // Disable manual quantity change when preset is selected
        setQuantity(prev => prev + 1);
    };

    const handleDecreaseQuantity = () => {
        if (selectedQuantityPrice) return; // Disable manual quantity change when preset is selected
        const minQuantity = productData.minOrderQuantity || 1;
        if (quantity > minQuantity) {
            setQuantity(prev => prev - 1);
        }
    };

    const handleQuantityPriceSelect = (qp) => {
        setSelectedQuantityPrice(qp);
        setQuantity(parseInt(qp.quantity));
    };

    const getCurrentPrice = () => {
        if (selectedQuantityPrice) {
            return selectedQuantityPrice.price;
        }
        return productData.price;
    };

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 dark:bg-gray-800 dark:border-gray-700'>
      {/*product data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/*product images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item, index)=>(
                <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="product image" />
          </div>
        </div>
        {/*product info */}
        <div className='flex-1'>
            <h1 className='font-medium text-2xl mt-2 dark:text-white'>{productData.name}</h1>
            <div className='flex items-center gap-1 mt-2'>
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_dull_icon} alt="" className="w-3 5" />
              <p className='pl-2 dark:text-gray-300'>(122)</p>
            </div>
            <p className='mt-5 text-3xl font-medium dark:text-white'>{currency}{getCurrentPrice()}</p>
            <p className='mt-5 text-gray-500 dark:text-gray-300 md:w-4/5'>{productData.description}</p>
            
            {/* Quantity Price List */}
            {productData.quantityPriceList && (
              <div className='my-6'>
                <p className='text-gray-600 dark:text-gray-300 mb-3'>Select Quantity Package:</p>
                <div className='grid grid-cols-2 gap-3'>
                  {JSON.parse(productData.quantityPriceList).map((qp, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuantityPriceSelect(qp)}
                      className={`p-3 border ${
                        selectedQuantityPrice === qp 
                          ? 'border-black dark:border-yellow-400 bg-black dark:bg-yellow-400 text-white dark:text-gray-800' 
                          : 'border-gray-300 dark:border-gray-600 hover:border-black dark:hover:border-yellow-400'
                      }`}
                    >
                      {qp.quantity} pills - {currency}{qp.price}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className='flex flex-col gap-4 my-8'>
              {!selectedQuantityPrice && (
                <div className='flex items-center gap-4 mb-4'>
                  <span className='text-gray-600 dark:text-gray-300'>Quantity:</span>
                  <div className='flex items-center border border-gray-300 dark:border-gray-600'>
                    <button 
                      onClick={handleDecreaseQuantity}
                      className='px-3 py-1 border-r border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white'
                    >
                      -
                    </button>
                    <span className='px-4 py-1 dark:text-white'>{quantity}</span>
                    <button 
                      onClick={handleIncreaseQuantity}
                      className='px-3 py-1 border-l border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white'
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
              {productData.minOrderQuantity && productData.minOrderQuantity > 1 && !selectedQuantityPrice && (
                <div className='text-sm text-orange-600 -mt-2'>
                  Minimum order quantity: {productData.minOrderQuantity}
                </div>
              )}
            </div>
            
            <button 
              onClick={() => {
                const cartItem = {
                  quantity: quantity,
                  selectedPrice: selectedQuantityPrice ? selectedQuantityPrice.price : productData.price,
                  isPackage: !!selectedQuantityPrice
                };
                addToCart(productData._id, cartItem);
                setSelectedQuantityPrice(null);
              }} 
              className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700 dark:bg-yellow-400 dark:text-gray-800 dark:hover:bg-yellow-500'
            >
              ADD TO CART
            </button>
            <hr className='mt-8 sm:w-4/5 dark:border-gray-700'/>
            <div className='text-sm text-gray-500 dark:text-gray-400 mt-5 flex flex-col gap-1'>
                <p>Cash on Delivery Available on this Product.</p>
                <p>No Refunds and No Returns</p>
            </div>
        </div>
      </div>

      {/*---------related product------------ */}
      <div>
        <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
      </div>
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product
