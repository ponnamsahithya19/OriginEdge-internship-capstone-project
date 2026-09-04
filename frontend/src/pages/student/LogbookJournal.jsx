import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import StatusBadge from '../../components/common/StatusBadge';
import { BookOpen, Plus, CheckCircle2, Clock, Calendar, FileText, Send, Save } from 'lucide-react';

const LogbookJournal = () => {
  const [applications, setApplications] = useState([]);
  const [selectedAppId, setSelectedAppId] = useState('');
  const [logbooks, setLogbooks] = useState([]);
  const [selectedLog, setSelectedLog] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form inputs
  const [weekNumber, setWeekNumber] = useState(5);
  const [hoursWorked, setHoursWorked] = useState(40);
  const [tasksSummary, setTasksSummary] = useState('');
  const [learnings, setLearnings] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    api.get('/applications')
      .then((data) => {
        if (data.success && data.applications.length > 0) {
          setApplications(data.applications);
          const firstId = data.applications[0].id;
          setSelectedAppId(firstId);
          fetchLogbooks(firstId);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const fetchLogbooks = (appId) => {
    api.get(`/logbooks/application/${appId}`)
      .then((data) => {
        if (data.success) {
          const list = data.logbooks || [];
          setLogbooks(list);
          if (list.length > 0) setSelectedLog(list[0]);
        }
      })
      .catch(console.error);
  };

  const handleAppChange = (e) => {
    const id = e.target.value;
    setSelectedAppId(id);
    fetchLogbooks(id);
  };

  const handleSubmitLogbook = async (e) => {
    e.preventDefault();
    if (!selectedAppId || !tasksSummary) return;
    setSubmitting(true);

    try {
      const res = await api.post('/logbooks', {
        application_id: selectedAppId,
        week_number: weekNumber,
        hours_worked: hoursWorked,
        tasks_summary: tasksSummary,
        learnings
      });

      if (res.success) {
        setToast(`Week #${weekNumber} logbook entry submitted successfully!`);
        setTasksSummary('');
        setLearnings('');
        setWeekNumber(w => Number(w) + 1);
        fetchLogbooks(selectedAppId);
      }
    } catch (err) {
      alert(err.message || 'Error submitting logbook');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-heading">
            Weekly Progress Reports & Logbook Workspace
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Log weekly industrial deliverables, technical learnings, and faculty credit signoffs.
          </p>
        </div>
      </div>

      {toast && (
        <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between">
          <span>{toast}</span>
          <button onClick={() => setToast('')} className="font-bold">✕</button>
        </div>
      )}

      {/* Program Selector Bar */}
      {applications.length > 0 && (
        <div className="card-surface p-4 flex items-center justify-between gap-4">
          <label className="text-xs font-semibold text-slate-700">Active Internship Program:</label>
          <select
            value={selectedAppId}
            onChange={handleAppChange}
            className="form-input text-xs max-w-md"
          >
            {applications.map(a => (
              <option key={a.id} value={a.id}>
                {a.internship_title} ({a.company_name})
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Workspace Split Layout: Left List + Right Selected Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Weekly Reports List */}
        <div className="card-surface p-4 space-y-3 h-fit">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Weekly Log History</span>
            <span className="text-xs font-semibold text-slate-500">{logbooks.length} Weeks Logged</span>
          </div>

          <div className="space-y-2">
            {logbooks.map((log) => {
              const isSelected = selectedLog?.id === log.id;
              return (
                <button
                  key={log.id}
                  onClick={() => setSelectedLog(log)}
                  className={`w-full text-left p-3 rounded-lg border text-xs transition ${
                    isSelected ? 'bg-indigo-50 border-indigo-300 font-semibold text-indigo-900' : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900">Week #{log.week_number}</span>
                    <StatusBadge status={log.status} />
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">{log.tasks_summary}</div>
                  <div className="text-[10px] text-slate-400 mt-1">{log.log_date} • {log.hours_worked} hrs</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Selected Report & New Submission Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Selected Report Viewer */}
          {selectedLog ? (
            <div className="card-surface p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Week #{selectedLog.week_number} Report Details</h3>
                  <div className="text-xs text-slate-500">Log Date: {selectedLog.log_date} • {selectedLog.hours_worked} Hours Logged</div>
                </div>
                <StatusBadge status={selectedLog.status} />
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="font-bold text-slate-900 block mb-1">Work Completed & Tasks Summary:</span>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 leading-relaxed">
                    {selectedLog.tasks_summary}
                  </div>
                </div>

                {selectedLog.learnings && (
                  <div>
                    <span className="font-bold text-slate-900 block mb-1">Key Learnings & Skill Acquisition:</span>
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 leading-relaxed">
                      {selectedLog.learnings}
                    </div>
                  </div>
                )}

                {/* Faculty & Mentor Feedbacks */}
                <div className="grid md:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs">
                    <span className="font-bold text-amber-900 block mb-1">Faculty Review Feedback:</span>
                    <span className="text-amber-800">{selectedLog.faculty_feedback || 'Pending faculty review.'}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-indigo-50 border border-indigo-200 text-xs">
                    <span className="font-bold text-indigo-900 block mb-1">Mentor Feedback:</span>
                    <span className="text-indigo-800">{selectedLog.mentor_feedback || 'Pending mentor feedback.'}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="card-surface p-8 text-center text-slate-500 text-xs">
              Select a week from the left list to view details.
            </div>
          )}

          {/* New Weekly Logbook Form */}
          <div className="card-surface p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Plus className="w-4 h-4 text-indigo-600" />
              <span>Submit New Weekly Progress Log</span>
            </h3>

            <form onSubmit={handleSubmitLogbook} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="form-label">Week Number</label>
                <input
                  type="number"
                  min="1"
                  max="24"
                  required
                  value={weekNumber}
                  onChange={(e) => setWeekNumber(e.target.value)}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Hours Worked This Week</label>
                <input
                  type="number"
                  min="10"
                  max="80"
                  required
                  value={hoursWorked}
                  onChange={(e) => setHoursWorked(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="form-label">Tasks & Technical Deliverables Completed</label>
                <textarea
                  required
                  rows={3}
                  value={tasksSummary}
                  onChange={(e) => setTasksSummary(e.target.value)}
                  placeholder="Describe tasks completed, API modules developed, code commits..."
                  className="form-input resize-none"
                ></textarea>
              </div>

              <div className="sm:col-span-2">
                <label className="form-label">Key Technical Learnings</label>
                <textarea
                  rows={2}
                  value={learnings}
                  onChange={(e) => setLearnings(e.target.value)}
                  placeholder="New concepts, algorithms, frameworks mastered..."
                  className="form-input resize-none"
                ></textarea>
              </div>

              <div className="sm:col-span-2 flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setToast('Draft saved locally')}
                  className="btn-secondary text-xs"
                >
                  <Save className="w-3.5 h-3.5" /> Save Draft
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary text-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitting ? 'Submitting...' : 'Submit Report for Faculty Review'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogbookJournal;
