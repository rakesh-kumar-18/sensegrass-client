import { useField } from "../context/FieldContext";
import Spinner from "./Spinner";

const FieldsTable = () => {
    const { allFields, loading, currentPage, totalPages, setCurrentPage } = useField();

    return (
        <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Fields</h2>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    {allFields.length === 0 ? (
                        <p className="text-gray-500">No fields available.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="border-b p-2 text-left">Field Name</th>
                                        <th className="border-b p-2 text-left">Location</th>
                                        <th className="border-b p-2 text-left">Crop Type</th>
                                        <th className="border-b p-2 text-left">Area Size</th>
                                        <th className="border-b p-2 text-left">Farmer</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allFields.map((field) => (
                                        <tr key={field._id}>
                                            <td className="p-2 border-b text-left">{field.fieldName}</td>
                                            <td className="p-2 border-b text-left">{field.location}</td>
                                            <td className="p-2 border-b text-left">{field.cropType}</td>
                                            <td className="p-2 border-b text-left">
                                                {field.areaSize} acres
                                            </td>
                                            <td className="p-2 border-b text-left">{field.farmerId.username}</td>
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
                </>
            )}
        </div>
    );
};

export default FieldsTable;
