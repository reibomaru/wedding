import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { WeddingInvitation } from "./components/WeddingInvitation";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WeddingInvitation />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
