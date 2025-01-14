/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/api";

const FieldContext = createContext();

export const useField = () => useContext(FieldContext);

export const FieldProvider = ({ children }) => {
    const [fields, setFields] = useState([]);
    const [allFields, setAllFields] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [perPage] = useState(10);
    const [totalFields, setTotalFields] = useState(0);

    const [isAddEditModalOpen, setAddEditModalOpen] = useState(false);
    const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
    const [selectedField, setSelectedField] = useState(null);

    // Fetch fields by farmer
    const fetchFields = async (page = 1) => {
        setLoading(true);
        try {
            const response = await api.get(`/fields?page=${page}&limit=${perPage}`);
            setFields(response.data.fields);
            setTotalPages(response.data.totalPages);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch fields");
        } finally {
            setLoading(false);
        }
    };

    // Fetch all fields
    const fetchAllFields = async (page = 1) => {
        setLoading(true);
        try {
            const response = await api.get(`/fields/all?page=${page}&limit=${perPage}`);
            setAllFields(response.data.fields);
            setTotalFields(response.data.totalFields);
            setTotalPages(response.data.totalPages);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch fields");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFields(currentPage);
        fetchAllFields(currentPage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    // Add a new field
    const addField = async (fieldData) => {
        setLoading(true);
        try {
            const response = await api.post("/fields/add", fieldData);
            setFields((prevFields) => [...prevFields, response.data.data]);
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
                prevFields.map((field) => (field._id === id ? response.data.data : field))
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
            setFields((prevFields) => prevFields.filter((field) => field._id !== id));
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

    return (
        <FieldContext.Provider
            value={{
                fields,
                allFields,
                totalFields,
                loading,
                error,
                currentPage,
                totalPages,
                setCurrentPage,
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
