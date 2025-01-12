import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import FormInput from "./FormInput";

const LoginForm = () => {
    const { login, loading, error } = useAuth();
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(formData.email, formData.password);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm w-full">
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <FormInput
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
            />
            <FormInput
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
            />
            <button
                type="submit"
                className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
                disabled={loading}
            >
                {loading ? "Logging in..." : "Log in"}
            </button>
        </form>
    );
};

export default LoginForm;
