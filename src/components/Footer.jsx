import { useState, useEffect } from 'react';
import { Link, NavLink } from "react-router-dom";
import axios from 'axios';

const Footer = () => {
  const [contactInfo, setContactInfo] = useState({
    footerEmail: 'ymgspharmacy@gmail.com',
    footerPhone: '+91 8858284423'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const response = await axios.get(`${backendUrl}/api/order/settings`);
        
        if (response.data.success) {
          setContactInfo(response.data.settings);
        }
      } catch (error) {
        console.error("Failed to fetch footer information:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return (
    <div className="dark:bg-gray-800 dark:text-gray-100">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-small">
        <div>
          <Link to="/" className="font-display text-2xl text-primary dark:text-[#02ADEE]">
            YMGS pharmacy
          </Link>
          <p className="w-full md:w-2/3 text-gray-600 dark:text-gray-300">
            Your Trusted Online Medicine & Healthcare Partner
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5 dark:text-gray-100">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600 dark:text-gray-300">
            <li>
              <NavLink to="/products" className="hover:text-primary dark:hover:text-[#02ADEE]">Products</NavLink>
            </li>
            <li>
              <NavLink to="/about" className="hover:text-primary dark:hover:text-[#02ADEE]">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="hover:text-primary dark:hover:text-[#02ADEE]">Contact Us</NavLink>
            </li>
            <li>
              <NavLink to="/policy" className="hover:text-primary dark:hover:text-[#02ADEE]">Terms & Conditions</NavLink>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5 dark:text-gray-100">Get In Touch</p>
          <ul className="flex flex-col gap-1 text-gray-600 dark:text-gray-300">
            {loading ? (
              <li className="text-sm opacity-70">Loading contact information...</li>
            ) : (
              <>
                <li>{contactInfo.footerPhone}</li>
                <li>{contactInfo.footerEmail}</li>
              </>
            )}
          </ul>
        </div>
      </div>
      <div>
        <hr className="dark:border-gray-700" />
        <p className="py-5 text-sm text-center dark:text-gray-300">
          YMGS pharmacy CopyRight 2025 All-Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
