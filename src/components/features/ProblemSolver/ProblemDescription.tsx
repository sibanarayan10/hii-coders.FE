import { Tabs, Tag, Typography, Space, Flex } from 'antd';
import { LikeOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { COLORS } from '../../../constants/theme';

const { Title, Paragraph, Text } = Typography;

const ProblemDescription = () => {
  const tabItems = [
    {
      key: 'description',
      label: 'Description',
      children: <DescriptionContent />,
    },
    { key: 'solutions', label: 'Solutions' },
    { key: 'submissions', label: 'Submissions' },
  ];

  return (
    <Flex
      vertical={true}
      style={{
        width: '100%',
        height: '100%',
        minWidth: 300,
        background: COLORS.surfaceContainerLow,
        borderRight: `1px solid ${COLORS.outlineVariant}18`,
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      <Tabs
        defaultActiveKey="description"
        items={tabItems}
        style={{ flex: 1, overflow: 'hidden' }}
        tabBarStyle={{
          paddingInline: 16,
          marginBottom: 0,
          borderBottom: `1px solid ${COLORS.outlineVariant}18`,
        }}
        tabBarGutter={16}
      />
    </Flex>
  );
};

const DescriptionContent = () => (
  <div
    style={{
      padding: '0 24px 24px',
      overflowY: 'auto',
      height: '100%',
    }}
  >
    {/* Title + Meta */}
    <Space direction="vertical" size={8} style={{ width: '100%', marginBottom: 24 }}>
      <Title level={3} style={{ margin: 0, fontWeight: 900, letterSpacing: '-0.02em' }}>
        Two Sum Variations
      </Title>
      <Space size={12} align="center" wrap>
        <Tag
          style={{
            background: 'rgba(19,166,80,0.15)',
            color: COLORS.secondary,
            border: `1px solid ${COLORS.secondary}33`,
            borderRadius: 2,
            fontWeight: 700,
            fontSize: 10,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          EASY
        </Tag>
        <Text type="secondary" style={{ fontSize: 12 }}>
          <Space size={4}>
            <LikeOutlined />
            4.2k
          </Space>
        </Text>
        <Text type="secondary" style={{ fontSize: 12 }}>
          <Space size={4}>
            <ClockCircleOutlined />
            15 mins
          </Space>
        </Text>
      </Space>
    </Space>

    {/* Description */}
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <Paragraph type="secondary" style={{ fontSize: 14, lineHeight: 1.7, margin: 0 }}>
        Given an array of integers{' '}
        <Text code style={{ color: COLORS.primary, background: COLORS.surfaceContainerHigh }}>
          nums
        </Text>{' '}
        and an integer{' '}
        <Text code style={{ color: COLORS.primary, background: COLORS.surfaceContainerHigh }}>
          target
        </Text>
        , return indices of the two numbers such that they add up to target.
      </Paragraph>

      <Paragraph type="secondary" style={{ fontSize: 14, lineHeight: 1.7, margin: 0 }}>
        You may assume that each input would have exactly one solution, and you may not use the same
        element twice. You can return the answer in any order.
      </Paragraph>

      {/* Example block */}
      <div
        style={{
          background: COLORS.surfaceContainerLowest,
          padding: 16,
          borderRadius: 8,
          border: `1px solid ${COLORS.outlineVariant}18`,
          fontFamily: "'Fira Code', monospace",
          fontSize: 12,
        }}
      >
        <Text strong style={{ display: 'block', marginBottom: 8, color: COLORS.onSurfaceVariant }}>
          Example 1:
        </Text>
        <Space direction="vertical" size={4} style={{ width: '100%' }}>
          <div>
            <Text style={{ color: COLORS.primaryFixedDim }}>Input: </Text>
            <Text style={{ color: COLORS.onSurface }}>nums = [2,7,11,15], target = 9</Text>
          </div>
          <div>
            <Text style={{ color: COLORS.primaryFixedDim }}>Output: </Text>
            <Text style={{ color: COLORS.onSurface }}>[0,1]</Text>
          </div>
          <Text
            type="secondary"
            italic
            style={{ fontSize: 11, display: 'block', marginTop: 4, opacity: 0.8 }}
          >
            Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
          </Text>
        </Space>
      </div>

      {/* Constraints */}
      <div>
        <Text
          strong
          style={{
            fontSize: 11,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: 12,
            color: COLORS.onSurface,
          }}
        >
          Constraints
        </Text>
        <Space direction="vertical" size={8}>
          {['2 <= nums.length <= 10⁴', '-10⁹ <= nums[i] <= 10⁹'].map((c) => (
            <Space key={c} size={8} align="center">
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: COLORS.primary,
                  opacity: 0.4,
                  flexShrink: 0,
                }}
              />
              <Text type="secondary" style={{ fontSize: 12 }}>
                {c}
              </Text>
            </Space>
          ))}
        </Space>
      </div>
    </Space>
  </div>
);

export default ProblemDescription;
