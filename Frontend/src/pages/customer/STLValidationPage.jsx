import { useState } from "react";
import STLUploadCard from "../../components/STLUploadCard";
import InteractiveRobot from "../../components/InteractiveRobot";
import STLValidatorPanel from "../../components/STLValidatorPanel";
import CostEstimator from "../../components/CostEstimator";
import "../../styles/stlValidator.css";

export default function STLValidationPage() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [showCostEstimator, setShowCostEstimator] = useState(false);

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
          marginTop: "-150px",
        }}
      >
        <InteractiveRobot />
      </section>

      {/* Upload section */}
      {!uploadedFile && (
        <STLUploadCard onFileUpload={setUploadedFile} />
      )}

      {/* SINGLE validator panel */}
      {uploadedFile && (
        <STLValidatorPanel
          file={uploadedFile}
          onEstimateCost={() => setShowCostEstimator(true)}
        />
      )}

      {/* Cost estimator modal */}
      {showCostEstimator && (
        <CostEstimator
          onClose={() => setShowCostEstimator(false)}
        />
      )}
    </>
  );
}
