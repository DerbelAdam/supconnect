// Firebase configuration
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA_sFoSAru5a1VtPhbnqqcNeOyYu3ZmKbQ",
  authDomain: "supconnect-5b297.firebaseapp.com",
  projectId: "supconnect-5b297",
  storageBucket: "supconnect-5b297.firebasestorage.app",
  messagingSenderId: "1023193687846",
  appId: "1:1023193687846:web:668e123ce6954706eec3e7",
  measurementId: "G-RJEHYWVKCZ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };
