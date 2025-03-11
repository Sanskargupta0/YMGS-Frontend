import React from 'react'

const NewsLetterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
    }

  return (
    <section className="py-16 container">
    <div className="bg-accent rounded-2xl p-8 md:p-12">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-primary">
          Stay Updated with YMGS
        </h2>
        <p className="mt-4 text-gray-600">
          Subscribe to our newsletter and receive updates about new products
          and special offers.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <button className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  </section>
  )
}

export default NewsLetterBox
