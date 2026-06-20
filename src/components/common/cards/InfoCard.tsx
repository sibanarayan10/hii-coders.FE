import { THEME } from "../../../constants/theme";
import { Typography } from "antd";

const { Text } = Typography;

export const InfoCard = ({
    icon,
    title,
    description,
    iconBg,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
    iconBg: string;
}) => (
    <div
        style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            background: "rgba(13,21,48,0.85)",
            border: `1px solid ${THEME.bgCardBorder}`,
            borderRadius: 14,
            padding: "16px 20px",
            backdropFilter: "blur(20px)",
        }}
    >
        <div
            style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: iconBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
            }}
        >
            {icon}
        </div>
        <div>
            <Text
                style={{
                    color: THEME.textPrimary,
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: 14,
                    display: "block",
                }}
            >
                {title}
            </Text>
            <Text
                style={{
                    color: THEME.textSecondary,
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 13,
                }}
            >
                {description}
            </Text>
        </div>
    </div>
);