import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import UsersTable from "../components/UserTable";
import FieldsTable from "../components/AdminFieldTable";
import TransactionsTable from "../components/TransactionsTable";

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState("dashboard");
    const [isProfileCardOpen, setProfileCardOpen] = useState(false);

    const toggleProfileCard = () => {
        setProfileCardOpen((prev) => !prev);
    };

    const closeProfileCard = () => {
        setProfileCardOpen(false);
    };

    const renderContent = () => {
        switch (activeTab) {
            case "dashboard":
                return <Dashboard />;
            case "users":
                return <UsersTable />;
            case "fields":
                return <FieldsTable />;
            case "transactions":
                return <TransactionsTable />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Main Content */}
            <div className="flex-1 p-6">
                <header className="bg-white shadow-md p-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-gray-700">Admin Dashboard</h1>
                    <div className="relative group">
                        <button
                            onClick={toggleProfileCard}
                            className="flex items-center cursor-pointer"
                        >
                            <span className="bg-green-600 text-white w-8 h-8 flex items-center justify-center rounded-full">
                                {user.username.charAt(0).toUpperCase()}
                            </span>
                        </button>
                        {/* Profile Card */}
                        {isProfileCardOpen && (
                            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-4 z-10">
                                <p className="text-sm text-gray-700">{user.email}</p>
                                <p className="text-sm text-gray-500">Role: {user.role}</p>
                                <button
                                    onClick={logout}
                                    className="w-full mt-2 text-white bg-red-500 py-2 px-4 rounded-md hover:bg-red-600"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </header>
                <main>{renderContent()}</main>
            </div>

            {isProfileCardOpen && (
                <div
                    className="fixed inset-0 bg-transparent"
                    onClick={closeProfileCard}
                />
            )}
        </div>
    );
};

export default AdminDashboard;
