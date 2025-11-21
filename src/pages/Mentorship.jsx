import React, { useMemo, useState } from "react";
import Filters from "../components/Filters";
import MentorCard from "../components/MentorCard";
import BecomeMentorForm from "../components/BecomeMentorForm";
import Footer from "../components/Footer";

const initialMentors = [
  {
    id: 1,
    name: "Ahmed Khalil",
    photo: "https://i.pravatar.cc/150?img=12",
    position: "Senior Software Engineer at Google",
    promo: "Promo 2015",
    bio: "Passionate about AI and machine learning. Happy to help students navigate their tech careers.",
    domain: "Software Engineering",
    company: "Google"
  },
  {
    id: 2,
    name: "Salma Mansour",
    photo: "https://i.pravatar.cc/150?img=45",
    position: "Product Manager at Microsoft",
    promo: "Promo 2013",
    bio: "Specialized in product strategy and user experience.",
    domain: "Product Management",
    company: "Microsoft"
  },
  {
    id: 3,
    name: "Youssef Ben Ali",
    photo: "https://i.pravatar.cc/150?img=33",
    position: "Data Scientist at Meta",
    promo: "Promo 2016",
    bio: "Expert in data analytics and ML algorithms.",
    domain: "Data Science",
    company: "Meta"
  },
  {
    id: 4,
    name: "Leila Hamdi",
    photo: "https://i.pravatar.cc/150?img=47",
    position: "Cybersecurity Lead at Orange",
    promo: "Promo 2014",
    bio: "Network security and ethical hacking specialist.",
    domain: "Cybersecurity",
    company: "Orange"
  },
  {
    id: 5,
    name: "Karim Trabelsi",
    photo: "https://i.pravatar.cc/150?img=15",
    position: "DevOps Engineer at Amazon",
    promo: "Promo 2017",
    bio: "Cloud infrastructure and automation expert.",
    domain: "DevOps",
    company: "Amazon"
  },
  {
    id: 6,
    name: "Nadia Sassi",
    photo: "https://i.pravatar.cc/150?img=44",
    position: "UX Designer at Adobe",
    promo: "Promo 2015",
    bio: "Design thinking and user research advocate.",
    domain: "UX/UI Design",
    company: "Adobe"
  }
];

export default function Mentorship() {
  const [filters, setFilters] = useState({ domain: "", promo: "", company: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", expertise: "" });

  const mentors = initialMentors;

  // filtered list computed with useMemo for performance
  const filteredMentors = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return mentors.filter((m) => {
      if (filters.domain && m.domain !== filters.domain) return false;
      if (filters.promo && !m.promo.includes(filters.promo)) return false;
      if (filters.company && m.company !== filters.company) return false;
      if (!q) return true;
      return (
        m.name.toLowerCase().includes(q) ||
        m.position.toLowerCase().includes(q) ||
        (m.domain && m.domain.toLowerCase().includes(q))
      );
    });
  }, [mentors, filters, searchTerm]);

  const handleSearch = () => {
    // currently handled by state; no extra action needed
  };

  const handleContact = (mentor) => {
    // Replace with modal or real contact flow
    alert(`Requesting to connect with ${mentor.name}.`);
  };

  const handleBecomeMentor = (e) => {
    e.preventDefault();
    // submit to API later — for now, console + alert
    console.log("Mentor application:", formData);
    alert("Thank you for applying to become a mentor! We'll contact you soon.");
    setFormData({ name: "", email: "", expertise: "" });
  };

  return (
    <div className="mentorship-page">
      {/* HEADER / HERO */}
      <header className="bg-white py-24 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-poppins font-bold text-sup-blue">
            SUP'COM Mentorship Program
          </h1>
          <div className="w-36 h-1 bg-sup-red rounded-full mx-auto mt-4"></div>
          <p className="max-w-2xl mx-auto mt-6 text-sup-gray text-lg">
            Find guidance from alumni and build your career path.
          </p>
        </div>
      </header>

      {/* SEARCH / FILTERS */}
      <section className="py-12 bg-sup-light-blue">
        <div className="container mx-auto px-6">
          <Filters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filters={filters}
            setFilters={setFilters}
            onSearch={handleSearch}
          />
        </div>
      </section>

      {/* MENTORS GRID */}
      <section className="py-14">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-semibold text-sup-blue mb-6">Available Mentors</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentors.length ? (
              filteredMentors.map((m) => (
                <MentorCard key={m.id} mentor={m} onContact={handleContact} />
              ))
            ) : (
              <p className="text-gray-500">No mentors match your search / filters.</p>
            )}
          </div>
        </div>
      </section>

      {/* BECOME A MENTOR */}
      <section className="py-16 bg-sup-light-blue">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-card">
            <h3 className="text-2xl font-semibold text-sup-blue mb-3">Become a Mentor</h3>
            <p className="text-sup-gray mb-6">
              Share your experience and help shape the future of SUP'COM students.
            </p>

            <BecomeMentorForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleBecomeMentor}
            />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS — simple static block (you can extend later) */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-semibold text-sup-blue text-center mb-8">Success Stories</h3>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-white p-6 rounded-xl shadow-card">
              <div className="text-5xl text-sup-red leading-none">“</div>
              <p className="text-gray-600 mt-2">The mentorship program helped me land my dream internship. My mentor provided invaluable guidance!</p>
              <p className="mt-4 font-semibold text-sup-blue">Sara Jemli</p>
              <p className="text-sm text-gray-500">Student - 2nd Year</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-card">
              <div className="text-5xl text-sup-red leading-none">“</div>
              <p className="text-gray-600 mt-2">Connecting with alumni mentors gave me real-world insights I couldn't get from textbooks.</p>
              <p className="mt-4 font-semibold text-sup-blue">Omar Boussetta</p>
              <p className="text-sm text-gray-500">Student - 3rd Year</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-card">
              <div className="text-5xl text-sup-red leading-none">“</div>
              <p className="text-gray-600 mt-2">As a mentor, it's incredibly rewarding to help the next generation succeed.</p>
              <p className="mt-4 font-semibold text-sup-blue">Hichem Farhat</p>
              <p className="text-sm text-gray-500">Alumni - Promo 2012</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
