import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Logo from './ui/Logo';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/auth/sign-in');
    };

    return (
        <header className="w-full sticky top-0 z-50" style={{ background: '#003f88' }}>
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <Link to="/" aria-label="Bilimly.ai home">
                    <Logo />
                </Link>
                <div className="hidden md:flex items-center gap-6 text-white/90 text-sm font-medium">
                    {isAuthenticated ? (
                        <>
                            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'underline' : '')}>
                                Dashboard
                            </NavLink>
                            <NavLink to="/chat" className={({ isActive }) => (isActive ? 'underline' : '')}>
                                Chat
                            </NavLink>
                            <button
                                onClick={handleLogout}
                                className="ml-4 bg-[#FFB703] text-[#023047] px-3 py-1 rounded-lg font-semibold"
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/pricing">Pricing</NavLink>
                            <NavLink to="/auth/sign-in">Sign In</NavLink>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}
