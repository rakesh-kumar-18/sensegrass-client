import { useField } from "../context/FieldContext";
import { useAuth } from "../context/AuthContext";
import FieldTable from "../components/FieldTable";
import AddEditFieldModal from "../components/AddEditFieldModal";
import ConfirmationModal from "../components/ConfirmationModal";

const FarmerDashboard = () => {
    const { openAddEditModal } = useField();
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <header className="bg-white shadow-md p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-gray-700">Farmer Dashboard</h1>
                <div className="flex items-center space-x-4">
                    <button
                        className="text-green-600 font-medium hover:underline"
                        onClick={() => (window.location.href = "/pricing")}
                    >
                        Pricing
                    </button>
                    <div className="relative group">
                        <div className="flex items-center cursor-pointer">
                            <span className="bg-green-600 text-white w-8 h-8 flex items-center justify-center rounded-full">
                                S
                            </span>
                            <span className="ml-2 text-gray-700">{user.email}</span>
                        </div>
                        <div className="absolute hidden group-hover:block right-0 mt-2 bg-white shadow-lg rounded-lg p-4">
                            <p className="text-sm text-gray-700">{user.email}</p>
                            <p className="text-sm text-gray-500">Role: {user.role}</p>
                            <button
                                onClick={logout}
                                className="w-full mt-2 text-white bg-red-500 py-2 px-4 rounded-md hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-700">Fields</h2>
                    <button
                        onClick={() => openAddEditModal()}
                        className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
                    >
                        Add Field
                    </button>
                </div>
                <FieldTable />
            </main>

            {/* Modals */}
            <AddEditFieldModal />
            <ConfirmationModal />
        </div>
    );
};

export default FarmerDashboard;
