import { Layout, Button, Space, Breadcrumb } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import {
  HomeOutlined,
  UnorderedListOutlined,
  SolutionOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import ProblemSolver from '../components/features/ProblemSolver';
import { COLORS } from '../constants/theme';
import { MOCK_PROBLEMS } from '../constants/problems';

const ProblemDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find the problem by ID
  const problem = MOCK_PROBLEMS.find((p) => p.id === Number(id));

  if (!problem) {
    return (
      <Layout style={{ minHeight: '100vh', background: COLORS.background }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            flexDirection: 'column',
            gap: 24,
          }}
        >
          <h1 style={{ color: COLORS.onSurface, fontFamily: "'JetBrains Mono', monospace" }}>
            Problem not found
          </h1>
          <Button type="primary" onClick={() => navigate('/problems')}>
            Back to Problems
          </Button>
        </div>
      </Layout>
    );
  }

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
                style: { cursor: 'pointer' },
              },
              {
                title: (
                  <Space>
                    <UnorderedListOutlined />
                    <span>Problems</span>
                  </Space>
                ),
                onClick: () => navigate('/problems'),
                style: { cursor: 'pointer' },
              },
              {
                title: `${problem.id}. ${problem.title}`,
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
