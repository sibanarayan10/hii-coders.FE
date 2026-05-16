import { Space, Typography } from "antd";
import { THEME } from "../../constants/theme";
import { AppButton } from "./AppButton";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const { Text } = Typography;

interface INavLink {
    label: string;
    path: string;
    active: boolean;
}

const NAV_LINKS: INavLink[] = [{
    label: "Problems",
    path: "/problems",
    active: false
},
{
    label: "Dashboard",
    path: "/dashboard",
    active: false
},
{
    label: "Contests",
    path: "/contests",
    active: false
},
{
    label: "Community",
    path: "/community",
    active: false
}]

export const Navbar = () => {

    const [showLandingNav, setShowLandingNav] = useState(false);
    const [navLinks, setNavLinks] = useState(NAV_LINKS);

    const location = useLocation();
    const navigate = useNavigate();


    const updateNavlinks = (path: string) => {
        setNavLinks((prevLinks) =>
            prevLinks.map((l) => ({
                ...l,
                active: l.path === path,
            }))
        );
    }

    useEffect(() => {
        updateNavlinks(location.pathname)
        if (location.pathname === "/") {
            setShowLandingNav(true);
        } else {
            setShowLandingNav(false);
        }
    }, [location])

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
            padding: "0 32px",
            height: 52,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
        }}
    >
        <Space size={0} align="center">
            <Text
                style={{
                    color: THEME.textPrimary,
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: 16,
                    marginRight: 28,
                    letterSpacing: "-0.4px",
                    cursor: "pointer",
                }}
                onClick={() => navigate("/")}
            >
                DevCode
            </Text>

        </Space>
        <Space size={0} align="center">
            {!showLandingNav &&
                navLinks.map((link) => (
                    <div
                        key={link.label}
                        onClick={() => {
                            navigate(link.path);
                            setNavLinks((prevLinks) =>
                                prevLinks.map((l) => ({
                                    ...l,
                                    active: l.label === link.label,
                                }))
                            );
                        }}
                        style={{
                            padding: "0 14px",
                            height: 52,
                            display: "flex",
                            alignItems: "center",
                            borderBottom: link.active
                                ? `2px solid ${THEME.accent}`
                                : "2px solid transparent",
                            cursor: "pointer",
                            transition: "border-color 0.2s",
                        }}
                    >
                        <Text
                            style={{
                                color: link.active ? THEME.textPrimary : THEME.textSecondary,
                                fontSize: 13,
                                fontWeight: link.active ? 600 : 400,
                                fontFamily: "'Space Grotesk', sans-serif",
                            }}
                        >
                            {link.label}
                        </Text>
                    </div>
                ))}
        </Space>

        {showLandingNav ? (
            <Space size={10}>
                <AppButton buttonVariant="outline" style={{ height: 34, padding: "0 18px", fontSize: 13 }} onClick={() => navigate("/sign-up")}>
                    Sign In
                </AppButton>
                <AppButton buttonVariant="primary" style={{ height: 34, padding: "0 18px", fontSize: 13 }} onClick={() => navigate("/problems")}>
                    Get Started
                </AppButton>
            </Space>
        ) : (
            <Space size={12} align="center">
                <BellOutlined style={{ color: THEME.textSecondary, fontSize: 15 }} />

                <div
                    style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background: `linear-gradient(135deg, ${THEME.accent}, #a084ee)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                    }}
                >
                    <UserOutlined style={{ color: "#fff", fontSize: 15 }} />
                </div>
            </Space>
        )}
    </nav>
};