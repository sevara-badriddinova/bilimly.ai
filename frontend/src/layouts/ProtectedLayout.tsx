import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useAuth} from "@/context/AuthContext";

export default function ProtectedLayout() {
    const {isAuthenticated, isLoading} = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0EA5C9] border-t-transparent"/>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/signin" replace state={{from: location}}/>;
    }

    return <Outlet/>;
}
