import { useEffect, useState } from 'react';
import { matchPath, useLocation, useParams, useSearchParams } from 'react-router-dom';
import ProblemService from '../services/ProblemService';

export interface BreadcrumbItem {
    label: string;
    path?: string;
    loading?: boolean;
}

const ROUTE_LABEL_MAP: Record<string, string> = {
    problems: 'Problems',
    dashboard: 'Dashboard',
    'sign-in': 'Sign In',
    'sign-up': 'Sign Up',
    admin: 'Admin',
    users: 'Users',
    analytics: 'Analytics',
};

export const useBreadCrumb = (): BreadcrumbItem[] => {

    const location = useLocation();
    const params = matchPath("/problems/:id", location.pathname);
    const [problemTitle, setProblemTitle] = useState<string | null>(null);
    const [loadingTitle, setLoadingTitle] = useState(false);

    const segments = location.pathname.split('/').filter(Boolean);
    const problemId = params?.params.id;

    useEffect(() => {
        if (!problemId) {
            setProblemTitle(null);
            return;
        }
        let cancelled = false;
        setLoadingTitle(true);
        ProblemService.getProblemDetail(problemId)
            .then((res) => {
                if (!cancelled && res.data?.title) {
                    setProblemTitle(res.data.title);
                }
            })
            .catch(() => {
                if (!cancelled) setProblemTitle(problemId);
            })
            .finally(() => {
                if (!cancelled) setLoadingTitle(false);
            });
        return () => { cancelled = true; };
    }, [problemId]);

    if (location.pathname === '/') return [{ label: 'Home' }];

    const crumbs: BreadcrumbItem[] = [{ label: 'Home', path: '/' }];

    let builtPath = '';
    for (const segment of segments) {
        builtPath += `/${segment}`;

        // This segment is the problem ID — use fetched title instead
        if (segment === problemId) {
            crumbs.push({
                label: loadingTitle ? '…' : (problemTitle ?? segment),
                loading: loadingTitle,
            });
            continue;
        }

        const label = ROUTE_LABEL_MAP[segment] ?? segment;
        const isLast = builtPath === location.pathname;
        crumbs.push({ label, path: isLast ? undefined : builtPath });
    }

    return crumbs;
}
