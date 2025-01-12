import { useState } from "react";
import { useField } from "../context/FieldContext";

const FieldForm = () => {
    const { addField, updateField, loading, error } = useField();
    const [formData, setFormData] = useState({
        fieldName: "",
        location: "",
        cropType: "",
        areaSize: "",
    });
    const [editMode, setEditMode] = useState(false);
    const [fieldId, setFieldId] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editMode) {
            await updateField(fieldId, formData);
        } else {
            await addField(formData);
        }
        setFormData({ fieldName: "", location: "", cropType: "", areaSize: "" });
        setEditMode(false);
        setFieldId(null);
    };

    const handleEdit = (field) => {
        setFormData(field);
        setEditMode(true);
        setFieldId(field._id);
    };

    return (
        <div className="bg-white shadow-md rounded-md p-6">
            <h2 className="text-xl font-bold mb-4">{editMode ? "Edit Field" : "Add Field"}</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Field Name</label>
                    <input
                        type="text"
                        name="fieldName"
                        value={formData.fieldName}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Crop Type</label>
                    <input
                        type="text"
                        name="cropType"
                        value={formData.cropType}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Area Size</label>
                    <input
                        type="text"
                        name="areaSize"
                        value={formData.areaSize}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border rounded-md"
                    />
                </div>
                <button
                    type="submit"
                    className={`w-full py-2 px-4 rounded-md text-white ${loading ? "bg-gray-500" : "bg-green-600 hover:bg-green-700"
                        }`}
                    disabled={loading}
                >
                    {loading ? "Saving..." : editMode ? "Update Field" : "Add Field"}
                </button>
            </form>
        </div>
    );
};

export default FieldForm;
