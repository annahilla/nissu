import { isSmallDevice, isTablet } from '@/consts/sizes';
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
      className={`flex w-[80%] flex-col rounded-xl border border-2 border-brown bg-beige p-5 text-center ${className} ${isSmallDevice ? 'gap-4' : 'gap-10'}`}>
      {children}
    </SafeAreaView>
  );
};
