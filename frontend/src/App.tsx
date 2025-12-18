import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import ChatPage from "./pages/Chat/ChatPage";
import SignInPage from "./pages/Auth/SignInPage";
import SignUpPage from "./pages/Auth/SignUpPage";
import {ProtectedRoute} from "./routes/ProtectedRoute";
import {PublicRoute} from "./routes/PublicRoute";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
                <Route path="/auth/sign-in" element={<PublicRoute><SignInPage /></PublicRoute>} />
                <Route path="/auth/sign-up" element={<PublicRoute><SignUpPage /></PublicRoute>} />
                <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
}