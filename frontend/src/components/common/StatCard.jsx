import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ title, value, change, icon: Icon, color = 'indigo' }) => {
  const getColorStyle = (c) => {
    switch (c) {
      case 'emerald':
        return 'from-emerald-500/20 to-emerald-500/5 text-emerald-400 border-emerald-500/30';
      case 'amber':
        return 'from-amber-500/20 to-amber-500/5 text-amber-400 border-amber-500/30';
      case 'cyan':
        return 'from-cyan-500/20 to-cyan-500/5 text-cyan-400 border-cyan-500/30';
      case 'purple':
        return 'from-purple-500/20 to-purple-500/5 text-purple-400 border-purple-500/30';
      default:
        return 'from-indigo-500/20 to-indigo-500/5 text-indigo-400 border-indigo-500/30';
    }
  };

  return (
    <div className={`p-5 rounded-2xl glass-panel bg-gradient-to-br ${getColorStyle(color)} border relative overflow-hidden transition hover:-translate-y-0.5`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</span>
        <div className={`p-2 rounded-xl bg-slate-800/80 border border-slate-700/50`}>
          {Icon && <Icon className="w-5 h-5" />}
        </div>
      </div>
      <div className="flex items-baseline justify-between">
        <div className="text-2xl font-extrabold text-white tracking-tight">{value}</div>
        {change && (
          <div className="flex items-center text-xs font-bold text-emerald-400 gap-1 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            <TrendingUp className="w-3 h-3" />
            <span>{change}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
