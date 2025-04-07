import { TouchableOpacity } from 'react-native';
import { Container } from './Container';
import { ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';
import Logout from '@/assets/logout.svg';
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
      {user && (
        <TouchableOpacity onPress={logout} className="absolute right-4 top-4">
          <Logout />
        </TouchableOpacity>
      )}
      <Container className={className}>{children}</Container>
    </CustomImageBackground>
  );
};

export default BackgroundLayout;
