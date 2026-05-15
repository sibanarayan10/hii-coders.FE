import { api } from './AxiosConfig';

class ProblemService {
  route = 'api/v1/problems';
  getProblems = (filters?: any) => {
    let updatedRoute = this.route;
    if (filters) {
      const { difficulties = [], statuses = [] } = filters;
      updatedRoute = `${this.route}?difficulties=${difficulties}&statuses=${statuses}`;
    }
    return api.get(updatedRoute);
  };
  getProblemDetail = (id: string) => api.get(`${this.route}/${id}`);
  createOrEditProblem = (body: any) => api.post(`${this.route}`, body);
  deleteProblem = (id: string) => api.put(`${this.route}/${id}`);
}

export default new ProblemService();
