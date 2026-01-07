import { Copyleft, LayoutTemplate, FileText, Sparkles, Wand2 } from 'lucide-react';

export default function Templates() {
  return (
    <div className="h-full min-h-[80vh] flex flex-col items-center justify-center bg-[#0F1115] relative overflow-hidden">
      
      {/* Background Creative Aura */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-violet-500/5 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-fuchsia-500/5 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 text-center px-6">
        {/* Modular Centerpiece */}
        <div className="relative inline-block mb-16">
          {/* Blueprint Grid Frame */}
          <div className="absolute inset-[-40px] border border-dashed border-violet-500/20 rounded-[4rem] animate-[spin_30s_linear_infinite]" />
          
          {/* Orbiting Component Widgets */}
          <div className="absolute -top-10 left-[-30px] p-3 bg-[#1a1d26] border border-white/10 rounded-2xl shadow-2xl animate-bounce">
            <FileText className="w-5 h-5 text-violet-400" />
          </div>
          <div className="absolute top-1/2 -right-16 -translate-y-1/2 p-3 bg-[#1a1d26] border border-white/10 rounded-2xl shadow-2xl animate-[pulse_4s_infinite]">
            <Wand2 className="w-5 h-5 text-fuchsia-400" />
          </div>

          {/* Main Template Vessel (Stacked Effect) */}
          <div className="relative w-44 h-44 group">
            {/* Background stack layers */}
            <div className="absolute inset-0 bg-violet-600/20 border border-violet-500/30 rounded-[3rem] translate-x-4 translate-y-4 -z-10 transition-transform group-hover:translate-x-6 group-hover:translate-y-6" />
            <div className="absolute inset-0 bg-fuchsia-600/10 border border-fuchsia-500/20 rounded-[3rem] translate-x-2 translate-y-2 -z-10 transition-transform group-hover:translate-x-3 group-hover:translate-y-3" />
            
            {/* Front Glass Layer */}
            <div className="relative w-full h-full bg-[#161920]/80 border border-white/10 rounded-[3rem] flex items-center justify-center backdrop-blur-3xl shadow-[0_0_80px_-20px_rgba(139,92,246,0.3)]">
              <Copyleft className="w-20 h-20 text-white relative z-10 drop-shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-transform group-hover:scale-110 duration-500" />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-6 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3">
             <div className="h-px w-10 bg-violet-500/30" />
             <div className="flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-violet-400 animate-pulse" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em]">Creative Logic Library</span>
             </div>
             <div className="h-px w-10 bg-violet-500/30" />
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-none">
            Neural <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-500 to-fuchsia-500">Assets</span>
          </h2>
          
          <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-md mx-auto">
            Deploy hyper-personalized email architectures from a library of pre-validated growth blueprints.
            <span className="block mt-6 flex items-center justify-center gap-3 text-white/40 font-black italic tracking-[0.2em] text-xs uppercase">
                System Synthesis <span className="text-violet-500 animate-pulse">•</span> Day 10
            </span>
          </p>
        </div>

        {/* Template Slots Preview */}
        <div className="mt-12 flex justify-center gap-4">
            {[1, 2, 3, 4].map((i) => (
                <div 
                    key={i} 
                    className={`h-12 w-16 rounded-xl border border-dashed border-white/10 bg-white/[0.02] flex items-center justify-center ${i === 1 ? 'border-violet-500/40 bg-violet-500/5' : ''}`}
                >
                    <div className="w-6 h-1 bg-white/5 rounded-full" />
                </div>
            ))}
        </div>
      </div>

      {/* Blueprint Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />
    </div>
  );
}