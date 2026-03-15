import { useState, useRef } from "react";
import { MODEL_TYPES, PRINT_METHODS, FINISH_OPTS } from "../designerConstants";
import { inputStyle, labelStyle } from "../DesignerShared";

const CustomizeTab = ({ designer, onTabSwitch }) => {
  const [form, setForm] = useState({
    modelType: "", title: "", description: "",
    width: "", height: "", depth: "",
    printMethod: "No preference", finish: "Designer's choice",
    quantity: 1, urgency: "Standard",
    sketchNote: "", refLinks: "",
    attachments: [],
  });
  const [submitted, setSubmitted] = useState(false);
  const [dragOver,  setDragOver]  = useState(false);
  const fileRef = useRef();

  const inp = (field, val) => setForm(f => ({ ...f, [field]: val }));

  const handleFiles = (files) => {
    const names = Array.from(files).map(f => f.name);
    setForm(f => ({ ...f, attachments: [...f.attachments, ...names].slice(0, 5) }));
  };

  const removeAttachment = (i) =>
    setForm(f => ({ ...f, attachments: f.attachments.filter((_, idx) => idx !== i) }));

  const handleSubmit = () => {
    if (!form.title || !form.description || !form.modelType) return;
    setSubmitted(true);
    setTimeout(() => onTabSwitch("messages"), 2200);
  };

  const canSubmit = form.title && form.description && form.modelType;

  if (submitted) return (
    <div style={{ textAlign: "center", padding: "48px 20px" }}>
      <div style={{ fontSize: "3.5rem", marginBottom: "16px" }}>🎨</div>
      <h3 style={{ color: "white", margin: "0 0 8px", fontSize: "1.3rem" }}>Idea Sent!</h3>
      <p style={{ color: "#64748b", fontSize: "0.9rem" }}>Taking you to Messages so {designer.name} can respond…</p>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

      {/* Banner */}
      <div style={{ padding: "12px 14px", background: `${designer.accentColor}0d`, border: `1px solid ${designer.accentColor}25`, borderRadius: "12px" }}>
        <p style={{ margin: 0, fontSize: "0.8rem", color: designer.accentColor, fontWeight: 600 }}>
          ✏️ Describe your idea — {designer.name} will review it, ask questions if needed, and send a quote.
        </p>
      </div>

      {/* Model type */}
      <div>
        <label style={labelStyle}>What type of model? *</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {MODEL_TYPES.map(t => (
            <button key={t} onClick={() => inp("modelType", t)} style={{
              padding: "5px 12px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: 700,
              cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s",
              border: `1px solid ${form.modelType === t ? designer.accentColor : "rgba(255,255,255,0.08)"}`,
              background: form.modelType === t ? `${designer.accentColor}18` : "transparent",
              color: form.modelType === t ? designer.accentColor : "#475569",
            }}>{t}</button>
          ))}
        </div>
      </div>

      {/* Title */}
      <div>
        <label style={labelStyle}>Project Title *</label>
        <input type="text" style={inputStyle}
          placeholder="e.g. Lattice vase with Voronoi pattern, 30cm"
          value={form.title} onChange={e => inp("title", e.target.value)} />
      </div>

      {/* Description */}
      <div>
        <label style={labelStyle}>Describe Your Idea *</label>
        <textarea rows={4} style={inputStyle}
          placeholder="Be as detailed as you like — shape, function, inspiration, aesthetic style, any constraints…"
          value={form.description} onChange={e => inp("description", e.target.value)} />
      </div>

      {/* Dimensions */}
      <div>
        <label style={labelStyle}>Approximate Dimensions (mm)</label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
          {[["width", "W"], ["height", "H"], ["depth", "D"]].map(([field, ph]) => (
            <input key={field} type="number" style={inputStyle} placeholder={ph}
              value={form[field]} onChange={e => inp(field, e.target.value)} />
          ))}
        </div>
      </div>

      {/* Print method + Finish */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        <div>
          <label style={labelStyle}>Print Method</label>
          <select style={{ ...inputStyle, cursor: "pointer" }} value={form.printMethod} onChange={e => inp("printMethod", e.target.value)}>
            {PRINT_METHODS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Desired Finish</label>
          <select style={{ ...inputStyle, cursor: "pointer" }} value={form.finish} onChange={e => inp("finish", e.target.value)}>
            {FINISH_OPTS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
      </div>

      {/* Quantity + Urgency */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        <div>
          <label style={labelStyle}>Quantity</label>
          <input type="number" min="1" style={inputStyle}
            value={form.quantity} onChange={e => inp("quantity", e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Urgency</label>
          <select style={{ ...inputStyle, cursor: "pointer" }} value={form.urgency} onChange={e => inp("urgency", e.target.value)}>
            {["Standard", "Express (×1.5 cost)", "Urgent (×2 cost)"].map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
      </div>

      {/* Sketch notes */}
      <div>
        <label style={labelStyle}>Sketch Description / Visual Notes</label>
        <textarea rows={2} style={inputStyle}
          placeholder="Describe what a rough sketch would look like, or paste a text description of shape…"
          value={form.sketchNote} onChange={e => inp("sketchNote", e.target.value)} />
      </div>

      {/* Reference links */}
      <div>
        <label style={labelStyle}>Reference Links (images, Pinterest, etc.)</label>
        <input type="text" style={inputStyle}
          placeholder="https://... (separate multiple links with commas)"
          value={form.refLinks} onChange={e => inp("refLinks", e.target.value)} />
      </div>

      {/* File drop zone */}
      <div>
        <label style={labelStyle}>Attach Files (sketches, STL drafts, photos — max 5)</label>
        <div
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={e => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
          onClick={() => fileRef.current.click()}
          style={{
            border: `2px dashed ${dragOver ? designer.accentColor : "rgba(255,255,255,0.12)"}`,
            borderRadius: "12px", padding: "22px", textAlign: "center", cursor: "pointer",
            background: dragOver ? `${designer.accentColor}08` : "rgba(255,255,255,0.02)",
            transition: "all 0.2s",
          }}
        >
          <input ref={fileRef} type="file" multiple style={{ display: "none" }}
            onChange={e => handleFiles(e.target.files)} />
          <div style={{ fontSize: "1.6rem", marginBottom: "6px" }}>📎</div>
          <p style={{ margin: 0, fontSize: "0.8rem", color: "#475569" }}>Drag & drop files here, or click to browse</p>
          <p style={{ margin: "4px 0 0", fontSize: "0.7rem", color: "#334155" }}>Supports images, PDF, STL, OBJ</p>
        </div>

        {form.attachments.length > 0 && (
          <div style={{ marginTop: "10px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {form.attachments.map((name, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: "6px",
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px", padding: "4px 10px", fontSize: "0.75rem", color: "#94a3b8",
              }}>
                <span>📄</span>{name}
                <button
                  onClick={e => { e.stopPropagation(); removeAttachment(i); }}
                  style={{ background: "none", border: "none", color: "#475569", cursor: "pointer", padding: 0, fontSize: "0.9rem", lineHeight: 1 }}
                >×</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!canSubmit}
        style={{
          padding: "0.9rem", borderRadius: "12px", border: "none", fontFamily: "inherit",
          background: canSubmit ? `linear-gradient(135deg,${designer.accentColor},${designer.accentColor}aa)` : "rgba(255,255,255,0.05)",
          color: canSubmit ? "white" : "#334155",
          cursor: canSubmit ? "pointer" : "not-allowed",
          fontWeight: 800, fontSize: "0.9rem", transition: "all 0.25s",
          boxShadow: canSubmit ? `0 8px 24px ${designer.accentColor}40` : "none",
        }}
      >
        Send My Idea to {designer.name} →
      </button>
    </div>
  );
};

export default CustomizeTab;
