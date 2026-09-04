import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Award, CheckCircle2, Star } from 'lucide-react';

const EvaluationMatrix = () => {
  const [applications, setApplications] = useState([]);
  const [selectedAppId, setSelectedAppId] = useState('');
  
  // Rating states across 6 categories
  const [techScore, setTechScore] = useState(9);
  const [commScore, setCommScore] = useState(9);
  const [teamScore, setTeamScore] = useState(10);
  const [problemScore, setProblemScore] = useState(8);
  const [profScore, setProfScore] = useState(10);
  const [initScore, setInitScore] = useState(9);

  const [comments, setComments] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    api.get('/applications')
      .then((data) => {
        if (data.success && data.applications.length > 0) {
          setApplications(data.applications);
          setSelectedAppId(data.applications[0].id);
        }
      })
      .catch(console.error);
  }, []);

  const overallAvg = (Number(techScore) + Number(commScore) + Number(teamScore) + Number(problemScore) + Number(profScore) + Number(initScore)) / 6;
  let finalGrade = 'A+';
  if (overallAvg < 6) finalGrade = 'C';
  else if (overallAvg < 7.5) finalGrade = 'B';
  else if (overallAvg < 9) finalGrade = 'A';

  const handleSubmitEvaluation = async (e) => {
    e.preventDefault();
    if (!selectedAppId) return;
    setSubmitting(true);

    try {
      const res = await api.post('/evaluations', {
        application_id: selectedAppId,
        technical_score: techScore,
        domain_score: problemScore,
        communication_score: commScore,
        punctuality_score: profScore,
        comments
      });

      if (res.success) {
        setToast(`Academic evaluation rubric recorded! Overall Grade: ${res.overallGrade}`);
      }
    } catch (err) {
      alert(err.message || 'Failed to submit evaluation');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-heading">
          Academic Credit Assessment & Grading Matrix
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Standardized faculty evaluation rubric to assess technical and professional intern performance.
        </p>
      </div>

      {toast && (
        <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{toast}</span>
          </div>
          <button onClick={() => setToast('')} className="font-bold">✕</button>
        </div>
      )}

      {/* Student Selector */}
      {applications.length > 0 && (
        <div className="card-surface p-4 flex items-center justify-between gap-4">
          <label className="text-xs font-semibold text-slate-700">Select Student Candidate:</label>
          <select
            value={selectedAppId}
            onChange={(e) => setSelectedAppId(e.target.value)}
            className="form-input text-xs max-w-md"
          >
            {applications.map(a => (
              <option key={a.id} value={a.id}>
                {a.student_name} ({a.roll_number}) — {a.internship_title}
              </option>
            ))}
          </select>
        </div>
      )}

      <form onSubmit={handleSubmitEvaluation} className="card-surface p-6 space-y-6">
        {/* Calculated Grade Summary Header */}
        <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-semibold">Overall Assessment Score</div>
            <div className="text-2xl font-extrabold text-white tracking-tight font-heading">{overallAvg.toFixed(1)} / 10</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-400 font-semibold">Academic Credit Grade</div>
            <div className="text-3xl font-extrabold text-emerald-400 font-heading">{finalGrade}</div>
          </div>
        </div>

        {/* 6 Category Rating Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div>
            <div className="flex justify-between font-semibold text-slate-800 mb-1">
              <span>1. Technical Skills & Engineering Competency</span>
              <span className="font-bold text-indigo-600">{techScore}/10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={techScore}
              onChange={(e) => setTechScore(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>

          <div>
            <div className="flex justify-between font-semibold text-slate-800 mb-1">
              <span>2. Communication & Articulation</span>
              <span className="font-bold text-indigo-600">{commScore}/10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={commScore}
              onChange={(e) => setCommScore(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>

          <div>
            <div className="flex justify-between font-semibold text-slate-800 mb-1">
              <span>3. Teamwork & Collaboration</span>
              <span className="font-bold text-indigo-600">{teamScore}/10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={teamScore}
              onChange={(e) => setTeamScore(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>

          <div>
            <div className="flex justify-between font-semibold text-slate-800 mb-1">
              <span>4. Problem Solving & Technical Aptitude</span>
              <span className="font-bold text-indigo-600">{problemScore}/10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={problemScore}
              onChange={(e) => setProblemScore(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>

          <div>
            <div className="flex justify-between font-semibold text-slate-800 mb-1">
              <span>5. Professionalism & Punctuality</span>
              <span className="font-bold text-indigo-600">{profScore}/10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={profScore}
              onChange={(e) => setProfScore(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>

          <div>
            <div className="flex justify-between font-semibold text-slate-800 mb-1">
              <span>6. Initiative & Self-Direction</span>
              <span className="font-bold text-indigo-600">{initScore}/10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={initScore}
              onChange={(e) => setInitScore(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>
        </div>

        <div>
          <label className="form-label">Detailed Qualitative Feedback & Remarks</label>
          <textarea
            rows={3}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Document key strengths, project contributions, and recommendations..."
            className="form-input resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="btn-primary w-full py-2.5 text-sm"
        >
          {submitting ? 'Recording Rubric...' : 'Finalize & Submit Academic Grade Matrix'}
        </button>
      </form>
    </div>
  );
};

export default EvaluationMatrix;
