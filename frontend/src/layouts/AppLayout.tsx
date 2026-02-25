import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/ui/Sidebar";

export default function AppLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
            <Navbar />

            {/* This should fill ALL available space before the footer */}
            <div className="flex flex-1 items-stretch">
                <Sidebar />

                <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
                    <Outlet />
                </main>
            </div>

            <Footer />
        </div>
    );
}
