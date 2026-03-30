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

  if (userLoading) return <div className="p-12 text-center">Loading dashboard...</div>;
  if (!user) return null;

  const isActive = user.subscription?.status === "ACTIVE";

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold">Hello, {user.name}</h1>
        <p className="text-gray-500 mt-2">Here's what's happening with your golf game.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Score Tracking */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold flex items-center">
                <History className="w-5 h-5 mr-2 text-emerald-600" />
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
                  className="w-24 px-3 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button 
                  onClick={() => addScoreMutation.mutate(Number(newScore))}
                  disabled={!newScore || addScoreMutation.isPending}
                  className="bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700 disabled:opacity-50"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {scoresLoading ? (
              <p>Loading scores...</p>
            ) : scores?.length > 0 ? (
              <div className="space-y-4">
                {scores.map((score: any) => (
                  <div key={score.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center font-bold text-lg text-emerald-600 border border-gray-100">
                        {score.value}
                      </div>
                      <div>
                        <p className="font-semibold">Standard Round</p>
                        <p className="text-xs text-gray-500 flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(score.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                <p className="text-gray-500">No scores recorded yet. Add your first round!</p>
              </div>
            )}
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <section className="bg-emerald-900 text-white rounded-3xl p-8">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-emerald-400" />
              Subscription
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-white/10 rounded-2xl">
                <p className="text-sm text-emerald-100/60">Current Plan</p>
                <p className="text-xl font-bold">{isActive ? "Pro Monthly" : "No Active Plan"}</p>
                {isActive && (
                  <p className="text-xs text-emerald-100/40 mt-1">
                    Expires: {new Date(user.subscription.currentPeriodEnd).toLocaleDateString()}
                  </p>
                )}
              </div>
              {isActive ? (
                <button className="w-full bg-emerald-500 py-3 rounded-xl font-bold hover:bg-emerald-400 transition-all">
                  Manage Billing
                </button>
              ) : (
                <button 
                  onClick={() => activateSubMutation.mutate()}
                  disabled={activateSubMutation.isPending}
                  className="w-full bg-emerald-500 py-3 rounded-xl font-bold hover:bg-emerald-400 transition-all"
                >
                  {activateSubMutation.isPending ? "Activating..." : "Activate Subscription"}
                </button>
              )}
            </div>
          </section>

          <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <Heart className="w-5 h-5 mr-2 text-red-500" />
              Charity
            </h3>
            <p className="text-sm text-gray-500 mb-4">You are currently contributing 10% of your winnings to your selected charity.</p>
            <button className="w-full border border-gray-200 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all">
              Change Charity
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
