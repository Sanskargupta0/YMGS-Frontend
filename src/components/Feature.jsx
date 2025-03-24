import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
const Feature = () => {
  const navigate = useNavigate();
  return (
    <section className="py-12 dark:bg-gray-800">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Verified Medicines",
              description:
                "All medicines are sourced from licensed pharmacies and verified suppliers",
              icon: "💊",
            },
            {
              title: "Express Delivery",
              description:
                "Same-day delivery available for urgent medications in your area",
              icon: "🚚",
            },
            {
              title: "24/7 Support",
              description:
                "Round-the-clock customer support and pharmacist consultation available",
              icon: "📞",
            },
            {
              title: "100% Money Back",
              description:
                "Get a full refund if you're not satisfied with your purchase",
              icon: "💰",
            },
            {
              title: "No-Contact Shipping",
              description:
                "Ensuring safe and hygienic delivery with no direct contact",
              icon: "📦",
            },
            {
              title: "Exclusive Discounts",
              description:
                "Special offers and discounts for loyal customers and bulk purchases",
              icon: "🏷️",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-8 bg-secondary/30 dark:bg-gray-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 animate-fade-up text-center flex flex-col items-center border border-transparent hover:border-primary/10 dark:hover:border-[#02ADEE]/10"
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="font-display text-xl font-semibold text-primary dark:text-[#02ADEE] mb-3">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-xs mx-auto">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 animate-fade-up pt-12 pb-12 container">
        <span className="bg-secondary dark:bg-gray-700 text-primary dark:text-green-300 px-4 py-1 rounded-full text-sm font-medium">
          24/7 Healthcare Support
        </span>
        <h1 className="mt-6 font-display text-4xl md:text-6xl font-semibold text-primary dark:text-[#02ADEE] leading-tight">
          Your Trusted Online Medicine & Healthcare Partner
        </h1>
        <p className="mt-6 text-gray-600 dark:text-gray-300 text-lg">
          YMGS Pharmacy brings quality healthcare to your doorstep. Order
          medicines, health supplements, and medical supplies with just a few
          clicks.
        </p>
        <button
          onClick={() => navigate("/products")}
          className="mt-8 bg-primary dark:bg-green-300 text-white dark:text-gray-800 px-8 py-3 rounded-full font-medium inline-flex items-center gap-2 hover:bg-primary/90 dark:hover:bg-yellow-500 transition-colors"
        >
          Order Medicines
          <ArrowRight size={20} />
        </button>
      </div>
    </section>
  );
};

export default Feature;
