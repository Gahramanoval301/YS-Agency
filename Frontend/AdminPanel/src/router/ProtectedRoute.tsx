import { Navigate } from "react-router-dom";
import { checkAuth } from "../api/auth";
import { useEffect, useState, type JSX } from "react";

interface ProtectedRouteProps {
    element: JSX.Element;
}

const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    const checkAdminAuth = async () => {
        const res = await checkAuth();
        setIsAuthenticated(res.authenticated)

    }

    useEffect(() => {
        checkAdminAuth();
    }, [])


    if (!isAuthenticated && isAuthenticated !== null) {
        return <Navigate to="/login" replace />;
    }

    return element;
};

export default ProtectedRoute;
