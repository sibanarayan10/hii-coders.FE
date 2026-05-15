import { useState, useMemo, useCallback, useEffect } from 'react';
import { PAGE_SIZE, type Status, Problem, Difficulty, STATUS } from '../constants/problems';
import ProblemService from '../services/ProblemService';

export interface Filters {
  difficulties: Difficulty[];
  statuses: Status[];
  company: string | null;
  search: string;
}

export interface UseProblemsReturn {
  problems: Problem[];
  total: number;
  totalAll: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  onPageChange: (page: number) => void;
}

const INITIAL_FILTERS: Filters = {
  difficulties: [],
  statuses: [],
  company: null,
  search: '',
};

export const useProblems = (): UseProblemsReturn => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);
  const [problems, setProblems] = useState<Problem[]>([]);

  const getProblems = async () => {
    try {
      const res = await ProblemService.getProblems();
      if (res.status) {
        setProblems(res.data.content || []);
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredProblems = useMemo(() => {
    return problems.filter((problem) => {
      if (filters.difficulties.length > 0 && !filters.difficulties.includes(problem.difficulty)) {
        return false;
      }
      if (
        filters.statuses.length > 0 &&
        !filters.statuses.includes(problem.status || STATUS.TODO)
      ) {
        return false;
      }
      if (
        filters.search.trim() &&
        !problem.title.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [filters, problems]);

  const paginatedProblems = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredProblems.slice(start, start + PAGE_SIZE);
  }, [filteredProblems, currentPage]);

  const totalPages = Math.ceil(filteredProblems.length / PAGE_SIZE);

  const handleFilterChange = useCallback((newFilters: Filters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) setCurrentPage(page);
    },
    [totalPages],
  );

  useEffect(() => {
    getProblems();
  }, []);
  return {
    problems: paginatedProblems,
    total: filteredProblems.length,
    totalAll: 30,
    currentPage,
    totalPages,
    pageSize: PAGE_SIZE,
    filters,
    onFilterChange: handleFilterChange,
    onPageChange: handlePageChange,
  };
};
