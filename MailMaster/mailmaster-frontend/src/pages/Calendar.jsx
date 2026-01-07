import { Calendar as CalendarIcon, Clock, Bell, Sun, Sparkles, Layers } from 'lucide-react';

export default function Calendar() {
  return (
    <div className="h-full min-h-[80vh] flex flex-col items-center justify-center bg-[#0F1115] relative overflow-hidden">
      
      {/* Background Time-Warp Aura */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/5 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 text-center px-6">
        {/* Chrono-Centerpiece */}
        <div className="relative inline-block mb-16">
          {/* Rotating Seconds Ring */}
          <div className="absolute inset-[-30px] border border-white/5 rounded-full animate-[spin_20s_linear_infinite]" />
          <div className="absolute inset-[-60px] border border-dashed border-cyan-500/10 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
          
          {/* Orbiting Time Widgets */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 p-2.5 bg-[#1a1d26] border border-white/10 rounded-xl shadow-2xl animate-bounce">
            <Clock className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="absolute top-1/2 -right-16 -translate-y-1/2 p-2.5 bg-[#1a1d26] border border-white/10 rounded-xl shadow-2xl animate-[pulse_3s_infinite]">
            <Bell className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="absolute bottom-[-20px] left-[-20px] p-2.5 bg-[#1a1d26] border border-white/10 rounded-xl shadow-2xl animate-pulse">
            <Sun className="w-5 h-5 text-yellow-500/50" />
          </div>

          {/* Main Calendar Vessel */}
          <div className="relative w-44 h-44 bg-white/[0.02] border border-white/10 rounded-[3rem] flex items-center justify-center backdrop-blur-3xl shadow-[0_0_80px_-20px_rgba(34,211,238,0.2)] group hover:scale-105 transition-all duration-700">
            <div className="absolute inset-0 bg-cyan-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <CalendarIcon className="w-20 h-20 text-white relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
            
            {/* Inner Glass Cards Preview */}
            <div className="absolute top-3 right-3 w-12 h-14 bg-white/5 rounded-lg border border-white/10 rotate-12 -z-10 group-hover:rotate-45 transition-transform" />
            <div className="absolute top-3 right-3 w-12 h-14 bg-white/5 rounded-lg border border-white/10 -rotate-12 -z-20" />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-6 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3">
             <div className="h-px w-10 bg-white/10" />
             <div className="flex items-center gap-2">
                <Layers className="w-3 h-3 text-cyan-400" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.6em]">Temporal Synchronization</span>
             </div>
             <div className="h-px w-10 bg-white/10" />
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-none">
            Quantum <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-blue-500">Scheduler</span>
          </h2>
          
          <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-md mx-auto">
            Orchestrate your meetings and AI-driven follow-ups through a unified chronological interface.
            <span className="block mt-6 flex items-center justify-center gap-2 text-white/40 font-black italic tracking-[0.2em] text-xs uppercase">
                Initialization <Sparkles className="w-3 h-3 text-cyan-500" /> Day 9
            </span>
          </p>
        </div>

        {/* Timeline Indicator */}
        <div className="mt-12 flex items-center justify-center gap-1">
            {[...Array(12)].map((_, i) => (
                <div 
                    key={i} 
                    className={`h-4 w-1 rounded-full ${i === 8 ? 'bg-cyan-500 shadow-[0_0_10px_#22d3ee]' : 'bg-white/5'}`} 
                />
            ))}
        </div>
      </div>

      {/* Background Vertical Time-Lines */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none overflow-hidden">
        <div className="flex justify-around w-full h-full">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="w-px h-full bg-gradient-to-b from-transparent via-white to-transparent" />
            ))}
        </div>
      </div>
    </div>
  );
}