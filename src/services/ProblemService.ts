import { ProblemFilter } from '../pages/ProblemsPage';
import { api } from './AxiosConfig';

class ProblemService {
  route = 'api/v1/problems';
  getProblems = (page: number, size: number, filters?: ProblemFilter,) => {
    let updatedRoute = this.route;
    if (filters) {
      const { difficulties = [], solveStatus = [], companies = [], categories = [], search = "" } = filters;
      updatedRoute = `${this.route}?difficulties=${difficulties}&status=${solveStatus}&companies=${companies}&categories=${categories}&search=${search}&page=${page}&size=${size}`;
    }
    return api.get(updatedRoute);
  };
  getProblemDetail = (id: string) => api.get(`${this.route}/${id}`);
  createOrEditProblem = (body: any) => api.post(`${this.route}`, body);
  deleteProblem = (id: string) => api.put(`${this.route}/${id}`);
  getTestCase = (problemId: string) => api.get(`${this.route}/${problemId}/testCases`)
  getProblemsByAdmin = ({ page = 1, size = 10, difficulty = null, search = '', sortBy = '', order = '' }) => {
    let queryParams = `search=${search}&page=${page - 1}&size=${size}&sortBy=${sortBy}&order=${order}`;
    if (difficulty) {
      queryParams += `&difficulty=${difficulty}`;
    }

    return api.get(`${this.route}/system?${queryParams}`)
  }
  getProblem = (id: string) => api.get(`${this.route}/${id}/detail`)
}

export default new ProblemService();
