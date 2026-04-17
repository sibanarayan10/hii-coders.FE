import StatCard from '../../common/StatCard';
import { COLORS } from '../../../constants/theme';

interface StatConfig {
  icon: string;
  iconColor: string;
  iconBg: string;
  value: string;
  label: string;
}

const STATS: StatConfig[] = [
  {
    icon: 'task_alt',
    iconColor: COLORS.secondary,
    iconBg: 'rgba(19,166,80,0.15)',
    value: '42/1,200',
    label: 'Solved Problems',
  },
  {
    icon: 'bolt',
    iconColor: COLORS.primary,
    iconBg: 'rgba(0,81,195,0.15)',
    value: 'Top 12%',
    label: 'Global Rank',
  },
  {
    icon: 'military_tech',
    iconColor: COLORS.tertiary,
    iconBg: 'rgba(127,77,0,0.15)',
    value: '300 pts',
    label: 'Architect Credits',
  },
];

const StatsRow = () => (
  <div
    className="stats-grid"
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 16,
      marginBottom: 32,
    }}
  >
    {STATS.map((stat) => (
      <StatCard key={stat.label} {...stat} />
    ))}
  </div>
);

export default StatsRow;
