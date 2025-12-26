import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "../context/AuthContext";

export default function StudentRequests() {
  const { currentUser } = useAuth();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (!currentUser) return;

    async function fetchRequests() {
      const q = query(
        collection(db, "mentorshipRequests"),
        where("studentId", "==", currentUser.uid)
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      setRequests(data);
    }

    fetchRequests();
  }, [currentUser]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50 py-12">
      <div className="max-w-5xl mx-auto px-6">
        {/* HEADER */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-sup-blue to-sup-red flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-sup-blue to-sup-red bg-clip-text text-transparent">
                Mes Demandes de Mentorat
              </h1>
              <p className="text-gray-600 mt-1">Suivez l'état de vos demandes</p>
            </div>
          </div>
        </div>

        {/* EMPTY STATE */}
        {requests.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-16 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-red-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Aucune demande envoyée</h3>
            <p className="text-gray-500">Parcourez les mentors disponibles et envoyez votre première demande</p>
          </div>
        )}

        {/* REQUESTS LIST */}
        <div className="space-y-4">
          {requests.map((r) => (
            <div 
              key={r.id} 
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.01]"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-red-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {r.mentorName?.charAt(0).toUpperCase() || "M"}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {r.mentorName}
                    </h3>

                    {/* STATUS BADGES */}
                    <div className="mt-3">
                      {r.status === "pending" && (
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-full text-sm font-medium border border-orange-200">
                          <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          En attente
                        </span>
                      )}

                      {r.status === "rejected" && (
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-full text-sm font-medium border border-red-200">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Refusée
                        </span>
                      )}

                      {r.status === "accepted" && (
                        <div className="space-y-2">
                          <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-full text-sm font-medium border border-green-200">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Acceptée
                          </span>
                          <div className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-red-50 rounded-lg border border-blue-100">
                            <p className="text-sm text-gray-600 mb-1">Contact du mentor:</p>
                            <a
                              href={`mailto:${r.mentorEmail}`}
                              className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2 transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              {r.mentorEmail}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
