import { createContext, useContext, useState, ReactNode } from 'react';
import authService from '../services/authService';
import { User } from '@/types/habits';
import { account, verificationUrl } from '@/services/appwrite';

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
  verifyEmail: (
    userId: string,
    secret: string
  ) => Promise<'success' | 'error' | 'loading'>;
  checkUser: () => Promise<void>;
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
  verifyEmail: async () => 'loading',
  checkUser: async () => {},
});

export const AuthProvider = ({ children }: AuthProviderInterface) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  const sendVerificationEmail = async () => {
    try {
      await account.createVerification(verificationUrl);
    } catch (error) {
      console.log(error);
    }
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
    sendVerificationEmail();

    return { success: true };
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    await checkUser();
  };

  const verifyEmail = async (
    userId: string,
    secret: string
  ): Promise<'success' | 'error'> => {
    if (!secret) return 'error';

    setIsLoading(true);
    try {
      await account.updateVerification(userId, secret);
      await checkUser();
      return 'success';
    } catch (err) {
      console.error('Error verifying email:', err);
      return 'error';
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isLoading,
        verifyEmail,
        checkUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
