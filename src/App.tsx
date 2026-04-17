import { ConfigProvider } from 'antd';
import { antdTheme } from './constants/theme';
import ProblemSolverPage from './pages/ProblemSolverPage';

const App = () => (
  <ConfigProvider theme={antdTheme}>
    <ProblemSolverPage />
  </ConfigProvider>
);

export default App;
