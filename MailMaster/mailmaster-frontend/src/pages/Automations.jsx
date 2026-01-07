import { Zap, Activity, Cpu, GitMerge, ArrowRight } from 'lucide-react';

export default function Automations() {
  return (
    <div className="h-full min-h-[80vh] flex flex-col items-center justify-center bg-[#0F1115] relative overflow-hidden">
      
      {/* Background Kinetic Energy */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Glow behind the main icon */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-500/5 blur-[120px] rounded-full" />
        {/* Floating "Data Particles" */}
        <div className="absolute top-20 left-1/4 w-1 h-20 bg-gradient-to-b from-transparent via-yellow-500/20 to-transparent animate-[pulse_3s_infinite]" />
        <div className="absolute bottom-20 right-1/4 w-1 h-20 bg-gradient-to-b from-transparent via-indigo-500/20 to-transparent animate-[pulse_4s_infinite]" />
      </div>

      <div className="relative z-10 text-center px-6">
        {/* The "Power Core" Centerpiece */}
        <div className="relative inline-block mb-12">
          {/* Animated Logic Lines */}
          <div className="absolute -inset-10 border border-white/5 rounded-[3rem] animate-[pulse_4s_ease-in-out_infinite]" />
          <div className="absolute -inset-20 border border-white/[0.02] rounded-[4rem] animate-[pulse_6s_ease-in-out_infinite]" />
          
          {/* Main Zap Icon with Electric Glow */}
          <div className="relative w-36 h-36 bg-[#161920] border border-yellow-500/20 rounded-[2.5rem] flex items-center justify-center shadow-[0_0_50px_-12px_rgba(234,179,8,0.3)] backdrop-blur-3xl transition-transform hover:scale-105 duration-700 group">
            <div className="absolute inset-0 bg-yellow-500/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <Zap className="w-16 h-16 text-yellow-400 fill-yellow-400/10 relative z-10 animate-[bounce_3s_infinite]" />
          </div>

          {/* Logic Node Tags */}
          <div className="absolute -top-6 -left-12 flex items-center gap-2 bg-[#1a1d26] border border-white/10 px-3 py-1.5 rounded-full shadow-2xl animate-[bounce_4s_infinite]">
            <Cpu className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Logic Engine</span>
          </div>
          
          <div className="absolute -bottom-4 -right-12 flex items-center gap-2 bg-[#1a1d26] border border-white/10 px-3 py-1.5 rounded-full shadow-2xl animate-[bounce_5s_infinite_1s]">
            <GitMerge className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Workflow Sync</span>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-6 max-w-xl mx-auto">
          <div className="flex items-center justify-center gap-3">
             <div className="h-px w-8 bg-gradient-to-r from-transparent to-yellow-500/50" />
             <span className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.4em]">Autonomous Systems</span>
             <div className="h-px w-8 bg-gradient-to-l from-transparent to-yellow-500/50" />
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter italic uppercase">
            Hyper <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-600">Flows</span>
          </h2>
          
          <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-md mx-auto">
            We are engineering the friction-less future of your inbox. 
            <span className="block mt-2 text-yellow-500/60 font-black italic tracking-widest text-sm uppercase">Deploying: Day 4</span>
          </p>

          {/* Action Teaser */}
          <div className="pt-8">
            <button className="group flex items-center gap-3 mx-auto bg-white/5 border border-white/10 px-6 py-3 rounded-2xl text-slate-400 font-bold hover:bg-white/10 hover:text-white transition-all">
              <Activity className="w-4 h-4 text-yellow-500 animate-pulse" />
              <span>Preview Roadmap</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Background Technical Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
    </div>
  );
}