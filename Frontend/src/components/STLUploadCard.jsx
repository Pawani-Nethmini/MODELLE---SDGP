import { useState } from "react";
import "../styles/upload.css";
import CTA from "./CTA";
import STLValidatorPanel from "./STLValidatorPanel";



export default function STLUploadCard({onFileUpload}) {
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

      <label className="upload-box">
        <input type="file" accept=".stl" hidden onChange={handleFileChange} />

        <div className="upload-content">
          <img
            src="/upload-icon.png"
            alt="Upload STL"
            className="upload-icon" />


          <p>Upload your STL file here</p>
          <span className="hint">Only .STL files • Max 100MB</span>
        </div>
      </label>
      

      {/* {file && <p className="success">File selected: {file.name}</p>} */}
      {/* {file && (
        <div className="file-info">
          <p className="success">File selected: {file.name}</p>
          <p className="file-size">Size: {(file.size / 1024).toFixed(2)} KB</p>
        </div>
      )} */}
      {error && <p className="error">{error}</p>}

      {/* show buttons when the file is uploaded and valid */}
      {/* {file && !error && (
        <div className="action-buttons">
          <CTA 
          text="Check Printability" 
          variant="secondary" 
          onClick={() => onFileUpload(file)} />
          <CTA text="Estimate Print Cost" variant="secondary" onClick={() => console.log("Estimate cost")} />
        </div>
      )} */}
      {file && !error && <STLValidatorPanel file={file} />}
    </section>
  );
}
