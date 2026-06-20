import { THEME } from "../../../constants/theme";

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