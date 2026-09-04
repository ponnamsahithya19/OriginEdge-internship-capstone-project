import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Modal from '../../components/common/Modal';
import { Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react';

const LoginModal = ({ isOpen, onClose, defaultRole = 'STUDENT' }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('Password123!');
  const [role, setRole] = useState(defaultRole);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const data = await login(email, password);
      if (data.success) {
        onClose();
        navigate('/dashboard');
      } else {
        setError(data.message || 'Login failed.');
      }
    } catch (err) {
      setError(err.message || 'Invalid credentials or server error.');
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
    <Modal isOpen={isOpen} onClose={onClose} title="Portal Authentication">
      <div className="space-y-5">
        {/* Role Selector */}
        <div className="grid grid-cols-4 gap-2 p-1 rounded-xl bg-slate-950 border border-slate-800">
          {['STUDENT', 'FACULTY', 'COMPANY', 'ADMIN'].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setDemoCredentials(r)}
              className={`py-1.5 rounded-lg text-xs font-semibold transition ${
                role === r ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@university.edu"
                className="input-field pl-9"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field pl-9"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full py-3 text-sm flex items-center justify-center gap-2"
          >
            <span>{submitting ? 'Authenticating...' : `Sign In to ${role} Portal`}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="p-3 rounded-lg bg-indigo-950/40 border border-indigo-500/20 text-[11px] text-slate-400">
          <strong className="text-indigo-300">Demo Password:</strong> <code className="text-white">Password123!</code>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
