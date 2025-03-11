import Title from '../components/Title'
import NewsLetterBox from '../components/NewsLetterBox'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { assets } from '../assets/assets'

const Contact = () => {

  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
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
          fetchPriority="high"
          sizes="(max-width: 768px) 100vw, 480px"
        />
        <div className='flex flex-col justify-center items-start gap-8'>
          <div>
            <p className='font-semibold text-xl text-gray-800 mb-4'>Get In Touch</p>
            <p className='text-gray-600 max-w-md'>Have questions about our products or delivery? 
              We&apos;re here to help you get the freshest produce for your family.</p>
          </div>

          <div className='flex flex-col gap-6'>
            <div className='flex items-center gap-3 text-gray-600'>
              <MapPin className='text-primary' size={20} />
              <p>123 Fresh Market Lane<br />Garden District, Green City 12345</p>
            </div>

            <div className='flex items-center gap-3 text-gray-600'>
              <Phone className='text-primary' size={20} />
              <p>+1 (555) 123-4567</p>
            </div>

            <div className='flex items-center gap-3 text-gray-600'>
              <Mail className='text-primary' size={20} />
              <p>support@YMGS.com</p>
            </div>

            <div className='flex items-center gap-3 text-gray-600'>
              <Clock className='text-primary' size={20} />
              <p>Mon - Sat: 8:00 AM - 8:00 PM<br />Sunday: 9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>
      </div>

     
<div className="container px-4 mx-auto">
  <div className="mx-auto">
    <div className="max-w-md mx-auto px-8 py-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-800 mb-1" htmlFor="name">Your Name</label>
          <input
            className="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300"
            placeholder="Enter your name"
            type="text"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-800 mb-1" htmlFor="email">Your Email</label>
          <input
            className="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300"
            placeholder="Enter your email"
            name="email"
            id="email"
            type="email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-800 mb-1" htmlFor="phone">Your Phone Number</label>
          <input
            className="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300"
            placeholder="Enter your email"
            name="phone"
            id="phone"
            type="number"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-800 mb-1" htmlFor="message"
            >Your Message</label
          >
          <textarea
            className="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300"
            rows="4"
            placeholder="Enter your message"
            name="message"
            id="message"
          ></textarea>
        </div>
        <button
          className="w-full bg-yellow-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-yellow-400 transition duration-300"
          type="submit"
        >
          Send Message
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