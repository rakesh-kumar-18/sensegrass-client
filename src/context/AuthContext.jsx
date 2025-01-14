/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [users, setUsers] = useState([]);
    const [totalFarmers, setTotalFarmers] = useState(0);
    const [usersLoading, setUsersLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Login function
    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.post("/users/login", { email, password }, { withCredentials: true });
            setUser(response.data.data.loggedInUser);
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
            const response = await api.post("/users/register", data, { withCredentials: true });
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
            await api.post("/users/logout", {}, { withCredentials: true });
            setUser(null);
        } catch (err) {
            setError(err.response?.data?.message || "Logout failed");
        } finally {
            setLoading(false);
        }
    };

    // Fetch all farmers with pagination
    const fetchFarmers = async (page = 1) => {
        setUsersLoading(true);
        try {
            const { data } = await api.get(`/users/farmers?page=${page}`);
            setUsers(data.farmers);
            setTotalFarmers(data.totalFarmers);
            setTotalPages(data.totalPages);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch farmers");
        } finally {
            setUsersLoading(false);
        }
    };

    useEffect(() => {
        fetchFarmers(currentPage);
    }, [currentPage]);

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                signup,
                logout,
                loading,
                error,
                users,
                totalFarmers,
                usersLoading,
                currentPage,
                totalPages,
                setCurrentPage,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
