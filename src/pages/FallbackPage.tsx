import { Layout, Typography, Button, Space, Row, Col } from 'antd';

const { Header, Footer, Content } = Layout;
const { Title, Text, Link } = Typography;

export default function NotFoundPage() {
  return (
    <Layout
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at center, #141826 0%, #07090f 60%, #040507 100%)',
        color: '#fff',
      }}
    >
      <Header
        style={{
          background: 'rgba(0,0,0,0.45)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: '0 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Title
          level={3}
          style={{
            color: '#fff',
            margin: 0,
            fontWeight: 700,
            letterSpacing: '-1px',
          }}
        >
          Code Architect
        </Title>

        <Space size={40}>
          <Text style={{ color: '#d9d9d9', cursor: 'pointer' }}>Problems</Text>

          <Text style={{ color: '#d9d9d9', cursor: 'pointer' }}>Contests</Text>

          <Text style={{ color: '#d9d9d9', cursor: 'pointer' }}>Leaderboard</Text>

          <Text style={{ color: '#d9d9d9', cursor: 'pointer' }}>Discuss</Text>
        </Space>

        <Button
          type="link"
          style={{
            color: '#ffffff',
            fontWeight: 600,
          }}
        >
          Sign In
        </Button>
      </Header>

      {/* MAIN CONTENT */}
      <Content
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center',
          padding: '40px 20px',
          position: 'relative',
        }}
      >
        {/* TECH CARD */}
        <div
          style={{
            position: 'relative',
            marginBottom: '50px',
          }}
        >
          <div
            style={{
              width: '260px',
              height: '260px',
              border: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              background: 'rgba(255,255,255,0.01)',
            }}
          >
            <div
              style={{
                width: '180px',
                height: '180px',
                border: '2px solid rgba(255,255,255,0.35)',
                background: '#1a1c22',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 30px rgba(255,255,255,0.04)',
              }}
            >
              <Title
                level={1}
                style={{
                  color: '#bfc8ff',
                  margin: 0,
                  fontSize: '56px',
                  fontWeight: 300,
                }}
              >
                {'</>'}
              </Title>
            </div>

            {/* LABELS */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                left: '-55px',
                background: '#2b2f38',
                color: '#fff',
                padding: '4px 12px',
                fontSize: '11px',
                letterSpacing: '1px',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              PTR_NULL
            </div>

            <div
              style={{
                position: 'absolute',
                bottom: '40px',
                right: '-90px',
                background: '#2b2f38',
                color: '#fff',
                padding: '4px 12px',
                fontSize: '11px',
                letterSpacing: '1px',
                border: '1px dashed #ff9b9b',
              }}
            >
              STACK_OVERFLOW_PREV
            </div>
          </div>
        </div>

        {/* 404 */}
        <Title
          style={{
            color: '#f3f3f3',
            fontSize: '190px',
            lineHeight: 1,
            margin: 0,
            fontWeight: 800,
            letterSpacing: '-10px',
          }}
        >
          404
        </Title>

        <Text
          style={{
            color: '#9bb1ff',
            letterSpacing: '4px',
            fontSize: '14px',
            marginTop: '18px',
          }}
        >
          SYSTEM_ERROR: RESOURCE_NOT_FOUND
        </Text>

        <Title
          level={2}
          style={{
            color: '#f5f5f5',
            maxWidth: '800px',
            marginTop: '25px',
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          The requested architectural block does not exist at this memory address.
        </Title>

        {/* ACTIONS */}
        <Space
          size={30}
          style={{
            marginTop: '40px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <Button
            type="primary"
            size="large"
            style={{
              height: '54px',
              padding: '0 36px',
              borderRadius: '10px',
              fontWeight: 600,
              fontSize: '16px',
              background: 'linear-gradient(180deg, #79a6ff 0%, #2769ff 100%)',
              border: 'none',
              boxShadow: '0 10px 30px rgba(39,105,255,0.3)',
            }}
          >
            Return to Dashboard
          </Button>

          <Button
            type="link"
            style={{
              color: '#ffffff',
              letterSpacing: '2px',
              fontSize: '15px',
            }}
          >
            VIEW PROBLEM LIST
          </Button>

          <Button
            type="link"
            style={{
              color: '#ffffff',
              letterSpacing: '2px',
              fontSize: '15px',
            }}
          >
            VISIT SUPPORT
          </Button>
        </Space>
      </Content>

      {/* FOOTER */}
      <Footer
        style={{
          background: 'transparent',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: '28px 40px',
        }}
      >
        <Row justify="space-between" align="middle">
          <Col>
            <Space direction="vertical" size={2}>
              <Title
                level={4}
                style={{
                  color: '#fff',
                  margin: 0,
                }}
              >
                Code Architect
              </Title>

              <Text style={{ color: '#8f96a3' }}>
                © 2024 Code Architect. Built for the precision engineer.
              </Text>
            </Space>
          </Col>

          <Col>
            <Space size={28}>
              <Link style={{ color: '#c7c7c7' }}>Documentation</Link>
              <Link style={{ color: '#c7c7c7' }}>System Status</Link>
              <Link style={{ color: '#c7c7c7' }}>Terms of Service</Link>
              <Link style={{ color: '#c7c7c7' }}>Privacy Policy</Link>
              <Link style={{ color: '#c7c7c7' }}>API</Link>
            </Space>
          </Col>
        </Row>
      </Footer>
    </Layout>
  );
}
