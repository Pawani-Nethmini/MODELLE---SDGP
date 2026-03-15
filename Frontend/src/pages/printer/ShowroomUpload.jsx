import { useEffect, useState, useMemo, useRef } from "react";
import { useAuth } from "../../context/useAuth";
import ShowroomGrid from "../../components/showroom/ShowroomGrid";
import ShowroomFilters from "../../components/showroom/ShowroomFilters";
import "../../styles/printerShowroom.css";
import { fetchShowroomItems, uploadShowroomItem } from "../../services/showroomService";

export default function PrinterShowroomPage() {
  const { currentUser } = useAuth();
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({});
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [newlyUploadedItemId, setNewlyUploadedItemId] = useState(null);
  const gridRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    printerType: "",
    printingMaterial: "",
    imageType: "",
    color: "",
    price: "",
    image: null
  });

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const data = await fetchShowroomItems(filters);
        if (!cancelled) setItems(data);
      } catch (err) {
        console.error("Failed to load showroom items", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [filters]);

  const filteredItems = useMemo(() => {
    if (!search.trim()) return items;
    return items.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [items, search]);

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

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      setUploadError("Please select an image file");
      return;
    }

    setUploading(true);
    setUploadError("");
    setUploadSuccess(false);

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

      const result = await uploadShowroomItem(uploadData);
      const newItem = result.item;
      
      setUploadSuccess(true);
      setNewlyUploadedItemId(newItem.id);
      
      setFormData({
        title: "",
        printerType: "",
        printingMaterial: "",
        imageType: "",
        color: "",
        price: "",
        image: null
      });

      // Reload items from backend
      try {
        const updatedItems = await fetchShowroomItems(filters);
        setItems(updatedItems);
      } catch (err) {
        console.error("Failed to refresh items:", err);
      }

      // Close form and clear new item indicator after 3 seconds
      setTimeout(() => {
        setShowUploadForm(false);
        setUploadSuccess(false);
        setNewlyUploadedItemId(null);
        
        // Scroll to grid
        if (gridRef.current) {
          gridRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 2000);
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="printer-showroom-page">
      <div className="showroom-header-section">
        <div className="header-content">
          <h1 className="header-title">Manage Your Showroom</h1>
          <p className="header-subtitle">Upload new creations and monitor your published items</p>
          <button 
            className="upload-trigger-btn"
            onClick={() => setShowUploadForm(!showUploadForm)}
          >
            {showUploadForm ? "Cancel" : "+ Upload New Item"}
          </button>
        </div>
      </div>

      {/* Upload Form Section */}
      {showUploadForm && (
        <div className="upload-form-section">
          <div className="upload-form-container">
            <h2 className="upload-form-title">Upload Your Creation</h2>
            
            <form onSubmit={handleUploadSubmit} className="printer-upload-form">
              {uploadError && (
                <div className="upload-error-banner">
                  ⚠️ {uploadError}
                </div>
              )}

              {uploadSuccess && (
                <div className="upload-success-banner">
                  ✓ Item uploaded successfully!
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="title">Item Title *</label>
                  <input
                    id="title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Low-Poly Submarine"
                    required
                    disabled={uploading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="color">Color</label>
                  <input
                    id="color"
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    placeholder="e.g., Red, Blue, White"
                    disabled={uploading}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="image">Image File * (jpg, jpeg, png, gif, webp, bmp, tiff, svg only)</label>
                <input
                  id="image"
                  type="file"
                  accept=".jpg,.jpeg,.png,.gif,.webp,.bmp,.tiff,.svg"
                  onChange={handleFileChange}
                  required
                  disabled={uploading}
                  className="file-input"
                />
                {formData.image && (
                  <p className="file-name">📷 {formData.image.name}</p>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="printerType">Printer Type *</label>
                  <select
                    id="printerType"
                    name="printerType"
                    value={formData.printerType}
                    onChange={handleInputChange}
                    required
                    disabled={uploading}
                  >
                    <option value="">Select printer type</option>
                    <option value="FDM">FDM</option>
                    <option value="SLA">SLA</option>
                    <option value="SLS">SLS</option>
                    <option value="DLP">DLP</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="printingMaterial">Material *</label>
                  <select
                    id="printingMaterial"
                    name="printingMaterial"
                    value={formData.printingMaterial}
                    onChange={handleInputChange}
                    required
                    disabled={uploading}
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
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="imageType">Category *</label>
                  <select
                    id="imageType"
                    name="imageType"
                    value={formData.imageType}
                    onChange={handleInputChange}
                    required
                    disabled={uploading}
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
                  <label htmlFor="price">Price (in cents) *</label>
                  <input
                    id="price"
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="e.g., 2500 for $25.00"
                    required
                    min="0"
                    disabled={uploading}
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="upload-form-submit-btn" 
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Publish to Showroom"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Showroom Items Section */}
      <div className="showroom-browse-section" ref={gridRef}>
        <h2 className="section-title">Community Showroom</h2>
        <p className="section-subtitle">View and browse items from other printers</p>
        
        {newlyUploadedItemId && (
          <div className="newly-uploaded-banner">
            ✨ Your item has been uploaded successfully!
          </div>
        )}
        
        <div className="showroom-content">
          <ShowroomFilters filters={filters} onChange={setFilters} onSearch={setSearch} />
          
          {loading ? (
            <div className="loading-message">Loading showroom items...</div>
          ) : (
            <>
              {filteredItems.length > 0 ? (
                <ShowroomGrid items={filteredItems} newlyUploadedItemId={newlyUploadedItemId} />
              ) : (
                <div className="empty-message">No items found. Try adjusting your filters.</div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
