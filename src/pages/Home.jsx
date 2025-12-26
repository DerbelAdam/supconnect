import React from "react";
import Hero from "../components/HeroNew";
import WhySection from "../components/WhySectionNew";
import StatsSection from "../components/StatsSectionNew";
import Testimonials from "../components/TestimonialsNew";
import Footer from "../components/FooterNew";

export default function Home() {
  return (
    <div>
      <Hero />
      <WhySection />
      <StatsSection />
      <Testimonials />
      <Footer />
    </div>
  );
}
