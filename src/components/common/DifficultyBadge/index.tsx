import { COLORS } from '../../../constants/theme';
import { DIFFICULTY, type Difficulty } from '../../../constants/problems';

interface BadgeConfig {
  bg: string;
  color: string;
}

const BADGE_CONFIG: Record<Difficulty, BadgeConfig> = {
  [DIFFICULTY.EASY]:   { bg: COLORS.secondaryContainer, color: COLORS.onSecondaryContainer },
  [DIFFICULTY.MEDIUM]: { bg: COLORS.tertiaryContainer,  color: COLORS.onTertiaryContainer  },
  [DIFFICULTY.HARD]:   { bg: COLORS.errorContainer,     color: COLORS.onErrorContainer     },
};

interface DifficultyBadgeProps {
  difficulty: Difficulty;
}

const DifficultyBadge = ({ difficulty }: DifficultyBadgeProps) => {
  const config = BADGE_CONFIG[difficulty] ?? BADGE_CONFIG[DIFFICULTY.EASY];
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '3px 10px',
        background: config.bg,
        color: config.color,
        fontSize: 10,
        fontWeight: 700,
        borderRadius: 2,
        textTransform: 'uppercase',
        letterSpacing: '0.07em',
        whiteSpace: 'nowrap',
      }}
    >
      {difficulty}
    </span>
  );
};

export default DifficultyBadge;
