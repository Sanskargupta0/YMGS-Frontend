import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';
import { toast } from 'react-toastify';

const Orders = () => {
  
  const {backendUrl, token, currency} = useContext(ShopContext);
  const [orderData, setorderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null
      }

      const response = await axios.post(backendUrl + '/api/order/userorders', {}, {headers:{token}})
      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        setorderData(allOrdersItem.reverse());
        console.log(allOrdersItem)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  
  useEffect(()=>{
    loadOrderData()
  }, [token])

  return (
    <div className='border-t dark:border-gray-700 pt-16 dark:bg-gray-800'>
      
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'}/>
      </div>

      <div>
        {
          orderData.map((item, index)=>(
            <div key={index} className='py-4 border-t border-b dark:border-gray-700 text-gray-700 dark:text-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                <img className='w-16 sm:w-20' src={item.image} alt="" />
                <div>
                  <p className='sm:text-base font-medium dark:text-white'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-1 text-base text-gray-700 dark:text-gray-300'>
                    <p>{currency}{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <p className='mt-1 dark:text-gray-300'>Date: <span className='text-gray-400 dark:text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                  <p className='mt-1 dark:text-gray-300'>Payment: <span className='text-gray-400 dark:text-gray-400'>{item.paymentMethod}</span></p>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between'>
                <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text-sm md:text-base dark:text-gray-300'>{item.status}</p>
                </div>
                <button onClick={loadOrderData} className='border dark:border-gray-600 px-4 py-2 text-sm font-medium rounded-sm dark:text-gray-200 dark:hover:bg-gray-700 hover:bg-gray-100'>Track Order</button>
              </div>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default Orders
