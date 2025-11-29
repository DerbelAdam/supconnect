import React from "react";

export default function WhySection() {
  return (
    <section className="py-20 px-8 bg-gradient-to-b from-white to-[#f7f9fc] text-center">
      
      {/* Title */}
      <h2 className="text-3xl text-[#0A1F44] mb-12 font-bold">
        Why SUP’CONNECT?
      </h2>

      {/* Cards container */}
      <div className="flex justify-center gap-8 flex-wrap">

        {/* CARD TEMPLATE */}
        {[
          { icon: "📘", title: "Share Knowledge", text: "Exchange expertise across generations." },
          { icon: "🤝", title: "Collaborate Across Generations", text: "Build meaningful projects with students and alumni." },
          { icon: "🌱", title: "Grow Together", text: "Create a future with shared opportunities." },
        ].map((item, index) => (
          <div
            key={index}
            className="
              bg-white p-8 w-[280px] rounded-xl shadow-md 
              transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl
              border border-transparent hover:border-[#E63946]/40
            "
          >
            {/* ICON CIRCLE */}
            <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-[#E63946]/10 flex items-center justify-center text-3xl">
              {item.icon}
            </div>

            {/* TITLE */}
            <h3 className="text-[#0A1F44] font-semibold text-lg mb-2">
              {item.title}
            </h3>

            {/* TEXT */}
            <p className="text-gray-600">
              {item.text}
            </p>

            {/* Highlight line */}
            <div className="w-12 h-1 bg-[#E63946] mx-auto mt-4 rounded-full opacity-70"></div>
          </div>
        ))}

      </div>
    </section>
  );
}
