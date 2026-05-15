import { Card, Space } from 'antd';
import StatsRow from './StatsRow';
import ProblemTable from './ProblemTable';
import TablePagination from './TablePagination';
import { COLORS } from '../../../constants/theme';
import type { Problem } from '../../../constants/problems';

interface ProblemListProps {
  problems: Problem[];
  total: number;
  totalAll: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const ProblemList = ({
  problems,
  total,
  totalAll,
  currentPage,
  totalPages,
  onPageChange,
}: ProblemListProps) => (
  <Space direction="vertical" size="large" style={{ width: '100%' }}>
    <StatsRow />
    <Card
      styles={{
        body: {
          padding: 0,
        }
      }}
      style={{
        background: COLORS.surfaceContainerLow,
        borderColor: COLORS.outlineVariant,
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 48,
      }}
    >
      <div className="no-scrollbar" style={{ overflowX: 'auto' }}>
        <ProblemTable problems={problems} />
      </div>
      <TablePagination
        currentPage={currentPage}
        total={total}
        totalAll={totalAll}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </Card>
  </Space>
);

export default ProblemList;
