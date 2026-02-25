import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Sidebar() {
    const navigate = useNavigate();
    const { logout, user } = useAuth();

    const menuItems = [
        { label: "Dashboard", path: "/dashboard" },
        { label: "Grammar", path: "/grammar" },
        { label: "Vocabulary", path: "/vocabulary" },
        { label: "Speaking", path: "/speaking" },
        { label: "Listening", path: "/listening" },
        { label: "Chat", path: "/chat" },
    ];

    return (
        <aside className="min-h-screen w-64 bg-white border-r border-gray-200 shadow-sm p-6 hidden md:flex flex-col overflow-y-auto">
            <nav className="space-y-3">
                {menuItems.map((item) => (
                    <button
                        key={item.path}
                        onClick={() => navigate(item.path)}
                        className="block w-full text-left px-4 py-2 rounded-lg hover:bg-[#EAF6FB] font-medium text-[#023047]"
                    >
                        {item.label}
                    </button>
                ))}
            </nav>

            <div className="mt-auto pt-6 border-t border-gray-200">
                {user?.name && (
                    <div className="text-sm text-gray-600 mb-3">Signed in as {user.name}</div>
                )}
                <button
                    onClick={() => {
                        logout();
                        navigate("/auth/sign-in");
                    }}
                    className="w-full px-4 py-2 rounded-lg bg-[#FFB703] text-[#023047] font-semibold"
                >
                    Sign out
                </button>
            </div>
        </aside>
    );
}
