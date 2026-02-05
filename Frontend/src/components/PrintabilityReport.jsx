// // PrintabilityReport.jsx
// export default function PrintabilityReport({ result }) {
//   if (!result) return null;

//   return (
//     <div style={styles.overlay}>
//       <div style={styles.card}>
//         <h2 style={styles.title}>Printability Analysis Report</h2>

//         <div style={styles.topRow}>
//           <div>
//             <p style={styles.label}>System Status</p>
//             <span style={styles.badge}>PASS WITH WARNINGS</span>
//           </div>

//           <div>
//             <p style={styles.label}>Printability Score</p>
//             <h1 style={styles.score}>{result.score || 74}%</h1>
//           </div>

//           <div>
//             <p style={styles.label}>Selected Config</p>
//             <span style={styles.config}>{result.profile}</span>
//           </div>
//         </div>

//         <div style={styles.issueBox}>
//           <h4>Thin Walls Detected</h4>
//           <p>{result.issues?.thinWalls || "Some walls are below minimum thickness."}</p>
//         </div>

//         <div style={styles.issueBox}>
//           <h4>Non-Manifold Geometry</h4>
//           <p>{result.issues?.nonManifold || "Mesh contains open edges."}</p>
//         </div>

//         <div style={styles.issueBox}>
//           <h4>Large Overhangs</h4>
//           <p>{result.issues?.overhangs || "Supports required for steep angles."}</p>
//         </div>

//         <button style={styles.fixBtn}>⚡ AUTO FIX ALL ISSUES</button>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   overlay: {
//     marginTop: "2rem",
//     display: "flex",
//     justifyContent: "center"
//   },
//   card: {
//     width: "100%",
//     maxWidth: "700px",
//     background: "#0b0f14",
//     borderRadius: "12px",
//     padding: "20px",
//     color: "#fff",
//     border: "1px solid #1f2a36",
//     boxShadow: "0 0 30px rgba(0,255,255,0.15)"
//   },
//   title: {
//     fontSize: "1.4rem",
//     marginBottom: "16px",
//     color: "#00e5ff"
//   },
//   topRow: {
//     display: "flex",
//     justifyContent: "space-between",
//     marginBottom: "20px"
//   },
//   label: {
//     fontSize: "12px",
//     color: "#9aa4ad"
//   },
//   badge: {
//     background: "#0a3d2e",
//     padding: "6px 12px",
//     borderRadius: "20px",
//     color: "#00ffb3",
//     fontSize: "12px"
//   },
//   score: {
//     fontSize: "2.2rem",
//     color: "#00e5ff"
//   },
//   config: {
//     fontSize: "13px",
//     color: "#00e5ff"
//   },
//   issueBox: {
//     background: "#0f1620",
//     padding: "12px",
//     borderRadius: "8px",
//     marginBottom: "10px",
//     border: "1px solid #1f2a36"
//   },
//   fixBtn: {
//     marginTop: "16px",
//     width: "100%",
//     padding: "12px",
//     borderRadius: "8px",
//     border: "none",
//     background: "#00e5ff",
//     color: "#000",
//     fontWeight: "600",
//     cursor: "pointer"
//   }
// };


// PrintabilityReport.jsx
export default function PrintabilityReport({ result }) {
  if (!result) return null;

  // Calculate printability score based on issues
  const calculateScore = () => {
    if (!result.issues || result.issues.length === 0) return 100;
    
    const errorCount = result.issues.filter(issue => issue.type === "error").length;
    const warningCount = result.issues.filter(issue => issue.type === "warning").length;
    
    // Each error reduces score by 20%, each warning by 5%
    const score = Math.max(0, 100 - (errorCount * 20) - (warningCount * 5));
    return Math.round(score);
  };

  // Determine overall status
  const getStatus = () => {
    if (!result.printable) return { text: "FAILED", color: "#ff4444", bgColor: "#3d0a0a" };
    
    const hasWarnings = result.issues.some(issue => issue.type === "warning");
    if (hasWarnings) return { text: "PASS WITH WARNINGS", color: "#ffa500", bgColor: "#3d2a0a" };
    
    return { text: "FULLY PRINTABLE", color: "#00ffb3", bgColor: "#0a3d2e" };
  };

  const score = calculateScore();
  const status = getStatus();

  // Group issues by category
  const stlIssues = result.issues.filter(issue => issue.category === "stl_geometry");
  const printerIssues = result.issues.filter(issue => issue.category === "printer_compatibility");

  // Get score color
  const getScoreColor = (score) => {
    if (score >= 80) return "#00ffb3";
    if (score >= 60) return "#ffa500";
    return "#ff4444";
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <h2 style={styles.title}> Printability Analysis Report</h2>

        {/* Top Summary Row */}
        <div style={styles.topRow}>
          <div>
            <p style={styles.label}>System Status</p>
            <span style={{
              ...styles.badge,
              color: status.color,
              background: status.bgColor
            }}>
              {status.text}
            </span>
          </div>

          <div>
            <p style={styles.label}>Printability Score</p>
            <h1 style={{
              ...styles.score,
              color: getScoreColor(score)
            }}>
              {score}%
            </h1>
          </div>

          <div>
            <p style={styles.label}>Selected Printer</p>
            <span style={styles.config}>
              {result.details?.printer_id || "Unknown"}
            </span>
          </div>
        </div>

        {/* Model Details */}
        {result.details && (
          <div style={styles.detailsBox}>
            <h4 style={styles.sectionTitle}>📐 Model Information</h4>
            <div style={styles.detailsGrid}>
              <div>
                <span style={styles.detailLabel}>Dimensions (mm):</span>
                <span style={styles.detailValue}>
                  {result.details.dimensions.x.toFixed(2)} × {result.details.dimensions.y.toFixed(2)} × {result.details.dimensions.z.toFixed(2)}
                </span>
              </div>
              <div>
                <span style={styles.detailLabel}>Triangles:</span>
                <span style={styles.detailValue}>{result.details.stats.faces.toLocaleString()}</span>
              </div>
              <div>
                <span style={styles.detailLabel}>Vertices:</span>
                <span style={styles.detailValue}>{result.details.stats.vertices.toLocaleString()}</span>
              </div>
              <div>
                <span style={styles.detailLabel}>Volume:</span>
                <span style={styles.detailValue}>{result.details.stats.volume.toFixed(4)} mm³</span>
              </div>
            </div>
          </div>
        )}

        {/* STL Geometry Issues */}
        {stlIssues.length > 0 && (
          <div style={styles.categorySection}>
            <h4 style={styles.sectionTitle}>⚠️ STL Geometry Issues</h4>
            {stlIssues.map((issue, index) => (
              <div 
                key={index} 
                style={{
                  ...styles.issueBox,
                  borderLeft: `3px solid ${issue.type === "error" ? "#ff4444" : "#ffa500"}`
                }}
              >
                <div style={styles.issueHeader}>
                  <span style={{
                    ...styles.issueType,
                    color: issue.type === "error" ? "#ff4444" : "#ffa500"
                  }}>
                    {issue.type === "error" ? "❌ ERROR" : "⚠️ WARNING"}
                  </span>
                </div>
                <p style={styles.issueMessage}>{issue.message}</p>
              </div>
            ))}
          </div>
        )}

        {/* Printer Compatibility Issues */}
        {printerIssues.length > 0 && (
          <div style={styles.categorySection}>
            <h4 style={styles.sectionTitle}>🖨️ Printer Compatibility Issues</h4>
            {printerIssues.map((issue, index) => (
              <div 
                key={index} 
                style={{
                  ...styles.issueBox,
                  borderLeft: `3px solid ${issue.type === "error" ? "#ff4444" : "#ffa500"}`
                }}
              >
                <div style={styles.issueHeader}>
                  <span style={{
                    ...styles.issueType,
                    color: issue.type === "error" ? "#ff4444" : "#ffa500"
                  }}>
                    {issue.type === "error" ? "❌ ERROR" : "⚠️ WARNING"}
                  </span>
                </div>
                <p style={styles.issueMessage}>{issue.message}</p>
              </div>
            ))}
          </div>
        )}

        {/* No Issues - Success Message */}
        {result.issues.length === 0 && (
          <div style={styles.successBox}>
            <h4 style={styles.successTitle}>✅ Perfect! Your model is fully printable</h4>
            <p style={styles.successMessage}>
              No geometry issues or printer compatibility problems detected. 
              This model is ready for slicing and printing.
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div style={styles.buttonRow}>
          {result.issues.length > 0 && (
            <button style={styles.fixBtn}>
              ⚡ AUTO FIX ISSUES
            </button>
          )}
          <button style={styles.downloadBtn}>
            📥 DOWNLOAD REPORT
          </button>
          {result.printable && (
            <button style={styles.proceedBtn}>
              ✓ PROCEED TO SLICING
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    marginTop: "2rem",
    display: "flex",
    justifyContent: "center"
  },
  card: {
    width: "100%",
    maxWidth: "900px",
    background: "#0b0f14",
    borderRadius: "12px",
    padding: "24px",
    color: "#fff",
    border: "1px solid #1f2a36",
    boxShadow: "0 0 30px rgba(0,255,255,0.15)"
  },
  title: {
    fontSize: "1.6rem",
    marginBottom: "20px",
    color: "#00e5ff",
    fontWeight: "600"
  },
  topRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
    marginBottom: "24px",
    padding: "16px",
    background: "#0f1620",
    borderRadius: "8px",
    border: "1px solid #1f2a36"
  },
  label: {
    fontSize: "12px",
    color: "#9aa4ad",
    marginBottom: "8px",
    fontWeight: "500"
  },
  badge: {
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    textTransform: "uppercase"
  },
  score: {
    fontSize: "2.4rem",
    fontWeight: "700",
    margin: "0"
  },
  config: {
    fontSize: "14px",
    color: "#00e5ff",
    fontWeight: "500",
    textTransform: "uppercase"
  },
  detailsBox: {
    background: "#0f1620",
    padding: "16px",
    borderRadius: "8px",
    marginBottom: "20px",
    border: "1px solid #1f2a36"
  },
  sectionTitle: {
    fontSize: "1rem",
    color: "#00e5ff",
    marginBottom: "12px",
    fontWeight: "600"
  },
  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "12px"
  },
  detailLabel: {
    color: "#9aa4ad",
    fontSize: "13px",
    marginRight: "8px"
  },
  detailValue: {
    color: "#fff",
    fontSize: "13px",
    fontWeight: "500"
  },
  categorySection: {
    marginBottom: "20px"
  },
  issueBox: {
    background: "#0f1620",
    padding: "14px",
    borderRadius: "8px",
    marginBottom: "10px",
    border: "1px solid #1f2a36"
  },
  issueHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px"
  },
  issueType: {
    fontSize: "11px",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
  },
  issueMessage: {
    fontSize: "14px",
    color: "#e0e0e0",
    margin: "0",
    lineHeight: "1.6"
  },
  successBox: {
    background: "linear-gradient(135deg, rgba(0, 255, 179, 0.1), rgba(0, 229, 255, 0.05))",
    padding: "20px",
    borderRadius: "8px",
    border: "1px solid rgba(0, 255, 179, 0.3)",
    marginBottom: "20px"
  },
  successTitle: {
    color: "#00ffb3",
    fontSize: "1.1rem",
    marginBottom: "8px"
  },
  successMessage: {
    color: "#e0e0e0",
    fontSize: "14px",
    margin: "0",
    lineHeight: "1.6"
  },
  buttonRow: {
    display: "flex",
    gap: "12px",
    marginTop: "20px",
    flexWrap: "wrap"
  },
  fixBtn: {
    flex: "1",
    minWidth: "200px",
    padding: "12px 20px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(135deg, #ff4444, #cc0000)",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "14px",
    transition: "transform 0.2s, box-shadow 0.2s",
    ":hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(255, 68, 68, 0.3)"
    }
  },
  downloadBtn: {
    flex: "1",
    minWidth: "200px",
    padding: "12px 20px",
    borderRadius: "8px",
    border: "1px solid #00e5ff",
    background: "transparent",
    color: "#00e5ff",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.2s"
  },
  proceedBtn: {
    flex: "1",
    minWidth: "200px",
    padding: "12px 20px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(135deg, #00ffb3, #00e5ff)",
    color: "#000",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "14px",
    transition: "transform 0.2s, box-shadow 0.2s"
  }
};