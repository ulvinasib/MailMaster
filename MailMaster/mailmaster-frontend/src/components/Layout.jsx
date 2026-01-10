import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  Mail, 
  Home, 
  Inbox, 
  Zap, 
  BarChart3, 
  Settings, 
  LogOut, 
  UserPlus, 
  Users, 
  User, 
  Sparkles, 
  Copyleft, 
  LayoutTemplate,
  Calendar,
  Layers
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Inbox', href: '/inbox', icon: Inbox },
    { name: 'Automations', href: '/automations', icon: Zap },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Teams', href: '/teams', icon: Users },
    { name: "Contact Enrichment", href: "/contact-enrichment", icon: UserPlus },
    { name: "Calendar", href: "/calendar", icon: Calendar },
    { name: "Pipeline CRM", href: "/pipeline-crm", icon: Layers },
    { name: "Templates", href: "/templates", icon: Copyleft },
    { name: "MailMaster AI", href: "/mailmaster-ai", icon: Sparkles },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen bg-[#0F1115] text-slate-200 antialiased overflow-hidden">
      {/* Sidebar - Deep Obsidian Glassmorphism */}
      <aside className="w-72 bg-[#161920]/90 backdrop-blur-xl border-r border-white/5 flex flex-col relative z-10">
        
        {/* Logo Section */}
        <div className="h-24 flex items-center gap-4 px-8 shrink-0">
          <div className="relative group">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative w-11 h-11 bg-[#1e222c] border border-white/10 rounded-xl flex items-center justify-center shadow-2xl">
              <Mail className="w-6 h-6 text-indigo-400" />
            </div>
          </div>
          <div>
            <h1 className="text-xs font-black tracking-[0.2em] uppercase bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              MailMaster
            </h1>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <p className="text-[10px] font-bold text-indigo-400/80 uppercase tracking-widest">AI Core Active</p>
            </div>
          </div>
        </div>

        {/* Navigation - Glass pills with active glow */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            const isAI = item.name.includes("AI");

            return (
              <button
                key={item.name}
                onClick={() => navigate(item.href)}
                className={`w-full group relative flex items-center gap-3.5 px-4 py-3 rounded-xl font-bold transition-all duration-300 ${
                  active
                    ? 'bg-indigo-500/10 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]'
                    : 'text-slate-500 hover:text-slate-100 hover:bg-white/5'
                }`}
              >
                {/* Active Indicator Bar */}
                {active && (
                  <div className="absolute left-[-1rem] w-1.5 h-6 bg-indigo-500 rounded-r-full shadow-[0_0_15px_rgba(99,102,241,0.8)]" />
                )}
                
                <Icon className={`w-5 h-5 transition-all duration-300 group-hover:scale-110 ${
                  active ? 'text-indigo-400' : 'text-slate-600 group-hover:text-slate-300'
                } ${isAI ? 'text-purple-400 animate-pulse' : ''}`} />
                
                <span className="text-[13px] tracking-wide whitespace-nowrap">{item.name}</span>

                {/* Pro/AI Badge */}
                {isAI && (
                  <span className="ml-auto text-[9px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30 font-black uppercase">
                    Pro
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Profile Footer */}
        <div className="p-4 mt-auto shrink-0">
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 shadow-2xl backdrop-blur-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-[1px]">
                  <div className="w-full h-full rounded-xl bg-[#161920] flex items-center justify-center">
                    <User className="w-5 h-5 text-white/80" />
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-[3px] border-[#1a1d26] rounded-full"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black text-white truncate leading-none capitalize">
                  {user?.email?.split('@')[0] || 'Modern Agent'}
                </p>
                <p className="text-[10px] font-bold text-slate-600 truncate mt-1.5 uppercase tracking-tighter">
                  Enterprise Tier
                </p>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              className="w-full group flex items-center justify-center gap-2 px-4 py-2.5 text-[11px] font-black text-slate-500 hover:text-white bg-white/5 hover:bg-red-500/10 border border-white/5 hover:border-red-500/20 rounded-xl transition-all duration-300 uppercase tracking-widest"
            >
              <LogOut className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-[#0F1115] relative custom-scrollbar">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none" />
        
        <div className="relative min-h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

