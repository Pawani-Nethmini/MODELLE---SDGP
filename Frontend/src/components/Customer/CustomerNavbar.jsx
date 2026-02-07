import { Link } from "react-router-dom";
import ProfileIcon from "../ProfileIcon";
import logo from "../../assets/Modelle-logo.png";
import "../../styles/header.css";

export default function Header() {
  return (
    
    <header className="header">
      {/* Left side: Logo */}
      <div className="logo-container">
        <img src={logo} alt="Modelle Logo" className="logo-img" />
      </div>

      {/* Navigation */}
      <nav className="nav-links">
        <Link to="/customer">Home</Link> {/* Customer dashboard */}
        <Link to="/customer/upload-stl">Upload STL</Link>
        <Link to="/customer/printers">Printers</Link>
        <Link to="/customer/designers">Designers</Link>
        <Link to="/customer/my-projects">My Projects</Link>
        <Link to="/customer/my-orders">My Orders</Link>
      </nav>
      {/* Right side: Profile */}
      <ProfileIcon />
    </header>
  );
}
