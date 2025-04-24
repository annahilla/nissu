import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import { ReactNode, useEffect } from 'react';
import LoadingScreen from './ui/LoadingScreen';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login');
    }
  }, [user, isLoading]);

  if (isLoading || !user) return <LoadingScreen />;

  return <>{children}</>;
};

export default ProtectedRoute;
