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

const App = () => (
  <Router>
    <AppConfigProvider >

      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/problems" element={<ProblemsPage />} />
          <Route path="/sign-up" element={<AuthPage />} />
          <Route path="/sign-in" element={<AuthPage />} />
          <Route path="/problems/:id" element={<ProblemSolvePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/problems" element={<AdminProblemsPage />} />
          <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

      </AuthProvider>
    </AppConfigProvider>

  </Router >
);

export default App;
