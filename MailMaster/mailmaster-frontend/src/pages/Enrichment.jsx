import { Search, Database, UserPlus, Fingerprint, Sparkles, Crosshair } from 'lucide-react';

export default function Enrichment() {
  return (
    <div className="h-full min-h-[80vh] flex flex-col items-center justify-center bg-[#0F1115] relative overflow-hidden">
      
      {/* Background Intelligence Aura */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-500/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-pink-500/5 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 text-center px-6">
        {/* Synthetic Search Centerpiece */}
        <div className="relative inline-block mb-16">
          {/* Scanning Laser Effect */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-[pan-y_4s_linear_infinite] shadow-[0_0_15px_#60a5fa] z-20" />
          
          {/* Orbiting Data Nodes */}
          <div className="absolute -top-10 -right-10 p-3 bg-[#1a1d26] border border-white/10 rounded-2xl shadow-2xl animate-[bounce_3s_infinite]">
            <Database className="w-6 h-6 text-pink-400" />
          </div>
          <div className="absolute bottom-0 -left-12 p-3 bg-[#1a1d26] border border-white/10 rounded-2xl shadow-2xl animate-[bounce_4s_infinite_1s]">
            <Fingerprint className="w-6 h-6 text-blue-400" />
          </div>

          {/* Main Magnifier Container */}
          <div className="relative w-44 h-44 bg-gradient-to-br from-white/10 to-transparent border border-white/10 rounded-[3.5rem] flex items-center justify-center backdrop-blur-3xl shadow-[0_0_80px_-20px_rgba(59,130,246,0.3)] transition-all duration-700 hover:rotate-6 group">
            <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full group-hover:bg-blue-500/10 transition-colors" />
            <Search className="w-20 h-20 text-white relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
            
            {/* Crosshair corners */}
            <div className="absolute top-4 left-4 border-t-2 border-l-2 border-blue-500/40 w-4 h-4 rounded-tl" />
            <div className="absolute bottom-4 right-4 border-b-2 border-r-2 border-pink-500/40 w-4 h-4 rounded-br" />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-6 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3">
             <span className="h-px w-12 bg-gradient-to-r from-transparent to-blue-500/50" />
             <div className="flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-blue-400 animate-pulse" />
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.6em]">Deep Intelligence Tracking</span>
             </div>
             <span className="h-px w-12 bg-gradient-to-l from-transparent to-blue-500/50" />
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-none">
            Cognitive <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">Enrichment</span>
          </h2>
          
          <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-md mx-auto">
            Uncover hidden contact data, social profiles, and company insights using our proprietary AI synthesis.
            <span className="block mt-6 text-white/40 font-black italic tracking-widest text-xs uppercase">
                System Initialization: <span className="text-blue-500">Day 8</span>
            </span>
          </p>
        </div>

        {/* Technical Capabilities List */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-lg mx-auto">
            {['Social Linking', 'Tech Stacks', 'Real-time Validation'].map((feature) => (
                <div key={feature} className="px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center justify-center gap-2">
                    <Crosshair className="w-3 h-3 text-blue-500/50" />
                    {feature}
                </div>
            ))}
        </div>
      </div>

      {/* Hexagon Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill-rule='evenodd' stroke='%23fff' fill='none'/%3E%3C/svg%3E")`, backgroundSize: '60px 60px' }} />
    </div>
  );
}