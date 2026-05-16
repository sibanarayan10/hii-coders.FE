import { THEME } from "../../constants/theme";
import { SolveStatus } from "../../enums/ProblemCategory";

export const ActionBadge = ({ status = SolveStatus.TODO }: { status: SolveStatus }) => {
    const map = {
        [SolveStatus.TODO]: { color: THEME.accent, bg: "rgba(108,99,255,0.12)", border: "rgba(108,99,255,0.3)", label: "Solve" },
        [SolveStatus.ATTEMPTED]: { color: THEME.accentOrange, bg: "rgba(255,169,64,0.1)", border: "rgba(255,169,64,0.25)", label: "Retry" },
        [SolveStatus.SOLVED]: { color: THEME.textSecondary, bg: "rgba(121,134,168,0.08)", border: "rgba(121,134,168,0.2)", label: "Review" },
    };
    const s = map[status];
    return (
        <span style={{ display: "inline-block", background: s.bg, border: `1px solid ${s.border}`, color: s.color, borderRadius: 6, padding: "3px 12px", fontSize: 12, fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif", cursor: "pointer" }}>
            {s.label}
        </span>
    );
};