import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Sidebar() {
    const navigate = useNavigate();

    const menuItems = [
        { label: "Dashboard", path: "/dashboard" },
        { label: "Lessons", path: "/lessons" },
        { label: "Vocabulary", path: "/vocabulary" },
        { label: "Chat", path: "/chat" },
        { label: "Settings", path: "/settings" },
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
        </aside>
    );
}
