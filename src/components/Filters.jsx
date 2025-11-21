import React from "react";

export default function Filters({
  searchTerm,
  setSearchTerm,
  filters,
  setFilters,
  onSearch
}) {
  return (
    <form
      className="w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-4 md:gap-6"
      onSubmit={(e) => { e.preventDefault(); onSearch(); }}
    >
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        type="text"
        placeholder="Search mentors by name or expertise..."
        className="w-full md:flex-1 px-5 py-3 rounded-full border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-sup-blue"
      />

      <div className="flex gap-3 flex-wrap justify-center">
        <select
          name="domain"
          value={filters.domain}
          onChange={(e) => setFilters(prev => ({ ...prev, domain: e.target.value }))}
          className="px-4 py-2 rounded-full border border-sup-blue text-sup-blue font-medium"
        >
          <option value="">Domain</option>
          <option value="Software Engineering">Software Engineering</option>
          <option value="Data Science">Data Science</option>
          <option value="Cybersecurity">Cybersecurity</option>
          <option value="Product Management">Product Management</option>
          <option value="UX/UI Design">UX/UI Design</option>
          <option value="DevOps">DevOps</option>
        </select>

        <select
          name="promo"
          value={filters.promo}
          onChange={(e) => setFilters(prev => ({ ...prev, promo: e.target.value }))}
          className="px-4 py-2 rounded-full border border-sup-blue text-sup-blue font-medium"
        >
          <option value="">Promo Year</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
          <option value="2014">2014</option>
        </select>

        <select
          name="company"
          value={filters.company}
          onChange={(e) => setFilters(prev => ({ ...prev, company: e.target.value }))}
          className="px-4 py-2 rounded-full border border-sup-blue text-sup-blue font-medium"
        >
          <option value="">Company</option>
          <option value="Google">Google</option>
          <option value="Microsoft">Microsoft</option>
          <option value="Meta">Meta</option>
          <option value="Amazon">Amazon</option>
        </select>
      </div>

      <button
        type="submit"
        className="px-6 py-2 bg-sup-red text-white rounded-full font-semibold hover:shadow-lg"
      >
        Search
      </button>
    </form>
  );
}
