import { useEffect, useState } from "react";
import api from "../api/api";

const UsersTable = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await api.get(`/admin/users?page=${currentPage}`);
                setUsers(data.users);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }
        };
        fetchUsers();
    }, [currentPage]);

    return (
        <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Users</h2>
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border-b p-2">ID</th>
                        <th className="border-b p-2">Name</th>
                        <th className="border-b p-2">Email</th>
                        <th className="border-b p-2">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="p-2">{user.id}</td>
                            <td className="p-2">{user.name}</td>
                            <td className="p-2">{user.email}</td>
                            <td className="p-2">{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-end mt-4">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    className="mr-2 bg-gray-300 px-3 py-1 rounded-md"
                >
                    Previous
                </button>
                <button
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className="bg-gray-300 px-3 py-1 rounded-md"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default UsersTable;
