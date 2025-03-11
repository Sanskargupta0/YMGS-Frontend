import { Link, NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-small">
        <div>
          <Link to="/" className="font-display text-2xl text-primary">
            YMGS
          </Link>
          <p className="w-full md:w-2/3 text-gray-600">
            Your Trusted Online Medicine & Healthcare Partner
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5 ">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>
              <NavLink to="/collection">Products</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact Us</NavLink>
            </li>
            <li>
              <NavLink to="/policy">Terms & Conditions</NavLink>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5 ">Get In Touch</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+91 9919919911</li>
            <li>YMGS@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          YMGS CopyRight 2025 All-Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
