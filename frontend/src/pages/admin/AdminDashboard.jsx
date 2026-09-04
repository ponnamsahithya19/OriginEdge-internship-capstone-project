import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import StatusBadge from '../../components/common/StatusBadge';
import { PlacementRateChart, ApplicationStatusTrend } from '../../components/charts/AnalyticsCharts';
import { ShieldCheck, Users, Building2, Briefcase, Award, Activity, Download } from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/analytics/dashboard')
      .then((data) => {
        if (data.success) setAnalytics(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const summary = analytics?.summary || {
    totalStudents: 3,
    totalCompanies: 3,
    activeInternships: 5,
    totalApplications: 4,
    completedInternships: 1,
    placementRate: 88
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-heading">
            University System Administration
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Administrator: <span className="font-semibold text-slate-700">{user?.full_name || 'Dr. Arthur Pendelton'}</span> • Academic Year: 2026
          </p>
        </div>

        <button onClick={() => alert('Exporting Placement Report CSV...')} className="btn-primary text-xs shadow-sm">
          <Download className="w-4 h-4" />
          <span>Export Placement Report</span>
        </button>
      </div>

      {/* Operational KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card-surface p-5">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">PLACEMENT COMPLIANCE</div>
          <div className="text-2xl font-extrabold text-emerald-600 tracking-tight font-heading">{summary.placementRate}%</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">+4.2% from last cycle</div>
        </div>

        <div className="card-surface p-5">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">ACTIVE INTERNSHIPS</div>
          <div className="text-2xl font-extrabold text-slate-900 tracking-tight font-heading">{summary.activeInternships}</div>
          <div className="text-[11px] text-slate-500 mt-1">Across 5 Corporate Partners</div>
        </div>

        <div className="card-surface p-5">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">VERIFIED COMPANIES</div>
          <div className="text-2xl font-extrabold text-slate-900 tracking-tight font-heading">{summary.totalCompanies}</div>
          <div className="text-[11px] text-indigo-600 font-semibold mt-1">Partner Tier Verified</div>
        </div>

        <div className="card-surface p-5">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">ENROLLED STUDENTS</div>
          <div className="text-2xl font-extrabold text-slate-900 tracking-tight font-heading">{summary.totalStudents}</div>
          <div className="text-[11px] text-slate-500 mt-1">Under Supervision</div>
        </div>
      </div>

      {/* Analytics Charts Grid (Section 31) */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card-surface p-6">
          <h2 className="text-sm font-bold text-slate-900 mb-1">Placement Rate Breakdown</h2>
          <p className="text-xs text-slate-500 mb-4">Ratio of placed students vs candidates in evaluation phase.</p>
          <PlacementRateChart />
        </div>

        <div className="card-surface p-6">
          <h2 className="text-sm font-bold text-slate-900 mb-1">Application Pipeline Volume</h2>
          <p className="text-xs text-slate-500 mb-4">Stage breakdown across academic departments.</p>
          <ApplicationStatusTrend />
        </div>
      </div>

      {/* Audit Stream Table */}
      <div className="card-surface p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-indigo-600" />
            <h2 className="text-sm font-bold text-slate-900">Security Audit Logs Stream</h2>
          </div>
          <span className="text-xs text-slate-500">Real-time Operations Audit</span>
        </div>

        <div className="space-y-2 text-xs">
          {(analytics?.auditLogs || [
            { id: 1, action: 'SYSTEM_INIT', details: 'Database seeded with default enterprise users.', created_at: '2026-09-04 10:00' },
            { id: 2, action: 'INTERNSHIP_CREATED', details: 'TechCorp Solutions posted Full-Stack Software Engineering position.', created_at: '2026-09-04 10:15' },
            { id: 3, action: 'APPLICATION_SUBMITTED', details: 'Alex Johnson applied for Full-Stack Software Engineering position.', created_at: '2026-09-04 10:30' }
          ]).map((log) => (
            <div key={log.id} className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-semibold font-mono text-[11px]">
                  {log.action}
                </span>
                <span className="text-slate-800">{log.details}</span>
              </div>
              <span className="text-slate-400 text-[11px] font-mono">{log.created_at}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
