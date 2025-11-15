import { Link } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        SUP’<span className="logo-red">CONNECT</span>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/community">Community</Link>
        <Link to="/mentorship">Mentorship</Link>
        <Link to="/carriere-opportunites">Careers</Link>
        <Link to="/events">Events</Link>
        <Link to="/login" className="login-link">Login / Sign Up</Link>
      </div>
    </nav>
  );
}

