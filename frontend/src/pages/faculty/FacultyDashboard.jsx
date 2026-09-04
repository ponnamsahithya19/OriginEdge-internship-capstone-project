import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import StatusBadge from '../../components/common/StatusBadge';
import { UserCheck, Users, FileText, CheckCircle2, AlertTriangle, ChevronRight, Eye } from 'lucide-react';

const FacultyDashboard = () => {
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

  const pendingApps = applications.filter(a => a.status === 'FACULTY_PENDING');

  return (
    <div className="space-y-6">
      {/* Header Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-heading">
            Faculty Supervision Dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Coordinator: <span className="font-semibold text-slate-700">{user?.full_name || 'Prof. Rajesh Sharma'}</span> • Department: <span className="font-semibold text-slate-700">{user?.department || 'Computer Science & Eng'}</span>
          </p>
        </div>

        <Link to="/faculty/approvals" className="btn-primary text-xs shadow-sm">
          <UserCheck className="w-4 h-4" />
          <span>Review Approvals ({pendingApps.length})</span>
        </Link>
      </div>

      {/* 5 KPI Blocks (Section 29) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="card-surface p-4">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">SUPERVISED STUDENTS</div>
          <div className="text-2xl font-extrabold text-slate-900 tracking-tight font-heading">12</div>
          <div className="text-[11px] text-slate-500 mt-1">CS & Eng Batch 2026</div>
        </div>

        <div className="card-surface p-4">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">PENDING APPROVALS</div>
          <div className="text-2xl font-extrabold text-amber-600 tracking-tight font-heading">{pendingApps.length || 3}</div>
          <div className="text-[11px] text-amber-700 font-semibold mt-1">NOC signoff required</div>
        </div>

        <div className="card-surface p-4">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">REPORTS TO REVIEW</div>
          <div className="text-2xl font-extrabold text-slate-900 tracking-tight font-heading">5</div>
          <div className="text-[11px] text-indigo-600 font-semibold mt-1">Weekly logbooks</div>
        </div>

        <div className="card-surface p-4">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">ATTENDANCE ALERTS</div>
          <div className="text-2xl font-extrabold text-red-600 tracking-tight font-heading">1</div>
          <div className="text-[11px] text-red-600 font-semibold mt-1">1 student &lt; 85%</div>
        </div>

        <div className="card-surface p-4">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">EVALUATIONS PENDING</div>
          <div className="text-2xl font-extrabold text-slate-900 tracking-tight font-heading">2</div>
          <div className="text-[11px] text-slate-500 mt-1">Final credit grading</div>
        </div>
      </div>

      {/* Student Supervision Monitoring Table */}
      <div className="card-surface overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">Student Internship Supervision Roster</h2>
          <span className="text-xs text-slate-500 font-medium">12 Active Interns</span>
        </div>

        <table className="enterprise-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Roll Number</th>
              <th>Internship Position</th>
              <th>Company</th>
              <th>Progress</th>
              <th>Attendance</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td>
                  <div className="font-bold text-slate-900">{app.student_name}</div>
                  <div className="text-[11px] text-slate-500">{app.branch}</div>
                </td>
                <td className="font-mono text-xs font-semibold text-slate-700">{app.roll_number}</td>
                <td className="font-semibold text-slate-900">{app.internship_title}</td>
                <td className="text-slate-600">{app.company_name}</td>
                <td>
                  <div className="w-24 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-indigo-600 h-full rounded-full" style={{ width: app.status === 'COMPLETED' ? '100%' : '65%' }}></div>
                  </div>
                </td>
                <td className="font-bold text-emerald-700">94%</td>
                <td>
                  <StatusBadge status={app.status} />
                </td>
                <td>
                  <Link to="/faculty/approvals" className="btn-tertiary text-xs">
                    Review
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

export default FacultyDashboard;
