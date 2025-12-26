import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CareerSection from "../components/CareerSection";

export default function Profile() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A1F44] text-white">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-[#E30613] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="font-medium">Chargement du profil SUP'CONNECT...</p>
        </div>
      </div>
    );
  }

  const fullName = `${currentUser.firstName || ""} ${currentUser.lastName || ""}`.trim();
  const userInitial =
    fullName.charAt(0).toUpperCase() ||
    currentUser.email?.charAt(0).toUpperCase() ||
    "U";

  const roleLabel = {
    student: "Étudiant",
    alumni: "Alumni",
    teacher: "Enseignant",
  }[currentUser.role] || "Membre";

  return (
    <div className="min-h-screen bg-[#0A1F44] pb-20 text-white">
      {/* BANNIÈRE */}
      <div className="h-48 w-full relative bg-[#0A1F44]">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white,transparent_70%)]"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-24">

          {/* HEADER */}
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 text-[#0A1F44]">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
              
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-gradient-to-br from-[#0A1F44] to-blue-900 border-4 border-white shadow-lg flex items-center justify-center text-white text-5xl font-bold">
                  {userInitial}
                </div>
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
              </div>

              {/* Nom & rôle */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-extrabold">
                  {fullName || "Utilisateur SUP'CONNECT"}
                </h1>

                <span className="inline-block mt-2 px-4 py-1 bg-red-50 text-[#E30613] text-sm font-bold rounded-full border border-red-100">
                  {roleLabel}
                </span>
              </div>

              {/* Bouton modifier */}
              <button
                onClick={() => navigate("/edit-profile")}
                className="px-8 py-3 bg-[#E30613] hover:bg-red-700 text-white font-bold rounded-2xl transition shadow-lg"
              >
                Modifier mon profil
              </button>
            </div>
          </div>

          {/* CONTENU */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* COLONNE GAUCHE */}
            <div className="space-y-8">

              {/* À propos */}
              <div className="bg-white rounded-3xl p-8 shadow-sm text-[#0A1F44]">
                <h3 className="text-lg font-bold mb-4">À propos</h3>
                <p className="text-gray-600 italic text-sm">
                  "{currentUser.bio || "Aucune description ajoutée pour le moment."}"
                </p>
              </div>

              {/* Site web */}
              <div className="bg-white rounded-3xl p-8 shadow-sm text-[#0A1F44]">
                <h3 className="text-lg font-bold mb-4">Lien professionnel</h3>
                {currentUser.website ? (
                  <a
                    href={currentUser.website}
                    target="_blank"
                    rel="noreferrer"
                    className="block p-3 rounded-xl bg-gray-100 text-blue-700 hover:bg-blue-50 transition truncate"
                  >
                    {currentUser.website}
                  </a>
                ) : (
                  <p className="text-gray-400 text-sm">
                    Aucun site web renseigné.
                  </p>
                )}
              </div>
            </div>

            {/* COLONNE DROITE */}
            <div className="lg:col-span-2 space-y-8">

              {/* Infos */}
              <div className="bg-white rounded-3xl p-8 shadow-sm text-[#0A1F44]">
                <h3 className="text-lg font-bold mb-6">
                  Informations personnelles
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InfoItem label="Email" value={currentUser.email} />
                  <InfoItem label="Téléphone" value={currentUser.phone} />
                  <InfoItem label="Date de naissance" value={currentUser.birthDate} />
                  <InfoItem label="Genre" value={currentUser.gender} />
                </div>
              </div>

              {/* PARCOURS PROFESSIONNEL */}
              <CareerSection />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-xs font-bold text-gray-500 uppercase mb-2 tracking-wide">
        {label}
      </p>
      <p className="font-semibold text-gray-800 text-sm">
        {value || <span className="text-gray-400 italic">Non renseigné</span>}
      </p>
    </div>
  );
}
