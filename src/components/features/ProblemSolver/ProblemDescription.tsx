import { Tabs, Typography, Space, Flex, Spin } from 'antd';
import { LikeOutlined, ClockCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import { COLORS } from '../../../constants/theme';
import { useEffect, useState } from 'react';
import { Problem } from '../../../constants/problems';
import ProblemService from '../../../services/ProblemService';
import { useParams } from 'react-router-dom';
import { ParagraphBlock } from '../Blocks/ParagraphBlock';
import { ImageBlock } from '../Blocks/ImageBlock';
import { QuoteBlock } from '../Blocks/QuoteBlock';
import { HeaderBlock } from '../Blocks/HeaderBlock';
import { DifficultyBadge } from '../../common/DifficultyBadge';

const { Title, Text } = Typography;

const ProblemDescription = () => {
  const [problem, setProblem] = useState<Problem>();
  const [loading, setLoading] = useState<boolean>(false);

  const { id } = useParams<{ id: string }>();

  const getProblemDetail = async () => {
    if (!id) {
      console.error('Something went wrong');
      return;
    }
    try {
      setLoading(true);
      const res = await ProblemService.getProblemDetail(id);
      console.log(res);
      if (res.data) {
        setProblem(res.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const tabItems = [
    {
      key: 'description',
      label: 'Description',
      children: problem && <DescriptionContent problem={problem} />,
    },
    { key: 'solutions', label: 'Solutions' },
    { key: 'submissions', label: 'Submissions' },
  ];

  useEffect(() => {
    getProblemDetail();
  }, []);

  if (loading) {
    return (
      <Spin indicator={<LoadingOutlined style={{ color: COLORS.primary, fontSize: 24 }} spin />} />
    );
  }
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

const DescriptionContent = (props: { problem: Problem }) => (
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
        {props.problem.title}
      </Title>
      <Space size={12} align="center" wrap>
        <DifficultyBadge level={props.problem.difficulty} />
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
    {props.problem.blocks.map((block) => {
      switch (block.type) {
        case 'paragraph':
          return <ParagraphBlock data={block.data} />;

        case 'header':
          return <HeaderBlock data={block.data} />;

        case 'quote':
          return <QuoteBlock data={block.data} />;

        case 'image':
          return <ImageBlock data={block.data} />;
      }
    })}
  </div>
);

export default ProblemDescription;
