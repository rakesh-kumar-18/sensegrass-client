import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { FieldProvider } from "./context/FieldContext";
import { PricingProvider } from "./context/PricingContext";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import FarmerDashboard from "./pages/FarmerDashboard";
import PricingPage from "./pages/PricingPage";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => (
  <AuthProvider>
    <FieldProvider>
      <PricingProvider>
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

            {/* Pricing Page */}
            <Route
              path="/pricing"
              element={
                <ProtectedRoute requiredRole="Farmer">
                  <PricingPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </PricingProvider>
    </FieldProvider>
  </AuthProvider>
);

export default App;
