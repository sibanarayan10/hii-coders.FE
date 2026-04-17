import { COLORS } from '../../../constants/theme';

interface TopicTagProps {
  label: string;
}

const TopicTag = ({ label }: TopicTagProps) => (
  <span
    style={{
      fontSize: 10,
      background: COLORS.surfaceContainerHighest,
      color: COLORS.outline,
      padding: '2px 8px',
      borderRadius: 4,
      whiteSpace: 'nowrap',
    }}
  >
    {label}
  </span>
);

export default TopicTag;
