import { ConfigProvider, theme } from "antd";
import { Navbar } from "../components/common/Navbar";
import { THEME } from "../constants/theme";


const ANT_THEME = {
    algorithm: theme.darkAlgorithm,
    token: {
        colorPrimary: THEME.accent,
        fontFamily: "'Space Grotesk', sans-serif",
        colorBgContainer: THEME.bgCard,
        colorBorder: THEME.bgCardBorder,
        borderRadius: 10,
        colorText: THEME.textPrimary,
        colorTextSecondary: THEME.textSecondary,
    },
    components: {
        Table: {
            headerBg: "transparent",
            borderColor: THEME.bgCardBorder,
            rowHoverBg: THEME.bgRowHover,
            colorBgContainer: "transparent",
        },
        Input: {
            colorBgContainer: "#0d1530",
            colorBorder: THEME.bgCardBorder,
            colorTextPlaceholder: THEME.textSecondary,
        },
        Checkbox: {
            colorPrimary: THEME.accent,
        },
        Select: {
            colorBgContainer: "#0a1020",
            colorBorder: THEME.bgCardBorder,
            colorBgElevated: "#111827",
            optionSelectedBg: "rgba(108,99,255,0.15)",
        },
        Modal: {
            contentBg: "#111827",
        },
        Pagination: {
            colorPrimary: THEME.accent,
            colorBgContainer: THEME.bgCard,
            colorBorder: THEME.bgCardBorder,
        },
        Card: {
            colorBgContainer: THEME.bgCard,
            colorBorderSecondary: THEME.bgCardBorder,
        },
    },
};

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Fira+Code:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${THEME.bg}; color: ${THEME.textPrimary}; }

  /* ── Animations ── */
  @keyframes blink   { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes fadeUp  { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
  .anim-1 { animation: fadeUp 0.8s ease forwards; }
  .anim-2 { animation: fadeUp 0.8s 0.15s ease both; }
  .anim-3 { animation: fadeUp 0.8s 0.30s ease both; }
  .anim-4 { animation: fadeUp 0.8s 0.45s ease both; }

  /* ── Table ── */
  .dc-table .ant-table,
  .dc-table .ant-table-container { background: transparent !important; }
  .dc-table .ant-table-thead > tr > th {
    background: transparent !important;
    border-bottom: 1px solid ${THEME.bgCardBorder} !important;
    padding: 10px 16px !important;
  }
  .dc-table .ant-table-tbody > tr > td {
    border-bottom: 1px solid ${THEME.bgCardBorder} !important;
    padding: 14px 16px !important;
    background: transparent !important;
  }
  .dc-table .ant-table-tbody > tr:hover > td { background: ${THEME.bgRowHover} !important; }
  .dc-table .ant-table-tbody > tr:last-child > td { border-bottom: none !important; }

  /* ── Input ── */
  .dc-input .ant-input-affix-wrapper {
    background: #0d1530 !important;
    border: 1px solid ${THEME.bgCardBorder} !important;
    border-radius: 10px !important;
    padding: 9px 14px;
  }
  .dc-input .ant-input-affix-wrapper:hover,
  .dc-input .ant-input-affix-wrapper:focus-within {
    border-color: ${THEME.accent} !important;
    box-shadow: none !important;
  }
  .dc-input .ant-input { background: transparent !important; color: ${THEME.textPrimary}; font-size: 13px; }
  .dc-input .ant-input::placeholder { color: ${THEME.textSecondary}; }
  .dc-input .ant-input-prefix { color: ${THEME.textSecondary}; margin-right: 8px; }

  /* ── Select ── */
  .ant-select-selector            { background: #0a1020 !important; border-color: ${THEME.bgCardBorder} !important; border-radius: 10px !important; }
  .ant-select-selection-item      { background: rgba(108,99,255,0.15) !important; border: 1px solid rgba(108,99,255,0.3) !important; color: ${THEME.textPrimary} !important; border-radius: 6px !important; }
  .ant-select-selection-placeholder { color: ${THEME.textSecondary} !important; }
  .ant-select-dropdown            { background: #111827 !important; border: 1px solid ${THEME.bgCardBorder} !important; border-radius: 10px !important; }
  .ant-select-item                { color: ${THEME.textSecondary} !important; }
  .ant-select-item-option-selected { background: rgba(108,99,255,0.15) !important; color: ${THEME.textPrimary} !important; }
  .ant-select-item-option-active  { background: rgba(108,99,255,0.08) !important; }

  /* ── Checkbox ── */
  .ant-checkbox-inner             { background: transparent !important; border-color: ${THEME.bgCardBorder} !important; border-radius: 4px !important; }
  .ant-checkbox-checked .ant-checkbox-inner { background: ${THEME.accent} !important; border-color: ${THEME.accent} !important; }

  /* ── Pagination ── */
  .ant-pagination-item            { background: ${THEME.bgCard} !important; border-color: ${THEME.bgCardBorder} !important; border-radius: 7px !important; }
  .ant-pagination-item a          { color: ${THEME.textSecondary} !important; }
  .ant-pagination-item-active     { background: ${THEME.accent} !important; border-color: ${THEME.accent} !important; }
  .ant-pagination-item-active a   { color: #fff !important; }
  .ant-pagination-prev button,
  .ant-pagination-next button     { background: ${THEME.bgCard} !important; border-color: ${THEME.bgCardBorder} !important; color: ${THEME.textSecondary} !important; border-radius: 7px !important; }

  /* ── Modal ── */
  .ant-modal-content { padding: 0 !important; overflow: hidden; border-radius: 16px !important; }

  /* ── Card hover (feature cards) ── */
  .dc-feat-card { transition: all 0.25s; }
  .dc-feat-card:hover { border-color: ${THEME.accent} !important; transform: translateY(-3px); }

  /* ── Section defaults ── */
  section { padding: 90px 40px; }
  @media(max-width: 768px){ section { padding: 60px 20px; } }
`;

export const AppConfigProvider = ({
    children,

}: { children: React.ReactNode }) => {
    return (
        <ConfigProvider theme={ANT_THEME}>
            <style>{GLOBAL_STYLES}</style>

            <Navbar />

            <div
                style={{
                    background: THEME.bg,
                    minHeight: "100vh",
                    paddingTop: 52,
                    color: THEME.textPrimary,
                }}
            >
                {children}
            </div>
        </ConfigProvider>
    );
}