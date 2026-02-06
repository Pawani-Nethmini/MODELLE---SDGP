import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/costEstimator.css";

export default function CostEstimator({ file, onClose }) {
  const navigate = useNavigate();

  const [material, setMaterial] = useState("PLA");
  const [technology, setTechnology] = useState("FDM");
  const [infill, setInfill] = useState(20);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEstimate = async () => {
    if (!file) {
      alert("No STL file uploaded");
      return;
    }

    const formData = new FormData();
    formData.append("stl_file", file);
    formData.append("material", material);
    formData.append("technology", technology);
    formData.append("infill", infill / 100);

    try {
      setLoading(true);

      const response = await fetch("http://127.0.0.1:8000/estimate-cost", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Estimation failed");
      }

      setResult({
        ...data.cost_estimation,
        material,
        technology,
        infill,
      });
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cost-inline">
      <div className="cost-card">
        <h2>Estimate Print Cost</h2>

        <label>Material</label>
        <select value={material} onChange={(e) => setMaterial(e.target.value)}>
          <option>PLA</option>
          <option>ABS</option>
          <option>PETG</option>
          <option>RESIN</option>
        </select>

        <label>Technology</label>
        <select value={technology} onChange={(e) => setTechnology(e.target.value)}>
          <option>FDM</option>
          <option>SLA</option>
          <option>SLS</option>
        </select>

        <label>Infill (%)</label>
        <input
          type="number"
          min="10"
          max="100"
          value={infill}
          onChange={(e) => setInfill(Number(e.target.value))}
        />

        <button className="cost-estimate-btn" onClick={handleEstimate} disabled={loading}>
          {loading ? "Estimating..." : "View Print Cost"}
        </button>

        {result && (
          <div className="cost-report">
            <h3>Print Cost Report</h3>
            <div className="report-grid">
              <div className="report-item">
                <label>Selected Material</label>
                <span>{result.material}</span>
              </div>
              <div className="report-item">
                <label>Infill Percentage</label>
                <span>{result.infill * 100}%</span>
              </div>
              <div className="report-item">
                <label>Printer Technology</label>
                <span>{result.technology}</span>
              </div>
              <div className="report-item highlight">
                <label>Estimated Cost</label>
                <span className="cost-value">LKR {result.total_cost}</span>
              </div>
            </div>
          </div>
        )}

        <div className="cost-actions">
          <button onClick={onClose}>Close</button>
          <button onClick={() => navigate("/customer/printers")}>Find a Printer</button>
        </div>
      </div>
    </div>
  );
}
