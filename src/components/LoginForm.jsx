import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import FormInput from "./FormInput";

const LoginForm = () => {
    const { login, loading, error } = useAuth();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid.";
        if (!formData.password) newErrors.password = "Password is required.";
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        await login(formData.email, formData.password);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm w-full">
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <div className="mb-4">
                <FormInput
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div className="mb-4">
                <FormInput
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <button
                type="submit"
                className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
            >
                {loading ? "Logging in..." : "Log in"}
            </button>
        </form>
    );
};

export default LoginForm;
