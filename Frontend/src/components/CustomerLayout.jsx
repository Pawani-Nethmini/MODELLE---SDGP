import CustomerNavbar from "./CustomerNavbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function CustomerLayout() {
  return (
    <>
      <CustomerNavbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
