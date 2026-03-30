import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../store/useAuthStore.ts";
import axios from "axios";
import { Trophy, Plus, Calendar, History, Heart } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export default function Dashboard() {
  const { user: authUser, setUser } = useAuthStore();
  const queryClient = useQueryClient();
  const [newScore, setNewScore] = useState("");

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axios.get("/api/v1/auth/me");
      return res.data;
    },
  });

  const { data: scores, isLoading: scoresLoading } = useQuery({
    queryKey: ["scores"],
    queryFn: async () => {
      const res = await axios.get("/api/v1/scores");
      return res.data;
    },
  });

  const addScoreMutation = useMutation({
    mutationFn: async (value: number) => {
      return axios.post("/api/v1/scores", { value });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scores"] });
      setNewScore("");
    },
  });

  const activateSubMutation = useMutation({
    mutationFn: async () => {
      return axios.post("/api/v1/auth/mock-subscription");
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      if (user) {
        setUser({ ...user, subscription: res.data });
      }
    },
  });

  if (userLoading) return <div className="p-12 text-center text-[#6b6b63]">Loading dashboard...</div>;
  if (!user) return null;

  const isActive = user.subscription?.status === "ACTIVE";

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-[#f5f5f0] min-h-[calc(100vh-64px)]">
      <div className="mb-12">
        <h1 className="text-5xl font-serif text-[#2c2c28]">Hello, {user.name}</h1>
        <p className="text-[#6b6b63] mt-3 text-lg">Here's what's happening with your golf game.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Score Tracking */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white rounded-[32px] p-8 border border-[#e8e8e3] shadow-[0px_4px_20px_rgba(0,0,0,0.03)]">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-serif flex items-center text-[#2c2c28]">
                <History className="w-5 h-5 mr-3 text-[#5A5A40]" />
                Recent Scores
              </h2>
              <div className="flex space-x-2">
                <input 
                  type="number" 
                  min="1" 
                  max="45"
                  value={newScore}
                  onChange={(e) => setNewScore(e.target.value)}
                  placeholder="Score"
                  className="w-24 px-4 py-2 rounded-xl border border-[#d1d1c7] outline-none focus:ring-2 focus:ring-[#5A5A40] bg-[#fdfdfc]"
                />
                <button 
                  onClick={() => addScoreMutation.mutate(Number(newScore))}
                  disabled={!newScore || addScoreMutation.isPending}
                  className="bg-[#5A5A40] text-white p-2 px-4 rounded-xl hover:bg-[#4a4a34] disabled:opacity-50 transition-all flex items-center justify-center"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {scoresLoading ? (
              <p className="text-[#6b6b63]">Loading scores...</p>
            ) : scores?.length > 0 ? (
              <div className="space-y-4">
                {scores.map((score: any) => (
                  <div key={score.id} className="flex items-center justify-between p-5 bg-[#f5f5f0] rounded-2xl border border-[#e8e8e3]">
                    <div className="flex items-center space-x-5">
                      <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center font-serif font-bold text-2xl text-[#5A5A40] border border-[#d1d1c7] shadow-sm">
                        {score.value}
                      </div>
                      <div>
                        <p className="font-semibold text-[#2c2c28]">Standard Round</p>
                        <p className="text-sm text-[#6b6b63] flex items-center mt-1">
                          <Calendar className="w-4 h-4 mr-1.5 opacity-70" />
                          {new Date(score.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-[#f5f5f0] rounded-2xl border border-dashed border-[#d1d1c7]">
                <p className="text-[#6b6b63]">No scores recorded yet. Add your first round!</p>
              </div>
            )}
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <section className="bg-[#2c2c28] text-[#f5f5f0] rounded-[32px] p-8 shadow-[0px_4px_20px_rgba(0,0,0,0.05)]">
            <h3 className="text-xl font-serif mb-6 flex items-center">
              <Trophy className="w-5 h-5 mr-3 text-[#c2b280]" />
              Subscription
            </h3>
            <div className="space-y-5">
              <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-sm text-[#a3a39b] uppercase tracking-wider mb-1">Current Plan</p>
                <p className="text-2xl font-serif">{isActive ? "Pro Monthly" : "No Active Plan"}</p>
                {isActive && (
                  <p className="text-sm text-[#8a8a82] mt-2">
                    Expires: {new Date(user.subscription.currentPeriodEnd).toLocaleDateString()}
                  </p>
                )}
              </div>
              {isActive ? (
                <button className="w-full bg-[#5A5A40] text-white py-3.5 rounded-full font-medium tracking-wide hover:bg-[#4a4a34] transition-all">
                  Manage Billing
                </button>
              ) : (
                <button 
                  onClick={() => activateSubMutation.mutate()}
                  disabled={activateSubMutation.isPending}
                  className="w-full bg-[#5A5A40] text-white py-3.5 rounded-full font-medium tracking-wide hover:bg-[#4a4a34] transition-all disabled:opacity-50"
                >
                  {activateSubMutation.isPending ? "Activating..." : "Activate Subscription"}
                </button>
              )}
            </div>
          </section>

          <section className="bg-white rounded-[32px] p-8 border border-[#e8e8e3] shadow-[0px_4px_20px_rgba(0,0,0,0.03)]">
            <h3 className="text-xl font-serif mb-4 flex items-center text-[#2c2c28]">
              <Heart className="w-5 h-5 mr-3 text-[#8c3b3b]" />
              Charity Impact
            </h3>
            <p className="text-[#6b6b63] mb-6 leading-relaxed">You are currently contributing 10% of your winnings to your selected charity.</p>
            <button className="w-full border border-[#d1d1c7] text-[#4a4a44] py-3.5 rounded-full font-medium tracking-wide hover:bg-[#f5f5f0] transition-all">
              Change Charity
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
