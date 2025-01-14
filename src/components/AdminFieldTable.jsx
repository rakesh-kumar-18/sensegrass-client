import { useEffect, useState } from "react";
import api from "../api/api";

const FieldsTable = () => {
    const [fields, setFields] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchFields = async () => {
            try {
                const { data } = await api.get(`/admin/fields?page=${currentPage}`);
                setFields(data.fields);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error("Failed to fetch fields:", error);
            }
        };
        fetchFields();
    }, [currentPage]);

    return (
        <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Fields</h2>
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border-b p-2">ID</th>
                        <th className="border-b p-2">Field Name</th>
                        <th className="border-b p-2">Location</th>
                        <th className="border-b p-2">Crop Type</th>
                        <th className="border-b p-2">Area Size</th>
                        <th className="border-b p-2">Farmer</th>
                    </tr>
                </thead>
                <tbody>
                    {fields.map((field) => (
                        <tr key={field.id}>
                            <td className="p-2">{field.id}</td>
                            <td className="p-2">{field.fieldName}</td>
                            <td className="p-2">{field.location}</td>
                            <td className="p-2">{field.cropType}</td>
                            <td className="p-2">{field.areaSize} acres</td>
                            <td className="p-2">{field.farmerName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-end mt-4">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    className="mr-2 bg-gray-300 px-3 py-1 rounded-md"
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    className="bg-gray-300 px-3 py-1 rounded-md"
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default FieldsTable;
