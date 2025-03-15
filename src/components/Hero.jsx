import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets'
const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col sm:flex-row dark:bg-gray-800'>
      <section className="pt-24 pb-12 container">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="flex-1 animate-fade-up">
            <span className="bg-secondary dark:bg-gray-700 text-primary dark:text-[#02ADEE] px-4 py-1 rounded-full text-sm font-medium">
              24/7 Healthcare Support
            </span>
            <h1 className="mt-6 font-display text-4xl md:text-6xl font-semibold text-primary dark:text-[#02ADEE] leading-tight">
              Your Trusted Online Medicine & Healthcare Partner
            </h1>
            <p className="mt-6 text-gray-600 dark:text-gray-300 text-lg">
              YMGS pharmacy brings quality healthcare to your doorstep. Order medicines, health supplements, and medical supplies with just a few clicks.
            </p>
            <button onClick={() => navigate('/collection')} className="mt-8 bg-primary dark:bg-[#02ADEE] text-white dark:text-gray-800 px-8 py-3 rounded-full font-medium inline-flex items-center gap-2 hover:bg-primary/90 dark:hover:bg-yellow-500 transition-colors">
              Order Medicines
              <ArrowRight size={20} />
            </button>
          </div>
          <div className="flex-1 relative animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <img
              src={assets.main}
              alt="Online Medicine & Healthcare Partner"
              className="rounded-2xl shadow-xl"
              loading="eager" // Priority loading for hero image
              width="800"
              height="600"
              fetchpriority="high"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero
