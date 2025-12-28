import { useState, useEffect } from 'react';
import { Mail, Star, Archive, Trash2, RefreshCw, Search, Filter, MailOpen, Clock } from 'lucide-react';
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
  const [filter, setFilter] = useState('all'); // all, unread, starred

  useEffect(() => {
    if(user){
      fetchAccounts();
    }
  }, [user]);

  useEffect(() => {
    if (accounts.length > 0) {
      fetchEmails();
    }
  }, [selectedAccount, filter, search,accounts.length]);

  const fetchAccounts = async () => {
    if(!user?.id){
      console.log('No user ID found, skipping account fetch.');
      setLoading(false);
      return;
    }

    console.log('👤 Fetching accounts for user:', user.id);

    try {
      const { data } = await api.get(`/auth/accounts/${user.id}`);
      console.log('✅ Accounts loaded:', data.accounts);
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
    if (!user?.id) {
      console.log('⚠️ Cannot fetch emails without user');
      return;
    }
    setLoading(true);
    console.log('🔍 Fetching emails...');
    
    try {
      const params = {};
  
      if (selectedAccount !== 'all') {
        params.accountId = selectedAccount;
        console.log('📧 Filtering by account:', selectedAccount);
      }
  
      if (filter === 'unread') {
        params.unread = 'true';
      }
  
      if (search) {
        params.search = search;
      }
  
      console.log('📡 API call params:', params);
      const { data } = await api.get('/emails/list', { params });
      console.log('✅ Emails received:', data);
      
      setEmails(data.emails || []);
      
      if (data.emails?.length > 0) {
        console.log(`📬 Loaded ${data.emails.length} emails`);
      } else {
        console.log('📭 No emails returned from API');
      }
    } catch (error) {
      console.error('❌ Failed to fetch emails:', error);
      console.error('Error details:', error.response?.data);
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
      fetchEmails();
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

    if (diff < 86400000) { // Less than 24 hours
      return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    } else if (diff < 604800000) { // Less than 7 days
      return d.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  if (accounts.length === 0) {
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
          <h1 className="text-2xl font-bold text-gray-900">Inbox</h1>
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
        <div className="flex items-center gap-4">
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

          {/* Status Filter */}
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
            {['all', 'unread'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${filter === f
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
              {emails.map(email => (
                <button
                  key={email.id}
                  onClick={() => {
                    setSelectedEmail(email);
                    if (!email.is_read) markAsRead(email.id, true);
                  }}
                  className={`w-full text-left p-4 border-b hover:bg-gray-50 transition ${selectedEmail?.id === email.id ? 'bg-indigo-50 border-l-4 border-l-indigo-600' : ''
                    } ${!email.is_read ? 'bg-blue-50' : ''}`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <span className={`font-semibold text-sm ${!email.is_read ? 'text-gray-900' : 'text-gray-700'}`}>
                      {email.from_name || email.from_email}
                    </span>
                    <span className="text-xs text-gray-500">{formatDate(email.received_at)}</span>
                  </div>
                  <h3 className={`text-sm mb-1 line-clamp-1 ${!email.is_read ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                    {email.subject}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {email.body_text}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    {!email.is_read && (
                      <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    )}
                    {email.is_starred && (
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Email Preview */}
        <div className="flex-1 bg-white overflow-y-auto">
          {selectedEmail ? (
            <div className="p-8">
              {/* Actions */}
              <div className="flex items-center gap-2 mb-6 pb-4 border-b">
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
                <p></p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}