import { OutputBlockData } from '@editorjs/editorjs';
import { ProblemCategory } from '../enums/ProblemCategory';

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
  categories: ProblemCategory[];
  acceptance: number;
  blocks: OutputBlockData[];
}

export const PAGE_SIZE = 5;
