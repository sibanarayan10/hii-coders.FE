import { useProblems } from '../hooks/useProblems';
import { Layout } from 'antd';
import MainNav from '../components/layout/MainNav';
import AppFooter from '../components/layout/AppFooter';
import Sidebar from '../components/features/Sidebar';
import ProblemList from '../components/features/ProblemList';
import FAB from '../components/features/FAB';

const ProblemsPage = () => {
  const {
    problems,
    total,
    totalAll,
    currentPage,
    totalPages,
    filters,
    onFilterChange,
    onPageChange,
  } = useProblems();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <MainNav />
      <main
        style={{
          paddingTop: 80,
          paddingLeft: 24,
          paddingRight: 24,
          maxWidth: 1440,
          margin: '0 auto',
          minHeight: '100vh',
          flex: 1,
        }}
      >
        <div
          className="problems-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '3fr 9fr',
            gap: 32,
            alignItems: 'start',
            paddingTop: 24,
          }}
        >
          <Sidebar filters={filters} onFilterChange={onFilterChange} />

          <ProblemList
            problems={problems}
            total={total}
            totalAll={totalAll}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      </main>

      <AppFooter />
      <FAB />
    </Layout>
  );
};

export default ProblemsPage;
