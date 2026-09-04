import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  BookOpen, 
  Award, 
  UserCheck, 
  Users, 
  ShieldCheck 
} from 'lucide-react';

const MobileNav = () => {
  const { user, isStudent, isFaculty, isCompany, isAdmin } = useAuth();
  if (!user) return null;

  const getMobileItems = () => {
    if (isStudent) {
      return [
        { label: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
        { label: 'Catalog', path: '/student/internships', icon: Briefcase },
        { label: 'Track', path: '/student/applications', icon: FileText },
        { label: 'Logbook', path: '/student/logbooks', icon: BookOpen },
        { label: 'Cert', path: '/student/certificate', icon: Award }
      ];
    }
    if (isFaculty) {
      return [
        { label: 'Dashboard', path: '/faculty/dashboard', icon: LayoutDashboard },
        { label: 'Approvals', path: '/faculty/approvals', icon: UserCheck },
        { label: 'Roster', path: '/faculty/supervision', icon: Users },
        { label: 'Rubric', path: '/faculty/evaluations', icon: BookOpen }
      ];
    }
    if (isCompany) {
      return [
        { label: 'Dashboard', path: '/company/dashboard', icon: LayoutDashboard },
        { label: 'Post', path: '/company/post-internship', icon: Briefcase },
        { label: 'ATS', path: '/company/applicants', icon: Users }
      ];
    }
    if (isAdmin) {
      return [
        { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        { label: 'Users', path: '/admin/users', icon: Users },
        { label: 'Partners', path: '/admin/companies', icon: ShieldCheck }
      ];
    }
    return [];
  };

  const items = getMobileItems();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 px-2 py-2 flex items-center justify-around shadow-lg">
      {items.map((item) => {
        const IconComp = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 text-[10px] font-semibold py-1 px-2.5 rounded-lg transition ${
                isActive ? 'text-indigo-600 bg-indigo-50' : 'text-slate-500 hover:text-slate-900'
              }`
            }
          >
            <IconComp className="w-4 h-4" />
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </div>
  );
};

export default MobileNav;
