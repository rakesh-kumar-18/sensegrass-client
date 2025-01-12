/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, requiredRole }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/" />;
    }

    if (user.role !== requiredRole) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
