import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import StatusIcon from '../../common/StatusIcon';
import DifficultyBadge from '../../common/DifficultyBadge';
import TopicTag from '../../common/TopicTag';
import { COLORS } from '../../../constants/theme';
import { STATUS, type Problem } from '../../../constants/problems';
import { ProblemCategoryLabel } from '../../../enums/ProblemCategory';

const buildColumns = (): ColumnsType<Problem> => [
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    width: 64,
    render: (_val, record) => <StatusIcon status={record.status || STATUS.TODO} />,
  },
  {
    title: 'Problem Title',
    dataIndex: 'title',
    key: 'title',
    render: (title: string, record: Problem) => {
      return (
        <div>
          <span className="problem-title-link" style={{ color: COLORS.primary, cursor: 'pointer' }}>
            {title}
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
            {record.categories.map((tag) => (
              <TopicTag key={tag} label={ProblemCategoryLabel[tag]} />
            ))}
          </div>
        </div>
      );
    },
  },
  {
    title: 'Difficulty',
    dataIndex: 'difficulty',
    key: 'difficulty',
    width: 120,
    render: (_val, record) => <DifficultyBadge difficulty={record.difficulty} />,
  },
  // {
  //   title: 'Acceptance',
  //   dataIndex: 'acceptance',
  //   key: 'acceptance',
  //   width: 120,
  //   align: 'right' as const,
  //   render: (acceptance: number) => (
  //     <span style={{ fontSize: 13, fontFamily: 'monospace', color: COLORS.onSurfaceVariant }}>
  //       {acceptance}%
  //     </span>
  //   ),
  // },
];

interface ProblemTableProps {
  problems: Problem[];
}

const ProblemTable = ({ problems }: ProblemTableProps) => {
  const navigate = useNavigate();

  return (
    <Table<Problem>
      dataSource={problems}
      columns={buildColumns()}
      rowKey="id"
      pagination={false}
      showSorterTooltip={false}
      onRow={(record) => ({
        style: { cursor: 'pointer' },
        onClick: () => navigate(`/problem/${record.id}`),
      })}
      style={{ borderRadius: 12, overflow: 'hidden' }}
    />
  );
};

export default ProblemTable;
