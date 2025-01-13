/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/api";

const FieldContext = createContext();

export const useField = () => useContext(FieldContext);

export const FieldProvider = ({ children }) => {
    const [fields, setFields] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [isAddEditModalOpen, setAddEditModalOpen] = useState(false);
    const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
    const [selectedField, setSelectedField] = useState(null);

    // Fetch all fields
    const fetchFields = async () => {
        setLoading(true);
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
        try {
            const response = await api.post("/fields/add", fieldData);
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
        try {
            const response = await api.put(`/fields/update/${id}`, updatedData);
            setFields((prevFields) =>
                prevFields.map((field) => (field.id === id ? response.data : field))
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
        try {
            await api.delete(`/fields/delete/${id}`);
            setFields((prevFields) => prevFields.filter((field) => field.id !== id));
        } catch (err) {
            setError(err.response?.data?.message || "Failed to delete field");
        } finally {
            setLoading(false);
        }
    };

    // Open Add/Edit Modal
    const openAddEditModal = (field = null) => {
        setSelectedField(field);
        setAddEditModalOpen(true);
    };

    // Open Delete Confirmation Modal
    const openConfirmationModal = (field) => {
        setSelectedField(field);
        setConfirmationModalOpen(true);
    };

    useEffect(() => {
        fetchFields();
    }, []);

    return (
        <FieldContext.Provider
            value={{
                fields,
                loading,
                error,
                addField,
                updateField,
                deleteField,
                isAddEditModalOpen,
                setAddEditModalOpen,
                isConfirmationModalOpen,
                setConfirmationModalOpen,
                selectedField,
                openAddEditModal,
                openConfirmationModal,
            }}
        >
            {children}
        </FieldContext.Provider>
    );
};
