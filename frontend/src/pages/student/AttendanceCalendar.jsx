import React from 'react';
import { Calendar as CalendarIcon, CheckCircle2, Clock, XCircle, AlertCircle } from 'lucide-react';

const AttendanceCalendar = () => {
  // Calendar days generation for current month
  const daysInMonth = Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    let status = 'PRESENT';
    if (day === 7 || day === 14 || day === 21 || day === 28) status = 'OFF';
    if (day === 12) status = 'LEAVE';
    if (day === 19) status = 'ABSENT';
    return { day, status };
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight font-heading">
          Attendance Calendar & Verification
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Verified daily attendance log monitored by university faculty coordinators.
        </p>
      </div>

      {/* Top Attendance Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card-surface p-5">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">ATTENDANCE RATE</div>
          <div className="text-2xl font-extrabold text-emerald-600 tracking-tight font-heading">94.2%</div>
          <div className="text-[11px] text-slate-500 mt-1">Exceeds 85% requirement</div>
        </div>

        <div className="card-surface p-5">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">DAYS PRESENT</div>
          <div className="text-2xl font-extrabold text-slate-900 tracking-tight font-heading">22 Days</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> 176 Hours Worked
          </div>
        </div>

        <div className="card-surface p-5">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">APPROVED LEAVES</div>
          <div className="text-2xl font-extrabold text-slate-900 tracking-tight font-heading">1 Day</div>
          <div className="text-[11px] text-slate-500 mt-1">Medical leave approved</div>
        </div>

        <div className="card-surface p-5">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">UNEXCUSED ABSENCE</div>
          <div className="text-2xl font-extrabold text-slate-900 tracking-tight font-heading">1 Day</div>
          <div className="text-[11px] text-amber-600 font-semibold mt-1">1 Day flagged</div>
        </div>
      </div>

      {/* Monthly Calendar Grid */}
      <div className="card-surface p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-indigo-600" />
            <h2 className="text-sm font-bold text-slate-900">September 2026 Attendance Grid</h2>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Present</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Approved Leave</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Absent</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span> Weekend / Off</span>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center text-xs">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
            <div key={d} className="font-bold text-slate-400 uppercase tracking-wider py-2">
              {d}
            </div>
          ))}

          {daysInMonth.map((item) => {
            let bgClass = 'bg-emerald-50 text-emerald-800 border-emerald-200';
            if (item.status === 'OFF') bgClass = 'bg-slate-50 text-slate-400 border-slate-200';
            if (item.status === 'LEAVE') bgClass = 'bg-amber-50 text-amber-800 border-amber-200';
            if (item.status === 'ABSENT') bgClass = 'bg-red-50 text-red-800 border-red-200';

            return (
              <div key={item.day} className={`p-3 rounded-lg border flex flex-col items-center justify-center min-h-[56px] ${bgClass}`}>
                <span className="font-bold text-sm">{item.day}</span>
                <span className="text-[9px] font-semibold uppercase mt-0.5">{item.status}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AttendanceCalendar;
