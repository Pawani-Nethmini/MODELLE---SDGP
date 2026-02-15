// Frontend/src/components/MetricsEstimationPanel.jsx
import { useEffect, useMemo, useState } from "react";
import { computeSTLMetrics, loadSTLGeometryFromFile } from "../utils/stlMetrics";

export default function MetricsEstimationPanel({ file, onClose }) {
  const [material, setMaterial] = useState("PLA");
  const [infillPercent, setInfillPercent] = useState(20);
  const [wallThicknessMm, setWallThicknessMm] = useState(1.2);
  const [filamentDiameterMm, setFilamentDiameterMm] = useState(1.75);
  const [overhangAngleDeg, setOverhangAngleDeg] = useState(45);

  const [loading, setLoading] = useState(false);
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState("");

  const options = useMemo(
    () => ({
      material,
      infillPercent,
      wallThicknessMm,
      filamentDiameterMm,
      overhangAngleDeg,
    }),
    [material, infillPercent, wallThicknessMm, filamentDiameterMm, overhangAngleDeg]
  );

  useEffect(() => {
    let alive = true;

    async function run() {
      if (!file) return;
      try {
        setLoading(true);
        setError("");
        setMetrics(null);

        const geom = await loadSTLGeometryFromFile(file);
        const m = computeSTLMetrics(geom, options);

        if (alive) setMetrics(m);
      } catch (e) {
        if (alive) setError(e?.message || "Failed to compute STL metrics.");
      } finally {
        if (alive) setLoading(false);
      }
    }

    run();
    return () => {
      alive = false;
    };
  }, [file, options]);

  if (!file) return null;

  return (
    <div style={styles.wrap}>
      <div style={styles.card}>
        <div style={styles.headerRow}>
          <h2 style={styles.h2}>Metrics & Estimation Engine</h2>
          <button style={styles.closeBtn} onClick={onClose}>Close</button>
        </div>

        <p style={styles.sub}>
          File: <b>{file.name}</b> ({(file.size / 1024 / 1024).toFixed(2)} MB)
        </p>

        <div style={styles.grid}>
          <div style={styles.box}>
            <h3 style={styles.h3}>Inputs</h3>

            <label style={styles.label}>Material</label>
            <select style={styles.input} value={material} onChange={(e) => setMaterial(e.target.value)}>
              <option>PLA</option>
              <option>ABS</option>
              <option>PETG</option>
              <option>RESIN</option>
            </select>

            <label style={styles.label}>Infill (%)</label>
            <input
              style={styles.input}
              type="number"
              min={0}
              max={100}
              value={infillPercent}
              onChange={(e) => setInfillPercent(Number(e.target.value))}
            />

            <label style={styles.label}>Wall thickness (mm)</label>
            <input
              style={styles.input}
              type="number"
              min={0.4}
              step={0.1}
              value={wallThicknessMm}
              onChange={(e) => setWallThicknessMm(Number(e.target.value))}
            />

            <label style={styles.label}>Filament diameter (mm)</label>
            <input
              style={styles.input}
              type="number"
              min={1.0}
              step={0.05}
              value={filamentDiameterMm}
              onChange={(e) => setFilamentDiameterMm(Number(e.target.value))}
            />

            <label style={styles.label}>Overhang threshold (deg)</label>
            <input
              style={styles.input}
              type="number"
              min={10}
              max={80}
              value={overhangAngleDeg}
              onChange={(e) => setOverhangAngleDeg(Number(e.target.value))}
            />

            <p style={styles.note}>
              Note: Material usage is an estimate (not a slicer). It’s good for your SDGP reporting and UI.
            </p>
          </div>

          <div style={styles.box}>
            <h3 style={styles.h3}>Output</h3>

            {loading && <p>Computing metrics…</p>}
            {error && <p style={{ color: "tomato" }}>{error}</p>}

            {metrics && (
              <div style={styles.results}>
                <Row label="Volume" value={`${metrics.volumeCm3} cm³`} />
                <Row label="Surface area" value={`${metrics.surfaceAreaCm2} cm²`} />
                <Row
                  label="Bounding box"
                  value={`${metrics.bboxMm.x} × ${metrics.bboxMm.y} × ${metrics.bboxMm.z} mm`}
                />
                <Row label="Triangles" value={`${metrics.triangleCount}`} />

                <hr style={styles.hr} />

                <Row label="Estimated material" value={`${metrics.estimatedMaterialVolumeCm3} cm³`} />
                <Row label="Estimated weight" value={`${metrics.estimatedWeightGrams} g`} />
                <Row label="Estimated filament length" value={`${metrics.filamentLengthM} m`} />

                <hr style={styles.hr} />

                <Row label="Overhang area (approx)" value={`${metrics.overhangPercent}%`} />
                <Row label="Thinness index" value={`${metrics.thinnessIndex}`} />
                <Row
                  label="Complexity score"
                  value={`${metrics.complexityScore} / 100`}
                  bold
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, bold }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, margin: "8px 0" }}>
      <span style={{ opacity: 0.85 }}>{label}</span>
      <span style={{ fontWeight: bold ? 700 : 500 }}>{value}</span>
    </div>
  );
}

const styles = {
  wrap: { marginTop: 14, padding: "0 12px" },
  card: {
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 14,
    padding: 16,
    background: "rgba(10,10,10,0.35)",
    backdropFilter: "blur(8px)",
    color: "white",
    maxWidth: 1100,
    margin: "0 auto",
  },
  headerRow: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 },
  h2: { margin: 0, fontSize: 20 },
  sub: { marginTop: 6, opacity: 0.85 },
  closeBtn: {
    border: "1px solid rgba(255,255,255,0.25)",
    background: "transparent",
    color: "white",
    padding: "8px 12px",
    borderRadius: 10,
    cursor: "pointer",
  },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 12 },
  box: {
    border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: 12,
    padding: 12,
    background: "rgba(0,0,0,0.25)",
  },
  h3: { margin: "4px 0 10px", fontSize: 16 },
  label: { display: "block", marginTop: 10, marginBottom: 6, opacity: 0.85, fontSize: 13 },
  input: {
    width: "100%",
    padding: "10px 10px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(0,0,0,0.35)",
    color: "white",
    outline: "none",
  },
  note: { marginTop: 10, opacity: 0.7, fontSize: 12, lineHeight: 1.4 },
  results: { marginTop: 6 },
  hr: { border: "none", borderTop: "1px solid rgba(255,255,255,0.12)", margin: "10px 0" },
};
