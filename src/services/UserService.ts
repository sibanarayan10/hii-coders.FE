import { api } from './AxiosConfig';

class UserService {
  baseRoute = '/api/v1/users';

  createUser = (data: any) => api.post(`${this.baseRoute}/sign-up`, data);
  loginUser = (data: any) => api.post(`${this.baseRoute}/sign-in`, data);
  getMe = () => api.get(`${this.baseRoute}/me`);
  getUsers = () => api.get(`${this.baseRoute}`);
  deleteUser = (id: string) => api.put(`${this.baseRoute}/${id}`);
  getDashboardStats = (userId: string) => api.get(`${this.baseRoute}/${userId}/dashboard`)
}

export default new UserService();
