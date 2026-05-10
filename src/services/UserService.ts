import { api } from './AxiosConfig';

class UserService {
  createUser = (data: any) => api.post('/api/v1/user/sign-up', data);
  loginUser = (data: any) => api.post('/api/v1/user/sign-in', data);
  getMe = () => api.get('/api/v1/user/me');
}

export default new UserService();
