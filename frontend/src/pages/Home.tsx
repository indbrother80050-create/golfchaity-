import { motion } from "motion/react";
import { Link, Navigate } from "react-router-dom";
import {
  Trophy,
  Heart,
  ShieldCheck,
  ArrowRight,
  Star,
  Target,
  Users,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.ts";

export default function Home() {
  const { user } = useAuthStore();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="bg-[#f5f5f0] text-[#2c2c28] selection:bg-[#5A5A40]/20">
      {/* Hero Section - Editorial Style */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#5A5A40]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#8B7355]/10 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-5 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#f5f5f0]/80 via-[#f5f5f0]/90 to-[#f5f5f0]" />
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
                  <div className="h-[1px] w-12 bg-[#5A5A40]/50" />
                  <span className="text-xs uppercase tracking-[0.3em] text-[#5A5A40] font-medium">
                    EST. 2024 • THE PREMIER CLUB
                  </span>
                </div>

                <h1 className="text-6xl md:text-8xl lg:text-[100px] font-light leading-[0.9] tracking-tighter mb-8 text-[#1a1a18]">
                  ELEVATE YOUR <br />
                  <span className="italic font-serif text-[#5A5A40]">
                    LEGACY.
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-[#2c2c28]/70 max-w-xl mb-12 leading-relaxed font-light">
                  A sophisticated subscription platform where every swing
                  supports a cause. Track your performance, enter exclusive
                  monthly draws, and drive meaningful impact.
                </p>

                <div className="flex flex-wrap gap-6 items-center">
                  <Link
                    to="/register"
                    className="group relative px-10 py-5 bg-[#5A5A40] text-white rounded-full font-medium overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#5A5A40]/20"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      JOIN THE CLUB
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                  <Link
                    to="/charities"
                    className="text-sm uppercase tracking-widest font-semibold text-[#5A5A40] hover:text-[#2c2c28] transition-colors border-b border-[#5A5A40]/30 pb-1"
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
                className="relative aspect-[3/4] rounded-full overflow-hidden border border-[#5A5A40]/10 shadow-2xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=2070&auto=format&fit=crop"
                  alt="Golf Course"
                  className="object-cover w-full h-full transition-all duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2c2c28]/80 via-transparent to-transparent" />
                <div className="absolute bottom-12 left-8 right-8 text-center text-white">
                  <div className="text-3xl font-serif italic mb-1">
                    "The perfect drive"
                  </div>
                  <div className="text-xs uppercase tracking-widest text-white/70">
                    Featured Charity: Green Earth
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Trust Section */}
      <section className="py-20 border-y border-[#2c2c28]/10 bg-white/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: "ACTIVE PLAYERS", value: "2.4K+" },
              { label: "CHARITY IMPACT", value: "$120K" },
              { label: "MONTHLY PRIZES", value: "$15K" },
              { label: "PARTNER CLUBS", value: "45" },
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="text-4xl font-serif text-[#5A5A40]">
                  {stat.value}
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#2c2c28]/60 font-bold">
                  {stat.label}
                </div>
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
              <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6 text-[#1a1a18]">
                DESIGNED FOR the <br />
                <span className="italic font-serif text-[#5A5A40]">
                  MODERN GOLFER.
                </span>
              </h2>
              <p className="text-[#2c2c28]/70 font-light">
                We've built a platform that respects the traditions of the game
                while leveraging modern technology to create a community of
                impact.
              </p>
            </div>
            <div className="text-right">
              <div className="text-6xl font-serif italic text-[#5A5A40]/20">
                01—03
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-12 space-y-8 shadow-sm border border-[#2c2c28]/5 hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-full bg-[#f5f5f0] flex items-center justify-center text-[#5A5A40] group-hover:bg-[#5A5A40] group-hover:text-white transition-all">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-serif mb-4">Precision Tracking</h3>
                <p className="text-[#2c2c28]/70 font-light leading-relaxed">
                  Log your last 5 scores with ease. Our system maintains your
                  performance history to ensure fair participation in weighted
                  draws.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-12 space-y-8 shadow-sm border border-[#2c2c28]/5 hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-full bg-[#f5f5f0] flex items-center justify-center text-[#5A5A40] group-hover:bg-[#5A5A40] group-hover:text-white transition-all">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-serif mb-4">The Monthly Draw</h3>
                <p className="text-[#2c2c28]/70 font-light leading-relaxed">
                  Every month, we draw winning numbers. Match your scores to win
                  significant prizes, with a portion automatically supporting
                  your cause.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-12 space-y-8 shadow-sm border border-[#2c2c28]/5 hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-full bg-[#f5f5f0] flex items-center justify-center text-[#5A5A40] group-hover:bg-[#5A5A40] group-hover:text-white transition-all">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-serif mb-4">Charitable Legacy</h3>
                <p className="text-[#2c2c28]/70 font-light leading-relaxed">
                  Choose from our curated list of world-class charities. Your
                  subscription and your wins directly contribute to global
                  betterment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Faces of Impact / Donors Section */}
      <section className="py-32 bg-white border-t border-[#2c2c28]/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4 text-[#1a1a18]">
              FACES OF{" "}
              <span className="italic font-serif text-[#5A5A40]">IMPACT.</span>
            </h2>
            <p className="text-[#2c2c28]/70 font-light max-w-2xl mx-auto">
              Meet the generous donors and charity partners who make our mission
              possible. Together, we are changing lives one swing at a time.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                name: "Sarah Jenkins",
                role: "Platinum Donor",
                img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
              },
              {
                name: "Michael Chang",
                role: "Charity Partner",
                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
              },
              {
                name: "Elena Rodriguez",
                role: "Gold Donor",
                img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
              },
              {
                name: "David Smith",
                role: "Foundation Lead",
                img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
              },
            ].map((person, i) => (
              <div
                key={i}
                className="group relative aspect-[3/4] overflow-hidden rounded-full shadow-md"
              >
                <img
                  src={person.img}
                  alt={person.name}
                  className="object-cover w-full h-full transition-all duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2c2c28]/90 via-[#2c2c28]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-8 left-0 right-0 text-center transform translate-y-4 group-hover:translate-y-0 transition-transform text-white">
                  <div className="text-lg font-serif">{person.name}</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/80 mt-1">
                    {person.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Team Section */}
      <section className="py-32 bg-[#f5f5f0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6 text-[#1a1a18]">
                THE TEAM BEHIND <br />
                <span className="italic font-serif text-[#5A5A40]">
                  THE VISION.
                </span>
              </h2>
              <p className="text-[#2c2c28]/70 font-light">
                A dedicated group of golf enthusiasts, technologists, and
                philanthropists working to bridge the gap between sport and
                social good.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                name: "James Wilson",
                role: "Founder & CEO",
                desc: "Former PGA pro turned tech entrepreneur.",
                img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
              },
              {
                name: "Aisha Patel",
                role: "Head of Charities",
                desc: "15 years experience in global non-profit management.",
                img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
              },
              {
                name: "Marcus Johnson",
                role: "CTO",
                desc: "Building secure, scalable systems for the modern web.",
                img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
              },
            ].map((member, i) => (
              <div key={i} className="space-y-6 group text-center">
                <div className="aspect-square overflow-hidden rounded-full border border-[#2c2c28]/10 group-hover:border-[#5A5A40]/50 transition-colors p-2 mx-auto w-48 h-48 bg-white">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="object-cover w-full h-full rounded-full transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-serif">{member.name}</h3>
                  <div className="text-xs uppercase tracking-widest text-[#5A5A40] mt-2 mb-3">
                    {member.role}
                  </div>
                  <p className="text-[#2c2c28]/60 font-light text-sm max-w-xs mx-auto">
                    {member.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-[#5A5A40] relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-10" />
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
            <p className="text-white/80 text-lg max-w-xl mx-auto font-light">
              Join thousands of golfers making an impact. Start your
              subscription today and become part of the most exclusive club in
              golf.
            </p>
            <div className="pt-6">
              <Link
                to="/register"
                className="inline-flex items-center gap-4 px-12 py-6 bg-white text-[#5A5A40] rounded-full font-bold text-lg hover:bg-[#f5f5f0] transition-all shadow-xl"
              >
                GET STARTED NOW
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-[#2c2c28]/10 text-center text-[#2c2c28]/60 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xs uppercase tracking-[0.4em] font-bold text-[#5A5A40]">
            GOLF CHARITY PRO
          </div>
          <div className="flex gap-8 text-xs uppercase tracking-widest font-medium">
            <a href="#" className="hover:text-[#5A5A40] transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-[#5A5A40] transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-[#5A5A40] transition-colors">
              Contact
            </a>
          </div>
          <div className="text-xs font-light">© 2026 ALL RIGHTS RESERVED</div>
        </div>
      </footer>
    </div>
  );
}
