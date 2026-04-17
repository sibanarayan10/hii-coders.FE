import { Dispatch, SetStateAction, useState } from 'react';
import { Flex, Input, Tabs } from 'antd';
import MaterialIcon from '../../common/MaterialIcon';
import { COLORS } from '../../../constants/theme';
import { HEADER_ACTIONS, NAV_LINKS, NavLink } from '../../../constants/navigation';
import { Typography } from 'antd';
import { Tab } from '../../../pages/ProblemSolverPage';

const { Text } = Typography;

const AppHeader = (props: {
  tabSelection: Tab;
  setTabSelection: Dispatch<SetStateAction<Tab>>;
}) => {
  const [search, setSearch] = useState<string>('');

  return (
    <header
      style={{
        background: '#131313',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        borderBottom: `1px solid ${COLORS.outlineVariant}22`,
      }}
    >
      <Flex
        align="center"
        justify="space-between"
        style={{
          maxWidth: 1440,
          margin: '0 auto',
          padding: '5px 24px',
        }}
      >
        {/* Logo + Nav */}
        <Flex align="center" gap={32}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 800,
              letterSpacing: '-0.04em',
              color: '#f4f4f5',
              cursor: 'pointer',
            }}
          >
            Hii Coder'S
          </Text>

          <Tabs
            defaultActiveKey={props.tabSelection}
            items={NAV_LINKS.map((link) => ({
              key: link.key,
              label: link.label,
            }))}
            tabBarStyle={{
              marginBottom: 0,
            }}
            onChange={(nv) => props.setTabSelection(nv as any)}
          />
        </Flex>

        {/* Search + Actions + Avatar */}
        <Flex align="center" gap={8}>
          <Flex
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: COLORS.surfaceContainerHighest,
              padding: '6px 12px',
              borderRadius: 8,
            }}
          >
            <MaterialIcon icon="search" size={16} style={{ color: COLORS.onSurfaceVariant }} />
            <Input
              placeholder="Search problems..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              variant="borderless"
              style={{
                background: 'transparent',
                padding: 0,
                fontSize: 14,
                width: 192,
                color: COLORS.onSurface,
                boxShadow: 'none',
              }}
            />
          </Flex>

          {HEADER_ACTIONS.map((action) => (
            <button
              key={action.key}
              style={{
                padding: 8,
                borderRadius: '50%',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background = 'transparent')
              }
            >
              <MaterialIcon icon={action.icon} size={22} style={{ color: COLORS.outline }} />
            </button>
          ))}

          {/* Avatar */}
          <Flex
            align="center"
            justify="center"
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: COLORS.primaryContainer,
              marginLeft: 8,
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 700,
              color: COLORS.primaryFixed,
              flexShrink: 0,
            }}
          >
            U
          </Flex>
        </Flex>
      </Flex>
    </header>
  );
};

export default AppHeader;
