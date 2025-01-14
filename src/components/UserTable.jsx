import { useAuth } from "../context/AuthContext";
import Spinner from "./Spinner";

const UsersTable = () => {
    const { users, usersLoading, currentPage, totalPages, setCurrentPage } = useAuth();

    return (
        <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Farmers</h2>
            {usersLoading ? (
                <Spinner />
            ) : (
                <>
                    {users.length === 0 ? (
                        <p className="text-gray-500">No users found.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="border-b p-2 text-left">Name</th>
                                        <th className="border-b p-2 text-left">Email</th>
                                        <th className="border-b p-2 text-left">Role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user._id}>
                                            <td className="p-2 border-b text-left">{user.username}</td>
                                            <td className="p-2 border-b text-left">{user.email}</td>
                                            <td className="p-2 border-b text-left">{user.role}</td>
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

export default UsersTable;
