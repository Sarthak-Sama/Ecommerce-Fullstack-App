import axios from "../utils/axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [error, setError] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Function to check password strength using regex
  const handlePasswordChange = (e) => {
    const pass = e.target.value;
    setPassword(pass);

    // Password strength rules
    if (pass.length === 0) {
      setPasswordStrength("");
      setFormValid(false);
    } else if (pass.length < 6) {
      setPasswordStrength("Too Short");
      setFormValid(false);
    } else if (
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(
        pass
      )
    ) {
      setPasswordStrength("Strong");
      setFormValid(true);
      setError("");
    } else if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(pass)) {
      setPasswordStrength("Medium");
      setFormValid(false);
      setError(
        "Password must contain at least one special character and one uppercase letter."
      );
    } else {
      setPasswordStrength("Weak");
      setFormValid(false);
      setError(
        "Password must contain letters, numbers, and special characters."
      );
    }
  };

  // Form submit handler
  const handleSignup = async (e) => {
    e.preventDefault(); // prevent the default form submission
    if (!formValid) {
      setError("Please ensure all fields are valid.");
      return;
    }

    // Collect form data
    const name = e.target.name.value;
    const email = e.target.email.value;
    const mobile = e.target.mobile.value;
    try {
      const response = await axios.post("/user/signup", {
        name,
        email,
        mobile,
        password,
      });
      if (response.status === 200) {
        setError(""); // Clear any existing errors
        navigate(`${location.pathname}/verify-otp`, {
          state: { mobile, password },
        });
      }
    } catch (err) {
      // Handle errors (e.g., network issues or server validation errors)
      if (err.response && err.response.data) {
        setError(
          err.response.data.message || "Signup failed. Please try again."
        );
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  // Toggle Password Visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Modal handling functions
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="h-full flex">
      {/* Left Section */}
      <div className="w-1/2 h-screen -mx-5 -my-3 relative bg-[#EC3432] from-blue-400 to-purple-500 text-white flex items-start justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 mt-[12.5rem]">
            Your Wardrobe, Your Style
          </h1>
          <p className="text-lg mb-8">
            Create an account to shop exclusive, one-of-a-kind pieces.
          </p>
          <img
            src="https://i.pinimg.com/736x/14/ad/3e/14ad3ef35247043ed451152552009c0a.jpg"
            alt="Shopping Cart"
            className="mx-auto w-[26rem] absolute left-[20%] bottom-0"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6">Create new account</h2>
          <form onSubmit={handleSignup}>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                name="name"
                type="text"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#EC3432]"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#EC3432]"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Mobile Number</label>
              <input
                type="tel"
                name="mobile"
                maxLength={10}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#EC3432] appearance-none"
              />
            </div>
            <div className="mb-4 relative">
              <label className="block text-gray-700">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#EC3432]"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-2 text-sm text-gray-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <p
                className={`mt-2 text-sm ${
                  passwordStrength === "Strong"
                    ? "text-green-600"
                    : passwordStrength === "Medium"
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                {passwordStrength && `Password Strength: ${passwordStrength}`}
              </p>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!formValid}
              className={`w-full py-2 rounded-md transition ease-in-out duration-400 text-white ${
                formValid
                  ? "bg-[#EC3432] hover:bg-[#DC5739]"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Sign Up
            </button>
          </form>

          {/* Additional Links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              By registering, you agree to the{" "}
              <button onClick={openModal} className="text-[#EC3432] underline">
                Terms and Conditions
              </button>
              .
            </p>
            <p className="mt-4 text-gray-500">
              Already registered?{" "}
              <Link to={"/login"} className="text-[#EC3432] underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Terms and Conditions Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] h-[500px]">
            <div id="terms-and-conditions" class="p-4">
              <h1 class="text-3xl font-bold mb-4">Terms and Conditions</h1>
              <div className="w-full h-[400px] overflow-auto">
                <h2 class="text-2xl font-semibold mb-2">1. Introduction</h2>
                <p class="mb-4">
                  Welcome to <strong>POREM UDA</strong>! By registering an
                  account with us, you agree to abide by the following Terms and
                  Conditions. Please read these carefully before proceeding with
                  your registration.
                </p>

                <h2 class="text-2xl font-semibold mb-2">2. Eligibility</h2>
                <ul class="list-disc ml-6 mb-4">
                  <li>
                    You must be at least 18 years old to create an account.
                  </li>
                  <li>
                    You agree that all information provided during the signup
                    process is accurate and truthful.
                  </li>
                  <li>
                    You are responsible for maintaining the confidentiality of
                    your account credentials.
                  </li>
                </ul>

                <h2 class="text-2xl font-semibold mb-2">3. Account Usage</h2>
                <ul class="list-disc ml-6 mb-4">
                  <li>
                    You are solely responsible for all activities that occur
                    under your account.
                  </li>
                  <li>
                    You may not use your account for any illegal or unauthorized
                    purposes.
                  </li>
                  <li>
                    Any attempt to interfere with the security or proper
                    functioning of the website will result in immediate
                    termination of your account.
                  </li>
                </ul>

                <h2 class="text-2xl font-semibold mb-2">4. Privacy Policy</h2>
                <p class="mb-4">
                  We are committed to protecting your personal information. By
                  using our services, you agree to our
                  <a href="#" class="text-[#EC3432] underline">
                    Privacy Policy
                  </a>
                  , which explains how we collect, use, and disclose your data.
                </p>

                <h2 class="text-2xl font-semibold mb-2">
                  5. Intellectual Property
                </h2>
                <ul class="list-disc ml-6 mb-4">
                  <li>
                    All content, including text, images, logos, and software, is
                    the intellectual property of{" "}
                    <strong>[Your Company Name]</strong>.
                  </li>
                  <li>
                    You may not copy, modify, distribute, or reproduce any part
                    of the content without prior written consent.
                  </li>
                </ul>

                <h2 class="text-2xl font-semibold mb-2">
                  6. Product Availability
                </h2>
                <p class="mb-4">
                  Our products and services are subject to availability. We
                  reserve the right to discontinue or modify any part of our
                  offerings without notice.
                </p>

                <h2 class="text-2xl font-semibold mb-2">
                  7. Pricing and Payments
                </h2>
                <ul class="list-disc ml-6 mb-4">
                  <li>
                    Prices for our products are subject to change without
                    notice.
                  </li>
                  <li>
                    We accept various payment methods, and by placing an order,
                    you agree to the payment terms provided at checkout.
                  </li>
                </ul>

                <h2 class="text-2xl font-semibold mb-2">
                  8. Returns and Refunds
                </h2>
                <p class="mb-4">
                  We offer a 14-day return policy for most products. Refunds
                  will be processed according to our
                  <a href="#" class="text-[#EC3432] underline">
                    Refund Policy
                  </a>
                  , which outlines the conditions under which returns and
                  refunds are accepted.
                </p>

                <h2 class="text-2xl font-semibold mb-2">
                  9. Limitation of Liability
                </h2>
                <p class="mb-4">
                  We are not liable for any indirect, incidental, or
                  consequential damages arising from the use of our website or
                  products. Our liability in any case will be limited to the
                  amount paid for the product or service.
                </p>
                <button
                  onClick={closeModal}
                  className="bg-[#EC3432] text-white py-2 px-4 rounded-md hover:bg-[#DC5739]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignupPage;
