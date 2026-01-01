// import { useState, useEffect } from 'react';
// import { Mail, Star, Archive, Trash2, RefreshCw, Search, Filter, MailOpen, Clock } from 'lucide-react';
// import { useAuth } from '../hooks/useAuth';
// import api from '../services/api';
// import toast from 'react-hot-toast';

// export default function Inbox() {
//   const { user } = useAuth();
//   const [emails, setEmails] = useState([]);
//   const [accounts, setAccounts] = useState([]);
//   const [selectedAccount, setSelectedAccount] = useState('all');
//   const [selectedEmail, setSelectedEmail] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [syncing, setSyncing] = useState(false);
//   const [search, setSearch] = useState('');
//   const [filter, setFilter] = useState('all'); // all, unread, starred
//   const [categoryFilter, setCategoryFilter] = useState

//   useEffect(() => {
//     if(user){
//       fetchAccounts();
//     }
//   }, [user]);

//   useEffect(() => {
//     if (accounts.length > 0) {
//       fetchEmails();
//     }
//   }, [selectedAccount, filter, search,accounts.length]);

//   const fetchAccounts = async () => {
//     if(!user?.id){
//       console.log('No user ID found, skipping account fetch.');
//       setLoading(false);
//       return;
//     }

//     console.log('👤 Fetching accounts for user:', user.id);

//     try {
//       const { data } = await api.get(`/auth/accounts/${user.id}`);
//       console.log('✅ Accounts loaded:', data.accounts);
//       setAccounts(data.accounts || []);

//       if (data.accounts?.length > 0) {
//         fetchEmails();
//       } else {
//         setLoading(false);
//       }
//     } catch (error) {
//       console.error('Failed to fetch accounts:', error);
//       setLoading(false);
//     }
//   };

//   const fetchEmails = async () => {
//     if (!user?.id) {
//       console.log('⚠️ Cannot fetch emails without user');
//       return;
//     }
//     setLoading(true);
//     console.log('🔍 Fetching emails...');
    
//     try {
//       const params = {};
  
//       if (selectedAccount !== 'all') {
//         params.accountId = selectedAccount;
//         console.log('📧 Filtering by account:', selectedAccount);
//       }
  
//       if (filter === 'unread') {
//         params.unread = 'true';
//       }
  
//       if (search) {
//         params.search = search;
//       }
  
//       console.log('📡 API call params:', params);
//       const { data } = await api.get('/emails/list', { params });
//       console.log('✅ Emails received:', data);
      
//       setEmails(data.emails || []);
      
//       if (data.emails?.length > 0) {
//         console.log(`📬 Loaded ${data.emails.length} emails`);
//       } else {
//         console.log('📭 No emails returned from API');
//       }
//     } catch (error) {
//       console.error('❌ Failed to fetch emails:', error);
//       console.error('Error details:', error.response?.data);
//       toast.error('Failed to load emails');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const syncEmails = async () => {
//     if (accounts.length === 0) {
//       toast.error('No accounts connected');
//       return;
//     }

//     setSyncing(true);

//     try {
//       const accountToSync = selectedAccount !== 'all'
//         ? accounts.find(a => a.id === selectedAccount)
//         : accounts[0];

//       const { data } = await api.post(`/emails/sync/${accountToSync.id}`);
//       toast.success(`Synced ${data.count} emails`);
//       fetchEmails();
//     } catch (error) {
//       console.error('Sync failed:', error);
//       toast.error('Sync failed');
//     } finally {
//       setSyncing(false);
//     }
//   };

//   const markAsRead = async (emailId, isRead) => {
//     try {
//       await api.patch(`/emails/${emailId}/read`, { isRead });
//       setEmails(emails.map(e => e.id === emailId ? { ...e, is_read: isRead } : e));
//       if (selectedEmail?.id === emailId) {
//         setSelectedEmail({ ...selectedEmail, is_read: isRead });
//       }
//     } catch (error) {
//       toast.error('Failed to update email');
//     }
//   };

//   const toggleStar = async (emailId, isStarred) => {
//     try {
//       await api.patch(`/emails/${emailId}/star`, { isStarred: !isStarred });
//       setEmails(emails.map(e => e.id === emailId ? { ...e, is_starred: !isStarred } : e));
//     } catch (error) {
//       toast.error('Failed to star email');
//     }
//   };

//   const archiveEmail = async (emailId) => {
//     try {
//       await api.patch(`/emails/${emailId}/archive`, { isArchived: true });
//       setEmails(emails.filter(e => e.id !== emailId));
//       setSelectedEmail(null);
//       toast.success('Email archived');
//     } catch (error) {
//       toast.error('Failed to archive');
//     }
//   };

//   const deleteEmail = async (emailId) => {
//     if (!confirm('Delete this email?')) return;

//     try {
//       await api.delete(`/emails/${emailId}`);
//       setEmails(emails.filter(e => e.id !== emailId));
//       setSelectedEmail(null);
//       toast.success('Email deleted');
//     } catch (error) {
//       toast.error('Failed to delete');
//     }
//   };

//   const formatDate = (date) => {
//     const d = new Date(date);
//     const now = new Date();
//     const diff = now - d;

//     if (diff < 86400000) { // Less than 24 hours
//       return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
//     } else if (diff < 604800000) { // Less than 7 days
//       return d.toLocaleDateString('en-US', { weekday: 'short' });
//     } else {
//       return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
//     }
//   };

//   if (accounts.length === 0) {
//     return (
//       <div className="h-full flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <Mail className="w-20 h-20 text-gray-300 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">No Email Accounts Connected</h2>
//           <p className="text-gray-600 mb-6">Connect an email account to view your inbox</p>
//           <button
//             onClick={() => window.location.href = '/dashboard'}
//             className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
//           >
//             Connect Account
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="h-full flex flex-col bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b px-6 py-4">
//         <div className="flex items-center justify-between mb-4">
//           <h1 className="text-2xl font-bold text-gray-900">Inbox</h1>
//           <button
//             onClick={syncEmails}
//             disabled={syncing}
//             className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
//           >
//             <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
//             {syncing ? 'Syncing...' : 'Sync'}
//           </button>
//         </div>

//         {/* Filters */}
//         <div className="flex items-center gap-4">
//           {/* Account Filter */}
//           <select
//             value={selectedAccount}
//             onChange={(e) => setSelectedAccount(e.target.value)}
//             className="border rounded-lg px-3 py-2 text-sm"
//           >
//             <option value="all">All Accounts</option>
//             {accounts.map(account => (
//               <option key={account.id} value={account.id}>
//                 {account.email}
//               </option>
//             ))}
//           </select>

//           {/* Status Filter */}
//           <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
//             {['all', 'unread'].map(f => (
//               <button
//                 key={f}
//                 onClick={() => setFilter(f)}
//                 className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${filter === f
//                     ? 'bg-white text-gray-900 shadow-sm'
//                     : 'text-gray-600 hover:text-gray-900'
//                   }`}
//               >
//                 {f === 'all' ? 'All' : 'Unread'}
//               </button>
//             ))}
//           </div>

//           {/* Search */}
//           <div className="flex-1 max-w-md">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <input
//                 type="text"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search emails..."
//                 className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Email List + Preview */}
//       <div className="flex-1 flex overflow-hidden">
//         {/* Email List */}
//         <div className="w-96 border-r bg-white overflow-y-auto">
//           {loading ? (
//             <div className="flex items-center justify-center py-20">
//               <RefreshCw className="w-8 h-8 animate-spin text-indigo-600" />
//             </div>
//           ) : emails.length === 0 ? (
//             <div className="text-center py-20 px-6">
//               <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//               <p className="text-gray-600">No emails found</p>
//               <button
//                 onClick={syncEmails}
//                 className="mt-4 text-indigo-600 font-semibold hover:underline"
//               >
//                 Sync now
//               </button>
//             </div>
//           ) : (
//             <div>
//               {emails.map(email => (
//                 <button
//                   key={email.id}
//                   onClick={() => {
//                     setSelectedEmail(email);
//                     if (!email.is_read) markAsRead(email.id, true);
//                   }}
//                   className={`w-full text-left p-4 border-b hover:bg-gray-50 transition ${selectedEmail?.id === email.id ? 'bg-indigo-50 border-l-4 border-l-indigo-600' : ''
//                     } ${!email.is_read ? 'bg-blue-50' : ''}`}
//                 >
//                   <div className="flex items-start justify-between mb-1">
//                     <span className={`font-semibold text-sm ${!email.is_read ? 'text-gray-900' : 'text-gray-700'}`}>
//                       {email.from_name || email.from_email}
//                     </span>
//                     <span className="text-xs text-gray-500">{formatDate(email.received_at)}</span>
//                   </div>
//                   <h3 className={`text-sm mb-1 line-clamp-1 ${!email.is_read ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
//                     {email.subject}
//                   </h3>
//                   <p className="text-xs text-gray-600 line-clamp-2">
//                     {email.body_text}
//                   </p>
//                   <div className="flex items-center gap-2 mt-2">
//                     {!email.is_read && (
//                       <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
//                     )}
//                     {email.is_starred && (
//                       <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
//                     )}
//                   </div>
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Email Preview */}
//         <div className="flex-1 bg-white overflow-y-auto">
//           {selectedEmail ? (
//             <div className="p-8">
//               {/* Actions */}
//               <div className="flex items-center gap-2 mb-6 pb-4 border-b">
//                 <button
//                   onClick={() => toggleStar(selectedEmail.id, selectedEmail.is_starred)}
//                   className="p-2 hover:bg-gray-100 rounded-lg transition"
//                   title="Star"
//                 >
//                   <Star className={`w-5 h-5 ${selectedEmail.is_starred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
//                 </button>
//                 <button
//                   onClick={() => markAsRead(selectedEmail.id, !selectedEmail.is_read)}
//                   className="p-2 hover:bg-gray-100 rounded-lg transition"
//                   title={selectedEmail.is_read ? 'Mark Unread' : 'Mark Read'}
//                 >
//                   <MailOpen className="w-5 h-5 text-gray-400" />
//                 </button>
//                 <button
//                   onClick={() => archiveEmail(selectedEmail.id)}
//                   className="p-2 hover:bg-gray-100 rounded-lg transition"
//                   title="Archive"
//                 >
//                   <Archive className="w-5 h-5 text-gray-400" />
//                 </button>
//                 <button
//                   onClick={() => deleteEmail(selectedEmail.id)}
//                   className="p-2 hover:bg-red-50 rounded-lg transition"
//                   title="Delete"
//                 >
//                   <Trash2 className="w-5 h-5 text-red-400" />
//                 </button>
//               </div>

//               {/* Email Header */}
//               <div className="mb-6">
//                 <h1 className="text-2xl font-bold text-gray-900 mb-4">
//                   {selectedEmail.subject}
//                 </h1>
//                 <div className="flex items-start gap-3">
//                   <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
//                     <span className="text-indigo-600 font-semibold text-sm">
//                       {(selectedEmail.from_name || selectedEmail.from_email).charAt(0).toUpperCase()}
//                     </span>
//                   </div>
//                   <div className="flex-1">
//                     <div className="font-semibold text-gray-900">
//                       {selectedEmail.from_name || selectedEmail.from_email}
//                     </div>
//                     <div className="text-sm text-gray-600">
//                       {selectedEmail.from_email}
//                     </div>
//                     <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
//                       <Clock className="w-3 h-3" />
//                       {new Date(selectedEmail.received_at).toLocaleString()}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Email Body */}
//               <div className="prose max-w-none">
//                 {selectedEmail.body_html ? (
//                   <div dangerouslySetInnerHTML={{ __html: selectedEmail.body_html }} />
//                 ) : (
//                   <div className="whitespace-pre-wrap text-gray-700">
//                     {selectedEmail.body_text}
//                   </div>
//                 )}
//               </div>
//             </div>
//           ) : (
//             <div className="h-full flex items-center justify-center">
//               <div className="text-center text-gray-400">
//                 <Mail className="w-16 h-16 mx-auto mb-4" />
//                 <p></p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from 'react';
import { Mail, Star, Archive, Trash2, RefreshCw, Search, MailOpen, Clock, Sparkles, Zap, AlertCircle, TrendingUp } from 'lucide-react';
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
  const [filter, setFilter] = useState('all'); // all, unread, important, needs_response
  const [categoryFilter, setCategoryFilter] = useState('all'); // all, important, newsletter, sales, support
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

      if (selectedAccount !== 'all') {
        params.accountId = selectedAccount;
      }

      if (filter === 'unread') {
        params.unread = 'true';
      }

      if (categoryFilter !== 'all') {
        params.category = categoryFilter;
      }

      if (search) {
        params.search = search;
      }

      const { data } = await api.get('/emails/list', { params });
      
      // Sort by priority score (highest first)
      const sortedEmails = (data.emails || []).sort((a, b) => {
        return (b.priority_score || 0) - (a.priority_score || 0);
      });
      
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
      const accountToSync = selectedAccount !== 'all'
        ? accounts.find(a => a.id === selectedAccount)
        : accounts[0];

      const { data } = await api.post(`/emails/sync/${accountToSync.id}`);
      toast.success(`Synced ${data.count} emails`);
      
      // Wait a moment for AI processing to start
      setTimeout(() => {
        fetchEmails();
      }, 2000);
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

    if (diff < 86400000) {
      return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    } else if (diff < 604800000) {
      return d.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const getPriorityColor = (score) => {
    if (!score) return 'bg-gray-400';
    if (score >= 8) return 'bg-red-500';
    if (score >= 6) return 'bg-orange-500';
    if (score >= 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getCategoryBadge = (category) => {
    const badges = {
      important: { color: 'bg-red-100 text-red-700', icon: AlertCircle },
      newsletter: { color: 'bg-blue-100 text-blue-700', icon: Mail },
      sales: { color: 'bg-green-100 text-green-700', icon: TrendingUp },
      support: { color: 'bg-purple-100 text-purple-700', icon: MailOpen },
      spam: { color: 'bg-gray-100 text-gray-700', icon: Trash2 }
    };
    return badges[category] || badges.important;
  };

  if (!user) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <RefreshCw className="w-12 h-12 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (accounts.length === 0 && !loading) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Mail className="w-20 h-20 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Email Accounts Connected</h2>
          <p className="text-gray-600 mb-6">Connect an email account to view your inbox</p>
          <button
            onClick={() => window.location.href = '/dashboard'}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Connect Account
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">Inbox</h1>
            <div className="flex items-center gap-1 px-3 py-1 bg-purple-100 rounded-full">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-xs font-semibold text-purple-600">AI-Powered</span>
            </div>
          </div>
          <button
            onClick={syncEmails}
            disabled={syncing}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
            {syncing ? 'Syncing...' : 'Sync'}
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* Account Filter */}
          <select
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">All Accounts</option>
            {accounts.map(account => (
              <option key={account.id} value={account.id}>
                {account.email}
              </option>
            ))}
          </select>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">All Categories</option>
            <option value="important">Important</option>
            <option value="newsletter">Newsletters</option>
            <option value="sales">Sales</option>
            <option value="support">Support</option>
          </select>

          {/* Status Filter */}
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
            {['all', 'unread'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                  filter === f
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {f === 'all' ? 'All' : 'Unread'}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search emails..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Email List + Preview */}
      <div className="flex-1 flex overflow-hidden">
        {/* Email List */}
        <div className="w-96 border-r bg-white overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <RefreshCw className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
          ) : emails.length === 0 ? (
            <div className="text-center py-20 px-6">
              <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No emails found</p>
              <button
                onClick={syncEmails}
                className="mt-4 text-indigo-600 font-semibold hover:underline"
              >
                Sync now
              </button>
            </div>
          ) : (
            <div>
              {emails.map(email => {
                const badge = getCategoryBadge(email.category);
                const CategoryIcon = badge.icon;
                
                return (
                  <button
                    key={email.id}
                    onClick={() => {
                      setSelectedEmail(email);
                      if (!email.is_read) markAsRead(email.id, true);
                    }}
                    className={`w-full text-left p-4 border-b hover:bg-gray-50 transition ${
                      selectedEmail?.id === email.id ? 'bg-indigo-50 border-l-4 border-l-indigo-600' : ''
                    } ${!email.is_read ? 'bg-blue-50' : ''}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        {/* Priority Score Badge */}
                        {email.priority_score && (
                          <div className={`flex-shrink-0 w-6 h-6 ${getPriorityColor(email.priority_score)} rounded-full flex items-center justify-center text-white text-xs font-bold`}>
                            {email.priority_score}
                          </div>
                        )}
                        <span className={`font-semibold text-sm truncate ${!email.is_read ? 'text-gray-900' : 'text-gray-700'}`}>
                          {email.from_name || email.from_email}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{formatDate(email.received_at)}</span>
                    </div>

                    <h3 className={`text-sm mb-1 line-clamp-1 ${!email.is_read ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                      {email.subject}
                    </h3>

                    {/* AI Summary or Body Preview */}
                    <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                      {email.ai_summary || email.body_text}
                    </p>

                    {/* Tags */}
                    <div className="flex items-center gap-2 flex-wrap">
                      {!email.is_read && (
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                      )}
                      {email.is_starred && (
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      )}
                      {email.category && (
                        <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${badge.color} flex items-center gap-1`}>
                          <CategoryIcon className="w-3 h-3" />
                          {email.category}
                        </span>
                      )}
                      {email.needs_response && (
                        <span className="px-2 py-0.5 text-xs rounded-full font-medium bg-orange-100 text-orange-700 flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          Reply
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Email Preview */}
        <div className="flex-1 bg-white overflow-y-auto">
          {selectedEmail ? (
            <div className="p-8">
              {/* Actions */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleStar(selectedEmail.id, selectedEmail.is_starred)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                    title="Star"
                  >
                    <Star className={`w-5 h-5 ${selectedEmail.is_starred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
                  </button>
                  <button
                    onClick={() => markAsRead(selectedEmail.id, !selectedEmail.is_read)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                    title={selectedEmail.is_read ? 'Mark Unread' : 'Mark Read'}
                  >
                    <MailOpen className="w-5 h-5 text-gray-400" />
                  </button>
                  <button
                    onClick={() => archiveEmail(selectedEmail.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                    title="Archive"
                  >
                    <Archive className="w-5 h-5 text-gray-400" />
                  </button>
                  <button
                    onClick={() => deleteEmail(selectedEmail.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5 text-red-400" />
                  </button>
                </div>

                {/* AI Response Button */}
                {selectedEmail.needs_response && (
                  <button
                    onClick={() => setShowResponseGenerator(!showResponseGenerator)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition shadow-lg"
                  >
                    <Sparkles className="w-4 h-4" />
                    AI Reply
                  </button>
                )}
              </div>

              {/* AI Insights */}
              {(selectedEmail.priority_score || selectedEmail.category || selectedEmail.ai_summary) && (
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    <span className="font-semibold text-purple-900">AI Insights</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {selectedEmail.priority_score && (
                      <div>
                        <div className="text-xs text-purple-700 mb-1">Priority</div>
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 ${getPriorityColor(selectedEmail.priority_score)} rounded-full flex items-center justify-center text-white font-bold`}>
                            {selectedEmail.priority_score}
                          </div>
                          <span className="text-sm text-gray-700">
                            {selectedEmail.priority_score >= 8 ? 'Urgent' : selectedEmail.priority_score >= 6 ? 'High' : selectedEmail.priority_score >= 4 ? 'Medium' : 'Low'}
                          </span>
                        </div>
                      </div>
                    )}
                    {selectedEmail.category && (
                      <div>
                        <div className="text-xs text-purple-700 mb-1">Category</div>
                        <span className={`px-3 py-1 text-sm rounded-full font-medium ${getCategoryBadge(selectedEmail.category).color}`}>
                          {selectedEmail.category}
                        </span>
                      </div>
                    )}
                    {selectedEmail.needs_response !== null && (
                      <div>
                        <div className="text-xs text-purple-700 mb-1">Response</div>
                        <span className={`px-3 py-1 text-sm rounded-full font-medium ${selectedEmail.needs_response ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
                          {selectedEmail.needs_response ? 'Needs Reply' : 'FYI Only'}
                        </span>
                      </div>
                    )}
                  </div>
                  {selectedEmail.ai_summary && (
                    <div className="mt-3 pt-3 border-t border-purple-200">
                      <div className="text-xs text-purple-700 mb-1">Summary</div>
                      <p className="text-sm text-gray-700">{selectedEmail.ai_summary}</p>
                    </div>
                  )}
                </div>
              )}

              {/* AI Response Generator */}
              {showResponseGenerator && <ResponseGenerator email={selectedEmail} onClose={() => setShowResponseGenerator(false)} />}

              {/* Email Header */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  {selectedEmail.subject}
                </h1>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-indigo-600 font-semibold text-sm">
                      {(selectedEmail.from_name || selectedEmail.from_email).charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">
                      {selectedEmail.from_name || selectedEmail.from_email}
                    </div>
                    <div className="text-sm text-gray-600">
                      {selectedEmail.from_email}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" />
                      {new Date(selectedEmail.received_at).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Body */}
              <div className="prose max-w-none">
                {selectedEmail.body_html ? (
                  <div dangerouslySetInnerHTML={{ __html: selectedEmail.body_html }} />
                ) : (
                  <div className="whitespace-pre-wrap text-gray-700">
                    {selectedEmail.body_text}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center text-gray-400">
                <Mail className="w-16 h-16 mx-auto mb-4" />
                <p>Select an email to view</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Response Generator Component
function ResponseGenerator({ email, onClose }) {
  const [tone, setTone] = useState('professional');
  const [response, setResponse] = useState('');
  const [generating, setGenerating] = useState(false);
  const [context, setContext] = useState('');

  const generateResponse = async () => {
    setGenerating(true);
    try {
      const { data } = await api.post('/ai/generate-response', {
        emailId: email.id,
        tone,
        context
      });
      setResponse(data.response);
      toast.success('Response generated!');
    } catch (error) {
      console.error('Generate response error:', error);
      toast.error('Failed to generate response');
    } finally {
      setGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(response);
    toast.success('Copied to clipboard!');
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-bold text-purple-900">AI Response Generator</h3>
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <div className="space-y-4">
        {/* Tone Selector */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Tone</label>
          <div className="flex gap-2">
            {['professional', 'casual', 'friendly'].map(t => (
              <button
                key={t}
                onClick={() => setTone(t)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  tone === t
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-purple-300'
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Context Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Additional Context (Optional)
          </label>
          <input
            type="text"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="e.g., Meeting is scheduled for Tuesday"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Generate Button */}
        <button
          onClick={generateResponse}
          disabled={generating}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {generating ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Zap className="w-5 h-5" />
              Generate AI Response
            </>
          )}
        </button>

        {/* Response */}
        {response && (
          <div className="space-y-3">
            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              className="w-full border rounded-lg p-4 min-h-[150px] focus:ring-2 focus:ring-purple-500"
            />
            <div className="flex gap-2">
              <button
                onClick={copyToClipboard}
                className="flex-1 border-2 border-purple-300 text-purple-700 py-2 rounded-lg font-semibold hover:bg-purple-50 transition"
              >
                Copy
              </button>
              <button className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition">
                Send Reply
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}