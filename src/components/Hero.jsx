import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets'
const Hero = () => {
  // Cloudinary optimization parameters
  const cloudinaryBaseUrl = "https://res.cloudinary.com/dyj3rywju/image/upload/";
  const optimizationParams = [
    "f_auto", // Automatic format selection
    "q_auto", // Automatic quality
    "w_800", // Maximum width
    "dpr_auto", // Automatic device pixel ratio
    "c_fill", // Fill mode
    "g_center" // Gravity center
  ].join(",");

  const heroImageUrl = `${cloudinaryBaseUrl}${optimizationParams}/v1740632582/hero_new0nv.avif`;

  const navigate = useNavigate();

  return (
    <div className='flex flex-col sm:flex-row'>
      <section className="pt-24 pb-12 container">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="flex-1 animate-fade-up">
            <span className="bg-secondary text-primary px-4 py-1 rounded-full text-sm font-medium">
              24/7 Healthcare Support
            </span>
            <h1 className="mt-6 font-display text-4xl md:text-6xl font-semibold text-primary leading-tight">
              Your Trusted Online Medicine & Healthcare Partner
            </h1>
            <p className="mt-6 text-gray-600 text-lg">
              YMGS brings quality healthcare to your doorstep. Order medicines, health supplements, and medical supplies with just a few clicks.
            </p>
            <button onClick={() => navigate('/collection')} className="mt-8 bg-primary text-white px-8 py-3 rounded-full font-medium inline-flex items-center gap-2 hover:bg-primary/90 transition-colors">
              Order Medicines
              <ArrowRight size={20} />
            </button>
          </div>
          <div className="flex-1 relative animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <img
              src={assets.main}
              alt="Fresh vegetables and fruits"
              className="rounded-2xl shadow-xl"
              loading="eager" // Priority loading for hero image
              width="800"
              height="600"
              fetchPriority="high"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero
