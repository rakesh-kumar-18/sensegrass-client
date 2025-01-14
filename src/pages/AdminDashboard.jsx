import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import UsersTable from "../components/UserTable";
import FieldsTable from "../components/AdminFieldTable";
import TransactionsTable from "../components/TransactionsTable";

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("dashboard");

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
                        <div className="flex items-center cursor-pointer">
                            <span className="bg-green-600 text-white w-8 h-8 flex items-center justify-center rounded-full">
                                A
                            </span>
                        </div>
                        <div className="absolute hidden group-hover:block right-0 mt-2 bg-white shadow-lg rounded-lg p-4">
                            <p className="text-sm text-gray-700">admin@example.com</p>
                            <p className="text-sm text-gray-500">Role: Admin</p>
                            <button
                                onClick={() => alert("Logout functionality")}
                                className="w-full mt-2 text-white bg-red-500 py-2 px-4 rounded-md hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </header>
                <main>{renderContent()}</main>
            </div>
        </div>
    );
};

export default AdminDashboard;
