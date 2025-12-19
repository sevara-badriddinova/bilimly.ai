import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"
import { JSX } from "react";

export function ProtectedRoute({children}: {children: JSX.Element}){
    const {isAuthenticated} = useAuth();
    const auth = useAuth();

    if (!auth) return null;
    if(!isAuthenticated){
        return <Navigate to="/auth/sign-in" replace />;
    }
    return children;
}
