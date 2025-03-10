import { usePricing } from "../context/PricingContext";
import Spinner from "./Spinner";

const TransactionsTable = () => {
    const { transactions, currentPage, totalPages, setCurrentPage, loading } = usePricing();

    return (
        <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Transactions</h2>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    {transactions.length === 0 ? (
                        <p className="text-gray-500">No transactions found.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="border-b p-2 text-left">Farmer</th>
                                        <th className="border-b p-2 text-left">Amount</th>
                                        <th className="border-b p-2 text-left">Payment ID</th>
                                        <th className="border-b p-2 text-left">Date</th>
                                        <th className="border-b p-2 text-left">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((transaction) => (
                                        <tr key={transaction._id}>
                                            <td className="p-2 border-b text-left">
                                                {transaction.userId.username}
                                            </td>
                                            <td className="p-2 border-b text-left">₹{transaction.amount}</td>
                                            <td className="p-2 border-b text-left">{transaction.paymentId}</td>
                                            <td className="p-2 border-b text-left">
                                                {new Date(transaction.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="p-2 border-b text-left">{transaction.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            className="mr-2 bg-gray-300 px-3 py-1 rounded-md disabled:opacity-50"
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <p className="text-gray-700">
                            Page {currentPage} of {totalPages}
                        </p>
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            className="bg-gray-300 px-3 py-1 rounded-md disabled:opacity-50"
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default TransactionsTable;
