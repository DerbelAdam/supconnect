import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Community from "./pages/Community";
import Mentorship from "./pages/Mentorship";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/community" element={<Community />} />
        <Route path="/mentorship" element={<Mentorship />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
