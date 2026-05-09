import { api } from './AxiosConfig';

class ProblemService {
  getProblems = () => api.get(`api/v1/problems`);
  getProblemDetail = (id: string) => api.get(`api/v1/problems/${id}`);
}

export default new ProblemService();
