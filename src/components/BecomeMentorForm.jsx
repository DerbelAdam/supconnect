import React from "react";

export default function BecomeMentorForm({ formData, setFormData, onSubmit }) {
  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
        placeholder="Full Name"
        className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-sup-blue"
        required
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
        placeholder="Email address"
        className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-sup-blue"
        required
      />
      <input
        name="expertise"
        value={formData.expertise}
        onChange={(e) => setFormData(prev => ({ ...prev, expertise: e.target.value }))}
        placeholder="Area of expertise"
        className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-sup-blue"
        required
      />
      <button
        type="submit"
        className="mt-2 px-6 py-3 bg-sup-blue text-white rounded-lg font-semibold hover:bg-sky-900"
      >
        Submit Application
      </button>
    </form>
  );
}
