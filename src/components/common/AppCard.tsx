import { Card, CardProps } from "antd";
import { THEME } from "../../constants/theme";

type AppCardProps = CardProps & {
    children: React.ReactNode;
};

export const AppCard = ({ children, style, ...props }: AppCardProps) => (
    <Card
        bordered={false}
        style={{
            background: THEME.bgCard,
            border: `1px solid ${THEME.bgCardBorder}`,
            borderRadius: 14,
            ...style,
        }}
        styles={{ body: { padding: 24 } }}
        {...props}
    >
        {children}
    </Card>
);