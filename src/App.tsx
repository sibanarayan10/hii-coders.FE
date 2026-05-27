import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import { LandingPage } from './pages/LandingPage';
import ProblemsPage from './pages/ProblemsPage';
import { DashboardPage } from './pages/DashboardPage';
import NotFoundPage from './pages/FallbackPage';
import { AuthProvider } from './contexts/AuthContext';
import AdminDashboard from './pages/AdminDashboardPage';
import { AppConfigProvider } from './contexts/AppConfigProvider';
import { ProblemSolvePage } from './pages/ProblemSolvePage';
import { AuthPage } from './pages/AuthPage';

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
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

      </AuthProvider>
    </AppConfigProvider>

  </Router >
);

export default App;
