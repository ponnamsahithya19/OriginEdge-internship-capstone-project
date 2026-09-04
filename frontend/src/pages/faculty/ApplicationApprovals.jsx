import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/common/Modal';
import { UserCheck, Check, X, FileText, ExternalLink } from 'lucide-react';

const ApplicationApprovals = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [remarks, setRemarks] = useState('');
  const [processing, setProcessing] = useState(false);

  const fetchApplications = () => {
    setLoading(true);
    api.get('/applications')
      .then((data) => {
        if (data.success) setApplications(data.applications || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleDecision = async (status) => {
    if (!selectedApp) return;
    setProcessing(true);

    try {
      const res = await api.put(`/applications/${selectedApp.id}/status`, {
        status,
        faculty_remarks: remarks || (status === 'FACULTY_APPROVED' ? 'Approved for industrial credit.' : 'Application rejected due to CGPA requirements.')
      });

      if (res.success) {
        setSelectedApp(null);
        setRemarks('');
        fetchApplications();
      }
    } catch (err) {
      alert(err.message || 'Error updating status');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Faculty Application Approvals</h1>
        <p className="text-xs text-slate-400">Review student eligibility, academic standing, and grant NOC approvals.</p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400 text-xs">Loading application review queue...</div>
      ) : applications.length === 0 ? (
        <div className="glass-panel p-12 text-center text-slate-400 text-xs">
          No applications found.
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="glass-panel p-5 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-base font-bold text-white">{app.student_name}</h3>
                  <span className="text-xs font-mono text-indigo-400 font-bold bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/30">
                    {app.roll_number}
                  </span>
                  <StatusBadge status={app.status} />
                </div>
                <div className="text-xs text-slate-300 flex items-center gap-2">
                  <span>Applied for: <strong className="text-white">{app.internship_title}</strong></span>
                  <span>•</span>
                  <span>Company: <strong className="text-emerald-400">{app.company_name}</strong></span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Branch: {app.branch} | CGPA: <strong className="text-amber-400">{app.cgpa}</strong> | Skills: {app.student_skills || 'React, Node'}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setSelectedApp(app); setRemarks(app.faculty_remarks || ''); }}
                  className="btn-primary text-xs py-2"
                >
                  Review & Approve
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Review Modal */}
      <Modal
        isOpen={!!selectedApp}
        onClose={() => setSelectedApp(null)}
        title={`Faculty Approval Decision: ${selectedApp?.student_name}`}
      >
        {selectedApp && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
              <div><strong className="text-slate-300">Student:</strong> {selectedApp.student_name} ({selectedApp.roll_number})</div>
              <div><strong className="text-slate-300">CGPA:</strong> {selectedApp.cgpa} / 4.00</div>
              <div><strong className="text-slate-300">Position:</strong> {selectedApp.internship_title} at {selectedApp.company_name}</div>
              <div><strong className="text-slate-300">Cover Letter:</strong> "{selectedApp.cover_letter || 'No cover letter'}"</div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Faculty Coordinator Remarks</label>
              <textarea
                rows={3}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Enter evaluation remarks or NOC conditions..."
                className="input-field resize-none"
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => handleDecision('FACULTY_APPROVED')}
                disabled={processing}
                className="btn-success text-xs py-2.5 flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Grant Faculty Approval</span>
              </button>

              <button
                onClick={() => handleDecision('FACULTY_REJECTED')}
                disabled={processing}
                className="btn-danger text-xs py-2.5 flex items-center justify-center gap-1.5"
              >
                <X className="w-4 h-4" />
                <span>Reject Application</span>
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ApplicationApprovals;
