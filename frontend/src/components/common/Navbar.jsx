import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Search, 
  Bell, 
  ChevronDown, 
  LogOut, 
  User, 
  Settings, 
  Sparkles,
  Shield,
  UserCheck,
  Building2,
  BookOpen
} from 'lucide-react';

const Navbar = () => {
  const { user, logout, login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showDemoMenu, setShowDemoMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Compute breadcrumb path
  const getBreadcrumbs = () => {
    const path = location.pathname;
    if (path.includes('/student/dashboard')) return ['Overview', 'Student Dashboard'];
    if (path.includes('/student/internships')) return ['Workspace', 'Explore Internships'];
    if (path.includes('/student/applications')) return ['Workspace', 'Application Tracker'];
    if (path.includes('/student/logbooks')) return ['Tracking', 'Weekly Reports'];
    if (path.includes('/student/attendance')) return ['Tracking', 'Attendance Calendar'];
    if (path.includes('/student/documents')) return ['Tracking', 'Document Center'];
    if (path.includes('/student/ai-insights')) return ['Insights', 'AI Career Insights'];
    if (path.includes('/student/certificate')) return ['Tracking', 'Digital Certificate'];

    if (path.includes('/faculty/dashboard')) return ['Overview', 'Faculty Supervision'];
    if (path.includes('/faculty/approvals')) return ['Workspace', 'Application Approvals'];
    if (path.includes('/faculty/evaluations')) return ['Tracking', 'Rubric Evaluation Matrix'];

    if (path.includes('/company/dashboard')) return ['Overview', 'Recruitment Dashboard'];
    if (path.includes('/company/post-internship')) return ['Workspace', 'Post Internship'];
    if (path.includes('/company/applicants')) return ['Workspace', 'Applicant ATS Pipeline'];

    if (path.includes('/admin/dashboard')) return ['Overview', 'System Administration'];
    if (path.includes('/admin/users')) return ['System', 'User Management'];
    if (path.includes('/admin/companies')) return ['System', 'Company Verification'];

    return ['Overview', 'Dashboard'];
  };

  const breadcrumbs = getBreadcrumbs();

  const demoAccounts = [
    { label: 'Student Portal (Alex)', email: 'alex.student@university.edu', role: 'STUDENT', icon: BookOpen },
    { label: 'Faculty Coordinator (Prof. Sharma)', email: 'prof.sharma@university.edu', role: 'FACULTY', icon: UserCheck },
    { label: 'Company HR (TechCorp)', email: 'hr@techcorp.com', role: 'COMPANY', icon: Building2 },
    { label: 'Master Admin (Dr. Pendelton)', email: 'admin@university.edu', role: 'ADMIN', icon: Shield }
  ];

  const handleDemoSwitch = async (email) => {
    try {
      await login(email, 'Password123!');
      setShowDemoMenu(false);
      navigate('/dashboard');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <span>{breadcrumbs[0]}</span>
        <span>/</span>
        <span className="text-slate-900 font-semibold">{breadcrumbs[1]}</span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Global Search Bar */}
        <div className="relative hidden sm:block w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search internships, students... (⌘K)"
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
          />
        </div>

        {/* Demo Role Switcher Pill */}
        <div className="relative">
          <button
            onClick={() => setShowDemoMenu(!showDemoMenu)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-lg text-xs font-semibold hover:bg-indigo-100 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Role Switcher</span>
            <ChevronDown className="w-3 h-3 text-indigo-500" />
          </button>

          {showDemoMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-200 p-1.5 z-50 animate-fade-in">
              <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
                Switch Portal Instantly
              </div>
              {demoAccounts.map((acc) => {
                const IconComp = acc.icon;
                return (
                  <button
                    key={acc.email}
                    onClick={() => handleDemoSwitch(acc.email)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between hover:bg-slate-50 transition ${
                      user?.email === acc.email ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <IconComp className="w-4 h-4 text-slate-500" />
                      <span>{acc.label}</span>
                    </div>
                    {user?.email === acc.email && <span className="w-2 h-2 rounded-full bg-indigo-600"></span>}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Notifications Bell */}
        <button className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full"></span>
        </button>

        {/* User Profile Menu */}
        {user && (
          <div className="relative border-l border-slate-200 pl-4">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 focus:outline-none"
            >
              <img
                src={user.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                alt={user.full_name}
                className="w-8 h-8 rounded-full object-cover border border-slate-200"
              />
              <div className="text-left hidden md:block">
                <div className="text-xs font-semibold text-slate-900 leading-tight">{user.full_name}</div>
                <div className="text-[10px] text-slate-500 font-medium leading-tight">{user.role}</div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 p-1.5 z-50 animate-fade-in text-xs">
                <div className="px-3 py-2 border-b border-slate-100 mb-1">
                  <div className="font-semibold text-slate-900">{user.full_name}</div>
                  <div className="text-[11px] text-slate-500">{user.email}</div>
                </div>
                <button
                  onClick={() => { logout(); navigate('/login'); }}
                  className="w-full text-left px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium transition"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
