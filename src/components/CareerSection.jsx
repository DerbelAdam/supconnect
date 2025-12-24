import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function CareerSection() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) return null;

  const canHaveCareer =
    currentUser.role === "alumni" || currentUser.role === "teacher";

  if (!canHaveCareer) return null;

  const careers = currentUser.career || [];

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm text-[#0A1F44]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold">Parcours professionnel</h3>

        <button
          onClick={() => navigate("/edit-career")}
          className="px-5 py-2 bg-[#E30613] hover:bg-red-700 text-white text-sm font-bold rounded-xl transition"
        >
          {careers.length > 0 ? "Modifier" : "Ajouter"}
        </button>
      </div>

      {careers.length === 0 ? (
        <p className="text-gray-400 italic text-sm text-center">
          Aucun parcours professionnel renseigné.
        </p>
      ) : (
        <div className="relative border-l-2 border-[#E30613] pl-6 space-y-10">
          {careers.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
                ease: "easeOut",
              }}
              className="relative"
            >
              <span className="absolute -left-5 top-1 w-4 h-4 bg-[#E30613] border-4 border-white rounded-full"></span>

              <h4 className="text-lg font-extrabold">
                {item.title}
              </h4>

              <p className="text-sm font-semibold text-gray-600">
                {item.company} • {item.startYear} – {item.endYear || "Présent"}
              </p>

              {item.description && (
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                  {item.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
