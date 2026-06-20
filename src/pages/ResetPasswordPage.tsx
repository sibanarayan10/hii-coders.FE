import { useState } from "react";
import { Typography, Input, Form, Spin } from "antd";
import {
    LockOutlined,
    EyeOutlined,
    EyeInvisibleOutlined,
    ArrowLeftOutlined,
    ArrowRightOutlined,
    SafetyCertificateOutlined,
    LoadingOutlined,
    CheckCircleOutlined,
    CheckCircleFilled,
} from "@ant-design/icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { COLORS, THEME } from "../constants/theme";
import { AppButton } from "../components/common/AppButton";
import { AuthCard } from "../components/common/cards/AuthCard";
import { PasswordStrengthBar } from "./AuthPage";
import UserService from "../services/UserService";

const { Title, Text } = Typography;

const RuleTag = ({ passed, label }: { passed: boolean; label: string }) => (
    <span style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "5px 12px",
        borderRadius: 20,
        border: `1px solid ${passed ? THEME.accentGreen : THEME.bgCardBorder}`,
        background: passed ? "rgba(0,229,160,0.07)" : "transparent",
        transition: "all 0.25s",
    }}>
        <CheckCircleOutlined style={{ color: passed ? THEME.accentGreen : THEME.textSecondary, fontSize: 12 }} />
        <Text style={{
            color: passed ? THEME.accentGreen : THEME.textSecondary,
            fontSize: 12,
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 500,
        }}>
            {label}
        </Text>
    </span>
);

const SuccessState = () => {
    const navigate = useNavigate();
    return (
        <AuthCard>
            <div style={{ textAlign: "center", padding: "12px 0" }}>
                <div style={{
                    width: 64, height: 64, borderRadius: "50%",
                    background: "rgba(0,229,160,0.1)",
                    border: `2px solid ${THEME.accentGreen}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 24px",
                }}>
                    <CheckCircleFilled style={{ color: THEME.accentGreen, fontSize: 28 }} />
                </div>
                <Title level={2} style={{
                    color: THEME.textPrimary, fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700, fontSize: 26, margin: "0 0 12px",
                }}>
                    Password Updated!
                </Title>
                <Text style={{ color: THEME.textSecondary, fontSize: 14, lineHeight: 1.6, display: "block", marginBottom: 28 }}>
                    Your password has been reset successfully. You can now sign in with your new password.
                </Text>
                <AppButton
                    buttonVariant="primary"
                    onClick={() => navigate("/auth/sign-in")}
                    style={{
                        width: "100%", height: 50, fontSize: 15, fontWeight: 700,
                        borderRadius: 10, border: "none",
                        background: "linear-gradient(90deg, #4158d0 0%, #6c63ff 60%, #a084ee 100%)",
                    }}
                    icon={<ArrowRightOutlined />}
                    iconPosition="end"
                >
                    Back to Sign In
                </AppButton>
            </div>
        </AuthCard>
    );
};

export const ResetPasswordPage = () => {
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const rules = [
        { label: "8+ Characters", passed: password.length >= 8 },
        { label: "One Special Char", passed: /[^A-Za-z0-9]/.test(password) },
        { label: "One Uppercase", passed: /[A-Z]/.test(password) },
    ];

    const handleSubmit = async (values: { password: string }) => {
        setLoading(true);
        try {
            const res = await UserService.resetPassword(values.password, token || "");
            if (!res?.data.status) {
                return;
            }
            setDone(true);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const eyeIcon = (show: boolean, toggle: () => void) => (
        <div onClick={toggle} style={{ cursor: "pointer", color: THEME.textSecondary, lineHeight: 1 }}>
            {show ? <EyeInvisibleOutlined style={{ fontSize: 16 }} /> : <EyeOutlined style={{ fontSize: 16 }} />}
        </div>
    );

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
        .rp-form .ant-input-affix-wrapper {
          background: #0a1020 !important;
          border: 1px solid ${THEME.bgCardBorder} !important;
          border-radius: 10px !important; padding: 0 14px !important; height: 48px !important;
          transition: border-color 0.2s, box-shadow 0.2s !important;
        }
        .rp-form .ant-input-affix-wrapper:hover,
        .rp-form .ant-input-affix-wrapper:focus-within {
          border-color: ${THEME.accent} !important;
          box-shadow: 0 0 0 2px rgba(108,99,255,0.15) !important;
        }
        .rp-form .ant-input {
          background: transparent !important; color: ${THEME.textPrimary} !important;
          font-family: 'Space Grotesk', sans-serif !important; font-size: 14px !important;
        }
        .rp-form .ant-input::placeholder { color: ${THEME.textSecondary} !important; }
        .rp-form .ant-input-prefix { color: ${THEME.textSecondary} !important; margin-right: 10px !important; }
        .rp-form .ant-form-item-label > label {
          color: ${THEME.textSecondary} !important; font-family: 'Space Grotesk', sans-serif !important;
          font-size: 11px !important; font-weight: 700 !important;
          letter-spacing: 1px !important; text-transform: uppercase !important;
        }
        .rp-form .ant-form-item-explain-error {
          color: ${THEME.accentRed} !important; font-size: 12px !important;
          font-family: 'Space Grotesk', sans-serif !important;
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .rp-card-wrap { animation: cardIn 0.4s ease forwards; }
      `}</style>

            <div style={{
                maxHeight: "100vh", background: THEME.bg,
                display: "flex", flexDirection: "column",
                position: "relative", overflow: "hidden",
            }}>
                {/* Glows */}
                <div style={{ position: "absolute", top: "15%", left: "10%", width: 340, height: 340, borderRadius: "50%", background: "radial-gradient(circle, rgba(108,99,255,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: "10%", right: "8%", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(160,132,238,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />


                {/* Content */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "16px 20px 40px", gap: 16 }}>
                    <div className="rp-card-wrap" style={{ width: "100%", maxWidth: 420 }}>

                        {done ? <SuccessState /> : (
                            <AuthCard>
                                <div style={{ marginBottom: 28 }}>
                                    <Title level={2} style={{
                                        color: THEME.textPrimary, fontFamily: "'Space Grotesk', sans-serif",
                                        fontWeight: 700, fontSize: 28, margin: "0 0 10px",
                                    }}>
                                        Reset Password
                                    </Title>
                                    <Text style={{ color: THEME.textSecondary, fontSize: 14, lineHeight: 1.6 }}>
                                        Enter your new password below to regain access to your account.
                                    </Text>
                                </div>

                                <div className="rp-form">
                                    <Form form={form} layout="vertical" onFinish={handleSubmit} requiredMark={false}>
                                        <Form.Item name="password" label="New Password"
                                            rules={[
                                                { required: true, message: "Please enter a new password" },
                                                { min: 8, message: "At least 8 characters" },
                                            ]}
                                            style={{ marginBottom: 20 }}
                                        >
                                            <Input
                                                type={showNew ? "text" : "password"}
                                                prefix={<LockOutlined />}
                                                suffix={eyeIcon(showNew, () => setShowNew((v) => !v))}
                                                placeholder="••••••••"
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </Form.Item>

                                        <PasswordStrengthBar password={password} />

                                        <Form.Item name="confirm" label="Confirm New Password"
                                            dependencies={["password"]}
                                            rules={[
                                                { required: true, message: "Please confirm your password" },
                                                ({ getFieldValue }) => ({
                                                    validator(_, value) {
                                                        if (!value || getFieldValue("password") === value) return Promise.resolve();
                                                        return Promise.reject(new Error("Passwords do not match"));
                                                    },
                                                }),
                                            ]}
                                            style={{ marginBottom: 24 }}
                                        >
                                            <Input
                                                type={showConfirm ? "text" : "password"}
                                                prefix={<LockOutlined />}
                                                suffix={eyeIcon(showConfirm, () => setShowConfirm((v) => !v))}
                                                placeholder="••••••••"
                                            />
                                        </Form.Item>

                                        <Form.Item style={{ marginBottom: 20 }}>
                                            <AppButton
                                                buttonVariant="primary"
                                                htmlType="submit"
                                                style={{
                                                    width: "100%", height: 50, fontSize: 15, fontWeight: 700,
                                                    borderRadius: 10, border: "none", letterSpacing: "0.3px",
                                                    background: "linear-gradient(90deg, #4158d0 0%, #6c63ff 60%, #a084ee 100%)",
                                                }}
                                                iconPosition="end"
                                                icon={loading
                                                    ? <Spin indicator={<LoadingOutlined style={{ color: COLORS.primary, fontSize: 18 }} spin />} />
                                                    : <ArrowRightOutlined />
                                                }
                                            >
                                                Update Password
                                            </AppButton>
                                        </Form.Item>
                                    </Form>
                                </div>

                                {/* Rule tags */}
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                    {rules.map((r) => <RuleTag key={r.label} {...r} />)}
                                </div>
                            </AuthCard>
                        )}

                        {/* Security tip info card */}
                        {!done && (
                            <div style={{
                                display: "flex", alignItems: "flex-start", gap: 16, marginTop: 16,
                                background: "rgba(13,21,48,0.85)", border: `1px solid ${THEME.bgCardBorder}`,
                                borderRadius: 14, padding: "18px 20px", backdropFilter: "blur(20px)",
                            }}>
                                <div style={{
                                    width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                                    background: "rgba(0,229,160,0.1)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                }}>
                                    <SafetyCertificateOutlined style={{ color: THEME.accentGreen, fontSize: 20 }} />
                                </div>
                                <div>
                                    <Text style={{
                                        color: THEME.textSecondary, fontFamily: "'Space Grotesk', sans-serif",
                                        fontSize: 11, fontWeight: 700, letterSpacing: 1,
                                        textTransform: "uppercase", display: "block", marginBottom: 6,
                                    }}>
                                        Security Tip
                                    </Text>
                                    <Text style={{ color: THEME.textSecondary, fontSize: 13, lineHeight: 1.6 }}>
                                        Avoid reusing passwords from other platforms. A unique password ensures your source code and private repositories remain secure.
                                    </Text>
                                </div>
                            </div>
                        )}

                        {/* Footer */}
                        <div style={{ textAlign: "center", marginTop: 24 }}>
                            <Text style={{ color: THEME.textSecondary, fontSize: 13 }}>
                                Need more help?{" "}
                                <span style={{ color: THEME.textPrimary, fontWeight: 600, cursor: "pointer" }}>
                                    Contact Security Support
                                </span>
                            </Text>
                            <div style={{ marginTop: 20 }}>
                                <Text style={{ color: THEME.textSecondary, fontSize: 12, letterSpacing: 0.5, display: "block", marginBottom: 10 }}>
                                    © 2024 DevCode. Technical Mastery and Modern Elegance.
                                </Text>
                                <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
                                    {["Privacy Policy", "Terms of Service", "Help Center"].map((l) => (
                                        <Text key={l} style={{ color: THEME.textSecondary, fontSize: 13, cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif" }}
                                            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = THEME.textPrimary)}
                                            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = THEME.textSecondary)}
                                        >
                                            {l}
                                        </Text>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
