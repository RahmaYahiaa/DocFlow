import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-10">
      <div className="container mx-auto px-4 md:px-10">
        {/* ----------------Main Footer Sections--------------- */}
        <div className="grid grid-cols-1 sm:grid-cols-[3fr_1fr_1fr] gap-10 text-sm">
          {/* Left Section */}
          <div>
          <img src={assets.logo} alt="DocFlow Logo" className="mb-4 w-36" />

            <p className="text-gray-600 leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
          </div>

          {/* Center Section */}
          <div>
            <p className="font-semibold text-lg mb-4">COMPANY</p>
            <ul className="space-y-2">
              <li className="hover:text-blue-600 cursor-pointer">Home</li>
              <li className="hover:text-blue-600 cursor-pointer">About us</li>
              <li className="hover:text-blue-600 cursor-pointer">Delivery</li>
              <li className="hover:text-blue-600 cursor-pointer">Privacy policy</li>
            </ul>
          </div>

          {/* Right Section */}
          <div>
            <p className="font-semibold text-lg mb-4">GET IN TOUCH</p>
            <ul className="space-y-2">
              <li className="text-gray-600">+0-000-000-000</li>
              <li className="text-gray-600">DocFlow@gmail.com</li>
            </ul>
          </div>
        </div>

        {/* ----------------Copy Right Section--------------- */}
        <div className="mt-10 text-center text-gray-500">
          <hr className="border-t border-gray-300 mb-4" />
          <p>Copyright © 2024 DocFlow - All Right Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
