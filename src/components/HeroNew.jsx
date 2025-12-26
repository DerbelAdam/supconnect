import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import heroImg from "../assets/hero.jpg";

export default function Hero() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    setEmail(localStorage.getItem("email"));
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0A1F44] via-blue-900 to-blue-800 text-white py-24">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E30613] opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 opacity-5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* LEFT CONTENT */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-black leading-tight">
                Connecter les <span className="text-[#E30613]">générations</span> de SUP'COM
              </h1>
              
              <p className="text-xl text-blue-100 leading-relaxed">
                Une plateforme unifiée pour les étudiants, alumni, enseignants et administrateurs. Partagez vos expériences, trouvez un mentor, et accédez aux meilleures opportunités.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
                <p className="text-2xl font-bold">2000+</p>
                <p className="text-sm text-blue-200">Alumni actifs</p>
              </div>
              <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
                <p className="text-2xl font-bold">500+</p>
                <p className="text-sm text-blue-200">Étudiants</p>
              </div>
              <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
                <p className="text-2xl font-bold">100+</p>
                <p className="text-sm text-blue-200">Mentors</p>
              </div>
            </div>

            {/* CTA Buttons */}
            {!email ? (
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  to="/signup"
                  className="bg-[#E30613] hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition transform hover:scale-105 text-center"
                >
                  Commencer
                </Link>
                <Link
                  to="/login"
                  className="bg-white/20 hover:bg-white/30 backdrop-blur text-white px-8 py-4 rounded-xl font-bold text-lg transition border border-white/30 text-center"
                >
                  Se connecter
                </Link>
              </div>
            ) : (
              <div className="flex gap-4 pt-4">
                <Link
                  to="/community"
                  className="bg-[#E30613] hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold transition transform hover:scale-105"
                >
                  Découvrir la Communauté
                </Link>
                <Link
                  to="/mentorship"
                  className="bg-white/20 hover:bg-white/30 backdrop-blur text-white px-8 py-4 rounded-xl font-bold transition border border-white/30"
                >
                  Trouver un Mentor
                </Link>
              </div>
            )}
          </div>

          {/* RIGHT IMAGE */}
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#E30613] to-blue-500 rounded-2xl opacity-20 blur-2xl"></div>
              <img
                src={heroImg}
                alt="Community connected illustration"
                className="relative w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
