import { useEffect, useState } from "react";
import api from "../api/api";

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalFarmers: 0,
        totalFields: 0,
        totalTransactions: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await api.get("/admin/dashboard-stats");
                setStats(data);
            } catch (error) {
                console.error("Failed to fetch dashboard stats:", error);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow-md p-6 rounded-lg">
                <h2 className="text-lg font-bold">Total Farmers</h2>
                <p className="text-2xl text-green-600 font-bold">{stats.totalFarmers}</p>
            </div>
            <div className="bg-white shadow-md p-6 rounded-lg">
                <h2 className="text-lg font-bold">Total Fields</h2>
                <p className="text-2xl text-green-600 font-bold">{stats.totalFields}</p>
            </div>
            <div className="bg-white shadow-md p-6 rounded-lg">
                <h2 className="text-lg font-bold">Total Transactions</h2>
                <p className="text-2xl text-green-600 font-bold">₹{stats.totalTransactions}</p>
            </div>
        </div>
    );
};

export default Dashboard;
