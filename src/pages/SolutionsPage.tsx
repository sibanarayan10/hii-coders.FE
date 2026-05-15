import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Layout,
  Card,
  Typography,
  Space,
  Button,
  Tag,
  Avatar,
  Tabs,
  Select,
  Row,
  Col,
  Divider,
} from 'antd';
import {
  ArrowLeftOutlined,
  LikeOutlined,
  EyeOutlined,
  ClockCircleOutlined,
  CodeOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { COLORS } from '../constants/theme';
import MainNav from '../components/layout/MainNav';

const { Title, Text } = Typography;

// Mock solutions data
const MOCK_SOLUTIONS = [
  {
    id: 1,
    userId: 'code_ninja_42',
    avatar: null,
    language: 'python3',
    title: 'Optimal HashMap Solution - O(n) Time',
    code: `def twoSum(nums, target):
    """
    Elegant hash map solution with single pass
    Time: O(n), Space: O(n)
    """
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
    explanation:
      "This solution uses a hash map to store numbers we've seen. As we iterate, we check if the complement (target - current number) exists in our map. This gives us O(n) time complexity with a single pass.",
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    likes: 342,
    views: 2845,
    timestamp: '2 days ago',
    tags: ['Hash Table', 'Optimal'],
  },
  {
    id: 2,
    userId: 'algo_master',
    avatar: null,
    language: 'javascript',
    title: 'Two Pointer Approach (Sorted Array Variation)',
    code: `function twoSum(nums, target) {
    // Create array of [value, originalIndex] pairs
    const indexed = nums.map((num, i) => [num, i]);
    
    // Sort by value
    indexed.sort((a, b) => a[0] - b[0]);
    
    let left = 0;
    let right = indexed.length - 1;
    
    while (left < right) {
        const sum = indexed[left][0] + indexed[right][0];
        
        if (sum === target) {
            return [indexed[left][1], indexed[right][1]];
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    
    return [];
}`,
    explanation:
      'This two-pointer solution sorts the array first while keeping track of original indices. We then use two pointers moving from both ends to find the pair. Note: sorting adds O(n log n) complexity.',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    likes: 189,
    views: 1432,
    timestamp: '5 days ago',
    tags: ['Two Pointers', 'Sorting'],
  },
  {
    id: 3,
    userId: 'byte_wizard',
    avatar: null,
    language: 'cpp',
    title: 'STL Map Solution with Iterator',
    code: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> numMap;
        
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            
            auto it = numMap.find(complement);
            if (it != numMap.end()) {
                return {it->second, i};
            }
            
            numMap[nums[i]] = i;
        }
        
        return {};
    }
};`,
    explanation:
      'C++ implementation using STL unordered_map for O(1) average lookup. Uses iterators for clean code and follows modern C++ best practices.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    likes: 256,
    views: 1923,
    timestamp: '1 week ago',
    tags: ['Hash Table', 'C++ STL'],
  },
];

const SolutionsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<string>('most-liked');

  return (
    <Layout style={{ minHeight: '100vh', background: COLORS.background }}>
      <MainNav />

      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '80px 24px 24px',
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(`/problem/${id}`)}
            style={{
              color: COLORS.onSurfaceVariant,
              fontFamily: "'Space Mono', monospace",
              marginBottom: 16,
            }}
          >
            Back to Problem
          </Button>

          <Title
            level={2}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: COLORS.onSurface,
              marginBottom: 8,
            }}
          >
            Solutions for: {problem.title}
          </Title>

          <Space size={16}>
            <Tag
              color={
                problem.difficulty === 'Easy'
                  ? 'green'
                  : problem.difficulty === 'Medium'
                    ? 'orange'
                    : 'red'
              }
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              {problem.difficulty}
            </Tag>
            <Text style={{ color: COLORS.onSurfaceVariant }}>
              {MOCK_SOLUTIONS.length} community solutions
            </Text>
          </Space>
        </div>

        {/* Filters */}
        <div
          style={{
            marginBottom: 24,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Tabs
            defaultActiveKey="all"
            items={[
              { key: 'all', label: 'All Languages' },
              { key: 'python', label: 'Python' },
              { key: 'javascript', label: 'JavaScript' },
              { key: 'cpp', label: 'C++' },
            ]}
          />

          <Select
            value={sortBy}
            onChange={setSortBy}
            style={{ width: 200 }}
            options={[
              { value: 'most-liked', label: 'Most Liked' },
              { value: 'most-viewed', label: 'Most Viewed' },
              { value: 'newest', label: 'Newest' },
              { value: 'oldest', label: 'Oldest' },
            ]}
          />
        </div>

        {/* Solutions List */}
        <Space direction="vertical" size={24} style={{ width: '100%' }}>
          {MOCK_SOLUTIONS.map((solution, idx) => (
            <Card
              key={solution.id}
              style={{
                background: COLORS.surfaceContainerLow,
                border: `1px solid ${COLORS.outlineVariant}`,
                borderRadius: 8,
              }}
            >
              {/* Solution Header */}
              <div style={{ marginBottom: 16 }}>
                <Row justify="space-between" align="middle" style={{ marginBottom: 12 }}>
                  <Col>
                    <Space>
                      <Avatar icon={<UserOutlined />} style={{ background: COLORS.primary }} />
                      <div>
                        <div
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontWeight: 600,
                            color: COLORS.onSurface,
                          }}
                        >
                          {solution.userId}
                        </div>
                        <Space size={12} style={{ fontSize: 12, color: COLORS.onSurfaceVariant }}>
                          <span>
                            <ClockCircleOutlined /> {solution.timestamp}
                          </span>
                          <span>
                            <EyeOutlined /> {solution.views}
                          </span>
                        </Space>
                      </div>
                    </Space>
                  </Col>
                  <Col>
                    <Space>
                      <Tag
                        icon={<CodeOutlined />}
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          background: COLORS.surfaceContainerHigh,
                          border: 'none',
                        }}
                      >
                        {solution.language}
                      </Tag>
                    </Space>
                  </Col>
                </Row>

                <Title
                  level={4}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: COLORS.onSurface,
                    marginBottom: 8,
                  }}
                >
                  {solution.title}
                </Title>

                <Space size={8} wrap>
                  {solution.tags.map((tag) => (
                    <Tag
                      key={tag}
                      style={{
                        background: 'transparent',
                        border: `1px solid ${COLORS.outlineVariant}`,
                        color: COLORS.onSurfaceVariant,
                      }}
                    >
                      {tag}
                    </Tag>
                  ))}
                </Space>
              </div>

              {/* Explanation */}
              <div
                style={{
                  background: COLORS.surfaceContainerLowest,
                  padding: 16,
                  borderRadius: 4,
                  marginBottom: 16,
                  borderLeft: `4px solid ${COLORS.secondary}`,
                }}
              >
                <Text style={{ color: COLORS.onSurface, lineHeight: 1.6 }}>
                  {solution.explanation}
                </Text>
              </div>

              {/* Code */}
              <div
                style={{
                  borderRadius: 8,
                  overflow: 'hidden',
                  marginBottom: 16,
                }}
              >
                <SyntaxHighlighter
                  language={solution.language === 'python3' ? 'python' : solution.language}
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    padding: 24,
                    background: COLORS.surfaceContainerLowest,
                    fontSize: 14,
                    fontFamily: "'Fira Code', monospace",
                  }}
                  showLineNumbers
                >
                  {solution.code}
                </SyntaxHighlighter>
              </div>

              {/* Complexity Analysis */}
              <Row gutter={16} style={{ marginBottom: 16 }}>
                <Col span={12}>
                  <div
                    style={{
                      background: COLORS.surfaceContainer,
                      padding: 12,
                      borderRadius: 4,
                    }}
                  >
                    <Space>
                      <ThunderboltOutlined style={{ color: COLORS.tertiary }} />
                      <div>
                        <Text style={{ fontSize: 12, color: COLORS.onSurfaceVariant }}>
                          Time Complexity
                        </Text>
                        <div
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            color: COLORS.tertiary,
                            fontWeight: 600,
                          }}
                        >
                          {solution.timeComplexity}
                        </div>
                      </div>
                    </Space>
                  </div>
                </Col>
                <Col span={12}>
                  <div
                    style={{
                      background: COLORS.surfaceContainer,
                      padding: 12,
                      borderRadius: 4,
                    }}
                  >
                    <Space>
                      <TrophyOutlined style={{ color: COLORS.primary }} />
                      <div>
                        <Text style={{ fontSize: 12, color: COLORS.onSurfaceVariant }}>
                          Space Complexity
                        </Text>
                        <div
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            color: COLORS.primary,
                            fontWeight: 600,
                          }}
                        >
                          {solution.spaceComplexity}
                        </div>
                      </div>
                    </Space>
                  </div>
                </Col>
              </Row>

              {/* Actions */}
              <Divider style={{ margin: '16px 0', borderColor: COLORS.outlineVariant }} />
              <Space>
                <Button
                  type="text"
                  icon={<LikeOutlined />}
                  style={{
                    color: COLORS.primary,
                    fontFamily: "'Space Mono', monospace",
                  }}
                >
                  {solution.likes} Likes
                </Button>
                <Button
                  type="text"
                  style={{
                    color: COLORS.onSurfaceVariant,
                    fontFamily: "'Space Mono', monospace",
                  }}
                >
                  Discuss
                </Button>
                <Button
                  type="text"
                  style={{
                    color: COLORS.onSurfaceVariant,
                    fontFamily: "'Space Mono', monospace",
                  }}
                >
                  Copy Code
                </Button>
              </Space>
            </Card>
          ))}
        </Space>

        {/* Submit Your Solution CTA */}
        <Card
          style={{
            marginTop: 32,
            background: `linear-gradient(135deg, ${COLORS.primaryContainer}44, ${COLORS.secondaryContainer}44)`,
            border: `2px solid ${COLORS.primary}`,
            borderRadius: 8,
            textAlign: 'center',
          }}
        >
          <Title
            level={4}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: COLORS.onSurface,
              marginBottom: 8,
            }}
          >
            Have a better solution?
          </Title>
          <Text style={{ color: COLORS.onSurfaceVariant, marginBottom: 16, display: 'block' }}>
            Share your approach with the community and help others learn!
          </Text>
          <Button
            type="primary"
            size="large"
            onClick={() => navigate(`/problem/${id}`)}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 600,
              borderRadius: 0,
              background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
              border: 'none',
            }}
          >
            Submit Your Solution
          </Button>
        </Card>
      </div>
    </Layout>
  );
};

export default SolutionsPage;
