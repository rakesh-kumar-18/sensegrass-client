import { usePricing } from "../context/PricingContext";
import useRazorpayScript from "../hooks/useRazorpayScript";

const PricingPage = () => {
    useRazorpayScript();
    const { initiatePayment, loading } = usePricing();

    const plans = [
        { id: 1, name: "Basic", price: 199, description: "Access to basic features" },
        { id: 2, name: "Standard", price: 499, description: "Access to all features" },
        { id: 3, name: "Premium", price: 999, description: "Access to premium features" },
    ];

    const handlePayment = async (plan) => {
        if (loading) return;
        await initiatePayment(plan);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Pricing</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                    <div
                        key={plan.id}
                        className="bg-white shadow-md rounded-lg p-6 text-center"
                    >
                        <h2 className="text-xl font-bold mb-4">{plan.name}</h2>
                        <p className="text-gray-500 mb-2">{plan.description}</p>
                        <p className="text-green-600 font-bold text-2xl mb-4">
                            ₹{plan.price}
                        </p>
                        <button
                            onClick={() => handlePayment(plan)}
                            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={loading}
                        >
                            Subscribe
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PricingPage;
