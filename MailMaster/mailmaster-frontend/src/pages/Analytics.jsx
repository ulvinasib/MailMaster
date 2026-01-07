import { BarChart3, ShieldAlert, Cpu, Sparkles } from 'lucide-react';

export default function Analytics() {
  return (
    <div className="h-full min-h-[80vh] flex flex-col items-center justify-center bg-[#0F1115] relative overflow-hidden">
      
      {/* Dynamic Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] bg-purple-500/5 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 text-center px-6">
        {/* Animated Icon Container */}
        <div className="relative inline-block mb-12">
          {/* Rotating Outer Rings */}
          <div className="absolute inset-0 border-2 border-dashed border-indigo-500/20 rounded-full animate-[spin_10s_linear_infinite]" />
          <div className="absolute inset-[-20px] border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
          
          {/* Main Icon with Glow */}
          <div className="relative w-32 h-32 bg-white/[0.03] border border-white/10 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-xl">
            <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full opacity-50" />
            <BarChart3 className="w-12 h-12 text-indigo-400 relative z-10" />
          </div>

          {/* Floating Orbiting Nodes */}
          <div className="absolute top-0 -right-2 w-8 h-8 bg-[#161920] border border-white/10 rounded-lg flex items-center justify-center animate-bounce shadow-xl">
            <Cpu className="w-4 h-4 text-purple-400" />
          </div>
          <div className="absolute bottom-4 -left-6 w-10 h-10 bg-[#161920] border border-white/10 rounded-xl flex items-center justify-center animate-pulse shadow-xl delay-700">
            <Sparkles className="w-5 h-5 text-indigo-400" />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4 max-w-lg mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
            <ShieldAlert className="w-3 h-3" /> System Initializing
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter italic">
            Neural <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent underline decoration-indigo-500/30">Analytics</span>
          </h2>
          
          <p className="text-slate-500 text-lg font-medium leading-relaxed">
            Constructing advanced data visualization modules. 
            <br />
            <span className="text-indigo-400/60 font-black italic">Target Completion: Day 5</span>
          </p>
        </div>

        {/* Pseudo Loading Bar */}
        <div className="mt-12 w-64 mx-auto space-y-2">
            <div className="flex justify-between text-[10px] font-black text-slate-600 uppercase tracking-widest">
                <span>Core Linkage</span>
                <span>65%</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 w-[65%] rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
            </div>
        </div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
    </div>
  );
}