import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { FieldProvider } from "./context/FieldContext";
import { PricingProvider } from "./context/PricingContext";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import FarmerDashboard from "./pages/FarmerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import PricingPage from "./pages/PricingPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import ProtectedRoute from "./components/ProtectedRoute";

const Dashboard = () => {
  const { user } = useAuth();

  if (user.role === "Farmer") {
    return <FarmerDashboard />;
  } else if (user.role === "Admin") {
    return <AdminDashboard />;
  } else {
    return <UnauthorizedPage />;
  }
};

const App = () => (
  <AuthProvider>
    <FieldProvider>
      <PricingProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Dashboard Route */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Pricing Page */}
            <Route
              path="/pricing"
              element={
                <ProtectedRoute>
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
