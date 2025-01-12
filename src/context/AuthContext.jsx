/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Login function
    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(
                "http://localhost:5000/api/login",
                { email, password },
                { withCredentials: true }
            );
            setUser(response.data.loggedInUser);
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    // Signup function
    const signup = async (data) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(
                "http://localhost:5000/api/register",
                data,
                { withCredentials: true }
            );
            setUser(response.data);
        } catch (err) {
            setError(err.response?.data?.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    // Logout function
    const logout = async () => {
        setLoading(true);
        setError(null);
        try {
            await axios.post("http://localhost:5000/api/logout", {}, { withCredentials: true });
            setUser(null);
        } catch (err) {
            setError(err.response?.data?.message || "Logout failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
};
