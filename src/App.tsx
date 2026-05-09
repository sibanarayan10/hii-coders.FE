import { ConfigProvider } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { antdTheme } from './constants/theme';

// Pages
import LandingPage from './pages/LandingPage';
import ProblemsPage from './pages/ProblemsPage';
import ProblemDetailPage from './pages/ProblemDetailPage';
import SolutionsPage from './pages/SolutionsPage';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/FallbackPage';

const App = () => (
  <ConfigProvider theme={antdTheme}>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/problems" element={<ProblemsPage />} />
        <Route path="/problem/:id" element={<ProblemDetailPage />} />
        <Route path="/problem/:id/solutions" element={<SolutionsPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  </ConfigProvider>
);

export default App;
