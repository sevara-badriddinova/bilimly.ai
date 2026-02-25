import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";

export default function PublicLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
