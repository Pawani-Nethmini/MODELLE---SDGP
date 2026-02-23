<<<<<<< HEAD
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useState } from "react";

// import Splash from "./components/Splash";

// /* Public pages */
// import LandingLayout from "./components/LandingPage/LandingLayout";
// import Home from "./pages/Home";
// import About from "./components/LandingPage/About";
// import Features from "./components/LandingPage/HowItWorks3D";
// import Contact from "./components/Footer";

// /* Auth pages */
// import LoginPage from "./pages/auth/LoginPage";
// import RegisterPage from "./pages/auth/register/RegisterSelectionPage";
// import RegisterCustomer from "./pages/auth/register/CustomerRegister";
// import RegisterPrinter from "./pages/auth/register/RegisterPrinter";
// import RegisterDesigner from "./pages/auth/register/DesignerRegister";

// /* role guard */
// import RoleGuard from "./components/common/RoleGuard";



// /* Customer layout & pages */
// import CustomerLayout from "./components/Customer/CustomerLayout";
// import CustomerDashboard from "./pages/customer/Dashboard";
// import STLValidationPage from "./pages/customer/STLValidationPage";
// import Printers from "./pages/customer/Printers";
// import Designers from "./pages/customer/Designers";
// import MyProjects from "./pages/customer/MyProjects";
// import MyOrders from "./pages/customer/MyOrders";
// import UserProfile from "./pages/customer/UserProfile";
// import ShowroomPage from "./pages/showroom/ShowroomPage";

// /* Printer pages */
// import PrinterLoginPage from "./pages/printer/PrinterLoginPage";



// export default function App() {
//   const [showSplash, setShowSplash] = useState(true);

//   if (showSplash) {
//     return <Splash onFinish={() => setShowSplash(false)} />;
//   }

//   return (
//     <BrowserRouter>
//       <Routes>

//         {/* PUBLIC / LANDING ROUTES */}
//         <Route element={<LandingLayout />}>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/features" element={<Features />} />
//           <Route path="/contact" element={<Contact />} />
//         </Route>


//         {/* AUTH ROUTES */}
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//         <Route path="/register-customer" element={<RegisterCustomer />} />
//         <Route path="/register-printer" element={<RegisterPrinter />} />
//         <Route path="/register-designer" element={<RegisterDesigner />} />

//         {/* CUSTOMER ROUTES */}
//         <Route path="/customer" element={<CustomerLayout />}>
//           <Route index element={<CustomerDashboard />} />
//           <Route path="upload-stl" element={<STLValidationPage />} />
//           <Route path="printers" element={<Printers />} />
//           <Route path="designers" element={<Designers />} />
//           <Route path="showroom" element={<ShowroomPage />} />
//           <Route path="my-projects" element={<MyProjects />} />
//           <Route path="my-orders" element={<MyOrders />} />
//           <Route path="profile" element={<UserProfile />} />
//         </Route>

//         {/* PRINTER ROUTES */}
//         <Route path="/printer-login" element={<PrinterLoginPage />} />

//       </Routes>
//     </BrowserRouter>
//   );
// }


import { BrowserRouter, Routes, Route } from "react-router-dom";
=======
>>>>>>> 898b3fa9580ff4931925b819aae21bbf66e3f4bf
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Splash from "./components/Splash";
<<<<<<< HEAD

/* Public pages */
import LandingLayout from "./components/LandingPage/LandingLayout";
import Home from "./pages/Home";
import About from "./components/LandingPage/About";
import Features from "./components/LandingPage/HowItWorks3D";
import Contact from "./components/Footer";

/* Auth pages */
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/register/RegisterSelectionPage";
import RegisterCustomer from "./pages/auth/register/CustomerRegister";
import RegisterPrinter from "./pages/auth/register/RegisterPrinter";
import RegisterDesigner from "./pages/auth/register/DesignerRegister";

/* Role Guard */
import RoleGuard from "./components/common/RoleGuard";

/* Customer layout & pages */
import CustomerLayout from "./components/Customer/CustomerLayout";
import CustomerDashboard from "./pages/customer/Dashboard";
=======
import IridescenceBackground from "./components/IridescenceBackground";
// Layouts
import LandingLayout from "./components/LandingLayout";
import CustomerLayout from "./components/CustomerLayout";
// Pages
import Home from "./pages/Home";
>>>>>>> 898b3fa9580ff4931925b819aae21bbf66e3f4bf
import STLValidationPage from "./pages/customer/STLValidationPage";
import Dashboard from "./pages/customer/Dashboard";
import Designers from "./pages/customer/Designers";
import MyOrders from "./pages/customer/MyOrders";
import MyProjects from "./pages/customer/MyProjects";
import Printers from "./pages/customer/Printers";
import UserProfile from "./pages/customer/UserProfile";
import ShowroomPage from "./pages/showroom/ShowroomPage";

/* Dummy dashboards (create simple pages for now) */
import PrinterDashboard from "./pages/printer/Dashboard";
import DesignerDashboard from "./pages/designer/Dashboard";


function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <Router>
      {/* Iridescence Background - Fixed behind all content */}
      <IridescenceBackground />

<<<<<<< HEAD
        {/* ================= PUBLIC ROUTES ================= */}
        <Route element={<LandingLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* ================= AUTH ROUTES ================= */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register/customer" element={<RegisterCustomer />} />
        <Route path="/register/printer" element={<RegisterPrinter />} />
        <Route path="/register/designer" element={<RegisterDesigner />} />

        {/* ================= CUSTOMER ROUTES ================= */}
        <Route
          path="/customer/*"
          element={
            <RoleGuard allowedRole="customer">
              <CustomerLayout />
            </RoleGuard>
          }
        >
          <Route index element={<CustomerDashboard />} />
          <Route path="upload-stl" element={<STLValidationPage />} />
          <Route path="printers" element={<Printers />} />
          <Route path="designers" element={<Designers />} />
          <Route path="showroom" element={<ShowroomPage />} />
          <Route path="my-projects" element={<MyProjects />} />
          <Route path="my-orders" element={<MyOrders />} />
          <Route path="profile" element={<UserProfile />} />
        </Route>

        {/* ================= PRINTER ROUTES ================= */}
        <Route
          path="/printer"
          element={
            <RoleGuard allowedRole="printer">
              <PrinterDashboard />
            </RoleGuard>
          }
        />

        {/* ================= DESIGNER ROUTES ================= */}
        <Route
          path="/designer"
          element={
            <RoleGuard allowedRole="designer">
              <DesignerDashboard />
            </RoleGuard>
          }
        />

      </Routes>
    </BrowserRouter>
=======
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
>>>>>>> 898b3fa9580ff4931925b819aae21bbf66e3f4bf
  );
}

export default App;