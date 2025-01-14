import { useField } from "../context/FieldContext";
import Spinner from "./Spinner";

const FieldTable = () => {
    const { fields, openAddEditModal, openConfirmationModal, loading, currentPage, totalPages, setCurrentPage } = useField();

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-bold mb-4">Fields</h2>
            {loading && <Spinner />}
            {fields.length === 0 && !loading ? (
                <p className="text-gray-500">No fields available. Add a new field to get started.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="border-b p-2 text-left">Field Name</th>
                                <th className="border-b p-2 text-left">Location</th>
                                <th className="border-b p-2 text-left">Crop Type</th>
                                <th className="border-b p-2 text-left">Area</th>
                                <th className="border-b p-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fields.map((field) => (
                                <tr key={field._id} className="hover:bg-gray-50">
                                    <td className="border-b p-2 text-left">{field.fieldName}</td>
                                    <td className="border-b p-2 text-left">{field.location}</td>
                                    <td className="border-b p-2 text-left">{field.cropType}</td>
                                    <td className="border-b p-2 text-left">{field.areaSize}</td>
                                    <td className="border-b p-2 text-left flex flex-wrap space-x-2">
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

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    className="mr-2 bg-gray-300 px-3 py-1 rounded-md disabled:opacity-50"
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <p className="text-gray-700">
                    Page {currentPage} of {totalPages}
                </p>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    className="bg-gray-300 px-3 py-1 rounded-md disabled:opacity-50"
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default FieldTable;
