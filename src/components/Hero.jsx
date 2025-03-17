import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useState, useEffect } from "react";

const Hero = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderImages = [assets.image3, assets.image1, assets.image2];

  // Auto-rotate slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [sliderImages.length]);

  // Functions to navigate through slides
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + sliderImages.length) % sliderImages.length
    );
  };

  return (
    <div className="flex flex-col sm:flex-row dark:bg-gray-800">
      <section className="pt-24 pb-12 container">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="flex-1 animate-fade-up">
            <span className="bg-secondary dark:bg-gray-700 text-primary dark:text-green-300 px-4 py-1 rounded-full text-sm font-medium">
              24/7 Healthcare Support
            </span>
            <h1 className="mt-6 font-display text-4xl md:text-6xl font-semibold text-primary dark:text-[#02ADEE] leading-tight">
              Your Trusted Online Medicine & Healthcare Partner
            </h1>
            <p className="mt-6 text-gray-600 dark:text-gray-300 text-lg">
              YMGS pharmacy brings quality healthcare to your doorstep. Order
              medicines, health supplements, and medical supplies with just a
              few clicks.
            </p>
            <button
              onClick={() => navigate("/products")}
              className="mt-8 bg-primary dark:bg-green-300 text-white dark:text-gray-800 px-8 py-3 rounded-full font-medium inline-flex items-center gap-2 hover:bg-primary/90 dark:hover:bg-yellow-500 transition-colors"
            >
              Order Medicines
              <ArrowRight size={20} />
            </button>
          </div>

          <div
            className="flex-1 relative animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            {/* Image slider container */}
            <div className="relative h-[600px] w-full rounded-2xl overflow-hidden shadow-xl">
              {/* Static Image Backup (will show if slider fails) */}
              <img
                src={sliderImages[0]}
                alt="Healthcare Default"
                className="w-full h-full object-cover rounded-2xl"
                width="800"
                height="600"
              />

              {/* Images - using a different approach with regular display instead of absolute positioning */}
              <div className="absolute inset-0 w-full h-full">
                {sliderImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
                      index === currentSlide
                        ? "opacity-100 z-10"
                        : "opacity-0 z-0"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Healthcare Slide ${index + 1}`}
                      className="w-full h-full object-cover"
                      width="800"
                      height="600"
                    />
                  </div>
                ))}
              </div>

              {/* Navigation buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-md hover:bg-white dark:hover:bg-gray-700 transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft
                  size={20}
                  className="text-primary dark:text-green-300"
                />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-md hover:bg-white dark:hover:bg-gray-700 transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight
                  size={20}
                  className="text-primary dark:text-green-300"
                />
              </button>

              {/* Indicator dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
                {sliderImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentSlide
                        ? "bg-primary dark:bg-green-300"
                        : "bg-white/50 dark:bg-gray-600"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
