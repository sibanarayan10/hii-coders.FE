import { api } from './AxiosConfig';

class ProblemService {
  route = 'api/v1/problems';
  getProblems = () => api.get(`${this.route}`);
  getProblemDetail = (id: string) => api.get(`${this.route}/${id}`);
  createOrEditProblem = (body: any) => api.post(`${this.route}`, body);
  deleteProblem = (id: string) => api.put(`${this.route}/${id}`);
}

export default new ProblemService();
