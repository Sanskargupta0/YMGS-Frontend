import { useState } from 'react'
import Title from '../components/Title'
import NewsLetterBox from '../components/NewsLetterBox'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast.error('Please fill in all fields')
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address')
      return
    }

    // Phone validation
    if (formData.phone.length < 10) {
      toast.error('Please enter a valid phone number')
      return
    }

    setIsSubmitting(true)

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL
      const response = await axios.post(`${backendUrl}/api/contact/submit`, formData)
      
      if (response.data.success) {
        toast.success(response.data.message)
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        })
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="dark:bg-gray-800">
      <div className='text-center text-2xl pt-10 border-t dark:border-gray-700'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img 
          src={assets.contact}
          className='w-full md:max-w-[480px] rounded-2xl' 
          alt="Fresh produce delivery" 
          loading="eager"
          width="480"
          height="360"
          fetchpriority="high"
          sizes="(max-width: 768px) 100vw, 480px"
        />
        <div className='flex flex-col justify-center items-start gap-8'>
          <div>
            <p className='font-semibold text-xl text-gray-800 dark:text-gray-200 mb-4'>Get In Touch</p>
            <p className='text-gray-600 dark:text-gray-300 max-w-md'>Have questions about our products or delivery? 
              We&apos;re here to help you get the freshest produce for your family.</p>
          </div>

          <div className='flex flex-col gap-6'>
            <div className='flex items-center gap-3 text-gray-600 dark:text-gray-300'>
              <MapPin className='text-primary dark:text-yellow-400' size={20} />
              <p>123 Fresh Market Lane<br />Garden District, Green City 12345</p>
            </div>

            <div className='flex items-center gap-3 text-gray-600 dark:text-gray-300'>
              <Phone className='text-primary dark:text-yellow-400' size={20} />
              <p>+91 8858284423</p>
            </div>

            <div className='flex items-center gap-3 text-gray-600 dark:text-gray-300'>
              <Mail className='text-primary dark:text-yellow-400' size={20} />
              <p>ymgspharmacy@gmail.com</p>
            </div>

            <div className='flex items-center gap-3 text-gray-600 dark:text-gray-300'>
              <Clock className='text-primary dark:text-yellow-400' size={20} />
              <p>Mon - Sat: 8:00 AM - 8:00 PM<br />Sunday: 9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>
      </div>

     
<div className="container px-4 mx-auto">
  <div className="mx-auto">
    <div className="max-w-md mx-auto px-8 py-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-800 dark:text-gray-200 mb-1" htmlFor="name">Your Name</label>
          <input
            className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-600 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 dark:focus:ring-yellow-400 transition duration-300"
            placeholder="Enter your name"
            name="name"
            id="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-800 dark:text-gray-200 mb-1" htmlFor="email">Your Email</label>
          <input
            className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-600 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 dark:focus:ring-yellow-400 transition duration-300"
            placeholder="Enter your email"
            name="email"
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-800 dark:text-gray-200 mb-1" htmlFor="phone">Your Phone Number</label>
          <input
            className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-600 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 dark:focus:ring-yellow-400 transition duration-300"
            placeholder="Enter your phone number"
            name="phone"
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-800 dark:text-gray-200 mb-1" htmlFor="message">Your Message</label>
          <textarea
            className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-600 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 dark:focus:ring-yellow-400 transition duration-300"
            rows="4"
            placeholder="Enter your message"
            name="message"
            id="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button
          className="w-full bg-yellow-300 text-gray-800 dark:bg-yellow-400 dark:hover:bg-yellow-500 py-2 px-4 rounded-lg hover:bg-yellow-400 transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  </div>
</div>

      <NewsLetterBox />
    </div>
  )
}

export default Contact