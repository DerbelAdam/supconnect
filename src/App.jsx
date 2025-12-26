
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

// Pages
import Home from "./pages/Home";
import Community from "./pages/Community";
import Mentorship from "./pages/Mentorship";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import EditCareer from "./pages/EditCareer";
import MentorDashboard from "./pages/MentorDashboard";
import StudentRequests from "./pages/StudentRequests";

// Composants
import Navbar from "./components/NavbarNew";

function App() {
  const [email, setEmail] = useState(null);

  useEffect(() => {
    document.title = "SUP'CONNECT";
    setEmail(localStorage.getItem("email"));
  }, []);

  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Navbar />

          <Routes>
            {/* Route racine */}
            <Route
              path="/"
              element={
                email ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />
              }
            />

            {/* Routes publiques */}
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />

            {/* Routes protégées */}
            <Route
              path="/community"
              element={
                <PrivateRoute>
                  <Community />
                </PrivateRoute>
              }
            />
            <Route
              path="/mentorship"
              element={
                <PrivateRoute>
                  <Mentorship />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit-profile"
              element={<EditProfile />}
            />
            <Route
              path="/edit-career"
              element={<EditCareer />}
            />
            <Route path="/my-requests" element={<StudentRequests />} />
            <Route path="/mentor/dashboard" element={<MentorDashboard />} />

  

          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
