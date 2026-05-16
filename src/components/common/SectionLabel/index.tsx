import type { ReactNode } from 'react';
import { COLORS } from '../../../constants/theme';

interface SectionLabelProps {
  children: ReactNode;
}

const SectionLabel = ({ children }: SectionLabelProps) => (
  <h3
    style={{
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: '0.05em',
      color: COLORS.onSurfaceVariant,
      textTransform: 'uppercase',
    }}
  >
    {children}
  </h3>
);

export default SectionLabel;
