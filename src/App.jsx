// App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import InscriptionWizard from "./pages/inscription/InscriptionWizard";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* Page d'accueil */}
          <Route path="/" element={<Home />} />

          {/* Page inscription */}
          <Route path="/inscription" element={<InscriptionWizard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
