import { SafeAreaView } from 'react-native';

export const Container = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <SafeAreaView
      className={`flex w-[80%] flex-col gap-10 rounded-xl border border-2 border-brown bg-beige p-5 ${className}`}>
      {children}
    </SafeAreaView>
  );
};
