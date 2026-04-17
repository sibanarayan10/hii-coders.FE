import { useProblems } from '../hooks/useProblems';
import AppHeader from '../components/layout/AppHeader';
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
    <>
      <main
        style={{
          paddingTop: 80,
          paddingLeft: 24,
          paddingRight: 24,
          maxWidth: 1440,
          margin: '0 auto',
          minHeight: '100vh',
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
    </>
  );
};

export default ProblemsPage;
