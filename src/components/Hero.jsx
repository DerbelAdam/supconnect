import React from "react";
import "../styles/hero.css";
import heroImg from "../assets/hero.jpg";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-text">
        <h1 className="hero-title">Reconnecting Generations of SUP’COM</h1>
        <p className="hero-subtitle">
          A unified platform that brings together students, alumni, teachers, and administrators.
        </p>
        <div className="hero-buttons">
          <button className="btn btn-join">Join Now</button>
          <button className="btn btn-login">Login</button>
        </div>
      </div>
      <div className="hero-image">
        <img src={heroImg} alt="Community connected illustration" />
      </div>
    </section>
  );
}
