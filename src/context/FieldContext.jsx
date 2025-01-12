/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/api";

const FieldContext = createContext();

export const useField = () => useContext(FieldContext);

export const FieldProvider = ({ children }) => {
    const [fields, setFields] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch all fields
    const fetchFields = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get("/fields");
            setFields(response.data);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch fields");
        } finally {
            setLoading(false);
        }
    };

    // Add a new field
    const addField = async (fieldData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.post("/fields", fieldData);
            setFields((prevFields) => [...prevFields, response.data]);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add field");
        } finally {
            setLoading(false);
        }
    };

    // Update an existing field
    const updateField = async (id, updatedData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.put(`/fields/${id}`, updatedData);
            setFields((prevFields) =>
                prevFields.map((field) => (field._id === id ? response.data : field))
            );
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update field");
        } finally {
            setLoading(false);
        }
    };

    // Delete a field
    const deleteField = async (id) => {
        setLoading(true);
        setError(null);
        try {
            await api.delete(`/fields/${id}`);
            setFields((prevFields) => prevFields.filter((field) => field._id !== id));
        } catch (err) {
            setError(err.response?.data?.message || "Failed to delete field");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFields();
    }, []);

    return (
        <FieldContext.Provider value={{ fields, addField, updateField, deleteField, loading, error }}>
            {children}
        </FieldContext.Provider>
    );
};
