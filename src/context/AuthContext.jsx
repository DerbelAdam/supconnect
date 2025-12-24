import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../config/firebase";
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* =========================
     SIGN UP (Email / Password)
     ========================= */
  async function signup(email, password, userData) {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const userRef = doc(db, "users", userCredential.user.uid);

    await setDoc(userRef, {
      firstName: userData.firstName || "",
      lastName: userData.lastName || "",
      email,
      role: userData.role || "student",
      bio: "",
      phone: "",
      birthDate: "",
      gender: "",
      website: "",
      photoURL: userCredential.user.photoURL || null,
      coverURL: null,
      career: null,
      createdAt: serverTimestamp(),
    });

    localStorage.setItem("email", email);
    return userCredential;
  }

  /* =======
     LOGIN
     ======= */
  function login(email, password) {
    localStorage.setItem("email", email);
    return signInWithEmailAndPassword(auth, email, password);
  }

  /* =================
     GOOGLE SIGN UP
     ================= */
  async function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const userRef = doc(db, "users", result.user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      const displayName = result.user.displayName || "";
      const parts = displayName.split(" ");
      const firstName = parts[0] || "";
      const lastName = parts.slice(1).join(" ") || "";

      await setDoc(userRef, {
        firstName,
        lastName,
        email: result.user.email,
        role: "student",
        bio: "",
        phone: "",
        birthDate: "",
        gender: "",
        website: "",
        photoURL: result.user.photoURL || null,
        coverURL: null,
        career: null,
        createdAt: serverTimestamp(),
      });
    }

    return result;
  }

  /* ========
     LOGOUT
     ======== */
  function logout() {
    return signOut(auth);
  }

  /* ==========================
     AUTH STATE LISTENER (FIX)
     ========================== */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setCurrentUser(null);
        setLoading(false);
        return;
      }

      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const data = userDoc.data();

        setCurrentUser({
          uid: user.uid,
          email: user.email,
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          role: data.role || "student",
          bio: data.bio || "",
          phone: data.phone || "",
          birthDate: data.birthDate || "",
          gender: data.gender || "",
          website: data.website || "",
          photoURL: data.photoURL || null,
          coverURL: data.coverURL || null,
          career: data.career || null,
          createdAt: data.createdAt || null,
        });
      } else {
        setCurrentUser(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    loginWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
