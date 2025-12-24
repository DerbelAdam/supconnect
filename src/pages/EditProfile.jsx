import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "../context/AuthContext";

export default function EditProfile() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    phone: "",
    birthDate: "",
    gender: "",
    website: "",
  });

  /* =========================
     INIT DATA FROM FIRESTORE
     ========================= */
  useEffect(() => {
    if (currentUser) {
      setFormData({
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        bio: currentUser.bio || "",
        phone: currentUser.phone || "",
        birthDate: currentUser.birthDate || "",
        gender: currentUser.gender || "",
        website: currentUser.website || "",
      });
    }
  }, [currentUser]);

  /* ========
     HANDLERS
     ======== */
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser?.uid) return;

    try {
      setLoading(true);
      const userRef = doc(db, "users", currentUser.uid);

      await updateDoc(userRef, {
        ...formData,
      });

      navigate("/profile");
    } catch (error) {
      console.error("Erreur mise à jour profil :", error);
      alert("Erreur lors de la mise à jour du profil");
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center px-4 py-12">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl p-8">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-[#0A1F44]">
            Modifier mon profil
          </h1>
          <p className="text-gray-500 mt-1">
            Complétez vos informations SUP’CONNECT
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* NOMS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Prénom"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            <Input
              label="Nom"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          {/* BIO */}
          <div>
            <label className="text-sm font-bold text-gray-600">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="4"
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#E30613] focus:outline-none"
              placeholder="Présentez-vous à la communauté SUP’CONNECT..."
            />
          </div>

          {/* CONTACT */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Téléphone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <Input
              label="Date de naissance"
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
            />
          </div>

          {/* GENRE */}
          <div>
            <label className="text-sm font-bold text-gray-600">Genre</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#E30613] focus:outline-none"
            >
              <option value="male">Homme</option>
              <option value="female">Femme</option>
            </select>
          </div>

          {/* WEBSITE */}
          <Input
            label="Site web / LinkedIn"
            name="website"
            value={formData.website}
            onChange={handleChange}
          />

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-6">
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="px-6 py-2 rounded-xl font-semibold border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-8 py-2 rounded-xl font-bold bg-[#E30613] text-white hover:bg-red-700 transition disabled:opacity-50"
            >
              {loading ? "Enregistrement..." : "Enregistrer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ======================
   INPUT COMPONENT
   ====================== */
function Input({ label, type = "text", name, value, onChange }) {
  return (
    <div>
      <label className="text-sm font-bold text-gray-600">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#E30613] focus:outline-none"
      />
    </div>
  );
}
