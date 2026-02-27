import { Link } from "react-router-dom";
import ProfileIcon from "../ProfileIcon";
import logo from "../../assets/Modelle-logo.png";
import "../../styles/header.css";

export default function PrinterNavbar({ onUpload }) {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Modelle Logo" className="logo-img" />
      </div>

      <nav className="nav-links">
        <Link to="/printer">Notifications</Link>
        <Link to="/printer/jobs">My Jobs</Link>
        <button onClick={onUpload} className="nav-link" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit' }}>
          Upload
        </button>
        <Link to="/showroom">Showroom</Link>
      </nav>

      <ProfileIcon />
    </header>
  );
}