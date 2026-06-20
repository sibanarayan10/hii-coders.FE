import { Flex, Space, Typography } from "antd";
import { THEME } from "../../constants/theme";
import { AppButton } from "../common/AppButton";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProfilePopover } from "../common/ProfilePopover";

const { Text } = Typography;

interface INavLink {
    label: string;
    exp: RegExp;
    active: boolean;
    path: string
}

const NAV_LINKS: INavLink[] = [{
    label: "Problems",
    exp: /^\/problems(\/.*)?$/,
    active: false,
    path: "/problems"
},
{
    label: "Dashboard",
    exp: /^\/dashboard(\/.*)?$/,
    active: false,
    path: "/dashboard"
},
{
    label: "Contests",
    exp: /^\/contests(\/.*)?$/,
    active: false,
    path: "/contests"
},
{
    label: "Community",
    exp: /^\/community(\/.*)?$/,
    active: false,
    path: "/community"
}]

export const Navbar = () => {
    const [showLandingNav, setShowLandingNav] = useState(false);
    const [navLinks, setNavLinks] = useState(NAV_LINKS);
    const [showNavbar, setShowNavbar] = useState<boolean>(false);
    const [showProfile, setShowProfile] = useState<boolean>(false);

    const location = useLocation();
    const navigate = useNavigate();


    const updateNavlinks = (path: string) => {
        setNavLinks((prevLinks) =>
            prevLinks.map((l) => ({
                ...l,
                active: l.exp.test(path),
            }))
        );
    }

    useEffect(() => {
        updateNavlinks(location.pathname)
        const params = location.pathname.split('/');
        const isAuth = params.includes('auth');
        setShowNavbar(!isAuth);
        if (location.pathname === "/") {
            setShowLandingNav(true);
        } else {
            setShowLandingNav(false);
        }
    }, [location])

    if (!showNavbar) {
        return null;
    }

    return <Flex vertical style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: 40,
    }}>
        <nav
            style={{

                background: THEME.navBg,
                backdropFilter: "blur(14px)",
                borderBottom: `1px solid ${THEME.bgCardBorder}`,
                padding: "0 32px",
                height: "50px",
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
                    <AppButton buttonVariant="outline" style={{ height: 34, padding: "0 18px", fontSize: 13 }} onClick={() => navigate("/auth/sign-in")}>
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
                        <UserOutlined style={{ color: "#fff", fontSize: 15 }} onClick={() => setShowProfile(prev => !prev)} />
                        {showProfile && <ProfilePopover onClose={() => { setShowProfile(false) }} />}
                    </div>
                </Space>
            )}
        </nav>
        {/* <Breadcrumb items={breadcrumbItems} /> */}
    </Flex>
};