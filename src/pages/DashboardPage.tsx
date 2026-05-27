import { useEffect, useState } from "react";
import {
  Typography,
  Row,
  Col,
  Avatar,
  Space,
  Segmented,
  Divider,
  Spin,
} from "antd";
import {
  FilterOutlined,
  RightOutlined,
  SettingOutlined,
  HistoryOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { COLORS, THEME } from "../constants/theme";
import { AppButton } from "../components/common/AppButton";
import UserService from "../services/UserService";
import { useAuth } from "../contexts/AuthContext";
import { Difficulty } from "../constants/problems";
import { ProblemCategory } from "../enums/ProblemCategory";
import { SubmissionStatus, SubsmissionStatusLabel } from "../enums/SubmissionStatus";


const { Text, Title } = Typography;



// ─── REUSABLE: ActivityItem ───────────────────────────────────────────────────
type ActivityType = "ACCEPTED" | "NEW BADGE" | "COMPETITION";

interface DashboardStats {
  submissionByDifficulty: Record<Difficulty, number>;
  submissionByCategory: Record<ProblemCategory, number>;
  submissionByStatus: Record<SubmissionStatus, number>;
  totalSubmission: number
}
export const DashboardPage = () => {
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({} as any);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  const getDashboardStats = async () => {
    if (!user) {
      return;
    }
    setLoading(true);
    try {
      const res = await UserService.getDashboardStats(user?.id);
      if (res.data) {
        setDashboardStats(res.data)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getDashboardStats();
  }, [user]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Fira+Code:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: ${THEME.bg}; }

        /* segmented */
        .ant-segmented { background: ${THEME.bgCardBorder} !important; border-radius: 8px !important; }
        .ant-segmented-item { color: ${THEME.textSecondary} !important; font-family: 'Space Grotesk',sans-serif !important; font-size: 12px !important; }
        .ant-segmented-item-selected { background: ${THEME.accent} !important; color: #fff !important; border-radius: 6px !important; }

        /* scrollbar */
        ::-webkit-scrollbar       { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${THEME.bgCardBorder}; border-radius: 3px; }
      `}</style>


      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0px 20px 32px" }}>
        <Row gutter={[16, 16]}>

          {/* ── LEFT COLUMN ── */}
          <Col xs={24} md={8} lg={7}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <DifficultyProgress loading={loading} submissionByDifficulty={dashboardStats?.submissionByDifficulty || {}} total={dashboardStats?.totalSubmission || 0} />
              <TopTopics loading={loading} submissionByCategory={dashboardStats?.submissionByCategory || {}} />
              <MiniLeaderboard />
            </div>
          </Col>

          {/* ── CENTER COLUMN ── */}
          <Col xs={24} md={16} lg={10}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <PerformancePulse />
              <Row gutter={[14, 14]}>
                <Col span={12}>
                  <SectionCard title="Skill Architecture">
                    <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}>
                      <SkillRadar />
                    </div>
                  </SectionCard>
                </Col>
                <Col span={12}>
                  <SubmissionQuality loading={loading} submissionByStatus={dashboardStats.submissionByStatus} total={dashboardStats?.totalSubmission} />
                </Col>
              </Row>
            </div>
          </Col>

          {/* ── RIGHT COLUMN ── */}
          <Col xs={24} md={24} lg={7}>
            <ActivityFeed />
          </Col>

        </Row>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${THEME.bgCardBorder}`, padding: "14px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <Text style={{ color: THEME.textSecondary, fontSize: 11, fontFamily: "'Space Grotesk',sans-serif" }}>
          © 2024 DevCode Systems. Engineered for Excellence.
        </Text>
        <Space size={20}>
          {["System Status", "Documentation", "API Reference"].map((l) => (
            <Text key={l} style={{ color: THEME.textSecondary, fontSize: 11, cursor: "pointer", fontFamily: "'Space Grotesk',sans-serif" }}>
              {l}
            </Text>
          ))}
        </Space>
      </footer>
    </>
  );
}

const ACTIVITY_TYPE_CONFIG: Record<
  ActivityType,
  { color: string; bg: string }
> = {
  "ACCEPTED": { color: THEME.accentGreen, bg: "rgba(0,229,160,0.1)" },
  "NEW BADGE": { color: THEME.accentBlue, bg: "rgba(79,163,255,0.1)" },
  "COMPETITION": { color: THEME.accentOrange, bg: "rgba(255,169,64,0.1)" },
};

export const ActivityItem = ({
  type,
  title,
  subtitle,
  time,
}: {
  type: ActivityType;
  title: string;
  subtitle: string;
  time: string;
}) => {
  const cfg = ACTIVITY_TYPE_CONFIG[type];
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        padding: "12px 14px",
        borderRadius: 10,
        background: "rgba(255,255,255,0.02)",
        border: `1px solid ${THEME.bgCardBorder}`,
        marginBottom: 8,
        cursor: "pointer",
        transition: "background 0.2s",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = THEME.bgRowHover)
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.background = "rgba(255,255,255,0.02)")
      }
    >
      {/* left arrow */}
      <RightOutlined style={{ color: THEME.textSecondary, fontSize: 11, marginTop: 2, flexShrink: 0 }} />

      <div style={{ flex: 1, minWidth: 0 }}>
        {/* type badge + time */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span
            style={{
              background: cfg.bg,
              color: cfg.color,
              borderRadius: 4,
              padding: "1px 7px",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: 0.8,
              fontFamily: "'Space Grotesk', sans-serif",
              textTransform: "uppercase",
            }}
          >
            {type}
          </span>
          <Text style={{ color: THEME.textSecondary, fontSize: 11, fontFamily: "'Space Grotesk',sans-serif" }}>
            {time}
          </Text>
        </div>

        <Text
          style={{
            color: THEME.textPrimary,
            fontSize: 13,
            fontWeight: 600,
            fontFamily: "'Space Grotesk', sans-serif",
            display: "block",
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            color: THEME.textSecondary,
            fontSize: 11,
            fontFamily: "'Space Grotesk', sans-serif",
            display: "block",
            marginTop: 2,
          }}
        >
          {subtitle}
        </Text>
      </div>
    </div>
  );
};

// ─── Radar / Skill Architecture (pure SVG) ────────────────────────────────────
const SkillRadar = () => {
  const skills = [
    { label: "Arrays", value: 0.85 },
    { label: "DP", value: 0.55 },
    { label: "Graphs", value: 0.70 },
    { label: "Trees", value: 0.60 },
    { label: "Math", value: 0.45 },
    { label: "String", value: 0.75 },
  ];

  const cx = 90, cy = 90, r = 68;
  const n = skills.length;

  const point = (i: number, ratio: number) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    return {
      x: cx + r * ratio * Math.cos(angle),
      y: cy + r * ratio * Math.sin(angle),
    };
  };

  const gridLevels = [0.25, 0.5, 0.75, 1];

  const dataPath = skills
    .map((s, i) => {
      const p = point(i, s.value);
      return `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`;
    })
    .join(" ") + " Z";

  return (
    <svg width={180} height={180} viewBox="0 0 180 180">
      {/* grid */}
      {gridLevels.map((lvl) => (
        <polygon
          key={lvl}
          points={skills
            .map((_, i) => {
              const p = point(i, lvl);
              return `${p.x},${p.y}`;
            })
            .join(" ")}
          fill="none"
          stroke={THEME.bgCardBorder}
          strokeWidth={1}
        />
      ))}

      {/* axes */}
      {skills.map((_, i) => {
        const outer = point(i, 1);
        return (
          <line
            key={i}
            x1={cx} y1={cy}
            x2={outer.x} y2={outer.y}
            stroke={THEME.bgCardBorder}
            strokeWidth={1}
          />
        );
      })}

      {/* data shape */}
      <path
        d={dataPath}
        fill={`${THEME.accent}22`}
        stroke={THEME.accent}
        strokeWidth={1.5}
      />

      {/* data points */}
      {skills.map((s, i) => {
        const p = point(i, s.value);
        return (
          <circle
            key={i}
            cx={p.x} cy={p.y}
            r={3}
            fill={THEME.accent}
          />
        );
      })}

      {/* labels */}
      {skills.map((s, i) => {
        const p = point(i, 1.22);
        return (
          <text
            key={i}
            x={p.x} y={p.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={THEME.textSecondary}
            fontSize={9}
            fontFamily="'Space Grotesk', sans-serif"
          >
            {s.label}
          </text>
        );
      })}
    </svg>
  );
};

// ─── Performance Pulse Chart (SVG sparkline) ──────────────────────────────────
export const PulseLine = ({ period }: { period: "30D" | "90D" }) => {
  const points30 = [20, 45, 30, 60, 40, 75, 55, 80, 60, 90, 70, 85, 95];
  const points90 = [10, 30, 20, 50, 35, 65, 45, 70, 55, 80, 60, 75, 88];
  const raw = period === "30D" ? points30 : points90;

  const w = 280, h = 110;
  const min = Math.min(...raw), max = Math.max(...raw);
  const norm = raw.map((v) => ((v - min) / (max - min)) * (h - 20) + 10);
  const step = w / (raw.length - 1);

  const pathD = norm
    .map((y, i) => `${i === 0 ? "M" : "L"} ${i * step} ${h - y}`)
    .join(" ");

  const areaD = `${pathD} L ${(raw.length - 1) * step} ${h} L 0 ${h} Z`;

  // tooltip dot — last point
  const lastX = (raw.length - 1) * step;
  const lastY = h - norm[norm.length - 1];

  return (
    <div style={{ position: "relative" }}>
      <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ display: "block" }}>
        <defs>
          <linearGradient id="pulseGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={THEME.accent} stopOpacity={0.35} />
            <stop offset="100%" stopColor={THEME.accent} stopOpacity={0} />
          </linearGradient>
        </defs>
        <path d={areaD} fill="url(#pulseGrad)" />
        <path d={pathD} fill="none" stroke={THEME.accent} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        {/* tooltip dot */}
        <circle cx={lastX} cy={lastY} r={4} fill={THEME.accent} />
        <rect x={lastX - 38} y={lastY - 24} width={76} height={18} rx={5} fill={THEME.bgCard} stroke={THEME.bgCardBorder} />
        <text x={lastX} y={lastY - 12} textAnchor="middle" fill={THEME.accentGreen} fontSize={9} fontFamily="'Space Grotesk',sans-serif" fontWeight={700}>
          Today: +12 Solve
        </text>
      </svg>
    </div>
  );
};

// ─── Difficulty Progress ──────────────────────────────────────────────────────
const DifficultyProgress = ({ submissionByDifficulty, total, loading }: { submissionByDifficulty: Record<Difficulty, number>, total: number, loading: boolean }) => {


  const initialValue = [
    { label: "EASY", pct: total === 0 ? 0 : Math.floor((submissionByDifficulty[Difficulty.EASY] / total) * 100), color: THEME.accentGreen },
    { label: "MEDIUM", pct: total === 0 ? 0 : Math.floor((submissionByDifficulty[Difficulty.MEDIUM] / total) * 100), color: THEME.accentOrange },
    { label: "HARD", pct: total === 0 ? 0 : Math.floor((submissionByDifficulty[Difficulty.HARD] / total) * 100), color: THEME.accentRed },
  ];
  const [items, setItems] = useState(initialValue);

  useEffect(() => {
    const newItems = items.map((item) => ({ ...item, pct: total === 0 ? 0 : Math.floor((submissionByDifficulty[item.label as Difficulty] || 0) / total * 100) }));
    setItems(newItems);
  }, [submissionByDifficulty]);

  if (loading) {
    return
  }

  return (
    <SectionCard title="Difficulty Progress">
      {loading ? <Spin indicator={<LoadingOutlined style={{ color: COLORS.primary, fontSize: 24 }} spin />} /> :
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

          {items.map((item) => (
            <div key={item.label}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <Text style={{ color: item.color, fontSize: 10, fontWeight: 700, letterSpacing: 1, fontFamily: "'Space Grotesk',sans-serif" }}>
                  {item.label}
                </Text>
                <Text style={{ color: THEME.textSecondary, fontSize: 12, fontFamily: "'Space Grotesk',sans-serif" }}>
                  {item.pct}%
                </Text>
              </div>
              <div style={{ height: 5, background: THEME.bgCardBorder, borderRadius: 4, overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${item.pct}%`,
                    background: item.color,
                    borderRadius: 4,
                    transition: "width 1s ease",
                  }}
                />
              </div>
            </div>
          ))}
        </div>}
    </SectionCard>
  );
};


const TopTopics = ({ loading, submissionByCategory }: {
  loading: boolean,
  submissionByCategory: Record<ProblemCategory, number>,
}) => {
  const init = [
    { label: "ARRAY", value: 124, color: THEME.textPrimary },
    { label: "GRAPHS", value: 45, color: THEME.accentGreen },
    { label: "TREES", value: 62, color: THEME.textPrimary },
    { label: "DP", value: 18, color: THEME.accentOrange },
  ];

  const [topics, setTopics] = useState(init);

  useEffect(() => {
    const updatedTopics = init.map((top) => ({ ...top, value: submissionByCategory[top.label as ProblemCategory] || 0 }))
    setTopics(updatedTopics);
  }, [submissionByCategory])


  return (
    <SectionCard title="Top Topics">
      {loading ? <Spin indicator={<LoadingOutlined style={{ color: COLORS.primary, fontSize: 24 }} spin />} /> :
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 24px" }}>
          {topics.map((t) => (
            <div key={t.label}>
              <Text style={{ color: THEME.textSecondary, fontSize: 10, fontWeight: 700, letterSpacing: 1, display: "block", fontFamily: "'Space Grotesk',sans-serif" }}>
                {t.label}
              </Text>
              <Text style={{ color: t.color, fontSize: 20, fontWeight: 700, fontFamily: "'Space Grotesk',sans-serif" }}>
                {t.value}
              </Text>
            </div>
          ))}
        </div>}
    </SectionCard>
  );
};

// ─── Mini Leaderboard ─────────────────────────────────────────────────────────
const MiniLeaderboard = () => {
  const entries = [
    { rank: 1, name: "Felix V.", xp: "2,410 XP", avatar: "FV", highlight: true },
    { rank: 2, name: "Luna K.", xp: "2,350 XP", avatar: "LK" },
    { rank: 3, name: "Zane T.", xp: "1,980 XP", avatar: "ZT" },
  ];
  const rankColors = [THEME.accentGreen, THEME.textSecondary, THEME.accentOrange];

  return (
    <SectionCard title="Leaderboard">
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {entries.map((e, i) => (
          <div
            key={e.rank}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 10px",
              borderRadius: 9,
              background: e.highlight ? "rgba(108,99,255,0.10)" : "rgba(255,255,255,0.02)",
              border: `1px solid ${e.highlight ? `${THEME.accent}44` : THEME.bgCardBorder}`,
            }}
          >
            <Text style={{ color: rankColors[i], fontWeight: 700, fontSize: 13, minWidth: 22, fontFamily: "'Space Grotesk',sans-serif" }}>
              #{e.rank}
            </Text>
            <Avatar size={26} style={{ background: e.highlight ? THEME.accent : "#1a2545", fontSize: 10, fontWeight: 700 }}>
              {e.avatar}
            </Avatar>
            <Text style={{ flex: 1, color: THEME.textPrimary, fontSize: 13, fontFamily: "'Space Grotesk',sans-serif", fontWeight: e.highlight ? 600 : 400 }}>
              {e.name}
            </Text>
            <Text style={{ color: THEME.textSecondary, fontSize: 11, fontFamily: "'Space Grotesk',sans-serif" }}>
              {e.xp}
            </Text>
            {e.highlight && (
              <SettingOutlined style={{ color: THEME.textSecondary, fontSize: 12 }} />
            )}
          </div>
        ))}
      </div>
    </SectionCard>
  );
};

// ─── Submission Quality ───────────────────────────────────────────────────────
const SubmissionQuality = ({ loading, submissionByStatus, total }: { loading: boolean, submissionByStatus: Record<SubmissionStatus, number>, total: number }) => {
  const initialData = [
    { key: SubmissionStatus.ACCEPTED, label: SubsmissionStatusLabel[SubmissionStatus.ACCEPTED], count: 248, pct: 94, color: THEME.accentGreen },
    { key: SubmissionStatus.WRONG_ANSWER, label: SubsmissionStatusLabel[SubmissionStatus.WRONG_ANSWER], count: 12, pct: 4, color: THEME.accentOrange },
    { key: SubmissionStatus.TIME_LIMIT_EXCEEDED, label: SubsmissionStatusLabel[SubmissionStatus.TIME_LIMIT_EXCEEDED], count: 4, pct: 2, color: THEME.accentRed },
  ];

  const [rows, setRows] = useState(initialData);

  useEffect(() => {
    if (submissionByStatus) {
      const updated = rows.map(row => ({ ...row, count: submissionByStatus[row.key] || 0, pct: total == 0 ? 0 : Math.floor((submissionByStatus[row.key] || 0) / total * 100) }))
      setRows(updated);
    }

  }, [submissionByStatus])

  if (loading) {
    return <Spin indicator={<LoadingOutlined style={{ color: COLORS.primary, fontSize: 24 }} spin />} />
  }
  return (
    <SectionCard title="Submission Quality">
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {rows.map((r) => (
          <div key={r.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={{ color: THEME.textSecondary, fontSize: 12, fontFamily: "'Space Grotesk',sans-serif", flex: 1 }}>
              {r.label}
            </Text>
            <Text style={{ color: r.color, fontSize: 13, fontWeight: 700, fontFamily: "'Fira Code',monospace", minWidth: 48, textAlign: "right" }}>
              {r.count}
            </Text>
            <Text style={{ color: THEME.textSecondary, fontSize: 12, fontFamily: "'Fira Code',monospace", minWidth: 40, textAlign: "right" }}>
              ({r.pct}%)
            </Text>
          </div>
        ))}
      </div>
      <Divider style={{ borderColor: THEME.bgCardBorder, margin: "14px 0" }} />
      <Text style={{ color: THEME.textSecondary, fontSize: 11, fontStyle: "italic", lineHeight: 1.6, fontFamily: "'Space Grotesk',sans-serif" }}>
        "Your performance in Graphs has improved by 15% this week. Focus on dynamic programming to reach Elite status."
      </Text>
    </SectionCard>
  );
};

// ─── Performance Pulse ────────────────────────────────────────────────────────
const PerformancePulse = () => {
  const [period, setPeriod] = useState<"30D" | "90D">("30D");
  return (
    <SectionCard
      title="Performance Pulse"
      extra={
        <Segmented
          size="small"
          value={period}
          onChange={(v) => setPeriod(v as "30D" | "90D")}
          options={["30D", "90D"]}
          style={{ background: THEME.bgCardBorder }}
        />
      }
    >
      <Text style={{ color: THEME.textSecondary, fontSize: 12, display: "block", marginTop: -8, marginBottom: 16, fontFamily: "'Space Grotesk',sans-serif" }}>
        Submissions over the last {period === "30D" ? "30" : "90"} days
      </Text>

      <PulseLine period={period} />

      <Divider style={{ borderColor: THEME.bgCardBorder, margin: "16px 0" }} />

      {/* stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
        <StatLabel label="Avg Beat" value="92.4%" />
        <StatLabel label="Consistency" value="High" color={THEME.accentGreen} />
        <StatLabel label="Streak" value="14 Days" />
      </div>
    </SectionCard>
  );
};

// ─── Activity Feed ────────────────────────────────────────────────────────────
const ActivityFeed = () => {
  const items = [
    { type: "ACCEPTED" as const, title: "Number of Islands", subtitle: "Solved using DFS recursion", time: "2h ago" },
    { type: "NEW BADGE" as const, title: "Graph Master I", subtitle: "Badge unlocked", time: "5h ago" },
    { type: "COMPETITION" as const, title: "Biweekly Contest 124", subtitle: "Ranked #42 / 12k participants", time: "Yesterday" },
    { type: "ACCEPTED" as const, title: "Trapping Rain Water", subtitle: "Hard difficulty conquered", time: "2d ago" },
  ];

  return (
    <SectionCard
      title="Activity"
      extra={<FilterOutlined style={{ color: THEME.textSecondary, cursor: "pointer" }} />}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div style={{ flex: 1 }}>
        {items.map((item, i) => (
          <ActivityItem key={i} {...item} />
        ))}
      </div>
      <div style={{ marginTop: 12 }}>
        <AppButton
          buttonVariant="outline"
          style={{ width: "100%", height: 36, fontSize: 12, letterSpacing: 0.5 }}
        >
          <HistoryOutlined style={{ marginRight: 6 }} />
          VIEW FULL HISTORY
        </AppButton>
      </div>
    </SectionCard>
  );
};

const SectionCard = ({
  children,
  style,
  title,
  extra,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  title?: string;
  extra?: React.ReactNode;
}) => (
  <div
    style={{
      background: THEME.bgCard,
      border: `1px solid ${THEME.bgCardBorder}`,
      borderRadius: 14,
      padding: "18px 20px",
      height: "100%",
      ...style,
    }}
  >
    {title && (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <Title
          level={5}
          style={{
            color: THEME.textPrimary,
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            margin: 0,
            fontSize: 15,
          }}
        >
          {title}
        </Title>
        {extra}
      </div>
    )}
    {children}
  </div>
);

// ─── REUSABLE: StatLabel ──────────────────────────────────────────────────────
const StatLabel = ({
  label,
  value,
  color,
}: {
  label: string;
  value: string | number;
  color?: string;
}) => (
  <div>
    <Text
      style={{
        color: THEME.textSecondary,
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: 1,
        textTransform: "uppercase",
        display: "block",
        marginBottom: 2,
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      {label}
    </Text>
    <Text
      style={{
        color: color ?? THEME.textPrimary,
        fontSize: 13,
        fontWeight: 600,
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      {value}
    </Text>
  </div>
);
