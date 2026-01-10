import { X, Save, Sparkles, Wand2 } from 'lucide-react';


export default function PricingInterceptModal({ isOpen, onClose }) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-[#0F1115]/80 backdrop-blur-md transition-opacity" 
          onClick={onClose} 
        />
        
        {/* Modal Content */}
        <div className="relative bg-[#161920] border border-violet-500/30 p-10 rounded-[3rem] max-w-lg w-full text-center shadow-[0_0_50px_-10px_rgba(139,92,246,0.3)] animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 bg-violet-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-violet-500/20">
            <Sparkles className="w-10 h-10 text-violet-400" />
          </div>
          
          <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-4">
            Limit <span className="text-violet-400">Reached</span>
          </h3>
          
          <p className="text-slate-400 font-medium mb-8 leading-relaxed">
            You've reached the capacity of your Free Blueprint. Upgrade to Pro to unlock 20+ Neural Assets and Advanced AI generation.
          </p>
  
          <div className="space-y-4">
            <button className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 p-4 rounded-2xl font-black text-white uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-violet-600/20">
              Upgrade to Pro — $19/mo
            </button>
            <button 
              onClick={onClose} 
              className="text-slate-500 text-xs font-black uppercase tracking-widest hover:text-white transition-colors"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    );
  }

