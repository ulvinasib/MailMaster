import { useState, useEffect } from 'react';
import { Mail, Star, Archive, Trash2, RefreshCw, Search, MailOpen, Clock, Sparkles, Zap, AlertCircle, TrendingUp, ChevronRight, MoreVertical } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import toast from 'react-hot-toast';

export default function Inbox() {
  const { user } = useAuth();
  const [emails, setEmails] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('all');
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showResponseGenerator, setShowResponseGenerator] = useState(false);

  useEffect(() => {
    if (user) {
      fetchAccounts();
    }
  }, [user]);

  useEffect(() => {
    if (accounts.length > 0) {
      fetchEmails();
    }
  }, [selectedAccount, filter, categoryFilter, search, accounts.length]);

  const fetchAccounts = async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }
    try {
      const { data } = await api.get(`/auth/accounts/${user.id}`);
      setAccounts(data.accounts || []);
      if (data.accounts?.length > 0) {
        fetchEmails();
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error('Failed to fetch accounts:', error);
      setLoading(false);
    }
  };

  const fetchEmails = async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const params = {};
      if (selectedAccount !== 'all') params.accountId = selectedAccount;
      if (filter === 'unread') params.unread = 'true';
      if (categoryFilter !== 'all') params.category = categoryFilter;
      if (search) params.search = search;

      const { data } = await api.get('/emails/list', { params });
      const sortedEmails = (data.emails || []).sort((a, b) => (b.priority_score || 0) - (a.priority_score || 0));
      setEmails(sortedEmails);
    } catch (error) {
      console.error('Failed to fetch emails:', error);
      toast.error('Failed to load emails');
    } finally {
      setLoading(false);
    }
  };

  const syncEmails = async () => {
    if (accounts.length === 0) {
      toast.error('No accounts connected');
      return;
    }
    setSyncing(true);
    try {
      const accountToSync = selectedAccount !== 'all' ? accounts.find(a => a.id === selectedAccount) : accounts[0];
      const { data } = await api.post(`/emails/sync/${accountToSync.id}`);
      toast.success(`Synced ${data.count} emails`);
      setTimeout(() => fetchEmails(), 2000);
    } catch (error) {
      console.error('Sync failed:', error);
      toast.error('Sync failed');
    } finally {
      setSyncing(false);
    }
  };

  const markAsRead = async (emailId, isRead) => {
    try {
      await api.patch(`/emails/${emailId}/read`, { isRead });
      setEmails(emails.map(e => e.id === emailId ? { ...e, is_read: isRead } : e));
      if (selectedEmail?.id === emailId) {
        setSelectedEmail({ ...selectedEmail, is_read: isRead });
      }
    } catch (error) {
      toast.error('Failed to update email');
    }
  };

  const toggleStar = async (emailId, isStarred) => {
    try {
      await api.patch(`/emails/${emailId}/star`, { isStarred: !isStarred });
      setEmails(emails.map(e => e.id === emailId ? { ...e, is_starred: !isStarred } : e));
    } catch (error) {
      toast.error('Failed to star email');
    }
  };

  const archiveEmail = async (emailId) => {
    try {
      await api.patch(`/emails/${emailId}/archive`, { isArchived: true });
      setEmails(emails.filter(e => e.id !== emailId));
      setSelectedEmail(null);
      toast.success('Email archived');
    } catch (error) {
      toast.error('Failed to archive');
    }
  };

  const deleteEmail = async (emailId) => {
    if (!confirm('Delete this email?')) return;
    try {
      await api.delete(`/emails/${emailId}`);
      setEmails(emails.filter(e => e.id !== emailId));
      setSelectedEmail(null);
      toast.success('Email deleted');
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const now = new Date();
    const diff = now - d;
    if (diff < 86400000) return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    if (diff < 604800000) return d.toLocaleDateString('en-US', { weekday: 'short' });
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getPriorityColor = (score) => {
    if (!score) return 'from-slate-600 to-slate-700';
    if (score >= 8) return 'from-rose-500 to-red-600 shadow-[0_0_10px_rgba(244,63,94,0.4)]';
    if (score >= 6) return 'from-amber-500 to-orange-600';
    if (score >= 4) return 'from-yellow-400 to-amber-500';
    return 'from-emerald-500 to-teal-600';
  };

  const getCategoryBadge = (category) => {
    const badges = {
      important: { color: 'bg-rose-500/10 text-rose-400 border-rose-500/20', icon: AlertCircle },
      newsletter: { color: 'bg-sky-500/10 text-sky-400 border-sky-500/20', icon: Mail },
      sales: { color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', icon: TrendingUp },
      support: { color: 'bg-purple-500/10 text-purple-400 border-purple-500/20', icon: MailOpen },
      spam: { color: 'bg-slate-500/10 text-slate-400 border-slate-500/20', icon: Trash2 }
    };
    return badges[category] || badges.important;
  };

  if (!user) {
    return (
      <div className="h-full flex items-center justify-center bg-[#0F1115]">
        <RefreshCw className="w-12 h-12 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (accounts.length === 0 && !loading) {
    return (
      <div className="h-full flex items-center justify-center bg-[#0F1115]">
        <div className="text-center">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full" />
            <Mail className="w-24 h-24 text-slate-700 mx-auto relative z-10" />
          </div>
          <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter italic">No Uplinks Detected</h2>
          <p className="text-slate-500 mb-8 max-w-xs mx-auto">Connect your neural mail accounts to begin AI processing.</p>
          <button
            onClick={() => window.location.href = '/dashboard'}
            className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-500 transition shadow-[0_0_20px_rgba(79,70,229,0.4)]"
          >
            Connect Account
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-[#0F1115] text-slate-300">
      {/* Header */}
      <div className="bg-[#161920]/80 backdrop-blur-xl border-b border-white/5 px-8 py-6 sticky top-0 z-20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">Communications</h1>
            <div className="flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Neural Sync active</span>
            </div>
          </div>
          <button
            onClick={syncEmails}
            disabled={syncing}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-5 py-2.5 rounded-xl font-bold transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 text-indigo-400 ${syncing ? 'animate-spin' : ''}`} />
            <span className="text-sm uppercase tracking-wider">{syncing ? 'Processing...' : 'Sync Node'}</span>
          </button>
        </div>

        {/* Tactical Filters */}
        <div className="flex items-center gap-4 flex-wrap">
          <select
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs font-bold text-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="all" className="bg-[#161920]">All Linked Nodes</option>
            {accounts.map(account => (
              <option key={account.id} value={account.id} className="bg-[#161920]">
                {account.email}
              </option>
            ))}
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs font-bold text-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="all" className="bg-[#161920]">Global Context</option>
            <option value="important" className="bg-[#161920]">Critical Priority</option>
            <option value="newsletter" className="bg-[#161920]">Directives</option>
            <option value="sales" className="bg-[#161920]">Revenue Streams</option>
            <option value="support" className="bg-[#161920]">Client Sync</option>
          </select>

          <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1">
            {['all', 'unread'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${filter === f
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'text-slate-500 hover:text-slate-300'
                  }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Query neural database..."
              className="w-full pl-11 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-medium text-white placeholder:text-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="flex-1 flex overflow-hidden">
        {/* Email Sidebar List */}
        <div className="w-[450px] border-r border-white/5 bg-[#161920]/30 overflow-y-auto custom-scrollbar">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
              <RefreshCw className="w-10 h-10 animate-spin text-indigo-500" />
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">Decoding Streams...</p>
            </div>
          ) : emails.length === 0 ? (
            <div className="text-center py-32 px-12">
              <Mail className="w-16 h-16 text-slate-800 mx-auto mb-6" />
              <p className="text-slate-500 font-bold">No active transmissions.</p>
              <button onClick={syncEmails} className="mt-4 text-indigo-400 text-xs font-black uppercase hover:text-indigo-300 transition tracking-widest">Initial Sync</button>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {emails.map(email => {
                const badge = getCategoryBadge(email.category);
                const CategoryIcon = badge.icon;
                const isSelected = selectedEmail?.id === email.id;

                return (
                  <button
                    key={email.id}
                    onClick={() => {
                      setSelectedEmail(email);
                      if (!email.is_read) markAsRead(email.id, true);
                    }}
                    className={`w-full text-left p-6 transition-all relative group overflow-hidden ${isSelected ? 'bg-indigo-600/10' : 'hover:bg-white/[0.02]'
                      } ${!email.is_read ? 'before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-indigo-500' : ''}`}
                  >
                    {/* Active Accent Layer */}
                    {isSelected && (
                      <div className="absolute right-0 top-0 bottom-0 w-1 bg-indigo-500 shadow-[0_0_15px_#6366f1]" />
                    )}

                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {email.priority_score && (
                          <div className={`flex-shrink-0 w-8 h-8 bg-gradient-to-br ${getPriorityColor(email.priority_score)} rounded-xl flex items-center justify-center text-white text-[11px] font-black`}>
                            {email.priority_score}
                          </div>
                        )}
                        <span className={`font-black text-xs uppercase tracking-tight truncate ${!email.is_read ? 'text-white' : 'text-slate-400'}`}>
                          {email.from_name || email.from_email}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-600 ml-2 whitespace-nowrap">{formatDate(email.received_at)}</span>
                    </div>

                    <h3 className={`text-sm mb-2 line-clamp-1 ${!email.is_read ? 'font-bold text-slate-100' : 'text-slate-500'}`}>
                      {email.subject}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed italic">
                      {email.ai_summary || email.body_text}
                    </p>

                    <div className="flex items-center gap-2 flex-wrap">
                      {!email.is_read && <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />}
                      {email.is_starred && <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />}
                      {email.category && (
                        <span className={`px-2 py-0.5 text-[9px] rounded-md font-black uppercase tracking-widest border ${badge.color} flex items-center gap-1.5`}>
                          <CategoryIcon className="w-3 h-3" />
                          {email.category}
                        </span>
                      )}
                      {email.needs_response && (
                        <span className="px-2 py-0.5 text-[9px] rounded-md font-black uppercase tracking-widest bg-orange-500/10 text-orange-400 border border-orange-500/20 flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          Pending Action
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Email Preview Panel */}
        <div className="flex-1 bg-[#0F1115] overflow-y-auto relative custom-scrollbar">
          {selectedEmail ? (
            <div className="max-w-4xl mx-auto p-12">
              {/* Tactical Toolbar */}
              <div className="flex items-center justify-between mb-12 bg-white/[0.02] border border-white/5 p-3 rounded-2xl backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center gap-1">
                  {[
                    { icon: Star, color: selectedEmail.is_starred ? 'text-amber-400' : 'text-slate-500', action: () => toggleStar(selectedEmail.id, selectedEmail.is_starred) },
                    { icon: MailOpen, color: 'text-slate-500', action: () => markAsRead(selectedEmail.id, !selectedEmail.is_read) },
                    { icon: Archive, color: 'text-slate-500', action: () => archiveEmail(selectedEmail.id) },
                    { icon: Trash2, color: 'hover:text-rose-500 text-slate-500', action: () => deleteEmail(selectedEmail.id) }
                  ].map((btn, idx) => (
                    <button key={idx} onClick={btn.action} className={`p-2.5 hover:bg-white/5 rounded-xl transition-all ${btn.color}`}>
                      <btn.icon className="w-5 h-5" />
                    </button>
                  ))}
                </div>

                {selectedEmail.needs_response && (
                  <button
                    onClick={() => setShowResponseGenerator(!showResponseGenerator)}
                    className="flex items-center gap-2.5 px-6 py-2.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] transition shadow-[0_0_30px_rgba(99,102,241,0.3)]"
                  >
                    <Sparkles className="w-4 h-4" />
                    Synthesize Reply
                  </button>
                )}
              </div>

              {/* AI Insight Glass Card */}
              {(selectedEmail.priority_score || selectedEmail.category || selectedEmail.ai_summary) && (
                <div className="relative group mb-12">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
                  <div className="relative bg-[#161920] border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden">
                    {/* Decorative lines */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[60px] rounded-full" />

                    <div className="flex items-center gap-3 mb-8">
                      <Sparkles className="w-6 h-6 text-indigo-400" />
                      <span className="font-black text-white uppercase tracking-[0.3em] text-[11px]">Neural Intelligence Scan</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                      {selectedEmail.priority_score && (
                        <div className="space-y-3">
                          <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Calculated Urgency</div>
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 bg-gradient-to-br ${getPriorityColor(selectedEmail.priority_score)} rounded-2xl flex items-center justify-center text-white font-black text-lg`}>
                              {selectedEmail.priority_score}
                            </div>
                            <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">
                              {selectedEmail.priority_score >= 8 ? 'Redline' : 'Medium Tier'}
                            </span>
                          </div>
                        </div>
                      )}
                      {selectedEmail.category && (
                        <div className="space-y-3">
                          <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Category ID</div>
                          <div className="pt-2">
                            <span className={`px-4 py-2 text-xs rounded-xl font-black uppercase tracking-widest border ${getCategoryBadge(selectedEmail.category).color}`}>
                              {selectedEmail.category}
                            </span>
                          </div>
                        </div>
                      )}
                      {selectedEmail.needs_response !== null && (
                        <div className="space-y-3">
                          <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Logic Flow</div>
                          <div className="pt-2">
                            <span className={`px-4 py-2 text-xs rounded-xl font-black uppercase tracking-widest ${selectedEmail.needs_response ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>
                              {selectedEmail.needs_response ? 'Action Required' : 'Passive Read'}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    {selectedEmail.ai_summary && (
                      <div className="mt-10 pt-8 border-t border-white/5">
                        <div className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-3">TL;DR Executive Summary</div>
                        <p className="text-sm text-slate-400 leading-relaxed italic font-medium">"{selectedEmail.ai_summary}"</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* AI Response Generator Overlay */}
              {showResponseGenerator && <ResponseGenerator email={selectedEmail} onClose={() => setShowResponseGenerator(false)} />}

              {/* Actual Email Render */}
              <div className="space-y-10">
                <div>
                  <h1 className="text-4xl font-black text-white tracking-tighter mb-8 leading-tight">
                    {selectedEmail.subject}
                  </h1>
                  <div className="flex items-center gap-4 bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center font-black text-white shadow-lg">
                      {(selectedEmail.from_name || selectedEmail.from_email).charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-black text-white truncate">{selectedEmail.from_name || selectedEmail.from_email}</div>
                      <div className="text-xs text-slate-500 truncate mt-1">{selectedEmail.from_email}</div>
                    </div>
                    <div className="text-[10px] font-bold text-slate-600 flex items-center gap-1.5 uppercase tracking-tighter">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(selectedEmail.received_at).toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed font-medium">
                  {selectedEmail.body_html ? (
                    <div className="bg-transparent border-0" dangerouslySetInnerHTML={{ __html: selectedEmail.body_html }} />
                  ) : (
                    <div className="whitespace-pre-wrap">
                      {selectedEmail.body_text}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center opacity-40 grayscale">
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-500/20 blur-[100px] rounded-full" />
                <Mail className="w-24 h-24 text-slate-800 mb-6 relative z-10" />
              </div>
              <p className="text-[11px] font-black text-slate-600 uppercase tracking-[0.5em]">Awaiting Uplink Selection</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ResponseGenerator({ email, onClose }) {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [tone, setTone] = useState('professional');
  const [response, setResponse] = useState('');
  const [generating, setGenerating] = useState(false);
  const [context, setContext] = useState('');


  //fetching templates

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const { data } = await api.get("/api/templates")
        setTemplates(data)
      } catch (error) {
        console.error('Failed to fetch templates:', error);
      }
    }
    fetchTemplates()
  }, [])

  const generateResponse = async () => {

    if (!selectedTemplate) {
      toast.error('Please select a template');
      return;
    }
    setGenerating(true);
    try {
      const { data } = await api.post('/ai/generate-from-blueprint',
        {
          emailId: email.id,
          templateId: selectedTemplate.id,
          context: context,
        });
      setResponse(data.response);
      toast.success('Neural Draft Deployed!');
    } catch (error) {
      console.error('Generation error:', error);
      toast.error('AI Processing failed');
    } finally {
      setGenerating(false);
    }
  };


  const transmitReply = async () => {
    if (!response) return;

    const loadId = toast.loading('Initiating Gmail Transmission...');
    try {
      await api.post('/emails/send', {
        to: email.from_email,
        subject: `Re: ${email.subject}`,
        body: response, // The AI-synthesized draft
        accountId: email.account_id,
        provider: 'gmail' // Explicitly targeting your working service
      });

      toast.success('Reply Transmitted!', { id: loadId });
      onClose(); // Close the AI Synthesis Engine after success

      // Optional: Refresh the inbox to show the email as "replied"
      // fetchEmails(); 
    } catch (error) {
      console.error('Transmission Error:', error);
      toast.error('Failed to transmit via Gmail', { id: loadId });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(response);
    toast.success('Copied to clipboard!');
  };

  return (
    <div className="relative group mb-12">
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-[2.5rem] blur opacity-25"></div>
      <div className="relative bg-[#1a1d2e] border border-purple-500/30 rounded-[2rem] p-8 shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <h3 className="text-xl font-black text-white uppercase tracking-tighter italic">AI Synthesis Engine</h3>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-8">
          <div>
            {/* Changed label to Neural Blueprint */}
            <label className="block text-[10px] font-black text-purple-400 uppercase tracking-[0.3em] mb-4">Neural Blueprint</label>
            <div className="flex gap-3 flex-wrap">
              {/* 🟢 DYNAMIC BLUEPRINT BUTTONS */}
              {templates.length > 0 ? (
                templates.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTemplate(t)}
                    className={`px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${selectedTemplate?.id === t.id
                      ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                      : 'bg-white/5 text-slate-500 border border-white/10 hover:border-purple-500/40'
                      }`}
                  >
                    {t.name}
                  </button>
                ))
              ) : (
                <span className="text-[10px] text-slate-600 italic">No blueprints found. Create one in the Assets tab.</span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-purple-400 uppercase tracking-[0.3em] mb-4">Objective Override</label>
            <input
              type="text"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Inject specific facts or commands..."
              className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm font-medium text-white placeholder:text-slate-700 outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>

          <button
            onClick={generateResponse}
            disabled={generating || !selectedTemplate}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:scale-[1.01] transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {generating ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <Zap className="w-5 h-5 fill-white" />
            )}
            {generating ? 'Processing Logic...' : 'Execute Synthesis'}
          </button>

          {response && (
            <div className="space-y-4 pt-4 border-t border-white/5 animate-in fade-in slide-in-from-top-4 duration-500">
              <textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-2xl p-6 min-h-[200px] text-sm leading-relaxed text-slate-300 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
              />
              <div className="flex gap-4">
                <button
                  onClick={copyToClipboard}
                  className="flex-1 bg-white/5 border border-white/10 text-white py-3.5 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-white/10 transition"
                >
                  Copy to Buffer
                </button>
                <button 
                className="flex-1 bg-emerald-600 text-white py-3.5 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-emerald-500 transition shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                onClick={transmitReply}
                >
                  Transmit Reply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}