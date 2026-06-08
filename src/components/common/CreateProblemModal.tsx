import { useState, useRef, useEffect, useMemo } from "react";
import {
    Modal, Input, Select, Space, Typography, Row, Col, Tooltip,
    Flex,
} from "antd";
import {
    CloseOutlined, PlusOutlined, BoldOutlined, ItalicOutlined,
    CodeOutlined, PictureOutlined,
    FileAddOutlined,
    BlockOutlined,
} from "@ant-design/icons";
import { THEME } from "../../constants/theme";
import { ADMIN } from "../../pages/admin";
import { AppButton } from "./AppButton";
import { Difficulty, Problem } from "../../constants/problems";
import { ProblemCategory, ProblemCategoryLabel } from "../../enums/ProblemCategory";
import { Company, CompanyLabel } from "../../enums/Company";
import EditorJS, { OutputBlockData } from '@editorjs/editorjs';
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import ImageTool from "@editorjs/image";
import InlineCode from "@editorjs/inline-code";
import Quote from "@editorjs/quote";
import { ProgrammingLanguage, ProgrammingLanguageLabel } from "../../enums/ProgrammingLanguage";
import MonacoEditor, { loader } from '@monaco-editor/react';
import ProblemService from "../../services/ProblemService";





const { Text } = Typography;



interface CreateProblemFormData {
    title: string;
    difficulty: Difficulty;
    tags: ProblemCategory[];
    companies: Company[];
    description: any;   // EditorJS output data
    boilerplate: string;
    outputCode: string;
    boilerplateLang: string;
    outputLang: string;
}



// ─── REUSABLE: SectionLabel ───────────────────────────────────────────────────
const SectionLabel = ({ children }: { children: React.ReactNode }) => (
    <Text
        style={{
            color: THEME.textSecondary,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 1.5,
            textTransform: "uppercase",
            fontFamily: "'Space Grotesk', sans-serif",
            display: "block",
            marginBottom: 10,
        }}
    >
        {children}
    </Text>
);

// ─── REUSABLE: TagPill ────────────────────────────────────────────────────────
const TagPill = ({
    label, onRemove, color,
}: { label: string; onRemove?: () => void; color?: string }) => (
    <div
        style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: color ? `${color}18` : "rgba(108,99,255,0.12)",
            border: `1px solid ${color ? `${color}44` : "rgba(108,99,255,0.3)"}`,
            borderRadius: 7,
            padding: "3px 10px",
            cursor: "default",
        }}
    >
        <Text style={{ color: color ?? THEME.accent, fontSize: 13, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 500 }}>
            {label}
        </Text>
        {onRemove && (
            <CloseOutlined
                onClick={onRemove}
                style={{ color: color ?? THEME.accent, fontSize: 10, cursor: "pointer", opacity: 0.7 }}
            />
        )}
    </div>
);

const COMPANY_COLORS: Record<string, string> = {
    Google: "#4fa3ff",
    Amazon: "#00e5a0",
    Meta: "#6c63ff",
    Microsoft: "#ffa940",
    Apple: "#e8eaf6",
    Netflix: "#ff6b6b",
};

const CompanyPill = ({
    name, onRemove,
}: { name: string; onRemove?: () => void }) => {
    const color = COMPANY_COLORS[name] ?? THEME.textSecondary;
    return (
        <div
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${ADMIN.border}`,
                borderRadius: 20,
                padding: "6px 14px",
                cursor: "default",
            }}
        >
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, flexShrink: 0 }} />
            <Text style={{ color: THEME.textPrimary, fontSize: 14, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 500 }}>
                {name}
            </Text>
            {onRemove && (
                <CloseOutlined onClick={onRemove} style={{ color: THEME.textSecondary, fontSize: 10, cursor: "pointer" }} />
            )}
        </div>
    );
};

// ─── REUSABLE: EditorJsPlaceholder ───────────────────────────────────────────
// Drop-in container for EditorJS — attach your EditorJS instance to the ref.
// Props:
//   editorRef   — React ref forwarded to the div where EditorJS mounts
//   onModeChange— callback when Write/Preview tab changes




export const EditorJsContainer = ({ data, onChange }: { data: OutputBlockData[], onChange: (data: OutputBlockData[]) => void }) => {
    const editorRef = useRef<any>(null);



    const takeInlineAction = (action: "bold" | "italic" | "inline-code") => {
        const selection = window.getSelection();
        if (!selection?.rangeCount) return;

        const range = selection.getRangeAt(0);
        if (range.collapsed) return;

        const element = getElementByAction(action);

        try {
            range.surroundContents(element);
        } catch {
            const fragment = range.extractContents();
            element.appendChild(fragment);
            range.insertNode(element);
        }

        selection.removeAllRanges();
    };

    const getElementByAction = (action: "bold" | "italic" | "inline-code") => {
        switch (action) {
            case "bold":
                return document.createElement('b');
            case "italic":
                return document.createElement('i');
            case "inline-code":
                return document.createElement('code');
        }

    }



    useEffect(() => {
        if (editorRef.current) {
            return;
        }

        const blocks = data;


        editorRef.current = new EditorJS({
            holder: 'editorjs-container',

            placeholder: " Provide a detailed explanation of the problem, constraints, and examples...",
            tools: {
                header: {
                    class: Header as any,
                },

                paragraph: {
                    class: Paragraph as any,
                    inlineToolbar: false,
                },

                image: {
                    class: ImageTool,
                    config: {
                        uploader: {
                            async uploadByFile(file: any) {
                                return new Promise((resolve) => {
                                    const reader = new FileReader();

                                    reader.onload = () => {
                                        resolve({
                                            success: 1,
                                            file: {
                                                url: reader.result,
                                            },
                                        });
                                    };

                                    reader.readAsDataURL(file);
                                });
                            },
                        },
                    },
                },
                inlineCode: {
                    class: InlineCode as any,
                    shortcut: 'CMD+SHIFT+C',
                    inlineToolbar: false
                },

                quote: {
                    class: Quote as any,
                },
            },

            data: {
                blocks: blocks,
            },

            async onChange(api) {
                const savedData = await api.saver.save();
                onChange(savedData.blocks);
            },
        });

        return () => {
            if (editorRef.current?.destroy) {
                editorRef.current.destroy();
                editorRef.current = null;
            }
        };
    }, []);


    return <div>
        {/* Toolbar row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            {/* Format buttons */}
            <Space size={2} onMouseDown={(e) => e.preventDefault()}>
                {[
                    { icon: <BoldOutlined onClick={(e) => takeInlineAction("bold")} />, tip: "Bold" },
                    { icon: <ItalicOutlined onClick={(e) => takeInlineAction("italic")} />, tip: "Italic" },
                    { icon: <CodeOutlined onClick={(e) => takeInlineAction("inline-code")} />, tip: "Inline code" },
                    { icon: <BlockOutlined onClick={() => editorRef.current.blocks.insert('quote')} />, tip: "Quote" },
                    { icon: <PictureOutlined onClick={() => editorRef.current.blocks.insert('image')} />, tip: "Image" },
                ].map((btn, i) => (
                    <Tooltip key={i} title={btn.tip} placement="top">
                        <div
                            style={{
                                width: 32,
                                height: 32,
                                borderRadius: 7,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                color: THEME.textSecondary,
                                fontSize: 15,
                                fontWeight: 700,
                                transition: "background 0.2s, color 0.2s",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "rgba(108,99,255,0.12)";
                                e.currentTarget.style.color = THEME.textPrimary;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "transparent";
                                e.currentTarget.style.color = THEME.textSecondary;
                            }}
                        >
                            {btn.icon}
                        </div>
                    </Tooltip>
                ))}
            </Space>


        </div>

        {/* Editor mount area */}
        <div
            style={{
                border: `1px solid ${ADMIN.border}`,
                borderRadius: 10,
                minHeight: 160,
                background: "#0a1020",
                position: "relative",
                overflow: "auto",
            }}
        >
            {/* EditorJS mounts here */}
            <div style={{ minHeight: 160, padding: "12px 8px" }}
                id="editorjs-container"
            />

        </div>
    </div>
};

// ─── REUSABLE: MonacoBlock ────────────────────────────────────────────────────
// Shell that wraps a Monaco editor with the mac-style title bar.
// Props:
//   filename   — shown top right (e.g. "solution.py")
//   language   — current language value
//   onLangChange
//   children   — the actual <MonacoEditor /> goes here
export const MonacoBlock = ({
    filename,
    children,
    minHeight = 180,
}: {
    filename: string;
    children: React.ReactNode;
    minHeight?: number;
}) => {

    return (
        <div
            style={{
                border: `1px solid ${ADMIN.border}`,
                borderRadius: 10,
                overflow: "hidden",
                background: "#0d1117",
            }}
        >
            {/* Mac-style title bar */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 14px",
                    background: "#0a0e1a",
                    borderBottom: `1px solid ${ADMIN.border}`,
                }}
            >
                {/* Traffic lights */}
                <Space size={6} align="center">
                    {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                        <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
                    ))}
                </Space>

                {/* Filename */}
                <Text style={{ color: THEME.textSecondary, fontSize: 11, fontFamily: "'Fira Code',monospace" }}>
                    {filename}
                </Text>
            </div>

            {/* Monaco mount area */}
            <div style={{ minHeight }}>
                {children}
            </div>
        </div>
    );
};

const CodeSectionHeader = ({
    label, language, onLangChange,
}: { label: string; language: ProgrammingLanguage; onLangChange: (v: ProgrammingLanguage) => void }) => {

    const languageOptions = [...Object.keys(ProgrammingLanguageLabel) as ProgrammingLanguage[]].map((key: ProgrammingLanguage) => ({ value: key, label: ProgrammingLanguageLabel[key] }))
    return (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <SectionLabel>{label}</SectionLabel>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    cursor: "pointer",
                    padding: "4px 10px",
                    borderRadius: 7,
                    border: `1px solid ${ADMIN.border}`,
                    background: "rgba(255,255,255,0.03)",
                }}
            >
                <Select
                    value={language}
                    style={{ width: "150px" }}
                    options={languageOptions}
                    onChange={onLangChange}
                />
            </div>
        </div>
    );
};

const MockMonaco = ({ line, onChange }: { line: string, onChange: (value: string) => void }) => {

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
            padding: { top: 24, bottom: 80 },
            cursorBlinking: 'smooth',
            smoothScrolling: true,
            contextmenu: true,
            suggest: { showKeywords: true },
        }),
        [],
    );

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
        <div style={{ padding: "12px 0", background: "#0d1117" }}>
            <MonacoEditor
                height={500}
                width={"100%"}
                value={line}
                theme='code-platform-theme'
                className="monaco-editor"
                onChange={(solution: string = '') => onChange(solution)}
                options={editorOption as any}
            />
        </div>
    );
};



export const CreateProblemModal = ({
    onClose,
    data
}: {
    onClose: () => void;
    data: any
}) => {
    debugger;


    const [title, setTitle] = useState(data?.title || '');
    const [difficulty, setDifficulty] = useState<Difficulty>(data?.difficulty || Difficulty.MEDIUM);
    const [tags, setTags] = useState<ProblemCategory[]>(data?.categories || [ProblemCategory.ARRAY, ProblemCategory.HASH_MAP]);
    const [companies, setCompanies] = useState<Company[]>(data?.companies || [Company.GOOGLE, Company.AMAZON]);
    const [boilerplateLang, setBoilerplateLang] = useState<ProgrammingLanguage>(ProgrammingLanguage.PYTHON);
    const [outputLang, setOutputLang] = useState<ProgrammingLanguage>(ProgrammingLanguage.PYTHON);
    const [boilerCodeByLang, setBoilerCodeByLang] = useState<Record<ProgrammingLanguage, string>>(data?.solutionByLanguage || {});
    const [outputCodeByLang, setOutputCodeByLang] = useState<Record<ProgrammingLanguage, string>>(data?.ioByLanguage || {});
    const [description, setDescription] = useState<OutputBlockData[]>(data?.blocks || []);



    const handleSave = async () => {
        const problem: any = {
            id: data?.id || '',
            title,
            categories: tags,
            difficulty,
            companies,
            solutionByLanguage: boilerCodeByLang,
            ioByLanguage: outputCodeByLang,
            blocks: description as any,

        }

        try {
            const res = await ProblemService.createOrEditProblem(problem);
            if (res.data) {
            }
        } catch (error) {
            console.error(error);
        } finally {
            onClose();
        }
    };

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Fira+Code:wght@400;500&display=swap');

        .cp-input input,
        .cp-input textarea {
          background:   #0a1020 !important;
          color:        ${THEME.textPrimary} !important;
          font-family:  'Space Grotesk', sans-serif !important;
          font-size:    14px !important;
        }
        .cp-input input::placeholder,
        .cp-input textarea::placeholder { color: ${THEME.textSecondary} !important; }
        .cp-input .ant-input-affix-wrapper {
          background:   #0a1020 !important;
          border:       1px solid ${ADMIN.border} !important;
          border-radius:9px !important;
        }
        .cp-input .ant-input-affix-wrapper:focus-within {
          border-color:  ${THEME.accent} !important;
          box-shadow:    0 0 0 2px rgba(108,99,255,0.15) !important;
        }
        .cp-input .ant-input {
          background:   transparent !important;
          border:       1px solid ${ADMIN.border} !important;
          border-radius:9px !important;
          padding:      0 14px !important;
        }
        .cp-input .ant-input:focus {
          border-color:  ${THEME.accent} !important;
          box-shadow:    0 0 0 2px rgba(108,99,255,0.15) !important;
          outline:       none !important;
        }

        /* difficulty select */
        .cp-diff .ant-select-selector {
          background:   #0a1020 !important;
          border:       1px solid ${ADMIN.border} !important;
          border-radius:9px !important;
        }
        .cp-diff .ant-select-selection-item {
          color:        ${THEME.textPrimary} !important;
          font-family:  'Space Grotesk',sans-serif !important;
          font-size:    14px !important;
          line-height:  44px !important;
        }

        /* modal scroll */
        .create-problem-body { overflow-y: auto; max-height: calc(90vh - 130px); padding-right: 4px; }
        .create-problem-body::-webkit-scrollbar { width: 4px; }
        .create-problem-body::-webkit-scrollbar-thumb { background: ${ADMIN.border}; border-radius: 2px; }

        .ant-modal-content { padding: 0 !important; }
      `}</style>

            <Modal
                open={true}
                onCancel={onClose}
                footer={null}
                closeIcon={null}
                width={860}
                centered
                styles={{
                    content: {
                        background: "#0d1530",
                        border: `1px solid ${ADMIN.border}`,
                        borderRadius: 16,
                        padding: 0,
                        overflow: "hidden",
                    },
                    mask: { backdropFilter: "blur(8px)", background: "rgba(0,0,0,0.7)" },
                }}
            >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px", borderBottom: `1px solid ${ADMIN.border}` }}>
                    <Space size={10} align="center">
                        <div style={{ width: 28, height: 28, borderRadius: 7, background: "rgba(108,99,255,0.15)", border: `1px solid rgba(108,99,255,0.3)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <FileAddOutlined style={{ color: THEME.accent, fontSize: 14 }} />
                        </div>
                        <Text style={{ color: THEME.textPrimary, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 20 }}>
                            Add New Problem
                        </Text>
                    </Space>
                    <div
                        onClick={onClose}
                        style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: `1px solid ${ADMIN.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                    >
                        <CloseOutlined style={{ color: THEME.textSecondary, fontSize: 13 }} />
                    </div>
                </div>

                <div className="create-problem-body" style={{ padding: "22px 24px" }}>

                    <Row gutter={16} style={{ marginBottom: 22 }}>

                        <Col flex="auto">
                            <SectionLabel>Problem Title</SectionLabel>
                            <div className="cp-input">
                                <Input
                                    placeholder="e.g., Median of Two Sorted Arrays"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    style={{ height: 35, background: "#0a1020", border: `1px solid ${ADMIN.border}`, borderRadius: 9, color: THEME.textPrimary, fontFamily: "'Space Grotesk',sans-serif", fontSize: 14 }}
                                />
                            </div>
                        </Col>

                        <Col flex="160px">
                            <SectionLabel>Difficulty</SectionLabel>
                            <Select
                                className="cp-diff"
                                value={difficulty}
                                onChange={(v) => setDifficulty(v as Difficulty)}
                                style={{ width: "100%", height: 35 }}
                                options={[
                                    {
                                        value: Difficulty.EASY,
                                        label: 'Easy',
                                    },
                                    {
                                        value: Difficulty.MEDIUM,
                                        label: 'Medium',
                                    },
                                    {
                                        value: Difficulty.HARD,
                                        label: 'Hard',
                                    },
                                ]}
                                popupClassName="admin-modal-select-dropdown"
                            />
                        </Col>

                    </Row>
                    <Row style={{ marginBottom: 22 }}>
                        <Flex vertical >
                            <SectionLabel>Tags</SectionLabel>
                            <Select
                                mode="multiple"
                                labelInValue
                                showSearch
                                maxTagCount={5}

                                size={'middle'}
                                defaultValue={tags || []}
                                styles={{ root: { border: '1px solid white', borderRadius: 5, width: 800 } }}
                                onChange={(values: any) => {
                                    const valueSet = values.map((v: any) => v.value);
                                    setTags(valueSet);
                                }}
                                options={[...Object.keys(ProblemCategoryLabel) as ProblemCategory[]].map((category) => ({
                                    value: category,
                                    label: ProblemCategoryLabel[category as ProblemCategory],
                                }))}
                            />
                        </Flex>
                    </Row>

                    <Row style={{ marginBottom: 22 }}>
                        <Flex vertical >
                            <SectionLabel>Target companies</SectionLabel>
                            <Select
                                mode="multiple"
                                labelInValue
                                showSearch
                                maxTagCount={5}

                                size={'middle'}
                                defaultValue={companies || []}
                                styles={{ root: { border: '1px solid white', borderRadius: 5, width: 800 } }}
                                onChange={(values: any) => {
                                    const valueSet = values.map((v: any) => v.value);
                                    setCompanies(valueSet);
                                }}
                                options={[...Object.keys(CompanyLabel) as Company[]].map((company) => ({
                                    value: company,
                                    label: CompanyLabel[company as Company],
                                }))}
                            />
                        </Flex>
                    </Row>

                    <div style={{ marginBottom: 22 }}>
                        <SectionLabel>Problem Description</SectionLabel>

                        <EditorJsContainer
                            data={description}
                            onChange={(value) => {
                                setDescription(value)
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: 22 }}>
                        <CodeSectionHeader
                            label="Boilerplate Code"
                            language={boilerplateLang}
                            onLangChange={setBoilerplateLang}
                        />

                        <MonacoBlock filename="solution.py">
                            <MockMonaco key={boilerplateLang} line={boilerCodeByLang && boilerCodeByLang[boilerplateLang] || ''} onChange={(value) => {
                                //@ts-ignore
                                setBoilerCodeByLang((prev) => ({ ...prev, [boilerplateLang]: value }))
                            }} />
                        </MonacoBlock>
                    </div>

                    <div style={{ marginBottom: 8 }}>
                        <CodeSectionHeader
                            label="Output Code"
                            language={outputLang}
                            onLangChange={setOutputLang}
                        />
                        <MonacoBlock filename="output.py">
                            <MockMonaco key={outputLang} line={outputCodeByLang && outputCodeByLang[outputLang] || ''} onChange={(value) => {
                                //@ts-ignore
                                setOutputCodeByLang((prev) => ({ ...prev, [outputLang]: value }));
                            }} />
                        </MonacoBlock>
                    </div>
                </div>

                <div style={{ borderTop: `1px solid ${ADMIN.border}`, padding: "14px 24px", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 12 }}>
                    <AppButton
                        variant="text"
                        onClick={onClose}
                        style={{ color: THEME.textPrimary, fontWeight: 600, fontSize: 14, height: 44, padding: "0 20px" }}
                    >
                        Cancel
                    </AppButton>
                    <AppButton
                        buttonVariant="primary"
                        onClick={handleSave}
                        style={{
                            height: 44, padding: "0 32px", fontSize: 15, fontWeight: 700,
                            borderRadius: 12, border: "none", minWidth: 150,
                            background: `linear-gradient(90deg, #4158d0 0%, ${THEME.accent} 60%, #a084ee 100%)`,
                        }}
                    >
                        Create Problem
                    </AppButton>
                </div>
            </Modal>
        </>
    );
};


