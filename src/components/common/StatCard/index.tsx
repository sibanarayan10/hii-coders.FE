import MaterialIcon from '../MaterialIcon';
import { COLORS } from '../../../constants/theme';

interface StatCardProps {
  icon: string;
  iconColor: string;
  iconBg: string;
  value: string;
  label: string;
}

const StatCard = ({ icon, iconColor, iconBg, value, label }: StatCardProps) => (
  <div
    style={{
      background: COLORS.surfaceContainerLow,
      padding: 24,
      borderRadius: 12,
      display: 'flex',
      alignItems: 'center',
      gap: 16,
    }}
  >
    <div
      style={{
        width: 48,
        height: 48,
        borderRadius: '50%',
        background: iconBg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <MaterialIcon icon={icon} size={24} style={{ color: iconColor }} />
    </div>
    <div>
      <p style={{ fontSize: 24, fontWeight: 900, letterSpacing: '-0.02em', color: COLORS.onSurface, lineHeight: 1.1 }}>
        {value}
      </p>
      <p style={{ fontSize: 10, fontWeight: 700, color: COLORS.onSurfaceVariant, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 2 }}>
        {label}
      </p>
    </div>
  </div>
);

export default StatCard;
