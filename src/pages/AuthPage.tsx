import { useEffect, useState } from "react";
import {
    Typography,
    Input,
    Checkbox,
    Divider,
    Form,
    Spin,
} from "antd";
import {
    UserOutlined,
    MailOutlined,
    LockOutlined,
    EyeOutlined,
    EyeInvisibleOutlined,
    GithubOutlined,
    GoogleOutlined,
    LoadingOutlined,
} from "@ant-design/icons";

import { COLORS, THEME } from '../constants/theme';
import { AppButton } from '../components/common/AppButton';
import UserService from "../services/UserService";
import { useLocation, useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const AuthInput = ({ label, name, placeholder, prefix, type = "text", rules, suffix, onChange }: { label: string, name: string, placeholder?: string, prefix?: React.ReactNode, type?: string, rules?: Array<Object>, suffix?: React.ReactNode, onChange?: (e: any) => void }) => (
    <Form.Item
        name={name}
        rules={rules}
        style={{ marginBottom: 20 }}
        label={
            <Text style={{
                color: THEME.textSecondary,
                fontSize: 13,
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 500,
            }}>
                {label}
            </Text>
        }
    >
        <Input
            type={type}
            placeholder={placeholder}
            prefix={prefix}
            suffix={suffix}
            onChange={onChange}
            style={{
                background: "#0a1020",
                border: `1px solid ${THEME.bgCardBorder}`,
                borderRadius: 10,
                color: THEME.textPrimary,
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 14,
                height: 35,
                paddingLeft: 14,
            }}
        />
    </Form.Item>
);


export const PasswordStrengthBar = ({ password }: { password: string }) => {
    const getStrength = (pwd: string) => {
        if (!pwd || pwd.length === 0) return null;
        let score = 0;
        if (pwd.length >= 8) score++;
        if (/[A-Z]/.test(pwd)) score++;
        if (/[0-9]/.test(pwd)) score++;
        if (/[^A-Za-z0-9]/.test(pwd)) score++;
        if (score <= 1) return { label: "Weak", color: THEME.accentRed, width: "30%" };
        if (score === 2) return { label: "Fair", color: THEME.accentOrange, width: "55%" };
        if (score === 3) return { label: "Good", color: THEME.accentBlue, width: "75%" };
        return { label: "Strong", color: THEME.accentGreen, width: "100%" };
    };

    const strength = getStrength(password);
    if (!strength) return null;

    return (
        <div style={{ marginTop: -12, marginBottom: 16 }}>
            {/* bar track */}
            <div style={{ height: 3, background: THEME.bgCardBorder, borderRadius: 2, overflow: "hidden" }}>
                <div style={{
                    height: "100%",
                    width: strength.width,
                    background: strength.color,
                    borderRadius: 2,
                    transition: "width 0.35s ease, background 0.35s ease",
                }} />
            </div>
            <Text style={{ color: THEME.textSecondary, fontSize: 11, marginTop: 4, display: "block" }}>
                Password strength: <span style={{ color: strength.color, fontWeight: 600 }}>{strength.label}</span>
            </Text>
        </div>
    );
};

export const SocialButton = ({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick?: () => void }) => (
    <div
        onClick={onClick}
        style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            height: 44,
            borderRadius: 10,
            border: `1px solid ${THEME.bgCardBorder}`,
            background: "rgba(255,255,255,0.03)",
            cursor: "pointer",
            transition: "all 0.2s",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 13,
            fontWeight: 500,
            color: THEME.textSecondary,
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = THEME.accent;
            e.currentTarget.style.color = THEME.textPrimary;
            e.currentTarget.style.background = "rgba(108,99,255,0.08)";
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = THEME.bgCardBorder;
            e.currentTarget.style.color = THEME.textSecondary;
            e.currentTarget.style.background = "rgba(255,255,255,0.03)";
        }}
    >
        {icon}
        {label}
    </div>
);


export const AuthCard = ({ children }: { children: React.ReactNode }) => (
    <div style={{
        background: "rgba(13,21,48,0.85)",
        border: `1px solid ${THEME.bgCardBorder}`,
        borderRadius: 18,
        padding: "44px 40px 36px",
        width: "100%",
        maxWidth: 420,
        backdropFilter: "blur(20px)",
        boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
    }}>
        {children}
    </div>
);

const RegisterForm = () => {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);

    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            const res = await UserService.createUser(values);
            if (res.data) {
                navigate("/sign-in");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };



    return (
        <AuthCard>
            {/* Heading */}
            <div style={{ textAlign: "center", marginBottom: 32 }}>
                <Title level={2} style={{
                    color: THEME.textPrimary,
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: 28,
                    margin: "0 0 8px",
                }}>
                    Join DevCode
                </Title>
                <Text style={{ color: THEME.textSecondary, fontSize: 14 }}>
                    Create an account to start solving.
                </Text>
            </div>

            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                requiredMark={false}
            >
                {/* Full Name */}
                <AuthInput
                    label="Full Name"
                    name="name"
                    placeholder="John Doe"
                    prefix={<UserOutlined style={{ color: THEME.textSecondary }} />}
                    rules={[{ required: true, message: "Please enter your name" }]}
                />

                {/* Email */}
                <AuthInput
                    label="Email Address"
                    name="email"
                    placeholder="dev@example.com"
                    prefix={<MailOutlined style={{ color: THEME.textSecondary }} />}
                    rules={[
                        { required: true, message: "Please enter your email" },
                        { type: "email", message: "Enter a valid email" },
                    ]}
                />
                <AuthInput
                    label="Phone Number"
                    name="phone"
                    placeholder="+91 1234567890"
                    prefix={<UserOutlined style={{ color: THEME.textSecondary }} />}
                    rules={[{ required: true, message: "Please enter your phone number" }]}
                />

                {/* Password */}
                <AuthInput
                    label="Password"
                    name="password"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    prefix={<LockOutlined style={{ color: THEME.textSecondary }} />}
                    suffix={
                        <div
                            onClick={() => setShowPassword(!showPassword)}
                            style={{ cursor: "pointer", color: THEME.textSecondary, lineHeight: 1 }}
                        >
                            {showPassword
                                ? <EyeInvisibleOutlined style={{ fontSize: 16 }} />
                                : <EyeOutlined style={{ fontSize: 16 }} />}
                        </div>
                    }
                    rules={[
                        { required: true, message: "Please enter a password" },
                        { min: 6, message: "At least 6 characters" },
                    ]}
                    onChange={(e) => setPassword(e?.currentTarget.value)}
                />

                {/* Password strength bar — reused component */}
                <PasswordStrengthBar password={password} />

                {/* Terms checkbox */}
                <Form.Item name="terms" valuePropName="checked" style={{ marginBottom: 24 }}>
                    <Checkbox
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                    >
                        <Text style={{ color: THEME.textSecondary, fontSize: 13 }}>
                            I agree to the{" "}
                            <span style={{ color: THEME.accent, cursor: "pointer" }}>Terms of Service</span>
                            {" "}and{" "}
                            <span style={{ color: THEME.accent, cursor: "pointer" }}>Privacy Policy</span>
                        </Text>
                    </Checkbox>
                </Form.Item>

                {/* Submit — reuse AppButton */}
                <Form.Item style={{ marginBottom: 20 }}>
                    <AppButton
                        buttonVariant="primary"
                        htmlType="submit"
                        style={{
                            width: "100%",
                            height: 50,
                            fontSize: 16,
                            fontWeight: 700,
                            borderRadius: 10,
                            background: "linear-gradient(90deg, #4158d0 0%, #6c63ff 60%, #a084ee 100%)",
                            border: "none",
                            letterSpacing: "0.3px",
                        }}
                        iconPosition="end"
                        icon={loading && <Spin indicator={<LoadingOutlined style={{ color: COLORS.primary, fontSize: 24 }} spin />} />}
                    >
                        Create Account
                    </AppButton>
                </Form.Item>
            </Form>

            {/* Divider */}
            <Divider style={{ borderColor: THEME.bgCardBorder }}>
                <Text style={{ color: THEME.textSecondary, fontSize: 11, letterSpacing: 1, textTransform: "uppercase" }}>
                    Or join with
                </Text>
            </Divider>

            {/* Social buttons — reuse SocialButton */}
            <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
                <SocialButton
                    icon={<GithubOutlined style={{ fontSize: 16 }} />}
                    label="Github"
                />
                <SocialButton
                    icon={<GoogleOutlined style={{ fontSize: 16 }} />}
                    label="Google"
                />
            </div>

            {/* Switch to login */}
            <div style={{ textAlign: "center" }}>
                <Text style={{ color: THEME.textSecondary, fontSize: 13 }}>
                    Already have an account?{" "}
                    <span
                        onClick={() => {
                            navigate("/sign-in")
                        }}
                        style={{ color: THEME.accent, fontWeight: 600, cursor: "pointer" }}
                    >
                        Sign In
                    </span>
                </Text>
            </div>
        </AuthCard>
    );
};

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);

    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            const res = await UserService.loginUser(values);
            if (res.data) {
                navigate("/problems");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthCard>
            {/* Heading */}
            <div style={{ textAlign: "center", marginBottom: 32 }}>
                <Title level={2} style={{
                    color: THEME.textPrimary,
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: 28,
                    margin: "0 0 8px",
                }}>
                    Welcome Back
                </Title>
                <Text style={{ color: THEME.textSecondary, fontSize: 14 }}>
                    Sign in to continue solving.
                </Text>
            </div>

            <Form form={form} layout="vertical" onFinish={handleSubmit} requiredMark={false}>
                {/* Email */}
                <AuthInput
                    label="Email Address"
                    name="email"
                    placeholder="dev@example.com"
                    prefix={<MailOutlined style={{ color: THEME.textSecondary }} />}
                    rules={[
                        { required: true, message: "Please enter your email" },
                        { type: "email", message: "Enter a valid email" },
                    ]}
                />

                {/* Password */}
                <AuthInput
                    label="Password"
                    name="password"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    prefix={<LockOutlined style={{ color: THEME.textSecondary }} />}
                    suffix={
                        <div
                            onClick={() => setShowPassword(!showPassword)}
                            style={{ cursor: "pointer", color: THEME.textSecondary, lineHeight: 1 }}
                        >
                            {showPassword
                                ? <EyeInvisibleOutlined style={{ fontSize: 16 }} />
                                : <EyeOutlined style={{ fontSize: 16 }} />}
                        </div>
                    }
                    rules={[{ required: true, message: "Please enter your password" }]}
                />

                {/* Forgot password */}
                <div style={{ textAlign: "right", marginTop: -14, marginBottom: 20 }}>
                    <Text style={{ color: THEME.accent, fontSize: 13, cursor: "pointer", fontWeight: 500 }}>
                        Forgot password?
                    </Text>
                </div>

                {/* Submit */}
                <Form.Item style={{ marginBottom: 20 }}>
                    <AppButton
                        buttonVariant="primary"
                        htmlType="submit"
                        style={{
                            width: "100%",
                            height: 50,
                            fontSize: 16,
                            fontWeight: 700,
                            borderRadius: 10,
                            background: "linear-gradient(90deg, #4158d0 0%, #6c63ff 60%, #a084ee 100%)",
                            border: "none",
                            letterSpacing: "0.3px",
                        }}
                        iconPosition="end"
                        icon={loading && <Spin indicator={<LoadingOutlined style={{ color: COLORS.primary, fontSize: 24 }} spin />} />}

                    >
                        Sign In
                    </AppButton>
                </Form.Item>
            </Form>

            {/* Divider */}
            <Divider style={{ borderColor: THEME.bgCardBorder }}>
                <Text style={{ color: THEME.textSecondary, fontSize: 11, letterSpacing: 1, textTransform: "uppercase" }}>
                    Or join with
                </Text>
            </Divider>

            {/* Social buttons */}
            <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
                <SocialButton icon={<GithubOutlined style={{ fontSize: 16 }} />} label="Github" />
                <SocialButton icon={<GoogleOutlined style={{ fontSize: 16 }} />} label="Google" />
            </div>

            {/* Switch to register */}
            <div style={{ textAlign: "center" }}>
                <Text style={{ color: THEME.textSecondary, fontSize: 13 }}>
                    Don't have an account?{" "}
                    <span
                        onClick={() => navigate("/sign-up")}
                        style={{ color: THEME.accent, fontWeight: 600, cursor: "pointer" }}
                    >
                        Sign Up
                    </span>
                </Text>
            </div>
        </AuthCard>
    );
};

export const AuthPage = () => {
    const [mode, setMode] = useState("register");

    const location = useLocation();

    useEffect(() => {
        debugger;
        if (location.pathname === "/sign-in") {
            setMode("login");
        } else if (location.pathname === "/sign-up") {
            setMode("register");
        }
    }, [location])

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${THEME.bg}; }

        /* Form label color */
        .auth-form .ant-form-item-label > label {
          color: ${THEME.textSecondary} !important;
          font-family: 'Space Grotesk', sans-serif !important;
          font-size: 13px !important;
          font-weight: 500 !important;
          height: auto !important;
          margin-bottom: 6px !important;
        }

        /* Input field */
        .auth-form .ant-input-affix-wrapper {
          background: #0a1020 !important;
          border: 1px solid ${THEME.bgCardBorder} !important;
          border-radius: 10px !important;
          padding: 0 14px !important;
          height: 48px !important;
        }
        .auth-form .ant-input-affix-wrapper:hover,
        .auth-form .ant-input-affix-wrapper:focus-within {
          border-color: ${THEME.accent} !important;
          box-shadow: 0 0 0 2px rgba(108,99,255,0.15) !important;
        }
        .auth-form .ant-input {
          background: transparent !important;
          color: ${THEME.textPrimary} !important;
          font-family: 'Space Grotesk', sans-serif !important;
          font-size: 14px !important;
        }
        .auth-form .ant-input::placeholder { color: ${THEME.textSecondary} !important; }
        .auth-form .ant-input-prefix { color: ${THEME.textSecondary} !important; margin-right: 10px !important; }

        /* Checkbox */
        .auth-form .ant-checkbox-inner {
          background: transparent !important;
          border-color: ${THEME.bgCardBorder} !important;
          border-radius: 4px !important;
        }
        .auth-form .ant-checkbox-checked .ant-checkbox-inner {
          background: ${THEME.accent} !important;
          border-color: ${THEME.accent} !important;
        }

        /* Divider text */
        .ant-divider-inner-text { color: ${THEME.textSecondary} !important; }
        .ant-divider { border-color: ${THEME.bgCardBorder} !important; }

        /* Form error message */
        .auth-form .ant-form-item-explain-error {
          color: ${THEME.accentRed} !important;
          font-size: 12px !important;
          font-family: 'Space Grotesk', sans-serif !important;
          margin-top: 4px !important;
        }

        /* Page fade transition */
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .auth-card-wrap { animation: cardIn 0.45s ease forwards; }
      `}</style>

            <div style={{
                height: "100%",
                background: THEME.bg,
                display: "flex",
                flexDirection: "column",
                position: "relative",
                overflow: "hidden",
            }}>

                <div style={{ position: "absolute", top: "15%", left: "10%", width: 340, height: 340, borderRadius: "50%", background: "radial-gradient(circle, rgba(108,99,255,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: "10%", right: "8%", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(160,132,238,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />

                <div style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "40px 20px",
                }}>
                    <div className="auth-card-wrap" style={{ width: "100%", maxWidth: 420 }}>
                        <Form.Provider>
                            <div className="auth-form">
                                {mode === "register" ? (
                                    <RegisterForm />
                                ) : (
                                    <LoginForm />
                                )}
                            </div>
                        </Form.Provider>
                    </div>
                </div>
            </div>
        </>
    );
}
