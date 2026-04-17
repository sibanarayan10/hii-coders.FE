import type { MouseEvent } from 'react';
import { COLORS } from '../../../constants/theme';
import { FOOTER_COLUMNS } from '../../../constants/navigation';

const AppFooter = () => (
  <footer
    style={{
      background: '#131313',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      marginTop: 80,
      paddingTop: 48,
      paddingBottom: 32,
    }}
  >
    <div
      className="footer-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 32,
        maxWidth: 1280,
        margin: '0 auto',
        padding: '0 32px',
      }}
    >
      {/* Brand */}
      <div>
        <span
          style={{
            fontSize: 17,
            fontWeight: 900,
            letterSpacing: '0.05em',
            color: '#d4d4d8',
            textTransform: 'uppercase',
          }}
        >
          CODE_ARCHITECT
        </span>
        <p style={{ marginTop: 16, fontSize: 14, lineHeight: 1.65, color: '#71717a', maxWidth: 260 }}>
          Engineered for the elite. Precision-built coding platform for top-tier software architects.
        </p>
      </div>

      {FOOTER_COLUMNS.map((col) => (
        <div key={col.title} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h4
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: '#d4d4d8',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              marginBottom: 8,
            }}
          >
            {col.title}
          </h4>
          {col.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontSize: 14,
                color: link.active ? COLORS.primary : '#71717a',
                fontWeight: link.active ? 500 : 400,
                textDecoration: 'none',
                opacity: 0.9,
                transition: 'color 0.15s, opacity 0.15s',
              }}
              onMouseEnter={(e: MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.color = '#d4d4d8';
                e.currentTarget.style.opacity = '1';
              }}
              onMouseLeave={(e: MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.color = link.active ? COLORS.primary : '#71717a';
                e.currentTarget.style.opacity = '0.9';
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      ))}
    </div>

    <div
      style={{
        maxWidth: 1280,
        margin: '48px auto 0',
        padding: '24px 32px 0',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        textAlign: 'center',
      }}
    >
      <p style={{ fontSize: 14, color: '#71717a' }}>
        © 2024 Code Architect. All rights reserved.
      </p>
    </div>
  </footer>
);

export default AppFooter;
