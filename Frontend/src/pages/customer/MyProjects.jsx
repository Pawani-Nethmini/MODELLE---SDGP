import { useEffect, useState } from "react";
import { useAuth } from "../../context/useAuth";
import {
  fetchCustomerRequests,
  fetchQuotations,
  acceptQuotation,
  fetchMessages,
  sendMessage,
} from "../../services/designerService";

export default function MyProjects() {
  const { currentUser } = useAuth();
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [quotations, setQuotations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (currentUser?.uid) loadRequests();
  }, [currentUser]);

  const loadRequests = async () => {
    const data = await fetchCustomerRequests(currentUser.uid);
    setRequests(data);
  };

  const openRequest = async (request) => {
    setSelectedRequest(request);
    const [q, m] = await Promise.all([
      fetchQuotations(request._id),
      fetchMessages(request._id),
    ]);
    setQuotations(q);
    setMessages(m);
  };

  const onAcceptQuotation = async (quotationId) => {
    await acceptQuotation(quotationId);
    if (selectedRequest) openRequest(selectedRequest);
  };

  const onSendMessage = async () => {
    if (!text.trim() || !selectedRequest) return;

    await sendMessage({
      requestId: selectedRequest._id,
      senderId: currentUser.uid,
      senderName: currentUser.displayName || currentUser.email || "Customer",
      senderRole: "customer",
      text,
    });

    setText("");
    const updated = await fetchMessages(selectedRequest._id);
    setMessages(updated);
  };

  return (
    <div style={{ padding: 32, color: "white", display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 20 }}>
      <div>
        <h1>My Projects</h1>
        {requests.map((r) => (
          <div key={r._id} style={card} onClick={() => openRequest(r)}>
            <h3>{r.title}</h3>
            <p>{r.description}</p>
            <p><b>Status:</b> {r.status}</p>
            <p><b>Budget:</b> ${r.budget || 0}</p>
          </div>
        ))}
      </div>

      <div>
        {!selectedRequest ? (
          <div style={card}>Select a project to view quotations and messages.</div>
        ) : (
          <>
            <div style={card}>
              <h2>{selectedRequest.title}</h2>
              <p>{selectedRequest.description}</p>
              <h3>Quotations</h3>
              {quotations.length === 0 ? (
                <p>No quotations yet.</p>
              ) : (
                quotations.map((q) => (
                  <div key={q._id} style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 10, marginTop: 10 }}>
                    <p><b>{q.designerName}</b></p>
                    <p>Price: ${q.price}</p>
                    <p>Delivery: {q.deliveryDays} days</p>
                    <p>{q.note}</p>
                    <p>Status: {q.status}</p>
                    {q.status === "pending" && (
                      <button style={btn} onClick={() => onAcceptQuotation(q._id)}>Accept Quote</button>
                    )}
                  </div>
                ))
              )}
            </div>

            <div style={card}>
              <h3>Communication</h3>
              <div style={{ maxHeight: 260, overflowY: "auto", marginBottom: 12 }}>
                {messages.map((m) => (
                  <div key={m._id} style={{ marginBottom: 10 }}>
                    <b>{m.senderName}</b> <span style={{ opacity: 0.7 }}>({m.senderRole})</span>
                    <p style={{ margin: "4px 0" }}>{m.text}</p>
                  </div>
                ))}
              </div>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type a message..."
                style={{ ...inputBlock, minHeight: 90 }}
              />
              <button style={btn} onClick={onSendMessage}>Send</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const inputBlock = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #2d3748",
  background: "#111827",
  color: "white",
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
  marginBottom: 16,
  cursor: "pointer",
};

