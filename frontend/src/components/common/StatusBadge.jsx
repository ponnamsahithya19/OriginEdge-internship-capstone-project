import React from 'react';

const StatusBadge = ({ status }) => {
  const getBadgeClass = (st) => {
    switch (st) {
      case 'COMPLETED':
      case 'ACTIVE':
      case 'FACULTY_APPROVED':
      case 'COMPANY_SELECTED':
      case 'VERIFIED':
        return 'badge-success';
      case 'FACULTY_PENDING':
      case 'SUBMITTED':
      case 'PENDING':
        return 'badge-warning';
      case 'FACULTY_REJECTED':
      case 'COMPANY_REJECTED':
      case 'CLOSED':
      case 'SUSPENDED':
        return 'badge-danger';
      default:
        return 'badge-info';
    }
  };

  const formatText = (st) => {
    if (!st) return 'N/A';
    return st.replace(/_/g, ' ');
  };

  return (
    <span className={`badge-status ${getBadgeClass(status)}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
      {formatText(status)}
    </span>
  );
};

export default StatusBadge;
