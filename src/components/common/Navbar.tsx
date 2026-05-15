import { Space, Typography } from "antd";
import { THEME } from "../../constants/theme";
import { AppButton } from "./AppButton";
import {
    MenuOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

export const Navbar = () => {

    const navigate = useNavigate();

    return <nav
        style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            background: THEME.navBg,
            backdropFilter: "blur(14px)",
            borderBottom: `1px solid ${THEME.bgCardBorder}`,
            padding: "0 40px",
            height: 58,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
        }}
    >
        {/* Logo */}
        <Space align="center" size={10}>
            <MenuOutlined style={{ color: THEME.textSecondary, fontSize: 16, cursor: "pointer" }} />
            <Text
                style={{
                    color: THEME.textPrimary,
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: 18,
                    letterSpacing: "-0.5px",
                    marginLeft: 6,
                }}
            >
                DevCode
            </Text>
        </Space>
        {/* Actions */}
        <Space size={12}>
            <AppButton buttonVariant="outline" style={{ height: 34, padding: "0 18px", fontSize: 13 }} onClick={() => navigate("/sign-up")}>
                Sign In
            </AppButton>
            <AppButton buttonVariant="primary" style={{ height: 34, padding: "0 18px", fontSize: 13 }} onClick={() => navigate("/problems")}>
                Get Started
            </AppButton>
        </Space>
    </nav>
};