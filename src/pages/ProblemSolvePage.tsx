import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";
import {
  Typography,
  Space,
  Select,
  Divider,
  Flex,
  Button,
  Tooltip,
  message,
  Spin,

} from "antd";
import {
  ClockCircleOutlined,
  CopyOutlined,
  RightOutlined,
  FileTextOutlined,
  InfoCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import MonacoEditor, { loader } from '@monaco-editor/react';
import { AppButton } from "../components/common/AppButton";
import { DifficultyBadge } from "../components/common/DifficultyBadge";
import { ProgrammingLanguage, ProgrammingLanguageLabel } from "../enums/ProgrammingLanguage";
import { useParams } from "react-router-dom";
import { Problem } from "../constants/problems";
import ProblemService from "../services/ProblemService";
import { BlockViewer } from "../components/common/BlocksViewer";
import { COLORS, THEME } from "../constants/theme";
import { useAuth } from "../contexts/AuthContext";
import SubmissionService from "../services/Submission";
import SolutionService from "../services/SolutionService";
import { SubmissionsPanel } from "../components/common/SubmissionCard";
import { useTimer, UseTimerReturn } from "../hooks/useTimer";
import { TimerWidget } from "../components/common/TimerWidget";



const { Text, Title } = Typography;

const MONACO_LANGUAGE_MAP: Record<string, string> = {
  python3: 'python',
  javascript: 'javascript',
  typescript: 'typescript',
  java: 'java',
  cpp: 'cpp',
  go: 'go',
  rust: 'rust',
};

export const Breadcrumb = ({ items = [], separator = <RightOutlined style={{ fontSize: 10, color: THEME.textSecondary }} /> }: { items: any, separator?: React.ReactNode }) => (
  <> <Space size={6} align="center" wrap>
    {items.map((item: any, i: number) => (
      <Space key={i} size={6} align="center">
        {item.icon && <span style={{ color: THEME.textSecondary, fontSize: 13 }}>{item.icon}</span>}
        <Text
          onClick={item.onClick}
          style={{
            color: item.onClick ? THEME.textSecondary : THEME.textPrimary,
            fontSize: 13,
            fontFamily: "'Space Grotesk', sans-serif",
            cursor: item.onClick ? "pointer" : "default",
            fontWeight: i === items.length - 1 ? 500 : 400,
            transition: "color 0.2s",
          }}
          onMouseEnter={(e: any) => { if (item.onClick) e.target.style.color = THEME.textPrimary; }}
          onMouseLeave={(e: any) => { if (item.onClick) e.target.style.color = THEME.textSecondary; }}
        >
          {item.label}
        </Text>
        {i < items.length - 1 && separator}
      </Space>
    ))}
  </Space>
    <Divider style={{ margin: 0 }} />
  </>
);

export const CodeBlock = ({ label, code, language = "plaintext" }: { label: string, code: string, language?: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Syntax-color tokens for JS-like examples
  const colorize = (line: string) => {
    return line
      .replace(/(Input:|Output:|Example \d+:)/g, `<span style="color:${THEME.textSecondary};font-weight:600">$1</span>`)
      .replace(/(\[[\d,\s]+\])/g, `<span style="color:${THEME.accentGreen}">$1</span>`)
      .replace(/(\d+)(?=[,\]\s]|$)/g, `<span style="color:${THEME.accentGreen}">$1</span>`);
  };

  return (
    <div
      style={{
        background: "rgba(0,0,0,0.25)",
        border: `1px solid ${THEME.bgCardBorder}`,
        borderRadius: 10,
        overflow: "hidden",
        marginTop: 12,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px 14px",
          borderBottom: `1px solid ${THEME.bgCardBorder}`,
        }}
      >
        <Text style={{ color: THEME.textSecondary, fontSize: 11, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase", fontFamily: "'Space Grotesk',sans-serif" }}>
          {label}
        </Text>
        <CopyOutlined
          onClick={handleCopy}
          style={{ color: copied ? THEME.accentGreen : THEME.textSecondary, fontSize: 13, cursor: "pointer", transition: "color 0.2s" }}
        />
      </div>
      {/* Code */}
      <div style={{ padding: "12px 14px" }}>
        {code.split("\n").map((line, i) => (
          <div
            key={i}
            style={{ fontFamily: "'Fira Code', monospace", fontSize: 13, lineHeight: "22px", color: THEME.textPrimary }}
            dangerouslySetInnerHTML={{ __html: colorize(line) }}
          />
        ))}
      </div>
    </div>
  );
};

const TestCaseTab = ({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) => (
  <div
    onClick={onClick}
    style={{
      padding: "6px 16px",
      borderRadius: 8,
      border: `1px solid ${active ? THEME.accent : THEME.bgCardBorder}`,
      background: active ? "rgba(108,99,255,0.12)" : "transparent",
      color: active ? THEME.textPrimary : THEME.textSecondary,
      fontSize: 13,
      fontFamily: "'Space Grotesk',sans-serif",
      fontWeight: active ? 600 : 400,
      cursor: "pointer",
      transition: "all 0.2s",
      position: "relative",
    }}
  >
    {label}
    {active && (
      <div style={{ position: "absolute", bottom: -1, left: "50%", transform: "translateX(-50%)", width: 20, height: 2, background: THEME.accent, borderRadius: 2 }} />
    )}
  </div>
);



const MonacoEditorMock = ({ code, setCode, language, setLanguage, timer }: { code: string, setCode: Dispatch<SetStateAction<string>>, language: ProgrammingLanguage, setLanguage: Dispatch<SetStateAction<ProgrammingLanguage>>, timer: UseTimerReturn }) => {

  const debounce = (fn: any, delay: number) => {
    let timer: any;

    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const handleChange = (val: string) => { };

  const debouncedOnChange = debounce(handleChange, 1.1);

  const onChange = (val: string) => {
    setCode(val);
    debouncedOnChange(val);
  };

  const editorOption = useMemo(
    () => ({
      fontSize: 13,
      fontFamily: "'Fira Code', 'Fira Mono', monospace",
      fontLigatures: true,
      background: "black!important",
      lineHeight: 22,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      lineNumbers: 'on',
      lineNumbersMinChars: 3,
      renderLineHighlight: 'line',
      tabSize: 4,
      insertSpaces: true,
      wordWrap: 'off',
      folding: true,
      bracketPairColorization: { enabled: true },
      automaticLayout: true,
      scrollbar: {
        verticalScrollbarSize: 4,
        horizontalScrollbarSize: 4,
      },

      padding: { top: 0, bottom: 0 },
      cursorBlinking: 'smooth',
      smoothScrolling: true,
      contextmenu: true,
      suggest: { showKeywords: true },
    }),
    [],
  );

  const getOption = useCallback(() => {
    return [...Object.entries(ProgrammingLanguageLabel) as [ProgrammingLanguage, string][]].map(([key, value]) => ({
      label: value,
      value: key,
    }));
  }, [])


  useEffect(() => {

    loader.init().then((monacoInstance) => {

      monacoInstance.editor.defineTheme('code-platform-theme', {
        base: 'vs-dark',
        inherit: true,

        rules: [
          { token: 'comment', foreground: '4a5a7a', fontStyle: 'italic' },
          { token: 'keyword', foreground: '569cd6', fontStyle: 'bold' },
          { token: 'string', foreground: 'ce9178' },
          { token: 'number', foreground: 'b5cea8' },
          { token: 'function', foreground: 'dcdcaa' },
          { token: 'type', foreground: '4ec9b0' },
          { token: 'variable', foreground: '9cdcfe' },
          { token: 'operator', foreground: 'd4d4d4' },
          { token: 'delimiter', foreground: 'd4d4d4' },
          { token: '', foreground: 'e8eaf6' }, // default
        ],

        colors: {
          // ── core ──────────────────────────────────────────────
          'editor.background': '#0d1117', // slightly deeper than THEME.bg
          'editor.foreground': '#e8eaf6', // THEME.textPrimary
          'editorGutter.background': '#0a0e1a', // matches toolbar bg

          // ── cursor ────────────────────────────────────────────
          'editorCursor.foreground': '#6c63ff', // THEME.accent

          // ── line highlight ────────────────────────────────────
          'editor.lineHighlightBackground': '#6c63ff0f', // accent at ~6% opacity
          'editor.lineHighlightBorder': '#00000000', // hide border

          // ── selection ─────────────────────────────────────────
          'editor.selectionBackground': '#6c63ff33', // accent at 20%
          'editor.inactiveSelectionBackground': '#6c63ff18', // accent at 10%
          'editor.selectionHighlightBackground': '#6c63ff22',

          // ── line numbers ──────────────────────────────────────
          'editorLineNumber.foreground': '#3c4a6e', // dim — matches mock
          'editorLineNumber.activeForeground': '#7986a8', // THEME.textSecondary

          // ── indent guides ─────────────────────────────────────
          'editorIndentGuide.background1': '#1a2545', // THEME.bgCardBorder
          'editorIndentGuide.activeBackground1': '#6c63ff55',

          // ── bracket matching ──────────────────────────────────
          'editorBracketMatch.background': '#6c63ff22',
          'editorBracketMatch.border': '#6c63ff88',

          // ── scrollbar ─────────────────────────────────────────
          'scrollbarSlider.background': '#1a254588',
          'scrollbarSlider.hoverBackground': '#6c63ff44',
          'scrollbarSlider.activeBackground': '#6c63ff66',

          // ── minimap ───────────────────────────────────────────
          'minimap.background': '#0a0e1a',
          'minimapSlider.background': '#1a254555',
          'minimapSlider.hoverBackground': '#6c63ff33',

          // ── suggest / autocomplete ────────────────────────────
          'editorSuggestWidget.background': '#0d1530', // THEME.bgCard
          'editorSuggestWidget.border': '#1a2545', // THEME.bgCardBorder
          'editorSuggestWidget.foreground': '#e8eaf6',
          'editorSuggestWidget.selectedBackground': '#6c63ff25',
          'editorSuggestWidget.highlightForeground': '#6c63ff',

          // ── hover tooltip ─────────────────────────────────────
          'editorHoverWidget.background': '#0d1530',
          'editorHoverWidget.border': '#1a2545',

          // ── find widget ───────────────────────────────────────
          'editorWidget.background': '#0d1530',
          'editorWidget.border': '#1a2545',
          'input.background': '#0a1020',
          'input.border': '#1a2545',
          'input.foreground': '#e8eaf6',

          // ── peek view ─────────────────────────────────────────
          'peekView.border': '#6c63ff',
          'peekViewEditor.background': '#0a0e1a',
          'peekViewResult.background': '#0d1530',
        },
      });
    });

  }, []);

  return (
    <Flex vertical style={{ height: "100%", background: "#0d1117", overflow: "hidden" }}>
      <Flex
        justify="space-between"
        align="center"
        style={{
          padding: "10px 16px",
          borderBottom: `1px solid ${THEME.bgCardBorder}`,
          background: "#0a0e1a",
          flexShrink: 0,
        }}
      >
        <Select
          value={language}
          onChange={(val) => setLanguage(val as ProgrammingLanguage)}
          size="small"
          style={{ width: 140 }}
          options={getOption()}
        />

        <Space size={12}>
          <Tooltip title="Press CTRL+S to save the code">
            <Button
              type="default"
              icon={<InfoCircleOutlined />}
            />

          </Tooltip>
          <TimerWidget timer={timer} />

        </Space>
      </Flex>

      <div style={{ flex: 1, overflow: "auto", padding: "16px 0" }}>
        <MonacoEditor
          height="100%"
          language={MONACO_LANGUAGE_MAP[language] ?? 'python'}
          value={code}
          theme="code-platform-theme"
          className="monaco-editor"
          onChange={(val) => onChange(val ?? '')}
          options={editorOption as any}
        />
      </div>
    </Flex>
  );
};

const ProblemDescription = ({ problem, activeTab, setActiveTab, submissionId }: { problem: Problem, activeTab: "description" | "submissions", setActiveTab: Dispatch<SetStateAction<"description" | "submissions">>, submissionId: string }) => {
  const [activeCase, setActiveCase] = useState(0);
  const [testCases, setTestCases] = useState<any[]>([]);

  const getTestCase = async () => {
    if (!problem.id) {
      return;
    }
    try {
      const res = await ProblemService.getTestCase(problem.id);
      if (res.data) {
        setTestCases(res.data)
      }
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getTestCase();
  }, [problem])

  return (
    <Flex vertical style={{ height: "100%", background: THEME.bgCard }}>
      {/* Tab bar */}
      <div
        style={{
          display: "flex",
          borderBottom: `1px solid ${THEME.bgCardBorder}`,
          padding: "0 24px",
          flexShrink: 0,
          background: "#0a0e1a",
        }}
      >
        {["description", "submissions"].map((tab: any) => (
          <div
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "14px 4px",
              marginRight: 24,
              cursor: "pointer",
              borderBottom: activeTab === tab ? `2px solid ${THEME.accent}` : "2px solid transparent",
              transition: "border-color 0.2s",
            }}
          >
            <Text
              style={{
                color: activeTab === tab ? THEME.textPrimary : THEME.textSecondary,
                fontSize: 14,
                fontWeight: activeTab === tab ? 600 : 400,
                fontFamily: "'Space Grotesk',sans-serif",
                textTransform: "capitalize",
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </div>
        ))}
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflow: "auto", padding: "24px" }}>
        {activeTab === "description" ? (
          <>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
              <Title
                level={3}
                style={{ color: THEME.textPrimary, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, margin: 0, fontSize: 22 }}
              >
                {problem.title}
              </Title>
              <Text style={{ color: THEME.textSecondary, fontSize: 13, fontStyle: "italic", alignSelf: "flex-end" }}>
                {problem.activeUsers || 1} users solving this...
              </Text>
            </div>

            {/* Badges row — reuse DifficultyBadge + company tags */}
            <Space size={10} style={{ marginBottom: 20, flexWrap: "wrap" }}>
              <DifficultyBadge level={problem.difficulty} />
              <Text style={{ color: THEME.textSecondary, fontSize: 13 }}>
                Acceptance: <span style={{ color: THEME.textPrimary, fontWeight: 600 }}>{problem.acceptance || '0.00%'}</span>
              </Text>

            </Space>

            <Divider style={{ borderColor: THEME.bgCardBorder, margin: "0 0 20px" }} />

            <BlockViewer blocks={problem.blocks} showParagraphOnly={false} />


            {/* Example CodeBlock — reuse CodeBlock component */}
            {/* {problem.examples.map((ex: any, i: number) => (
                            <CodeBlock
                                key={i}
                                label={`Example ${i + 1}`}
                                code={ex.code}
                            />
                        ))} */}

            <Divider style={{ borderColor: THEME.bgCardBorder, margin: "24px 0" }} />

            {/* Test Cases */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <FileTextOutlined style={{ color: THEME.textPrimary, fontSize: 16 }} />
              <Title level={5} style={{ color: THEME.textPrimary, fontFamily: "'Space Grotesk',sans-serif", margin: 0 }}>
                Test Cases
              </Title>
            </div>

            <Space size={10} style={{ marginBottom: 16 }}>
              {testCases.map((tc: any, i: number) => (
                <TestCaseTab
                  key={i}
                  label={`Case ${i + 1}`}
                  active={activeCase === i}
                  onClick={() => setActiveCase(i)}
                />
              ))}
            </Space>
            {testCases.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {/* Input panel */}
                <TestCasePanel
                  label="Input"
                  raw={testCases[activeCase].inputData}
                />

                {/* Output panel — show after run */}
                {testCases[activeCase].expectedOutput && (
                  <TestCasePanel
                    label="Expected Output"
                    raw={testCases[activeCase].expectedOutput}
                    accent={THEME.accentGreen}
                  />
                )}
              </div>
            )}
          </>
        ) : (
          <SubmissionsPanel problemId={problem?.id || ''} submissionId={submissionId} />
        )}
      </div>
    </Flex>
  );
};


type Loading = "PROBLEM_DETAIL" | "SUBMISSION" | "RUN" | "NONE";

export const ProblemSolvePage = () => {
  const [problem, setProblem] = useState<Problem>();
  const [loading, setLoading] = useState<{ show: boolean, type: Loading }>({ show: false, type: "NONE" });
  const [code, setCode] = useState<string>('');
  const [language, setLanguage] = useState(ProgrammingLanguage.JAVA);
  const [solutionLoading, setSolutionLoading] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [activeTab, setActiveTab] = useState<"description" | "submissions">("description");
  const [submissionId, setSubmissionId] = useState<string>();

  const timer = useTimer();
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();

  const getProblemDetail = async () => {
    if (!id) {
      console.error('Something went wrong');
      return;
    }
    try {
      setLoading({ show: true, type: "PROBLEM_DETAIL" });
      const res = await ProblemService.getProblemDetail(id);
      console.log(res);
      if (res.data) {
        setProblem(res.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading({ show: false, type: "NONE" })

    }
  };

  const getSolution = async () => {
    if (!user?.id) {
      return;
    }
    if (!id) {
      return;
    }
    try {
      setSolutionLoading(true)
      const res = await SolutionService.getSolution(language, user.id, id);
      if (res.data) {
        setCode(res.data);
      }

    } catch (error) {
      console.error(error);
    } finally {
      setSolutionLoading(false);
    }
  }

  const submitCode = async () => {
    const payload = {
      userId: user?.id,
      problemId: id,
      solution: code,
      language: language,

    }
    setLoading({ show: true, type: "SUBMISSION" })
    try {
      const res = await SubmissionService.submitCode(payload)
      if (res.data) {
        setSubmissionId(res.data);
        setActiveTab("submissions");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading({ show: false, type: "NONE" })
    }

  }

  const saveSolution = useCallback(async () => {
    const payload = {
      language: language,
      solution: code,
      problemId: id,
      userId: user?.id,

    }
    try {
      const res = await SolutionService.saveSolution(payload)
      if (res.data) {
        messageApi.open({
          type: 'success',
          content: 'Solution saved successfully',
          duration: 10,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }, [user, code])

  const handleKeyDown = useCallback((e: any) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
      e.preventDefault();
      saveSolution();
    }
  }, [user, code]);

  useEffect(() => {
    getProblemDetail();
  }, [])

  useEffect(() => {
    getSolution();
  }, [user, language])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);



  return (
    <>
      {contextHolder}

      <div tabIndex={0} style={{ background: THEME.bg, display: "flex", flexDirection: "column" }}>

        <div
          style={{
            marginBottom: 56,
            height: "calc(100vh - 144px)",
            display: "flex",
            gap: 0,
          }}
        >
          <div
            style={{
              flex: "0 0 54%",
              borderRight: `1px solid ${THEME.bgCardBorder}`,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              height: "100%"
            }}

          >
            <MonacoEditorMock code={code} setCode={setCode} language={language} setLanguage={setLanguage} timer={timer} />
          </div>

          {/* RIGHT: Description panel */}
          <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
            {problem && <ProblemDescription problem={problem} activeTab={activeTab} setActiveTab={setActiveTab} submissionId={submissionId || ''} />}
          </div>
        </div>

        <Flex
          justify="flex-end"
          align="center"
          gap={10}
          style={{
            position: "fixed",
            bottom: 0, left: 0, right: 0,
            zIndex: 100,
            background: THEME.navBg,
            backdropFilter: "blur(14px)",
            borderTop: `1px solid ${THEME.bgCardBorder}`,
            height: 56,
            padding: "0 24px",
          }}
        >


          {/* Run */}
          <AppButton
            buttonVariant="outline"
            style={{
              color: THEME.textSecondary,
              fontSize: 13,
              height: 40,
              padding: "0 24px",
              letterSpacing: "0.5px",
            }}
          >
            RUN
          </AppButton>

          {/* Submit — reuse AppButton primary */}
          <AppButton
            buttonVariant="primary" style={{ height: 40, padding: "0 28px", fontSize: 13 }}
            onClick={() => submitCode()}
            iconPosition="end"
            icon={
              loading.show && loading.type == "SUBMISSION" && <Spin
                indicator={<LoadingOutlined style={{ color: COLORS.primary, fontSize: 24 }} spin />}
              />
            }

          >
            SUBMIT
          </AppButton>
        </Flex>
      </div>
    </>
  );
}


// ─── helper: parse "n=4nums=[2,7,11,15]target=9" → [{ key, value }] ──────────
const parseInput = (raw: string): { key: string; value: string }[] => {
  const regex = /([a-zA-Z_][a-zA-Z0-9_]*)=(\[.*?\]|".*?"|[^=]+?)(?=[a-zA-Z_][a-zA-Z0-9_]*=|$)/g;
  const result: { key: string; value: string }[] = [];
  let match;
  while ((match = regex.exec(raw)) !== null) {
    result.push({ key: match[1], value: match[2].trim() });
  }
  return result.length > 0 ? result : [{ key: "input", value: raw }];
};

// ─── reusable: ParamRow ───────────────────────────────────────────────────────
const ParamRow = ({ paramKey, value }: { paramKey: string; value: string }) => (
  <div style={{ marginBottom: 12 }}>
    {/* param name */}
    <Text
      style={{
        color: THEME.textSecondary,
        fontSize: 11,
        fontFamily: "'Fira Code', monospace",
        fontWeight: 600,
        letterSpacing: 0.5,
        display: "block",
        marginBottom: 6,
      }}
    >
      {paramKey} =
    </Text>

    {/* value box */}
    <div
      style={{
        background: "#0a1020",
        border: `1px solid ${THEME.bgCardBorder}`,
        borderRadius: 8,
        padding: "10px 14px",
        fontFamily: "'Fira Code', monospace",
        fontSize: 13,
        color: value.startsWith("[") ? THEME.accentGreen : THEME.accentBlue,
        lineHeight: 1.6,
        wordBreak: "break-all",
        transition: "border-color 0.2s",
        cursor: "text",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.borderColor = `${THEME.accent}88`)
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.borderColor = THEME.bgCardBorder)
      }
    >
      {value}
    </div>
  </div>
);

// ─── reusable: TestCasePanel ──────────────────────────────────────────────────
// Props:
//   label      — "Input" | "Output" | "Expected"
//   raw        — the raw concatenated string from the backend
//   accent     — optional override color for the label badge
const TestCasePanel = ({
  label,
  raw,
  accent,
}: {
  label: string;
  raw: string;
  accent?: string;
}) => {
  const params = parseInput(raw);
  const labelColor = accent ?? THEME.accent;

  return (
    <div
      style={{
        border: `1px solid ${THEME.bgCardBorder}`,
        borderRadius: 12,
        overflow: "hidden",
        background: "rgba(0,0,0,0.18)",
      }}
    >
      {/* panel header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "9px 14px",
          borderBottom: `1px solid ${THEME.bgCardBorder}`,
          background: "rgba(0,0,0,0.15)",
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: labelColor,
            flexShrink: 0,
          }}
        />
        <Text
          style={{
            color: labelColor,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 1.2,
            textTransform: "uppercase",
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          {label}
        </Text>
      </div>

      {/* param rows */}
      <div style={{ padding: "14px 14px 2px" }}>
        {params.map((p) => (
          <ParamRow key={p.key} paramKey={p.key} value={p.value} />
        ))}
      </div>
    </div>
  );
};