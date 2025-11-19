import React from "react";
import "../styles/community.css";
import Footer from "../components/Footer";

export default function Community() {
  return (
    <div className="community-page">
      <section className="community-hero">
        <h1>Community</h1>
        <p>
          Connect with students, alumni, teachers and build meaningful relationships.
        </p>
      </section>

      <section className="community-features">
        <div className="feature-card">
          <h3>Discussion Forums</h3>
          <p>Share ideas, ask questions, and engage in academic conversations.</p>
        </div>
        <div className="feature-card">
          <h3>Group Projects</h3>
          <p>Collaborate on projects with fellow SUP’COM members.</p>
        </div>
        <div className="feature-card">
          <h3>Networking Events</h3>
          <p>Join events to connect with professionals, alumni, and peers.</p>
        </div>
      </section>

      <section className="community-call-to-action">
        <button className="btn-join-red">Join the Community</button>
      </section>
      <Footer />
    </div>
  );
}
