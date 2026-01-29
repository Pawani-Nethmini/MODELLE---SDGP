import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Splash from "./components/Splash";

/* Public pages */
import LandingLayout from "./components/LandingLayout";
import Home from "./pages/Home";
import About from "./components/About";
import Features from "./components/HowItWorks3D";
import Contact from "./components/Footer";

/* Customer layout & pages */
import CustomerLayout from "./components/CustomerLayout";
import CustomerDashboard from "./pages/customer/Dashboard";
import STLValidationPage from "./pages/customer/STLValidationPage";
import Printers from "./pages/customer/Printers";
import Designers from "./pages/customer/Designers";
import MyProjects from "./pages/customer/MyProjects";
import MyOrders from "./pages/customer/MyOrders";
import UserProfile from "./pages/customer/UserProfile";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <Splash onFinish={() => setShowSplash(false)} />;
  }

  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC / LANDING ROUTES */}
        <Route element={<LandingLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/contact" element={<Contact />} />
        </Route>


        {/* CUSTOMER ROUTES */}
        <Route path="/customer" element={<CustomerLayout />}>
          <Route index element={<CustomerDashboard />} />
          <Route path="upload-stl" element={<STLValidationPage />} />
          <Route path="printers" element={<Printers />} />
          <Route path="designers" element={<Designers />} />
          <Route path="my-projects" element={<MyProjects />} />
          <Route path="my-orders" element={<MyOrders />} />
          <Route path="profile" element={<UserProfile />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
