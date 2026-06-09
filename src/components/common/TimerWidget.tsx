import { useState } from 'react';
import { Typography, Tooltip, InputNumber, Segmented } from 'antd';
import {
    PlayCircleOutlined,
    PauseCircleOutlined,
    ReloadOutlined,
    ClockCircleOutlined,
    FieldTimeOutlined,
} from '@ant-design/icons';
import { THEME } from '../../constants/theme';
import { UseTimerReturn, formatTime } from '../../hooks/useTimer';

const { Text } = Typography;

interface TimerWidgetProps {
    timer: UseTimerReturn;
}

export const TimerWidget = ({ timer }: TimerWidgetProps) => {
    const { mode, setMode, seconds, isRunning, isExpired, start, pause, reset, setCountdownTarget, countdownTarget } = timer;
    const [expanded, setExpanded] = useState(false);

    // Countdown config state (minutes + seconds input)
    const [inputMin, setInputMin] = useState(Math.floor(countdownTarget / 60));
    const [inputSec, setInputSec] = useState(countdownTarget % 60);

    const applyCountdown = () => {
        setCountdownTarget((inputMin * 60) + inputSec);
    };

    // Color feedback
    const pct = mode === 'countdown' && countdownTarget > 0 ? seconds / countdownTarget : null;
    const timeColor = isExpired
        ? THEME.accentRed
        : pct !== null && pct < 0.2
            ? THEME.accentOrange
            : THEME.textPrimary;

    const iconBtn = (icon: React.ReactNode, tooltip: string, onClick: () => void, color?: string) => (
        <Tooltip title={tooltip}>
            <span
                onClick={onClick}
                style={{
                    color: color ?? THEME.textSecondary,
                    fontSize: 18,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'color 0.2s',
                    lineHeight: 1,
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = color ?? THEME.textPrimary)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = color ?? THEME.textSecondary)}
            >
                {icon}
            </span>
        </Tooltip>
    );

    return (
        <div style={{ position: 'relative' }}>
            {/* ── collapsed trigger ── */}
            <Tooltip title={expanded ? '' : 'Timer'}>
                <div
                    onClick={() => setExpanded((v) => !v)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        background: '#161b2e',
                        border: `1px solid ${isExpired ? THEME.accentRed : expanded ? THEME.accent : THEME.bgCardBorder}`,
                        borderRadius: 8,
                        padding: '5px 12px',
                        cursor: 'pointer',
                        transition: 'border-color 0.2s',
                        userSelect: 'none',
                    }}
                >
                    <ClockCircleOutlined
                        style={{
                            color: isExpired ? THEME.accentRed : isRunning ? THEME.accentGreen : THEME.textSecondary,
                            fontSize: 14,
                            transition: 'color 0.3s',
                        }}
                    />
                    <Text
                        style={{
                            color: timeColor,
                            fontFamily: "'Fira Code', monospace",
                            fontSize: 13,
                            fontWeight: 600,
                            lineHeight: '16px',
                            minWidth: 52,
                            display: 'block',
                            transition: 'color 0.3s',
                        }}
                    >
                        {formatTime(seconds)}
                    </Text>
                    {isExpired && (
                        <Text style={{ color: THEME.accentRed, fontSize: 10, fontWeight: 700, letterSpacing: 1 }}>
                            TIME
                        </Text>
                    )}
                </div>
            </Tooltip>

            {/* ── expanded panel ── */}
            {expanded && (
                <div
                    style={{
                        position: 'absolute',
                        top: 'calc(100% + 10px)',
                        right: 0,
                        width: 230,
                        background: '#0d1530',
                        border: `1px solid ${THEME.bgCardBorder}`,
                        borderRadius: 12,
                        padding: 16,
                        zIndex: 1000,
                        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* mode toggle */}
                    <Segmented
                        value={mode}
                        onChange={(val) => setMode(val as any)}
                        options={[
                            { label: <span style={{ fontSize: 12 }}><FieldTimeOutlined /> Stopwatch</span>, value: 'stopwatch' },
                            { label: <span style={{ fontSize: 12 }}><ClockCircleOutlined /> Countdown</span>, value: 'countdown' },
                        ]}
                        block
                        style={{ marginBottom: 14, fontSize: 12 }}
                    />

                    {/* big time display */}
                    <div style={{ textAlign: 'center', marginBottom: 14 }}>
                        <Text
                            style={{
                                color: timeColor,
                                fontFamily: "'Fira Code', monospace",
                                fontSize: 32,
                                fontWeight: 700,
                                letterSpacing: 3,
                                display: 'block',
                                lineHeight: 1.2,
                                transition: 'color 0.3s',
                            }}
                        >
                            {formatTime(seconds)}
                        </Text>
                        {isExpired && (
                            <Text style={{ color: THEME.accentRed, fontSize: 11, fontWeight: 600 }}>
                                ⏰ Time's up!
                            </Text>
                        )}
                    </div>

                    {/* controls */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 14 }}>
                        {isRunning
                            ? iconBtn(<PauseCircleOutlined />, 'Pause', pause, THEME.accentOrange)
                            : iconBtn(<PlayCircleOutlined />, 'Start', start, THEME.accentGreen)}
                        {iconBtn(<ReloadOutlined />, 'Reset', reset)}
                    </div>

                    {/* countdown config */}
                    {mode === 'countdown' && (
                        <div
                            style={{
                                borderTop: `1px solid ${THEME.bgCardBorder}`,
                                paddingTop: 12,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 8,
                            }}
                        >
                            <Text style={{ color: THEME.textSecondary, fontSize: 11, letterSpacing: 1, fontWeight: 600 }}>
                                SET DURATION
                            </Text>
                            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                <InputNumber
                                    min={0}
                                    max={99}
                                    value={inputMin}
                                    onChange={(v) => setInputMin(v ?? 0)}
                                    size="small"
                                    addonAfter={<span style={{ fontSize: 10, color: THEME.textSecondary }}>min</span>}
                                    style={{ width: 90 }}
                                />
                                <InputNumber
                                    min={0}
                                    max={59}
                                    value={inputSec}
                                    onChange={(v) => setInputSec(v ?? 0)}
                                    size="small"
                                    addonAfter={<span style={{ fontSize: 10, color: THEME.textSecondary }}>sec</span>}
                                    style={{ width: 90 }}
                                />
                            </div>
                            <button
                                onClick={applyCountdown}
                                style={{
                                    marginTop: 2,
                                    background: THEME.accent,
                                    border: 'none',
                                    borderRadius: 6,
                                    color: '#fff',
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    fontWeight: 600,
                                    fontSize: 12,
                                    padding: '6px 0',
                                    cursor: 'pointer',
                                    letterSpacing: 0.5,
                                    transition: 'opacity 0.2s',
                                }}
                                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
                                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
                            >
                                Apply
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
