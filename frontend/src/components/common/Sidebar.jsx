import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  BookOpen, 
  Calendar, 
  FolderCheck, 
  Sparkles, 
  Award, 
  UserCheck, 
  Users, 
  CheckSquare, 
  Building2, 
  PlusSquare, 
  Shield, 
  BarChart2, 
  ShieldCheck
} from 'lucide-react';

const Sidebar = () => {
  const { user, isStudent, isFaculty, isCompany, isAdmin } = useAuth();

  const getNavGroups = () => {
    if (isStudent) {
      return [
        {
          group: 'OVERVIEW',
          items: [
            { label: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard }
          ]
        },
        {
          group: 'WORKSPACE',
          items: [
            { label: 'Explore Internships', path: '/student/internships', icon: Briefcase },
            { label: 'Application Tracker', path: '/student/applications', icon: FileText }
          ]
        },
        {
          group: 'TRACKING',
          items: [
            { label: 'Weekly Reports', path: '/student/logbooks', icon: BookOpen },
            { label: 'Attendance Calendar', path: '/student/attendance', icon: Calendar },
            { label: 'Document Center', path: '/student/documents', icon: FolderCheck },
            { label: 'Digital Certificate', path: '/student/certificate', icon: Award }
          ]
        },
        {
          group: 'INSIGHTS',
          items: [
            { label: 'AI Career Insights', path: '/student/ai-insights', icon: Sparkles }
          ]
        }
      ];
    }
    if (isFaculty) {
      return [
        {
          group: 'OVERVIEW',
          items: [
            { label: 'Supervision Overview', path: '/faculty/dashboard', icon: LayoutDashboard }
          ]
        },
        {
          group: 'WORKSPACE',
          items: [
            { label: 'Application Approvals', path: '/faculty/approvals', icon: UserCheck },
            { label: 'Students Roster', path: '/faculty/supervision', icon: Users }
          ]
        },
        {
          group: 'TRACKING',
          items: [
            { label: 'Evaluation Matrix', path: '/faculty/evaluations', icon: CheckSquare }
          ]
        }
      ];
    }
    if (isCompany) {
      return [
        {
          group: 'OVERVIEW',
          items: [
            { label: 'Recruitment Overview', path: '/company/dashboard', icon: LayoutDashboard }
          ]
        },
        {
          group: 'WORKSPACE',
          items: [
            { label: 'Post New Internship', path: '/company/post-internship', icon: PlusSquare },
            { label: 'Applicant ATS Pipeline', path: '/company/applicants', icon: Users }
          ]
        }
      ];
    }
    if (isAdmin) {
      return [
        {
          group: 'OVERVIEW',
          items: [
            { label: 'System Overview', path: '/admin/dashboard', icon: LayoutDashboard }
          ]
        },
        {
          group: 'SYSTEM',
          items: [
            { label: 'User Management', path: '/admin/users', icon: Users },
            { label: 'Company Verification', path: '/admin/companies', icon: ShieldCheck },
            { label: 'Placement Analytics', path: '/admin/analytics', icon: BarChart2 }
          ]
        }
      ];
    }
    return [];
  };

  const navGroups = getNavGroups();

  return (
    <aside className="w-60 bg-white border-r border-slate-200 min-h-[calc(100vh-64px)] p-4 hidden md:block flex-shrink-0">
      {/* Brand Mark */}
      <Link to="/" className="flex items-center gap-2.5 px-2 mb-6">
        <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
          IF
        </div>
        <span className="font-extrabold text-base tracking-tight text-slate-900">InternFlow</span>
        <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono font-semibold">v2.4</span>
      </Link>

      {/* Logical Nav Groups */}
      <nav className="space-y-5">
        {navGroups.map((group) => (
          <div key={group.group}>
            <div className="px-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              {group.group}
            </div>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const IconComp = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs transition ${
                        isActive
                          ? 'bg-indigo-50 text-indigo-700 font-semibold border-r-2 border-indigo-600'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`
                    }
                  >
                    <IconComp className="w-4 h-4 text-slate-500" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
