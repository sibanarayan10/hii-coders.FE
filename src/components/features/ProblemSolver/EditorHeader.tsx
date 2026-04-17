import { useState } from 'react';
import { Select, Button, Tooltip, Flex, Popover, InputNumber, Typography, Progress } from 'antd';
import {
  SettingOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  PauseOutlined,
  CaretRightOutlined,
  RedoOutlined,
  ClockCircleOutlined,
  SendOutlined,
} from '@ant-design/icons';
import { useTimer } from '../../../hooks/useTimer';
import { COLORS } from '../../../constants/theme';
import { LANGUAGES } from '../../../constants/editor';

const { Text } = Typography;

interface EditorHeaderProps {
  problemId: string;
  language: string;
  isFullscreen: boolean;
  onLanguageChange: (lang: string) => void;
  onToggleFullscreen: () => void;
}

// ── Timer setup popover content ───────────────────────────────────────────────
interface TimerSetupProps {
  onStart: (hours: number, minutes: number) => void;
  onClose: () => void;
}

const TimerSetup = ({ onStart, onClose }: TimerSetupProps) => {
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);

  const handleStart = () => {
    onStart(hours, minutes);
    onClose();
  };

  return (
    <Flex vertical gap={16} style={{ width: 220 }}>
      <Text style={{ color: COLORS.onSurfaceVariant, fontSize: 12 }}>
        Set your target time for this problem
      </Text>

      <Flex gap={12} align="center">
        <Flex vertical gap={4} style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: COLORS.outline,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Hours
          </Text>
          <InputNumber
            min={0}
            max={23}
            value={hours}
            onChange={(val) => setHours(val ?? 0)}
            style={{ width: '100%' }}
            controls
          />
        </Flex>

        <Text style={{ color: COLORS.outline, marginTop: 18, fontSize: 18, fontWeight: 700 }}>
          :
        </Text>

        <Flex vertical gap={4} style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: COLORS.outline,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Minutes
          </Text>
          <InputNumber
            min={0}
            max={59}
            value={minutes}
            onChange={(val) => setMinutes(val ?? 0)}
            style={{ width: '100%' }}
            controls
          />
        </Flex>
      </Flex>

      <Flex gap={8}>
        <Button
          block
          onClick={onClose}
          style={{
            background: COLORS.surfaceContainerHigh,
            border: 'none',
            color: COLORS.onSurfaceVariant,
          }}
        >
          Cancel
        </Button>
        <Button
          block
          type="primary"
          disabled={hours === 0 && minutes === 0}
          onClick={handleStart}
          style={{
            background: COLORS.primaryContainer,
            border: 'none',
            color: COLORS.onPrimaryFixed,
            fontWeight: 700,
          }}
        >
          {' '}
          Start
        </Button>
      </Flex>
    </Flex>
  );
};

// ── Timer display (while running / paused) ────────────────────────────────────
interface TimerDisplayProps {
  formattedTime: string;
  progressPercent: number;
  isRunning: boolean;
  onToggle: () => void;
  onReset: () => void;
}

const TimerDisplay = ({
  formattedTime,
  progressPercent,
  isRunning,
  onToggle,
  onReset,
}: TimerDisplayProps) => {
  const isLow = progressPercent <= 20;

  return (
    <Flex align="center" gap={4}>
      <Flex gap={2} align="center" style={{ minWidth: 64 }}>
        <Progress
          type="circle"
          percent={progressPercent}
          showInfo={false}
          size={[15, 2]}
          strokeColor={isLow ? COLORS.error : COLORS.primary}
          trailColor={COLORS.surfaceContainerHighest}
        />
        <Text
          style={{
            fontFamily: "'Fira Code', monospace",
            fontSize: 15,
            fontWeight: 600,
            color: isLow ? COLORS.error : isRunning ? COLORS.onSurface : COLORS.outline,
            letterSpacing: '0.05em',
            lineHeight: 1,
            transition: 'color 0.3s',
          }}
        >
          {formattedTime}
        </Text>
      </Flex>
      <Tooltip title={isRunning ? 'Pause timer' : 'Resume timer'}>
        <Button
          type="text"
          size="small"
          icon={
            isRunning ? (
              <PauseOutlined style={{ color: COLORS.onSurfaceVariant, fontSize: 13 }} />
            ) : (
              <CaretRightOutlined style={{ color: COLORS.primary, fontSize: 13 }} />
            )
          }
          onClick={onToggle}
        />
      </Tooltip>
      <Tooltip title="Reset timer">
        <Button
          type="text"
          size="small"
          icon={<RedoOutlined style={{ color: COLORS.onSurfaceVariant, fontSize: 13 }} />}
          onClick={onReset}
        />
      </Tooltip>
    </Flex>
  );
};

// ── Main EditorHeader ─────────────────────────────────────────────────────────
const EditorHeader = ({
  problemId,
  language,
  isFullscreen,
  onLanguageChange,
  onToggleFullscreen,
}: EditorHeaderProps) => {
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);

  const { formattedTime, progressPercent, status, start, reset, toggle } = useTimer(problemId);

  const isActive = status === 'running' || status === 'paused';

  return (
    <Flex
      align="center"
      justify="space-between"
      style={{
        height: 40,
        background: COLORS.surfaceContainer,
        paddingInline: 16,
        borderBottom: `1px solid ${COLORS.outlineVariant}18`,
        flexShrink: 0,
      }}
    >
      {/* Left: Language selector */}
      <Select
        value={language}
        onChange={onLanguageChange}
        options={LANGUAGES}
        size="small"
        style={{ width: 130, fontWeight: 700 }}
        variant="borderless"
      />

      {/* Center: Timer */}

      {/* Right: Settings + Fullscreen */}
      <Flex gap={4}>
        {isActive ? (
          <TimerDisplay
            formattedTime={formattedTime}
            progressPercent={progressPercent}
            isRunning={status === 'running'}
            onToggle={toggle}
            onReset={reset}
          />
        ) : (
          <Popover
            open={popoverOpen}
            onOpenChange={setPopoverOpen}
            trigger="click"
            placement="bottomLeft"
            content={<TimerSetup onStart={start} onClose={() => setPopoverOpen(false)} />}
            title={<Text style={{ color: COLORS.onSurface, fontWeight: 700 }}>Set Timer</Text>}
          >
            <Tooltip title="Set a countdown timer">
              <Button
                type="text"
                size="small"
                icon={<ClockCircleOutlined style={{ color: COLORS.outline, fontSize: 14 }} />}
                style={{ color: COLORS.outline, fontSize: 12, fontWeight: 500 }}
              >
                Set Timer
              </Button>
            </Tooltip>
          </Popover>
        )}

        <Tooltip title="Editor settings">
          <Button
            type="text"
            size="small"
            icon={<SettingOutlined style={{ color: COLORS.onSurfaceVariant, fontSize: 16 }} />}
          />
        </Tooltip>

        <Tooltip title={isFullscreen ? 'Exit fullscreen (Esc)' : 'Fullscreen'}>
          <Button
            type="text"
            size="small"
            icon={
              isFullscreen ? (
                <FullscreenExitOutlined style={{ color: COLORS.primary, fontSize: 16 }} />
              ) : (
                <FullscreenOutlined style={{ color: COLORS.onSurfaceVariant, fontSize: 16 }} />
              )
            }
            onClick={onToggleFullscreen}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default EditorHeader;
