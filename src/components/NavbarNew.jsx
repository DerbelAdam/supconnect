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
    { to: "/home", label: "Accueil" },
    { to: "/community", label: "Communauté" },
    { to: "/mentorship", label: "Mentorat" },
  ];

  /* =====================
     DASHBOARD LINK (FIXED)
     ===================== */
  let dashboardLink = null;

  if (currentUser?.role === "student") {
    dashboardLink = { to: "/my-requests", label: "Mes Demandes" };
  }

  if (
    currentUser?.role === "mentor" ||
    ((currentUser?.role === "alumni" || currentUser?.role === "teacher") &&
      currentUser?.isMentor === true)
  ) {
    dashboardLink = { to: "/mentor/dashboard", label: "Tableau de Bord" };
  }

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur shadow-lg h-14"
          : "bg-white/80 backdrop-blur shadow-md h-16"
      } border-b border-gray-200/50`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/home" className="flex items-center gap-2 font-black text-xl hover:opacity-80 transition">
          <span className="text-2xl font-black">
            <span className="text-blue-900">SUP'</span>
            <span className="text-red-600">CONNECT</span>
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                isActive(item.to)
                  ? "text-blue-900 bg-blue-50 shadow-sm"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </Link>
          ))}

          {currentUser && dashboardLink && (
            <Link
              to={dashboardLink.to}
              className={`px-4 py-2 text-sm font-bold rounded-lg transition-all duration-200 ${
                isActive(dashboardLink.to)
                  ? "bg-red-600 text-white shadow-lg"
                  : "text-blue-900 hover:bg-blue-50 border border-blue-900/20"
              }`}
            >
              {dashboardLink.label}
            </Link>
          )}
        </div>

        {/* USER MENU */}
        <div className="hidden md:flex items-center gap-3">
          {currentUser ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-900 to-red-600
                text-white font-bold flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                {currentUser.firstName?.[0]?.toUpperCase() || "U"}
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-fadeIn">
                  {/* User Info */}
                  <div className="px-4 py-4 bg-gradient-to-r from-blue-50 to-red-50 border-b">
                    <p className="font-bold text-gray-800">
                      {currentUser.firstName} {currentUser.lastName}
                    </p>
                    <p className="text-xs text-gray-600 truncate mt-1">
                      {currentUser.email}
                    </p>
                    <span className="inline-block text-xs font-semibold text-blue-900 bg-blue-100 px-2 py-1 rounded-full mt-2">
                      {currentUser.role === "student" ? "Étudiant" : currentUser.role === "alumni" ? "Alumni" : "Enseignant"}
                    </span>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">
                    <Link
                      to="/profile"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-lg">👤</span>
                      <div>
                        <p className="font-semibold text-gray-700">Mon Profil</p>
                        <p className="text-xs text-gray-500">Gérer mon profil</p>
                      </div>
                    </Link>

                    {dashboardLink && (
                      <Link
                        to={dashboardLink.to}
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <span className="text-lg">📊</span>
                        <div>
                          <p className="font-semibold text-gray-700">{dashboardLink.label}</p>
                          <p className="text-xs text-gray-500">Mes demandes et statut</p>
                        </div>
                      </Link>
                    )}

                    <hr className="my-2" />

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 transition-colors text-red-600"
                    >
                      <span className="text-lg">🚪</span>
                      <div className="text-left">
                        <p className="font-semibold">Se déconnecter</p>
                        <p className="text-xs text-red-500">Quitter la session</p>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              <Link 
                to="/login" 
                className="px-4 py-2 text-sm font-semibold text-blue-900 hover:bg-blue-50 rounded-lg transition"
              >
                Se connecter
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition shadow-md hover:shadow-lg"
              >
                S'inscrire
              </Link>
            </div>
          )}
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden text-2xl font-bold hover:opacity-70 transition"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden bg-white border-t shadow-lg animate-slideDown"
        >
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                  isActive(item.to)
                    ? "bg-blue-50 text-blue-900"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {currentUser && dashboardLink && (
              <Link
                to={dashboardLink.to}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 rounded-lg font-semibold text-blue-900 bg-blue-50"
              >
                {dashboardLink.label}
              </Link>
            )}

            {!currentUser && (
              <div className="pt-2 border-t space-y-2">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 text-center text-blue-900 hover:bg-blue-50 rounded-lg font-medium"
                >
                  Se connecter
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 text-center bg-red-600 text-white rounded-lg font-bold"
                >
                  S'inscrire
                </Link>
              </div>
            )}

            {currentUser && (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="w-full mt-4 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-medium"
              >
                Se déconnecter
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
