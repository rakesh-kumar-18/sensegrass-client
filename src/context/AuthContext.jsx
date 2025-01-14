/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loginLoading, setLoginLoading] = useState(false);
    const [signUpLoading, setSignUpLoading] = useState(false);
    const [error, setError] = useState(null);

    const [users, setUsers] = useState([]);
    const [totalFarmers, setTotalFarmers] = useState(0);
    const [usersLoading, setUsersLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Login function
    const login = async (email, password) => {
        setLoginLoading(true);
        setError(null);
        try {
            const response = await api.post("/users/login", { email, password }, { withCredentials: true });
            setUser(response.data.data.loggedInUser);
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoginLoading(false);
        }
    };

    // Signup function
    const signup = async (data) => {
        setSignUpLoading(true);
        setError(null);
        try {
            const response = await api.post("/users/register", data, { withCredentials: true });
            setUser(response.data);
        } catch (err) {
            setError(err.response?.data?.message || "Signup failed");
        } finally {
            setSignUpLoading(false);
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

    // Validate Token
    const validateToken = async () => {
        try {
            const response = await api.get("/users/validate", { withCredentials: true });
            setUser(response.data.data);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        validateToken();
    }, []);

    // Fetch all farmers
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
        if (user) {
            fetchFarmers(currentPage);
        }
    }, [currentPage, user]);

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                signup,
                logout,
                loading,
                loginLoading,
                signUpLoading,
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
