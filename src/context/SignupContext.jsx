/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from "react";

const SignupContext = createContext();

export const useSignup = () => useContext(SignupContext);

export const SignupProvider = ({ children }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        agreeToTerms: false,
    });

    const updateFormData = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <SignupContext.Provider value={{ formData, updateFormData }}>
            {children}
        </SignupContext.Provider>
    );
};
