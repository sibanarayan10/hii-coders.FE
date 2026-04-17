import { Button, Space, Tooltip, Spin, Flex } from 'antd';
import { CaretRightOutlined, SendOutlined, UndoOutlined, LoadingOutlined } from '@ant-design/icons';
import MonacoEditor from '@monaco-editor/react';
import { usePersistedCode } from '../../../hooks/usePersistedCode';
import { COLORS } from '../../../constants/theme';
import { useState } from 'react';

const MONACO_LANGUAGE_MAP: Record<string, string> = {
  python3:    'python',
  javascript: 'javascript',
  typescript: 'typescript',
  java:       'java',
  cpp:        'cpp',
  go:         'go',
  rust:       'rust',
};

interface CodeEditorProps {
  problemId: string;
  language: string;
  onRun: () => void;
  onSubmit: () => void;
}

const CodeEditor = ({ language, onRun, onSubmit }: CodeEditorProps) => {
  const[code,setCode]=useState();
  const onChange=(val:string)=>{

  }

  return (
    <Flex
    flex={1}
    vertical
      style={{
        position: 'relative',
        overflow: 'hidden',
        height:"100%",
        minHeight:300
      }}
    >
      <MonacoEditor
        height="100%"
        language={MONACO_LANGUAGE_MAP[language] ?? 'python'}
        value={code}
        theme="vs-dark"
        loading={
          <Flex
          align="center"
          justify="center"
          flex={1}
            style={{
              background: COLORS.surfaceContainerLowest,
              height: '100%',
            }}
          >
            <Spin indicator={<LoadingOutlined style={{ color: COLORS.primary, fontSize: 24 }} spin />} />
          </Flex>
        }
        onChange={(val) => onChange(val ?? '')}
        options={{
          fontSize: 13,
          fontFamily: "'Fira Code', 'Fira Mono', monospace",
          fontLigatures: true,
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
          cursorSmoothCaretAnimation: 'on',
          smoothScrolling: true,
          contextmenu: true,
          suggest: { showKeywords: true },
        }}
        
      />

      {/* Floating action buttons */}
      <div style={{ position: 'absolute', bottom: 24, right: 24, zIndex: 10 }}>
        <Space size={12}>
          <Tooltip title="Run against test cases">
            <Button
              icon={<CaretRightOutlined />}
              onClick={onRun}
              style={{
                background: COLORS.surfaceContainerHigh,
                border: `1px solid ${COLORS.outlineVariant}33`,
                color: COLORS.onSurface,
                fontWeight: 700,
                borderRadius: 8,
              }}
            >
              Run
            </Button>
          </Tooltip>

          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={onSubmit}
            style={{
              background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryContainer})`,
              border: 'none',
              color: COLORS.onPrimaryFixed,
              fontWeight: 700,
              borderRadius: 8,
              paddingInline: 24,
            }}
          >
            Submit
          </Button>
        </Space>
      </div>
    </Flex>
  );
};

export default CodeEditor;
