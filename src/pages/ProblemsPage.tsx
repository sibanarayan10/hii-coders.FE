import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Input, Table, Pagination, Typography, Space, Modal, Divider, Checkbox, Select, Flex, Radio, Spin } from 'antd';

import { COLORS, THEME } from '../constants/theme';
import { AppButton } from '../components/common/AppButton';
import { SearchOutlined, FilterOutlined, CheckCircleFilled, MinusCircleFilled, CloseOutlined, PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { ActionBadge } from '../components/common/ActionBadge';
import { DifficultyBadge } from '../components/common/DifficultyBadge';
import { TopicTag } from './ProblemPageTrial';
import { Difficulty, Problem } from '../constants/problems';
import ProblemService from '../services/ProblemService';
import { ProblemCategory, ProblemCategoryLabel, SolveStatus, SolveStatusLabel } from '../enums/ProblemCategory';
import SectionLabel from '../components/common/SectionLabel';
import { Company, CompanyLabel } from '../enums/Company';

const { Text, Title } = Typography;

interface PaginationDetailProps {
  pageSize: number;
  current: number;
  total: number;
}

export interface ProblemFilter {
  search?: string;
  difficulties: Difficulty[];
  categories: ProblemCategory[];
  companies: Company[];
  solveStatus: SolveStatus;
}

const ProblemsPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const { problems, columns, setFilters, filters, paginationDetail, getProblems, setPaginationDetail, loading } = useProblemState();


  useEffect(() => {
    getProblems();
  }, [filters])

  return (
    <div style={{ maxWidth: 820, margin: "0 auto", padding: "72px 24px 40px" }}>
      <Title level={2} style={{ color: THEME.textPrimary, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 26, marginBottom: 22 }}>
        Explore Problems
      </Title>

      {/* Search + Filter */}
      <Row gutter={10} style={{ marginBottom: 18 }} align="middle">
        <Col flex="auto">
          <Input className="psearch" prefix={<SearchOutlined />} placeholder="Search coding problems..." value={filters?.search} onChange={(e) => setFilters((prev) => ({ ...prev!, search: e.currentTarget.value }))} style={{ width: "100%" }} />
        </Col>
        <Col>
          <AppButton buttonVariant="ghost" icon={<FilterOutlined />} onClick={() => setShowModal(true)} style={{ height: 43 }}>
            Filters
          </AppButton>
        </Col>
      </Row>

      {/* Table */}
      <div style={{ background: THEME.bgCard, border: `1px solid ${THEME.bgCardBorder}`, borderRadius: 14, overflow: "hidden" }}>
        <Table
          className="ptable"
          dataSource={problems}
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
          Showing {problems.length} of {paginationDetail.total} problems
        </Text>
        <Pagination current={paginationDetail.current} total={paginationDetail.total} pageSize={paginationDetail.pageSize} onChange={(page, pageSize) => setPaginationDetail({ ...paginationDetail, current: page })} showSizeChanger={false} />
      </div>

      {showModal && <FilterModal filters={filters} onClose={() => setShowModal(false)} onClear={() => setShowModal(false)} setFilters={setFilters} loading={loading} />}
    </div>
  );
};

export default ProblemsPage;



export const FilterModal = ({ onClose, filters, setFilters, onClear, loading }: {
  onClose: () => void;
  filters: ProblemFilter;
  setFilters: (filters: ProblemFilter) => void;
  onClear: () => void;
  loading: boolean
}) => {
  const [filterCopy, setFilterCopy] = useState(filters);

  const diffOptions = [
    { key: Difficulty.EASY, count: 142, color: THEME.accentGreen },
    { key: Difficulty.MEDIUM, count: 89, color: THEME.accentOrange },
    { key: Difficulty.HARD, count: 34, color: THEME.accentRed },
  ];

  const statusOption = [...Object.keys(SolveStatusLabel) as SolveStatus[]].map(status => ({
    label: SolveStatusLabel[status],
    value: status,
  }));

  return (
    <Modal open={true} onCancel={onClose} footer={null} closeIcon={null} width={480} centered
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
        <Flex vertical gap="medium">
          <Radio.Group
            block
            options={statusOption}
            defaultValue={filterCopy.solveStatus}
            optionType="button"
            buttonStyle="solid"
          />
        </Flex>

        <Divider style={{ borderColor: THEME.bgCardBorder, margin: "0 0 24px" }} />

        {/* Difficulty */}
        <SectionLabel>Difficulty</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
          {diffOptions.map((d) => (
            <div key={d.key as Difficulty} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Checkbox checked={filterCopy?.difficulties.includes(d.key as Difficulty)}
                onChange={(e) => {
                  const next = e.target.checked ? [...filterCopy?.difficulties, d.key as Difficulty] : filterCopy?.difficulties.filter((x: any) => x !== d.key);
                  setFilterCopy({ ...filterCopy, difficulties: next });
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
        <Flex style={{ marginBottom: 12 }} justify="space-between" align="center">
          <SectionLabel >Categories</SectionLabel>
          <Text style={{ color: THEME.accent, fontSize: 13, cursor: "pointer", fontWeight: 600 }}
            onClick={() => setFilterCopy(prev => ({ ...prev, categories: Object.keys(ProblemCategoryLabel) as ProblemCategory[] }))}
          >Select All</Text>
        </Flex>
        <Select
          mode="multiple" allowClear placeholder="Select categories..." value={filterCopy?.categories}
          onChange={(val) => {
            setFilterCopy(prev => ({ ...prev, categories: val }))
          }}
          style={{ width: "100%", marginBottom: 24 }}
          options={[...Object.keys(ProblemCategoryLabel) as ProblemCategory[]].map((c) => ({ label: ProblemCategoryLabel[c], value: c }))}
        />

        <Divider style={{ borderColor: THEME.bgCardBorder, margin: "0 0 24px" }} />

        {/* Companies */}
        <SectionLabel>Companies</SectionLabel>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 28 }}>
          <Select
            mode="multiple" allowClear placeholder="Select categories..." value={filterCopy?.companies}
            onChange={(val) => {
              setFilterCopy(prev => ({ ...prev, companies: val }))
            }}
            style={{ width: "100%", marginBottom: 24 }}
            options={[...Object.keys(CompanyLabel) as Company[]].map((c) => ({ label: CompanyLabel[c], value: c }))}
          />

        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: `1px solid ${THEME.bgCardBorder}`, padding: "18px 28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <AppButton buttonVariant="outline" onClick={() => setFilterCopy(getDefaultFilter())}>Clear All</AppButton>
        <AppButton
          buttonVariant="cta"
          onClick={() => {
            setFilters(filterCopy)
            if (!loading) {
              onClose()
            }
          }}
          iconPosition='end'
          icon={<Spin indicator={<LoadingOutlined style={{ color: COLORS.primary, fontSize: 24 }} spin />} />}
          style={{ minWidth: 160 }}
          styles={{ icon: { display: loading ? "flex" : "none" } }}>Show Results</AppButton>
      </div>
    </Modal>
  );
};

const ColHeader = ({ children }: { children: React.ReactNode }) => (
  <Text style={{ color: THEME.textSecondary, fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>{children}</Text>
);

export const StatusIcon = ({ status }: { status: SolveStatus }) => {
  if (status === SolveStatus.TODO) return <CheckCircleFilled style={{ color: THEME.accentGreen, fontSize: 16 }} />;
  if (status === SolveStatus.ATTEMPTED) return <MinusCircleFilled style={{ color: THEME.accentOrange, fontSize: 16 }} />;
  return <span style={{ display: "inline-block", width: 16, height: 16, borderRadius: "50%", border: `1.5px solid ${THEME.bgCardBorder}` }} />;
};

const useProblemState = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [filters, setFilters] = useState<ProblemFilter>(getDefaultFilter())
  const [paginationDetail, setPaginationDetail] = useState<PaginationDetailProps>({ pageSize: 10, current: 1, total: 1294 });
  const [loading, setLoading] = useState<boolean>(false);

  const PAGE_LIMIT = 10;

  const getProblems = async () => {
    try {
      setLoading(true);
      const res = await ProblemService.getProblems(paginationDetail.current, PAGE_LIMIT, filters);
      if (res.data) {
        const { content = [], totalElements = 0, totalPages = 0, pageable } = res.data;
        setProblems(content);
        setPaginationDetail({ pageSize: totalPages, current: pageable.pageNumber + 1, total: totalElements })
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
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
            {row?.categories?.map((tag: string) => <TopicTag key={tag} label={tag} />)}
          </Space>
        </div>
      ),
    },
    {
      title: <ColHeader>Difficulty</ColHeader>,
      dataIndex: "difficulty",
      width: 110,
      render: (v: any) => <DifficultyBadge level={v} />,
    },
    {
      title: <ColHeader>Acceptance</ColHeader>,
      dataIndex: "acceptance",
      width: 120,
      render: (v: any) => <Text style={{ color: THEME.textSecondary, fontSize: 13 }}>{v || "0.00%"}</Text>,
    },
    {
      title: <ColHeader>Action</ColHeader>,
      dataIndex: "action",
      width: 100,
      render: (v: any) => <ActionBadge status={v} />,
    },
  ];


  return { problems, getProblems, columns, setFilters, filters, paginationDetail, setPaginationDetail, loading }
}
const getDefaultFilter = () => ({ categories: [], companies: [], search: "", difficulties: [], solveStatus: SolveStatus.TODO })