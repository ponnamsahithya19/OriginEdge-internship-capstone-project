import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import StatusBadge from '../../components/common/StatusBadge';
import { Building2, Plus, Users, Briefcase, CheckCircle2, ChevronRight } from 'lucide-react';

const CompanyDashboard = () => {
  const { user } = useAuth();
  const [internships, setInternships] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/internships'),
      api.get('/applications')
    ]).then(([intRes, appRes]) => {
      if (intRes.success) setInternships(intRes.internships || []);
      if (appRes.success) setApplications(appRes.applications || []);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const companyInternships = internships.filter(i => i.company_name === 'TechCorp Solutions' || i.company_id === 1);
  const selectedApplicants = applications.filter(a => a.status === 'COMPANY_SELECTED' || a.status === 'COMPLETED');

  // Kanban Pipeline Breakdown (Section 28)
  const pipelineStages = [
    { name: 'Applied', count: applications.length || 4, color: 'border-t-indigo-600' },
    { name: 'Screening', count: 2, color: 'border-t-blue-600' },
    { name: 'Shortlisted', count: 1, color: 'border-t-amber-500' },
    { name: 'Selected / Hired', count: selectedApplicants.length || 2, color: 'border-t-emerald-600' }
  ];

  return (
    <div className="space-y-6">
      {/* Header & CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-heading">
            Corporate Recruitment Dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Organization: <span className="font-semibold text-slate-700">{user?.profile?.company_name || 'TechCorp Solutions'}</span> • Representative: <span className="font-semibold text-slate-700">{user?.full_name || 'Elena Rostova'}</span>
          </p>
        </div>

        <Link to="/company/post-internship" className="btn-primary text-xs shadow-sm">
          <Plus className="w-4 h-4" />
          <span>+ Post Internship Position</span>
        </Link>
      </div>

      {/* 4 KPI Blocks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card-surface p-5">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">ACTIVE INTERNSHIPS</div>
          <div className="text-2xl font-extrabold text-slate-900 tracking-tight font-heading">{companyInternships.length || 2}</div>
          <div className="text-[11px] text-slate-500 mt-1">4 Total Open Slots</div>
        </div>

        <div className="card-surface p-5">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">TOTAL APPLICANTS</div>
          <div className="text-2xl font-extrabold text-slate-900 tracking-tight font-heading">{applications.length || 4}</div>
          <div className="text-[11px] text-indigo-600 font-semibold mt-1">From CS & ECE Departments</div>
        </div>

        <div className="card-surface p-5">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">SHORTLISTED CANDIDATES</div>
          <div className="text-2xl font-extrabold text-slate-900 tracking-tight font-heading">2</div>
          <div className="text-[11px] text-amber-600 font-semibold mt-1">Interviews Scheduled</div>
        </div>

        <div className="card-surface p-5">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">SELECTED INTERNS</div>
          <div className="text-2xl font-extrabold text-emerald-600 tracking-tight font-heading">{selectedApplicants.length || 2}</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">Offers Accepted</div>
        </div>
      </div>

      {/* Kanban-Style Applicant Pipeline Summary (Section 28) */}
      <div className="card-surface p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-sm font-bold text-slate-900">Recruitment Candidate Pipeline</h2>
          <Link to="/company/applicants" className="text-xs text-indigo-600 font-semibold hover:underline flex items-center gap-1">
            Open ATS Pipeline <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pipelineStages.map((stage) => (
            <div key={stage.name} className={`card-surface p-4 border-t-4 ${stage.color} bg-slate-50/50`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700">{stage.name}</span>
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-bold text-[11px] flex items-center justify-center">
                  {stage.count}
                </span>
              </div>
              <div className="text-[11px] text-slate-500">Candidates in stage</div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Positions Table */}
      <div className="card-surface overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">Active Internship Openings</h2>
          <Link to="/company/post-internship" className="text-xs text-indigo-600 font-semibold hover:underline">
            + Add Position
          </Link>
        </div>

        <table className="enterprise-table">
          <thead>
            <tr>
              <th>Position Title</th>
              <th>Domain</th>
              <th>Location</th>
              <th>Stipend</th>
              <th>Slots</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {companyInternships.map((job) => (
              <tr key={job.id}>
                <td className="font-bold text-slate-900">{job.title}</td>
                <td className="text-slate-600">{job.domain}</td>
                <td className="text-slate-600">{job.location}</td>
                <td className="font-semibold text-slate-900">${job.stipend_monthly} / mo</td>
                <td className="text-slate-600">{job.slots} Openings</td>
                <td>
                  <StatusBadge status={job.status} />
                </td>
                <td>
                  <Link to="/company/applicants" className="btn-tertiary text-xs">
                    View Applicants
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

export default CompanyDashboard;
