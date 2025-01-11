import FormInput from "./FormInput";
import { useSignup } from "../context/SignupContext";

const SignupForm = () => {
    const { formData, updateFormData } = useSignup();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted", formData);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm">
            <FormInput
                label="Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={updateFormData}
            />
            <FormInput
                label="Email address"
                type="email"
                name="email"
                value={formData.email}
                onChange={updateFormData}
            />
            <FormInput
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={updateFormData}
            />
            <div className="flex items-center mt-4">
                <input
                    type="checkbox"
                    checked={formData.agreeToTerms}
                    onChange={(e) => updateFormData("agreeToTerms", e.target.checked)}
                    className="h-4 w-4 text-green-600 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-600">
                    I agree to the{" "}
                    <a href="/terms" className="text-green-600">
                        terms & policy
                    </a>
                </label>
            </div>
            <button
                type="submit"
                className="mt-6 w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
                Signup
            </button>
        </form>
    );
};

export default SignupForm;
