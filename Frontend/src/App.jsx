import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Splash from "./components/Splash";
import IridescenceBackground from "./components/IridescenceBackground";
// Layouts
import LandingLayout from "./components/LandingLayout";
import CustomerLayout from "./components/CustomerLayout";
// Pages
import Home from "./pages/Home";
import STLValidationPage from "./pages/customer/STLValidationPage";
import Dashboard from "./pages/customer/Dashboard";
import Designers from "./pages/customer/Designers";
import MyOrders from "./pages/customer/MyOrders";
import MyProjects from "./pages/customer/MyProjects";
import Printers from "./pages/customer/Printers";
import UserProfile from "./pages/customer/UserProfile";


function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <Router>
      {/* Iridescence Background - Fixed behind all content */}
      <IridescenceBackground />

      {/* Splash Screen */}
      {showSplash && <Splash onFinish={() => setShowSplash(false)} />}

      {/* Main Content */}
      {!showSplash && (
        <div className="home-wrapper visible">
          <Routes>
            {/* Landing pages */}
            <Route path="/" element={<LandingLayout />}>
              <Route index element={<Home />} />
            </Route>

            {/* Customer portal */}
            <Route path="/customer" element={<CustomerLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="upload-stl" element={<STLValidationPage />} />
              <Route path="printers" element={<Printers />} />
              <Route path="designers" element={<Designers />} />
              <Route path="my-projects" element={<MyProjects />} />
              <Route path="my-orders" element={<MyOrders />} />
              <Route path="profile" element={<UserProfile />} />
            </Route>
          </Routes>

          
        </div>
      )}
    </Router>
  );
}

export default App;