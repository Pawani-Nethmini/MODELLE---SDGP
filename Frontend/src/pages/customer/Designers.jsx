import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../context/useAuth";
import {
  fetchDesigners,
  createCustomDesignRequest,
} from "../../services/designerService";

export default function Designers() {
  const { currentUser } = useAuth();
  const [designers, setDesigners] = useState([]);
  const [search, setSearch] = useState("");
  const [skill, setSkill] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedDesigner, setSelectedDesigner] = useState(null);
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "custom-model",
    budget: "",
    deadline: "",
    referenceImageUrl: "",
  });

  useEffect(() => {
    loadDesigners();
  }, []);

  const loadDesigners = async () => {
    try {
      setLoading(true);
      const data = await fetchDesigners(search, skill);
      setDesigners(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(() => designers, [designers]);

  const submitRequest = async () => {
    if (!currentUser) return alert("Please log in first.");
    if (!form.title || !form.description) return alert("Title and description are required.");

    const payload = {
      customerId: currentUser.uid,
      customerName: currentUser.displayName || currentUser.email || "Customer",
      title: form.title,
      description: form.description,
      category: form.category,
      budget: Number(form.budget || 0),
      deadline: form.deadline,
      referenceImageUrl: form.referenceImageUrl,
      assignedDesignerId: selectedDesigner?.firebaseUid || "",
    };

    try {
      await createCustomDesignRequest(payload);
      setSuccess("Custom design request sent successfully.");
      setForm({
        title: "",
        description: "",
        category: "custom-model",
        budget: "",
        deadline: "",
        referenceImageUrl: "",
      });
      setSelectedDesigner(null);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div style={{ padding: 32, color: "white" }}>
      <h1>Find a Designer</h1>
      <p>Browse available designers and request custom 3D models based on your idea.</p>

      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or bio"
          style={input}
        />
        <input
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          placeholder="Filter by skill (e.g. modeling)"
          style={input}
        />
        <button onClick={loadDesigners} style={btn}>Search</button>
      </div>

      {loading ? (
        <p>Loading designers...</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 }}>
          {filtered.map((d) => (
            <div key={d._id} style={card}>
              <h3>{d.fullName}</h3>
              <p>@{d.username || "designer"}</p>
              <p>{d.bio || "No bio yet."}</p>
              <p><b>Skills:</b> {(d.skills || []).join(", ") || "Not specified"}</p>
              <p><b>Software:</b> {(d.software || []).join(", ") || "Not specified"}</p>
              <p><b>Rate:</b> ${d.hourlyRate}/hr</p>
              <p><b>Rating:</b> {d.rating} ⭐</p>
              <button style={btn} onClick={() => setSelectedDesigner(d)}>
                Request Custom Model
              </button>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 32, ...card }}>
        <h2>Custom Model Request</h2>
        <p>
          {selectedDesigner
            ? <>Selected designer: <b>{selectedDesigner.fullName}</b></>
            : "You can send a general request or choose a specific designer."}
        </p>

        {success && <p style={{ color: "#86efac" }}>{success}</p>}

        <input
          placeholder="Project title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          style={inputBlock}
        />
        <textarea
          placeholder="Describe your idea in detail"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          style={{ ...inputBlock, minHeight: 120 }}
        />
        <input
          placeholder="Reference image URL (optional)"
          value={form.referenceImageUrl}
          onChange={(e) => setForm({ ...form, referenceImageUrl: e.target.value })}
          style={inputBlock}
        />
        <div style={{ display: "flex", gap: 12 }}>
          <input
            placeholder="Budget"
            value={form.budget}
            onChange={(e) => setForm({ ...form, budget: e.target.value })}
            style={inputBlock}
          />
          <input
            type="date"
            value={form.deadline}
            onChange={(e) => setForm({ ...form, deadline: e.target.value })}
            style={inputBlock}
          />
        </div>
        <button onClick={submitRequest} style={btn}>
          Send Request
        </button>
      </div>
    </div>
  );
}

const input = {
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #2d3748",
  background: "#111827",
  color: "white",
};

const inputBlock = {
  ...input,
  width: "100%",
  marginBottom: 12,
};

const btn = {
  padding: "10px 14px",
  borderRadius: 8,
  border: "none",
  background: "#7c3aed",
  color: "white",
  cursor: "pointer",
};

const card = {
  background: "rgba(17,24,39,0.85)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 14,
  padding: 18,
};