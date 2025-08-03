import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { WeddingInvitation } from "./components/WeddingInvitation";
import { IntroAnimation } from "./components/IntroAnimation";
import { AdminLogin } from "./components/admin/AdminLogin";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";

const AppContent = () => {
  const [showIntro, setShowIntro] = useState(true);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <>
      {!isAdminRoute && showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
      <Routes>
        <Route path="/" element={<WeddingInvitation />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
