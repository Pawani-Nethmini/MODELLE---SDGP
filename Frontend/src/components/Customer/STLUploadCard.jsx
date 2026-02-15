import { useState } from "react";
import "../../styles/upload.css";
import CTA from "../CTA";
import STLValidatorPanel from "./STLValidatorPanel";

export default function STLUploadCard({ onFileUpload }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    validateFile(selectedFile);
  };

  const validateFile = (selectedFile) => {
    if (!selectedFile) return;

    if (!selectedFile.name.toLowerCase().endsWith(".stl")) {
      setError("Only STL files are allowed for now.");
      setFile(null);
      return;
    }

    if (selectedFile.size > 100 * 1024 * 1024) {
      setError("File size must be under 100MB.");
      setFile(null);
      return;
    }

    setError("");
    setFile(selectedFile);
  };

  return (
    <section className="upload-container">
      <h1>Upload Your STL File</h1>
      <p className="subtitle">
        Validate your 3D model and get printing insights
      </p>

      {/* SIDE-BY-SIDE LAYOUT */}
      <div className={`upload-validator-layout ${file && !error ? 'has-file' : ''}`}>
        
        {/* Upload Area */}
        <div className={`upload-section ${file && !error ? 'compact' : ''}`}>
          <label className="upload-box">
            <input type="file" accept=".stl" hidden onChange={handleFileChange} />

            <div className="upload-content">
              <img
                src="/upload-icon.png"
                alt="Upload STL"
                className="upload-icon"
              />
              <p>Upload your STL file here</p>
              <span className="hint">Only .STL files • Max 100MB</span>
            </div>
          </label>


          
          {error && <p className="error">{error}</p>}
        </div>

        {/* Validator Panel */}
        {file && !error && (
          <div className="validator-section">
              <STLValidatorPanel file={file} onFileUpload={onFileUpload} />
            </div>
        )}
      </div>
    </section>
  );
}