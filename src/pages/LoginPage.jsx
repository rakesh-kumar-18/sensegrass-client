import { Link } from "react-router-dom";
import AuthImage from "../assets/auth-image.png";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
    return (
        <div className="min-h-screen flex">
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white px-6">
                <h2 className="text-2xl font-bold mb-6">Welcome back!</h2>
                <LoginForm />
                <div className="mt-6 text-center text-gray-500">Or</div>
                <p className="mt-6 text-sm text-gray-500">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="text-green-600 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
            <div
                className="hidden md:block w-1/2 bg-cover bg-center"
                style={{ backgroundImage: `url(${AuthImage})` }}
            ></div>
        </div>
    );
};

export default LoginPage;
