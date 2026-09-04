import React from 'react';
import { Sparkles, CheckCircle2, AlertCircle, ArrowRight, BookOpen, Award, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const AICareerInsights = () => {
  return (
    <div className="space-y-6">
      {/* Title & Subtitle */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>AI Career Intelligence Engine</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-heading">
          AI Career Insights
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Personalized recommendations based on your resume, academic transcripts, and technical skill profile.
        </p>
      </div>

      {/* Top AI Score Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Resume Score */}
        <div className="card-surface p-5 border-l-4 border-l-indigo-600">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">RESUME STRENGTH SCORE</div>
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight font-heading">87<span className="text-base text-slate-400 font-normal">/100</span></div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Excellent</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-2">Strong project descriptions and impact metrics.</div>
        </div>

        {/* Overall Career Match */}
        <div className="card-surface p-5 border-l-4 border-l-emerald-600">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">TARGET ROLE MATCH</div>
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-extrabold text-emerald-600 tracking-tight font-heading">92%</div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">High Readiness</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-2">Full-Stack & Web Systems Domain</div>
        </div>

        {/* Skill Gap Count */}
        <div className="card-surface p-5 border-l-4 border-l-amber-500">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">IDENTIFIED SKILL GAPS</div>
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight font-heading">2 Skills</div>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">Action Needed</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-2">Docker & REST API Testing</div>
        </div>
      </div>

      {/* AI Match Spotlight Card (Section 33) */}
      <div className="card-surface p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <h2 className="text-base font-bold text-slate-900">AI Career Match Spotlight — Full-Stack Engineering</h2>
          </div>
          <span className="text-sm font-extrabold text-indigo-600">92% Match Score</span>
        </div>

        <div className="grid md:grid-cols-2 gap-6 text-xs">
          <div>
            <span className="font-bold text-emerald-700 flex items-center gap-1.5 mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Verified Core Strengths
            </span>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">✓ React.js (Advanced)</span>
              <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">✓ Node.js & Express</span>
              <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">✓ MySQL & Database Design</span>
              <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">✓ Git Version Control</span>
            </div>
          </div>

          <div>
            <span className="font-bold text-amber-800 flex items-center gap-1.5 mb-2">
              <AlertCircle className="w-4 h-4 text-amber-600" /> Recommended Skill Additions
            </span>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-200 font-medium">• Docker Containerization</span>
              <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-200 font-medium">• REST API Automated Testing</span>
              <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-200 font-medium">• Cloud Fundamentals (AWS/GCP)</span>
            </div>
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700">
          <strong className="text-slate-900">Why this matches you:</strong> Your transcript records a 3.88 CGPA in Database Systems & Web Technology, and your resume showcases full-stack project deployments matching TechCorp's engineering stack.
        </div>
      </div>

      {/* Actionable Improvement Recommendations */}
      <div className="card-surface p-6 space-y-4">
        <h2 className="text-base font-bold text-slate-900">Actionable Improvement Recommendations</h2>

        <div className="space-y-3 text-xs">
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
            <div>
              <div className="font-bold text-slate-900">Add Docker Container File to Your GitHub Projects</div>
              <div className="text-slate-600 mt-0.5">Corporate recruiters actively filter candidates with container deployment experience. Adding a simple Dockerfile will boost your match score to 96%.</div>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
            <div>
              <div className="font-bold text-slate-900">Highlight Quantitative Metrics in Resume Summary</div>
              <div className="text-slate-600 mt-0.5">Include quantifiable outcomes e.g. "Optimized API query response time by 35%".</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICareerInsights;
