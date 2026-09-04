import React, { useState } from 'react';
import StatusBadge from '../../components/common/StatusBadge';
import { Users, MoreVertical, Search, Filter } from 'lucide-react';

const UserManagement = () => {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [activeMenuId, setActiveMenuId] = useState(null);

  const [users] = useState([
    { id: 1, name: 'Dr. Arthur Pendelton', email: 'admin@university.edu', role: 'ADMIN', department: "Dean's Office", status: 'ACTIVE', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150' },
    { id: 2, name: 'Prof. Rajesh Sharma', email: 'prof.sharma@university.edu', role: 'FACULTY', department: 'Computer Science & Eng', status: 'ACTIVE', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
    { id: 3, name: 'Dr. Meera Patel', email: 'dr.patel@university.edu', role: 'FACULTY', department: 'Electronics & Comm', status: 'ACTIVE', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150' },
    { id: 4, name: 'Elena Rostova (TechCorp)', email: 'hr@techcorp.com', role: 'COMPANY', department: 'Corporate Relations', status: 'ACTIVE', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150' },
    { id: 5, name: 'Marcus Vance (InnovateLabs)', email: 'careers@innovatelabs.io', role: 'COMPANY', department: 'Talent Acquisition', status: 'ACTIVE', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
    { id: 7, name: 'Alex Johnson', email: 'alex.student@university.edu', role: 'STUDENT', department: 'Computer Science & Eng', status: 'ACTIVE', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150' },
    { id: 8, name: 'Sarah Jenkins', email: 'sarah.student@university.edu', role: 'STUDENT', department: 'Electronics & Comm', status: 'ACTIVE', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' }
  ]);

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = !roleFilter || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-heading">
          University User & Role Management
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Enterprise user directory across Students, Faculty, Companies, and Administrators.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="card-surface p-3 flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name or email address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input pl-9"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="form-input text-xs w-full sm:w-48"
        >
          <option value="">All Roles</option>
          <option value="STUDENT">Students</option>
          <option value="FACULTY">Faculty</option>
          <option value="COMPANY">Companies</option>
          <option value="ADMIN">Administrators</option>
        </select>
      </div>

      {/* Enterprise Data Table with Three-Dot Actions Menu (Section 15) */}
      <div className="card-surface overflow-hidden">
        <table className="enterprise-table">
          <thead>
            <tr>
              <th>User Details</th>
              <th>Role</th>
              <th>Department / Organization</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover border border-slate-200" />
                    <div>
                      <div className="font-bold text-slate-900">{u.name}</div>
                      <div className="text-[11px] text-slate-500">{u.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200">
                    {u.role}
                  </span>
                </td>
                <td className="text-slate-600">{u.department}</td>
                <td>
                  <StatusBadge status={u.status} />
                </td>
                <td className="text-right relative">
                  <button
                    onClick={() => setActiveMenuId(activeMenuId === u.id ? null : u.id)}
                    className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  {activeMenuId === u.id && (
                    <div className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg border border-slate-200 p-1 z-50 text-xs text-left animate-fade-in">
                      <button onClick={() => alert(`Editing user ${u.name}`)} className="w-full text-left px-3 py-1.5 rounded text-slate-700 hover:bg-slate-50">
                        Edit Profile
                      </button>
                      <button onClick={() => alert(`Resetting password for ${u.name}`)} className="w-full text-left px-3 py-1.5 rounded text-slate-700 hover:bg-slate-50">
                        Reset Password
                      </button>
                      <button onClick={() => alert(`Deactivating ${u.name}`)} className="w-full text-left px-3 py-1.5 rounded text-red-600 hover:bg-red-50 font-semibold">
                        Suspend User
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
