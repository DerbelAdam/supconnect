import React, { useEffect, useMemo, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "../context/AuthContext";

import Filters from "../components/Filters";
import MentorCard from "../components/MentorCard";
import BecomeMentorForm from "../components/BecomeMentorForm";
import Footer from "../components/FooterNew";

export default function Mentorship() {
  const { currentUser } = useAuth();

  const [filters, setFilters] = useState({ domain: "", promo: "", company: "" });
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    position: "",
    company: "",
    domain: "",
    promo: "",
    bio: "",
  });

  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ============================
     FETCH MENTORS
     ============================ */
  useEffect(() => {
    async function fetchMentors() {
      try {
        const q = query(
          collection(db, "users"),
          where("isMentor", "==", true)
        );

        const snapshot = await getDocs(q);

        const mentorsData = snapshot.docs.map((d) => {
          const data = d.data();
          const fullName = `${data.firstName || ""} ${data.lastName || ""}`.trim();
          return {
            id: d.id,
            name: fullName,
            photo: data.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(fullName)}`,
            position: data.mentor?.position || "",
            promo: data.mentor?.promo ? `Promo ${data.mentor.promo}` : "",
            bio: data.mentor?.bio || "",
            domain: data.mentor?.domains?.[0] || "",
            company: data.mentor?.company || "",
            email: data.email || "",
          };
        });

        setMentors(mentorsData);
      } catch (error) {
        console.error("Erreur chargement mentors :", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMentors();
  }, []);

  /* ============================
     FILTER LOGIC
     ============================ */
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
        m.domain.toLowerCase().includes(q)
      );
    });
  }, [mentors, filters, searchTerm]);

  /* ============================
     CONTACT MENTOR (STUDENT ONLY)
     ============================ */
  const handleContact = async (mentor) => {
    if (!currentUser) {
      alert("Veuillez vous connecter.");
      return;
    }

    if (currentUser.role !== "student") {
      alert("Seuls les étudiants peuvent contacter un mentor.");
      return;
    }

    try {
      await addDoc(collection(db, "mentorshipRequests"), {
        studentId: currentUser.uid,
        studentName: `${currentUser.firstName} ${currentUser.lastName}`,
        studentEmail: currentUser.email,

        mentorId: mentor.id,
        mentorName: mentor.name,
        mentorEmail: mentor.email,

        status: "pending",
        createdAt: serverTimestamp(),
      });

      alert("Demande envoyée avec succès ✅");
    } catch (error) {
      console.error("🔥 ERREUR FIRESTORE :", error.code, error.message);
      alert(error.message);
    }

  };

  /* ============================
     BECOME MENTOR (ALUMNI / TEACHER ONLY)
     ============================ */
  const handleBecomeMentor = async (e) => {
    e.preventDefault();

    if (!currentUser) return;

    if (!["alumni", "teacher"].includes(currentUser.role)) {
      alert("Accès refusé.");
      return;
    }

    try {
      await updateDoc(doc(db, "users", currentUser.uid), {
        isMentor: true,
        mentor: {
          position: formData.position,
          company: formData.company,
          domains: [formData.domain],
          promo: formData.promo,
          bio: formData.bio,
        },
      });

      alert("Vous êtes maintenant mentor 🎉");

      setFormData({
        position: "",
        company: "",
        domain: "",
        promo: "",
        bio: "",
      });

      // Recharger la page pour mettre à jour l'état currentUser
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Mentor submit error:", error);
      alert("Erreur lors de l'enregistrement: " + error.message);
    }
  };

  /* ============================
     RENDER
     ============================ */
  return (
    <div className="mentorship-page min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      {/* HEADER */}
      <header className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-700 to-red-500 opacity-10"></div>
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-700"></div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-sup-blue to-sup-red bg-clip-text text-transparent mb-4">
            Programme de Mentorat SUP'COM
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Connectez-vous avec des mentors expérimentés pour développer votre carrière
          </p>
        </div>
      </header>

      {/* FILTERS */}
      <section className="py-8 bg-white/50 backdrop-blur-sm border-y border-gray-200">
        <Filters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filters={filters}
          setFilters={setFilters}
        />
      </section>

      {/* MENTORS GRID */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
              <p className="mt-4 text-gray-600">Chargement des mentors...</p>
            </div>
          ) : filteredMentors.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-red-100 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Aucun mentor trouvé</h3>
              <p className="text-gray-500">Essayez de modifier vos filtres de recherche</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMentors.map((m) => (
                <MentorCard key={m.id} mentor={m} onContact={handleContact} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ✅ BECOME MENTOR – STRICTLY CONTROLLED */}
      {currentUser &&
        ["alumni", "teacher"].includes(currentUser.role) &&
        !currentUser.isMentor && (
          <section className="py-16 bg-gradient-to-r from-blue-50 to-red-50">
            <div className="max-w-3xl mx-auto px-6">
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sup-blue to-sup-red flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-sup-blue to-sup-red bg-clip-text text-transparent">
                      Devenir Mentor
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">Partagez votre expertise avec la communauté</p>
                  </div>
                </div>

                <BecomeMentorForm
                  formData={formData}
                  setFormData={setFormData}
                  onSubmit={handleBecomeMentor}
                />
              </div>
            </div>
          </section>
        )}

      <Footer />
    </div>
  );
}
