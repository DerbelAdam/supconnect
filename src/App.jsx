// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

// Pages
import Home from "./pages/Home";
import Community from "./pages/Community";
import Mentorship from "./pages/Mentorship";
import Career from "./pages/Career";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
// Composants
import Navbar from "./components/Navbar";

function App() {
  const [email, setEmail] = useState(null)  ;
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
            {/* Routes publiques */}
            <Route path="/home" element={email ? <Home /> : <Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />

            {/* {<Route path="/login" element={role=="etud" ? <Etud> : role ==  "ens" ? <Ens> : <super> } />} */}


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
              path="/career"
              element={
                <PrivateRoute>
                  <Career />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;