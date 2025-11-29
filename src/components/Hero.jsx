import React, { useEffect, useState } from "react";
import heroImg from "../assets/hero.jpg";

export default function Hero() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    setEmail(localStorage.getItem("email"));
  }, []);

  return (
    <section className="flex items-center justify-between px-8 py-16 bg-white">
      
      {/* LEFT TEXT */}
      <div className="max-w-[50%]">
        <h1 className="text-[2.8rem] text-[#0A1F44] font-bold mb-4 leading-tight">
          Reconnecting Generations of SUP’COM
        </h1>

        <p className="text-[1.2rem] text-gray-600">
          A unified platform that brings together students, alumni, teachers, and administrators.
        </p>

        {/* Buttons only if NOT logged in */}
        {!email && (
          <div className="mt-8 flex gap-4">
            <button className="text-white bg-[#E30613] px-6 py-3 rounded-lg text-lg font-medium">
              Join Now
            </button>

            <button className="bg-white text-[#0A1F44] border-2 border-[#0A1F44] px-6 py-3 rounded-lg text-lg font-medium">
              Login
            </button>
          </div>
        )}
      </div>

      {/* RIGHT IMAGE */}
      <div className="max-w-[500px] w-full">
        <img
          src={heroImg}
          alt="Community connected illustration"
          className="w-full h-auto"
        />
      </div>
    </section>
  );
}
