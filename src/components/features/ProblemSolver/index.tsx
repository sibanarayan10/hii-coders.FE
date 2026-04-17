import { useState } from 'react';
import { Flex, Layout, Spin, Splitter } from 'antd';
import ProblemDescription from './ProblemDescription';
import EditorHeader from './EditorHeader';
import CodeEditor from './CodeEditor';
import ConsolePanel from './ConsolePanel';
import { COLORS } from '../../../constants/theme';

const { Content } = Layout;

const MONACO_LANGUAGE_MAP: Record<string, string> = {
  python3: 'python',
  javascript: 'javascript',
  typescript: 'typescript',
  java: 'java',
  cpp: 'cpp',
  go: 'go',
  rust: 'rust',
};

const PROBLEM_ID = 'two-sum';

const ProblemSolver = () => {
  debugger;

  const [language, setLanguage] = useState<string>('python3');
  const [sizes, setSizes] = useState<(number | string)[]>(['30%', '80%']);
  const [editorSize, setEditorSize] = useState<(number | string)[]>(['60%', '40%']);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const handleRun = (): void => {
    console.log('Run triggered');
  };

  const handleSubmit = (): void => {
    console.log('Submit triggered');
  };

  return (
    <Content style={{ display: 'flex', overflow: 'hidden', flex: 1 }}>
      <Splitter
        onResize={(size: number[]) => {
          if (Math.min(size[0], size[1]) <= 350) {
            return;
          }
          setSizes(size);
        }}
      >
        <Splitter.Panel size={sizes[0]} resizable={true}>
          <ProblemDescription />
        </Splitter.Panel>
        <Splitter.Panel size={sizes[1]}>
          <Flex
            flex={1}
            vertical={true}
            style={{
              overflow: 'hidden',
              background: COLORS.surface,
              height: '100%',
            }}
          >
            <EditorHeader
              problemId={PROBLEM_ID}
              language={language}
              isFullscreen={isFullscreen}
              onLanguageChange={setLanguage}
              onToggleFullscreen={() => setIsFullscreen((prev) => !prev)}
            />
            <Splitter layout="vertical" style={{ height: '100%' }} onResize={setEditorSize}>
              <Splitter.Panel size={editorSize[0]} resizable>
                <CodeEditor
                  language={language}
                  onRun={handleRun}
                  onSubmit={handleSubmit}
                  problemId="1"
                />
              </Splitter.Panel>
              <Splitter.Panel size={editorSize[1]}>
                <ConsolePanel />
              </Splitter.Panel>
            </Splitter>
          </Flex>
        </Splitter.Panel>
      </Splitter>
    </Content>
  );
};

export default ProblemSolver;
