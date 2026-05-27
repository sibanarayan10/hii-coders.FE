export enum SubmissionStatus {
    ACCEPTED = 'ACCEPTED',
    RUNTIME_ERROR = 'RUNTIME_ERROR',
    RUNNING = "RUNNING",
    WRONG_ANSWER = 'WRONG_ANSWER',
    TIME_LIMIT_EXCEEDED = 'TIME_LIMIT_EXCEEDED',
    MEMORY_LIMIT_EXCEED = 'MEMORY_LIMIT_EXCEED',
    COMPILATION_ERROR = "COMPILATION_ERROR",
    QUEUED = "QUEUED",
    PENDING = "PENDING"
}

export const SubsmissionStatusLabel: Record<SubmissionStatus, string> = {
    [SubmissionStatus.ACCEPTED]: "Accepted",
    [SubmissionStatus.RUNTIME_ERROR]: "Runtime Error",
    [SubmissionStatus.RUNNING]: "Running",
    [SubmissionStatus.WRONG_ANSWER]: "Wrong Answer",
    [SubmissionStatus.TIME_LIMIT_EXCEEDED]: "Time Limit Exceeded",
    [SubmissionStatus.MEMORY_LIMIT_EXCEED]: "Memory Limit Exceeded",
    [SubmissionStatus.COMPILATION_ERROR]: "Compilation Error",
    [SubmissionStatus.QUEUED]: "Queued",
    [SubmissionStatus.PENDING]: "Pending"
}