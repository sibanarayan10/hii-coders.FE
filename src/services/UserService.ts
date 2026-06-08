import { api } from './AxiosConfig';

class UserService {
  baseRoute = '/api/v1/users';

  createUser = (data: any) => api.post(`${this.baseRoute}/sign-up`, data);
  loginUser = (data: any) => api.post(`${this.baseRoute}/sign-in`, data);
  getMe = () => api.get(`${this.baseRoute}/me`);
  getUsers = ({ page = 1, limit = 10, search = '' }) => api.get(`${this.baseRoute}?search=${search}&page=${page - 1}&limit=${limit}`);
  getRecentUsers = () => api.get(`${this.baseRoute}/recent`);
  getUserMetrics = () => api.get(`${this.baseRoute}/metrics`);
  toggleUserStatus = (id: string, recordStatus: "ACTIVE" | "DELETED") => api.put(`${this.baseRoute}/${id}?status=${recordStatus}`);
  getDashboardStats = (userId: string) => api.get(`${this.baseRoute}/${userId}/dashboard`)

}

export default new UserService();
