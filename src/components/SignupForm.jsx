import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import FormInput from "./FormInput";

const SignupForm = () => {
    const { signup, loading, error } = useAuth();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "Farmer",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm w-full">
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <FormInput
                label="Username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
            />
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
            <FormInput
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
            />
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border rounded-md"
                >
                    <option value="Farmer">Farmer</option>
                    <option value="Admin">Admin</option>
                </select>
            </div>
            <button
                type="submit"
                className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
                disabled={loading}
            >
                {loading ? "Signing up..." : "Sign up"}
            </button>
        </form>
    );
};

export default SignupForm;
