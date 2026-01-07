import { Sparkles, Brain, Cpu, MessageSquare, Bot, Zap, ShieldCheck } from 'lucide-react';

export default function MailMasterAI() {
  return (
    <div className="h-full min-h-[80vh] flex flex-col items-center justify-center bg-[#0F1115] relative overflow-hidden">
      
      {/* Background Neural Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-pink-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 text-center px-6">
        {/* The AI Singularity Centerpiece */}
        <div className="relative inline-block mb-16">
          {/* Pulsing Neural Rings */}
          <div className="absolute inset-[-40px] border border-indigo-500/20 rounded-full animate-[ping_4s_linear_infinite]" />
          <div className="absolute inset-[-80px] border border-purple-500/10 rounded-full animate-[ping_6s_linear_infinite]" />
          
          {/* Orbiting Agentic Modules */}
          <div className="absolute -top-12 left-[-40px] p-3 bg-[#1a1d26] border border-white/10 rounded-2xl shadow-2xl animate-bounce">
            <Brain className="w-6 h-6 text-indigo-400" />
          </div>
          <div className="absolute top-1/2 -right-20 -translate-y-1/2 p-3 bg-[#1a1d26] border border-white/10 rounded-2xl shadow-2xl animate-[pulse_5s_infinite]">
            <Bot className="w-6 h-6 text-purple-400" />
          </div>
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 p-3 bg-[#1a1d26] border border-white/10 rounded-2xl shadow-2xl animate-pulse">
            <MessageSquare className="w-6 h-6 text-pink-400" />
          </div>

          {/* Main AI Core Vessel */}
          <div className="relative w-48 h-48 bg-[#161920] border border-white/10 rounded-[4rem] flex items-center justify-center backdrop-blur-3xl shadow-[0_0_100px_-20px_rgba(99,102,241,0.4)] group">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-[4rem] animate-pulse" />
            <Sparkles className="w-24 h-24 text-white relative z-10 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] animate-[pulse_2s_infinite]" />
            
            {/* Inner "Circuitry" Glitch effect */}
            <div className="absolute inset-8 border border-indigo-500/20 rounded-full animate-spin-slow opacity-50" />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-6 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-4">
             <div className="h-px w-12 bg-gradient-to-r from-transparent to-indigo-500/50" />
             <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-indigo-400 animate-spin-slow" />
                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.8em]">Neural Core Online</span>
             </div>
             <div className="h-px w-12 bg-gradient-to-l from-transparent to-indigo-500/50" />
          </div>
          
          <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase italic leading-none">
            Agentic <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 animate-gradient-x">Master</span>
          </h2>
          
          <p className="text-slate-400 text-xl font-medium leading-relaxed max-w-md mx-auto">
            Your autonomous mail assistant is learning your communication DNA for high-velocity outreach.
            <span className="block mt-8 text-white/40 font-black italic tracking-[0.3em] text-xs uppercase flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> Evolution Sequence: Day 14
            </span>
          </p>
        </div>

        {/* AI Processing Simulation */}
        <div className="mt-16 flex items-end justify-center gap-1.5 h-12">
            {[...Array(20)].map((_, i) => (
                <div 
                    key={i} 
                    className="w-1.5 bg-indigo-500/20 rounded-full animate-[pulse_var(--duration)_ease-in-out_infinite]"
                    style={{ 
                        height: `${Math.random() * 100}%`,
                        '--duration': `${1 + Math.random() * 2}s`
                    }}
                />
            ))}
        </div>
      </div>

      {/* Background Matrix/Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
    </div>
  );
}