import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Award, Download, CheckCircle2, ShieldCheck, Printer } from 'lucide-react';

const CertificatePage = () => {
  const { user } = useAuth();
  const [cert, setCert] = useState({
    code: 'CERT-2026-IMS-89421',
    issuedDate: 'August 30, 2026',
    company: 'TechCorp Solutions',
    title: 'Full-Stack Software Engineering Intern',
    duration: '12 Weeks (480 Hours)',
    grade: 'A+'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Digital Internship Certificate</h1>
          <p className="text-xs text-slate-400">Cryptographically verified credit certificate issued by University Academic Council.</p>
        </div>

        <button onClick={handlePrint} className="btn-primary text-xs shadow-lg shadow-indigo-600/30">
          <Printer className="w-4 h-4" />
          <span>Print / Download Certificate</span>
        </button>
      </div>

      {/* Certificate Frame Document */}
      <div className="max-w-4xl mx-auto p-1.5 rounded-3xl bg-gradient-to-r from-amber-500/30 via-indigo-500/30 to-emerald-500/30 shadow-2xl">
        <div className="glass-panel p-10 md:p-16 border border-slate-700/80 text-center relative overflow-hidden bg-slate-950">
          {/* Background Crest Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <Award className="w-[450px] h-[450px] text-indigo-400" />
          </div>

          <div className="relative z-10 space-y-8">
            {/* Header Crest */}
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border-2 border-amber-400 flex items-center justify-center text-amber-400">
                <Award className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-extrabold tracking-wider text-amber-400 uppercase">Apex University</h2>
              <span className="text-xs tracking-widest text-slate-400 uppercase font-semibold">Directorate of Industry Relations & Placements</span>
            </div>

            <div className="h-0.5 w-48 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>

            <div>
              <span className="text-sm italic text-slate-300 font-serif">This is to certify that</span>
              <h3 className="text-3xl md:text-4xl font-extrabold text-white my-3 tracking-tight">{user?.full_name || 'Alex Johnson'}</h3>
              <p className="text-xs text-slate-300 max-w-xl mx-auto leading-relaxed">
                has successfully completed the <strong>{cert.duration}</strong> industrial internship program in 
                <strong className="text-indigo-400"> {cert.title}</strong> at 
                <strong className="text-emerald-400"> {cert.company}</strong>, earning academic grade <strong className="text-amber-400">{cert.grade}</strong>.
              </p>
            </div>

            <div className="grid grid-cols-2 max-w-lg mx-auto gap-4 text-xs text-left bg-slate-900/80 p-4 rounded-xl border border-slate-800">
              <div>
                <span className="text-slate-500 text-[10px] block">ROLL NUMBER</span>
                <span className="font-bold text-white">{user?.profile?.roll_number || '2023-CS-042'}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">DEPARTMENT</span>
                <span className="font-bold text-white">{user?.profile?.branch || 'Computer Science & Eng'}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">VERIFICATION CODE</span>
                <span className="font-mono text-indigo-400 font-bold">{cert.code}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">DATE ISSUED</span>
                <span className="font-bold text-emerald-400">{cert.issuedDate}</span>
              </div>
            </div>

            {/* Signatures */}
            <div className="grid grid-cols-2 gap-8 pt-8 max-w-xl mx-auto border-t border-slate-800 text-xs">
              <div className="text-center">
                <div className="font-serif italic text-base text-slate-300 mb-1">Prof. Rajesh Sharma</div>
                <div className="text-slate-400 text-[11px]">Faculty Coordinator</div>
              </div>
              <div className="text-center">
                <div className="font-serif italic text-base text-slate-300 mb-1">Elena Rostova</div>
                <div className="text-slate-400 text-[11px]">Corporate Mentor (TechCorp)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificatePage;
