import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.ts";
import { motion } from "motion/react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const response = await axios.post("/api/v1/auth/login", { email, password });
      setUser(response.data.user);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12 bg-[#f5f5f0]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-[32px] shadow-[0px_4px_20px_rgba(0,0,0,0.05)] p-10 border border-[#e8e8e3]"
      >
        <div className="text-center mb-10">
          <h2 className="text-4xl font-serif text-[#2c2c28] mb-2">Welcome Back</h2>
          <p className="text-[#6b6b63]">Sign in to manage your scores and draws</p>
        </div>

        {error && (
          <div className="bg-[#fdf2f2] text-[#c53030] p-4 rounded-xl text-sm mb-6 border border-[#fbd5d5]">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#4a4a44] mb-2 uppercase tracking-wider text-xs">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#d1d1c7] bg-[#fdfdfc] focus:ring-2 focus:ring-[#5A5A40] focus:border-transparent outline-none transition-all text-[#2c2c28]"
              placeholder="name@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#4a4a44] mb-2 uppercase tracking-wider text-xs">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#d1d1c7] bg-[#fdfdfc] focus:ring-2 focus:ring-[#5A5A40] focus:border-transparent outline-none transition-all text-[#2c2c28]"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#5A5A40] text-[#f5f5f0] py-4 rounded-full font-medium tracking-wide hover:bg-[#4a4a34] transition-all disabled:opacity-50 mt-4"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-[#6b6b63]">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#5A5A40] font-semibold hover:underline underline-offset-4">Register now</Link>
        </p>
      </motion.div>
    </div>
  );
}
