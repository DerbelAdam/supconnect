import React from "react";

export default function MentorCard({ mentor, onContact }) {
  // Obtenir les initiales du mentor
  const initials = mentor.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <article className="mentor-card bg-white border border-transparent hover:border-sup-blue rounded-xl p-6 shadow-card transform transition hover:-translate-y-2">
      <div className="flex flex-col items-center text-center">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-sup-blue to-sup-red flex items-center justify-center text-white font-bold text-2xl mb-4 border-4 border-sup-red shadow-lg">
          {initials}
        </div>
        <h3 className="text-lg font-semibold text-sup-blue">{mentor.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{mentor.position}</p>
        <span className="mt-2 inline-block bg-sup-light-blue text-sup-blue px-3 py-1 rounded-full text-xs font-semibold">
          {mentor.promo}
        </span>
        <p className="mt-4 text-sm text-gray-600 leading-relaxed">{mentor.bio}</p>
        <button
          onClick={() => onContact(mentor)}
          className="mt-5 w-full inline-block bg-sup-red text-white py-2 rounded-md font-medium hover:bg-red-600"
        >
          Contact
        </button>
      </div>
    </article>
  );
}
