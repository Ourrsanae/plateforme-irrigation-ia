import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductionForm from "./pages/ProductionForm";
import NeedForm from "./pages/NeedForm";
import Navbar from "./components/Navbar"; // <-- Ajoute ceci

import "./App.css";

function App() {
  return (
    <div className="app-overlay">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/production" element={<ProductionForm />} />
          <Route path="/needs" element={<NeedForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
