import { useState } from "react";
import STLUploadCard from "../components/STLUploadCard";
import InteractiveRobot from "../components/InteractiveRobot";
import STLValidatorPanel from "../components/STLValidatorPanel";

export default function STLValidationPage() {
  const [uploadedFile, setUploadedFile] = useState(null);
  return (
    <>

      {/* Robot section */}
      <section
        style={{
          height: "50vh",
          width: "100%",
          position: "relative",
          overflow: "hidden",
          pointerEvents: "none", 
          marginTop: "-150px"
        }}
      >
        <InteractiveRobot />
      </section>

        
      {/* Upload section */}
      {!uploadedFile && <STLUploadCard onFileUpload={setUploadedFile}/>}
      
      {/* validator panel with already uploaded file */}
      {uploadedFile && <STLValidatorPanel file={uploadedFile} />}
   
    </>
  );
}
