import CompanyCollections from './CompanyCollections';
import FilterPanel from './FilterPanel';
import type { Filters } from '../../../hooks/useProblems';

interface SidebarProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

const Sidebar = ({ filters, onFilterChange }: SidebarProps) => {
  const handleCompanySelect = (company: string | null): void => {
    onFilterChange({ ...filters, company });
  };

  return (
    <aside style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <CompanyCollections
        selectedCompany={filters.company}
        onSelect={handleCompanySelect}
      />
      <FilterPanel
        selectedDifficulties={filters.difficulties}
        selectedStatuses={filters.statuses}
        onDifficultyChange={(difficulties) => onFilterChange({ ...filters, difficulties })}
        onStatusChange={(statuses) => onFilterChange({ ...filters, statuses })}
      />
    </aside>
  );
};

export default Sidebar;
