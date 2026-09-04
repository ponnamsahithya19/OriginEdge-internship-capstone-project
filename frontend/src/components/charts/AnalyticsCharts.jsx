import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

export const PlacementRateChart = () => {
  const data = {
    labels: ['Placed / Offered', 'In Verification', 'Seeking Internship'],
    datasets: [
      {
        data: [88, 8, 4],
        backgroundColor: ['#10b981', '#6366f1', '#f59e0b'],
        borderColor: '#0f172a',
        borderWidth: 3
      }
    ]
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#94a3b8', font: { family: 'Plus Jakarta Sans', size: 11 } }
      }
    },
    cutout: '70%',
    maintainAspectRatio: false
  };

  return (
    <div className="h-64 relative flex items-center justify-center">
      <Doughnut data={data} options={options} />
      <div className="absolute flex flex-col items-center justify-center pointer-events-none">
        <span className="text-3xl font-extrabold text-white">88%</span>
        <span className="text-[10px] uppercase font-semibold text-slate-400">Placed</span>
      </div>
    </div>
  );
};

export const ApplicationStatusTrend = () => {
  const data = {
    labels: ['Submitted', 'Faculty Approved', 'Company Selected', 'Completed'],
    datasets: [
      {
        label: 'Applications Count',
        data: [42, 38, 29, 24],
        backgroundColor: '#4f46e5',
        borderRadius: 8
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#94a3b8' } },
      y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94a3b8' } }
    }
  };

  return (
    <div className="h-64">
      <Bar data={data} options={options} />
    </div>
  );
};
