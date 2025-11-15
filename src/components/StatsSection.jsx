import React from "react";
import "../styles/stats.css";

export default function StatsSection() {
  return (
    <section className="stats-section">
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-number">2000+</div>
          <div className="stat-label">Alumni</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">500+</div>
          <div className="stat-label">Students</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">100+</div>
          <div className="stat-label">Teachers</div>
        </div>
      </div>
    </section>
  );
}
