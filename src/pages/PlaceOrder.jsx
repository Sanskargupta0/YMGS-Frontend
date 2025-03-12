import  { useContext, useState, useEffect } from 'react'
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';


const PlaceOrder = () => {
  
  const [method, setMethod] = useState('cod');
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { navigate, backendUrl, token, cartItems, setCartItem, getCartAmount, delivery_fee, products, getCartItems } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''
  })

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${backendUrl}/api/address/get`, {
          headers: { token }
        });
        if (data.success) {
          setSavedAddresses(data.addresses);
        } else {
          toast.error(data.message || 'Failed to fetch addresses');
        }
      } catch (error) {
        console.log(error);
        toast.error('Failed to fetch saved addresses');
      } finally {
        setIsLoading(false);
      }
    };
    fetchAddresses();
  }, [backendUrl, token]);

  const saveNewAddress = async () => {
    try {
      // Validate form data before sending
      if (!formData.firstName || !formData.lastName || !formData.street || !formData.city || 
          !formData.state || !formData.zipcode || !formData.country || !formData.phone) {
        toast.error('Please fill all required fields');
        return;
      }

      const { data } = await axios.post(
        `${backendUrl}/api/address/save`, 
        { 
          address: formData,
          userId: token // Add userId to the request body
        },
        { 
          headers: { token } 
        }
      );

      if (data.success) {
        setSavedAddresses(data.addresses);
        setShowAddressForm(false);
        setSelectedAddress(formData); // Select the newly added address
        toast.success('Address saved successfully');
      } else {
        toast.error(data.message || 'Failed to save address');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Failed to save address');
    }
  };

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setFormData(data => ({...data, [name]:value}))
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const verifyData = {
            ...response,
            userId: token
          };
          const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay', verifyData, {headers:{token}})
          if (data.success) {
            navigate('/orders')
            setCartItem({})
          }
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const handleMethodChange = (newMethod) => {
    if (newMethod !== 'stripe') {
      setMethod(newMethod);
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    if (!selectedAddress && !showAddressForm) {
      toast.error('Please select an address or add a new one');
      return;
    }

    try {
      
      const items = getCartItems(); // Get formatted cart items

      let orderData = {
        address: showAddressForm ? formData : selectedAddress,
        items: items,
        amount: getCartAmount() + delivery_fee
      }

      switch(method){
        //API Calls for COD
        case 'cod': {
          const response = await axios.post(backendUrl + '/api/order/place', orderData, {headers:{token}})
          console.log(response.data.success);
          if (response.data.success){
            setCartItem({})
            navigate('/orders')
          }else{
            toast.error(response.data.message)
          }
          break;
        }

        case 'stripe': {
          const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, {headers:{token}})
          if (responseStripe.data.success) {
            const {session_url} = responseStripe.data
            window.location.replace(session_url)
          }else{
            toast.error(responseStripe.data.message)
          }
          break;
        }

        case 'razorpay': {
          const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, {headers:{token}})
          if (responseRazorpay.data.success) {
              initPay(responseRazorpay.data.order)
          }

          break;
        }

        default:
          break;
      }

      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t dark:border-gray-700 dark:bg-gray-800'>
      {/*------------------left side------------------*/}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px] '>
        <div className='text-xl sm:text-2xl my-3 '>
          <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="text-center py-4 dark:text-gray-300">Loading saved addresses...</div>
        ) : (
          <>
            {/* Saved Addresses Section */}
            {savedAddresses.length > 0 && !showAddressForm && (
              <div className='flex flex-col gap-3'>
                <h3 className='font-medium dark:text-gray-200'>Saved Addresses</h3>
                {savedAddresses.map((address, index) => (
                  <div 
                    key={index}
                    onClick={() => setSelectedAddress(address)}
                    className={`border p-3 rounded cursor-pointer ${
                      selectedAddress === address ? 'border-green-500' : 'border-gray-300 dark:border-gray-600'
                    } dark:text-gray-200 dark:bg-gray-700`}
                  >
                    <p>{address.firstName} {address.lastName}</p>
                    <p>{address.street}</p>
                    <p>{address.city}, {address.state} {address.zipcode}</p>
                    <p>{address.country}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Add New Address Button */}
            <button 
              type="button"
              onClick={() => setShowAddressForm(!showAddressForm)}
              className='text-black dark:text-yellow-400 underline'
            >
              {showAddressForm ? 'Back to saved addresses' : 'Add New Address'}
            </button>

            {/* Address Form */}
            {showAddressForm && (
              <>
                <div className='flex gap-3'>
                  <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name'/>
                  <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name'/>
                </div>
                <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded py-1.5 px-3.5 w-full' type="email" placeholder='E-mail Address'/>
                <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street'/>
                <div className='flex gap-3'>
                  <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded py-1.5 px-3.5 w-full' type="text" placeholder='City'/>
                  <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded py-1.5 px-3.5 w-full' type="text" placeholder='State'/>
                </div>
                <div className='flex gap-3'>
                  <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded py-1.5 px-3.5 w-full' type="number" placeholder='Area PIN-CODE'/>
                  <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country'/>
                </div>
                <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded py-1.5 px-3.5 w-full' type="number" placeholder='Mobile Number'/>
                <button 
                  type="button"
                  onClick={saveNewAddress}
                  className='bg-black text-white dark:bg-yellow-400 dark:text-gray-800 px-4 py-2 rounded hover:bg-gray-800 dark:hover:bg-yellow-500'
                >
                  Save Address
                </button>
              </>
            )}
          </>
        )}
      </div>
      {/*-------------------right side---------------------- */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'}/>
          {/*------------------payment--------------------*/}
          <div className='flex gap-3 flex-col mt-4 lg:flex-row'>
          

            {/* Razorpay payment */}
            <div 
              onClick={() => handleMethodChange('razorpay')} 
              className='flex items-center gap-3 border dark:border-gray-600 p-2 px-3 cursor-pointer hover:border-green-500 dark:hover:border-green-500 transition-colors dark:bg-gray-700'
            >
              <p className={`min-w-3.5 h-3.5 border dark:border-gray-500 rounded-full ${method === 'razorpay' ? 'bg-green-500':''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="Razorpay" />
            </div>
              {/* Stripe payment (disabled) */}
              <div className='flex items-center gap-3 border dark:border-gray-700 p-2 px-3 cursor-not-allowed opacity-50 bg-gray-50 dark:bg-gray-600'>
              <p className='min-w-3.5 h-3.5 border dark:border-gray-500 rounded-full'></p>
              <div className='flex items-center gap-2'>
                <img className='h-5 mx-4 grayscale' src={assets.stripe_logo} alt="Stripe (Currently Unavailable)" />
                <span className='text-xs text-gray-500 dark:text-gray-400'>(Coming Soon)</span>
              </div>
            </div>
          </div>
          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white dark:bg-yellow-400 dark:text-gray-800 px-16 py-3 text-sm hover:bg-gray-800 dark:hover:bg-yellow-500'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
