import { api } from "./AxiosConfig"

class SubmissionService {
    route = "api/v1/submission"
    apiConfig = {
        baseURL: import.meta.env.VITE_SUBMISSION_BACKEND_URL,
        withCredentials: true,
        validateStatus: (status: number) => {
            if (status == 401) {
                window.location.href = '/sign-in';
                return false;
            }
            return true;
        },
    }

    submitCode = (body: any) => api.post(this.route, body, this.apiConfig)
    getSubmission = (problemId: string) => api.get(`${this.route}?problemId=${problemId}`, this.apiConfig)
}

export default new SubmissionService();