import React, { useState, useEffect, CSSProperties } from 'react';
import { Layout, Button, Typography, Row, Col, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  CodeOutlined,
  TeamOutlined,
  SafetyOutlined,
  ThunderboltOutlined,
  DashboardOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Paragraph } = Typography;

interface MousePosition {
  x: number;
  y: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

interface StatData {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
}

type ServerStatus = 'OPTIMAL' | 'EXCELLENT' | 'PEAK' | 'BLAZING';

export default function LandingPage(): JSX.Element {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState<boolean>(true);
  const [typedText, setTypedText] = useState<string>('');
  const [particles, setParticles] = useState<Particle[]>([]);
  const [serverStatus, setServerStatus] = useState<ServerStatus>('OPTIMAL');

  const taglineText: string = '[ COMPILE_SKILLS . EXECUTE_DREAMS ]';

  const navigate = useNavigate();

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= taglineText.length) {
        setTypedText(taglineText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 80);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    const statuses: ServerStatus[] = ['OPTIMAL', 'EXCELLENT', 'PEAK', 'BLAZING'];
    const interval = setInterval(() => {
      setServerStatus(statuses[Math.floor(Math.random() * statuses.length)]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const statsData: StatData[] = [
    { icon: <CodeOutlined />, value: 500, suffix: '+', label: 'ACTIVE_PROBLEMS' },
    { icon: <TeamOutlined />, value: 10, suffix: 'K+', label: 'TOTAL_ENGINEERS' },
    { icon: <SafetyOutlined />, value: 50, suffix: 'K+', label: 'VERIFIED_SOLUTIONS' },
  ];

  const gridStyle: CSSProperties = {
    backgroundImage: `
      linear-gradient(rgba(22, 119, 255, 0.3) 1px, transparent 1px),
      linear-gradient(90deg, rgba(22, 119, 255, 0.3) 1px, transparent 1px)
    `,
    backgroundSize: '50px 50px',
    transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
    transition: 'transform 0.3s ease-out',
  };

  const titleStyle: CSSProperties = {
    transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
    transition: 'transform 0.3s ease-out',
  };

  return (
    <Layout className="hil-layout">
      <div className="background-grid">
        <div style={gridStyle}></div>
      </div>

      {particles.map((particle: Particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animation: `float ${particle.duration}s infinite ease-in-out ${particle.delay}s`,
          }}
        />
      ))}

      <Header className="hil-header">
        <div className="logo-container">
          <div className="logo-text">~$ HIL_</div>
          <div className="logo-cursor"></div>
        </div>

        <nav className="nav-menu">
          <a href="#problems" className="nav-link">
            <span>01</span>
            <span className="nav-separator">:</span>
            <span>PROBLEMS</span>
          </a>
          <a href="#leaderboard" className="nav-link">
            <span>02</span>
            <span className="nav-separator">:</span>
            <span>LEADERBOARD</span>
          </a>
          <a href="#community" className="nav-link">
            <span>03</span>
            <span className="nav-separator">:</span>
            <span>COMMUNITY</span>
          </a>
          <Button className="auth-button">AUTH.LOGIN</Button>
        </nav>
      </Header>

      <Content className="hil-content">
        <div className="hero-section">
          <div className="title-container">
            <h1 className="main-title" style={titleStyle}>
              <span>HII</span>
              <span className="title-dot"></span>
              <span>CODERS</span>
            </h1>
          </div>

          <div className="tagline">
            <span>{typedText}</span>
            <span className={`cursor ${cursorVisible ? 'visible' : 'hidden'}`}></span>
          </div>

          <Paragraph className="description">
            Architect high-performance solutions for complex algorithmic challenges.
            <br />
            Systems-level thinking meets modern competitive programming.
          </Paragraph>

          <Space size="large" className="cta-buttons">
            <Button
              type="primary"
              size="large"
              className="primary-cta"
              onClick={() => navigate('/problems')}
            >
              <ThunderboltOutlined />
              <span>Start Coding</span>
              <span className="arrow">→</span>
            </Button>

            <Button size="large" className="secondary-cta">
              <DashboardOutlined />
              <span>VIEW_DASHBOARD</span>
              <span className="underscore">_</span>
            </Button>
          </Space>
        </div>

        <Row gutter={[24, 24]} className="stats-section">
          {statsData.map((stat: StatData, index: number) => (
            <Col xs={24} md={8} key={index}>
              <div
                className="stat-card"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className="corner-top-right"></div>
                <div className="corner-bottom-left"></div>

                <div className="stat-content">
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-value">
                    {stat.value}
                    <span className="stat-suffix">{stat.suffix}</span>
                  </div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Content>

      <Footer className="hil-footer">
        <div className="footer-content">
          <div className="footer-left">
            <div className="footer-logo">
              <span>~$</span>
              <span>HIL_CODERS.root</span>
            </div>
            <Paragraph className="footer-description">
              Engineering the next generation of algorithmic mastery. Precision built for
              high-performance developers.
            </Paragraph>
          </div>

          <div className="footer-right">
            <div className="footer-section">
              <h3>PLATFORM</h3>
              <div className="footer-links">
                <a href="#">PROBLEMS.SYS</a>
                <a href="#">RANKINGS.DAT</a>
                <a href="#">COMMUNITY.NODE</a>
              </div>
            </div>

            <div className="footer-section">
              <h3>LEGAL</h3>
              <div className="footer-links">
                <a href="#">PRIVACY.MD</a>
                <a href="#">TERMS.MD</a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>© 2024 HIL_CODERS. // ALL_SYSTEMS_OPERATIONAL.</div>
          <div className="server-status">
            <div className="status-dot"></div>
            <span>SERVER_STATUS: {serverStatus}</span>
          </div>
        </div>
      </Footer>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .hil-layout {
          min-height: 100vh;
          background-color: #000000;
          color: #ffffff;
          overflow: hidden;
          position: relative;
          font-family: 'Courier New', Courier, monospace;
        }

        .background-grid {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0.1;
          z-index: 0;
        }

        .background-grid > div {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          background-color: #1677ff;
          opacity: 0.2;
          pointer-events: none;
          z-index: 1;
        }

        .hil-header {
          position: relative;
          z-index: 10;
          background: transparent;
          padding: 24px 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #1f1f1f;
        }

        .logo-container {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }

        .logo-text {
          font-size: 24px;
          font-weight: bold;
          color: #22d3ee;
          transition: color 0.3s;
        }

        .logo-container:hover .logo-text {
          color: #67e8f9;
        }

        .logo-cursor {
          width: 8px;
          height: 20px;
          background-color: #22d3ee;
          animation: pulse 1s infinite;
        }

        .nav-menu {
          display: flex;
          align-items: center;
          gap: 32px;
          font-size: 14px;
        }

        .nav-link {
          color: #9ca3af;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 4px;
          transition: color 0.3s;
        }

        .nav-link:hover {
          color: #1677ff;
        }

        .nav-separator {
          color: #4b5563;
        }

        .auth-button {
          border-color: #374151;
          background: transparent;
          color: #d1d5db;
        }

        .auth-button:hover {
          border-color: #1677ff !important;
          background: rgba(22, 119, 255, 0.1) !important;
          color: #ffffff !important;
        }

        .hil-content {
          position: relative;
          z-index: 10;
          padding: 80px 32px 128px;
          background: transparent;
        }

        .hero-section {
          max-width: 896px;
          margin: 0 auto;
          text-align: center;
        }

        .title-container {
          margin-bottom: 48px;
          position: relative;
        }

        .main-title {
          font-size: 96px;
          font-weight: 900;
          margin-bottom: 24px;
          position: relative;
          display: inline-block;
          line-height: 1;
        }

        .title-dot {
          display: inline-block;
          width: 16px;
          height: 16px;
          background-color: #1677ff;
          border-radius: 50%;
          margin: 0 8px;
          margin-bottom: 16px;
          vertical-align: middle;
        }

        .glitch-layer {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          opacity: 0.7;
          mix-blend-mode: screen;
        }

        .glitch-blue {
          color: #1677ff;
          transform: translate(-2px, -2px);
          animation: glitch 3s infinite;
        }

        .glitch-cyan {
          color: #22d3ee;
          opacity: 0.5;
          transform: translate(2px, 2px);
          animation: glitch 2.5s infinite reverse;
        }

        .tagline {
          font-size: 24px;
          color: #22d3ee;
          margin-bottom: 32px;
          font-family: 'Courier New', Courier, monospace;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cursor {
          display: inline-block;
          width: 12px;
          height: 24px;
          background-color: #22d3ee;
          margin-left: 4px;
        }

        .cursor.visible {
          opacity: 1;
        }

        .cursor.hidden {
          opacity: 0;
        }

        .description {
          font-size: 18px;
          color: #9ca3af;
          margin-bottom: 48px;
          max-width: 672px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.75;
        }

        .cta-buttons {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 128px;
        }

        .primary-cta {
          padding: 16px 32px;
          height: auto;
          background-color: #1677ff;
          border: none;
          font-weight: bold;
          font-size: 16px;
          position: relative;
          overflow: hidden;
        }

        .primary-cta:hover {
          background-color: #0d5fd6 !important;
          box-shadow: 0 10px 40px rgba(22, 119, 255, 0.5);
        }

        .primary-cta .arrow {
          color: #67e8f9;
          margin-left: 8px;
        }

        .secondary-cta {
          padding: 16px 32px;
          height: auto;
          background: transparent;
          border: 2px solid #374151;
          color: #d1d5db;
          font-weight: bold;
          font-size: 16px;
        }

        .secondary-cta:hover {
          border-color: #1677ff !important;
          color: #ffffff !important;
          box-shadow: 0 10px 40px rgba(22, 119, 255, 0.3);
        }

        .secondary-cta .underscore {
          opacity: 0;
          transition: opacity 0.3s;
          color: #1677ff;
        }

        .secondary-cta:hover .underscore {
          opacity: 1;
        }

        .stats-section {
          max-width: 1280px;
          margin: 0 auto;
        }

        .stat-card {
          position: relative;
          background: linear-gradient(135deg, #111111 0%, #000000 100%);
          border: 1px solid #1f1f1f;
          padding: 32px;
          transition: all 0.3s;
        }

        .stat-card:hover {
          border-color: rgba(22, 119, 255, 0.5);
          box-shadow: 0 20px 60px rgba(22, 119, 255, 0.2);
        }

        .corner-top-right {
          position: absolute;
          top: 0;
          right: 0;
          width: 48px;
          height: 48px;
          border-top: 2px solid rgba(22, 119, 255, 0.3);
          border-right: 2px solid rgba(22, 119, 255, 0.3);
          transition: border-color 0.3s;
        }

        .stat-card:hover .corner-top-right {
          border-color: #1677ff;
        }

        .corner-bottom-left {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 48px;
          height: 48px;
          border-bottom: 2px solid rgba(22, 119, 255, 0.3);
          border-left: 2px solid rgba(22, 119, 255, 0.3);
          transition: border-color 0.3s;
        }

        .stat-card:hover .corner-bottom-left {
          border-color: #1677ff;
        }

        .stat-content {
          text-align: center;
        }

        .stat-icon {
          color: #1677ff;
          font-size: 48px;
          margin-bottom: 16px;
          transition: transform 0.3s;
        }

        .stat-card:hover .stat-icon {
          transform: scale(1.1);
        }

        .stat-value {
          font-size: 48px;
          font-weight: 900;
          color: #ffffff;
          margin-bottom: 8px;
          transition: color 0.3s;
        }

        .stat-card:hover .stat-value {
          color: #1677ff;
        }

        .stat-suffix {
          color: #1677ff;
        }

        .stat-label {
          color: #6b7280;
          font-size: 14px;
          letter-spacing: 2px;
          font-family: 'Courier New', Courier, monospace;
        }

        .hil-footer {
          position: relative;
          z-index: 10;
          border-top: 1px solid #1f1f1f;
          padding: 48px 32px;
          background: transparent;
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          margin-bottom: 32px;
          max-width: 1280px;
          margin-left: auto;
          margin-right: auto;
        }

        .footer-left {
          max-width: 384px;
        }

        .footer-logo {
          font-size: 20px;
          font-weight: bold;
          color: #22d3ee;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .footer-description {
          color: #6b7280;
          font-size: 14px;
          line-height: 1.75;
        }

        .footer-right {
          display: flex;
          gap: 64px;
        }

        .footer-section h3 {
          color: #9ca3af;
          font-size: 12px;
          margin-bottom: 16px;
          letter-spacing: 2px;
        }

        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .footer-links a {
          color: #6b7280;
          text-decoration: none;
          font-size: 14px;
          transition: color 0.3s;
        }

        .footer-links a:hover {
          color: #1677ff;
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          padding-top: 32px;
          border-top: 1px solid #111111;
          font-size: 12px;
          color: #4b5563;
          max-width: 1280px;
          margin-left: auto;
          margin-right: auto;
        }

        .server-status {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #10b981;
          font-family: 'Courier New', Courier, monospace;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          background-color: #10b981;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-30px) translateX(5px); }
        }

        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .main-title {
            font-size: 48px;
          }
          
          .nav-menu {
            flex-direction: column;
            gap: 16px;
          }
          
          .footer-content {
            flex-direction: column;
            gap: 32px;
          }
          
          .footer-bottom {
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }
        }
      `}</style>
    </Layout>
  );
}
