import { useField } from "../context/FieldContext";

const FieldTable = () => {
    const { fields, deleteField, loading } = useField();

    return (
        <div className="bg-white shadow-md rounded-md p-6">
            <h2 className="text-xl font-bold mb-4">Field Data</h2>
            {fields.length === 0 ? (
                <p>No fields available. Add a new field to get started.</p>
            ) : (
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr>
                            <th className="border-b py-2">Field Name</th>
                            <th className="border-b py-2">Location</th>
                            <th className="border-b py-2">Crop Type</th>
                            <th className="border-b py-2">Area Size</th>
                            <th className="border-b py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fields.map((field) => (
                            <tr key={field._id}>
                                <td className="py-2">{field.fieldName}</td>
                                <td className="py-2">{field.location}</td>
                                <td className="py-2">{field.cropType}</td>
                                <td className="py-2">{field.areaSize}</td>
                                <td className="py-2">
                                    <button
                                        onClick={() => deleteField(field._id)}
                                        className="text-red-600 hover:underline"
                                        disabled={loading}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default FieldTable;
