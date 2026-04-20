import { useNavigate } from 'react-router-dom';
import { Button, Typography, Row, Col, Card } from 'antd';
import {
  CodeOutlined,
  RocketOutlined,
  TrophyOutlined,
  ThunderboltOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import { COLORS } from '../constants/theme';
import { useEffect, useState } from 'react';

const { Title, Text, Paragraph } = Typography;

const LandingPage = () => {
  const navigate = useNavigate();
  const [glitchText, setGlitchText] = useState('HII_CODERS');

  useEffect(() => {
    const glitchChars = '!<>-_\\/[]{}—=+*^?#________';
    const originalText = 'HII_CODERS';
    let frame = 0;

    const interval = setInterval(() => {
      if (frame % 30 === 0) {
        const glitched = originalText
          .split('')
          .map((char, i) =>
            Math.random() > 0.9
              ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
              : char
          )
          .join('');
        setGlitchText(glitched);
        setTimeout(() => setGlitchText(originalText), 50);
      }
      frame++;
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: COLORS.background,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated Grid Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(${COLORS.outlineVariant}22 1px, transparent 1px),
            linear-gradient(90deg, ${COLORS.outlineVariant}22 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridScroll 20s linear infinite',
          opacity: 0.3,
        }}
      />

      {/* Scanline Effect */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.15),
            rgba(0, 0, 0, 0.15) 1px,
            transparent 1px,
            transparent 2px
          )`,
          pointerEvents: 'none',
          animation: 'scanline 8s linear infinite',
        }}
      />

      <style>
        {`
          @keyframes gridScroll {
            0% { transform: translateY(0); }
            100% { transform: translateY(50px); }
          }

          @keyframes scanline {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
          }

          @keyframes glitch {
            0%, 100% { transform: translate(0); }
            33% { transform: translate(-2px, 2px); }
            66% { transform: translate(2px, -2px); }
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

          .fade-in-up {
            animation: fadeInUp 0.6s ease-out forwards;
            opacity: 0;
          }

          .terminal-box {
            border: 2px solid ${COLORS.primary};
            background: ${COLORS.surfaceContainerLowest};
            padding: 24px;
            position: relative;
            font-family: 'Courier New', monospace;
          }

          .terminal-box::before {
            content: '>';
            position: absolute;
            left: 8px;
            top: 8px;
            color: ${COLORS.secondary};
            font-weight: bold;
            animation: blink 1s infinite;
          }

          @keyframes blink {
            0%, 49% { opacity: 1; }
            50%, 100% { opacity: 0; }
          }

          .ascii-border {
            border: 3px solid ${COLORS.primary};
            border-image: repeating-linear-gradient(
              45deg,
              ${COLORS.primary},
              ${COLORS.primary} 10px,
              ${COLORS.secondary} 10px,
              ${COLORS.secondary} 20px
            ) 3;
          }

          .feature-card {
            background: ${COLORS.surfaceContainerLow};
            border: 2px solid ${COLORS.outlineVariant};
            transition: all 0.3s ease;
            height: 100%;
          }

          .feature-card:hover {
            border-color: ${COLORS.primary};
            transform: translateY(-4px);
            box-shadow: 0 8px 24px ${COLORS.primary}33;
          }

          @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=JetBrains+Mono:wght@400;700&display=swap');
        `}
      </style>

      <div style={{ position: 'relative', zIndex: 1, padding: '60px 24px' }}>
        {/* Hero Section */}
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          {/* ASCII Art Logo */}
          <div
            className="fade-in-up"
            style={{
              animationDelay: '0s',
              marginBottom: 32,
              fontFamily: "'Courier New', monospace",
              fontSize: 12,
              lineHeight: 1.2,
              color: COLORS.secondary,
              letterSpacing: 1,
            }}
          >
            <pre style={{ margin: 0, display: 'inline-block', textAlign: 'left' }}>
              {`
   ╦ ╦╦╦    ╔═╗╔═╗╔╦╗╔═╗╦═╗╔═╗
   ╠═╣║║    ║  ║ ║ ║║║╣ ╠╦╝╚═╗
   ╩ ╩╩╩═╝  ╚═╝╚═╝═╩╝╚═╝╩╚═╚═╝
              `}
            </pre>
          </div>

          {/* Main Headline */}
          <Title
            level={1}
            className="fade-in-up"
            style={{
              animationDelay: '0.1s',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 72,
              fontWeight: 700,
              margin: 0,
              marginBottom: 16,
              color: COLORS.onSurface,
              letterSpacing: '-2px',
              textTransform: 'uppercase',
              animation: 'glitch 3s infinite',
            }}
          >
            {glitchText}
          </Title>

          <Paragraph
            className="fade-in-up"
            style={{
              animationDelay: '0.2s',
              fontSize: 20,
              color: COLORS.primary,
              marginBottom: 12,
              fontFamily: "'Space Mono', monospace",
              letterSpacing: '4px',
            }}
          >
            [ COMPILE_SKILLS . EXECUTE_DREAMS ]
          </Paragraph>

          <Paragraph
            className="fade-in-up"
            style={{
              animationDelay: '0.3s',
              fontSize: 16,
              color: COLORS.onSurfaceVariant,
              maxWidth: 600,
              margin: '0 auto 48px',
              lineHeight: 1.6,
              fontFamily: "'Space Mono', monospace",
            }}
          >
            Master algorithms through real-world challenges. Break down complex problems into elegant
            solutions. Join thousands of coders leveling up their skills.
          </Paragraph>

          {/* CTA Buttons */}
          <div
            className="fade-in-up"
            style={{
              animationDelay: '0.4s',
              display: 'flex',
              gap: 16,
              justifyContent: 'center',
              marginBottom: 80,
            }}
          >
            <Button
              type="primary"
              size="large"
              icon={<ThunderboltOutlined />}
              onClick={() => navigate('/problems')}
              style={{
                height: 56,
                paddingInline: 48,
                fontSize: 16,
                fontWeight: 700,
                fontFamily: "'JetBrains Mono', monospace",
                background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
                border: 'none',
                borderRadius: 0,
                textTransform: 'uppercase',
                letterSpacing: '2px',
              }}
            >
              Start Coding
              <ArrowRightOutlined style={{ marginLeft: 8 }} />
            </Button>

            <Button
              size="large"
              icon={<TrophyOutlined />}
              onClick={() => navigate('/dashboard')}
              style={{
                height: 56,
                paddingInline: 32,
                fontSize: 16,
                fontWeight: 700,
                fontFamily: "'JetBrains Mono', monospace",
                background: 'transparent',
                border: `2px solid ${COLORS.primary}`,
                color: COLORS.primary,
                borderRadius: 0,
                textTransform: 'uppercase',
                letterSpacing: '2px',
              }}
            >
              View Dashboard
            </Button>
          </div>

          {/* Stats */}
          <Row
            gutter={[24, 24]}
            className="fade-in-up"
            style={{ animationDelay: '0.5s', marginBottom: 80 }}
          >
            {[
              { label: 'PROBLEMS', value: '500+', icon: <CodeOutlined /> },
              { label: 'USERS', value: '10K+', icon: <RocketOutlined /> },
              { label: 'SOLUTIONS', value: '50K+', icon: <TrophyOutlined /> },
            ].map((stat, idx) => (
              <Col xs={24} sm={8} key={idx}>
                <div
                  className="terminal-box"
                  style={{
                    textAlign: 'center',
                    paddingLeft: 32,
                  }}
                >
                  <div style={{ fontSize: 32, marginBottom: 8, color: COLORS.secondary }}>
                    {stat.icon}
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
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: COLORS.onSurfaceVariant,
                      letterSpacing: '2px',
                      fontFamily: "'Space Mono', monospace",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              </Col>
            ))}
          </Row>

          {/* Features */}
          <div className="fade-in-up" style={{ animationDelay: '0.6s' }}>
            <Title
              level={2}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 36,
                marginBottom: 48,
                color: COLORS.onSurface,
                textTransform: 'uppercase',
                letterSpacing: '2px',
              }}
            >
              {'// FEATURES'}
            </Title>

            <Row gutter={[32, 32]}>
              {[
                {
                  title: 'Real-time Code Execution',
                  desc: 'Test your solutions instantly with our powerful execution engine',
                  icon: <ThunderboltOutlined style={{ fontSize: 32 }} />,
                  color: COLORS.secondary,
                },
                {
                  title: 'Community Solutions',
                  desc: 'Learn from others and share your elegant approaches',
                  icon: <CodeOutlined style={{ fontSize: 32 }} />,
                  color: COLORS.primary,
                },
                {
                  title: 'Progress Tracking',
                  desc: 'Monitor your growth with detailed analytics and insights',
                  icon: <TrophyOutlined style={{ fontSize: 32 }} />,
                  color: COLORS.tertiary,
                },
              ].map((feature, idx) => (
                <Col xs={24} md={8} key={idx}>
                  <Card
                    className="feature-card"
                    style={{ padding: 24, borderRadius: 0 }}
                  >
                    <div
                      style={{
                        width: 64,
                        height: 64,
                        background: `${feature.color}22`,
                        border: `2px solid ${feature.color}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 24,
                        color: feature.color,
                      }}
                    >
                      {feature.icon}
                    </div>
                    <Title
                      level={4}
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        color: COLORS.onSurface,
                        marginBottom: 12,
                        fontSize: 18,
                      }}
                    >
                      {feature.title}
                    </Title>
                    <Text
                      style={{
                        color: COLORS.onSurfaceVariant,
                        fontSize: 14,
                        lineHeight: 1.6,
                      }}
                    >
                      {feature.desc}
                    </Text>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>

          {/* Footer CTA */}
          <div
            className="fade-in-up ascii-border"
            style={{
              animationDelay: '0.7s',
              marginTop: 100,
              padding: 48,
              textAlign: 'center',
            }}
          >
            <Title
              level={3}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: COLORS.onSurface,
                marginBottom: 16,
                fontSize: 28,
              }}
            >
              {'> Ready to compile your future?'}
            </Title>
            <Text
              style={{
                color: COLORS.onSurfaceVariant,
                fontSize: 16,
                display: 'block',
                marginBottom: 32,
              }}
            >
              Join the community and start solving problems today.
            </Text>
            <Button
              type="primary"
              size="large"
              icon={<RocketOutlined />}
              onClick={() => navigate('/problems')}
              style={{
                height: 56,
                paddingInline: 48,
                fontSize: 16,
                fontWeight: 700,
                fontFamily: "'JetBrains Mono', monospace",
                background: COLORS.primary,
                border: 'none',
                borderRadius: 0,
                textTransform: 'uppercase',
                letterSpacing: '2px',
              }}
            >
              Launch IDE
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
