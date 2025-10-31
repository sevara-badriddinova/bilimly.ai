import {Navigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";

export function PublicRoute({children}: {children: JSX.Element}){
    const {isAuthenticated} = useAuth();

    // redirect to app dashboard if logged in
    if (isAuthenticated){
        return <Navigate to="/chat" replace/>;
    }

    return children;
}