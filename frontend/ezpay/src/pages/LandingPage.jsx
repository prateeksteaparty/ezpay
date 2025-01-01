import { Link } from "react-router-dom";

export const LandingPage = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Main Content */}
      <div className="flex-grow grid grid-cols-1 md:grid-cols-2">
        {/* Image Section */}
        <div className="flex items-center justify-center bg-gray-200">
          <img
            src="./public/output.jpg"
            alt="Luffy"
            className="object-cover w-full h-full md:h-auto"
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-col items-center justify-center bg-white p-8">
          <h1 className="text-5xl font-bold mb-8 text-gray-800 text-center">
            Welcome to EzPay
          </h1>
          <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-4 md:flex-row">
            <Link
              to="/signin"
              className="px-8 py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 text-lg w-full md:w-auto text-center"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-8 py-3 text-white bg-green-500 rounded-md hover:bg-green-600 text-lg w-full md:w-auto text-center"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
