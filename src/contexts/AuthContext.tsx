import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { api } from '../services/AxiosConfig';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '../enums/UserRole';
import UserService from '../services/UserService';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
  getUserRole: () => UserRole | undefined;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const getMe = async () => {
    try {
      const response = await UserService.getMe();
      setUser(response.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) getMe();
  }, []);

  const logout = async () => {
    try {
      //   await api.post('/auth/logout');
    } catch (error) {
      console.error(error);
    } finally {
      setUser(null);
    }
  };

  const getUserRole = (): UserRole | undefined => {
    if (!user) {
      return;
    }
    return user.role || UserRole.USER;
  };

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    setUser,
    logout,
    getUserRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}
