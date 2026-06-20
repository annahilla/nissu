import { ScrollView, RefreshControl } from 'react-native';
import { ReactNode } from 'react';
import { useRefreshControl } from '@/context/RefreshControlContext';

export default function GlobalRefresh({ children }: { children: ReactNode }) {
  const { refreshing, onRefresh } = useRefreshControl();

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {children}
    </ScrollView>
  );
}
