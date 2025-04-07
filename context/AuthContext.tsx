import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import authService from '../services/authService';
import { User } from '@/types/habits';

interface AuthResponse {
  error?: string;
  success?: boolean;
}

interface AuthContextInterface {
  user: User | null;
  login: (email: string, password: string) => Promise<AuthResponse>;
  register: (email: string, password: string) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

interface AuthProviderInterface {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextInterface>({
  user: null,
  login: async () => ({}),
  register: async () => ({}),
  logout: async () => {},
  isLoading: false,
});

export const AuthProvider = ({ children }: AuthProviderInterface) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    setIsLoading(true);
    const response = await authService.getUser();

    if (response && 'error' in response) {
      setUser(null);
    } else {
      setUser(response);
    }

    setIsLoading(false);
  };

  const login = async (email: string, password: string) => {
    const response = await authService.login(email, password);

    if ('error' in response) {
      return response;
    }

    await checkUser();
    return { success: true };
  };

  const register = async (email: string, password: string) => {
    const response = await authService.register(email, password);

    if ('error' in response) {
      return response;
    }

    await login(email, password);

    return { success: true };
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    await checkUser();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
