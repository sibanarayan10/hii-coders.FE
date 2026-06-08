import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
    Row, Col, Table, Input, Select, Space,
    Typography, Pagination, Avatar,
    Modal,
    Flex,
    Popconfirm,
    PopconfirmProps,
    Spin,
    Form,
} from "antd";
import {
    UserAddOutlined,
    EditOutlined, StopOutlined, FilterOutlined,
    TeamOutlined, ApiOutlined, UserDeleteOutlined,
    DeleteOutlined,
    LoadingOutlined,
    UserOutlined,
    MailOutlined,
    LockOutlined,
    UndoOutlined,
} from "@ant-design/icons";

import { AppButton } from "../../components/common/AppButton";
import { COLORS, THEME } from "../../constants/theme";
import { timeAgo } from "../../components/common/SubmissionCard";
import { ADMIN, AdminBreadcrumb, AdminCard, AdminPageTitle, AdminStatCard } from ".";
import UserService from "../../services/UserService";
import { User } from "../../contexts/AuthContext";
import { UserRole } from "../../enums/UserRole";

const { Text } = Typography;

const ROLE_CONFIG: Record<string, { color: string; bg: string; border: string }> = {
    Admin: { color: THEME.accent, bg: "rgba(108,99,255,0.12)", border: "rgba(108,99,255,0.3)" },
    Contributor: { color: THEME.accentBlue, bg: "rgba(79,163,255,0.1)", border: "rgba(79,163,255,0.25)" },
};

const RoleBadge = ({ role }: { role: string }) => {
    const c = ROLE_CONFIG[role] ?? ROLE_CONFIG.Contributor;
    return (
        <span style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.color, borderRadius: 6, padding: "3px 10px", fontSize: 12, fontWeight: 600, fontFamily: "'Space Grotesk',sans-serif" }}>
            {role}
        </span>
    );
};

const StatusDot = ({ active }: { active: boolean }) => (
    <Space size={6} align="center">
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: active ? THEME.accentGreen : THEME.textSecondary, flexShrink: 0 }} />
        <Text style={{ color: active ? THEME.textPrimary : THEME.textSecondary, fontSize: 13, fontFamily: "'Space Grotesk',sans-serif" }}>
            {active ? "Active" : "Inactive"}
        </Text>
    </Space>
);

const UserCell = ({ name, email, avatarBg, initials }: { name: string; email: string; avatarBg?: string; initials: string }) => (
    <Space size={10} align="center">
        <Avatar size={36} src={undefined} style={{ background: avatarBg ?? `linear-gradient(135deg,${THEME.accent},#a084ee)`, fontSize: 12, fontWeight: 700, fontFamily: "'Space Grotesk',sans-serif", flexShrink: 0 }}>
            {initials}
        </Avatar>
        <div>
            <Text style={{ color: THEME.textPrimary, fontWeight: 600, fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, display: "block", lineHeight: "16px" }}>
                {name}
            </Text>
            <Text style={{ color: THEME.textSecondary, fontSize: 12, fontFamily: "'Space Grotesk',sans-serif" }}>
                {email}
            </Text>
        </div>
    </Space>
);

type recordStatus = "ACTIVE" | "DELETED";

const UserActionCell = ({ user, setRefresh, onEditClicked }: { user: any, setRefresh: Dispatch<SetStateAction<boolean>>, onEditClicked: () => void }) => {
    const [loading, setLoading] = useState(false);

    const toggleUserStatus = async (status: recordStatus) => {
        setLoading(true);
        try {
            const res = await UserService.toggleUserStatus(user?.id, status);
            if (res.data) {
                setRefresh(true);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }

    };



    return <Space size={4}>
        {[
            { icon: user.recordStatus == "ACTIVE" ? <EditOutlined style={{ color: THEME.accent, fontSize: 14 }} onClick={onEditClicked} /> : <StopOutlined />, bg: "rgba(108,99,255,0.1)", border: "rgba(108,99,255,0.2)" },
            {
                icon: <Popconfirm
                    title={`${user.recordStatus == "ACTIVE" ? "Delete" : "Re-activate"} the user`}
                    description={`Are you sure to do this ${user.recordStatus == "ACTIVE" ? "delete" : "re-activate"}?`}
                    onConfirm={() => toggleUserStatus(user.recordStatus == "ACTIVE" ? "DELETED" : "ACTIVE")}
                    okText="Yes"
                    cancelText="No"
                > {user.recordStatus == "ACTIVE" ? <DeleteOutlined style={{ color: THEME.accentRed, fontSize: 14 }} /> : <UndoOutlined />}
                </Popconfirm>, bg: "rgba(255,107,107,0.08)", border: "rgba(255,107,107,0.2)"
            },
        ].map((btn, i) => (
            <div key={i} style={{ width: 30, height: 30, borderRadius: 7, background: btn.bg, border: `1px solid ${btn.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s" }}>
                {btn.icon}
            </div>
        ))}
    </Space>
};





const RecentRegistrations = () => {
    const [recentUsers, setRecentUsers] = useState<any[]>([]);
    const [showModal, setShowModal] = useState(false);


    const getRecentUsers = async () => {
        try {
            const res = await UserService.getRecentUsers();
            if (res.data) {
                setRecentUsers(res.data)
            }
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getRecentUsers();
    }, [])


    return (
        <>
            <AdminCard style={{ height: "100%" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <Text style={{ color: THEME.textPrimary, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 15 }}>
                        Recent Registrations
                    </Text>
                    <Text style={{ color: THEME.accent, fontSize: 13, cursor: "pointer", fontWeight: 500, fontFamily: "'Space Grotesk',sans-serif" }} onClick={() => setShowModal(true)}>
                        View All
                    </Text>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {recentUsers.slice(0, 2).map((r) => (
                        <div key={r.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", background: "rgba(255,255,255,0.02)", border: `1px solid ${ADMIN.border}`, borderRadius: 9 }}>
                            <Space size={10}>
                                <Avatar size={34} style={{ background: "rgba(108,99,255,0.2)", fontSize: 14 }}>
                                    <UserAddOutlined style={{ color: THEME.accent }} />
                                </Avatar>
                                <div>
                                    <Text style={{ color: THEME.textPrimary, fontWeight: 600, fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, display: "block" }}>{r.name}</Text>
                                    <Text style={{ color: THEME.textSecondary, fontSize: 12, fontFamily: "'Space Grotesk',sans-serif" }}>{r.sub}</Text>
                                </div>
                            </Space>

                        </div>
                    ))}
                </div>


            </AdminCard>
            {showModal && <Modal
                open={true}
                onCancel={() => setShowModal(false)}
                width={600}
                footer={null}
                centered
                styles={{
                    body: {
                        padding: 0,
                        overflow: 'hidden',
                        borderRadius: 12,
                    },
                    content: {
                        maxWidth: 500
                    },
                }}
            >
                <Flex vertical gap={10} style={{ padding: "10px 12px" }}>
                    <Text style={{ color: THEME.textPrimary, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 15 }}>
                        Recent Registrations
                    </Text>
                    {recentUsers.map((r) => (
                        <div key={r.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", background: "rgba(255,255,255,0.02)", border: `1px solid ${ADMIN.border}`, borderRadius: 9 }}>
                            <Space size={10}>
                                <Avatar size={34} style={{ background: "rgba(108,99,255,0.2)", fontSize: 14 }}>
                                    <UserAddOutlined style={{ color: THEME.accent }} />
                                </Avatar>
                                <div>
                                    <Text style={{ color: THEME.textPrimary, fontWeight: 600, fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, display: "block" }}>{r.name}</Text>
                                    <Text style={{ color: THEME.textSecondary, fontSize: 12, fontFamily: "'Space Grotesk',sans-serif" }}>{r.email}</Text>
                                </div>
                            </Space>

                        </div>
                    ))}
                </Flex>
            </Modal>}
        </>
    );
};

const PerformanceTrends = () => {
    const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
    const vals = [62, 78, 85, 90, 88, 95, 92];
    const maxV = Math.max(...vals);

    return (
        <AdminCard style={{ height: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <Text style={{ color: THEME.textPrimary, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 15 }}>
                    User Performance Trends
                </Text>
                <Text style={{ color: THEME.textSecondary, fontSize: 18, cursor: "pointer" }}>···</Text>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 120 }}>
                {vals.map((v, i) => (
                    <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                        <div
                            style={{
                                width: "100%",
                                height: `${(v / maxV) * 100}px`,
                                background: i === days.length - 1
                                    ? `linear-gradient(180deg, ${THEME.accent} 0%, rgba(108,99,255,0.4) 100%)`
                                    : "rgba(108,99,255,0.25)",
                                borderRadius: "5px 5px 0 0",
                                transition: "all 0.3s",
                            }}
                        />
                        <Text style={{ color: THEME.textSecondary, fontSize: 10, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600 }}>
                            {days[i]}
                        </Text>
                    </div>
                ))}
            </div>
        </AdminCard>
    );
};

const initialFilter = {
    page: 1,
    limit: 10,
    search: ""
}

const STAT_CARDS = [
    { key: "totalUsers", label: "Total Users", value: "12,842", sub: undefined, icon: <TeamOutlined style={{ color: "#4fa3ff", fontSize: 22 }} />, iconBg: "rgba(79,163,255,0.15)" },
    { key: "activeUsers", label: "Active Now", value: "1,024", sub: undefined, icon: <ApiOutlined style={{ color: THEME.accentGreen, fontSize: 22 }} />, iconBg: "rgba(0,229,160,0.12)" },
    { key: "deactivatedUsers", label: "Deactivated", value: "158", sub: undefined, icon: <UserDeleteOutlined style={{ color: THEME.accentRed, fontSize: 22 }} />, iconBg: "rgba(255,107,107,0.12)" },
];

export default function AdminUsersPage({ onNavigate }: { onNavigate?: (page: string) => void }) {

    const [data, setData] = useState<any>();
    const [filter, setFilter] = useState<any>(initialFilter);
    const [stats, setStats] = useState(STAT_CARDS);
    const [refresh, setRefresh] = useState(true);
    const [modal, setModal] = useState<{ show: boolean, params?: any }>();


    const columns = [
        {
            title: "USER",
            key: "user",
            render: (_: any, row: any) => (
                <UserCell name={row.name} email={row.email} avatarBg={row.avatarBg} initials={row.initials || "U"} />
            ),
        },
        {
            title: "ROLE",
            dataIndex: "role",
            width: 140,
            render: (v: string) => <RoleBadge role={v} />,
        },
        {
            title: "STATUS",
            dataIndex: "recordStatus",
            width: 120,
            render: (v: string) => <StatusDot active={v == "ACTIVE"} />,
        },
        {
            title: "SOLVED",
            dataIndex: "acceptedCount",
            width: 100,
            render: (v: number) => (
                <Text style={{ color: THEME.textPrimary, fontFamily: "'Fira Code',monospace", fontSize: 13 }}>
                    {v.toLocaleString()}
                </Text>
            ),
        },
        {
            title: "LAST ACTIVE",
            dataIndex: "lastActive",
            width: 150,
            render: (v: string) => (
                <Text style={{ color: THEME.textSecondary, fontSize: 13, fontFamily: "'Space Grotesk',sans-serif" }}>
                    {timeAgo(v)}
                </Text>
            ),
        },
        {
            title: "ACTIONS",
            width: 100,
            render: (_: any, row: any) => <UserActionCell user={row} setRefresh={setRefresh} onEditClicked={() => setModal({ show: true, params: row })} />,
        },
    ];

    const getUsers = async () => {
        try {
            const res = await UserService.getUsers(filter as any);
            if (res.data) {
                setData(res.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setRefresh(false);
        }
    };

    const getUserMetrics = async () => {
        try {
            const res = await UserService.getUserMetrics();
            if (res.data) {
                const { activeUsers = 0, totalUsers = 0, deactivateUsers = 0 } = res.data;
                const updatedStats = stats.map((item) => ({ ...item, value: item.key == "totalUsers" ? totalUsers : item.key == "activeUsers" ? activeUsers : deactivateUsers }));
                setStats(updatedStats);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getUsers();
    }, [filter])

    useEffect(() => {
        if (refresh) getUsers()
    }, [refresh])

    useEffect(() => {
        getUserMetrics()
    }, [])

    return (
        <div style={{ padding: "24px 28px" }}>

            {/* Breadcrumb */}
            <AdminBreadcrumb
                items={[
                    { label: "Home", onClick: () => onNavigate?.("home") },
                    { label: "Admin", onClick: () => onNavigate?.("admin") },
                    { label: "Users" },
                ]}
            />

            {/* Page title */}
            <AdminPageTitle
                title="User Management"
                subtitle="Manage enterprise level user access, permissions, and performance metrics."
                extra={
                    <Space size={10}>

                        <AppButton buttonVariant="primary" icon={<UserAddOutlined />} style={{ height: 38, borderRadius: 9 }} onClick={() => setModal({ show: true })}>
                            Add User
                        </AppButton>
                    </Space>
                }
            />

            {/* Stat cards */}
            <Row gutter={[14, 14]} style={{ marginBottom: 20 }}>
                {stats.map((s) => (
                    <Col xs={24} sm={12} md={6} key={s.label}>
                        <AdminStatCard {...s} />
                    </Col>
                ))}
            </Row>

            {/* Table card */}
            <AdminCard padding="0" style={{ marginBottom: 20 }}>
                {/* Table toolbar */}
                <div style={{ padding: "14px 16px", borderBottom: `1px solid ${ADMIN.border}`, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                    <Input
                        prefix={<FilterOutlined style={{ color: THEME.textSecondary, fontSize: 13 }} />}
                        placeholder="Search users by name or email..."
                        value={filter.search}
                        onChange={(e) => setFilter((prev: any) => ({ ...prev, search: e.target.value }))}
                        style={{
                            background: ADMIN.bgCard,
                            border: `1px solid ${ADMIN.border}`,
                            borderRadius: 8,
                            color: THEME.textPrimary,
                            height: 36,
                            fontFamily: "'Space Grotesk',sans-serif",
                            fontSize: 13,
                            maxWidth: 280,
                        }}
                    />

                    <div style={{ flex: 1 }} />
                    <Space size={10} align="center">
                        <Text style={{ color: THEME.textSecondary, fontSize: 13, fontFamily: "'Space Grotesk',sans-serif" }}>Show:</Text>
                        <Select
                            className="admin-select"
                            value={filter.limit}
                            onChange={(v) => setFilter((prev: any) => ({ ...prev, limit: parseInt(v) }))}
                            style={{ width: 130 }}
                            options={[
                                { label: "10 per page", value: "10" },
                                { label: "25 per page", value: "25" },
                                { label: "50 per page", value: "50" },
                            ]}
                        />
                    </Space>
                </div>

                <Table
                    className="admin-table"
                    dataSource={data?.content}
                    columns={columns}
                    rowKey="key"
                    pagination={false}
                    size="middle"
                />

                {/* Pagination */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderTop: `1px solid ${ADMIN.border}`, flexWrap: "wrap", gap: 12 }}>
                    <Text style={{ color: THEME.textSecondary, fontSize: 13, fontFamily: "'Space Grotesk',sans-serif" }}>
                        Showing <strong style={{ color: THEME.textPrimary }}>1 - 10</strong> of <strong style={{ color: THEME.textPrimary }}>12,842</strong> users
                    </Text>
                    <Pagination className="admin-pagination" current={filter.page} total={data?.totalElements} pageSize={data?.pageable?.pageSize} onChange={(v) => setFilter((prev: any) => ({ ...prev, page: v }))} showSizeChanger={false} />
                </div>
            </AdminCard>

            {/* Bottom row */}
            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}><RecentRegistrations /></Col>
                <Col xs={24} md={12}><PerformanceTrends /></Col>
            </Row>

            {modal?.show && <UserModal onClose={() => setModal({ show: false })} setRefresh={setRefresh} initialValue={modal?.params} />}

        </div>
    );
}


const UserModal = ({ onClose, setRefresh, initialValue }: { onClose: () => void, setRefresh: Dispatch<SetStateAction<boolean>>, initialValue: User | undefined }) => {
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState<User>(initialValue as any);

    const [form] = Form.useForm();


    const handleSubmit = async (values: any) => {
        try {
            setLoading(true);
            const res = await UserService.createUser(values);
            if (res.data) {
                setRefresh(true)
            }
        } catch (err) {
            console.error(err);
        } finally {
            onClose();
            setLoading(false);
        }
    };


    return <Modal
        open={true}
        onCancel={onClose}
        width={400}
        footer={null}
        centered
        styles={{
            body: {
                overflow: 'hidden',
                borderRadius: 12,
                padding: '30px 20px'

            },
            wrapper: {
                padding: '10px 10px'
            }
        }}
    >
        <Form
            layout="vertical"
            requiredMark={false}
            validateTrigger="onBlur"
            onFinish={handleSubmit}
            initialValues={values}
            form={form}
        >
            <Form.Item
                label={<span style={style.label}>Full name</span>}
                name="name"

            >
                <Input
                    size="large"
                    prefix={
                        <UserOutlined
                            style={{
                                color: '#9ca3af',
                            }}
                        />
                    }
                    placeholder="Linus Torvalds"
                    style={style.input}
                />
            </Form.Item>

            <Form.Item
                label={<span style={style.label}>Email</span>}
                name="email"

            >
                <Input
                    size="large"
                    prefix={
                        <MailOutlined
                            style={{
                                color: '#9ca3af',
                            }}
                        />
                    }
                    placeholder="architect@code.io"
                    style={style.input}
                />
            </Form.Item>


            <Form.Item
                label={<span style={style.label}>Password</span>}
                name="password"

            >
                <Input.Password
                    size="large"
                    prefix={
                        <LockOutlined
                            style={{
                                color: '#9ca3af',
                            }}
                        />
                    }
                    placeholder="••••••••••"
                    style={style.input}
                />
            </Form.Item>

            <Form.Item
                label={<span style={style.label}>Role</span>}
                name="role"
            >
                <Select
                    options={[
                        { value: UserRole.ADMIN, label: 'Admin' },
                        { value: UserRole.USER, label: 'User' },
                    ]}
                    style={{
                        height: '40px',
                        fontSize: '16px',
                        lineHeight: '40px',
                        color: '#9ca3af',
                        borderColor: '#38383f',
                        borderRadius: '10px',
                        backgroundColor: '#131319ff',
                        border: '1px solid #38383f',
                        padding: "0px 10px"

                    }}
                />
            </Form.Item>
            <AppButton
                buttonVariant="primary"
                block
                htmlType="submit"
                size="large"
                disabled={loading}
                style={{
                    marginTop: 18,
                    borderRadius: 10,
                    border: 'none',
                    fontSize: 18,
                    fontWeight: 500,
                    background: 'linear-gradient(90deg, #a5bfff 0%, #005eff 100%)',
                    boxShadow: '0 12px 35px rgba(0,94,255,0.35)',
                }}
                iconPosition="end"
                styles={{
                    icon: {
                        visibility: loading ? 'visible' : 'hidden',
                    },
                }}

                icon={
                    <Spin
                        indicator={<LoadingOutlined style={{ color: COLORS.primary, fontSize: 24 }} spin />}
                    />
                }
            >
                {initialValue ? 'Update user' : 'Create new user'}
            </AppButton>



        </Form>
    </Modal>
}


const style = {
    input: {
        background: '#131319ff',
        border: '1px solid #38383f',
        color: '#ffffff',
        borderRadius: 10,
    },
    label: { color: '#d1d5db', fontSize: 13, letterSpacing: 1.8, fontWeight: 600 },
};