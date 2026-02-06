import { useState } from "react";
import STLUploadCard from "../../components/STLUploadCard";
import InteractiveRobot from "../../components/InteractiveRobot";
import STLValidatorPanel from "../../components/STLValidatorPanel";
import "../../styles/stlValidator.css";

export default function STLValidationPage() {
  const [uploadedFile, setUploadedFile] = useState(null);

  return (
    <>
      <section
        style={{
          height: "50vh",
          width: "100%",
          position: "relative",
          overflow: "hidden",
          pointerEvents: "none",
          marginTop: "-150px",
        }}
      >
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
