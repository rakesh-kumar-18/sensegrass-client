import { useState, useEffect } from "react";
import { useField } from "../context/FieldContext";

const AddEditFieldModal = () => {
    const {
        isAddEditModalOpen,
        setAddEditModalOpen,
        selectedField,
        addField,
        updateField,
        loading,
    } = useField();

    const [formData, setFormData] = useState({
        fieldName: "",
        location: "",
        cropType: "",
        areaSize: "",
    });

    useEffect(() => {
        if (selectedField) {
            setFormData({
                fieldName: selectedField.fieldName,
                location: selectedField.location,
                cropType: selectedField.cropType,
                areaSize: selectedField.areaSize,
            });
        } else {
            setFormData({
                fieldName: "",
                location: "",
                cropType: "",
                areaSize: "",
            });
        }
    }, [selectedField]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedField) {
            await updateField(selectedField._id, formData);
        } else {
            await addField(formData);
        }
        setAddEditModalOpen(false);
    };

    if (!isAddEditModalOpen) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-lg font-bold mb-4">
                    {selectedField ? "Edit Field" : "Add Field"}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Field Name</label>
                        <input
                            type="text"
                            name="fieldName"
                            value={formData.fieldName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Crop Type</label>
                        <input
                            type="text"
                            name="cropType"
                            value={formData.cropType}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Area</label>
                        <input
                            type="text"
                            name="areaSize"
                            value={formData.areaSize}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md"
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => setAddEditModalOpen(false)}
                            className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
                            disabled={loading}
                        >
                            {loading ? "Saving..." : selectedField ? "Update Field" : "Add Field"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEditFieldModal;
