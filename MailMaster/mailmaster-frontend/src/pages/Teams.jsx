import { Users, UserPlus, Share2, ShieldCheck, Globe } from 'lucide-react';

export default function Teams() {
  return (
    <div className="h-full min-h-[80vh] flex flex-col items-center justify-center bg-[#0F1115] relative overflow-hidden">
      
      {/* Background Collaborative Aura */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 blur-[130px] rounded-full animate-pulse" />
        {/* Decorative "Connection" Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <line x1="10%" y1="20%" x2="30%" y2="50%" stroke="currentColor" className="text-emerald-500/20" strokeWidth="1" />
          <line x1="90%" y1="80%" x2="70%" y2="40%" stroke="currentColor" className="text-indigo-500/20" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative z-10 text-center px-6">
        {/* Collaborative Centerpiece */}
        <div className="relative inline-block mb-12">
          {/* Orbiting Avatar Skeletons */}
          <div className="absolute -top-8 -left-8 w-12 h-12 bg-white/5 border border-white/10 rounded-full backdrop-blur-md animate-bounce flex items-center justify-center">
            <UserPlus className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="absolute top-12 -right-10 w-10 h-10 bg-white/5 border border-white/10 rounded-full backdrop-blur-md animate-[bounce_4s_infinite_0.5s] flex items-center justify-center">
            <Share2 className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md animate-[pulse_3s_infinite] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-emerald-500" />
          </div>

          {/* Main Teams Icon with Network Glow */}
          <div className="relative w-40 h-40 bg-[#161920] border-2 border-emerald-500/20 rounded-[3rem] flex items-center justify-center shadow-[0_0_60px_-15px_rgba(16,185,129,0.2)] group transition-transform duration-700 hover:rotate-3">
            <div className="absolute inset-0 bg-emerald-500/10 blur-3xl rounded-full opacity-50" />
            <Users className="w-20 h-20 text-emerald-400 relative z-10 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-6 max-w-xl mx-auto">
          <div className="flex items-center justify-center gap-4">
             <Globe className="w-4 h-4 text-slate-600 animate-spin-slow" />
             <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.5em]">Multi-User Protocol</span>
             <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase italic">
            Nexus <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-indigo-400 bg-clip-text text-transparent">Teams</span>
          </h2>
          
          <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-md mx-auto">
            Synchronize your workflow across departments with granular permissions. 
            <span className="block mt-4 text-emerald-400/60 font-black italic tracking-widest text-sm">Deployment: Day 4</span>
          </p>
        </div>

        {/* Access Matrix Preview */}
        <div className="mt-12 flex justify-center gap-3">
            {[1, 2, 3].map((i) => (
                <div key={i} className={`h-1.5 rounded-full bg-white/5 border border-white/10 ${i === 1 ? 'w-12 bg-emerald-500/40' : 'w-4'}`} />
            ))}
        </div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(circle_at_center,#000_60%,transparent_100%)] pointer-events-none" />
    </div>
  );
}