import { Route, Routes, Navigate, useLocation } from "react-router-dom";

import Navbar from "./components/partials/Navbar";
import HomePage from "./pages/HomePage";
import Footer from "./components/partials/Footer";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProductsPage from "./pages/ProductsPage";
import VerifyOtp from "./components/VerifyOtp";

function App() {
  const location = useLocation();

  return (
    <div className="bg-[#FFFEFE] px-5 py-3 w-[100vw] relative">
      {location.pathname !== "/login" && location.pathname !== "/signup" && (
        <Navbar />
      )}
      <div>
        <div className="relative z-50 w-full h-full">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />}>
              <Route path="verify-otp" element={<VerifyOtp />} />
            </Route>

            <Route path="/" element={<HomePage />} />
            <Route path="/products/:category" element={<ProductsPage />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default App;
