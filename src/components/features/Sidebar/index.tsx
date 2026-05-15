import { Space } from 'antd';
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
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      {/* <CompanyCollections
        selectedCompany={filters.company}
        onSelect={handleCompanySelect}
      /> */}
      <FilterPanel
        selectedDifficulties={filters.difficulties}
        selectedStatuses={filters.statuses}
        onDifficultyChange={(difficulties) => onFilterChange({ ...filters, difficulties })}
        onStatusChange={(statuses) => onFilterChange({ ...filters, statuses })}
      />
    </Space>
  );
};

export default Sidebar;
