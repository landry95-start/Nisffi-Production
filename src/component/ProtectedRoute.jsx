
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                await axios.get("http://localhost:3000/api/auth/me", {
                    withCredentials: true
                });

                setIsAuthenticated(true);

            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        verifyAuth();
    }, []);

    if (isAuthenticated === null) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600">Vérification de votre session...</p>
            </div>
        );
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
