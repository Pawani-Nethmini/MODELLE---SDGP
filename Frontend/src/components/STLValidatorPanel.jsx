import { useState } from "react";
import "../theme/theme.css";
import CTA from "./CTA";

export default function STLValidatorPanel({ file }) {
  const [purpose, setPurpose] = useState("");
  const [printerProfile, setPrinterProfile] = useState("");
  const [availablePrinters, setAvailablePrinters] = useState([]);

  const purposes = [
    {
      value: "prototype",
      label: "Prototype / Hobby",
      suggestedPrinters: ["fdm_desktop", "sla_desktop"]
    },
    {
      value: "functional",
      label: "Functional / Mechanical",
      suggestedPrinters: ["fdm_industrial", "sls_industrial", "sla_industrial"]
    },
    {
      value: "art",
      label: "Art / Decorative",
      suggestedPrinters: ["sla_desktop", "sla_industrial"]
    },
    {
      value: "large",
      label: "Large Models / Industrial Part",
      suggestedPrinters: ["fdm_industrial", "sls_industrial", "sla_industrial"]
    }
  ];

  const printerProfileMap = {
    fdm_desktop: "FDM Desktop",
    sla_desktop: "SLA Desktop",
    fdm_industrial: "FDM Industrial",
    sla_industrial: "SLA Industrial",
    sls_industrial: "SLS Industrial"
  };

  const handlePurposeChange = (e) => {
    const selected = purposes.find(p => p.value === e.target.value);
    if (!selected) return;

    setPurpose(selected.value);
    setAvailablePrinters(selected.suggestedPrinters);
    setPrinterProfile(selected.suggestedPrinters[0]);
  };

  return (
    <>
      <div style={styles.container}>
        {/* LEFT COLUMN */}
        <div style={styles.column}>
          <h2 className="header-gradient" style={styles.heading}>Uploaded STL File</h2>

          <p style={styles.text}>Name: {file?.name || "No file selected"}</p>
          <p style={styles.text}>
            Size: {file ? (file.size / 1024 / 1024).toFixed(2) : "0.00"} MB
          </p>

          <div style={styles.preview}>
            <div style={styles.previewContent}>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
              <span style={styles.previewText}>3D Model Preview</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div style={styles.column}>
          <h2 className="header-gradient" style={styles.heading}>Model Purpose</h2>

          <select
            value={purpose}
            onChange={handlePurposeChange}
            style={styles.select}
          >
            <option value="">Select model purpose</option>
            {purposes.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>

          <h3 style={styles.subHeading}>Suggested Printer Profile</h3>

          <select
            value={printerProfile}
            onChange={(e) => setPrinterProfile(e.target.value)}
            disabled={!purpose}
            style={{
              ...styles.select,
              opacity: purpose ? 1 : "var(--opacity-disabled)",
              cursor: purpose ? "var(--cursor-pointer)" : "var(--cursor-disabled)"
            }}
          >
            <option value="">Select a Printer Profile</option>
            {availablePrinters.map((profileId) => (
              <option key={profileId} value={profileId}>
                {printerProfileMap[profileId]}
              </option>
            ))}
          </select>

          {purpose && printerProfile && (
            <div style={styles.selectedInfo}>
              <p style={styles.infoLabel}>Selected Configuration:</p>
              <p style={styles.infoValue}>
                {purposes.find(p => p.value === purpose)?.label}
              </p>
              <p style={styles.infoValue}>
                {printerProfileMap[printerProfile]}
              </p>
            </div>
          )}
        </div>
      </div>
      <div style={{display:"flex",justifyContent: "center", marginBottom: "2rem"}}>
        <CTA 
          text="Check Printability" 
          variant="secondary" 
          onClick={() => onFileUpload(file)} />
        <CTA text="Estimate Print Cost" variant="secondary" onClick={() => console.log("Estimate cost")} />

      </div>
      

      <style>{`
        .header-gradient {
          background: var(--header-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </>
  );
}

const styles = {
  container: {
    display: "flex",
    gap: "24px",
    padding: "24px",
    background: "var(--bg-main)",
    backgroundSize: "400% 400%",
    animation: "gradientShift 15s ease infinite",
    color: "var(--text-primary)",
    borderRadius: "12px",
    maxWidth: "900px",
    margin: "3rem auto",
    boxShadow: "var(--shadow-card)"
  },
  column: {
    flex: 1,
    backgroundColor: "var(--bg-surface)",
    padding: "20px",
    borderRadius: "10px",
    border: "1px solid var(--border-color)",
    boxShadow: "var(--shadow-glow)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease"
  },
  heading: {
    fontSize: "1.5rem",
    marginBottom: "1rem",
    fontWeight: "600"
  },
  text: {
    fontSize: "14px",
    marginBottom: "8px",
    color: "var(--text-secondary)"
  },
  preview: {
    marginTop: "16px",
    height: "180px",
    border: "2px dashed var(--border-color-dashed)",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "var(--bg-translucent)",
    transition: "all 0.3s ease"
  },
  previewContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    color: "var(--text-muted)"
  },
  previewText: {
    fontSize: "14px"
  },
  select: {
    width: "100%",
    padding: "10px",
    marginTop: "8px",
    marginBottom: "16px",
    borderRadius: "6px",
    border: "1px solid var(--border-color)",
    backgroundColor: "var(--bg-surface)",
    color: "var(--text-primary)",
    outline: "none",
    transition: "all 0.3s ease",
    cursor: "var(--cursor-pointer)"
  },
  subHeading: {
    marginTop: "16px",
    marginBottom: "6px",
    fontSize: "16px",
    fontWeight: "500",
    color: "var(--text-secondary)"
  },
  selectedInfo: {
    marginTop: "20px",
    padding: "16px",
    backgroundColor: "var(--bg-translucent)",
    borderRadius: "8px",
    border: "1px solid var(--border-color-subtle)"
  },
  infoLabel: {
    fontSize: "12px",
    color: "var(--text-muted)",
    marginBottom: "8px",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
  },
  infoValue: {
    fontSize: "14px",
    color: "var(--text-secondary)",
    marginBottom: "4px"
  }
};