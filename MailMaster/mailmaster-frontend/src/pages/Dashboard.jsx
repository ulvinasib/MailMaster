// import { useState, useEffect } from 'react';
// import { Mail, Plus, Loader as LoaderIcon, Check, RefreshCw, TrendingUp, Clock, Zap } from 'lucide-react';
// import { useAuth } from '../hooks/useAuth';
// import api from '../services/api';
// import toast from 'react-hot-toast';
// import axios from 'axios';


// export default function Dashboard() {
//   const { user } = useAuth();
//   const [accounts, setAccounts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [connecting, setConnecting] = useState(null);
//   const [syncing, setSyncing] = useState(false);

//   useEffect(() => {
//     console.log('Dashboard mounted, user:', user);

//     if (user) {
//       fetchAccounts();
//     }

//     checkOAuthCallback();
//   }, [user]);

//   const checkOAuthCallback = () => {
//     const params = new URLSearchParams(window.location.search);
//     const connected = params.get('connected');
//     const error = params.get('error');
//     const email = params.get('email');

//     if (connected && email) {
//       toast.success(`${connected === 'gmail' ? 'Gmail' : 'Outlook'} connected: ${email}`);
//       window.history.replaceState({}, '', '/dashboard');
//       if (user) fetchAccounts();
//     }

//     if (error) {
//       const message = params.get('message') || error;
//       toast.error(`Connection failed: ${message}`);
//       window.history.replaceState({}, '', '/dashboard');
//     }
//   };

//   const fetchAccounts = async () => {
//     if (!user?.id) return;

//     setLoading(true);
//     try {
//       const { data } = await api.get(`/auth/accounts/${user.id}`);
//       console.log('Accounts loaded:', data);
//       setAccounts(data.accounts || []);
//     } catch (error) {
//       console.error('Failed to fetch accounts:', error);
//       toast.error('Failed to load email accounts');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const connectEmail = async (provider) => {
//     if (!user?.id) {
//       toast.error('Please sign in first');
//       return;
//     }

//     setConnecting(provider);
//     console.log(`Initiating ${provider} OAuth for user:`, user.id);

//     try {
//       const { data } = await api.get(`/auth/${provider}`, {
//         params: { userId: user.id }
//       });

//       console.log('Redirecting to OAuth URL:', data.url);
//       window.location.href = data.url;
//     } catch (error) {
//       console.error('OAuth error:', error);
//       toast.error(`Failed to connect ${provider}`);
//       setConnecting(null);
//     }
//   };

//   const disconnectAccount = async (accountId) => {
//     if (!confirm('Are you sure you want to disconnect this account?')) return;

//     try {
//       await api.delete(`/auth/accounts/${accountId}`);
//       toast.success('Account disconnected');
//       fetchAccounts();
//     } catch (error) {
//       console.error('Disconnect error:', error);
//       toast.error('Failed to disconnect account');
//     }
//   };

//   const syncEmails = async (accountId) => {
//     console.log("Data received in syncEmails:", accountId); // Check your browser console!

//     setSyncing(true);
//     try {

  
//       if (!accountId) return toast.error("No account selected");
//       // Calling your specific route: /sync/:accountId
//       const response = await axios.post(`http://localhost:3001/emails/sync/${accountId}`);

//       if (response.data.success) {
//         toast.success(`Successfully synced ${response.data.count} emails!`);
//         // Optional: Refresh your email list here
//       }
//     } catch (error) {
//       console.error('Sync Error:', error);
//       toast.error(error.response?.data?.message || 'Failed to sync emails');
//     } finally {
//       setSyncing(false);
//     }
//   };

//   return (
//     <div className="h-full overflow-y-auto">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200 px-8 py-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
//             <p className="text-gray-600 mt-1">
//               {accounts.length === 0
//                 ? 'Connect your email accounts to get started'
//                 : `Managing ${accounts.length} email account${accounts.length !== 1 ? 's' : ''}`
//               }
//             </p>
//           </div>
//           {accounts.length > 0 && (
//             <button
//               key={accounts[0].id}
//               onClick={()=> syncEmails(accounts[0].id)}
//               disabled={syncing}
//               className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
//             >
//               <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
//               {syncing ? 'Syncing...' : 'Sync Emails'}
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Content */}
//       <div className="p-8">
//         {loading ? (
//           <div className="flex items-center justify-center py-20">
//             <LoaderIcon className="w-10 h-10 animate-spin text-indigo-600" />
//           </div>
//         ) : (
//           <div className="max-w-6xl mx-auto space-y-8">
//             {/* Stats Cards (show only if accounts connected) */}
//             {accounts.length > 0 && (
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <StatCard
//                   icon={<Mail className="w-6 h-6" />}
//                   title="Total Emails"
//                   value="0"
//                   subtitle="Sync to see emails"
//                   color="blue"
//                 />
//                 <StatCard
//                   icon={<TrendingUp className="w-6 h-6" />}
//                   title="Today"
//                   value="0"
//                   subtitle="New emails today"
//                   color="green"
//                 />
//                 <StatCard
//                   icon={<Clock className="w-6 h-6" />}
//                   title="Time Saved"
//                   value="0h"
//                   subtitle="AI automation saves time"
//                   color="purple"
//                 />
//               </div>
//             )}

//             {/* Connected Accounts */}
//             {accounts.length > 0 && (
//               <div>
//                 <h2 className="text-2xl font-bold mb-4 text-gray-900">
//                   Connected Accounts
//                 </h2>
//                 <div className="grid gap-4">
//                   {accounts.map((account) => (
//                     <div
//                       key={account.id}
//                       className="bg-white rounded-xl p-6 border-2 border-green-200 hover:border-green-400 transition shadow-sm"
//                     >
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-4">
//                           <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
//                             <Check className="w-7 h-7 text-green-600" />
//                           </div>
//                           <div>
//                             <div className="flex items-center gap-3 mb-1">
//                               <span className="text-lg font-bold text-gray-900">
//                                 {account.email}
//                               </span>
//                               <span className={`px-3 py-1 text-xs font-bold rounded-full ${account.provider === 'gmail'
//                                 ? 'bg-red-100 text-red-700'
//                                 : 'bg-blue-100 text-blue-700'
//                                 }`}>
//                                 {account.provider.toUpperCase()}
//                               </span>
//                               {account.is_active && (
//                                 <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
//                                   Active
//                                 </span>
//                               )}
//                             </div>
//                             <p className="text-sm text-gray-600">
//                               Connected on {new Date(account.created_at).toLocaleDateString('en-US', {
//                                 month: 'long',
//                                 day: 'numeric',
//                                 year: 'numeric',
//                                 hour: '2-digit',
//                                 minute: '2-digit'
//                               })}
//                             </p>
//                           </div>
//                         </div>
//                         <button
//                           onClick={() => disconnectAccount(account.id)}
//                           className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-semibold transition"
//                         >
//                           Disconnect
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Connect New Account */}
//             <div>
//               <h2 className="text-2xl font-bold mb-4 text-gray-900">
//                 {accounts.length > 0 ? 'Connect Another Account' : 'Connect Your First Account'}
//               </h2>

//               <div className="grid md:grid-cols-2 gap-6">
//                 {/* Gmail Card */}
//                 <button
//                   onClick={() => connectEmail('google')}
//                   disabled={connecting === 'google'}
//                   className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <div className="text-center">
//                     <div className="w-20 h-20 bg-gradient-to-br from-red-500 via-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-md">
//                       <Mail className="w-10 h-10 text-white" />
//                     </div>
//                     <h3 className="text-2xl font-bold mb-2 text-gray-900">
//                       Gmail
//                     </h3>
//                     <p className="text-gray-600 mb-4 leading-relaxed">
//                       Connect your Google Workspace or personal Gmail account
//                     </p>
//                     {connecting === 'google' ? (
//                       <div className="flex items-center justify-center gap-2 text-blue-600 font-semibold">
//                         <LoaderIcon className="w-5 h-5 animate-spin" />
//                         Connecting...
//                       </div>
//                     ) : (
//                       <div className="flex items-center justify-center gap-2 text-blue-600 font-bold">
//                         <Plus className="w-5 h-5" />
//                         Connect Gmail
//                       </div>
//                     )}
//                   </div>
//                 </button>

//                 {/* Outlook Card */}
//                 <button
//                   onClick={() => connectEmail('microsoft')}
//                   disabled={connecting === 'microsoft'}
//                   className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <div className="text-center">
//                     <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-md">
//                       <Mail className="w-10 h-10 text-white" />
//                     </div>
//                     <h3 className="text-2xl font-bold mb-2 text-gray-900">
//                       Outlook
//                     </h3>
//                     <p className="text-gray-600 mb-4 leading-relaxed">
//                       Connect your Microsoft 365 or Outlook.com account
//                     </p>
//                     {connecting === 'microsoft' ? (
//                       <div className="flex items-center justify-center gap-2 text-blue-600 font-semibold">
//                         <LoaderIcon className="w-5 h-5 animate-spin" />
//                         Connecting...
//                       </div>
//                     ) : (
//                       <div className="flex items-center justify-center gap-2 text-blue-600 font-bold">
//                         <Plus className="w-5 h-5" />
//                         Connect Outlook
//                       </div>
//                     )}
//                   </div>
//                 </button>
//               </div>
//             </div>

//             {/* Success Message */}
//             {accounts.length > 0 && (
//               <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-2xl p-8">
//                 <div className="flex items-start gap-4">
//                   <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
//                     <Check className="w-7 h-7 text-white" />
//                   </div>
//                   <div className="flex-1">
//                     <h3 className="text-2xl font-bold mb-3 text-gray-900">
//                       🎉 Great! You're Connected
//                     </h3>
//                     <p className="text-gray-700 mb-4">
//                       Your email account is ready. Here's what you can do next:
//                     </p>
//                     <ul className="space-y-2 text-gray-700 mb-6">
//                       <li className="flex items-center gap-2">
//                         <Zap className="w-5 h-5 text-yellow-600" />
//                         <span>AI will categorize emails automatically</span>
//                       </li>
//                       <li className="flex items-center gap-2">
//                         <Zap className="w-5 h-5 text-yellow-600" />
//                         <span>Generate smart responses with one click</span>
//                       </li>
//                       <li className="flex items-center gap-2">
//                         <Zap className="w-5 h-5 text-yellow-600" />
//                         <span>Set up automation rules to save time</span>
//                       </li>
//                     </ul>
//                     <button
//                       onClick={() => window.location.href = '/inbox'}
//                       className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-md"
//                     >
//                       Go to Inbox →
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // Stat Card Component
// function StatCard({ icon, title, value, subtitle, color }) {
//   const colorClasses = {
//     blue: 'bg-blue-100 text-blue-600',
//     green: 'bg-green-100 text-green-600',
//     purple: 'bg-purple-100 text-purple-600',
//     orange: 'bg-orange-100 text-orange-600'
//   };

//   return (
//     <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition">
//       <div className={`w-12 h-12 rounded-lg ${colorClasses[color]} flex items-center justify-center mb-4`}>
//         {icon}
//       </div>
//       <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
//       <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
//       <p className="text-xs text-gray-500">{subtitle}</p>
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import { Mail, Plus, Loader as LoaderIcon, Check, RefreshCw, TrendingUp, Clock, Zap, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import toast from 'react-hot-toast';
import axios from 'axios';

// --- Sub-component: Sexy Stat Card ---
function StatCard({ icon, title, value, subtitle, color }) {
  const gradients = {
    blue: 'from-blue-500/20 to-indigo-500/5 text-blue-400 border-blue-500/20',
    green: 'from-emerald-500/20 to-teal-500/5 text-emerald-400 border-emerald-500/20',
    purple: 'from-purple-500/20 to-pink-500/5 text-purple-400 border-purple-500/20',
  };

  return (
    <div className={`group relative overflow-hidden rounded-3xl border backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] bg-white/[0.03] ${gradients[color]}`}>
      <div className="p-8 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-500">
            {icon}
          </div>
          <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Live Core</div>
        </div>
        <p className="text-4xl font-black text-white tracking-tighter mb-1">{value}</p>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{title}</p>
        <div className="mt-6 flex items-center gap-2">
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-current w-2/3 animate-pulse" />
            </div>
            <span className="text-[10px] text-slate-500 whitespace-nowrap italic">{subtitle}</span>
        </div>
      </div>
      <div className="absolute -bottom-10 -right-10 w-32 h-32 blur-[80px] rounded-full bg-current opacity-10 group-hover:opacity-20 transition-opacity" />
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(null);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    if (user) {
      fetchAccounts();
    }
    checkOAuthCallback();
  }, [user]);

  const checkOAuthCallback = () => {
    const params = new URLSearchParams(window.location.search);
    const connected = params.get('connected');
    const error = params.get('error');
    const email = params.get('email');

    if (connected && email) {
      toast.success(`${connected === 'gmail' ? 'Gmail' : 'Outlook'} connected: ${email}`, {
        style: { background: '#161920', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
      });
      window.history.replaceState({}, '', '/dashboard');
      if (user) fetchAccounts();
    }

    if (error) {
      const message = params.get('message') || error;
      toast.error(`Connection failed: ${message}`);
      window.history.replaceState({}, '', '/dashboard');
    }
  };

  const fetchAccounts = async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const { data } = await api.get(`/auth/accounts/${user.id}`);
      setAccounts(data.accounts || []);
    } catch (error) {
      toast.error('Failed to load neural links');
    } finally {
      setLoading(false);
    }
  };

  const connectEmail = async (provider) => {
    if (!user?.id) return toast.error('Auth required');
    setConnecting(provider);
    try {
      const { data } = await api.get(`/auth/${provider}`, { params: { userId: user.id } });
      window.location.href = data.url;
    } catch (error) {
      toast.error(`Failed to connect ${provider}`);
      setConnecting(null);
    }
  };

  const disconnectAccount = async (accountId) => {
    if (!confirm('Are you sure you want to terminate this uplink?')) return;
    try {
      await api.delete(`/auth/accounts/${accountId}`);
      toast.success('Uplink Terminated');
      fetchAccounts();
    } catch (error) {
      toast.error('Failed to disconnect');
    }
  };

  const syncEmails = async (accountId) => {
    setSyncing(true);
    try {
      if (!accountId) return toast.error("No account target");
      const response = await axios.post(`http://localhost:3001/emails/sync/${accountId}`);
      if (response.data.success) {
        toast.success(`Synced ${response.data.count} neural entries`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Sync error');
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1115] text-slate-200 selection:bg-indigo-500/30">
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[45%] h-[45%] rounded-full bg-indigo-600/10 blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[45%] h-[45%] rounded-full bg-purple-600/10 blur-[150px]" />
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <header className="border-b border-white/5 bg-[#0F1115]/60 backdrop-blur-xl px-10 py-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-black bg-indigo-500 text-white tracking-[0.2em] uppercase">Control System</span>
              </div>
              <h1 className="text-5xl font-black tracking-tighter text-white">
                Command <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Center</span>
              </h1>
              <p className="text-slate-500 mt-2 font-medium">
                {accounts.length === 0 ? 'Initialize neural links to begin' : `Systems operational: ${accounts.length} active uplinks`}
              </p>
            </div>
            
            {accounts.length > 0 && (
              <button
                onClick={() => syncEmails(accounts[0].id)}
                disabled={syncing}
                className="group relative overflow-hidden flex items-center gap-3 bg-white text-black px-10 py-4 rounded-2xl font-black transition-all hover:scale-[1.03] active:scale-95 disabled:opacity-50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <RefreshCw className={`relative z-10 w-5 h-5 ${syncing ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-700'}`} />
                <span className="relative z-10 group-hover:text-white transition-colors">
                  {syncing ? 'SYNCING CORE...' : 'FORCE SYNC'}
                </span>
              </button>
            )}
          </div>
        </header>

        <main className="p-10 max-w-7xl mx-auto space-y-16">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-40 space-y-6">
              <div className="relative h-24 w-24">
                <div className="absolute inset-0 border-4 border-indigo-500/10 rounded-full" />
                <div className="absolute inset-0 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                <Zap className="absolute inset-0 m-auto w-8 h-8 text-indigo-400 animate-pulse" />
              </div>
              <p className="text-xs font-black tracking-[0.4em] text-indigo-400 uppercase">Synchronizing Neural Net</p>
            </div>
          ) : (
            <>
              {/* Stats Grid */}
              {accounts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <StatCard icon={<Mail className="w-6 h-6" />} title="Neural Entries" value="1,248" subtitle="Real-time stream" color="blue" />
                  <StatCard icon={<TrendingUp className="w-6 h-6" />} title="Efficiency" value="94.2%" subtitle="AI accuracy rating" color="green" />
                  <StatCard icon={<Clock className="w-6 h-6" />} title="Time Dilated" value="42h" subtitle="Saved this month" color="purple" />
                </div>
              )}

              {/* Account Management */}
              <section>
                <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-500">Active Node Links</h2>
                    <div className="h-px flex-1 bg-white/5" />
                </div>
                
                {accounts.length > 0 ? (
                  <div className="grid gap-4">
                    {accounts.map((account) => (
                      <div key={account.id} className="group relative overflow-hidden bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 transition-all hover:bg-white/[0.05] hover:border-white/10">
                        <div className="flex flex-wrap items-center justify-between gap-6 relative z-10">
                          <div className="flex items-center gap-6">
                            <div className="relative">
                              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center border border-white/10 shadow-2xl">
                                <Check className="w-8 h-8 text-indigo-400" />
                              </div>
                              <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-[6px] border-[#161920]" />
                            </div>
                            <div>
                              <div className="flex items-center gap-3">
                                <h3 className="text-2xl font-bold text-white tracking-tight">{account.email}</h3>
                                <span className={`text-[10px] font-black px-3 py-1 rounded-lg border uppercase tracking-widest ${
                                  account.provider === 'gmail' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                                }`}>
                                  {account.provider}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 mt-2 font-medium tracking-wide">Uplink established on {new Date(account.created_at).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <button onClick={() => disconnectAccount(account.id)} className="px-8 py-3 rounded-xl border border-red-500/20 text-red-400 text-xs font-black hover:bg-red-500 hover:text-white transition-all uppercase tracking-widest">
                            Terminate
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                    <div className="text-center py-20 bg-white/[0.01] rounded-[3rem] border border-dashed border-white/5">
                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Plus className="text-slate-600 w-10 h-10" />
                        </div>
                        <p className="text-slate-400 font-medium">No uplinks detected. Deploy your first node below.</p>
                    </div>
                )}
              </section>

              {/* Expansion Modules */}
              <section>
                <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-500">Available Expansion Modules</h2>
                    <div className="h-px flex-1 bg-white/5" />
                </div>
                <div className="grid md:grid-cols-2 gap-10">
                  <button onClick={() => connectEmail('google')} disabled={connecting === 'google'} className="group relative h-80 overflow-hidden rounded-[3rem] bg-[#161920] border border-white/5 transition-all duration-700 hover:border-red-500/30">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="relative z-10 p-12 flex flex-col items-center text-center h-full">
                        <div className="mb-8 p-6 rounded-3xl bg-red-500/10 text-red-500 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-red-500/20 shadow-[0_0_40px_rgba(239,68,68,0.1)]">
                            <Mail className="w-12 h-12" />
                        </div>
                        <h3 className="text-3xl font-black text-white italic tracking-tighter">GMAIL</h3>
                        <p className="text-slate-500 text-sm mt-4 font-medium max-w-[240px]">Link Google neural workspace for AI-powered processing.</p>
                        <div className="mt-auto flex items-center gap-2 text-[10px] font-black text-red-400 uppercase tracking-[0.3em]">
                            <Plus className="w-4 h-4" /> Initialize Deployment
                        </div>
                    </div>
                  </button>

                  <button onClick={() => connectEmail('microsoft')} disabled={connecting === 'microsoft'} className="group relative h-80 overflow-hidden rounded-[3rem] bg-[#161920] border border-white/5 transition-all duration-700 hover:border-blue-500/30">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="relative z-10 p-12 flex flex-col items-center text-center h-full">
                        <div className="mb-8 p-6 rounded-3xl bg-blue-500/10 text-blue-500 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 border border-blue-500/20 shadow-[0_0_40px_rgba(59,130,246,0.1)]">
                            <Mail className="w-12 h-12" />
                        </div>
                        <h3 className="text-3xl font-black text-white italic tracking-tighter">OUTLOOK</h3>
                        <p className="text-slate-500 text-sm mt-4 font-medium max-w-[240px]">Sync Microsoft 365 nodes with enterprise-grade encryption.</p>
                        <div className="mt-auto flex items-center gap-2 text-[10px] font-black text-blue-400 uppercase tracking-[0.3em]">
                            <Plus className="w-4 h-4" /> Initialize Deployment
                        </div>
                    </div>
                  </button>
                </div>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
}