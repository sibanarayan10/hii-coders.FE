import { useState } from "react";
import { Typography, Input, Form, Spin, Divider } from "antd";
import {
    MailOutlined,
    ArrowLeftOutlined,
    SendOutlined,
    QuestionCircleOutlined,
    SafetyCertificateOutlined,
    LoadingOutlined,
    CheckCircleFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { COLORS, THEME } from "../constants/theme";
import { AppButton } from "../components/common/AppButton";
import { AuthCard } from "../components/common/cards/AuthCard";
import { InfoCard } from "../components/common/cards/InfoCard";
import UserService from "../services/UserService";

const { Title, Text } = Typography;



const SuccessState = ({ email, onBack }: { email: string; onBack: () => void }) => (
    <AuthCard>
        <div style={{ textAlign: "center", padding: "12px 0" }}>
            <div
                style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: "rgba(0,229,160,0.1)",
                    border: `2px solid ${THEME.accentGreen}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 24px",
                }}
            >
                <CheckCircleFilled style={{ color: THEME.accentGreen, fontSize: 28 }} />
            </div>

            <Title
                level={2}
                style={{
                    color: THEME.textPrimary,
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: 26,
                    margin: "0 0 12px",
                }}
            >
                Check Your Email
            </Title>
            <Text
                style={{
                    color: THEME.textSecondary,
                    fontSize: 14,
                    lineHeight: 1.6,
                    display: "block",
                    marginBottom: 28,
                }}
            >
                We've sent a password reset link to{" "}
                <span style={{ color: THEME.accent, fontWeight: 600 }}>{email}</span>.
                Check your inbox and follow the instructions.
            </Text>

            <AppButton
                buttonVariant="outline"
                onClick={onBack}
                style={{
                    width: "100%",
                    height: 46,
                    fontSize: 14,
                    fontWeight: 600,
                    borderRadius: 10,
                }}
            >
                Back to Sign In
            </AppButton>

            <Text style={{ color: THEME.textSecondary, fontSize: 12, display: "block", marginTop: 16 }}>
                Didn't receive it?{" "}
                <span style={{ color: THEME.accent, cursor: "pointer", fontWeight: 500 }}>
                    Resend email
                </span>
            </Text>
        </div>
    </AuthCard>
);

export const ForgotPasswordPage = () => {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [email, setEmail] = useState("");
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleSubmit = async (values: { email: string }) => {
        setLoading(true);
        try {
            const res = await UserService.getResetLink(values.email);
            if (res.data) {

            }

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');

        .fp-form .ant-input-affix-wrapper {
          background: #0a1020 !important;
          border: 1px solid ${THEME.bgCardBorder} !important;
          border-radius: 10px !important;
          padding: 0 14px !important;
          height: 48px !important;
          transition: border-color 0.2s, box-shadow 0.2s !important;
        }
        .fp-form .ant-input-affix-wrapper:hover,
        .fp-form .ant-input-affix-wrapper:focus-within {
          border-color: ${THEME.accent} !important;
          box-shadow: 0 0 0 2px rgba(108,99,255,0.15) !important;
        }
        .fp-form .ant-input {
          background: transparent !important;
          color: ${THEME.textPrimary} !important;
          font-family: 'Space Grotesk', sans-serif !important;
          font-size: 14px !important;
        }
        .fp-form .ant-input::placeholder { color: ${THEME.textSecondary} !important; }
        .fp-form .ant-input-prefix { color: ${THEME.textSecondary} !important; margin-right: 10px !important; }
        .fp-form .ant-form-item-label > label {
          color: ${THEME.textSecondary} !important;
          font-family: 'Space Grotesk', sans-serif !important;
          font-size: 11px !important;
          font-weight: 700 !important;
          letter-spacing: 1px !important;
          text-transform: uppercase !important;
        }
        .fp-form .ant-form-item-explain-error {
          color: ${THEME.accentRed} !important;
          font-size: 12px !important;
          font-family: 'Space Grotesk', sans-serif !important;
        }

        @keyframes cardIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fp-card-wrap { animation: cardIn 0.4s ease forwards; }
      `}</style>

            <div
                style={{
                    maxHeight: "100vh",
                    background: THEME.bg,
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Background glows */}
                <div style={{ position: "absolute", top: "15%", left: "10%", width: 340, height: 340, borderRadius: "50%", background: "radial-gradient(circle, rgba(108,99,255,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: "10%", right: "8%", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(160,132,238,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />



                {/* Back to sign in */}
                <div style={{ paddingLeft: 28, marginBottom: 8 }}>
                    <span
                        onClick={() => navigate("/auth/sign-in")}
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                            color: THEME.textSecondary,
                            fontSize: 13,
                            fontFamily: "'Space Grotesk', sans-serif",
                            cursor: "pointer",
                            transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = THEME.textPrimary)}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = THEME.textSecondary)}
                    >
                        <ArrowLeftOutlined style={{ fontSize: 11 }} />
                        Back to Sign In
                    </span>
                </div>

                {/* Main content */}
                <div
                    style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: "16px 20px 40px",
                        gap: 16,
                    }}
                >
                    <div className="fp-card-wrap" style={{ width: "100%", maxWidth: 420 }}>
                        {submitted ? (
                            <SuccessState email={email} onBack={() => navigate("/auth/sign-in")} />
                        ) : (
                            <AuthCard>
                                {/* Heading */}
                                <div style={{ marginBottom: 28 }}>
                                    <Title
                                        level={2}
                                        style={{
                                            color: THEME.textPrimary,
                                            fontFamily: "'Space Grotesk', sans-serif",
                                            fontWeight: 700,
                                            fontSize: 28,
                                            margin: "0 0 10px",
                                        }}
                                    >
                                        Forgot Password?
                                    </Title>
                                    <Text style={{ color: THEME.textSecondary, fontSize: 14, lineHeight: 1.6 }}>
                                        Enter your email address and we'll send you a link to reset your password.
                                    </Text>
                                </div>

                                {/* Form */}
                                <div className="fp-form">
                                    <Form form={form} layout="vertical" onFinish={handleSubmit} requiredMark={false}>
                                        <Form.Item
                                            name="email"
                                            label="Email Address"
                                            rules={[
                                                { required: true, message: "Please enter your email" },
                                                { type: "email", message: "Enter a valid email" },
                                            ]}
                                            style={{ marginBottom: 20 }}
                                        >
                                            <Input
                                                prefix={<MailOutlined style={{ color: THEME.textSecondary }} />}
                                                placeholder="name@company.com"
                                                style={{
                                                    background: "#0a1020",
                                                    border: `1px solid ${THEME.bgCardBorder}`,
                                                    borderRadius: 10,
                                                    color: THEME.textPrimary,
                                                    fontFamily: "'Space Grotesk', sans-serif",
                                                    fontSize: 14,
                                                    height: 48,
                                                }}
                                            />
                                        </Form.Item>

                                        <Form.Item style={{ marginBottom: 0 }}>
                                            <AppButton
                                                buttonVariant="primary"
                                                htmlType="submit"
                                                style={{
                                                    width: "100%",
                                                    height: 50,
                                                    fontSize: 15,
                                                    fontWeight: 700,
                                                    borderRadius: 10,
                                                    background: "linear-gradient(90deg, #4158d0 0%, #6c63ff 60%, #a084ee 100%)",
                                                    border: "none",
                                                    letterSpacing: "0.3px",
                                                }}
                                                iconPosition="end"
                                                icon={
                                                    loading
                                                        ? <Spin indicator={<LoadingOutlined style={{ color: COLORS.primary, fontSize: 18 }} spin />} />
                                                        : <SendOutlined />
                                                }
                                            >
                                                Reset Password
                                            </AppButton>
                                        </Form.Item>
                                    </Form>
                                </div>

                                <Divider style={{ borderColor: THEME.bgCardBorder, margin: "24px 0 20px" }} />

                                {/* Footer link */}
                                <div style={{ textAlign: "center" }}>
                                    <Text style={{ color: THEME.textSecondary, fontSize: 13 }}>
                                        Remember your password?{" "}
                                        <span
                                            onClick={() => navigate("/auth/sign-in")}
                                            style={{ color: THEME.accent, fontWeight: 600, cursor: "pointer" }}
                                        >
                                            Sign In
                                        </span>
                                    </Text>
                                </div>
                            </AuthCard>
                        )}

                        {/* Info cards */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 20 }}>
                            <InfoCard
                                icon={<QuestionCircleOutlined style={{ color: THEME.accentBlue, fontSize: 20 }} />}
                                iconBg="rgba(79,163,255,0.12)"
                                title="Need help?"
                                description="Visit our support center for guidance."
                            />
                            <InfoCard
                                icon={<SafetyCertificateOutlined style={{ color: THEME.accentGreen, fontSize: 20 }} />}
                                iconBg="rgba(0,229,160,0.1)"
                                title="Security"
                                description="Your data is protected with TLS encryption."
                            />
                        </div>

                        {/* Footer */}
                        <div style={{ textAlign: "center", marginTop: 28 }}>
                            <Text style={{ color: THEME.textSecondary, fontSize: 12, letterSpacing: 0.5 }}>
                                © 2024 DEVCODE.
                            </Text>
                            <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 10 }}>
                                {["Privacy Policy", "Terms of Service", "Help Center"].map((l) => (
                                    <Text
                                        key={l}
                                        style={{
                                            color: THEME.textSecondary,
                                            fontSize: 13,
                                            cursor: "pointer",
                                            fontFamily: "'Space Grotesk', sans-serif",
                                            transition: "color 0.2s",
                                        }}
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
        </>
    );
};
