import React, { useState } from 'react';
import { FolderCheck, FileText, AlertCircle, Upload, CheckCircle2, Eye, Download } from 'lucide-react';
import StatusBadge from '../../components/common/StatusBadge';

const DocumentCenter = () => {
  const [documents] = useState([
    { id: 1, name: 'University No Objection Certificate (NOC)', type: 'PDF Document', uploadedDate: '2026-06-01', status: 'VERIFIED', verifiedBy: 'Prof. Rajesh Sharma (Faculty)', url: '#' },
    { id: 2, name: 'Corporate Internship Offer Letter', type: 'PDF Document', uploadedDate: '2026-06-05', status: 'VERIFIED', verifiedBy: 'Elena Rostova (TechCorp HR)', url: '#' },
    { id: 3, name: 'Student Identity & Enrollment Verification', type: 'PDF Document', uploadedDate: '2026-05-28', status: 'VERIFIED', verifiedBy: 'Deans Office', url: '#' },
    { id: 4, name: 'Mid-Term Progress Evaluation Form', type: 'PDF Document', uploadedDate: '—', status: 'PENDING', verifiedBy: 'Awaiting Upload', url: null },
    { id: 5, name: 'Final Internship Credit Completion Report', type: 'PDF Document', uploadedDate: '—', status: 'PENDING', verifiedBy: 'Awaiting Completion', url: null }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-heading">
            Document Center & Verification Vault
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage academic NOCs, offer letters, and compliance documentation for credit allocation.
          </p>
        </div>

        <button onClick={() => alert('Select document file to upload')} className="btn-primary text-xs shadow-sm">
          <Upload className="w-4 h-4" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Prominent Alert Banner for Required Documents */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-100 text-amber-700">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
          </div>
          <div>
            <div className="font-bold text-slate-900">2 Documents Require Attention</div>
            <div className="text-slate-600 mt-0.5">
              Mid-Term Evaluation Form and Final Credit Completion Report are pending submission.
            </div>
          </div>
        </div>

        <button onClick={() => alert('Upload modal opened')} className="btn-secondary text-xs font-semibold">
          Upload Now
        </button>
      </div>

      {/* Enterprise Document Management Table */}
      <div className="card-surface overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">Required Document Vault</h2>
          <span className="text-xs text-slate-500 font-medium">3 of 5 Documents Verified</span>
        </div>

        <table className="enterprise-table">
          <thead>
            <tr>
              <th>Document Name</th>
              <th>Type</th>
              <th>Uploaded Date</th>
              <th>Status</th>
              <th>Verified By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{doc.name}</div>
                      <div className="text-[11px] text-slate-400">PDF • Standard Academic Verification</div>
                    </div>
                  </div>
                </td>
                <td className="text-slate-600">{doc.type}</td>
                <td className="text-slate-600">{doc.uploadedDate}</td>
                <td>
                  <StatusBadge status={doc.status} />
                </td>
                <td className="text-xs font-medium text-slate-700">{doc.verifiedBy}</td>
                <td>
                  {doc.url ? (
                    <div className="flex items-center gap-2">
                      <button onClick={() => alert(`Viewing ${doc.name}`)} className="btn-tertiary text-xs">
                        <Eye className="w-3.5 h-3.5" /> View
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => alert(`Upload ${doc.name}`)} className="btn-secondary text-xs py-1 px-2.5">
                      Upload
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DocumentCenter;
