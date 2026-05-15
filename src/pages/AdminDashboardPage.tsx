import { useEffect, useState } from 'react';
import {
  Layout,
  Typography,
  Button,
  Table,
  Avatar,
  Tag,
  Row,
  Col,
  Card,
  Space,
  Flex,
  Popconfirm,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  UserAddOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import UserService from '../services/UserService';
import { User } from '../contexts/AuthContext';
import ProblemService from '../services/ProblemService';
import { Problem } from '../constants/problems';
import { ProblemCategoryLabel } from '../enums/ProblemCategory';
import { ProblemEditorModal } from '../components/features/Modal/ProblemModal';
import { UserFormModal } from '../components/features/Modal/UserFormModal';

const { Content } = Layout;
const { Title, Text } = Typography;

export type ModalType = 'Problem' | 'User' | null;

export default function AdminDashboard(): JSX.Element {
  const [users, setUsers] = useState<User[]>();
  const [problems, setProblems] = useState<Problem[]>();
  const [modal, setModal] = useState<{ show: boolean; type: ModalType; params?: any } | null>();
  const [update, setUpdate] = useState<ModalType>(null);

  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty) {
      case 'EASY':
        return '#10b981';
      case 'MEDIUM':
        return '#f59e0b';
      case 'HARD':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const userColumns: ColumnsType<User> = [
    {
      title: 'USERNAME',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <Space>
          <Avatar style={{ backgroundColor: 'white' }} size={40}>
            {'U'}
          </Avatar>
          <Text className="username-text">{text}</Text>
        </Space>
      ),
    },
    {
      title: 'EMAIL',
      dataIndex: 'email',
      key: 'email',
      render: (text: string) => <Text className="email-text">{text}</Text>,
    },
    {
      title: 'ROLE',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => (
        <Tag className={`role-tag ${role === 'ADMIN' ? 'role-admin' : 'role-user'}`}>{role}</Tag>
      ),
    },
    {
      title: 'STATUS',
      dataIndex: 'recordStatus',
      key: 'recordStatus',
      render: (status: string) => (
        <Space className="status-container">
          <div
            className={`status-dot ${status === 'ACTIVE' ? 'status-active' : 'status-inactive'}`}
          />
          <Text className={`status-text ${status === 'ACTIVE' ? 'text-active' : 'text-inactive'}`}>
            {status}
          </Text>
        </Space>
      ),
    },
    {
      title: 'ACTIONS',
      key: 'actions',
      align: 'right',
      render: (text, record) => (
        <Space size="middle" className="action-icons">
          <EditOutlined className="action-icon edit-icon" />
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this record?"
            onConfirm={() => deleteRecord(record.id, 'User')}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined className="action-icon delete-icon" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const problemColumns: ColumnsType<Problem> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text: string) => <Text className="problem-id">{text.split('-')[4]}</Text>,
    },
    {
      title: 'TITLE',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <Text className="problem-title">{text}</Text>,
    },
    {
      title: 'DIFFICULTY',
      dataIndex: 'difficulty',
      key: 'difficulty',
      render: (difficulty: string) => (
        <Tag className="difficulty-tag" style={{ backgroundColor: getDifficultyColor(difficulty) }}>
          {difficulty}
        </Tag>
      ),
    },
    {
      title: 'CATEGORY',
      dataIndex: 'categories',
      key: 'categories',
      render: (text: string[]) => {
        return text.map((txt, idx) => (
          <Flex align="start">
            <Text className="category-text">{ProblemCategoryLabel[txt]}</Text>
            {idx != text.length - 1 && ','}
          </Flex>
        ));
      },
    },
    {
      title: 'ACTIONS',
      key: 'actions',
      align: 'end',
      render: (record: Problem) => (
        <Space size="middle" className="action-icons" direction="horizontal" align="end">
          <EditOutlined
            className="action-icon edit-icon"
            onClick={() => setModal({ show: true, type: 'Problem', params: record })}
          />
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this record?"
            onConfirm={() => deleteRecord(record.id, 'Problem')}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined className="action-icon delete-icon" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const getUsers = async () => {
    try {
      const res = await UserService.getUsers();
      if (res.data) {
        setUsers(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getProblems = async () => {
    try {
      const res = await ProblemService.getProblems();
      if (res.data) {
        setProblems(res.data.content);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteRecord = async (id: string, type: ModalType) => {
    try {
      const isProblem = type === 'Problem';
      const res = isProblem
        ? await ProblemService.deleteProblem(id)
        : await UserService.deleteUser(id);
      if (res.data) {
        setUpdate(isProblem ? 'Problem' : 'User');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (update) {
      if (update === 'User') getUsers();
      if (update === 'Problem') getProblems();
      setUpdate(null);
    }
  }, [update]);

  useEffect(() => {
    getUsers();
    getProblems();
  }, []);

  return (
    <Layout className="admin-layout">
      <Content className="admin-content">
        <Flex justify="space-between" align="center" gap={10}>
          <div className="page-header">
            <Title level={1} className="page-title">
              Admin Dashboard
            </Title>
            <Text className="page-subtitle">System configuration and resource orchestration.</Text>
          </div>

          <Row gutter={[24, 24]} className="stats-section" style={{ marginBottom: 10 }}>
            <Col>
              <Card className="stat-card">
                <div className="stat-label">ACTIVE USERS</div>
                <div className="stat-value-container">
                  <div className="stat-value">12.4k</div>
                  <div className="stat-change positive">+12%</div>
                </div>
              </Card>
            </Col>

            <Col>
              <Card className="stat-card">
                <div className="stat-label">PROBLEMS PUBLISHED</div>
                <div className="stat-value-container">
                  <div className="stat-value">3,248</div>
                  <div className="stat-badge live">Live</div>
                </div>
              </Card>
            </Col>
          </Row>
        </Flex>

        {/* User Management Section */}
        <div className="section-container">
          <div className="section-header">
            <div>
              <Title level={4} className="section-title">
                USER MANAGEMENT
              </Title>
              <Text className="section-subtitle">Control access and user privileges</Text>
            </div>
            <Button
              type="primary"
              icon={<UserAddOutlined />}
              className="add-button"
              onClick={() => setModal({ show: true, type: 'User' })}
            >
              Add New User
            </Button>
          </div>

          <Table
            columns={userColumns}
            dataSource={users}
            pagination={{
              position: ['bottomRight'],
            }}
            className="custom-table"
          />
        </div>

        {/* Problem Management Section */}
        <div className="section-container">
          <div className="section-header">
            <div>
              <Title level={4} className="section-title">
                PROBLEM MANAGEMENT
              </Title>
              <Text className="section-subtitle">Curate algorithmic challenges</Text>
            </div>
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              className="add-button"
              onClick={() => setModal({ show: true, type: 'Problem' })}
            >
              Add New Problem
            </Button>
          </div>

          <Table<Problem>
            columns={problemColumns}
            dataSource={problems}
            pagination={{
              position: ['bottomRight'],
            }}
            className="custom-table-problem"
          />
        </div>
      </Content>

      {modal?.show && modal.type == 'Problem' && (
        <ProblemEditorModal
          onClose={() => setModal(null)}
          data={modal.params}
          setUpdate={setUpdate}
        />
      )}
      {modal?.show && modal.type == 'User' && <UserFormModal onClose={() => setModal(null)} />}
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .admin-layout {
          min-height: 100vh;
          background-color: #0a0a0a;
        }

        .admin-content {
          padding: 40px;
          background-color: #0a0a0a;
        }

        .page-header {
          margin-bottom: 40px;
        }

        .page-title {
          color: #ffffff !important;
          font-size: 36px !important;
          font-weight: 700 !important;
          margin-bottom: 8px !important;
        }

        .page-subtitle {
          color: #9ca3af;
          font-size: 16px;
        }

        .section-container {
          background-color: #1a1a1a;
          border-radius: 8px;
          padding: 32px;
          margin-bottom: 32px;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 24px;
        }

        .section-title {
          color: #ffffff !important;
          font-size: 14px !important;
          font-weight: 700 !important;
          letter-spacing: 1.5px;
          margin-bottom: 4px !important;
        }

        .section-subtitle {
          color: #6b7280;
          font-size: 14px;
        }

        .add-button {
          background-color: #6b93ff !important;
          border: none !important;
          height: 40px;
          padding: 0 20px;
          font-weight: 500;
          border-radius: 6px;
        }

        .add-button:hover {
          background-color: #5681ee !important;
        }

        /* Table Styles */
        .custom-table {
          background-color: transparent !important;
        }

        .custom-table .ant-table {
          background-color: transparent !important;
        }

        .custom-table .ant-table-thead > tr > th {
          background-color: #0f0f0f !important;
          color: #9ca3af !important;
          border-bottom: 1px solid #2a2a2a !important;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1px;
          padding: 16px;
        }

        .custom-table .ant-table-tbody > tr > td {
          background-color: #1a1a1a !important;
          border-bottom: 1px solid #2a2a2a !important;
          color: #ffffff;
          padding: 20px 16px;
        }

        .custom-table .ant-table-tbody > tr:hover > td {
          background-color: #222222 !important;
        }

        .username-text {
          color: #ffffff;
          font-weight: 500;
          font-size: 14px;
        }

        .email-text {
          color: #9ca3af;
          font-size: 14px;
        }

        .role-tag {
          border: none;
          font-size: 11px;
          font-weight: 600;
          padding: 4px 12px;
          border-radius: 4px;
        }

        .role-admin {
          background-color: #1e40af;
          color: #93bbff;
        }

        .role-user {
          background-color: #374151;
          color: #d1d5db;
        }

        .status-container {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        .status-active {
          background-color: #10b981;
        }

        .status-inactive {
          background-color: #6b7280;
        }

        .status-text {
          font-size: 14px;
        }

        .text-active {
          color: #10b981;
        }

        .text-inactive {
          color: #6b7280;
        }

        .action-icons {
          display: flex;
          gap: 16px;
          justify-content:end
        }

        .action-icon {
          font-size: 16px;
          cursor: pointer;
          transition: color 0.2s;
        }

        .edit-icon {
          color: #6b7280;
        }

        .edit-icon:hover {
          color: #1677ff;
        }

        .delete-icon {
          color: #6b7280;
        }

        .delete-icon:hover {
          color: #ef4444;
        }

        .problem-id {
          color: #6b93ff;
          font-weight: 500;
          font-size: 14px;
          font-family: 'Courier New', monospace;
        }

        .problem-title {
          color: #ffffff;
          font-weight: 500;
          font-size: 14px;
        }

        .difficulty-tag {
          border: none;
          font-size: 11px;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 4px;
          color: #ffffff;
        }

        .category-text {
          color: #9ca3af;
          font-size: 14px;
        }

        /* Stats Section */
        .stats-section {
          margin-top: 32px;
        }

        .stat-card {
          background-color: #1a1a1a !important;
          border: 1px solid #2a2a2a !important;
          border-radius: 8px;
          padding: 24px;
        }

        .stat-card .ant-card-body {
          padding: 0 !important;
        }

        .stat-label {
          color: #6b7280;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1px;
          margin-bottom: 12px;
        }

        .stat-value-container {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .stat-value {
          color: #ffffff;
          font-size: 36px;
          font-weight: 700;
          line-height: 1;
        }

        .stat-change {
          font-size: 14px;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 4px;
        }

        .stat-change.positive {
          background-color: rgba(16, 185, 129, 0.15);
          color: #10b981;
        }

        .stat-badge {
          font-size: 13px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 4px;
        }

        .stat-badge.live {
          background-color: rgba(16, 185, 129, 0.15);
          color: #10b981;
        }

        .stat-badge.optimal {
          background-color: rgba(16, 185, 129, 0.15);
          color: #10b981;
        }

        .shield-icon {
          font-size: 24px;
          color: #10b981;
        }

        @media (max-width: 768px) {
          .admin-content {
            padding: 20px;
          }

          .section-container {
            padding: 20px;
          }

          .section-header {
            flex-direction: column;
            gap: 16px;
          }

          .add-button {
            width: 100%;
          }

          .page-title {
            font-size: 28px !important;
          }
        }
      `}</style>
    </Layout>
  );
}
