import PrinterNavbar from "./PrinterNavbar";
import { Outlet } from "react-router-dom";

export default function PrinterLayout() {
  return (
    <>
      <PrinterNavbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

