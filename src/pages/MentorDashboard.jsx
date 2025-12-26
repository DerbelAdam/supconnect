import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "../context/AuthContext";

export default function MentorDashboard() {
  const { currentUser } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ============================
     FETCH REQUESTS (MENTOR)
     ============================ */
  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, "mentorshipRequests"),
      where("mentorId", "==", currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRequests(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  /* ============================
     ACTIONS
     ============================ */
  const handleAccept = async (id) => {
    await updateDoc(doc(db, "mentorshipRequests", id), {
      status: "accepted",
      respondedAt: serverTimestamp(),
    });
  };

  const handleReject = async (id) => {
    await updateDoc(doc(db, "mentorshipRequests", id), {
      status: "rejected",
      respondedAt: serverTimestamp(),
    });
  };

  /* ============================
     RENDER
     ============================ */
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50 py-12">
      <div className="max-w-5xl mx-auto px-6">
        {/* HEADER */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-sup-blue to-sup-red flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-sup-blue to-sup-red bg-clip-text text-transparent">
                Tableau de Bord Mentor
              </h1>
              <p className="text-gray-600 mt-1">Gérez vos demandes de mentorat</p>
            </div>
          </div>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-16 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
            <p className="text-gray-600">Chargement des demandes...</p>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && requests.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-16 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-red-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Aucune demande reçue</h3>
            <p className="text-gray-500">Les étudiants pourront vous contacter bientôt</p>
          </div>
        )}

        {/* REQUESTS LIST */}
        <div className="space-y-4">
          {requests.map((r) => (
            <div
              key={r.id}
              className="bg-white border border-gray-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01]"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div className="flex items-start gap-4 flex-1">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-red-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {r.studentName?.charAt(0).toUpperCase() || "S"}
                  </div>

                  {/* Student Info */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900">
                      {r.studentName}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm text-gray-600">
                        {r.studentEmail}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <span
                  className={`px-4 py-2 rounded-full text-xs font-semibold inline-flex items-center gap-2 ${
                    r.status === "pending"
                      ? "bg-orange-50 text-orange-600 border border-orange-200"
                      : r.status === "accepted"
                      ? "bg-green-50 text-green-600 border border-green-200"
                      : "bg-red-50 text-red-600 border border-red-200"
                  }`}
                >
                  {r.status === "pending" && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {r.status === "accepted" && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {r.status === "rejected" && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                  {r.status === "pending" ? "En attente" : r.status === "accepted" ? "Acceptée" : "Refusée"}
                </span>
              </div>

              {/* ACTIONS */}
              {r.status === "pending" && (
                <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => handleAccept(r.id)}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Accepter
                  </button>

                  <button
                    onClick={() => handleReject(r.id)}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Refuser
                  </button>
                </div>
              )}

              {/* ACCEPTED INFO */}
              {r.status === "accepted" && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-100">
                    <p className="text-sm text-gray-700 flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      L'étudiant peut maintenant vous contacter à:
                      <span className="font-semibold text-blue-600">
                        {r.mentorEmail}
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
