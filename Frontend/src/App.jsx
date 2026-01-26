import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { useState } from "react";
import Home from "./pages/Home";
import STLValidationPage from "./pages/STLValidationPage";
import Printers from "./pages/Printers";
import Designers from "./pages/Designers";
import MyProjects from "./pages/MyProjects";
import MyOrders from "./pages/MyOrders";
import UserProfile from "./pages/UserProfile";
import Splash from "./components/Splash";
import About from "./components/About";
import Features from "./components/HowItWorks3D";
import Contact from "./components/Footer";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <Splash onFinish={() => setShowSplash(false)} />;
  }
  return (
    <BrowserRouter> 
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/upload-stl" element={<STLValidationPage />} />
          <Route path="/printers" element={<Printers />} />
          <Route path="/designers" element={<Designers />} />
          <Route path="/my-projects" element={<MyProjects />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/user-profile" element={<UserProfile />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

