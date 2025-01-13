import { useField } from "../context/FieldContext";

const FieldTable = () => {
    const { fields, openAddEditModal, openConfirmationModal, loading } = useField();

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-bold mb-4">Fields</h2>
            {loading && <p className="text-gray-500">Loading fields...</p>}
            {fields.length === 0 && !loading ? (
                <p className="text-gray-500">No fields available. Add a new field to get started.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="border-b py-2 px-4">Field Name</th>
                                <th className="border-b py-2 px-4">Location</th>
                                <th className="border-b py-2 px-4">Crop Type</th>
                                <th className="border-b py-2 px-4">Area</th>
                                <th className="border-b py-2 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fields.map((field) => (
                                <tr key={field._id} className="hover:bg-gray-50">
                                    <td className="py-2 px-4">{field.fieldName}</td>
                                    <td className="py-2 px-4">{field.location}</td>
                                    <td className="py-2 px-4">{field.cropType}</td>
                                    <td className="py-2 px-4">{field.areaSize}</td>
                                    <td className="py-2 px-4 flex flex-wrap space-x-2">
                                        <button
                                            onClick={() => openAddEditModal(field)}
                                            className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => openConfirmationModal(field)}
                                            className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default FieldTable;
