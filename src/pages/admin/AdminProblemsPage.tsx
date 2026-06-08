import { useEffect, useState } from "react";
import {
    Row, Col, Table, Input, Select, Space,
    Typography, Pagination, Tooltip,
    Popconfirm,
} from "antd";
import {
    PlusCircleOutlined, EditOutlined, DeleteOutlined,
    RiseOutlined, FilterOutlined, CodeOutlined,
} from "@ant-design/icons";
import { THEME } from "../../constants/theme";
import { ADMIN, AdminBreadcrumb, AdminCard, AdminPageTitle } from ".";
import { DifficultyBadge } from "../../components/common/DifficultyBadge";
import { TopicTag } from "../ProblemsPage";
import { AppButton } from "../../components/common/AppButton";
import { Difficulty } from "../../constants/problems";
import ProblemService from "../../services/ProblemService";
import { ProblemCategory, ProblemCategoryLabel } from "../../enums/ProblemCategory";
import { CreateProblemModal } from "../../components/common/CreateProblemModal";

const { Text } = Typography;

const AcceptanceBar = ({ pct }: { pct: number }) => {
    const color =
        pct >= 60 ? THEME.accentGreen :
            pct >= 35 ? THEME.accentBlue : THEME.accentRed;
    return (
        <Space size={10} align="center">
            <div style={{ width: 80, height: 4, background: ADMIN.border, borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 2 }} />
            </div>
            <Text style={{ color: THEME.textSecondary, fontSize: 12, fontFamily: "'Fira Code',monospace", minWidth: 36 }}>
                {pct}%
            </Text>
        </Space>
    );
};

const ActionCell = ({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) => (
    <Space size={4}>
        <Tooltip title="Edit">
            <div
                onClick={onEdit}
                style={{
                    width: 30, height: 30, borderRadius: 7,
                    background: "rgba(108,99,255,0.1)",
                    border: `1px solid rgba(108,99,255,0.2)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", transition: "all 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(108,99,255,0.22)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(108,99,255,0.1)"; }}
            >
                <EditOutlined style={{ color: THEME.accent, fontSize: 13 }} />
            </div>
        </Tooltip>
        <Tooltip title="Delete">
            <Popconfirm

                title={`Delete the problem`}
                description={`Are you sure to do this delete the problem?`}
                onConfirm={onDelete}
                okText="Yes"
                cancelText="No"
            >
                <div

                    style={{
                        width: 30, height: 30, borderRadius: 7,
                        background: "rgba(255,107,107,0.08)",
                        border: `1px solid rgba(255,107,107,0.2)`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer", transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,107,107,0.2)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,107,107,0.08)"; }}
                >
                    <DeleteOutlined style={{ color: THEME.accentRed, fontSize: 13 }} />
                </div>
            </Popconfirm>
        </Tooltip>
    </Space>
);



// ─── COLUMNS ──────────────────────────────────────────────────────────────────


interface IFilter {
    page: number;
    size: number;
    difficulty?: Difficulty;
    search?: string;
    sortBy?: string;
    order?: string;
}


const initialFilter: IFilter = {
    page: 1,
    size: 10,

    sortBy: "createdAt",
    order: "desc",
}


export default function AdminProblemsPage({
    onNavigate,
}: {
    onNavigate?: (page: string) => void;
}) {
    const [filter, setFilter] = useState<IFilter>(initialFilter);
    const [data, setData] = useState<any>();
    const [showModal, setShowModal] = useState<{ show: boolean, params?: any }>({ show: false });


    const getProblemDetail = async (id: string) => {
        if (!id) return;
        try {
            const res = await ProblemService.getProblem(id);
            if (res.data) {
                setShowModal({ show: true, params: res.data });
            }
        } catch (error) {
            console.error(error);
        }
    }

    const deleteProblem = async (id: string) => {
        if (!id) return;
        try {
            const res = await ProblemService.deleteProblem(id);
            if (res.data) {

            }
        } catch (error) {
            console.error(error);
        }
    }

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            width: 80,
            render: (v: string) => (
                <Text style={{ color: THEME.textSecondary, fontFamily: "'Fira Code',monospace", fontSize: 12 }}>{v.split('-')[0]}</Text>
            ),
        },
        {
            title: "TITLE",
            dataIndex: "title",
            render: (title: string, row: any) => (
                <div>
                    <Text style={{ color: THEME.textPrimary, fontWeight: 600, fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, display: "block", cursor: "pointer" }}>
                        {title}
                    </Text>
                    <Text style={{ color: THEME.textSecondary, fontSize: 11, fontFamily: "'Space Grotesk',sans-serif" }}>
                        {row.sub}
                    </Text>
                </div>
            ),
        },
        {
            title: "DIFFICULTY",
            dataIndex: "difficulty",
            width: 120,
            render: (v: string) => <DifficultyBadge level={v as Difficulty} />,
        },
        {
            title: "TAGS",
            dataIndex: "categories",
            width: 200,
            render: (categories: ProblemCategory[]) => (
                <Space size={6} wrap>
                    {categories?.map((t) => <TopicTag key={t} label={ProblemCategoryLabel[t as ProblemCategory]} />)}
                </Space>
            ),
        },
        {
            title: "ACCEPTANCE",
            dataIndex: "acceptanceRate",
            width: 160,
            render: (v: number) => <AcceptanceBar pct={v} />,
        },
        {
            title: "ACTIONS",
            width: 100,
            render: (_: any, row: any) => (
                <ActionCell onEdit={() => getProblemDetail(row?.id || '')} onDelete={() => deleteProblem(row?.id)} />
            ),
        },
    ];

    const getProblems = async () => {
        try {
            const res = await ProblemService.getProblemsByAdmin(filter as any);
            if (res.data) {
                setData(res.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getProblems();
    }, [filter])

    return (
        <div style={{ padding: "24px 28px" }}>

            {/* Breadcrumb */}
            <AdminBreadcrumb
                items={[
                    { label: "Home", onClick: () => onNavigate?.("home") },
                    { label: "Admin", onClick: () => onNavigate?.("admin") },
                    { label: "Problems" },
                ]}
            />

            {/* Page title */}
            <AdminPageTitle
                title="Problem Management"
                subtitle="Create, edit, and oversee the algorithmic challenge library. Monitor user acceptance rates and tag distribution."
                extra={
                    <AppButton
                        buttonVariant="outline"
                        icon={<PlusCircleOutlined />}
                        style={{ height: 38, borderColor: THEME.accent, color: THEME.accent, borderRadius: 9 }}
                        onClick={() => setShowModal({ show: true })}

                    >
                        Create Problem
                    </AppButton>
                }
            />

            {/* Filter bar + stat card */}
            <Row gutter={16} style={{ marginBottom: 16 }}>
                {/* Filter panel */}
                <Col flex="auto">
                    <AdminCard padding="14px 16px">
                        <Space size={12} wrap>
                            {/* search */}
                            <Input
                                className="admin-input"
                                prefix={<FilterOutlined style={{ color: THEME.textSecondary, fontSize: 13 }} />}
                                placeholder="Filter by title or tag..."
                                value={filter.search || ''}
                                onChange={(e) => {
                                    setFilter({
                                        ...filter,
                                        search: e.target.value,
                                    })
                                }}
                                style={{
                                    background: ADMIN.bgCard,
                                    border: `1px solid ${ADMIN.border}`,
                                    borderRadius: 8,
                                    color: THEME.textPrimary,
                                    fontFamily: "'Space Grotesk',sans-serif",
                                    fontSize: 13,
                                    height: 36,
                                    minWidth: 240,
                                }}
                            />

                            <Select
                                className="admin-select"
                                value={filter.difficulty}
                                onChange={(value: Difficulty) => {
                                    setFilter({
                                        ...filter,
                                        difficulty: value,
                                    })
                                }}
                                style={{ width: 150 }}
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
                            />

                            <Select
                                className="admin-select"
                                value={filter.sortBy + "-" + filter.order}
                                onChange={(value: string) => {
                                    const [sortBy, order] = value.split("-");
                                    setFilter({
                                        ...filter,
                                        sortBy,
                                        order,
                                    });
                                }}
                                style={{ width: 170 }}
                                options={[
                                    { label: "Sort: Newest First", value: "createdAt-desc" },
                                    { label: "Sort: Oldest First", value: "createdAt-asc" },
                                    { label: "Sort: Acceptance ↑", value: "SubmissionStatus-asc" },
                                    { label: "Sort: Acceptance ↓", value: "SubmissionStatus-desc" },
                                ]}
                            />
                        </Space>
                    </AdminCard>
                </Col>

                <Col flex="260px">
                    <AdminCard padding="14px 20px" style={{ height: "100%" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "100%" }}>
                            <div>
                                <Text style={{ color: THEME.textSecondary, fontSize: 10, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase", display: "block", fontFamily: "'Space Grotesk',sans-serif" }}>
                                    Total Active Challenges
                                </Text>
                                <Text style={{ color: THEME.textPrimary, fontSize: 32, fontWeight: 700, fontFamily: "'Space Grotesk',sans-serif", display: "block", lineHeight: 1.1, marginTop: 4 }}>
                                    1,284
                                </Text>
                                <Space size={5} style={{ marginTop: 4 }}>
                                    <RiseOutlined style={{ color: THEME.accentGreen, fontSize: 12 }} />
                                    <Text style={{ color: THEME.accentGreen, fontSize: 12, fontFamily: "'Space Grotesk',sans-serif" }}>
                                        +12 this week
                                    </Text>
                                </Space>
                            </div>
                            <div
                                style={{
                                    width: 44, height: 44,
                                    borderRadius: 10,
                                    background: "rgba(108,99,255,0.15)",
                                    border: `1px solid rgba(108,99,255,0.25)`,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                }}
                            >
                                <CodeOutlined style={{ color: THEME.accent, fontSize: 20 }} />
                            </div>
                        </div>
                    </AdminCard>
                </Col>
            </Row>

            <AdminCard padding="0">
                <Table
                    className="admin-table"
                    dataSource={data?.content}
                    columns={columns}
                    rowKey="id"
                    pagination={false}
                    size="middle"
                    locale={{
                        emptyText: (
                            <div style={{ padding: "40px 0", textAlign: "center" }}>
                                <Text style={{ color: THEME.textSecondary }}>No problems match your filters.</Text>
                            </div>
                        ),
                    }}
                />

                <div
                    style={{
                        display: "flex", alignItems: "center",
                        justifyContent: "space-between",
                        padding: "14px 20px",
                        borderTop: `1px solid ${ADMIN.border}`,
                        flexWrap: "wrap", gap: 12,
                    }}
                >
                    <Text style={{ color: THEME.textSecondary, fontSize: 13, fontFamily: "'Space Grotesk',sans-serif" }}>
                        Showing {(filter.page - 1) * 10 + 1} to {(filter.page + 1) * 10} of <strong style={{ color: THEME.textPrimary }}>{data?.totalElements}</strong> problems
                    </Text>
                    <Pagination
                        className="admin-pagination"
                        current={filter.page}
                        total={data?.totalPages}
                        pageSize={10}
                        onChange={(page) => setFilter({
                            ...filter,
                            page,
                        })}
                        showSizeChanger={false}
                    />
                </div>
            </AdminCard>

            {showModal.show && <CreateProblemModal onClose={() => setShowModal({ show: false })} data={showModal.params}
            />}
        </div>
    );
}
