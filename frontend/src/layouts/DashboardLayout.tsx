import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="flex min-h-screen bg-[#F9FAFB] text-[#0F172A]">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r p-6 flex flex-col justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-[#023047] mb-8">Bilimly.ai</h2>
                    <nav className="space-y-4">
                        <Link to="/dashboard" className="block font-semibold text-[#023047]">
                            📊 Dashboard
                        </Link>
                        <Link to="/study-plan" className="block text-gray-600 hover:text-[#023047]">
                            📝 Study Plan
                        </Link>
                        <Link to="/homework" className="block text-gray-600 hover:text-[#023047]">
                            📚 Homework
                        </Link>
                        <Link to="/articles" className="block text-gray-600 hover:text-[#023047]">
                            📰 Articles
                        </Link>
                    </nav>
                </div>

                <button
                    onClick={handleLogout}
                    className="mt-6 bg-[#ffb703] text-white font-semibold px-4 py-2 rounded-xl"
                >
                    Logout
                </button>
            </aside>

            {/* Main Page Content */}
            <main className="flex-1 p-10 overflow-y-auto">{children}</main>
        </div>
    );
}
