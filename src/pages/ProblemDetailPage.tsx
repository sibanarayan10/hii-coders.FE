import { Layout, Button, Space, Breadcrumb, Spin } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import {
  HomeOutlined,
  UnorderedListOutlined,
  SolutionOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import ProblemSolver from '../components/features/ProblemSolver';
import { COLORS } from '../constants/theme';

const ProblemDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <Layout style={{ height: '100vh', overflow: 'hidden' }}>
      {/* Top Navigation Bar */}
      <div
        style={{
          height: 56,
          background: COLORS.surfaceContainerLow,
          borderBottom: `1px solid ${COLORS.outlineVariant}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingInline: 24,
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <Space size={16}>
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/problems')}
            style={{
              color: COLORS.onSurfaceVariant,
              fontFamily: "'Space Mono', monospace",
            }}
          >
            Back
          </Button>

          <div style={{ borderLeft: `1px solid ${COLORS.outlineVariant}`, height: 24 }} />

          <Breadcrumb
            items={[
              {
                title: (
                  <Space>
                    <HomeOutlined />
                    <span>Home</span>
                  </Space>
                ),
                onClick: () => navigate('/'),
              },
              {
                title: (
                  <Space>
                    <UnorderedListOutlined />
                    <span>Problems</span>
                  </Space>
                ),
                onClick: () => navigate('/problems'),
              },
              {
                title: `${''}`,
              },
            ]}
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 13,
            }}
          />
        </Space>

        <Button
          icon={<SolutionOutlined />}
          onClick={() => navigate(`/problem/${id}/solutions`)}
          style={{
            background: COLORS.surfaceContainerHigh,
            border: `1px solid ${COLORS.outlineVariant}`,
            color: COLORS.primary,
            fontFamily: "'Space Mono', monospace",
            fontWeight: 600,
          }}
        >
          View Solutions
        </Button>
      </div>

      {/* Problem Solver */}
      <ProblemSolver />
    </Layout>
  );
};

export default ProblemDetailPage;
