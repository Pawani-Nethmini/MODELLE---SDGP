import PrinterNavbar from "./PrinterNavbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import UploadModal from "../showroom/UploadModal";

export default function PrinterLayout() {
  const [showUpload, setShowUpload] = useState(false);

  return (
    <>
      <PrinterNavbar onUpload={() => setShowUpload(true)} />
      <main>
        <Outlet />
      </main>
      <UploadModal isOpen={showUpload} onClose={() => setShowUpload(false)} />
    </>
  );
}
