import { Settings as SettingsIcon, Sliders, Shield, Bell, Key, Cpu, Zap } from 'lucide-react';

export default function Settings() {
  return (
    <div className="h-full min-h-[80vh] flex flex-col items-center justify-center bg-[#0F1115] relative overflow-hidden">
      
      {/* Background Engineering Aura */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-slate-500/5 blur-[140px] rounded-full" />
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full animate-pulse" />
      </div>

      <div className="relative z-10 text-center px-6">
        {/* The "Control Hub" Centerpiece */}
        <div className="relative inline-block mb-16">
          {/* Rotating Mechanical Rings */}
          <div className="absolute inset-[-20px] border-2 border-dashed border-slate-700/50 rounded-full animate-[spin_20s_linear_infinite]" />
          <div className="absolute inset-[-50px] border border-blue-500/10 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
          
          {/* Orbiting Config Modules */}
          <div className="absolute -top-10 -right-10 p-3 bg-[#1a1d26] border border-white/10 rounded-2xl shadow-2xl animate-bounce">
            <Shield className="w-5 h-5 text-blue-400" />
          </div>
          <div className="absolute top-1/2 -left-20 -translate-y-1/2 p-3 bg-[#1a1d26] border border-white/10 rounded-2xl shadow-2xl animate-[pulse_4s_infinite]">
            <Key className="w-5 h-5 text-slate-400" />
          </div>
          <div className="absolute -bottom-8 right-1/2 translate-x-1/2 p-2.5 bg-[#1a1d26] border border-white/10 rounded-xl shadow-2xl animate-pulse">
            <Bell className="w-4 h-4 text-blue-500/50" />
          </div>

          {/* Main Settings Vessel */}
          <div className="relative w-44 h-44 bg-[#161920] border border-white/10 rounded-[3rem] flex items-center justify-center backdrop-blur-3xl shadow-[0_0_80px_-20px_rgba(59,130,246,0.2)] group hover:border-blue-500/30 transition-all duration-700">
            <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <SettingsIcon className="w-20 h-20 text-white relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] animate-[spin_10s_linear_infinite]" />
            
            {/* Corner Bracket Accents */}
            <div className="absolute top-6 left-6 w-2 h-2 border-t border-l border-blue-500/50" />
            <div className="absolute bottom-6 right-6 w-2 h-2 border-b border-r border-blue-500/50" />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-6 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3">
             <div className="h-px w-8 bg-slate-800" />
             <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-blue-400" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em]">Architecture Preferences</span>
             </div>
             <div className="h-px w-8 bg-slate-800" />
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-none">
            Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 via-blue-400 to-slate-200">Protocol</span>
          </h2>
          
          <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-md mx-auto">
            Fine-tune your neural links, security uplinks, and interface parameters.
            <span className="block mt-6 flex items-center justify-center gap-3 text-white/40 font-black italic tracking-[0.2em] text-xs uppercase">
                Uplink Established <Zap className="w-3 h-3 text-blue-500" /> Day 5
            </span>
          </p>
        </div>

        {/* Parameter Sliders Simulation */}
        <div className="mt-12 flex flex-col gap-3 w-48 mx-auto">
            {[1, 2].map((i) => (
                <div key={i} className="h-1 w-full bg-white/5 rounded-full relative overflow-hidden">
                    <div 
                      className={`absolute top-0 left-0 h-full bg-blue-500/40 rounded-full ${i === 1 ? 'w-2/3' : 'w-1/3'}`} 
                    />
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_#fff]"
                      style={{ left: i === 1 ? '66%' : '33%' }}
                    />
                </div>
            ))}
        </div>
      </div>

      {/* Background Technical Schematic Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#smallGrid)" />
        </svg>
      </div>
    </div>
  );
}