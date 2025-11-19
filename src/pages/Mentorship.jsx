import React from "react";
import "../styles/mentorship.css";

export default function Mentorship() {
  return (
    <div className="mentorship-page">
      <section className="mentorship-hero">
        <h1>Mentorship</h1>
        <p>
          Get paired with alumni or senior students to get guidance on your academic or career path.
        </p>
      </section>

      <section className="mentorship-features">
        <div className="mentorship-card">
          <h3>One-on-One Mentoring</h3>
          <p>Personalized mentoring sessions with experienced professionals.</p>
        </div>
        <div className="mentorship-card">
          <h3>Group Mentoring</h3>
          <p>Join group mentorship circles for peer learning and support.</p>
        </div>
        <div className="mentorship-card">
          <h3>Career Guidance</h3>
          <p>Get help building resumes, preparing for internships and more.</p>
        </div>
      </section>

      <section className="mentorship-call-to-action">
        <button className="btn-join-red">Become a Mentor</button>
        <button className="btn-outline-blue">Find a Mentor</button>
      </section>
      
    </div>
  );
}
