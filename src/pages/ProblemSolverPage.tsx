import { Layout } from 'antd';
import AppHeader from '../components/layout/AppHeader';
import SideNav from '../components/layout/SideNav';
import ProblemSolver from '../components/features/ProblemSolver';
import { useState } from 'react';
import ProblemsPage from './ProblemsPage';

export type Tab = 'explore' | 'problems';
const ProblemSolverPage = () => {
  const [tabSelection, setTabSelection] = useState<Tab>('explore');

  return (
    <Layout style={{ height: '100vh', overflow: 'hidden' }}>
      <AppHeader tabSelection={tabSelection} setTabSelection={setTabSelection} />
      <Layout style={{ overflow: 'hidden' }}>
        <SideNav />
        <TabChildren tabSelection={tabSelection} />
      </Layout>
    </Layout>
  );
};
export default ProblemSolverPage;

const TabChildren = ({ tabSelection }: { tabSelection: Tab }) => {
  switch (tabSelection) {
    case 'explore':
      return <ProblemsPage />;
    case 'problems':
      return <ProblemSolver />;
    default:
      return null;
  }
};
