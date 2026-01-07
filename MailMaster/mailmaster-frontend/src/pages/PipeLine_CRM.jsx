import { Layers, ArrowRight, DollarSign, Target, TrendingUp, Zap } from 'lucide-react';

export default function Pipeline() {
  return (
    <div className="h-full min-h-[80vh] flex flex-col items-center justify-center bg-[#0F1115] relative overflow-hidden">
      
      {/* Background Flow Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-amber-500/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/5 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 text-center px-6">
        {/* The "Conversion Funnel" Centerpiece */}
        <div className="relative inline-block mb-16">
          {/* Kinetic Flow Lines */}
          <div className="absolute -inset-x-20 top-1/2 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
          <div className="absolute -inset-x-40 top-1/3 h-px bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent animate-[pulse_3s_infinite]" />
          
          {/* Orbiting Deal Metrics */}
          <div className="absolute -top-12 -right-8 flex items-center gap-2 bg-[#1a1d26] border border-white/10 px-3 py-2 rounded-2xl shadow-2xl animate-bounce">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] font-black text-white">$42.8k</span>
          </div>
          <div className="absolute top-1/2 -left-20 -translate-y-1/2 flex items-center gap-2 bg-[#1a1d26] border border-white/10 px-3 py-2 rounded-2xl shadow-2xl animate-[pulse_4s_infinite]">
            <Target className="w-4 h-4 text-amber-400" />
            <span className="text-[10px] font-black text-white">12 Leads</span>
          </div>

          {/* Main Pipeline Vessel */}
          <div className="relative w-48 h-48 bg-white/[0.02] border border-white/10 rounded-[4rem] flex flex-col items-center justify-center backdrop-blur-3xl shadow-[0_0_80px_-20px_rgba(245,158,11,0.2)] group hover:border-amber-500/30 transition-all duration-700">
            <div className="absolute inset-0 bg-amber-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative space-y-1">
                <Layers className="w-16 h-16 text-white relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
                <div className="flex justify-center">
                    <TrendingUp className="w-6 h-6 text-emerald-500 animate-pulse" />
                </div>
            </div>

            {/* Stage Indicators */}
            <div className="absolute -bottom-4 flex gap-1">
                <div className="w-8 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                <div className="w-8 h-1.5 rounded-full bg-amber-500" />
                <div className="w-8 h-1.5 rounded-full bg-white/10" />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-6 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3">
             <div className="h-px w-8 bg-amber-500/30" />
             <div className="flex items-center gap-2">
                <Zap className="w-3 h-3 text-amber-400" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em]">Revenue Velocity Core</span>
             </div>
             <div className="h-px w-8 bg-amber-500/30" />
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-none">
            Kinetic <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-emerald-500">Pipeline</span>
          </h2>
          
          <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-md mx-auto">
            Visualise deal progression and automate follow-ups with high-conversion neural pathways.
            <span className="block mt-6 flex items-center justify-center gap-3 text-white/40 font-black italic tracking-[0.2em] text-xs uppercase">
                Ready for Deployment <ArrowRight className="w-4 h-4 text-amber-500" /> Day 12
            </span>
          </p>
        </div>

        {/* Funnel Progress Simulation */}
        <div className="mt-16 relative w-64 mx-auto h-1 bg-white/5 rounded-full overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-amber-500 to-emerald-500 animate-[shimmer_2s_infinite]" />
        </div>
      </div>

      {/* Background Geometric Stream */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </div>
  );
}