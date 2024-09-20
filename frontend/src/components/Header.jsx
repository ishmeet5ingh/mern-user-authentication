import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/userSlice';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const userData = useSelector((state) => state.user.userData);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login'); 
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-[10px] bg-white shadow-md">
            <div className="flex items-center">
                <h1 className="text-2xl font-bold">
                    <Link to="/" className="hover:text-blue-600">Logo</Link>
                </h1>
                {isLoggedIn && userData && (
                    <span className="ml-4 text-gray-700">{userData.name}</span>
                )}
            </div>
            <nav className="flex space-x-4">
                {isLoggedIn ? (
                    <button onClick={handleLogout} className="hover:text-blue-600">
                        Logout
                    </button>
                ) : (
                    <>
                        <Link to="/login" className="hover:text-blue-600">Login</Link>
                        <Link to="/register" className="hover:text-blue-600">Register</Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
