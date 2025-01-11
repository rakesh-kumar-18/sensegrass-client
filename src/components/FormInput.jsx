/* eslint-disable react/prop-types */

const FormInput = ({ label, type, name, value, onChange }) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={(e) => onChange(name, e.target.value)}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder={`Enter your ${label.toLowerCase()}`}
            />
        </div>
    );
};

export default FormInput;
