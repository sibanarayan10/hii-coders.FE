import { useState, useMemo, useCallback } from 'react';
import { MOCK_PROBLEMS, PAGE_SIZE, type Status, type Difficulty } from '../constants/problems';

export interface Filters {
  difficulties: Difficulty[];
  statuses: Status[];
  company: string | null;
  search: string;
}

export interface UseProblemsReturn {
  problems: typeof MOCK_PROBLEMS;
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

  const filteredProblems = useMemo(() => {
    return MOCK_PROBLEMS.filter((problem) => {
      if (filters.difficulties.length > 0 && !filters.difficulties.includes(problem.difficulty)) {
        return false;
      }
      if (filters.statuses.length > 0 && !filters.statuses.includes(problem.status)) {
        return false;
      }
      if (filters.search.trim() && !problem.title.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [filters]);

  const paginatedProblems = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredProblems.slice(start, start + PAGE_SIZE);
  }, [filteredProblems, currentPage]);

  const totalPages = Math.ceil(filteredProblems.length / PAGE_SIZE);

  const handleFilterChange = useCallback((newFilters: Filters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  }, [totalPages]);

  return {
    problems: paginatedProblems,
    total: filteredProblems.length,
    totalAll: MOCK_PROBLEMS.length,
    currentPage,
    totalPages,
    pageSize: PAGE_SIZE,
    filters,
    onFilterChange: handleFilterChange,
    onPageChange: handlePageChange,
  };
};
