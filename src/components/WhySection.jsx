import React from "react";
import "../styles/why.css";

export default function WhySection() {
  return (
    <section className="why-section">
      <h2 className="why-title">Why SUP’CONNECT?</h2>
      <div className="why-cards">
        <div className="why-card">
          <div className="why-icon">📘</div>
          <h3>Share Knowledge</h3>
          <p>Exchange expertise across generations.</p>
        </div>
        <div className="why-card">
          <div className="why-icon">🤝</div>
          <h3>Collaborate Across Generations</h3>
          <p>Build meaningful projects with students and alumni.</p>
        </div>
        <div className="why-card">
          <div className="why-icon">🌱</div>
          <h3>Grow Together</h3>
          <p>Create a future with shared opportunities.</p>
        </div>
      </div>
    </section>
  );
}
