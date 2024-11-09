import React, { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError("Please fill in all the fields.");
    } else {
      // Handle successful login
      setError(""); // clear any errors
      alert("Login successful!");
    }
  };

  return (
    <div className="h-full flex">
      {/* Left Section - Image */}
      <div className="w-1/2 h-screen -mx-5 -my-3 relative bg-[#B3D0D6] from-blue-400 to-purple-500 text-black flex items-start justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 mt-[12.5rem]">
            Welcome Back!
          </h1>
          <p className="text-lg mb-8">
            Log in to access your personalized shopping experience.
          </p>
          <img
            src="https://i.pinimg.com/736x/b3/86/72/b3867215c82353b0800db8c26235c8d2.jpg"
            alt="Shopping Cart"
            className="mx-auto w-[26rem] absolute left-[20%] bottom-0"
          />
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6">Login to your account</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#B3D0D6]"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#B3D0D6]"
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 rounded-md transition ease-in-out duration-400 text-black bg-[#B3D0D6] hover:bg-[#86adb5]"
            >
              Log In
            </button>
          </form>

          {/* Additional Links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <a href="#" className="text-[#B3D0D6] underline">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
