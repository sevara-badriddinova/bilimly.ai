import {Navigate, useLocation} from "react-router-dom";
import {useAuth} from "@/context/AuthContext";

export default function RequireAdmin({children}: { children: React.ReactNode }) {
    const {user, isAuthenticated, isLoading} = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"/>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/signin" replace state={{from: location}}/>;
    }

    if (user?.role !== "ADMIN") {
        return <Navigate to="/app" replace/>;
    }

    return <>{children}</>;
}
