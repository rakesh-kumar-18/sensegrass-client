import { Link } from "react-router-dom";

const UnauthorizedPage = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Unauthorized</h1>
            <p className="text-gray-700 mb-6">
                You do not have permission to access this page.
            </p>
            <Link to="/" className="text-green-600 hover:underline">
                Go to Home
            </Link>
        </div>
    );
};

export default UnauthorizedPage;
