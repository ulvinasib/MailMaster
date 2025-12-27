// import { useState, useEffect } from 'react';
// import { Mail, Plus, Loader as LoaderIcon, Check, X } from 'lucide-react';
// import { useAuth } from '../hooks/useAuth';
// import api from '../services/api';
// import toast from 'react-hot-toast';

// export default function Dashboard() {
//   const { user, signOut } = useAuth();
//   const [accounts, setAccounts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [connecting, setConnecting] = useState(null);

//   useEffect(() => {
//     fetchAccounts();
    
//     // Check for OAuth callback success
//     const params = new URLSearchParams(window.location.search);
//     const connected = params.get('connected');
//     const error = params.get('error');
//     const email = params.get('email');

//     if (connected && email) {
//       toast.success(`${connected === 'gmail' ? 'Gmail' : 'Outlook'} account connected: ${email}`);
//       // Clear URL params
//       window.history.replaceState({}, '', '/dashboard');
//       fetchAccounts();
//     }

//     if (error) {
//       toast.error(`Failed to connect: ${error}`);
//       window.history.replaceState({}, '', '/dashboard');
//     }
//   }, []);

//   const fetchAccounts = async () => {
//     if (!user) return;
    
//     try {
//       const { data } = await api.get(`/auth/accounts/${user.id}`);
//       setAccounts(data.accounts || []);
//     } catch (error) {
//       console.error('Failed to fetch accounts:', error);
//       toast.error('Failed to load email accounts');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const connectEmail = async (provider) => {
//     setConnecting(provider);
    
//     try {
//       const { data } = await api.get(`/auth/${provider}`, {
//         params: { userId: user.id }
//       });
      
//       // Redirect to OAuth page
//       window.location.href = data.url;
//     } catch (error) {
//       console.error('Failed to initiate OAuth:', error);
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
//       toast.error('Failed to disconnect account');
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <LoaderIcon className="w-8 h-8 animate-spin text-indigo-600" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b">
//         <div className="container mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <Mail className="w-8 h-8 text-indigo-600" />
//               <h1 className="text-2xl font-bold text-gray-900">MailMaster AI</h1>
//             </div>
//             <div className="flex items-center gap-4">
//               <span className="text-sm text-gray-600">{user?.email}</span>
//               <button
//                 onClick={signOut}
//                 className="text-sm text-gray-600 hover:text-gray-900 font-semibold"
//               >
//                 Sign Out
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-6 py-12">
//         <div className="max-w-4xl mx-auto">
//           {/* Welcome */}
//           <div className="text-center mb-12">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">
//               Welcome to MailMaster AI! 🎉
//             </h2>
//             <p className="text-xl text-gray-600">
//               Let's connect your email accounts to get started.
//             </p>
//           </div>

//           {/* Connected Accounts */}
//           {accounts.length > 0 && (
//             <div className="mb-12">
//               <h3 className="text-xl font-semibold mb-4 text-gray-900">
//                 Connected Accounts
//               </h3>
//               <div className="space-y-3">
//                 {accounts.map((account) => (
//                   <div
//                     key={account.id}
//                     className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 flex items-center justify-between"
//                   >
//                     <div className="flex items-center gap-4">
//                       <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
//                         <Check className="w-6 h-6 text-green-600" />
//                       </div>
//                       <div>
//                         <div className="flex items-center gap-2">
//                           <span className="font-semibold text-gray-900">
//                             {account.email}
//                           </span>
//                           <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 font-medium">
//                             {account.provider}
//                           </span>
//                         </div>
//                         <p className="text-sm text-gray-500">
//                           Connected on {new Date(account.created_at).toLocaleDateString()}
//                         </p>
//                       </div>
//                     </div>
//                     <button
//                       onClick={() => disconnectAccount(account.id)}
//                       className="text-red-600 hover:text-red-700 font-semibold text-sm"
//                     >
//                       Disconnect
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Connect New Account */}
//           <div>
//             <h3 className="text-xl font-semibold mb-4 text-gray-900">
//               {accounts.length > 0 ? 'Connect Another Account' : 'Connect Your First Account'}
//             </h3>
//             <div className="grid md:grid-cols-2 gap-6">
//               {/* Gmail Card */}
//               <button
//                 onClick={() => connectEmail('google')}
//                 disabled={connecting === 'google'}
//                 className="bg-white rounded-xl p-8 shadow-lg border-2 border-transparent hover:border-blue-500 transition group disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <div className="flex flex-col items-center text-center">
//                   <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-yellow-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
//                     <Mail className="w-10 h-10 text-white" />
//                   </div>
//                   <h3 className="text-2xl font-bold mb-2 text-gray-900">
//                     Connect Gmail
//                   </h3>
//                   <p className="text-gray-600 mb-4">
//                     Sync your Google Workspace or Gmail account
//                   </p>
//                   {connecting === 'google' ? (
//                     <LoaderIcon className="w-5 h-5 animate-spin text-blue-600" />
//                   ) : (
//                     <div className="flex items-center gap-2 text-blue-600 font-semibold">
//                       <Plus className="w-5 h-5" />
//                       Connect Now
//                     </div>
//                   )}
//                 </div>
//               </button>

//               {/* Outlook Card */}
//               <button
//                 onClick={() => connectEmail('microsoft')}
//                 disabled={connecting === 'microsoft'}
//                 className="bg-white rounded-xl p-8 shadow-lg border-2 border-transparent hover:border-blue-500 transition group disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <div className="flex flex-col items-center text-center">
//                   <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
//                     <Mail className="w-10 h-10 text-white" />
//                   </div>
//                   <h3 className="text-2xl font-bold mb-2 text-gray-900">
//                     Connect Outlook
//                   </h3>
//                   <p className="text-gray-600 mb-4">
//                     Sync your Microsoft 365 or Outlook.com account
//                   </p>
//                   {connecting === 'microsoft' ? (
//                     <LoaderIcon className="w-5 h-5 animate-spin text-blue-600" />
//                   ) : (
//                     <div className="flex items-center gap-2 text-blue-600 font-semibold">
//                       <Plus className="w-5 h-5" />
//                       Connect Now
//                     </div>
//                   )}
//                 </div>
//               </button>
//             </div>
//           </div>

//           {/* Next Steps */}
//           {accounts.length > 0 && (
//             <div className="mt-12 bg-indigo-50 border border-indigo-200 rounded-xl p-8">
//               <h3 className="text-xl font-bold mb-4 text-gray-900">
//                 🎉 Great! Your account is connected.
//               </h3>
//               <p className="text-gray-700 mb-6">
//                 We're now syncing your emails. Here's what happens next:
//               </p>
//               <ul className="space-y-3 text-gray-700">
//                 <li className="flex items-start gap-3">
//                   <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
//                   <span>AI will categorize all your incoming emails automatically</span>
//                 </li>
//                 <li className="flex items-start gap-3">
//                   <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
//                   <span>Generate AI responses with one click</span>
//                 </li>
//                 <li className="flex items-start gap-3">
//                   <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
//                   <span>Set up automation rules to save even more time</span>
//                 </li>
//               </ul>
//               <button className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
//                 View My Inbox →
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import { Mail, Plus, Loader as LoaderIcon, Check, RefreshCw, TrendingUp, Clock, Zap } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(null);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    console.log('Dashboard mounted, user:', user);
    
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
      toast.success(`${connected === 'gmail' ? 'Gmail' : 'Outlook'} connected: ${email}`);
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
      console.log('Accounts loaded:', data);
      setAccounts(data.accounts || []);
    } catch (error) {
      console.error('Failed to fetch accounts:', error);
      toast.error('Failed to load email accounts');
    } finally {
      setLoading(false);
    }
  };

  const connectEmail = async (provider) => {
    if (!user?.id) {
      toast.error('Please sign in first');
      return;
    }

    setConnecting(provider);
    console.log(`Initiating ${provider} OAuth for user:`, user.id);
    
    try {
      const { data } = await api.get(`/auth/${provider}`, {
        params: { userId: user.id }
      });
      
      console.log('Redirecting to OAuth URL:', data.url);
      window.location.href = data.url;
    } catch (error) {
      console.error('OAuth error:', error);
      toast.error(`Failed to connect ${provider}`);
      setConnecting(null);
    }
  };

  const disconnectAccount = async (accountId) => {
    if (!confirm('Are you sure you want to disconnect this account?')) return;

    try {
      await api.delete(`/auth/accounts/${accountId}`);
      toast.success('Account disconnected');
      fetchAccounts();
    } catch (error) {
      console.error('Disconnect error:', error);
      toast.error('Failed to disconnect account');
    }
  };

  const syncEmails = async () => {
    setSyncing(true);
    toast.success('Email sync will be available in Day 2!');
    setTimeout(() => setSyncing(false), 2000);
  };

  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              {accounts.length === 0 
                ? 'Connect your email accounts to get started' 
                : `Managing ${accounts.length} email account${accounts.length !== 1 ? 's' : ''}`
              }
            </p>
          </div>
          {accounts.length > 0 && (
            <button
              onClick={syncEmails}
              disabled={syncing}
              className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
              {syncing ? 'Syncing...' : 'Sync Emails'}
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <LoaderIcon className="w-10 h-10 animate-spin text-indigo-600" />
          </div>
        ) : (
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Stats Cards (show only if accounts connected) */}
            {accounts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                  icon={<Mail className="w-6 h-6" />}
                  title="Total Emails"
                  value="0"
                  subtitle="Sync to see emails"
                  color="blue"
                />
                <StatCard
                  icon={<TrendingUp className="w-6 h-6" />}
                  title="Today"
                  value="0"
                  subtitle="New emails today"
                  color="green"
                />
                <StatCard
                  icon={<Clock className="w-6 h-6" />}
                  title="Time Saved"
                  value="0h"
                  subtitle="AI automation saves time"
                  color="purple"
                />
              </div>
            )}

            {/* Connected Accounts */}
            {accounts.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">
                  Connected Accounts
                </h2>
                <div className="grid gap-4">
                  {accounts.map((account) => (
                    <div
                      key={account.id}
                      className="bg-white rounded-xl p-6 border-2 border-green-200 hover:border-green-400 transition shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                            <Check className="w-7 h-7 text-green-600" />
                          </div>
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <span className="text-lg font-bold text-gray-900">
                                {account.email}
                              </span>
                              <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                                account.provider === 'gmail' 
                                  ? 'bg-red-100 text-red-700' 
                                  : 'bg-blue-100 text-blue-700'
                              }`}>
                                {account.provider.toUpperCase()}
                              </span>
                              {account.is_active && (
                                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                                  Active
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">
                              Connected on {new Date(account.created_at).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => disconnectAccount(account.id)}
                          className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-semibold transition"
                        >
                          Disconnect
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Connect New Account */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                {accounts.length > 0 ? 'Connect Another Account' : 'Connect Your First Account'}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Gmail Card */}
                <button
                  onClick={() => connectEmail('google')}
                  disabled={connecting === 'google'}
                  className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-red-500 via-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-md">
                      <Mail className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-gray-900">
                      Gmail
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      Connect your Google Workspace or personal Gmail account
                    </p>
                    {connecting === 'google' ? (
                      <div className="flex items-center justify-center gap-2 text-blue-600 font-semibold">
                        <LoaderIcon className="w-5 h-5 animate-spin" />
                        Connecting...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2 text-blue-600 font-bold">
                        <Plus className="w-5 h-5" />
                        Connect Gmail
                      </div>
                    )}
                  </div>
                </button>

                {/* Outlook Card */}
                <button
                  onClick={() => connectEmail('microsoft')}
                  disabled={connecting === 'microsoft'}
                  className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-md">
                      <Mail className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-gray-900">
                      Outlook
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      Connect your Microsoft 365 or Outlook.com account
                    </p>
                    {connecting === 'microsoft' ? (
                      <div className="flex items-center justify-center gap-2 text-blue-600 font-semibold">
                        <LoaderIcon className="w-5 h-5 animate-spin" />
                        Connecting...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2 text-blue-600 font-bold">
                        <Plus className="w-5 h-5" />
                        Connect Outlook
                      </div>
                    )}
                  </div>
                </button>
              </div>
            </div>

            {/* Success Message */}
            {accounts.length > 0 && (
              <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-2xl p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">
                      🎉 Great! You're Connected
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Your email account is ready. Here's what you can do next:
                    </p>
                    <ul className="space-y-2 text-gray-700 mb-6">
                      <li className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-yellow-600" />
                        <span>AI will categorize emails automatically</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-yellow-600" />
                        <span>Generate smart responses with one click</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-yellow-600" />
                        <span>Set up automation rules to save time</span>
                      </li>
                    </ul>
                    <button 
                      onClick={syncEmails}
                      className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-md"
                    >
                      Sync Emails Now →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ icon, title, value, subtitle, color }) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600'
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition">
      <div className={`w-12 h-12 rounded-lg ${colorClasses[color]} flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
      <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-xs text-gray-500">{subtitle}</p>
    </div>
  );
}