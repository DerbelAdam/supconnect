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
    <div className="min-h-screen bg-[#0A1F44] flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-2xl font-extrabold text-[#0A1F44] mb-6">
          Parcours professionnel
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="border rounded-2xl p-6 relative"
            >
              <button
                type="button"
                onClick={() => removeExperience(index)}
                className="absolute top-4 right-4 text-red-500 font-bold"
              >
                ✕
              </button>

              <h3 className="font-bold mb-4">
                Expérience {index + 1}
              </h3>

              <Input
                label="Poste / Fonction"
                value={exp.title}
                onChange={(v) => handleChange(index, "title", v)}
              />

              <Input
                label="Entreprise"
                value={exp.company}
                onChange={(v) => handleChange(index, "company", v)}
              />

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

              <Textarea
                label="Description"
                value={exp.description}
                onChange={(v) => handleChange(index, "description", v)}
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addExperience}
            className="w-full py-3 border-2 border-dashed border-[#E30613] text-[#E30613] font-bold rounded-2xl"
          >
            + Ajouter une expérience
          </button>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-[#E30613] hover:bg-red-700 text-white font-bold rounded-2xl"
            >
              {loading ? "Enregistrement..." : "Enregistrer"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="flex-1 py-3 bg-gray-200 rounded-2xl font-bold"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------- UI Components ---------- */

function Input({ label, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-bold text-gray-600 mb-1">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-[#E30613]"
      />
    </div>
  );
}

function Textarea({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-bold text-gray-600 mb-1">
        {label}
      </label>
      <textarea
        rows="3"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-[#E30613]"
      />
    </div>
  );
}
