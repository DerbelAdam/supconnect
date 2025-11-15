import React from "react";
import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo">SUP’<span className="logo-red">CONNECT</span></div>
      <div className="footer-links">
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <a href="/privacy">Privacy Policy</a>
      </div>
      <p className="footer-copy">&copy; {new Date().getFullYear()} SUP’CONNECT. All rights reserved.</p>
    </footer>
  );
}
