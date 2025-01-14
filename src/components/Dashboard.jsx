import { useField } from "../context/FieldContext";
import { useAuth } from "../context/AuthContext";
import { usePricing } from "../context/PricingContext";

const Dashboard = () => {
    const { totalFields } = useField();
    const { totalFarmers } = useAuth();
    const { totalTransactions } = usePricing();

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow-md p-6 rounded-lg">
                <h2 className="text-lg font-bold">Total Farmers</h2>
                <p className="text-2xl text-green-600 font-bold">{totalFarmers}</p>
            </div>
            <div className="bg-white shadow-md p-6 rounded-lg">
                <h2 className="text-lg font-bold">Total Fields</h2>
                <p className="text-2xl text-green-600 font-bold">{totalFields}</p>
            </div>
            <div className="bg-white shadow-md p-6 rounded-lg">
                <h2 className="text-lg font-bold">Total Transactions</h2>
                <p className="text-2xl text-green-600 font-bold">{totalTransactions}</p>
            </div>
        </div>
    );
};

export default Dashboard;
