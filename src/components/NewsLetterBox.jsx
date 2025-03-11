import React, { useState } from 'react'
import { toast } from 'react-toastify'

const NewsLetterBox = () => {
    const [email, setEmail] = useState('');

    const onSubmitHandler = (event) => {
        event.preventDefault();
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
            toast.success('Successfully subscribed to the newsletter!');
            setEmail(''); // Clear the input field
        } else {
            toast.error('Invalid email address. Please try again.');
        }
    }

    return (
        <section className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <div className="container mx-auto py-12">
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4">Subscribe to our Newsletter</h2>
                    <p className="mb-8">Get the latest updates and offers.</p>
                    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-yellow-500"
                        />
                        <button className="px-6 py-2 bg-primary text-white dark:bg-yellow-500 dark:text-gray-900 rounded-md hover:bg-primary/90 dark:hover:bg-yellow-600 transition-colors">
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default NewsLetterBox
