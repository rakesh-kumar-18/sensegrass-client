import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { FieldProvider } from "./context/FieldContext";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import FarmerDashboard from "./pages/FarmerDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => (
  <AuthProvider>
    <FieldProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Farmer Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiredRole="Farmer">
                <FarmerDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </FieldProvider>
  </AuthProvider>
);

export default App;
