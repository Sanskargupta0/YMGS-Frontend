const Feature = () => {
  return (
    <section className="py-12 dark:bg-gray-800">
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "Verified Medicines",
            description: "All medicines are sourced from licensed pharmacies and verified suppliers",
          },
          {
            title: "Express Delivery",
            description: "Same-day delivery available for urgent medications in your area",
          },
          {
            title: "24/7 Support",
            description: "Round-the-clock customer support and pharmacist consultation available",
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="p-6 bg-secondary/30 dark:bg-gray-700 rounded-xl shadow-sm animate-fade-up"
            style={{ animationDelay: `${0.1 * (index + 1)}s` }}
          >
            <h3 className="font-display text-xl font-semibold text-primary dark:text-[#02ADEE]">
              {feature.title}
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
  )
}

export default Feature