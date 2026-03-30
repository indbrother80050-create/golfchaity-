import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "motion/react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    charityId: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { data: charities } = useQuery({
    queryKey: ["charities"],
    queryFn: async () => {
      const res = await axios.get("/api/v1/charities");
      return res.data.data;
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post("/api/v1/auth/register", formData);
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
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
          <h2 className="text-4xl font-serif text-[#2c2c28] mb-2">
            Join the Club
          </h2>
          <p className="text-[#6b6b63]">
            Start tracking and contributing today
          </p>
        </div>

        {error && (
          <div className="bg-[#fdf2f2] text-[#c53030] p-4 rounded-xl text-sm mb-6 border border-[#fbd5d5]">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#4a4a44] mb-2 uppercase tracking-wider text-xs">
              Full Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-[#d1d1c7] bg-[#fdfdfc] focus:ring-2 focus:ring-[#5A5A40] outline-none transition-all text-[#2c2c28]"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#4a4a44] mb-2 uppercase tracking-wider text-xs">
              Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-[#d1d1c7] bg-[#fdfdfc] focus:ring-2 focus:ring-[#5A5A40] outline-none transition-all text-[#2c2c28]"
              placeholder="name@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#4a4a44] mb-2 uppercase tracking-wider text-xs">
              Password
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-[#d1d1c7] bg-[#fdfdfc] focus:ring-2 focus:ring-[#5A5A40] outline-none transition-all text-[#2c2c28]"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#4a4a44] mb-2 uppercase tracking-wider text-xs">
              Select Charity
            </label>
            <select
              value={formData.charityId}
              onChange={(e) =>
                setFormData({ ...formData, charityId: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-[#d1d1c7] bg-[#fdfdfc] focus:ring-2 focus:ring-[#5A5A40] outline-none transition-all text-[#2c2c28]"
            >
              <option value="">Select a charity...</option>
              {charities?.map((c: any) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#5A5A40] text-[#f5f5f0] py-4 rounded-full font-medium tracking-wide hover:bg-[#4a4a34] transition-all disabled:opacity-50 mt-6"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-[#6b6b63]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#5A5A40] font-semibold hover:underline underline-offset-4"
          >
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
