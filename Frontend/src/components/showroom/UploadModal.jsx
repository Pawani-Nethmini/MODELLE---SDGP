import { useNavigate } from "react-router-dom";
import "../../styles/uploadModal.css";

export default function UploadModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLoginClick = () => {
    navigate("/printer-login");
  };

  return (
    <div className="upload-modal-overlay" onClick={onClose}>
      <div className="upload-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
            X
        </button>

        <div className="modal-content">

          <h2 className="modal-title">Upload Your Work</h2>
          <p className="modal-message">Please login as a Printer to showcase your incredible 3D print creations in the community showroom.</p>

          <button className="modal-login-btn" onClick={handleLoginClick}>
            Login as a Printer
          </button>
        </div>
      </div>
    </div>
  );
}