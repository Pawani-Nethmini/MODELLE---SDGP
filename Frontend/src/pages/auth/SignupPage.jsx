import { useNavigate } from "react-router-dom";
import "../../styles/auth.css";

export default function SignupPage() {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Join Modelle</h1>
        <p className="auth-subtitle">Select your role to get started</p>

        <div className="role-selection">
          <button
            className="role-button"
            onClick={() => navigate("/register/customer")}
          >
            👤 Customer
          </button>
          <button
            className="role-button"
            onClick={() => navigate("/register/printer")}
          >
            🖨️ Printer
          </button>
          <button
            className="role-button"
            onClick={() => navigate("/register/designer")}
          >
            🎨 Designer
          </button>
        </div>

        <div className="auth-link">
          Already have an account? <a href="/login">Sign in</a>
        </div>
      </div>
    </div>
  );
}
