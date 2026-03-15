import { Link, useNavigate } from "react-router-dom";
import ProfileIcon from "../ProfileIcon";
import logo from "../../assets/Modelle-logo.png";
import "../../styles/header.css";

export default function PrinterNavbar() {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Modelle Logo" className="logo-img" />
      </div>

      <nav className="nav-links">
        <Link to="/printer">Notifications</Link>
        <Link to="/printer/jobs">My Jobs</Link>
        <Link to="/printer/showroom">Upload & Manage</Link>
        <Link to="/showroom">Showroom</Link>
      </nav>

      <ProfileIcon />
    </header>
  );
}
