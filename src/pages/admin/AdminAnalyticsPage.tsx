import { useState } from "react";
import { Row, Col, Space, Typography, Table } from "antd";
import {
    ExportOutlined, CalendarOutlined, RiseOutlined,
    ClockCircleOutlined
} from "@ant-design/icons";
import { THEME } from "../../constants/theme";
import { ADMIN, AdminBreadcrumb, AdminCard, AdminPageTitle } from ".";
import { AppButton } from "../../components/common/AppButton";


const { Text } = Typography;

// ─── SectionHeader ────────────────────────────────────────────────────────────
const SectionHeader = ({
    title, subtitle, extra,
}: { title: string; subtitle?: string; extra?: React.ReactNode }) => (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
        <div>
            <Text style={{ color: THEME.textPrimary, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 15, display: "block" }}>
                {title}
            </Text>
            {subtitle && (
                <Text style={{ color: THEME.textSecondary, fontSize: 12, fontFamily: "'Space Grotesk',sans-serif" }}>
                    {subtitle}
                </Text>
            )}
        </div>
        {extra}
    </div>
);

// ─── Bar Chart (SVG) ──────────────────────────────────────────────────────────
const BarChart = ({ period }: { period: "DAU" | "MAU" }) => {
    const dauVals = [40, 55, 62, 48, 70, 58, 80, 65, 75, 88, 72, 90, 85, 78, 92, 68, 82, 95, 74, 86];
    const mauVals = [60, 72, 80, 68, 85, 75, 90, 78, 88, 95, 82, 98, 90, 85, 92, 76, 88, 96, 80, 92];
    const raw = period === "DAU" ? dauVals : mauVals;

    const W = 280, H = 100;
    const maxV = Math.max(...raw);
    const barW = W / raw.length - 3;

    const labels = ["SEP 01", "SEP 07", "SEP 14", "SEP 21", "SEP 30"];
    const labelPositions = [0, 0.25, 0.5, 0.75, 1].map((p) => p * W);

    return (
        <svg width="100%" viewBox={`0 0 ${W} ${H + 20}`} preserveAspectRatio="none" style={{ display: "block" }}>
            <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={THEME.accent} stopOpacity={0.9} />
                    <stop offset="100%" stopColor="rgba(108,99,255,0.3)" stopOpacity={1} />
                </linearGradient>
            </defs>
            {raw.map((v, i) => {
                const bH = (v / maxV) * H;
                const x = i * (W / raw.length);
                return (
                    <rect
                        key={i} x={x + 1} y={H - bH}
                        width={barW} height={bH}
                        rx={2} fill="url(#barGrad)"
                    />
                );
            })}
            {labels.map((l, i) => (
                <text key={i} x={labelPositions[i]} y={H + 14} fontSize={7} fill={THEME.textSecondary} fontFamily="'Space Grotesk',sans-serif">
                    {l}
                </text>
            ))}
        </svg>
    );
};

// ─── Donut Chart ──────────────────────────────────────────────────────────────
const DonutChart = () => {
    const segments = [
        { label: "Easy", pct: 45, color: THEME.accentGreen },
        { label: "Medium", pct: 35, color: THEME.accentOrange },
        { label: "Hard", pct: 20, color: THEME.accentRed },
    ];

    const r = 70, cx = 90, cy = 90, stroke = 18;
    const circ = 2 * Math.PI * r;
    let offset = 0;

    return (
        <div style={{ display: "flex", alignItems: "center", gap: 40, flexWrap: "wrap" }}>
            {/* SVG donut */}
            <svg width={180} height={180} viewBox="0 0 180 180" style={{ flexShrink: 0 }}>
                <circle cx={cx} cy={cy} r={r} fill="none" stroke={ADMIN.border} strokeWidth={stroke} />
                {segments.map((s, i) => {
                    const dash = (s.pct / 100) * circ;
                    const gap = circ - dash;
                    const rotate = (offset / 100) * 360 - 90;
                    offset += s.pct;
                    return (
                        <circle
                            key={i} cx={cx} cy={cy} r={r}
                            fill="none"
                            stroke={s.color}
                            strokeWidth={stroke}
                            strokeDasharray={`${dash} ${gap}`}
                            strokeDashoffset={0}
                            transform={`rotate(${rotate} ${cx} ${cy})`}
                            strokeLinecap="butt"
                        />
                    );
                })}
                {/* center label */}
                <text x={cx} y={cy - 6} textAnchor="middle" fill={THEME.textPrimary} fontSize={22} fontWeight={700} fontFamily="'Space Grotesk',sans-serif">2.4k</text>
                <text x={cx} y={cy + 10} textAnchor="middle" fill={THEME.textSecondary} fontSize={9} fontFamily="'Space Grotesk',sans-serif">Total</text>
            </svg>

            {/* Legend */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {segments.map((s) => (
                    <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 24 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 90 }}>
                            <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.color }} />
                            <Text style={{ color: THEME.textSecondary, fontSize: 13, fontFamily: "'Space Grotesk',sans-serif" }}>{s.label}</Text>
                        </div>
                        <Text style={{ color: THEME.textPrimary, fontSize: 16, fontWeight: 700, fontFamily: "'Space Grotesk',sans-serif" }}>{s.pct}%</Text>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ─── Submission Health Bars ───────────────────────────────────────────────────
const SubmissionHealth = () => {
    const rows = [
        { label: "Accepted (AC)", count: "455k", pct: 94, color: THEME.accentGreen },
        { label: "Wrong Answer (WA)", count: "52k", pct: 11, color: THEME.accentOrange },
        { label: "Runtime Error (RE)", count: "24k", pct: 5, color: THEME.accentRed },
        { label: "Time Limit Exceeded (TLE)", count: "12k", pct: 3, color: "#a084ee" },
    ];

    return (
        <AdminCard>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                <div>
                    <Text style={{ color: THEME.textPrimary, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 15, display: "block" }}>
                        Submission Health
                    </Text>
                    <Text style={{ color: THEME.textSecondary, fontSize: 12, fontFamily: "'Space Grotesk',sans-serif" }}>
                        Runtime success vs failure distribution
                    </Text>
                </div>
                <div style={{ textAlign: "right" }}>
                    <Text style={{ color: THEME.accentGreen, fontSize: 24, fontWeight: 700, fontFamily: "'Space Grotesk',sans-serif", display: "block" }}>
                        78.4%
                    </Text>
                    <Text style={{ color: THEME.textSecondary, fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", fontFamily: "'Space Grotesk',sans-serif" }}>
                        Global Pass Rate
                    </Text>
                </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {rows.map((r) => (
                    <div key={r.label}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                            <Text style={{ color: THEME.textSecondary, fontSize: 12, fontFamily: "'Space Grotesk',sans-serif" }}>{r.label}</Text>
                            <Text style={{ color: THEME.textPrimary, fontSize: 12, fontFamily: "'Fira Code',monospace", fontWeight: 600 }}>{r.count}</Text>
                        </div>
                        <div style={{ height: 5, background: ADMIN.border, borderRadius: 3, overflow: "hidden" }}>
                            <div style={{ height: "100%", width: `${r.pct}%`, background: r.color, borderRadius: 3, transition: "width 0.8s ease" }} />
                        </div>
                    </div>
                ))}
            </div>
        </AdminCard>
    );
};

// ─── Global Traffic Map (SVG dots) ───────────────────────────────────────────
const WorldMap = () => {
    const dots = [
        { x: 0.20, y: 0.38 }, { x: 0.22, y: 0.45 }, { x: 0.25, y: 0.30 },
        { x: 0.48, y: 0.32 }, { x: 0.50, y: 0.40 }, { x: 0.52, y: 0.55 },
        { x: 0.62, y: 0.35 }, { x: 0.65, y: 0.45 }, { x: 0.70, y: 0.38 },
        { x: 0.75, y: 0.50 }, { x: 0.80, y: 0.42 }, { x: 0.85, y: 0.55 },
        { x: 0.38, y: 0.48 }, { x: 0.42, y: 0.52 }, { x: 0.45, y: 0.38 },
        { x: 0.30, y: 0.60 }, { x: 0.55, y: 0.60 }, { x: 0.60, y: 0.65 },
        { x: 0.90, y: 0.60 }, { x: 0.15, y: 0.55 },
    ];
    const W = 500, H = 180;
    return (
        <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block", opacity: 0.8 }}>
            {/* Grid lines */}
            {[0.25, 0.5, 0.75].map((p) => (
                <line key={`v${p}`} x1={p * W} y1={0} x2={p * W} y2={H} stroke={ADMIN.border} strokeWidth={0.5} />
            ))}
            {[0.33, 0.66].map((p) => (
                <line key={`h${p}`} x1={0} y1={p * H} x2={W} y2={p * H} stroke={ADMIN.border} strokeWidth={0.5} />
            ))}
            {/* Dots */}
            {dots.map((d, i) => (
                <circle key={i} cx={d.x * W} cy={d.y * H} r={2.5} fill={THEME.accent} opacity={0.7} />
            ))}
            {/* Highlight dot (India) */}
            <circle cx={0.68 * W} cy={0.42 * H} r={5} fill={THEME.accentGreen} opacity={0.9} />
            <circle cx={0.68 * W} cy={0.42 * H} r={9} fill={THEME.accentGreen} opacity={0.15} />
        </svg>
    );
};

const GlobalTraffic = () => {
    const countries = [
        { name: "United States", pct: 38 },
        { name: "India", pct: 24 },
        { name: "Germany", pct: 18 },
    ];
    return (
        <AdminCard>
            <SectionHeader title="Global Traffic" subtitle="Traffic source distribution" />
            <WorldMap />
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 12 }}>
                {countries.map((c) => (
                    <div key={c.name} style={{ display: "flex", justifyContent: "space-between" }}>
                        <Text style={{ color: THEME.textSecondary, fontSize: 13, fontFamily: "'Space Grotesk',sans-serif" }}>{c.name}</Text>
                        <Text style={{ color: THEME.textPrimary, fontSize: 13, fontFamily: "'Fira Code',monospace", fontWeight: 600 }}>{c.pct}%</Text>
                    </div>
                ))}
            </div>
        </AdminCard>
    );
};

// ─── Peak Activity Contests Table ─────────────────────────────────────────────
const STATUS_CFG: Record<string, { color: string; bg: string }> = {
    "OPTIMAL": { color: THEME.accentGreen, bg: "rgba(0,229,160,0.1)" },
    "STRAINED": { color: THEME.accentOrange, bg: "rgba(255,169,64,0.1)" },
    "CRITICAL": { color: THEME.accentRed, bg: "rgba(255,107,107,0.1)" },
};

const CONTESTS = [
    { key: "1", name: "Global Round #124", date: "01 Sep, 2023", participants: "18,245", peak: "12,100", submissions: "142,400", serverLoad: 45, status: "OPTIMAL" },
    { key: "2", name: "Weekly Challenge #89", date: "13 Sep, 2023", participants: "12,102", peak: "9,450", submissions: "98,200", serverLoad: 62, status: "OPTIMAL" },
    { key: "3", name: "Startup Cup 2023", date: "19 Sep, 2023", participants: "6,900", peak: "8,850", submissions: "156,000", serverLoad: 87, status: "STRAINED" },
];

const contestColumns = [
    {
        title: "CONTEST IDENTITY",
        key: "identity",
        render: (_: any, row: any) => (
            <div>
                <Text style={{ color: THEME.textPrimary, fontWeight: 600, fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, display: "block" }}>{row.name}</Text>
                <Text style={{ color: THEME.textSecondary, fontSize: 11, fontFamily: "'Space Grotesk',sans-serif" }}>{row.date}</Text>
            </div>
        ),
    },
    { title: "PARTICIPANTS", dataIndex: "participants", render: (v: string) => <Text style={{ color: THEME.textSecondary, fontFamily: "'Fira Code',monospace", fontSize: 13 }}>{v}</Text> },
    { title: "PEAK CONCURRENCY", dataIndex: "peak", render: (v: string) => <Text style={{ color: THEME.textSecondary, fontFamily: "'Fira Code',monospace", fontSize: 13 }}>{v}</Text> },
    { title: "TOTAL SUBMISSIONS", dataIndex: "submissions", render: (v: string) => <Text style={{ color: THEME.textSecondary, fontFamily: "'Fira Code',monospace", fontSize: 13 }}>{v}</Text> },
    {
        title: "SERVER LOAD",
        dataIndex: "serverLoad",
        render: (v: number, row: any) => {
            const cfg = STATUS_CFG[row.status];
            return (
                <div style={{ width: 90, height: 4, background: ADMIN.border, borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${v}%`, background: cfg.color, borderRadius: 2 }} />
                </div>
            );
        },
    },
    {
        title: "STATUS",
        dataIndex: "status",
        render: (v: string) => {
            const cfg = STATUS_CFG[v];
            return (
                <span style={{ background: cfg.bg, color: cfg.color, borderRadius: 5, padding: "2px 10px", fontSize: 11, fontWeight: 700, fontFamily: "'Space Grotesk',sans-serif", letterSpacing: 0.5 }}>
                    {v}
                </span>
            );
        },
    },
];

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function AdminAnalyticsPage({ onNavigate }: { onNavigate?: (page: string) => void }) {
    const [dauPeriod, setDauPeriod] = useState<"DAU" | "MAU">("DAU");

    return (
        <div style={{ padding: "24px 28px" }}>

            {/* Breadcrumb */}
            <AdminBreadcrumb
                items={[
                    { label: "Home", onClick: () => onNavigate?.("home") },
                    { label: "Admin", onClick: () => onNavigate?.("admin") },
                    { label: "Analytics" },
                ]}
            />

            {/* Page title */}
            <AdminPageTitle
                title="Platform Analytics"
                subtitle="Real-time engagement metrics and system performance distribution."
                extra={
                    <Space size={10}>
                        <AppButton buttonVariant="outline" icon={<CalendarOutlined />} style={{ height: 36, borderRadius: 9, fontSize: 13 }}>
                            Last 30 Days
                        </AppButton>
                        <AppButton buttonVariant="primary" icon={<ExportOutlined />} style={{ height: 36, borderRadius: 9, fontSize: 13 }}>
                            Export Report
                        </AppButton>
                    </Space>
                }
            />

            {/* Row 1: Bar chart + stat pills */}
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
                {/* Bar chart */}
                <Col xs={24} md={14}>
                    <AdminCard>
                        <SectionHeader
                            title="User Activity Trends"
                            subtitle="Daily active developers participating in challenges"
                            extra={
                                <Space size={0} style={{ background: ADMIN.border, borderRadius: 8, overflow: "hidden" }}>
                                    {(["DAU", "MAU"] as const).map((p) => (
                                        <div
                                            key={p}
                                            onClick={() => setDauPeriod(p)}
                                            style={{
                                                padding: "5px 14px",
                                                cursor: "pointer",
                                                background: dauPeriod === p ? THEME.accent : "transparent",
                                                transition: "background 0.2s",
                                            }}
                                        >
                                            <Text style={{ color: dauPeriod === p ? "#fff" : THEME.textSecondary, fontSize: 12, fontWeight: 600, fontFamily: "'Space Grotesk',sans-serif" }}>
                                                {p}
                                            </Text>
                                        </div>
                                    ))}
                                </Space>
                            }
                        />
                        <BarChart period={dauPeriod} />
                    </AdminCard>
                </Col>

                {/* Stat pills stacked */}
                <Col xs={24} md={10}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12, height: "100%" }}>
                        {[
                            { label: "ACTIVE USERS TODAY", value: "12.4k", sub: "+18.2% vs yesterday", icon: <RiseOutlined style={{ color: THEME.accentGreen, fontSize: 18 }} />, iconBg: "rgba(0,229,160,0.12)" },
                            { label: "AVG. TIME ON PLATFORM", value: "42m", sub: "+4m increase in stickiness", icon: <ClockCircleOutlined style={{ color: THEME.accentBlue, fontSize: 18 }} />, iconBg: "rgba(79,163,255,0.12)" },
                        ].map((s) => (
                            <AdminCard key={s.label} style={{ flex: 1 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "100%" }}>
                                    <div>
                                        <Text style={{ color: THEME.textSecondary, fontSize: 10, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase", display: "block", fontFamily: "'Space Grotesk',sans-serif" }}>
                                            {s.label}
                                        </Text>
                                        <Text style={{ color: THEME.textPrimary, fontSize: 30, fontWeight: 700, fontFamily: "'Space Grotesk',sans-serif", display: "block", lineHeight: 1.1, marginTop: 6 }}>
                                            {s.value}
                                        </Text>
                                        <Text style={{ color: THEME.accentGreen, fontSize: 12, fontFamily: "'Space Grotesk',sans-serif", display: "block", marginTop: 4 }}>
                                            ↑ {s.sub}
                                        </Text>
                                    </div>
                                    <div style={{ width: 40, height: 40, borderRadius: 10, background: s.iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        {s.icon}
                                    </div>
                                </div>
                            </AdminCard>
                        ))}
                    </div>
                </Col>
            </Row>

            {/* Row 2: Difficulty donut + Submission health */}
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
                <Col xs={24} md={12}>
                    <AdminCard style={{ height: "100%" }}>
                        <SectionHeader title="Difficulty Distribution" subtitle="Categorization of 2,400 published problems" />
                        <DonutChart />
                    </AdminCard>
                </Col>
                <Col xs={24} md={12}>
                    <SubmissionHealth />
                </Col>
            </Row>

            {/* Row 3: Global Traffic */}
            <div style={{ marginBottom: 16 }}>
                <GlobalTraffic />
            </div>

            {/* Row 4: Peak Activity Contests */}
            <AdminCard padding="0">
                <div style={{ padding: "16px 20px", borderBottom: `1px solid ${ADMIN.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ color: THEME.textPrimary, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 15 }}>
                        Peak Activity Contests
                    </Text>
                    <Text style={{ color: THEME.accent, fontSize: 13, cursor: "pointer", fontWeight: 500, fontFamily: "'Space Grotesk',sans-serif" }}>
                        View Detailed Rankings
                    </Text>
                </div>
                <Table
                    className="admin-table"
                    dataSource={CONTESTS}
                    columns={contestColumns}
                    rowKey="key"
                    pagination={false}
                    size="middle"
                />
            </AdminCard>

        </div>
    );
}
