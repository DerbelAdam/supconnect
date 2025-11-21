import React from "react";

export default function MentorCard({ mentor, onContact }) {
  return (
    <article className="mentor-card bg-white border border-transparent hover:border-sup-blue rounded-xl p-6 shadow-card transform transition hover:-translate-y-2">
      <div className="flex flex-col items-center text-center">
        <img
          src={mentor.photo}
          alt={mentor.name}
          className="w-24 h-24 rounded-full object-cover border-4 border-sup-red mb-4"
          loading="lazy"
        />
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
