import React from "react";
import "../styles/testimonials.css";

export default function Testimonials() {
  return (
    <section className="testimonials-section">
      <h2 className="testimonials-title">What Our Community Says</h2>
      <div className="testimonial-cards">
        <div className="testimonial-card">
          <p className="testimonial-quote">
            “SUP’CONNECT helped me reconnect with alumni who mentored me through my career journey.”
          </p>
          <p className="testimonial-author">— Sarah, Alumni</p>
        </div>
        <div className="testimonial-card">
          <p className="testimonial-quote">
            “A great platform to share knowledge and collaborate on meaningful projects.”
          </p>
          <p className="testimonial-author">— Ahmed, Student</p>
        </div>
      </div>
    </section>
  );
}
