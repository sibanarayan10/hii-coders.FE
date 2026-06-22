import { Breadcrumb, Flex, Skeleton, Tooltip } from 'antd';
import { HomeOutlined, SearchOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useBreadCrumb } from '../../hooks/useBreadCrumb';
import { THEME } from '../../constants/theme';
import { useState } from 'react';
import { ProblemSearchPanel } from './ProblemSearchPanel';

export const AppBreadCrumb = () => {
    const navigate = useNavigate();
    const crumbs = useBreadCrumb();
    const location = useLocation();
    const [searchOpen, setSearchOpen] = useState(false);

    const hideBreadCrumb = location.pathname.split('/').includes("auth");
    const showSearchIcon = crumbs.length === 3 && crumbs[1]?.label === 'Problems';

    // Don't show on the landing page or auth pages
    if (crumbs.length <= 1) return null;

    const items = crumbs.map((crumb, i) => {
        const isFirst = i === 0;
        const isLast = i === crumbs.length - 1;

        return {
            key: crumb.label + i,
            title: crumb.loading ? (
                <Skeleton.Input active size="small" style={{ width: 80, height: 14, minWidth: 0 }} />
            ) : (
                <Flex
                    align='center'
                    gap={5}
                    style={{
                        cursor: crumb.path ? 'pointer' : 'default',
                        margin: "5px 0px"
                    }}
                    onMouseEnter={(e) => {
                        if (crumb.path) (e.currentTarget as HTMLElement).style.color = THEME.textPrimary;
                    }}
                    onMouseLeave={(e) => {
                        if (crumb.path && !isLast) (e.currentTarget as HTMLElement).style.color = THEME.textSecondary;
                    }}

                >
                    <Flex
                        align='center'
                        gap={5}
                        style={{
                            color: isLast ? THEME.textPrimary : THEME.textSecondary,
                            fontWeight: isLast ? 500 : 400,
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: 13,
                            transition: 'color 0.2s',
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            crumb.path && navigate(crumb.path)
                        }}

                    >
                        {isFirst && <HomeOutlined style={{ fontSize: 12 }} />}
                        {crumb.label}
                    </Flex>
                    {isLast && showSearchIcon && (
                        <Tooltip title="Search problems">
                            <Flex
                                align='center'
                                justify='center'
                                onClick={() => setSearchOpen(true)}
                                style={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 5,
                                    background: 'rgba(108,99,255,0.1)',
                                    border: `1px solid rgba(108,99,255,0.2)`,
                                    cursor: 'pointer',
                                    marginLeft: 2,
                                    transition: 'background 0.2s, border-color 0.2s',
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLElement).style.background = 'rgba(108,99,255,0.22)';
                                    (e.currentTarget as HTMLElement).style.borderColor = THEME.accent;
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLElement).style.background = 'rgba(108,99,255,0.1)';
                                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(108,99,255,0.2)';
                                }}
                            >
                                <SearchOutlined style={{ color: THEME.accent, fontSize: 11 }} />
                            </Flex>
                        </Tooltip>
                    )}
                </Flex>

            ),
        };
    });
    if (hideBreadCrumb) {
        return <></>
    }

    return (
        <div
            style={{
                padding: '3px 28px',
                borderBottom: `1px solid ${THEME.bgCardBorder}`,
                background: 'rgba(10,15,30,0.6)',
                backdropFilter: 'blur(8px)',
            }}
        >
            < Breadcrumb
                separator={<span style={{ color: THEME.bgCardBorder, fontSize: 12 }}>›</span>}
                items={items}
            />
            {searchOpen && <ProblemSearchPanel onClose={() => setSearchOpen(false)} />}
        </div>
    );
};
