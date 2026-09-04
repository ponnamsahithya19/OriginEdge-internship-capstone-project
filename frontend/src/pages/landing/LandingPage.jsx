import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  GraduationCap, 
  Building2, 
  UserCheck, 
  BookOpen, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Award, 
  Briefcase, 
  Users, 
  TrendingUp, 
  FileText,
  MapPin,
  ChevronRight,
  Shield,
  Star,
  Check
} from 'lucide-react';
import LoginModal from '../auth/LoginModal';
import RegisterModal from '../auth/RegisterModal';

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [targetRole, setTargetRole] = useState('STUDENT');
  const [activeTab, setActiveTab] = useState('STUDENT');

  const openLoginForRole = (role) => {
    setTargetRole(role);
    setShowLogin(true);
  };

  const openRegisterForRole = (role) => {
    setTargetRole(role);
    setShowRegister(true);
  };

  const workflowSteps = [
    { number: '01', title: 'Corporate Registration', desc: 'Pre-vetted enterprise companies register & post credit-eligible opportunities.', icon: Building2, gradient: 'from-indigo-500 to-purple-600' },
    { number: '02', title: 'Opportunity Discovery', desc: 'Students search roles by domain, location, stipend range & work arrangements.', icon: BookOpen, gradient: 'from-purple-500 to-pink-600' },
    { number: '03', title: 'Faculty Approval Matrix', desc: 'Department coordinators evaluate & approve NOC credit criteria.', icon: UserCheck, gradient: 'from-cyan-500 to-blue-600' },
    { number: '04', title: 'ATS Candidate Selection', desc: 'Company mentors review applicants, schedule interviews & issue offer letters.', icon: Briefcase, gradient: 'from-emerald-500 to-teal-600' },
    { number: '05', title: 'Weekly Progress Logbook', desc: 'Students submit weekly task logs verified by faculty & mentors.', icon: FileText, gradient: 'from-amber-500 to-orange-600' },
    { number: '06', title: 'Digital Certificate Issue', desc: 'Dual-graded rubrics trigger cryptographically verified completion certificates.', icon: Award, gradient: 'from-rose-500 to-red-600' }
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-white text-xs font-semibold py-2.5 px-4 text-center border-b border-indigo-500/30 flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
        <span>Enterprise University ERP Internship System — Academic Year 2026</span>
        <button onClick={() => navigate(user ? '/dashboard' : '/student/internships')} className="underline hover:text-indigo-300 ml-2 font-bold">
          Launch Live Platform →
        </button>
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 glass-nav-header px-6 lg:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-white font-extrabold text-xl tracking-tight block font-heading">Apex<span className="text-indigo-400">Intern</span></span>
            <span className="text-[11px] text-slate-400 font-medium">University Internship Portal</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => openLoginForRole('STUDENT')} className="btn-secondary text-xs">
            Sign In
          </button>
          <button onClick={() => openRegisterForRole('COMPANY')} className="btn-primary text-xs shadow-indigo-500/40">
            Register Organization
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-28 px-6 lg:px-12 overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-indigo-600/20 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold mb-8 shadow-inner">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Empowering Colleges & Universities Nationwide</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-8 leading-[1.1] font-heading">
            Manage Every Internship. <br />
            <span className="gradient-text-accent">Empower Every Student.</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed font-normal">
            A unified SaaS platform connecting <strong className="text-white">Students</strong>, <strong className="text-white">Faculty Coordinators</strong>, <strong className="text-white">Company Mentors</strong>, and <strong className="text-white">Administrators</strong> across the complete internship lifecycle.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-20">
            <button
              onClick={() => openLoginForRole('STUDENT')}
              className="btn-primary px-9 py-4 text-base shadow-2xl shadow-indigo-600/40 hover:scale-105 transition"
            >
              <BookOpen className="w-5 h-5" />
              <span>Student Portal Login</span>
            </button>

            <button
              onClick={() => openRegisterForRole('COMPANY')}
              className="btn-secondary px-9 py-4 text-base border-indigo-500/40 hover:border-indigo-400 hover:scale-105 transition"
            >
              <Building2 className="w-5 h-5 text-indigo-400" />
              <span>Company Registration</span>
            </button>
          </div>

          {/* Live Interactive Portal Showcase Mockup */}
          <div className="glass-card-neon p-6 sm:p-8 max-w-5xl mx-auto text-left relative overflow-hidden border border-indigo-500/30 shadow-2xl">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="text-xs font-mono text-slate-400 ml-2">https://portal.university.edu/dashboard</span>
              </div>
              <div className="flex gap-2">
                {['STUDENT', 'FACULTY', 'COMPANY', 'ADMIN'].map(roleTab => (
                  <button
                    key={roleTab}
                    onClick={() => setActiveTab(roleTab)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                      activeTab === roleTab ? 'bg-indigo-600 text-white shadow' : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    {roleTab} VIEW
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Interactive Role Mockup Content */}
            {activeTab === 'STUDENT' && (
              <div className="space-y-4 animate-fade-in">
                <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">Full-Stack Engineering Internship</h4>
                    <p className="text-xs text-slate-300">TechCorp Solutions • $2,500/mo • Verified Academic Credit</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                    Completed (Grade: A+)
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">TOTAL LOGBOOKS</span>
                    <strong className="text-white text-base">12 Weeks Logged</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">CREDIT HOURS</span>
                    <strong className="text-emerald-400 text-base">480 Hours</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">CERTIFICATE</span>
                    <strong className="text-indigo-400 text-base">CERT-2026-IMS</strong>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'FACULTY' && (
              <div className="space-y-4 animate-fade-in">
                <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">Application Approval Queue (Prof. Rajesh Sharma)</h4>
                    <p className="text-xs text-slate-300">12 Students Pending Coordinator NOC Signoff</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold">
                    Coordinator Action
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs flex items-center justify-between">
                  <span>Alex Johnson (2023-CS-042) • CGPA 3.88</span>
                  <button className="btn-primary text-[11px] py-1 px-3">Grant Faculty Approval</button>
                </div>
              </div>
            )}

            {activeTab === 'COMPANY' && (
              <div className="space-y-4 animate-fade-in">
                <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/30 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">Corporate Recruitment ATS (TechCorp HR)</h4>
                    <p className="text-xs text-slate-300">Active Openings: 4 Positions • Total Applicants: 28</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-bold">
                    Partner Verified
                  </span>
                </div>
              </div>
            )}

            {activeTab === 'ADMIN' && (
              <div className="space-y-4 animate-fade-in">
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">University Placement Rate Dashboard</h4>
                    <p className="text-xs text-slate-300">Target Placement Rate: 95% • Enrolled Students: 1,250</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                    95%+ Achieved
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Visual Workflow Steps */}
      <section className="py-24 px-6 lg:px-12 border-t border-slate-800/80 bg-slate-950/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 font-heading">
              Complete Internship Lifecycle Engine
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">
              Automating approval chains from corporate onboarding to academic credit evaluation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {workflowSteps.map((step) => {
              const IconComp = step.icon;
              return (
                <div key={step.number} className="glass-card p-6 border border-slate-800 hover:border-indigo-500/40 transition group">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black text-slate-700 font-heading">{step.number}</span>
                    <div className={`p-3 rounded-2xl bg-gradient-to-tr ${step.gradient} text-white shadow-lg`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portal Role Cards */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 font-heading">
              Four Dedicated Role Portals
            </h2>
            <p className="text-slate-400 text-sm">Tailored interfaces for every stakeholder in the academic ecosystem.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-6 flex flex-col justify-between border-emerald-500/30 hover:border-emerald-500/60">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Student Portal</h3>
                <ul className="text-xs text-slate-400 space-y-2 mb-6">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Resume & Skill Profile</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Application Stepper Tracker</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Weekly Logbook Journal</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Digital Certificate Export</li>
                </ul>
              </div>
              <button onClick={() => openLoginForRole('STUDENT')} className="btn-primary w-full text-xs">
                Student Login
              </button>
            </div>

            <div className="glass-card p-6 flex flex-col justify-between border-amber-500/30 hover:border-amber-500/60">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
                  <UserCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Faculty Portal</h3>
                <ul className="text-xs text-slate-400 space-y-2 mb-6">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-400" /> NOC Approval Queue</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-400" /> Logbook Review & Feedback</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-400" /> Department Supervision</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-400" /> Rubric Grading Matrix</li>
                </ul>
              </div>
              <button onClick={() => openLoginForRole('FACULTY')} className="btn-secondary w-full text-xs border-amber-500/40 text-amber-300">
                Faculty Login
              </button>
            </div>

            <div className="glass-card p-6 flex flex-col justify-between border-indigo-500/30 hover:border-indigo-500/60">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Company Portal</h3>
                <ul className="text-xs text-slate-400 space-y-2 mb-6">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-indigo-400" /> Post Verified Internships</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-indigo-400" /> Applicant ATS Pipeline</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-indigo-400" /> Mentor Feedback Signoff</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-indigo-400" /> Corporate Verification</li>
                </ul>
              </div>
              <button onClick={() => openRegisterForRole('COMPANY')} className="btn-secondary w-full text-xs border-indigo-500/40 text-indigo-300">
                Company Sign Up
              </button>
            </div>

            <div className="glass-card p-6 flex flex-col justify-between border-purple-500/30 hover:border-purple-500/60">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Admin Portal</h3>
                <ul className="text-xs text-slate-400 space-y-2 mb-6">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-purple-400" /> System Control Dashboard</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-purple-400" /> User Role Management</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-purple-400" /> Placement Analytics</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-purple-400" /> Security Audit Stream</li>
                </ul>
              </div>
              <button onClick={() => openLoginForRole('ADMIN')} className="btn-secondary w-full text-xs border-purple-500/40 text-purple-300">
                Admin Login
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Auth Modals */}
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} defaultRole={targetRole} />
      <RegisterModal isOpen={showRegister} onClose={() => setShowRegister(false)} defaultRole={targetRole} />
    </div>
  );
};

export default LandingPage;
