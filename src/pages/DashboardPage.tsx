import { Layout, Card, Typography, Row, Col, Progress, Space, Tag, Button, Timeline } from 'antd';
import {
  TrophyOutlined,
  FireOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ThunderboltOutlined,
  CodeOutlined,
  RiseOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import MainNav from '../components/layout/MainNav';
import { COLORS } from '../constants/theme';
import { DIFFICULTY, STATUS } from '../constants/problems';

const { Title, Text } = Typography;

const DashboardPage = () => {
  const navigate = useNavigate();

  // Mock user data
  const userData = {
    username: 'code_ninja_42',
    totalSolved: 127,
    streak: 15,
    rank: 1234,
    totalSubmissions: 342,
    acceptanceRate: 73.5,
    easySolved: 54,
    mediumSolved: 58,
    hardSolved: 15,
    easyTotal: 200,
    mediumTotal: 250,
    hardTotal: 100,
  };

  const recentActivity = [
    {
      problemId: 15,
      title: 'Jump Game',
      status: 'Solved',
      difficulty: DIFFICULTY.MEDIUM,
      timestamp: '2 hours ago',
      language: 'Python',
    },
    {
      problemId: 7,
      title: 'Container With Most Water',
      status: 'Attempted',
      difficulty: DIFFICULTY.MEDIUM,
      timestamp: '5 hours ago',
      language: 'JavaScript',
    },
    {
      problemId: 20,
      title: 'Longest Common Subsequence',
      status: 'Solved',
      difficulty: DIFFICULTY.MEDIUM,
      timestamp: '1 day ago',
      language: 'Python',
    },
  ];

  const badges = [
    { icon: <FireOutlined />, label: '15 Day Streak', color: COLORS.tertiary },
    { icon: <TrophyOutlined />, label: '100+ Solved', color: COLORS.secondary },
    { icon: <ThunderboltOutlined />, label: 'Speed Demon', color: COLORS.primary },
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: COLORS.background }}>
      <MainNav />

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '80px 24px 24px' }}>
        {/* Header */}
        <div style={{ marginBottom: 40, position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              top: -20,
              left: -20,
              fontSize: 120,
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              color: COLORS.surfaceContainerHigh,
              zIndex: 0,
              userSelect: 'none',
            }}
          >
            {'</>'}
          </div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Title
              level={1}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: COLORS.onSurface,
                marginBottom: 8,
                fontSize: 48,
              }}
            >
              {userData.username}
            </Title>
            <Space size={16}>
              <Tag
                icon={<RiseOutlined />}
                style={{
                  background: `${COLORS.secondary}22`,
                  border: `1px solid ${COLORS.secondary}`,
                  color: COLORS.secondary,
                  padding: '4px 12px',
                  fontSize: 14,
                  fontFamily: "'Space Mono', monospace",
                }}
              >
                Rank #{userData.rank}
              </Tag>
              {badges.map((badge, idx) => (
                <Tag
                  key={idx}
                  icon={badge.icon}
                  style={{
                    background: `${badge.color}22`,
                    border: `1px solid ${badge.color}`,
                    color: badge.color,
                    padding: '4px 12px',
                    fontSize: 14,
                    fontFamily: "'Space Mono', monospace",
                  }}
                >
                  {badge.label}
                </Tag>
              ))}
            </Space>
          </div>
        </div>

        <Row gutter={[24, 24]}>
          {/* Left Column - Stats */}
          <Col xs={24} lg={16}>
            {/* Main Stats Cards */}
            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
              <Col xs={12} md={6}>
                <Card
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.secondary}22, ${COLORS.secondary}11)`,
                    border: `2px solid ${COLORS.secondary}`,
                    borderRadius: 8,
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: 48, color: COLORS.secondary, marginBottom: 8 }}>
                    <TrophyOutlined />
                  </div>
                  <div
                    style={{
                      fontSize: 36,
                      fontWeight: 700,
                      color: COLORS.secondary,
                      fontFamily: "'JetBrains Mono', monospace",
                      marginBottom: 4,
                    }}
                  >
                    {userData.totalSolved}
                  </div>
                  <Text
                    style={{
                      color: COLORS.onSurfaceVariant,
                      fontSize: 12,
                      letterSpacing: '1px',
                      fontFamily: "'Space Mono', monospace",
                    }}
                  >
                    SOLVED
                  </Text>
                </Card>
              </Col>

              <Col xs={12} md={6}>
                <Card
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.tertiary}22, ${COLORS.tertiary}11)`,
                    border: `2px solid ${COLORS.tertiary}`,
                    borderRadius: 8,
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: 48, color: COLORS.tertiary, marginBottom: 8 }}>
                    <FireOutlined />
                  </div>
                  <div
                    style={{
                      fontSize: 36,
                      fontWeight: 700,
                      color: COLORS.tertiary,
                      fontFamily: "'JetBrains Mono', monospace",
                      marginBottom: 4,
                    }}
                  >
                    {userData.streak}
                  </div>
                  <Text
                    style={{
                      color: COLORS.onSurfaceVariant,
                      fontSize: 12,
                      letterSpacing: '1px',
                      fontFamily: "'Space Mono', monospace",
                    }}
                  >
                    DAY STREAK
                  </Text>
                </Card>
              </Col>

              <Col xs={12} md={6}>
                <Card
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.primary}22, ${COLORS.primary}11)`,
                    border: `2px solid ${COLORS.primary}`,
                    borderRadius: 8,
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: 48, color: COLORS.primary, marginBottom: 8 }}>
                    <CodeOutlined />
                  </div>
                  <div
                    style={{
                      fontSize: 36,
                      fontWeight: 700,
                      color: COLORS.primary,
                      fontFamily: "'JetBrains Mono', monospace",
                      marginBottom: 4,
                    }}
                  >
                    {userData.totalSubmissions}
                  </div>
                  <Text
                    style={{
                      color: COLORS.onSurfaceVariant,
                      fontSize: 12,
                      letterSpacing: '1px',
                      fontFamily: "'Space Mono', monospace",
                    }}
                  >
                    SUBMISSIONS
                  </Text>
                </Card>
              </Col>

              <Col xs={12} md={6}>
                <Card
                  style={{
                    background: COLORS.surfaceContainerLow,
                    border: `2px solid ${COLORS.outlineVariant}`,
                    borderRadius: 8,
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: 48, color: COLORS.onSurfaceVariant, marginBottom: 8 }}>
                    <CheckCircleOutlined />
                  </div>
                  <div
                    style={{
                      fontSize: 36,
                      fontWeight: 700,
                      color: COLORS.onSurface,
                      fontFamily: "'JetBrains Mono', monospace",
                      marginBottom: 4,
                    }}
                  >
                    {userData.acceptanceRate}%
                  </div>
                  <Text
                    style={{
                      color: COLORS.onSurfaceVariant,
                      fontSize: 12,
                      letterSpacing: '1px',
                      fontFamily: "'Space Mono', monospace",
                    }}
                  >
                    ACCEPTANCE
                  </Text>
                </Card>
              </Col>
            </Row>

            {/* Problem Breakdown */}
            <Card
              title={
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18 }}>
                  {'// PROBLEM_BREAKDOWN'}
                </span>
              }
              style={{
                background: COLORS.surfaceContainerLow,
                border: `1px solid ${COLORS.outlineVariant}`,
                borderRadius: 8,
                marginBottom: 24,
              }}
            >
              <Space direction="vertical" size={24} style={{ width: '100%' }}>
                {/* Easy */}
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: 8,
                    }}
                  >
                    <Text style={{ fontFamily: "'Space Mono', monospace", color: COLORS.secondary }}>
                      Easy
                    </Text>
                    <Text
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        color: COLORS.onSurface,
                        fontWeight: 600,
                      }}
                    >
                      {userData.easySolved}/{userData.easyTotal}
                    </Text>
                  </div>
                  <Progress
                    percent={(userData.easySolved / userData.easyTotal) * 100}
                    strokeColor={COLORS.secondary}
                    trailColor={COLORS.surfaceContainerHigh}
                    showInfo={false}
                    strokeWidth={12}
                  />
                </div>

                {/* Medium */}
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: 8,
                    }}
                  >
                    <Text style={{ fontFamily: "'Space Mono', monospace", color: COLORS.tertiary }}>
                      Medium
                    </Text>
                    <Text
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        color: COLORS.onSurface,
                        fontWeight: 600,
                      }}
                    >
                      {userData.mediumSolved}/{userData.mediumTotal}
                    </Text>
                  </div>
                  <Progress
                    percent={(userData.mediumSolved / userData.mediumTotal) * 100}
                    strokeColor={COLORS.tertiary}
                    trailColor={COLORS.surfaceContainerHigh}
                    showInfo={false}
                    strokeWidth={12}
                  />
                </div>

                {/* Hard */}
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: 8,
                    }}
                  >
                    <Text style={{ fontFamily: "'Space Mono', monospace", color: COLORS.error }}>
                      Hard
                    </Text>
                    <Text
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        color: COLORS.onSurface,
                        fontWeight: 600,
                      }}
                    >
                      {userData.hardSolved}/{userData.hardTotal}
                    </Text>
                  </div>
                  <Progress
                    percent={(userData.hardSolved / userData.hardTotal) * 100}
                    strokeColor={COLORS.error}
                    trailColor={COLORS.surfaceContainerHigh}
                    showInfo={false}
                    strokeWidth={12}
                  />
                </div>
              </Space>
            </Card>
          </Col>

          {/* Right Column - Activity */}
          <Col xs={24} lg={8}>
            <Card
              title={
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18 }}>
                  {'// RECENT_ACTIVITY'}
                </span>
              }
              style={{
                background: COLORS.surfaceContainerLow,
                border: `1px solid ${COLORS.outlineVariant}`,
                borderRadius: 8,
                height: '100%',
              }}
            >
              <Timeline
                items={recentActivity.map((activity) => ({
                  color:
                    activity.status === 'Solved'
                      ? COLORS.secondary
                      : activity.status === 'Attempted'
                        ? COLORS.tertiary
                        : COLORS.primary,
                  dot:
                    activity.status === 'Solved' ? (
                      <CheckCircleOutlined style={{ fontSize: 16 }} />
                    ) : (
                      <ClockCircleOutlined style={{ fontSize: 16 }} />
                    ),
                  children: (
                    <div style={{ marginBottom: 16 }}>
                      <div
                        onClick={() => navigate(`/problem/${activity.problemId}`)}
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          color: COLORS.primary,
                          cursor: 'pointer',
                          marginBottom: 4,
                          fontWeight: 600,
                        }}
                      >
                        {activity.title}
                      </div>
                      <Space size={8} wrap>
                        <Tag
                          style={{
                            background: 'transparent',
                            border: `1px solid ${COLORS.outlineVariant}`,
                            color: COLORS.onSurfaceVariant,
                            fontSize: 11,
                          }}
                        >
                          {activity.difficulty}
                        </Tag>
                        <Tag
                          style={{
                            background: 'transparent',
                            border: `1px solid ${COLORS.outlineVariant}`,
                            color: COLORS.onSurfaceVariant,
                            fontSize: 11,
                          }}
                        >
                          {activity.language}
                        </Tag>
                      </Space>
                      <div
                        style={{
                          fontSize: 12,
                          color: COLORS.onSurfaceVariant,
                          marginTop: 4,
                          fontFamily: "'Space Mono', monospace",
                        }}
                      >
                        <CalendarOutlined /> {activity.timestamp}
                      </div>
                    </div>
                  ),
                }))}
              />

              <Button
                type="primary"
                block
                icon={<ThunderboltOutlined />}
                onClick={() => navigate('/problems')}
                style={{
                  marginTop: 24,
                  height: 48,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 600,
                  background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
                  border: 'none',
                  borderRadius: 0,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                }}
              >
                Solve More Problems
              </Button>
            </Card>
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default DashboardPage;
