import ProtectedRoute from '@/components/ProtectedRoute';
import HomeContent from '@/components/habits/HomeContent';

const HomeScreen = () => {
  return (
    <ProtectedRoute>
      <HomeContent />
    </ProtectedRoute>
  );
};

export default HomeScreen;
