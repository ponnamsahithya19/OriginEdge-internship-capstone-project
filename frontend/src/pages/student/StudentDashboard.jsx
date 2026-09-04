import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import StatusBadge from '../../components/common/StatusBadge';
import { 
  Briefcase, 
  FileText, 
  BookOpen, 
  Award, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/applications')
      .then((data) => {
        if (data.success) setApplications(data.applications || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const completedApp = applications.find(a => a.status === 'COMPLETED');

  return (
    <div className="space-y-6">
      {/* Header Greeting & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-heading">
            Good morning, {user?.full_name?.split(' ')[0] || 'Alex'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Roll Number: <span className="font-semibold text-slate-700">{user?.profile?.roll_number || '2023-CS-042'}</span> • Department: <span className="font-semibold text-slate-700">{user?.profile?.branch || 'Computer Science & Eng'}</span> • CGPA: <span className="font-bold text-indigo-600">{user?.profile?.cgpa || '3.88'}</span>
          </p>
        </div>

        <Link to="/student/internships" className="btn-primary text-xs shadow-sm">
          <Briefcase className="w-4 h-4" />
          <span>+ Find Internship</span>
        </Link>
      </div>

      {/* Profile Completion Bar */}
      <div className="card-surface p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs flex-shrink-0">
            84%
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">Profile & Skill Rating (84% Complete)</div>
            <div className="text-[11px] text-slate-500">Upload your latest resume to reach 100% profile score</div>
          </div>
        </div>
        <div className="w-full sm:w-48 h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-indigo-600 rounded-full" style={{ width: '84%' }}></div>
        </div>
      </div>

      {/* 4 Restrained KPI Blocks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card-surface p-5">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">ACTIVE APPLICATION</div>
          <div className="text-2xl font-extrabold text-slate-900 tracking-tight font-heading">1</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Selected by TechCorp
          </div>
        </div>

        <div className="card-surface p-5">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">APPLICATIONS SUBMITTED</div>
          <div className="text-2xl font-extrabold text-slate-900 tracking-tight font-heading">{applications.length || 4}</div>
          <div className="text-[11px] text-slate-500 mt-1">2 Faculty Reviews Pending</div>
        </div>

        <div className="card-surface p-5">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">VERIFIED LOGBOOKS</div>
          <div className="text-2xl font-extrabold text-slate-900 tracking-tight font-heading">4</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">160 Hours Logged</div>
        </div>

        <div className="card-surface p-5">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">CREDIT STATUS</div>
          <div className="text-2xl font-extrabold text-slate-900 tracking-tight font-heading">{completedApp ? 'Issued' : 'In Progress'}</div>
          <div className="text-[11px] text-indigo-600 font-semibold mt-1">12 Academic Credits</div>
        </div>
      </div>

      {/* AI Match Spotlight Card */}
      <div className="card-surface p-6 bg-gradient-to-r from-indigo-900 to-slate-900 text-white border-none">
        <div className="flex items-center justify-between mb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>AI Career Match Spotlight</span>
          </div>
          <span className="text-xl font-extrabold text-emerald-400 font-heading">92% Match</span>
        </div>

        <h2 className="text-lg font-bold mb-1">Full-Stack Software Engineering Intern</h2>
        <p className="text-xs text-slate-300 mb-4 max-w-2xl leading-relaxed">
          Matches your strong proficiency in React, Node.js Express, and MySQL. Skill gap detected: Docker containerization.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <Link to="/student/internships" className="btn-primary text-xs bg-indigo-600 border-indigo-500">
            View Role & Apply
          </Link>
          <Link to="/student/ai-insights" className="text-xs text-indigo-300 hover:text-white font-semibold flex items-center gap-1">
            See Full AI Insights →
          </Link>
        </div>
      </div>

      {/* Recent Applications Table */}
      <div className="card-surface overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">Recent Applications</h2>
          <Link to="/student/applications" className="text-xs text-indigo-600 font-semibold hover:underline flex items-center gap-1">
            View All <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <table className="enterprise-table">
          <thead>
            <tr>
              <th>Position & Company</th>
              <th>Domain</th>
              <th>Stipend</th>
              <th>Submitted</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.slice(0, 3).map((app) => (
              <tr key={app.id}>
                <td>
                  <div className="font-bold text-slate-900">{app.internship_title}</div>
                  <div className="text-xs text-slate-500">{app.company_name}</div>
                </td>
                <td>{app.domain}</td>
                <td className="font-semibold text-slate-900">${app.stipend_monthly} / mo</td>
                <td className="text-slate-500 text-xs">{app.submitted_at?.split('T')[0] || '2026-08-15'}</td>
                <td>
                  <StatusBadge status={app.status} />
                </td>
                <td>
                  <Link to="/student/applications" className="btn-tertiary text-xs">
                    Track Status
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentDashboard;
