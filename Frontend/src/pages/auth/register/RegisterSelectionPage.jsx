import { useNavigate } from "react-router-dom";
import "../../../styles/auth.css";

export default function RegisterSelectionPage() {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Select Your Role</h1>
        <p className="auth-subtitle">Choose how you'd like to use Modelle</p>

        <div className="role-selection">
          <button
            className="role-button"
            onClick={() => navigate("/register/customer")}
          >
             Customer
          </button>
          <button
            className="role-button"
            onClick={() => navigate("/register/designer")}
          >
             Designer
          </button>
          <button
            className="role-button"
            onClick={() => navigate("/register/printer")}
          >
             Printer
          </button>
        </div>
      </div>
    </div>
  );
}
