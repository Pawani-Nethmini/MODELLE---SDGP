import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { login, getUserRole } from "../../services/authService";
import "../../styles/printerSignIn.css";

export default function PrinterSignInPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const user = await login(email, password);
      const role = await getUserRole(user.uid);

      if (role !== "printer") {
        setError("This account is not registered as a printer. Please use your printer credentials.");
      } else {
        navigate("/printer/showroom");
      }
    } catch (err) {
      setError(err.message || "Failed to sign in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="printer-signin-container">
      <div className="signin-card">
        <button 
          className="back-btn"
          onClick={() => navigate(-1)}
          title="Go back"
        >
          ← Back
        </button>

        <div className="signin-header">
          <h1 className="signin-title">Unlock Printer Features</h1>
          <p className="signin-subtitle">Sign in with your printer account to upload creations to the showroom</p>
        </div>

        <form onSubmit={handleSignIn} className="signin-form">
          {error && (
            <div className="signin-error">
              ⚠️ {error}
            </div>
          )}

          <div className="signin-form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your-printer@email.com"
              required
              disabled={loading}
            />
          </div>

          <div className="signin-form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="signin-button" 
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In as Printer"}
          </button>
        </form>

        <div className="signin-divider">
          Don't have a printer account?
        </div>

        <button 
          className="signup-button"
          onClick={() => navigate("/register/printer")}
          disabled={loading}
        >
          Register as Printer
        </button>
      </div>
    </div>
  );
}
