// ─── REUSABLE: AdminBreadcrumb ────────────────────────────────────────────────

import { Typography, Space } from "antd";
import {

    HomeOutlined,
    RightOutlined,
} from "@ant-design/icons";
import { THEME } from "../../constants/theme";

const { Text } = Typography;

export const ADMIN = {
    navH: 52,
    sideW: 0,
    bg: "#070d1a",
    bgCard: "#0d1530",
    bgCard2: "#111d38",
    border: "#1a2545",
    accent: THEME.accent,
};
// items: [{ label, onClick? }]
export const AdminBreadcrumb = ({
    items,
}: {
    items: { label: string; onClick?: () => void }[];
}) => (
    <Space size={4} align="center" style={{ marginBottom: 20 }}>
        {items.map((item, i) => (
            <Space key={i} size={4} align="center">
                {i === 0 && <HomeOutlined style={{ color: THEME.textSecondary, fontSize: 12 }} />}
                <Text
                    onClick={item.onClick}
                    style={{
                        color: item.onClick ? THEME.textSecondary : THEME.accent,
                        fontSize: 13,
                        fontFamily: "'Space Grotesk',sans-serif",
                        fontWeight: i === items.length - 1 ? 600 : 400,
                        cursor: item.onClick ? "pointer" : "default",
                    }}
                >
                    {item.label}
                </Text>
                {i < items.length - 1 && (
                    <RightOutlined style={{ color: THEME.textSecondary, fontSize: 10 }} />
                )}
            </Space>
        ))}
    </Space>
);

// ─── REUSABLE: AdminCard ──────────────────────────────────────────────────────
export const AdminCard = ({
    children,
    style,
    padding = "20px",
}: {
    children: React.ReactNode;
    style?: React.CSSProperties;
    padding?: string;
}) => (
    <div
        style={{
            background: ADMIN.bgCard,
            border: `1px solid ${ADMIN.border}`,
            borderRadius: 12,
            padding,
            ...style,
        }}
    >
        {children}
    </div>
);

// ─── REUSABLE: AdminStatCard ──────────────────────────────────────────────────
export const AdminStatCard = ({
    label,
    value,
    sub,
    subColor,
    icon,
    iconBg,
}: {
    label: string;
    value: string | number;
    sub?: string;
    subColor?: string;
    icon: React.ReactNode;
    iconBg: string;
}) => (
    <AdminCard>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
                <Text style={{ color: THEME.textSecondary, fontSize: 10, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase", display: "block", fontFamily: "'Space Grotesk',sans-serif" }}>
                    {label}
                </Text>
                <Text style={{ color: THEME.textPrimary, fontSize: 28, fontWeight: 700, fontFamily: "'Space Grotesk',sans-serif", display: "block", lineHeight: 1.2, marginTop: 4 }}>
                    {value}
                </Text>
                {sub && (
                    <Text style={{ color: subColor ?? THEME.accentGreen, fontSize: 12, fontFamily: "'Space Grotesk',sans-serif", marginTop: 4, display: "block" }}>
                        {sub}
                    </Text>
                )}
            </div>
            <div
                style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: iconBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    flexShrink: 0,
                }}
            >
                {icon}
            </div>
        </div>
    </AdminCard>
);

export const AdminPageTitle = ({
    title,
    subtitle,
    extra,
}: {
    title: string;
    subtitle?: string;
    extra?: React.ReactNode;
}) => (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 16 }}>
        <div>
            <Typography.Title
                level={2}
                style={{ color: THEME.textPrimary, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 26, margin: 0 }}
            >
                {title}
            </Typography.Title>
            {subtitle && (
                <Typography.Text style={{ color: THEME.textSecondary, fontSize: 13, fontFamily: "'Space Grotesk',sans-serif", display: "block", marginTop: 4, maxWidth: 480 }}>
                    {subtitle}
                </Typography.Text>
            )}
        </div>
        {extra && <div>{extra}</div>}
    </div>
);

