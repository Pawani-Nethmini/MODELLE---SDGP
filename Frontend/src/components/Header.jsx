import { Link } from "react-router-dom";
import ProfileIcon from "./ProfileIcon";
import logo from "../assets/Modelle-logo.png";
import "../styles/header.css";

export default function Header() {
  return (
    
    <header className="header">
      {/* Left side: Logo */}
      <div className="logo-container">
        <img src={logo} alt="Modelle Logo" className="logo-img" />
      </div>

      {/* Navigation */}
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/upload-stl">Upload STL</Link>
        <Link to="/printers">Printers</Link>
        <Link to="/designers">Designers</Link>
        <Link to="/my-projects">My Projects</Link>
        <Link to="/my-orders">My Orders</Link>
      </nav>

      {/* Right side: Profile */}
      <ProfileIcon />
    </header>
  );
}
