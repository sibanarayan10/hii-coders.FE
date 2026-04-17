import { useState } from 'react';
import MaterialIcon from '../MaterialIcon';
import { COLORS } from '../../../constants/theme';
import type { Company } from '../../../constants/companies';

interface CompanyCardProps {
  company: Company;
  isSelected?: boolean;
  onClick: () => void;
}

const CompanyCard = ({ company, isSelected = false, onClick }: CompanyCardProps) => {
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px',
        background: isSelected ? COLORS.primaryContainer : COLORS.surfaceContainerHigh,
        border: 'none',
        borderRadius: 8,
        cursor: 'pointer',
        width: '100%',
        transform: hovered ? 'scale(1.02)' : 'scale(1)',
        transition: 'transform 0.15s',
        outline: 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            width: 32,
            height: 32,
            background: COLORS.surfaceContainerHighest,
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <MaterialIcon icon={company.icon} size={18} style={{ color: COLORS.primary }} />
        </div>
        <span style={{ fontSize: 14, fontWeight: 500, color: COLORS.onSurface }}>
          {company.name}
        </span>
      </div>
      <span style={{ fontSize: 12, color: COLORS.onSurfaceVariant }}>{company.count}</span>
    </button>
  );
};

export default CompanyCard;
