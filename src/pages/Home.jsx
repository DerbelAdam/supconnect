import React from "react";
import Hero from "../components/Hero";
import WhySection from "../components/WhySection";
import StatsSection from "../components/StatsSection";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

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
