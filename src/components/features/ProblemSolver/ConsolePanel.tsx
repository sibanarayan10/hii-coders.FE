import { useState } from 'react';
import { Tabs, Tag, Typography, Space, Button, Tooltip, Flex } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { COLORS } from '../../../constants/theme';
import { TEST_CASES } from '../../../constants/editor';

const { Text } = Typography;

interface ConsolePanelProps {
  onCollapse?: () => void;
}

const ConsolePanel = ({ onCollapse }: ConsolePanelProps) => {
  const [activeCase, setActiveCase] = useState<string>('case1');

  const currentCase = TEST_CASES.find((c) => c.id === activeCase) ?? TEST_CASES[0];

  const testcaseContent = (
    <div style={{ padding: '12px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      {/* Case selector tags */}
      <div style={{ gridColumn: '1 / -1' }}>
        <Space size={8} wrap>
          {TEST_CASES.map((tc) => (
            <Tag
              key={tc.id}
              onClick={() => setActiveCase(tc.id)}
              style={{
                cursor: 'pointer',
                background: activeCase === tc.id ? COLORS.surfaceContainerHighest : COLORS.surfaceContainerHigh,
                color: activeCase === tc.id ? COLORS.primary : COLORS.onSurfaceVariant,
                border: 'none',
                borderRadius: 4,
                fontWeight: 700,
                fontSize: 10,
                padding: '3px 12px',
              }}
            >
              {tc.label}
            </Tag>
          ))}
        </Space>
      </div>

      {/* Inputs */}
      {currentCase.inputs.map((input) => (
        <div key={input.name}>
          <Text
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: COLORS.onSurfaceVariant,
              display: 'block',
              marginBottom: 8,
            }}
          >
            {input.name} =
          </Text>
          <div
            style={{
              background: COLORS.surfaceContainerLowest,
              padding: '8px 12px',
              borderRadius: 8,
              border: `1px solid ${COLORS.outlineVariant}18`,
              fontFamily: "'Fira Code', monospace",
              fontSize: 12,
              color: COLORS.onSurface,
            }}
          >
            {input.value}
          </div>
        </div>
      ))}
    </div>
  );

  const tabItems = [
    { key: 'testcase', label: 'Testcase', children: testcaseContent },
    { key: 'result',   label: 'Result',   children: <div style={{ padding: 16 }}><Text type="secondary">Run your code to see results.</Text></div> },
  ];

  return (
    <Flex
    vertical
      style={{
        height: "100%",
        background: COLORS.surfaceContainerLow,
        borderTop: `1px solid ${COLORS.outlineVariant}18`,
        flexShrink: 0,
      }}
    >
      <Tabs
        defaultActiveKey="testcase"
        items={tabItems}
        size="small"
        style={{ flex: 1, overflow: 'hidden' }}
        tabBarStyle={{
          paddingInline: 16,
          marginBottom: 0,
          borderBottom: `1px solid ${COLORS.outlineVariant}0d`,
          height: 40,
        }}
        tabBarExtraContent={
          <Tooltip title="Collapse console">
            <Button
              type="text"
              size="small"
              icon={<DownOutlined style={{ color: COLORS.onSurfaceVariant }} />}
              onClick={onCollapse}
            />
          </Tooltip>
        }
      />
    </Flex>
  );
};

export default ConsolePanel;
