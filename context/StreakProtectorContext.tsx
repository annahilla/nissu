import { createContext, useContext, useState, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { Alert } from 'react-native';
import streakProtectorService from '@/services/streakProtectorService';
import { StreakProtector } from '@/types/habits';

interface StreakProtectorContextInterface {
  streakProtector: StreakProtector;
  fetchStreakProtector: () => void;
  updatedStreakProtector: number;
  updateStreakProtector: (
    id: string,
    updatedStreakProtector: StreakProtector
  ) => void;
}

interface StreakProtectorProviderInterface {
  children: ReactNode;
}

const StreakProtectorContext = createContext<StreakProtectorContextInterface>({
  streakProtector: { $id: '', value: 0, userId: '' },
  fetchStreakProtector: async () => ({}),
  updateStreakProtector: async () => ({}),
  updatedStreakProtector: 0,
});

export const StreakProtectorProvider = ({
  children,
}: StreakProtectorProviderInterface) => {
  const { user } = useAuth();
  const [streakProtector, setStreakProtector] = useState({
    $id: '',
    value: 0,
    userId: '',
  });
  const [updatedStreakProtector, setUpdatedStreakProtector] = useState(0);

  const fetchStreakProtector = async () => {
    if (user) {
      const response = await streakProtectorService.getStreakProtector(
        user.$id
      );

      if (response.error) {
        Alert.alert('Error', response.error);
      } else {
        setStreakProtector(
          (response.data?.[0] as unknown as StreakProtector) || {
            $id: '',
            value: 0,
            userId: '',
          }
        );
      }
    }
  };

  const updateStreakProtector = async (
    id: string,
    updatedStreakProtector: StreakProtector
  ) => {
    const { value } = updatedStreakProtector;

    if (user) {
      const response = await streakProtectorService.updateStreakProtector(id, {
        value,
        userId: user?.$id,
      });

      if (response.error) {
        Alert.alert('Error: ', response.error);
      }

      setUpdatedStreakProtector(value);
      setStreakProtector((prev) => ({ ...prev, value: value }));
    }
  };

  return (
    <StreakProtectorContext.Provider
      value={{
        streakProtector,
        fetchStreakProtector,
        updatedStreakProtector,
        updateStreakProtector,
      }}>
      {children}
    </StreakProtectorContext.Provider>
  );
};

export const useStreakProtector = () => useContext(StreakProtectorContext);
