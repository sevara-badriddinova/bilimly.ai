import { Outlet } from "react-router-dom";
import Sidebar from "../components/ui/Sidebar";

export default function AppLayout() {
    return (
        <div className="min-h-screen flex" style={{ background: '#F0F6FF' }}>
            <Sidebar />
            <main className="flex-1 overflow-y-auto min-w-0 pl-0 md:pl-0 pt-14 md:pt-0">
                <Outlet />
            </main>
        </div>
    );
}