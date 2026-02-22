import { useMemo, useState } from "react";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"; // node backend
// If calling FastAPI directly, set VITE_API_BASE_URL=http://localhost:8000

function toFormData(file, extra = {}) {
  const fd = new FormData();
  fd.append("file", file);
  Object.entries(extra).forEach(([k, v]) => fd.append(k, String(v)));
  return fd;
}

export default function STLAutoFixPanel() {
  const [file, setFile] = useState(null);
  const [validating, setValidating] = useState(false);
  const [fixing, setFixing] = useState(false);

  const [report, setReport] = useState(null); 
  const [error, setError] = useState("");

  const canAutoFix = useMemo(() => {
    if (!report) return false;
    // backend should return explicit flag. If not, infer from issue types.
    return Boolean(report.fixableMinor) && (report.issues?.length ?? 0) > 0;
  }, [report]);

  const validateFile = async () => {
    if (!file) return alert("Upload an STL file first.");
    setError("");
    setReport(null);
    setValidating(true);
    try {
      const res = await fetch(`${API_BASE}/api/validator/validate`, {
        method: "POST",
        body: toFormData(file),
      });

      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || "Validation failed");
      }

      const data = await res.json();
      setReport(data);
    } catch (e) {
      setError(e.message || "Validation error");
    } finally {
      setValidating(false);
    }
  };

  const autoFix = async () => {
    if (!file) return;
    setError("");
    setFixing(true);

    try {
      const res = await fetch(`${API_BASE}/api/validator/autofix`, {
        method: "POST",
        body: toFormData(file),
      });

      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || "Auto-fix failed");
      }

      //backend returns file directly
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      // Force download
      const a = document.createElement("a");
      a.href = url;
      const baseName = file.name.replace(/\.stl$/i, "");
      a.download = `${baseName}_fixed.stl`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      //Re-validate fixed file if backend also returns JSON.
      setReport((prev) => ({
        ...(prev || {}),
        autoFixStatus: "Fixed STL downloaded successfully.",
      }));
    } catch (e) {
      setError(e.message || "Auto-fix error");
    } finally {
      setFixing(false);
    }
  };

  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 16 }}>
      <h3 style={{ marginTop: 0 }}>STL Validator (with Auto-Fix)</h3>

      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <input
          type="file"
          accept=".stl"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <button onClick={validateFile} disabled={!file || validating}>
          {validating ? "Validating..." : "Validate STL"}
        </button>

        <button onClick={autoFix} disabled={!canAutoFix || fixing}>
          {fixing ? "Auto-fixing..." : "Auto-fix minor issues"}
        </button>
      </div>

      {file && (
        <p style={{ marginTop: 10, marginBottom: 0 }}>
          <b>Selected:</b> {file.name}
        </p>
      )}

      {error && (
        <div style={{ marginTop: 12, color: "crimson" }}>
          <b>Error:</b> {error}
        </div>
      )}

      {report && (
        <div style={{ marginTop: 12 }}>
          {report.summary && (
            <div style={{ marginBottom: 8 }}>
              <b>Summary:</b> {report.summary}
            </div>
          )}

          {report.autoFixStatus && (
            <div style={{ marginBottom: 8, color: "green" }}>
              <b>{report.autoFixStatus}</b>
            </div>
          )}

          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            <div>
              <b>Fixable (minor):</b> {String(!!report.fixableMinor)}
            </div>
            <div>
              <b>Issues:</b> {report.issues?.length ?? 0}
            </div>
          </div>

          <ul style={{ marginTop: 10 }}>
            {(report.issues || []).map((it, idx) => (
              <li key={idx}>
                <b>{it.type || "Issue"}</b>
                {it.severity ? ` (${it.severity})` : ""}: {it.message || ""}
              </li>
            ))}
          </ul>

          {!canAutoFix && (report.issues?.length ?? 0) > 0 && (
            <div style={{ marginTop: 10, color: "#555" }}>
              Auto-fix is disabled because issues are not classified as minor/fixable.
              In that case, route the user to <b>Find a Designer</b>.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
