import { ConfigProvider } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { antdTheme } from './constants/theme';

// Pages
import LandingPage from './pages/LandingPage';
import ProblemsPage from './pages/ProblemsPage';
import ProblemDetailPage from './pages/ProblemDetailPage';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/FallbackPage';
import { AuthProvider } from './contexts/AuthContext';
import { SignUp } from './components/features/Form/SignUp';
import AdminDashboard from './pages/AdminDashboardPage';

const App = () => (
  <ConfigProvider theme={antdTheme}>
    <Router>
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
    </Router>
  </ConfigProvider>
);

export default App;
