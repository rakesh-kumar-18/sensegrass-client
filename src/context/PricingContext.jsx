/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import api from "../api/api";

const PricingContext = createContext();

export const usePricing = () => useContext(PricingContext);

export const PricingProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    // Initiate payment process
    const initiatePayment = async (plan) => {
        try {
            setLoading(true);
            const { data } = await api.post("/payments/checkout", {
                planId: plan.id,
                amount: plan.price,
            });

            const options = {
                key: data.key,
                amount: data.amount,
                currency: "INR",
                name: "Farm Management System",
                description: plan.name,
                order_id: data.orderId,
                handler: async function (response) {
                    await api.post("/payments/verify", {
                        paymentId: response.razorpay_payment_id,
                        orderId: response.razorpay_order_id,
                        signature: response.razorpay_signature,
                        amount: data.amount / 100,
                    });
                    alert("Payment Successful!");
                },
                prefill: {
                    name: data.prefill.name,
                    email: data.prefill.email,
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const paymentGateway = new window.Razorpay(options);
            paymentGateway.open();
        } catch (error) {
            alert(error.response?.data?.message || "Payment failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <PricingContext.Provider value={{ initiatePayment, loading }}>
            {children}
        </PricingContext.Provider>
    );
};
