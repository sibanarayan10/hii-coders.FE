import { Button, ButtonProps } from "antd";
import { THEME } from "../../constants/theme";


type IButtonType = "primary" | "outline" | "ghost" | "cta";

type IAppButtonProps = ButtonProps & {
    buttonVariant?: IButtonType;
};

export const AppButton = ({ buttonVariant = "primary", children, style, ...props }: IAppButtonProps) => {
    const styles = {
        primary: {
            background: THEME.accent,
            border: "none",
            color: "#fff",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600,
            borderRadius: 8,
            height: 40,
            padding: "0 22px",
        },
        outline: {
            background: "transparent",
            border: `1px solid ${THEME.bgCardBorder}`,
            color: THEME.textPrimary,
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 500,
            borderRadius: 8,
            height: 40,
            padding: "0 22px",
        },
        ghost: {
            background: "rgba(108,99,255,0.15)",
            border: `1px solid ${THEME.accent}`,
            color: THEME.accent,
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600,
            borderRadius: 8,
            height: 40,
            padding: "0 22px",
        },
        cta: {
            background: "transparent",
            border: `1.5px solid rgba(255,255,255,0.55)`,
            color: "#fff",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600,
            borderRadius: 8,
            height: 46,
            padding: "0 32px",
            fontSize: 15,
        },
    };
    return (
        <Button style={{ ...styles[buttonVariant], ...style }} {...props}>
            {children}
        </Button>
    );
};