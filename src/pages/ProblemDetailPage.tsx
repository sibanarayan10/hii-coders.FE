import { Layout, Button, Space, Breadcrumb, Spin } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import {
  HomeOutlined,
  UnorderedListOutlined,
  SolutionOutlined,
  ArrowLeftOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import ProblemSolver from '../components/features/ProblemSolver';
import { COLORS } from '../constants/theme';
import { useEffect, useState } from 'react';
import ProblemService from '../services/ProblemService';
import { Problem } from '../constants/problems';

const ProblemDetailPage = () => {
  const [problem, setProblem] = useState<Problem>();
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const getProblemDetail = async () => {
    if (!id) {
      console.error('Something went wrong');
      return;
    }
    try {
      setLoading(true);
      const res = await ProblemService.getProblemDetail(id);
      if (res.data) {
        setProblem(res.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProblemDetail();
  }, []);

  if (loading) {
    return (
      <Spin indicator={<LoadingOutlined style={{ color: COLORS.primary, fontSize: 24 }} spin />} />
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
                title: `${problem?.title}`,
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
