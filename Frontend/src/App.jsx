import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import STLValidationPage from "./pages/STLValidationPage";
import Printers from "./pages/Printers";
import Designers from "./pages/Designers";
import MyProjects from "./pages/MyProjects";
import MyOrders from "./pages/MyOrders";
import UserProfile from "./pages/UserProfile";


function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
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

export default App;
