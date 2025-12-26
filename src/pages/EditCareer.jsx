import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "../context/AuthContext";

export default function EditCareer() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔐 Sécurité
  useEffect(() => {
    if (
      !currentUser ||
      (currentUser.role !== "alumni" && currentUser.role !== "teacher")
    ) {
      navigate("/profile");
      return;
    }

    if (currentUser.career) {
      setExperiences(currentUser.career);
    }
  }, [currentUser, navigate]);

  function addExperience() {
    setExperiences([
      ...experiences,
      {
        title: "",
        company: "",
        startYear: "",
        endYear: "",
        description: "",
      },
    ]);
  }

  function removeExperience(index) {
    setExperiences(experiences.filter((_, i) => i !== index));
  }

  function handleChange(index, field, value) {
    const updated = [...experiences];
    updated[index][field] = value;
    setExperiences(updated);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await updateDoc(doc(db, "users", currentUser.uid), {
        career: experiences,
      });

      navigate("/profile");
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l’enregistrement.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* HEADER */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sup-blue to-sup-red flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-sup-blue to-sup-red bg-clip-text text-transparent">
                Parcours professionnel
              </h1>
              <p className="text-gray-600 mt-1">Gérez votre expérience professionnelle</p>
            </div>
          </div>
        </div>

        {/* FORM CARD */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {experiences.length > 0 && (
              <div className="mb-8 p-4 bg-gradient-to-r from-blue-50 to-red-50 rounded-lg border border-blue-200">
                <p className="text-sm font-medium text-gray-700">
                  Vous avez <span className="font-bold text-sup-red">{experiences.length}</span> expérience(s) professionnelle(s)
                </p>
              </div>
            )}

            {experiences.map((exp, index) => (
              <div
                key={index}
                className="border-2 border-gray-200 rounded-xl p-6 relative hover:border-sup-red transition-colors duration-300 bg-gradient-to-br from-gray-50 to-white"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg text-sup-blue">Expérience {index + 1}</h3>
                  <button
                    type="button"
                    onClick={() => removeExperience(index)}
                    className="text-red-500 hover:text-red-700 font-bold text-xl hover:bg-red-50 w-8 h-8 rounded-lg transition"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <Input
                      label="Poste / Fonction"
                      value={exp.title}
                      onChange={(v) => handleChange(index, "title", v)}
                    />
                  </div>

                  <div>
                    <Input
                      label="Entreprise"
                      value={exp.company}
                      onChange={(v) => handleChange(index, "company", v)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Année début"
                      value={exp.startYear}
                      onChange={(v) => handleChange(index, "startYear", v)}
                    />

                    <Input
                      label="Année fin"
                      value={exp.endYear}
                      onChange={(v) => handleChange(index, "endYear", v)}
                    />
                  </div>

                  <div>
                    <Textarea
                      label="Description"
                      value={exp.description}
                      onChange={(v) => handleChange(index, "description", v)}
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addExperience}
              className="w-full py-3 border-2 border-dashed border-sup-red text-sup-red hover:bg-red-50 font-bold rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Ajouter une expérience
            </button>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 bg-gradient-to-r from-sup-blue to-sup-red hover:shadow-lg text-white font-bold rounded-lg transition-all duration-300 shadow-lg transform hover:-translate-y-1 disabled:opacity-50"
              >
                {loading ? "Enregistrement..." : "Enregistrer"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/profile")}
                className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-lg transition"
              >
                Retour au profil
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ---------- UI Components ---------- */

function Input({ label, value, onChange }) {
  return (
    <div>
      <label className="text-sm font-bold text-gray-700 block mb-2">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sup-red focus:border-transparent outline-none transition"
      />
    </div>
  );
}

function Textarea({ label, value, onChange }) {
  return (
    <div>
      <label className="text-sm font-bold text-gray-700 block mb-2">
        {label}
      </label>
      <textarea
        rows="3"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sup-red focus:border-transparent outline-none transition"
      />
    </div>
  );
}
