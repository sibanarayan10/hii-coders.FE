import { useState } from 'react';
import MaterialIcon from '../../common/MaterialIcon';
import { COLORS } from '../../../constants/theme';

const FAB = () => {
  const [hovered, setHovered] = useState<boolean>(false);
  const [active,  setActive]  = useState<boolean>(false);

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={{
        position: 'fixed',
        bottom: 32,
        right: 32,
        width: 56,
        height: 56,
        borderRadius: '50%',
        background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryContainer})`,
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
        transform: active ? 'scale(0.9)' : 'scale(1)',
        transition: 'transform 0.15s',
        zIndex: 100,
      }}
    >
      <MaterialIcon
        icon="add"
        size={24}
        style={{
          color: COLORS.onPrimaryFixed,
          transform: hovered ? 'rotate(90deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s',
        }}
      />
    </button>
  );
};

export default FAB;
