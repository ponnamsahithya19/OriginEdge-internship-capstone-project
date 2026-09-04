import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/common/Modal';
import { Users, Check, X, FileText, CheckCircle2 } from 'lucide-react';

const ApplicantATS = () => {
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
        company_remarks: remarks || (status === 'COMPANY_SELECTED' ? 'Candidate selected following technical interview round.' : 'Not selected for current intake.')
      });

      if (res.success) {
        setSelectedApp(null);
        setRemarks('');
        fetchApplications();
      }
    } catch (err) {
      alert(err.message || 'Error updating candidate status');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Applicant Tracking System (ATS)</h1>
        <p className="text-xs text-slate-400">Evaluate candidates, review resumes, and issue internship offers.</p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400 text-xs">Loading candidate applications...</div>
      ) : applications.length === 0 ? (
        <div className="glass-panel p-12 text-center text-slate-400 text-xs">
          No candidate applications received yet.
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
                <div className="text-xs text-slate-300">
                  Target Role: <strong className="text-white">{app.internship_title}</strong>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  CGPA: <strong className="text-emerald-400">{app.cgpa}</strong> | Branch: {app.branch} | Email: {app.student_email}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setSelectedApp(app); setRemarks(app.company_remarks || ''); }}
                  className="btn-primary text-xs py-2"
                >
                  Manage Candidate
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Candidate Decision Modal */}
      <Modal
        isOpen={!!selectedApp}
        onClose={() => setSelectedApp(null)}
        title={`ATS Evaluation: ${selectedApp?.student_name}`}
      >
        {selectedApp && (
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div><strong className="text-slate-300">Student Name:</strong> {selectedApp.student_name}</div>
              <div><strong className="text-slate-300">Email:</strong> {selectedApp.student_email}</div>
              <div><strong className="text-slate-300">CGPA:</strong> {selectedApp.cgpa}</div>
              <div><strong className="text-slate-300">Statement:</strong> "{selectedApp.cover_letter}"</div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Company / Mentor Feedback Remarks</label>
              <textarea
                rows={3}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Enter interview feedback or offer terms..."
                className="input-field resize-none"
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => handleDecision('COMPANY_SELECTED')}
                disabled={processing}
                className="btn-success text-xs py-2.5 flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Issue Internship Offer</span>
              </button>

              <button
                onClick={() => handleDecision('COMPANY_REJECTED')}
                disabled={processing}
                className="btn-danger text-xs py-2.5 flex items-center justify-center gap-1.5"
              >
                <X className="w-4 h-4" />
                <span>Decline Candidate</span>
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ApplicantATS;
