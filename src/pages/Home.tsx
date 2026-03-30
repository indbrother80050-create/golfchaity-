import { motion } from "motion/react";
import { Link, Navigate } from "react-router-dom";
import { Trophy, Heart, ShieldCheck, ArrowRight, Star, Target, Users } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.ts";

export default function Home() {
  const { user } = useAuthStore();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="bg-[#050505] text-white selection:bg-emerald-500/30">
      {/* Hero Section - Editorial Style */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-900/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <div className="h-[1px] w-12 bg-emerald-500/50" />
                  <span className="text-xs uppercase tracking-[0.3em] text-emerald-400 font-medium">EST. 2024 • THE PREMIER CLUB</span>
                </div>
                
                <h1 className="text-6xl md:text-8xl lg:text-[100px] font-light leading-[0.9] tracking-tighter mb-8">
                  ELEVATE YOUR <br />
                  <span className="italic font-serif text-emerald-500">LEGACY.</span>
                </h1>
                
                <p className="text-lg md:text-xl text-zinc-400 max-w-xl mb-12 leading-relaxed font-light">
                  A sophisticated subscription platform where every swing supports a cause. 
                  Track your performance, enter exclusive monthly draws, and drive meaningful impact.
                </p>

                <div className="flex flex-wrap gap-6 items-center">
                  <Link 
                    to="/register" 
                    className="group relative px-10 py-5 bg-white text-black rounded-full font-medium overflow-hidden transition-all hover:scale-105 active:scale-95"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      JOIN THE CLUB
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                  <Link 
                    to="/charities" 
                    className="text-sm uppercase tracking-widest font-semibold text-zinc-500 hover:text-white transition-colors border-b border-zinc-800 pb-1"
                  >
                    EXPLORE IMPACT
                  </Link>
                </div>
              </motion.div>
            </div>
            
            <div className="lg:col-span-4 hidden lg:block">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10"
              >
                <img 
                  src="https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=2070&auto=format&fit=crop" 
                  alt="Golf Course" 
                  className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="text-3xl font-serif italic mb-1">"The perfect drive"</div>
                  <div className="text-xs uppercase tracking-widest text-zinc-400">Featured Charity: Green Earth</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Trust Section */}
      <section className="py-20 border-y border-white/5 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: "ACTIVE PLAYERS", value: "2.4K+" },
              { label: "CHARITY IMPACT", value: "$120K" },
              { label: "MONTHLY PRIZES", value: "$15K" },
              { label: "PARTNER CLUBS", value: "45" },
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="text-3xl font-light tracking-tighter">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features - Hardware/Tool Style */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
                DESIGNED FOR the <br />
                <span className="italic font-serif text-emerald-500">MODERN GOLFER.</span>
              </h2>
              <p className="text-zinc-400 font-light">
                We've built a platform that respects the traditions of the game while 
                leveraging modern technology to create a community of impact.
              </p>
            </div>
            <div className="text-right">
              <div className="text-6xl font-serif italic text-zinc-800">01—03</div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden">
            <div className="bg-black p-12 space-y-8 hover:bg-zinc-900/50 transition-colors group">
              <div className="w-12 h-12 rounded-full border border-emerald-500/30 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-black transition-all">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-4">Precision Tracking</h3>
                <p className="text-zinc-500 font-light leading-relaxed">
                  Log your last 5 scores with ease. Our system maintains your performance history 
                  to ensure fair participation in weighted draws.
                </p>
              </div>
            </div>

            <div className="bg-black p-12 space-y-8 hover:bg-zinc-900/50 transition-colors group">
              <div className="w-12 h-12 rounded-full border border-blue-500/30 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-black transition-all">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-4">The Monthly Draw</h3>
                <p className="text-zinc-500 font-light leading-relaxed">
                  Every month, we draw winning numbers. Match your scores to win significant 
                  prizes, with a portion automatically supporting your cause.
                </p>
              </div>
            </div>

            <div className="bg-black p-12 space-y-8 hover:bg-zinc-900/50 transition-colors group">
              <div className="w-12 h-12 rounded-full border border-red-500/30 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-black transition-all">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-4">Charitable Legacy</h3>
                <p className="text-zinc-500 font-light leading-relaxed">
                  Choose from our curated list of world-class charities. Your subscription 
                  and your wins directly contribute to global betterment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-emerald-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <h2 className="text-5xl md:text-7xl font-light tracking-tighter">
              READY TO <br />
              <span className="italic font-serif">TEE OFF?</span>
            </h2>
            <p className="text-emerald-100/60 text-lg max-w-xl mx-auto font-light">
              Join thousands of golfers making an impact. Start your subscription today 
              and become part of the most exclusive club in golf.
            </p>
            <div className="pt-6">
              <Link 
                to="/register" 
                className="inline-flex items-center gap-4 px-12 py-6 bg-white text-black rounded-full font-bold text-lg hover:bg-emerald-400 transition-all"
              >
                GET STARTED NOW
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center text-zinc-600">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xs uppercase tracking-[0.4em] font-bold text-zinc-400">GOLF CHARITY PRO</div>
          <div className="flex gap-8 text-xs uppercase tracking-widest font-medium">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <div className="text-xs font-light">© 2024 ALL RIGHTS RESERVED</div>
        </div>
      </footer>
    </div>
  );
}
