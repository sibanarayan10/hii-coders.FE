import { Layout, Button, Space, Typography } from 'antd';
import { HomeOutlined, CodeOutlined, TrophyOutlined, MenuOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { COLORS } from '../../../constants/theme';

const { Header } = Layout;
const { Text } = Typography;

const MainNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { key: '/', label: 'Home', icon: <HomeOutlined /> },
    { key: '/problems', label: 'Problems', icon: <CodeOutlined /> },
    { key: '/dashboard', label: 'Dashboard', icon: <TrophyOutlined /> },
  ];

  return (
    <Header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: COLORS.surfaceContainerLow,
        borderBottom: `1px solid ${COLORS.outlineVariant}`,
        height: 64,
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* Logo */}
      <div
        onClick={() => navigate('/')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          cursor: 'pointer',
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700,
            fontSize: 16,
            color: COLORS.onPrimary,
          }}
        >
          {'</>'}
        </div>
        <Text
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 18,
            fontWeight: 700,
            color: COLORS.onSurface,
            letterSpacing: '1px',
          }}
        >
          HII_CODERS
        </Text>
      </div>

      {/* Navigation */}
      <Space size={8}>
        {navItems.map((item) => (
          <Button
            key={item.key}
            type={location.pathname === item.key ? 'primary' : 'text'}
            icon={item.icon}
            onClick={() => navigate(item.key)}
            style={{
              height: 40,
              fontFamily: "'Space Mono', monospace",
              fontWeight: 600,
              ...(location.pathname === item.key
                ? {
                    background: COLORS.primary,
                    color: COLORS.onPrimary,
                    borderRadius: 0,
                  }
                : {
                    color: COLORS.onSurfaceVariant,
                  }),
            }}
          >
            {item.label}
          </Button>
        ))}
      </Space>
    </Header>
  );
};

export default MainNav;
