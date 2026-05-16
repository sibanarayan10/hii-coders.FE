import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import { LandingPage } from './pages/LandingPage';
import ProblemsPage from './pages/ProblemsPage';
import ProblemDetailPage from './pages/ProblemDetailPage';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/FallbackPage';
import { AuthProvider } from './contexts/AuthContext';
import { SignUp } from './components/features/Form/SignUp';
import AdminDashboard from './pages/AdminDashboardPage';
import { AppConfigProvider } from './contexts/AppConfigProvider';

const App = () => (
  <Router>
    <AppConfigProvider >

      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/problems" element={<ProblemsPage />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignUp />} />
          <Route path="/problem/:id" element={<ProblemDetailPage />} />
          {/* <Route path="/problem/:id/solutions" element={<SolutionsPage />} /> */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>

      </AuthProvider>
    </AppConfigProvider>

  </Router >
);

export default App;
