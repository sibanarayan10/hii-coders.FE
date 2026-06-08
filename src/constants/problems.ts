import { OutputBlockData } from '@editorjs/editorjs';
import { ProblemCategory } from '../enums/ProblemCategory';
import { ProgrammingLanguage } from '../enums/ProgrammingLanguage';
import { Company } from '../enums/Company';

export enum STATUS {
  SOLVED = 'SOLVED',
  ATTEMPTED = 'ATTEMPTED',
  TODO = 'TODO',
}

export type Status = (typeof STATUS)[keyof typeof STATUS];

export enum Difficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}

export interface Problem {
  id: string;
  title: string;
  status?: Status;
  difficulty: Difficulty;
  companies: Company[],
  categories: ProblemCategory[];
  acceptance: number;
  blocks: OutputBlockData[];
  activeUsers?: number,
  solutionByLanguage?: Record<ProgrammingLanguage, string | undefined>
  ioByLanguage?: Record<ProgrammingLanguage, string | undefined>
}



export const PAGE_SIZE = 5;
