import type { MouseEvent } from 'react';
import MaterialIcon from '../../common/MaterialIcon';
import { COLORS } from '../../../constants/theme';
import { PAGE_SIZE } from '../../../constants/problems';

interface TablePaginationProps {
  currentPage: number;
  total: number;
  totalAll: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const TablePagination = ({
  currentPage,
  total,
  onPageChange,
  totalPages,
}: TablePaginationProps) => {
  const start = (currentPage - 1) * PAGE_SIZE + 1;
  const end   = Math.min(currentPage * PAGE_SIZE, total);

  const getPageNumbers = (): number[] => {
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage   = Math.min(totalPages, startPage + maxVisible - 1);
    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  const baseBtn: React.CSSProperties = {
    width: 32,
    height: 32,
    borderRadius: 4,
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    fontWeight: 700,
    transition: 'background 0.15s, color 0.15s',
  };

  const inactiveBtn: React.CSSProperties = { ...baseBtn, background: COLORS.surfaceContainerHigh, color: COLORS.onSurface };
  const activeBtn:   React.CSSProperties = { ...baseBtn, background: COLORS.primary,              color: COLORS.onPrimaryFixed };

  const applyHover = (e: MouseEvent<HTMLButtonElement>): void => {
    e.currentTarget.style.background = COLORS.primary;
    e.currentTarget.style.color      = COLORS.onPrimaryFixed;
  };
  const removeHover = (e: MouseEvent<HTMLButtonElement>): void => {
    e.currentTarget.style.background = COLORS.surfaceContainerHigh;
    e.currentTarget.style.color      = COLORS.onSurface;
  };

  return (
    <div
      style={{
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(42,42,42,0.3)',
        borderTop: `1px solid ${COLORS.outlineVariant}1a`,
      }}
    >
      <span style={{ fontSize: 12, color: COLORS.onSurfaceVariant, fontWeight: 500 }}>
        Showing {start} to {end} of {total.toLocaleString()} problems
      </span>

      <div style={{ display: 'flex', gap: 4 }}>
        <button
          style={inactiveBtn}
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          onMouseEnter={applyHover}
          onMouseLeave={removeHover}
        >
          <MaterialIcon icon="chevron_left" size={18} />
        </button>

        {getPageNumbers().map((page) => (
          <button
            key={page}
            style={page === currentPage ? activeBtn : inactiveBtn}
            onClick={() => onPageChange(page)}
            onMouseEnter={(e) => { if (page !== currentPage) applyHover(e); }}
            onMouseLeave={(e) => { if (page !== currentPage) removeHover(e); }}
          >
            {page}
          </button>
        ))}

        <button
          style={inactiveBtn}
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          onMouseEnter={applyHover}
          onMouseLeave={removeHover}
        >
          <MaterialIcon icon="chevron_right" size={18} />
        </button>
      </div>
    </div>
  );
};

export default TablePagination;
