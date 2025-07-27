import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { WeddingInvitation } from "./components/WeddingInvitation";
import { IntroAnimation } from "./components/IntroAnimation";

function App() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <Router>
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
      <Routes>
        <Route path="/" element={<WeddingInvitation />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
