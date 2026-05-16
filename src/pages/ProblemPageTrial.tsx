import { useState } from "react";
import {
    Typography,
    Input,
    Table,
    Modal,
    Checkbox,
    Select,
    Space,
    Row,
    Col,
    Pagination,
    ConfigProvider,
    theme,
    Divider,
} from "antd";
import {
    SearchOutlined,
    FilterOutlined,
    CloseOutlined,
    PlusOutlined,
    CheckCircleFilled,
    MinusCircleFilled,
    BellOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { THEME } from "../constants/theme";
import { Difficulty } from "../constants/problems";
import { AppButton } from "../components/common/AppButton";

const { Text, Title } = Typography;


// ─── REUSABLE: StatusIcon ─────────────────────────────────────────────────────
export const StatusIcon = ({ status }: { status: "todo" | "attempted" | "solved" }) => {
    if (status === "todo") return <CheckCircleFilled style={{ color: THEME.accentGreen, fontSize: 16 }} />;
    if (status === "attempted") return <MinusCircleFilled style={{ color: THEME.accentOrange, fontSize: 16 }} />;
    return <span style={{ display: "inline-block", width: 16, height: 16, borderRadius: "50%", border: `1.5px solid ${THEME.bgCardBorder}` }} />;
};

// ─── REUSABLE: TopicTag ───────────────────────────────────────────────────────
export const TopicTag = ({ label }: { label: string }) => (
    <span style={{ background: "rgba(108,99,255,0.08)", border: `1px solid rgba(108,99,255,0.18)`, color: THEME.textSecondary, borderRadius: 4, padding: "1px 7px", fontSize: 11, fontFamily: "'Space Grotesk',sans-serif" }}>
        {label}
    </span>
);

// ─── REUSABLE: Navbar ─────────────────────────────────────────────────────────
const NAV_LINKS = ["Problems", "Dashboard", "Contests", "Community"];

export const Navbar = ({ active = "Problems" }) => (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: THEME.navBg, backdropFilter: "blur(14px)", borderBottom: `1px solid ${THEME.bgCardBorder}`, padding: "0 32px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Space size={0} align="center">
            <Text style={{ color: THEME.textPrimary, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 16, marginRight: 28, letterSpacing: "-0.4px" }}>
                DevCode
            </Text>
            {NAV_LINKS.map((link) => (
                <div key={link} style={{ padding: "0 14px", height: 52, display: "flex", alignItems: "center", borderBottom: link === active ? `2px solid ${THEME.accent}` : "2px solid transparent", cursor: "pointer" }}>
                    <Text style={{ color: link === active ? THEME.textPrimary : THEME.textSecondary, fontSize: 13, fontWeight: link === active ? 600 : 400, fontFamily: "'Space Grotesk',sans-serif" }}>
                        {link}
                    </Text>
                </div>
            ))}
        </Space>
        <Space size={12} align="center">
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: `1px solid ${THEME.bgCardBorder}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <BellOutlined style={{ color: THEME.textSecondary, fontSize: 15 }} />
            </div>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg, ${THEME.accent}, #a084ee)`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <UserOutlined style={{ color: "#fff", fontSize: 15 }} />
            </div>
        </Space>
    </nav>
);

// ─── REUSABLE: PageFooter ─────────────────────────────────────────────────────
export const PageFooter = () => (
    <footer style={{ borderTop: `1px solid ${THEME.bgCardBorder}`, padding: "18px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 40, flexWrap: "wrap", gap: 12 }}>
        <div>
            <Text style={{ color: THEME.textPrimary, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 14 }}>DevCode</Text>
            <Text style={{ color: THEME.textSecondary, fontSize: 12, display: "block", marginTop: 2 }}>© 2024 DevCode Inc. Built for technical mastery.</Text>
        </div>
        <Space size={24}>
            {["Documentation", "Changelog", "Privacy", "Support"].map((l) => (
                <Text key={l} style={{ color: THEME.textSecondary, fontSize: 12, cursor: "pointer" }}>{l}</Text>
            ))}
        </Space>
    </footer>
);

// ─── REUSABLE: FilterModal ────────────────────────────────────────────────────
const ALL_CATEGORIES = ["Array", "DP", "Graph", "Tree", "String", "Math", "BFS", "DFS", "Greedy", "Backtracking"];
const ALL_COMPANIES = ["Google", "Meta", "Amazon", "Apple", "Netflix", "Microsoft", "Uber", "Stripe"];

export const FilterModal = ({ open, onClose, filters, onFiltersChange, onApply, onClear }: {
    open: boolean;
    onClose: () => void;
    filters: any;
    onFiltersChange: (filters: any) => void;
    onApply: () => void;
    onClear: () => void;
}) => {
    const { solveStatus, difficulty, categories, companies } = filters;
    const diffOptions = [
        { key: "Easy", count: 142, color: THEME.accentGreen },
        { key: "Medium", count: 89, color: THEME.accentOrange },
        { key: "Hard", count: 34, color: THEME.accentRed },
    ];

    return (
        <Modal open={open} onCancel={onClose} footer={null} closeIcon={null} width={480} centered
            styles={{
                content: { background: "#111827", border: `1px solid ${THEME.bgCardBorder}`, borderRadius: 16, padding: 0 },
                mask: { backdropFilter: "blur(6px)", background: "rgba(0,0,0,0.65)" },
            }}
        >
            <div style={{ padding: "28px 28px 0" }}>
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
                    <Title level={4} style={{ color: THEME.textPrimary, fontFamily: "'Space Grotesk',sans-serif", margin: 0, fontSize: 20 }}>Filters</Title>
                    <div onClick={onClose} style={{ cursor: "pointer", width: 28, height: 28, borderRadius: 6, background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <CloseOutlined style={{ color: THEME.textSecondary, fontSize: 13 }} />
                    </div>
                </div>

                {/* Solve Status */}
                <SectionLabel>Solve Status</SectionLabel>
                <div style={{ display: "flex", borderRadius: 10, overflow: "hidden", border: `1px solid ${THEME.bgCardBorder}`, marginBottom: 24 }}>
                    {["All", "Solved", "Todo"].map((s) => (
                        <div key={s} onClick={() => onFiltersChange({ ...filters, solveStatus: s })}
                            style={{ flex: 1, textAlign: "center", padding: "11px 0", cursor: "pointer", background: solveStatus === s ? THEME.accent : "transparent", transition: "background 0.2s" }}
                        >
                            <Text style={{ color: solveStatus === s ? "#fff" : THEME.textSecondary, fontWeight: solveStatus === s ? 600 : 400, fontSize: 14, fontFamily: "'Space Grotesk',sans-serif" }}>{s}</Text>
                        </div>
                    ))}
                </div>

                <Divider style={{ borderColor: THEME.bgCardBorder, margin: "0 0 24px" }} />

                {/* Difficulty */}
                <SectionLabel>Difficulty</SectionLabel>
                <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
                    {diffOptions.map((d) => (
                        <div key={d.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Checkbox checked={difficulty.includes(d.key)}
                                onChange={(e) => {
                                    const next = e.target.checked ? [...difficulty, d.key] : difficulty.filter((x) => x !== d.key);
                                    onFiltersChange({ ...filters, difficulty: next });
                                }}
                            >
                                <Text style={{ color: THEME.textPrimary, fontSize: 15, fontFamily: "'Space Grotesk',sans-serif" }}>{d.key}</Text>
                            </Checkbox>
                            <Text style={{ color: d.color, fontSize: 15, fontWeight: 700, fontFamily: "'Space Grotesk',sans-serif" }}>{d.count}</Text>
                        </div>
                    ))}
                </div>

                <Divider style={{ borderColor: THEME.bgCardBorder, margin: "0 0 24px" }} />

                {/* Categories */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <SectionLabel noMargin>Categories</SectionLabel>
                    <Text style={{ color: THEME.accent, fontSize: 13, cursor: "pointer", fontWeight: 600 }}
                        onClick={() => onFiltersChange({ ...filters, categories: ALL_CATEGORIES })}
                    >Select All</Text>
                </div>
                <Select mode="multiple" allowClear placeholder="Select categories..." value={categories}
                    onChange={(val) => onFiltersChange({ ...filters, categories: val })}
                    style={{ width: "100%", marginBottom: 24 }}
                    options={ALL_CATEGORIES.map((c) => ({ label: c, value: c }))}
                />

                <Divider style={{ borderColor: THEME.bgCardBorder, margin: "0 0 24px" }} />

                {/* Companies */}
                <SectionLabel>Companies</SectionLabel>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 28 }}>
                    {ALL_COMPANIES.map((c) => {
                        const active = companies.includes(c);
                        return (
                            <div key={c} onClick={() => {
                                const next = active ? companies.filter((x) => x !== c) : [...companies, c];
                                onFiltersChange({ ...filters, companies: next });
                            }}
                                style={{ padding: "6px 16px", borderRadius: 20, border: `1px solid ${active ? THEME.accent : THEME.bgCardBorder}`, background: active ? "rgba(108,99,255,0.18)" : "transparent", color: active ? THEME.textPrimary : THEME.textSecondary, fontSize: 13, fontFamily: "'Space Grotesk',sans-serif", fontWeight: active ? 600 : 400, cursor: "pointer", transition: "all 0.2s" }}
                            >{c}</div>
                        );
                    })}
                    <div style={{ width: 32, height: 32, borderRadius: "50%", border: `1px solid ${THEME.bgCardBorder}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: THEME.textSecondary }}>
                        <PlusOutlined style={{ fontSize: 13 }} />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div style={{ borderTop: `1px solid ${THEME.bgCardBorder}`, padding: "18px 28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <AppButton variant="text" onClick={onClear}>Clear All</AppButton>
                <AppButton variant="cta" onClick={onApply} style={{ minWidth: 160 }}>Show Results</AppButton>
            </div>
        </Modal>
    );
};

// small helper
const SectionLabel = ({ children, noMargin }: { children: React.ReactNode, noMargin?: boolean }) => (
    <Text style={{ color: THEME.textSecondary, fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", display: "block", marginBottom: noMargin ? 0 : 14 }}>
        {children}
    </Text>
);

const PROBLEMS = [
    { id: 1, status: "done", title: "Two Sum", tags: ["Array", "Hash Table"], difficulty: "Easy", acceptance: "49.7%", action: "Solve" },
    { id: 2, status: "attempted", title: "Add Two Numbers", tags: ["Linked List", "Math"], difficulty: "Medium", acceptance: "40.2%", action: "Review" },
    { id: 3, status: "none", title: "Longest Palindromic Substring", tags: ["String", "DP"], difficulty: "Medium", acceptance: "32.4%", action: "Retry" },
    { id: 4, status: "none", title: "Median of Two Sorted Arrays", tags: ["Array", "Divide and Conquer"], difficulty: "Hard", acceptance: "35.3%", action: "Done" },
    { id: 5, status: "done", title: "Reverse Integer", tags: ["Math"], difficulty: "Easy", acceptance: "27.2%", action: "Review" },
    { id: 6, status: "none", title: "Valid Parentheses", tags: ["String", "Stack"], difficulty: "Easy", acceptance: "41.1%", action: "Solve" },
    { id: 7, status: "attempted", title: "Merge Intervals", tags: ["Array", "Sorting"], difficulty: "Medium", acceptance: "44.8%", action: "Retry" },
    { id: 8, status: "none", title: "Word Ladder", tags: ["BFS", "Graph"], difficulty: "Hard", acceptance: "36.1%", action: "Solve" },
];

export const ProblemsPage = () => {
    const [search, setSearch] = useState("");
    const [filterOpen, setFilterOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({ solveStatus: "All", difficulty: ["Easy"], categories: ["Array", "DP"], companies: ["Meta"] });
    const [appliedFilters, setAppliedFilters] = useState(filters);

    const filtered = PROBLEMS.filter((p) => {
        const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
        const matchDiff = appliedFilters.difficulty.length === 0 || appliedFilters.difficulty.includes(p.difficulty);
        const matchStatus =
            appliedFilters.solveStatus === "All" ||
            (appliedFilters.solveStatus === "Solved" && p.status === "done") ||
            (appliedFilters.solveStatus === "Todo" && p.status === "none");
        return matchSearch && matchDiff && matchStatus;
    });

    const columns = [
        {
            title: <ColHeader>Status</ColHeader>,
            dataIndex: "status",
            width: 72,
            render: (v: any) => <StatusIcon status={v} />,
        },
        {
            title: <ColHeader>Title</ColHeader>,
            dataIndex: "title",
            render: (title: string, row: any) => (
                <div>
                    <Text style={{ color: THEME.textPrimary, fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 500, display: "block", cursor: "pointer" }}>
                        {title}
                    </Text>
                    <Space size={6} style={{ marginTop: 5 }}>
                        {row.tags.map((tag: string) => <TopicTag key={tag} label={tag} />)}
                    </Space>
                </div>
            ),
        },
        {
            title: <ColHeader>Difficulty</ColHeader>,
            dataIndex: "difficulty",
            width: 110,
            render: (v) => <DifficultyBadge level={v} />,
        },
        {
            title: <ColHeader>Acceptance</ColHeader>,
            dataIndex: "acceptance",
            width: 120,
            render: (v) => <Text style={{ color: THEME.textSecondary, fontSize: 13 }}>{v}</Text>,
        },
        {
            title: <ColHeader>Action</ColHeader>,
            dataIndex: "action",
            width: 100,
            render: (v) => <ActionBadge status={v} />,
        },
    ];

    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
                token: { colorPrimary: THEME.accent, fontFamily: "'Space Grotesk', sans-serif", colorBgContainer: THEME.bgCard, colorBorder: THEME.bgCardBorder, borderRadius: 10, colorText: THEME.textPrimary },
                components: {
                    Table: { headerBg: "transparent", borderColor: THEME.bgCardBorder, rowHoverBg: THEME.bgRowHover, colorBgContainer: "transparent" },
                    Input: { colorBgContainer: "#0d1530", colorBorder: THEME.bgCardBorder, colorTextPlaceholder: THEME.textSecondary },
                    Checkbox: { colorPrimary: THEME.accent },
                    Select: { colorBgContainer: "#0a1020", colorBorder: THEME.bgCardBorder, colorBgElevated: "#111827", optionSelectedBg: "rgba(108,99,255,0.15)" },
                    Modal: { contentBg: "#111827" },
                },
            }}
        >
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        body { background: ${THEME.bg}; margin: 0; }

        .ptable .ant-table           { background: transparent !important; }
        .ptable .ant-table-container { background: transparent !important; }
        .ptable .ant-table-thead > tr > th  { background: transparent !important; border-bottom: 1px solid ${THEME.bgCardBorder} !important; padding: 10px 16px !important; }
        .ptable .ant-table-tbody > tr > td  { border-bottom: 1px solid ${THEME.bgCardBorder} !important; padding: 14px 16px !important; background: transparent !important; }
        .ptable .ant-table-tbody > tr:hover > td { background: ${THEME.bgRowHover} !important; }
        .ptable .ant-table-tbody > tr:last-child > td { border-bottom: none !important; }

        .psearch .ant-input-affix-wrapper {
          background: #0d1530 !important;
          border: 1px solid ${THEME.bgCardBorder} !important;
          border-radius: 10px !important;
          padding: 9px 14px;
        }
        .psearch .ant-input-affix-wrapper:hover,
        .psearch .ant-input-affix-wrapper:focus-within { border-color: ${THEME.accent} !important; box-shadow: none !important; }
        .psearch .ant-input { background: transparent !important; color: ${THEME.textPrimary}; font-size: 13px; }
        .psearch .ant-input::placeholder { color: ${THEME.textSecondary}; }
        .psearch .ant-input-prefix { color: ${THEME.textSecondary}; margin-right: 8px; }

        .ant-select-selector            { background: #0a1020 !important; border-color: ${THEME.bgCardBorder} !important; border-radius: 10px !important; }
        .ant-select-selection-item      { background: rgba(108,99,255,0.15) !important; border: 1px solid rgba(108,99,255,0.3) !important; color: ${THEME.textPrimary} !important; border-radius: 6px !important; }
        .ant-select-selection-placeholder { color: ${THEME.textSecondary} !important; }
        .ant-select-dropdown            { background: #111827 !important; border: 1px solid ${THEME.bgCardBorder} !important; border-radius: 10px !important; }
        .ant-select-item                { color: ${THEME.textSecondary} !important; }
        .ant-select-item-option-selected { background: rgba(108,99,255,0.15) !important; color: ${THEME.textPrimary} !important; }
        .ant-select-item-option-active  { background: rgba(108,99,255,0.08) !important; }

        .ant-checkbox-inner             { background: transparent !important; border-color: ${THEME.bgCardBorder} !important; border-radius: 4px !important; }
        .ant-checkbox-checked .ant-checkbox-inner { background: ${THEME.accent} !important; border-color: ${THEME.accent} !important; }

        .ant-pagination-item            { background: ${THEME.bgCard} !important; border-color: ${THEME.bgCardBorder} !important; border-radius: 7px !important; }
        .ant-pagination-item a          { color: ${THEME.textSecondary} !important; }
        .ant-pagination-item-active     { background: ${THEME.accent} !important; border-color: ${THEME.accent} !important; }
        .ant-pagination-item-active a   { color: #fff !important; }
        .ant-pagination-prev button, .ant-pagination-next button { background: ${THEME.bgCard} !important; border-color: ${THEME.bgCardBorder} !important; color: ${THEME.textSecondary} !important; border-radius: 7px !important; }

        .ant-modal-content { padding: 0 !important; overflow: hidden; border-radius: 16px !important; }
      `}</style>

            <div style={{ background: THEME.bg, minHeight: "100vh" }}>
                <Navbar active="Problems" />

                <div style={{ maxWidth: 820, margin: "0 auto", padding: "72px 24px 40px" }}>
                    <Title level={2} style={{ color: THEME.textPrimary, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 26, marginBottom: 22 }}>
                        Explore Problems
                    </Title>

                    {/* Search + Filter */}
                    <Row gutter={10} style={{ marginBottom: 18 }} align="middle">
                        <Col flex="auto">
                            <Input className="psearch" prefix={<SearchOutlined />} placeholder="Search coding problems..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ width: "100%" }} />
                        </Col>
                        <Col>
                            <AppButton buttonVariant="ghost" icon={<FilterOutlined />} onClick={() => setFilterOpen(true)} style={{ height: 43 }}>
                                Filters
                            </AppButton>
                        </Col>
                    </Row>

                    {/* Table */}
                    <div style={{ background: THEME.bgCard, border: `1px solid ${THEME.bgCardBorder}`, borderRadius: 14, overflow: "hidden" }}>
                        <Table
                            className="ptable"
                            dataSource={filtered}
                            columns={columns}
                            rowKey="id"
                            pagination={false}
                            size="middle"
                            locale={{ emptyText: <div style={{ padding: "40px 0", textAlign: "center" }}><Text style={{ color: THEME.textSecondary }}>No problems match your filters.</Text></div> }}
                        />
                    </div>

                    {/* Pagination */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 18, flexWrap: "wrap", gap: 12 }}>
                        <Text style={{ color: THEME.textSecondary, fontSize: 13 }}>
                            Showing {filtered.length} of 1,294 problems
                        </Text>
                        <Pagination current={page} total={1294} pageSize={10} onChange={setPage} showSizeChanger={false} />
                    </div>
                </div>

                <PageFooter />

                <FilterModal
                    open={filterOpen}
                    onClose={() => setFilterOpen(false)}
                    filters={filters}
                    onFiltersChange={setFilters}
                    onApply={() => { setAppliedFilters(filters); setFilterOpen(false); }}
                    onClear={() => {
                        const reset = { solveStatus: "All", difficulty: [], categories: [], companies: [] };
                        setFilters(reset);
                        setAppliedFilters(reset);
                    }}
                />
            </div>
        </ConfigProvider>
    );
}

// tiny helper
const ColHeader = ({ children }: { children: React.ReactNode }) => (
    <Text style={{ color: THEME.textSecondary, fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>{children}</Text>
);
