// import { Link } from "react-router-dom";
// import "../styles/navbar.css";

// export default function Navbar() {
//   return (
//     <nav className="navbar">
//       <div className="nav-logo">
//         SUP’<span className="logo-red">CONNECT</span>
//       </div>
//       <div className="nav-links">
//         <Link to="/">Home</Link>
//         <Link to="/community">Community</Link>
//         <Link to="/mentorship">Mentorship</Link>
//         <Link to="/carriere-opportunites">Careers</Link>
//         <Link to="/events">Events</Link>
//         <Link to="/login" className="login-link">Login / Sign Up</Link>
//       </div>
//     </nav>
//   );
// }

// src/components/Navbar.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/navbar.css";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/home" className="navbar-logo">
          <span style={{ color: "var(--blue-dark)" }}>SUP'</span>
          <span style={{ color: "var(--red)" }}>CONNECT</span>
        </Link>


        <button
          className="navbar-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        <ul className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          <li>
            <Link to="/home" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/community" onClick={() => setIsMenuOpen(false)}>
              Community
            </Link>
          </li>
          <li>
            <Link to="/mentorship" onClick={() => setIsMenuOpen(false)}>
              Mentorship
            </Link>
          </li>
          <li>
            <Link to="/career" onClick={() => setIsMenuOpen(false)}>
              Careers
            </Link>
          </li>
        </ul>

        <div className="navbar-auth">
          {currentUser ? (
            <div className="user-menu">
              <button
                className="user-avatar"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : "U"}
              </button>
              {showUserMenu && (
                <div className="user-dropdown">
                  <div className="user-info">
                    <p className="user-name">{currentUser.name || "Utilisateur"}</p>
                    <p className="user-email">{currentUser.email}</p>
                  </div>
                  <hr />
                  <Link to="/profile" onClick={() => setShowUserMenu(false)}>
                    Mon profil
                  </Link>
                  <Link to="/settings" onClick={() => setShowUserMenu(false)}>
                    Paramètres
                  </Link>
                  <hr />
                  <button onClick={handleLogout} className="logout-btn">
                    Se déconnecter
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="btn-login">
                Se connecter
              </Link>
              <Link to="/signup" className="btn-signup">
                S'inscrire
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}