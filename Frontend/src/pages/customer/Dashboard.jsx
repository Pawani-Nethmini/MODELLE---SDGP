export default function CustomerDashboard() {
  return (
    <div style={{ padding: "2rem" }}>
      {/* Header */}
      <h1>Welcome back 👋</h1>
      <p>Here’s what’s happening with your projects</p>

      {/* Quick Actions */}
      <section style={{ marginTop: "2rem" }}>
        <h2>Quick Actions</h2>

        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <ActionCard title="New Project" description="Upload a new STL file" />
          <ActionCard title="My Orders" description="Track current orders" />
          <ActionCard title="Messages" description="View messages" />
        </div>
      </section>

      {/* Active Orders */}
      <section style={{ marginTop: "3rem" }}>
        <h2>Active Orders</h2>

        <table style={{ width: "100%", marginTop: "1rem" }}>
          <thead>
            <tr>
              <th align="left">Order ID</th>
              <th align="left">Status</th>
              <th align="left">Printer</th>
              <th align="left">ETA</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#1023</td>
              <td>Printing</td>
              <td>PrintHub SL</td>
              <td>2 days</td>
            </tr>
            <tr>
              <td>#1024</td>
              <td>Design Review</td>
              <td>—</td>
              <td>Pending</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Notifications */}
      <section style={{ marginTop: "3rem" }}>
        <h2>Notifications</h2>
        <ul>
          <li>Designer uploaded a new revision</li>
          <li>Your payment was successful</li>
        </ul>
      </section>
    </div>
  );
}

/* Small reusable card component */
function ActionCard({ title, description }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "1rem",
        borderRadius: "8px",
        width: "200px",
        cursor: "pointer"
      }}
    >
      <h3>{title}</h3>
      <p style={{ fontSize: "0.9rem" }}>{description}</p>
    </div>
  );
}
