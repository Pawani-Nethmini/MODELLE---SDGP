// import { useState } from "react";
// import { createPortal } from "react-dom";
// import { useNavigate } from "react-router-dom";
// import "../styles/costEstimator.css";

// export default function CostEstimator({ file, onClose }) {
//   const navigate = useNavigate();

//   const [material, setMaterial] = useState("PLA");
//   const [technology, setTechnology] = useState("FDM");
//   const [infill, setInfill] = useState(20);
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleEstimate = async () => {
//     if (!file) {
//       alert("No STL file uploaded");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("stl_file", file);
//     formData.append("material", material);
//     formData.append("technology", technology);
//     formData.append("infill", infill / 100);

//     try {
//       setLoading(true);

//       const response = await fetch(
//         "http://127.0.0.1:8000/estimate-cost",
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       const data = await response.json();

//       if (!data.success) {
//         throw new Error(data.error || "Estimation failed");
//       }

//       setResult(data.cost_estimation);
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return createPortal(
//     <div className="cost-overlay">
//       <div className="cost-card">
//         <h2>Estimate Print Cost</h2>

//         <label>Material</label>
//         <select value={material} onChange={(e) => setMaterial(e.target.value)}>
//           <option>PLA</option>
//           <option>ABS</option>
//           <option>PETG</option>
//           <option>RESIN</option>
//         </select>

//         <label>Technology</label>
//         <select value={technology} onChange={(e) => setTechnology(e.target.value)}>
//           <option>FDM</option>
//           <option>SLA</option>
//           <option>SLS</option>
//         </select>

//         <label>Infill (%)</label>
//         <input
//           type="number"
//           min="10"
//           max="100"
//           value={infill}
//           onChange={(e) => setInfill(Number(e.target.value))}
//         />

//         <button onClick={handleEstimate}>
//           {loading ? "Estimating..." : "View Estimation"}
//         </button>

//         {result && (
//           <div className="cost-result">
//             <p><b>Total Cost:</b> LKR {result.total_cost}</p>
//           </div>
//         )}

//         <div className="cost-actions">
//           <button onClick={onClose}>Close</button>
//           <button onClick={() => navigate("/customer/printers")}>
//             Find a Printer
//           </button>
//         </div>
//       </div>
//     </div>,
//     document.body
//   );
// }

export default function CostEstimator({ onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.9)",
        color: "white",
        zIndex: 2147483647, // MAX POSSIBLE
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "40px"
      }}
    >
      <div>
        COST ESTIMATOR IS RENDERING
        <br />
        <button
          style={{ marginTop: "20px", fontSize: "20px" }}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
