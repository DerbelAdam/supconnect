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
    await logout();
    navigate("/login");
  };

  /* =====================
     SCROLL EFFECT
     ===================== */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* =====================
     CLICK OUTSIDE
     ===================== */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* =====================
     BASE NAV ITEMS
     ===================== */
  const navItems = [
    { to: "/home", label: "Home" },
    { to: "/community", label: "Community" },
    { to: "/mentorship", label: "Mentorship" },
  ];

  /* =====================
     DASHBOARD LINK (FIXED)
     ===================== */
  let dashboardLink = null;

  if (currentUser?.role === "student") {
    dashboardLink = { to: "/my-requests", label: "My Requests" };
  }

  if (
    currentUser?.role === "mentor" ||
    ((currentUser?.role === "alumni" || currentUser?.role === "teacher") &&
      currentUser?.isMentor === true)
  ) {
    dashboardLink = { to: "/mentor/dashboard", label: "Mentor Dashboard" };
  }

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 backdrop-blur
      ${isScrolled ? "bg-white/95 shadow-md h-14" : "bg-white/80 shadow-sm h-16"}
      border-b border-gray-200`}
    >
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* LOGO */}
        <Link to="/home" className="text-2xl font-bold tracking-tight">
          <span className="text-blue-900">SUP'</span>
          <span className="text-red-600">CONNECT</span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition
                ${
                  active
                    ? "text-blue-900 bg-blue-50"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          {currentUser && dashboardLink && (
            <Link
              to={dashboardLink.to}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition
              ${
                location.pathname === dashboardLink.to
                  ? "bg-blue-900 text-white"
                  : "text-blue-900 hover:bg-blue-50"
              }`}
            >
              {dashboardLink.label}
            </Link>
          )}
        </div>

        {/* USER MENU */}
        <div className="hidden md:flex items-center">
          {currentUser ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-900 to-blue-700
                text-white font-bold flex items-center justify-center shadow"
              >
                {currentUser.firstName?.[0]?.toUpperCase() || "U"}
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-lg border animate-fadeIn">
                  <div className="px-4 py-3 border-b">
                    <p className="font-semibold">
                      {currentUser.firstName} {currentUser.lastName}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {currentUser.email}
                    </p>
                  </div>

                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-50"
                  >
                    Mon profil
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

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden bg-white border-t px-4 py-4 space-y-2"
        >
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

          {currentUser && dashboardLink && (
            <Link
              to={dashboardLink.to}
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-3 rounded-lg font-semibold text-blue-900 hover:bg-blue-50"
            >
              {dashboardLink.label}
            </Link>
          )}

          {!currentUser && (
            <div className="pt-2 border-t space-y-2">
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2 text-center text-blue-900 hover:bg-blue-50 rounded-lg"
              >
                Se connecter
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2 text-center bg-blue-900 text-white rounded-lg"
              >
                S'inscrire
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
