export const STATUS = {
  SOLVED: 'solved',
  ATTEMPTED: 'attempted',
  TODO: 'todo',
} as const;

export type Status = (typeof STATUS)[keyof typeof STATUS];

export const DIFFICULTY = {
  EASY: 'Easy',
  MEDIUM: 'Medium',
  HARD: 'Hard',
} as const;

export type Difficulty = (typeof DIFFICULTY)[keyof typeof DIFFICULTY];

export interface Problem {
  id: number;
  title: string;
  status: Status;
  difficulty: Difficulty;
  tags: string[];
  acceptance: number;
}

export const PAGE_SIZE = 5;

export const MOCK_PROBLEMS: Problem[] = [
  { id: 1,  title: 'Two Sum Variations',                             status: STATUS.SOLVED,    difficulty: DIFFICULTY.EASY,   tags: ['Array', 'Hash Table'],                     acceptance: 49.2 },
  { id: 2,  title: 'Longest Substring Without Repeating Characters', status: STATUS.TODO,      difficulty: DIFFICULTY.MEDIUM, tags: ['String', 'Sliding Window'],                acceptance: 33.8 },
  { id: 3,  title: 'Median of Two Sorted Arrays',                    status: STATUS.ATTEMPTED, difficulty: DIFFICULTY.HARD,   tags: ['Binary Search', 'Divide & Conquer'],       acceptance: 35.2 },
  { id: 4,  title: 'Reverse Integer Optimized',                      status: STATUS.TODO,      difficulty: DIFFICULTY.MEDIUM, tags: ['Math'],                                    acceptance: 27.1 },
  { id: 5,  title: 'Palindrome Number',                              status: STATUS.SOLVED,    difficulty: DIFFICULTY.EASY,   tags: ['Math'],                                    acceptance: 52.8 },
  { id: 6,  title: 'Regular Expression Matching',                    status: STATUS.TODO,      difficulty: DIFFICULTY.HARD,   tags: ['String', 'Dynamic Programming'],           acceptance: 28.3 },
  { id: 7,  title: 'Container With Most Water',                      status: STATUS.SOLVED,    difficulty: DIFFICULTY.MEDIUM, tags: ['Array', 'Two Pointers', 'Greedy'],         acceptance: 54.1 },
  { id: 8,  title: 'Integer to Roman',                               status: STATUS.TODO,      difficulty: DIFFICULTY.MEDIUM, tags: ['Hash Table', 'Math', 'String'],            acceptance: 63.9 },
  { id: 9,  title: 'Valid Parentheses',                              status: STATUS.SOLVED,    difficulty: DIFFICULTY.EASY,   tags: ['String', 'Stack'],                         acceptance: 40.7 },
  { id: 10, title: 'Merge Two Sorted Lists',                         status: STATUS.SOLVED,    difficulty: DIFFICULTY.EASY,   tags: ['Linked List', 'Recursion'],                acceptance: 62.4 },
  { id: 11, title: 'Generate Parentheses',                           status: STATUS.TODO,      difficulty: DIFFICULTY.MEDIUM, tags: ['String', 'Backtracking'],                  acceptance: 74.2 },
  { id: 12, title: 'Merge k Sorted Lists',                           status: STATUS.ATTEMPTED, difficulty: DIFFICULTY.HARD,   tags: ['Linked List', 'Divide & Conquer', 'Heap'], acceptance: 49.8 },
  { id: 13, title: 'Search in Rotated Sorted Array',                 status: STATUS.SOLVED,    difficulty: DIFFICULTY.MEDIUM, tags: ['Array', 'Binary Search'],                  acceptance: 39.4 },
  { id: 14, title: 'Trapping Rain Water',                            status: STATUS.TODO,      difficulty: DIFFICULTY.HARD,   tags: ['Array', 'Two Pointers', 'Stack'],          acceptance: 58.7 },
  { id: 15, title: 'Jump Game',                                      status: STATUS.SOLVED,    difficulty: DIFFICULTY.MEDIUM, tags: ['Array', 'Greedy'],                         acceptance: 38.6 },
  { id: 16, title: 'Spiral Matrix',                                  status: STATUS.TODO,      difficulty: DIFFICULTY.MEDIUM, tags: ['Array', 'Matrix', 'Simulation'],           acceptance: 44.9 },
  { id: 17, title: 'Climbing Stairs',                                status: STATUS.SOLVED,    difficulty: DIFFICULTY.EASY,   tags: ['Math', 'Dynamic Programming'],             acceptance: 51.7 },
  { id: 18, title: 'Binary Tree Level Order Traversal',              status: STATUS.ATTEMPTED, difficulty: DIFFICULTY.MEDIUM, tags: ['Tree', 'BFS'],                             acceptance: 66.2 },
  { id: 19, title: 'Word Search',                                    status: STATUS.TODO,      difficulty: DIFFICULTY.MEDIUM, tags: ['Array', 'Backtracking', 'Matrix'],         acceptance: 41.3 },
  { id: 20, title: 'Longest Common Subsequence',                     status: STATUS.SOLVED,    difficulty: DIFFICULTY.MEDIUM, tags: ['String', 'Dynamic Programming'],           acceptance: 57.8 },
];
