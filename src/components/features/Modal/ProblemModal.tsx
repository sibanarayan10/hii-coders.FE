import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { Button, Flex, Input, Modal, Space, Typography, Divider, Select } from 'antd';

import { SaveOutlined } from '@ant-design/icons';
import ProblemService from '../../../services/ProblemService';
import { Difficulty, Problem } from '../../../constants/problems';
import { ProblemCategory, ProblemCategoryLabel } from '../../../enums/ProblemCategory';
import { ModalType } from '../../../pages/AdminDashboardPage';
import { Editor } from '../../common/Editor';
import MonacoEditor from '@monaco-editor/react';
import { ProgrammingLanguage, ProgrammingLanguageLabel } from '../../../enums/ProgrammingLanguage';

const { Title, Text } = Typography;

const initialData: Problem = {
  title: '',
  blocks: [],
  categories: [],
  difficulty: Difficulty.EASY,
  id: '',
  acceptance: 0,
  solutionByLanguage: {} as any
};
export const ProblemEditorModal = (props: {
  onClose: () => void;
  data: Problem;
  setUpdate: Dispatch<SetStateAction<ModalType>>;
}) => {
  const [problem, setProblem] = useState<Problem>(props?.data || initialData);
  const [language, setLanguage] = useState<ProgrammingLanguage>(ProgrammingLanguage.PYTHON);


  const newProblem = !props?.data?.id;

  const header = !newProblem ? 'Edit problem' : 'Create new problem';

  const handleSave = async () => {
    try {
      const res = await ProblemService.createOrEditProblem(problem);
      if (res.data) {
        props.setUpdate('Problem');
      }
    } catch (error) {
      console.error(error);
    } finally {
      props.onClose();
    }
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
      padding: { top: 24, bottom: 80 },
      cursorBlinking: 'smooth',
      smoothScrolling: true,
      contextmenu: true,
      suggest: { showKeywords: true },
    }),
    [],
  );

  return (
    <Modal
      open={true}
      onCancel={props.onClose}
      width={1200}
      footer={null}
      centered
      styles={{
        body: {
          padding: 0,
          overflow: 'hidden',
          borderRadius: 12,
        },
      }}
    >
      <Flex
        vertical
        style={{
          height: '85vh',
        }}
      >
        <Flex
          justify="space-between"
          align="center"
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #f0f0f0',
          }}
        >
          <div>
            <Title level={3} style={{ margin: 0 }}>
              {header}
            </Title>
          </div>
        </Flex>

        {/* FORM SECTION */}
        <div
          style={{
            padding: 24,
            overflowY: 'auto',
            flex: 1,
          }}
        >
          <Space direction="vertical" size={20} style={{ width: '100%' }}>
            <Flex align="center" style={{ height: 100 }} gap={20}>
              <Flex vertical style={{ width: 400 }}>
                <Text strong>Problem Title</Text>

                <Input
                  placeholder="Enter problem title"
                  size="large"
                  styles={{ input: { width: 400 } }}
                  value={problem.title}
                  onChange={(e) =>
                    setProblem((prev) => ({ ...prev, title: e.currentTarget.value }))
                  }
                  style={{ marginTop: 8 }}
                />
              </Flex>
              <Flex vertical gap={10}>
                <Text strong>Difficulty</Text>

                <Select
                  labelInValue
                  defaultValue={problem.difficulty}
                  styles={{ root: { border: '1px solid white', borderRadius: 5 } }}
                  onChange={(val: any) => setProblem({ ...problem, difficulty: val.value })}
                  options={[
                    {
                      value: Difficulty.EASY,
                      label: 'EASY',
                    },
                    {
                      value: Difficulty.MEDIUM,
                      label: 'MEDIUM',
                    },
                    {
                      value: Difficulty.HARD,
                      label: 'HARD',
                    },
                  ]}
                />
              </Flex>
            </Flex>
            <Flex vertical gap={10}>
              <Text strong>Categories</Text>

              <Select
                mode="multiple"
                labelInValue
                showSearch
                maxTagCount={5}
                size={'middle'}
                defaultValue={problem.categories || []}
                styles={{ root: { border: '1px solid white', borderRadius: 5 } }}
                onChange={(values: any) => {
                  const valueSet = values.map((v: any) => v.value);
                  setProblem({ ...problem, categories: valueSet });
                }}
                options={[...Object.keys(ProblemCategoryLabel) as ProblemCategory[]].map((category) => ({
                  value: category,
                  label: ProblemCategoryLabel[category as ProblemCategory],
                }))}
              />
            </Flex>

            <Divider style={{ margin: 0 }} />

            <div>
              <Text strong>Problem Description</Text>

              <div
                style={{
                  marginTop: 12,
                  borderRadius: 10,
                  border: '1px solid #d9d9d9',
                  overflow: 'hidden',
                }}
              >
                <Editor style={{ minHeight: '500px', padding: '24px' }} onChange={(blocks: any) => setProblem((prev) => ({ ...prev, blocks }))} data={problem.blocks} />

              </div>
            </div>

            <Flex vertical gap={10}>
              <Text strong>Default solution format</Text>

              <Select
                labelInValue
                defaultValue={language}
                styles={{ root: { border: '1px solid white', borderRadius: 5 } }}
                onChange={(val: any) => setLanguage(val.value)}
                options={[...Object.keys(ProgrammingLanguageLabel) as ProgrammingLanguage[]].map((language, _) => ({ value: language, label: ProgrammingLanguageLabel[language] }))}
              />
              <div
                style={{
                  marginTop: 12,
                  borderRadius: 10,
                  border: '1px solid #d9d9d9',
                  overflow: 'hidden',
                  height: 400
                }}
              >


                <MonacoEditor
                  height="100%"
                  value={problem.solutionByLanguage && problem.solutionByLanguage[language] || ''}
                  theme="vs-dark"
                  className="monaco-editor"
                  onChange={(solution: string = '') => {
                    if (language) {
                      //@ts-ignore
                      setProblem((prev) => ({ ...prev, solutionByLanguage: { ...prev?.solutionByLanguage, [language]: solution } }))
                    }
                  }}
                  options={editorOption as any}
                />

              </div>
            </Flex>
            <Flex vertical gap={10} >
              <Text strong>Input output</Text>
              <MonacoEditor
                height={300}
                value={problem.ioByLanguage && problem.ioByLanguage[language] || ''}
                theme="vs-dark"
                className="monaco-editor"
                onChange={(solution: string = '') => {
                  //@ts-ignore
                  setProblem((prev) => ({ ...prev, ioByLanguage: { ...(prev?.ioByLanguage || {}), [language]: solution } }))
                }}
                options={editorOption as any}
              />
            </Flex>
          </Space>
        </div>

        {/* FOOTER */}
        <Flex
          justify="end"
          gap={12}
          style={{
            padding: 20,
            borderTop: '1px solid #f0f0f0',
          }}
        >
          <Button size="large" onClick={props.onClose}>
            Cancel
          </Button>

          <Button type="primary" size="large" icon={<SaveOutlined />} onClick={handleSave}>
            {newProblem ? 'Save problem' : 'Edit problem'}
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};
