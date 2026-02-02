// PrintabilityReport.jsx
export default function PrintabilityReport({ result }) {
  if (!result) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <h2 style={styles.title}>Printability Analysis Report</h2>

        <div style={styles.topRow}>
          <div>
            <p style={styles.label}>System Status</p>
            <span style={styles.badge}>PASS WITH WARNINGS</span>
          </div>

          <div>
            <p style={styles.label}>Printability Score</p>
            <h1 style={styles.score}>{result.score || 74}%</h1>
          </div>

          <div>
            <p style={styles.label}>Selected Config</p>
            <span style={styles.config}>{result.profile}</span>
          </div>
        </div>

        <div style={styles.issueBox}>
          <h4>Thin Walls Detected</h4>
          <p>{result.issues?.thinWalls || "Some walls are below minimum thickness."}</p>
        </div>

        <div style={styles.issueBox}>
          <h4>Non-Manifold Geometry</h4>
          <p>{result.issues?.nonManifold || "Mesh contains open edges."}</p>
        </div>

        <div style={styles.issueBox}>
          <h4>Large Overhangs</h4>
          <p>{result.issues?.overhangs || "Supports required for steep angles."}</p>
        </div>

        <button style={styles.fixBtn}>⚡ AUTO FIX ALL ISSUES</button>
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
    maxWidth: "700px",
    background: "#0b0f14",
    borderRadius: "12px",
    padding: "20px",
    color: "#fff",
    border: "1px solid #1f2a36",
    boxShadow: "0 0 30px rgba(0,255,255,0.15)"
  },
  title: {
    fontSize: "1.4rem",
    marginBottom: "16px",
    color: "#00e5ff"
  },
  topRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px"
  },
  label: {
    fontSize: "12px",
    color: "#9aa4ad"
  },
  badge: {
    background: "#0a3d2e",
    padding: "6px 12px",
    borderRadius: "20px",
    color: "#00ffb3",
    fontSize: "12px"
  },
  score: {
    fontSize: "2.2rem",
    color: "#00e5ff"
  },
  config: {
    fontSize: "13px",
    color: "#00e5ff"
  },
  issueBox: {
    background: "#0f1620",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "10px",
    border: "1px solid #1f2a36"
  },
  fixBtn: {
    marginTop: "16px",
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#00e5ff",
    color: "#000",
    fontWeight: "600",
    cursor: "pointer"
  }
};
