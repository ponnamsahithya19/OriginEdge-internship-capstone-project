import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import StatusBadge from '../../components/common/StatusBadge';
import { ShieldCheck, Building2, Check, X } from 'lucide-react';

const CompanyApprovals = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCompanies = () => {
    setLoading(true);
    api.get('/companies')
      .then((data) => {
        if (data.success) setCompanies(data.companies || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const toggleVerification = async (companyId, currentStatus) => {
    try {
      const res = await api.put(`/companies/${companyId}/verify`, {
        is_verified: !currentStatus
      });
      if (res.success) {
        fetchCompanies();
      }
    } catch (err) {
      alert(err.message || 'Error updating verification status');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-heading">
          Corporate Partner Approvals & Verification
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Verify corporate partners and grant posting privileges on the university internship portal.
        </p>
      </div>

      <div className="card-surface overflow-hidden">
        <table className="enterprise-table">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Industry</th>
              <th>HR Contact</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((comp) => (
              <tr key={comp.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <img src={comp.logo_url} alt={comp.company_name} className="w-9 h-9 rounded-lg object-cover border border-slate-200" />
                    <div>
                      <div className="font-bold text-slate-900">{comp.company_name}</div>
                      <div className="text-[11px] text-slate-500">{comp.website || 'https://company.com'}</div>
                    </div>
                  </div>
                </td>
                <td className="text-slate-600">{comp.industry}</td>
                <td className="text-slate-600">{comp.hr_contact || comp.contact_person}</td>
                <td>
                  {comp.is_verified === 1 ? (
                    <span className="badge-status badge-success">Verified Partner</span>
                  ) : (
                    <span className="badge-status badge-warning">Pending Verification</span>
                  )}
                </td>
                <td className="text-right">
                  <button
                    onClick={() => toggleVerification(comp.id, comp.is_verified === 1)}
                    className={comp.is_verified === 1 ? 'btn-danger text-xs py-1 px-3' : 'btn-primary text-xs py-1 px-3'}
                  >
                    {comp.is_verified === 1 ? 'Revoke Verification' : 'Grant Verification'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanyApprovals;
