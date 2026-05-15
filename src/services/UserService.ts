import { api } from './AxiosConfig';

class UserService {
  baseRoute = '/api/v1/users';

  createUser = (data: any) => api.post(`${this.baseRoute}/sign-up`, data);
  loginUser = (data: any) => api.post(`${this.baseRoute}/sign-in`, data);
  getMe = () => api.get(`${this.baseRoute}/me`);
  getUsers = () => api.get(`${this.baseRoute}`);
  deleteUser = (id: string) => api.put(`${this.baseRoute}/${id}`);
}

export default new UserService();
