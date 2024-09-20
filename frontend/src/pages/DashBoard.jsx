import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function DashBoard() {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const userData = useSelector((state) => state.user.userData);

    console.log(userData)

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">User Profile</h2>
                <div className="mb-4">
                    <strong>Name:</strong> <span>{userData?.name}</span>
                </div>
                <div className="mb-4">
                    <strong>Email:</strong> <span>{userData?.email}</span>
                </div>
                <div className="mb-4">
                    <strong>Phone Number:</strong> <span>{userData?.phoneNumber}</span>
                </div>
                <div className="mb-4">
                    <strong>User Type:</strong> <span>{userData?.userType}</span>
                </div>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Edit Profile
                </button>
            </div>
        </div>
    );
}

export default DashBoard;
