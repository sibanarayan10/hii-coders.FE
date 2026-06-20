import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import { LandingPage } from './pages/LandingPage';
import ProblemsPage from './pages/ProblemsPage';
import { DashboardPage } from './pages/DashboardPage';
import NotFoundPage from './pages/FallbackPage';
import { AuthProvider } from './contexts/AuthContext';
import { AppConfigProvider } from './contexts/AppConfigProvider';
import { ProblemSolvePage } from './pages/ProblemSolvePage';
import { AuthPage } from './pages/AuthPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminProblemsPage from './pages/admin/AdminProblemsPage';
import AdminAnalyticsPage from './pages/admin/AdminAnalyticsPage';
import { ForgotPasswordPage } from './pages/ForgetPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';

const App = () => (
  <Router>
    <AuthProvider>
      <AppConfigProvider >
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/problems" element={<ProblemsPage />} />
          <Route path="/auth/sign-up" element={<AuthPage />} />
          <Route path="/auth/sign-in" element={<AuthPage />} />
          <Route path="/problems/:id" element={<ProblemSolvePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/problems" element={<AdminProblemsPage />} />
          <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
          <Route path="/auth/forget-password" element={<ForgotPasswordPage />} />
          <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AppConfigProvider>

    </AuthProvider>

  </Router >
);

export default App;
