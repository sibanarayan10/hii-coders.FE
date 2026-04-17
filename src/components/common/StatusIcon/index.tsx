import MaterialIcon from '../MaterialIcon';
import { COLORS } from '../../../constants/theme';
import { STATUS, type Status } from '../../../constants/problems';

interface StatusIconConfig {
  icon: string;
  filled: boolean;
  color: string;
  opacity?: number;
}

const ICON_MAP: Record<Status, StatusIconConfig> = {
  [STATUS.SOLVED]:    { icon: 'check_circle',         filled: true,  color: COLORS.secondary                },
  [STATUS.ATTEMPTED]: { icon: 'close',                filled: false, color: COLORS.error                    },
  [STATUS.TODO]:      { icon: 'radio_button_unchecked', filled: false, color: COLORS.outline, opacity: 0.3  },
};

interface StatusIconProps {
  status: Status;
}

const StatusIcon = ({ status }: StatusIconProps) => {
  const config = ICON_MAP[status] ?? ICON_MAP[STATUS.TODO];
  return (
    <MaterialIcon
      icon={config.icon}
      filled={config.filled}
      size={20}
      style={{ color: config.color, opacity: config.opacity ?? 1 }}
    />
  );
};

export default StatusIcon;
