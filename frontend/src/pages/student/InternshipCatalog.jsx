import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/common/Modal';
import { 
  Search, 
  MapPin, 
  Clock, 
  Briefcase, 
  Bookmark, 
  Sparkles, 
  ShieldCheck, 
  Filter,
  CheckCircle2
} from 'lucide-react';

const InternshipCatalog = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [domain, setDomain] = useState('');
  const [workType, setWorkType] = useState('');
  const [minStipend, setMinStipend] = useState(2000);
  const [savedIds, setSavedIds] = useState([]);

  const [selectedJob, setSelectedJob] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [applying, setApplying] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const fetchInternships = () => {
    setLoading(true);
    let url = `/internships?status=ACTIVE`;
    if (search) url += `&search=${encodeURIComponent(search)}`;
    if (domain) url += `&domain=${encodeURIComponent(domain)}`;
    if (workType) url += `&work_type=${encodeURIComponent(workType)}`;

    api.get(url)
      .then(data => {
        if (data.success) {
          const filtered = (data.internships || []).filter(i => Number(i.stipend_monthly) >= minStipend);
          setInternships(filtered);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchInternships();
  }, [search, domain, workType, minStipend]);

  const toggleSave = (jobId) => {
    if (savedIds.includes(jobId)) {
      setSavedIds(savedIds.filter(id => id !== jobId));
    } else {
      setSavedIds([...savedIds, jobId]);
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    if (!selectedJob) return;
    setApplying(true);

    try {
      const res = await api.post('/applications', {
        internship_id: selectedJob.id,
        cover_letter: coverLetter
      });

      if (res.success) {
        setToastMessage(`Application submitted for ${selectedJob.title}!`);
        setSelectedJob(null);
        setCoverLetter('');
      }
    } catch (err) {
      alert(err.message || 'Failed to submit application.');
    } finally {
      setApplying(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-heading">
            Explore Internships
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Discover verified corporate opportunities eligible for university credit evaluation.
          </p>
        </div>
      </div>

      {toastMessage && (
        <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage('')} className="font-bold">✕</button>
        </div>
      )}

      {/* Discovery Layout: Left Filter Panel + Right Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Filter Sidebar */}
        <div className="card-surface p-5 space-y-5 h-fit">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 border-b border-slate-200 pb-3 uppercase tracking-wider">
            <Filter className="w-4 h-4 text-indigo-600" />
            <span>Filter Positions</span>
          </div>

          <div>
            <label className="form-label">Domain Area</label>
            <select value={domain} onChange={(e) => setDomain(e.target.value)} className="form-input text-xs">
              <option value="">All Domains</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
              <option value="FinTech">FinTech & Finance</option>
              <option value="DevOps">DevOps & Cloud</option>
              <option value="Hardware">Hardware & IoT</option>
            </select>
          </div>

          <div>
            <label className="form-label">Work Arrangement</label>
            <select value={workType} onChange={(e) => setWorkType(e.target.value)} className="form-input text-xs">
              <option value="">All Work Modes</option>
              <option value="HYBRID">Hybrid</option>
              <option value="REMOTE">Remote</option>
              <option value="ON-SITE">On-Site</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="form-label mb-0">Min Stipend</label>
              <span className="text-xs font-bold text-slate-900">${minStipend}/mo</span>
            </div>
            <input
              type="range"
              min="1000"
              max="4000"
              step="250"
              value={minStipend}
              onChange={(e) => setMinStipend(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>
        </div>

        {/* Right Search & Cards Grid */}
        <div className="lg:col-span-3 space-y-4">
          {/* Top Search Input */}
          <div className="card-surface p-3 flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search position title, company name, or technology skills..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-input pl-9"
              />
            </div>
            <span className="text-xs text-slate-500 font-medium px-2">{internships.length} Results</span>
          </div>

          {/* Cards List */}
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map(n => (
                <div key={n} className="card-surface p-6 h-36 skeleton"></div>
              ))}
            </div>
          ) : internships.length === 0 ? (
            <div className="card-surface p-12 text-center text-slate-500 text-xs">
              No internships match your filter criteria. Try adjusting your search query or stipend threshold.
            </div>
          ) : (
            <div className="space-y-4">
              {internships.map((job) => {
                const isSaved = savedIds.includes(job.id);
                const matchPct = job.domain.includes('Software') ? 92 : 86;

                return (
                  <div key={job.id} className="card-surface card-surface-hover p-5 flex flex-col sm:flex-row items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <img src={job.logo_url} alt={job.company_name} className="w-12 h-12 rounded-xl object-cover border border-slate-200" />
                      
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base font-bold text-slate-900 leading-snug">{job.title}</h3>
                          {job.is_verified === 1 && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              <ShieldCheck className="w-3 h-3" /> Verified Partner
                            </span>
                          )}
                        </div>

                        <div className="text-xs text-slate-600 flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span className="font-semibold text-slate-900">{job.company_name}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.location}</span>
                          <span>•</span>
                          <span className="font-bold text-slate-900">${job.stipend_monthly} / month</span>
                          <span>•</span>
                          <span className="text-slate-500">{job.work_type}</span>
                        </div>

                        <p className="text-xs text-slate-600 line-clamp-2 pt-1 leading-relaxed">
                          {job.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-1.5 pt-2">
                          {job.requirements?.split(',').slice(0, 4).map(skill => (
                            <span key={skill} className="px-2 py-0.5 rounded bg-slate-100 text-[11px] font-medium text-slate-700">
                              {skill.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Action Column */}
                    <div className="flex sm:flex-col items-end justify-between gap-3 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" /> {matchPct}% AI Match
                        </span>
                        <button
                          onClick={() => toggleSave(job.id)}
                          className={`p-1.5 rounded-lg border transition ${isSaved ? 'bg-indigo-50 text-indigo-600 border-indigo-200' : 'text-slate-400 border-slate-200 hover:text-slate-600'}`}
                        >
                          <Bookmark className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => setSelectedJob(job)}
                        className="btn-primary text-xs w-full sm:w-auto"
                      >
                        View & Apply
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Application Submission Modal */}
      <Modal
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
        title={`Apply for ${selectedJob?.title}`}
      >
        {selectedJob && (
          <form onSubmit={handleApply} className="space-y-4">
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div><strong className="text-slate-900">Company:</strong> {selectedJob.company_name}</div>
              <div><strong className="text-slate-900">Monthly Stipend:</strong> ${selectedJob.stipend_monthly} / month</div>
              <div><strong className="text-slate-900">Duration:</strong> {selectedJob.duration_weeks} Weeks</div>
              <div><strong className="text-slate-900">Requirements:</strong> {selectedJob.requirements}</div>
            </div>

            <div>
              <label className="form-label">Statement of Purpose / Cover Letter</label>
              <textarea
                required
                rows={4}
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Detail relevant coursework, technical projects, and why you are a strong match..."
                className="form-input resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={applying}
              className="btn-primary w-full py-2.5 text-sm"
            >
              {applying ? 'Submitting Application...' : 'Confirm & Submit Application'}
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default InternshipCatalog;
