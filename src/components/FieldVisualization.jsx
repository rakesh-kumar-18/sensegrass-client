import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const FieldVisualization = () => {
    const cropYieldData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Crop Yield (kg)",
                data: [50, 60, 75, 90, 100, 120],
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                tension: 0.4,
            },
        ],
    };

    const cropYieldOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Crop Yield Trends (kg/month)",
            },
        },
    };

    const healthStatsData = {
        labels: ["Field 1", "Field 2", "Field 3", "Field 4"],
        datasets: [
            {
                label: "Health Index",
                data: [85, 70, 90, 75],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.8)",
                    "rgba(54, 162, 235, 0.8)",
                    "rgba(255, 206, 86, 0.8)",
                    "rgba(75, 192, 192, 0.8)",
                ],
            },
        ],
    };

    const healthStatsOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Field Health Statistics",
            },
        },
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white shadow-md p-6 rounded-lg">
                <Line data={cropYieldData} options={cropYieldOptions} />
            </div>
            <div className="bg-white shadow-md p-6 rounded-lg">
                <Bar data={healthStatsData} options={healthStatsOptions} />
            </div>
        </div>
    );
};

export default FieldVisualization;
