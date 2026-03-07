import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Splash from "./components/Splash";
import IridescenceBackground from "./components/IridescenceBackground";
// Layouts
import LandingLayout from "./components/LandingPage/LandingLayout";
import CustomerLayout from "./components/Customer/CustomerLayout";
// Pages
import Home from "./pages/Home";
// auth pages
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import RegisterSelectionPage from "./pages/auth/register/RegisterSelectionPage";
import CustomerRegister from "./pages/auth/register/CustomerRegister";
import DesignerRegister from "./pages/auth/register/DesignerRegister";
import RegisterPrinter from "./pages/auth/register/RegisterPrinter";

import STLValidationPage from "./pages/customer/STLValidationPage";
import Dashboard from "./pages/customer/Dashboard";
import Designers from "./pages/customer/Designers";
import MyOrders from "./pages/customer/MyOrders";
import MyProjects from "./pages/customer/MyProjects";
import Printers from "./pages/customer/Printers";
import UserProfile from "./pages/customer/UserProfile";
import ShowroomPage from "./pages/showroom/ShowroomPage";
import PrinterLayout from "./components/Printer/PrinterLayout";
import PrinterNotifications from "./pages/printer/Notifications";
import PrinterJobs from "./pages/printer/MyJobs";
import PrinterLoginPage from "./pages/printer/PrinterLoginPage";
import RoleGuard from "./components/common/RoleGuard";


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
            {/* Landing pages & auth */}
            <Route path="/" element={<LandingLayout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="printer-login" element={<PrinterLoginPage />} />
              <Route path="register" element={<SignupPage />} />
              <Route path="showroom" element={<ShowroomPage />} />
              {/* in case the selection page is used elsewhere */}
              <Route path="register/select" element={<RegisterSelectionPage />} />
              <Route path="register/customer" element={<CustomerRegister />} />
              <Route path="register/designer" element={<DesignerRegister />} />
              <Route path="register/printer" element={<RegisterPrinter />} />
            </Route>

            {/* Customer portal */}
            <Route path="/customer" element={<CustomerLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="showroom" element={<ShowroomPage />} />
              <Route path="upload-stl" element={<STLValidationPage />} />
              <Route path="printers" element={<Printers />} />
              <Route path="designers" element={<Designers />} />
              <Route path="my-projects" element={<MyProjects />} />
              <Route path="my-orders" element={<MyOrders />} />
              <Route path="profile" element={<UserProfile />} />
            </Route>

            {/* Printer portal (role-protected) */}
            <Route
              path="/printer"
              element={
                <RoleGuard allowedRole="printer">
                  <PrinterLayout />
                </RoleGuard>
              }
            >
              <Route index element={<PrinterNotifications />} />
              <Route path="jobs" element={<PrinterJobs />} />
              {/* Inbox to showroom button lives in layout nav */}
            </Route>
          </Routes>

          
        </div>
      )}
    </Router>
  );
}

export default App;