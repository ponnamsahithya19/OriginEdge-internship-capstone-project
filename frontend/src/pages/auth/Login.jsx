import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { GraduationCap, Mail, Lock, AlertCircle, ArrowRight, Sparkles, CheckCircle2, Shield, UserCheck, Building2, BookOpen } from 'lucide-react';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('alex.student@university.edu');
  const [password, setPassword] = useState('Password123!');
  const [role, setRole] = useState('STUDENT');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const data = await login(email, password);
      if (data.success) {
        navigate('/dashboard');
      } else {
        setError(data.message || 'Authentication failed.');
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setSubmitting(false);
    }
  };

  const setDemoCredentials = (roleType) => {
    setRole(roleType);
    if (roleType === 'ADMIN') setEmail('admin@university.edu');
    if (roleType === 'FACULTY') setEmail('prof.sharma@university.edu');
    if (roleType === 'COMPANY') setEmail('hr@techcorp.com');
    if (roleType === 'STUDENT') setEmail('alex.student@university.edu');
    setPassword('Password123!');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left Brand Visual Side */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 text-white p-12 flex-col justify-between relative overflow-hidden">
        {/* Abstract Geometry Visual */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-extrabold text-lg shadow-md">
              IF
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight block">InternFlow</span>
              <span className="text-xs text-slate-400 font-medium">Enterprise University Portal</span>
            </div>
          </Link>
        </div>

        <div className="relative z-10 max-w-lg space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Academic Placement Engine</span>
          </div>

          <h1 className="text-4xl font-extrabold text-white leading-tight font-heading">
            Centralized Internship Management for Modern Higher Education.
          </h1>

          <p className="text-slate-300 text-sm leading-relaxed">
            Connect students, faculty coordinators, and corporate recruiters on a single unified platform. Automate NOC approvals, credit evaluations, weekly logbooks, and digital certificates.
          </p>

          <div className="space-y-3 pt-4 border-t border-slate-800 text-xs text-slate-400">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>95%+ Placement Compliance Rate Across Participating Departments</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Cryptographically Verified Academic Credit Certificates</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-xs text-slate-500">
          © 2026 InternFlow Systems. Enterprise Security & FERPA Compliant.
        </div>
      </div>

      {/* Right Login Form Side */}
      <div className="w-full lg:w-1/2 p-6 sm:p-12 flex flex-col justify-center max-w-md mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-1 font-heading">Sign In to Portal</h2>
          <p className="text-xs text-slate-500">Select your role or enter university login credentials.</p>
        </div>

        {/* Demo Quick Role Switch Buttons */}
        <div className="grid grid-cols-4 gap-2 mb-6 p-1 bg-slate-100 rounded-xl border border-slate-200">
          {[
            { role: 'STUDENT', icon: BookOpen },
            { role: 'FACULTY', icon: UserCheck },
            { role: 'COMPANY', icon: Building2 },
            { role: 'ADMIN', icon: Shield }
          ].map((item) => (
            <button
              key={item.role}
              type="button"
              onClick={() => setDemoCredentials(item.role)}
              className={`py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition ${
                role === item.role ? 'bg-white text-indigo-700 shadow-sm border border-slate-200' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>{item.role}</span>
            </button>
          ))}
        </div>

        {error && (
          <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 mb-6">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="form-label">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input pl-9"
                placeholder="user@university.edu"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="form-label mb-0">Password</label>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Password reset email dispatched!'); }} className="text-xs text-indigo-600 hover:underline">Forgot password?</a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input pl-9"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full py-2.5 text-sm font-semibold flex items-center justify-center gap-2"
          >
            <span>{submitting ? 'Authenticating...' : `Sign In to ${role} Portal`}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-slate-500">
          Corporate Recruiter?{' '}
          <Link to="/" className="text-indigo-600 font-semibold hover:underline">Register Organization</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
