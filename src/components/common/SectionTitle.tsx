import { Typography } from "antd";
import { THEME } from "../../constants/theme";

const { Title } = Typography;

export const SectionTitle = ({ children, style }: { children: React.ReactNode, style?: React.CSSProperties }) => (
    <Title
        level={2}
        style={{
            color: THEME.textPrimary,
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            textAlign: "center",
            marginBottom: 8,
            fontSize: 32,
            ...style,
        }}
    >
        {children}
    </Title>
);