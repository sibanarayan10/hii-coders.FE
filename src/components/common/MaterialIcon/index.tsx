import type { CSSProperties } from 'react';

interface MaterialIconProps {
  icon: string;
  size?: number;
  filled?: boolean;
  style?: CSSProperties;
}

const MaterialIcon = ({ icon, size = 24, filled = false, style = {} }: MaterialIconProps) => (
  <span
    className="material-symbols-outlined"
    style={{
      fontSize: size,
      fontVariationSettings: filled
        ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24"
        : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
      ...style,
    }}
  >
    {icon}
  </span>
);

export default MaterialIcon;
