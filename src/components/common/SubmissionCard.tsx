import React, { useEffect, useState } from 'react';
import { Space, Typography, Spin } from 'antd';
import {
    ClockCircleOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,

    HourglassOutlined,
    CodeOutlined,
    LoadingOutlined
} from '@ant-design/icons';
import SubmissionService from '../../services/Submission'
import { COLORS, THEME } from '../../constants/theme';
import { ProgrammingLanguage, ProgrammingLanguageLabel } from '../../enums/ProgrammingLanguage';
import { connectWebSocket, disconnectWebSocket } from '../../services/WebSocketConfig';
import { SubmissionStatus } from '../../enums/SubmissionStatus';

const { Text } = Typography;



interface Submission {
    id: string;
    status: SubmissionStatus;
    runtimeMs?: string;
    testsPassed: string;
    language: string;
    errorMessage?: string;
    createdAt: string
    passed: number,
    total: number
}

interface SubmissionCardProps {
    submission: Submission;
    isNew: boolean,
    onClick?: () => void;
}




const SUBMISSION_CONFIG: Record<
    SubmissionStatus,
    { color: string; icon: React.ReactNode }
> = {
    [SubmissionStatus.ACCEPTED]: {
        color: THEME.accentGreen,
        icon: <CheckCircleOutlined />,
    },
    [SubmissionStatus.WRONG_ANSWER]: {
        color: THEME.textPrimary,
        icon: <CloseCircleOutlined style={{ color: THEME.accentRed }} />,
    },
    [SubmissionStatus.TIME_LIMIT_EXCEEDED]: {
        color: THEME.accentOrange,
        icon: <HourglassOutlined />,
    },
    [SubmissionStatus.MEMORY_LIMIT_EXCEED]: {
        color: THEME.accentOrange,
        icon: <HourglassOutlined />,
    },
    [SubmissionStatus.RUNTIME_ERROR]: {
        color: THEME.accentRed,
        icon: <CloseCircleOutlined />,
    },
    [SubmissionStatus.COMPILATION_ERROR]: {
        color: THEME.accentRed,
        icon: <CloseCircleOutlined />,
    },
    [SubmissionStatus.RUNNING]: {
        color: THEME.accentYellow,
        icon: <Spin indicator={<LoadingOutlined style={{ color: COLORS.primary, fontSize: 24 }} spin />} />,
    },
    [SubmissionStatus.QUEUED]: {
        color: THEME.accentBlue,
        icon: <Spin indicator={<LoadingOutlined style={{ color: COLORS.primary, fontSize: 24 }} spin />} />,
    },
    [SubmissionStatus.PENDING]: {
        color: THEME.accentBlue,
        icon: <Spin indicator={<LoadingOutlined style={{ color: COLORS.primary, fontSize: 24 }} spin />} />,
    },
};


export function SubmissionsPanel({ problemId, submissionId }: { problemId: string, submissionId: string }): JSX.Element {
    const [submissions, setSubmissions] = useState<any[]>([]);

    const getSubmission = async () => {
        try {
            const res = await SubmissionService.getSubmission(problemId);
            if (res.data) {
                setSubmissions(res.data);

            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSubmission();
    }, [submissionId]);

    if (submissions.length === 0) {
        return (
            <div
                style={{
                    textAlign: "center",
                    padding: "60px 0",
                }}
            >
                <Text
                    style={{
                        color: THEME.textSecondary,
                        fontSize: 14,
                        fontFamily: "'Space Grotesk', sans-serif",
                    }}
                >
                    No submissions yet. Write your solution and hit Submit!
                </Text>
            </div>
        );
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {submissions.map((s, i) => (
                <SubmissionCard submission={s} isNew={submissionId == s.id} key={s.id} />
            ))}
        </div>
    );
}


const SubmissionCard = ({
    submission: sbms,
    onClick,
    isNew = false
}: SubmissionCardProps) => {


    const [submission, setSubmission] = useState<Submission>(sbms);

    const cfg = SUBMISSION_CONFIG[submission.status] ?? {
        color: THEME.textPrimary,
        icon: <CloseCircleOutlined />,
    };

    const canSubscribe = sbms.status == SubmissionStatus.RUNNING || sbms.status == SubmissionStatus.QUEUED || sbms.status === SubmissionStatus.PENDING;

    useEffect(() => {
        setSubmission(sbms)
    }, [sbms])

    useEffect(() => {
        if (!sbms.id || !canSubscribe) return;

        connectWebSocket(sbms.id, (result) => {

            setSubmission(prev => ({
                ...prev,
                ...result
            }));
            console.log(result);
        });

        return () => {
            disconnectWebSocket();
        };

    }, []);

    return (
        <div
            onClick={onClick}
            style={{
                background: THEME.bgCard,
                border: `1px solid ${THEME.bgCardBorder}`,
                borderRadius: 12,
                padding: "14px 18px",
                cursor: onClick ? "pointer" : "default",
                transition: "border-color 0.2s, background 0.2s",
            }}
            onMouseEnter={(e) => {
                if (!onClick) return;
                e.currentTarget.style.borderColor = `${THEME.accent}66`;
                e.currentTarget.style.background = THEME.bgRowHover;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = THEME.bgCardBorder;
                e.currentTarget.style.background = THEME.bgCard;
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 8,
                }}
            >
                <Text
                    style={{
                        color: cfg.color,
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 700,
                        fontSize: 15,
                    }}
                >
                    {submission.status}
                </Text>

                <Text
                    style={{
                        color: THEME.textSecondary,
                        fontSize: 13,
                        fontFamily: "'Space Grotesk', sans-serif",
                    }}
                >
                    {timeAgo(submission.createdAt)}
                </Text>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Space size={16}>
                    <Space size={5} align="center">
                        <ClockCircleOutlined
                            style={{ color: THEME.textSecondary, fontSize: 13 }}
                        />
                        <Text
                            style={{
                                color: THEME.textSecondary,
                                fontSize: 13,
                                fontFamily: "'Fira Code', monospace",
                            }}
                        >
                            {submission.runtimeMs || 0}ms
                        </Text>
                    </Space>

                    {/* tests passed */}
                    <Space size={5} align="center">
                        {submission.status !== SubmissionStatus.RUNNING && <TestCountIcon passed={submission.passed} total={submission.total} />}
                        <Text
                            style={{
                                color: THEME.textSecondary,
                                fontSize: 13,
                                fontFamily: "'Fira Code', monospace",
                            }}
                        >
                            {submission.passed}/{submission.total} passed
                        </Text>
                    </Space>
                </Space>

                {/* language */}
                <Space size={5} align="center">
                    <CodeOutlined style={{ color: THEME.accentBlue, fontSize: 12 }} />
                    <Text
                        style={{
                            color: THEME.accentBlue,
                            fontSize: 13,
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontWeight: 500,
                        }}
                    >
                        {submission.language || ProgrammingLanguageLabel[ProgrammingLanguage.JAVA]}
                    </Text>
                </Space>
            </div>
        </div>
    );
};

const timeAgo = (createdAt: string | Date): string => {
    const now = new Date();
    const past = new Date(createdAt);
    const diffMs = now.getTime() - past.getTime();

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) return "just now";
    if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    if (hours < 24) return `${hours}   hour${hours === 1 ? "" : "s"} ago`;
    if (days < 7) return `${days}    day${days === 1 ? "" : "s"} ago`;
    if (weeks < 4) return `${weeks}   week${weeks === 1 ? "" : "s"} ago`;
    if (months < 12) return `${months}  month${months === 1 ? "" : "s"} ago`;
    return `${years}   year${years === 1 ? "" : "s"} ago`;
};

const TestCountIcon = ({
    passed,
    total,
}: {
    passed: number;
    total: number;
}) => {
    const allPassed = passed === total;
    return allPassed ? (
        <CheckCircleOutlined
            style={{ color: THEME.accentGreen, fontSize: 13 }}
        />
    ) : (
        <CloseCircleOutlined
            style={{ color: THEME.accentRed, fontSize: 13 }}
        />
    );
};