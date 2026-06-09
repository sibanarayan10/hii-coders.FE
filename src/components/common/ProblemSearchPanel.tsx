import { useEffect, useRef, useState, useCallback } from 'react';
import { Button, Drawer, Flex, Popover, Space, Spin, Table, Typography } from 'antd';
import {
    CheckCircleFilled,
    MinusCircleFilled,
    EyeOutlined,
    LoadingOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ProblemService from '../../services/ProblemService';
import { DifficultyBadge } from './DifficultyBadge';
import { COLORS, THEME } from '../../constants/theme';
import { Problem, STATUS } from '../../constants/problems';
import { SolveStatus } from '../../enums/ProblemCategory';
import { ColHeader, StatusIcon, TopicTag } from '../../pages/ProblemsPage';
import Search from 'antd/es/input/Search';
import { BlockViewer } from './BlocksViewer';

const { Text } = Typography;

const DEBOUNCE_MS = 320;

const StatusDot = ({ status }: { status?: STATUS }) => {
    if (status === STATUS.SOLVED)
        return <CheckCircleFilled style={{ color: THEME.accentGreen, fontSize: 14, flexShrink: 0 }} />;
    if (status === STATUS.ATTEMPTED)
        return <MinusCircleFilled style={{ color: THEME.accentOrange, fontSize: 14, flexShrink: 0 }} />;
    return (
        <span
            style={{
                display: 'inline-block',
                width: 14,
                height: 14,
                borderRadius: '50%',
                border: `1.5px solid ${THEME.bgCardBorder}`,
                flexShrink: 0,
            }}
        />
    );
};



interface ProblemSearchPanelProps {
    onClose: () => void;
}

export const ProblemSearchPanel = ({ onClose }: ProblemSearchPanelProps) => {
    const [query, setQuery] = useState('');
    const [problems, setProblems] = useState<Problem[]>([]);
    const [loading, setLoading] = useState(false);
    const [activeIdx, setActiveIdx] = useState(0);
    const [total, setTotal] = useState(0);

    const inputRef = useRef<any>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const navigate = useNavigate();

    const navigateTo = (id: string) => {
        navigate(`/problems/${id}`);
        onClose();
    };

    const columns = [
        {
            title: <ColHeader>Status</ColHeader>,
            dataIndex: "status",
            width: 72,
            render: (v: any) => (
                <StatusIcon status={v} />
            ),
        },
        {
            title: <ColHeader>Title</ColHeader>,
            dataIndex: "title",
            render: (title: string, row: any) => (
                <Flex justify='space-between' align='center' onClick={() => navigate(`/problems/${row.id}`)}>
                    <Flex vertical gap={2}>
                        <Text style={{ color: THEME.textPrimary, fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 500, display: "block", cursor: "pointer" }}>
                            {title}
                        </Text>
                        <Space size={6} style={{ marginTop: 5 }}>
                            {row?.categories?.map((tag: string) => <TopicTag key={tag} label={tag} />)}
                        </Space>
                    </Flex>
                    <Popover content={<BlockViewer blocks={row.blocks} showParagraphOnly={true} />} styles={{ root: { maxWidth: 400 } }} placement='topLeft'>
                        <Button variant="outlined" iconPosition='start' icon={<EyeOutlined onClick={(e) => { e.stopPropagation() }} />} />
                    </Popover>
                </Flex>
            ),
        },
        {
            title: <ColHeader>Difficulty</ColHeader>,
            dataIndex: "difficulty",
            width: 110,
            render: (v: any) => <DifficultyBadge level={v} />,
        },

    ];

    const fetchProblems = useCallback(async (search: string) => {
        try {
            setLoading(true);
            const res = await ProblemService.getProblems(1, 12, {
                search,
                difficulties: [],
                categories: [],
                companies: [],
                solveStatus: SolveStatus.TODO,
            });
            if (res.data) {
                const { content = [], totalElements = 0 } = res.data;
                setProblems(content);
                setActiveIdx(0);
                setTotal(totalElements);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveIdx((i) => Math.min(i + 1, problems.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveIdx((i) => Math.max(i - 1, 0));
        } else if (e.key === 'Enter' && problems[activeIdx]) {
            navigateTo(problems[activeIdx].id);
        }
    };

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => fetchProblems(query), query ? DEBOUNCE_MS : 0);
        return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
    }, [query, fetchProblems]);

    useEffect(() => {
        setTimeout(() => inputRef.current?.focus(), 60);
    }, []);

    useEffect(() => {
        const el = listRef.current?.querySelector(`[data-idx="${activeIdx}"]`) as HTMLElement;
        el?.scrollIntoView({ block: 'nearest' });
    }, [activeIdx]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [onClose]);


    return (
        <>
            <Drawer
                title={
                    <Text style={{
                        color: THEME.textPrimary,
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 700,
                        fontSize: 17,
                    }}>
                        Problem Set
                    </Text>
                }
                closable={{ 'aria-label': 'Close Button' }}
                open={true}
                onClose={onClose}
                width={600}
                styles={{
                    header: {
                        background: '#0d1530',
                        borderBottom: `1px solid ${THEME.bgCardBorder}`,
                        padding: '16px 20px',
                    },
                    body: {
                        background: '#0a0f1e',
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 16,
                    },
                    mask: {
                        backdropFilter: 'blur(4px)',
                        background: 'rgba(0,0,0,0.55)',
                    },
                    wrapper: {
                        boxShadow: '-8px 0 40px rgba(0,0,0,0.6)',
                    },
                }}
            >
                {/* Search bar */}
                <Search
                    value={query}
                    placeholder="Search problems..."
                    allowClear
                    prefix={<SearchOutlined style={{ color: THEME.textSecondary }} />}
                    onChange={(e) => setQuery(e.target.value)}
                    style={{ width: '100%' }}
                    styles={{
                        input: {
                            background: '#161b2e',
                            fontFamily: "'Space Grotesk', sans-serif",
                        },
                    }}
                    enterButton={
                        <span style={{
                            background: THEME.accent,
                            color: '#fff',
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontWeight: 600,
                            fontSize: 13,
                            padding: '0 16px',
                        }}>
                            Search
                        </span>
                    }
                />

                {/* Results count */}
                {!loading && problems.length > 0 && (
                    <Text style={{ color: THEME.textSecondary, fontSize: 12 }}>
                        Showing {problems.length} of {total} problems
                        {query && <span> for <span style={{ color: THEME.accent }}>"{query}"</span></span>}
                    </Text>
                )}

                {/* Table */}
                {loading ? (
                    <Flex justify="center" align="center" style={{ marginTop: 40 }}>
                        <Spin indicator={<LoadingOutlined style={{ color: COLORS.primary, fontSize: 28 }} spin />} />
                    </Flex>
                ) : (
                    <div style={{
                        background: THEME.bgCard,
                        border: `1px solid ${THEME.bgCardBorder}`,
                        borderRadius: 12,
                        overflow: 'hidden',
                    }}>
                        <Table
                            className="ptable"
                            dataSource={problems}
                            columns={columns}
                            rowKey="id"
                            pagination={false}
                            size="middle"
                            locale={{
                                emptyText: (
                                    <div style={{ padding: '40px 0', textAlign: 'center' }}>
                                        <Text style={{ color: THEME.textSecondary }}>
                                            {query ? `No problems found for "${query}"` : 'No problems available.'}
                                        </Text>
                                    </div>
                                ),
                            }}
                        />
                    </div>
                )}
            </Drawer>
        </>
    );
};
