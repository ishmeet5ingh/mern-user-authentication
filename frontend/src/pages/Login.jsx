import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { FaGoogle } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginValidationSchema } from '../validationSchema';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { login } from '../store/userSlice';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginValidationSchema), 
    });

    const onSubmit = async (data) => {
        try {
            const url = "http://localhost:3000/auth/login";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            console.log(result)

            if (response.ok) {
                toast.success('Login successful!');
                dispatch(login(result)); 
                setTimeout(() => {
                    navigate('/dashboard'); 
                }, 1000);
            } else {
                toast.error(result.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error(error); 
            toast.error('An unexpected error occurred.');
        }
    };

    const handleGoogleLogin = async () => {
        console.log("Google login button clicked.");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white px-4 pt-2 pb-4 rounded-lg shadow-md w-96"> 
                <h2 className="text-xl font-bold mb-2 text-center">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-2"> 
                        <label className="block text-sm font-medium text-gray-700">Email:</label>
                        <input
                            type="email"
                            {...register('email')}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-[5px] focus:ring focus:ring-blue-200"
                            autoComplete="off"  
                        />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                    </div>
                    <div className="mb-2"> 
                        <label className="block text-sm font-medium text-gray-700">Password:</label>
                        <input
                            type="password"
                            {...register('password')}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-[5px] focus:ring focus:ring-blue-200"
                            autoComplete="off"  
                        />
                        {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                    </div>
                    <p className="m-2 text-sm text-center text-gray-600">
                        Don't have an account? 
                        <Link to="/register" className="text-blue-600 hover:underline"> Register</Link>
                    </p>
                    <p className="m-2 text-sm text-center text-gray-600">
                        <Link to="/forgot-password" className="text-blue-600 hover:underline">Forgot Password?</Link>
                    </p>
                    
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-4 flex justify-end"></div>
                <button
                    onClick={handleGoogleLogin}
                    className="flex items-center border border-gray-300 rounded-md px-3 py-2 hover:bg-gray-100 w-full mt-2"
                >
                    <FaGoogle className="mr-2" />
                    Login with Google
                </button>
            </div>
        </div>
    );
};

export default Login;
