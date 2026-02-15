import { useState } from "react";
import STLUploadCard from "../../components/Customer/STLUploadCard";
import InteractiveRobot from "../../components/InteractiveRobot";
import STLValidatorPanel from "../../components/Customer/STLValidatorPanel";
import BackgroundShapes from "../../components/BackgroundShapes";

import "../../styles/stlValidator.css";

export default function STLValidationPage() {
  const [uploadedFile, setUploadedFile] = useState(null);

  return (
    <>
      {/* <BackgroundShapes /> */}
      <section
        style={{
          height: "50vh",
          width: "100%",
          position: "relative",
          overflow: "hidden",
          pointerEvents: "none",
          marginTop: "-150px",
        }}      >
        <InteractiveRobot />
      </section>

      {!uploadedFile && (
        <STLUploadCard onFileUpload={setUploadedFile} />
      )}

      {uploadedFile && (
        <STLValidatorPanel file={uploadedFile} />
      )}
    </>
  );
}
