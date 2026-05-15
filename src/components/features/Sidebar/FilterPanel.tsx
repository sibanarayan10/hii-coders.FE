import { Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import SectionLabel from '../../common/SectionLabel';
import { COLORS } from '../../../constants/theme';
import { Difficulty, STATUS, type Status } from '../../../constants/problems';

interface DifficultyActiveColor {
  bg: string;
  color: string;
}

const DIFFICULTY_OPTIONS: Difficulty[] = [Difficulty.EASY, Difficulty.MEDIUM, Difficulty.HARD];

const STATUS_OPTIONS: { value: Status; label: string }[] = [
  { value: STATUS.TODO, label: 'Todo' },
  { value: STATUS.SOLVED, label: 'Solved' },
  { value: STATUS.ATTEMPTED, label: 'Attempted' },
];

const DIFFICULTY_ACTIVE_COLORS: Record<Difficulty, DifficultyActiveColor> = {
  [Difficulty.EASY]: { bg: '#13a650', color: '#003112' },
  [Difficulty.MEDIUM]: { bg: '#7f4d00', color: '#ffc483' },
  [Difficulty.HARD]: { bg: '#93000a', color: '#ffdad6' },
};

interface FilterPanelProps {
  selectedDifficulties: Difficulty[];
  selectedStatuses: Status[];
  onDifficultyChange: (difficulties: Difficulty[]) => void;
  onStatusChange: (statuses: Status[]) => void;
}

const FilterPanel = ({
  selectedDifficulties,
  selectedStatuses,
  onDifficultyChange,
  onStatusChange,
}: FilterPanelProps) => {
  const toggleDifficulty = (diff: Difficulty): void => {
    const updated = selectedDifficulties.includes(diff)
      ? selectedDifficulties.filter((d) => d !== diff)
      : [...selectedDifficulties, diff];
    onDifficultyChange(updated);
  };

  const toggleStatus = (_e: CheckboxChangeEvent, status: Status): void => {
    const updated = selectedStatuses.includes(status)
      ? selectedStatuses.filter((s) => s !== status)
      : [...selectedStatuses, status];
    onStatusChange(updated);
  };

  return (
    <div style={{ background: COLORS.surfaceContainerLow, borderRadius: 12, padding: 24 }}>
      <SectionLabel>Filters</SectionLabel>

      {/* Difficulty */}
      <div style={{ marginBottom: 24 }}>
        <p
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: COLORS.outline,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: 12,
          }}
        >
          Difficulty
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {DIFFICULTY_OPTIONS.map((diff) => {
            const isActive = selectedDifficulties.includes(diff);
            const activeColors = DIFFICULTY_ACTIVE_COLORS[diff];
            return (
              <button
                key={diff}
                onClick={() => toggleDifficulty(diff)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 4,
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: 'pointer',
                  border: 'none',
                  background: isActive ? activeColors.bg : COLORS.surfaceContainerHighest,
                  color: isActive ? activeColors.color : COLORS.onSurface,
                  transition: 'background 0.15s, color 0.15s',
                }}
              >
                {diff}
              </button>
            );
          })}
        </div>
      </div>

      {/* Status */}
      <div>
        <p
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: COLORS.outline,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: 12,
          }}
        >
          Status
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {STATUS_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
            >
              <Checkbox
                checked={selectedStatuses.includes(opt.value)}
                onChange={(e) => toggleStatus(e, opt.value)}
              />
              <span
                style={{
                  fontSize: 14,
                  color: selectedStatuses.includes(opt.value)
                    ? COLORS.onSurface
                    : COLORS.onSurfaceVariant,
                  transition: 'color 0.15s',
                }}
              >
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
