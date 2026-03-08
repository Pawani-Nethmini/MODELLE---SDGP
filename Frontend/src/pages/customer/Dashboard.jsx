import { useEffect, useState } from "react";
import modelleImage from "../../assets/dash_modelle.png";
import { useNavigate } from "react-router-dom";
import callcenter from "../../assets/callcenter.png";

const MY_ORDERS_MOCK = [
  { id: "MOD-2024-0091", printerName: "PrintHub Colombo", status: "Ongoing", eta: "Feb 25, 2025", date: "2025-02-18" },
  { id: "MOD-2024-0090", printerName: "3D Factory Galle", status: "Completed", eta: "Delivered", date: "2025-02-10" },
  { id: "MOD-2024-0089", printerName: "MakerSpace Kandy", status: "Completed", eta: "Delivered", date: "2025-02-05" },
  { id: "MOD-2024-0088", printerName: "ResinPro Studio", status: "Cancelled", eta: "-", date: "2025-01-28" },
  { id: "MOD-2024-0087", printerName: "PrintHub Colombo", status: "Completed", eta: "Delivered", date: "2025-01-20" },
  { id: "MOD-2024-0086", printerName: "QuickPrint Negombo", status: "Pending", eta: "Awaiting acceptance", date: "2025-02-20" },
  { id: "MOD-2024-0085", printerName: "3D Factory Galle", status: "Accepted", eta: "Mar 1, 2025", date: "2025-02-19" },
];

const ACTIVE_ORDER_STATUSES = ["Ongoing", "Pending", "Accepted"];
const DASHBOARD_ACTIVE_ORDERS = MY_ORDERS_MOCK
  .filter((order) => ACTIVE_ORDER_STATUSES.includes(order.status))
  .sort((a, b) => new Date(b.date) - new Date(a.date));

export default function CustomerDashboard() {
const API_BASE = "http://localhost:5051/api/dashboard";

const [orders, setOrders] = useState(DASHBOARD_ACTIVE_ORDERS);
const [notifications, setNotifications] = useState([]);
const [insights, setInsights] = useState(null);
const [isLoadingDashboard, setIsLoadingDashboard] = useState(true);
const [dashboardError, setDashboardError] = useState("");
const [feedbackStatus, setFeedbackStatus] = useState("");

useEffect(() => {
  const fetchDashboardData = async () => {
    try {
      setIsLoadingDashboard(true);
      setDashboardError("");
      setOrders(DASHBOARD_ACTIVE_ORDERS);

      const [notificationsRes, insightsRes] = await Promise.all([
        fetch(`${API_BASE}/notifications`),
        fetch(`${API_BASE}/insights`),
      ]);

      if (!notificationsRes.ok || !insightsRes.ok) {
        throw new Error("Failed to load dashboard data.");
      }

      const notificationsJson = await notificationsRes.json();
      const insightsJson = await insightsRes.json();

      setNotifications(notificationsJson.data || []);
      setInsights(insightsJson.data || null);
    } catch (error) {
      setDashboardError(error?.message || "Unable to load dashboard data.");
    } finally {
      setIsLoadingDashboard(false);
    }
  };

  fetchDashboardData();
}, []);

const submitFeedback = async ({ rating, message }) => {
  try {
    setFeedbackStatus("");

    const response = await fetch(`${API_BASE}/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating, message }),
    });

    const json = await response.json();

    if (!response.ok || !json.success) {
      throw new Error(json?.message || "Failed to submit feedback.");
    }

    setFeedbackStatus("Feedback sent successfully.");
  } catch (error) {
    setFeedbackStatus(error?.message || "Feedback submission failed.");
  }
};

const navigate = useNavigate();  
return (
  <div style={styles.page}>


      {/* HERO SECTION */}
      <div style={styles.hero}>
        <div style={styles.heroLeft}>
          <span style={styles.heroBadge}>OUR VISION</span>

          <h1 style={styles.heroTitle}>
            Feel Seen <span style={styles.heroHighlight}>Without</span>
            <br /> Being Seen
          </h1>

          <p style={styles.heroText}>
            Bringing your digital dreams to physical reality. Connecting designers
            with high-precision print shops to turn ideas into masterpieces.
          </p>

          <div style={styles.heroButtons}>
            <button 
              style={styles.secondaryBtn}
              onClick={() => navigate("/customer/showroom")}
            >
              View Showroom
            </button>
          </div>
        </div>


        <div style={styles.heroRight}>
          <img src={modelleImage} alt="Modelle Cube" style={styles.heroImage} />
        </div>
      </div>
              
      {/* Header */}
      <h1 style={styles.title}>Welcome back 👋</h1>
      <p style={styles.subtitle}>Here’s what’s happening with your projects today.</p>

      <div style={styles.grid}>
        {/* LEFT SIDE */}
        <div>
          {/* Quick Actions */}
          <section style={{ marginTop: "2rem" }}>
            <h2 style={styles.sectionTitle}>⚡ Quick Actions</h2>

            <div style={styles.cardRow}>
              <ActionCard 
                title="New Project" 
                desc="Upload a new STL file" 
                path="upload-stl"
              />
              <ActionCard 
                title="My Orders" 
                desc="Track current orders" 
                path="my-orders"
              />
              <ActionCard title="Messages" desc="Contact designers" />
            </div>
          </section>

          {/* Active Orders */}
          <section style={{ marginTop: "2.5rem" }}>
            <h2 style={styles.sectionTitle}>📦 Active Orders</h2>

            <div style={styles.tableBox}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>ORDER ID</th>
                    <th style={styles.th}>STATUS</th>
                    <th style={styles.th}>PRINTER</th>
                    <th style={styles.th}>ETA</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 && (
                    <tr>
                      <td style={styles.td} colSpan="4">No active orders.</td>
                    </tr>
                  )}
                  {orders.map((order) => (
                    <tr key={order.orderId || order.id}>
                      <td style={styles.td}>{order.orderId || order.id}</td>
                      <td style={styles.td}>
                        <span style={order.status === "Ongoing" ? styles.statusGreen : styles.statusYellow}>
                          {order.status}
                        </span>
                      </td>
                      <td style={styles.td}>{order.printer || order.printerName || "-"}</td>
                      <td style={styles.td}>{order.eta}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* RIGHT SIDE */}
        <div>
          {/* Notifications */}
          <section>
            <h2 style={styles.sectionTitle}>🔔 Notifications</h2>

            <div style={styles.notifyBox}>
              {isLoadingDashboard && (
                <div style={styles.notifyItem}>
                  <p style={styles.notifyText}>Loading notifications...</p>
                </div>
              )}
              {!isLoadingDashboard && dashboardError && (
                <div style={styles.notifyItem}>
                  <p style={styles.notifyText}>{dashboardError}</p>
                </div>
              )}
              {!isLoadingDashboard && !dashboardError && notifications.length === 0 && (
                <div style={styles.notifyItem}>
                  <p style={styles.notifyText}>No notifications yet.</p>
                </div>
              )}
              {!isLoadingDashboard && !dashboardError && notifications.map((item) => (
                <Notification key={item.id} text={item.text} time={item.time} isNew={item.isNew} />
              ))}
              
              <div style={styles.viewAll}>
                <a href="/customer/notifications" style={styles.viewAllLink}>
                  View all notifications
                </a>
              </div>
            </div>
          </section>

          {/* Project Insights */}
          <section style={styles.insightBox}>
            <h3 style={{ marginBottom: "0.5rem" }}>Project Insights</h3>
            <p style={{ fontSize: "0.9rem", opacity: 0.7 }}>TOTAL SPENT</p>
            <h2>
              {insights?.currency === "USD" ? "$" : ""}
              {insights?.totalSpent ?? 0}
            </h2>

            <div style={styles.progressBar}>
              <div
                style={{
                  ...styles.progressFill,
                  width: `${insights?.budgetUsedPercent ?? 0}%`,
                  animation: "none",
                }}
              ></div>
            </div>

            <p style={{ fontSize: "0.85rem", marginTop: "0.5rem", opacity: 0.8 }}>
              {insights?.budgetUsedPercent ?? 0}% of monthly budget utilized
            </p>
          </section>

          {/* Feedback Section */}
          <section style={{ marginTop: "2rem" }}>
            <FeedbackCard onSubmit={submitFeedback} feedbackStatus={feedbackStatus} />
          </section>


        </div>
      </div>
    </div>
  );
}

/* Action Card */
function ActionCard({ title, desc, path }) {
  const navigate = useNavigate();

  return (
    <div 
      style={styles.actionCard}
      onClick={() => navigate(path)}
    >
      <h3>{title}</h3>
      <p style={{ opacity: 0.7 }}>{desc}</p>
    </div>
  );
}

/* Notification */
function Notification({ text ,time, isNew}) {
  return (
    <div style={styles.notifyItem}>
      <div style={styles.notifyContent}>
        {isNew && <div style={styles.notifyDot}></div>}
        <div>
          <p style={styles.notifyText}>{text}</p>
          <span style={styles.notifyTime}>{time}</span>
        </div>
      </div>
    </div>
  );
}

/* Feedback Card */
function FeedbackCard({ onSubmit, feedbackStatus }) {
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await onSubmit({ rating, message });
      setMessage("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.newFeedbackCard}>
      <h3 style={styles.feedbackTitle}>How are we doing?</h3>
      <p style={styles.feedbackSubtitle}>
        Your feedback helps us build the future of 3D printing.
      </p>

      {/* Rating Circles */}
      <div style={styles.ratingRow}>
        {[1, 2, 3, 4, 5].map((num) => (
          <div
            key={num}
            onClick={() => setRating(num)}
            style={{
              ...styles.ratingCircle,
              ...(rating === num ? styles.activeRating : {})
            }}
          >
            {num}
          </div>
        ))}
      </div>

      {/* Input + Send */}
      <div style={styles.feedbackInputWrapper}>
        <input
          type="text"
          placeholder="Tell us more about your experience..."
          style={styles.feedbackInput}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          style={styles.sendButton}
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "..." : "Send"}
        </button>
      </div>
      {feedbackStatus && <p style={styles.feedbackStatus}>{feedbackStatus}</p>}

      {/* Floating Support Button */}
      <div style={styles.supportButton}>
        <img src={callcenter} alt="Support" style={styles.supportImage} />
      </div>
    </div>
  );
}
/* Inline Styles with Animations */
const styles = {

  hero: {
    display: "grid",
    gridTemplateColumns: "1.4fr 1fr",
    gap: "2rem",
    background: "linear-gradient(135deg, #0c0c16, #050509)",
    border: "1px solid #222",
    borderRadius: "22px",
    padding: "2.5rem",
    marginBottom: "2rem",
    position: "relative",
    overflow: "hidden"
  },

  heroLeft: {
    zIndex: 2
  },

  heroBadge: {
    display: "inline-block",
    padding: "0.3rem 0.8rem",
    borderRadius: "20px",
    background: "rgba(0,255,255,0.1)",
    color: "#4deeea",
    fontSize: "0.75rem",
    marginBottom: "1rem"
  },

  heroTitle: {
    fontSize: "2.4rem",
    fontWeight: "700",
    lineHeight: "1.2"
  },

  heroHighlight: {
    color: "#4deeea"
  },

  heroText: {
    marginTop: "0.8rem",
    opacity: 0.7,
    maxWidth: "480px",
    fontSize: "0.95rem"
  },

  heroButtons: {
    display: "flex",
    gap: "1rem",
    marginTop: "1.5rem"
  },

  primaryBtn: {
    background: "linear-gradient(135deg, #00f2ff, #00b3ff)",
    border: "none",
    padding: "0.7rem 1.4rem",
    borderRadius: "10px",
    color: "black",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s"
  },

  secondaryBtn: {
    background: "transparent",
    border: "1px solid #333",
    padding: "0.7rem 1.4rem",
    borderRadius: "10px",
    color: "white",
    cursor: "pointer",
    transition: "0.3s"
  },

  heroRight: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  heroImage: {
    width: "320px",
    objectFit: "contain",
    animation: "float 4s ease-in-out infinite",
    filter: "drop-shadow(0 20px 40px rgba(0, 255, 255, 0.25))"
  },


  page: {
    background: "transparent",
    minHeight: "100vh",
    padding: "2.5rem",
    color: "white",
    fontFamily: "Arial, sans-serif",
    animation: "fadeIn 1s ease forwards" 
  },

  title: {
    fontSize: "2rem",
    fontWeight: "600",
    animation: "slideDown 0.8s ease forwards" 
  },

  subtitle: {
    opacity: 0.7,
    marginTop: "0.3rem",
    animation: "slideDown 0.8s ease 0.2s forwards"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "2rem",
    marginTop: "2rem"
  },

  sectionTitle: {
    fontSize: "1.2rem",
    marginBottom: "1rem"
  },

  cardRow: {
    display: "flex",
    gap: "1rem"
  },

  actionCard: {
    background: "linear-gradient(145deg, #141421, #0d0d16)",
    border: "1px solid #222",
    padding: "1.2rem",
    borderRadius: "14px",
    width: "200px",
    cursor: "pointer",
    transition: "0.3s transform, 0.3s box-shadow", 
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 8px 20px rgba(255, 255, 255, 0.1)"
    }
  },

  tableBox: {
    background: "#0f0f18",
    borderRadius: "14px",
    padding: "1rem",
    border: "1px solid #222",
    animation: "fadeIn 1s ease 0.3s forwards"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "0.95rem"
  },

  th: {
    textAlign: "left",
    padding: "0.6rem",
    opacity: 0.6
  },

  td: {
    padding: "0.6rem"
  },

  statusGreen: {
    background: "#0f3d2e",
    color: "#3affb0",
    padding: "0.2rem 0.6rem",
    borderRadius: "20px",
    fontSize: "0.8rem",
    animation: "blinkGreen 1.5s infinite alternate"
  },

  statusYellow: {
    background: "#3d2f0f",
    color: "#ffcc66",
    padding: "0.2rem 0.6rem",
    borderRadius: "20px",
    fontSize: "0.8rem",
    animation: "blinkYellow 1.5s infinite alternate"
  },

  notifyBox: {
    background: "#0f0f18",
    borderRadius: "14px",
    padding: "1rem",
    border: "1px solid #222",
    display: "flex",
    flexDirection: "column",
    gap: "0.8rem"
  },

  notifyItem: {
    display: "flex",
    flexDirection: "column",
    padding: "0.8rem 1rem",
    borderRadius: "12px",
    background: "#121426",
    cursor: "pointer",
    transition: "0.3s background",
    "&:hover": {
      background: "#1b1c2b"
    }
  },

  notifyContent: {
    display: "flex",
    alignItems: "center",
    gap: "0.8rem"
  },

  notifyDot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: "#4deeea",
    flexShrink: 0
  },

  notifyText: {
    fontSize: "0.95rem",
    fontWeight: "500",
    color: "white",
    margin: 0
  },

  notifyTime: {
    fontSize: "0.75rem",
    color: "rgba(255,255,255,0.5)",
    marginTop: "2px"
  },

  viewAll: {
    marginTop: "0.8rem",
    textAlign: "center"
  },

  viewAllLink: {
    color: "#8b8bff",
    fontSize: "0.85rem",
    textDecoration: "none",
    cursor: "pointer",
    transition: "0.2s",
    "&:hover": {
      textDecoration: "underline"
    }
  },

  insightBox: {
    marginTop: "1.5rem",
    background: "linear-gradient(135deg, #7c4dff, #9c6bff)",
    padding: "1.5rem",
    borderRadius: "16px",
    color: "white",
    position: "relative",
    overflow: "hidden"
  },

  progressBar: {
    width: "100%",
    height: "8px",
    background: "rgba(255,255,255,0.2)",
    borderRadius: "10px",
    marginTop: "0.7rem",
    overflow: "hidden"
  },

  progressFill: {
    width: "0%", 
    height: "100%",
    background: "white",
    borderRadius: "10px",
    animation: "fillBar 1s ease forwards"
  },

newFeedbackCard: {
  position: "relative",
  padding: "2rem",
  borderRadius: "22px",
  background: "linear-gradient(135deg, #0c1324, #0a1020)",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
  overflow: "hidden"
},

feedbackTitle: {
  fontSize: "1.4rem",
  fontWeight: "600",
  marginBottom: "0.5rem"
},

feedbackSubtitle: {
  fontSize: "0.9rem",
  opacity: 0.6,
  marginBottom: "1.8rem"
},

ratingRow: {
  display: "flex",
  gap: "1rem",
  marginBottom: "1.8rem"
},

ratingCircle: {
  width: "45px",
  height: "45px",
  borderRadius: "50%",
  background: "#1a2238",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  fontWeight: "500",
  transition: "all 0.3s ease",
  color: "white"
},

activeRating: {
  background: "linear-gradient(135deg, #7b2ff7, #9f44ff)",
  boxShadow: "0 0 20px rgba(155, 89, 255, 0.6)",
  transform: "scale(1.1)"
},

feedbackInputWrapper: {
  position: "relative",
  display: "flex",
  alignItems: "center"
},

feedbackInput: {
  width: "100%",
  padding: "0.9rem 1rem",
  borderRadius: "14px",
  border: "none",
  outline: "none",
  background: "#121a2f",
  color: "white",
  fontSize: "0.9rem"
},

sendButton: {
  position: "absolute",
  right: "6px",
  width: "40px",
  height: "40px",
  borderRadius: "12px",
  border: "none",
  background: "linear-gradient(135deg, #7b2ff7, #9f44ff)",
  color: "white",
  cursor: "pointer",
  fontSize: "1rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "0.3s"
},

supportButton: {
  position: "absolute",
  right: "-25px",
  bottom: "-25px",
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, #7b2ff7, #9f44ff)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.4rem",
  boxShadow: "0 10px 30px rgba(155, 89, 255, 0.6)"
},

supportImage: {
  width: "28px",
  height: "28px",
  objectFit: "contain",
},

feedbackStatus: {
  fontSize: "0.8rem",
  marginTop: "0.7rem",
  opacity: 0.8,
},


  // Keyframes
  "@keyframes fadeIn": {
    "0%": { opacity: 0 },
    "100%": { opacity: 1 }
  },

  "@keyframes slideDown": {
    "0%": { transform: "translateY(-20px)", opacity: 0 },
    "100%": { transform: "translateY(0)", opacity: 1 }
  },

  "@keyframes slideRight": {
    "0%": { transform: "translateX(-20px)", opacity: 0 },
    "100%": { transform: "translateX(0)", opacity: 1 }
  },

  "@keyframes fillBar": {
    "0%": { width: "0%" },
    "100%": { width: "66%" }
  },

  "@keyframes blinkGreen": {
    "0%": { opacity: 0.6 },
    "100%": { opacity: 1 }
  },

  "@keyframes blinkYellow": {
    "0%": { opacity: 0.6 },
    "100%": { opacity: 1 }
  },

  "@keyframes float": {
    "0%": { transform: "translateY(0px)" },
    "50%": { transform: "translateY(-20px)" },
    "100%": { transform: "translateY(0px)" }
  }

};


