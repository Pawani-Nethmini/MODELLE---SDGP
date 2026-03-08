const API = "http://localhost:5000/api";

export async function fetchDesigners(search = "", skill = "") {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (skill) params.append("skill", skill);

  const res = await fetch(`${API}/designers?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch designers");
  return res.json();
}

export async function createCustomDesignRequest(payload) {
  const res = await fetch(`${API}/custom-design/requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create request");
  return res.json();
}

export async function fetchCustomerRequests(customerId) {
  const res = await fetch(`${API}/custom-design/requests/customer/${customerId}`);
  if (!res.ok) throw new Error("Failed to fetch customer requests");
  return res.json();
}

export async function fetchQuotations(requestId) {
  const res = await fetch(`${API}/custom-design/quotations/${requestId}`);
  if (!res.ok) throw new Error("Failed to fetch quotations");
  return res.json();
}

export async function acceptQuotation(quotationId) {
  const res = await fetch(`${API}/custom-design/quotations/accept/${quotationId}`, {
    method: "PATCH",
  });
  if (!res.ok) throw new Error("Failed to accept quotation");
  return res.json();
}

export async function sendMessage(payload) {
  const res = await fetch(`${API}/custom-design/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to send message");
  return res.json();
}

export async function fetchMessages(requestId) {
  const res = await fetch(`${API}/custom-design/messages/${requestId}`);
  if (!res.ok) throw new Error("Failed to fetch messages");
  return res.json();
}