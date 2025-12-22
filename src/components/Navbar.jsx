import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const userMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const handleLogout = async () => {
    localStorage.removeItem("email");
    await logout();
    navigate("/login");
  };

  /* Scroll effect */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close menus when clicking outside */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target) &&
        !e.target.closest(".mobile-toggle")
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* Prevent body scroll on mobile */
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => (document.body.style.overflow = "unset");
  }, [isMenuOpen]);

  const navItems = [
    { to: "/home", label: "Home" },
    { to: "/community", label: "Community" },
    { to: "/mentorship", label: "Mentorship" },
    { to: "/career", label: "Careers" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 backdrop-blur-md
      ${isScrolled ? "bg-white/90 shadow-md h-14" : "bg-white/80 shadow-sm h-16"}
      border-b border-gray-200`}
    >
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/home" className="text-2xl font-bold tracking-tight">
          <span className="text-blue-900">SUP'</span>
          <span className="text-red-600">CONNECT</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition
                ${
                  active
                    ? "text-blue-900"
                    : "text-gray-700 hover:text-blue-900 hover:bg-gray-100"
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute left-3 right-3 -bottom-1 h-0.5 bg-blue-900 rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop auth */}
        <div className="hidden md:flex items-center gap-3">
          {currentUser ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="relative w-10 h-10 rounded-full bg-gradient-to-br from-blue-900 to-blue-700 text-white font-semibold flex items-center justify-center"
              >
                {currentUser.name?.[0]?.toUpperCase() || "U"}
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-xl border border-gray-200 animate-fadeIn">
                  <div className="px-4 py-3 border-b">
                    <p className="font-semibold">{currentUser.name}</p>
                    <p className="text-xs text-gray-500 truncate">
                      {currentUser.email}
                    </p>
                  </div>
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-50">
                    Mon profil
                  </Link>
                  <Link to="/settings" className="block px-4 py-2 hover:bg-gray-50">
                    Paramètres
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                  >
                    Se déconnecter
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 text-sm">
                Se connecter
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2 bg-blue-900 text-white rounded-lg"
              >
                S'inscrire
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="mobile-toggle md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      <div
        ref={mobileMenuRef}
        className={`md:hidden transition-all duration-300 overflow-hidden
        ${isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="bg-white border-t px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-3 rounded-lg hover:bg-gray-100"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
