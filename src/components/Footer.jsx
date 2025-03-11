import { Link, NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="dark:bg-gray-800 dark:text-gray-100">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-small">
        <div>
          <Link to="/" className="font-display text-2xl text-primary dark:text-yellow-400">
            YMGS
          </Link>
          <p className="w-full md:w-2/3 text-gray-600 dark:text-gray-300">
            Your Trusted Online Medicine & Healthcare Partner
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5 dark:text-gray-100">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600 dark:text-gray-300">
            <li>
              <NavLink to="/collection" className="hover:text-primary dark:hover:text-yellow-400">Products</NavLink>
            </li>
            <li>
              <NavLink to="/about" className="hover:text-primary dark:hover:text-yellow-400">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="hover:text-primary dark:hover:text-yellow-400">Contact Us</NavLink>
            </li>
            <li>
              <NavLink to="/policy" className="hover:text-primary dark:hover:text-yellow-400">Terms & Conditions</NavLink>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5 dark:text-gray-100">Get In Touch</p>
          <ul className="flex flex-col gap-1 text-gray-600 dark:text-gray-300">
            <li>+91 9919919911</li>
            <li>YMGS@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr className="dark:border-gray-700" />
        <p className="py-5 text-sm text-center dark:text-gray-300">
          YMGS CopyRight 2025 All-Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
