import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import StatusBadge from '../../components/common/StatusBadge';
import { FileText, CheckCircle2, Clock, Building2, UserCheck, Award, ExternalLink, ChevronRight } from 'lucide-react';

const ApplicationTracker = () => {
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

  const timelineStages = [
    { key: 'SUBMITTED', title: 'Application Submitted', desc: 'Cover letter and profile sent' },
    { key: 'FACULTY_APPROVED', title: 'Faculty Review', desc: 'Department coordinator NOC signoff' },
    { key: 'COMPANY_SELECTED', title: 'Company Review & Shortlist', desc: 'Corporate mentor interview selection' },
    { key: 'COMPLETED', title: 'Allocated & Completed', desc: 'Credit evaluation and certificate issued' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-heading">
          Application Tracking & Approval Matrix
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Track stage-by-stage progression from faculty NOC verification to corporate offer allocation.
        </p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2].map(n => <div key={n} className="card-surface p-6 h-48 skeleton"></div>)}
        </div>
      ) : applications.length === 0 ? (
        <div className="card-surface p-12 text-center text-slate-500 text-xs">
          No active applications. Browse open internships to get started!
        </div>
      ) : (
        <div className="space-y-6">
          {applications.map((app) => (
            <div key={app.id} className="card-surface p-6 space-y-6">
              {/* Header Details */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <img src={app.logo_url} alt={app.company_name} className="w-12 h-12 rounded-xl object-cover border border-slate-200" />
                  <div>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">{app.internship_title}</h3>
                    <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                      <span className="font-semibold text-slate-700">{app.company_name}</span>
                      <span>•</span>
                      <span className="text-indigo-600 font-medium">{app.domain}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <StatusBadge status={app.status} />
                  <span className="text-xs font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
                    ${app.stipend_monthly} / mo
                  </span>
                </div>
              </div>

              {/* Multi-Stage Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {timelineStages.map((stage, idx) => {
                  let isComplete = false;
                  if (stage.key === 'SUBMITTED') isComplete = true;
                  if (stage.key === 'FACULTY_APPROVED' && app.status !== 'FACULTY_PENDING' && app.status !== 'FACULTY_REJECTED') isComplete = true;
                  if (stage.key === 'COMPANY_SELECTED' && (app.status === 'COMPANY_SELECTED' || app.status === 'COMPLETED')) isComplete = true;
                  if (stage.key === 'COMPLETED' && app.status === 'COMPLETED') isComplete = true;

                  return (
                    <div key={stage.key} className={`p-3.5 rounded-xl border text-xs relative ${
                      isComplete ? 'bg-indigo-50/50 border-indigo-200' : 'bg-slate-50 border-slate-200 opacity-60'
                    }`}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isComplete ? 'bg-indigo-600 text-white' : 'bg-slate-300 text-slate-600'
                        }`}>
                          {idx + 1}
                        </span>
                        {isComplete && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />}
                      </div>
                      <div className="font-bold text-slate-900">{stage.title}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{stage.desc}</div>
                    </div>
                  );
                })}
              </div>

              {/* Feedback Remarks */}
              <div className="grid md:grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <span className="font-semibold text-slate-900 block mb-1">Faculty Coordinator Remarks:</span>
                  <p className="text-slate-600">{app.faculty_remarks || 'Pending coordinator NOC review.'}</p>
                </div>
                <div>
                  <span className="font-semibold text-slate-900 block mb-1">Company Mentor Feedback:</span>
                  <p className="text-slate-600">{app.company_remarks || 'Candidate in screening evaluation.'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicationTracker;
