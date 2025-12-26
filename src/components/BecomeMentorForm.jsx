import React from "react";

export default function BecomeMentorForm({ formData, setFormData, onSubmit }) {
  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>

      {/* Poste */}
      <input
        value={formData.position}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, position: e.target.value }))
        }
        placeholder="Current position (ex: Senior Backend Engineer)"
        className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-sup-blue"
        required
      />

      {/* Entreprise */}
      <input
        value={formData.company}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, company: e.target.value }))
        }
        placeholder="Company / Organization"
        className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-sup-blue"
        required
      />

      {/* Domaine */}
      <input
        value={formData.domain}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, domain: e.target.value }))
        }
        placeholder="Domain (ex: Software Engineering, AI, Cybersecurity)"
        className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-sup-blue"
        required
      />

      {/* Promo */}
      <input
        value={formData.promo}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, promo: e.target.value }))
        }
        placeholder="SUP'COM promo year (ex: 2018)"
        className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-sup-blue"
      />

      {/* Bio */}
      <textarea
        value={formData.bio}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, bio: e.target.value }))
        }
        placeholder="Short bio / How can you help students?"
        rows="4"
        className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-sup-blue"
        required
      />

      <button
        type="submit"
        className="mt-2 px-6 py-3 bg-sup-blue text-white rounded-lg font-semibold hover:bg-sky-900"
      >
        Become a Mentor
      </button>
    </form>
  );
}
