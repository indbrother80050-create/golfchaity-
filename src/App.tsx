import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore.ts";
import { LogOut, Trophy, Heart, LayoutDashboard, History } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Lazy load pages
const Home = React.lazy(() => import("./pages/Home.tsx"));
const Login = React.lazy(() => import("./pages/Login.tsx"));
const Register = React.lazy(() => import("./pages/Register.tsx"));
const Dashboard = React.lazy(() => import("./pages/Dashboard.tsx"));
const Charities = React.lazy(() => import("./pages/Charities.tsx"));

export default function App() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] font-sans">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Trophy className="w-8 h-8 text-emerald-600" />
              <span className="text-xl font-bold tracking-tight">GOLF CHARITY PRO</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link to="/charities" className="text-sm font-medium hover:text-emerald-600 transition-colors">Charities</Link>
              {user ? (
                <>
                  <Link to="/dashboard" className="text-sm font-medium hover:text-emerald-600 transition-colors">Dashboard</Link>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-sm font-medium hover:text-emerald-600 transition-colors">Login</Link>
                  <Link to="/register" className="bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-emerald-700 transition-all">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main>
        <React.Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
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

      <footer className="bg-white border-t border-gray-200 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">© 2026 Golf Charity Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
