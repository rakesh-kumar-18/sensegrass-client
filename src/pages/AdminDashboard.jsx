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
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isProfileCardOpen, setProfileCardOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen((prev) => !prev);
    const toggleProfileCard = () => setProfileCardOpen((prev) => !prev);
    const closeProfileCard = () => setProfileCardOpen(false);

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
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
            />

            {/* Overlay for Sidebar on small screens */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={toggleSidebar}
                />
            )}

            {/* Main Content */}
            <div className="flex-1 md:ml-64">
                <header className="bg-white shadow-md p-4 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        {/* Hamburger for small screens */}
                        <button
                            onClick={toggleSidebar}
                            className="text-gray-600 md:hidden"
                        >
                            ☰
                        </button>
                        <h1 className="text-xl font-bold text-gray-700 md:hidden">
                            Sensegrass
                        </h1>
                    </div>
                    <div className="relative">
                        <button
                            onClick={toggleProfileCard}
                            className="flex items-center cursor-pointer"
                        >
                            <span className="bg-green-600 text-white w-8 h-8 flex items-center justify-center rounded-full">
                                {user.username.charAt(0).toUpperCase()}
                            </span>
                        </button>
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
                <main className="p-6">{renderContent()}</main>
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
