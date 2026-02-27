import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import "../../styles/uploadModal.css";

export default function UploadModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { currentUser, role, loading } = useAuth();

  if (!isOpen) return null;

  const handleLoginClick = () => {
    navigate("/printer-login");
  };

  // not logged in or still determining state
  if (loading || !currentUser) {
    return (
      <div className="upload-modal-overlay" onClick={onClose}>
        <div className="upload-modal-card" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close-btn" onClick={onClose}>X</button>
          <div className="modal-content">
            <h2 className="modal-title">Upload Your Work</h2>
            <p className="modal-message">
              You need to be signed in as a printer to upload items to the showroom.
            </p>
            <button className="modal-login-btn" onClick={handleLoginClick}>
              Sign in
            </button>
          </div>
        </div>
      </div>
    );
  }

  // logged in but wrong role
  if (role !== "printer") {
    return (
      <div className="upload-modal-overlay" onClick={onClose}>
        <div className="upload-modal-card" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close-btn" onClick={onClose}>X</button>
          <div className="modal-content">
            <h2 className="modal-title">Access Denied</h2>
            <p className="modal-message">
              Only users with the <strong>printer</strong> role may upload to the showroom. Please request access or switch accounts.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // if we got here, user is a signed‑in printer; you can extend this later with an actual upload form
  return (
    <div className="upload-modal-overlay" onClick={onClose}>
      <div className="upload-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>X</button>
        <div className="modal-content">
          <h2 className="modal-title">Upload Your Work</h2>
          <p className="modal-message">
            ✨ You're good to go! (upload form not implemented yet)
          </p>
        </div>
      </div>
    </div>
  );
}