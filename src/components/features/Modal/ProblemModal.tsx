import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Button, Flex, Input, Modal, Space, Typography, Divider, Select } from 'antd';

import { SaveOutlined } from '@ant-design/icons';

import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Paragraph from '@editorjs/paragraph';
import ImageTool from '@editorjs/image';
import Quote from '@editorjs/quote';
import ProblemService from '../../../services/ProblemService';
import { Difficulty, Problem } from '../../../constants/problems';
import { ProblemCategoryLabel } from '../../../enums/ProblemCategory';
import { ModalType } from '../../../pages/AdminDashboardPage';

const { Title, Text } = Typography;

const initialData: Problem = {
  title: '',
  blocks: [],
  categories: [],
  difficulty: Difficulty.EASY,
  id: '',
  acceptance: 0,
};
export const ProblemEditorModal = (props: {
  onClose: () => void;
  data: Problem;
  setUpdate: Dispatch<SetStateAction<ModalType>>;
}) => {
  const [problem, setProblem] = useState<Problem>(props?.data || initialData);

  const editorRef = useRef<any>(null);

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

  useEffect(() => {
    if (editorRef.current) {
      return;
    }

    const { blocks = [] } = problem;

    editorRef.current = new EditorJS({
      holder: 'editorjs-container',

      placeholder: 'Write your coding problem here...',

      tools: {
        header: {
          class: Header as any,
          inlineToolbar: true,
        },

        paragraph: {
          class: Paragraph as any,
          inlineToolbar: true,
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
        quote: {
          class: Quote as any,
          inlineToolbar: true,
        },
      },

      data: {
        blocks: blocks,
      },

      async onChange(api, event) {
        const savedData = await api.saver.save();
        setProblem((prev) => ({ ...prev, blocks: savedData.blocks }));
        console.log(savedData);
      },
    });

    return () => {
      if (editorRef.current?.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

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
                  onChange={(val) => setProblem({ ...problem, difficulty: val.value })}
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
                onChange={(values) => {
                  const valueSet = values.map((v) => v.value);
                  setProblem({ ...problem, categories: valueSet });
                }}
                options={Object.keys(ProblemCategoryLabel).map((category) => ({
                  value: category,
                  label: ProblemCategoryLabel[category],
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
                <div
                  id="editorjs-container"
                  style={{
                    minHeight: '500px',
                    padding: '24px',
                  }}
                />
              </div>
            </div>
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
