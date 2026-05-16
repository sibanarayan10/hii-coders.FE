import { Difficulty } from "../../constants/problems";
import { THEME } from "../../constants/theme";

const DiffcultyBadgeConfig = {
    [Difficulty.EASY]: { color: THEME.accentGreen, bg: "rgba(0,229,160,0.1)", border: "rgba(0,229,160,0.25)" },
    [Difficulty.MEDIUM]: { color: THEME.accentOrange, bg: "rgba(255,169,64,0.1)", border: "rgba(255,169,64,0.25)" },
    [Difficulty.HARD]: { color: THEME.accentRed, bg: "rgba(255,107,107,0.1)", border: "rgba(255,107,107,0.25)" },
};


export const DifficultyBadge = ({ level }: { level: Difficulty }) => {
    const s = DiffcultyBadgeConfig[level] || DiffcultyBadgeConfig[Difficulty.EASY];
    return (
        <span style={{ display: "inline-block", background: s.bg, border: `1px solid ${s.border}`, color: s.color, borderRadius: 6, padding: "2px 10px", fontSize: 12, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>
            {level}
        </span>
    );
};



