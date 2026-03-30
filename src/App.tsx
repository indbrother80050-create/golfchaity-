import React from "react";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore.ts";
import { LogOut, Trophy } from "lucide-react";
import { AnimatePresence } from "motion/react";

// Lazy load pages
const Home = React.lazy(() => import("./pages/Home.tsx"));
const Login = React.lazy(() => import("./pages/Login.tsx"));
const Register = React.lazy(() => import("./pages/Register.tsx"));
const Dashboard = React.lazy(() => import("./pages/Dashboard.tsx"));
const Charities = React.lazy(() => import("./pages/Charities.tsx"));

export default function App() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen font-sans bg-[#f5f5f0]">
      {!isHome && (
        <nav className="bg-[#fdfdfc] border-b border-[#e8e8e3] sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link to="/" className="flex items-center space-x-2">
                <Trophy className="w-8 h-8 text-[#5A5A40]" />
                <span className="text-xl font-serif font-bold tracking-tight text-[#2c2c28]">GOLF CHARITY PRO</span>
              </Link>

              <div className="hidden md:flex items-center space-x-8">
                <Link to="/charities" className="text-sm font-medium text-[#4a4a44] hover:text-[#5A5A40] transition-colors">Charities</Link>
                {user ? (
                  <>
                    <Link to="/dashboard" className="text-sm font-medium text-[#4a4a44] hover:text-[#5A5A40] transition-colors">Dashboard</Link>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center space-x-1 text-sm font-medium text-[#8c3b3b] hover:text-[#6b2a2a] transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="text-sm font-medium text-[#4a4a44] hover:text-[#5A5A40] transition-colors">Login</Link>
                    <Link to="/register" className="bg-[#5A5A40] text-[#f5f5f0] px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#4a4a34] transition-all">
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      )}

      <main>
        <React.Suspense fallback={<div className="flex items-center justify-center h-[calc(100vh-64px)] text-[#6b6b63]">Loading...</div>}>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/charities" element={<Charities />} />
            </Routes>
          </AnimatePresence>
        </React.Suspense>
      </main>

      {!isHome && (
        <footer className="bg-[#fdfdfc] border-t border-[#e8e8e3] py-12 mt-auto">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-sm text-[#6b6b63]">© 2026 Golf Charity Pro. All rights reserved.</p>
          </div>
        </footer>
      )}
    </div>
  );
}
