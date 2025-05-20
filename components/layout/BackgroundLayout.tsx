import { TouchableOpacity } from 'react-native';
import { Container } from './Container';
import { ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';
import Logout from '@/assets/icons/logout.svg';
import CustomImageBackground from './CustomImageBackground';

const BackgroundLayout = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { user, logout } = useAuth();

  return (
    <CustomImageBackground>
      <Container className={className}>{children}</Container>
    </CustomImageBackground>
  );
};

export default BackgroundLayout;
