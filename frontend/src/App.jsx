import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';
import MobileNav from './components/common/MobileNav';

import LandingPage from './pages/landing/LandingPage';
import Login from './pages/auth/Login';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import InternshipCatalog from './pages/student/InternshipCatalog';
import ApplicationTracker from './pages/student/ApplicationTracker';
import LogbookJournal from './pages/student/LogbookJournal';
import AttendanceCalendar from './pages/student/AttendanceCalendar';
import DocumentCenter from './pages/student/DocumentCenter';
import AICareerInsights from './pages/student/AICareerInsights';
import CertificatePage from './pages/student/CertificatePage';

// Faculty Pages
import FacultyDashboard from './pages/faculty/FacultyDashboard';
import ApplicationApprovals from './pages/faculty/ApplicationApprovals';
import EvaluationMatrix from './pages/faculty/EvaluationMatrix';

// Company Pages
import CompanyDashboard from './pages/company/CompanyDashboard';
import PostInternship from './pages/company/PostInternship';
import ApplicantATS from './pages/company/ApplicantATS';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import CompanyApprovals from './pages/admin/CompanyApprovals';

// Authenticated Layout Shell
const DashboardLayout = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col pb-16 md:pb-0">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
      <MobileNav />
    </div>
  );
};

// Automatic Dashboard Role Redirection Handler
const RoleDashboardRedirect = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'ADMIN') return <Navigate to="/admin/dashboard" replace />;
  if (user.role === 'FACULTY') return <Navigate to="/faculty/dashboard" replace />;
  if (user.role === 'COMPANY') return <Navigate to="/company/dashboard" replace />;
  return <Navigate to="/student/dashboard" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />

        {/* Authenticated Dashboard Shell */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<RoleDashboardRedirect />} />

          {/* Student Routes */}
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/internships" element={<InternshipCatalog />} />
          <Route path="/student/applications" element={<ApplicationTracker />} />
          <Route path="/student/logbooks" element={<LogbookJournal />} />
          <Route path="/student/attendance" element={<AttendanceCalendar />} />
          <Route path="/student/documents" element={<DocumentCenter />} />
          <Route path="/student/ai-insights" element={<AICareerInsights />} />
          <Route path="/student/certificate" element={<CertificatePage />} />

          {/* Faculty Routes */}
          <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
          <Route path="/faculty/approvals" element={<ApplicationApprovals />} />
          <Route path="/faculty/supervision" element={<FacultyDashboard />} />
          <Route path="/faculty/evaluations" element={<EvaluationMatrix />} />

          {/* Company Routes */}
          <Route path="/company/dashboard" element={<CompanyDashboard />} />
          <Route path="/company/post-internship" element={<PostInternship />} />
          <Route path="/company/applicants" element={<ApplicantATS />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/companies" element={<CompanyApprovals />} />
          <Route path="/admin/analytics" element={<AdminDashboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
