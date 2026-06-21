import { Container } from './Container';
import { ReactNode } from 'react';
import CustomImageBackground from './CustomImageBackground';

const BackgroundLayout = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <CustomImageBackground>
      <Container className={className}>{children}</Container>
    </CustomImageBackground>
  );
};

export default BackgroundLayout;
