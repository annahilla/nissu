import { SafeAreaView } from 'react-native';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaView className="flex max-h-[55%] w-[80%] flex-col gap-10 rounded-xl border border-2 border-brown bg-beige p-5">
      {children}
    </SafeAreaView>
  );
};
