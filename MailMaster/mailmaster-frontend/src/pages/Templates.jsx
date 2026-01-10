import { useEffect, useState } from 'react';
import { X, Save, Sparkles, } from 'lucide-react';
import { FileText, Plus, Loader2 } from 'lucide-react';
import api from '../services/api';
import PricingInterceptModal from '../components/PricingInterceptModal';
import { Trash2 } from 'lucide-react';

export default function Templates() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const PLAN_LIMIT = 3;


  //Function to delete the temp;ate
  const handleDelete = async(id) =>{
    if(!window.confirm("Are you sure you want to delete this blueprint?")) return;
    try {
      await api.delete(`/api/templates/${id}`);
      setTemplates(prev => prev.filter(t => t.id !== id));
      console.log("🚀 Neural Asset Deleted Successfully");
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Neural Synthesis Error: Could not delete template.");
    }
  }

  //Bouncer function to check the plan limit
  const handleAttemptCreate = () => {
    if (templates.length >= PLAN_LIMIT) {
      setShowPricingModal(true);
      setIsPanelOpen(false);
    } else {
      setIsPanelOpen(true);
    }
  }

  // 1. Fetch the Neural Assets
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const { data } = await api.get('/api/templates');
        setTemplates(data);
      } catch (err) {
        console.error("Neural Sync Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  //  SAVE HANDLER
  const handleSave = async (newTemplateData) => {
    try {
      const { data } = await api.post('/api/templates', newTemplateData);
      setTemplates(prev => [data, ...prev]);
      console.log("🚀 Neural Asset Deployed Successfully");
      setIsPanelOpen(false);
    } catch (err) {
      console.error("Save failed:", err);
      alert("Neural Synthesis Error: Could not save template.");
    }
  };

  return (
    <div className="h-full min-h-[80vh] flex flex-col items-center justify-start bg-[#0F1115] relative overflow-hidden pt-20">

      {/* Background Creative Aura (Keep your existing code) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-violet-500/5 blur-[140px] rounded-full animate-pulse" />
      </div>

      {/* Header Section: We scale this down if data exists */}
      <div className={`relative z-10 text-center px-6 transition-all duration-1000 ${templates.length > 0 ? 'scale-90 mb-10' : 'mb-16'}`}>

        {/* Your Main Template Vessel (The Copyleft Icon logic) */}
        <div className="relative inline-block mb-10">
          {/* ... existing Vessel code ... */}
        </div>

        {/* Text Content */}
        <div className="space-y-4 max-w-2xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase italic leading-none">
            Neural <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-500 to-fuchsia-500">Assets</span>
          </h2>
          {templates.length === 0 && (
            <p className="text-slate-400 text-lg font-medium max-w-md mx-auto animate-in fade-in duration-1000">
              No blueprints deployed. Initialize your first growth architecture.
            </p>
          )}
        </div>
      </div>

      {/* 2. THE DYNAMIC GRID AREA */}
      <div className="relative z-10 w-full max-w-7xl px-6 pb-20">
        {loading ? (
          <div className="flex justify-center"><Loader2 className="w-8 h-8 text-violet-500 animate-spin" /></div>
        ) : templates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <TemplateCard key={template.id} template={template} handleDelete={handleDelete} />
            ))}
            {/* The "Add New" Card */}
            <button className="border-2 border-dashed border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center p-10 hover:bg-white/[0.02] hover:border-violet-500/40 transition-all group" onClick={handleAttemptCreate}>
              <Plus className="w-10 h-10 text-slate-500 group-hover:text-violet-400 mb-4 transition-colors" />
              <span className="text-slate-500 font-black uppercase text-xs tracking-widest">New Blueprint</span>
            </button>

            <div className="mt-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">
              {templates.length} / 3 Blueprints Deployed
              {templates.length >= 3 && (
                <span className="block text-violet-400 mt-1 cursor-pointer hover:underline">
                  Upgrade to Pro for unlimited assets
                </span>
              )}
            </div>
          </div>
        ) : (
          /* Show your original "Template Slots Preview" boxes as placeholders if empty */
          <div className="flex justify-center gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-12 w-16 rounded-xl border border-dashed border-white/10 bg-white/[0.02] flex items-center justify-center">
                <div className="w-6 h-1 bg-white/5 rounded-full" />
              </div>
            ))}
          </div>
        )}
      </div>

      <CreateTemplatePanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        onSave={handleSave}
      />
      <PricingInterceptModal
        isOpen={showPricingModal}
        onClose={() => setShowPricingModal(false)}
      />

      {/* Blueprint Grid Overlay (Keep your existing code) */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />
    </div>
  );
}

// 3. THE ASSET CARD COMPONENT
function TemplateCard({ template, handleDelete }) {
  return (
    <div className="group relative bg-[#161920]/60 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-xl hover:border-violet-500/50 hover:shadow-[0_0_40px_-10px_rgba(139,92,246,0.2)] transition-all duration-500">
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 bg-violet-500/10 rounded-2xl">
          <FileText className="w-6 h-6 text-violet-400" />
        </div>

        {/*Delete button*/}
        <button
          onClick={() => handleDelete(template.id)}
          className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-500/10 rounded-xl text-slate-500 hover:text-red-400 transition-all duration-300"
        >
          <Trash2 className="w-5 h-5" />
        </button>


        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-3 py-1 bg-white/5 rounded-full">
          {template.category || 'General'}
        </span>
      </div>

      <h3 className="text-2xl font-black text-white mb-3 group-hover:text-violet-400 transition-colors uppercase italic italic">
        {template.name}
      </h3>

      <p className="text-slate-400 text-sm font-medium line-clamp-2 mb-8 leading-relaxed">
        {template.content}
      </p>

      {/* Tags Visualization */}
      <div className="flex flex-wrap gap-2">
        {template.tags_detected?.map(tag => (
          <div key={tag} className="flex items-center gap-1.5 px-3 py-1 bg-violet-500/5 border border-violet-500/20 rounded-lg">
            <Sparkles className="w-2.5 h-2.5 text-violet-400" />
            <span className="text-[9px] font-bold text-violet-300 uppercase tracking-tighter">
              {tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}


function CreateTemplatePanel({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    content: "",
    category: "General"

  })
  const [liveTags, setLiveTags] = useState([]);

  //Live tag extraction logic

  useEffect(() => {
    const regex = /{{(.*?)}}/g;
    const matches = [...formData.content.matchAll(regex)].map(m => m[1].trim());
    setLiveTags([...new Set(matches)])
  }, [formData.content])


  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave(formData);
    onClose();
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity" onClick={onClose} />}

      {/* Side Panel */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#161920]/90 backdrop-blur-3xl border-l border-white/10 z-50 transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        <div className="p-8 h-full flex flex-col">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">New <span className="text-violet-400">Blueprint</span></h3>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 flex-1 overflow-y-auto pr-2">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Asset Name</label>
              <input
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-violet-500/50 transition-all"
                placeholder="e.g. Executive Outreach"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Subject Line</label>
              <input
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-violet-500/50"
                placeholder="Meeting request: {{company_name}}"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Neural Content (Use {"{{variable}}"})</label>
              <textarea
                required
                rows={8}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-violet-500/50 resize-none font-mono text-sm"
                placeholder="Hi {{name}}, I noticed your work at {{company}}..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              />
            </div>

            {/* Live Tag Visualization */}
            {liveTags.length > 0 && (
              <div className="p-4 bg-violet-500/5 border border-violet-500/20 rounded-2xl animate-in zoom-in-95 duration-300">
                <p className="text-[9px] font-black text-violet-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Sparkles className="w-3 h-3" /> Detected Variables
                </p>
                <div className="flex flex-wrap gap-2">
                  {liveTags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-violet-500/10 text-violet-300 text-[10px] font-bold rounded-lg border border-violet-500/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </form>

          <button
            onClick={handleSubmit}
            className="mt-8 w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 p-4 rounded-2xl font-black text-white uppercase tracking-widest flex items-center justify-center gap-3 hover:opacity-90 transition-opacity"
          >
            <Save className="w-5 h-5" /> Deploy Asset
          </button>
        </div>
      </div>
    </>
  );
}

