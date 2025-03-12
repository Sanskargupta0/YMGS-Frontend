import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const CartTotal = () => {
  
    const {currency, delivery_fee, getCartAmount} = useContext(ShopContext);

    const formatPrice = (price) => {
        return Number(price).toFixed(2);
    };
  
    return (
    <div className='w-full dark:text-gray-200'>
      <div className='text-2xl'>
        <Title text1 = {'CART'} text2 = {'TOTALS'}/>
      </div>

      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
            <p>Subtotal</p>
            <p>{currency} {formatPrice(getCartAmount())}</p>
        </div>
        <hr className="dark:border-gray-700" />
        <div className='flex justify-between'>
            <p>Shipping Fee</p>
            <p>{currency} {formatPrice(delivery_fee)}</p>
        </div>
        <hr className="dark:border-gray-700" />
        <div className='flex justify-between'>
            <b>Total</b>
            <b>{currency} {formatPrice(getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee)}</b>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
