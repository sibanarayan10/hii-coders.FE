import { useState } from "react";
import {
  Typography,
  Row,
  Col,
  Avatar,
  Badge,
  Space,
  Divider,
  Tag,
  ConfigProvider,
  theme,
} from "antd";
import {
  ThunderboltOutlined,
  BulbOutlined,
  GlobalOutlined,
  BarChartOutlined,
  TrophyOutlined,
  BankOutlined,
  RiseOutlined,
  FireOutlined,
  CheckCircleFilled,
  ArrowRightOutlined,
  GithubOutlined,
  TwitterOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import { THEME } from "../constants/theme";
import { Navbar } from "../components/common/Navbar";
import { AppButton } from "../components/common/AppButton";
import { SectionTitle } from "../components/common/SectionTitle";
import { AppCard } from "../components/common/AppCard";
import { useNavigate } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;

const leaders = [
  { rank: 1, name: "dev_wizard", pts: "2,940 pts" },
  { rank: 2, name: "byte_me", pts: "2,882 pts" },
  { rank: 3, name: "code_ninja", pts: "2,843 pts" },
];

const testimonials = [
  {
    quote: "The AI hints aren't just answers; they teach you how to think. DevCode helped me land my Senior Engineer role at Meta in just 3 months.",
    name: "Alex Chen",
    role: "L6 Engineer at Meta",
  },
  {
    quote: "The interface is so much better than the legacy platforms. It feels like my favorite IDE, which makes the long practice sessions actually enjoyable.",
    name: "Sarah Jenkins",
    role: "Fullstack Developer",
  },
];

const footerCols = [
  { title: "PLATFORM", links: ["Problems", "Contests", "Companies", "Learning Paths"] },
  { title: "RESOURCES", links: ["Blog", "Documentation", "Discord Community", "API"] },
  { title: "LEGAL", links: ["Privacy Policy", "Terms of Service", "Security"] },
];

const features = [
  { icon: <ThunderboltOutlined />, title: "Real-time Execution", desc: "Compile and run your code instantly against production-grade test cases." },
  { icon: <BulbOutlined />, title: "AI Coding Hints", desc: "React? Get contextual nudges and complexity analysis from our tuned LLM." },
  { icon: <GlobalOutlined />, title: "Multiple Languages", desc: "From Rust to Python, master your language of choice with full SDK support." },
  { icon: <BarChartOutlined />, title: "Detailed Analytics", desc: "Visualize your progress with runtime percentile and memory usage graphs." },
  { icon: <TrophyOutlined />, title: "Weekly Contests", desc: "Compete with global developers and climb the seasonal rankings." },
  { icon: <BankOutlined />, title: "Company Curated", desc: "Practice questions actually asked in Google, Meta, and Amazon interviews." },
];
const CodeEditor = () => (
  <div
    style={{
      background: "#101828",
      border: `1px solid ${THEME.bgCardBorder}`,
      borderRadius: 12,
      overflow: "hidden",
      maxWidth: 560,
      margin: "0 auto",
      boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
    }}
  >
    {/* Title bar */}
    <div
      style={{
        background: "#0d1520",
        padding: "10px 16px",
        display: "flex",
        alignItems: "center",
        gap: 8,
        borderBottom: `1px solid ${THEME.bgCardBorder}`,
      }}
    >
      {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
        <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
      ))}
      <Space size={6} style={{ marginLeft: 12 }}>
        {["function", "solution.js"].map((t, i) => (
          <Text
            key={t}
            style={{
              color: i === 1 ? THEME.textPrimary : THEME.textSecondary,
              fontSize: 12,
              fontFamily: "'Fira Code', monospace",
              background: i === 1 ? THEME.bgCardBorder : "transparent",
              padding: "2px 10px",
              borderRadius: 4,
            }}
          >
            {t}
          </Text>
        ))}
      </Space>
    </div>
    {/* Code lines */}
    <div style={{ padding: "16px 20px", fontFamily: "'Fira Code', monospace", fontSize: 13 }}>
      {[
        { ln: 1, code: <><span style={{ color: "#569cd6" }}>function</span> <span style={{ color: "#dcdcaa" }}>twoSum</span><span style={{ color: "#d4d4d4" }}>(nums, target) {"{"}</span></> },
        { ln: 2, code: <><span style={{ color: "#569cd6" }}>  const</span> <span style={{ color: "#9cdcfe" }}>map</span> <span style={{ color: "#d4d4d4" }}>= new</span> <span style={{ color: "#4ec9b0" }}>Map</span><span style={{ color: "#d4d4d4" }}>();</span></> },
        { ln: 3, code: <><span style={{ color: "#569cd6" }}>  for</span> <span style={{ color: "#d4d4d4" }}>(let i = 0; i {"<"} nums.length; i++) {"{"}</span></> },
        { ln: 4, code: null },
        { ln: 5, code: <><span style={{ color: "#6a9955" }}>    // AI Suggestion: Check if complement exists</span></> },
        { ln: 6, code: null },
      ].map(({ ln, code }) => (
        <div key={ln} style={{ display: "flex", gap: 16, lineHeight: "22px", minHeight: 22 }}>
          <span style={{ color: "#3c4a6e", minWidth: 16, userSelect: "none" }}>{ln}</span>
          <span>{code}</span>
        </div>
      ))}
      {/* Cursor blink */}
      <div style={{ display: "flex", gap: 16, lineHeight: "22px" }}>
        <span style={{ color: "#3c4a6e", minWidth: 16 }}>7</span>
        <span
          style={{
            display: "inline-block",
            width: 2,
            height: 16,
            background: THEME.accent,
            animation: "blink 1.1s step-end infinite",
            verticalAlign: "middle",
          }}
        />
      </div>
    </div>
  </div>
);

export const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: THEME.accent,
          fontFamily: "'Space Grotesk', sans-serif",
          colorBgContainer: THEME.bgCard,
          colorBorder: THEME.bgCardBorder,
          borderRadius: 10,
        },
      }}
    >
      {/* Global styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Fira+Code:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${THEME.bg}; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        .hero-anim { animation: fadeUp 0.8s ease forwards; }
        .hero-anim-2 { animation: fadeUp 0.8s 0.15s ease both; }
        .hero-anim-3 { animation: fadeUp 0.8s 0.3s ease both; }
        .hero-anim-4 { animation: fadeUp 0.8s 0.45s ease both; }
        .feat-card:hover { border-color: ${THEME.accent} !important; transform: translateY(-3px); transition: all 0.25s; }
        .feat-card { transition: all 0.25s; }
        section { padding: 90px 40px; }
        @media(max-width:768px){ section{padding:60px 20px;} }
      `}</style>

      <div style={{ background: THEME.bg, minHeight: "100vh", color: THEME.textPrimary }}>
        <Navbar />

        <section
          style={{
            paddingTop: 140,
            paddingBottom: 80,
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background glow */}
          <div
            style={{
              position: "absolute",
              top: "10%",
              left: "50%",
              transform: "translateX(-50%)",
              width: 600,
              height: 400,
              background: "radial-gradient(ellipse, rgba(108,99,255,0.18) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div className="hero-anim">
            <Title
              style={{
                color: THEME.textPrimary,
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 52,
                lineHeight: 1.15,
                maxWidth: 620,
                margin: "0 auto 16px",
              }}
            >
              Master Coding Interviews Through Real Practice
            </Title>
          </div>
          <div className="hero-anim-2">
            <Paragraph
              style={{
                color: THEME.textSecondary,
                fontSize: 16,
                maxWidth: 500,
                margin: "0 auto 32px",
                lineHeight: 1.7,
              }}
            >
              Solve real-world challenges, track your growth with advanced analytics, and get hired by top tech companies.
            </Paragraph>
          </div>
          <div className="hero-anim-3">
            <Space size={14} wrap style={{ justifyContent: "center" }}>
              <AppButton buttonVariant="primary" style={{ height: 44, padding: "0 28px", fontSize: 15 }} onClick={() => navigate("/problmes")}>
                Start Solving
              </AppButton>
              <AppButton buttonVariant="outline" style={{ height: 44, padding: "0 28px", fontSize: 15 }} onClick={() => navigate("/problmes")}>
                Explore Problems
              </AppButton>
            </Space>
          </div>
          <div className="hero-anim-4" style={{ marginTop: 56 }}>
            <CodeEditor />
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section style={{ background: "rgba(13,21,48,0.6)", padding: "80px 60px" }}>
          <SectionTitle>Everything You Need To Excel</SectionTitle>
          <div style={{ height: 40 }} />
          <Row gutter={[20, 20]} style={{ maxWidth: 1000, margin: "0 auto" }}>
            {features.map((f) => (
              <Col xs={24} sm={12} md={8} key={f.title}>
                <AppCard className="feat-card" style={{ height: "100%" }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: "rgba(108,99,255,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                      color: THEME.accent,
                      marginBottom: 14,
                    }}
                  >
                    {f.icon}
                  </div>
                  <Title level={5} style={{ color: THEME.textPrimary, fontFamily: "'Space Grotesk',sans-serif", marginBottom: 6 }}>
                    {f.title}
                  </Title>
                  <Text style={{ color: THEME.textSecondary, fontSize: 13, lineHeight: 1.6 }}>{f.desc}</Text>
                </AppCard>
              </Col>
            ))}
          </Row>
        </section>

        {/* ── GROWTH PATH ── */}
        <section style={{ padding: "90px 60px" }}>
          <Row gutter={[60, 40]} align="middle" style={{ maxWidth: 1000, margin: "0 auto" }}>
            <Col xs={24} md={12}>
              <Title
                level={2}
                style={{
                  color: THEME.textPrimary,
                  fontFamily: "'Space Grotesk',sans-serif",
                  fontWeight: 700,
                  fontSize: 34,
                  marginBottom: 16,
                }}
              >
                Track Your Growth Path
              </Title>
              <Paragraph style={{ color: THEME.textSecondary, fontSize: 15, lineHeight: 1.8, marginBottom: 28 }}>
                Your developer profile is your new resume. Showcase your coding streak, rating improvements, and problem-solving velocity with beautiful, shareable dashboards.
              </Paragraph>
              {[
                "Heatmaps for consistency",
                "ELO-style competitive rating",
                "Topic-wise mastery breakdown",
              ].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <CheckCircleFilled style={{ color: THEME.accentGreen, fontSize: 16 }} />
                  <Text style={{ color: THEME.textPrimary, fontSize: 14 }}>{item}</Text>
                </div>
              ))}
            </Col>
            <Col xs={24} md={12}>
              <GrowthChart />
            </Col>
          </Row>
        </section>

        {/* ── ARENA ── */}
        <section style={{ background: "rgba(13,21,48,0.6)", padding: "80px 60px" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <Row justify="space-between" align="middle" style={{ marginBottom: 28 }}>
              <Col>
                <Title level={2} style={{ color: THEME.textPrimary, fontFamily: "'Space Grotesk',sans-serif", margin: 0, fontSize: 28 }}>
                  Join the Arena
                </Title>
                <Text style={{ color: THEME.textSecondary, fontSize: 14 }}>Daily challenges and weekly global sprints.</Text>
              </Col>
              <Col>
                <AppButton buttonVariant="ghost" style={{ fontSize: 13 }}>
                  View All Contests <ArrowRightOutlined />
                </AppButton>
              </Col>
            </Row>
            <Row gutter={[24, 24]}>
              {/* Contest card */}
              <Col xs={24} md={12}>
                <AppCard style={{ height: "100%", overflow: "hidden", position: "relative" }}>
                  <div
                    style={{
                      height: 120,
                      borderRadius: 10,
                      background: "linear-gradient(135deg,#1a0533,#0a1f4a,#0d2e50)",
                      marginBottom: 16,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    {/* Decorative glows */}
                    <div style={{ position: "absolute", width: 80, height: 80, borderRadius: "50%", background: "rgba(108,99,255,0.25)", top: 10, left: 10, filter: "blur(20px)" }} />
                    <div style={{ position: "absolute", width: 60, height: 60, borderRadius: "50%", background: "rgba(0,229,160,0.2)", bottom: 10, right: 20, filter: "blur(16px)" }} />
                    <GithubOutlined style={{ fontSize: 40, color: "rgba(255,255,255,0.15)" }} />
                  </div>
                  <Badge
                    dot
                    color={THEME.accentGreen}
                    style={{ marginRight: 6 }}
                  >
                    <Tag style={{ background: "rgba(0,229,160,0.1)", border: "none", color: THEME.accentGreen, fontSize: 11, fontWeight: 700 }}>
                      LIVE NOW
                    </Tag>
                  </Badge>
                  <Title level={4} style={{ color: THEME.textPrimary, fontFamily: "'Space Grotesk',sans-serif", margin: "10px 0 6px" }}>
                    Binary Blitz #42
                  </Title>
                  <Text style={{ color: THEME.textSecondary, fontSize: 13 }}>3 Problems • 90 Minutes • $500 Pool</Text>
                  <div style={{ marginTop: 16 }}>
                    <AppButton buttonVariant="primary" style={{ height: 36, fontSize: 13 }}>
                      Enter Arena
                    </AppButton>
                  </div>
                </AppCard>
              </Col>
              {/* Leaderboard */}
              <Col xs={24} md={12}>
                <LeaderBoard />
              </Col>
            </Row>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section style={{ padding: "90px 60px" }}>
          <SectionTitle>Built by Developers, for Future Leads</SectionTitle>
          <div style={{ height: 40 }} />
          <Row gutter={[24, 24]} style={{ maxWidth: 900, margin: "0 auto" }}>
            {testimonials.map((t) => (
              <Col xs={24} md={12} key={t.name}>
                <AppCard style={{ height: "100%" }}>
                  <Text
                    style={{
                      color: THEME.textPrimary,
                      fontSize: 14,
                      lineHeight: 1.8,
                      fontStyle: "italic",
                      display: "block",
                      marginBottom: 20,
                    }}
                  >
                    "{t.quote}"
                  </Text>
                  <Divider style={{ borderColor: THEME.bgCardBorder, margin: "0 0 16px" }} />
                  <Space>
                    <Avatar size={36} style={{ background: THEME.accent }}>
                      {t.name[0]}
                    </Avatar>
                    <div>
                      <Text style={{ color: THEME.textPrimary, fontWeight: 600, display: "block", fontSize: 13 }}>
                        {t.name}
                      </Text>
                      <Text style={{ color: THEME.textSecondary, fontSize: 12 }}>{t.role}</Text>
                    </div>
                  </Space>
                </AppCard>
              </Col>
            ))}
          </Row>
        </section>

        {/* ── CTA BANNER ── */}
        <section style={{ padding: "40px 40px 90px" }}>
          <div
            style={{
              maxWidth: 600,
              margin: "0 auto",
              borderRadius: 20,
              background: "linear-gradient(135deg, #4158d0 0%, #6c63ff 50%, #a084ee 100%)",
              padding: "56px 40px",
              textAlign: "center",
              boxShadow: "0 24px 80px rgba(108,99,255,0.35)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Glare */}
            <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
            <Title level={2} style={{ color: "#fff", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, marginBottom: 10, fontSize: 32 }}>
              Ready to break the stack?
            </Title>
            <Paragraph style={{ color: "rgba(255,255,255,0.75)", fontSize: 15, marginBottom: 32 }}>
              Join 300,000+ developers sharpening their skills and building the future.
            </Paragraph>
            <AppButton buttonVariant="cta">Get Started for Free</AppButton>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer
          style={{
            background: "#070c18",
            borderTop: `1px solid ${THEME.bgCardBorder}`,
            padding: "52px 60px 30px",
          }}
        >
          <Row gutter={[40, 32]} style={{ maxWidth: 1000, margin: "0 auto" }}>
            {/* Brand */}
            <Col xs={24} md={6}>
              <Text style={{ color: THEME.textPrimary, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 18, display: "block", marginBottom: 10 }}>
                DevCode
              </Text>
              <Text style={{ color: THEME.textSecondary, fontSize: 13, lineHeight: 1.7, display: "block", marginBottom: 18 }}>
                Accelerating technical mastery for the next generation of engineers.
              </Text>
              <Space size={14}>
                {[TwitterOutlined, LinkedinOutlined, GithubOutlined].map((Icon, i) => (
                  <Icon key={i} style={{ color: THEME.textSecondary, fontSize: 18, cursor: "pointer" }} />
                ))}
              </Space>
            </Col>
            {/* Links */}
            {footerCols.map((col) => (
              <Col xs={12} md={4} key={col.title}>
                <Text style={{ color: THEME.textSecondary, fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", display: "block", marginBottom: 14 }}>
                  {col.title}
                </Text>
                {col.links.map((link) => (
                  <Text key={link} style={{ color: THEME.textSecondary, fontSize: 13, display: "block", marginBottom: 10, cursor: "pointer" }}>
                    {link}
                  </Text>
                ))}
              </Col>
            ))}
          </Row>
          <Divider style={{ borderColor: THEME.bgCardBorder, margin: "32px auto", maxWidth: 1000 }} />
          <Row justify="space-between" style={{ maxWidth: 1000, margin: "0 auto" }}>
            <Text style={{ color: THEME.textSecondary, fontSize: 12 }}>© 2024 DevCode Inc. Built for developer success.</Text>
            <Space split={<Divider type="vertical" style={{ borderColor: THEME.bgCardBorder }} />}>
              <Text style={{ color: THEME.textSecondary, fontSize: 12, cursor: "pointer" }}>English (US)</Text>
              <Text style={{ color: THEME.textSecondary, fontSize: 12, cursor: "pointer" }}>System Settings</Text>
            </Space>
          </Row>
        </footer>
      </div>
    </ConfigProvider>
  );
}


const LeaderBoard = () => (
  <AppCard>
    <Text style={{ color: THEME.textSecondary, fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>
      Current Leaders
    </Text>
    <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
      {leaders.map((l) => (
        <div
          key={l.rank}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "rgba(255,255,255,0.03)",
            borderRadius: 8,
            padding: "8px 12px",
          }}
        >
          <Text style={{ color: THEME.textSecondary, fontSize: 13, minWidth: 20 }}>#{l.rank}</Text>
          <Avatar size={28} style={{ background: THEME.accent, fontSize: 12 }}>
            {l.name[0].toUpperCase()}
          </Avatar>
          <Text style={{ color: THEME.textPrimary, flex: 1, fontSize: 13, fontFamily: "'Fira Code',monospace" }}>
            {l.name}
          </Text>
          <Text style={{ color: THEME.accentGreen, fontSize: 13, fontWeight: 600 }}>{l.pts}</Text>
        </div>
      ))}
    </div>
  </AppCard>
);

const GrowthChart = () => {
  const bars = [
    { h: 38, color: "#1a2545" },
    { h: 52, color: "#1a2545" },
    { h: 44, color: "#1a2545" },
    { h: 68, color: "#1a2545" },
    { h: 55, color: "#1a2545" },
    { h: 75, color: "#2d3d6e" },
    { h: 88, color: THEME.accent },
  ];
  const greens = [28, 40, 60, 30, 48, 65, 72];
  return (
    <div style={{ position: "relative" }}>
      <AppCard style={{ minHeight: 220 }}>
        {/* Rating header */}
        <Space direction="vertical" size={0} style={{ marginBottom: 16 }}>
          <Text style={{ color: THEME.textSecondary, fontSize: 12 }}>Current Rating</Text>
          <Space align="center" size={12}>
            <Title level={3} style={{ color: THEME.textPrimary, margin: 0, fontFamily: "'Space Grotesk',sans-serif" }}>
              2,482
            </Title>
            <Tag
              icon={<RiseOutlined />}
              color="success"
              style={{ background: "rgba(0,229,160,0.12)", border: "none", color: THEME.accentGreen, borderRadius: 6 }}
            >
              +128 this month
            </Tag>
          </Space>
        </Space>
        {/* Bar chart */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 90 }}>
          {bars.map((b, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4, alignItems: "stretch" }}>
              <div
                style={{
                  height: b.h,
                  background: b.color,
                  borderRadius: "4px 4px 0 0",
                  transition: "all 0.3s",
                }}
              />
              <div
                style={{
                  height: (greens[i] * 0.7),
                  background: i >= 4 ? THEME.accentGreen : "#1e3a2f",
                  borderRadius: "0 0 4px 4px",
                }}
              />
            </div>
          ))}
        </div>
        {/* Streak badge */}
        <div
          style={{
            position: "absolute",
            bottom: 16,
            right: 16,
            background: THEME.accent,
            borderRadius: 8,
            padding: "4px 10px",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <FireOutlined style={{ color: "#fff", fontSize: 13 }} />
          <Text style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>128 Day Streak</Text>
        </div>
      </AppCard>
    </div>
  );
};