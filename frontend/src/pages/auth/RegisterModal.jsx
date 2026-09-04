import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Modal from '../../components/common/Modal';
import { User, Mail, Lock, Building2, Phone, AlertCircle, CheckCircle } from 'lucide-react';

const RegisterModal = ({ isOpen, onClose, defaultRole = 'COMPANY' }) => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState(defaultRole);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('Password123!');
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('Technology');
  const [department, setDepartment] = useState('Computer Science & Eng');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const data = await register({
        role,
        full_name: fullName,
        email,
        password,
        company_name: companyName,
        industry,
        department
      });

      if (data.success) {
        onClose();
        navigate('/dashboard');
      } else {
        setError(data.message || 'Registration failed.');
      }
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Enterprise Account Registration">
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2 p-1 rounded-xl bg-slate-950 border border-slate-800">
          {['STUDENT', 'COMPANY', 'FACULTY'].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
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
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name / Contact Person</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Dr. Jane Smith or Recruiter Name"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@organization.com"
              className="input-field"
            />
          </div>

          {role === 'COMPANY' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Company / Organization Name</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Apex Technologies Inc."
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Industry Sector</label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="input-field"
                >
                  <option value="Information Technology">Information Technology</option>
                  <option value="Artificial Intelligence">Artificial Intelligence & Robotics</option>
                  <option value="Financial Services">Financial Services & FinTech</option>
                  <option value="Hardware & Embedded Systems">Hardware & Embedded Systems</option>
                </select>
              </div>
            </>
          )}

          {role !== 'COMPANY' && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Academic Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="input-field"
              >
                <option value="Computer Science & Eng">Computer Science & Eng</option>
                <option value="Electronics & Comm">Electronics & Comm</option>
                <option value="Mechanical Eng">Mechanical Eng</option>
                <option value="Information Technology">Information Technology</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Create Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full py-3 text-sm"
          >
            {submitting ? 'Registering Account...' : `Complete ${role} Registration`}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default RegisterModal;
