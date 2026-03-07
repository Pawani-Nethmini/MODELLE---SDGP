import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { uploadShowroomItem } from "../../services/showroomService";
import "../../styles/uploadModal.css";

export default function UploadModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { currentUser, role, loading } = useAuth();
  
  const [formData, setFormData] = useState({
    title: "",
    printerType: "",
    printingMaterial: "",
    imageType: "",
    color: "",
    price: "",
    image: null
  });
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleLoginClick = () => {
    navigate("/printer-login");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      image: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      setError("Please select an image file");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const uploadData = new FormData();
      uploadData.append("image", formData.image);
      uploadData.append("printer_type", formData.printerType);
      uploadData.append("printing_material", formData.printingMaterial);
      uploadData.append("image_type", formData.imageType);
      uploadData.append("title", formData.title);
      uploadData.append("color", formData.color);
      uploadData.append("price", parseFloat(formData.price));
      uploadData.append("printer_id", currentUser.uid);

      await uploadShowroomItem(uploadData);
      onClose();
      // Optionally refresh the showroom items
      window.location.reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
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
              Sign in as Printer
            </button>
          </div>
        </div>
      </div>
    );
  }

  // logged in but wrong role - redirect to printer login
  if (role !== "printer") {
    return (
      <div className="upload-modal-overlay" onClick={onClose}>
        <div className="upload-modal-card" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close-btn" onClick={onClose}>X</button>
          <div className="modal-content">
            <h2 className="modal-title">Access Denied</h2>
            <p className="modal-message">
              Only users with the <strong>printer</strong> role may upload to the showroom. Please sign in with a printer account.
            </p>
            <button className="modal-login-btn" onClick={handleLoginClick}>
              Sign in as Printer
            </button>
          </div>
        </div>
      </div>
    );
  }

  // if we got here, user is a signed-in printer; show upload form
  return (
    <div className="upload-modal-overlay" onClick={onClose}>
      <div className="upload-modal-card upload-form-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>X</button>
        <div className="modal-content">
          <h2 className="modal-title">Upload Your Work</h2>
          
          <form onSubmit={handleSubmit} className="upload-form">
            {error && (
              <div className="auth-error" style={{ marginBottom: "1rem" }}>
                ⚠️ {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="title">Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="Enter item title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">Image File *</label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="printerType">Printer Type *</label>
              <select
                id="printerType"
                name="printerType"
                value={formData.printerType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select printer type</option>
                <option value="FDM">FDM</option>
                <option value="SLA">SLA</option>
                <option value="SLS">SLS</option>
                <option value="DLP">DLP</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="printingMaterial">Printing Material *</label>
              <select
                id="printingMaterial"
                name="printingMaterial"
                value={formData.printingMaterial}
                onChange={handleInputChange}
                required
              >
                <option value="">Select material</option>
                <option value="PLA">PLA</option>
                <option value="ABS">ABS</option>
                <option value="PETG">PETG</option>
                <option value="TPU">TPU</option>
                <option value="Nylon">Nylon</option>
                <option value="Resin">Resin</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="imageType">Type of Image *</label>
              <select
                id="imageType"
                name="imageType"
                value={formData.imageType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select category</option>
                <option value="Toys">Toys</option>
                <option value="Home Decor">Home Decor</option>
                <option value="Furniture">Furniture</option>
                <option value="Prototypes">Prototypes</option>
                <option value="Tools">Tools</option>
                <option value="Art">Art</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="color">Color</label>
              <input
                type="text"
                id="color"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                placeholder="e.g., Red, Blue, White"
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price (in cents) *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                min="0"
                placeholder="e.g., 2500 for $25.00"
              />
            </div>

            <button 
              type="submit" 
              className="upload-submit-btn" 
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload Item"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}