import { useEffect, useState } from "react";
import api from "../api/api";

const TransactionsTable = () => {
    const [transactions, setTransactions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const { data } = await api.get(`/admin/transactions?page=${currentPage}`);
                setTransactions(data.transactions);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error("Failed to fetch transactions:", error);
            }
        };
        fetchTransactions();
    }, [currentPage]);

    return (
        <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Transactions</h2>
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border-b p-2">ID</th>
                        <th className="border-b p-2">Farmer</th>
                        <th className="border-b p-2">Amount</th>
                        <th className="border-b p-2">Payment ID</th>
                        <th className="border-b p-2">Date</th>
                        <th className="border-b p-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td className="p-2">{transaction.id}</td>
                            <td className="p-2">{transaction.farmerName}</td>
                            <td className="p-2">₹{transaction.amount}</td>
                            <td className="p-2">{transaction.paymentId}</td>
                            <td className="p-2">
                                {new Date(transaction.createdAt).toLocaleDateString()}
                            </td>
                            <td className="p-2">{transaction.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-end mt-4">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    className="mr-2 bg-gray-300 px-3 py-1 rounded-md"
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    className="bg-gray-300 px-3 py-1 rounded-md"
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default TransactionsTable;
