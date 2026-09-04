import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';

const PostInternship = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Form State
  const [title, setTitle] = useState('');
  const [domain, setDomain] = useState('Software Engineering');
  const [location, setLocation] = useState('San Jose, CA');
  const [workType, setWorkType] = useState('HYBRID');
  const [stipend, setStipend] = useState(2500);
  const [duration, setDuration] = useState(12);
  const [slots, setSlots] = useState(3);
  const [minCgpa, setMinCgpa] = useState(3.0);
  const [requirements, setRequirements] = useState('JavaScript, React, Node.js, SQL');
  const [description, setDescription] = useState('Join our platform engineering team to build scalable full-stack web applications.');
  const [deadline, setDeadline] = useState('2026-11-30');
  const [submitting, setSubmitting] = useState(false);

  const steps = [
    { num: 1, label: 'Basic Information' },
    { num: 2, label: 'Position Details' },
    { num: 3, label: 'Eligibility & Requirements' },
    { num: 4, label: 'Review & Publish' }
  ];

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await api.post('/internships', {
        title,
        domain,
        location,
        work_type: workType,
        stipend_monthly: stipend,
        duration_weeks: duration,
        slots,
        min_cgpa: minCgpa,
        requirements,
        description,
        deadline
      });

      if (res.success) {
        navigate('/company/dashboard');
      }
    } catch (err) {
      alert(err.message || 'Error posting internship');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-heading">
          Post New Internship Position
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Step-based publishing form for corporate recruiters and university partners.
        </p>
      </div>

      {/* Progress Indicator Steps Header (Section 18) */}
      <div className="card-surface p-4 flex items-center justify-between">
        {steps.map((s) => {
          const isDone = s.num < step;
          const isCurrent = s.num === step;
          return (
            <div key={s.num} className="flex items-center gap-2 text-xs">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                isDone ? 'bg-emerald-600 text-white' : isCurrent ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                {isDone ? <Check className="w-3.5 h-3.5" /> : s.num}
              </span>
              <span className={`hidden sm:inline font-semibold ${isCurrent ? 'text-indigo-600' : 'text-slate-500'}`}>
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Step Form Body */}
      <div className="card-surface p-6 space-y-5 text-xs">
        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Step 01: Basic Information</h2>
            <div>
              <label className="form-label">Position Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Cloud Infrastructure Engineering Intern"
                className="form-input"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Domain Area</label>
                <select value={domain} onChange={(e) => setDomain(e.target.value)} className="form-input">
                  <option value="Software Engineering">Software Engineering</option>
                  <option value="Artificial Intelligence">Artificial Intelligence & ML</option>
                  <option value="FinTech">FinTech & Financial Systems</option>
                  <option value="DevOps & Cloud">DevOps & Cloud Infrastructure</option>
                  <option value="Hardware & IoT">Hardware & Embedded Systems</option>
                </select>
              </div>
              <div>
                <label className="form-label">Work Arrangement</label>
                <select value={workType} onChange={(e) => setWorkType(e.target.value)} className="form-input">
                  <option value="HYBRID">Hybrid</option>
                  <option value="REMOTE">Remote</option>
                  <option value="ON-SITE">On-Site</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Step 02: Position Details & Compensation</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Location / Office Address</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="form-input"
                />
              </div>
              <div>
                <label className="form-label">Monthly Stipend ($ USD)</label>
                <input
                  type="number"
                  required
                  value={stipend}
                  onChange={(e) => setStipend(Number(e.target.value))}
                  className="form-input"
                />
              </div>
              <div>
                <label className="form-label">Duration (Weeks)</label>
                <input
                  type="number"
                  required
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="form-input"
                />
              </div>
              <div>
                <label className="form-label">Number of Open Slots</label>
                <input
                  type="number"
                  required
                  value={slots}
                  onChange={(e) => setSlots(Number(e.target.value))}
                  className="form-input"
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Step 03: Eligibility & Prerequisites</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Minimum Cutoff CGPA</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={minCgpa}
                  onChange={(e) => setMinCgpa(Number(e.target.value))}
                  className="form-input"
                />
              </div>
              <div>
                <label className="form-label">Application Deadline</label>
                <input
                  type="date"
                  required
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>
            <div>
              <label className="form-label">Required Skills & Prerequisites</label>
              <input
                type="text"
                required
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                className="form-input"
              />
            </div>
            <div>
              <label className="form-label">Detailed Position Description</label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-input resize-none"
              ></textarea>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Step 04: Review & Confirm Posting</h2>
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2 leading-relaxed">
              <div><strong className="text-slate-900">Title:</strong> {title || 'Untitled Position'}</div>
              <div><strong className="text-slate-900">Domain:</strong> {domain} • {workType}</div>
              <div><strong className="text-slate-900">Location & Stipend:</strong> {location} — ${stipend}/month</div>
              <div><strong className="text-slate-900">Eligibility:</strong> Min CGPA {minCgpa} • Deadline: {deadline}</div>
              <div><strong className="text-slate-900">Requirements:</strong> {requirements}</div>
            </div>
          </div>
        )}

        {/* Step Navigation Controls */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="btn-secondary text-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
          ) : (
            <div></div>
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={() => {
                if (!title && step === 1) { alert('Please enter a position title'); return; }
                setStep(step + 1);
              }}
              className="btn-primary text-xs"
            >
              Continue to Step {step + 1} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="btn-primary text-xs bg-emerald-600 border-emerald-700"
            >
              {submitting ? 'Publishing...' : 'Publish Internship Position'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostInternship;
