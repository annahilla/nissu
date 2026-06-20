import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';
import { useAuth } from './AuthContext';
import { useHabits } from './HabitsContext';

interface RefreshContextInterface {
  refreshing: boolean;
  onRefresh: () => void;
}

interface RefreshProviderInterface {
  children: ReactNode;
}

export const RefreshContext = createContext<RefreshContextInterface>({
  refreshing: false,
  onRefresh: () => {},
});

export const RefreshProvider = ({ children }: RefreshProviderInterface) => {
  const [refreshing, setRefreshing] = useState(false);
  const { checkUser } = useAuth();
  const { fetchHabits } = useHabits();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    try {
      await checkUser();
      fetchHabits();
    } finally {
      setRefreshing(false);
    }
  }, [checkUser, fetchHabits]);

  return (
    <RefreshContext.Provider
      value={{
        refreshing,
        onRefresh,
      }}>
      {children}
    </RefreshContext.Provider>
  );
};

export const useRefreshControl = () => useContext(RefreshContext);
