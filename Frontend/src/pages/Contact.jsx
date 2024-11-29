import  { useState } from "react";
import ContactImage from "../assets/contact_image.png"; // Adjust this path if necessary

const Contact = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked((prev) => !prev); // Toggle the state
  };

  return (
    <div className="flex flex-col md:flex-row items-center mt-10 px-4">
      <img
        src={ContactImage}
        alt="Contact"
        className="w-full max-w-[400px] md:mr-8"
      />
      <div className="text-left text-gray-600">
        <h2 className="text-xl font-semibold text-gray-700">OUR OFFICE</h2>
        {/* Clickable Location Link */}
        <p className="mb-2 leading-7">
          Location: <a href="https://www.google.com/maps?q=777+Cobry+Station,+Banha,+Qalyobia,+Egypt" className="text-blue-500 hover:underline">777 Cobry Station, Banha, Qalyobia, Egypt</a>
        </p>
       
        <p className="mb-2 leading-7">
          TEL: <a href="tel:+2001063213753" className="text-blue-500 hover:underline">(+20) 01063213753</a>
        </p>
        {/* Clickable Email Link */}
        <p className="mb-2 leading-7">
          Email: 
          <a 
            href="mailto:DocFlow@gmail.com" 
            onClick={(e) => {
              e.preventDefault(); // Prevent the default email client from opening immediately
              handleClick(); // Call the handleClick function
              setTimeout(() => {
                window.location.href = "mailto:DocFlow@gmail.com"; // Open email client after a short delay
              }, 100); // 100 ms delay to ensure the click is registered
            }} 
            className="text-blue-500 hover:underline"
          >
            DocFlow@gmail.com
          </a>
        </p>
        <p className="mb-2 font-semibold leading-7">Careers at DocFlow</p>
        <p className="mb-5 leading-7">Learn more about our teams and job openings.</p>
        <button
          onClick={handleClick}
          className={`mt-5 px-6 py-2 font-semibold rounded-lg shadow-md transition-colors 
            ${isClicked ? 'bg-black text-white' : 'bg-white text-black border border-black'}
            hover:bg-black hover:text-white`}
        >
          Contact us
        </button>
      </div>
    </div>
  );
};

export default Contact;
