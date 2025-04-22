import { View } from 'react-native';
import HappyCat from '@/assets/cats/happy-cat.svg';
import ScaredCat from '@/assets/cats/scared-cat.svg';
import CryingCat from '@/assets/cats/crying-cat.svg';
import StreakProtector from '../habits/StreakProtector';

const HabitsHeader = ({
  isLosingStreak,
  isStreakLost,
  showModal = false,
}: {
  isLosingStreak?: boolean;
  isStreakLost?: boolean;
  showModal?: boolean;
}) => {
  return (
    <View className="flex flex-row items-center justify-between">
      <StreakProtector showModal={showModal} />
      {isStreakLost ? (
        <CryingCat width={24} height={24} />
      ) : isLosingStreak ? (
        <ScaredCat width={24} height={24} />
      ) : (
        <HappyCat width={24} height={24} />
      )}
    </View>
  );
};

export default HabitsHeader;
