import { FieldProvider } from "../context/FieldContext";
import FieldTable from "../components/FieldTable";
import FieldForm from "../components/FieldForm";

const FarmerDashboard = () => {
    return (
        <FieldProvider>
            <div className="min-h-screen bg-gray-100 p-6">
                <h1 className="text-3xl font-bold text-center mb-6">Farmer Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="col-span-1">
                        <FieldForm />
                    </div>
                    <div className="col-span-2">
                        <FieldTable />
                    </div>
                </div>
            </div>
        </FieldProvider>
    );
};

export default FarmerDashboard;
