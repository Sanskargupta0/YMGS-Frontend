import { useEffect } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useState } from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { toast } from 'react-toastify';

const Cart = () => {
  const {products, currency, cartItems, updateQuantity, navigate, token} = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  const proceedToPayment = () => {
    if(token){
      navigate('/place-order');
    }else{
      toast.error('Please login to proceed to payment');
      navigate('/login');
    }
  }

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      // Update to use new cart structure
      Object.entries(cartItems).forEach(([itemId, quantity]) => {
        if (quantity > 0) {
          tempData.push({
            _id: itemId,
            quantity: typeof quantity === 'number' ? quantity : 
                     (typeof quantity === 'object' ? Object.values(quantity)[0] || 0 : 0)
          });
        }
      });
      setCartData(tempData);
    }
  }, [cartItems, products]);

  // Empty cart component
  const EmptyCart = () => (
    <div className='flex flex-col items-center justify-center py-20 dark:text-gray-200'>
     
      <h2 className='text-2xl font-medium text-gray-600 dark:text-gray-300 mb-4'>Your Cart is Empty</h2>
      <p className='text-gray-500 dark:text-gray-400 mb-8'>Looks like you haven&apos;t added anything to your cart yet</p>
      <button 
        onClick={() => navigate('/collection')} 
        className='bg-black text-white px-8 py-3 text-sm hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600'
      >
        SHOP NOW
      </button>
    </div>
  );

  return (
    <div className='border-t dark:border-gray-700 pt-14 dark:bg-gray-800'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'}/>
      </div>
      
      {cartData.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <div className=''>
            {cartData.map((item, index)=>{
              const productData = products.find((product)=>product._id === item._id);
              if (!productData) return null;
              
              const minOrderQuantity = productData.minOrderQuantity || 1;

              return (
                <div key={index} className='py-4 border-t border-b dark:border-gray-700 text-gray-700 dark:text-gray-200 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                  <div className='flex items-start gap-6'>
                    <img className='w-16 sm:w-20' src={productData.image[0]} alt="" />
                    <div>
                      <p className='text-xs sm:text-lg font-medium dark:text-white'>{productData.name}</p>
                      <div className='flex items-center gap-5 mt-2'>
                        <p className='dark:text-gray-300'>{currency}{productData.price}</p>
                        {minOrderQuantity > 1 && (
                          <p className='text-xs text-orange-600 dark:text-orange-400'>Min qty: {minOrderQuantity}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <input 
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value !== '' && value !== '0') {
                        updateQuantity(item._id, Number(value));
                      }
                    }} 
                    className='border dark:border-gray-600 dark:bg-gray-700 dark:text-white max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' 
                    type='number' 
                    min={minOrderQuantity} 
                    value={item.quantity} 
                  />
                  <img 
                    onClick={() => updateQuantity(item._id, 0)} 
                    className='w-4 mr-4 sm:w-5 cursor-pointer dark:invert' 
                    src={assets.bin_icon} 
                    alt="" 
                  />
                </div>
              )
            })}
          </div>

          <div className='flex justify-end my-20'>
            <div className='w-full sm:w-[450px]'>
              <CartTotal />
              <div className='w-full text-end'>
                <button 
                  onClick={proceedToPayment} 
                  className='bg-black text-white text-sm my-8 px-8 py-3 dark:bg-yellow-400 dark:text-gray-800 dark:hover:bg-yellow-500'
                >
                  PROCEED TO PAYMENT
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart
